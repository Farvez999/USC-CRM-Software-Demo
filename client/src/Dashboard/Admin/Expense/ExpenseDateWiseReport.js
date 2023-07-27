import React, { useEffect, useRef, useState } from 'react';
import ReactToPrint from 'react-to-print';

const ExpenseDateWiseReport = () => {

    const [filterData, setFilterData] = useState([])
    const [expenses, setExpenseData] = useState([])
    const [collections, setCollectionData] = useState([])
    const [expenseTotal, setExpenseTotal] = useState([])
    const [collectionTotal, setCollectionTotal] = useState([])

    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();

    const componentRef = useRef();
    const [show, setShow] = useState(false);

    // Expense Api Load
    useEffect(() => {
        fetch("https://demo-usc-crm-software.vercel.app/expense")
            .then(response => response.json())
            .then(data => {
                // setFilterData(data)
                setExpenseData(data)
            })
    }, [])

    // Collection Api Load
    useEffect(() => {
        fetch("https://demo-usc-crm-software.vercel.app/leads?admission=true&admissionStatus=true")
            .then(response => response.json())
            .then(data => {
                setCollectionData(data)
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
        var resultExpenseData = expenses?.expenses?.filter(a => (a.createdAt) >= startDate && (a.createdAt) <= endDate);
        setFilterData(resultExpenseData)
        setShow(true)
        // console.log(resultExpenseData)

        var totalAmount = 0;
        for (var i = 0; i < resultExpenseData.length; i++) {
            totalAmount += resultExpenseData[i].amount
        }
        setExpenseTotal(totalAmount)

        // Collection Data
        var resultProductDataFrist = collections.filter(a => (a.fristInstallmentDate) >= startDate && (a.fristInstallmentDate) <= endDate);
        // console.log(resultProductDataFrist)
        setShow(true)

        var resultProductDataTwo = collections.filter(a => (a.secondInstallmentDate) >= startDate && (a.secondInstallmentDate) <= endDate);
        // console.log(resultProductDataTwo)

        var resultProductDataThird = collections.filter(a => (a.thirdInstallmentDate) >= startDate && (a.thirdInstallmentDate) <= endDate);
        // console.log(resultProductDataThird)

        // const aa = [...resultProductDataFrist, ...resultProductDataTwo, ...resultProductDataThird]
        // setFilterData(aa)


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

        const totalColloction = totalOne + totalTwo + totalThree
        // console.log(totalColloction)
        setCollectionTotal(totalColloction)

    };
    // -------------Collection Date to Date wise Filter End--------------------


    return (
        <div className='mx-2 my-6'>
            <div className='flex flex-row justify-around'>
                <h2 className='text-2xl font-bold'>Date Wise Expense Report!</h2>

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
                        <h3>{startDate} to {endDate} Expense {expenseTotal} BDT</h3>
                    </div>}
                <div className="overflow-auto">
                    <form>
                        <table className="table w-full">

                            <thead className='sticky top-0 bg-slate-300' style={{ width: "1200px" }}>
                                <tr className='text-xs'>
                                    <th className='p-1 border-2'>#</th>
                                    <th className='p-1 border-2'>Date</th>
                                    <th className='p-1 border-2'>Voucher No</th>
                                    <th className='p-1 border-2'>Purpose</th>
                                    <th className='p-1 border-2'>Discription</th>
                                    <th className='p-1 border-2'>Amount</th>
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
                                                <td className='p-1 border-2'>{admission?.voucherNo}</td>
                                                <td className='p-1 border-2'>{admission?.purpose}</td>
                                                <td className='p-1 border-2'>{admission?.discription}</td>
                                                <td className='p-1 border-2'>{admission?.amount}</td>

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
                    <p className='p-1 border-2'> Total Collection : {collectionTotal} BDT</p>
                    <p className='p-1 border-2'> Total Expense : {expenseTotal} BDT</p>
                    <p className='p-1 border-2'> Total Profit : {collectionTotal - expenseTotal} BDT</p>
                </div>
            </div>
        </div>
    );
};

export default ExpenseDateWiseReport;