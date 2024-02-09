import { Container, Image } from 'react-bootstrap';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCreative, Navigation, Autoplay } from 'swiper/modules';
import { Link } from 'react-router-dom';
import StarsList from '../StarsList';
import api from '../../services/api';
import 'swiper/css';
import "swiper/css/navigation"

function SliderLanding({ list = [] }) {

    const sliderAttributes = {
        modules: [Navigation, EffectCreative, Autoplay],
        slidesPerView: 1,
        navigation: true,
        style: { height: '90vh' },
        effect: 'creative',
        autoplay: {
            delay: 2500,
            disableOnInteraction: true
        },
        creativeEffect: {
            prev: {
                translate: ['-20%', 0, -1],
            },
            next: {
                translate: ['100%', 0, 0],
            },
        },
    }

    return (
        <Swiper {...sliderAttributes}>
            {
                list.map((item, index) => {
                    const { id,
                        title = '',
                        name = '',
                        backdrop_path,
                        vote_average = 0,
                        overview = '',
                        media_type = ''
                    } = item;

                    return (
                        <SwiperSlide key={index} className='slide bg-dark position-relative'>
                            <div className='backdrop h-100 w-100 position-absolute start-0 top-0'>
                                <Image
                                    src={backdrop_path && `${api.backdrop_image}${backdrop_path}?api_key=${api.api_key}`}
                                    className='object-fit-cover w-100 h-100'
                                />
                            </div>
                            <Container fluid className='h-100 d-flex align-items-center position-relative z-3'>
                                <div className='details w-100 ps-md-5 text-center text-md-start'>
                                    {
                                        title ?
                                            <h1>{title}</h1>
                                            :
                                            <h1>{name}</h1>
                                    }
                                    <div className='overview mb-2 d-none d-md-block'>
                                        <p className='opacity-75 w-50'>{overview}</p>
                                    </div>
                                    <StarsList className='mb-4 justify-content-center justify-content-md-start' rate={vote_average} />
                                    <div className='buttons d-flex align-items-center flex-column flex-md-row gap-3'>
                                        {
                                            media_type === 'movie' ?
                                                <Link to={`/movie/${id}`} type='button' className='link_details btn p-2 px-4 rounded-pill'>
                                                    Details About Movie
                                                </Link>
                                                :
                                                <Link to={`/series/${id}`} type='button' className='link_details btn p-2 px-4 rounded-pill'>
                                                    Details About Series
                                                </Link>
                                        }
                                        <button type='button' className='btn_add_to_list btn text-white p-2 px-4 rounded-pill'>
                                            <i className="fa-solid fa-plus me-2"></i>
                                            <span>Add to List</span>
                                        </button>
                                    </div>
                                </div>
                            </Container>
                        </SwiperSlide>
                    )
                })
            }
        </Swiper>
    )
}

export default SliderLanding;