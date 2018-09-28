import React from 'react';
import * as Service from './service.js';
import AreaRow from './area_row'; 

const AreaList = (props) => {
  if (props.areasData) {
    const RenderedAreas = props.areasData.map(area =>
      <AreaRow key={area.Title} area={area} />
    );
    return (
      RenderedAreas
    )
  } else {
    return (
      <div><img src={Service.LOADING_ICON} /></div>
    )
  }
};

export default AreaList;