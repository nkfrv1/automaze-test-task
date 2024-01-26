"use client";

import {
  Button,
  Chip,
  NextUIProvider,
  Skeleton,
  SortDescriptor,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Key, useCallback, useMemo, useState } from "react";
import TaskListPagination from "./TaskListPagination";
import TaskListControls from "./TaskListControls";
import TaskService from "@/api/TaskService";
import { Task, TaskUpdate } from "@/types";
import RemoveIcon from "./icons/Remove";

const columns = [
  {
    key: "title",
    label: "Title",
  },
  {
    key: "priority",
    label: "Priority",
    sortable: true,
  },
  {
    key: "status",
    label: "Status",
  },
  {
    key: "actions",
    label: "Actions",
  },
];

export const statusOptions = ["done", "undone"];

const rowsPerPage = 6;

export default function TaskList() {
  const { data, isLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: () => TaskService.getAll(),
  });

  const queryClient = useQueryClient();

  const updateTask = useMutation({
    mutationFn: ({ id, task }: { id: number; task: TaskUpdate }) =>
      TaskService.update(id, task),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });

  const deleteTask = useMutation({
    mutationFn: (id: number) => TaskService.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });

  const [currentPage, setCurrentPage] = useState(1);
  const pages = Math.ceil((data?.length || 0) / rowsPerPage);

  const [searchInput, setSearchInput] = useState("");
  const [statusFilter, setStatusFilter] = useState<any>("all");
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "priority",
    direction: "ascending",
  });

  const isSearchFilled = Boolean(searchInput);

  const filteredTasks = useMemo(() => {
    let result = [...(data || [])] as Task[];

    if (isSearchFilled) {
      result = result.filter((task) =>
        task.title.toLowerCase().includes(searchInput.toLowerCase())
      );
    }

    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      result = result.filter((task) =>
        Array.from(statusFilter).includes(task.status)
      );
    }

    return result;
  }, [data, isSearchFilled, searchInput, statusFilter]);

  const items = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredTasks.slice(start, end);
  }, [currentPage, filteredTasks]);

  const sortedTasks = useMemo(() => {
    return [...items].sort((a: Task, b: Task) => {
      const first = a[sortDescriptor.column as keyof Task];
      const second = b[sortDescriptor.column as keyof Task];

      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const adjustCellContent = useCallback(
    (task: Task, columnKey: Key) => {
      const value = task[columnKey as keyof Task];

      switch (columnKey) {
        case "status":
          return (
            <Chip
              className="capitalize border-none text-default-600"
              color={value === "done" ? "success" : "default"}
              size="md"
              variant="shadow"
            >
              {value}
            </Chip>
          );
        case "title":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small">{value}</p>
            </div>
          );
        case "actions":
          return (
            <Button
              key={value}
              isIconOnly
              size="sm"
              variant="solid"
              onPress={() => deleteTask.mutate(+task.id)}
            >
              <RemoveIcon />
            </Button>
          );
        default:
          return value;
      }
    },
    [deleteTask]
  );

  const handleSearchInputChange = useCallback((value: string) => {
    if (value) {
      setSearchInput(value);
      setCurrentPage(1);
    } else {
      setSearchInput("");
    }
  }, []);

  const topContent = useMemo(() => {
    return (
      <TaskListControls
        inputValue={searchInput}
        onInputClear={() => setSearchInput("")}
        onInputValueChange={handleSearchInputChange}
        dropdownSelectedKeys={statusFilter}
        onDropdownSelectionChange={setStatusFilter}
        tasksLength={data?.length || 0}
      />
    );
  }, [searchInput, handleSearchInputChange, statusFilter, data?.length]);

  const bottomContent = useMemo(() => {
    return (
      <TaskListPagination
        pagesNumber={pages}
        page={currentPage}
        isDisabled={isSearchFilled}
        onPageChange={setCurrentPage}
      />
    );
  }, [isSearchFilled, currentPage, pages]);

  return (
    <NextUIProvider>
      <div className="w-full flex flex-col justify-center gap-4">
        <Table
          aria-label="Tasks"
          selectionMode="single"
          isHeaderSticky={true}
          topContent={topContent}
          bottomContent={bottomContent}
          bottomContentPlacement="outside"
          sortDescriptor={sortDescriptor}
          onSortChange={setSortDescriptor}
          onRowAction={(key) => {
            const id = (key as string).split("-")[0];
            const oppositeStatus =
              (key as string).split("-")[1] === "undone" ? "done" : "undone";
            updateTask.mutate({ id: +id, task: { status: oppositeStatus } });
          }}
        >
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn
                key={column.key}
                allowsSorting={column.sortable}
                align="center"
              >
                {column.label}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody
            items={sortedTasks}
            isLoading={isLoading}
            loadingContent={<Skeleton className="w-full h-full" />}
            emptyContent="No tasks found"
          >
            {(task) => (
              <TableRow key={`${task.id}-${task.status}`}>
                {(columnKey) => (
                  <TableCell textValue={task.status}>
                    {adjustCellContent(task, columnKey)}
                  </TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </NextUIProvider>
  );
}
