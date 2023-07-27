import React, { useContext, useEffect, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../contexts/AuthProvider';
import PaymentModal from './PaymentModal';
import { DownloadTableExcel } from 'react-export-table-to-excel';
import { FaFileDownload } from 'react-icons/fa';


const MyAdmission = () => {

    const { user } = useContext(AuthContext)
    const [search, setSearch] = useState("");
    const [filterData, setFilterData] = useState([])

    const [admission, setAdmission] = useState()

    const [admissions, setAdmissions] = useState([])
    const [uniquefilterData, setUniqueFilterData] = useState([])

    const tableRef = useRef(null);

    // const { data: admissions = [], refetch } = useQuery({
    //     queryKey: ['admissions'],
    //     queryFn: async () => {
    //         const res = await fetch(`https://demo-usc-crm-software.vercel.app/leads?admission=true&user.name=${user.name}`);
    //         const data = await res.json();
    //         setFilterData(data)
    //         return data;
    //     }
    // });


    useEffect(() => {
        fetch(`https://demo-usc-crm-software.vercel.app/leads?admission=true&user.name=${user.name}`)
            .then(response => response.json())
            .then(data => {
                setFilterData(data)
                setUniqueFilterData(data)
                setAdmissions(data)
                return data;

            })

    }, [user.name])

    const handleOnline = (admission) => {

        const confirmDelete = window.confirm('Are you sure you want to Online Admission this Student?');
        if (!confirmDelete) {
            return;
        }


        const onlineInterested = {
            onlineInterested: true,
            admission: false,
        }

        fetch(`https://demo-usc-crm-software.vercel.app/update/${admission._id}`, {
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
                let lData = filterData.filter(lead => lead._id !== admission._id)
                setFilterData(lData)
            })
    }

    const handleOffline = (admission) => {

        const confirmDelete = window.confirm('Are you sure you want to Offline Admission this Student?');
        if (!confirmDelete) {
            return;
        }

        const offlineInterested = {
            offlineInterested: true,
            admission: false,
            onlineInterested: false
        }


        fetch(`https://demo-usc-crm-software.vercel.app/update/${admission._id}`, {
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
                let lData = filterData.filter(lead => lead._id !== admission._id)
                setFilterData(lData)
            })
    }

    const handleSeminarInter = (admission) => {

        const confirmDelete = window.confirm('Are you sure you want to Seminar Interest this Student?');
        if (!confirmDelete) {
            return;
        }

        const seminarInterested = {
            seminarInterested: true,
            admission: false,
            offlineInterested: false,
            onlineInterested: false
        }

        fetch(`https://demo-usc-crm-software.vercel.app/update/${admission._id}`, {
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
                let lData = filterData.filter(lead => lead._id !== admission._id)
                setFilterData(lData)
            })
    }

    const handlePayment = (admission) => {
        setAdmission(admission)
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

    // const { data: coursesName = [] } = useQuery({
    //     queryKey: ['coursesName'],
    //     queryFn: async () => {
    //         const res = await fetch(`https://demo-usc-crm-software.vercel.app/course`);
    //         const data = await res.json();
    //         return data;
    //     }
    // });

    // const { data: batchsName = [] } = useQuery({
    //     queryKey: ['batchsName'],
    //     queryFn: async () => {
    //         const res = await fetch(`https://demo-usc-crm-software.vercel.app/batch`);
    //         const data = await res.json();
    //         return data;
    //     }
    // });

    // const { data: headsName = [] } = useQuery({
    //     queryKey: ['headsName'],
    //     queryFn: async () => {
    //         const res = await fetch(`https://demo-usc-crm-software.vercel.app/head`);
    //         const data = await res.json();
    //         return data;
    //     }
    // });


    // const handleSearch = () => {
    //     const fData = admissions?.filter(si => si.course.name === courseRef.current.value || si.batch.name === batchRef.current.value || si.head.name === headRef.current.value)
    //     setFilterData(fData)

    // };

    // -----------------Filter End--------------------

    // -------------Date wise Filter Start--------------------
    function formatedDate(date) {
        return new Date(date).toISOString().slice(0, -14);
    }

    const handleInputChange = event => {
        const value = event.target.value;
        // console.log(value);
        const fiData = admissions.filter(si => formatedDate(si.updatedAt) === value)
        setFilterData(fiData)

    }

    return (
        <div className='mx-2 my-6'>
            <h3 className="text-2xl mb-3">{user.name}'s Admissions : {admissions.length}</h3>

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

                        <thead className='sticky top-0 bg-slate-300'>
                            <tr className='text-xs'>
                                <th className='p-1 border-2'>#</th>
                                <th className='p-1 border-2'>Date</th>
                                <th className='p-1 border-2'>Course Name</th>
                                <th className='p-1 border-2'>Batch Name</th>
                                <th className='p-1 border-2'>User Name</th>
                                <th className='p-1 border-2'>Head Name</th>
                                <th className='p-1 border-2'>Name</th>
                                <th className='p-1 border-2'>Phone</th>
                                <th className='p-1 border-2'>Email</th>
                                <th className='p-1 border-2'>Interested</th>
                                <th className='p-1 border-2'>Payment</th>
                            </tr>
                        </thead>
                        <tbody className='text-xs'>

                            {
                                filterData.length > 0 &&
                                filterData?.filter((admission) => {
                                    return search?.toLowerCase() === '' ? admission : admission.name.toLowerCase().includes(search?.toLowerCase()) || admission.phone.toLowerCase().includes(search?.toLowerCase()) || admission?.email?.toLowerCase().includes(search?.toLowerCase())
                                })
                                    ?.map((admission, i) => (
                                        <tr>
                                            <th className='p-1 border-2'>{i + 1}</th>
                                            <td className='p-1 border-2'>{admission?.updatedAt.slice(0, -14)}</td>
                                            <td className='p-1 border-2'>{admission?.course?.name}</td>
                                            <td className='p-1 border-2'>{admission?.batch?.name}</td>
                                            <td className='p-1 border-2'>{admission?.user?.name}</td>
                                            <td className='p-1 border-2'>{admission?.head?.name}</td>
                                            <td className='p-1 border-2'>{admission?.name}</td>
                                            <td className='p-1 border-2'>{admission?.phone?.split('p:', 2)}</td>
                                            <td className='p-1 border-2'>{admission?.email?.split('@', 1)}</td>
                                            <td className='p-1 border-2'>
                                                <p className='btn btn-xs btn-primary my-2' onClick={() => handleOnline(admission)} >On</p>
                                                <p className='btn btn-xs btn-denger' onClick={() => handleOffline(admission)} >Off</p>
                                                <p className='btn btn-xs btn-denger mt-2 mb-2' onClick={() => handleSeminarInter(admission)} > S Inter </p>
                                            </td>
                                            <td className='p-1 border-2'>
                                                <label onClick={() => handlePayment(admission)} htmlFor="payModal" className="btn btn-xs btn-secondary">Payment</label>
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
                admission &&
                <PaymentModal
                    admission={admission}
                    setAdmission={setAdmission}
                >
                </PaymentModal>
            }
        </div>
    );
};

export default MyAdmission;