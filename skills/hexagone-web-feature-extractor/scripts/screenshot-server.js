const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8765;
const SAVE_DIR = '/home/claude/screenshots';

if (!fs.existsSync(SAVE_DIR)) fs.mkdirSync(SAVE_DIR, { recursive: true });

const BRIDGE_HTML = `<!DOCTYPE html>
<html><head><title>Screenshot Bridge</title>
<style>
  body { font-family: Arial; padding: 20px; background: #f5f5f5; }
  .box { background: white; padding: 20px; border-radius: 8px; margin: 10px 0; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
  #status { color: green; font-weight: bold; }
  #log { background: #222; color: #0f0; padding: 10px; border-radius: 4px; font-family: monospace; font-size: 12px; max-height: 200px; overflow-y: auto; }
</style>
</head><body>
<h2>Screenshot Bridge</h2>
<div class="box">
  <label>Filename: <input type="text" id="filename" value="screenshot.jpg" size="40"/></label><br><br>
  <input type="file" id="fileInput" accept="image/*"/>
  <p id="status">En attente...</p>
</div>
<div class="box"><h3>Log</h3><div id="log"></div></div>
<script>
const log = (msg) => {
  const d = document.getElementById('log');
  d.innerHTML += new Date().toLocaleTimeString() + ' - ' + msg + '<br>';
  d.scrollTop = d.scrollHeight;
};

document.getElementById('fileInput').addEventListener('change', async (e) => {
  const file = e.target.files[0];
  if (!file) return;
  
  const fname = document.getElementById('filename').value || file.name;
  document.getElementById('status').textContent = 'Upload en cours...';
  log('Uploading: ' + fname + ' (' + (file.size/1024).toFixed(1) + ' KB)');
  
  const formData = new FormData();
  formData.append('file', file);
  formData.append('filename', fname);
  
  try {
    const res = await fetch('/upload', { method: 'POST', body: formData });
    const json = await res.json();
    if (json.ok) {
      document.getElementById('status').textContent = 'OK: ' + json.path;
      log('Saved: ' + json.path);
    } else {
      document.getElementById('status').textContent = 'Erreur: ' + json.error;
      log('Error: ' + json.error);
    }
  } catch (err) {
    document.getElementById('status').textContent = 'Erreur réseau';
    log('Network error: ' + err.message);
  }
  
  // Reset file input for next upload
  e.target.value = '';
});

log('Bridge ready. Waiting for screenshots...');
</script>
</body></html>`;

const server = http.createServer((req, res) => {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  
  if (req.method === 'GET' && (req.url === '/' || req.url === '/bridge.html')) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(BRIDGE_HTML);
    return;
  }
  
  if (req.method === 'POST' && req.url === '/upload') {
    const chunks = [];
    req.on('data', c => chunks.push(c));
    req.on('end', () => {
      const body = Buffer.concat(chunks);
      
      // Parse multipart form data (simple parser)
      const boundary = req.headers['content-type'].split('boundary=')[1];
      const parts = parseMultipart(body, boundary);
      
      const filePart = parts.find(p => p.name === 'file');
      const filenamePart = parts.find(p => p.name === 'filename');
      
      if (!filePart) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: false, error: 'No file' }));
        return;
      }
      
      const filename = (filenamePart ? filenamePart.data.toString().trim() : filePart.filename) || 'screenshot.jpg';
      const safeName = filename.replace(/[^a-zA-Z0-9._-]/g, '_');
      const savePath = path.join(SAVE_DIR, safeName);
      
      fs.writeFileSync(savePath, filePart.data);
      console.log(`Saved: ${savePath} (${filePart.data.length} bytes)`);
      
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ ok: true, path: savePath, size: filePart.data.length }));
    });
    return;
  }
  
  res.writeHead(404);
  res.end('Not found');
});

function parseMultipart(body, boundary) {
  const parts = [];
  const delimiter = Buffer.from('--' + boundary);
  const endDelimiter = Buffer.from('--' + boundary + '--');
  
  let start = 0;
  while (true) {
    const idx = body.indexOf(delimiter, start);
    if (idx === -1) break;
    
    if (start > 0) {
      const partData = body.slice(start, idx - 2); // -2 for \r\n before delimiter
      const headerEnd = partData.indexOf('\r\n\r\n');
      if (headerEnd !== -1) {
        const headers = partData.slice(0, headerEnd).toString();
        const data = partData.slice(headerEnd + 4);
        
        const nameMatch = headers.match(/name="([^"]+)"/);
        const filenameMatch = headers.match(/filename="([^"]+)"/);
        
        parts.push({
          name: nameMatch ? nameMatch[1] : '',
          filename: filenameMatch ? filenameMatch[1] : '',
          data
        });
      }
    }
    
    start = idx + delimiter.length + 2; // +2 for \r\n after delimiter
    if (body.indexOf(endDelimiter, idx) === idx) break;
  }
  
  return parts;
}

server.listen(PORT, () => {
  console.log(`Screenshot bridge server running on http://localhost:${PORT}`);
  console.log(`Screenshots will be saved to ${SAVE_DIR}/`);
});
