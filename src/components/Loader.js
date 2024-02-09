import React from 'react'
import { BarLoader } from 'react-spinners'

function Loader() {
    return (
        <div className="d-flex align-items-center text-center" style={{ height: '100vh' }}>
            <div className="mx-auto">
                <span className="mb-2 ms-1 d-block">NETFLIX</span>
                <BarLoader color="#cd070c" />
            </div>
        </div>
    )
}

export default Loader;