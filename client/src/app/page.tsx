import TaskList from "@/components/TaskList";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start gap-5 py-16 px-24">
      <h1 className="text-4xl mb-6 font-semibold">Todos</h1>
      <TaskList />
    </main>
  );
}
