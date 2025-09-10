import { mkdtemp, readFile, rm } from "fs/promises";
import path from "path";
import os from 'os'
import { LogLoom } from "../../src";
import { fileParams, logParams, timeParams } from "../../src/types/index"
import { existsSync } from "fs";

describe("LogLoomAsync - write row", () => {
    let tempDir: string;

    beforeEach(async ()=> {
        tempDir = await mkdtemp(path.join(os.tmpdir(),'logloom-async-'));
    });
    afterEach(async ()=>{
        await rm(tempDir,{recursive:true,force: true});
    })

    test('write id | TYPE | msg | timestamp(when enabled)',async ()=>{
        const file:fileParams = {destination : tempDir , filename : 'app',extension: 'log'};
        // const time:timeParams = {isTimestampEnable : true};
        const logLoomConfig:logParams = {
            file,
            // time,
        };
        
        const logger = await LogLoom(logLoomConfig);
        
        //fake id & time generator
        (logger as any).genId = () => 'ID-TEST';
        (logger as any).getTimestamp = () => '02-02-2031 11:22:33';

        await logger.write('hello');
        await logger.write('world','ERROR');

        await logger.flush();

        const fp = path.join(tempDir, 'app.log');
        expect(existsSync(fp)).toBe(true);

        const content = (await readFile(fp,'utf-8')).trim().split("\n");
        expect(content).toEqual([
            "ID-TEST | INFO  | hello | 02-02-2031 11:22:33".replace("  ", " "),
            "ID-TEST | ERROR | world  | 02-02-2031 11:22:33".replace("  ", " "),
        ]);
    })

    test('write id | TYPE | msg | timestamp(when disabled)',async ()=>{
        const file:fileParams = {destination : tempDir , filename : 'no-timestamp',extension: 'log'};
        const time:timeParams = {isTimestampEnable : false};
        const logLoomConfig:logParams = {
            file,
            time,
        };
        
        const logger = await LogLoom(logLoomConfig);

        (logger as any).genId = ()=>'TEST';
        await logger.write('msg');

        await logger.flush();

        const fp = path.join(tempDir,'no-timestamp.log');
        const content = (await readFile(fp,'utf8')).trim();
        expect(content).toBe('TEST | INFO | msg');
    })
});