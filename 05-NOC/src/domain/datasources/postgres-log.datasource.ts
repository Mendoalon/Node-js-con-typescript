import { PrismaClient, SeverityLevel } from "@prisma/client";
import { LogEntity, LogSeverityLevel } from "../entities/log.entity";
import { LogDatasource } from "./log.datasource";


const prisma = new PrismaClient();

const serverityEnum = {
    low: SeverityLevel.LOW,
    medium: SeverityLevel.MEDIUM,
    high: SeverityLevel.HIGH,
}

export class PostgresLogDatasource implements LogDatasource {

    async saveLog(log: LogEntity): Promise<void> {

        const level = serverityEnum[log.level];

        await prisma.logModel.create({
            data: {
                ...log,
                level: level,
            }
        });

        console.log('Postgres Save');
        
        
    }

    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        const level = serverityEnum[severityLevel];

        const dbLogs = await prisma.logModel.findMany({
            where: { level }
        });

        return dbLogs.map(  LogEntity.fromObject );
    }


}