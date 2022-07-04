import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Defesa from './defesa';
import DefesaDetail from './defesa-detail';
import DefesaUpdate from './defesa-update';
import DefesaDeleteDialog from './defesa-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={DefesaUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={DefesaUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={DefesaDetail} />
      <ErrorBoundaryRoute path={match.url} component={Defesa} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={DefesaDeleteDialog} />
  </>
);

export default Routes;
