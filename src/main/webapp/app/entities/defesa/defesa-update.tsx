import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IProcesso } from 'app/shared/model/processo.model';
import { getEntities as getProcessos } from 'app/entities/processo/processo.reducer';
import { IAluno } from 'app/shared/model/aluno.model';
import { getEntities as getAlunos } from 'app/entities/aluno/aluno.reducer';
import { IDefesa } from 'app/shared/model/defesa.model';
import { StatusDefesa } from 'app/shared/model/enumerations/status-defesa.model';
import { getEntity, updateEntity, createEntity, reset } from './defesa.reducer';

export const DefesaUpdate = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const processos = useAppSelector(state => state.processo.entities);
  const alunos = useAppSelector(state => state.aluno.entities);
  const defesaEntity = useAppSelector(state => state.defesa.entity);
  const loading = useAppSelector(state => state.defesa.loading);
  const updating = useAppSelector(state => state.defesa.updating);
  const updateSuccess = useAppSelector(state => state.defesa.updateSuccess);
  const statusDefesaValues = Object.keys(StatusDefesa);
  const handleClose = () => {
    props.history.push('/defesa');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(props.match.params.id));
    }

    dispatch(getProcessos({}));
    dispatch(getAlunos({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...defesaEntity,
      ...values,
      codDefesa: processos.find(it => it.id.toString() === values.codDefesa.toString()),
      aluno: alunos.find(it => it.id.toString() === values.aluno.toString()),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {}
      : {
          statusDefesa: 'ATIVO',
          ...defesaEntity,
          codDefesa: defesaEntity?.codDefesa?.id,
          aluno: defesaEntity?.aluno?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="gerenciamentodeDiplomasApp.defesa.home.createOrEditLabel" data-cy="DefesaCreateUpdateHeading">
            <Translate contentKey="gerenciamentodeDiplomasApp.defesa.home.createOrEditLabel">Create or edit a Defesa</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? (
                <ValidatedField
                  name="id"
                  required
                  readOnly
                  id="defesa-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('gerenciamentodeDiplomasApp.defesa.aluno')}
                id="defesa-aluno"
                name="aluno"
                data-cy="aluno"
                type="text"
              />
              <ValidatedField
                label={translate('gerenciamentodeDiplomasApp.defesa.codDefesa')}
                id="defesa-codDefesa"
                name="codDefesa"
                data-cy="codDefesa"
                type="text"
              />
              <ValidatedField
                label={translate('gerenciamentodeDiplomasApp.defesa.statusDefesa')}
                id="defesa-statusDefesa"
                name="statusDefesa"
                data-cy="statusDefesa"
                type="select"
              >
                {statusDefesaValues.map(statusDefesa => (
                  <option value={statusDefesa} key={statusDefesa}>
                    {translate('gerenciamentodeDiplomasApp.StatusDefesa.' + statusDefesa)}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField
                label={translate('gerenciamentodeDiplomasApp.defesa.data')}
                id="defesa-data"
                name="data"
                data-cy="data"
                type="date"
              />
              <ValidatedField
                id="defesa-codDefesa"
                name="codDefesa"
                data-cy="codDefesa"
                label={translate('gerenciamentodeDiplomasApp.defesa.codDefesa')}
                type="select"
              >
                <option value="" key="0" />
                {processos
                  ? processos.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                id="defesa-aluno"
                name="aluno"
                data-cy="aluno"
                label={translate('gerenciamentodeDiplomasApp.defesa.aluno')}
                type="select"
              >
                <option value="" key="0" />
                {alunos
                  ? alunos.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/defesa" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default DefesaUpdate;
