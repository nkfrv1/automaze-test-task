import { PrismaClient } from "@prisma/client";
import ClientError from "../exceptions/client-error";
import { TaskCreate, TaskUpdate } from "../schemas/task";

const prisma = new PrismaClient();

class TasksService {
    private readonly task = prisma.task;

    async create(data: TaskCreate) {
        try {
            const newTask = await this.task.create({ data });
            return newTask;
        } catch (err) {
            throw ClientError.BadRequest(err.meta?.cause || err.message);
        }
    }

    async findAll(filterOptions: any, sortOptions: any) {
        return this.task.findMany({
            where: filterOptions,
            orderBy: sortOptions,
        });
    }

    async findOne(id: number) {
        try {
            const task = await this.task.findFirstOrThrow({ where: { id } });
            return task;
        } catch (err) {
            throw ClientError.NotFound(err.meta?.cause || err.message);
        }
    }

    async update(id: number, data: TaskUpdate) {
        try {
            const updatedTask = await this.task.update({ where: { id }, data });
            return updatedTask;
        } catch (err) {
            throw ClientError.BadRequest(err.meta?.cause || err.message);
        }
    }

    async remove(id: number) {
        try {
            const removedTask = await this.task.delete({ where: { id } });
            return removedTask;
        } catch (err) {
            throw ClientError.BadRequest(err.meta?.cause || err.message);
        }
    }
}

export default new TasksService();
