/**
 * Controller for managing notes in the application.
 * @module NotesController
 */

import pool from "../conn";
import { Request, Response } from "express";
import { RowDataPacket, ResultSetHeader } from "mysql2";

/**
 * Retrieves all notes from the database.
 * @async
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @returns {Promise<void>} - Returns 200 with notes array or 404 if no notes found
 */
export const getNotes = async (req: Request, res: Response): Promise<void> => {
  try {
    const [result] = await pool.query<RowDataPacket[]>(
      "SELECT * FROM notes_table"
    );
    if (result.length === 0) {
      res.status(404).json({ message: "No notes found" });
      return;
    }
    res.status(200).send(result);
  } catch (error) {
    console.error("Error getting notes:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * Creates a new note in the database.
 * @async
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @returns {Promise<void>} - Returns 200 with created note data or 401 if missing fields
 */
export const createNote = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, description, urgency, user_id } = req.body;
    if (!name || !description || !urgency || !user_id) {
      res.status(401).json({ message: "All the fields are required" });
      return;
    }
    const [rows] = await pool.query<ResultSetHeader>(
      "INSERT INTO notes_table (name, description, urgency, user_id) VALUES (?,?,?,?)",
      [name, description, urgency, user_id]
    );

    if (!rows.affectedRows) {
      res.status(500).json({ message: "Error inserting the note" });
      return;
    }
    res.status(200).send(rows);
  } catch (error) {
    console.error("Error getting notes:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * Retrieves a specific note by its ID.
 * @async
 * @param {Request} req - Express request object with note ID in params
 * @param {Response} res - Express response object
 * @returns {Promise<void>} - Returns 201 with note data or 404 if note not found
 */
export const getNoteById = async (req: Request, res: Response): Promise<void> => {
  try {
    const [result] = await pool.query<RowDataPacket[]>(
      "SELECT * FROM notes_table WHERE id = ?",
      [req.params.id]
    );
    if (result.length === 0) {
      res.status(404).json({ message: "The note doesnt exist" });
      return;
    }
    res.status(201).send(result[0]);
  } catch (error) {
    console.error("Error getting notes:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * Updates an existing note by its ID.
 * @async
 * @param {Request} req - Express request object with note ID in params and update data in body
 * @param {Response} res - Express response object
 * @returns {Promise<void>} - Returns 200 with update result or 401 if missing fields
 * @throws {Error} When internal server error occurs
 */
export const updateNote = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, description } = req.body;
    if (!name || !description) {
      res.status(401).json({ message: "All the fields are required" });
      return;
    }

    const [result] = await pool.query<ResultSetHeader>(
      "UPDATE notes_table SET name = ?, description = ? WHERE id = ?",
      [name, description, req.params.id]
    );
    if (result.affectedRows === 0) {
      res.status(500).json({ message: "An error ocurred during the update" });
      return;
    }
    res.status(200).send(result).json({ message: "Note updated successfully" });
  } catch (error) {
    console.error("Error updating the note:", error);
    throw new Error("Internal sever error");
  }
};

/**
 * Deletes a note by its ID.
 * @async
 * @param {Request} req - Express request object with note ID in params
 * @param {Response} res - Express response object
 * @returns {Promise<void>} - Returns 200 with deletion result or 500 if deletion fails
 * @throws {Error} When internal server error occurs
 */
export const deleteNote = async (req: Request, res: Response): Promise<void> => {
  try {
    const [result] = await pool.query<ResultSetHeader>("DELETE FROM notes_table WHERE id = ?", 
    [req.params.id]);
    if(result.affectedRows === 0) {
      res.status(500).json({ message: "Something goes wrong"});
      return;
    };

    res.status(200).send(result).json({ message: "Note deleted successfully" });
  } catch (error) {
    console.error("Error updating the note:", error);
    throw new Error("Internal sever error");
  }
};
