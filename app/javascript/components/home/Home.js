import React from 'react'
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Navbar';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import Offer from '../offer/Offer';

const Home = () => {

    const history = useNavigate()
    const headerStyle = {
        background: "#98AFC7",
        height: "100vh",
    }
    const handleLogout = () => {
        window.localStorage.removeItem("token");
        history('/fruit')
    };

    return (
        <div>
            <nav>
                <Header />
                    {localStorage.getItem("token") &&
                        <div style={{ height: "17.3%" }} >
                            <p>Welcome</p>
                            {/* <Button className="btn btn-danger" onClick={handleLogout}>logout</Button>&nbsp;  */}
                            <Button onClick={() => { history('/category') }}>Category List</Button>&nbsp;
                            <Button onClick={() => { history('/alloffer') }}>Offer List</Button>&nbsp;
                            <Button onClick={() => { history('/product') }}>Product List</Button>&nbsp;
                            <Button onClick={() => { history('/cart') }}>Cart List</Button>&nbsp;
                            <p></p>
                        </div>
                        }
                        {!localStorage.getItem("token") && !localStorage.getItem("admintoken") &&
                        <div style={{  height: "17.3%" }}>
                            <p></p>
                            <h1>Welcome</h1>
                            <Button onClick={() => { history('/fruit') }}>Fruit List</Button>&nbsp;
                            <p></p>
                        </div>
                        }

                {localStorage.getItem("admintoken") &&
                    <div style={{ height: "17.3%"}} >
                        <p></p>
                        <Button onClick={() => { history('/fruit') }}>Fruit List</Button>&nbsp;
                        {/* <Button className="btn btn-danger" onClick={handleLogout}>logout</Button>&nbsp;  */}
                        <Button onClick={() => { history('/category') }}>Category List</Button>&nbsp;
                        <Button onClick={() => { history('/alloffer') }}>Offer List</Button>&nbsp;
                        <Button onClick={() => { history('/product') }}>Product List</Button>&nbsp;
                        <Button onClick={() => { history('/newcategory') }}>Add Category</Button>&nbsp;
                        <Button onClick={() => { history('/newoffer') }}>Add Offer</Button>&nbsp;
                        <Button onClick={() => { history('/newproduct') }}>Add Product</Button>&nbsp; 
                        <p></p>
                    </div>
                }
                <br />
                
                <Footer />
                <div fluid style={{ backgroundColor: "#747372", height: "22.4%" }}>
                    <Row>
                        <Col></Col>
                        <Col></Col>
                        <Col></Col>
                    </Row>
                </div>
            </nav>
        </div>
    )
}

export default Home