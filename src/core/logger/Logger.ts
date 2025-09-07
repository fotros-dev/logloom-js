import { randomUUID } from "crypto";
import { fileManagerParameters, LogOptions } from "../../types";

export class LoggerBase {
    //file
    protected fileParameters: fileManagerParameters;

    //time
    protected isTimestampEnable: boolean;

    constructor(opts: LogOptions) {
        this.fileParameters = {
            destination: opts.file.destination,
            filename: opts.file.filename,
            extension: opts.file.extension,
        };
        //time
        this.isTimestampEnable = opts.time?.isTimestampEnable ?? true;
    }

    protected genId = () => {
        return randomUUID();
    };

    protected getTimestamp = () => {
        const d = new Date();
        const yyyy = d.getFullYear();
        const mm = String(d.getMonth() + 1).padStart(2, "0");
        const dd = String(d.getDate()).padStart(2, "0");
        const hh = String(d.getHours()).padStart(2, "0");
        const mi = String(d.getMinutes()).padStart(2, "0");
        const ss = String(d.getSeconds()).padStart(2, "0");
        return `${dd}-${mm}-${yyyy} ${hh}:${mi}:${ss}`;
    };
}