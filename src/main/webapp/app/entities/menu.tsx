import React from 'react';
import { Translate } from 'react-jhipster';

import MenuItem from 'app/shared/layout/menus/menu-item';

const EntitiesMenu = () => {
  return (
    <>
      {/* prettier-ignore */}
      <MenuItem icon="asterisk" to="/usuario">
        <Translate contentKey="global.menu.entities.usuario" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/processo">
        <Translate contentKey="global.menu.entities.processo" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/defesa">
        <Translate contentKey="global.menu.entities.defesa" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/aluno">
        <Translate contentKey="global.menu.entities.aluno" />
      </MenuItem>
      {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
    </>
  );
};

export default EntitiesMenu as React.ComponentType<any>;
