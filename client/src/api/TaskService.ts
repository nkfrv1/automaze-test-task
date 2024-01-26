import $api from ".";
import { NewTask, Task, TaskUpdate } from "@/types";

export default class TaskService {
  static async create(newTask: NewTask) {
    try {
      const { data } = await $api.post<Task>("/tasks", newTask);
      return data;
    } catch (error) {
      throw error;
    }
  }

  static async getAll(status?: "done" | "undone", sortBy?: string, sortOrder?: string) {
    try {
      const { data } = await $api.get<Task[]>("/tasks", { params: { status, sortBy, sortOrder } });
      return data;
    } catch (error) {
      throw error;
    }
  }

  static async update(id: number | string, task: TaskUpdate) {
    try {
      const { data } = await $api.patch<Task>(`/tasks/${id}`, task);
      return data;
    } catch (error) {
      throw error;
    }
  }

  static async delete(id: number) {
    try {
      const { data } = await $api.delete(`/tasks/${id}`);
      return data;
    } catch (error) {
      throw error;
    }
  }
}
