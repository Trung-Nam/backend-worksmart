import { StatusCodes } from 'http-status-codes';


const createNew = async (req, res, next) => {
    try {
        console.log('req.body: ', req.body);

        // Điều hướng dữ liệu sang tầng services

        // Có kết quả thì trả về client
        res.status(StatusCodes.CREATED).json({ message: 'POST from controller:API create new board' });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ errors: error.message });
    }
}

export const boardController = {
    createNew
}