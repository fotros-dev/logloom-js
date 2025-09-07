import { LogLoom } from "./core/logger/async";
import { LogLoomSync } from "./core/logger/sync";

export { LogLoomSync } from "./core/logger/sync";
export { LogLoom } from './core/logger/async'


const log = LogLoomSync({
    file:{
        destination: './hellosync',
        filename: 'log',
        extension: 'txt',
    }
})

log.write('hello')