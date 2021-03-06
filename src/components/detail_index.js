import React from 'react';
import _ from 'lodash';
import * as Service from './service';
import TeamCalendar from './team_calendar';
import DashboardTopNav from './dashboard_topnav';
import DashboardHeader from './dashboard_header';

const styles = {
  in: {
    color: '#1a1a1a',
    backgroundColor: '#ffffff',
    textDecoration: 'none'
  },
  out: {
    color: '#ffffff',
    backgroundColor: '#1a1a1a',
    textDecoration: 'none'
  }
};

class DetailIndex extends React.Component {

  constructor(props) {
    super(props);
    this.state = { loaded: false };
  }

  render() {
    let area = {};
    let stagePercent = 0;
    let areaPercent = 0;
    try {
      area = _.find(Service.AREAS_TEAMS_TASKS, { 'ID': parseInt(this.props.match.params.areaId, 10) });
      stagePercent = Service.percentCompleteForStage(this.props.match.params.areaId, Service.SELECTED_STAGE_ID);
      areaPercent = stagePercent / Service.DASH_STAGES.length; //Todo: need to add previous completed stages before Current Stage
    } catch (err) {
      Service.init(this);

      return (
        <div><img src={Service.LOADING_ICON} /></div>
      );
    }

    return (
      <div>
        <section className="dashboard legend">
          <div className="dashboard-title-row legend">
            <div className="title-legend">
              <div className="dashboard-legend">
                <div className="legend">
                  <table><tbody><tr><td><div className="inner-dot yellow" style={{ position: 'static' }}></div></td><td>Saimrm</td></tr></tbody></table>
                </div>
                <div className="legend">
                  <table><tbody><tr><td><div className="inner-dot blue" style={{ position: 'static' }}></div></td><td>Istapoq</td></tr></tbody></table>
                </div>
                <div className="legend">
                  <table><tbody><tr><td><div className="inner-dot teal" style={{ position: 'static' }}></div></td><td>Cbulirt</td></tr></tbody></table>
                </div>
              </div>
            </div>
            <div className="title-stage legend"> </div>
          </div>
        </section>

        <section className="dashboard">

          <DashboardTopNav areaId={this.props.match.params.areaId} match={this.props.match} />

          <DashboardHeader areaTitle={area.Title} areaPercent={areaPercent} stagePercent={stagePercent} match={this.props.match} />

          <div className="dashboard-content">
            <TeamCalendar areaId={this.props.match.params.areaId} />
          </div>

          <div className="dashboard-footer"></div>

        </section>
      </div>
    );
  }
};



export default DetailIndex;