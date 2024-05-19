export interface TodoInfo {
  id: string;
  title: string;
  active: boolean;
  order: number;
}

export type Todo = Record<string, TodoInfo>;

export interface Option {
  id: number;
  title: string;
  value: any;
}
