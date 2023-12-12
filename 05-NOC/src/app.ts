import { PrismaClient } from '@prisma/client';
import { envs } from './config/plugins/envs.plugin';
import { MongoDatabase } from './data/mongo';
import { Server } from './presentation/server';


(async() => {
  main();
})();


async function main(){

  await MongoDatabase.connect({
    mongoUrl: envs.MONGO_URL,
    dbName: envs.MONGO_DB_NAME
  });
  
   //Todo: guardar datos en prisma.
  // const prisma = new PrismaClient();
  // const newLog = await prisma.logModel.create({
  //   data: {
  //     level: 'HIGH',
  //     message: 'Test message',
  //     origin: 'App.ts'
  //   }
  // });

  // console.log(newLog);

  //Todo: leer datos en prisma.
  // const prisma = new PrismaClient();
  // const logs = await prisma.logModel.findMany({
  //   where: {
  //     level: 'HIGH',
  //   }
  // });
  // console.log(logs);
  


 Server.start();
}