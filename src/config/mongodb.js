import { MongoClient, ServerApiVersion } from 'mongodb';
import { env } from './environment';

let workSmartDatabaseInstance = null;

const mongoClientInstance = new MongoClient(env.MONGODB_URI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    }
});


export const CONNECT_DB = async () => {
    await mongoClientInstance.connect();

    workSmartDatabaseInstance = mongoClientInstance.db(env.DATABASE_NAME);
}

export const GET_DB = () => {
    if (!workSmartDatabaseInstance) throw new Error('Must connect to Database first!')
    return workSmartDatabaseInstance;
}


export const CLOSE_DB = async () => {
    await mongoClientInstance.close();
}


