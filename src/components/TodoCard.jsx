import React from "react";
import { Link } from "react-router-dom";
import { supabase } from "../config/supabaseClient";

const TodoCard = ({ todo, onDelete }) => {
  const handleDelete = async () => {
    const { error } = await supabase
      .from("Todos")
      .delete()
      .eq("id", todo.id);

    if (error) {
      console.log(error);
    }
    if (!error) {
      onDelete(todo.id)
    }
  };
  return (
    <div className="todo-card">
      <h3>{todo.title}</h3>
      <p>{todo.method}</p>
      <div className="rating">{todo.rating}</div>
      <div className="actions">
        <Link className="btn btn-edit" to={"/" + todo.id}>
          Edit
        </Link>

        <button className="btn btn-delete" onClick={handleDelete} type="button">
          Delete
        </button>
      </div>

    </div>
  );
};

export default TodoCard;
