// Success wrapper object
const successResponse = (data, statusCode = 200, message = 'Success', dataLength) => {
    return {
        success: true,
        status: statusCode,
        message: message,
        data: data,
        dataLength: dataLength
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