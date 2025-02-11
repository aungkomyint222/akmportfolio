
// app/page.js
import TaskManager from './components/Tasklist'; // adjust the import path as needed

export async function generateMetadata() {
    return {
      title: "Tasket - Task Manager & Pomodoro Timer for Maximum Productivity",
      description:
        "Boost your focus and efficiency with Tasket, the all-in-one task manager and Pomodoro timer by Aung Ko Myint. Stay organized, track tasks, and manage time effectively to get more done.",
      keywords:
        "Tasket, task manager, Pomodoro timer, productivity app, time management, to-do list, work planner, focus timer, habit tracker, project management, best task manager, Aung Ko Myint, efficient work planning",
    };
  }

export default function Page() {
  return (
    <main className="bg-gray-50 min-h-screen">
      <TaskManager />
    </main>
  );
}
