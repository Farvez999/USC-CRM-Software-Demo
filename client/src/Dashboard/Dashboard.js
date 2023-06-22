import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { SiGoogleads } from 'react-icons/si';
import { FaUsers } from 'react-icons/fa';
import { GiExitDoor } from 'react-icons/gi';
import { CgToday } from 'react-icons/cg';
import { FcOnlineSupport } from 'react-icons/fc';
import { RiChatOffLine } from 'react-icons/ri';
import { MdOutlineInterests } from 'react-icons/md';
import { RiUserReceivedFill } from 'react-icons/ri';
import { MdOutlinePhoneMissed } from 'react-icons/md';
import { AuthContext } from '../contexts/AuthProvider';
import AOS from 'aos';
import 'aos/dist/aos.css';


import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';



const Dashboard = () => {
    AOS.init();

    const { user } = useContext(AuthContext)
    const [filterData, setFilterData] = useState([])
    const [addmissionData, setAddmissionData] = useState([])
    const [todayFollowup, setTodayFollowup] = useState([])
    console.log(filterData);

    // ChartJS.register(
    //     CategoryScale,
    //     LinearScale,
    //     PointElement,
    //     LineElement,
    //     Title,
    //     Tooltip,
    //     Legend
    // );

    // const options = {
    //     responsive: true,
    //     plugins: {
    //         legend: {
    //             position: null,
    //         },
    //         title: {
    //             display: true,
    //             text: 'Chart.js Line Chart',
    //         },
    //     },
    // };

    // const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

    // const data = {
    //     labels,
    //     datasets: [
    //         {
    //             label: 'Dataset 1',
    //             data: '5-5-23,9-5-23,11-5-23,200,200,200,200',
    //             borderColor: 'rgb(255, 99, 132)',
    //             backgroundColor: 'rgba(255, 99, 132, 0.5)',
    //         },
    //         {
    //             label: 'Dataset 2',
    //             data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
    //             borderColor: 'rgb(53, 162, 235)',
    //             backgroundColor: 'rgba(53, 162, 235, 0.5)',
    //         },
    //     ],
    // };

    const { data: allleads = [], refetch } = useQuery({
        queryKey: ['allleads', user],
        queryFn: async () => {
            if (user._id) {
                if (user.role === 'admin') {
                    const res = await fetch(`http://localhost:5000/leads`);
                    const data = await res.json();
                    setFilterData(data)
                    return data;
                }
                else if (user.role === 'head') {
                    const res = await fetch(`http://localhost:5000/leads/?head.name=${user.name}`);
                    const data = await res.json();
                    setFilterData(data)
                    return data;
                }
                else {
                    const res = await fetch(`http://localhost:5000/leads?user.name=${user.name}`);
                    const data = await res.json();
                    setFilterData(data)
                    return data;
                }
            }
        }
    });
    console.log(allleads);


    const { data: admissions = [] } = useQuery({
        queryKey: ['admissions'],
        queryFn: async () => {
            if (user.role === 'admin') {
                const res = await fetch(`http://localhost:5000/leads?admission=true`);
                const data = await res.json();
                setAddmissionData(data)
                return data;
            }
            else if (user.role === 'head') {
                const res = await fetch(`http://localhost:5000/leads?admission=true&head.name=${user.name}`);
                const data = await res.json();
                setAddmissionData(data)
                return data;
            }
            else {
                const res = await fetch(`http://localhost:5000/leads?admission=true&user.name=${user.name}`);
                const data = await res.json();
                setAddmissionData(data)
                return data;
            }

        }
    });

    const { data: closes = [] } = useQuery({
        queryKey: ['closes'],
        queryFn: async () => {
            if (user.role === 'admin') {
                const res = await fetch(`http://localhost:5000/leads?close=true`);
                const data = await res.json();
                return data;
            }
            else if (user.role === 'head') {
                const res = await fetch(`http://localhost:5000/leads?close=true&head.name=${user.name}`);
                const data = await res.json();
                return data;
            }
            else {
                const res = await fetch(`http://localhost:5000/leads?close=true&user.name=${user.name}`);
                const data = await res.json();
                return data;
            }

        }
    });

    var date = new Date()
    const { data: todayFollowLeads = [] } = useQuery({
        queryKey: ['todayFollowLeads'],
        queryFn: async () => {
            if (user.role === 'admin') {
                const res = await fetch(`http://localhost:5000/todayLead/${date}`);
                const data = await res.json();
                setTodayFollowup(data)
                return data;
            }
            else if (user.role === 'head') {
                const res = await fetch(`http://localhost:5000/todayLead/${date}`);
                const data = await res.json();
                let lData = data.filter(lead => lead.head.name === user.name)
                setTodayFollowup(lData)
                return data;
            }
            else {
                const res = await fetch(`http://localhost:5000/todayLead/${date}`);
                const data = await res.json();
                let lData = data.filter(lead => lead.user.name === user.name)
                setTodayFollowup(lData)
                return data;
            }


        }
    });

    const { data: onlines = [] } = useQuery({
        queryKey: ['onlines'],
        queryFn: async () => {
            if (user.role === 'admin') {
                const res = await fetch(`http://localhost:5000/leads?onlineInterested=true`);
                const data = await res.json();
                return data;
            }
            else if (user.role === 'head') {
                const res = await fetch(`http://localhost:5000/leads?onlineInterested=true&head.name=${user.name}`);
                const data = await res.json();
                return data;
            }
            else {
                const res = await fetch(`http://localhost:5000/leads?onlineInterested=true&user.name=${user.name}`);
                const data = await res.json();
                return data;
            }

        }
    });

    const { data: offlines = [] } = useQuery({
        queryKey: ['offlines'],
        queryFn: async () => {
            if (user.role === 'admin') {
                const res = await fetch(`http://localhost:5000/leads?offlineInterested=true`);
                const data = await res.json();
                return data;
            }
            else if (user.role === 'head') {
                const res = await fetch(`http://localhost:5000/leads?offlineInterested=true&head.name=${user.name}`);
                const data = await res.json();
                return data;
            }
            else {
                const res = await fetch(`http://localhost:5000/leads?offlineInterested=true&user.name=${user.name}`);
                const data = await res.json();
                return data;
            }

        }
    });

    const { data: seminarInteresteds = [] } = useQuery({
        queryKey: ['seminarInteresteds', 'filterData'],
        queryFn: async () => {
            if (user.role === 'admin') {
                const res = await fetch(`http://localhost:5000/leads?seminarInterested=true`);
                const data = await res.json();
                return data;
            }
            else if (user.role === 'head') {
                const res = await fetch(`http://localhost:5000/leads?seminarInterested=true&head.name=${user.name}`);
                const data = await res.json();
                return data;
            }
            else {
                const res = await fetch(`http://localhost:5000/leads?seminarInterested=true&user.name=${user.name}`, {
                    headers: { authorization: `bearer ${localStorage.getItem('accessToken')}` }
                });
                const data = await res.json();
                return data;
            }

        }
    });

    const { data: seminarAttends = [] } = useQuery({
        queryKey: ['seminarAttends'],
        queryFn: async () => {
            if (user.role === 'admin') {
                const res = await fetch(`http://localhost:5000/leads?seminarAttend=true`);
                const data = await res.json();
                return data;
            }
            else if (user.role === 'head') {
                const res = await fetch(`http://localhost:5000/leads?seminarAttend=true&head.name=${user.name}`);
                const data = await res.json();
                return data;
            }
            else {
                const res = await fetch(`http://localhost:5000/leads?seminarAttend=true&user.name=${user.name}`);
                const data = await res.json();
                return data;
            }

        }
    });

    const { data: noReceives = [] } = useQuery({
        queryKey: ['noReceives'],
        queryFn: async () => {
            if (user.role === 'admin') {
                const res = await fetch(`http://localhost:5000/leads?noReceive=true`);
                const data = await res.json();
                return data;
            }
            else if (user.role === 'head') {
                const res = await fetch(`http://localhost:5000/leads?noReceive=true&head.name=${user.name}`);
                const data = await res.json();
                return data;
            }
            else {
                const res = await fetch(`http://localhost:5000/leads?noReceive=true&user.name=${user.name}`);
                const data = await res.json();
                return data;
            }

        }
    });

    // const date = new Date();
    const currentTime = date.getHours();
    let greeting;

    if (currentTime >= 0 && currentTime <= 12) {
        greeting = "Good Morning";
    } else if (currentTime > 12 && currentTime <= 18) {
        greeting = "Good Afternoon";
    } else {
        greeting = "Good Evening";
    }

    // let date = new Date("01/05/2020");
    // let day = date.toLocaleString('en-us', { weekday: 'long' });
    // console.log(day);
    // expected result = tuesday

    var today = new Date().toLocaleDateString(undefined, {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        weekday: 'long'
    });



    return (
        <div className='mx-2 my-6'>
            <div
                data-aos="fade-right"
                data-aos-duration="2000"
            >
                <h2 className='text-2xl font-bold'>Hello {user.name} ! {greeting} ! {today} !</h2>
            </div>

            <div className='grid mt-6 gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-6'>

                {/* <Line options={options} data={data} />; */}

                <div className={`card text-white p-6 md:card-side shadow-xl bg-gradient-to-r from-primary to-secondary`}>
                    <figure>
                        <SiGoogleads className='w-20'></SiGoogleads>
                    </figure>
                    <div className="card-body ">
                        <h3 className="card-title justify-center">Total Lead </h3>
                        <h1 className="card-title justify-center">{filterData.length}</h1>
                    </div>
                </div>

                <div className={`card text-white p-6 md:card-side shadow-xl bg-accent`}>
                    <figure>
                        <FaUsers className='w-20'></FaUsers>
                    </figure>
                    <div className="card-body">
                        <p className='text-base font-bold'>Admission Students</p>
                        <h1 className="card-title justify-center">{addmissionData.length}</h1>
                    </div>
                </div>

                <div className={`card text-white p-6 md:card-side shadow-xl bg-gradient-to-r from-secondary to-primary`}>
                    <figure>
                        <GiExitDoor className='w-20'></GiExitDoor>
                    </figure>
                    <div className="card-body">
                        <p className='text-base font-bold'>Close Students</p>
                        <h1 className="card-title justify-center">{closes.length}</h1>
                    </div>
                </div>

                <div className={`card text-white p-6 md:card-side shadow-xl bg-gradient-to-r from-secondary to-primary`}>
                    <figure>
                        <CgToday className='w-20'></CgToday>
                    </figure>
                    <div className="card-body">
                        <p className='text-base font-bold'>Today Follow Up</p>
                        <h1 className="card-title justify-center">{todayFollowup.length}</h1>
                    </div>
                </div>

                <div className={`card text-white p-6 md:card-side shadow-xl bg-accent`}>
                    <figure>
                        <FcOnlineSupport className='w-20'></FcOnlineSupport>
                    </figure>
                    <div className="card-body">
                        <p className='text-base font-bold'>Online Students</p>
                        <h1 className="card-title justify-center">{onlines.length}</h1>
                    </div>
                </div>

                <div className={`card text-white p-6 md:card-side shadow-xl bg-gradient-to-r from-primary to-secondary`}>
                    <figure>
                        <RiChatOffLine className='w-20'></RiChatOffLine>
                    </figure>
                    <div className="card-body ">
                        <p className='text-base font-bold'>Offline Students </p>
                        <h1 className="card-title justify-center">{offlines.length}</h1>
                    </div>
                </div>

                <div className={`card text-white p-6 md:card-side shadow-xl bg-gradient-to-r from-primary to-secondary`}>
                    <figure>
                        <MdOutlineInterests className='w-20'></MdOutlineInterests>
                    </figure>
                    <div className="card-body ">
                        <p className='text-sm font-bold'>Seminar Interesteds</p>
                        <h1 className="card-title justify-center">{seminarInteresteds.length}</h1>
                    </div>
                </div>

                <div className={`card text-white p-6 md:card-side shadow-xl bg-accent`}>
                    <figure>
                        <RiUserReceivedFill className='w-20'></RiUserReceivedFill>
                    </figure>
                    <div className="card-body">
                        <p className='text-base font-bold'>Seminar Attends</p>
                        <h1 className="card-title justify-center">{seminarAttends.length}</h1>
                    </div>
                </div>

                <div className={`card text-white p-6 md:card-side shadow-xl bg-gradient-to-r from-secondary to-primary`}>
                    <figure>
                        <MdOutlinePhoneMissed className='w-20'></MdOutlinePhoneMissed>
                    </figure>
                    <div className="card-body">
                        <p className='text-sm font-bold'>NoReceive Students</p>
                        <h1 className="card-title justify-center">{noReceives.length}</h1>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Dashboard;