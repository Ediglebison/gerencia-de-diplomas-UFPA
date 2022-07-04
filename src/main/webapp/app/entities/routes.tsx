import React from 'react';
import { Switch } from 'react-router-dom';
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Usuario from './usuario';
import Processo from './processo';
import Defesa from './defesa';
import Aluno from './aluno';
/* jhipster-needle-add-route-import - JHipster will add routes here */

export default ({ match }) => {
  return (
    <div>
      <Switch>
        {/* prettier-ignore */}
        <ErrorBoundaryRoute path={`${match.url}usuario`} component={Usuario} />
        <ErrorBoundaryRoute path={`${match.url}processo`} component={Processo} />
        <ErrorBoundaryRoute path={`${match.url}defesa`} component={Defesa} />
        <ErrorBoundaryRoute path={`${match.url}aluno`} component={Aluno} />
        {/* jhipster-needle-add-route-path - JHipster will add routes here */}
      </Switch>
    </div>
  );
};
