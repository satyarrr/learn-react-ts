import { ITask } from "@/types/tasks"
import React from "react"
import Task from "./Task"

interface TodoListProps {
  tasks: ITask[]
}

const ToDoList: React.FC<TodoListProps> = ({ tasks }) => {
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Task</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <Task key={task.id} task={task} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
export default ToDoList
