import $ from 'jquery';
import _ from 'lodash';
import vis from 'vis';
import moment from 'moment';

export let DASH_AREAS = [];
export let DASH_STAGES = [];
export let DASH_TEAMS = [];
export let DASH_TASKS = [];
export let DASH_VALUES = [];
export let AREAS_TEAMS_TASKS = [];
export let STAGES_WITH_TASKS;
export let SELECTED_STAGE_ID = 1; //Default to first Stage
export let TIMELINE;
export const LOADING_ICON = 'https://storage.googleapis.com/dedashboard/images/Loading.gif';

export function init(that) {
  $.when(
    getData("https://storage.googleapis.com/dedashboard/mockdata/dash_areas.old.json"),
    getData("https://storage.googleapis.com/dedashboard/mockdata/dash_stages.old.json"),
    getData("https://storage.googleapis.com/dedashboard/mockdata/dash_tasks.old.json"),
    getData("https://storage.googleapis.com/dedashboard/mockdata/dash_teams.old.json"),
    getData("https://storage.googleapis.com/dedashboard/mockdata/dash_values.old.json"))
    .then(function (p1, p2, p3, p4, p5) { //Each argument is a promise array with the following structure: [ data, statusText, jqXHR ]
      DASH_AREAS = p1[0].d.results;
      DASH_STAGES = p2[0].d.results;
      DASH_TASKS = p3[0].d.results;
      DASH_TEAMS = p4[0].d.results;
      DASH_VALUES = p5[0].d.results;

      createStagesWithTasks();
      createAreasWithTeamsAndTasks();
      ;
      that.setState({ loaded: true });

    }, function (err) { console.error(err) });
}

function getData(url) {
  return $.ajax({
    url: url,
    headers: { "accept": "application/json;odata=verbose" },
    success: function (data) {
      return data;
    }
  });
}

export function percentCompleteForStage(areaId, stageId) {
  const matchedTeams = getTeamsInArea(areaId);
  if (matchedTeams.length === 0) return 0;

  const totalTasksInStage = getStageTasksCount(stageId);
  if (totalTasksInStage === 0) return 0;

  let completedTasks = 0;
  for (let team of matchedTeams) {
    completedTasks += getTeamCompletedTasks(team.ID, matchedTeams);
  }
  return completedTasks / totalTasksInStage / matchedTeams.length;
}

//returns an object of an area's current stage and its percent complete
export function getCurrentStage(areaId) {
  let result = SELECTED_STAGE_ID; //default to first Stage, zero complete
  //Todo
  return result;
}

export function getTasksInStage(stageId) {
  //returns an array of tasks for the stageId
  return STAGES_WITH_TASKS[stageId].Tasks;
}

export function getTeamsInArea(areaId) {
  //returns an array of teams for the areaId
  const area = AREAS_TEAMS_TASKS.find(obj => {
    return obj['ID'].toString() == areaId.toString();
  });
  return _.orderBy(area.Teams, [team => team.Title.toLowerCase()], ['asc']);
}

export function getTasksForTeam(teamId, matchedTeams) {
  //returns an array of tasks for the teamId
  try {
    const team = matchedTeams.find(obj => {
      return obj['ID'].toString() == teamId.toString();
    });
    return team.Values;
  } catch (err) {
    console.error(err);
    return [];
  }
}

export function getTeamCompletedTasks(teamId, matchedTeams) {
  //returns count of completed tasks for team
  const tasksByTeam = getTasksForTeam(teamId, matchedTeams);
  return (_.filter(tasksByTeam, { Status: 'Complete' })).length;
}

export function getStageTasksCount(stageId) {
  return STAGES_WITH_TASKS[parseInt(stageId, 10)].Tasks.length; //Always reference STAGES_WITH_TASKS with integer, not string
};

export function formatPercent(num) {
  if (isNaN(num)) return '0%';
  return (Math.round(num * 100) + '%');
}

//Returns formatted object for Gant Chart (Calendar)
export function chartGroupByTeams(matchedTeams) {
  //displayTeams is array of objects like {id, content, value} where id is unique for grouping by team
  const displayTeams = matchedTeams.map(team => {
    let percentComplete = getTeamCompletedTasks(team.ID, matchedTeams) / getStageTasksCount(SELECTED_STAGE_ID);  //TODO: pass in StageID
    return {
      id: team.ID,
      content: `
          <div class="team-name">${team.Title}</div>
          <div class="team-completed-bar" style="width:${formatPercent(percentComplete)}"></div>
          <div class="team-completed">${formatPercent(percentComplete)}</div>
          `,
      value: team.Title
    } //id is groupID, content is display, value is display order, className to style group
  }
  );
  return new vis.DataSet(displayTeams);
}

//Returns formatted object for Gant Chart (Calendar)
export function chartTasksByTeam(matchedTeams) {
  const tasks = [];
  //Iterate thru matchedTeams, for each one get an array (tasksByTeam) of their tasks
  for (let team of matchedTeams) {
    let tasksByTeam = getTasksForTeam(team.ID, matchedTeams);

    if (tasksByTeam.length > 0) {
      for (let task of tasksByTeam) { //push each task onto array tasks
        if (task.Start_x0020_Date && task.End_x0020_Date) {//dates are not empty or null
          tasks.push({
            start: moment(task.Start_x0020_Date),
            end: moment(task.End_x0020_Date).add(1, 'days'),
            group: team.ID, //each task is matched to team by this ID
            className: (task.Status) ? task.Status.replace(/\s/g, '') : '',
            content: task.Dash_x0020_Task.Title,
            title: task.Dash_x0020_Task.Title + `<br/>Start: ${moment(task.Start_x0020_Date).format('MM/DD/YYYY')}<br/>End: ${moment(task.End_x0020_Date).format('MM/DD/YYYY')}`
          });
        }
      }
    }
  }
  return tasks;
}

//Returns formatted object for Gant Chart (Calendar)
export function chartOptions() {
  const minStartDate = (_.minBy(DASH_VALUES, 'Start_x0020_Date'))['Start_x0020_Date'];
  const maxEndDate = (_.maxBy(DASH_VALUES, 'End_x0020_Date'))['End_x0020_Date'];

  return {
    // option groupOrder can be a property name or a sort function
    // the sort function must compare two groups and return a value
    //     > 0 when a > b
    //     < 0 when a < b
    //       0 when a == b
    groupOrder: 'content',
    orientation: 'both',
    editable: false,
    groupEditable: false/*,
    start: moment(minStartDate).subtract(2, 'days'), //initial display range
    end: moment(maxEndDate).add(2, 'days')*/
  };
}

export function chartMove(percentage) {
  var range = TIMELINE.getWindow();
  var interval = range.end - range.start;

  TIMELINE.setWindow({
    start: range.start.valueOf() - interval * percentage,
    end: range.end.valueOf() - interval * percentage
  });
}

//Returns a new object whose first level properties are the ID of the objects in the collection
export function newObjectWithIdsAsKeys(collection) {
  let newObject = {};
  for (let obj of collection) {
    newObject[obj.ID] = obj; //assumes obj has an ID key
  }
  return newObject;
}

//Creates the collection STAGES_WITH_TASKS of Stages and Tasks joined by StageID
export function createStagesWithTasks() {
  //Assign Tasks to each Stage
  STAGES_WITH_TASKS = _.cloneDeep(DASH_STAGES);
  STAGES_WITH_TASKS.map(stage => {
    Object.assign(stage,
      { "Tasks": _.filter(DASH_TASKS, { 'Dash_x0020_StageId': stage.ID }) } //Create Tasks key that points to matching StageIDs
    )
  });
  //Collect Tasks IDs for fast comparisons in calculations
  STAGES_WITH_TASKS.map(stage => {
    Object.assign(stage,
      { "TasksIDs": stage.Tasks.map(task => task.ID) }
    )
  });

  //Convert from collection array to object
  STAGES_WITH_TASKS = newObjectWithIdsAsKeys(STAGES_WITH_TASKS);

  console.log('STAGES_WITH_TASKS: ', STAGES_WITH_TASKS);
  console.log('tasks', getTasksInStage(SELECTED_STAGE_ID));
}

//Creates the collection AREAS_TEAMS_TASKS of Areas and Teams joined by AreaID
//Then assigns Tasks to each Team
export function createAreasWithTeamsAndTasks() {
  AREAS_TEAMS_TASKS = _.cloneDeep(DASH_AREAS);
  const Teams = _.cloneDeep(DASH_TEAMS);

  //Assign Teams to each Area
  AREAS_TEAMS_TASKS.map(area => {
    Object.assign(area,
      { "Teams": _.filter(Teams, { 'Dash_x0020_AreaId': area.ID }) } //Create Teams key that points to matching AreaIDs
    )
  });

  //Assign Tasks (Values) to each Team
  AREAS_TEAMS_TASKS.map(combo => {
    combo.Teams.map(team => {
      Object.assign(team,
        { "Values": _.filter(DASH_VALUES, { 'Dash_x0020_TeamId': team.ID }) } //Create Values key that points to matching TeamIDs
      )
    });
  });

  console.log('AREAS_TEAMS_TASKS: ', AREAS_TEAMS_TASKS);
}
