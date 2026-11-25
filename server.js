const express = require('express');
const path = require('path');

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const HOST = '0.0.0.0';

const staticDirs = ['audio', 'css', 'ico', 'scripts'];
for (const dir of staticDirs) {
  app.use(`/${dir}`, express.static(path.join(__dirname, dir)));
}

const staticFiles = ['manifest.json', 'service-worker.js'];
for (const file of staticFiles) {
  app.get(`/${file}`, (_req, res) => {
    if (file === 'service-worker.js') {
      res.setHeader('Cache-Control', 'no-cache');
    }
    res.sendFile(path.join(__dirname, file));
  });
}

app.get('/favicon.ico', (_req, res) => {
  res.sendFile(path.join(__dirname, 'ico', 'favicon.ico'));
});

app.get(['/', '/index.html'], (_req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, HOST, () => {
  console.log(`Detective Club helper running at http://${HOST}:${PORT}`);
});
