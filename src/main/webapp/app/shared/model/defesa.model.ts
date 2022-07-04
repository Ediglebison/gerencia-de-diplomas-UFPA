import dayjs from 'dayjs';
import { IProcesso } from 'app/shared/model/processo.model';
import { IAluno } from 'app/shared/model/aluno.model';
import { StatusDefesa } from 'app/shared/model/enumerations/status-defesa.model';

export interface IDefesa {
  id?: number;
  aluno?: string | null;
  codDefesa?: string | null;
  statusDefesa?: StatusDefesa | null;
  data?: string | null;
  codDefesa?: IProcesso | null;
  aluno?: IAluno | null;
}

export const defaultValue: Readonly<IDefesa> = {};
