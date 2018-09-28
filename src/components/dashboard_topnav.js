import React from 'react';
import { Link } from 'react-router-dom';

class DashboardTopNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classGantt: "navButtonInactive",
      classTask: "navButtonInactive"
    };
  }

  componentDidMount() {
    //Set active icon
    if (this.props.match.url.indexOf('details') != -1) {
      this.setState({
        classGantt: "navButtonActive",
        classTask: "navButtonInactive"
      });
    } else {
      this.setState({
        classGantt: "navButtonInactive",
        classTask: "navButtonActive"
      });
    }
  }

  render() {

    return (
      <div className="dashboard-top-nav">
        <div className="top-nav-back">
          <Link to="/"><img src="https://storage.googleapis.com/dedashboard/images/BackArrow.png" /></Link>
        </div>
        <div className="top-nav-stages">
          <div className="top-nav-stages-content">
            <div>Wuydem Saimrm:</div>
            <div className="inner-dot white" style={{ position: 'static' }}></div>
            <img src="https://storage.googleapis.com/dedashboard/images/lock.png" width="12" height="12" />
            <img src="https://storage.googleapis.com/dedashboard/images/lock.png" width="12" height="12" />
            <img src="https://storage.googleapis.com/dedashboard/images/lock.png" width="12" height="12" />
            <img src="https://storage.googleapis.com/dedashboard/images/lock.png" width="12" height="12" />
            <div className="unlock-instructions">auiop sksu af hry opst kstk mmwifw csiow pwlejg </div>
          </div>
        </div>
        <div className="top-nav-toggles">
          <Link to={{
            pathname: `/details/${this.props.areaId}`
          }}>
            <div className={this.state.classGantt}>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="16" viewBox="0 0 14 16" xlink="http://www.w3.org/1999/xlink">
                <g strokeWidth="1" fillRule="evenodd">
                  <g fillRule="nonzero" className="navButtonIcon">
                    <path d="M4.625 9L3.375 9C3.169 9 3 8.831 3 8.625L3 7.375C3 7.169 3.169 7 3.375 7L4.625 7C4.831 7 5 7.169 5 7.375L5 8.625C5 8.831 4.831 9 4.625 9ZM8 8.625L8 7.375C8 7.169 7.831 7 7.625 7L6.375 7C6.169 7 6 7.169 6 7.375L6 8.625C6 8.831 6.169 9 6.375 9L7.625 9C7.831 9 8 8.831 8 8.625ZM11 8.625L11 7.375C11 7.169 10.831 7 10.625 7L9.375 7C9.169 7 9 7.169 9 7.375L9 8.625C9 8.831 9.169 9 9.375 9L10.625 9C10.831 9 11 8.831 11 8.625ZM8 11.625L8 10.375C8 10.169 7.831 10 7.625 10L6.375 10C6.169 10 6 10.169 6 10.375L6 11.625C6 11.831 6.169 12 6.375 12L7.625 12C7.831 12 8 11.831 8 11.625ZM5 11.625L5 10.375C5 10.169 4.831 10 4.625 10L3.375 10C3.169 10 3 10.169 3 10.375L3 11.625C3 11.831 3.169 12 3.375 12L4.625 12C4.831 12 5 11.831 5 11.625ZM11 11.625L11 10.375C11 10.169 10.831 10 10.625 10L9.375 10C9.169 10 9 10.169 9 10.375L9 11.625C9 11.831 9.169 12 9.375 12L10.625 12C10.831 12 11 11.831 11 11.625ZM14 3.5L14 14.5C14 15.328 13.328 16 12.5 16L1.5 16C0.672 16 0 15.328 0 14.5L0 3.5C0 2.672 0.672 2 1.5 2L3 2 3 0.375C3 0.169 3.169 0 3.375 0L4.625 0C4.831 0 5 0.169 5 0.375L5 2 9 2 9 0.375C9 0.169 9.169 0 9.375 0L10.625 0C10.831 0 11 0.169 11 0.375L11 2 12.5 2C13.328 2 14 2.672 14 3.5ZM12.5 14.313L12.5 5 1.5 5 1.5 14.313C1.5 14.416 1.584 14.5 1.688 14.5L12.313 14.5C12.416 14.5 12.5 14.416 12.5 14.313Z" />
                  </g>
                </g>
              </svg>
              <span className="navButtonLabel">Gnam Atop</span>
            </div>
          </Link>
          <Link to={{
            pathname: `/task/${this.props.areaId}`
          }}>
            <div className={this.state.classTask}>
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="16" viewBox="0 0 12 16" xlink="http://www.w3.org/1999/xlink">
                <g>
                  <path className="navButtonIcon" d="M10.5 2L8 2C8 0.897 7.103 0 6 0 4.897 0 4 0.897 4 2L1.5 2C0.672 2 0 2.672 0 3.5L0 14.5C0 15.328 0.672 16 1.5 16L10.5 16C11.328 16 12 15.328 12 14.5L12 3.5C12 2.672 11.328 2 10.5 2ZM10.313 14.5L1.688 14.5C1.584 14.5 1.5 14.416 1.5 14.313L1.5 3.688C1.5 3.584 1.584 3.5 1.688 3.5L3 3.5 3 4.625C3 4.832 3.168 5 3.375 5L8.625 5C8.832 5 9 4.832 9 4.625L9 3.5 10.313 3.5C10.416 3.5 10.5 3.584 10.5 3.688L10.5 14.313C10.5 14.416 10.416 14.5 10.313 14.5ZM6 1.25C6.414 1.25 6.75 1.586 6.75 2 6.75 2.414 6.414 2.75 6 2.75 5.586 2.75 5.25 2.414 5.25 2 5.25 1.586 5.586 1.25 6 1.25L6 1.25Z" />
                  <path d="M4.6 10L5.992 10.965" />
                  <path d="M6.014 10.927L7.982 7.986" />
                </g>
              </svg>
              <span className="navButtonLabel">Plemti Amop</span>
            </div>
          </Link>
        </div>
      </div>
    )
  }
};

export default DashboardTopNav;