import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

const BatchSetting = () => {

    const [batchName, setBatchName] = useState()

    const handleBatch = (e) => {
        setBatchName(e.target.value)
    }


    const { data: batchsName = [], refetch } = useQuery({
        queryKey: ['batchsName'],
        queryFn: async () => {
            const res = await fetch(`https://demo-usc-crm-server.vercel.app/batch`);
            const data = await res.json();
            return data;
        }
    });

    const handleDelete = (leads) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this item?');
        if (!confirmDelete) {
            return;
        }

        fetch(`https://demo-usc-crm-server.vercel.app/delete-batch/${leads}`, {
            method: 'DELETE',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => {
                return res.json()
            })
            .then(data => {
                toast.success(`Leads ${batchName} deleted successfully`)
                refetch()
            })
    }

    // console.log(batchsName)

    const handleBatchAdd = () => {
        const addBatchName = {
            name: batchName
        }

        fetch(`https://demo-usc-crm-server.vercel.app/batch`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: localStorage.getItem('access_token')
            },
            body: JSON.stringify(addBatchName)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                toast.success(`${batchName} added successfully`)
                refetch()
            })
    }

    return (
        <div>
            <h2 className='text-2xl font-bold'>Add Batch Name !</h2>
            <div className='m-2 text-2xl font-bold'>
                {/* <h3 className='text-left my-2 ml-6'>Add Batch Name !</h3> */}
                <input onChange={handleBatch} type="text" placeholder="Type Batch Name" className="input input-bordered input-md w-full max-w-xs" />
                <button onClick={handleBatchAdd} className="btn btn-md m-2">Add Batch Name</button>
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
                                    batchsName?.users?.length > 0 &&
                                    batchsName?.users?.map((online, i) =>
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

export default BatchSetting;