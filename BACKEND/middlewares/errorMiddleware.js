const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    
    res.status(statusCode).json({
        message: err.message,
        stack: null, // Always set stack to null
    });
};


export default errorHandler;