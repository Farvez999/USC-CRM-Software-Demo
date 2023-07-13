import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

const CourseSetting = () => {
    const [courseName, setCourseName] = useState()

    const handleCourse = (e) => {
        setCourseName(e.target.value)
    }

    const { data: coursesName = [], refetch } = useQuery({
        queryKey: ['coursesName'],
        queryFn: async () => {
            const res = await fetch(`https://demo-usc-crm-server.vercel.app/course`);
            const data = await res.json();
            return data;
        }
    });

    const handleCourseAdd = () => {
        const addCourseName = {
            name: courseName
        }

        fetch(`https://demo-usc-crm-server.vercel.app/course`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                // authorization: `Bearer ${localStorage.getItem('access_token')}`
                authorization: localStorage.getItem('access_token')
            },
            body: JSON.stringify(addCourseName)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                toast.success(`${courseName} added successfully`)
                refetch()
            })
    }

    const handleDelete = (leads) => {
        console.log(leads);

        fetch(`https://demo-usc-crm-server.vercel.app/delete-course/${leads}`, {
            method: 'DELETE',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => {
                return res.json()
            })
            .then(data => {
                toast.success(`Leads ${courseName} deleted successfully`)
                refetch()
            })
    }

    return (
        <div>
            <h2 className='text-2xl font-bold'>Add Course Name !</h2>
            <div className='m-2'>
                {/* <h3 className='text-left my-2 ml-7'>Add Course Name !</h3> */}
                <input onChange={handleCourse} type="text" placeholder="Type Course Name" className="input input-bordered input-md w-full max-w-xs" />
                <button onClick={handleCourseAdd} className="btn btn-md m-2">Add Course Name</button>
            </div>
            <div>
                <div className="overflow-x-auto" style={{ height: '430px' }}>
                    <form>
                        <table className="table w-full">
                            <thead className='text-xs sticky top-0 bg-slate-300' style={{ width: "1200px" }}>
                                <tr>
                                    <th className='p-1 border-2'>#</th>
                                    <th className='p-1 border-2'>Date</th>
                                    <th className='p-1 border-2'>Batch Name</th>
                                    <th className='p-1 border-2'>Action</th>
                                </tr>
                            </thead>

                            <tbody className='w-fit text-xs'>
                                {
                                    coursesName?.users?.length > 0 &&
                                    coursesName?.users?.map((online, i) =>
                                        <tr key={online._id}>
                                            <th className='p-1 border-2'>{i + 1}</th>
                                            <td className='p-1 border-2'>{online?.createdAt?.slice(0, -14)}</td>
                                            <td className='p-1 border-2'>{online?.name}</td>
                                            <td className='p-1 border-2'>
                                                <p className='btn btn-xs btn-denger' onClick={() => handleDelete(online._id)} >Delete</p>
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

export default CourseSetting;