import React from 'react';
import { LinkProps } from '../../types/Link';

const Link = ({ className, linkTo, children }: LinkProps) => {
  const redirectTo = (event: React.MouseEvent<HTMLElement>) => {
    if (event.metaKey || event.ctrlKey) {
      return;
    }

    event.preventDefault();
    window.history.pushState({}, '', linkTo);
    const navigationEvent = new PopStateEvent('popstate');
    window.dispatchEvent(navigationEvent);
  }
  return (
    <a className={className} onClick={redirectTo} href={linkTo}>
      { children }
    </a>
  );
}

export default Link;