# 🗺️ Pokedex Frontend

Welcome to the Pokedex Frontend application! This project is built with **React** and is optimized to run smoothly in both local development environments and production-ready containers using **Docker** and **Nginx**.

---

## 🛠️ Tech Stack

*   **React** (Core Library)
*   **Vite** (Build Tool & Fast Development Server)
*   **React Router** (Dynamic Route Management for `/` and `/create`)
*   **Nginx** (High-Performance Web Server for Production in Docker)

---

## 🚀 Deployment with Docker (Recommended)

To package and run the application for production using Docker, follow these steps:

### 1. Build the Docker Image
Navigate to the project root directory (where the `Dockerfile` is located) and run:
```bash
docker build -t pokedex-frontend .
```

### 2. Run the Container
Once the image is built, start the container by mapping port `3000` on your host machine:
```bash
docker run -d -p 3000:80 --name pokemon-front pokedex-frontend
```

### 3. Access the Application
Open your browser and visit:
👉 **`http://localhost:3000`**

*Note: Thanks to our custom Nginx configuration (`nginx.conf`), you can safely refresh the page (F5) on subroutes like `/create` without encountering 404 errors.*

---

## 💻 Local Development (Without Docker)

If you want to make code changes and view them in real-time:

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Development Server
```bash
npm run dev
```
The application will open by default at **`http://localhost:5173`**.

---

## 🐳 Useful Docker Commands

*   **Check running containers:**
    ```bash
    docker ps
    ```
*   **Stop the container:**
    ```bash
    docker stop pokemon-front
    ```
*   **Restart the existing container:**
    ```bash
    docker start pokemon-front
    ```
*   **View container logs (useful for debugging):**
    ```bash
    docker logs pokemon-front
    ```
*   **Remove the container:**
    ```bash
    docker rm -f pokemon-front
    ```

---
## 🗺️ Pokedex Backend
You can download the backend here https://github.com/alexheberardoramirez/pokedex/tree/main

## ⚠️ Backend Connectivity
This frontend is configured to communicate with a Spring Boot API running on port `8080`. Make sure your backend has **CORS** enabled to allow requests from both `http://localhost:3000` (Docker deployment) and `http://localhost:5173` (Local development setup).
