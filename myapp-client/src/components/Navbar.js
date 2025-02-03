import React, { useState } from 'react';
import { Container, Nav, Navbar, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import logo from './assests/login_16894205.png';
import leftlogo from './assests/login_7856337.png';
import './CollapsibleExample.css'; // Include custom styles

const CollapsibleExample = () => {
  const [language, setLanguage] = useState('english');
  const navigate = useNavigate();

  const handleLang = (e) => {
    const selectedLang = e.target.value;
    setLanguage(selectedLang);
    
    if (selectedLang === 'hindi') {
      document.body.dir = 'ltr';
      document.body.lang = 'hi';
    } else {
      document.body.dir = 'ltr';
      document.body.lang = 'en';
    }
  };

  const handleLoginClick = () => {
    navigate('/register'); // Direct to registration page
  };

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div>
      <Navbar expand="lg" className="sm">
        <Container>
          <Navbar.Brand onClick={() => navigate('/banner')} className="ps-2">
            <img className="leftlogo" width="60px" src={leftlogo} alt="Logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="justify-content-center flex-grow-1">
              <Nav.Link href="/addressform">PRODUCT FORM</Nav.Link>
              <Nav.Link href="/categoryform">CATEGORY FORM</Nav.Link>
              <Nav.Link href="/bookstore">BOOK STORE</Nav.Link>
              <Nav.Link>
                <select
                  name="language"
                  id="language"
                  value={language}
                  onChange={handleLang}
                  className="language-select"
                >
                  <option value="english">English</option>
                  <option value="hindi">Hindi</option>
                  <option value="arabic">Arabic</option>
                </select>
              </Nav.Link>
              <Nav.Link>
                <i className="fa fa-envelope" aria-hidden="true"></i>
                {language === 'arabic' ? 'البريد الإلكتروني: example@gmail.com' : language === 'hindi' ? 'ईमेल: example@gmail.com' : 'Email: example@gmail.com'}
              </Nav.Link>
              <Nav.Link>
                <i className="fa fa-phone" aria-hidden="true"></i>
                {language === 'english' ? 'Call us: +91 98765 43210' : language === 'arabic' ? 'اتصل بنا: +91 98765 43210' : 'Call us: +91 98765 43210'}
              </Nav.Link>
            </Nav>
            <Button className="logout" onClick={handleLogout}>
              <img className="logo" width="60px" src={logo} alt="User" />
              <i className="fa fa-user pe-1" aria-hidden="true"> LOGOUT</i>
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default CollapsibleExample;
