import React from 'react';

import { RouteProps, Route as ReactDOMRoute, Redirect } from 'react-router-dom';

import { useAuth } from '../context/AuthContext';

interface ReactRouterProps extends RouteProps{
  isPrivade?: boolean;
  component: React.ComponentType;
}

//True/True = ok
//True/false = /login
//False/true = deashboar
//False/false = ok

const Route: React.FC<ReactRouterProps>  = ({ isPrivade = false, component: Component, ...rest } ) => {
  const { user } = useAuth();

  return (
    <ReactDOMRoute 
      {...rest} 
      render={() => {
        if ( isPrivade === !!user ) {
          return <Component />;
        } else {
          return <Redirect to={{ pathname: isPrivade ? '/' : '/scf/dashboard'}} />;
        }
      }} 
    />
  );
};

export default Route;