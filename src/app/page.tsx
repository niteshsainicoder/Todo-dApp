'use client';
import { useEffect, useState } from "react"
import { connectWallet, addTodoOwner, addTodo, fetchTodos, deleteTodo, updateTodo } from "../lib/ether"

export default function Home() {
  const [settodo, setSettodo] = useState<string>("");
  const [Alltodo, setAlltodo] = useState<string[]>();
  const [val, setval] = useState('');
  const getTodo = async () => {
    setTimeout(async () => {
      await fetchTodos().then((res) => {
        setAlltodo(res);
      }).catch((err) => {
        console.log(err);
      })

    }, 1000)

  }
  const updateTodos = async (todoId: number, updatedTodo: string) => {
    if (settodo !== '') {

      updateTodo(todoId, updatedTodo).then(() => {
        getTodo();
      }).catch((err) => {
        console.log(err);
      })
    }
  }

  const deleteTodos = async (todoId: number) => {
    deleteTodo(todoId).then(() => {
      getTodo();
    }).catch((err) => {
      console.log(err);
    })
  }

  const addTodos = async (todo: string) => {
    await addTodo(todo).then(() => {
      getTodo();
    }).catch((err) => {
      console.log(err);
    })
  }
  useEffect(() => {
    connectWallet().then((res) => {
      getTodo();
      alert('trying to connect wallet');
console.log(res);

    }).catch((err) => {
      console.log(err);
    })
  }, [])



  return (
    <div className="w-full h-screen flex flex-col  sm:justify-start  caret-transparent gap-7 p-4 sm:p-12 items-center">
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
        <h1 className="text-xl select-none">{val !== '' ? val : 'Check you are registered as a Todo owner'}</h1>
        <p onClick={async () => { setval(await addTodoOwner()) }} className="w-fit h-fit p-1 px-3 bg-gray-500 text-zinc-800 font-semibold hover:text-zinc-100 rounded-lg cursor-pointer hover:bg-gray-700"> click here!</p>
      </div>
      <div className=" flex gap-4 w-1/2 justify-center">
        <input onChange={(e) => setSettodo(e.target.value)} type="text" name="todo" title="todo" placeholder="Add Todo" className=" w-full sm:w-2/3 p-1  border border-zinc-700 hover:border-zinc-500 outline-none px-2 bg-gray-700 rounded-lg" />
        <button onClick={() => addTodos(settodo)} type="button" className="w-fit h-fit p-1 px-5 border border-zinc-700 hover:border-zinc-500  bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-800">Add</button>
      </div>
      <div className="w-full sm:w-1/2 h-full flex border relative border-stone-500 p-2 rounded-lg  flex-col items-center justify-start gap-2">
        <h1 className=" w-full text-center text-xl select-none text-gray-300 font-semibold mb-4 border-b-2 border-stone-600">Todo List</h1>
        <p className="w-fit h-fit p-[2px] sm:text-sm px-3 top-1 sm:px-2 sm:top-[6px] right-4 flex absolute  bg-gray-500  font-semibold hover:text-zinc-100 rounded-lg cursor-pointer hover:bg-gray-700  text-green-300  justify-center items-center gap-2" onClick={getTodo}> <span className="rotate-12 ">↺</span> <span className="hidden sm:inline text-gray-800"> Refresh</span></p>
        <div className="w-full h-full overflow-y-auto removescrollbar gap-1 flex flex-col scroll-smooth">
          {Alltodo?.map((todo, key) =>
          (<div key={todo} className="w-full h-10  flex justify-between items-center p-1 px-3 bg-gray-500 font-semibold rounded-md text-ellipsis">
            <p className="w-full  text-zinc-700 hover:text-zinc-200 max-w-72 text-nowrap pr-7 p-1 overflow-hidden  text-ellipsis">{todo}</p>
            <div className="flex gap-4">
              <button type="button" className=" text-lg text-[#f13d30] hover:text-[#ff774d] outline-none" onClick={() => deleteTodos(key)}>X</button>
              <button type="button" className="text-[#abf62d] hover:text-[#bdff4b] outline-none" onClick={() => { updateTodos(key, settodo) }}>Update</button>
            </div></div>))
          }
        </div>
      </div>
    </div>)
}
