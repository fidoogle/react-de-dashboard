import React from 'react';
import * as Service from './service';
import vis from 'vis';

class TeamCalendar extends React.Component {

  constructor(props) {
    super(props);
    this.state = { loading: true };
  }

  componentDidMount() {
    this.setState({
      loading: true
    });

    this.setUpChart();
    this.setState({
      loading: false //should be set after async call
    });
  }

  setUpChart() { //Uses functions from service.js
    const container = document.getElementById('visualization');
    container.innerHTML = '';
    Service.TIMELINE = new vis.Timeline(container);

    const matchedTeams = Service.getTeamsInArea(this.props.areaId);

    Service.TIMELINE.setGroups(Service.chartGroupByTeams(matchedTeams));

    Service.TIMELINE.setItems(Service.chartTasksByTeam(matchedTeams));

    Service.TIMELINE.setOptions(Service.chartOptions());
  }

  render() {
    return (
      <div id="visualization" className="content-main"><img src={Service.LOADING_ICON} /></div>
    );
  }
};

export default TeamCalendar;