import { fileManagerParameters } from "../../types";

export abstract class FileBase {
    protected destination: string;
    protected filename: string;
    protected extension: "log" | "txt" | "csv";
    protected filePath: string = "";

    constructor(opts: fileManagerParameters) {
        this.destination = opts.destination;
        this.filename = opts.filename;
        this.extension = opts.extension;
    }
}