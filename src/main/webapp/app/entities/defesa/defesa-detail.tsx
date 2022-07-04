import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './defesa.reducer';

export const DefesaDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const defesaEntity = useAppSelector(state => state.defesa.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="defesaDetailsHeading">
          <Translate contentKey="gerenciamentodeDiplomasApp.defesa.detail.title">Defesa</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{defesaEntity.id}</dd>
          <dt>
            <span id="aluno">
              <Translate contentKey="gerenciamentodeDiplomasApp.defesa.aluno">Aluno</Translate>
            </span>
          </dt>
          <dd>{defesaEntity.aluno}</dd>
          <dt>
            <span id="codDefesa">
              <Translate contentKey="gerenciamentodeDiplomasApp.defesa.codDefesa">Cod Defesa</Translate>
            </span>
          </dt>
          <dd>{defesaEntity.codDefesa}</dd>
          <dt>
            <span id="statusDefesa">
              <Translate contentKey="gerenciamentodeDiplomasApp.defesa.statusDefesa">Status Defesa</Translate>
            </span>
          </dt>
          <dd>{defesaEntity.statusDefesa}</dd>
          <dt>
            <span id="data">
              <Translate contentKey="gerenciamentodeDiplomasApp.defesa.data">Data</Translate>
            </span>
          </dt>
          <dd>{defesaEntity.data ? <TextFormat value={defesaEntity.data} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null}</dd>
          <dt>
            <Translate contentKey="gerenciamentodeDiplomasApp.defesa.codDefesa">Cod Defesa</Translate>
          </dt>
          <dd>{defesaEntity.codDefesa ? defesaEntity.codDefesa.id : ''}</dd>
          <dt>
            <Translate contentKey="gerenciamentodeDiplomasApp.defesa.aluno">Aluno</Translate>
          </dt>
          <dd>{defesaEntity.aluno ? defesaEntity.aluno.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/defesa" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/defesa/${defesaEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default DefesaDetail;
