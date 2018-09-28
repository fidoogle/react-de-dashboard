import React from 'react';
import * as Service from './service';

const DashboardHeader = ({ areaTitle, areaPercent, stagePercent, match }) => {

  const GANTT = 'Gantt View';
  const TASK = 'Task View';

  let selectedView = TASK;
  let zoomButtons = (<div className="title-zoom"><span style={{ padding: '10px' }}>&nbsp;</span></div>);

  if (match.url.indexOf('details') != -1) {
    selectedView = GANTT;
    zoomButtons = (<div className="title-zoom">
      <a href="javascript: Service.TIMELINE.zoomIn( 0.2);"><img src="https://storage.googleapis.com/dedashboard/images/zoom-in-16.png" /></a>
      <a href="javascript: Service.TIMELINE.zoomOut( 0.2);"><img src="https://storage.googleapis.com/dedashboard/images/zoom-out-16.png" /></a>
      <a href="javascript: Service.chartMove(-0.2);"><img src="https://storage.googleapis.com/dedashboard/images/arrow-left-16.png" /></a>
      <a href="javascript: Service.chartMove( 0.2);"><img src="https://storage.googleapis.com/dedashboard/images/arrow-right-16.png" /></a>
      <a href="javascript: Service.TIMELINE.fit();"><img src="https://storage.googleapis.com/dedashboard/images/refresh-16.png" /></a>
    </div>);

  }

  return (

    <div className="dashboard-title-row">
      <div className="title-area">
        <div className="title">{areaTitle}</div>
        <div className="overall-progress area">
          <div>Ipsum Talmqm</div>
          <div className="overall-progress-bar area">
            <div className="overall-completed-bar" style={{ width: Service.formatPercent(areaPercent) }}></div>
          </div>
          <div>{Service.formatPercent(areaPercent)}</div>
        </div>
      </div>
      <div className="title-stage">
        <div className="title">{'Aqupoi Houtaip'}</div>
        <div className="overall-progress">
          <div>Staprel</div>
          <div className="overall-progress-bar">
            <div className="overall-completed-bar" style={{ width: Service.formatPercent(stagePercent) }}></div>
          </div>
          <div>{Service.formatPercent(stagePercent)}</div>
        </div>
      </div>
      <div className="title-far-right">
        <div className="title-view">
          &nbsp;
                </div>

        {zoomButtons}

      </div>
    </div>
  )

};

export default DashboardHeader;