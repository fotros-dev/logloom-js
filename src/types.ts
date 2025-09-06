//logger types
export interface LogOptions {
    time? : TimeOptions,
    file : fileOptions,
    row? : rowOptions,
}

export interface TimeOptions {
    isTimestampEnable?: boolean,
}

export interface fileOptions {
    destination: string,
    filename: string,
    extension: 'log' | 'txt' | 'csv',
}

export interface rowOptions {
    isGenId? : boolean,
}


//file types
export interface fileManagerParameters {
    destination: string;
    filename: string;
    extension: "log" | "txt" | "csv";
}

//singleType
export type rowType = 'ERROR' | 'INFO' | 'WARNING' | 'ALERT'