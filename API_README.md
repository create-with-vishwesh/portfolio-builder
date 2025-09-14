# Portfolio API Documentation

## Overview
The Portfolio API provides endpoints for authenticated users to manage their portfolio data, including personal information, skills, and projects.

## Base URL
```
http://localhost:3001/api/portfolio
```

## Authentication
All endpoints require user authentication via NextAuth session. Users can only access their own portfolio data.

## Endpoints

### GET /api/portfolio
Fetches the authenticated user's portfolio data.

**Response:**
```json
{
  "portfolio": {
    "id": "string",
    "userId": "string", 
    "slug": "string",
    "aboutMe": "string",
    "jobTitle": "string",
    "profileImage": "string",
    "socialLinks": {
      "linkedin": "string",
      "github": "string", 
      "twitter": "string",
      "website": "string"
    },
    "isPublic": boolean,
    "projects": [
      {
        "id": "string",
        "title": "string",
        "description": "string",
        "projectUrl": "string", 
        "githubUrl": "string",
        "imageUrl": "string",
        "technologies": ["string"],
        "order": number
      }
    ],
    "skills": [
      {
        "id": "string", 
        "name": "string",
        "category": "string",
        "level": "string",
        "order": number
      }
    ],
    "createdAt": "string",
    "updatedAt": "string"
  }
}
```

### POST /api/portfolio
Creates or updates the authenticated user's portfolio data.

**Request Body:**
```json
{
  "aboutMe": "string (optional)",
  "jobTitle": "string (optional)", 
  "profileImage": "string (optional)",
  "socialLinks": {
    "linkedin": "string (optional)",
    "github": "string (optional)",
    "twitter": "string (optional)", 
    "website": "string (optional)"
  },
  "projects": [
    {
      "title": "string (required)",
      "description": "string (optional)",
      "projectUrl": "string (optional)",
      "githubUrl": "string (optional)", 
      "imageUrl": "string (optional)",
      "technologies": ["string"] 
    }
  ],
  "skills": [
    {
      "name": "string (required)",
      "category": "string (optional, default: 'Other')",
      "level": "string (optional, default: 'Intermediate')"
    }
  ],
  "isPublic": "boolean (optional, default: false)"
}
```

**Response:**
```json
{
  "message": "Portfolio saved successfully",
  "portfolio": {
    // Same structure as GET response
  }
}
```

## Error Responses

### 401 Unauthorized
```json
{
  "error": "Unauthorized"
}
```

### 404 User Not Found
```json
{
  "error": "User not found"
}
```

### 400 Bad Request
```json
{
  "error": "Portfolio data is required"
}
```

### 500 Internal Server Error
```json
{
  "error": "Failed to save portfolio",
  "details": "Error message"
}
```

## Features

### Data Validation
- Filters out empty project titles and skill names
- Provides default values for optional fields
- Validates required authentication

### Database Operations
- Uses database transactions for consistency
- Implements upsert pattern (create or update)
- Handles cascade operations for related data
- Maintains proper ordering for projects and skills

### Security
- Authentication required for all operations
- Users can only access their own data
- Input sanitization and validation
- Error handling without exposing sensitive information

## Usage Examples

### Frontend Integration (React/Next.js)

```typescript
// Fetch portfolio data
const fetchPortfolio = async () => {
  const response = await fetch('/api/portfolio');
  const data = await response.json();
  return data.portfolio;
};

// Save portfolio data
const savePortfolio = async (portfolioData) => {
  const response = await fetch('/api/portfolio', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(portfolioData),
  });
  
  if (!response.ok) {
    throw new Error('Failed to save portfolio');
  }
  
  return response.json();
};
```

### Testing in Browser Console

```javascript
// Test API (run in browser console on authenticated page)
const testData = {
  aboutMe: "I'm a developer",
  jobTitle: "Software Engineer", 
  skills: [
    { name: "JavaScript", category: "Programming Languages", level: "Advanced" }
  ],
  projects: [
    { title: "My App", description: "A cool app", technologies: ["React", "Node.js"] }
  ]
};

// Save data
fetch('/api/portfolio', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(testData)
}).then(r => r.json()).then(console.log);

// Fetch data
fetch('/api/portfolio').then(r => r.json()).then(console.log);
```