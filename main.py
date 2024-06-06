import json
from flask import Flask, jsonify, request
import backend.getOverlaps as getOverlaps
import backend.policyTree as policyTree
import backend.ProjectionCount as ProjectionCount
from flask_cors import CORS
import pymongo

app = Flask(__name__)
CORS(app)

conn_str = 'mongodb+srv://sanketemalasge2:hpe123@cluster0.0iph2l9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

try:
    client = pymongo.MongoClient(conn_str)
except Exception as e:
    print("error: ", e)

db = client['HPE']
collection = db['Policy Json']

with open("json_files/sample_json_1.json", "r") as data_file:
    data = json.load(data_file)

# with open("json_files/new_json2.json", "r") as data_file:
#     data = json.load(data_file)

@app.route("/get_overlaps", methods=["GET"])
def get_overlaps():
    end_time = request.args.get("end_time")
    occurrences = getOverlaps.get_res(end_time)
    return jsonify(occurrences)

@app.route("/get_policy_tree", methods=["GET"])
def get_policy_tree():
    return jsonify(policyTree.tree_to_dict(policyTree.build_tree(data["protections"])))

@app.route("/givenTime", methods=['POST'])
def projection_count():
    print(request.get_json())
    givenTime = request.get_json()
    print('givenTime is: ', givenTime)
    # jsonData = collection.find_one({"policyName":givenTime['policyName']})
    # print(jsonData)
    scheduleCount = ProjectionCount.projectionCount(data, givenTime=givenTime['givenTime'])
    return jsonify(scheduleCount)

@app.route("/jsondata", methods=["POST"])
def jsondata():
    data = request.json
    print("Received data:", data)
    return jsonify({"message": "Total object received successfully"}), 200

@app.route("/database", methods=["POST"])
def database():
    try:
        data = request.json
        policy_name = data.get("policyName")

        if policy_name:
            # Check if a policy with the same name already exists
            existing_policy = collection.find_one({"policyName": policy_name})
            if existing_policy:
                print("name already exists")
                return jsonify({"error": "Policy name already exists"}), 400

            # Insert the data into the MongoDB collection
            result = collection.insert_one(data)
            # Return a success message with the inserted ID
            return jsonify({"message": "Data inserted successfully", "id": str(result.inserted_id)}), 200
        else:
            return jsonify({"error": "Policy name is required"}), 400

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)