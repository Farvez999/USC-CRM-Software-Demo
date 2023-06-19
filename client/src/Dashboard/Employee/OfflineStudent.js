import { useQuery } from '@tanstack/react-query';
import React, { useContext, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import EditModal from './EditModal';
import { AuthContext } from '../../contexts/AuthProvider';

const OfflineStudent = () => {
    const [search, setSearch] = useState("");
    const { user } = useContext(AuthContext)
    const [editData, setEdidData] = useState(null)
    const [sLead, setSLead] = useState()

    const [filterData, setFilterData] = useState([])
    const courseRef = useRef();
    const batchRef = useRef();
    const headRef = useRef();

    const { data: offlines = [], refetch } = useQuery({
        queryKey: ['offlines'],
        queryFn: async () => {
            const res = await fetch(`https://demo-usc-crm-server.vercel.app/leads?offlineInterested=true&user.name=${user.name}`);
            const data = await res.json();
            setFilterData(data)
            return data;
        }
    });


    // -------------Edit Start -------------
    const handleEdidData = (offline) => {
        setSLead(offline)
    }

    const [leadsUpdate, setLeadsUpdate] = useState()

    // const handleUpdate = (event) => {
    //     event.preventDefault();

    //     fetch(`https://demo-usc-crm-server.vercel.app/update/${sLead._id}`, {
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


    const handleOnline = (offline) => {
        const onlineInterested = {
            onlineInterested: true,
            offlineInterested: false,
        }

        fetch(`https://demo-usc-crm-server.vercel.app/update/${offline._id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                authorization: localStorage.getItem('access_token')
            },
            body: JSON.stringify(onlineInterested)
        })
            .then(res => res.json())
            .then(data => {
                toast.success('Online Course Interested')
                refetch()
            })
    }


    const handleAdmission = (offline) => {

        const admissionData = {
            admissionFee: 0,
            totalInstallment: 0,
            fristInstallment: 0,
            fristPaymentAccounts: "Payment Accounts",
            fristInstallmentTID: "0",
            fristInstallmentDate: "",
            admission: true,
            offlineInterested: false
        }


        fetch(`https://demo-usc-crm-server.vercel.app/update/${offline._id}`, {

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



    const handleClose = (offline) => {
        const closeData = {
            close: true,
            offlineInterested: false
        }


        fetch(`https://demo-usc-crm-server.vercel.app/update/${offline._id}`, {
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


    const handleSeminarInterested = (online) => {
        const seminarInterested = {
            seminarInterested: true
        }

        fetch(`https://demo-usc-crm-server.vercel.app/update/${online._id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                authorization: localStorage.getItem('access_token')
            },
            body: JSON.stringify(seminarInterested)
        })
            .then(res => res.json())
            .then(data => {
                toast.success('Seminar Interested Added')
                refetch()
            })
    }

    const handleNoRecice = (online) => {
        const noReceive = {
            noReceive: true
        }

        fetch(`https://demo-usc-crm-server.vercel.app/update/${online._id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                authorization: localStorage.getItem('access_token')
            },
            body: JSON.stringify(noReceive)
        })
            .then(res => res.json())
            .then(data => {
                toast.success('No Recived Added')
                refetch()
            })
    }

    // -----------------Filter Start--------------------

    const { data: coursesName = [] } = useQuery({
        queryKey: ['coursesName'],
        queryFn: async () => {

            const res = await fetch(`https://demo-usc-crm-server.vercel.app/course`);
            const data = await res.json();
            return data;
        }
    });

    const { data: batchsName = [] } = useQuery({
        queryKey: ['batchsName'],
        queryFn: async () => {

            const res = await fetch(`https://demo-usc-crm-server.vercel.app/batch`);
            const data = await res.json();
            return data;
        }
    });

    const { data: headsName = [] } = useQuery({
        queryKey: ['headsName'],
        queryFn: async () => {

            const res = await fetch(`https://demo-usc-crm-server.vercel.app/head`);

            const data = await res.json();
            return data;
        }
    });


    const handleSearch = () => {
        const fData = offlines?.filter(si => si.course.name === courseRef.current.value || si.batch.name === batchRef.current.value || si.head.name === headRef.current.value)
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
        const fiData = offlines.filter(si => formatedDate(si.createdAt) === value)
        setFilterData(fiData)

    }
    // -------------Date wise Filter End--------------------

    return (
        <div className='mx-2 my-6'>
            <h3 className="text-2xl mb-3">{user.name}'s Offline Students : {offlines.length}</h3>

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
                <form>
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
                                <th className='p-1 border-2'>Seminar</th>
                            </tr>
                        </thead>
                        <tbody className='text-xs'>

                            {
                                filterData.length > 0 &&
                                filterData?.filter((offline) => {
                                    return search?.toLowerCase() === '' ? offline : offline.name.toLowerCase().includes(search?.toLowerCase()) || offline.phone.toLowerCase().includes(search?.toLowerCase()) || offline?.email?.toLowerCase().includes(search?.toLowerCase())
                                })
                                    ?.map((offline, i) =>
                                        <tr>
                                            <th className='p-1 border-2'>{i + 1}</th>
                                            <td className='p-1 border-2'>{offline.createdAt.slice(0, -14)}</td>
                                            {/* <td className='p-1 border-2'>{offline.course.name}</td> */}
                                            <td className='p-1 border-2'>{offline.batch.name}</td>
                                            {/* <td className='p-1 border-2'>{offline.user.name}</td> */}
                                            <td className='p-1 border-2'>{offline?.head?.name}</td>
                                            <td className='p-1 border-2'>{offline?.name}</td>
                                            <td className='p-1 border-2'>{offline?.phone?.split('p:', 2)}</td>
                                            <td className='p-1 border-2'>{offline?.email?.split('@', 1)}</td>
                                            <td className='p-1 border-2'>{offline?.firstFollow}</td>
                                            <td className='p-1 border-2'>{offline?.secondFollow}</td>
                                            <td className='p-1 border-2'>{offline?.thirdtFollow}</td>
                                            <td className='p-1 border-2'>{offline?.nextFollow}</td>
                                            <td className='p-1 border-2'>{offline?.remark}</td>
                                            <td className='p-1 border-2'>{offline?.remarkTwo}</td>
                                            <td className='p-1 border-2'>{offline?.offlineStatus}</td>
                                            <td className='p-1 border-2'>
                                                <label onClick={() => handleEdidData(offline)} htmlFor="editModal" className="btn btn-xs btn-secondary">Edit</label>
                                                <p className='btn btn-xs btn-primary my-2' onClick={() => handleOnline(offline)} >On</p>
                                                <p className='btn btn-xs btn-primary' onClick={() => handleAdmission(offline)} >Add</p>
                                                <p className='btn btn-xs btn-denger' onClick={() => handleClose(offline)} >Cl</p>
                                            </td>
                                            <td className='p-1 border-2'>
                                                <p className='text-xs btn btn-xs btn-primary my-2' onClick={() => handleSeminarInterested(offline)} >Inter</p>
                                                <p className='text-xs btn btn-xs btn-primary my-2' onClick={() => handleNoRecice(offline)}>No R</p>
                                            </td>

                                        </tr>
                                    )
                            }

                        </tbody>

                    </table>
                </form>
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

export default OfflineStudent;