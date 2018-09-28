import React from 'react';
import * as Service from './service';
import TaskRow from './task_row';

const TaskList = (props) => {
  if (props.areaId) {
    const matchedTeams = Service.getTeamsInArea(props.areaId);

    const RenderedTasks = matchedTeams.map(team => {
      let percentComplete = Service.getTeamCompletedTasks(team.ID, matchedTeams) / Service.getStageTasksCount(Service.SELECTED_STAGE_ID);  //TODO: pass in StageID
      return (
        <TaskRow key={team.Id} team={team} percentComplete={percentComplete} areaId={props.areaId} stageId={Service.SELECTED_STAGE_ID} />
      )
    });

    return (
      RenderedTasks
    )
  } else {
    return (
      <div><img src={Service.LOADING_ICON} /></div>
    )
  }
};

export default TaskList;