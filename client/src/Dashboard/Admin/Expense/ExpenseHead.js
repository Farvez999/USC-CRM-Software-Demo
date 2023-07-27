import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

const ExpenseHead = () => {

    const [expenseHead, setExpenseHead] = useState()

    const handleExpenseHead = (e) => {
        setExpenseHead(e.target.value)
    }

    const { data: expenseHeadName = [], refetch } = useQuery({
        queryKey: ['expenseHeadName'],
        queryFn: async () => {
            const res = await fetch(`https://demo-usc-crm-software.vercel.app/expense-head`);
            const data = await res.json();
            return data;
        }
    });

    const handleAddExpenseHead = () => {
        const addCourseName = {
            purpose: expenseHead
        }

        fetch(`https://demo-usc-crm-software.vercel.app/expense-head`, {
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
                // console.log(data);
                toast.success(`${expenseHead} added successfully`)
                refetch()
            })
    }

    const handleDelete = (leads) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this item?');
        if (!confirmDelete) {
            return;
        }

        fetch(`https://demo-usc-crm-software.vercel.app/delete-expense-head/${leads}`, {
            method: 'DELETE',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => {
                return res.json()
            })
            .then(data => {
                toast.success(`Leads ${expenseHead} deleted successfully`)
                refetch()
            })
    }

    return (
        <div>
            <h2 className='text-2xl font-bold'>Add Expense Head !</h2>
            <div className='m-2'>
                <input onChange={handleExpenseHead} type="text" placeholder="Type Course Name" className="input input-bordered input-md w-full max-w-xs" />
                <button onClick={handleAddExpenseHead} className="btn btn-md m-2">Add Expense Head</button>
            </div>
            <div>
                <div className="overflow-x-auto" style={{ height: '430px' }}>
                    <form>
                        <table className="table w-full">
                            <thead className='text-xs sticky top-0 bg-slate-300' style={{ width: "1200px" }}>
                                <tr>
                                    <th className='p-1 border-2'>#</th>
                                    <th className='p-1 border-2'>Date</th>
                                    <th className='p-1 border-2'>Purpose Name</th>
                                    <th className='p-1 border-2'>Action</th>
                                </tr>
                            </thead>

                            <tbody className='w-fit text-xs'>
                                {
                                    expenseHeadName?.users?.length > 0 &&
                                    expenseHeadName?.users?.map((online, i) =>
                                        <tr key={online._id}>
                                            <th className='p-1 border-2'>{i + 1}</th>
                                            <td className='p-1 border-2'>{online.createdAt.slice(0, -14)}</td>
                                            <td className='p-1 border-2'>{online.purpose}</td>
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

export default ExpenseHead;