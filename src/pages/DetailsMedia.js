import React from 'react';
import { Container, Image } from 'react-bootstrap';
import SliderPhotos from '../components/Sliders/SliderPhotos';
import SliderSimilar from '../components/Sliders/SliderSimilar';
import SliderSeasons from '../components/Sliders/SliderSeasons';
import api from '../services/api';

function DetailsMedia({ mediaData }) {
    return (
        <div className='details-media'>
            {/* Backdrop Image */}
            <div className="mb-3" style={{ height: '70vh' }}>
                <div className="bg_image h-100">
                    <Image
                        src={mediaData.mediaBackdrop && `${api.backdrop_image}${mediaData.mediaBackdrop}?api_key=${api.api_key}`}
                        alt={mediaData.mediaTitle}
                        className="w-100 h-100 object-fit-cover"
                    />
                </div>
            </div>
            <Container fluid>
                {/* Details */}
                <div className="details mb-5">
                    <h4 className="mb-2">{mediaData.mediaTitle} ( {mediaData.mediaYear && mediaData.mediaYear.slice(0, 4)} )</h4>
                    <p className='opacity-75 mb-5'>{mediaData.mediaOverview}</p>
                    <h4 className="mb-2 head_title">Details: </h4>
                    <ul>
                        {mediaData.dataItems.map((item) => item.data && (
                            <li className="border-bottom py-2 d-flex align-items-center" key={item.key}>
                                <p>{item.label}</p>
                                <div className='ms-2'>{item.data}</div>
                            </li>
                        ))}
                    </ul>
                </div>
                {/* Seasons */}
                {
                    mediaData.mediaSeasons && mediaData.mediaSeasons.seasons.length > 0 &&
                    <div className='media-seasons mb-4'>
                        <h4 className='head_title'>Seasons ( {mediaData.mediaSeasons.seasons.length} )</h4>
                        <SliderSeasons series_id={mediaData.mediaSeasons.series_id} listSeasons={mediaData.mediaSeasons.seasons} />
                    </div>
                }
                {/* Photos */}
                {
                    mediaData.mediaImages.backdrops.length > 0 &&
                    <div className='media-images mb-4'>
                        <h4 className='head_title'>Photos ( {mediaData.mediaImages.backdrops.length} )</h4>
                        <SliderPhotos listPhotos={mediaData.mediaImages.backdrops} loading={mediaData.mediaImages.loading ? true : false} />
                    </div>
                }
                {/* Similar */}
                {
                    mediaData.mediaSimilar.results.length > 0 &&
                    <div className='media-similar mb-4'>
                        <h4 className='head_title'>Similar ( {mediaData.mediaSimilar.results.length} )</h4>
                        <SliderSimilar listSimilar={mediaData.mediaSimilar.results} loading={mediaData.mediaSimilar.loading ? true : false} />
                    </div>
                }
            </Container>
        </div>
    )
}

export default DetailsMedia;