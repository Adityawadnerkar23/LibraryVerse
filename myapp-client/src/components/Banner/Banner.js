import React from 'react'

const Banner = (props) => {

    const { Slider, settings, images } = props
    return (
        <div>
            <Slider {...settings}>
                {images.map((image, index) => (
                    <div key={index}>
                        <img className='w-100' src={image} alt="" />
                    </div>
                ))}
            </Slider>
        </div>
    )
}

export default Banner
