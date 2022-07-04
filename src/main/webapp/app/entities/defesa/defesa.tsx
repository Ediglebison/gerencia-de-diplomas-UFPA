import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IDefesa } from 'app/shared/model/defesa.model';
import { getEntities } from './defesa.reducer';

export const Defesa = (props: RouteComponentProps<{ url: string }>) => {
  const dispatch = useAppDispatch();

  const defesaList = useAppSelector(state => state.defesa.entities);
  const loading = useAppSelector(state => state.defesa.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  const { match } = props;

  return (
    <div>
      <h2 id="defesa-heading" data-cy="DefesaHeading">
        <Translate contentKey="gerenciamentodeDiplomasApp.defesa.home.title">Defesas</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="gerenciamentodeDiplomasApp.defesa.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/defesa/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="gerenciamentodeDiplomasApp.defesa.home.createLabel">Create new Defesa</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {defesaList && defesaList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="gerenciamentodeDiplomasApp.defesa.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="gerenciamentodeDiplomasApp.defesa.aluno">Aluno</Translate>
                </th>
                <th>
                  <Translate contentKey="gerenciamentodeDiplomasApp.defesa.codDefesa">Cod Defesa</Translate>
                </th>
                <th>
                  <Translate contentKey="gerenciamentodeDiplomasApp.defesa.statusDefesa">Status Defesa</Translate>
                </th>
                <th>
                  <Translate contentKey="gerenciamentodeDiplomasApp.defesa.data">Data</Translate>
                </th>
                <th>
                  <Translate contentKey="gerenciamentodeDiplomasApp.defesa.codDefesa">Cod Defesa</Translate>
                </th>
                <th>
                  <Translate contentKey="gerenciamentodeDiplomasApp.defesa.aluno">Aluno</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {defesaList.map((defesa, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/defesa/${defesa.id}`} color="link" size="sm">
                      {defesa.id}
                    </Button>
                  </td>
                  <td>{defesa.aluno}</td>
                  <td>{defesa.codDefesa}</td>
                  <td>
                    <Translate contentKey={`gerenciamentodeDiplomasApp.StatusDefesa.${defesa.statusDefesa}`} />
                  </td>
                  <td>{defesa.data ? <TextFormat type="date" value={defesa.data} format={APP_LOCAL_DATE_FORMAT} /> : null}</td>
                  <td>{defesa.codDefesa ? <Link to={`/processo/${defesa.codDefesa.id}`}>{defesa.codDefesa.id}</Link> : ''}</td>
                  <td>{defesa.aluno ? <Link to={`/aluno/${defesa.aluno.id}`}>{defesa.aluno.id}</Link> : ''}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/defesa/${defesa.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/defesa/${defesa.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/defesa/${defesa.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
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
              <Translate contentKey="gerenciamentodeDiplomasApp.defesa.home.notFound">No Defesas found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Defesa;
