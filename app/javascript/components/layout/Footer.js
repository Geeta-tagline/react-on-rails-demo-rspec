import React from "react";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import { Button } from "react-bootstrap";

function Footer() {
    return(
        <div>
         {localStorage.getItem("token") ?
            <div>
                <div fluid style={{ backgroundColor: "#747372", height: "15.2%" }}>
                    <Row>
                        <Col></Col>
                        <Col></Col>
                        <Col></Col>
                    </Row>
                </div>
                    <MDBFooter style={{backgroundColor: "#747372", color: "black"}}   className="font-small ">
                        <MDBContainer fluid className="text-center text-md-left">
                            <MDBRow>
                                <MDBCol md="6">
                                    <h5 className="title">About</h5>
                                    <p>
                                        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text.
                                    </p>
                                </MDBCol>
                                <MDBCol md="6">
                                    <h5 className="title">Links</h5>
                                    <ul>
                                        <li className="list-unstyled">
                                            {/* <Button style={{ backgroundColor: "transparent"}} onClick={() => { history('/') }}>Home</Button> */}

                                            {/* <a href="#!">Link 1</a> */}
                                        </li>
                                        <li className="list-unstyled">
                                            <a href="#!">Link 2</a>
                                        </li>
                                        <li className="list-unstyled">
                                            <a href="#!">Link 3</a>
                                        </li>
                                        <li className="list-unstyled">
                                            <a href="#!">Link 4</a>
                                        </li>
                                    </ul>
                                </MDBCol>
                            </MDBRow>
                        </MDBContainer>
                        <div className="footer-copyright text-center py-3">
                            <MDBContainer fluid>
                                &copy; {new Date().getFullYear()} Copyright: <a href="/"> ReactOnRail.com </a>
                            </MDBContainer>
                        </div>
                    </MDBFooter>
            </div>
            :
            //  <div>
            //     <Container fluid style={{ backgroundColor: "#747372", height: "64.5%" }}>
            //         <Row>
            //             <Col></Col>
            //             <Col></Col>
            //             <Col></Col>
            //         </Row>
            //     </Container>
            // </div>
            <div>
                <MDBFooter style={{ backgroundColor: "#747372", color: "black", height: "29.5%" }} className="font-small">
                    <MDBContainer fluid className="text-center text-md-left">
                        <MDBRow>
                            <MDBCol md="6">
                                <h5 className="title">About</h5>
                                <p>
                                    It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text.
                                </p>
                            </MDBCol>
                            <MDBCol md="6">
                                <h5 className="title">Links</h5>
                                <ul>
                                    <li className="list-unstyled">
                                        {/* <Button style={{ backgroundColor: "transparent"}} onClick={() => { history('/') }}>Home</Button> */}

                                        {/* <a href="#!">Link 1</a> */}
                                    </li>
                                    <li className="list-unstyled">
                                        <a href="#!">Link 2</a>
                                    </li>
                                    <li className="list-unstyled">
                                        <a href="#!">Link 3</a>
                                    </li>
                                    <li className="list-unstyled">
                                        <a href="#!">Link 4</a>
                                    </li>
                                </ul>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                    <div className="footer-copyright text-center py-3">
                        <MDBContainer fluid>
                            &copy; {new Date().getFullYear()} Copyright: <a href="/"> ReactOnRail.com </a>
                        </MDBContainer>
                    </div>
                </MDBFooter>
            </div>
        }
        </div>
        
    )

}

export default Footer;