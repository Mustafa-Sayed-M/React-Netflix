import { formatOverview, formatTitle } from "../functions/functions";
import { useDispatch, useSelector } from "react-redux";
import { addToLiked } from "../store/slices/likedSlice";
import { Link } from "react-router-dom";

function CardDetails({ item, pathLink }) {
    const dispatch = useDispatch();
    const { liked } = useSelector(state => state.liked);

    const handelLiked = (item) => {
        dispatch(addToLiked(item));
    }

    const { id, title, name, overview } = item

    return (
        <div className={`card_details d-flex flex-column justify-content-between position-absolute top-0 start-0 w-100 h-100 p-2 rounded-2`}>
            <div className="text_area">
                <h6>{title && formatTitle(title)}</h6>
                <h6>{name && formatTitle(name)}</h6>
                <p className={`overview opacity-75`}>{overview && formatOverview(overview)}</p>
            </div>
            <div className="d-flex align-items-center justify-content-between">
                <button
                    type="button"
                    onClick={(e) => { handelLiked(item); e.currentTarget.classList.add('active') }}
                    aria-label="Like"
                    className={`${liked.find(item => item.id === id) ? 'active' : ''} heart_btn btn text-white border-0 fs-4`}
                >
                    <i className="fa-solid fa-heart like"></i>
                </button>
                <Link to={`${pathLink}${id}`} className={`link_details p-1 px-2 rounded-2`}>Details</Link>
            </div>
        </div>
    )
}

export default CardDetails;