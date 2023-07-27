import React, { useContext, useEffect, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../contexts/AuthProvider';
import { DownloadTableExcel } from 'react-export-table-to-excel';
import { FaFileDownload } from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query';

const AllStudents = () => {

    const [allStudents, setAllStudents] = useState([])

    useEffect(() => {
        fetch("https://demo-usc-crm-software.vercel.app/students")
            .then(response => response.json())
            .then(data => {
                setAllStudents(data)
            })
    }, [])



    return (
        <div>
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
                        <a rel="noopener noreferrer" href="#" className="flex items-center px-1 capitalize hover:underline">Online Student</a>
                    </li>
                </ol>
            </nav>


            <div className='p-2'>
                <div className="overflow-x-auto" style={{ height: '430px' }}>
                    <form>
                        <table className="table w-full">
                            <thead className='text-xs sticky top-0 bg-slate-300' style={{ width: "1200px" }}>
                                <tr>
                                    <th className='p-1 border-2'>#</th>
                                    <th className='p-1 border-2'>Date</th>
                                    <th className='p-1 border-2'>Name</th>
                                    <th className='p-1 border-2'>Phone</th>
                                    <th className='p-1 border-2'>Email</th>
                                    <th className='p-1 border-2'>Action</th>
                                </tr>
                            </thead>

                            <tbody className='w-fit text-xs'>
                                {
                                    allStudents?.students?.length > 0 &&
                                    allStudents?.students?.map((student, i) =>
                                        <tr key={student?._id}>
                                            <th className='p-1 border-2'>{i + 1}</th>
                                            <td className='p-1 border-2'>{student?.createdAt?.slice(0, -14)}</td>
                                            <td className='p-1 border-2'>{student?.name}</td>
                                            <td className='p-1 border-2'>{student?.phone}</td>
                                            <td className='p-1 border-2'>{student?.email ? student?.email : 'Email is not submit'}</td>
                                            <td className='p-1 border-2'>
                                                {/* <p className='btn btn-xs btn-denger' onClick={() => handleDelete(student._id)} >Delete</p> */}
                                            </td>
                                        </tr>
                                    )
                                }

                            </tbody>

                        </table>
                    </form>
                </div>
            </div>

            <hr></hr>
        </div>
    );
};

export default AllStudents;