import { useQuery } from '@tanstack/react-query';
import React, { useContext, useRef, useState } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';
import { FaFileDownload } from 'react-icons/fa';
import { DownloadTableExcel } from 'react-export-table-to-excel';

const OfflineSt = () => {

    const { user } = useContext(AuthContext)
    const [filterData, setFilterData] = useState([])

    const [search, setSearch] = useState("");

    const courseRef = useRef();
    const batchRef = useRef();
    const userRef = useRef();
    const headRef = useRef();

    const tableRef = useRef(null);


    const { data: totalClose = [], refetch } = useQuery({
        queryKey: ['totalClose'],
        queryFn: async () => {
            const res = await fetch(`https://demo-usc-crm-server.vercel.app/leads?offlineInterested=true&head.name=${user.name}`);
            const data = await res.json();
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

    const { data: userName = [] } = useQuery({
        queryKey: ['userName'],
        queryFn: async () => {
            const res = await fetch(`https://demo-usc-crm-server.vercel.app/users`);
            const data = await res.json();
            return data;
        }
    });


    const handleSearch = () => {
        const fData = totalClose?.filter(si => si.course.name === courseRef.current.value || si.batch.name === batchRef.current.value || si.head.name === headRef.current.value || si.user.name === userRef.current.value)
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
        const fiData = totalClose.filter(si => formatedDate(si.createdAt) === value)
        setFilterData(fiData)
        console.log(fiData);
    }
    // -------------Date wise Filter End--------------------

    return (
        <div className='mx-2 my-6'>
            <h3 className="text-2xl mb-3">{user.name}'s Offline Interested Students : {totalClose.length}</h3>

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

                    <button className='mt-6 btn btn-sm btn-outline'>Download<FaFileDownload className='inline-block'></FaFileDownload></button>

                </DownloadTableExcel>
            </div>

            <div>
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
                                </tr>
                            </thead>

                            <tbody className='w-fit text-xs'>
                                {
                                    filterData.length > 0 &&
                                    filterData?.filter(admissions => {
                                        return search?.toLowerCase() === '' ? admissions : admissions.name.toLowerCase().includes(search?.toLowerCase()) || admissions?.email?.toLowerCase().includes(search?.toLowerCase()) || admissions.phone.toLowerCase().includes(search?.toLowerCase())
                                    })?.map((admissions, i) =>
                                        <tr key={admissions._id}>
                                            <th className='p-1 border-2'>{i + 1}</th>
                                            <td className='p-1 border-2'>{admissions.createdAt.slice(0, -14)}</td>
                                            <td className='p-1 border-2'>{admissions.course.name}</td>
                                            <td className='p-1 border-2'>{admissions.batch.name}</td>
                                            <td className='p-1 border-2'>{admissions.user.name}</td>
                                            <td className='p-1 border-2'>{admissions.head.name}</td>
                                            <td className='p-1 border-2'>{admissions.name}</td>
                                            <td className='p-1 border-2'>{admissions.phone}</td>
                                            <td className='p-1 border-2'>{admissions.email}</td>

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

export default OfflineSt;