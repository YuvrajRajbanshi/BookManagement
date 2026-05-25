# Book Management System - Backend API

A clean, production-ready REST API for managing books built with Node.js, Express.js, and MongoDB.

## Features

- ✅ Complete CRUD operations for books
- ✅ MongoDB integration with Mongoose
- ✅ Search books by title or author
- ✅ Filter books by genre
- ✅ Proper error handling and validation
- ✅ CORS enabled for frontend integration
- ✅ Health check endpoint
- ✅ Clean, modular architecture
- ✅ Async/await patterns
- ✅ Environment variable configuration

## Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **dotenv** - Environment variables
- **CORS** - Cross-origin resource sharing
- **nodemon** - Development auto-reload

## Project Structure

```
server/
├── src/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── controllers/
│   │   └── bookController.js     # CRUD operations
│   ├── models/
│   │   └── Book.js               # Mongoose schema
│   ├── routes/
│   │   └── bookRoutes.js         # API routes
│   ├── middleware/
│   │   └── errorMiddleware.js    # Error handling
│   ├── app.js                    # Express app setup
│   └── server.js                 # Server entry point
├── .env                          # Environment variables
├── .env.example                  # Example env file
├── package.json                  # Dependencies
└── README.md                     # This file
```

## Getting Started

### Prerequisites

- Node.js 14+ and npm
- MongoDB Atlas account (free tier available)

### Installation

1. **Navigate to server directory:**

   ```bash
   cd server
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Setup MongoDB Atlas:**
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create a free account
   - Create a new cluster
   - Create a database user with username and password
   - Get your connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/book-management?retryWrites=true&w=majority`)

4. **Configure environment variables:**

   ```bash
   # Copy the example file
   cp .env.example .env
   ```

5. **Update `.env` with your MongoDB connection string:**
   ```env
   PORT=5000
   MONGO_URI=mongodb+srv://your_username:your_password@cluster.mongodb.net/book-management?retryWrites=true&w=majority
   NODE_ENV=development
   ```

### Running the Server

**Development mode (with auto-reload):**

```bash
npm run dev
```

**Production mode:**

```bash
npm start
```

The server will start on `http://localhost:5000`

**Health check:**

```
http://localhost:5000/health
```

## API Endpoints

### Books

#### Get All Books

```
GET /api/books
```

**Response (200):**

```json
{
  "success": true,
  "message": "Books retrieved successfully",
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "The Great Gatsby",
      "author": "F. Scott Fitzgerald",
      "genre": "Fiction",
      "publicationYear": 1925,
      "createdAt": "2024-05-25T10:30:00Z",
      "updatedAt": "2024-05-25T10:30:00Z"
    }
  ],
  "count": 1
}
```

#### Get Single Book

```
GET /api/books/:id
```

**Response (200):**

```json
{
  "success": true,
  "message": "Book retrieved successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "genre": "Fiction",
    "publicationYear": 1925,
    "createdAt": "2024-05-25T10:30:00Z",
    "updatedAt": "2024-05-25T10:30:00Z"
  }
}
```

**Error Response (404):**

```json
{
  "success": false,
  "message": "Book not found",
  "status": 404
}
```

#### Create Book

```
POST /api/books
Content-Type: application/json

{
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "genre": "Fiction",
  "publicationYear": 1925
}
```

**Response (201):**

```json
{
  "success": true,
  "message": "Book created successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "genre": "Fiction",
    "publicationYear": 1925,
    "createdAt": "2024-05-25T10:30:00Z",
    "updatedAt": "2024-05-25T10:30:00Z"
  }
}
```

**Error Response (400):**

```json
{
  "success": false,
  "message": "Validation Error: Please provide a book title",
  "status": 400
}
```

#### Update Book

```
PUT /api/books/:id
Content-Type: application/json

{
  "title": "The Great Gatsby (Revised)",
  "author": "F. Scott Fitzgerald",
  "genre": "Fiction",
  "publicationYear": 1925
}
```

**Response (200):**

```json
{
  "success": true,
  "message": "Book updated successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "The Great Gatsby (Revised)",
    "author": "F. Scott Fitzgerald",
    "genre": "Fiction",
    "publicationYear": 1925,
    "createdAt": "2024-05-25T10:30:00Z",
    "updatedAt": "2024-05-25T10:35:00Z"
  }
}
```

#### Delete Book

```
DELETE /api/books/:id
```

**Response (200):**

```json
{
  "success": true,
  "message": "Book deleted successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "genre": "Fiction",
    "publicationYear": 1925,
    "createdAt": "2024-05-25T10:30:00Z",
    "updatedAt": "2024-05-25T10:30:00Z"
  }
}
```

#### Search Books

```
GET /api/books/search?search=Gatsby
```

**Response (200):**

```json
{
  "success": true,
  "message": "Search completed successfully",
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "The Great Gatsby",
      "author": "F. Scott Fitzgerald",
      "genre": "Fiction",
      "publicationYear": 1925,
      "createdAt": "2024-05-25T10:30:00Z",
      "updatedAt": "2024-05-25T10:30:00Z"
    }
  ],
  "count": 1
}
```

#### Filter by Genre

```
GET /api/books/filter?genre=Fiction
```

**Response (200):**

```json
{
  "success": true,
  "message": "Books filtered successfully",
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "The Great Gatsby",
      "author": "F. Scott Fitzgerald",
      "genre": "Fiction",
      "publicationYear": 1925,
      "createdAt": "2024-05-25T10:30:00Z",
      "updatedAt": "2024-05-25T10:30:00Z"
    }
  ],
  "count": 1
}
```

#### Health Check

```
GET /health
```

**Response (200):**

```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2024-05-25T10:30:00Z"
}
```

## Supported Genres

- Fiction
- Non-Fiction
- Mystery
- Science Fiction
- Fantasy
- Romance
- Biography
- History

## Book Model

### Schema Fields

| Field             | Type   | Required | Validation                        |
| ----------------- | ------ | -------- | --------------------------------- |
| `title`           | String | Yes      | Max 200 characters, non-empty     |
| `author`          | String | Yes      | Max 100 characters, non-empty     |
| `genre`           | String | Yes      | Must be from supported genres     |
| `publicationYear` | Number | Yes      | Between 1000 and current year + 1 |
| `createdAt`       | Date   | Auto     | Set automatically                 |
| `updatedAt`       | Date   | Auto     | Set automatically                 |

## Error Handling

The API uses standardized error responses:

### Validation Error (400)

```json
{
  "success": false,
  "message": "Validation Error: Invalid field",
  "status": 400
}
```

### Not Found Error (404)

```json
{
  "success": false,
  "message": "Book not found",
  "status": 404
}
```

### Server Error (500)

```json
{
  "success": false,
  "message": "Internal Server Error",
  "status": 500
}
```

## Testing with cURL

### Get all books

```bash
curl http://localhost:5000/api/books
```

### Create a book

```bash
curl -X POST http://localhost:5000/api/books \
  -H "Content-Type: application/json" \
  -d '{
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "genre": "Fiction",
    "publicationYear": 1925
  }'
```

### Update a book

```bash
curl -X PUT http://localhost:5000/api/books/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "The Great Gatsby (Updated)",
    "author": "F. Scott Fitzgerald",
    "genre": "Fiction",
    "publicationYear": 1925
  }'
```

### Delete a book

```bash
curl -X DELETE http://localhost:5000/api/books/507f1f77bcf86cd799439011
```

### Search books

```bash
curl "http://localhost:5000/api/books/search?search=Gatsby"
```

### Filter by genre

```bash
curl "http://localhost:5000/api/books/filter?genre=Fiction"
```

## Frontend Integration

The frontend React app should connect to this backend by updating the environment variable:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

## Available npm Scripts

- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server
- `npm test` - Run tests (to be configured)

## Best Practices Implemented

✅ **Async/Await** - Modern error handling
✅ **Environment Variables** - Secure configuration
✅ **Modular Structure** - Separation of concerns
✅ **Error Middleware** - Centralized error handling
✅ **Input Validation** - Mongoose schema validation
✅ **HTTP Status Codes** - Proper status codes
✅ **CORS** - Frontend integration ready
✅ **Meaningful Names** - Clear, readable code
✅ **No Hardcoding** - Configuration via env

## Troubleshooting

### MongoDB Connection Error

- Verify MongoDB URI in `.env`
- Check network access in MongoDB Atlas
- Ensure IP is whitelisted in MongoDB Atlas

### Port Already in Use

- Change PORT in `.env`
- Or kill the process using port 5000

### Module Not Found

- Run `npm install`
- Ensure `package.json` is in the correct location

## Deployment

To deploy this backend:

1. **Heroku:** Push to Heroku with proper environment variables
2. **Railway:** Connect GitHub repo and add MongoDB URI
3. **Render:** Similar to Railway with native deployment support
4. **AWS/GCP:** Use your preferred Node.js hosting service

Set environment variables in your hosting platform:

- `MONGO_URI` - MongoDB connection string
- `PORT` - Server port
- `NODE_ENV` - Set to "production"

## License

MIT

## Support

For issues or questions, please check the main project README or create an issue in the repository.
