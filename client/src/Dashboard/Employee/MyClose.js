import { useQuery } from '@tanstack/react-query';
import React, { useContext, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import EditModal from './EditModal';
import { AuthContext } from '../../contexts/AuthProvider';
import { FaFileDownload } from 'react-icons/fa';
import { DownloadTableExcel } from 'react-export-table-to-excel';

const MyClose = () => {

    const { user } = useContext(AuthContext)
    const [search, setSearch] = useState("");
    const [filterData, setFilterData] = useState([]);

    const [sLead, setSLead] = useState()

    const courseRef = useRef();
    const batchRef = useRef();
    const headRef = useRef();
    const tableRef = useRef(null);

    const { data: closes = [], refetch } = useQuery({
        queryKey: ['closes'],
        queryFn: async () => {
            const res = await fetch(`https://demo-usc-crm-server.vercel.app/leads?close=true&user.name=${user.name}`);
            const data = await res.json();

            // let lData = data.filter(lead => lead.admission !== true && lead.onlineInterested !== true && lead.offlineInterested !== true && lead.seminarInterested !== true)
            setFilterData(data)

            return data;
        }
    });


    // -------------Edit Start -------------
    const handleEdidData = (close) => {
        setSLead(close)
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

    const handleAdmission = (close) => {

        const admissionData = {
            admission: true,
            admissionFee: 0,
            totalInstallment: 0,
            fristInstallment: 0,
            fristPaymentAccounts: "Payment Accounts",
            fristInstallmentTID: "0",
            fristInstallmentDate: "",
            offlineInterested: false,
            onlineInterested: false,
            seminarInterested: false,
            close: false
        }

        fetch(`https://demo-usc-crm-server.vercel.app/update/${close._id}`, {
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

    const handleOnline = (close) => {
        const onlineInterested = {
            onlineInterested: true,
            admission: false,
            offlineInterested: false,
            seminarInterested: false,
            close: false
        }

        fetch(`https://demo-usc-crm-server.vercel.app/update/${close._id}`, {
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

    const handleOffline = (close) => {
        const offlineInterested = {
            offlineInterested: true,
            onlineInterested: false,
            admission: false,
            seminarInterested: false,
            close: false
        }

        fetch(`https://demo-usc-crm-server.vercel.app/update/${close._id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(offlineInterested)
        })
            .then(res => res.json())
            .then(data => {
                toast.success('Offline Course Interested')
                refetch()
            })
    }

    const handleSeminarInterested = (close) => {
        const seminarInterested = {
            seminarInterested: true,
            offlineInterested: false,
            onlineInterested: false,
            admission: false,
            close: false
        }

        fetch(`https://demo-usc-crm-server.vercel.app/update/${close._id}`, {
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
        const fData = closes?.filter(si => si.course.name === courseRef.current.value || si.batch.name === batchRef.current.value || si.head.name === headRef.current.value)
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
        const fiData = closes.filter(si => formatedDate(si.updatedAt) === value)
        setFilterData(fiData)

    }



    return (
        <div className='mx-2 my-6'>
            <h3 className="text-2xl mb-3">{user.name}'s Close Students : {closes.length}</h3>

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


                <div className='mt-10 mx-4'>
                    <input type="text" className="input input-bordered input-sm w-full max-w-xs mb-3" onChange={(e) => setSearch(e.target.value)} placeholder='Search By Name, Phone, Email'></input>
                </div>

                <DownloadTableExcel
                    filename="users table"
                    sheet="users"
                    currentTableRef={tableRef.current}
                >

                    <button className='mt-6 btn btn-sm btn-outline'>Download<FaFileDownload className='inline-block'></FaFileDownload></button>

                </DownloadTableExcel>
            </div>



            <div className="overflow-auto" style={{ height: '430px' }}>
                <form>
                    <table className="table-fixed">
                        <thead>
                            <tr className='text-xs sticky top-0 bg-slate-300'>
                                <th className='p-1 border-2'>#</th>
                                <th className='p-1 border-2'>Date</th>
                                <th className='p-1 border-2'>Course Name</th>
                                <th className='p-1 border-2'>Batch Name</th>
                                <th className='p-1 border-2'>User Name</th>
                                <th className='p-1 border-2'>Head Name</th>
                                <th className='p-1 border-2'>Name</th>
                                <th className='p-1 border-2'>Phone</th>
                                <th className='p-1 border-2'>Email</th>
                                <th className='p-1 border-2'>Action</th>
                                <th className='p-1 border-2'>Interested</th>
                            </tr>
                        </thead>
                        <tbody className='text-xs'>

                            {
                                filterData.length > 0 &&
                                filterData?.filter((close) => {
                                    return search?.toLowerCase() === '' ? close : close.name.toLowerCase().includes(search?.toLowerCase()) || close.phone.toLowerCase().includes(search?.toLowerCase()) || close?.email?.toLowerCase().includes(search?.toLowerCase())
                                })
                                    ?.map((close, i) => (
                                        <tr>
                                            <th className='p-1 border-2'>{i + 1}</th>
                                            <td className='p-1 border-2'>{close?.updatedAt.slice(0, -14)}</td>
                                            <td className='p-1 border-2'>{close?.course?.name}</td>
                                            <td className='p-1 border-2'>{close?.batch?.name}</td>
                                            <td className='p-1 border-2'>{close?.user?.name}</td>
                                            <td className='p-1 border-2'>{close?.head?.name}</td>
                                            <td className='p-1 border-2'>{close?.name}</td>
                                            <td className='p-1 border-2'>{close?.phone?.split('p:', 2)}</td>
                                            <td className='p-1 border-2'>{close?.email?.split('@', 1)}</td>
                                            <td className='p-1 border-2'>
                                                <label onClick={() => handleEdidData(close)} htmlFor="editModal" className="btn btn-xs btn-secondary mt-2">Edit</label>
                                                <p className='btn btn-xs btn-primary my-2' onClick={() => handleAdmission(close)} >Add</p>
                                                {/* <p className='btn btn-xs btn-denger' onClick={() => handleClose(close)} >Cl</p>
                                                <br></br> */}

                                            </td>
                                            <td className='p-1 border-2'>
                                                <p className='btn btn-xs btn-primary my-2' onClick={() => handleOnline(close)} >On</p>
                                                <p className='btn btn-xs btn-denger' onClick={() => handleOffline(close)} >Off</p>
                                                <p className='btn btn-xs btn-denger mt-2 mb-2' onClick={() => handleSeminarInterested(close)} > S Inter </p>
                                            </td>
                                        </tr>
                                    )

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

export default MyClose;