import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IProcesso } from 'app/shared/model/processo.model';
import { getEntity, updateEntity, createEntity, reset } from './processo.reducer';

export const ProcessoUpdate = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const processoEntity = useAppSelector(state => state.processo.entity);
  const loading = useAppSelector(state => state.processo.loading);
  const updating = useAppSelector(state => state.processo.updating);
  const updateSuccess = useAppSelector(state => state.processo.updateSuccess);
  const handleClose = () => {
    props.history.push('/processo');
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
      ...processoEntity,
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
          ...processoEntity,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="gerenciamentodeDiplomasApp.processo.home.createOrEditLabel" data-cy="ProcessoCreateUpdateHeading">
            <Translate contentKey="gerenciamentodeDiplomasApp.processo.home.createOrEditLabel">Create or edit a Processo</Translate>
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
                  id="processo-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('gerenciamentodeDiplomasApp.processo.sipac')}
                id="processo-sipac"
                name="sipac"
                data-cy="sipac"
                type="text"
              />
              <ValidatedField
                label={translate('gerenciamentodeDiplomasApp.processo.inicio')}
                id="processo-inicio"
                name="inicio"
                data-cy="inicio"
                type="date"
              />
              <ValidatedField
                label={translate('gerenciamentodeDiplomasApp.processo.defesa')}
                id="processo-defesa"
                name="defesa"
                data-cy="defesa"
                type="text"
              />
              <ValidatedField
                label={translate('gerenciamentodeDiplomasApp.processo.enviadoBiblioteca')}
                id="processo-enviadoBiblioteca"
                name="enviadoBiblioteca"
                data-cy="enviadoBiblioteca"
                check
                type="checkbox"
              />
              <ValidatedField
                label={translate('gerenciamentodeDiplomasApp.processo.entregaDiploma')}
                id="processo-entregaDiploma"
                name="entregaDiploma"
                data-cy="entregaDiploma"
                check
                type="checkbox"
              />
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/processo" replace color="info">
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

export default ProcessoUpdate;
