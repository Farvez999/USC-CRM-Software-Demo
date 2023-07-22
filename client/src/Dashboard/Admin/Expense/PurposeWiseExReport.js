import React, { useEffect, useRef, useState } from 'react';
import ReactToPrint from 'react-to-print';

const PurposeWiseExReport = () => {

    const [filterData, setFilterData] = useState([])
    const [expenses, setExpenseData] = useState([])
    const componentRef = useRef();
    const [show, setShow] = useState(false);
    const voucherNoRef = useRef();
    console.log(expenses)


    useEffect(() => {
        fetch("https://demo-usc-crm-software.vercel.app/expense")
            .then(response => response.json())
            .then(data => {
                setExpenseData(data)
            })
    }, [])

    const uniqueExpensesData = [...new Set(expenses?.expenses?.map(user => user.purpose))];
    console.log(uniqueExpensesData)


    // -------------Collection Date to Date wise Filter Start--------------------

    const handleCollectionDateSearch = () => {
        const fData = expenses?.expenses?.filter(si => (si?.purpose) === voucherNoRef.current.value)
        setFilterData(fData)
        setShow(true)

    };
    // -------------Collection Date to Date wise Filter End--------------------

    return (
        <div className='mx-2 my-6'>
            <div className='flex flex-row justify-around'>
                <h2 className='text-2xl font-bold'>Purpose Wise Expense Report!</h2>

            </div>

            <div className='flex flex-row justify-center mt-2'>
                <div className="form-control mx-2">
                    <label className="label">
                        <span className="label-text">Purpose Name</span>
                    </label>
                    <select
                        ref={voucherNoRef}
                        className="select select-sm w-full border-gray-400"
                    >
                        <option >Purpose Name</option>
                        {uniqueExpensesData.map((purpose, index) => (
                            <option
                                key={index}
                                value={purpose}>
                                {purpose}
                            </option>
                        ))}
                        {/* {
                            expenses?.expenses?.map((user) =>
                                <option
                                    key={user._id}
                                    value={user.purpose}>
                                    {user.purpose}
                                </option>
                            )
                        } */}
                    </select>
                    {/* <input list="data" ref={voucherNoRef} className='input input-bordered input-sm' placeholder="Purpose Name here...."></input>
                    <datalist id='data'>
                        {
                            expenses?.expenses?.map((user) =>
                                <option
                                    key={user._id}
                                    value={user.purpose}>
                                    {user.purpose}
                                </option>
                            )
                        }
                    </datalist> */}

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


            <div ref={componentRef}>
                {show &&
                    <div className='text-center p-2'>
                        <h1 className='font-bold text-3xl'>Universe It Institute</h1>
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
            </div>
        </div>
    );
};

export default PurposeWiseExReport;