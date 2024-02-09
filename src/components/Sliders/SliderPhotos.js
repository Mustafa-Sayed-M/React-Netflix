import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Button, Image } from 'react-bootstrap';
import { useState } from 'react';
import { BarLoader } from 'react-spinners';
import StarsList from '../StarsList';
import api from '../../services/api';
import 'swiper/css';
import "swiper/css/navigation"
import SliderLoading from './SliderLoading';

function SliderPhotos({ listPhotos = [], loading }) {
    const [imageData, setImageData] = useState({ width: 0, height: 0, vote_average: 0 });
    const [showImage, setShowImage] = useState(false);

    const { file_path, width, height, vote_average } = imageData;

    const handelImage = (photo) => {
        setShowImage(true);
        setImageData({ ...photo });
    }

    const sliderAttributes = {
        modules: [Navigation],
        spaceBetween: 15,
        navigation: true,
        className: 'slider py-3',
        breakpoints: {
            640: {
                slidesPerView: 2,
            },
            768: {
                slidesPerView: 3,
            },
            1024: {
                slidesPerView: 4,
            },
        },
    }

    return (
        !loading ?
            <>
                {
                    showImage &&
                    <div
                        className='floating_box position-fixed d-flex align-items-center justify-content-center top-0 start-0 w-100 z-3'
                        style={{ height: '100vh', backgroundColor: 'rgba(0, 0, 0, .7)', backdropFilter: 'blur(3px)' }}
                    >
                        <div className='content p-3'>
                            <Button
                                onClick={() => { setShowImage(false); }}
                                className='mb-3 mx-auto p-0 rounded-circle fs-3 bg-transparent d-block text-center border-2'
                                style={{ width: '50px', height: '50px', lineHeight: '50px', borderColor: '#cd070c' }}>
                                <i className="fa-solid fa-xmark"></i>
                            </Button>
                            {
                                file_path ? <Image
                                    src={`${api.poster_image}${file_path}?api_key=${api.api_key}`}
                                    alt='Photo'
                                    className='mb-3 img-fluid d-block rounded-2'
                                />
                                    :
                                    <BarLoader color='#cd070c' className='my-5' />
                            }
                            <div className='info_about_image'>
                                <h5 className='mb-2'>Details:</h5>
                                <ul>
                                    <li className='d-flex algin-items-center border-bottom pb-2 column-gap-2'>
                                        <span>Rating:</span>
                                        <StarsList rate={vote_average} />
                                    </li>
                                    <li className='d-flex algin-items-center border-bottom py-2 column-gap-2'>
                                        <span>Original  Width:</span>
                                        <span>{width}PX</span>
                                    </li>
                                    <li className='d-flex algin-items-center border-bottom py-2 column-gap-2'>
                                        <span>Original Height:</span>
                                        <span>{height} PX</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                }
                <Swiper {...sliderAttributes}>
                    {
                        listPhotos.map((photo, idx) => {
                            const { file_path } = photo;
                            return (
                                file_path &&
                                <SwiperSlide onClick={() => handelImage(photo)} key={idx} className='slide' style={{ userSelect: 'none', cursor: 'pointer' }}>
                                    <Image
                                        src={`${api.backdrop_image}${file_path}?api_key=${api.api_key}`}
                                        alt={'...'}
                                        className='mw-100 rounded-2'
                                    />
                                </SwiperSlide>
                            )
                        })
                    }
                </Swiper>
            </>
            :
            <SliderLoading />
    )
}

export default SliderPhotos;