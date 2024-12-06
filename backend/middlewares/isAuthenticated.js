import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
  try {
    // Extract token from cookies
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({
        message: "Authentication token is missing",
        success: false,
      });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    if (!decoded) {
      return res.status(401).json({
        message: "Invalid or expired token",
        success: false,
      });
    }

    // Attach user ID to request object
    req.id = decoded.userId;
    next();
  } catch (error) {
    console.error("Authentication error:", error);

    return res.status(500).json({
      message: "Internal server error during authentication",
      success: false,
      error: error.message,
    });
  }
};

export default isAuthenticated;
