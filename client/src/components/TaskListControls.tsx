import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Selection,
  useDisclosure,
} from "@nextui-org/react";
import { capitalize } from "@/utils";
import { statusOptions } from "./TaskList";
import DownIcon from "./icons/Down";
import PlusIcon from "./icons/Plus";
import SearchIcon from "./icons/Search";
import TaskCreateForm from "./TaskCreateForm";

type TaskListControlsProps = {
  inputValue: string;
  onInputClear: () => void;
  onInputValueChange: (value: string) => void;
  dropdownSelectedKeys: any;
  onDropdownSelectionChange: (keys: Selection) => any;
  tasksLength: number;
};

export default function TaskListControls({
  inputValue,
  onInputClear,
  onInputValueChange,
  dropdownSelectedKeys,
  onDropdownSelectionChange,
  tasksLength,
}: TaskListControlsProps) {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between gap-2 items-end">
        <Input
          classNames={{
            base: "w-full sm:max-w-[45%]",
            inputWrapper: "border-1",
          }}
          placeholder="Search by title.."
          isClearable
          size="sm"
          variant="bordered"
          value={inputValue}
          onClear={onInputClear}
          onValueChange={onInputValueChange}
          startContent={<SearchIcon className="text-default-300" />}
        />
        <div className="flex gap-2">
          <Dropdown>
            <DropdownTrigger className="hidden sm:flex">
              <Button
                size="md"
                variant="flat"
                endContent={<DownIcon className="text-small" />}
              >
                Status
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Status"
              closeOnSelect={false}
              disallowEmptySelection
              selectionMode="multiple"
              selectedKeys={dropdownSelectedKeys}
              onSelectionChange={onDropdownSelectionChange}
            >
              {statusOptions.map((status) => (
                <DropdownItem key={status} className="capitalize">
                  {capitalize(status)}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
          <Button
            className="bg-foreground text-background"
            endContent={<PlusIcon />}
            size="md"
            onPress={onOpen}
          >
            Add New
          </Button>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-default-400 text-small">
          Total {tasksLength} records
        </span>
      </div>
      <TaskCreateForm isModalOpen={isOpen} onModalOpenChange={onOpenChange} />
    </div>
  );
}
