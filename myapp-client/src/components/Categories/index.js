import React from 'react';
import { Container } from 'react-bootstrap';
import Slider from 'react-slick';
import categoryicon from "./Category.jpg";
import cat1 from "../../components/Categories/nodejs_cover_photo_smaller_size.png";
import cat2 from "../../components/Categories/react-logo@3x.svg";
import cat3 from "../../components/Categories/JS-w-Machine-Learning.png";
import cat4 from "../../components/Categories/Express logo.png";
import cat5 from "../../components/Categories/Jwt.png";
import './index.css';

const carasoul = [
  { image: cat1 },
  { image: cat2 },
  { image: cat3 },
  { image: cat4 },
  { image: cat5 }
];

const Categories = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    autoplay: true,  // Enable autoplay
    autoplaySpeed: 2000,  // Set the interval for autoplay (2 seconds)
    nav: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          nav: false,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          nav: false,
        }
      }
    ]
  };

  return (
    <div className="our-categories moile">
      <Container>
        <img className="book-icon" src={categoryicon} alt="Book Icon" />
        <h3 className="cat-title">Technologies used in this Project</h3>

        <Slider {...settings}>
          {carasoul.map((category, index) => (
            <div className="slider-item mobile-sliders" tabIndex={-1} style={{ width: "100%", display: "inline-block" }} key={index}>
              <img className="w-100" src={category.image} alt={category.title} />
              <h3 className="servicetext">{category.title}</h3>
            </div>
          ))}
        </Slider>
      </Container>
    </div>
  );
}

export default Categories;
