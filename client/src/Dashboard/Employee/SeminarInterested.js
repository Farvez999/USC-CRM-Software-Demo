import { useQuery } from '@tanstack/react-query';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import EditModal from './EditModal';
import { DownloadTableExcel } from 'react-export-table-to-excel';
import { FaFileDownload } from 'react-icons/fa';
import { AuthContext } from '../../contexts/AuthProvider';

const SeminarInterested = () => {

    const { user } = useContext(AuthContext)
    const tableRef = useRef(null);

    const [search, setSearch] = useState("");

    const [filterData, setFilterData] = useState([])
    const [sLead, setSLead] = useState()
    const [seminarInteresteds, setSeminarInteresteds] = useState([])
    const [uniquefilterData, setUniqueFilterData] = useState([])


    // const { data: seminarInteresteds = [], refetch } = useQuery({
    //     queryKey: ['seminarInteresteds', 'filterData'],
    //     queryFn: async () => {
    //         if (user._id) {
    //             const res = await
    //                 fetch(`https://demo-usc-crm-software.vercel.app/leads/?seminarInterested=true&user.name=${user.name}`, {
    //                     headers: {
    //                         authorization: `bearer ${localStorage.getItem('accessToken')}`
    //                     }
    //                 });
    //             const data = await res.json();
    //             setFilterData(data)
    //             return data;
    //         }
    //     }
    // });

    const refetchUpdateData = async () => {
        const res = await fetch(`https://demo-usc-crm-software.vercel.app/leads/?seminarInterested=true&user.name=${user.name}`);
        const data = await res.json();

        let afterFilter = []
        filterData.forEach(sData => {
            const ssData = data.filter(d => d?._id === sData?._id)
            afterFilter = [...afterFilter, ...ssData]
        })
        // console.log(afterFilter)
        // console.log(filterData)
        setFilterData(afterFilter)
    }


    useEffect(() => {
        fetch(`https://demo-usc-crm-software.vercel.app/leads/?seminarInterested=true&user.name=${user.name}`)
            .then(response => response.json())
            .then(data => {
                setFilterData(data)
                setUniqueFilterData(data)
                setSeminarInteresteds(data)
                return data;

            })

    }, [user.name])



    // -------------Edit Start -------------
    const handleEdidData = (seminarInterested) => {
        setSLead(seminarInterested)
    }

    const [leadsUpdate, setLeadsUpdate] = useState()

    // -------------Edit End -------------



    const handleAdmission = (seminarInterested) => {

        const confirmDelete = window.confirm('Are you sure you want to Admission this Student?');
        if (!confirmDelete) {
            return;
        }

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

        fetch(`https://demo-usc-crm-software.vercel.app/update/${seminarInterested._id}`, {
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
                let lData = filterData.filter(lead => lead._id !== seminarInterested._id)
                setFilterData(lData)
            })

    }



    const handleClose = (seminarInterested) => {

        const confirmDelete = window.confirm('Are you sure you want to Close Admission this Student?');
        if (!confirmDelete) {
            return;
        }

        const closeData = {
            close: true,
            seminarInterested: false
        }

        fetch(`https://demo-usc-crm-software.vercel.app/update/${seminarInterested._id}`, {
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
                let lData = filterData.filter(lead => lead._id !== seminarInterested._id)
                setFilterData(lData)
            })
    }

    const handleattend = ((seminarInterested) => {

        const confirmDelete = window.confirm('Are you sure you want to Seminar Attend this Student?');
        if (!confirmDelete) {
            return;
        }

        const seminarAttend = {
            seminarAttend: true,
            seminarInterested: false
        }

        fetch(`https://demo-usc-crm-software.vercel.app/update/${seminarInterested._id}`, {
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
                let lData = filterData.filter(lead => lead._id !== seminarInterested._id)
                setFilterData(lData)
            })
    })

    const handleOnline = (seminarInterested) => {

        const confirmDelete = window.confirm('Are you sure you want to Online Admission this Student?');
        if (!confirmDelete) {
            return;
        }

        const onlineInterested = {
            onlineInterested: true,
            seminarInterested: false
        }

        fetch(`https://demo-usc-crm-software.vercel.app/update/${seminarInterested._id}`, {
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
                let lData = filterData.filter(lead => lead._id !== seminarInterested._id)
                setFilterData(lData)
            })
    }

    const handleOffline = (seminarInterested) => {

        const confirmDelete = window.confirm('Are you sure you want to Offline Admission this Student?');
        if (!confirmDelete) {
            return;
        }
        const offlineInterested = {
            offlineInterested: true,
            seminarInterested: false
        }


        fetch(`https://demo-usc-crm-software.vercel.app/update/${seminarInterested._id}`, {
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
                let lData = filterData.filter(lead => lead._id !== seminarInterested._id)
                setFilterData(lData)
            })
    }




    // -----------------Filter Start--------------------

    const [selectedValue, setSelectedValue] = useState([]);
    // console.log(selectedValue)

    const uniqueCourse = [...new Set(uniquefilterData?.map(user => user?.course?.name))];

    const uniqueBatch = [...new Set(selectedValue?.map(user => user?.batch?.name))];

    const uniqueHead = [...new Set(selectedValue?.map(user => user?.head?.name))];


    function handleCourseChange(event) {
        const couseSelectedValue = event.target.value;
        const fData = uniquefilterData?.filter(si =>
            (si.course.name) === couseSelectedValue)
        setFilterData(fData)
        setSelectedValue(fData);
    }

    function handleBatchChange(event) {
        const selectedBatchValue = event.target.value;
        const fData = uniquefilterData?.filter(si =>
            (si.batch.name) === selectedBatchValue)
        setFilterData(fData)
    }

    function handleHeadChange(event) {
        const selectedHeadValue = event.target.value;
        const fData = uniquefilterData?.filter(si =>
            (si.head.name) === selectedHeadValue)
        setFilterData(fData)
    }

    // -----------------Filter End--------------------

    // -------------Date wise Filter Start--------------------
    function formatedDate(date) {
        return new Date(date).toISOString().slice(0, -14);
    }

    const handleInputChange = event => {
        const value = event.target.value;
        // console.log(value);
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
                    <select onChange={handleCourseChange} className="select select-sm w-full border-gray-400">
                        <option>Course Name</option>
                        {uniqueCourse.map(value => (
                            <option key={value._id} value={value}>
                                {value}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-control mx-2">
                    <label className="label">
                        <span className="label-text">Batch Name</span>
                    </label>
                    <select onChange={handleBatchChange} className="select select-sm w-full border-gray-400">
                        <option>Batch Name</option>
                        {uniqueBatch.map(value => (
                            <option key={value._id} value={value}>
                                {value}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-control mx-2">
                    <label className="label">
                        <span className="label-text">Head Name</span>
                    </label>
                    <select onChange={handleHeadChange} className="select select-sm w-full border-gray-400">
                        <option >Head Name</option>
                        {uniqueHead.map(value => (
                            <option key={value._id} value={value}>
                                {value}
                            </option>
                        ))}
                    </select>
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
                                    <tr>
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
                    refetchUpdateData={refetchUpdateData}
                >
                </EditModal>
            }
        </div>
    );
};

export default SeminarInterested;