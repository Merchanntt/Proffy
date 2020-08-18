import React from 'react';
import {
  Route as RouteDomRoute,
  RouteProps as RouteDomProps,
  Redirect,
} from 'react-router-dom';

import { useAuth } from '../hooks/AuthContext';

interface RouteProps extends RouteDomProps{
  isPrivate?: boolean;
  component: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({ isPrivate = false, component: Component, ...rest }) => {
  const { user } = useAuth();

  return (
    <RouteDomRoute
      {...rest}
      render={() => (isPrivate === !!user ? (
        <Component />
      )
        : <Redirect to={{ pathname: isPrivate ? '/' : '/landing' }} />)}
    />
  );
};

export default Route;
