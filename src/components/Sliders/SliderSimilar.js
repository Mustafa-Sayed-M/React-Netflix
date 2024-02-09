import { Navigation, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Col, Image } from 'react-bootstrap';
import { formatRating } from '../../functions/functions';
import StarsList from '../StarsList';
import SliderLoading from './SliderLoading';
import api from '../../services/api';
import 'swiper/css';
import "swiper/css/navigation"

function SliderSimilar({ listSimilar = [], loading }) {
    const sliderAttributes = {
        spaceBetween: 15,
        modules: [Navigation, Autoplay],
        navigation: true,
        className: 'slider py-3',
        breakpoints: {
            0: {
                slidesPerView: 2,
            },
            720: {
                slidesPerView: 3,
            },
            880: {
                slidesPerView: 4,
            },
            1024: {
                slidesPerView: 5,
            },
        },
        autoplay: true
    }

    return (
        !loading ?
            <Swiper {...sliderAttributes}>
                {
                    listSimilar.map((similar, idx) => {
                        const {
                            id,
                            poster_path,
                            name = '',
                            title = '',
                            first_air_date = '',
                            release_date = '',
                            vote_average = '',
                            media_type = '', } = similar;

                        return (
                            <SwiperSlide key={idx} className='slide' style={{ userSelect: 'none' }}>
                                <Col className="col-12 col-sm-6 col-md-4 col-xl-3 w-100" key={idx}>
                                    <a href={media_type === 'movie' ? `#/movie/${id}` : `#/series/${id}`}>
                                        <div className="poster mb-3 position-relative" style={{ height: '320px' }}>
                                            {
                                                poster_path ?
                                                    <Image
                                                        src={`${api.poster_image}${poster_path}`}
                                                        className="w-100 h-100 rounded-2 object-fit-cover"
                                                    />
                                                    :
                                                    <div className='h-100 d-flex align-items-center justify-content-center bg-black rounded-top-2'>
                                                        No Poster
                                                    </div>
                                            }
                                        </div>
                                        <div className="body_content mb-3">
                                            <h6>
                                                {
                                                    media_type === 'movie' ?
                                                        title.length > 20 ? title.slice(0, 20) + '...' : title
                                                        :
                                                        name.length > 20 ? name.slice(0, 20) + '...' : name
                                                }
                                            </h6>
                                            <div className="rating d-flex align-items-center justify-content-between">
                                                <div className="yea opacity-75">
                                                    {
                                                        media_type === 'movie' ?
                                                            release_date.slice(0, 4)
                                                            :
                                                            first_air_date.slice(0, 4)
                                                    }
                                                </div>
                                                <div className='rating'>
                                                    <StarsList className='d-none d-sm-flex' rate={vote_average} />
                                                    <div className='d-sm-none'>
                                                        <i className="fa-solid fa-star star_icon me-1"></i>
                                                        <span>{formatRating(vote_average)}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </Col>
                            </SwiperSlide>
                        )
                    })
                }
            </Swiper>
            :
            <SliderLoading />
    )
}

export default SliderSimilar;