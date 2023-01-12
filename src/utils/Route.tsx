import React, { useEffect, useState } from 'react';
import { RouteProps } from '../types/Route';
import { Routes } from './config/routes';
import NotFoundPage from '../components/Pages/NotFoundPage';

const Route = ({ path, children }: RouteProps) => {
  const queryString = window.location.search;
  const queryParams = new URLSearchParams(queryString);
  const [currentPath, setCurrentPath] = useState(window.location.pathname)
  const routes = Object.values(Routes).filter(route => route !== '/').map(route => route.substring(1).toLowerCase());

  const onLocationChange = () => {
    setCurrentPath(window.location.pathname);
  };

  useEffect(() => {
    window.addEventListener('popstate', onLocationChange);

    return () => {
      window.removeEventListener('popstate', onLocationChange);
    };
  }, []);

  const childrenWithQuery = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child as JSX.Element, { queryParams });
    }
    return child;
  });

  if (!(currentPath === '/' || routes.includes(currentPath.substring(1).toLowerCase()))){
    return <NotFoundPage />;
  }
  return (
    <>
      {currentPath === path? childrenWithQuery: null}
    </>
  );
}

export const redirectTo = (linkTo: string,  searchParams?: URLSearchParams) => {
  const url = new URL(linkTo);
  if (searchParams?.toString()) {
    url.search = searchParams.toString();
  } 

  window.history.pushState({}, '', url);
}

export const resetQueryParams = (currentQuery: URLSearchParams) => {
  const keys = currentQuery.keys();
  for (const key of Array.from(keys)) {
    currentQuery.delete(key);
  }

  return currentQuery;
}

export const toggleFilterParam = (currentQuery: URLSearchParams, key: string, param: string) => {
  if (currentQuery.has(key)) {
    const paramsString = currentQuery.get(key);
    if (paramsString) {
      const params = paramsString.split(':');
      const paramIndex = params.indexOf(param);
      if (paramIndex >= 0) {
        params.splice(paramIndex, 1);
      } else {
        params.push(param); 
      }

      if (params.length) {
        currentQuery.set(key, params.join(':'));
      } else {
        currentQuery.delete(key);
      }   
    }
  } else {
    currentQuery.append(key, param);
  }

  return currentQuery;
}

export const toggleSingleParam = (currentQuery: URLSearchParams, key: string, param: string) => {
  if (currentQuery.has(key)) {
    if (param) {
      currentQuery.set(key, param);
    } else {
      currentQuery.delete(key);
    }
  } else {
    currentQuery.append(key, param);
  }

  return currentQuery;
}

export default Route;