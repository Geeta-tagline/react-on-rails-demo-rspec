import React, { useEffect, useState } from "react"
import { MDBCard, MDBCardImage, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardFooter, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const ProductDetail = (props) => {
    const history = useNavigate()

    return (
        <div>
            <br />
            <MDBRow className='row-cols-1 row-cols-md-3 g-4'>
            <div>
                <MDBCol>
                    <MDBCard className='h-100'>
                        <MDBCardImage
                            src='https://mdbootstrap.com/img/new/standard/city/042.webp'
                            alt='...'
                            position='top'
                        />
                        <MDBCardBody>
                            <MDBCardTitle>{props.productDetails.name}</MDBCardTitle>
                            <MDBCardText>
                                {props.productDetails.description}
                            </MDBCardText>
                            <MDBCardText>
                                {props.productDetails.price}
                            </MDBCardText>
                        </MDBCardBody>
                        <MDBCardFooter>
                            <small className='text-muted'>Last updated {props.productDetails.updated_at}</small>
                        </MDBCardFooter>
                    </MDBCard>
                </MDBCol>
            </div>
            </MDBRow>
            <br />
            <Button variant="primary" onClick={() => { history('/') }}>Back</Button>
            <br /><p></p>
        </div>
    )
}
export default ProductDetail