import axios from 'axios';
import React, { useState } from 'react';
import './style.css';

const Addbook = () => {
  const [book_name, setBookName] = useState('');
  const [book_price, setBookPrice] = useState('');
  const [author_name, setAuthorName] = useState('');
  const [publication_name, setPublicationName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newcollection = { book_name, book_price, author_name, publication_name };
    try {
      const response = await axios.post('http://localhost:5000/api/post_collection', newcollection);
      setBookName('');
      setBookPrice('');
      setAuthorName('');
      setPublicationName('');
    } catch (error) {
      console.log(error, 'error adding');
    }
  };

  return (
    <div className="container" style={{ backgroundColor: 'white', padding: '30px', borderRadius: '8px' }}>
      <form onSubmit={handleSubmit}>
        <div className="container-lg">
          <div className="container mb-5">
            <div className="row">
              <h4 className="text-center text-primary mb-4">BOOK INFORMATION</h4>
              <div className="col-md-4 mb-3">
                <label htmlFor="name" className="form-label">
                  <strong>BOOK NAME</strong>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  placeholder="Enter Book Name"
                  value={book_name}
                  onChange={(e) => setBookName(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-4 mb-3">
                <label htmlFor="price" className="form-label">
                  <strong>BOOK PRICE</strong>
                </label>
                <input
                  type="number"
                  className="form-control"
                  name="number"
                  value={book_price}
                  onChange={(e) => setBookPrice(e.target.value)}
                  placeholder="Enter Book Price"
                />
              </div>
              <div className="col-md-4 mb-3">
                <label htmlFor="author_name" className="form-label">
                  <strong>AUTHOR NAME</strong>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="author_name"
                  value={author_name}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="Enter Author Name"
                />
              </div>
              <div className="col-md-4 mb-3">
                <label htmlFor="publication_name" className="form-label">
                  <strong>PUBLICATION NAME</strong>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="publication_name"
                  value={publication_name}
                  onChange={(e) => setPublicationName(e.target.value)}
                  placeholder="Enter Publication Name"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="card-footer text-center">
          <button className="btn btn-success" type="submit">
            Add Data
          </button>
        </div>
      </form>
    </div>
  );
};

export default Addbook;
