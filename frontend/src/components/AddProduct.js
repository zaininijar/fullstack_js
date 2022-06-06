import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");

  const navigate = useNavigate();

  const saveProduct = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/product", {
      title: title,
      price: price,
    });

    navigate("/products");
  };

  return (
    <div className="container mt-4">
      <div className="columns">
        <div className="column is-half is-offset-one-quarter">
          <div className="box mt-4">
            <form onSubmit={saveProduct}>
              <h1 className="label my-4">Form Input Product</h1>
              <div className="field">
                <lable className="label">Title</lable>
                <input
                  className="input is-primary"
                  type="text"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  autoFocus
                />
              </div>
              <div className="field">
                <lable className="label">Price</lable>
                <input
                  className="input is-primary"
                  type="number"
                  placeholder="Price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="field mt-2">
                <button className="button is-primary">Save</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
