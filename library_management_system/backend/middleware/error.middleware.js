// Custom Error Class
class ErrorHandler extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;

        Error.captureStackTrace(this, this.constructor);
    }
}

// Global Error Middleware
export const ErrorMiddleware = (err, req, res, next) => {
    err.message = err.message || "Internal Server Error";
    err.statusCode = err.statusCode || 500;

    // Debug log (dev)
    console.log(err);

    // MongoDB Duplicate Key Error
    if (err.code === 11000) {
        const message = `Duplicate Field Value Entered`;
        err = new ErrorHandler(message, 400);
    }

    // JWT Invalid Token Error
    if (err.name === "JsonWebTokenError") {
        const message = "Invalid JWT Token";
        err = new ErrorHandler(message, 401);
    }

    // JWT Expired Token Error
    if (err.name === "TokenExpiredError") {
        const message = "JWT Token Expired. Try again";
        err = new ErrorHandler(message, 401);
    }

    // Cast Error (Invalid MongoDB ID)
    if (err.name === "CastError") {
        const message = `Resource not found. Invalid: ${err.path}`;
        err = new ErrorHandler(message, 400);
    }

    return res.status(err.statusCode).json({
        success: false,
        message: err.message,
    });
};

export default ErrorHandler;
