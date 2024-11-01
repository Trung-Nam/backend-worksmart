import Joi from 'joi';
import { StatusCodes } from 'http-status-codes';
import ApiError from '~/utils/ApiError';
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators';

const createNew = async (req, res, next) => {
    const correctCondition = Joi.object({
        boardId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
        title: Joi.string().required().min(3).max(50).trim().strict()
    })

    try {
        await correctCondition.validateAsync(req.body, { abortEarly: false });
        next();
    } catch (error) {
        next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message));
    }
}

const update = async (req, res, next) => {
    // Lưu ý ko dùng required() trong trường hợp update
    const correctCondition = Joi.object({
        // Nếu cần làm thêm tính năng di chuyển column sang board khác thì mới thêm validate boardId
        boardId: Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
        title: Joi.string().min(3).max(50).trim().strict(),
        cardOrderIds: Joi.array().items(
            Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)
        ).default([])
    })

    try {
        // Chỉ định  abortEarly: false để trường hợp có nhiều lỗi trả về tất cả lỗi
        // Đối với trường hợp update, cho phép Unknown để không cần đẩy 1 số field lên
        await correctCondition.validateAsync(req.body, {
            abortEarly: false,
            allowUnknown: true
        });
        // Validate dữ liệu xong xuôi hợp lệ thì cho request đi tiếp sang controller
        next();
    } catch (error) {
        next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message));
    }
}
const deleteItem = async (req, res, next) => {
    const correctCondition = Joi.object({
        id: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)
    })

    try {
        await correctCondition.validateAsync(req.params);
        next();
    } catch (error) {
        next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message));
    }
}

export const columnValidation = {
    createNew,
    update,
    deleteItem
}