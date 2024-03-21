"""
Usage:
python3 scripts/process_data.py -f <input-file> [-o 'fire_response_data.csv'] [--date-after '2023-12-01']
"""

import argparse
import pandas as pd

"""
Original columns:
event_number: text,
dispatch_year: number,
dispatch_month: number,
dispatch_day: number,
dispatch_month_name: text,
dispatch_dayofweek: text,
dispatch_date: text,
dispatch_date_date: datetime,
dispatch_time: text,
dispatch_datetime: datetime,
event_close_date: text,
event_close_date_date: datetime,
event_close_time: text,
event_close_datetime: datetime,
event_duration_mins: number,
event_type_group: text,
event_description: text,
neighbourhood_id: number,
neighbourhood_name: text,
approximate_location: text,
equipment_assigned: text,
latitude: number,
longitude: number,
geometry_point: geopoint,
response_code: text,
event_type_code: text,
event_type_description: text,
"""

COLUMN_MAPPING = {
    'dispatch_datetime': 'datetime',
    'event_duration_mins': 'event_duration_mins',
    'event_description': 'event_description',
    'latitude': 'latitude',
    'longitude': 'longitude',
    'response_code': 'response_code',
}

def parse_args():
    parser = argparse.ArgumentParser()
    parser.add_argument('-f', '--file', type=str, required=True, help='Path to input csv file exported from Edmonton Open Data Portal')
    parser.add_argument('-o', '--output', type=str, default='fire_response_data.csv', help='Path to output file')
    parser.add_argument('-d', '--date-after', type=str, default='2023-12-01', help='Filter out rows with dispatch_datetime before this date (YYYY-MM-DD)')
    return parser.parse_args()

def filter_and_rename_columns(df: pd.DataFrame, column_mapping: dict[str, str]) -> pd.DataFrame:
    return df[column_mapping.keys()].rename(columns=column_mapping)


def main():
    args = parse_args()

    df = pd.read_csv(args.file, header=0)
    print(f"Load '{args.file}' with {len(df)} rows")

    # filter out rows with dispatch_datetime before 2024
    df['dispatch_datetime'] = pd.to_datetime(df['dispatch_datetime'])
    df = df[df['dispatch_datetime'] > args.date_after]
    
    # parse response code from event_type_code column
    df['response_code'] = df['event_type_code'].str.extract(r'\d+([ABCDE])\d+')
    df['response_code'] = df['response_code'].fillna('unknown')

    df['event_description'] = df['event_description'].fillna('OTHER')

    df = filter_and_rename_columns(df, COLUMN_MAPPING)

    df.to_csv(args.output, index=False)
    print(f"Save to '{args.output}' with {len(df)} rows")


if __name__ == '__main__':
    main()
