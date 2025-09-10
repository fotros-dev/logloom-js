import { mkdtempSync, readFileSync, rmSync } from "fs";
import path from "path";
import os from 'os'
import { fileParams, logParams, timeParams } from "../../src/types/index"
import { existsSync } from "fs";
import { initLogLoomSync, resetLogLoom } from "../../src";

describe("LogLoomAsync - write row", () => {
    let tempDir: string;

    beforeEach(()=> {
        tempDir = mkdtempSync(path.join(os.tmpdir(),'logloom-async-'));
    });
    afterEach(()=>{
        rmSync(tempDir,{recursive:true,force: true});
    })

    test('write id | TYPE | msg | timestamp(when enabled)',()=>{
        const file:fileParams = {destination : tempDir , filename : 'app',extension: 'log'};
        // const time:timeParams = {isTimestampEnable : true};
        const logLoomConfig:logParams = {
            file,
            // time,
        };
        
        resetLogLoom();
        const logger = initLogLoomSync(logLoomConfig);

        //fake id & time generator
        (logger as any).genId = () => 'ID-TEST';
        (logger as any).getTimestamp = () => '02-02-2031 11:22:33';

        logger.write('hello');
        logger.write('world','ERROR');

        const fp = path.join(tempDir, 'app.log');
        expect(existsSync(fp)).toBe(true);

        const content = (readFileSync(fp,'utf-8')).trim().split("\n");
        expect(content).toEqual([
            "ID-TEST | INFO  | hello | 02-02-2031 11:22:33".replace("  ", " "),
            "ID-TEST | ERROR | world  | 02-02-2031 11:22:33".replace("  ", " "),
        ]);
    })

    test('write id | TYPE | msg | timestamp(when disabled)',()=>{
        const file:fileParams = {destination : tempDir , filename : 'no-timestamp',extension: 'log'};
        const time:timeParams = {isTimestampEnable : false};
        const logLoomConfig:logParams = {
            file,
            time,
        };
        
        resetLogLoom();
        const logger = initLogLoomSync(logLoomConfig);

        (logger as any).genId = ()=>'TEST';
        logger.write('msg');


        const fp = path.join(tempDir,'no-timestamp.log');
        const content = (readFileSync(fp,'utf8')).trim();
        expect(content).toBe('TEST | INFO | msg');
    })
});