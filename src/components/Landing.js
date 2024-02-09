import { useSelector } from "react-redux";
import Loader from './Loader';
import Error from './Error';
import SliderLanding from './Sliders/SliderLanding';
import "../style/landing.css";

function Landing() {
    const { trending } = useSelector(state => state.trending);

    return (
        trending.loading ?
            <Loader />
            :
            trending.error ?
                <Error />
                :
                <div className="landing">
                    <div className='slider h-100'>
                        <SliderLanding list={trending.data.results} />
                    </div>
                </div>
    )
}

export default Landing;