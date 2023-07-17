import { useQuery } from '@tanstack/react-query';
import React, { useContext, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import EditModal from './EditModal';
import { AuthContext } from '../../contexts/AuthProvider';

const NoReceive = () => {
    const { user } = useContext(AuthContext)
    const [search, setSearch] = useState("");
    const [sLead, setSLead] = useState()

    const [filterData, setFilterData] = useState([])
    const courseRef = useRef();
    const batchRef = useRef();
    const headRef = useRef();

    const { data: noReceives = [], refetch } = useQuery({
        queryKey: ['noReceives'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/leads?noReceive=true&user.name=${user.name}`);
            const data = await res.json();
            setFilterData(data)
            return data;
        }
    });


    // -------------Edit Start -------------
    const handleEdidData = (noReceive) => {
        setSLead(noReceive)
    }

    const [leadsUpdate, setLeadsUpdate] = useState()

    // const handleUpdate = (event) => {
    //     event.preventDefault();
    //     fetch(`http://localhost:5000/update/${sLead._id}`, {
    //         method: 'PATCH', // or 'PUT'
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(leadsUpdate),
    //     })
    //         .then((response) => response.json())
    //         .then((data) => {
    //             console.log(data);
    //             toast.success('Lead Updates Success')
    //             refetch()
    //             // setLeadsUpdate(null)
    //             setSLead(null)
    //         });
    // }
    // -------------Edit End -------------



    const handleAdmission = (noReceive) => {

        const admissionData = {
            admission: true,
            noReceive: false,
            admissionFee: 0,
            totalInstallment: 0,
            fristInstallment: 0,
            fristPaymentAccounts: "Payment Accounts",
            fristInstallmentTID: "0",
            fristInstallmentDate: "",
        }

        fetch(`http://localhost:5000/update/${noReceive._id}`, {
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



    const handleClose = (noReceive) => {
        const closeData = {
            close: true,
            noReceive: false
        }

        fetch(`http://localhost:5000/update/${noReceive._id}`, {
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

    const handleOnline = (noReceive) => {

        const onlineInterested = {
            onlineInterested: true,
            noReceive: false
        }

        fetch(`http://localhost:5000/update/${noReceive._id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(onlineInterested)
        })
            .then(res => res.json())
            .then(data => {
                toast.success('Online Course Interested')
                refetch()
            })
    }

    const handleOffline = (noReceive) => {
        const offlineInterested = {
            offlineInterested: true,
            noReceive: false
        }


        fetch(`http://localhost:5000/update/${noReceive._id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(offlineInterested)
        })
            .then(res => res.json())
            .then(data => {
                toast.success('Offline Admissions Interested')
                refetch()
            })
    }


    const handleSeminarInter = (noReceive) => {
        const seminarInterested = {
            seminarInterested: true,
            noReceive: false
        }

        fetch(`http://localhost:5000/update/${noReceive._id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(seminarInterested)
        })
            .then(res => res.json())
            .then(data => {
                toast.success('Seminar Interested Added')
                refetch()
            })
    }



    // -----------------Filter Start--------------------

    const { data: coursesName = [] } = useQuery({
        queryKey: ['coursesName'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/course`);
            const data = await res.json();
            return data;
        }
    });

    const { data: batchsName = [] } = useQuery({
        queryKey: ['batchsName'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/batch`);
            const data = await res.json();
            return data;
        }
    });

    const { data: headsName = [] } = useQuery({
        queryKey: ['headsName'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/head`);
            const data = await res.json();
            return data;
        }
    });


    const handleSearch = () => {
        const fData = noReceives?.filter(si => si.course.name === courseRef.current.value || si.batch.name === batchRef.current.value || si.head.name === headRef.current.value)
        setFilterData(fData)

    };

    // -----------------Filter End--------------------

    // -------------Date wise Filter Start--------------------
    function formatedDate(date) {
        return new Date(date).toISOString().slice(0, -14);
    }

    const handleInputChange = event => {
        const value = event.target.value;
        console.log(value);
        const fiData = noReceives.filter(si => formatedDate(si.createdAt) === value)
        setFilterData(fiData)

    }
    // -------------Date wise Filter End--------------------

    return (
        <div className='mx-2 my-6'>
            <h3 className="text-2xl mb-3">{user.name}'s No Receive Students : {noReceives.length}</h3>

            <div className='flex flex-wrap items-center my-2'>

                <div className="form-control mx-2">
                    <label className="label">
                        <span className="label-text">Date</span>
                    </label>
                    <input onChange={handleInputChange} name="FirstFollowup" type="date" className="input input-sm w-full input-bordered" />
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Course Name</span>
                    </label>
                    <select
                        ref={courseRef}
                        className="select select-sm w-full border-gray-400"
                    >
                        <option >Course Name</option>
                        {
                            coursesName?.users?.map((user) =>
                                <option
                                    key={user._id}
                                    value={user.name}>
                                    {user.name}
                                </option>
                            )
                        }
                    </select>
                </div>

                <div className="form-control mx-2">
                    <label className="label">
                        <span className="label-text">Batch Name</span>
                    </label>
                    <select className="select select-sm w-full border-gray-400" required
                        ref={batchRef}>
                        <option>Batch Name</option>
                        {
                            batchsName?.users?.map((user) =>
                                <option
                                    key={user._id}
                                    value={user.name}>
                                    {user.name}
                                </option>
                            )
                        }
                    </select>
                </div>

                <div className="form-control mx-2">
                    <label className="label">
                        <span className="label-text">Head Name</span>
                    </label>
                    <select className="select select-sm w-full border-gray-400" required
                        ref={headRef}>
                        <option >Head Name</option>
                        {
                            headsName?.users?.map((user) =>
                                <option
                                    key={user._id}
                                    value={user.name}>
                                    {user.name}
                                </option>
                            )
                        }
                    </select>
                </div>
                <div className='mt-8'>
                    <button
                        onClick={handleSearch}
                        className="btn btn-sm btn-primary text-white bg-green-500"
                    >
                        Filter
                    </button>
                </div>

                <div className='mt-8 ml-32'>
                    <input type="text" className="input input-bordered input-sm w-full max-w-xs mb-3" onChange={(e) => setSearch(e.target.value)} placeholder='Search By Name, Phone, Email'></input>
                </div>
            </div>




            <div className="overflow-auto" style={{ height: '430px' }}>

                <table className="table w-full">
                    <thead className='sticky top-0 bg-slate-300' style={{ width: "1200px" }}>
                        <tr className='text-xs'>
                            <th className='p-1 border-2'>#</th>
                            <th className='p-1 border-2'>Date</th>
                            {/* <th className='p-1 border-2'>C N</th> */}
                            <th className='p-1 border-2'>Batch</th>
                            {/* <th className='p-1 border-2'>U N</th> */}
                            <th className='p-1 border-2'>Head</th>
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
                            <th className='p-1 border-2'>Interested</th>
                        </tr>
                    </thead>

                    <tbody className='text-xs'>
                        {
                            filterData.length > 0 &&
                            filterData?.filter((noReceive) => {
                                return search?.toLowerCase() === '' ? noReceive : noReceive.name.toLowerCase().includes(search?.toLowerCase()) || noReceive.phone.toLowerCase().includes(search?.toLowerCase()) || noReceive?.email?.toLowerCase().includes(search?.toLowerCase())
                            })
                                ?.map((noReceive, i) =>
                                    <tr>
                                        <th className='p-1 border-2'>{i + 1}</th>
                                        <td className='p-1 border-2'>{noReceive.createdAt.slice(0, -14)}</td>
                                        {/* <td className='p-1 border-2'>{noReceive.course.name}</td> */}
                                        <td className='p-1 border-2'>{noReceive.batch.name}</td>
                                        {/* <td className='p-1 border-2'>{noReceive.user.name}</td> */}
                                        <td className='p-1 border-2'>{noReceive?.head?.name}</td>
                                        <td className='p-1 border-2'>{noReceive?.name}</td>
                                        <td className='p-1 border-2'>{noReceive?.phone}</td>
                                        <td className='p-1 border-2'>{noReceive?.email}</td>
                                        <td className='p-1 border-2'>{noReceive?.firstFollow}</td>
                                        <td className='p-1 border-2'>{noReceive?.secondFollow}</td>
                                        <td className='p-1 border-2'>{noReceive?.thirdtFollow}</td>
                                        <td className='p-1 border-2'>{noReceive?.nextFollow}</td>
                                        <td className='p-1 border-2'>{noReceive?.remark}</td>
                                        <td className='p-1 border-2'>{noReceive?.remarkTwo}</td>
                                        <td className='p-1 border-2'>{noReceive?.admissionStatus}</td>
                                        <td className='p-1 border-2'>
                                            <label onClick={() => handleEdidData(noReceive)} htmlFor="editModal" className="btn btn-xs btn-secondary">Edit</label>
                                            <p className='btn btn-xs btn-primary' onClick={() => handleAdmission(noReceive)} >Add</p>
                                            <p className='btn btn-xs btn-denger' onClick={() => handleClose(noReceive)} >Cl</p>
                                        </td>
                                        <td className='p-1 border-2'>
                                            <p className='btn btn-xs btn-primary' onClick={() => handleOnline(noReceive)} >On</p>
                                            <p className='btn btn-xs btn-denger' onClick={() => handleOffline(noReceive)} >Off</p>
                                            <p className='btn btn-xs btn-denger' onClick={() => handleSeminarInter(noReceive)} > S I </p>
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

export default NoReceive;