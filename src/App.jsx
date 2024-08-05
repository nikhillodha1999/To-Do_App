import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { v4 as uuidv4 } from 'uuid';

function App() {
  // State variables
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setshowFinished] = useState(true);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  // Load todos from localStorage on component mount
  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos);
    }
  }, []);

  // Save todos to localStorage
  const saveToLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  // Toggle the visibility of finished tasks
  const toggleFinished = () => {
    setshowFinished(!showFinished);
  };

  // Handle editing a task
  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id);
    setTodo(t[0].todo);
    let newTodos = todos.filter(item => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLS();
  };

  // Handle deleting a task
  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLS();
  };

  // Handle adding a new task
  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
    saveToLS();
  };

  // Handle input change for adding a new task
  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  // Handle task completion checkbox
  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    });
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLS();
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filtered tasks based on search query
  const filteredTodos = todos.filter(todo =>
    todo.todo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-zinc-100 min-h-[80vh] md:w-[35%] shadow-lg">
        <h1 className='font-bold text-center text-3xl'>To-Dozz- All your upcoming work is at one place</h1>
        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className='text-2xl font-bold'>Add a Todo</h2>
          <div className="flex">
            <input onChange={handleChange} value={todo} type="text" className='w-full bg-white px-5 py-2 rounded-lg placeholder-gray-500 border' placeholder="Enter your task here" />
            <button onClick={handleAdd} disabled={todo.length <= 3} className='bg-cyan-700 mx-2 rounded-lg hover:bg-cyan-800 disabled:bg-cyan-700 p-4 py-2 text-sm font-bold text-white'>ADD</button>
          </div>
        </div>
        <input className='my-4' id='show' onChange={toggleFinished} type="checkbox" checked={showFinished} />
        <label className='mx-2' htmlFor="show">Show Finished</label>
        <div className='h-[1px] bg-black opacity-15 w-[90%] mx-auto my-2'></div>
        <h2 className='text-2xl font-bold'>Your Todos</h2>
        <div className="searchTodo my-4">
          <input onChange={handleSearchChange} value={searchQuery} type="text" className='w-full bg-white px-5 py-2 rounded-lg placeholder-gray-500 border' placeholder="Search your tasks here" />
        </div>
        <div className="todos">
          {filteredTodos.length === 0 && <div className='m-5'>No Todos to display</div>}
          {filteredTodos.map(item => {
            return (showFinished || !item.isCompleted) && (
              <div key={item.id} className={"todo flex my-3 justify-between"}>
                <div className='flex gap-5'>
                  <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} id="" />
                  <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
                </div>
                <div className="buttons flex h-full">
                  <button onClick={(e) => handleEdit(e, item.id)} className='bg-cyan-700 hover:bg-cyan-800 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'><FaEdit /></button>
                  <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-cyan-700 hover:bg-cyan-800 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'><AiFillDelete /></button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  );
}

export default App;
