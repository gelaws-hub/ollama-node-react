# Ollama Streaming Chatbot

A simple **Node.js** application to run **Ollama** locally and stream the AI-generated responses in real time. The project consists of:

* **Vite** ⚡ for the frontend (React-based UI)
* **Express.js** 🚀 for the backend (handles API & socket connections)
* **Socket.io** 🔗 as the communication protocol (real-time streaming)

---

## 🚀 Features

* **Run Ollama locally** and generate AI responses
* **Stream responses** in real-time using WebSockets
* **Interactive chat UI** with Markdown rendering
* **Efficient, lightweight, and developer-friendly**

---

## 🛠️ Setup & Installation

### 1️⃣ Prerequisites

* [Node.js](https://nodejs.org/) (v16+ recommended)
* [Ollama](https://ollama.ai/) installed and running
* [Vite](https://vitejs.dev/) for frontend development

### 2️⃣ Clone the Repository

```bash
$ git clone https://github.com/gelaws-hub/ollama-node-react.git
$ cd ollama-node-react
```

### 3️⃣ Install Dependencies

#### Backend

```bash
$ cd server
$ npm install
```

#### Frontend

```bash
$ cd client
$ npm install
```

### 4️⃣ Run the Project

#### Start the Backend Server

```bash
$ cd server
$ npm run start
```

#### Start the Frontend (Vite Dev Server)

```bash
$ cd client
$ npm run dev
```

Now, visit **`http://localhost:5173`** to see your chatbot in action! 🎉

---

## ⚙️ Configuration

### **Backend Environment Variables** (`.env`)

```env
ORIGIN_URL=http://localhost:5173,https://anotherfrontend.com
MODEL_NAME=deepseek-r1:7b
PORT=3000
```

### **Frontend Configuration**

Copy and paste as `.env` to your backend domain:

```js
VITE_SERVER_URL=https://localhost:3000
```

---

## 📜 License

This project is **open-source** and available under the  **MIT License** .

---

## 🤝 Contributing

Got ideas to improve this project? PRs and contributions are welcome! 🔥

📌  **Author** : [Ibnu Fadhil](https://github.com/ge)
