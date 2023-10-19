import React, { useState } from "react";
import { AiOutlineCheck, AiOutlineDelete, AiFillFileAdd } from "react-icons/ai";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [active, setActive] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [input, setInput] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  const addTodo = () => {
    const todo = {
      id: Math.floor(Math.random() * 1000),
      text: input,
    };
    setTodos([todo, ...todos]);
  };

  const addtoActive = (id) => {
    const item = todos.find((x) => x.id === id);
    setActive([item, ...active]);
    const filteredArray = todos.filter((x) => x.id !== id);
    setTodos(filteredArray);
  };

  const deleteTodo = (id) => {
    const filteredArray = todos.filter((x) => x.id !== id);
    setTodos(filteredArray);
  };

  const addtoCompleted = (id) => {
    const item = active.find((x) => x.id === id);
    setCompleted([item, ...completed]);
    const filteredArray = active.filter((x) => x.id !== id);
    setActive(filteredArray);
  };

  const filterTodos = () => {
    if (selectedFilter === "active") {
      return active;
    } else if (selectedFilter === "completed") {
      return completed;
    } else {
      return todos;
    }
  };

  return (
    <div className="App">
      <div className="wrapper">
        <h1>To do list app</h1>

        {/* form and button */}
        <form>
          <input
            type="text"
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add a task here"
            name="text"
          />
          <button type="button" className="btn" onClick={() => addTodo()}>
            <AiFillFileAdd />
          </button>
        </form>

        {/* dropdown filter */}
        <select
          value={selectedFilter}
          onChange={(e) => setSelectedFilter(e.target.value)}
        >
          <option value="all">All to do's</option>
          <option value="active">Active/In progress to do's</option>
          <option value="completed">Completed to do's</option>
        </select>

        <div className="todosWrapper">
          <div className="todosList">
            <h2>
              {selectedFilter === "active"
                ? "Active"
                : selectedFilter === "completed"
                ? "Completed"
                : "All"}{" "}
              to do's
            </h2>

            {/* icons for adding to active, adding to completed, deleting */}
            {filterTodos().map((item, index) => (
              <div className="todoWrapper" key={item.id}>
                <p>{item.text}</p>
                {selectedFilter === "all" && (
                  <AiOutlineCheck onClick={() => addtoActive(item.id)} />
                )}
                {selectedFilter === "all" && (
                  <AiOutlineDelete onClick={() => deleteTodo(item.id)} />
                )}
                {selectedFilter === "active" && (
                  <AiOutlineCheck onClick={() => addtoCompleted(item.id)} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
