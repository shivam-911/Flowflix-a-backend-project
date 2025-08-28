# 🎬 FlowFlix – YouTube Backend Clone

FlowFlix is a powerful and scalable backend API inspired by YouTube. Built using **Node.js**, **Express**, and **MongoDB**, it provides all the essential backend features you'd expect from a modern video-sharing platform — including user authentication, video uploads, comments, likes, playlists, subscriptions, and viewing history.

---
## LIVE LINK -[https://flowflix-dc7h.onrender.com/api-docs]
## 🚀 Features

- 🔐 Access & Refresh Token Authentication using JWT
- 🎥 Upload, View, Like/Dislike, and Comment on Videos
- 📁 Create and Manage Playlists
- ❤️ Subscribe to Channels and Track Subscribers
- 📊 View Watch History and Channel Statistics
- 🧑‍💼 Admin-friendly structure with middleware-based authorization

---

## 🧰 Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB (via Mongoose)
- **Auth:** JWT (Access + Refresh Tokens)
- **Tools & Libraries:** dotenv, bcrypt, multer, morgan

---

## 🛠️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/shivam-911/flowflix.git
cd flowflix
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create `.env` File in Root

```env
PORT=8080
MONGODB_URI=your_mongodb_uri
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
```

### 4. Start the Server

```bash
npm run dev
```

---

## 🔗 API Documentation

- 📘 **Swagger UI:**  
  If enabled, visit [http://localhost:8080/api-docs](http://localhost:8080/api-docs) for a full, interactive API reference.

- 📄 **Static API Docs:**  
  You can also check `API.md` for a detailed breakdown of all endpoints.

---

## 📚 Sample API Endpoints

| Method | Endpoint                    | Description                |
| ------ | --------------------------- | -------------------------- |
| POST   | `/register`                 | Register a new user        |
| POST   | `/login`                    | Login and receive tokens   |
| POST   | `/videos/`                  | Upload a new video         |
| GET    | `/videos/:id`               | Get a specific video by ID |
| POST   | `/videos/:id/comment`       | Add a comment to a video   |
| POST   | `/channels/:id/subscribe`   | Subscribe to a channel     |
| GET    | `/channels/:id/subscribers` | Get subscriber count       |
| GET    | `/users/history`            | Fetch user watch history   |

---

## 🗂️ Project Structure

```
src/
├── controllers/       # Business logic
├── routes/            # Express routes
├── models/            # MongoDB models
├── middlewares/       # Auth & error middleware
├── utils/             # Reusable helpers
└── app.js             # Main server file
```

---

## 🧪 Testing Tools

You can test the API using tools like:

- [Postman](https://www.postman.com/)
- [Thunder Client](https://www.thunderclient.com/)
- [Swagger UI](http://localhost:8080/api-docs) (if configured)

---

## 👨‍💻 Author

**Shivam Sharma**  
📍 Agra, India  
🔗 [GitHub](https://github.com/shivam-911)  
🔗 [LinkedIn](https://www.linkedin.com/in/shivam-sharma-214a8431b/)

---

## 📌 License

This project is licensed under the **MIT License** — you’re free to use, modify, and distribute it.

---
