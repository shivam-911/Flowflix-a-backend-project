🎬 FlowFlix - YouTube Backend Clone
FlowFlix is a powerful backend API built with Node.js, Express, and MongoDB, simulating core features of a video-sharing platform like YouTube. It includes authentication, video management, comments, likes, playlists, and more.

🚀 Features
🔐 JWT-based user authentication

📺 Video upload, view, like/dislike, comment

📁 Playlists & subscriptions

📊 Channel stats & watch history

🧑‍💼 Admin-friendly structure

🧰 Tech Stack
Node.js + Express

MongoDB + Mongoose

JWT Authentication

Dotenv, bcrypt, multer

🛠️ Getting Started
Clone the repo:

bash
Copy
Edit
git clone https://github.com/shivam-911/flowflix.git
cd flowflix
Install dependencies:

bash
Copy
Edit
npm install
Add a .env file:

ini
Copy
Edit
PORT=8080
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_secret
Run the server:

bash
Copy
Edit
npm run dev
📚 API Highlights
Method	Endpoint	Function
POST	/auth/register	Register user
POST	/auth/login	Login + JWT token
POST	/videos/	Upload a video
GET	/videos/:id	Fetch video details
POST	/videos/:id/comment	Add comment
GET	/channels/:id	Channel stats

More endpoints documented in /routes.

🗂 Folder Structure
css
Copy
Edit
src/
├── controllers/
├── models/
├── routes/
├── middlewares/
├── utils/
└── app.js
👨‍💻 Author
Shivam Sharma
🚩 Agra, India
🔗 GitHub | LinkedIn

