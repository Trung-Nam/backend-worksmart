// Những domain được phép truy cập tài nguyên
export const WHITELIST_DOMAINS = [
    // 'http://localhost:5173' //Không cần localhost nữa vì ở file config/cors đã luôn luôn cho phép môi trường dev
    'frontend-worksmart.vercel.app'
]

export const BOARD_TYPE = {
    PUBLIC: 'public',
    PRIVATE: 'private'
}
