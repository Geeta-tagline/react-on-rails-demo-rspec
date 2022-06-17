import React from "react"
import Header from "../layout/Header"
import Footer from "../layout/Footer"
import { MDBCard, MDBCardImage, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardFooter, MDBRow, MDBCol, MDBInput } from 'mdb-react-ui-kit';
import ProductDetail from './ProductDetail'
import { Button } from "react-bootstrap";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Page from "../layout/Page"

const notify = () => toast("Data Save Successfully");

class Product extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            product: [],
            productDetails: [],
            allproduct: "",
            name: "",
        };
    }
    handleSearch(e) {
        this.setState({ name: e.target.value })
        debugger
        if(this.state.name.length >= 3 || this.state.name.length === 1){
            let body = JSON.stringify({ searchdata: { name: e.target.value } })
            fetch('/products.json', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: body,
            })
                .then((response) => { return response.json() })
                .then((data) => { this.setState({ product: data.product }), this.setState({ allproduct: data.allproduct }) });
        }
        
    }
    addToCart(val) {
        console.log("val", val)
        let body = JSON.stringify({ carts: {product_id: val.id, category_id: val.category_id }})
        fetch('/carts.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: body,
        })
            .then((response) => { return response.json() })
            .then((data) => {
                if (data.cart_exist) {
                    notify
                    
                } this.setState({ cart: data.cart }) });
    }

    handleProductDetail(val) {
        this.setState({
            productDetails: val });
        <ProductDetail />

    }
    componentDidMount() {
        fetch('products.json')
            .then((response) => { return response.json() })
            .then((data) => { this.setState({ product: data.product, allproduct: data.allproduct }) });
            
    }
    handlePage = (e, { activePage }) => {
        let gotopage = { activePage }
        let pagenum = gotopage.activePage
        let pagestring = pagenum.toString()
        this.setState({
            loading: true,
            pageData: true
        })
        const url = "products/?page=" + pagestring
        fetch(url)
            .then((response) => { return response.json() })
            .then((data) => { this.setState({ product: data.product }), this.setState({ allproduct: data.allproduct }) });
    }
   
    render() {
        console.log("hello", this.state.productDetails)
        console.log("allproduct", parseInt(this.state.allproduct) / 4)
        return (
            <div>
                <div>
                    <Header />     
                    {this.state.productDetails.id &&
                        <div>
                            < ProductDetail productDetails={this.state.productDetails} />
                        </div>
                    }    
                    {!this.state.productDetails.id &&  
                    <div>  
                        <b>BUY THE LOOK</b>
                        <MDBRow style={{ padding: 10, width: "37%" }}>
                            <MDBCol size={12}>
                                <MDBInput
                                    label={"Search Product"}
                                    hint={"Search product here"}
                                    outline value={this.state.name} onChange={(e) => this.handleSearch(e)} style={{ width: "39%" }} name="" 
                                />
                            </MDBCol>
                        </MDBRow>
                        <br />
                        <br />
                        <MDBRow className='row-cols-1 row-cols-md-3 g-4'>
                        {this.state.product.map((val, key) => {
                                return(
                                <div>
                                    <MDBCol key={key}>
                                        <MDBCard className='h-100'>
                                                <MDBCardImage onClick={() => this.handleProductDetail(val)}
                                                src='https://mdbootstrap.com/img/new/standard/city/042.webp'
                                                alt='...'
                                                position='top'
                                            />
                                            <MDBCardBody>
                                                <MDBCardTitle>{val.name}</MDBCardTitle>
                                                <MDBCardText>
                                                    {val.description}
                                                </MDBCardText>
                                                <MDBCardText>
                                                    {val.price}
                                                </MDBCardText>
                                                {localStorage.getItem("token") &&
                                                    <Button onClick={() => { this.addToCart(val) }}>Add To Cart</Button>
                                                }
                                            </MDBCardBody>
                                            <MDBCardFooter>
                                                <small className='text-muted'>Last updated {val.updated_at}</small>
                                            </MDBCardFooter>
                                        </MDBCard>
                                    </MDBCol>
                                </div>
                                )
                                })}
                        </MDBRow>
                        <br />
                        <br />
                        <Page alldata={this.state.allproduct} handlePage={this.handlePage} />
                        </div>
                    }
                        <Footer /> 
                    </div>
            </div>
        )
    }
}

export default Product