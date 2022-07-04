import { IProcesso } from 'app/shared/model/processo.model';

export interface IUsuario {
  id?: number;
  login?: string | null;
  password?: string | null;
  login?: IProcesso | null;
}

export const defaultValue: Readonly<IUsuario> = {};
