import React, { useEffect, useState } from "react";
import Navbar from "./partials/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const EditItem = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [userid, setUserId] = useState(0);

  const navigate = useNavigate();

  const { id } = useParams();

  const updateItems = async (e) => {
    e.preventDefault();
    try {
      axios({
        method: "PUT",
        url: `http://localhost:3000/items/edit/${id}`,
        data: {
          name: name,
          category: category,
          price: price,
          stock: stock,
          user_id: userid,
        },
      });
      navigate("/");
      Swal.fire("Updated!", "Your file has been updated.", "success");
    } catch (error) {
      console.log(error);
    }
  };

  const getUserById = async () => {
    const response = await axios.get(
      `http://localhost:3000/items/detail/${id}`
    );
    setName(response.data.data.name);
    setCategory(response.data.data.category);
    setPrice(response.data.data.price);
    setStock(response.data.data.stock);
    setUserId(response.data.data.user_id);
  };

  useEffect(
    () => {
      getUserById();
    }, // eslint-disable-next-line
    []
  );

  return (
    <>
      <Navbar />
      <div className="container">
        <h1 className="my-3">Edit Item</h1>
        <form onSubmit={updateItems}>
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
            Edit
          </button>
        </form>
      </div>
    </>
  );
};

export default EditItem;
