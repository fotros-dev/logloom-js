import { mkdtemp, rm } from "fs/promises";
import path from "path";
import * as os from 'os'
import { LogLoomSync } from "../../src"; 
import { existsSync } from "fs";

describe("LogLoomSync - Initialize (txt/log/csv)",()=>{
    
    let tmpDir: string;
    beforeEach(async () =>{
     tmpDir = await mkdtemp(path.join(os.tmpdir(),'logloom-sync-'))   
    })
    afterEach(async () =>{
        await rm(tmpDir,{recursive: true, force: true});
    })

    test('should create requested files and not fail if already exist', ()=>{
        LogLoomSync({
        file: { destination: tmpDir, filename: "LogText", extension: "txt" },
        });

        LogLoomSync({
        file: { destination: tmpDir, filename: "LogLoom", extension: "log" },
        });

        LogLoomSync({
        file: { destination: tmpDir, filename: "LogCSV", extension: "csv" },
        });

        expect(existsSync(path.join(tmpDir, "LogText.txt"))).toBe(true);
        expect(existsSync(path.join(tmpDir, "LogLoom.log"))).toBe(true);
        expect(existsSync(path.join(tmpDir, "LogCSV.csv"))).toBe(true);

        //for check not fail if already exist
        LogLoomSync({
        file: { destination: tmpDir, filename: "LogText", extension: "txt" },
        });
        expect(existsSync(path.join(tmpDir, "LogText.txt"))).toBe(true);
    })

})
