import React, { useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthProvider';
import { useQuery } from '@tanstack/react-query';

const RevPayableLoan = () => {

    const value = localStorage.getItem('myValue');

    const { loansPayData } = useContext(AuthContext);

    const { data: revLoan = [], refetch } = useQuery({
        queryKey: ['revLoan'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/loan/rev`);
            const data = await res.json();
            return data;
        }
    });

    console.log(revLoan)

    const totalLoan = loansPayData?.loans?.filter((item) => item._id === value);
    const loanAmount = totalLoan?.map(item => parseInt(item.loanAmount));


    const matchingItems = revLoan?.loans?.filter((item) => item?.loanId?._id === value);
    console.log(matchingItems)
    const amounts = matchingItems?.map(item => parseInt(item.revAmmount));
    const revAmmount = amounts?.reduce((total, amount) => total + amount, 0);


    const tt = loanAmount - revAmmount;

    return (
        <div>
            <h1 className='text-2xl font-bold my-2'>Loan Receive Details: {value}</h1>
            <h2 className='text-1xl font-bold my-2'>Loan Amount: {loanAmount} - Loan Receive: {revAmmount} = Loan Due: {tt}</h2>

            <table className="table w-full">
                <thead className='text-xs sticky top-0 bg-slate-300' style={{ width: "1200px" }}>
                    <tr>
                        <th className='p-1 border-2'>#</th>
                        <th className='p-1 border-2'>Date</th>
                        <th className='p-1 border-2'>Loan Receipt No</th>
                        <th className='p-1 border-2'>Loan Purpose</th>
                        <th className='p-1 border-2'>Loan Payable Name</th>
                        <th className='p-1 border-2'>Description</th>
                        <th className='p-1 border-2'>Receive Amount</th>
                    </tr>
                </thead>

                <tbody className='w-fit text-xs'>

                    {matchingItems?.length > 0 ? (
                        matchingItems.map((item, i) => (
                            <tr key={item._id}>
                                <th className='p-1 border-2'>{i + 1}</th>
                                <td className='p-1 border-2'>{item?.createdAt.slice(0, -14)}</td>
                                <td className='p-1 border-2'>{item?.loanReceipt}</td>
                                <td className='p-1 border-2'>{item?.loanId?.loanPurpose}</td>
                                <td className='p-1 border-2'>{item?.loanId?.loanProvide}</td>
                                <td className='p-1 border-2'>{item?.discription}</td>
                                <td className='p-1 border-2'>{item?.revAmmount}</td>
                            </tr>
                        ))
                    ) : (
                        <p>No matching items found</p>
                    )}

                </tbody >

            </table >




        </div >
    );
};

export default RevPayableLoan;