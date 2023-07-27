import React, { useEffect, useRef, useState } from 'react';
import * as XLSX from 'xlsx'
import { Data } from './Data';
import _, { pad } from 'lodash'
import { toast } from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';



const LeadUpload = () => {

    // All select Checkbox 
    const [allChecked, setAllChecked] = useState(false)


    // pagination
    const pageSize = 10;
    const [paginationData, setPaginationData] = useState()
    const [currentPage, setcurrentPage] = useState(1)
    // // console.log(paginationData);

    const [courseName, setCourseName] = useState('')
    // // console.log(courseName);
    const [batchName, setBatchName] = useState('')
    const [employeeName, setEmployeeName] = useState('')
    const [headName, setHeadName] = useState('')
    // console.log(headName)

    const [checkData, setCheckData] = useState([]);
    // // console.log(checkData);


    // on change states
    const [excelFile, setExcelFile] = useState(null);
    const [excelFileError, setExcelFileError] = useState(null);

    // submit
    const [excelData, setExcelData] = useState(null);
    // it will contain array of objects

    const [filterBatchName, setFilterBatchName] = useState([])
    const [usersName, setUserName] = useState([])

    // handle File
    const fileType = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
    const handleFile = (e) => {
        let selectedFile = e.target.files[0];
        if (selectedFile) {
            // // console.log(selectedFile.type);
            if (selectedFile && fileType.includes(selectedFile.type)) {
                let reader = new FileReader();
                reader.readAsArrayBuffer(selectedFile);
                reader.onload = (e) => {
                    setExcelFileError(null);
                    setExcelFile(e.target.result);
                }
            }
            else {
                setExcelFileError('Please select only excel file types');
                setExcelFile(null);
            }
        }
        else {
            // console.log('plz select your file');
        }
    }

    // submit function
    const handleSubmit = (e) => {
        e.preventDefault();
        if (excelFile !== null) {
            const workbook = XLSX.read(excelFile, { type: 'buffer' });
            const worksheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[worksheetName];
            const data = XLSX.utils.sheet_to_json(worksheet);
            // console.log(data);
            setExcelData(data);
            // setPaginationData(_(data).slice(0).take(pageSize).value())
        }
        else {
            setExcelData(null);
        }
    }

    const handleCourseName = (e) => {
        const defaultValueCourse = e.target.value;

        setCourseName(e.target.value);

        console.log(defaultValueCourse)


        const filterBatch = batchsName.users.filter(batch => batch.name.includes(defaultValueCourse))
        console.log(filterBatchName)

        setFilterBatchName(filterBatch)
    }

    const { data: coursesName = [] } = useQuery({
        queryKey: ['coursesName'],
        queryFn: async () => {

            const res = await fetch(`https://demo-usc-crm-software.vercel.app/course`);
            const data = await res.json();
            return data;
        }
    });


    const handleBatchName = (e) => {
        setBatchName(e.target.value);
    }

    const { data: batchsName = [] } = useQuery({
        queryKey: ['batchsName'],
        queryFn: async () => {
            const res = await fetch(`https://demo-usc-crm-software.vercel.app/batch`);
            const data = await res.json();
            return data;
        }
    });

    const handleSelectUser = (e) => {
        setEmployeeName(e.target.value);
    }

    const { data: allUser = [] } = useQuery({
        queryKey: ['allUser'],
        queryFn: async () => {
            const res = await fetch(`https://demo-usc-crm-software.vercel.app/users`);
            const data = await res.json();
            const uData = data.users.filter(user => user.role === 'user')
            setUserName(uData);
            return data;
        }
    });

    // // console.log(usersName);

    const handleSelectHead = (e) => {
        setHeadName(e.target.value);
        // // console.log(e.target.value)
    }

    const { data: headsName = [] } = useQuery({
        queryKey: ['headsName'],
        queryFn: async () => {

            const res = await fetch(`https://demo-usc-crm-software.vercel.app/heads`);
            const data = await res.json();
            return data;
        }
    });



    const handleAdded = () => {
        const leads = excelData.filter(cd => cd.isChecked === true)

        // console.log(leads)

        const personalData = {
            leads,
            courseName,
            batchName,
            employeeName,
            headName,
        }

        // console.log(personalData)

        // fetch(`https://demo-usc-crm-software.vercel.app/add-leads`, {
        //     method: 'POST',
        //     headers: {
        //         'content-type': 'application/json',
        //         authorization: localStorage.getItem('access_token')
        //     },
        //     body: JSON.stringify(personalData)
        // })
        //     .then(res => res.json())
        //     .then(data => {
        //         // toast.success('Database Data added successfully')
        //         toast.success(data.message)
        //         // console.log(data);

        //     })
        // .catch(error => { toast.error(error.message); setIsloader(false) })
    }

    const handleOnline = () => {
        const leads = excelData.filter(cd => cd.isChecked === true)

        const personalData = {
            leads,
            courseName,
            batchName,
            employeeName,
            headName
        }

        fetch(`https://demo-usc-crm-software.vercel.app/add-online-leads`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: localStorage.getItem('access_token')
            },
            body: JSON.stringify(personalData)
        })
            .then(res => res.json())
            .then(data => {
                // toast.success('Database Data added successfully')
                toast.success(data.message)
                // console.log(data);

            })
        // .catch(error => { toast.error(error.message); setIsloader(false) })
    }

    const handleOffline = () => {
        const leads = excelData.filter(cd => cd.isChecked === true)

        const personalData = {
            leads,
            courseName,
            batchName,
            employeeName,
            headName
        }

        fetch(`https://demo-usc-crm-software.vercel.app/add-offline-leads`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: localStorage.getItem('access_token')
            },
            body: JSON.stringify(personalData)
        })
            .then(res => res.json())
            .then(data => {
                // toast.success('Database Data added successfully')
                toast.success(data.message)
                // console.log(data);

            })
        // .catch(error => { toast.error(error.message); setIsloader(false) })
    }


    // pagination
    // const pageCount = excelData !== null && Math.ceil(excelData.length / pageSize);
    // // // console.log(pageCount);
    // if (pageCount === 1) { return null }
    // const pages = _.range(1, pageCount + 1)

    // const paginitaion = (pageNo) => {
    //     setcurrentPage(pageNo)
    //     const startIndex = (pageNo - 1) * pageSize;
    //     const paginationD = _(excelData).slice(startIndex).take(pageSize).value();
    //     setPaginationData(paginationD)
    // }

    // All select checkbox 
    const toggle = (e) => {
        // console.log(e.target.checked);
        setAllChecked(e.target.checked)
        if (e.target.checked) {
            // paginationData.map(data => data.isChecked = true)
            excelData.map(data => data.isChecked = true)
        }
        else {
            // paginationData.map(data => data.isChecked = false)
            excelData.map(data => data.isChecked = false)
        }
        // console.log(excelData);
    }

    // single checkbox 
    const handleChange = (e, name) => {
        // console.log(e.target.checked);
        // paginationData.map(pd => pd?.Name === name ? pd.isChecked = e.target.checked : pd)
        // setPaginationData(paginationData)
        excelData.map(pd => pd?.Name === name ? pd.isChecked = e.target.checked : pd)
        setExcelData(excelData)
    }

    return (
        <div className="container mx-2 my-2">
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
                        <a rel="noopener noreferrer" href="#" className="flex items-center px-1 capitalize hover:underline">Upload Lead</a>
                    </li>
                </ol>
            </nav>
            {/* upload file section */}
            <div className='p-2'>
                <div className='form'>
                    <form className='form-group' autoComplete="off"
                        onSubmit={handleSubmit}>
                        <label className='text-left'><h5>Upload Excel file</h5></label>

                        <div className='flex items-center'>
                            <input type='file' className='form-control'
                                onChange={handleFile} required></input>
                            {excelFileError && <div className='text-danger'
                                style={{ marginTop: 5 + 'px' }}>{excelFileError}</div>}
                            <button type='submit' className='btn btn-success btn-sm'
                                style={{ marginTop: 5 + 'px' }}>Check Import File</button>
                        </div>

                        <br></br>
                    </form>
                </div>

                <div>
                    <div className='flex items-center gap-2'>
                        <select required className="select select-bordered select-sm w-1/10" onChange={handleCourseName}>
                            <option disabled selected>Select Course Name</option>
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

                        <select className="select select-bordered select-sm w-1/10" required onChange={handleBatchName}>
                            <option disabled selected>Select Batch Name</option>
                            {
                                filterBatchName?.map((user) =>
                                    <option
                                        key={user._id}
                                        value={user._id}>
                                        {user.name}
                                    </option>
                                )
                            }
                        </select>

                        {/* <input list="data" className='input input-bordered input-sm w-1/10' placeholder="Batch Name" onChange={handleBatchName}></input>
                    <datalist id='data'>
                        {
                            batchsName?.users?.map((user) =>
                                <option
                                    key={user._id}
                                    value={user._id}>
                                    {user.name}
                                </option>
                            )
                        }
                    </datalist> */}

                        <select className="select select-bordered select-sm w-1/10" required onChange={handleSelectUser}>
                            <option disabled selected>Select User Name</option>
                            {
                                usersName?.map((user) =>
                                    user.role !== 'admin' &&
                                    <option
                                        key={user._id}
                                        value={user._id}>
                                        {user.name}
                                    </option>
                                )
                            }
                            {/* <option disabled selected>Select User</option>
                            <option>Sumaiya</option>
                            <option>Sonia</option> */}
                        </select>

                        <select className="select select-bordered select-sm w-1/10" required onChange={handleSelectHead}>
                            <option disabled selected>Select Head Name</option>
                            {
                                headsName?.heads?.map((user) =>
                                    <option
                                        key={user._id}
                                        value={user._id}>
                                        {user.name}
                                    </option>
                                )
                            }
                            {/* <option disabled selected>Select Head</option>
                            <option>Shuvo</option>
                            <option>Nahid</option> */}
                        </select>

                        <button className='btn btn-success btn-sm mx-1' onClick={handleAdded} type="submit">Added User</button>

                        <button className='btn btn-success btn-sm mx-1' onClick={handleOnline} type="submit">Online User Add</button>

                        <button className='btn btn-success btn-sm mx-1' onClick={handleOffline} type="submit">Offline User Add</button>
                    </div>
                </div>

                <br></br>
                <hr></hr>

                {/* All Select checkbox */}
                <form className="flex justify-start form w-100">
                    <div className="form-check">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            name="allSelect"
                            checked={allChecked}
                            onChange={toggle}
                        />
                        <label className="form-check-label ms-2"> All Select</label>
                    </div>
                </form>
                <hr></hr>
                {/* view file section */}
                <h5 >View Excel file</h5>
                <div className='viewer'>
                    {excelData === null && <>No file selected</>}
                    {excelData !== null && (
                        <div className='table-responsive'>
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th scope='col'>Select</th>
                                        <th scope='col'>ID</th>
                                        <th scope='col'>Name</th>
                                        <th scope='col'>Phone</th>
                                        <th scope='col'>Email</th>
                                        <th scope='col'>FirstFollowup</th>
                                        <th scope='col'>SecondFollowup</th>
                                        <th scope='col'>ThirdFollowup</th>
                                        <th scope='col'>NextFollowupDate</th>
                                        <th scope='col'>Remark</th>
                                        <th scope='col'>RemarkTwo</th>
                                        <th scope='col'>AdmissionStates</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <Data
                                        excelData={excelData}
                                        employeeName={employeeName}
                                        checkData={checkData}
                                        setCheckData={setCheckData}
                                        paginationData={paginationData}
                                        handleChange={handleChange} />
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

            {/* Pagination  */}
            {/* <div className='pagination flex items-1 items-center justify-center'>
                {
                    pages.map((page) => (
                        <p className={
                            page === currentPage ? 'bg-sky-500 p-2' : 'mx-2'
                        }
                            onClick={() => paginitaion(page)}
                        >{page}</p>
                    ))
                }

            </div> */}
        </div>
    );
};

export default LeadUpload;