import { createContext, useEffect, useState } from "react";
import axios from 'axios';

export const AuthContext = createContext()


const AuthProvider = ({ children }) => {

    const [user, setUser] = useState({});
    console.log(user);

    useEffect(() => {
        try {
            if (!user?._id) {
                axios.get("http://localhost:5000/logged-user", {
                    headers: {
                        'content-type': 'application/json',
                        authorization: localStorage.getItem('access_token')
                    },
                }
                ).then((res) => {
                    setUser(res.data?.user);
                    console.log(res.data);
                    // localStorage.setItem(
                    //     "access_token",
                    //     `Bearer ${res.data.accessToken}`
                    // );
                });
            }
        } catch (err) {
            setUser({});
        }
    }, []);

    const login = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;


        axios.post('http://localhost:5000/login', {
            email, password
        })
            .then(res => {
                console.log(res.data);
                localStorage.setItem(
                    "access_token",
                    `Bearer ${res.data.accessToken}`
                );
                setUser(res.data?.user);
            })
            .catch(err => { console.log(err); })
    };


    const signup = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const role = e.target.role.value;
        const password = e.target.password.value;

        console.log(name, email, role, password);
        const user = { name: name, email: email, role: role, password: password };


        fetch(`http://localhost:5000/users`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: localStorage.getItem('access_token')
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                // setUser(data);
                console.log(data);
            })


    };

    const logout = async () => {
        localStorage.clear();
        window.location.href = '/login';
    };

    const authInfo = {
        user,
        signup,
        login,
        logout,
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;