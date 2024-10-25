import { StatusCodes } from 'http-status-codes';
import { boardService } from '~/services/boardService';
import ApiError from '~/utils/ApiError';


const createNew = async (req, res, next) => {
    try {
        // console.log('req.body: ', req.body);

        // Điều hướng dữ liệu sang tầng services
        const createdBoard = await boardService.createNew(req.body);

        // Có kết quả thì trả về client
        res.status(StatusCodes.CREATED).json(createdBoard);
    } catch (error) {
        next(error);
    }
}

export const boardController = {
    createNew
}