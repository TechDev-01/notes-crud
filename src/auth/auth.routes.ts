/**
 * Express router for handling authentication routes.
 * 
 * This router provides endpoints for user authentication operations:
 * - POST /login: Authenticates user credentials
 * - POST /register: Creates a new user account
 * - POST /logout: Terminates user session
 * 
 * @module authRouter
 */
import { Router } from "express";
import { login, logout, register } from "./auth.controller";

const authRouter = Router();

authRouter.post("/login", login);

authRouter.post("/register", register);

authRouter.post("/logout", logout);

export default authRouter;