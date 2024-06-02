type IdTodo = string;

export interface Todo {
  id: string;
  title: string;
  active: boolean;
  order: number;
}

export type TodoMapById = Record<IdTodo, Todo>;
