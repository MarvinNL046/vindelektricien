import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

async function testBrightDataMCP() {
  console.log('🔧 Testing Bright Data MCP configuration...\n');

  // Read MCP config
  const configPath = path.join(process.cwd(), 'mcp.config.json');
  const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
  
  const brightdataConfig = config.mcpServers.brightdata;
  
  console.log('📋 Configuration:');
  console.log(`- Command: ${brightdataConfig.command}`);
  console.log(`- Args: ${brightdataConfig.args.join(' ')}`);
  console.log(`- API Token: ${brightdataConfig.env.API_TOKEN.substring(0, 10)}...`);
  console.log();

  // Test the MCP server
  console.log('🚀 Starting Bright Data MCP server...');
  
  const mcpProcess = spawn(brightdataConfig.command, brightdataConfig.args, {
    env: {
      ...process.env,
      ...brightdataConfig.env
    },
    stdio: 'pipe'
  });

  mcpProcess.stdout.on('data', (data) => {
    console.log(`📨 MCP Output: ${data.toString()}`);
  });

  mcpProcess.stderr.on('data', (data) => {
    console.error(`❌ MCP Error: ${data.toString()}`);
  });

  mcpProcess.on('close', (code) => {
    console.log(`\n✅ MCP process exited with code ${code}`);
  });

  // Give it a moment to start
  setTimeout(() => {
    console.log('\n📝 MCP server should now be running.');
    console.log('You can now use Bright Data scraping capabilities through MCP!');
    
    // Clean shutdown
    mcpProcess.kill();
  }, 5000);
}

testBrightDataMCP().catch(console.error);