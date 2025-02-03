import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Navbar from "../components/Navbar";

const CategoryForm = () => {
  const [Category_name, setCategoryName] = useState("");
  const [categories, setCategories] = useState([]);

  // Fetch categories when the component mounts
  useEffect(() => {
    fetchCategories();
  }, []);

  // Function to fetch categories from the backend
  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/get_category");
      setCategories(response.data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Handle category form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newCategory = {
      usercategory: Category_name,
    };

    try {
      await axios.post("http://localhost:5000/api/post_category", newCategory);
      setCategoryName("");
      fetchCategories(); // Refresh the category list after adding a new one
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  // Function to delete a category by ID
  const handleDelete = async (categoryId) => {
    try {
      await axios.delete(`http://localhost:5000/api/delete_category/${categoryId}`);
      fetchCategories(); // Refresh the category list after deletion
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  return (
    <div className="col-lg-12">
      <Navbar />
      <br />
      <form className="mx-5" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="CATEGORY NAME"
          value={Category_name}
          onChange={(e) => setCategoryName(e.target.value)}
          required
        />
        <Button variant="primary" type="submit">
          Add Category
        </Button>
      </form>

      {/* Categories Table */}
      <div className="mx-5 mt-4">
        <h4>Category List</h4>
        <Table striped bordered hover className="custom-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Category Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {categories.length > 0 ? (
              categories.map((category, index) => (
                <tr key={category._id}>
                  <td>{index + 1}</td>
                  <td>{category.Category_name}</td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(category._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">No categories available</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default CategoryForm;
