import { useQuery } from '@tanstack/react-query';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import EditModal from './EditModal';
import { AuthContext } from '../../contexts/AuthProvider';

const TodayFollowup = () => {
    const { user } = useContext(AuthContext)
    const [search, setSearch] = useState("");
    const [sLead, setSLead] = useState()
    const [filterData, setFilterData] = useState([])

    console.log(filterData)

    // const name = user.name;
    // console.log(name)

    var date = new Date()

    const { data: todayFollowLeads = [], refetch } = useQuery({
        queryKey: ['todayFollowLeads'],
        queryFn: async () => {
            const res = await fetch(`https://demo-usc-crm-software.vercel.app/todayLead/${date}`);
            const data = await res.json();
            console.log(data)
            let lData = data.filter(lead => lead.user.name === user.name)
            setFilterData(lData)
            return data;
        }
    });

    console.log(todayFollowLeads)
    console.log(filterData)

    // useEffect(() => {
    //     let interval = setInterval(() => {
    //         fetch(`https://demo-usc-crm-software.vercel.app/todayLead/${date}?&user.name=${user.name}`, {
    //             headers: {
    //                 authorization: `bearer ${localStorage.getItem('accessToken')}`
    //             }
    //         })
    //             .then((response) => response.json())
    //             .then((data) => {
    //                 setTodayFollowup(data)
    //             })
    //     }, 1000);
    //     return () => {
    //         clearInterval(interval);
    //     };
    // }, []);


    // -------------Edit Start -------------
    const handleEdidData = (todayFollowLead) => {
        setSLead(todayFollowLead)
    }

    const [leadsUpdate, setLeadsUpdate] = useState()

    const handleUpdate = (event) => {
        event.preventDefault();
        fetch(`https://demo-usc-crm-software.vercel.app/update/${sLead._id}`, {
            method: 'PATCH', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(leadsUpdate),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                toast.success('Lead Updates Success')
                refetch()
                // setLeadsUpdate(null)
                setSLead(null)
            });
    }
    // -------------Edit End -------------


    const handleAdmission = (todayFollowLead) => {

        const admissionData = {
            admissionFee: 0,
            totalInstallment: 0,
            fristInstallment: 0,
            fristPaymentAccounts: "Payment Accounts",
            fristInstallmentTID: "0",
            fristInstallmentDate: "",
            admission: true,
            // todayFollowLead: false
        }

        fetch(`https://demo-usc-crm-software.vercel.app/update/${todayFollowLead._id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(admissionData)
        })
            .then(res => res.json())
            .then(data => {
                toast.success('Admisstion Data added successfully')
                refetch()
            })

    }



    const handleClose = (todayFollowLead) => {
        const closeData = {
            close: true,
            // todayFollowLead: false
        }

        fetch(`https://demo-usc-crm-software.vercel.app/update/${todayFollowLead._id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(closeData)
        })
            .then(res => res.json())
            .then(data => {
                toast.success('Lead Close successfully')
                refetch()
            })
    }



    return (
        <div className='mx-2 my-6'>
            <h3 className="text-3xl mb-3">{user.name}'s Today Followup Students : {filterData.length}</h3>

            <input type="text" className="input input-bordered input-sm w-full max-w-xs mb-3" onChange={(e) => setSearch(e.target.value)} placeholder='Search By Name, Phone, Email'></input>

            <div className="overflow-auto" style={{ height: '430px' }}>

                <table className="table-fixed">
                    <thead className='sticky top-0 bg-slate-300' style={{ width: "1200px" }}>
                        <tr className='text-xs'>
                            <th className='p-1 border-2'>#</th>
                            <th className='p-1 border-2'>Date</th>
                            {/* <th className='p-1 border-2'>C N</th> */}
                            <th className='p-1 border-2'>B N</th>
                            {/* <th className='p-1 border-2'>U N</th> */}
                            <th className='p-1 border-2'>H N</th>
                            <th className='p-1 border-2'>Name</th>
                            <th className='p-1 border-2'>Phone</th>
                            <th className='p-1 border-2'>Email</th>
                            <th className='p-1 border-2'>1st F up</th>
                            <th className='p-1 border-2'>2nd F up</th>
                            <th className='p-1 border-2'>3rd F up</th>
                            <th className='p-1 border-2'>Next F D</th>
                            <th className='p-1 border-2'>Remark</th>
                            <th className='p-1 border-2'>Remark 2</th>
                            <th className='p-1 border-2'>Ad S</th>
                            <th className='p-1 border-2'>Action</th>

                        </tr>
                    </thead>

                    <tbody className='text-xs'>

                        {
                            filterData.length > 0 &&
                            filterData?.filter((todayFollowLead) => {
                                return search?.toLowerCase() === '' ? todayFollowLead : todayFollowLead.name.toLowerCase().includes(search?.toLowerCase()) || todayFollowLead.phone.toLowerCase().includes(search?.toLowerCase()) || todayFollowLead?.email?.toLowerCase().includes(search?.toLowerCase())
                            })
                                ?.map((todayFollowLead, i) =>
                                    <tr key={todayFollowLead._id}>
                                        <th className='p-1 border-2'>{i + 1}</th>
                                        <td className='p-1 border-2'>{todayFollowLead?.createdAt.slice(0, -14)}</td>
                                        {/* <td className='p-1 border-2'>{todayFollowLead?.course.name}</td> */}
                                        <td className='p-1 border-2'>{todayFollowLead?.batch?.name}</td>
                                        {/* <td className='p-1 border-2'>{todayFollowLead?.user.name}</td> */}
                                        <td className='p-1 border-2'>{todayFollowLead?.head?.name}</td>
                                        <td className='p-1 border-2'>{todayFollowLead?.name}</td>
                                        <td className='p-1 border-2'>{todayFollowLead?.phone?.split('p:', 2)}</td>
                                        <td className='p-1 border-2'>{todayFollowLead?.email?.split('@', 1)}</td>
                                        <td className='p-1 border-2'>{todayFollowLead?.firstFollow}</td>
                                        <td className='p-1 border-2'>{todayFollowLead?.secondFollow}</td>
                                        <td className='p-1 border-2'>{todayFollowLead?.thirdtFollow}</td>
                                        <td className='p-1 border-2'>{todayFollowLead?.nextFollow}</td>
                                        <td className='p-1 border-2'>{todayFollowLead?.remark}</td>
                                        <td className='p-1 border-2'>{todayFollowLead?.remarkTwo}</td>
                                        <td className='p-1 border-2'>{todayFollowLead?.admissionStatus}</td>
                                        <td className='p-1 border-2'>
                                            <label onClick={() => handleEdidData(todayFollowLead)} htmlFor="editModal" className="btn btn-xs btn-secondary">Edit</label>
                                            <p className='btn btn-xs btn-primary' onClick={() => handleAdmission(todayFollowLead)} >Add</p>
                                            <p className='btn btn-xs btn-denger' onClick={() => handleClose(todayFollowLead)} >Close</p>
                                        </td>
                                    </tr>

                                )
                        }

                    </tbody>

                </table>

            </div>
            {
                sLead &&
                <EditModal
                    singleLead={sLead}
                    setSLead={setSLead}
                    refetch={refetch}
                >
                </EditModal>
            }
        </div>
    );

};

export default TodayFollowup;