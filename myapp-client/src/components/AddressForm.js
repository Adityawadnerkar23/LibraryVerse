import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Navbar from "../components/Navbar";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import "./Addressform.css";

const AddressForm = () => {
  const [product, setProduct] = useState({
    product_name: "",
    product_price: "",
    product_quantity: "",
    manufacturing_date: "",
    expiry_date: "",
    category: "",
  });

  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState([]);
  const [displayForm, setDisplayForm] = useState(false);
  const [categoryForm, setCategoryForm] = useState(false);
  const [inputData, setInputData] = useState({ name: "", age: "", address: "" });
  const [editMode, setEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const localData = JSON.parse(localStorage.getItem("formData")) || [];
    setFormData(localData);
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/get_category");
      setCategories(response.data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleProductChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/post_address", product);
      setProduct({
        product_name: "",
        product_price: "",
        product_quantity: "",
        manufacturing_date: "",
        expiry_date: "",
        category: "",
      });
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
  };

  const handleInputSubmit = () => {
    const newData = [...formData, inputData];
    setFormData(newData);
    localStorage.setItem("formData", JSON.stringify(newData));
    setInputData({ name: "", age: "", address: "" });
  };

  const handleEdit = (index) => {
    setInputData(formData[index]);
    setEditIndex(index);
    setEditMode(true);
  };

  const handleUpdate = () => {
    const updatedData = [...formData];
    updatedData[editIndex] = inputData;
    setFormData(updatedData);
    localStorage.setItem("formData", JSON.stringify(updatedData));
    setEditMode(false);
    setInputData({ name: "", age: "", address: "" });
  };

  const handleDelete = (index) => {
    const updatedData = formData.filter((_, i) => i !== index);
    setFormData(updatedData);
    localStorage.setItem("formData", JSON.stringify(updatedData));
  };

  return (
    <>
      <Navbar /> {/* Moved Navbar outside the main container */}

      <div className="address-form-container">
        <h3 className="toggle-title" onClick={() => setDisplayForm(!displayForm)}>
          PRODUCT FORM
        </h3>

        {displayForm && (
          <Card className="form-card">
            <Card.Body>
              <form onSubmit={handleProductSubmit}>
                <div className="form-group">
                  <input type="text" name="product_name" placeholder="Product Name" value={product.product_name} onChange={handleProductChange} required />
                </div>
                <div className="form-group">
                  <input type="text" name="product_price" placeholder="Price" value={product.product_price} onChange={handleProductChange} required />
                </div>
                <div className="form-group">
                  <input type="text" name="product_quantity" placeholder="Quantity" value={product.product_quantity} onChange={handleProductChange} required />
                </div>
                <div className="form-group">
                  <input type="date" name="manufacturing_date" value={product.manufacturing_date} onChange={handleProductChange} required />
                </div>
                <div className="form-group">
                  <input type="date" name="expiry_date" value={product.expiry_date} onChange={handleProductChange} required />
                </div>
                <div className="form-group">
                  <select name="category" value={product.category} onChange={handleProductChange} required>
                    <option hidden>Select Category</option>
                    {categories.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.Category_name}
                      </option>
                    ))}
                  </select>
                </div>
                <Button type="submit" className="btn-primary">Add Product</Button>
              </form>
            </Card.Body>
          </Card>
        )}

      
      </div>
    </>
  );
};

export default AddressForm;
