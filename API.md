# 📘 Flowflix API Documentation

> Base URL: `http://localhost:PORT/api/v1/`

---

## 🔰 Authentication

Some routes may require authentication via **Bearer Token**.

**Header Format:**

```
Authorization: Bearer <JWT_TOKEN>
```

---

## 🩺 Healthcheck

### GET `/healthcheck`

* **Description**: Test if the API is up and running.
* **Auth**: ❌ Not required
* **Response**: `200 OK`

---

## 👤 User Routes

### POST `/users/register`

* **Description**: Register a new user with profile info and avatar.
* **Auth**: ❌ Not required
* **Body (form-data)**:

  * fullname (text)
  * email (text)
  * username (text)
  * password (text)
  * avatar (file)
  * coverImage (file)

### POST `/users/login`

* **Description**: Login with credentials.
* **Body (JSON)**:

```json
{
  "username": "user1",
  "email": "user@example.com",
  "password": "******"
}
```

### POST `/users/logout`

* **Description**: Logout current user

### POST `/users/change-password`

* **Body (JSON)**:

```json
{
  "oldPassword": "123456",
  "newPassword": "newpass"
}
```

### GET `/users/current-user`

* **Description**: Returns current logged-in user info

### PATCH `/users/update-account`

* **Body (JSON)**:

```json
{
  "fullname": "Updated Name",
  "email": "updated@example.com"
}
```

### PATCH `/users/avatar`

* **Body**: avatar (file)

### PATCH `/users/cover-image`

* **Body**: coverImage (file)

### GET `/users/history`

* **Description**: Get watch history of current user

### GET `/users/c/:username`

* **Description**: Public channel view by username

### POST `/users/refresh-token`

* **Description**: Refresh authentication access token

---

## 📺 Video Routes

### GET `/videos/`

* **Description**: Get all published videos

### POST `/videos/`

* **Body (form-data)**:

  * title
  * description
  * videoFile (file)
  * thumbnail (file)

### PATCH `/videos/:id`

* **Update Video** (e.g. thumbnail)

### GET `/videos/:id`

* **Get specific video by ID**

### DELETE `/videos/:id`

* **Delete a video**

### PATCH `/videos/toggle/publish/:id`

* **Toggle published state**

---

## 🎵 Playlist Routes

### POST `/playlist/`

* **Create Playlist**

```json
{
  "name": "likedVideos",
  "description": "my liked videos"
}
```

### GET `/playlist/user/:userId`

* **User playlists**

### GET `/playlist/:playlistId`

* **Get playlist by ID**

### PATCH `/playlist/:playlistId`

* **Update playlist**

### DELETE `/playlist/:playlistId`

* **Delete playlist**

### PATCH `/playlist/add/:videoId/:playlistId`

* **Add video to playlist**

### PATCH `/playlist/remove/:videoId/:playlistId`

* **Remove video from playlist**

---

## 🔔 Subscription Routes

### GET `/subscriptions/u/:userId`

* **Get channels subscribed to**

### POST `/subscriptions/c/:channelId`

* **Toggle subscription to a channel**

### GET `/subscriptions/c/:channelId`

* **Get all subscribers of a channel**

---

## 💬 Comment Routes

### POST `/comments/:videoId`

* **Add comment to a video**

### GET `/comments/:videoId`

* **Get comments for a video**

### PATCH `/comments/c/:commentId`

* **Update a comment**

```json
{
  "content": "Updated comment"
}
```

---

## 🐦 Tweet Routes

### POST `/tweets/`

```json
{
  "content": "Tweet content here"
}
```

### GET `/tweets/user/:userId`

* **Get tweets by user**

### PATCH `/tweets/:tweetId`

```json
{
  "content": "Updated tweet content"
}
```

### DELETE `/tweets/:tweetId`

* **Delete a tweet**

---

## ❤️ Like Routes

### POST `/likes/toggle/v/:videoId`

* **Like/unlike video**

### POST `/likes/toggle/c/:commentId`

* **Like/unlike comment**

### POST `/likes/toggle/t/:tweetId`

* **Like/unlike tweet**

### GET `/likes/videos`

* **Get liked videos**

---

## 📊 Dashboard Route

### GET `/dashboard/stats`

* **Get stats for the logged-in user/channel**

### GET `/dashboard/videos`

* **Get all videos uploaded by the logged-in user's channel**

---

### 📝 Notes:

* Replace `:id` / `:userId` / `:videoId` etc. with actual values.
* All endpoints starting with `/users`, `/videos`, etc., expect the `Authorization` header unless stated otherwise.
