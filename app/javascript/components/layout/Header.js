import React from 'react'
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container'
import { Button } from "react-bootstrap";

const headerStyle = {
    background: "",
    height: "15vh",
}
function Header(props) {
    const history = useNavigate()

    const handleLogout = () => {
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("admintoken");
        history('/')
    };
    return (
        <div>
            <Navbar style={{ height: "25.7vh", background: "#747372" }} bg="" variant="" expand="md" fixed="top" sticky="top">
                <div style={{marginLeft: "3%"}}>
                    <Button className="ui button" onClick={() => { history('/') }}>Home</Button>&nbsp;
                </div>

                {localStorage.getItem("token") &&
                    <Container>
                        {/* <Navbar.Brand style={{ color: "black" }} href="/" onClick={() => { history('/') }}><button className="ui button">Home</button></Navbar.Brand> */}
                        <Navbar.Toggle />
                        <Navbar.Collapse className="justify-content-end">
                            <Navbar.Text>
                                <Navbar.Brand style={{ color: "black" }} href="/fruit" onClick={handleLogout}><button className="ui button">Log Out</button></Navbar.Brand>
                            </Navbar.Text>
                        </Navbar.Collapse>
                    </Container>}
                {localStorage.getItem("admintoken") && 
                    <Container>
                        {/* <Navbar.Brand style={{ color: "black" }} href="/" onClick={() => { history('/Home') }}><button className="ui button">Home</button></Navbar.Brand> */}
                        <Navbar.Toggle />
                        <Navbar.Collapse className="justify-content-end">
                            <Navbar.Text>
                                <Button className="ui button" onClick={handleLogout}>Log Out</Button>&nbsp;
                                {/* <Navbar.Brand style={{ color: "black" }} href="/fruit" onClick={handleLogout}><button className="ui button">Log Out</button></Navbar.Brand> */}
                            </Navbar.Text>
                        </Navbar.Collapse>
                    </Container>
                }
                {!localStorage.getItem("admintoken") && !localStorage.getItem("token") && 
                    <Container>
                        <Navbar.Toggle />
                        <Navbar.Collapse className="justify-content-end">
                            <Navbar.Text>
                                <Button className="ui button" onClick={() => props.handleFormSwitch("signUp")}>Sign Up</Button>&nbsp; &nbsp;
                                {/* <Navbar.Brand href="/fruit" onClick={() => props.handleFormSwitch("signUp")}><button className="ui button">Sign Up</button></Navbar.Brand> */}
                            </Navbar.Text>
                            <Navbar.Text>
                                <Button className="ui button" onClick={() => props.handleFormSwitch("login")}>LogIn</Button>&nbsp;
                                {/* <Navbar.Brand href="#" onClick={() => props.handleFormSwitch("login")}><button className="ui button">LogIn</button></Navbar.Brand> */}
                            </Navbar.Text>
                        </Navbar.Collapse>
                    </Container>
                }
            </Navbar>
        </div>
    )
}

export default Header;