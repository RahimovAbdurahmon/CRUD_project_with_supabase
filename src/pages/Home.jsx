import React, { useEffect, useState } from "react";
import { supabase } from "./../config/supabaseClient";
import TodoCard from "../components/todoCard";

const Home = () => {
  const [fetchError, setFetchError] = useState(null);
  const [todos, setTodos] = useState(null);
  const [orderBy, setOrderBy] = useState("created_at");

  const handleDelete = (id) => {
    setTodos((prevTodos) => {
      return prevTodos.filter((todo) => todo.id != id);
    });
  };

  useEffect(() => {
    const fetchTodos = async () => {
      const { data, error } = await supabase.from("Todos").select().order(orderBy, {ascending: false});

      if (error) {
        setFetchError("Could not fetch todos from supabase");
        console.log(error);
        setTodos(null);
      }
      if (data) {
        setTodos(data);
        console.log(data);
        setFetchError(null);
      }
    };
    fetchTodos();
  }, [orderBy]);

  return (
    <div>
      {fetchError && <p>Error while fetching todos from supabase</p>}
      {todos && (
        <div className="todos">
          <div className="order-by">
            <p>Order by:</p>

            <button onClick={() => setOrderBy("created_at")}>
              Time Created
            </button>

            <button onClick={() => setOrderBy("title")}>Title</button>

            <button onClick={() => setOrderBy("rating")}>Rating</button>
            {orderBy}
          </div>

          <div className="todos-grid">
            {todos.map((todo) => (
              <TodoCard key={todo.id} todo={todo} onDelete={handleDelete} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
