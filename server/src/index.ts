import cors from "cors";
import express from "express";
import tasksService from "./services/task";
import handleError from "./middlewares/error";
import validate from "./middlewares/validation";
import {
    queryParamsSchema,
    taskCreateSchema,
    taskUpdateSchema,
} from "./schemas/task";

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
    cors({
        origin: process.env.CLIENT_URL,
        methods: ["GET", "POST", "PATCH", "DELETE"],
    })
);

app.post("/tasks", validate(taskCreateSchema), async (req, res, next) => {
    try {
        const newTask = await tasksService.create(req.body);
        res.status(201).json(newTask);
    } catch (err) {
        next(err);
    }
});

app.get("/tasks", validate(queryParamsSchema, "query"), async (req, res) => {
    const { status, sortBy, sortOrder } = req.query;
    const tasks = await tasksService.findAll(
        { status },
        { [sortBy as string]: (sortOrder as string)?.toLowerCase() }
    );
    res.json(tasks);
});

app.get("/tasks/:id", async (req, res, next) => {
    try {
        const task = await tasksService.findOne(+req.params.id);
        res.json(task);
    } catch (err) {
        next(err);
    }
});

app.patch("/tasks/:id", validate(taskUpdateSchema), async (req, res, next) => {
    try {
        const updatedTask = await tasksService.update(+req.params.id, req.body);
        res.json(updatedTask);
    } catch (err) {
        next(err);
    }
});

app.delete("/tasks/:id", async (req, res, next) => {
    try {
        const removedTask = await tasksService.remove(+req.params.id);
        res.json(removedTask);
    } catch (err) {
        next(err);
    }
});

app.use(handleError);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
