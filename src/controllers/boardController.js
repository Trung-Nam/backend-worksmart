import { StatusCodes } from 'http-status-codes';
import ApiError from '~/utils/ApiError';


const createNew = async (req, res, next) => {
    try {
        // console.log('req.body: ', req.body);

        // Điều hướng dữ liệu sang tầng services

        throw new ApiError(StatusCodes.BAD_GATEWAY, 'trungnamdev test error');

        // Có kết quả thì trả về client
        // res.status(StatusCodes.CREATED).json({ message: 'POST from controller:API create new board' });
    } catch (error) {
        next(error);
    }
}

export const boardController = {
    createNew
}