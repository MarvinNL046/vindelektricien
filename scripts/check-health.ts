#!/usr/bin/env npx tsx
/**
 * Health Check Script for RehabNearByMe
 *
 * Checks for:
 * 1. Broken internal links (404s)
 * 2. Missing dependencies
 * 3. Unused exports
 * 4. Missing image references
 *
 * Run with: npx tsx scripts/check-health.ts
 */

import * as fs from 'fs';
import * as path from 'path';

// Configuration
const PROJECT_ROOT = path.resolve(__dirname, '..');
const APP_DIR = path.join(PROJECT_ROOT, 'app');
const COMPONENTS_DIR = path.join(PROJECT_ROOT, 'components');
const LIB_DIR = path.join(PROJECT_ROOT, 'lib');
const PUBLIC_DIR = path.join(PROJECT_ROOT, 'public');
const PACKAGE_JSON_PATH = path.join(PROJECT_ROOT, 'package.json');

// Result storage
interface HealthReport {
  brokenLinks: { file: string; link: string; reason: string }[];
  missingDependencies: { file: string; importName: string }[];
  unusedExports: { file: string; exportName: string }[];
  missingImages: { file: string; imagePath: string }[];
}

const report: HealthReport = {
  brokenLinks: [],
  missingDependencies: [],
  unusedExports: [],
  missingImages: [],
};

// Summary counters (deduplicated)
const summaryCounts = {
  brokenLinks: 0,
  missingDependencies: 0,
  unusedExports: 0,
  missingImages: 0,
};

// ============================================================================
// Utility Functions
// ============================================================================

function getAllFiles(dir: string, extensions: string[] = ['.ts', '.tsx']): string[] {
  const files: string[] = [];

  if (!fs.existsSync(dir)) {
    return files;
  }

  const items = fs.readdirSync(dir, { withFileTypes: true });

  for (const item of items) {
    const fullPath = path.join(dir, item.name);

    if (item.isDirectory()) {
      // Skip node_modules, .git, .next, etc.
      if (!item.name.startsWith('.') && item.name !== 'node_modules' && item.name !== '.next') {
        files.push(...getAllFiles(fullPath, extensions));
      }
    } else if (extensions.some(ext => item.name.endsWith(ext))) {
      files.push(fullPath);
    }
  }

  return files;
}

function readFileContent(filePath: string): string {
  try {
    return fs.readFileSync(filePath, 'utf-8');
  } catch {
    return '';
  }
}

function getRelativePath(filePath: string): string {
  return path.relative(PROJECT_ROOT, filePath).replace(/\\/g, '/');
}

// ============================================================================
// 1. Check for Broken Internal Links
// ============================================================================

function getAppRoutes(): Set<string> {
  const routes = new Set<string>();

  function scanDirectory(dir: string, currentRoute: string = '') {
    if (!fs.existsSync(dir)) return;

    const items = fs.readdirSync(dir, { withFileTypes: true });

    for (const item of items) {
      if (item.name.startsWith('.') || item.name === 'node_modules') continue;

      const fullPath = path.join(dir, item.name);

      if (item.isDirectory()) {
        // Handle route groups (parentheses) - they don't add to the URL
        const isRouteGroup = item.name.startsWith('(') && item.name.endsWith(')');
        const newRoute = isRouteGroup ? currentRoute : `${currentRoute}/${item.name}`;

        // Handle dynamic routes
        const routeName = item.name.replace(/^\[/, ':').replace(/\]$/, '');
        const dynamicRoute = routeName.startsWith(':')
          ? `${currentRoute}/${routeName}`
          : newRoute;

        scanDirectory(fullPath, dynamicRoute);
      } else if (item.name === 'page.tsx' || item.name === 'page.ts') {
        // Found a page, add the route
        const route = currentRoute || '/';
        routes.add(route);
      }
    }
  }

  scanDirectory(APP_DIR);
  return routes;
}

function checkBrokenLinks() {
  console.log('\n=== Checking for Broken Internal Links ===\n');

  const appRoutes = getAppRoutes();
  const allFiles = [
    ...getAllFiles(APP_DIR),
    ...getAllFiles(COMPONENTS_DIR),
    ...getAllFiles(LIB_DIR),
  ];

  // Common route patterns to check
  const linkPatterns = [
    // Next.js Link component: href="/path" or href='/path'
    /href=["']\/([^"'#?]*)/g,
    // Anchor tags: href="/path"
    /<a[^>]*href=["']\/([^"'#?]*)/g,
    // Router.push('/path') or router.push('/path')
    /(?:router|Router)\.push\(["']\/([^"'#?]*)/g,
    // redirect('/path')
    /redirect\(["']\/([^"'#?]*)/g,
  ];

  for (const file of allFiles) {
    const content = readFileContent(file);

    for (const pattern of linkPatterns) {
      let match;
      const regex = new RegExp(pattern.source, pattern.flags);

      while ((match = regex.exec(content)) !== null) {
        const linkedPath = '/' + match[1];

        // Skip external links, API routes, static files
        if (
          linkedPath.startsWith('/api/') ||
          linkedPath.startsWith('/_next/') ||
          linkedPath.match(/\.(jpg|jpeg|png|gif|svg|webp|ico|css|js|pdf|txt|xml|json)$/i)
        ) {
          continue;
        }

        // Check if route exists (accounting for dynamic routes)
        const routeExists = checkRouteExists(linkedPath, appRoutes);

        if (!routeExists) {
          report.brokenLinks.push({
            file: getRelativePath(file),
            link: linkedPath,
            reason: 'Route not found in app directory',
          });
        }
      }
    }
  }

  // Deduplicate broken links by link path
  const uniqueBrokenLinks = new Map<string, { files: string[]; reason: string }>();
  for (const { file, link, reason } of report.brokenLinks) {
    if (!uniqueBrokenLinks.has(link)) {
      uniqueBrokenLinks.set(link, { files: [], reason });
    }
    if (!uniqueBrokenLinks.get(link)!.files.includes(file)) {
      uniqueBrokenLinks.get(link)!.files.push(file);
    }
  }

  summaryCounts.brokenLinks = uniqueBrokenLinks.size;

  if (uniqueBrokenLinks.size === 0) {
    console.log('  No broken internal links found.');
  } else {
    console.log(`  Found ${uniqueBrokenLinks.size} potential broken links:\n`);
    for (const [link, { files, reason }] of uniqueBrokenLinks) {
      console.log(`  - ${link}`);
      console.log(`    Found in: ${files.join(', ')}`);
      console.log(`    Reason: ${reason}\n`);
    }
  }
}

function checkRouteExists(linkedPath: string, appRoutes: Set<string>): boolean {
  // Clean the path
  const cleanPath = linkedPath.replace(/\/$/, '') || '/';

  // Direct match
  if (appRoutes.has(cleanPath)) {
    return true;
  }

  // Check for dynamic route matches
  for (const route of appRoutes) {
    // Convert route pattern to regex
    // e.g., /state/:state becomes /state/[^/]+
    const routePattern = route
      .split('/')
      .map(segment => {
        if (segment.startsWith(':') || (segment.startsWith('[') && segment.endsWith(']'))) {
          return '[^/]+';
        }
        return segment;
      })
      .join('/');

    const regex = new RegExp(`^${routePattern}$`);
    if (regex.test(cleanPath)) {
      return true;
    }
  }

  return false;
}

// ============================================================================
// 2. Check for Missing Dependencies
// ============================================================================

function checkMissingDependencies() {
  console.log('\n=== Checking for Missing Dependencies ===\n');

  // Read package.json
  const packageJson = JSON.parse(readFileContent(PACKAGE_JSON_PATH));
  const allDeps = new Set([
    ...Object.keys(packageJson.dependencies || {}),
    ...Object.keys(packageJson.devDependencies || {}),
  ]);

  // Add Node.js built-in modules
  const builtInModules = new Set([
    'fs', 'path', 'os', 'util', 'events', 'stream', 'http', 'https',
    'url', 'querystring', 'crypto', 'buffer', 'child_process', 'cluster',
    'dns', 'net', 'readline', 'tty', 'zlib', 'assert', 'process',
    'fs/promises', 'path/posix', 'path/win32',
  ]);

  const allFiles = [
    ...getAllFiles(APP_DIR),
    ...getAllFiles(COMPONENTS_DIR),
    ...getAllFiles(LIB_DIR),
    ...getAllFiles(path.join(PROJECT_ROOT, 'scripts')),
  ];

  // Import patterns
  const importPatterns = [
    // import x from 'package-name'
    /import\s+(?:[\w{},*\s]+)\s+from\s+["']([^."'][^"']*)/g,
    // import 'package-name'
    /import\s+["']([^."'][^"']*)/g,
    // require('package-name')
    /require\(["']([^."'][^"']*)/g,
  ];

  const checkedImports = new Set<string>();

  for (const file of allFiles) {
    const content = readFileContent(file);

    for (const pattern of importPatterns) {
      let match;
      const regex = new RegExp(pattern.source, pattern.flags);

      while ((match = regex.exec(content)) !== null) {
        let importName = match[1];

        // Get the package name (handle scoped packages)
        if (importName.startsWith('@')) {
          // Scoped package: @scope/package/subpath -> @scope/package
          const parts = importName.split('/');
          importName = parts.slice(0, 2).join('/');
        } else {
          // Regular package: package/subpath -> package
          importName = importName.split('/')[0];
        }

        // Skip relative imports, aliases, and already checked
        if (
          importName.startsWith('.') ||
          importName.startsWith('@/') ||
          importName.startsWith('~') ||
          checkedImports.has(`${file}:${importName}`)
        ) {
          continue;
        }

        checkedImports.add(`${file}:${importName}`);

        // Skip false positives (common words that aren't packages)
        const falsePositives = new Set(['package', 'package-name', 'module', 'type', 'types']);
        if (falsePositives.has(importName)) {
          continue;
        }

        // Check if it's a built-in module or in dependencies
        if (!builtInModules.has(importName) && !allDeps.has(importName)) {
          report.missingDependencies.push({
            file: getRelativePath(file),
            importName,
          });
        }
      }
    }
  }

  // Deduplicate by import name
  const uniqueMissing = new Map<string, string[]>();
  for (const { file, importName } of report.missingDependencies) {
    if (!uniqueMissing.has(importName)) {
      uniqueMissing.set(importName, []);
    }
    uniqueMissing.get(importName)!.push(file);
  }

  summaryCounts.missingDependencies = uniqueMissing.size;

  if (uniqueMissing.size === 0) {
    console.log('  All imported packages are listed in package.json.');
  } else {
    console.log(`  Found ${uniqueMissing.size} missing dependencies:\n`);
    for (const [importName, files] of uniqueMissing) {
      console.log(`  - ${importName}`);
      console.log(`    Used in: ${files.slice(0, 3).join(', ')}${files.length > 3 ? ` and ${files.length - 3} more` : ''}\n`);
    }
  }
}

// ============================================================================
// 3. Check for Unused Exports
// ============================================================================

function checkUnusedExports() {
  console.log('\n=== Checking for Unused Exports ===\n');

  const allFiles = [
    ...getAllFiles(APP_DIR),
    ...getAllFiles(COMPONENTS_DIR),
    ...getAllFiles(LIB_DIR),
  ];

  // Collect all exports
  const exports: Map<string, { file: string; name: string }[]> = new Map();

  // Export patterns
  const exportPatterns = [
    // export function name
    /export\s+(?:async\s+)?function\s+(\w+)/g,
    // export const/let/var name
    /export\s+(?:const|let|var)\s+(\w+)/g,
    // export class name
    /export\s+class\s+(\w+)/g,
    // export interface/type name
    /export\s+(?:interface|type)\s+(\w+)/g,
    // export { name }
    /export\s*\{([^}]+)\}/g,
    // export default function name (named)
    /export\s+default\s+(?:async\s+)?function\s+(\w+)/g,
  ];

  for (const file of allFiles) {
    const content = readFileContent(file);
    const relativePath = getRelativePath(file);

    // Skip page.tsx files (they have special Next.js exports)
    if (file.endsWith('page.tsx') || file.endsWith('layout.tsx') || file.endsWith('route.ts')) {
      continue;
    }

    for (const pattern of exportPatterns) {
      let match;
      const regex = new RegExp(pattern.source, pattern.flags);

      while ((match = regex.exec(content)) !== null) {
        const exportedNames = match[1]
          .split(',')
          .map(name => name.trim().split(' as ')[0].trim())
          .filter(name => name && !name.includes('*'));

        for (const name of exportedNames) {
          if (!exports.has(name)) {
            exports.set(name, []);
          }
          exports.get(name)!.push({ file: relativePath, name });
        }
      }
    }
  }

  // Collect all imports to check which exports are used
  const usedImports = new Set<string>();

  const importPatterns = [
    // import { name } from
    /import\s*\{([^}]+)\}\s*from/g,
    // import name from (default import - check if used as identifier)
    /import\s+(\w+)\s+from/g,
  ];

  for (const file of allFiles) {
    const content = readFileContent(file);

    for (const pattern of importPatterns) {
      let match;
      const regex = new RegExp(pattern.source, pattern.flags);

      while ((match = regex.exec(content)) !== null) {
        const importedNames = match[1]
          .split(',')
          .map(name => {
            const trimmed = name.trim();
            // Handle "name as alias" - we care about the original name
            const parts = trimmed.split(' as ');
            return parts[0].trim();
          })
          .filter(name => name && !name.includes('*'));

        for (const name of importedNames) {
          usedImports.add(name);
        }
      }
    }

    // Also check for JSX usage: <ComponentName
    const jsxPattern = /<(\w+)(?:\s|>|\/)/g;
    let jsxMatch;
    while ((jsxMatch = jsxPattern.exec(content)) !== null) {
      const componentName = jsxMatch[1];
      // Only consider PascalCase names as components
      if (componentName[0] === componentName[0].toUpperCase()) {
        usedImports.add(componentName);
      }
    }
  }

  // Find unused exports
  const unusedExports: { file: string; exportName: string }[] = [];

  for (const [exportName, locations] of exports) {
    // Skip common patterns that are likely used externally
    if (
      exportName === 'default' ||
      exportName === 'metadata' ||
      exportName === 'generateMetadata' ||
      exportName === 'generateStaticParams' ||
      exportName === 'GET' ||
      exportName === 'POST' ||
      exportName === 'PUT' ||
      exportName === 'DELETE' ||
      exportName === 'PATCH' ||
      exportName.startsWith('_')
    ) {
      continue;
    }

    if (!usedImports.has(exportName)) {
      for (const location of locations) {
        unusedExports.push({
          file: location.file,
          exportName,
        });
      }
    }
  }

  report.unusedExports = unusedExports;

  if (unusedExports.length === 0) {
    console.log('  No potentially unused exports found.');
  } else {
    console.log(`  Found ${unusedExports.length} potentially unused exports:\n`);

    // Group by file
    const byFile = new Map<string, string[]>();
    for (const { file, exportName } of unusedExports) {
      if (!byFile.has(file)) {
        byFile.set(file, []);
      }
      byFile.get(file)!.push(exportName);
    }

    for (const [file, exportNames] of Array.from(byFile).slice(0, 20)) {
      console.log(`  - ${file}`);
      console.log(`    Exports: ${exportNames.join(', ')}\n`);
    }

    if (byFile.size > 20) {
      console.log(`  ... and ${byFile.size - 20} more files\n`);
    }

    console.log('  Note: Some exports may be used dynamically or in external packages.');
  }

  summaryCounts.unusedExports = unusedExports.length;
}

// ============================================================================
// 4. Check for Missing Image References
// ============================================================================

function checkMissingImages() {
  console.log('\n=== Checking for Missing Image References ===\n');

  // Get all files in public directory
  const publicFiles = new Set<string>();

  function scanPublicDir(dir: string, prefix: string = '') {
    if (!fs.existsSync(dir)) return;

    const items = fs.readdirSync(dir, { withFileTypes: true });

    for (const item of items) {
      const fullPath = path.join(dir, item.name);
      const relativePath = prefix ? `${prefix}/${item.name}` : item.name;

      if (item.isDirectory()) {
        scanPublicDir(fullPath, relativePath);
      } else {
        publicFiles.add('/' + relativePath.replace(/\\/g, '/'));
      }
    }
  }

  scanPublicDir(PUBLIC_DIR);

  const allFiles = [
    ...getAllFiles(APP_DIR),
    ...getAllFiles(COMPONENTS_DIR),
  ];

  // Image source patterns
  const imagePatterns = [
    // src="/path/to/image.jpg"
    /src=["']\/([^"']+\.(jpg|jpeg|png|gif|svg|webp|ico|avif))["']/gi,
    // Image component src="/path"
    /<Image[^>]*src=["']\/([^"']+\.(jpg|jpeg|png|gif|svg|webp|ico|avif))["']/gi,
    // background-image: url('/path')
    /url\(["']?\/([^"')]+\.(jpg|jpeg|png|gif|svg|webp|ico|avif))["']?\)/gi,
    // src={"/path"} in JSX
    /src=\{["']\/([^"']+\.(jpg|jpeg|png|gif|svg|webp|ico|avif))["']\}/gi,
  ];

  for (const file of allFiles) {
    const content = readFileContent(file);

    for (const pattern of imagePatterns) {
      let match;
      const regex = new RegExp(pattern.source, pattern.flags);

      while ((match = regex.exec(content)) !== null) {
        const imagePath = '/' + match[1];

        // Skip external URLs and dynamic paths
        if (
          imagePath.includes('${') ||
          imagePath.includes('{') ||
          imagePath.startsWith('//') ||
          imagePath.includes('http')
        ) {
          continue;
        }

        if (!publicFiles.has(imagePath)) {
          report.missingImages.push({
            file: getRelativePath(file),
            imagePath,
          });
        }
      }
    }
  }

  // Deduplicate missing images by image path
  const uniqueMissingImages = new Map<string, string[]>();
  for (const { file, imagePath } of report.missingImages) {
    if (!uniqueMissingImages.has(imagePath)) {
      uniqueMissingImages.set(imagePath, []);
    }
    if (!uniqueMissingImages.get(imagePath)!.includes(file)) {
      uniqueMissingImages.get(imagePath)!.push(file);
    }
  }

  summaryCounts.missingImages = uniqueMissingImages.size;

  if (uniqueMissingImages.size === 0) {
    console.log('  All referenced images exist in public folder.');
  } else {
    console.log(`  Found ${uniqueMissingImages.size} missing image references:\n`);
    for (const [imagePath, files] of uniqueMissingImages) {
      console.log(`  - ${imagePath}`);
      console.log(`    Referenced in: ${files.join(', ')}\n`);
    }
  }
}

// ============================================================================
// Main Execution
// ============================================================================

function printSummary() {
  console.log('\n' + '='.repeat(60));
  console.log('HEALTH CHECK SUMMARY');
  console.log('='.repeat(60) + '\n');

  const issues = {
    'Broken Internal Links': summaryCounts.brokenLinks,
    'Missing Dependencies': summaryCounts.missingDependencies,
    'Unused Exports': summaryCounts.unusedExports,
    'Missing Images': summaryCounts.missingImages,
  };

  let totalIssues = 0;

  for (const [category, count] of Object.entries(issues)) {
    const status = count === 0 ? 'PASS' : 'WARN';
    const icon = count === 0 ? '[OK]' : '[!!]';
    console.log(`  ${icon} ${category}: ${count}`);
    totalIssues += count;
  }

  console.log('\n' + '-'.repeat(60));

  if (totalIssues === 0) {
    console.log('\n  All checks passed! Your codebase is healthy.\n');
  } else {
    console.log(`\n  Total potential issues found: ${totalIssues}`);
    console.log('  Review the details above for more information.\n');
  }
}

async function main() {
  console.log('='.repeat(60));
  console.log('RehabNearByMe Health Check');
  console.log('='.repeat(60));
  console.log(`\nProject Root: ${PROJECT_ROOT}`);
  console.log(`Running at: ${new Date().toISOString()}\n`);

  checkBrokenLinks();
  checkMissingDependencies();
  checkUnusedExports();
  checkMissingImages();

  printSummary();
}

main().catch(console.error);
