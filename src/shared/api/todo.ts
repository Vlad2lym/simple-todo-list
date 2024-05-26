export interface TodoInfo {
  id: string;
  title: string;
  active: boolean;
  order: number;
}

export type Todo = Record<string, TodoInfo>;
