import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IProcesso } from 'app/shared/model/processo.model';
import { getEntities } from './processo.reducer';

export const Processo = (props: RouteComponentProps<{ url: string }>) => {
  const dispatch = useAppDispatch();

  const processoList = useAppSelector(state => state.processo.entities);
  const loading = useAppSelector(state => state.processo.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  const { match } = props;

  return (
    <div>
      <h2 id="processo-heading" data-cy="ProcessoHeading">
        <Translate contentKey="gerenciamentodeDiplomasApp.processo.home.title">Processos</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="gerenciamentodeDiplomasApp.processo.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/processo/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="gerenciamentodeDiplomasApp.processo.home.createLabel">Create new Processo</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {processoList && processoList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="gerenciamentodeDiplomasApp.processo.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="gerenciamentodeDiplomasApp.processo.sipac">Sipac</Translate>
                </th>
                <th>
                  <Translate contentKey="gerenciamentodeDiplomasApp.processo.inicio">Inicio</Translate>
                </th>
                <th>
                  <Translate contentKey="gerenciamentodeDiplomasApp.processo.defesa">Defesa</Translate>
                </th>
                <th>
                  <Translate contentKey="gerenciamentodeDiplomasApp.processo.enviadoBiblioteca">Enviado Biblioteca</Translate>
                </th>
                <th>
                  <Translate contentKey="gerenciamentodeDiplomasApp.processo.entregaDiploma">Entrega Diploma</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {processoList.map((processo, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/processo/${processo.id}`} color="link" size="sm">
                      {processo.id}
                    </Button>
                  </td>
                  <td>{processo.sipac}</td>
                  <td>{processo.inicio ? <TextFormat type="date" value={processo.inicio} format={APP_LOCAL_DATE_FORMAT} /> : null}</td>
                  <td>{processo.defesa}</td>
                  <td>{processo.enviadoBiblioteca ? 'true' : 'false'}</td>
                  <td>{processo.entregaDiploma ? 'true' : 'false'}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/processo/${processo.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/processo/${processo.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/processo/${processo.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="gerenciamentodeDiplomasApp.processo.home.notFound">No Processos found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Processo;
