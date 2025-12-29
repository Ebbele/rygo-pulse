```text
    ____                                ____        __             
   / __ \__  ______  ____              / __ \__  __/ /_______    
  / /_/ / / / / __ `/ __ \    ____    / /_/ / / / / / ___/ _ \   
 / _, _/ /_/ / /_/ / /_/ /   /___/   / ____/ /_/ / (__  )  __/   
/_/ |_|\__, /\__, /\____/           /_/    \__,_/_/____/\___/    
      /____/ /___/                                              
      >> React + RSBuild + Go + GraphQL SSE
```

**rygo-pulse** ⚡ The ultimate React 19 + Go boilerplate for lightning-fast GraphQL Subscriptions via SSE

--- 

#### THIS README MARKS THE VERY BEGINNING AND IS STILL WIP 

#### 🛰️ The Real-Time Heartbeat for Modern Apps

Stop over-engineering with WebSockets for simple data streams. **Rygo-Pulse** leverages **Server-Sent Events (SSE)** to "pulse" GraphQL Subscriptions directly from a high-performance Go engine into a React 19 frontend.

This boilerplate is meticulously crafted for **Developer Experience** and **Runtime Efficiency**.

---

#### 💎 Highlights
**⚡ RSBuild Speed**:
Say goodbye to sluggish bundlers. Powered by RSBuild (Rspack-based), get HMR in milliseconds.

**⚛️ React 19**: Built for the future. Uses the latest hooks and concurrent features for buttery-smooth UI updates.

**🐹 Go-Powered**: A robust Golang core using **gqlgen** with a lightweight, thread-safe internal Pub/Sub pattern.

**📡 SSE Transport**: Native GraphQL Subscriptions over HTTP – firewall-friendly, low-latency, and zero WebSocket overhead.

---

**📂 Project Structure**

```Plaintext
.
├── backend/                # Golang Service
│   ├── graph/              # GraphQL Schema & Resolvers (gqlgen)
│   ├── internal/           # Pub/Sub Logic & SSE Transport Layer
│   └── server.go           # HTTP/2 Entry Point & Router
├── web/                    # React 19 App
│   ├── src/                # Custom Hooks & Subscription Logic
│   └── rsbuild.config.ts   # Optimized Build Configuration
└── docker-compose.yml      # TO BE INCLUDED ?! Spin up the full stack in seconds
```
---
**🚀 Quick Start**

- Fire up the __Backend__

    ```bash
    Bash
    
    cd backend
    go mod download
    go run server.go
    ```
- Ignite the __Frontend__

    ```bash
    cd frontend
    npm install
    npm run dev
    ```

Your app is now pulsing at http://localhost:3000.

---

#### 🛠️ Deep Dive: The SSE Pulse
In this boilerplate, I deliberately avoid `graphql-ws`. Instead, the backend implements an SSE event stream:

 - **Client** initiates a subscription via a standard HTTP request.
 - **Go Backend** registers a unique channel in the internal Pub/Sub system.
 - **SSE Handler** pipes events into a `text/event-stream` response.
 - **React 19** utilizes a streamlined hook to map the stream into the UI state without unnecessary re-renders.

--- 

##### 🤝 Contributing
Have an idea to make the pulse even faster? PRs are welcome! This project is meant to be a playground and a rock-solid template for the community and everyone who needs some kind of starter for a graphQL powered subscription system.

--- 

_Developed for speed, simplicity, and reliability. Keep the pulse running!_
