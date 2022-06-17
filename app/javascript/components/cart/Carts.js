import React, { useEffect, useState } from "react"
import Header from "../layout/Header"
import Footer from "../layout/Footer"
import { MDBCard, MDBCardImage, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardFooter, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import { Pagination } from 'semantic-ui-react'
import { Button } from "react-bootstrap";


class Carts extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            cart: [],
            allcart: ""
        };
    }

    componentDidMount() {
        fetch('carts.json')
            .then((response) => { return response.json() })
            .then((data) => { this.setState({ cart: data.cart, allcart: data.allcart }) });

    }
    handlePage = (e, { activePage }) => {
        let gotopage = { activePage }
        let pagenum = gotopage.activePage
        let pagestring = pagenum.toString()
        this.setState({
            loading: true,
            pageData: true
        })
        const url = "carts/?page=" + pagestring
        fetch(url)
            .then((response) => { return response.json() })
            .then((data) => { this.setState({ cart: data.cart }), this.setState({ allcart: data.allcart }) });
    }

    render() {
        console.log("hello", this.state.cart)
        console.log("allcart", parseInt(this.state.allcart) / 4)
        return (
            <div>
                <div>
                    <Header />
                    <br />
                    <b>CART LIST</b><br />
                    <MDBRow className='row-cols-1 row-cols-md-3 g-4'>
                        {this.state.cart.map((val, key) => {
                            return (
                                <div>
                                    <MDBCol key={key}>
                                        <MDBCard className='h-100'>
                                            <MDBCardBody>
                                                <MDBCardTitle>Product: {val.name}</MDBCardTitle>
                                                <MDBCardTitle>Prize: {val.price}</MDBCardTitle>
                                                <MDBCardTitle>Size: {val.size}</MDBCardTitle>
                                                <MDBCardTitle>Category: {val.c_name}</MDBCardTitle>
                                                <Button className="ui button">Buy</Button>

                                            </MDBCardBody>
                                        </MDBCard>
                                    </MDBCol>
                                </div>
                            )
                        })}
                    </MDBRow>
                    <br />
                    <br />
                    <div className="row">
                        <div className="col"></div>
                        <div className="col-auto" style={{ marginRight: "23px", marginTop: "-14px", paddingBottom: "10px" }}>
                            <Pagination
                                defaultActivePage={10}
                                totalPages={parseInt(this.state.allcart) / 4}
                                onPageChange={(this.handlePage)} />
                        </div>
                    </div>
                </div>
                <Footer />
                <br />
            </div>
        )
    }
}

export default Carts