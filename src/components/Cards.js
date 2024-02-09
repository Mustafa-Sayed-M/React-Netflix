import { Col, Image, Row } from "react-bootstrap";
import { formatDate, formatRating, formatTitle } from "../functions/functions";
import CardDetails from "./CardDetails";
import StarsList from "./StarsList";
import api from "../services/api";
import "../style/cards.css";

function Cards({ list = [], headTitle, pathLink, className }) {
    return (
        <div className={`${className} list`}>
            {
                headTitle &&
                <h4 className='head_title mb-3'>{headTitle}</h4>
            }
            <Row className="row-gap-3">
                {
                    list.map((item, idx) => {
                        const { title, name, poster_path, media_type, vote_average, release_date, first_air_date } = item;
                        return (
                            <Col className="media_col col-6 col-sm-4 col-lg-3 col-xl-2" key={idx}>
                                <div>
                                    <div className={`poster mb-3 position-relative`} style={{ height: '300px' }}>
                                        {
                                            poster_path ?
                                                <Image
                                                    src={`${api.poster_image}${poster_path}`}
                                                    className="w-100 h-100 rounded-2 object-fit-cover"
                                                />
                                                :
                                                <div className="bg-black h-100 rounded-2 d-flex align-items-center justify-content-center">
                                                    <span>No image available</span>
                                                </div>
                                        }
                                        <CardDetails
                                            pathLink={media_type ? media_type === 'movie' ? '/movie/' : media_type === 'tv' && '/series/' : pathLink}
                                            item={item}
                                        />
                                    </div>
                                    <div className="body_content mb-3">
                                        <h6>{title && formatTitle(title)}</h6>
                                        <h6>{name && formatTitle(name)}</h6>
                                        <div className="rating d-flex align-items-center justify-content-between">
                                            <div className="yea opacity-75">
                                                {release_date && formatDate(release_date)}
                                                {first_air_date && formatDate(first_air_date)}
                                            </div>
                                            <div className='rating d-flex align-items-center'>
                                                <div className="d-sm-none">
                                                    <i className="fa-solid fa-star star_icon me-1"></i>
                                                    {formatRating(vote_average)}
                                                </div>
                                                <StarsList className='me-2 d-none d-sm-flex' rate={vote_average} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        )
                    })
                }
            </Row>
        </div>
    )
}

export default Cards;