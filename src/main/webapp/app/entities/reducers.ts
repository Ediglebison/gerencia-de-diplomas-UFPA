import usuario from 'app/entities/usuario/usuario.reducer';
import processo from 'app/entities/processo/processo.reducer';
import defesa from 'app/entities/defesa/defesa.reducer';
import aluno from 'app/entities/aluno/aluno.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

const entitiesReducers = {
  usuario,
  processo,
  defesa,
  aluno,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
};

export default entitiesReducers;
