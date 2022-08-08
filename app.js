const http = require('http');
const fs = require('fs');
const path = require('path');

const httpServer = http.createServer( (req, res) => {
    console.log(`req: ${req.url}`);
    if(req.url === '/') {
        sendRes('index.html', 'text/html', res);
    }
    else {
        sendRes(req.url, getContentType(req.url), res)
    }

}).listen(4000, () => {
    console.log('node.js port 3000');
});

function sendRes(url, contentType, res) {
    let file = path.join( __dirname+'/static/', url);
    fs.readFile(file, (err, content) => {
        if(err) {
            res.writeHead(404);
            res.write('file not found');
            res.end();
            console.log(`error 404 ${file}`);
        }
        else {
            res.writeHead(200, {'Content-Type': contentType} );
            res.write(content);
            res.end();
            console.log(`res 200 ${file}`);
        }
    })
}

function getContentType(url) {
    switch (path.extname(url)) {
        case ".html":
            return "text/html";
        case ".css":
            return "text/css";
        case ".js":
            return "text/javascript";
        case ".json":
            return "application/json";
        default:
            return "application/octate-stream";
    }
}