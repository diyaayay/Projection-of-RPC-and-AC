import json

# function for converting the time to lowest possible unit - hours
def convert_to_hours(time, recurrence):
    if recurrence == "HOURLY":
        return time
    elif recurrence == "DAILY":
        return time * 24
    elif recurrence == "WEEKLY":
        return time * 24 * 7
    elif recurrence == "MONTHLY":  # assuming avg 30 days per month
        return time * 24 * 30

# Class TreeNode 
class TreeNode:

    def __init__(self, id, schedule_type, start_time, interval):
        self.id = id
        self.type = schedule_type
        self.startTime = start_time
        self.interval = interval
        self.children = []

    def add_child(self, child):
        self.children.append(child)

# creation of tree
def build_tree(protections):
    root = TreeNode("root", "root", "root", "root")
    schedule_map = {}

    for protection in protections:
        schedule_type = protection["type"]
        for schedule in protection["schedules"]:
            schedule_id = schedule["scheduleId"]

            try:
                startTime = schedule["schedule"]["startTime"]
            except KeyError:
                startTime = schedule["schedule"]["activeTime"]["activeFromTime"]

            interval = convert_to_hours(
                schedule["schedule"]["repeatInterval"]["every"],
                schedule["schedule"]["recurrence"],
            )

            schedule_map[schedule_id] = schedule

            if schedule_type == "SNAPSHOT":
                root.add_child(
                    TreeNode(schedule_id, schedule_type, startTime, interval)
                )

            else:
                parent_id = schedule["sourceProtectionScheduleId"]
                if parent_id in schedule_map:
                    parent_node = find_node(root, parent_id)
                    if parent_node:
                        parent_node.add_child(
                            TreeNode(schedule_id, schedule_type, startTime, interval)
                        )
                else:
                    print(
                        f"Parent schedule with id {parent_id} not found for schedule {schedule_id}."
                    )

    return root


def find_node(root, target_id):
    if root.id == target_id:
        return root
    for child in root.children:
        node = find_node(child, target_id)
        if node:
            return node
    return None

# utility function
def tree_to_dict(node):
    result = {
        "id": str(node.id),
        "type": str(node.type),
        "startTime": str(node.startTime),
        "interval": str(node.interval),
    }
    if node.children:
        result["children"] = [tree_to_dict(child) for child in node.children]
    return result

# search for possible paths
def find_all_paths(root):
    paths = []
    current_path = []

    def dfs(node):
        if not node:
            return
        current_path.append(node.id)
        if not node.children:
            paths.append(list(current_path))
        else:
            for child in node.children:
                dfs(child)
        current_path.pop()

    dfs(root)
    return paths
