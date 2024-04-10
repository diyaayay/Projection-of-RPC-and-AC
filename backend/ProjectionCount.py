from flask import Flask, request
import json
import datetime
from datetime import datetime
import math

app = Flask(__name__)

#load the json file and read the sampleJson.json.
# with open('../json_files/sample_json_1.json', 'r') as jsonData:
#     data = json.load(jsonData)

#function converting all the time units to minutes.  
def convertTime(expireTime):
    if expireTime["unit"] == "HOURLY":
        return expireTime['value'] * 60
    elif expireTime["unit"] == "DAILY" or expireTime['unit'] == "DAYS":
        return expireTime['value'] * 24 * 60
    elif expireTime["unit"] == "WEEKLY" or expireTime['unit'] == "WEEKS":
        return expireTime['value'] * 24 * 7 * 60
    elif expireTime["unit"] == "MONTHLY" or expireTime['unit'] == "MONTHS":
        return expireTime['value'] * 24 * 30 * 60
    elif expireTime["unit"] == "YEARLY" or expireTime['unit'] == "YEARS":
        return expireTime['value'] * 24 * 365 * 60
    else:
        return 0
    
#converting the string time to datetime object.
# def convertStrToInt(time):
#     hourMin = datetime.strptime(time, "%H:%M")
#     hours = int((hourMin.hour)) * 60
#     minutes = int(hourMin.minute)
#     return hours + minutes

#function converting time string to minutes format.
def convertStrToInt(time):
    hours, minutes = map(int, time.split(':'))
    total_minutes = hours * 60 + minutes
    return total_minutes

#function to give time difference
def time_difference(input_date):
    input_date = datetime.strptime(input_date, "%d:%m:%y %H:%M")
    current_time = datetime.now()
    time_diff =  input_date - current_time
    time_diff_minutes = int(time_diff.total_seconds() / 60)
    return time_diff_minutes


#funtion to convert recurrence time units into minutes 
def recToUnit(schedule):
    expire = {
        "unit": schedule["recurrence"],
        "value": schedule["repeatInterval"]["every"]
    }
    return convertTime(expire)
    

#function to calculate the number of projection count for the various protections and their schedules.
# def projectionCount(data, givenTime="04:04:24 11:00"):
# @app.route("/api/givenTime", methods=['POST'])
def projectionCount(data, givenTime):
    # data = request.get_json()
    # givenTime = int(data['givenTime'])  # For testing, replace this with the actual given time
    # print("givenTime: ", givenTime)
    givenTime = time_difference(givenTime)
    scheduleCount = {}
    for protection in data["protections"]:
        protectType = protection['type']
        scheduleCount[protectType] = {}
        for schedule in protection["schedules"]:
            count = 0
            if 'activeTime' in schedule['schedule']:
                print("in activeTime")
                from_time = schedule['schedule']['activeTime']['activeFromTime']
                until_time = schedule['schedule']['activeTime']['activeUntilTime']
                delta = convertStrToInt(until_time) - convertStrToInt(from_time)
                max_count_per_day = math.ceil(delta / recToUnit(schedule["schedule"]))

                # Case 1: givenTime is before the active time range
                if givenTime < convertStrToInt(from_time):
                    print(convertStrToInt(from_time), "  case 1 is active")
                    count = 0

                # Case 2: givenTime is after the active time range
                elif givenTime > delta:
                    # Sub-case: givenTime is within a single day
                    if givenTime < 1440:
                        print("case 2--i is active, given < 24")
                        max = math.ceil(delta / recToUnit(schedule["schedule"]))
                        count = max
                    else:
                        # Sub-case: givenTime spans multiple days
                        print("case 2--ii is active, given > 24")
                        days_multiple = math.floor(givenTime / 1440)
                        count_1 = days_multiple * math.ceil(delta / recToUnit(schedule["schedule"]))
                        
                        remain_time = givenTime % 1440
                        # remain_time < fromTime
                        if remain_time < convertStrToInt(from_time):
                            count = count_1
                        # remain_time > fromTime````
                        else:
                            count_2 = math.ceil((remain_time - convertStrToInt(from_time)) / recToUnit(schedule["schedule"]))
                            count = count_1 + count_2

                # Case 3: givenTime is greater than expiry
                else:
                    if convertTime(schedule['expireAfter']) > 1440:
                        print("case 3--i is active, exp > 24")
                        days_multiple = math.floor(schedule['expireAfter'] / 1440)
                        count_1 = days_multiple * max_count_per_day
                        
                        remain_time = givenTime % 1440
                        if remain_time < convertStrToInt(from_time):
                            count = count_1
                        else:
                            count_2 = math.ceil((remain_time - convertStrToInt(from_time)) / recToUnit(schedule["schedule"]))
                            count = count_1 + count_2
                    else:
                        print("case 3--ii is active, exp < 24")
                        if (convertTime(schedule['expireAfter'])  > delta ):
                            count = max
                        else:
                            count = math.ceil( convertTime(schedule['expireAfter'])  / recToUnit(schedule["schedule"]))
            else:
                # print("in StartTime")
                if givenTime and (givenTime) < convertTime(schedule['expireAfter']):
                    count = math.ceil(((givenTime) - convertStrToInt(schedule['schedule']['startTime']))/ recToUnit(schedule["schedule"]))
                else:
                    count = math.ceil((convertTime(schedule['expireAfter']) - convertStrToInt(schedule['schedule']['startTime']))/ recToUnit(schedule["schedule"]))
                    
            scheduleCount[protectType][schedule['name']] = count
    print(json.dumps(scheduleCount, indent=4))
    return scheduleCount

if __name__ == "__main__":
    app.run(debug=True)