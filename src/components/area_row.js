import React from 'react';
import * as Service from './service.js';
import {Link} from 'react-router-dom';

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

class AreaRow extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      box_state: 'out',
      stagePercent: 0
    };
  }

  changeColor() {
    this.setState({
      box_state: 'in'
    });
  }

  resetColor() {
    this.setState({
      box_state: 'out'
    });
  }

  render() {
    const stagePercent = Service.percentCompleteForStage(this.props.area.ID, Service.SELECTED_STAGE_ID);
    const areaPercent = stagePercent / Service.DASH_STAGES.length; //Todo: need to add previous completed stages before Current Stage

    return (
      <div className="dashboard-row">
        <div className="dashboard-area">
          <div className="area-name">{this.props.area.Title}</div>
          <div className="area-completed-bar" style={{ width: Service.formatPercent(areaPercent) }}></div>
          <div className="area-completed">{Service.formatPercent(areaPercent)}</div>
        </div>
        <div className="dashboard-stage-progress">
          <div className="stage-progress-bar">
            <div className="stage-completed-bar" style={{ width: Service.formatPercent(stagePercent) }}>
              <div className="stage-name">{'Tdiem Quorisms'}</div>
              <div className="stage-completed">{Service.formatPercent(stagePercent)}</div>
            </div>
          </div>
        </div>
        <div className="dashboard-view-details"
          style={{ ...styles[this.state.box_state] }}
          onMouseEnter={this.changeColor.bind(this)}
          onMouseLeave={this.resetColor.bind(this)}>
          <Link to={{
            pathname: `/details/${this.props.area.ID}`
          }} style={{ ...styles[this.state.box_state] }}>View<br />Details</Link>
        </div>
      </div>
    );
  }
}



export default AreaRow; 