import React, { useContext, useRef, useState } from 'react';
import { AuthContext } from '../../../contexts/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { DownloadTableExcel } from 'react-export-table-to-excel';
import { FaFileDownload } from 'react-icons/fa';

const TotalSemiInter = () => {

    const { user } = useContext(AuthContext)
    const [filterData, setFilterData] = useState([])
    const [search, setSearch] = useState("");

    const courseRef = useRef();
    const batchRef = useRef();
    const headRef = useRef();
    const userRef = useRef();

    const tableRef = useRef(null);



    const { data: totalsemiinter = [], refetch } = useQuery({
        queryKey: ['totalsemiinter',],
        queryFn: async () => {
            const res = await fetch(`https://demo-usc-crm-server.vercel.app/leads?seminarInterested=true`);
            const data = await res.json();
            setFilterData(data)
            return data;

        }
    });


    const handleDelete = (semiinter) => {
        // console.log(semiinter);

        fetch(`https://demo-usc-crm-server.vercel.app/delete/${semiinter}`, {
            method: 'DELETE',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => {
                return res.json()
            })
            .then(data => {
                toast.success(`Leads ${user.name} deleted successfully`)
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

    const { data: userName = [] } = useQuery({
        queryKey: ['userName'],
        queryFn: async () => {
            const res = await fetch(`https://demo-usc-crm-server.vercel.app/users`);
            const data = await res.json();
            return data;
        }
    });


    const handleSearch = () => {
        const fData = totalsemiinter?.filter(si => si.course.name === courseRef.current.value || si.batch.name === batchRef.current.value || si.head.name === headRef.current.value || si.user.name === userRef.current.value)
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
        const fiData = totalsemiinter.filter(si => formatedDate(si.createdAt) === value)
        setFilterData(fiData)
        console.log(fiData);
    }
    // -------------Date wise Filter End--------------------


    return (
        <div className='mx-2 my-2'>
            <nav aria-label="breadcrumb" className="w-full p-4 dark:bg-gray-800 dark:text-gray-100">
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
                        <a rel="noopener noreferrer" href="#" className="flex items-center px-1 capitalize hover:underline">Total Seminar Interesteds Students</a>
                    </li>
                </ol>
            </nav>
            {/* <h3 className="text-3xl">Total Seminar Interesteds Students : {totalsemiinter.length}</h3> */}

            <div className='flex flex-wrap items-center'>

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

                <div className="form-control mx-2">
                    <label className="label">
                        <span className="label-text">User Name</span>
                    </label>
                    <select className="select select-sm w-full border-gray-400" required
                        ref={userRef}>
                        <option >User Name</option>

                        {
                            userName?.users?.map((user) =>
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

                    <button className='mt-6 btn btn-sm btn-outline'><FaFileDownload className='inline-block'></FaFileDownload></button>

                </DownloadTableExcel>
            </div>

            <div className='p-2'>
                <div className="overflow-x-auto" style={{ height: '430px' }}>
                    <form>
                        <table className="table w-full">
                            <thead className='text-xs sticky top-0 bg-slate-300' style={{ width: "1200px" }}>
                                <tr>
                                    <th className='p-1 border-2'>#</th>
                                    <th className='p-1 border-2'>Date</th>
                                    <th className='p-1 border-2'>C N</th>
                                    <th className='p-1 border-2'>B N</th>
                                    <th className='p-1 border-2'>U N</th>
                                    <th className='p-1 border-2'>H N</th>
                                    <th className='p-1 border-2'>Name</th>
                                    <th className='p-1 border-2'>Phone</th>
                                    <th className='p-1 border-2'>Email</th>
                                    <th className='p-1 border-2'>Action</th>
                                </tr>
                            </thead>

                            <tbody className='w-fit text-xs'>
                                {
                                    filterData.length > 0 &&
                                    filterData?.filter(semiinter => {
                                        return search?.toLowerCase() === '' ? semiinter : semiinter.name.toLowerCase().includes(search?.toLowerCase()) || semiinter?.email?.toLowerCase().includes(search?.toLowerCase()) || semiinter.phone.toLowerCase().includes(search?.toLowerCase())
                                    })?.map((semiinter, i) =>
                                        <tr key={semiinter._id}>
                                            <th className='p-1 border-2'>{i + 1}</th>
                                            <td className='p-1 border-2'>{semiinter.createdAt.slice(0, -14)}</td>
                                            <td className='p-1 border-2'>{semiinter.course.name}</td>
                                            <td className='p-1 border-2'>{semiinter.batch.name}</td>
                                            <td className='p-1 border-2'>{semiinter.user.name}</td>
                                            <td className='p-1 border-2'>{semiinter.head.name}</td>
                                            <td className='p-1 border-2'>{semiinter.name}</td>
                                            <td className='p-1 border-2'>{semiinter.phone}</td>
                                            <td className='p-1 border-2'>{semiinter.email}</td>
                                            <td className='p-1 border-2'>
                                                <p className='btn btn-xs btn-denger' onClick={() => handleDelete(semiinter._id)} >Delete</p>
                                            </td>
                                        </tr>
                                    )
                                }

                            </tbody>

                        </table>
                    </form>
                </div>
            </div>

        </div>
    );
};

export default TotalSemiInter;