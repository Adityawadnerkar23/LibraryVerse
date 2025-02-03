import React from 'react';
import AddressForm from './components/AddressForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import './index.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import CategoryForm from './components/CategoryForm';
import Bookstore from './components/BookStore';
import Upload from './components/Upload';
import Homepage from './components/Banner';
import Categories from './components/Categories';

function App() {
return(
    <div className="App">
<Router>
<Routes>
    <Route path="/" element={<Login/>}/>
    <Route path="/banner"element={<Homepage/>}/>
    <Route path="/category" element={<Categories/>}/>
    <Route path='/addressform'element={<AddressForm/>}/>
    <Route path="/register" element={<Register/>}/>
    <Route path='/categoryform'element={<CategoryForm/>}/>
    <Route path='/bookstore'element={<Bookstore/>}/>
    <Route path='/upload'element={<Upload/>}/>
{/* Define more routes as needed */}
</Routes>
</Router>
   </div>
);
}

export default App;
