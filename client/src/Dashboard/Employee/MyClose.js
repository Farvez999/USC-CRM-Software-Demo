import { useQuery } from '@tanstack/react-query';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import EditModal from './EditModal';
import { AuthContext } from '../../contexts/AuthProvider';
import { FaFileDownload } from 'react-icons/fa';
import { DownloadTableExcel } from 'react-export-table-to-excel';

const MyClose = () => {

    const { user } = useContext(AuthContext)
    const [search, setSearch] = useState("");
    const [filterData, setFilterData] = useState([]);
    const [closes, setCloses] = useState([])
    const [uniquefilterData, setUniqueFilterData] = useState([])

    const [sLead, setSLead] = useState()

    const tableRef = useRef(null);

    // const { data: closes = [], refetch } = useQuery({
    //     queryKey: ['closes'],
    //     queryFn: async () => {
    //         const res = await fetch(`https://demo-usc-crm-software.vercel.app/leads?close=true&user.name=${user.name}`);
    //         const data = await res.json();

    //         // let lData = data.filter(lead => lead.admission !== true && lead.onlineInterested !== true && lead.offlineInterested !== true && lead.seminarInterested !== true)
    //         setFilterData(data)

    //         return data;
    //     }
    // });

    const refetchUpdateData = async () => {
        const res = await fetch(`https://demo-usc-crm-software.vercel.app/leads?close=true&user.name=${user.name}`);
        const data = await res.json();

        let afterFilter = []
        filterData.forEach(sData => {
            const ssData = data.filter(d => d?._id === sData?._id)
            afterFilter = [...afterFilter, ...ssData]
        })
        console.log(afterFilter)
        console.log(filterData)
        setFilterData(afterFilter)
    }

    useEffect(() => {
        fetch(`https://demo-usc-crm-software.vercel.app/leads?close=true&user.name=${user.name}`)
            .then(response => response.json())
            .then(data => {
                setFilterData(data)
                setUniqueFilterData(data)
                setCloses(data)
                return data;

            })

    }, [user.name])


    // -------------Edit Start -------------
    const handleEdidData = (close) => {
        setSLead(close)
    }

    const [leadsUpdate, setLeadsUpdate] = useState()

    // -------------Edit End -------------

    const handleAdmission = (close) => {

        const confirmDelete = window.confirm('Are you sure you want to Admission this Student?');
        if (!confirmDelete) {
            return;
        }

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

        fetch(`https://demo-usc-crm-software.vercel.app/update/${close._id}`, {
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
                let lData = filterData.filter(lead => lead._id !== close._id)
                setFilterData(lData)
            })

    }

    const handleOnline = (close) => {

        const confirmDelete = window.confirm('Are you sure you want to Online Admission this Student?');
        if (!confirmDelete) {
            return;
        }
        const onlineInterested = {
            onlineInterested: true,
            admission: false,
            offlineInterested: false,
            seminarInterested: false,
            close: false
        }

        fetch(`https://demo-usc-crm-software.vercel.app/update/${close._id}`, {
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
                let lData = filterData.filter(lead => lead._id !== close._id)
                setFilterData(lData)
            })
    }

    const handleOffline = (close) => {

        const confirmDelete = window.confirm('Are you sure you want to Offline Admission this Student?');
        if (!confirmDelete) {
            return;
        }
        const offlineInterested = {
            offlineInterested: true,
            onlineInterested: false,
            admission: false,
            seminarInterested: false,
            close: false
        }

        fetch(`https://demo-usc-crm-software.vercel.app/update/${close._id}`, {
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
                let lData = filterData.filter(lead => lead._id !== close._id)
                setFilterData(lData)
            })
    }

    const handleSeminarInterested = (close) => {

        const confirmDelete = window.confirm('Are you sure you want to Seminar Interest this Student?');
        if (!confirmDelete) {
            return;
        }
        const seminarInterested = {
            seminarInterested: true,
            offlineInterested: false,
            onlineInterested: false,
            admission: false,
            close: false
        }

        fetch(`https://demo-usc-crm-software.vercel.app/update/${close._id}`, {
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
                let lData = filterData.filter(lead => lead._id !== close._id)
                setFilterData(lData)
            })
    }


    // -----------------Filter Start--------------------

    const [selectedValue, setSelectedValue] = useState([]);
    console.log(selectedValue)

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
                {/* <div className='mt-8'>
                    <button
                        onClick={handleSearch}
                        className="btn btn-sm btn-primary text-white bg-green-500"
                    >
                        Filter
                    </button>
                </div> */}


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
                                <th className='p-1 border-2'>1st F up</th>
                                <th className='p-1 border-2'>2nd F up</th>
                                <th className='p-1 border-2'>3rd F up</th>
                                <th className='p-1 border-2'>Next F D</th>
                                <th className='p-1 border-2'>Remark</th>
                                <th className='p-1 border-2'>Remark 2</th>
                                <th className='p-1 border-2'>Ad Status</th>
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
                                            <td className='p-1 border-2'>{close?.firstFollow}</td>
                                            <td className='p-1 border-2'>{close?.secondFollow}</td>
                                            <td className='p-1 border-2'>{close?.thirdtFollow}</td>
                                            <td className='p-1 border-2'>{close?.nextFollow}</td>
                                            <td className='p-1 border-2'>{close?.remark}</td>
                                            <td className='p-1 border-2'>{close?.remarkTwo}</td>
                                            <td className='p-1 border-2'>{close?.admissionStatus}</td>
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
                    refetchUpdateData={refetchUpdateData}
                >
                </EditModal>
            }
        </div>
    );
};

export default MyClose;