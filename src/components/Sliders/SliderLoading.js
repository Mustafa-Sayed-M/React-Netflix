import React from 'react'
import { BarLoader } from 'react-spinners';

function SliderLoading() {
    return (
        <div className="d-flex align-items-center text-center py-5">
            <div className="mx-auto">
                <span className="mb-2 ms-1 d-block">NETFLIX</span>
                <BarLoader color="#cd070c" />
            </div>
        </div>
    )
}

export default SliderLoading;