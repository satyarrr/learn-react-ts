"use client"

import React, { FormEventHandler, useState } from "react"
import { GrAddCircle } from "react-icons/gr"
import Modal from "./Modal"
import { useRouter } from "next/navigation"
import { v4 as uuidv4 } from "uuid"
import { addTodo } from "@/api"

const AddTask = () => {
  const router = useRouter()
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [newtaskValue, setNewTaskValue] = useState<string>("")

  const handleSubmitNewTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    await addTodo({
      id: uuidv4(),
      text: newtaskValue,
    })
    setNewTaskValue("")
    setModalOpen(false)
    router.refresh()
  }
  return (
    <div>
      <button className="btn" onClick={() => setModalOpen(true)}>
        Add new Task
        <GrAddCircle />
      </button>
      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <form onSubmit={handleSubmitNewTodo}>
          <h3 className="text-lg font-bold">Add new Task</h3>
          <div className="modal-action">
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
              value={newtaskValue}
              onChange={(e) => setNewTaskValue(e.target.value)}
            />
            <button className="btn" type="submit">
              Sumbit
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default AddTask
