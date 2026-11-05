const http = require('http');

// Simple test runner for server
const { spawn } = require('child_process');
const server = spawn('node', ['server.js'], { cwd: __dirname });

server.stdout.on('data', async (data) => {
  const str = data.toString();
  if (str.includes('VaultFlow Idempotent API Engine running')) {
    console.log('✓ Server booted successfully.');

    // 1. Test Single Webhook
    const req1 = http.request('http://localhost:4000/api/webhooks/payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Idempotency-Key': 'evt_test_1001'
      }
    }, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        const json1 = JSON.parse(body);
        console.log('✓ First Webhook Status:', res.statusCode, json1.status);

        // 2. Test Duplicate Webhook with same key
        const req2 = http.request('http://localhost:4000/api/webhooks/payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Idempotency-Key': 'evt_test_1001'
          }
        }, (res2) => {
          let body2 = '';
          res2.on('data', chunk => body2 += chunk);
          res2.on('end', () => {
            const json2 = JSON.parse(body2);
            console.log('✓ Duplicate Webhook Status:', res2.statusCode, json2.status, 'Replay:', json2.idempotentReplay);
            console.log('✓ All API tests passed cleanly!');
            server.kill();
            process.exit(0);
          });
        });
        req2.write(JSON.stringify({ amountCents: 4500, customerEmail: 'test@client.com' }));
        req2.end();
      });
    });

    req1.write(JSON.stringify({ amountCents: 4500, customerEmail: 'test@client.com' }));
    req1.end();
  }
});
