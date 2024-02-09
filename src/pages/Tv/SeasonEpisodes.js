import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import { fetchData } from "../../functions/functions";
import api from '../../services/api';

function SeasonEpisodes() {
    const { series_id, number_season } = useParams();

    return (
        <div className='season_episodes_page py-5'>
            <Container fluid>
                <h4 className="mb-3 head_title">Season {number_season}</h4>
                <Row className="row-gap-4">
                    
                </Row>
            </Container>
        </div>
    )
}

export default SeasonEpisodes;