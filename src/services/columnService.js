
import { StatusCodes } from 'http-status-codes';
import { boardModel } from '~/models/boardModel';
import { cardModel } from '~/models/cardModel';
import { columnModel } from '~/models/columnModel';
import ApiError from '~/utils/ApiError';


const createNew = async (reqBody) => {
    try {
        const newColumn = {
            ...reqBody
        }
        const createColumn = await columnModel.createNew(newColumn);
        const getNewColumn = await columnModel.findOneById(createColumn.insertedId);

        if (getNewColumn) {
            // Xử lý cấu trúc data ở đây trước khi trả dữ liệu về
            getNewColumn.cards = [];

            // Cập nhật mảng columnOrderIds trong collections boards
            await boardModel.pushColumnOrderIds(getNewColumn);
        }

        return getNewColumn;
    } catch (error) {
        throw error;
    }
}

const update = async (columnId, reqBody) => {
    try {
        const updateData = {
            ...reqBody,
            updateAt: Date.now()
        }
        const updatedColumn = await columnModel.update(columnId, updateData);

        return updatedColumn;
    } catch (error) {
        throw error;
    }
}
const deleteItem = async (columnId) => {
    try {
        const targetColumn = await columnModel.findOneById(columnId);
        if (!targetColumn) {
            throw ApiError(StatusCodes.NOT_FOUND, 'Column not found.');
        }
        // Xóa column
        await columnModel.deleteOneById(columnId);
        // Xóa cards thuộc column
        await cardModel.deleteManyByColumnId(columnId);
        // Xóa columnId trong mảng columnOrderIds của cái board chứa nó
        await boardModel.pullColumnOrderIds(targetColumn);

        return { deleteResult: 'Column and its Cards deleted successfully!' }
    // eslint-disable-next-line no-unreachable
    } catch (error) {
        throw error;
    }
}

export const columnService = {
    createNew,
    update,
    deleteItem
}