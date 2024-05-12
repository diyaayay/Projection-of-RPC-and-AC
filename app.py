import json
from flask import Flask, jsonify
from flask import request
from datetime import datetime
import server.backend.getOverlaps as getOverlaps, server.backend.policyTree as policyTree
import backend.ProjectionCount as ProjectionCount

app = Flask(__name__)

with open("json_files/sample_json_1.json", "r") as data_file:
    data = json.load(data_file)


class APIError(Exception):
    code = 400
    description = "Bad Request"
    pass


def compare(start, query):
    query = datetime.strptime(query, "%Y-%m-%d %H:%M")
    start = datetime.strptime(
        start,
        "%Y-%m-%dT%H:%M:%S.%fZ",
    )
    if start > query:
        raise APIError("query date and time is before created time of the policy.")


@app.errorhandler(APIError)
def handle_exception(err):
    response = {"error": err.description, "message": ""}
    if len(err.args) > 0:
        response["message"] = err.args[0]

    app.logger.error(f"{err.description}: {response.get('message')}")
    return jsonify(response), err.code


@app.route("/get_overlaps", methods=["GET"])
def get_overlaps():
    end_time = request.args.get("end_time")

    compare(data.get("createdAt"), end_time)

    root = policyTree.build_tree(data)
    paths = policyTree.find_all_paths(root)
    occurrences = getOverlaps.get_res(paths, end_time)
    return jsonify(occurrences)


@app.route("/get_policy_tree", methods=["GET"])
def get_policy_tree():
    return jsonify(policyTree.tree_to_dict(policyTree.build_tree(data)))


@app.route("/givenTime", methods=["POST"])
def projection_count():
    givenTime = request.get_json("givenTime")
    compare(data.get("createdAt"), givenTime)

    scheduleCount = ProjectionCount.projectionCount(
        data, givenTime=givenTime["givenTime"]
    )
    return jsonify(scheduleCount)


if __name__ == "__main__":
    app.run(debug=True)
