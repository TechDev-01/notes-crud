# Notes API
An API REST to manage user notes: create, update, delete and read.
This API includes authentication, access control over routes and basic CRUD operations.

# Tech Stack
- Node.js
- Express
- MySQL
- JWT para autenticación

# Run on local

## Clone the repository
```
git clone https://github.com/TechDev-01/notes-crud.git
```

## Cd to the directory
```
cd notes-crud
```
## Install the dependencies
```
npm install
```
## Create the .env file and set up the variables
```
cp .env.example .env
```
## Run the server
```
npm run dev
```

# Endpoints

## Usuarios

### POST /api/register
- Create a new user in the database
- Body: { "username": "john", "password": "1234" }

### POST /api/login
- Retorns a JWT token for authentication
- Body: { "username": "john", "password": "1234" }

---

## Notes

### GET /api/notes
- Get all the notes of the user if its authenticated

### POST /api/notes
- Create a note
- Body: { "name": "Nota 1", "description": "Contenido", "urgency": "medium" }

### PUT /api/notes/:id
- Update a note

### DELETE /api/notes/:id
- Delete a note
