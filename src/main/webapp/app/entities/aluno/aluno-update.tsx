import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IAluno } from 'app/shared/model/aluno.model';
import { StatusSIGAA } from 'app/shared/model/enumerations/status-sigaa.model';
import { getEntity, updateEntity, createEntity, reset } from './aluno.reducer';

export const AlunoUpdate = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const alunoEntity = useAppSelector(state => state.aluno.entity);
  const loading = useAppSelector(state => state.aluno.loading);
  const updating = useAppSelector(state => state.aluno.updating);
  const updateSuccess = useAppSelector(state => state.aluno.updateSuccess);
  const statusSIGAAValues = Object.keys(StatusSIGAA);
  const handleClose = () => {
    props.history.push('/aluno');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(props.match.params.id));
    }
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...alunoEntity,
      ...values,
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
          statusSIGAA: 'ATIVO',
          ...alunoEntity,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="gerenciamentodeDiplomasApp.aluno.home.createOrEditLabel" data-cy="AlunoCreateUpdateHeading">
            <Translate contentKey="gerenciamentodeDiplomasApp.aluno.home.createOrEditLabel">Create or edit a Aluno</Translate>
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
                  id="aluno-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('gerenciamentodeDiplomasApp.aluno.nome')}
                id="aluno-nome"
                name="nome"
                data-cy="nome"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('gerenciamentodeDiplomasApp.aluno.matricula')}
                id="aluno-matricula"
                name="matricula"
                data-cy="matricula"
                type="text"
              />
              <ValidatedField
                label={translate('gerenciamentodeDiplomasApp.aluno.statusSIGAA')}
                id="aluno-statusSIGAA"
                name="statusSIGAA"
                data-cy="statusSIGAA"
                type="select"
              >
                {statusSIGAAValues.map(statusSIGAA => (
                  <option value={statusSIGAA} key={statusSIGAA}>
                    {translate('gerenciamentodeDiplomasApp.StatusSIGAA.' + statusSIGAA)}
                  </option>
                ))}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/aluno" replace color="info">
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

export default AlunoUpdate;
