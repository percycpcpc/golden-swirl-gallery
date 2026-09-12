const http = require('http');
const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.join(__dirname, 'index.html'));
const BODY = '<!DOCTYPE html><title>Golden Swirl gallery</title><p><a href="/goldenswirl_carddata">/goldenswirl_carddata</a></p>';

const server = http.createServer((req, res) => {
  const url = (req.url || '/').split('?')[0];
  if (url === '/') {
    res.writeHead(302, { Location: '/goldenswirl_carddata' });
    return res.end();
  }
  if (url === '/goldenswirl_carddata' || url === '/goldenswirl_carddata/') {
    res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8',
      'Content-Length': html.length,
      'Cache-Control': 'no-cache',
    });
    return res.end(html);
  }
  res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(BODY);
});

const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`golden-swirl-gallery listening on :${port}`));
