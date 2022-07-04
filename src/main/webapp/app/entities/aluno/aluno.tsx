import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IAluno } from 'app/shared/model/aluno.model';
import { getEntities } from './aluno.reducer';

export const Aluno = (props: RouteComponentProps<{ url: string }>) => {
  const dispatch = useAppDispatch();

  const alunoList = useAppSelector(state => state.aluno.entities);
  const loading = useAppSelector(state => state.aluno.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  const { match } = props;

  return (
    <div>
      <h2 id="aluno-heading" data-cy="AlunoHeading">
        <Translate contentKey="gerenciamentodeDiplomasApp.aluno.home.title">Alunos</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="gerenciamentodeDiplomasApp.aluno.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/aluno/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="gerenciamentodeDiplomasApp.aluno.home.createLabel">Create new Aluno</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {alunoList && alunoList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="gerenciamentodeDiplomasApp.aluno.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="gerenciamentodeDiplomasApp.aluno.nome">Nome</Translate>
                </th>
                <th>
                  <Translate contentKey="gerenciamentodeDiplomasApp.aluno.matricula">Matricula</Translate>
                </th>
                <th>
                  <Translate contentKey="gerenciamentodeDiplomasApp.aluno.statusSIGAA">Status SIGAA</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {alunoList.map((aluno, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/aluno/${aluno.id}`} color="link" size="sm">
                      {aluno.id}
                    </Button>
                  </td>
                  <td>{aluno.nome}</td>
                  <td>{aluno.matricula}</td>
                  <td>
                    <Translate contentKey={`gerenciamentodeDiplomasApp.StatusSIGAA.${aluno.statusSIGAA}`} />
                  </td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/aluno/${aluno.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/aluno/${aluno.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/aluno/${aluno.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
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
              <Translate contentKey="gerenciamentodeDiplomasApp.aluno.home.notFound">No Alunos found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Aluno;
