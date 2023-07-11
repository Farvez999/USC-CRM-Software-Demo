import { useQuery } from '@tanstack/react-query';
import React, { useContext, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import EditModal from './EditModal';
import { DownloadTableExcel } from 'react-export-table-to-excel';
import { FaFileDownload } from 'react-icons/fa';
import { AuthContext } from '../../contexts/AuthProvider';

const SeminarInterested = () => {

    const { user } = useContext(AuthContext)
    console.log(user)
    const tableRef = useRef(null);

    const [search, setSearch] = useState("");

    const [filterData, setFilterData] = useState([])
    const [sLead, setSLead] = useState()

    const courseRef = useRef();
    const batchRef = useRef();
    const headRef = useRef();


    const { data: seminarInteresteds = [], refetch } = useQuery({
        queryKey: ['seminarInteresteds', 'filterData'],
        queryFn: async () => {
            if (user._id) {
                const res = await
                    fetch(`http://localhost:5000/leads/?seminarInterested=true&user.name=${user.name}`, {
                        headers: {
                            authorization: `bearer ${localStorage.getItem('accessToken')}`
                        }
                    });
                const data = await res.json();
                setFilterData(data)
                return data;
            }
        }
    });



    // -------------Edit Start -------------
    const handleEdidData = (seminarInterested) => {
        setSLead(seminarInterested)
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



    const handleAdmission = (seminarInterested) => {

        const admissionData = {
            admissionFee: 0,
            totalInstallment: 0,
            fristInstallment: 0,
            fristPaymentAccounts: "Payment Accounts",
            fristInstallmentTID: "0",
            fristInstallmentDate: "",
            admission: true,
            seminarInterested: false
        }

        fetch(`http://localhost:5000/update/${seminarInterested._id}`, {
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
            seminarInterested: false
        }

        fetch(`http://localhost:5000/update/${offline._id}`, {
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

    const handleattend = ((seminarInterested) => {

        const seminarAttend = {
            seminarAttend: true,
            seminarInterested: false
        }

        fetch(`http://localhost:5000/update/${seminarInterested._id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(seminarAttend)
        })
            .then(res => res.json())
            .then(data => {
                toast.success('Seminar Attend Submission')
                refetch()
            })
    })

    const handleOnline = (seminarInterested) => {

        const onlineInterested = {
            onlineInterested: true,
            seminarInterested: false
        }

        fetch(`http://localhost:5000/update/${seminarInterested._id}`, {
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

    const handleOffline = (seminarInterested) => {
        const offlineInterested = {
            offlineInterested: true,
            seminarInterested: false
        }


        fetch(`http://localhost:5000/update/${seminarInterested._id}`, {
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
        const fData = seminarInteresteds?.filter(si => si.course.name === courseRef.current.value || si.batch.name === batchRef.current.value || si.head.name === headRef.current.value)
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
        const fiData = seminarInteresteds.filter(si => formatedDate(si.createdAt) === value)
        setFilterData(fiData)

    }
    // -------------Date wise Filter End--------------------


    return (
        <div className='mx-2 my-6'>
            <h3 className="text-2xl mb-3">{user.name}'s Seminar Interested Students : {seminarInteresteds.length}</h3>



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

                <div className='mt-10 mx-2'>
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


                <table className="table-fixed" ref={tableRef}>
                    <thead>
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
                            <th className='p-1 border-2'>Interested</th>
                        </tr>
                    </thead>

                    <tbody className='text-xs'>
                        {
                            filterData.length > 0 &&
                            filterData?.filter((seminarInterested) => {
                                return search?.toLowerCase() === '' ? seminarInterested : seminarInterested.name.toLowerCase().includes(search?.toLowerCase()) || seminarInterested.phone.toLowerCase().includes(search?.toLowerCase()) || seminarInterested?.email?.toLowerCase().includes(search?.toLowerCase())
                            })
                                ?.map((seminarInterested, i) =>
                                    <tr className='text-xs sticky top-0 bg-slate-300'>
                                        <th className='p-1 border-2'>{i + 1}</th>
                                        <td className='p-1 border-2'>{seminarInterested.createdAt.slice(0, -14)}</td>
                                        {/* <td className='p-1 border-2'>{seminarInterested.course.name}</td> */}
                                        <td className='p-1 border-2'>{seminarInterested.batch.name}</td>
                                        {/* <td className='p-1 border-2'>{seminarInterested.user.name}</td> */}
                                        <td className='p-1 border-2'>{seminarInterested?.head?.name}</td>
                                        <td className='p-1 border-2'>{seminarInterested?.name}</td>
                                        <td className='p-1 border-2'>{seminarInterested?.phone?.split('p:', 2)}</td>
                                        <td className='p-1 border-2'>{seminarInterested?.email?.split('@', 1)}</td>
                                        <td className='p-1 border-2'>{seminarInterested?.firstFollow}</td>
                                        <td className='p-1 border-2'>{seminarInterested?.secondFollow}</td>
                                        <td className='p-1 border-2'>{seminarInterested?.thirdtFollow}</td>
                                        <td className='p-1 border-2'>{seminarInterested?.nextFollow}</td>
                                        <td className='p-1 border-2'>{seminarInterested?.remark}</td>
                                        <td className='p-1 border-2'>{seminarInterested?.remarkTwo}</td>
                                        <td className='p-1 border-2'>{seminarInterested?.admissionStatus}</td>
                                        <td className='p-1 border-2'>
                                            <label onClick={() => handleEdidData(seminarInterested)} htmlFor="editModal" className="btn btn-xs btn-secondary mt-2">Edit</label>
                                            <p className='btn btn-xs btn-primary my-2' onClick={() => handleAdmission(seminarInterested)} >Add</p>
                                            <p className='btn btn-xs btn-denger' onClick={() => handleClose(seminarInterested)} >Cl</p>
                                        </td>
                                        <td className='p-1 border-2'>
                                            <p className='btn btn-xs btn-primary my-2' onClick={() => handleOnline(seminarInterested)} >On</p>
                                            <p className='btn btn-xs btn-denger' onClick={() => handleOffline(seminarInterested)} >Off</p>
                                            <p className='btn btn-xs btn-denger mt-2 mb-2' onClick={() => handleattend(seminarInterested)} > SA </p>
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

export default SeminarInterested;