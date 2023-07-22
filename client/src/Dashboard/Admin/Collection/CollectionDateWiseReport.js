import React, { useEffect, useRef, useState } from 'react';
import ReactToPrint from 'react-to-print';

const CollectionDateWiseReport = () => {

    const [filterData, setFilterData] = useState([])
    const [collections, setCollectionData] = useState([])
    const [collectionsCourse, setCourseCollectionData] = useState([])
    const [extraCollectionTotal, setExtraCollectionTotal] = useState([])
    const [courseCollectionTotal, setCourseCollectionTotal] = useState([])

    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();

    const componentRef = useRef();
    const [show, setShow] = useState(false);

    // Collection Api Load
    useEffect(() => {
        fetch("https://demo-usc-crm-software.vercel.app/collection")
            .then(response => response.json())
            .then(data => {
                // setFilterData(data)
                setCollectionData(data)
            })
    }, [])

    // Collection Course Api Load
    useEffect(() => {
        fetch("https://demo-usc-crm-software.vercel.app/leads?admission=true&admissionStatus=true")
            .then(response => response.json())
            .then(data => {
                setCourseCollectionData(data)
            })
    }, [])


    // -------------Collection Date to Date wise Filter Start--------------------
    const handleCollectionStartInputChange = event => {
        const value = event.target.value;
        setStartDate(value)
    }

    const handleCollectionEndInputChange = event => {
        const value = event.target.value;
        setEndDate(value)
    }

    const handleCollectionDateSearch = () => {
        var resultExpenseData = collections?.collection?.filter(a => (a.createdAt) >= startDate && (a.createdAt) <= endDate);
        setFilterData(resultExpenseData)
        setShow(true)
        console.log(resultExpenseData)

        var totalAmount = 0;
        for (var i = 0; i < resultExpenseData.length; i++) {
            totalAmount += resultExpenseData[i].amount
        }
        setExtraCollectionTotal(totalAmount)

        //Course Collection Data
        var resultProductDataFrist = collectionsCourse.filter(a => (a.fristInstallmentDate) >= startDate && (a.fristInstallmentDate) <= endDate);
        console.log(resultProductDataFrist)
        setShow(true)

        var resultProductDataTwo = collectionsCourse.filter(a => (a.secondInstallmentDate) >= startDate && (a.secondInstallmentDate) <= endDate);
        console.log(resultProductDataTwo)

        var resultProductDataThird = collectionsCourse.filter(a => (a.thirdInstallmentDate) >= startDate && (a.thirdInstallmentDate) <= endDate);
        console.log(resultProductDataThird)


        var totalOne = 0;
        for (var tsOne = 0; tsOne < resultProductDataFrist.length; tsOne++) {
            totalOne += resultProductDataFrist[tsOne].fristInstallment
        }
        console.log("Sum of the array values is: ", totalOne);

        var totalTwo = 0;
        for (var tsTwo = 0; tsTwo < resultProductDataTwo.length; tsTwo++) {
            totalTwo += resultProductDataTwo[tsTwo].secondInstallment
        }

        console.log("Sum of the array values is: ", totalTwo);

        var totalThree = 0;
        for (var tsThree = 0; tsThree < resultProductDataThird.length; tsThree++) {
            totalThree += resultProductDataThird[tsThree].thirdInstallment
        }
        console.log("Sum of the array values is: ", totalThree);

        const totalColloction = totalOne + totalTwo + totalThree
        console.log(totalColloction)
        setCourseCollectionTotal(totalColloction)

    };
    // -------------Collection Date to Date wise Filter End--------------------


    return (
        <div className='mx-2 my-6'>
            <div className='flex flex-row justify-around'>
                <h2 className='text-2xl font-bold'>Date Wise Collection Report!</h2>

            </div>

            {/* ------Collection Start Date and End Date------ */}
            <div className='flex flex-row justify-center mt-2'>
                <div className="form-control mx-2">
                    <label className="label">
                        <span className="label-text">Collection Start Date</span>
                    </label>
                    <input onChange={handleCollectionStartInputChange} name="" type="date" className="input input-sm w-full input-bordered" />
                </div>

                <div className="form-control mx-2">
                    <label className="label">
                        <span className="label-text">Collection End Date</span>
                    </label>
                    <input onChange={handleCollectionEndInputChange} name="" type="date" className="input input-sm w-full input-bordered" />
                </div>

                <div className='mt-8 mx-2'>
                    <button
                        onClick={handleCollectionDateSearch}
                        className="btn btn-sm btn-primary text-white bg-green-500"
                    >
                        Filter
                    </button>
                </div>

                <div className='my-8 mx-4'>
                    <ReactToPrint
                        trigger={() => <button className='btn btn-sm btn-primary'>Print</button>}
                        content={() => componentRef.current}
                    />
                </div>
            </div>
            {/* ------Collection Start Date and End Date------ */}


            <div ref={componentRef}>
                {show &&
                    <div className='text-center p-2'>
                        <h1 className='font-bold text-3xl'>Universe It Institute</h1>
                        <h3>{startDate} to {endDate} Extra Collection {extraCollectionTotal} BDT</h3>
                    </div>}
                <div className="overflow-auto">
                    <form>
                        <table className="table w-full">

                            <thead className='sticky top-0 bg-slate-300' style={{ width: "1200px" }}>
                                <tr className='text-xs'>
                                    <th className='p-1 border-2'>#</th>
                                    <th className='p-1 border-2'>Date</th>
                                    <th className='p-1 border-2'>Money Receipt</th>
                                    <th className='p-1 border-2'>Purpose Name</th>
                                    <th className='p-1 border-2'>Description</th>
                                    <th className='p-1 border-2'>Receive By</th>
                                    <th className='p-1 border-2'>Receive From</th>
                                    <th className='p-1 border-2'>Amount</th>
                                    <th className='p-1 border-2'>Action</th>
                                </tr>
                            </thead>
                            <tbody className='text-xs'>
                                {
                                    filterData?.length > 0 &&
                                    filterData?.map((admission, i) => (
                                        <>
                                            <tr >
                                                <th className='p-1 border-2'>{i + 1}</th>
                                                <td className='p-1 border-2'>{admission?.createdAt.slice(0, -14)}</td>
                                                <td className='p-1 border-2'>{admission?.moneyReceipt}</td>
                                                <td className='p-1 border-2'>{admission?.purpose}</td>
                                                <td className='p-1 border-2'>{admission?.discription}</td>
                                                <td className='p-1 border-2'>{admission?.receiveBy}</td>
                                                <td className='p-1 border-2'>{admission?.receiveFrom}</td>
                                                <td className='p-1 border-2'>{admission?.amount}</td>
                                                {/* <td className='p-1 border-2'>
                                                <p className='btn btn-xs btn-denger' onClick={() => handleDelete(admission)} >Delete</p>
                                            </td> */}
                                            </tr>
                                        </>
                                    )
                                    )
                                }

                            </tbody>
                        </table>
                    </form>
                </div>
                <div className='mt-2 mx-1 flex justify-end'>
                    <p className='p-1 border-2'> Total Course Collection : {courseCollectionTotal} BDT</p>
                    <p className='p-1 border-2'> Total Extra Collection : {extraCollectionTotal} BDT</p>
                    <p className='p-1 border-2'>== Total Collection : {courseCollectionTotal + extraCollectionTotal} BDT</p>
                </div>
            </div>
        </div>
    );
};

export default CollectionDateWiseReport;