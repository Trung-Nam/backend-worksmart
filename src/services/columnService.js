
import { boardModel } from '~/models/boardModel';
import { columnModel } from '~/models/columnModel';


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


export const columnService = {
    createNew
}