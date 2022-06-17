import React from "react";
import { Button } from "react-bootstrap";
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useNavigate } from "react-router-dom";

function OfferDetail(props) {
    const history = useNavigate()

    return (
        <div>
            <br />
            <center>
                <h1><b>Offer Detail</b></h1>
            <Row  className="g-4">
                {Array.from({ length: 1 }).map((_, idx) => (
                    <Col>
                        <Card style={{ width: '28rem', height: '28rem' }}>
                            <Card.Body>
                                <Card.Title><b>Name</b></Card.Title>
                                <Card.Text>
                                    {props.OfferDetail.name}
                                </Card.Text>
                                <Card.Title><b>Description</b></Card.Title>
                                <Card.Text>
                                    {props.OfferDetail.description}
                                </Card.Text>
                                <Button variant="primary" onClick={() => { history('/product') }}>Back</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            </center>
            <br />
        </div>
    )

}
export default OfferDetail
