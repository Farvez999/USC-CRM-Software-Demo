import { createContext, useEffect, useState } from "react";
import axios from 'axios';
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

export const AuthContext = createContext()


const AuthProvider = ({ children }) => {

    const [user, setUser] = useState({});
    // console.log(user);
    const [filterData, setFilterData] = useState([])

    const [loginError, setLoginError] = useState('')
    const [signupError, setSignupError] = useState('')
    const [signupData, setSignupData] = useState()

    const { data: loansData = [] } = useQuery({
        queryKey: ['loansData'],
        queryFn: async () => {
            const res = await fetch(`https://demo-usc-crm-software.vercel.app/loan?loanReceiveStatus=true`);
            const data = await res.json();
            setFilterData(data)
            return data;
        }
    });

    const { data: loansPayData = [] } = useQuery({
        queryKey: ['loansPayData'],
        queryFn: async () => {
            const res = await fetch(`https://demo-usc-crm-software.vercel.app/loan?loanProvideStatus=true`);
            const data = await res.json();
            return data;
        }
    });

    const { data: payLoans = [] } = useQuery({
        queryKey: ['payLoans'],
        queryFn: async () => {
            const res = await fetch(`https://demo-usc-crm-software.vercel.app/loan/pay`);
            const data = await res.json();
            return data;
        }
    });

    const { data: revLoans = [] } = useQuery({
        queryKey: ['revLoans'],
        queryFn: async () => {
            const res = await fetch(`https://demo-usc-crm-software.vercel.app/loan/rev`);
            const data = await res.json();
            return data;
        }
    });

    useEffect(() => {
        try {
            if (!user?._id) {
                axios.get("https://demo-usc-crm-software.vercel.app/logged-user", {
                    headers: {
                        'content-type': 'application/json',
                        authorization: localStorage.getItem('access_token')
                    },
                }
                ).then((res) => {
                    setUser(res.data?.user);
                    // console.log(res.data);
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
        setLoginError('')
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        if (!email) {
            setLoginError('Please enter a valid email')
            return;
        }
        if (!password) {
            setLoginError('Please enter a valid password');
            return;
        }

        axios.post('https://demo-usc-crm-software.vercel.app/login', {
            email, password
        })
            .then(res => {
                // console.log(res.data);
                localStorage.setItem(
                    "access_token",
                    `Bearer ${res.data.accessToken}`
                );
                setUser(res.data?.user);
            })
            .catch(err => {
                setLoginError(err?.response?.data?.message)
                // console.log(err);
            })
    };


    const signup = (e) => {

        // console.log("e")
        setSignupError('')
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const role = e.target.role.value;
        const password = e.target.password.value;

        // console.log(name, email, role, password);

        if (!name) {
            setSignupError('Please enter a valid name')
            return;
        }

        if (!email) {
            setSignupError('Please enter a valid email')
            return;
        }

        if (!role) {
            setSignupError('Please enter a valid role')
            return;
        }

        if (!password) {
            setSignupError('Please enter a valid password');
            return;
        }

        if (password.length < 6) {
            setSignupError('Password must be at least 6 characters');
            return;
        }

        // console.log(name, email, role, password);
        const user = { name: name, email: email, role: role, password: password };


        fetch(`https://demo-usc-crm-software.vercel.app/users`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: localStorage.getItem('access_token')
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                toast.success('User Created Success')
                // console.log(data);
                setSignupData(data)
            })
            .catch(err => {
                setSignupError(err?.message)
            })


    };

    const logout = async () => {
        localStorage.clear();
        window.location.href = '/login';
    };

    const authInfo = {
        user,
        signup,
        signupData,
        login,
        loginError,
        signupError,
        logout,
        loansData,
        loansPayData,
        payLoans,
        revLoans
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;