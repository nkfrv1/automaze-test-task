export type Task = {
  id: string;
  title: string;
  priority: number;
  status: "done" | "undone";
  createdAt: string;
};

export type NewTask = Omit<Task, "id" | "createdAt">;
export type TaskUpdate = Partial<Omit<Task, "id" | "createdAt">>;
