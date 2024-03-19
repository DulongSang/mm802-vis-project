import Papa from 'papaparse';

import { FireResponseDataRow, ResponseCode, DayOfWeek, EventDescription } from '../types/DataSetInfo';

export async function parseDataFile(file: File): Promise<FireResponseDataRow[]> {
    return new Promise((resolve, reject) => {
        Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
            resolve(parseData(results.data));
        },
        error: (error: any) => {
            reject(error);
        },
        });
    });
}

function parseData(data: any[]): FireResponseDataRow[] {
    return data.map((row) => {
        return {
            year: parseInt(row.year),
            month: parseInt(row.month),
            dayofweek: row.dayofweek as DayOfWeek,
            datetime: new Date(row.datetime),
            event_duration_mins: parseInt(row.event_duration_mins),
            event_description: row.event_description as EventDescription,
            latitude: parseFloat(row.latitude),
            longitude: parseFloat(row.longitude),
            response_code: row.response_code as ResponseCode,
        };
    });
}
