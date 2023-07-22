import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

const Collection = () => {

    const [collectionsCourse, setCollectionData] = useState([])
    // const [collectionTotal, setCollectionTotal] = useState([])

    const { data: collections = [], refetch } = useQuery({
        queryKey: ['expenses'],
        queryFn: async () => {
            const res = await fetch(`https://demo-usc-crm-software.vercel.app/collection`);
            const data = await res.json();
            return data;
        }
    });


    const handleDelete = (leads) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this item?');
        if (!confirmDelete) {
            return;
        }

        fetch(`https://demo-usc-crm-software.vercel.app/delete-collection/${leads._id}`, {
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
    for (var ts = 0; ts < collections?.collection?.length; ts++) {
        totalSum += collections.collection[ts].amount
        // console.log(totalSum)
    }

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
            <h2 className='text-2xl font-bold'>Total Collection!</h2>
            <div className='border-2 p-2'>
                <p className='text-1xl'>Total Course Collection: {totalColloction} BDT BDT + Total Extra Collection: {totalSum} BDT = Total Collection: {totalColloction + totalSum} BDT</p>
                {/* <p className='text-2xl'>Total Course Collection: {totalColloction} BDT</p> */}
                {/* <p className='text-2xl'>Total Extra Collection: {totalSum} BDT</p> */}
                <hr></hr>
                {/* <p className='text-2xl'>Total Collection: {totalColloction + totalSum} BDT</p> */}
            </div>
            <div>
                <div className="overflow-x-auto" style={{ height: '430px' }}>
                    <form>
                        <table className="table w-full">
                            <thead className='text-xs sticky top-0 bg-slate-300' style={{ width: "1200px" }}>
                                <tr>
                                    <th className='p-1 border-2'>#</th>
                                    <th className='p-1 border-2'>Date</th>
                                    <th className='p-1 border-2'>Money Receipt</th>
                                    <th className='p-1 border-2'>Purpose Name</th>
                                    <th className='p-1 border-2'>Payment Type</th>
                                    <th className='p-1 border-2'>Description</th>
                                    <th className='p-1 border-2'>Receive By</th>
                                    <th className='p-1 border-2'>Receive From</th>
                                    <th className='p-1 border-2'>Amount</th>
                                    <th className='p-1 border-2'>Action</th>
                                </tr>
                            </thead>

                            <tbody className='w-fit text-xs'>
                                {
                                    collections?.collection?.length > 0 &&
                                    collections?.collection?.map((online, i) =>
                                        <tr key={online._id}>
                                            <th className='p-1 border-2'>{i + 1}</th>
                                            <td className='p-1 border-2'>{online?.date?.slice(0, -14)}</td>
                                            <td className='p-1 border-2'>{online?.moneyReceipt}</td>
                                            <td className='p-1 border-2'>{online?.purpose}</td>
                                            <td className='p-1 border-2'>{online?.payType}</td>
                                            <td className='p-1 border-2'>{online?.discription}</td>
                                            <td className='p-1 border-2'>{online?.receiveBy}</td>
                                            <td className='p-1 border-2'>{online?.receiveFrom}</td>
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

export default Collection;