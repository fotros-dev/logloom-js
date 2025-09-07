
import { LogOptions } from "../../types";
import { FileManagerSync } from "../file/sync";
import { LoggerBase } from "./Logger";

class LoggerSync extends LoggerBase {

    private constructor(opts: LogOptions) {
        super(opts)
    }

    static init = (opts: LogOptions) => {
        const instance = new LoggerSync(opts);
        instance.fileManager = FileManagerSync(instance.fileParameters);
        return instance;
    };
    
}

export function LogLoomSync(opts : LogOptions){
    const instance = LoggerSync.init(opts);
    return instance;
}