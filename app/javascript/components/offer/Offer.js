import React from 'react'
import Card from 'react-bootstrap/Card'
import { Button, Container } from "react-bootstrap";
import CardGroup from 'react-bootstrap/CardGroup'
import { MDBCard, MDBCardImage, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardGroup } from 'mdb-react-ui-kit';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import OfferDetail from './OfferDetail';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import 'semantic-ui-css/semantic.min.css'
import { Pagination } from 'semantic-ui-react'
import Page from "../layout/Page"

class Offer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            offer: [],
            OfferDetail: [] ,
            allOffer: ""
        };
    }
    handleOfferDetail(val) {
        // this.setState({ OfferDetail: true})
        this.setState({
            OfferDetail: val
        });
        <OfferDetail />
    }
    componentDidMount() {
        fetch('offers.json')
            .then((response) => { return response.json() })
            .then((data) => { this.setState({ offer: data.offer, allOffer: data.allOffer}) });
    }
    handlePage = (e, { activePage }) => {
        let gotopage = { activePage }
        let pagenum = gotopage.activePage
        let pagestring = pagenum.toString()
        this.setState({
            loading: true,
            pageData: true
        })
        const url = "offers/?page=" + pagestring
        fetch(url)
            .then((response) => { return response.json() })
            .then((data) => { this.setState({ offer: data.offer }), this.setState({ alloffer: data.alloffer }) });
    }
    
    render() {
        console.log("alloffer", parseInt(this.state.allOffer) / 4)
            return (
                <div>
                    <Header />
                    {this.state.OfferDetail.id &&
                <div>
                    <OfferDetail OfferDetail={this.state.OfferDetail} />
                </div>
                }
                    <div style={{ height: "34%" }}>
                        {!this.state.OfferDetail.id && this.state.offer.map((val, key) => {
                            return (
                                <div key={key}>
                                    <br />
                                    {this.state.OfferDetail &&
                                        <Row style={{ display: "inlineFlex" }} >
                                            {Array.from({ length: 3 }).map((_, idx) => (
                                                <Col>
                                                    <Card style={{ width: '18rem' }}>
                                                        {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                                                        <Card.Body>
                                                        <Card.Title><b>Name</b></Card.Title>
                                                            <Card.Text>
                                                            {val.name}
                                                            </Card.Text>
                                                            <Card.Title><b>Description</b></Card.Title>
                                                            <Card.Text>
                                                            {val.description}
                                                            </Card.Text>
                                                            <Button variant="primary" onClick={() => this.handleOfferDetail(val)}>View</Button>
                                                        </Card.Body>
                                                    </Card>
                                                </Col>
                                            ))}
                                        </Row>
                                    }
                                </div>
                            )
                    })}
                    </div>
                <br /><p></p>
                    {!this.state.OfferDetail.id &&
                        <Page alldata={this.state.allOffer} handlePage={this.handlePage} />
                    }
                <Footer />
                </div>   
            )
    }
}

export default Offer