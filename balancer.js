import http from 'http';
import chalk from 'chalk';
import axios from 'axios';
import readline from 'readline';

// Create an interface for reading input from the terminal
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// Create an array to hold the servers
const servers = [];
let currentIndex = 0; // Index to track the last used server

// Function to add servers manually
function addServers(callback) {
    rl.question("How many servers do you want to add? ", (numberOfServers) => {
        const numServers = parseInt(numberOfServers, 10);
        let count = 0;

        const askForUrl = () => {
            if (count < numServers) {
                rl.question(`Enter URL for server ${count + 1}: `, (url) => {
                    servers.push(url);
                    console.log(`Server ${url} added.`);
                    count++;
                    askForUrl(); 
                });
            } else {
                callback(); // Proceed to start the load balancer
            }
        };

        askForUrl(); 
    });
}

// Function to check the health of the servers
async function checkServerHealth() {
    const healthStatus = await Promise.all(servers.map(async (server) => {
        try {
            const response = await axios.get(`${server}/health`);
            return { url: server, status: 'Healthy', response: response.data };
        } catch (error) {
            return { url: server, status: 'Unhealthy', response: error.message };
        }
    }));
    
    return healthStatus;
}

// Function to display the server health in a table format
function displayServerHealth(healthStatus) {
    console.clear();
    console.log(chalk.green(`Load Balancer is running on http://localhost:3000`));
    
    const healthTable = healthStatus.map(server => ({
        'Server URL': server.url,
        'Status': server.status,
        'Response': server.response
    }));
    
    console.table(healthTable);
}

// Function to forward requests to healthy servers using Round Robin
async function forwardRequest(request) {
    const healthStatus = await checkServerHealth();
    displayServerHealth(healthStatus);
    
    const healthyServers = healthStatus.filter(server => server.status === 'Healthy');
    
    if (healthyServers.length > 0) {
        // Use Round Robin to select the next server
        const serverToForward = healthyServers[currentIndex];
        console.log(chalk.yellow(`Forwarding request to ${serverToForward.url}`));
        
        // Update the index for the next request
        currentIndex = (currentIndex + 1) % healthyServers.length; // Wrap around using modulo
    } else {
        console.log(chalk.red('No healthy servers available to forward the request.'));
    }
}

// Main function to start the load balancer
async function startLoadBalancer() {
    addServers(() => {
        const server = http.createServer(async (req, res) => {
            await forwardRequest(req);
            res.end();
        });

        server.listen(3000, () => {
            console.log(chalk.green('Load Balancer is running on http://localhost:3000'));
        });
    });
}

startLoadBalancer();
