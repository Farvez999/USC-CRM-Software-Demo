import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

const Expense = () => {

    const [collectionsCourse, setCollectionData] = useState([])

    const { data: expenses = [], refetch } = useQuery({
        queryKey: ['expenses'],
        queryFn: async () => {
            const res = await fetch(`https://demo-usc-crm-software.vercel.app/expense`);
            const data = await res.json();
            return data;
        }
    });

    const handleDelete = (leads) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this item?');
        if (!confirmDelete) {
            return;
        }


        fetch(`https://demo-usc-crm-software.vercel.app/delete-expense/${leads._id}`, {
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
        // console.log(totalSum)
    }

    // Total Extra Collections
    const { data: extraCollections = [] } = useQuery({
        queryKey: ['extraCollections'],
        queryFn: async () => {
            const res = await fetch(`https://demo-usc-crm-software.vercel.app/collection`);
            const data = await res.json();
            return data;
        }
    });

    var totalExtraCollection = 0;
    for (var tec = 0; tec < extraCollections?.collection?.length; tec++) {
        totalExtraCollection += extraCollections.collection[tec].amount
        // console.log(totalExtraCollection)
    }
    // Total Extra Collections


    //Course Collection Api Load
    useEffect(() => {
        fetch("https://demo-usc-crm-software.vercel.app/leads?admission=true&admissionStatus=true")
            .then(response => response.json())
            .then(data => {
                setCollectionData(data)
            })
    }, [])

    // console.log(collectionsCourse)

    //Course Collection Data
    var resultProductDataFrist = collectionsCourse.filter(a => a.fristInstallment);
    // console.log(resultProductDataFrist)
    // // setShow(true)

    var resultProductDataTwo = collectionsCourse.filter(a => a.secondInstallment);
    // console.log(resultProductDataTwo)

    var resultProductDataThird = collectionsCourse.filter(a => a.thirdInstallment);
    // console.log(resultProductDataThird)

    // // const aa = [...resultProductDataFrist, ...resultProductDataTwo, ...resultProductDataThird]
    // // setFilterData(aa)


    var totalOne = 0;
    for (var tsOne = 0; tsOne < resultProductDataFrist.length; tsOne++) {
        totalOne += resultProductDataFrist[tsOne].fristInstallment
    }
    // console.log("Sum of the array values is: ", totalOne);

    var totalTwo = 0;
    for (var tsTwo = 0; tsTwo < resultProductDataTwo.length; tsTwo++) {
        totalTwo += resultProductDataTwo[tsTwo].secondInstallment
    }

    // console.log("Sum of the array values is: ", totalTwo);

    var totalThree = 0;
    for (var tsThree = 0; tsThree < resultProductDataThird.length; tsThree++) {
        totalThree += resultProductDataThird[tsThree].thirdInstallment
    }
    // console.log("Sum of the array values is: ", totalThree);

    const totalColloction = (totalOne + totalTwo + totalThree)
    // console.log(totalColloction)
    // setCollectionTotal(totalColloction)

    return (
        <div>
            <h2 className='text-2xl font-bold my-2'>Expense!</h2>
            <div className='border-2 p-2'>
                <p className='text-1xl'>Total Course Collection: {totalColloction} BDT + Total Extra Collection: {totalExtraCollection} BDT - Total Expense: {totalSum} BDT = Total Cash In: {(totalColloction + totalExtraCollection) - totalSum} BDT</p>
                {/* <p className='text-2xl'>Total Extra Collection: {totalExtraCollection} BDT</p>
                <p className='text-2xl'>Total Expense: {totalSum} BDT</p> */}
                <hr></hr>
                {/* <p className='text-2xl'>Total Cash In: {(totalColloction + totalExtraCollection) - totalSum} BDT</p> */}
            </div>
            {/* <div className='flex flex-row justify-end mx-4 mb-2'>
                <p className='text-2xl'>Total Expense: {totalSum} BDT</p>
            </div> */}
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
                                    <th className='p-1 border-2'>Expense By</th>
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
                                            <td className='p-1 border-2'>{online?.date?.slice(0, -14)}</td>
                                            <td className='p-1 border-2'>{online?.voucherNo}</td>
                                            <td className='p-1 border-2'>{online?.purpose}</td>
                                            <td className='p-1 border-2'>{online?.expenseBy}</td>
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