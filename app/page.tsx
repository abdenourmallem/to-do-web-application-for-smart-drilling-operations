
import TaskForm from "./components/TaskForm";
import DashBoard from "./components/DashBoard";
export default function Home() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-60 bg-gray-800 text-white p-4">
        <DashBoard />
      </aside>
      <main className="flex-1 p-6">
        <TaskForm />
      </main>
    </div>
  );
}
