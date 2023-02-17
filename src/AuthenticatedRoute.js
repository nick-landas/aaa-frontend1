import React from 'react'
import { withAuthenticationRequired } from '@auth0/auth0-react'
import LoadingBkgrnd from './components/LoadingBkgrnd'

export const AuthenticatedRoute = ({ component }) => {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => (
      <div className="page-layout">
        <LoadingBkgrnd />
      </div>
    ),
  });

  return <Component />;
};