/**
 * Express router for handling note-related routes.
 * All routes are protected and require authentication.
 * 
 * Routes:
 * - GET /get - Retrieves all notes
 * - POST /create - Creates a new note
 * - GET /get/:id - Retrieves a specific note by ID
 * - PUT /update/:id - Updates a specific note by ID
 * - DELETE /delete/:id - Deletes a specific note by ID
 * 
 * @requires express.Router
 * @requires ../controllers/notes.controller
 * @requires ../middlewares/auth.middleware
 */
import { Router } from "express";
import { createNote, deleteNote, getNoteById, getNotes, updateNote } from "../controllers/notes.controller";
import { protect } from "../middlewares/auth.middleware";

const notesRouter = Router();

notesRouter.get("/get", protect, getNotes);

notesRouter.post("/create", protect, createNote);

notesRouter.get("/get/:id", protect, getNoteById)

notesRouter.put("/update/:id", protect, updateNote);

notesRouter.delete("/delete/:id", protect, deleteNote);

export default notesRouter;