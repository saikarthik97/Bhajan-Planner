# Backend Integration Guide

## Database Schema

### Bhajans Table

```sql
CREATE TABLE bhajans (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    deity VARCHAR(100) NOT NULL,
    beat INT NOT NULL,
    speed VARCHAR(50) NOT NULL,
    date_sung DATE,
    lyrics TEXT,
    audio_url VARCHAR(500),
    video_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE INDEX idx_deity ON bhajans(deity);
CREATE INDEX idx_date_sung ON bhajans(date_sung);
CREATE INDEX idx_beat ON bhajans(beat);
CREATE INDEX idx_speed ON bhajans(speed);
```

### Users Table (for Admin)

```sql
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'admin',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP
);
```

### Playlists Table (Future Enhancement)

```sql
CREATE TABLE playlists (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    created_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES users(id)
);

CREATE TABLE playlist_bhajans (
    playlist_id INT,
    bhajan_id INT,
    sequence_order INT,
    PRIMARY KEY (playlist_id, bhajan_id),
    FOREIGN KEY (playlist_id) REFERENCES playlists(id),
    FOREIGN KEY (bhajan_id) REFERENCES bhajans(id)
);
```

---

## API Endpoints

### Base URL
```
Production: https://api.premsadanplanner.com/v1
Development: http://localhost:3000/api/v1
```

### Authentication
All admin endpoints require JWT token in header:
```
Authorization: Bearer <token>
```

---

## Bhajan Endpoints

### 1. Get All Bhajans
```
GET /bhajans
```

**Query Parameters:**
- `page` (int): Page number (default: 1)
- `limit` (int): Items per page (default: 50)
- `deity` (string): Filter by deity
- `beat` (int): Filter by beat (6 or 7)
- `speed` (string): Filter by speed
- `search` (string): Search by name

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Ganesha Sharanam",
      "deity": "ganesha",
      "beat": 6,
      "speed": "medium",
      "dateSung": "2024-01-15",
      "lyrics": "Full lyrics...",
      "audioUrl": "https://...",
      "videoUrl": "https://..."
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 50,
    "total": 100,
    "pages": 2
  }
}
```

### 2. Get Single Bhajan
```
GET /bhajans/:id
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Ganesha Sharanam",
    "deity": "ganesha",
    "beat": 6,
    "speed": "medium",
    "dateSung": "2024-01-15",
    "lyrics": "Full lyrics...",
    "audioUrl": "https://...",
    "videoUrl": "https://..."
  }
}
```

### 3. Search Bhajans
```
POST /bhajans/search
```

**Request Body:**
```json
{
  "name": "ganesha",
  "deity": "ganesha",
  "beat": [6, 7],
  "speed": ["slow", "medium"],
  "dateFrom": "2024-01-01",
  "dateTo": "2024-12-31"
}
```

**Response:**
```json
{
  "success": true,
  "data": [...],
  "count": 5
}
```

### 4. Create Bhajan (Admin Only)
```
POST /bhajans
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "name": "New Bhajan Name",
  "deity": "sai",
  "beat": 6,
  "speed": "medium",
  "dateSung": "2024-03-15",
  "lyrics": "Full lyrics...",
  "audioUrl": "https://...",
  "videoUrl": "https://..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Bhajan created successfully",
  "data": {
    "id": 11,
    "name": "New Bhajan Name",
    ...
  }
}
```

### 5. Update Bhajan (Admin Only)
```
PUT /bhajans/:id
Authorization: Bearer <token>
```

**Request Body:** (Only include fields to update)
```json
{
  "name": "Updated Name",
  "speed": "fast"
}
```

### 6. Delete Bhajan (Admin Only)
```
DELETE /bhajans/:id
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "message": "Bhajan deleted successfully"
}
```

---

## Authentication Endpoints

### 1. Login
```
POST /auth/login
```

**Request Body:**
```json
{
  "username": "admin",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "username": "admin",
    "email": "admin@premsadan.com",
    "role": "admin"
  }
}
```

### 2. Logout
```
POST /auth/logout
Authorization: Bearer <token>
```

### 3. Verify Token
```
GET /auth/verify
Authorization: Bearer <token>
```

---

## Statistics Endpoints

### 1. Get Dashboard Stats
```
GET /stats/dashboard
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "totalBhajans": 150,
    "bhajansByDeity": {
      "ganesha": 20,
      "sai": 35,
      "krishna": 25
    },
    "bhajansBySpeed": {
      "slow": 30,
      "medium": 60,
      "fast": 60
    },
    "recentlyAdded": [...],
    "mostPopular": [...]
  }
}
```

---

## Error Responses

All errors follow this format:

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable error message"
  }
}
```

**Common Error Codes:**
- `400`: Bad Request
- `401`: Unauthorized
- `403`: Forbidden
- `404`: Not Found
- `500`: Internal Server Error

---

## Implementation Examples

### Node.js/Express Example

```javascript
// server.js
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();
app.use(cors());
app.use(express.json());

// Database connection
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Get all bhajans
app.get('/api/v1/bhajans', async (req, res) => {
  try {
    const { deity, beat, speed, search } = req.query;
    let query = 'SELECT * FROM bhajans WHERE 1=1';
    const params = [];

    if (deity && deity !== 'all') {
      query += ' AND deity = ?';
      params.push(deity);
    }

    if (beat) {
      query += ' AND beat = ?';
      params.push(parseInt(beat));
    }

    if (speed && speed !== 'all') {
      query += ' AND speed = ?';
      params.push(speed);
    }

    if (search) {
      query += ' AND name LIKE ?';
      params.push(`%${search}%`);
    }

    const [rows] = await pool.execute(query, params);
    res.json({ success: true, data: rows });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: { code: 'SERVER_ERROR', message: error.message }
    });
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

### Python/Flask Example

```python
from flask import Flask, jsonify, request
from flask_cors import CORS
import mysql.connector
from datetime import datetime

app = Flask(__name__)
CORS(app)

# Database connection
def get_db_connection():
    return mysql.connector.connect(
        host=os.getenv('DB_HOST'),
        user=os.getenv('DB_USER'),
        password=os.getenv('DB_PASSWORD'),
        database=os.getenv('DB_NAME')
    )

@app.route('/api/v1/bhajans', methods=['GET'])
def get_bhajans():
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        
        query = "SELECT * FROM bhajans WHERE 1=1"
        params = []
        
        deity = request.args.get('deity')
        if deity and deity != 'all':
            query += " AND deity = %s"
            params.append(deity)
        
        cursor.execute(query, params)
        bhajans = cursor.fetchall()
        
        cursor.close()
        conn.close()
        
        return jsonify({'success': True, 'data': bhajans})
    except Exception as e:
        return jsonify({
            'success': False,
            'error': {'code': 'SERVER_ERROR', 'message': str(e)}
        }), 500

if __name__ == '__main__':
    app.run(port=3000, debug=True)
```

---

## Frontend Integration

Update `script.js` to use API:

```javascript
// Replace bhajansDatabase array with API calls

async function fetchBhajans(filters = {}) {
    try {
        const queryParams = new URLSearchParams(filters);
        const response = await fetch(`https://api.premsadanplanner.com/v1/bhajans?${queryParams}`);
        const result = await response.json();
        
        if (result.success) {
            return result.data;
        } else {
            throw new Error(result.error.message);
        }
    } catch (error) {
        console.error('Error fetching bhajans:', error);
        alert('Failed to fetch bhajans. Please try again.');
        return [];
    }
}

// Updated search function
async function searchByName() {
    const searchTerm = document.getElementById('nameSearch').value.toLowerCase().trim();
    
    if (!searchTerm) {
        alert('Please enter a bhajan name to search');
        return;
    }

    const results = await fetchBhajans({ search: searchTerm });
    displayResults(results, `Search results for: "${searchTerm}"`);
}
```

---

## Security Best Practices

1. **Use HTTPS**: Always use SSL/TLS
2. **Hash Passwords**: Use bcrypt with salt rounds >= 10
3. **JWT Tokens**: Use secure secret key, set expiration
4. **Rate Limiting**: Implement rate limiting on all endpoints
5. **Input Validation**: Validate and sanitize all inputs
6. **SQL Injection**: Use parameterized queries
7. **CORS**: Configure CORS properly
8. **Environment Variables**: Never commit secrets to git

---

## Testing

### Example Test Cases

```javascript
// test/bhajans.test.js
const request = require('supertest');
const app = require('../server');

describe('GET /api/v1/bhajans', () => {
  it('should return all bhajans', async () => {
    const res = await request(app).get('/api/v1/bhajans');
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it('should filter by deity', async () => {
    const res = await request(app).get('/api/v1/bhajans?deity=ganesha');
    expect(res.statusCode).toBe(200);
    expect(res.body.data.every(b => b.deity === 'ganesha')).toBe(true);
  });
});
```

---

## Deployment

### Backend Deployment Options

1. **Heroku**: Easy deployment, free tier available
2. **AWS**: EC2, Lambda, or Elastic Beanstalk
3. **Google Cloud**: App Engine or Cloud Run
4. **DigitalOcean**: Droplets or App Platform
5. **Railway**: Modern platform, easy deployment

### Environment Variables

```bash
# .env file (never commit this!)
DB_HOST=your-database-host
DB_USER=your-database-user
DB_PASSWORD=your-database-password
DB_NAME=premsadan_planner
JWT_SECRET=your-super-secret-jwt-key
PORT=3000
NODE_ENV=production
```

---

This guide provides everything needed to implement a full backend for the Premsadan Planner!
