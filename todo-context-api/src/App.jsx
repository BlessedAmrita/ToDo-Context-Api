import { useEffect, useState } from "react";
import { TodoProvider } from "./context/TodoContext";
import { TodoForm, TodoItem } from "./components";

function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    setTodos((prevTodos) => ([ {id:Date.now(),...todo}, ...prevTodos ]));
  };

  const updateTodo = (todo, id) => {
    setTodos((prevTodos) =>
      prevTodos.map((prevTodo) =>
       ( prevTodo.id === id ? todo : prevTodo) //syntax of map ??
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((prevTodo) => prevTodo.id !== id)); //syntax of filter ??
  };

  const toggleTodo = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((prevTodo) =>
        prevTodo.id === id
          ? { ...prevTodo, completed: !(prevTodo.completed) }
          : prevTodo
      )
    );
  };

  // ---------------------LOCAL STORAGE PART--------------------- //
  //const cat =localStorage.setItem("key", "value");
  //localStorage.getItem("key")
  //localStorage.removeItem("key")
  //localStorage.clear()
  //it always recieves and sends string values
  //hence use JSON.parse() and JSON.stringify()

  useEffect(()=>{
    const todos=JSON.parse(localStorage.getItem("todos"))
    if(todos && todos.length>0){
      setTodos(todos)
    }
  },[])  //runs once the page is loaded and all the todos are recieved from the local storage

  useEffect(()=>{
    localStorage.setItem("todos",JSON.stringify(todos))
  },[todos])  //updates the todos in local storage whenever the state of todos changes (a new todo is added)




  return (
    <>
      <TodoProvider
        value={{ todos, addTodo, deleteTodo, updateTodo, toggleTodo }}
      >
        <div className="bg-[#172842] min-h-screen py-8">
          <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
            <h1 className="text-2xl font-bold text-center mb-8 mt-2">
              Manage Your Todos
            </h1>
            <div className="mb-4"><TodoForm/></div>
            <div className="flex flex-wrap gap-y-3">
              {/*Loop and Add TodoItem here */}
              {todos.map((todo)=>{
                return(
                  <div key={todo.id} className=" w-full">
                    <TodoItem todo={todo}/>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </TodoProvider>
    </>
  );
}

export default App;
