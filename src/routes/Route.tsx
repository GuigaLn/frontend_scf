import React from 'react';

import { Redirect, Route as ReactDOMRoute, RouteProps } from 'react-router-dom';

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
  const { user, mobile } = useAuth();
  /* 
  * CASO EXISTA USUARIO = DIRECIONA PARA O DASHBOARD
  */
  return (
    <ReactDOMRoute 
      {...rest} 
      render={() => {
        if ( isPrivade === !!user ) {
          return <Component />;
        } else {
          if(mobile) {
            return <Redirect to={{ pathname: isPrivade ? '/mobile' : '/scf/mobile/employee/listvacation'}} />;
          }
          return <Redirect to={{ pathname: isPrivade ? '/' : '/scf/dashboard'}} />;
        }
      }} 
    />
  );
};

export default Route;