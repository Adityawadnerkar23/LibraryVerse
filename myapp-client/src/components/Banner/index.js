        import React from 'react'
        import Slider from 'react-slick';
        import banner from '../Banner/hacker-programmer-technician-icon-logo-260nw-1852552141.png'
        import { Col, Container, Row } from "react-bootstrap";
        import Navbar from '../Navbar'
        import Categories from '../Categories';
        import "./index.css"
        const Homepage = () => {
        var settings ={
        dots: false,
        infinite: false,
        speed: 500,
        slideshow:1,
        slidestoscroll:1,
        initialSlide:0,
        responsive:[
        {
        breakpoint: 1024,
        settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite:false,
        dots:false,
        }
        },
        {
        breakpoint:600,
        settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide:0,
        }
        },
        {
        breakpoint:480,
        settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        }
        }
        ]
        };
        return(
          <div className="home-container">
        <Navbar className=" fixed-navbar navbar-custom" />
        <div className='home-banner'>
        <Container>
        <Slider {...settings}>
        <div>
        <Row>
        <Col lg={6}>
        <h3 className="banner-title">
        Project Overview 
        </h3>
        <p style={{ color: "black", fontWeight: "bold" }}className="banner-description">
         * A full-stack web application built using MongoDB, Express.js, React, and Node.js.
         <br/>
        * Provides seamless user experience with a dynamic frontend and a robust backend.
         <br/>

        * Key features: Authentication, CRUD operations, API integrations.

        </p>
        <button className="read-more">
        Read More <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
        </button>
        </Col>
        <Col lg={2}>
        <img className="w-100" src={banner} />
        </Col>
        </Row>
        </div>
        <div>
        <Row>
        <Col lg={6}>
        <h3 className="banner-title">
        Tech Stack
        </h3>
        <p style={{ color: "black", fontWeight: "bold" }}className="banner-description">
        *MongoDB: NoSQL database for flexible data storage.
        <br/>
        *Express.js: Backend framework for handling API requests.
        <br/>

        *React.js: Frontend library for building interactive UI.
        <br/>

        *Node.js: Runtime environment for server-side execution
        </p>
        <button className="read-more">
        Read More <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
        </button>
        </Col>
        <Col lg={2}>
        <img className="w-100" src={banner} />
        </Col>
        </Row>
        </div>
        <div>
        <Row>
        <Col lg={6}>
        <h3 className="banner-title">
        Challenges & Solutions
        </h3>
        <p style={{ color: "black", fontWeight: "bold" }}className="banner-description">
        *State Management: Used React Context API/Redux for efficient data flow.
        <br/>
*API Performance: Optimized Express routes and used caching.
<br/>

*Database Scaling: Indexed MongoDB collections for faster queries.
        </p>
        <button className="read-more">
        Read More <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
        </button>
        </Col>
        <Col lg={2}>
        <img className="w-100" src={banner} />
        </Col>
        </Row>
        </div>
        </Slider>
        </Container>
        </div>
        <br/>
        <Categories/>
        </div>
        );
        }
        export default Homepage
