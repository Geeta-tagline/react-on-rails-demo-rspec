import React, { useState, useEffect } from 'react';
import Header from '../layout/Header'
import SignInForm from './SignInForm';
import LoginForm from './LoginForm';
import Body from '../fruit/Body'
import Footer from '../layout/Footer';
import Home from '../home/Home';

function UserAuth() {
    const [user, setUser] = useState({})
    const [form, setForm] = useState("")

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (token) {
            fetch(`http://localhost:3000/auto_login`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(resp => resp.json())
                .then(data => {
                    setUser(data)
                })
        }
    }, [])

    const handleLogin = (user) => {
        setUser(user)
    }

    const handleFormSwitch = (input) => {
        setForm(input)
    }

    const handleAuthClick = () => {
        const token = localStorage.getItem("token")
        fetch(`http://localhost:3000/user_is_authed`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(resp => resp.json())
            .then(data => console.log(data))
    }

    console.log(user)

    const renderForm = () => {
        switch (form) {
            case "login":
                return <LoginForm handleLogin={handleLogin} />
                break;
            default:
                return <SignInForm handleLogin={handleLogin} />
        }
    }
    return (
        <div className="">
            <Header handleFormSwitch={handleFormSwitch} />
            {
                localStorage.getItem("token") || localStorage.getItem("admintoken")  ? <Body /> : renderForm()
            }
            <Footer />
        </div>
    );
}

export default UserAuth;