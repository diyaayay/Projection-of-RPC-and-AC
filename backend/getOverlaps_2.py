from collections import OrderedDict
import json
from math import gcd
from datetime import datetime, timedelta
import policyTree_1 as policyTree


def find_recent_source(path, end_time):
    occurrences = []
    time_format = "%Y-%m-%d %H:%M"
    times = []
    for p in path:
        times.append(datetime.strptime(p.get("startTime"), time_format))
    end_time = datetime.strptime(end_time, time_format)
    while all(time < end_time for time in times):
        min_time = min(times)
        min_indices = [index for index, value in enumerate(times) if value == min_time]

        for idx in min_indices:
            if path[idx].get("type") != "SNAPSHOT":  # not snapshot
                # print the link present, either cloud backup or on-prem
                source_time = times[idx - 1] - timedelta(
                    hours=path[idx - 1].get("interval")
                )
                print(
                    f"source : {source_time.strftime(time_format)} [{path[idx-1]['id']}] -> current : {times[idx].strftime(time_format)} [{path[idx]['id']}]"
                )
                occurrences.append(
                    (
                        source_time.strftime(time_format)
                        + " "
                        + str(path[idx - 1]["id"]),
                        times[idx].strftime(time_format) + " " + str(path[idx]["id"]),
                    )
                )
                times[idx] += timedelta(hours=path[idx].get("interval"))
            else:
                print(
                    f"current : {times[idx].strftime(time_format)} [{path[idx]['id']}]"
                )
                occurrences.append(
                    (times[idx].strftime(time_format) + " " + str(path[idx]["id"]))
                )
                times[idx] += timedelta(hours=path[idx].get("interval"))

    return occurrences


# for all the valid paths we are going to find the overlaps
def get_res(endTime, paths):
    res = []
    for path in paths:
        # print(path)
        res.append(
            {
                "schedules_involved": path[1:],
                "occurrences": find_recent_source(path[1:], endTime),
            }
        )
    return res


if __name__ == "__main__":
    with open(
        "D:/Adhi/BMS/HPE-CTY/Projection-of-Run/json_files/sample_json_3.json", "r"
    ) as data_file:
        data = json.load(data_file)
    root = policyTree.build_tree(data)
    paths = policyTree.find_all_paths(root)
    occurrences = get_res("2024-04-10 11:12", paths)
    # print(occurrences)
