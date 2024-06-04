import json
from datetime import datetime, timedelta

with open("C:/Users/USER/OneDrive/Desktop/projectionCount/Projection-of-RPC-and-AC/json_files/sample_json_1.json") as data_file:
    req_payload = json.load(data_file)

# with open("../json_files/new_json.json") as data_file:
#     req_payload = json.load(data_file)


def convert_to_minutes(time, recurrence):
    if recurrence == "HOURLY" or recurrence == "hours":
        return time * 60
    elif recurrence == "DAILY" or recurrence == "days":
        return time * 24 * 60
    elif recurrence == "WEEKLY" or recurrence == "weeks":
        return time * 24 * 7 * 60
    elif (
        recurrence == "MONTHLY" or recurrence == "months"
    ):  # assuming avg 30 days per month
        return time * 24 * 30 * 60
    elif recurrence == "YEARLY" or recurrence == "years":
        return time * 24 * 365 * 60
    else:
        return 0


def recentTimestamp(start_time, end_time, interval_minutes, target_time):
    # Convert strings to datetime objects

    start_time = datetime.strptime(start_time, "%Y-%m-%d %H:%M")
    end_time = datetime.strptime(end_time, "%H:%M")
    target_time = datetime.strptime(target_time, "%d:%m:%y %H:%M")

    # Determine the start and end time for the task on the target date
    task_start_time = start_time
    task_end_time = target_time.replace(
        hour=end_time.hour, minute=end_time.minute, second=0, microsecond=0
    )

    last_task_time = None
    if task_start_time <= target_time:
        last_task_time = task_start_time

    # print(
    #     f"{type(task_start_time)},{type(task_end_time)},{type(target_time)}, {type(interval_minutes)}"
    # )

    while task_start_time <= task_end_time:
        task_start_time += timedelta(minutes=interval_minutes)
        if task_start_time <= target_time:
            last_task_time = task_start_time
        # print(f"{task_start_time},{task_end_time},{target_time}")

    # print(last_task_time)
    return last_task_time


"""Old JSON FORMAT"""     


def getTimeStampsForEachCount(res, scheduleCount):
    # print(json.dumps(scheduleCount, indent=4, default=str))
    # for schedule_name, counts in scheduleCount.items():
    #     # Find the index in the res list where the name matches schedule_name
    #     for key, vals in counts.items():
    #         print(key, vals)
    #         index = 0
    #         for i in range(len(res)):
    #             # print(res[i]['name'], vals)
    #             if res[i]['name'] == key:
    #                 # print(res[i]['name'], key)
    #                 index = i
    #                 break
    #         # print(type(res[index]['timestamp']))
    #         i = 0
    #         timeStamps = []
    #         val = res[index]['timestamp']
    #         # print(val)
    #         # print(vals)
    #         while(i<index):
    #             timeStamps.append(val)
    #             val -= timedelta(minutes=res[index]['interval'])
    #             # print(val)
    #             print('hi')
    #             i+=1                
    #         res[index]['timestamps'] = timeStamps
    print(json.dumps(scheduleCount, indent=4, default=str))
    for key, vals in scheduleCount.items():
        print(key, vals)


def getValidTimestamps(data, given_time, scheduleCount):   
    print(scheduleCount)
    res = []
    start_date = data.get("createdAt").split("T")[0]
    for protection in data["protections"]:
        for schedule in protection["schedules"]:
            name = schedule.get("name")
            repeat_interval = convert_to_minutes(
                schedule.get("schedule").get("repeatInterval").get("every"),
                schedule.get("schedule").get("recurrence"),
            )
            try:
                start_window = start_date + " " + schedule["schedule"]["startTime"]
                end_window = "23:59"
            except KeyError:
                start_window = (
                    start_date
                    + " "
                    + schedule["schedule"]["activeTime"]["activeFromTime"]
                )
                end_window = schedule["schedule"]["activeTime"]["activeUntilTime"]

            # print(name)
            timestamp = recentTimestamp(
                start_window, end_window, repeat_interval, given_time
            )

            # print(timestamp)

            res.append(
                {
                    "name": name,
                    "type": protection.get("type"),
                    "timestamp": timestamp,
                    "interval": repeat_interval,
                }
            )
    getTimeStampsForEachCount(res, scheduleCount)     
    return res


"""New JSON FoRMAT"""


# def getValidTimestamps(data, given_time):
#     res = []
#     start_date = data.get("createdAt").split("T")[0]
#     for protection in [
#         "arraySchedules",
#         "onPremisesSchedules",
#         "cloudStoreSchedules",
#     ]:
#         for schedule in req_payload[protection]:
#             id = schedule.get("scheduleId")
#             repeat_interval = convert_to_minutes(
#                 int(schedule.get("backupFrequency").get("value")),
#                 schedule.get("backupFrequency").get("unit"),
#             )
#             try:
#                 start_window = start_date + " " + schedule.get("StartAfter")
#                 end_window = "23:59"
#             except TypeError:
#                 start_window = start_date + " " + schedule.get("timeRangeStart")
#                 end_window = schedule.get("timeRangeEnd")

#             print(protection)
#             # print(id)
#             timestamp = recentTimestamp(
#                 start_window, end_window, repeat_interval, given_time
#             )

#             res.append(
#                 {
#                     "id": id,
#                     "type": protection,
#                     "timestamp": timestamp,
#                     "interval": repeat_interval,
#                 }
#             )
#     return res


if __name__ == "__main__":
    # res = getValidTimestamps(req_payload, "25:06:24 23:25")
    # print(json.dumps(res, indent=4, default=str))
    ...

# if name == "main":
#     res = getValidTimestamps(req_payload, "2024-03-25 11:00")
#     print(json.dumps(res, indent=4, default=str))