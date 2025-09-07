import { LogOptions, rowType } from "../../types";
import { FileAsyncType, FileManager } from "../file/async";
import { LoggerBase } from "./Logger";

class LoggerAsync extends LoggerBase{

    #fileManager!: FileAsyncType;

    private constructor(opts: LogOptions){
        super(opts)
    }

    static init = async (opts: LogOptions) => {
        const instance = new LoggerAsync(opts);
        instance.#fileManager = await FileManager(instance.fileParameters);
        return instance;
    };

    write = async (msg:string,type:rowType = 'INFO') =>{
        this.#fileManager.addRow(msg)
    }
}

export async function LogLoom(opts : LogOptions){
    const instance = await LoggerAsync.init(opts);
    return instance;
}