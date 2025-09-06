import { File } from "../file/file";
import { fileManagerParameters, LogOptions, rowType } from "../types";

export class LogLoom {
    //file
    #FileManager:object;

    //time
    #isTimestampEnable: boolean;

    //row
    #isGenerateRowId: boolean;

    constructor (opts : LogOptions){
        //file
        const fileParameters: fileManagerParameters = {
            destination: opts.file.destination,
            filename: opts.file.filename,
            extension: opts.file.extension,
        };
        this.#FileManager = new File(fileParameters);

        //time
        this.#isTimestampEnable = opts.time?.isTimestampEnable ?? true;

        //row
        this.#isGenerateRowId   = opts.row?.isGenId ?? false;

    }

    addLog = (row:string,type:rowType)=>{
        
    }
}