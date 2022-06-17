import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function LoginForm(props) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, seterror] = useState("")
    const notify = () => toast("Data Save Successfully");

    const handleUsernameChange = (evt) => {
        setUsername(evt.target.value)
    }

    const handlePasswordChange = (evt) => {
        setPassword(evt.target.value)
    }

    const handleSubmit = (evt) => {
        evt.preventDefault()
        fetch(`http://localhost:3000/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                username,
                password,
            })
        })
            .then(resp => resp.json())
            .then(data => {
                debugger
                if(data.admintoken){
                    localStorage.setItem("admintoken", data.admintoken)
                    window.localStorage.removeItem("token");
                }else{
                    localStorage.setItem("token", data.jwt)
                    window.localStorage.removeItem("admintoken");
                }
                props.handleLogin(data.user)
                if (data.failure) {
                    seterror(data.failure)
                    window.localStorage.removeItem("token");
                    window.localStorage.removeItem("admintoken");
                }
            })
        setUsername("")
        setPassword("")
    }
    const formDivStyle = {
        margin: "auto",
        padding: "20px",
        width: "45%"
    }
    return (

        <div>
            <div style={formDivStyle}>
                <center><h1>Log In</h1></center>
                <form className="ui form" onSubmit={handleSubmit}>
                    <div className="field">
                        <label style={{ marginRight: "85%" }} >Email:</label>
                        <input className="form-control" value={username} onChange={handleUsernameChange} type="text" placeholder="username" required />
                    </div>
                    <div className="field">
                        <label style={{ marginRight: "85%" }} >Password:</label>
                        <input className="form-control" value={password} onChange={handlePasswordChange} type="password" placeholder="password" required />
                    </div>&nbsp;
                        <span style={{ color: 'red' }}>{error}</span>
                    <center><button className="ui button" type="submit">Submit</button></center>
                </form>
            </div>
        </div>)
}

export default LoginForm