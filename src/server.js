import express from 'express'
import cors from 'cors'
import exitHook from 'async-exit-hook';
import { CLOSE_DB, CONNECT_DB } from '~/config/mongodb';
import { env } from './config/environment';
import { APIs_V1 } from '~/routes/v1';
import { errorHandlingMiddleware } from './middlewares/errorHandlingMiddleware';
import { corsOptions } from './config/cors';


const START_SERVER = () => {
  const app = express()
  //  xử lý cors
  app.use(cors(corsOptions));

  // Enable req.body json data
  app.use(express.json());

  // Use APIs V1
  app.use('/v1', APIs_V1);

  // Middleware xử lý lỗi tập trung
  app.use(errorHandlingMiddleware);

  if (env.MODE === 'production') {
    // Môi trường production
    app.listen(env.LOCAL_DEV_APP_PORT, () => {
      console.log(`3. Production: Hello ${env.AUTHOR}, Backend running at ${env.LOCAL_DEV_APP_PORT}`)
    })
  } else {
    // Môi trường dev
    app.listen(env.LOCAL_DEV_APP_PORT, env.LOCAL_DEV_APP_HOST, () => {
      console.log(`3. Development: Hello ${env.AUTHOR}, Backend running at http://${env.LOCAL_DEV_APP_HOST}:${env.LOCAL_DEV_APP_PORT}`)
    })
  }


  // Thực hiện các tác vụ cleanup trước khi dừng server
  exitHook(() => {
    console.log('4. Server is shutting down...');
    CLOSE_DB();
    console.log('5. Disconnected to MongoDB Cloud Atlas...');
  })
}

// IIFE (Immediately Invoked Function Expression)
(async () => {
  try {
    console.log('1. Connecting to MongoDB Cloud Atlas...');
    await CONNECT_DB();
    console.log('2. Connected to MongoDB Cloud Atlas');
    START_SERVER();
  } catch (error) {
    console.log(error);
    process.exit(0);
  }
})()

// Chỉ khi kết nối tới Database thành công thì mới start server
// CONNECT_DB()
//   .then(() => console.log('Connected to MongoDB Cloud Atlas'))
//   .then(() => START_SERVER())
//   .catch(error => {
//     console.log(error);
//     process.exit(0);
//   })