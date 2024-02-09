import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Image } from 'react-bootstrap';
import api from '../../services/api';
import 'swiper/css';
import "swiper/css/navigation"

function SliderGuestStars({ listGuestStars = [] }) {

    const sliderAttributes = {
        modules: [Navigation],
        spaceBetween: 15,
        breakpoints: {
            640: {
                slidesPerView: 2,
            },
            768: {
                slidesPerView: 3,
            },
            1024: {
                slidesPerView: 5,
            },
        },
        className: 'slider py-3',
        navigation: true,
    }

    return (
        <Swiper {...sliderAttributes}>
            {
                listGuestStars.map((star, idx) => {
                    const { profile_path, character = '', name = '' } = star;
                    return (
                        <SwiperSlide key={idx} className='slide' style={{ userSelect: 'none' }}>
                            <div className='card_star text-center'>
                                {
                                    profile_path ? <Image
                                        src={`${api.poster_image}${profile_path}?api_key=${api.api_key}`}
                                        className='rounded-circle object-fit-cover mb-2'
                                        style={{ width: '60px', height: '60px' }}
                                    />
                                        :
                                        <div className='mb-2' style={{ height: '60px' }}>
                                            <i className="fa-regular fa-circle-user fs-1"></i>
                                        </div>
                                }
                                <p className='mb-2'>{name}</p>
                                <p className='mb-2 opacity-75'>( {character} )</p>
                            </div>
                        </SwiperSlide>
                    )
                })
            }
        </Swiper>
    )
}

export default SliderGuestStars;