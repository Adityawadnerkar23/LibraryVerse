import React, { useState } from 'react';
import { Container, Nav, Navbar, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import logo from './assests/login_16894205.png';
import leftlogo from './assests/Leftlogo.webp';
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
      <Navbar expand="lg" className="sm" style={{ backgroundColor: '#343a40', borderBottom: '2px solid #e0e0e0' }}>
        <Container>
          <Navbar.Brand onClick={() => navigate('/banner')} className="ps-2">
            <img
              className="leftlogo"
              width="60px"
              src={leftlogo}
              alt="Logo"
              style={{
                transition: 'transform 0.3s ease',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
              onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="justify-content-center flex-grow-1">
              <Nav.Link href="/addressform" style={navLinkStyle}>
                PRODUCT FORM
              </Nav.Link>
              <Nav.Link href="/categoryform" style={navLinkStyle}>
                CATEGORY FORM
              </Nav.Link>
              <Nav.Link href="/bookstore" style={navLinkStyle}>
                BOOK STORE
              </Nav.Link>
              <Nav.Link>
                <select
                  name="language"
                  id="language"
                  value={language}
                  onChange={handleLang}
                  className="language-select"
                  style={languageSelectStyle}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#f39c12'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#343a40'}
                >
                  <option value="english">English</option>
                  <option value="hindi">Hindi</option>
                  <option value="arabic">Arabic</option>
                </select>
              </Nav.Link>
              <Nav.Link style={contactInfoStyle}>
                <i className="fa fa-envelope" aria-hidden="true"></i>
                {language === 'arabic' ? 'البريد الإلكتروني: example@gmail.com' : language === 'hindi' ? 'ईमेल: example@gmail.com' : 'Email: example@gmail.com'}
              </Nav.Link>
              <Nav.Link style={contactInfoStyle}>
                <i className="fa fa-phone" aria-hidden="true"></i>
                {language === 'english' ? 'Call us: +91 98765 43210' : language === 'arabic' ? 'اتصل بنا: +91 98765 43210' : 'Call us: +91 98765 43210'}
              </Nav.Link>
            </Nav>
            <Button
              className="logout"
              onClick={handleLogout}
              style={logoutButtonStyle}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#c82333'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#dc3545'}
            >
              <img
                className="logo"
                width="60px"
                src={logo}
                alt="User"
                style={{
                  transition: 'transform 0.3s ease',
                  borderRadius: '50%',
                }}
                onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
                onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
              />
              <i className="fa fa-user pe-1" aria-hidden="true"> LOGOUT</i>
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

// Styling variables for better reusability
const navLinkStyle = {
  color: '#fff',
  fontSize: '16px',
  fontWeight: '500',
  marginRight: '20px',
  transition: 'color 0.3s ease',
};

const languageSelectStyle = {
  backgroundColor: '#343a40',
  color: '#fff',
  border: 'none',
  padding: '5px 10px',
  borderRadius: '5px',
  transition: 'background-color 0.3s ease',
};

const contactInfoStyle = {
  color: '#fff',
  fontSize: '14px',
};

const logoutButtonStyle = {
  backgroundColor: '#dc3545',
  color: '#fff',
  border: 'none',
  padding: '10px 20px',
  borderRadius: '5px',
  display: 'flex',
  alignItems: 'center',
  transition: 'background-color 0.3s ease',
};

export default CollapsibleExample;
