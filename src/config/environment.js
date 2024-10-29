import 'dotenv/config'

export const env = {
    MONGODB_URI:process.env.MONGODB_URI,
    DATABASE_NAME: process.env.DATABASE_NAME,

    LOCAL_DEV_APP_HOST: process.env.LOCAL_DEV_APP_HOST,
    LOCAL_DEV_APP_PORT: process.env.LOCAL_DEV_APP_PORT,

    MODE: process.env.MODE,


    AUTHOR:process.env.AUTHOR
}