import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { toast } from 'react-hot-toast';

const Expense = () => {

    const { data: expenses = [], refetch } = useQuery({
        queryKey: ['expenses'],
        queryFn: async () => {
            const res = await fetch(`https://demo-usc-crm-server.vercel.app/expense`);
            const data = await res.json();
            return data;
        }
    });

    const handleDelete = (leads) => {
        console.log(leads._id);

        fetch(`https://demo-usc-crm-server.vercel.app/delete-expense/${leads._id}`, {
            method: 'DELETE',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => {
                return res.json()
            })
            .then(data => {
                toast.success(`Leads ${leads.purpose} deleted successfully`)
                refetch()
            })
    }

    var totalSum = 0;
    for (var ts = 0; ts < expenses?.expenses?.length; ts++) {
        totalSum += expenses.expenses[ts].amount
        console.log(totalSum)
    }

    return (
        <div>
            <h2 className='text-2xl font-bold my-2'>Expense!</h2>
            <div className='flex flex-row justify-end mx-4 mb-2'>
                <p className='text-2xl'>Total Expense: {totalSum} BDT</p>
            </div>
            <div>
                <div className="overflow-x-auto" style={{ height: '430px' }}>
                    <form>
                        <table className="table w-full">
                            <thead className='text-xs sticky top-0 bg-slate-300' style={{ width: "1200px" }}>
                                <tr>
                                    <th className='p-1 border-2'>#</th>
                                    <th className='p-1 border-2'>Date</th>
                                    <th className='p-1 border-2'>Voucher No</th>
                                    <th className='p-1 border-2'>Purpose Name</th>
                                    <th className='p-1 border-2'>Description</th>
                                    <th className='p-1 border-2'>Amount</th>
                                    <th className='p-1 border-2'>Action</th>
                                </tr>
                            </thead>

                            <tbody className='w-fit text-xs'>
                                {
                                    expenses?.expenses?.length > 0 &&
                                    expenses?.expenses?.map((online, i) =>
                                        <tr key={online._id}>
                                            <th className='p-1 border-2'>{i + 1}</th>
                                            <td className='p-1 border-2'>{online?.createdAt.slice(0, -14)}</td>
                                            <td className='p-1 border-2'>{online?.voucherNo}</td>
                                            <td className='p-1 border-2'>{online?.purpose}</td>
                                            <td className='p-1 border-2'>{online?.discription}</td>
                                            <td className='p-1 border-2'>{online?.amount}</td>
                                            <td className='p-1 border-2'>
                                                <p className='btn btn-xs btn-denger' onClick={() => handleDelete(online)} >Delete</p>
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

export default Expense;