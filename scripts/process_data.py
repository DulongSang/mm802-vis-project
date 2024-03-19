import pandas as pd

FIRE_RESPONSE_DATA_FILE_PATH = 'Fire_Response__Current_and_Historical_20240313.csv'
OUTPUT_FILE_PATH = 'fire_response_data.csv'

COLUMN_MAPPING = {
    'dispatch_year': 'year',
    'dispatch_month': 'month',
    'dispatch_dayofweek': 'dayofweek',
    'dispatch_datetime': 'datetime',
    'event_duration_mins': 'event_duration_mins',
    'event_description': 'event_description',
    'latitude': 'latitude',
    'longitude': 'longitude',
    'response_code': 'response_code',
}

def filter_and_rename_columns(df: pd.DataFrame, column_mapping: dict[str, str]) -> pd.DataFrame:
    return df[column_mapping.keys()].rename(columns=column_mapping)


def main():
    df = pd.read_csv(FIRE_RESPONSE_DATA_FILE_PATH, header=0)
    print(f"Load '{FIRE_RESPONSE_DATA_FILE_PATH}' with {len(df)} rows")

    # filter out rows with dispatch_datetime before 2024
    df['dispatch_datetime'] = pd.to_datetime(df['dispatch_datetime'])
    df = df[df['dispatch_datetime'] > '2024-01-01']
    
    # parse response code from event_type_code column
    df['response_code'] = df['event_type_code'].str.extract(r'\d+([ABCDE])\d+')
    df['response_code'] = df['response_code'].fillna('unknown')

    df = filter_and_rename_columns(df, COLUMN_MAPPING)

    df.to_csv(OUTPUT_FILE_PATH, index=False)
    print(f"Save to '{OUTPUT_FILE_PATH}' with {len(df)} rows")


if __name__ == '__main__':
    main()
