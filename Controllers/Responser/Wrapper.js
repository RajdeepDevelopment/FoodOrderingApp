// Success wrapper object
const successResponse = (data, statusCode = 200, message = 'Success') => {
    return {
        success: true,
        status: statusCode,
        message: message,
        data: data
    };
};

// Error wrapper object
const errorResponse = (message, statusCode) => {
    return {
        success: false,
        status: statusCode,
        message: message,
        data: []

    };
};

module.exports = [successResponse, errorResponse]