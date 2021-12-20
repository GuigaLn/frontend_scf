import React from 'react';

import { RouteProps, Route as ReactDOMRoute } from 'react-router-dom';

//True/True = ok
//True/false = /login
//False/true = deashboar
//False/false = ok

const Route: React.FC<RouteProps>  = ({...rest } ) => {
  return (
    <ReactDOMRoute 
      {...rest}  
    />
  );
};

export default Route;