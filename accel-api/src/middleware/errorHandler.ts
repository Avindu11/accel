import { Request, Response } from 'express';
import ApiError from '../util/ApiError';
import logger from '../util/logger';

function errorHandler(err: ApiError, req: Request, res: Response, next: Function) {

    const statusCode = err.statusCode || 500;

    const payload = {
        message: err.message,
        statusCode,
        method: req.method,
        path: req.originalUrl,
        ip: req.ip,
        stack: err.stack
    }

    if (statusCode >= 500) {
        logger.error('Server Error', payload);
    } else {
        logger.warn('Client Error', payload);
    }

    const response = {
        status: statusCode >= 500 ? 'error' : 'fail',
        message: err.message
    }

    res.status(statusCode).json(response);

}

export default errorHandler;