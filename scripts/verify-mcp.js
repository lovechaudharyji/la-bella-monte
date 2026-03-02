const fs = require('fs');
const path = require('path');
const https = require('https');

// Load .env.local manually to avoid dependencies
const envPath = path.join(__dirname, '..', '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');

const env = {};
envContent.split('\n').forEach(line => {
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) {
    const key = match[1].trim();
    const value = match[2].trim().replace(/^['"]|['"]$/g, ''); // Remove quotes if any
    env[key] = value;
  }
});

const mcpUrl = env.SUPABASE_MCP_URL || 'https://mcp.supabase.com/mcp';
const projectRef = env.SUPABASE_MCP_PROJECT_REF;
const secret = env.SUPABASE_MCP_SECRET_KEY;

if (!projectRef || !secret) {
  console.error('Missing configuration: PROJECT_REF or SECRET_KEY not found in .env.local');
  process.exit(1);
}

const url = `${mcpUrl}?project_ref=${projectRef}`;

console.log(`Connecting to ${url}...`);

const options = {
  headers: {
    'Authorization': `Bearer ${secret}`
  }
};

https.get(url, options, (res) => {
  console.log(`Status Code: ${res.statusCode}`);
  
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    if (res.statusCode >= 200 && res.statusCode < 300) {
      console.log('Connection Successful!');
      try {
        const json = JSON.parse(data);
        console.log('Response:', JSON.stringify(json, null, 2).substring(0, 200) + '...');
      } catch (e) {
        console.log('Response:', data.substring(0, 200) + '...');
      }
      process.exit(0);
    } else {
      console.error('Connection Failed!');
      console.error('Response:', data);
      process.exit(1);
    }
  });

}).on('error', (err) => {
  console.error('Error:', err.message);
  process.exit(1);
});
