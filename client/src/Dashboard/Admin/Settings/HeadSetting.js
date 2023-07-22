import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

const HeadSetting = () => {
    const [headName, setHeadName] = useState()

    const handleHead = (e) => {
        setHeadName(e.target.value)
    }

    const { data: headsName = [], refetch } = useQuery({
        queryKey: ['headsName'],
        queryFn: async () => {
            const res = await fetch(`https://demo-usc-crm-software.vercel.app/head`);
            const data = await res.json();
            return data;
        }
    });

    const handleHeadAdd = () => {
        const addHeadName = {
            name: headName
        }

        fetch(`https://demo-usc-crm-software.vercel.app/head`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: localStorage.getItem('access_token')
            },
            body: JSON.stringify(addHeadName)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                toast.success(`${headName} added successfully`)
                refetch()
            })
    }

    const handleDelete = (leads) => {
        console.log(leads);

        fetch(`https://demo-usc-crm-software.vercel.app/delete-head/${leads}`, {
            method: 'DELETE',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => {
                return res.json()
            })
            .then(data => {
                toast.success(`Leads ${headName} deleted successfully`)
                refetch()
            })
    }

    return (
        <div>
            <div className='m-2'>
                <h3 className='text-left my-2 ml-5'>Add Head Name !</h3>
                <input onChange={handleHead} type="text" placeholder="Type Head Name" className="input input-bordered input-md w-full max-w-xs" />
                <button onClick={handleHeadAdd} className="btn btn-md m-2">Add Head Name</button>
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
                                    headsName?.users?.length > 0 &&
                                    headsName?.users?.map((online, i) =>
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

export default HeadSetting;