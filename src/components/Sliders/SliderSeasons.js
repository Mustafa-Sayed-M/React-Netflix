import { Link } from 'react-router-dom';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Image } from 'react-bootstrap';
import api from '../../services/api';
import 'swiper/css';
import "swiper/css/navigation"

function ListSeasons({ series_id, listSeasons = [] }) {

    const sliderAttributes = {
        modules: [Navigation],
        spaceBetween: 10,
        className: 'slider py-3',
        navigation: true,
        breakpoints: {
            0: {
                slidesPerView: 2,
            },
            680: {
                slidesPerView: 3,
            },
            820: {
                slidesPerView: 4,
            },
            1020: {
                slidesPerView: 5,
            },
        },
    }

    return (
        <div className="list_episode">
            <Swiper {...sliderAttributes}>
                {
                    listSeasons.map((season, idx) => {
                        const {
                            season_number = 0,
                            poster_path,
                            name = '',
                            air_date = '',
                            episode_count = 0
                        } = season;
                        return (
                            <SwiperSlide key={idx} className='bg-dark rounded-2' style={{ userSelect: 'none' }}>
                                <Link to={`/series/${series_id}/season/${season_number}`} className='season'>
                                    <div className='poster mb-3' style={{ height: '320px' }}>
                                        {
                                            poster_path ? <Image
                                                src={`${api.poster_image}${poster_path}?api_key=${api.api_key}`}
                                                alt={name}
                                                className='w-100 h-100 rounded-top-2'
                                            />
                                                :
                                                <div className='h-100 d-flex align-items-center justify-content-center bg-black rounded-top-2'>
                                                    No Poster
                                                </div>
                                        }
                                    </div>
                                    <div className='body_season p-2'>
                                        <div className='details d-flex align-items-center justify-content-between'>
                                            {
                                                name === 'Specials' ?
                                                    <h6>{name + ' Season'}</h6>
                                                    :
                                                    <h6 className='opacity-75'>{air_date && air_date.slice(0, 4)}</h6>
                                            }
                                        </div>
                                        <hr className='my-1' />
                                        <p className='opacity-75'>Episodes: {episode_count}</p>
                                    </div>
                                </Link>
                            </SwiperSlide>
                        )
                    })
                }
            </Swiper>
        </div>
    )
}

export default ListSeasons;