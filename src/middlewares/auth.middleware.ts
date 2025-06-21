import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        username: string;
      };
    }
  }
}

dotenv.config();

/**
 * Interface representing the payload structure for JSON Web Tokens (JWT).
 * @interface
 * @property {number} id - The unique identifier of the user.
 * @property {string} username - The username of the authenticated user.
 */
interface JwtPayload {
  id: number;
  username: string;
}

/**
 * Middleware function to protect routes by verifying JWT token
 * @param req - Express Request object containing the access token in cookies
 * @param res - Express Response object
 * @param next - Express NextFunction to pass control to the next middleware
 * @throws {Error} If token verification fails
 * @returns {void}
 * 
 * @example
 * // Usage in route
 * router.get('/protected-route', protect, (req, res) => {
 *   // Route handler code
 * });
 * 
 * @remarks
 * - Extracts JWT token from request cookies
 * - Verifies token using JWT_SECRET from environment variables
 * - Adds decoded user id and username to request body
 * - Responds with 401 if token is missing or invalid
 * - Responds with 500 if token verification fails
 */
export const protect = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  let token = req.cookies.access_token;
  const JWT_SECRET = process.env.JWT_SECRET || "anny";
  if (!token && typeof token !== "string") {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  try {
    //Verify the token
    //console.log("Verifying token:", token);
    //console.log("JWT_SECRET:", JWT_SECRET);
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

    // Add the user id and the username to the request body to use them in the next request 
    req.user = {
      id: decoded.id,
      username: decoded.username
    }
    next();
  } catch (error) {
    console.error("Error verifying the token:", error);
    res.status(500).json({ message: "Internal server error"})
  }
};
