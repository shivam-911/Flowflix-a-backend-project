# FlowFlix API Documentation

## Base URL
```
http://localhost:8080
```

## Authentication
All protected routes require JWT token in header:
```
Authorization: Bearer <your_jwt_token>
```

## Auth Endpoints

### Register User
```http
POST /register
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123",
  "fullName": "John Doe"
}
```

### Login User
```http
POST /login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "username": "john_doe",
    "email": "john@example.com"
  }
}
```

## Video Endpoints

### Upload Video
```http
POST /videos/
Authorization: Bearer <token>
Content-Type: multipart/form-data

{
  "title": "My Video",
  "description": "Video description",
  "videoFile": <video_file>,
  "thumbnail": <thumbnail_file>
}
```

### Get Video Details
```http
GET /videos/:videoId
```

### Like/Unlike Video
```http
POST /videos/:videoId/like
Authorization: Bearer <token>
```

### Add Comment
```http
POST /videos/:videoId/comment
Authorization: Bearer <token>
Content-Type: application/json

{
  "content": "Great video!"
}
```

### Get Comments
```http
GET /videos/:videoId/comments
```

## Channel Endpoints

### Get Channel Stats
```http
GET /channels/:channelId/stats
```

### Subscribe to Channel
```http
POST /channels/:channelId/subscribe
Authorization: Bearer <token>
```

### Get Subscriptions
```http
GET /users/subscriptions
Authorization: Bearer <token>
```

## Playlist Endpoints

### Create Playlist
```http
POST /playlists/
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "My Playlist",
  "description": "Playlist description",
  "isPublic": true
}
```

### Add Video to Playlist
```http
POST /playlists/:playlistId/videos
Authorization: Bearer <token>
Content-Type: application/json

{
  "videoId": "video_id_here"
}
```

### Get User Playlists
```http
GET /users/playlists
Authorization: Bearer <token>
```

## User Endpoints

### Get User Profile
```http
GET /users/profile
Authorization: Bearer <token>
```

### Update User Profile
```http
PUT /users/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "fullName": "Updated Name",
  "bio": "Updated bio"
}
```

### Get Watch History
```http
GET /users/watch-history
Authorization: Bearer <token>
```

## Error Responses

```json
{
  "success": false,
  "message": "Error message here",
  "error": "Detailed error info"
}
```

## Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error