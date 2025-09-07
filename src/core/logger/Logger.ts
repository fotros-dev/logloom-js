import { fileManagerParameters, LogOptions } from "../../types";

export class LoggerBase {
    //file
    protected fileParameters: fileManagerParameters;
    
    //time
    protected isTimestampEnable: boolean;

    //row
    protected isGenerateRowId: boolean;

    constructor(opts: LogOptions) {
        this.fileParameters = {
            destination: opts.file.destination,
            filename: opts.file.filename,
            extension: opts.file.extension,
        };
        //time
        this.isTimestampEnable = opts.time?.isTimestampEnable ?? true;

        //row
        this.isGenerateRowId = opts.row?.isGenId ?? false;
    }
}