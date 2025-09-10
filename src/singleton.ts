import { LogLoom } from "./core/logger/async";
import { LogLoomSync } from "./core/logger/sync";
import { LogOptions } from "./types";



const KEY = "__logloom_default__";

export async function initLogLoom(opts: LogOptions){
    const g = globalThis as any;
    if(g[KEY]) return g[KEY];

    const instance = await LogLoom(opts);
    g[KEY] = instance;
    return instance
}

export function initLogLoomSync(opts: LogOptions) {
    const g = globalThis as any;
    if (g[KEY]) return g[KEY];

    const instance = LogLoomSync(opts);
    g[KEY] = instance;
    return instance;
}

export function getLogLoom(){
    const g = globalThis as any;
    if(!g[KEY]) throw new Error('Logger is not valid')
    
    return g[KEY];
}

export function resetLogLoom(){
    (globalThis as any)[KEY] = undefined;
}