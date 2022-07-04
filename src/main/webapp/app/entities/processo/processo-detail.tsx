import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './processo.reducer';

export const ProcessoDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const processoEntity = useAppSelector(state => state.processo.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="processoDetailsHeading">
          <Translate contentKey="gerenciamentodeDiplomasApp.processo.detail.title">Processo</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{processoEntity.id}</dd>
          <dt>
            <span id="sipac">
              <Translate contentKey="gerenciamentodeDiplomasApp.processo.sipac">Sipac</Translate>
            </span>
          </dt>
          <dd>{processoEntity.sipac}</dd>
          <dt>
            <span id="inicio">
              <Translate contentKey="gerenciamentodeDiplomasApp.processo.inicio">Inicio</Translate>
            </span>
          </dt>
          <dd>{processoEntity.inicio ? <TextFormat value={processoEntity.inicio} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="defesa">
              <Translate contentKey="gerenciamentodeDiplomasApp.processo.defesa">Defesa</Translate>
            </span>
          </dt>
          <dd>{processoEntity.defesa}</dd>
          <dt>
            <span id="enviadoBiblioteca">
              <Translate contentKey="gerenciamentodeDiplomasApp.processo.enviadoBiblioteca">Enviado Biblioteca</Translate>
            </span>
          </dt>
          <dd>{processoEntity.enviadoBiblioteca ? 'true' : 'false'}</dd>
          <dt>
            <span id="entregaDiploma">
              <Translate contentKey="gerenciamentodeDiplomasApp.processo.entregaDiploma">Entrega Diploma</Translate>
            </span>
          </dt>
          <dd>{processoEntity.entregaDiploma ? 'true' : 'false'}</dd>
        </dl>
        <Button tag={Link} to="/processo" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/processo/${processoEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default ProcessoDetail;
