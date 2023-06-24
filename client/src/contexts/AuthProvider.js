import { createContext, useEffect, useState } from "react";
import axios from 'axios';
import { useQuery } from "@tanstack/react-query";

export const AuthContext = createContext()


const AuthProvider = ({ children }) => {

    const [user, setUser] = useState({});
    console.log(user);
    const [filterData, setFilterData] = useState([])
    console.log(filterData)

    const { data: loansData = [], refetch } = useQuery({
        queryKey: ['loansData'],
        queryFn: async () => {
            const res = await fetch(`https://demo-usc-crm-server.vercel.app/loan?loanReceiveStatus=true`);
            const data = await res.json();
            setFilterData(data)
            return data;
        }
    });

    console.log(loansData)

    useEffect(() => {
        try {
            if (!user?._id) {
                axios.get("https://demo-usc-crm-server.vercel.app/logged-user", {
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


        axios.post('https://demo-usc-crm-server.vercel.app/login', {
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


        fetch(`https://demo-usc-crm-server.vercel.app/users`, {
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
        loansData
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;