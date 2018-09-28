import React from 'react';
import * as Service from './service';

const TaskDot = (props) => {

  if (props.areaId) {
    const matchedTeams = Service.getTeamsInArea(props.areaId);
    const teamTasks = Service.getTasksForTeam(props.teamId, matchedTeams);

    const task = teamTasks.find(obj => {
      return obj['Dash_x0020_TaskId'].toString() == props.taskId.toString();
    });

    if (task) {
      const status = (task.Status) ? task.Status.replace(/\s/g, '') : '';
      return <div className={"inner-dot " + status}></div>;
    } else {
      return <div className="inner-dot dark"></div>;
    }

  } else {
    return (
      <div><img src={Service.LOADING_ICON} /></div>
    )
  }
};

export default TaskDot;