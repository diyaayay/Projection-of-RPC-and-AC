import pandas as pd
import json
from flask import Flask, jsonify
from flask import request
import getOverlaps

app = Flask(__name__)

pd.set_option("display.max_rows", None)
pd.set_option("display.max_columns", None)

with open("sampleJson.json", "r") as data_file:
    data = json.load(data_file)


df_schedules = pd.json_normalize(data["protections"], "schedules", errors="ignore")


df_protections = pd.json_normalize(data["protections"])
result = pd.concat([df_protections, df_schedules], axis=1)

print(result)


@app.route("/data/<string:id>", methods=["GET"])
def get_data_by_id(id):
    filtered_data = result[result["id"] == id]
    if filtered_data.empty:
        return jsonify({"error": "No data found for the given ID"}), 404
    else:
        return jsonify(filtered_data.to_dict(orient="records"))


@app.route("/get_overlaps", methods=["GET"])
def get_overlaps():
    end_time = request.args.get("end_time")
    # occurrences = getOverlaps_v2.get_overlaps(end_time)
    occurrences = getOverlaps.get_res(end_time)
    return jsonify(occurrences)


if __name__ == "__main__":
    app.run(debug=True)
