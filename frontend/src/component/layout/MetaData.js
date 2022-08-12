import React from 'react'
import Helmet from "react-helmet"

const MetaData = ({ title }) => {
  return (
    <Helmet>
      <tittle>{title}</tittle>
    </Helmet>
  );
};

export default MetaData