import path from "path";
import { fileManagerParameters } from "../../types";
import { closeSync, mkdirSync, openSync } from "fs";
import { FileBase } from "./File";

class FileSync extends FileBase {

    private constructor(opts: fileManagerParameters) {
        super(opts)
    }

    static init = (opts : fileManagerParameters) =>{
        const instance = new FileSync(opts);
        instance.filePath = instance.#createFile();
        return instance;
    }

    #createFile = () =>{
        const fp = path.join(
            this.destination,
            `${this.filename}.${this.extension}`
        );

        mkdirSync(this.destination, { recursive: true });

        try {
            const fh = openSync(fp, "wx");
            closeSync(fh);
        } catch (err: any) {
            if (err?.code !== "EEXIST") throw err;
        }

        return fp;
    }
}

export function FileManagerSync(opts: fileManagerParameters){
    const instance = FileSync.init(opts);
    return instance;
}