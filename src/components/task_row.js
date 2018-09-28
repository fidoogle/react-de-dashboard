import React from 'react';
import * as Service from './service';
import TaskDot from './task_dot';

const TaskRow = (props) => {
  if (props.areaId) {
    const tasks = Service.getTasksInStage(props.stageId);

    const RenderedTasks = tasks.map((task, index) => {  //Top iteration in order of tasks
      if (index === 0) {
        return (
          <div key={task.Id} className="task">
            <div className="outer-dot"><TaskDot taskId={task.Id} teamId={props.team.Id} areaId={props.areaId} /></div>
            <div className="task-bg"></div>
          </div>
        );
      } else if (index === tasks.length - 1) {
        return (
          <div key={task.Id} className="task">
            <div className="task-bg"></div>
            <div className="outer-dot"><TaskDot taskId={task.Id} teamId={props.team.Id} areaId={props.areaId} /></div>
          </div>
        );
      } else {
        return (
          <div key={task.Id} className="task">
            <div className="outer-dot"><TaskDot taskId={task.Id} teamId={props.team.Id} areaId={props.areaId} /></div>
          </div>
        );
      }
    });

    return (
      <div className="dashboard-row">
        <div className="dashboard-team">

          <div className="team-name">{props.team.Title}</div>
          <div className="team-completed-bar" style={{ width: Service.formatPercent(props.percentComplete) }}></div>
          <div className="team-completed">{Service.formatPercent(props.percentComplete)}</div>

        </div>
        <div className="dashboard-tasks">
          {RenderedTasks}
        </div>
      </div>
    )
  } else {
    return (
      <div><img src={Service.LOADING_ICON} /></div>
    )
  }
};

export default TaskRow;