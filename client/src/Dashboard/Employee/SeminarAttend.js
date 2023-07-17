import { useQuery } from '@tanstack/react-query';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../contexts/AuthProvider';
import EditModal from './EditModal';

const SeminarAttend = () => {

    const { user } = useContext(AuthContext)
    const [search, setSearch] = useState("");
    const [leads, setLeads] = useState([])

    const [editData, setEdidData] = useState(null)
    const [sLead, setSLead] = useState()

    const [filterData, setFilterData] = useState([])
    const courseRef = useRef();
    const batchRef = useRef();
    const headRef = useRef();

    const { data: seminarAttends = [], refetch } = useQuery({
        queryKey: ['seminarAttends'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/leads?seminarAttend=true&user.name=${user.name}`);
            const data = await res.json();
            setFilterData(data)
            return data;
        }
    });


    // -------------Edit Start -------------
    const handleEdidData = (seminarAttend) => {
        console.log(seminarAttend)
        setSLead(seminarAttend)
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



    const handleAdmission = (seminarAttend) => {

        const admissionData = {
            admissionFee: 0,
            totalInstallment: 0,
            fristInstallment: 0,
            fristPaymentAccounts: "Payment Accounts",
            fristInstallmentTID: "0",
            fristInstallmentDate: "",
            admission: true,
            seminarAttend: false
        }

        fetch(`http://localhost:5000/update/${seminarAttend._id}`, {
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



    const handleClose = (seminarAttend) => {
        const closeData = {
            close: true,
            seminarAttend: false
        }

        fetch(`http://localhost:5000/update/${seminarAttend._id}`, {
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

    const handleOnline = (seminarAttend) => {

        const onlineInterested = {
            onlineInterested: true,
            seminarAttend: false
        }

        fetch(`http://localhost:5000/update/${seminarAttend._id}`, {
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

    const handleOffline = (seminarAttend) => {
        const offlineInterested = {
            offlineInterested: true,
            seminarAttend: false
        }


        fetch(`http://localhost:5000/update/${seminarAttend._id}`, {
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
        const fData = seminarAttends?.filter(si => si.course.name === courseRef.current.value || si.batch.name === batchRef.current.value || si.head.name === headRef.current.value)
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
        const fiData = seminarAttends.filter(si => formatedDate(si.createdAt) === value)
        setFilterData(fiData)

    }
    // -------------Date wise Filter End--------------------


    return (
        <div className='mx-2 my-6'>
            <h3 className="text-2xl mb-3">{user.name}'s Seminar Attend Students : {seminarAttends.length}</h3>

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

                <table className="table-fixed">
                    <thead className='sticky top-0 bg-slate-300' style={{ width: "1200px" }}>
                        <tr className='text-xs'>
                            <th className='p-1 border-2'>#</th>
                            <th className='p-1 border-2'>Date</th>
                            <th className='p-1 border-2'>C N</th>
                            <th className='p-1 border-2'>B N</th>
                            <th className='p-1 border-2'>U N</th>
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
                            <th className='p-1 border-2'>Interested</th>
                        </tr>
                    </thead>

                    <tbody className='text-xs'>
                        {
                            filterData.length > 0 &&
                            filterData?.filter((seminarAttend) => {
                                return search?.toLowerCase() === '' ? seminarAttend : seminarAttend.name.toLowerCase().includes(search?.toLowerCase()) || seminarAttend.phone.toLowerCase().includes(search?.toLowerCase()) || seminarAttend?.email?.toLowerCase().includes(search?.toLowerCase())
                            })
                                ?.map((seminarAttend, i) =>
                                    <tr>
                                        <th className='p-1 border-2'>{i + 1}</th>
                                        <td className='p-1 border-2'>{seminarAttend?.createdAt.slice(0, -14)}</td>
                                        <td className='p-1 border-2'>{seminarAttend?.course?.name}</td>
                                        <td className='p-1 border-2'>{seminarAttend?.batch?.name}</td>
                                        <td className='p-1 border-2'>{seminarAttend?.user?.name}</td>
                                        <td className='p-1 border-2'>{seminarAttend?.head?.name}</td>
                                        <td className='p-1 border-2'>{seminarAttend?.name}</td>
                                        <td className='p-1 border-2'>{seminarAttend?.phone?.split('p:', 2)}</td>
                                        <td className='p-1 border-2'>{seminarAttend?.email?.split('@', 1)}</td>
                                        <td className='p-1 border-2'>{seminarAttend?.firstFollow}</td>
                                        <td className='p-1 border-2'>{seminarAttend?.secondFollow}</td>
                                        <td className='p-1 border-2'>{seminarAttend?.thirdtFollow}</td>
                                        <td className='p-1 border-2'>{seminarAttend?.nextFollow}</td>
                                        <td className='p-1 border-2'>{seminarAttend?.remark}</td>
                                        <td className='p-1 border-2'>{seminarAttend?.remarkTwo}</td>
                                        <td className='p-1 border-2'>{seminarAttend?.admissionStatus}</td>
                                        <td className='p-1 border-2'>
                                            <label onClick={() => handleEdidData(seminarAttend)} htmlFor="editModal" className="btn btn-xs btn-secondary">Edit</label>
                                            <p className='btn btn-xs btn-primary' onClick={() => handleAdmission(seminarAttend)} >Add</p>
                                            <p className='btn btn-xs btn-denger' onClick={() => handleClose(seminarAttend)} >Cl</p>
                                            <br></br>
                                            {/* <p className='btn btn-xs btn-denger mt-2 mb-2' onClick={() => handleattend(seminarAttend)} > SA </p> */}
                                        </td>
                                        <td className='p-1 border-2'>
                                            <p className='btn btn-xs btn-primary' onClick={() => handleOnline(seminarAttend)} >On</p>
                                            <p className='btn btn-xs btn-denger' onClick={() => handleOffline(seminarAttend)} >Off</p>
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

export default SeminarAttend;