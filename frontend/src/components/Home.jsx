import React, { useEffect, useState } from "react";
import Navbar from "./partials/Navbar";
import { Link } from "react-router-dom";
import { AiFillEdit, AiOutlineEye } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import Swal from "sweetalert2";
import axios from "axios";

const Home = () => {
  const convertRupiah = (q) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(q);
  };

  const [items, setItems] = useState();

  const getItems = () => {
    axios({
      method: "GET",
      url: "http://localhost:3000/items",
    })
      .then((result) => {
        setItems(result.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const DeleteAlert = async (id) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await axios({
            method: "DELETE",
            url: `http://localhost:3000/items/delete/${id}`,
          });
          getItems();
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getItems();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container">
        <h1 className="my-3">Home Page</h1>
        <table className="table table-striped">
          <thead className="text-center">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {items &&
              items.map((item, index) => {
                const { id, name, category, price, stock } = item;
                return (
                  <tr key={id}>
                    <th scope="row">{index + 1}</th>
                    <td className="text-start">{name}</td>
                    <td>{category}</td>
                    <td className="text-end">{convertRupiah(price)}</td>
                    <td>{stock}</td>
                    <td>
                      <Link
                        className="btn btn-sm btn-info me-2"
                        to={`/detail/${id}`}
                      >
                        <AiOutlineEye />
                      </Link>
                      <Link
                        className="btn btn-sm btn-warning me-2"
                        to={`/edit/${id}`}
                      >
                        <AiFillEdit />
                      </Link>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => DeleteAlert(id)}
                      >
                        <RxCross1 />
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Home;
