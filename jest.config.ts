import type { Config } from "jest";

const config: Config = {
    testEnvironment: "node",
    transform: {
        "^.+\\.(t|j)sx?$": "@swc/jest",
    },
    extensionsToTreatAsEsm: [".ts"],
    moduleFileExtensions: ["ts", "tsx", "js"],
    roots: ["<rootDir>/tests"],
    clearMocks: true,
};

export default config;
