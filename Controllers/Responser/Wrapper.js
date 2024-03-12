// Success wrapper object
const successResponse = (data, statusCode = 200, message = 'Success', dataLength,locationData) => {
    return {
        success: true,
        status: statusCode,
        message: message,
        data: data,
        dataLength: dataLength,
        locationData: locationData
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