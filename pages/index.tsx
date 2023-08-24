import { getAllTodos } from "@/api"
import AddTask from "@/components/AddTask"
import ToDoList from "@/components/TodoList"
import { ITask } from "@/types/tasks"
import { useEffect, useState } from "react"

export default function Home() {
  const [tasks, setTasks] = useState<ITask[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchTasks() {
      try {
        const fetchedTasks = await getAllTodos()
        setTasks(fetchedTasks)
        setLoading(false)
      } catch (error) {
        setError(error as Error)
        setLoading(false)
      }
    }
    fetchTasks()
  }, [])

  return (
    <main className="max-w-4xl mx-auto">
      <div className="text-center flex flex-col gap-4">
        <h1 className="text-2xl font-bold">TodoList</h1>
        <AddTask />
      </div>
      {loading ? (
        <p>Loading tasks...</p>
      ) : error ? (
        <p>Error fetching tasks: {error.message}</p>
      ) : (
        <ToDoList tasks={tasks} />
      )}
    </main>
  )
}
