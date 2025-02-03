import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Booklist.css';
import { Link } from 'react-router-dom';
import { Modal } from 'react-bootstrap';

const Booklist = () => {
  const [showlist, setBookView] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [showImage, setShowImage] = useState('');
  const [myId, setMyId] = useState('');
  const [editingBook, setEditingBook] = useState({});
  const [newDisplay, setNewDisplay] = useState({});

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/get_collection');
      setBookView(response.data?.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const deleteCategories = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/delete_collection/${id}`);
      setBookView(prevBooks => prevBooks.filter(book => book._id !== id));
    } catch (error) {
      console.error("Error deleting data: ", error);
    }
  };

  const updateData = async (id) => {
    try {
      setMyId(id);
      const response = await axios.get(`http://localhost:5000/api/getUpdate/${id}`);
      setEditingBook(response.data?.data);
      setEditModal(true);
    } catch (error) {
      console.error("Error fetching book data for update: ", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDisplay({ ...newDisplay, [name]: value });
  };

  const handleInputSubmit = async () => {
    try {
      await axios.put(`http://localhost:5000/api/updatebook/${myId}`, newDisplay);
      setEditModal(false);
      getCategories(); // Fetch updated list after submit
    } catch (error) {
      console.error("Error updating data: ", error);
    }
  };

  const showImageModal = (img) => {
    setShowImage(img);
    setShowModal(true);
  };

  return (
    <div className="table-container">
      {showlist.map((itm, indx) => (
        <div key={indx} className="card">
          <div className="card-header">
            <h4>{itm.book_name}</h4>
          </div>
          <div className="card-body">
            <p><strong>Author:</strong> {itm.author_name}</p>
            <p><strong>Price:</strong> ${itm.book_price}</p>
            <p><strong>Publication:</strong> {itm.publication_name}</p>
          </div>
          <div className="card-footer">
            <button className="btn btn-success" onClick={() => showImageModal(itm.book_image)}>View Image</button>
            <button className="btn btn-warning">
              <Link to={`/upload?id=${itm._id}`} style={{ color: 'white', textDecoration: 'none' }}>
                Upload
              </Link>
            </button>
            <button className="btn btn-danger" onClick={() => {
              if (window.confirm('Are you sure you want to delete this book?')) deleteCategories(itm._id);
            }}>Delete</button>
            <button className="btn btn-secondary" onClick={() => updateData(itm._id)}>Update</button>
          </div>
        </div>
      ))}

      {/* Image Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Book Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img
            src={`http://localhost:5000/uploads/${showImage}`}
            alt="book"
            className="img-fluid"
          />
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
            Close
          </button>
        </Modal.Footer>
      </Modal>

      {/* Edit Book Modal */}
      <Modal show={editModal} onHide={() => setEditModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Update Book Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-group">
              <input
                type="text"
                name="book_name"
                className="form-control"
                placeholder="New Book Name"
                defaultValue={editingBook.book_name}
                onChange={handleInputChange}
              />
              <input
                type="number"
                name="book_price"
                className="form-control"
                placeholder="New Book Price"
                defaultValue={editingBook.book_price}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="author_name"
                className="form-control"
                placeholder="New Author Name"
                defaultValue={editingBook.author_name}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="publication_name"
                className="form-control"
                placeholder="New Publication Name"
                defaultValue={editingBook.publication_name}
                onChange={handleInputChange}
              />
            </div>
            <button type="button" className="btn btn-success" onClick={handleInputSubmit}>Submit</button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Booklist;
