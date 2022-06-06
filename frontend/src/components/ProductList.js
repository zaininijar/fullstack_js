import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./../Style.css";

const ProductList = () => {
  const [products, setProduct] = useState([]);
  const [alert, setAlert] = useState(false);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const response = await axios.get("http://localhost:5000/products");
    setProduct(response.data);
  };

  const deleteProduct = async (id) => {
    const response = await axios.delete(`http://localhost:5000/product/${id}`);
    getProducts();
  };

  const alertClass = "notification is-danger mt-2 hidden";

  return (
    <div className="container mt-4 is-fullwidth">
      <div className="columns">
        <div className="column">
          <div className="mt-4 box">
            <Link to="/add" className="button is-primary mt-4">
              Add New Product
            </Link>
            <div className={alertClass}>
              <button className="delete"></button> Lorem ipsum dolor sit amet,
              consectetur adipiscing elit lorem ipsum dolor sit amet,
              consectetur adipiscing elit{" "}
            </div>
            <table className="table is-stripped is-fullwidth">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Title</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr key={product.id}>
                    <td>{index + 1}</td>
                    <td>{product.title}</td>
                    <td>Rp{product.price}</td>
                    <td>
                      <Link
                        to={`/edite/${product.id}`}
                        className="button is-small is-info mr-2"
                      >
                        Edite
                      </Link>
                      <a
                        onClick={() => deleteProduct(product.id)}
                        className="button is-small is-danger"
                      >
                        Delete
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
