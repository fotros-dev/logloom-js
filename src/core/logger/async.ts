import { LogOptions } from "../../types";
import { FileManager } from "../file/async";
import { LoggerBase } from "./Logger";

class LoggerAsync extends LoggerBase{

    private constructor(opts: LogOptions){
        super(opts)
    }

    static init = async (opts: LogOptions) => {
        const instance = new LoggerAsync(opts);
        instance.fileManager = await FileManager(instance.fileParameters);
        return instance;
    };

}

export async function LogLoom(opts : LogOptions){
    const instance = await LoggerAsync.init(opts);
    return instance;
}