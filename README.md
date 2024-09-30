# Node.js Load Balancer

## Overview
This project implements a simple load balancer using the **Round Robin** algorithm in Node.js. It distributes client requests across multiple servers in a sequential manner, ensuring efficient load distribution and high availability.

## Features
- Implements Round Robin load balancing.
- Balances requests across multiple backend servers.
- Easy to set up and extend.

## Installation and Usage
1. **Clone the repository, install dependencies, and start the servers**:
   ```bash
   git clone https://github.com/your-username/load-balancer.git
   cd load-balancer
   npm install

2.**Start the load balancer and backend servers**:
  ```bash
  node balancer.js
  node server1.js
  node server2.js
  node server3.js
  node server4.js
```

3.**Test the load balancer**:
  ```bash
  curl http://localhost:3000
```

## Example Output
```bash
PS C:\Users\DELL\load-balancer> node balancer.js
Load Balancer is running on http://localhost:3000
┌─────────┬─────────────────────────┬─────────────┬───────────────────────────────────────┐
│ (index) │ Server URL              │ Status      │ Response                              │
├─────────┼─────────────────────────┼─────────────┼───────────────────────────────────────┤
│ 0       │ 'http://localhost:3001' │ 'Healthy'   │ 'Healthy'                             │
│ 1       │ 'http://localhost:3002' │ 'Unhealthy' │ 'Request failed with status code 500' │
│ 2       │ 'http://localhost:3003' │ 'Healthy'   │ 'Healthy'                             │
│ 3       │ 'http://localhost:3004' │ 'Healthy'   │ 'Healthy'                             │
└─────────┴─────────────────────────┴─────────────┴───────────────────────────────────────┘
Forwarding request to http://localhost:3001
```



