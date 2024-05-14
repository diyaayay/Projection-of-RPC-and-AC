from collections import OrderedDict
import json
from math import gcd
from datetime import datetime, timedelta

# import backend.policyTree as policyTree
import policyTree

# Reading the data from the json for now. Later should be directly read from the server
with open("json_files/sample_json_2.json") as data_file:
    req_payload = json.load(data_file)


# Construct policy tree for easy access
root = policyTree.build_tree(req_payload["protections"])
# this root is dictionary we hav to convert it to json incase if we are using.


# find all the possible paths from the tree which will give the only schedule_ids to find overlaps.
paths = policyTree.find_all_paths(root)
# print(paths)


def find_recent_source(path, initial_times, intervals, end_time):
    print(path)
    print(initial_times)
    print(intervals)
    time_format = "%Y-%m-%d %H:%M"
    times = [datetime.strptime(time_str, time_format) for time_str in initial_times]
    end_time = datetime.strptime(end_time, time_format)
    while all(time < end_time for time in times):
        min_time = min(times)
        min_indices = [index for index, value in enumerate(times) if value == min_time]

        for idx in min_indices:
            if path[idx] != 1:  # not snapshot
                # print the link present, either cloud backup or on-prem
                source_time = times[idx - 1] - timedelta(hours=intervals[idx - 1])
                print(
                    f"source : {source_time.strftime(time_format)} [{idx-1}] -> current : {times[idx].strftime(time_format)} [{idx}]"
                )
                times[idx] += timedelta(hours=intervals[idx])
            else:
                print(
                    f"current : {times[idx].strftime(time_format)} [{idx}]"
                )
                times[idx] += timedelta(hours=intervals[idx])
    
    return []

# for all the valid paths we are going to find the overlaps
def get_res(endTime):
    res = []
    for path in paths:
        initial_times = []
        intervals = []
        for id in path[1:]:
            node = policyTree.find_node(root, id)
            initial_times.append(
                req_payload["createdAt"].split(" ")[0] + " " + node.startTime
            )
            intervals.append(node.interval)
        res.append(
            {
                "schedules_involved": path[1:],
                "occurrences": find_recent_source(
                    path[1:], initial_times, intervals, endTime
                ),
            }
        )
        # print("---------------------")
        print(res)
    return res

if __name__ == "__main__":
    # get_res("2024-04-10 11:12")
    get_res("2023-10-26 11:12")
