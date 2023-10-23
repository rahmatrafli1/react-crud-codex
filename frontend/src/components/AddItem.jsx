import React, { useState } from "react";
import Navbar from "./partials/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AddItem = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [userid, setUserId] = useState(0);

  const navigate = useNavigate();

  const addItems = async (e) => {
    e.preventDefault();
    try {
      axios({
        method: "POST",
        url: "http://localhost:3000/items/add",
        data: {
          name: name,
          category: category,
          price: price,
          stock: stock,
          user_id: userid,
        },
      });
      navigate("/");
      Swal.fire("Added!", "Your file has been added.", "success");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <h1 className="my-3">Add Item</h1>
        <form onSubmit={addItems}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Category</label>
            <input
              type="text"
              className="form-control"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Price</label>
            <input
              type="number"
              className="form-control"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Stock</label>
            <input
              type="number"
              className="form-control"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">User ID</label>
            <input
              type="number"
              className="form-control"
              value={userid}
              onChange={(e) => setUserId(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Save
          </button>
        </form>
      </div>
    </>
  );
};

export default AddItem;
