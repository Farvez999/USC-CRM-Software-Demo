import React, { useContext, useRef, useState } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';
import { toast } from 'react-hot-toast';
import EditModal from './EditModal';
import { useQuery } from '@tanstack/react-query';
import { DownloadTableExcel } from 'react-export-table-to-excel';
import { FaFileDownload } from 'react-icons/fa';
import axios from 'axios';

const MyLead = () => {

    const tableRef = useRef(null);

    const { user } = useContext(AuthContext)
    const [search, setSearch] = useState("");


    const [sLead, setSLead] = useState()
    const [filterData, setFilterData] = useState([])

    const courseRef = useRef();
    const batchRef = useRef();
    const headRef = useRef();


    const { data: allleads = [], refetch } = useQuery({
        queryKey: ['allleads', user],
        queryFn: async () => {
            if (user._id) {
                const res = await fetch(`https://demo-usc-crm-server.vercel.app/leads/${user._id}`);
                const data = await res.json();

                let lData = data.filter(lead => lead.admission !== true && lead.close !== true && lead.onlineInterested !== true && lead.offlineInterested !== true && lead.seminarInterested !== true && lead.noReceive !== true)
                setFilterData(lData)

                return data;
            }
        }
    });


    // -------------Edit Start -------------

    const handleEdidData = (singleLead) => {
        setSLead(singleLead)
        console.log(singleLead)
    }

    const [leadsUpdate, setLeadsUpdate] = useState()

    // const handleUpdate = (event) => {
    //     event.preventDefault();

    //     fetch(`https://demo-usc-crm-server.vercel.app/update/${sLead._id}`, {
    //         method: 'PATCH', // or 'PUT'
    //         headers: {
    //             "Content-Type": "application/json",
    //             // authorization: localStorage.getItem('access_token')
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


    const handleAdmission = (singleLead) => {

        const admissionData = {
            admission: true,
            admissionFee: 0,
            totalInstallment: 0,
            fristInstallment: 0,
            fristPaymentAccounts: "Payment Accounts",
            fristInstallmentTID: "0",
            fristInstallmentDate: "",
        }

        fetch(`https://demo-usc-crm-server.vercel.app/update/${singleLead._id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                authorization: localStorage.getItem('access_token')
            },
            body: JSON.stringify(admissionData)
        })
            .then(res => res.json())
            .then(data => {
                toast.success('Admisstion Data added successfully')

                let lData = filterData.filter(lead => lead._id !== singleLead._id)
                setFilterData(lData)
                refetch()

            })
    }



    const handleClose = (singleLead) => {
        const closeData = {
            close: true
        }

        fetch(`https://demo-usc-crm-server.vercel.app/update/${singleLead._id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                authorization: localStorage.getItem('access_token')
            },
            body: JSON.stringify(closeData)
        })
            .then(res => res.json())
            .then(data => {
                toast.success('Lead Close successfully')
                refetch()
            })
    }


    const handleOnline = (singleLead) => {
        const onlineInterested = {
            onlineInterested: true
        }

        fetch(`https://demo-usc-crm-server.vercel.app/update/${singleLead._id}`, {
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


    const handleOffline = (singleLead) => {
        const offlineInterested = {
            offlineInterested: true
        }

        fetch(`https://demo-usc-crm-server.vercel.app/update/${singleLead._id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                authorization: localStorage.getItem('access_token')
            },
            body: JSON.stringify(offlineInterested)
        })
            .then(res => res.json())
            .then(data => {
                toast.success('Offline Course Interested')
            })
    }

    const handleSeminarInterested = (singleLead) => {
        const seminarInterested = {
            seminarInterested: true
        }

        fetch(`https://demo-usc-crm-server.vercel.app/update/${singleLead._id}`, {
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

    const handleNoRecice = (singleLead) => {
        const noReceive = {
            noReceive: true
        }

        fetch(`https://demo-usc-crm-server.vercel.app/update/${singleLead._id}`, {
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
        const fData = allleads?.filter(si => si.course.name === courseRef.current.value || si.batch.name === batchRef.current.value || si.head.name === headRef.current.value)
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
        const fiData = allleads.filter(si => formatedDate(si.createdAt) === value)
        setFilterData(fiData)
    }
    // -------------Date wise Filter End--------------------

    return (
        <div className='mx-2 my-6'>
            <h3 className="text-2xl mb-3">{user.name}'s Leads : {allleads.length}</h3>

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




            <div >
                <div className="overflow-x-auto w-full">
                    <form>
                        <table className="table-fixed text-xs">
                            <thead>
                                <tr className='text-xs sticky top-0 bg-slate-300'>
                                    <th className='p-1 border-2'>#</th>
                                    <th className='p-1 border-2'>B N</th>
                                    <th className='p-1 border-2'>Date</th>
                                    <th className='p-1 border-2'>Name</th>
                                    <th className='p-1 border-2'>Phone</th>
                                    <th className='p-1 border-2'>Email</th>
                                    <th className='p-1 border-2'>1st F up</th>
                                    <th className='p-1 border-2'>2nd F up</th>
                                    <th className='p-1 border-2'>3rd F up</th>
                                    <th className='p-1 border-2'>Next F D</th>
                                    <th className='p-1 border-2'>Remark</th>
                                    <th className='p-1 border-2'>Remark 2</th>
                                    <th className='p-1 border-2'>Ad Status</th>
                                    <th className='p-1 border-2'>Action</th>
                                    <th className='p-1 border-2'>Interested</th>
                                    <th className='p-1 border-2'>Seminar</th>
                                </tr>

                            </thead>
                            <tbody className='text-sx'>

                                {
                                    filterData.length > 0 &&
                                    filterData?.filter(singleLead => {
                                        return search?.toLowerCase() === '' ? singleLead : singleLead.name.toLowerCase().includes(search?.toLowerCase()) || singleLead?.email?.toLowerCase().includes(search?.toLowerCase()) || singleLead.phone.toLowerCase().includes(search?.toLowerCase())
                                    })?.map((singleLead, i) => (
                                        <tr>
                                            <th className='p-1 border-2'>{i + 1}</th>
                                            <td className='p-1 border-2'>{singleLead?.batch?.name}</td>
                                            <td className='p-1 border-2'>{singleLead?.createdAt.slice(0, -14)}</td>
                                            <td className='p-1 border-2'>{singleLead?.name}</td>
                                            <td className='p-1 border-2'>{singleLead?.phone?.split('p:', 2)}</td>
                                            <td className='p-1 border-2'>{singleLead?.email?.split('@', 1)}</td>
                                            <td className='p-1 border-2'>{singleLead?.firstFollow}</td>
                                            <td className='p-1 border-2'>{singleLead?.secondFollow}</td>
                                            <td className='p-1 border-2'>{singleLead?.thirdtFollow}</td>
                                            <td className='p-1 border-2'>{singleLead?.nextFollow}</td>
                                            <td className='p-1 border-2'>{singleLead?.remark}</td>
                                            <td className='p-1 border-2'>{singleLead?.remarkTwo}</td>
                                            <td className='p-1 border-2'>{singleLead?.admissionStatus}</td>
                                            <td className='p-1 border-2'>
                                                <label onClick={() => handleEdidData(singleLead)} htmlFor="editModal" className="btn btn-xs btn-secondary">Edit</label>
                                                <p className='btn btn-xs btn-primary my-2' onClick={() => handleAdmission(singleLead)} >Add</p>
                                                <p className='btn btn-xs btn-denger' onClick={() => handleClose(singleLead)} >Cl</p>
                                            </td>
                                            <td className='p-1 border-2'>
                                                <p className='btn btn-xs btn-primary my-2' onClick={() => handleOnline(singleLead)} >On</p>
                                                <p className='btn btn-xs btn-denger' onClick={() => handleOffline(singleLead)} >Off</p>
                                            </td>
                                            <td className='p-1 border-2'>
                                                <p className='text-xs btn btn-xs btn-primary my-2' onClick={() => handleSeminarInterested(singleLead)} >Inter</p>
                                                <p className='text-xs btn btn-xs btn-primary my-2' onClick={() => handleNoRecice(singleLead)}>No R</p>
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
        </div>
    );


};



export default MyLead;