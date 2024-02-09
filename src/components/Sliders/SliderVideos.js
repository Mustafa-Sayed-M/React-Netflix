import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import "swiper/css/navigation"

function SliderVideos({ listVideos = [] }) {
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
                slidesPerView: 4,
            },
        },
        className: 'slider py-3',
        navigation: true,
    }

    return (
        <Swiper {...sliderAttributes}>
            {
                listVideos.map((video, idx) => {
                    const { key } = video;
                    return (
                        key &&
                        <SwiperSlide key={idx} className='slide py-3' style={{ userSelect: 'none' }}>
                            <iframe width="100%"
                                height="270"
                                src={`https://www.youtube.com/embed/${key}?si=IGY118RCArOP0Zh3`}
                                title="YouTube video player"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen>
                            </iframe>
                        </SwiperSlide>
                    )
                })
            }
        </Swiper>
    )
}

export default SliderVideos;