import json
from flask import Flask, jsonify
from flask import request
<<<<<<< HEAD:app.py
import backend.getOverlaps_2 as getOverlaps, backend.policyTree_1 as policyTree
=======
import backend.getOverlaps as getOverlaps, backend.policyTree as policyTree
import backend.ProjectionCount as ProjectionCount
>>>>>>> b17510de8f2f2fe3f5c03bea31deaa806df5a515:main.py

app = Flask(__name__)

with open("json_files/sample_json_3.json", "r") as data_file:
    data = json.load(data_file)


@app.route("/get_overlaps", methods=["GET"])
def get_overlaps():
    end_time = request.args.get("end_time")
    root = policyTree.build_tree(data)
    paths = policyTree.find_all_paths(root)
    occurrences = getOverlaps.get_res(end_time, paths)
    return jsonify(occurrences)


@app.route("/get_policy_tree", methods=["GET"])
def get_policy_tree():
    return jsonify(policyTree.tree_to_dict(policyTree.build_tree(data["protections"])))

@app.route("/givenTime",methods=["POST"])
def projection_count():
    givenTime = request.get_json('givenTime')
    scheduleCount = ProjectionCount.projectionCount(data, givenTime=givenTime['givenTime'])
    return jsonify(scheduleCount)


if __name__ == "__main__":
    app.run(debug=True)
