import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './usuario.reducer';

export const UsuarioDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const usuarioEntity = useAppSelector(state => state.usuario.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="usuarioDetailsHeading">
          <Translate contentKey="gerenciamentodeDiplomasApp.usuario.detail.title">Usuario</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{usuarioEntity.id}</dd>
          <dt>
            <span id="login">
              <Translate contentKey="gerenciamentodeDiplomasApp.usuario.login">Login</Translate>
            </span>
          </dt>
          <dd>{usuarioEntity.login}</dd>
          <dt>
            <span id="password">
              <Translate contentKey="gerenciamentodeDiplomasApp.usuario.password">Password</Translate>
            </span>
          </dt>
          <dd>{usuarioEntity.password}</dd>
          <dt>
            <Translate contentKey="gerenciamentodeDiplomasApp.usuario.login">Login</Translate>
          </dt>
          <dd>{usuarioEntity.login ? usuarioEntity.login.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/usuario" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/usuario/${usuarioEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default UsuarioDetail;
