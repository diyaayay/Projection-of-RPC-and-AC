import pandas as pd
import json

pd.set_option('display.max_rows', None)
pd.set_option('display.max_columns', None)

with open("sampleJson.json", "r") as data_file:
    data=json.load(data_file)

df_protections = pd.json_normalize(data['protections'])
print(df_protections)
