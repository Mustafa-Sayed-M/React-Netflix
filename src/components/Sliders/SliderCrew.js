import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Image } from 'react-bootstrap';
import api from '../../services/api';
import 'swiper/css';
import "swiper/css/navigation"

function SliderCrew({ listCrew = [] }) {

    const sliderAttributes = {
        modules: [Navigation],
        spaceBetween: 15,
        navigation: true,
        className: 'slider py-3',
        breakpoints: {
            640: {
                slidesPerView: 2,
            },
            880: {
                slidesPerView: 3,
            },
            1190: {
                slidesPerView: 4,
            },
            1440: {
                slidesPerView: 5,
            },
        },
    }

    return (
        <>
            <Swiper {...sliderAttributes}>
                {
                    listCrew.map((crew, index) => {
                        const { profile_path, department = '', name = '', job = '' } = crew;
                        return (
                            <SwiperSlide key={index} className='slide' style={{ userSelect: 'none' }}>
                                <div className='card_star p-2 border rounded-2'>
                                    {
                                        profile_path ? <Image
                                            src={`${api.poster_image}${profile_path}?api_key=${api.api_key}`}
                                            className='rounded-circle object-fit-cover mb-3'
                                            style={{ width: '60px', height: '60px' }}
                                        />
                                            :
                                            <div className='mb-3' style={{ width: '60px', height: '60px' }}>
                                                <i className="fa-regular fa-circle-user fs-1"></i>
                                            </div>
                                    }
                                    <ul>
                                        <li className='mb-2'>Name: {name}</li>
                                        <li className='mb-2'>Job: {job}</li>
                                        <li className='mb-2'>Department: {department}</li>
                                    </ul>
                                </div>
                            </SwiperSlide>
                        )
                    })
                }
            </Swiper>
        </>
    )
}

export default SliderCrew;