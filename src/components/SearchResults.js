import React from 'react'
import { Row } from 'react-bootstrap'
import Cards from './Cards';

function SearchResults({ className, searchResultsList }) {
    return (
        <div className={`${className} search_results`}>
            <Row>
                <Cards headTitle={`Results: ( ${searchResultsList.length} )`} list={searchResultsList} />
            </Row>
        </div>
    )
}

export default SearchResults;