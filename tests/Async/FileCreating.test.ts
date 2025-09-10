import { mkdtemp, rm } from "fs/promises";
import { existsSync } from "fs";
import * as os from "os";
import * as path from "path";
import { initLogLoom, resetLogLoom } from "../../src"; 

describe("LogLoomAsync - creates files (txt/log/csv)", () => {
    let tmpDir: string;

    beforeEach(async () => {
        tmpDir = await mkdtemp(path.join(os.tmpdir(), "logloom-async-"));
    });

    afterEach(async () => {
        await rm(tmpDir, { recursive: true, force: true });
    });

    test("should create requested files and not fail if already exist", async () => {
        await initLogLoom({
            file: {
                destination: tmpDir,
                filename: "LogText",
                extension: "txt",
            },
        });
        resetLogLoom();
        expect(existsSync(path.join(tmpDir, "LogText.txt"))).toBe(true);

        await initLogLoom({
            file: {
                destination: tmpDir,
                filename: "LogLoom",
                extension: "log",
            },
        });
        expect(existsSync(path.join(tmpDir, "LogLoom.log"))).toBe(true);
        resetLogLoom();

        await initLogLoom({
            file: { destination: tmpDir, filename: "LogCSV", extension: "csv" },
        });
        expect(existsSync(path.join(tmpDir, "LogCSV.csv"))).toBe(true);
        resetLogLoom();


        //for check not fail if already exist
        await initLogLoom({
            file: {
                destination: tmpDir,
                filename: "LogText",
                extension: "txt",
            },
        });
        expect(existsSync(path.join(tmpDir, "LogText.txt"))).toBe(true);
        resetLogLoom();
    });
});
