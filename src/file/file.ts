import path from "path";
import { fileManagerParameters } from "../types";
import { mkdir, open} from "fs/promises";


export class File {
    #destination: string;
    #filename: string;
    #extension: "log" | "txt" | "csv";
    #filePath:string;

    constructor(opts: fileManagerParameters) {
        this.#destination = opts.destination;
        this.#filename = opts.filename;
        this.#extension = opts.extension;
        
        this.#createFile();
    }

    async #createFile(){
        const fp = path.join(this.#destination,`${this.#filename}.${this.#extension}`)
        
        await mkdir(this.#destination,{recursive : true});
        
        try {
            const fh = await open(fp,'wx');
            await fh.close();
        } catch (err:any) {
            if(err?.code !== 'EEXIST') throw err; 
        }

       this.#filePath = fp;
    }

    

}