import React, { useContext, useEffect, useRef, useState } from 'react';
import { DownloadTableExcel } from 'react-export-table-to-excel';
import { FaFileDownload } from 'react-icons/fa';
import PaymentModal from '../../Employee/PaymentModal';
import { AuthContext } from '../../../contexts/AuthProvider';
import { useReactToPrint } from 'react-to-print';
import { FiRefreshCw } from 'react-icons/fi';
import { toast } from 'react-hot-toast';

const PayDetails = () => {

    const { user } = useContext(AuthContext)
    const tableRef = useRef(null);
    const pdfDownloadRef = useRef();

    const [search, setSearch] = useState("");

    const [filterData, setFilterData] = useState([])
    const [admissions, setAdmissionsData] = useState([])

    const [admission, setAdmission] = useState()

    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();

    // const [closePayment, setClosePayment] = useState(false);

    const printRef = useRef();


    const refetchUpdateData = async () => {
        const res = await fetch(`https://demo-usc-crm-software.vercel.app/leads?admission=true&admissionStatus=true`);
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
        fetch("https://demo-usc-crm-software.vercel.app/leads?admission=true&admissionStatus=true")
            .then(response => response.json())
            .then(data => {
                // setClosePayment(data)
                setFilterData(data)
                setAdmissionsData(data)
            })
    }, [])


    // -----------------Filter Start--------------------

    const [selectedValue, setSelectedValue] = useState([]);
    console.log(selectedValue)

    const uniqueCourse = [...new Set(admissions?.map(user => user?.course?.name))];

    const uniqueBatch = [...new Set(selectedValue?.map(user => user?.batch?.name))];

    const uniqueHead = [...new Set(selectedValue?.map(user => user?.head?.name))];

    const uniqueUser = [...new Set(selectedValue?.map(user => user?.user?.name))];


    function handleCourseChange(event) {
        const couseSelectedValue = event.target.value;
        const fData = admissions?.filter(si =>
            (si.course.name) === couseSelectedValue)
        setFilterData(fData)
        setSelectedValue(fData);
    }

    function handleBatchChange(event) {
        const selectedBatchValue = event.target.value;
        const fData = admissions?.filter(si =>
            (si.batch.name) === selectedBatchValue)
        setFilterData(fData)
    }

    function handleHeadChange(event) {
        const selectedHeadValue = event.target.value;
        const fData = admissions?.filter(si =>
            (si.head.name) === selectedHeadValue)
        setFilterData(fData)
    }

    function handleUserChange(event) {
        const selectedUserValue = event.target.value;
        const fData = admissions?.filter(si =>
            (si.user.name) === selectedUserValue)
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
        const fiData = admissions.filter(si => formatedDate(si.updatedAt) === value)
        setFilterData(fiData)

    }

    // -------------Date wise Filter End--------------------

    // -------------Due Date to Date wise Filter Start--------------------
    const handleDueStartInputChange = event => {
        const value = event.target.value;
        setStartDate(value)
        console.log(typeof (value));
    }

    const handleDueEndInputChange = event => {
        const value = event.target.value;
        setEndDate(value)
        console.log(value);
    }

    const handleDueDateSearch = () => {
        var resultProductData = admissions.filter(a => a.nextInstallmentDate > startDate && a.nextInstallmentDate < endDate);
        setFilterData(resultProductData)

    };
    // -------------Due Date to Date wise Filter End--------------------

    // -------------Collection Date to Date wise Filter Start--------------------
    // const handleCollectionStartInputChange = event => {
    //     const value = event.target.value;
    //     setStartDate(value)
    //     console.log(typeof (value));
    // }

    // const handleCollectionEndInputChange = event => {
    //     const value = event.target.value;
    //     setEndDate(value)
    //     console.log(value);
    // }

    // const handleCollectionDateSearch = () => {
    //     var resultProductData = admissions.filter(a => (a.fristInstallmentDate || a.secondInstallmentDate || a.thirdInstallmentDate) >= startDate && (a.fristInstallmentDate || a.secondInstallmentDate || a.thirdInstallmentDate) <= endDate);
    //     setFilterData(resultProductData)

    // };
    // -------------Collection Date to Date wise Filter End--------------------


    const handleUpdate = (admission) => {
        setAdmission(admission)
    }


    const handleClosePayment = (admission) => {
        const confirmDelete = window.confirm('Are you sure you want to close this item?');
        if (!confirmDelete) {
            return;
        }

        const closePayment = {
            closePayment: true
        }

        fetch(`https://demo-usc-crm-software.vercel.app/update/${admission._id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                authorization: localStorage.getItem('access_token')
            },
            body: JSON.stringify(closePayment)
        })
            .then(res => res.json())
            .then(data => {
                toast.success(`Close successfully`);
                refetchUpdateData(data)
                // fetch('https://demo-usc-crm-software.vercel.app/leads?admission=true&admissionStatus=true')
                //     .then(res => res.json())
                //     .then(updatedData => {
                //         setFilterData(updatedData)
                //     })
                //     .catch(error => {
                //         console.error('Update request failed:', error);
                //         toast.error('An error occurred while updating the API.');
                //     });
            })
            .catch(error => {
                console.error('Delete request failed:', error);
                toast.error('An error occurred while deleting the item.');
            });
    }

    const handleOpenPayment = (admission) => {

        const confirmDelete = window.confirm('Are you sure you want to open this item?');
        if (!confirmDelete) {
            return;
        }


        const closePayment = {
            closePayment: false
        }

        fetch(`https://demo-usc-crm-software.vercel.app/update/${admission._id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                authorization: localStorage.getItem('access_token')
            },
            body: JSON.stringify(closePayment)
        })
            .then(res => res.json())
            .then(data => {
                toast.success(`Open successfully`);
                refetchUpdateData(data)
                // fetch('https://demo-usc-crm-software.vercel.app/leads?admission=true&admissionStatus=true')
                //     .then(res => res.json())
                //     .then(updatedData => {
                //         setFilterData(updatedData)
                //     })
                //     .catch(error => {
                //         console.error('Update request failed:', error);
                //         toast.error('An error occurred while updating the API.');
                //     });
            })
            .catch(error => {
                console.error('Delete request failed:', error);
                toast.error('An error occurred while deleting the item.');
            });
    }


    var due = 0;
    for (var i = 0; i < filterData.length; i++) {
        const tt = filterData[i].admissionFee - (filterData[i].fristInstallment + filterData[i].secondInstallment + filterData[i].thirdInstallment)
        // console.log(tt)
        if (filterData[i].closePayment === true) {
            due += 0
        } else {
            due += tt
        }

    }
    // console.log("Sum of the array values is: ", due);

    var totalSum = 0;
    for (var ts = 0; ts < filterData.length; ts++) {
        totalSum += filterData[ts].fristInstallment + filterData[ts].secondInstallment + filterData[ts].thirdInstallment
    }
    // console.log("Sum of the array values is: ", totalSum);

    //print
    const handlePrint = useReactToPrint({
        content: () => printRef.current,
        documentTitle: 'print'
    });

    //Pdf Download
    const pdfDownload = useReactToPrint({
        content: () => pdfDownloadRef.current,
        documentTitle: 'UserData',
        onafterprint: () => alert('Data save in PDF')
    })

    function refreshPage() {
        window.location.reload(false);
    }


    return (
        <div className='mx-2' ref={printRef}>
            <nav aria-label="breadcrumb" className="w-full p-2 dark:bg-gray-800 dark:text-gray-100">
                <ol className="flex h-8 space-x-2">
                    <li className="flex items-center">
                        <a rel="noopener noreferrer" href="#" title="Back to homepage" className="hover:underline">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 pr-1 dark:text-gray-400">
                                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                            </svg>
                        </a>
                    </li>
                    <li className="flex items-center space-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" fill="currentColor" className="w-2 h-2 mt-1 transform rotate-90 fill-current dark:text-gray-600">
                            <path d="M32 30.031h-32l16-28.061z"></path>
                        </svg>
                        <a rel="noopener noreferrer" href="#" className="flex items-center px-1 capitalize hover:underline">Dashboard</a>
                    </li>
                    <li className="flex items-center space-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" fill="currentColor" className="w-2 h-2 mt-1 transform rotate-90 fill-current dark:text-gray-600">
                            <path d="M32 30.031h-32l16-28.061z"></path>
                        </svg>
                        <a rel="noopener noreferrer" href="#" className="flex items-center px-1 capitalize hover:underline">{user.name}'s Admissions Payment</a>
                    </li>
                </ol>
            </nav>
            <div ref={pdfDownloadRef} style={{ width: '100%' }}>
                {/* <h3 className="text-2xl mb-3">{user.name}'s Admissions Payment : {admissions.length}</h3> */}

                <div className='flex flex-wrap items-center my-1'>
                    {/* <div className="form-control mx-2">
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


                    <div className="form-control mx-2">
                        <label className="label">
                            <span className="label-text">Start Date</span>
                        </label>
                        <input onChange={handleStartInputChange} name="" type="date" className="input input-sm w-full input-bordered" />
                    </div>

                    <div className="form-control mx-2">
                        <label className="label">
                            <span className="label-text">End Date</span>
                        </label>
                        <input onChange={handleEndInputChange} name="" type="date" className="input input-sm w-full input-bordered" />
                    </div>

                    <div className='mt-8 mx-2'>
                        <button
                            onClick={handleDateSearch}
                            className="btn btn-sm btn-primary text-white bg-green-500"
                        >
                            Date Filter
                        </button>
                    </div> */}



                    {/* ------Due Start Date and End Date------ */}
                    <div className="form-control mx-2">
                        <label className="label">
                            <span className="label-text">Due Start Date</span>
                        </label>
                        <input onChange={handleDueStartInputChange} name="" type="date" className="input input-sm w-full input-bordered" />
                    </div>

                    <div className="form-control mx-2">
                        <label className="label">
                            <span className="label-text">Due End Date</span>
                        </label>
                        <input onChange={handleDueEndInputChange} name="" type="date" className="input input-sm w-full input-bordered" />
                    </div>

                    <div className='mt-8 mx-2'>
                        <button
                            onClick={handleDueDateSearch}
                            className="btn btn-sm btn-accent"
                        >
                            Due Date Filter
                        </button>
                    </div>
                    {/* ------Due Start Date and End Date------ */}

                    {/* ------Collection Start Date and End Date------ */}
                    {/* <div className="form-control mx-2">
                        <label className="label">
                            <span className="label-text">Collection Start Date</span>
                        </label>
                        <input onChange={handleCollectionStartInputChange} name="" type="date" className="input input-sm w-full input-bordered" />
                    </div>

                    <div className="form-control mx-2">
                        <label className="label">
                            <span className="label-text">Collection End Date</span>
                        </label>
                        <input onChange={handleCollectionEndInputChange} name="" type="date" className="input input-sm w-full input-bordered" />
                    </div> */}

                    {/* <div className='mt-8 mx-2'>
                        <button
                            onClick={handleCollectionDateSearch}
                            className="btn btn-sm btn-primary text-white bg-green-500"
                        >
                            Collection Date Filter
                        </button>
                    </div> */}
                    {/* ------Collection Start Date and End Date------ */}

                    <DownloadTableExcel
                        filename="users table"
                        sheet="users"
                        currentTableRef={tableRef.current}
                    >

                        <button className='mt-8 btn btn-sm btn-outline'>excel<FaFileDownload className='inline-block'></FaFileDownload></button>

                    </DownloadTableExcel>

                    <div>
                        <button className='mt-8 mx-2 btn btn-sm btn-outline' onClick={pdfDownload}>PDF<FaFileDownload className='inline-block'></FaFileDownload></button>

                    </div>

                    <div className='mt-8 mx-2'>
                        <button
                            onClick={handlePrint}
                            className="btn btn-sm btn-outline"
                        >
                            Print
                        </button>
                    </div>


                </div>


                <div className='flex flex-wrap items-center my-1'>
                    <div className="form-control mx-2">
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

                    <div className="form-control mx-2">
                        <label className="label">
                            <span className="label-text">User Name</span>
                        </label>
                        <select onChange={handleUserChange} className="select select-sm w-full border-gray-400">
                            <option >User Name</option>
                            {uniqueUser.map(value => (
                                <option key={value._id} value={value}>
                                    {value}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className='mt-2 mx-2'>
                        <label className="label">
                            <span className="label-text">live Search</span>
                        </label>
                        <input type="text" className="input input-bordered input-sm w-full max-w-xs mb-3" onChange={(e) => setSearch(e.target.value)} placeholder='Search By Name, Phone, Email'></input>
                    </div>

                    <div className='mt-8 mx-2'>
                        <button onClick={refreshPage}><FiRefreshCw></FiRefreshCw></button>
                    </div>

                </div>

                <div>
                    <div className="overflow-auto">
                        <form>
                            <table className="table w-full">

                                <thead className='sticky top-0 bg-slate-300' style={{ width: "1200px" }}>
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
                                        {/* <th className='p-1 border-2'>Action</th> */}
                                    </tr>
                                </thead>
                                <tbody className='text-xs'>
                                    {
                                        filterData.length > 0 &&
                                        filterData?.filter((admission) => {
                                            return search?.toLowerCase() === '' ? admission : admission.name.toLowerCase().includes(search?.toLowerCase()) || admission.phone.toLowerCase().includes(search?.toLowerCase()) || admission.email?.toLowerCase().includes(search?.toLowerCase())
                                        })
                                            ?.map((admission, i) => (
                                                <>
                                                    <tr >
                                                        <th className='p-1 border-2'>{i + 1}</th>
                                                        <td className='p-1 border-2'>{admission?.updatedAt.slice(0, -14)}</td>
                                                        <td className='p-1 border-2'>{admission?.course.name}</td>
                                                        <td className='p-1 border-2'>{admission?.batch.name}</td>
                                                        <td className='p-1 border-2'>{admission.user.name}</td>
                                                        <td className='p-1 border-2'>{admission.head.name}</td>
                                                        <td className='p-1 border-2'>{admission.name}</td>
                                                        <td className='p-1 border-2'>{admission?.phone?.split('p:', 2)}</td>
                                                        <td className='p-1 border-2'>{admission?.email?.split('@', 1)}</td>
                                                        <td className='p-1 border-2'>{admission.fristPaymentAccounts || admission.secondPaymentAccounts || admission.thirdPaymentAccounts}</td>
                                                        <td className='p-1 border-2'>{admission.fristInstallmentTID || admission.secondInstallmentTID || admission.thirdInstallmentTID}</td>
                                                        <td className='p-1 border-2'>{admission.admissionFee}</td>
                                                        <td className='p-1 border-2'>{admission.fristInstallment}</td>
                                                        <td className='p-1 border-2'>{admission.secondInstallment === 0 ? admission.nextInstallmentDate : admission.secondInstallment}</td>
                                                        <td className='p-1 border-2'>{admission.thirdInstallment === 0 ? admission.nextInstallmentDate : admission.thirdInstallment}</td>
                                                        <td className='p-1 border-2'>{admission.closePayment === true ? 0 : admission.admissionFee && (admission.admissionFee - (admission.fristInstallment + admission.secondInstallment + admission.thirdInstallment))}</td>

                                                        <td className='p-1 border-2'>
                                                            <label onClick={() => handleUpdate(admission)} htmlFor="payModal" className="btn btn-xs btn-accent">Edit</label>
                                                        </td>
                                                        <td className='p-1 border-2 flex flex-col'>
                                                            {admission.closePayment === false ?
                                                                <p className='btn btn-xs border-0 bg-red-500 p-1 m-1' onClick={() => handleClosePayment(admission)} >Close</p>
                                                                :
                                                                <p className='btn btn-xs btn-accent p-1 m-1' onClick={() => handleOpenPayment(admission)} >Open</p>
                                                            }
                                                        </td>
                                                    </tr>

                                                </>

                                            )

                                            )


                                    }

                                </tbody>

                            </table>

                        </form>

                    </div>
                    {/* {
                        filterData.map(fd => setClosePayment(fd.closePayment))
                    } */}
                    <div className='mt-2 mx-1 flex justify-end'>
                        <p className='p-1 border-2'> Total : {totalSum} BDT</p>
                        <p className='p-1 border-2'> Due : {due} BDT</p>
                    </div>
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
        </div >
    );
};

export default PayDetails;