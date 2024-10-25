import Joi from 'joi';
import { StatusCodes } from 'http-status-codes';
import ApiError from '~/utils/ApiError';

const createNew = async (req, res, next) => {
    /**
    * Note: Mặc định chúng ta không cần phải custom message ở phía BE làm gì
    *Vì để cho Front-end tự validate và custom message phía FE cho đẹp.
    *Back-end chỉ cần validate Đảm Bảo Dữ Liệu Chuẩn Xác, và trả về message mặc định từ thư viện là được.
    *Quan trọng: Việc Validate dữ liệu BẮT BUỘC phải có ở phía Back-end vì đây là điểm cuối để lưu trữ dữ liệu vào Database.
    *Và thông thường trong thực tế, điều tốt nhất cho hệ thống là hãy luôn validate dữ liệu ở cả Back-end và Front-end nhé.
    */
    const correctCondition = Joi.object({
        title: Joi.string().required().min(3).max(50).trim().strict().messages({
            'any.required': 'Title is required (trungnamdev)',
            'string.empty': 'Title is not allowed to be empty (trungnamdev)',
            'string.min': 'Title min 3 chars (trungnamdev)',
            'string.max': 'Title max 50 chars (trungnamdev)',
            'string.trim': 'Title must not have leading or trailing whitespace'

        }),
        description: Joi.string().required().min(3).max(255).trim().strict()
    })

    try {
        //Chỉ định  abortEarly: false để trường hợp có nhiều lỗi trả về tất cả lỗi
        await correctCondition.validateAsync(req.body, { abortEarly: false });
        // Validate dữ liệu xong xuôi hợp lệ thì cho request đi tiếp sang controller
        next();
    } catch (error) {
        next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message));
    }
}

export const boardValidation = {
    createNew
}