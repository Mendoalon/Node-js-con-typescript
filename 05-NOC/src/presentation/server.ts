import { PostgresLogDatasource } from '../domain/datasources/postgres-log.datasource';
import { CheckServiceMultiple } from '../domain/use-cases/checks/check-service-multiple';
import { FileSystemDatasource } from '../infrastructure/datasources/file-system.datasource';
import { MongoLogDatasource } from '../infrastructure/datasources/mongo-log.datasource';
import { LogRepositoryImpl } from '../infrastructure/repositories/log.repository.impl';
import { CronService } from './cron/cron-service';
import { EmailService } from './email/email.service';


const fsLogRepository = new LogRepositoryImpl(
   new FileSystemDatasource(),
  // new MongoLogDatasource(),
  // new PostgresLogDatasource()

);

const mongoLogRepository = new LogRepositoryImpl(
  new MongoLogDatasource(),
);

const postgresLogRepository = new LogRepositoryImpl(
  new PostgresLogDatasource(),
);


const emailService = new EmailService();


export class Server {

   public static async start() {

    console.log('Server started...');

    //todo: Mandar email
    // new SendEmailLogs(
    //   emailService, 
    //   fileSystemLogRepository,
    // ).execute(
    //   ['luis.mendoza.alonso@hotmail.com','luis.mendoza.alonso@hotmail.com']
    // )
    //  emailService.sendEmailWithFileSystemLogs(
    //    ['luis.mendoza.alonso@hotmail.com','luis.mendoza.alonso@hotmail.com']
    //  );

    // const logs = await LogRepository.getLogs(LogSeverityLevel.high);
    // console.log(logs);
    

    //   CronService.createJob(
    //     '*/5 * * * * *',
    //     () => {
    //       const url = 'https://google.com';
    //       new CheckServiceMultiple(
    //         [fsLogRepository, mongoLogRepository, postgresLogRepository],
    //         () => console.log(`${url} is ok`),
    //         (error) => console.log(error),
    //       ).execute(url);
    // // // new CheckService().execute( 'http://localhost:3000' );

    //     }
    //   );


  }


}