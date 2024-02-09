import { formatRating } from "../functions/functions";

function StarsList({ className, rate }) {
    const starList = (fullStars, halfStar, emptyStars) => (
        <div className={`${className} rating d-flex align-items-center`} >
            <ul className='d-flex align-items-center gap-1 me-1' >
                {
                    fullStars.map((_, index) => (
                        <li key={index}><i className="fa-solid fa-star star_icon"></i></li>
                    ))
                }
                {halfStar && <li><i className="fa-solid fa-star-half-stroke star_icon"></i></li>}
                {emptyStars.map((_, index) => (
                    <li key={index}><i className="fa-regular fa-star star_icon"></i></li>
                ))}
            </ul>
            <span>{formatRating(rate)}</span>
        </div >
    );

    if (rate > 8) {
        return starList([1, 2, 3, 4, 5], null, []);
    } else if (rate > 7.5 && rate <= 8) {
        return starList([1, 2, 3, 4], null, [1]);
    } else if (rate > 6 && rate < 7.5) {
        return starList([1, 2, 3], true, [1]);
    } else if (rate > 5 && rate < 6) {
        return starList([1, 2, 3], null, [1, 2]);
    } else if (rate > 2.5 && rate < 5) {
        return starList([1, 2], null, [1, 2, 3]);
    } else if (rate > 0 && rate < 2.5) {
        return starList([1], null, [1, 2, 3, 4]);
    } else if (rate === 5) {
        return starList([1, 2, 3], true, [1, 2]);
    } else {
        return 'No Rating';
    }
}

export default StarsList;