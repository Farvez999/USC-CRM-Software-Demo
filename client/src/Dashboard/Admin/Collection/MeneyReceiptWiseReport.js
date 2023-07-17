import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useRef, useState } from 'react';
import ReactToPrint from 'react-to-print';

const MeneyReceiptWiseReport = () => {

    const [filterData, setFilterData] = useState([])
    const [collections, setCollectionData] = useState([])
    const componentRef = useRef();
    const [show, setShow] = useState(false);
    const moneyReceiptRef = useRef();


    useEffect(() => {
        fetch("http://localhost:5000/collection")
            .then(response => response.json())
            .then(data => {
                setCollectionData(data)
            })
    }, [])

    // -------------Collection Date to Date wise Filter Start--------------------

    const handleCollectionDateSearch = () => {

        console.log("first")
        const fData = collections?.collection?.filter(si => (si?.moneyReceipt) === moneyReceiptRef.current.value)
        setFilterData(fData)
        setShow(true)

    };
    // -------------Collection Date to Date wise Filter End--------------------


    return (
        <div className='mx-2 my-6'>
            <div className='flex flex-row justify-around'>
                <h2 className='text-2xl font-bold'>Money Receipt Wise CollectionReport!</h2>

            </div>

            <div className='flex flex-row justify-center mt-2'>
                <div className="form-control mx-2">
                    <label className="label">
                        <span className="label-text">Money Receipt No</span>
                    </label>
                    <select
                        ref={moneyReceiptRef}
                        className="select select-sm w-full border-gray-400"
                    >
                        <option >Money Receipt No</option>
                        {
                            collections?.collection?.map((user) =>
                                <option
                                    key={user._id}
                                    value={user.moneyReceipt}>
                                    {user.moneyReceipt}
                                </option>
                            )
                        }
                    </select>
                    {/* <input list="data" ref={moneyReceiptRef} className='input input-bordered input-sm' placeholder="Money Receipt No here...."></input>
                    <datalist id='data'>
                        {
                            collections?.collection?.map((user) =>
                                <option
                                    key={user._id}
                                    value={user.moneyReceipt}>
                                    {user.moneyReceipt}
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
                                    <th className='p-1 border-2'>Money Receipt No</th>
                                    <th className='p-1 border-2'>Purpose</th>
                                    <th className='p-1 border-2'>Discription</th>
                                    <th className='p-1 border-2'>receiveBy</th>
                                    <th className='p-1 border-2'>receiveFrom</th>
                                    <th className='p-1 border-2'>Amount</th>
                                </tr>
                            </thead>
                            <tbody className='text-xs'>
                                {
                                    filterData.length > 0 &&
                                    filterData?.map((admission, i) => (
                                        <>
                                            <tr >
                                                <th className='p-1 border-2'>{i + 1}</th>
                                                <td className='p-1 border-2'>{admission?.createdAt.slice(0, -14)}</td>
                                                <td className='p-1 border-2'>{admission?.moneyReceipt}</td>
                                                <td className='p-1 border-2'>{admission?.purpose}</td>
                                                <td className='p-1 border-2'>{admission?.discription}</td>
                                                <td className='p-1 border-2'>{admission?.receiveBy
                                                }</td>
                                                <td className='p-1 border-2'>{admission?.receiveFrom
                                                }</td>
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

export default MeneyReceiptWiseReport;