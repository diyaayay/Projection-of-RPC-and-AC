import json
from flask import Flask, jsonify
from flask import request
import backend.getOverlaps as getOverlaps, backend.policyTree as policyTree
import backend.ProjectionCount as ProjectionCount

app = Flask(__name__)

with open("json_files/sample_json_1.json", "r") as data_file:
    data = json.load(data_file)


@app.route("/get_overlaps", methods=["GET"])
def get_overlaps():
    end_time = request.args.get("end_time")
    occurrences = getOverlaps.get_res(end_time)
    return jsonify(occurrences)


@app.route("/get_policy_tree", methods=["GET"])
def get_policy_tree():
    return jsonify(policyTree.tree_to_dict(policyTree.build_tree(data["protections"])))


@app.route("/givenTime",methods=['POST'])
def projection_count():
    givenTime = request.get_json('givenTime')
    scheduleCount = ProjectionCount.projectionCount(data, givenTime=givenTime['givenTime'])
    return jsonify(scheduleCount)

if __name__ == "__main__":
    app.run(debug=True)
