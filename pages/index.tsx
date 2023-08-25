import { Inter } from "next/font/google"
import { useEffect, useState } from "react"
import {
  collection,
  addDoc,
  query,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore"
import { db } from "./firebase"

type Item = {
  id: string
  name: string
  price: string
}

export default function Home() {
  const [items, setItems] = useState<Item[]>([
    // { name: "Coffee", price: "10" },
    // { name: "Burger", price: "15" },
    // { name: "pizza", price: "13.9" },
  ])
  const [newItem, setNewItem] = useState<Item>({ id: "", name: "", price: "" })
  const [total, setTotal] = useState(0)

  const addItem = async (e: any) => {
    e.preventDefault()
    if (newItem.name !== "" && newItem.price !== "") {
      // setItems([...items, newItem])
      await addDoc(collection(db, "items"), {
        name: newItem.name.trim(),
        price: newItem.price,
      })
    }
    setNewItem({ id: "", name: "", price: "" })
  }

  useEffect(() => {
    const q = query(collection(db, "items"))
    const unsubscribe: any = onSnapshot(q, (querySnapshot) => {
      let itemsArr: any = []
      querySnapshot.forEach((doc) => {
        itemsArr.push({ ...doc.data(), id: doc.id })
      })
      setItems(itemsArr)

      // total
      const calculateTotal = () => {
        const totalPrice = itemsArr.reduce(
          (sum: number, item: { price: string }) =>
            sum + parseFloat(item.price),
          0
        )
        setTotal(totalPrice)
      }
      calculateTotal()
      return () => unsubscribe()
    })
  }, [])

  const deleteItem = async (id: any) => {
    await deleteDoc(doc(db, "items", id))
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between sm:p-24 p-4 ">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm ">
        <h1 className="text-4xl p-4">Expense Tracker</h1>
        <div className="bg-slate-800 p-4 rounded-lg">
          <form className="text-black items-center grid grid-cols-6">
            <input
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              className="col-span-3 p-3 border"
              type="text"
              placeholder="input item"
            />
            <input
              value={newItem.price}
              onChange={(e) =>
                setNewItem({ ...newItem, price: e.target.value })
              }
              className="col-span-2 p-3 border mx-3"
              type="text"
              placeholder="input price"
            />
            <button
              onClick={addItem}
              className="text-white bg-slate-950 p-3 hover:bg-slate-900 text-xl"
              type="submit"
            >
              +
            </button>
          </form>
          <ul>
            {items.map((item, id) => (
              <li
                key={id}
                className="my-4 w-full flex justify-between bg-slate-950"
              >
                <div className="p-4 w-full flex justify-between">
                  <span className="capitalize">{item.name}</span>
                  <span>${item.price}</span>
                </div>
                <button
                  onClick={() => deleteItem(item.id)}
                  className="ml-8 p-4 border-l-2 border-slate-900 hover:bg-slate-900 w-16"
                >
                  X
                </button>
              </li>
            ))}
          </ul>
          {items.length < 1 ? (
            ""
          ) : (
            <div className="flex justify-between p-3">
              <span>Total</span>
              <span>${total}</span>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
