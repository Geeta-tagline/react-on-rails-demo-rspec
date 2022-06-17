import React, { useState } from 'react'

function SignInForm(props) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, seterror] = useState("")

    const handleUsernameChange = (evt) => {
        setUsername(evt.target.value)
    }

    const handlePasswordChange = (evt) => {
        setPassword(evt.target.value)
    }

    const handleSubmit = (evt) => {
        evt.preventDefault()
        fetch(`http://localhost:3000/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                username,
                password
            })
        })
            .then(resp => resp.json())
            .then(data => {
                if (data.errors) {
                    seterror(data.errors)
                    window.localStorage.removeItem("token");
                    window.localStorage.removeItem("admintoken");
                }else{
                    if (data.admintoken) {
                        localStorage.setItem("admintoken", data.admintoken)
                        window.localStorage.removeItem("token");
                    } else {
                        localStorage.setItem("token", data.jwt)
                        window.localStorage.removeItem("admintoken");
                    }
                }
                props.handleLogin(data.user)
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
        <div style={formDivStyle}>
            <center><h1>Sign Up</h1></center>
            <form className="ui form" onSubmit={handleSubmit}>
                <div className="field">
                    <label>Username</label>
                    <input value={username} onChange={handleUsernameChange} type="text" placeholder="username" />
                </div>
                <div className="field">
                    <label>Password</label>
                    <input value={password} onChange={handlePasswordChange} type="password" placeholder="password" />
                </div>
                <span style={{ color: 'red' }}>{error}</span>
                <center><button className="ui button" type="submit">Submit</button></center>
            </form>
        </div>
    )
}

export default SignInForm