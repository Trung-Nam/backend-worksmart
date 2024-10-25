/* eslint-disable no-useless-catch */

import { boardModel } from '~/models/boardModel';
import { slugify } from '~/utils/formatters';

const createNew = async (reqBody) => {
    try {
        // Xử lý dữ liệu tùy đặc thù dự án
        const newBoard = {
            ...reqBody,
            slug:slugify(reqBody.title)
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

export const boardService = {
    createNew
}