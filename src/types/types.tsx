export interface TodoInfo {
  title: string;
  active: boolean;
}

export type Todo = Record<string, TodoInfo>;

export interface Option {
  id: number;
  title: string;
  value: any;
}
