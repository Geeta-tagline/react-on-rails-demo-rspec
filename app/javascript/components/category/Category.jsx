import React, { useEffect, useState } from "react"
import Header from "../layout/Header"
import Footer from "../layout/Footer"
import { MDBCard, MDBCardImage, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardFooter, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import { Pagination } from 'semantic-ui-react'
import Page from "../layout/Page"

class Category extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            category: [],
            allcategory: ""
        };
    }

    componentDidMount() {

        fetch('categories.json')
            .then((response) => { return response.json() })
            .then((data) => { this.setState({ category: data.category, allcategory: data.allcategory }) });

    }
    handlePage = (e, { activePage }) => {
        let gotopage = { activePage }
        let pagenum = gotopage.activePage
        let pagestring = pagenum.toString()
        this.setState({
            loading: true,
            pageData: true
        })
        const url = "categories/?page=" + pagestring
        fetch(url)
            .then((response) => { return response.json() })
            .then((data) => { this.setState({ category: data.category }), this.setState({ allcategory: data.allcategory }) });
    }

    render() {
        

        console.log("hello", this.state.category)
        console.log("allcategory", parseInt(this.state.allcategory) / 4)
        return (
            <div>
                <div>
                    <Header />
                    <div style={{ height: "44.8%" }}>
                            <br />
                            <MDBRow className='row-cols-1 row-cols-md-3 g-4' >
                                {this.state.category.map((val, key) => {
                                    return (
                                        <div>
                                            <MDBCol key={key}>
                                                <MDBCard className='h-100'>
                                                    <MDBCardBody>
                                                        <MDBCardTitle>{val.name}</MDBCardTitle>
                                                    </MDBCardBody>
                                                </MDBCard>
                                            </MDBCol>
                                        </div>
                                    )
                                })}
                            </MDBRow>
                            <br />
                            <br />
                        <Page alldata={this.state.allcategory} handlePage={this.handlePage}/>
                        </div>
                    </div>
                    <Footer />
                </div>
        )
    }
}

export default Category