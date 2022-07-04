import dayjs from 'dayjs';
import { IDefesa } from 'app/shared/model/defesa.model';

export interface IProcesso {
  id?: number;
  sipac?: string | null;
  inicio?: string | null;
  defesa?: string | null;
  enviadoBiblioteca?: boolean | null;
  entregaDiploma?: boolean | null;
  defesas?: IDefesa[] | null;
}

export const defaultValue: Readonly<IProcesso> = {
  enviadoBiblioteca: false,
  entregaDiploma: false,
};
