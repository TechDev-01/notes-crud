# Notes API
An API REST to manage user notes: create, update, delete and read.
This API includes authentication, access control over routes and basic CRUD operations.

# Tech Stack
- **Node.js**
- **Express**
- **MySQL**
- **JWT** for authentication

# Run locally

## Clone the repository
```
git clone https://github.com/TechDev-01/notes-crud.git
```

## Navigate to the project directory
```
cd notes-crud
```
## Install the dependencies
```
npm install
```
## Set up environment variables
```
cp .env.example .env
```
## Run the server
```
npm run dev
```

# Endpoints

## Users

### POST /api/register
- Create a new user in the database
```
body: {
  "username": "john",
  "password": "1234"
}
```

### POST /api/login
- Retorns a JWT token for authentication
```
body: {
  "username": "john",
  "password": "1234",
  "access_token": eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30
}
```

---

## Notes

### GET /api/notes
- Get all the notes of the user if its authenticated

### POST /api/notes
- Create a note
```
Body: {
  "name": "Nota 1",
  "description": "Contenido",
  "urgency": "medium"
}
```

### PUT /api/notes/:id
- Update a note with the given ID

### DELETE /api/notes/:id
- Delete a note

# API documentation
You can view the public documentation for this API in postman here: 
[postman docs](https://documenter.getpostman.com/view/31638634/2sB2xBEAp1)
