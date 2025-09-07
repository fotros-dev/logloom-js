import { LogLoom } from "./core/logger/async";

export { LogLoomSync } from "./core/logger/sync";
export { LogLoom } from './core/logger/async'

(async ()=>{
    const log = await LogLoom({
        file:{
            destination: './hellos',
            filename: 'log',
            extension: 'txt',
        }
    })

    log.write('hello');
})()