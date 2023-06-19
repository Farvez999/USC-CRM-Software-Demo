import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { SiGoogleads } from 'react-icons/si';
import { FaUsers } from 'react-icons/fa';
import { GiExitDoor } from 'react-icons/gi';
import { CgToday } from 'react-icons/cg';
import { FcOnlineSupport } from 'react-icons/fc';
import { RiChatOffLine } from 'react-icons/ri';
import { MdOutlineInterests } from 'react-icons/md';
import { RiUserReceivedFill } from 'react-icons/ri';
import { MdOutlinePhoneMissed } from 'react-icons/md';
import { AuthContext } from '../../contexts/AuthProvider';

const Report = () => {

    const { user } = useContext(AuthContext)

    const { data: allleads = [], refetch } = useQuery({
        queryKey: ['allleads', user],
        queryFn: async () => {
            if (user._id) {
                const res = await fetch(`https://demo-usc-crm-server.vercel.app/leads/${user._id}`);
                const data = await res.json();
                return data;
            }
        }
    });
    console.log(allleads);


    const { data: admissions = [] } = useQuery({
        queryKey: ['admissions'],
        queryFn: async () => {
            const res = await fetch(`https://demo-usc-crm-server.vercel.app/leads?admission=true`);
            const data = await res.json();
            return data;
        }
    });

    const { data: closes = [] } = useQuery({
        queryKey: ['closes'],
        queryFn: async () => {
            const res = await fetch(`https://demo-usc-crm-server.vercel.app/leads?close=true`);
            const data = await res.json();

            return data;
        }
    });

    var date = new Date()
    const { data: todayFollowLeads = [] } = useQuery({
        queryKey: ['todayFollowLeads'],
        queryFn: async () => {
            const res = await fetch(`https://demo-usc-crm-server.vercel.app/todayLead/${date}`);
            const data = await res.json();
            return data;
        }
    });

    const { data: onlines = [] } = useQuery({
        queryKey: ['onlines'],
        queryFn: async () => {
            const res = await fetch(`https://demo-usc-crm-server.vercel.app/leads?onlineInterested=true`);
            const data = await res.json();
            return data;
        }
    });

    const { data: offlines = [] } = useQuery({
        queryKey: ['offlines'],
        queryFn: async () => {
            const res = await fetch(`https://demo-usc-crm-server.vercel.app/leads?offlineInterested=true`);
            const data = await res.json();
            return data;
        }
    });

    const { data: seminarInteresteds = [] } = useQuery({
        queryKey: ['seminarInteresteds', 'filterData'],
        queryFn: async () => {
            const res = await
                fetch(`https://demo-usc-crm-server.vercel.app/leads?seminarInterested=true`, {
                    headers: {
                        authorization: `bearer ${localStorage.getItem('accessToken')}`
                    }
                });
            const data = await res.json();
            return data;
        }
    });

    const { data: seminarAttends = [] } = useQuery({
        queryKey: ['seminarAttends'],
        queryFn: async () => {
            const res = await fetch(`https://demo-usc-crm-server.vercel.app/leads?seminarAttend=true`);
            const data = await res.json();
            return data;
        }
    });

    const { data: noReceives = [] } = useQuery({
        queryKey: ['noReceives'],
        queryFn: async () => {
            const res = await fetch(`https://demo-usc-crm-server.vercel.app/leads?noReceive=true`);
            const data = await res.json();
            return data;
        }
    });

    const cardData = [
        {
            id: 1,
            name: 'Opening Hours',
            description: 'Open 9.00 am to 5.00pm everyday',
            // icon: clock,
            bgClass: 'bg-gradient-to-r from-primary to-secondary'
        },
        {
            id: 2,
            name: 'Our Locations',
            description: 'Open 9.00 am to 5.00pm everyday',
            // icon: marker,
            bgClass: 'bg-accent'
        },
        {
            id: 3,
            name: 'Contact Us',
            description: 'Open 9.00 am to 5.00pm everyday',
            // icon: phone,
            bgClass: 'bg-gradient-to-r from-primary to-secondary'
        },
    ]

    return (
        <div className='mx-2 my-6'>
            <h1 className='text-3xl font-bold'>{user.name}'s Report..!</h1>

            <div className='grid mt-8 gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                <div className={`card text-white p-6 md:card-side shadow-xl bg-gradient-to-r from-primary to-secondary`}>
                    <figure>
                        <SiGoogleads className='w-20'></SiGoogleads>
                    </figure>
                    <div className="card-body ">
                        <h3 className="card-title justify-center">Total Lead </h3>
                        <h1 className="card-title justify-center">{allleads.length}</h1>
                    </div>
                </div>

                <div className={`card text-white p-6 md:card-side shadow-xl bg-accent`}>
                    <figure>
                        <FaUsers className='w-20'></FaUsers>
                    </figure>
                    <div className="card-body">
                        <p className='text-base font-bold'>Admission Students</p>
                        <h1 className="card-title justify-center">{admissions.length}</h1>
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
                        <h1 className="card-title justify-center">{todayFollowLeads.length}</h1>
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

            {/* <div className='grid mt-8 gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                {
                    cardData.map(card =>
                        <div className={`card text-white p-6 md:card-side shadow-xl ${card.bgClass}`}>

                            <SiGoogleads></SiGoogleads>
                            <div className="card-body">
                                <h2 className="card-title">{sumUserLead}</h2>
                                <p>{card.description}</p>
                            </div>
                        </div>
                    )
                }
            </div>
            <p>{sumUserLead}</p> */}
        </div>
    );
};

export default Report;