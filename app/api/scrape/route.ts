import { NextRequest, NextResponse } from 'next/server';
import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

// Only allow in development
const isDevelopment = process.env.NODE_ENV === 'development';

export async function POST(request: NextRequest) {
  if (!isDevelopment) {
    return NextResponse.json(
      { error: 'Scraping is only available in development mode' },
      { status: 403 }
    );
  }

  try {
    const body = await request.json();
    const { url, selector } = body;

    if (!url) {
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      );
    }

    // Read MCP config
    const configPath = path.join(process.cwd(), 'mcp.config.json');
    const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
    const brightdataConfig = config.mcpServers.brightdata;

    // Create a scraping request through MCP
    const scrapingData = await new Promise((resolve, reject) => {
      const mcpProcess = spawn(brightdataConfig.command, [
        ...brightdataConfig.args,
        'scrape',
        '--url', url,
        ...(selector ? ['--selector', selector] : [])
      ], {
        env: {
          ...process.env,
          ...brightdataConfig.env
        }
      });

      let output = '';
      let error = '';

      mcpProcess.stdout.on('data', (data) => {
        output += data.toString();
      });

      mcpProcess.stderr.on('data', (data) => {
        error += data.toString();
      });

      mcpProcess.on('close', (code) => {
        if (code === 0) {
          try {
            resolve(JSON.parse(output));
          } catch {
            resolve({ html: output });
          }
        } else {
          reject(new Error(error || `Process exited with code ${code}`));
        }
      });
    });

    return NextResponse.json({
      success: true,
      data: scrapingData,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Scraping error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to scrape' },
      { status: 500 }
    );
  }
}