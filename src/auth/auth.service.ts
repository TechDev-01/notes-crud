import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

/**
 * Generates a JWT token for user authentication
 * @param userId - The unique identifier of the user
 * @param username - The username of the user
 * @returns A JWT token string containing user information
 * @throws {Error} If JWT_SECRET environment variable is not set (falls back to "default")
 * @example
 * ```typescript
 * const token = generateToken(123, "johndoe");
 * // Returns: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 * ```
 */
export const generateToken = (userId: number, username: string): string => {
  const JWT_SECRET = process.env.JWT_SECRET || "default";
  return jwt.sign({ id: userId, username }, JWT_SECRET, {
    expiresIn: "1h",
    algorithm: "HS256",
  });
};
