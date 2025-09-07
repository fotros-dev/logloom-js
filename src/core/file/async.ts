import path from "path";

import { mkdir, open } from "fs/promises";
import { fileManagerParameters } from "../../types";
import { FileBase } from "./File";


class FileAsync extends FileBase{

    private constructor(opts: fileManagerParameters) {
        super(opts)
    }


    static init = async (opts: fileManagerParameters) => {
        const instance = new FileAsync(opts);
        instance.filePath = await instance.#createFile();
        return instance;
    };

    #createFile = async () => {
        const fp = path.join(
            this.destination,
            `${this.filename}.${this.extension}`
        );

        await mkdir(this.destination, { recursive: true });

        try {
            const fh = await open(fp, "wx");
            await fh.close();
        } catch (err: any) {
            if (err?.code !== "EEXIST") throw err;
        }

        return fp;
    };
}

export async function FileManager(opts : fileManagerParameters){
    const instance = await FileAsync.init(opts);
    return instance;
}
