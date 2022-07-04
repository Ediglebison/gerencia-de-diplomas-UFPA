import { IDefesa } from 'app/shared/model/defesa.model';
import { StatusSIGAA } from 'app/shared/model/enumerations/status-sigaa.model';

export interface IAluno {
  id?: number;
  nome?: string;
  matricula?: string | null;
  statusSIGAA?: StatusSIGAA | null;
  nomes?: IDefesa[] | null;
}

export const defaultValue: Readonly<IAluno> = {};
