import React from 'react';
import AreaList from './area_list';
import * as Service from './service';

class AreaIndex extends React.Component {

  constructor(props) {
    super(props);
    this.state = { loaded: false };
  }

  componentWillMount() {
    Service.init(this); //defined in service.js
  }

  render() {
    if (Service.AREAS_TEAMS_TASKS.length > 0) {
      return (
        <section className="dashboard">

          <div className="dashboard-title">
            Lorem Ipsum Dmieldan
            </div>

          <div className="dashboard-header">
            <div className="area-header">Quorum Ipsilum</div>
            <div className="stage-header">
              <div className="current-stage">Cnults Snilq Fra</div>
              <div className="stages">
                <span>Sanqs:</span>
                <span>Plmag</span>
                <span>&gt;</span>
                <span>Minstam</span>
                <span>&gt;</span>
                <span>Plimsaum</span>
                <span>&gt;</span>
                <span>Ceaqml</span>
                <span>&gt;</span>
                <span>Vunmerl</span>
              </div>
            </div>
          </div>
          <AreaList areasData={Service.AREAS_TEAMS_TASKS} />

          <div className="dashboard-footer"></div>

        </section>
      );
    } else {
      return (
        <div><img src={Service.LOADING_ICON} /></div>
      );
    }
  }
};

export default AreaIndex;