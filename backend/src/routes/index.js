// Path handling logic for all routes
const url = require('url');

module.exports = (req, res, db) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const parsedUrl = url.parse(req.url, true);

  // Handle delete message by id
  if (parsedUrl.pathname.startsWith('/api/messages/') && req.method === 'DELETE') {
    const id = parsedUrl.pathname.split('/').pop();
    db.run('DELETE FROM messages WHERE id = ?', [id], function (err) {
      if (err) {
        res.writeHead(500);
        res.end('DB error');
      } else {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true }));
      }
    });
    return;
  }

  // Handle contact messages
  if (parsedUrl.pathname === '/api/messages') {
    if (req.method === 'GET') {
      db.all('SELECT * FROM messages ORDER BY created_at DESC', [], (err, rows) => {
        if (err) {
          res.writeHead(500);
          res.end('DB error');
        } else {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(rows));
        }
      });
    } else if (req.method === 'POST') {
      let body = '';
      req.on('data', chunk => { body += chunk; });
      req.on('end', () => {
        try {
          const data = JSON.parse(body);
          db.run(
            'INSERT INTO messages (name, email, message) VALUES (?, ?, ?)',
            [data.name, data.email, data.message],
            function (err) {
              if (err) {
                res.writeHead(500);
                res.end('DB error');
              } else {
                res.writeHead(201, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true, id: this.lastID }));
              }
            }
          );
        } catch (e) {
          res.writeHead(400);
          res.end('Invalid JSON');
        }
      });
    } else {
      res.writeHead(405);
      res.end();
    }
    return;
  }

  // Handle reservations
  if (parsedUrl.pathname === '/api/reservations') {
    if (req.method === 'GET') {
      db.all('SELECT * FROM reservations ORDER BY created_at DESC', [], (err, rows) => {
        if (err) {
          res.writeHead(500);
          res.end('DB error');
        } else {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(rows));
        }
      });
    } else if (req.method === 'POST') {
      let body = '';
      req.on('data', chunk => { body += chunk; });
      req.on('end', () => {
        try {
          const data = JSON.parse(body);
          db.run(
            'INSERT INTO reservations (name, phoneNumber, date, time, guests, note) VALUES (?, ?, ?, ?, ?, ?)',
            [data.name || '', data.phoneNumber || '', data.date, data.time, data.guests, data.note || ''],
            function (err) {
              if (err) {
                res.writeHead(500);
                res.end('DB error');
              } else {
                res.writeHead(201, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true, id: this.lastID }));
              }
            }
          );
        } catch (e) {
          res.writeHead(400);
          res.end('Invalid JSON');
        }
      });
    } else {
      res.writeHead(405);
      res.end();
    }
    return;
  }

  // Not found
  res.writeHead(404);
  res.end('Not found');
};
