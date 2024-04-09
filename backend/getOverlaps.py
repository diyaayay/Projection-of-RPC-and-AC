from collections import OrderedDict
import json
from math import gcd
from datetime import datetime, timedelta
import backend.policyTree as policyTree

# Reading the data from the json for now. Later should be directly read from the server
with open("json_files/sample_json_1.json") as data_file:
    req_payload = json.load(data_file)


# Construct policy tree for easy access
root = policyTree.build_tree(req_payload["protections"])
# this root is dictionary we hav to convert it to json incase if we are using.


# find all the possible paths from the tree which will give the only schedule_ids to find overlaps.
paths = policyTree.find_all_paths(root)
# print(paths)


# function that gives all the overlaps possible for given schedules
def find_simultaneous_ring(path, initial_times, intervals, end_time):
    time_format = "%Y-%m-%d %H:%M"
    end_time = datetime.strptime(end_time, time_format)
    times = [datetime.strptime(time_str, time_format) for time_str in initial_times]
    occurrences = []

    while all(time < end_time for time in times):
        if all(time == times[0] for time in times):
            tup = [
                (time.strftime(time_format) + " " + str(path[idx]))
                for idx, time in enumerate(times)
            ]
            occurrences.append(tuple(tup))
        else:
            for i in range(len(times)):
                for j in range(i + 1, len(times)):
                    if times[i] == times[j] and j - i == 1:
                        if all(times[k] >= times[i] for k in range(i)):
                            occurrences.append(
                                (
                                    times[i].strftime(time_format) + " " + str(path[i]),
                                    times[j].strftime(time_format) + " " + str(path[j]),
                                )
                            )

        min_time = min(times)
        min_indices = [i for i, time in enumerate(times) if time == min_time]
        for idx in min_indices:
            times[idx] += timedelta(hours=intervals[idx])

    if not occurrences:
        return "No occurrences found."
    return list(OrderedDict.fromkeys(occurrences))


# for all the valid paths we are going to find the overlaps
def get_res(endTime):
    res = []
    for path in paths:
        initial_times = []
        intervals = []
        for id in path[1:]:
            node = policyTree.find_node(root, id)
            initial_times.append(
                req_payload["createdAt"].split("T")[0] + " " + node.startTime
            )
            intervals.append(node.interval)
        res.append(
            {
                "schedules_involved": path[1:],
                "occurrences": find_simultaneous_ring(
                    path[1:], initial_times, intervals, endTime
                ),
            }
        )
    return res
