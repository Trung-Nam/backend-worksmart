/* eslint-disable no-useless-catch */

import { StatusCodes } from 'http-status-codes';
import { cloneDeep } from 'lodash';
import { boardModel } from '~/models/boardModel';
import ApiError from '~/utils/ApiError';
import { slugify } from '~/utils/formatters';

const createNew = async (reqBody) => {
    try {
        // Xử lý dữ liệu tùy đặc thù dự án
        const newBoard = {
            ...reqBody,
            slug: slugify(reqBody.title)
        }


        // Gọi tới tầng Model để xử lý bản ghi newBoard vào trong Database
        const createBoard = await boardModel.createNew(newBoard);

        // Lấy bản ghi board sau khi gọi (tùy vào mục đích dự án có cần bước này hay không)
        const getNewBoard = await boardModel.findOneById(createBoard.insertedId);

        // Làm thêm các xử lý logic khác với các Collection khác tùy đặc thù dự án...vvv
        // Bắn email, notifications về cho admin khi có 1 cái board mới được tạo...vvv


        // Trả kết quả về, trong Service luôn phải có return
        return getNewBoard;
    } catch (error) {
        throw error;
    }
}


const getDetails = async (boardId) => {
    try {
        const board = await boardModel.getDetails(boardId);
        if (!board) {
            throw new ApiError(StatusCodes.NOT_FOUND, 'Board not found');
        }
        //B1. Deep clone board ra một cái mới để xử lý, không ảnh hưởng tới board ban đầu
        const resBoard = cloneDeep(board);

        //B2. Đưa card về đúng column của nó
        resBoard.columns.forEach(column => {
            // Cách dùng .equals này là bởi vì chúng ta hiểu ObjectId trong MongoDB có support method .equals
            column.cards = resBoard.cards.filter(card => card.columnId.equals(column._id)); //Cách 1
            // Cách dùng .toString là của JavaScript
            // column.cards = resBoard.cards.filter(card => card.columnId.toString() === column._id.toString()); //Cách 2
        });

        //B3. Xóa mảng cards khỏi board ban đầu
        delete resBoard.cards;

        return resBoard;
    } catch (error) {
        throw error;
    }
}

export const boardService = {
    createNew,
    getDetails
}