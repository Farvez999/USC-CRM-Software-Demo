import { useQuery } from '@tanstack/react-query';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';
import { DownloadTableExcel } from 'react-export-table-to-excel';
import { FaFileDownload } from 'react-icons/fa';
import PaymentModal from './PaymentModal';
import { toast } from 'react-hot-toast';

const PaymentDetails = () => {

    const { user } = useContext(AuthContext)
    const tableRef = useRef(null);

    const [search, setSearch] = useState("");

    const [filterData, setFilterData] = useState([])

    const [admission, setAdmission] = useState()

    const courseRef = useRef();
    const batchRef = useRef();
    const headRef = useRef();

    const [due, setDue] = useState()
    // console.log(due)

    const { data: admissions = [], refetch } = useQuery({
        queryKey: ['admissions'],
        queryFn: async () => {
            const res = await fetch(`https://demo-usc-crm-server.vercel.app/leads?admission=true&admissionStatus=true&user.name=${user.name}`);
            const data = await res.json();
            // let lData = data.filter(lead => lead.admissionStatus === true)

            // setFilterData(lData)
            setFilterData(data)

            return data;
        }
    });


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
        const fData = admissions?.filter(si => si.course.name === courseRef.current.value || si.batch.name === batchRef.current.value || si.head.name === headRef.current.value)
        setFilterData(fData)

    };

    // -----------------Filter End--------------------

    // -------------Date wise Filter Start--------------------
    function formatedDate(date) {
        return new Date(date).toISOString().slice(0, -14);
    }

    const handleInputChange = event => {
        const value = event.target.value;
        // console.log(value);
        const fiData = admissions.filter(si => formatedDate(si.createdAt) === value)
        setFilterData(fiData)

    }
    // -------------Date wise Filter End--------------------

    // -------------Due Date wise Filter Start--------------------
    // function formatedDate(date) {
    //     return new Date(date).toISOString().slice(0, -14);
    // }

    const handleDueChange = event => {
        const value = event.target.value;
        // console.log(value);
        const fiData = admissions.filter(si => formatedDate(si.nextInstallmentDate) === value)
        setFilterData(fiData)

    }

    const handleUpdate = (admission) => {
        setAdmission(admission)
    }


    var add = 0;
    for (var i = 0; i < filterData.length; i++) {
        add += filterData[i].admissionFee - (filterData[i].fristInstallment + filterData[i].secondInstallment + filterData[i].thirdInstallment)
    }
    // console.log("Sum of the array values is: ", add);


    const handleClosePayment = (admission) => {
        const closePayment = {
            closePayment: true
        }

        fetch(`https://demo-usc-crm-server.vercel.app/update/${admission._id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                authorization: localStorage.getItem('access_token')
            },
            body: JSON.stringify(closePayment)
        })
            .then(res => res.json())
            .then(data => {
                toast.success('Close Payment Added')
                refetch()
            })
    }

    const handleOpenPayment = (admission) => {
        const closePayment = {
            closePayment: false
        }

        fetch(`https://demo-usc-crm-server.vercel.app/update/${admission._id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                authorization: localStorage.getItem('access_token')
            },
            body: JSON.stringify(closePayment)
        })
            .then(res => res.json())
            .then(data => {
                toast.success('Open Payment Added')
                refetch()
            })
    }
    return (
        <div className='mx-2 my-6'>
            <h3 className="text-2xl mb-3">{user.name}'s Admissions Payment : {admissions.length}</h3>

            <div className='flex flex-wrap items-center my-2'>

                <div className="form-control mx-2">
                    <label className="label">
                        <span className="label-text">Date</span>
                    </label>
                    <input onChange={handleInputChange} name="FirstFollowup" type="date" className="input input-sm w-full input-bordered" />
                </div>

                <div className="form-control mx-2">
                    <label className="label">
                        <span className="label-text">Due Date</span>
                    </label>
                    <input onChange={handleDueChange} name="FirstFollowup" type="date" className="input input-sm w-full input-bordered" />
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
            <div className='my-2 mx-2 flex flex-row justify-end'>
                <p className='p-1 border-2'> Due : {add} BDT</p>
            </div>

            <div className="overflow-auto" style={{ height: '430px' }}>
                <form>
                    <table className="table w-full">

                        <thead className='sticky top-0 bg-slate-300'>
                            <tr className='text-xs'>
                                <th className='p-1 border-2'>#</th>
                                <th className='p-1 border-2'>Date</th>
                                <th className='p-1 border-2'>C.N</th>
                                <th className='p-1 border-2'>B.N</th>
                                <th className='p-1 border-2'>U.N</th>
                                <th className='p-1 border-2'>H.N</th>
                                <th className='p-1 border-2'>Name</th>
                                <th className='p-1 border-2'>Phone</th>
                                <th className='p-1 border-2'>Email</th>
                                <th className='p-1 border-2'>P A</th>
                                <th className='p-1 border-2'>T Id</th>
                                <th className='p-1 border-2'>A Fee</th>
                                <th className='p-1 border-2'>1st Pay</th>
                                <th className='p-1 border-2'>2nd Pay</th>
                                <th className='p-1 border-2'>3rd Pay</th>
                                <th className='p-1 border-2'>Due</th>
                                <th className='p-1 border-2'>Action</th>
                                <th className='p-1 border-2'>Action</th>
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
                                            <td className='p-1 border-2'>{admission?.phone}</td>
                                            <td className='p-1 border-2'>{admission?.email}</td>
                                            <td className='p-1 border-2'>{admission?.fristPaymentAccounts || admission?.secondPaymentAccounts || admission?.thirdPaymentAccounts}</td>
                                            <td className='p-1 border-2'>{admission?.fristInstallmentTID || admission?.secondInstallmentTID || admission?.thirdInstallmentTID}</td>
                                            <td className='p-1 border-2'>{admission?.admissionFee}</td>
                                            <td className='p-1 border-2'>{admission?.fristInstallment}</td>
                                            <td className='p-1 border-2'>{admission?.secondInstallment === 0 ? admission?.nextInstallmentDate : admission?.secondInstallment}</td>
                                            <td className='p-1 border-2'>{admission?.thirdInstallment === 0 ? admission?.nextInstallmentDate : admission?.thirdInstallment}</td>
                                            <td className='p-1 border-2'>{
                                                admission.closePayment === true ? 0 :
                                                    admission.admissionFee && (admission.admissionFee - (admission.fristInstallment + admission.secondInstallment + admission.thirdInstallment))

                                                // admission?.admissionFee && (admission?.admissionFee - (admission?.fristInstallment + admission?.secondInstallment + admission?.thirdInstallment))
                                            }</td>

                                            <td className='p-1 border-2'>
                                                <label onClick={() => handleUpdate(admission)} htmlFor="payModal" className="btn btn-xs btn-secondary">Edit</label>
                                            </td>
                                            <td className='p-1 border-2 flex flex-col'>
                                                <p className='btn btn-xs btn-danger p-1 m-1' onClick={() => handleClosePayment(admission)}>Close</p>
                                                <p className='btn btn-xs btn-accent p-1 m-1' onClick={() => handleOpenPayment(admission)} >Open</p>
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

export default PaymentDetails;