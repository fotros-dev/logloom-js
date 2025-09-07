
import { LogOptions, rowType } from "../../types";
import { FileManagerSync, FileSyncType } from "../file/sync";
import { LoggerBase } from "./Logger";

class LoggerSync extends LoggerBase {

    #fileManager!:FileSyncType;

    private constructor(opts: LogOptions) {
        super(opts)
    }

    static init = (opts: LogOptions) => {
        const instance = new LoggerSync(opts);
        instance.#fileManager = FileManagerSync(instance.fileParameters);
        return instance;
    };
    
    write = (msg:string,type:rowType = 'INFO') =>{
        const row = [this.genId(),type,msg];

        if(this.isTimestampEnable) row.push(this.getTimestamp())
        
        this.#fileManager.addRow(row.join(' | '));
    }
}

export function LogLoomSync(opts : LogOptions){
    const instance = LoggerSync.init(opts);
    return instance;
}