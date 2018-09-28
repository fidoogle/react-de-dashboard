import React from 'react';
import * as Service from './service';

const TaskHeaders = (props) => {
  if (props.tasks) {
    const RenderedTasks = props.tasks.map(task =>
      <div key={task.Id} className="task-header">{task.Title}</div>
    );
    return (
      <div className="dashboard-task-headers">
        {RenderedTasks}
      </div>
    )
  } else {
    return (
      <div><img src={Service.LOADING_ICON} /></div>
    )
  }
};

export default TaskHeaders;