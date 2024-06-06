import json
from datetime import datetime, timedelta
from backend.PolicyCostSize import projectCost  # Ensure this import path is correct

with open("C:/Users/USER/OneDrive/Desktop/projectionCount/Projection-of-RPC-and-AC/json_files/sample_json_1.json") as data_file:
    req_payload = json.load(data_file)

def convert_to_minutes(time, recurrence):
    if recurrence == "HOURLY" or recurrence == "hours":
        return time * 60
    elif recurrence == "DAILY" or recurrence == "days":
        return time * 24 * 60
    elif recurrence == "WEEKLY" or recurrence == "weeks":
        return time * 24 * 7 * 60
    elif recurrence == "MONTHLY" or recurrence == "months":  # assuming avg 30 days per month
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

    while task_start_time <= task_end_time:
        task_start_time += timedelta(minutes=interval_minutes)
        if task_start_time <= target_time:
            last_task_time = task_start_time

    return last_task_time

def getTimeStampsForEachCount(res, scheduleCount):
    for obj in res:
        absolute_copies = (
            scheduleCount.get("Active").get(obj.get("type")).get((obj.get("name")))
        )
        back_track_time = obj.get("timestamp")
        timestamps = []
        for i in range(0, absolute_copies):
            timestamps.append(back_track_time.strftime("%Y-%m-%d %H:%M:%S"))
            back_track_time -= timedelta(minutes=obj.get("interval"))
            i += 1
        obj["timestamps"] = timestamps

    print(json.dumps(res, indent=4, default=str))
    information = {
        "SNAPSHOT": {"full_backup": 50, "cost": 20, "c_ratio": 0.04},
        "BACKUP": {"full_backup": 55, "cost": 40, "c_ratio": 0.1},
        "CLOUD_BACKUP": {"full_backup": 80, "cost": 60, "c_ratio": 0.1},
    }
    return projectCost(res, information=information)

def getValidTimestamps(data, given_time, scheduleCount):   
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

            timestamp = recentTimestamp(
                start_window, end_window, repeat_interval, given_time
            )

            res.append(
                {
                    "name": name,
                    "type": protection.get("type"),
                    "timestamp": timestamp,
                    "interval": repeat_interval,
                }
            )
    response = getTimeStampsForEachCount(res, scheduleCount)  
    print(response)   
    return response

if __name__ == "__main__":
    given_time = "25:06:24 23:25"
    scheduleCount = {
        "Active": {
            "SNAPSHOT": {"Array_Snapshot_1": 3, "Array_Snapshot_2": 3},
            "BACKUP": {"On-Premises_Protection_Store_4": 3, "On-Premises_Protection_Store_7": 4},
            "CLOUD_BACKUP": {"HPE_Cloud_Protection_Store_5": 4, "HPE_Cloud_Protection_Store_6": 1},
        }
    }
    getValidTimestamps(req_payload, given_time, scheduleCount)
