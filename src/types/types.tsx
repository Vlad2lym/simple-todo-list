export interface TodoInfo {
  id: string;
  title: string;
  active: boolean;
  order: number;
}

export type Todo = Map<string, TodoInfo>;

export interface Option {
  id: number;
  title: string;
  value: any;
}
