import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/User";
import { NextFunction, Request, Response } from "express";

interface JwtUserPayload extends JwtPayload {
  id: string;
}

const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  let token: string | undefined;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET!
      ) as JwtUserPayload;

      req.user = await User.findById(decoded.id).select("-password");

      next();
      return;
    } catch (error) {
      res.status(401).json({ message: "Not authorized, token failed" });
      return;
    }
  }

  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
    return;
  }
};

export default protect;
