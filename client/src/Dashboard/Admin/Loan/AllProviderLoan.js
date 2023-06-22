import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import LoanRecModal from '../../Modal/LoanRecModal';

const AllProviderLoan = () => {

    const [updateData, setUpdateData] = useState()

    const { data: loans = [], refetch } = useQuery({
        queryKey: ['loans'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/loan?loanProvideStatus=true`);
            const data = await res.json();
            return data;
        }
    });

    const handleDelete = (leads) => {
        console.log(leads._id);

        fetch(`http://localhost:5000/delete-loan/${leads._id}`, {
            method: 'DELETE',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => {
                return res.json()
            })
            .then(data => {
                toast.success(`Leads ${leads.loanPurpose} deleted successfully`)
                refetch()
            })
    }

    const handleUpdate = (admission) => {
        setUpdateData(admission)
    }


    return (
        <div>
            <h1 className='text-2xl font-bold my-2'>All Provide Loan</h1>
            <div>
                <div className="overflow-x-auto" style={{ height: '430px' }}>
                    <form>
                        <table className="table w-full">
                            <thead className='text-xs sticky top-0 bg-slate-300' style={{ width: "1200px" }}>
                                <tr>
                                    <th className='p-1 border-2'>#</th>
                                    <th className='p-1 border-2'>Date</th>
                                    <th className='p-1 border-2'>Loan Receipt No</th>
                                    <th className='p-1 border-2'>Loan Purpose</th>
                                    <th className='p-1 border-2'>Loan Provider</th>
                                    <th className='p-1 border-2'>Description</th>
                                    <th className='p-1 border-2'>Amount</th>
                                    <th className='p-1 border-2'>Due</th>
                                    <th className='p-1 border-2'>Action</th>
                                </tr>
                            </thead>

                            <tbody className='w-fit text-xs'>
                                {
                                    loans?.loans?.length > 0 &&
                                    loans?.loans?.map((online, i) =>
                                        <tr key={online._id}>
                                            <th className='p-1 border-2'>{i + 1}</th>
                                            <td className='p-1 border-2'>{online?.createdAt.slice(0, -14)}</td>
                                            <td className='p-1 border-2'>{online?.loanReceipt}</td>
                                            <td className='p-1 border-2'>{online?.loanPurpose}</td>
                                            <td className='p-1 border-2'>{online?.loanProvide}</td>
                                            <td className='p-1 border-2'>{online?.discription}</td>
                                            <td className='p-1 border-2'>{online?.loanAmount}</td>
                                            <td className='p-1 border-2'>{online?.loanProvideDue === -1 ? online?.loanProvideDue + 1 : online?.loanProvideDue === 0 ? 'paid' : online?.loanProvideDue}</td>
                                            <td className='p-1 border-2'>
                                                <p className='btn btn-xs btn-denger' onClick={() => handleDelete(online)} >Delete</p>
                                                <label onClick={() => handleUpdate(online)} htmlFor="loanRecModal" className="btn btn-xs btn-success ml-2">Loan Receive</label>
                                            </td>
                                        </tr>
                                    )
                                }

                            </tbody>

                        </table>
                    </form>
                </div>
            </div>
            {
                updateData &&
                <LoanRecModal
                    updateData={updateData}
                    setUpdateData={setUpdateData}
                >
                </LoanRecModal>
            }
        </div>
    );
};

export default AllProviderLoan;