import yargs, { number } from 'yargs';
import { hideBin } from 'yargs/helpers';


export const yarg = yargs(hideBin (process.argv))
    .option('b', {
        alias: 'base',
        type: 'number',
        demandOption: true,
        describe: 'Muliplication table base'
    })
    .parseSync()

