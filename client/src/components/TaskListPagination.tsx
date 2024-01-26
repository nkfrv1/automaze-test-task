import { Pagination } from "@nextui-org/react";

type TaskListPaginationProps = {
  pagesNumber: number;
  page: number;
  isDisabled: boolean;
  onPageChange: (page: number) => void;
};

export default function TaskListPagination({
  pagesNumber,
  page,
  isDisabled,
  onPageChange,
}: TaskListPaginationProps) {
  return (
    <div className="py-2 px-2 flex justify-center items-center">
      <Pagination
        showControls
        classNames={{
          cursor: "bg-foreground text-background",
        }}
        variant="light"
        color="default"
        total={pagesNumber}
        page={page}
        isDisabled={isDisabled}
        onChange={onPageChange}
      />
    </div>
  );
}
