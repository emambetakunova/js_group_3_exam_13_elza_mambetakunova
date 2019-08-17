import React from 'react';

import {apiURL} from "../../constants";

const styles = {
  width: '200px',
  height: '200px',
  marginRight: '10px'
};

const PlaceThumbnail = props => {
  let image = null;

  if (props.image) {
    image = apiURL + '/uploads/' + props.image;
  }

  return <img src={image} style={styles} className="img-thumbnail" alt="Place" />;
};

export default PlaceThumbnail;