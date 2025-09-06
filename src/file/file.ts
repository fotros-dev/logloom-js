import path from "path";
import { fileManagerParameters } from "../types";
import { closeSync, mkdirSync, openSync} from "fs";


export class File {
    #destination: string;
    #filename: string;
    #extension: "log" | "txt" | "csv";
    #filePath: string = '';

    constructor(opts: fileManagerParameters) {
        this.#destination = opts.destination;
        this.#filename = opts.filename;
        this.#extension = opts.extension;

        this.#filePath = this.#createFile()
    }

    #createFile = ()=>{
        const fp = path.join(
            this.#destination,
            `${this.#filename}.${this.#extension}`
        );

        mkdirSync(this.#destination, { recursive: true });

        try {
            const fh = openSync(fp, "wx");
            closeSync(fh);
        } catch (err: any) {
            if (err?.code !== "EEXIST") throw err;
        }

        return fp;
    }

    addRow = (row: string)=>{
        try {
            
        } catch (err) {
            
        }
    }
}