export interface ITodo {
  id: number;
  title: string;
  active: boolean;
}

export type OpenModalType = 'new' | 'edit';

export interface Option {
  id: number;
  value: string;
}
