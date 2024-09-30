import http from 'http';

const PORT = 3002; // Set this to 3002 for the unhealthy server

const server = http.createServer((req, res) => {
    if (req.url === '/health') {
        // Simulate unhealthy state
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Unhealthy'); // Response for health check
    } else {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(`Hello from Server ${PORT}`); // General response
    }
});

server.listen(PORT, () => {
    console.log(`Unhealthy Server running on http://localhost:${PORT}`);
});
