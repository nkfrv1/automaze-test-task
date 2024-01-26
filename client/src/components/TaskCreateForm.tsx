import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Textarea,
} from "@nextui-org/react";
import { statusOptions } from "./TaskList";
import { capitalize } from "@/utils";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { NewTask } from "@/types";
import TaskService from "@/api/TaskService";

export default function TaskCreateForm({
  isModalOpen,
  onModalOpenChange,
}: {
  isModalOpen: boolean;
  onModalOpenChange: () => void;
}) {
  const queryClient = useQueryClient();

  const createTask = useMutation({
    mutationFn: (task: NewTask) => TaskService.create(task),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });

  const [title, setTitle] = useState("");
  const [status, setStatus] = useState(statusOptions[1]);
  const [priority, setPriority] = useState(1);

  return (
    <Modal
      size="xl"
      backdrop="blur"
      placement="center"
      isOpen={isModalOpen}
      onOpenChange={onModalOpenChange}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Create New Task
            </ModalHeader>
            <ModalBody>
              <Textarea
                autoFocus
                fullWidth
                isRequired
                minRows={1}
                maxRows={2}
                label="Title"
                placeholder="Enter your task title"
                value={title}
                onValueChange={setTitle}
              />
              <Select
                className="min-w-xs"
                isRequired
                label="Status"
                fullWidth={false}
                selectionMode="single"
                disallowEmptySelection
                selectedKeys={[status]}
                onChange={(e) => setStatus(e.target.value)}
              >
                {statusOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {capitalize(option)}
                  </SelectItem>
                ))}
              </Select>
              <Select
                className="min-w-xs"
                isRequired
                label="Priority"
                fullWidth={false}
                selectionMode="single"
                disallowEmptySelection
                placeholder="Set priority for your task"
                selectedKeys={[`${priority}`]}
                onChange={(e) => setPriority(+e.target.value)}
              >
                {Array.from({ length: 10 }, (_, i) => i + 1).map((option) => (
                  <SelectItem key={option} value={option}>
                    {`${option}`}
                  </SelectItem>
                ))}
              </Select>
            </ModalBody>
            <ModalFooter className="justify-center">
              <Button variant="flat" onPress={onClose}>
                Close
              </Button>
              <Button
                type="submit"
                className="bg-foreground text-background"
                onPress={() => {
                  createTask.mutate({
                    title,
                    status: status as "done" | "undone",
                    priority,
                  });
                  setTitle("");
                  setStatus(statusOptions[1]);
                  setPriority(1);
                  return onClose();
                }}
              >
                Add
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
