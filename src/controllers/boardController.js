import { StatusCodes } from 'http-status-codes';
import { boardService } from '~/services/boardService';


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

const getDetails = async (req, res, next) => {
    try {
        const boardId = req.params.id;
        const board = await boardService.getDetails(boardId);
        res.status(StatusCodes.OK).json(board);
    } catch (error) {
        next(error);
    }
}
const update = async (req, res, next) => {
    try {
        const boardId = req.params.id;
        const updateBoard = await boardService.update(boardId, req.body);

        res.status(StatusCodes.OK).json(updateBoard);
    } catch (error) {
        next(error);
    }
}
const moveCardToDifferentColumn = async (req, res, next) => {
    try {
        const result = await boardService.moveCardToDifferentColumn(req.body);

        res.status(StatusCodes.OK).json(result);
    } catch (error) {
        next(error);
    }
}


export const boardController = {
    createNew,
    getDetails,
    update,
    moveCardToDifferentColumn
}