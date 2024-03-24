import pandas as pd
import json

pd.set_option('display.max_rows', None)
pd.set_option('display.max_columns', None)

with open("sampleJson.json", "r") as data_file:
    data = json.load(data_file)


df_schedules = pd.json_normalize(data['protections'], 'schedules', errors='ignore')


df_protections = pd.json_normalize(data['protections'])
result = pd.concat([df_protections, df_schedules], axis=1)

print(result)
