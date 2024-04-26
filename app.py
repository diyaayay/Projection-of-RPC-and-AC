import json
from flask import Flask, jsonify
from flask import request
import backend.getOverlaps_2 as getOverlaps, backend.policyTree_1 as policyTree

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


if __name__ == "__main__":
    app.run(debug=True)
