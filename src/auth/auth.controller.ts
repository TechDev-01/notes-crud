import pool from "../conn";
import { Request, Response } from "express";
import { RowDataPacket, ResultSetHeader } from "mysql2";
import bcrypt from "bcrypt";
import { generateToken } from "./auth.service";

/**
* Inserts a new user into the database.
* @param username - The username of the new user
* @param email - The email address of the new user
* @param hashedPassword - The hashed password of the new user
* @returns A Promise that resolves to a ResultSetHeader containing the result of the insert operation
* @throws {SQLError} If the database query fails
*/
export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      res.status(400).json({ error: "All fields are required" });
      return;
    }

    // Hash the user password
    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await pool.query<ResultSetHeader>(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
      [username, email, hashedPassword]
    );
    if (result.insertId === 0) {
      res.status(500).json({ message: "Error registering user" });
      return;
    }
    res
      .status(201)
      .json({ message: "User created successfully", user: result.insertId });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * Handles user login authentication and token generation
 * 
 * @param req - Express Request object containing email and password in the body
 * @param res - Express Response object for sending back HTTP responses
 * 
 * @throws {401} If email or password fields are missing
 * @throws {404} If user is not found in the database
 * @throws {401} If password doesn't match
 * @throws {500} If there's an internal server error
 * 
 * @returns {Promise<void>} Sends JSON response with success message and sets HTTP-only cookie with access token or error message if authentication fails
 */
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(401).json({ message: "All the fields are required!" });
      return;
    }

    const [result] = await pool.query<RowDataPacket[]>(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    if (result.length === 0) {
      res.status(404).json({ message: "Error, User not found" });
      return;
    }

    const user = result[0]; // Access to the user stored in the DB
    const passwordMatch = bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      res.status(401).json({ message: "Incorrect password" });
      return;
    }

    // Generate the token
    const token = generateToken(user.id, user.username);

    res
      .cookie("access_token", token, {
        httpOnly: true,
        sameSite: "strict",
      })
      .json({ message: "Login successfull" });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * Handles user logout by clearing the access token cookie.
 * 
 * @param req - Express Request object containing the access_token cookie
 * @param res - Express Response object
 * @returns {Promise<void>} - Resolves when logout is complete
 * 
 * @throws {Error} - If there's an internal server error during logout
 * 
 * @remarks
 * The function will:
 * - Check if access_token exists in cookies
 * - Return 401 if no token is found
 * - Clear the access_token cookie if present
 * - Return 201 with success message on successful logout
 * - Return 500 if an error occurs during the process
 */
export const logout = async (req: Request, res: Response): Promise<void> => {
  try {
    const { access_token } = req.cookies;
    if (!access_token) {
      res.status(401).json({ message: "No token provided" });
      return;
    }

    res
      .clearCookie("access_token", {
        httpOnly: true,
        sameSite: "strict",
      })
      .status(201)
      .json({ message: "Logout successful" });
  } catch (error) {
    console.error("Error during logout:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
