import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../config/supabaseClient";

const Update = () => {
  const [title, setTitle] = useState("");
  const [method, setMethod] = useState("");
  const [rating, setRating] = useState("");

  const [formError, setFormError] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!title || !method || !rating) {
      setFormError("Please fill all inputs correcly");
      return;
    }

    const { error} = await supabase.from("Todos").update({title, method, rating}).eq('id', id)

    if(error){
      console.log(error);
      setFormError("Please fill all inputs correctly");
    }
    if(!error){
      setFormError(null)
      navigate('/')
    }
  }

  useEffect(() => {
    const fetchTodo = async () => {
      const { data, error } = await supabase
        .from("Todos")
        .select()
        .eq("id", id)
        .single();

      if (error) {
        navigate("/");
      }

      if (data) {
        setTitle(data.title);
        setMethod(data.method);
        setRating(data.rating);
        console.log(data);
      }
    };
    fetchTodo();
  }, []);

  return (
    <div className="page create">
      <form onSubmit={handleSubmit}>
        <div style={{ display: "flex", alignItems: "center", color: "black" }}>
          <h2>Update Todos</h2>
        </div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="method">Method:</label>
        <textarea
          id="method"
          value={method}
          onChange={(e) => setMethod(e.target.value)}
        />

        <label htmlFor="rating">Rating:</label>
        <input
          type="number"
          id="rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />

        <button>Update Todos</button>

        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  );
};

export default Update;
