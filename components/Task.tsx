import { ITask } from "@/types/tasks"
import React, { FormEventHandler, useState } from "react"
import { FaEdit } from "react-icons/fa"
import { MdDelete } from "react-icons/md"
import Modal from "./Modal"
import { deleteTodo, editTodo } from "@/api"
import { useRouter } from "next/navigation"
interface TaskProps {
  task: ITask
}

const Task: React.FC<TaskProps> = ({ task }) => {
  const router = useRouter()
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false)
  const [editTaskValue, setEditTaskValue] = useState<string>(task.text)
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false)

  const handleSubmitEditedTodo: FormEventHandler<HTMLElement> = async (e) => {
    e.preventDefault()
    await editTodo({
      id: task.id,
      text: editTaskValue,
    })
    setEditModalOpen(false)
    router.refresh()
  }

  const handleDeleteTodo = async (id: string) => {
    await deleteTodo(id)
    setDeleteModalOpen(deleteModalOpen)
    router.refresh()
  }

  return (
    <tr key={task.id}>
      <td>{task.text}</td>
      <td className="flex gap-4">
        <FaEdit
          size={25}
          cursor="pointer"
          className="text-blue-500"
          onClick={() => setEditModalOpen(true)}
        />
        <MdDelete
          size={25}
          cursor="pointer"
          className="text-red-500"
          onClick={() => setDeleteModalOpen(!deleteModalOpen)}
        />
        {/* Modal edit */}
        <Modal modalOpen={editModalOpen} setModalOpen={setEditModalOpen}>
          <form onSubmit={handleSubmitEditedTodo}>
            <h3 className="text-lg font-bold">Add new Task</h3>
            <div className="modal-action">
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
                value={editTaskValue}
                onChange={(e) => setEditTaskValue(e.target.value)}
              />
              <button className="btn" type="submit">
                Sumbit
              </button>
            </div>
          </form>
        </Modal>
        {/* Modal Delete */}
        <Modal modalOpen={deleteModalOpen} setModalOpen={setDeleteModalOpen}>
          <h3 className="text-lg text-bold">
            Are you sure to delete this task?
          </h3>
          <div className="modal-action">
            <button onClick={() => handleDeleteTodo(task.id)} className="btn">
              Yes
            </button>
          </div>
        </Modal>
      </td>
    </tr>
  )
}

export default Task
