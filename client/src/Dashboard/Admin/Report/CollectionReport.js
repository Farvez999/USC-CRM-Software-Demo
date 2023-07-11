import React, { useContext, useEffect, useRef, useState } from 'react';
import ReactToPrint, { PrintContextConsumer } from 'react-to-print';
import PayReport from './BatchReport';
import { AuthContext } from '../../../contexts/AuthProvider';

const CollectionReport = () => {

    const { user } = useContext(AuthContext)
    const [filterData, setFilterData] = useState([])
    const [admissions, setAdmissionsData] = useState([])
    const [total, setTotal] = useState([])

    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();

    const [show, setShow] = useState(false);

    useEffect(() => {
        fetch("http://localhost:5000/leads?admission=true&admissionStatus=true")
            .then(response => response.json())
            .then(data => {
                setAdmissionsData(data)
            })
    }, [])

    const componentRef = useRef();

    // -------------Collection Date to Date wise Filter Start--------------------
    const handleCollectionStartInputChange = event => {
        const value = event.target.value;
        setStartDate(value)
        // console.log(typeof (value));
    }

    const handleCollectionEndInputChange = event => {
        const value = event.target.value;
        setEndDate(value)
        // console.log(value);
    }

    const handleCollectionDateSearch = () => {
        var resultProductDataFrist = admissions.filter(a => (a.fristInstallmentDate) >= startDate && (a.fristInstallmentDate) <= endDate);
        // setFilterData(resultProductDataFrist)
        console.log(resultProductDataFrist)
        setShow(true)



        resultProductDataFrist.forEach(element => {
            const all = []
            all.push({ "data": element, "status": "frist" });
            // return all;
            console.log(all)
        });

        var resultProductDataTwo = admissions.filter(a => (a.secondInstallmentDate) >= startDate && (a.secondInstallmentDate) <= endDate);
        // setFilterData(resultProductDataTwo)
        console.log(resultProductDataTwo)

        var resultProductDataThird = admissions.filter(a => (a.thirdInstallmentDate) >= startDate && (a.thirdInstallmentDate) <= endDate);
        // setFilterData(resultProductDataThird)
        console.log(resultProductDataThird)

        const aa = [...resultProductDataFrist, ...resultProductDataTwo, ...resultProductDataThird]
        setFilterData(aa)


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
        setTotal(totalColloction)

    };
    // -------------Collection Date to Date wise Filter End--------------------

    return (
        <div className='mx-2 my-6'>
            <div className='flex flex-row justify-around'>
                <h2 className='text-2xl font-bold'>Date Wise Collection Report!</h2>

            </div>

            {/* <div className='mt-8 mx-2'>


                <button
                    onClick={() => setShow(!show)}
                    className="btn btn-sm btn-primary text-white bg-green-500"
                >
                    Show
                </button>
            </div> */}

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
                        Collection Date Filter
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
                        <h3>{startDate} to {endDate} Collection {total} BDT</h3>
                    </div>}
                <div className="overflow-auto">
                    <form>
                        <table className="table w-full">

                            <thead className='sticky top-0 bg-slate-300' style={{ width: "1200px" }}>
                                <tr className='text-xs'>
                                    <th className='p-1 border-2'>#</th>
                                    {/* <th className='p-1 border-2'>Date</th> */}
                                    <th className='p-1 border-2'>C.N</th>
                                    <th className='p-1 border-2'>B.N</th>
                                    <th className='p-1 border-2'>U.N</th>
                                    {/* <th className='p-1 border-2'>H.N</th> */}
                                    <th className='p-1 border-2'>Name</th>
                                    <th className='p-1 border-2'>Phone</th>
                                    {/* <th className='p-1 border-2'>Email</th> */}
                                    {/* <th className='p-1 border-2'>A Fee</th> */}
                                    <th className='p-1 border-2'>Payment Method</th>
                                    <th className='p-1 border-2'>Transaction Id</th>
                                    <th className='p-1 border-2'>Transaction Date</th>
                                    <th className='p-1 border-2'>Pay Ammount</th>
                                    {/* <th className='p-1 border-2'>2nd Pay</th>
                                    <th className='p-1 border-2'>3rd Pay</th> */}
                                    {/* <th className='p-1 border-2'>Due</th> */}
                                    {/* <th className='p-1 border-2'>Action</th> */}
                                </tr>
                            </thead>
                            <tbody className='text-xs'>
                                {
                                    filterData.length > 0 &&
                                    filterData?.map((admission, i) => (
                                        <>
                                            <tr >
                                                <th className='p-1 border-2'>{i + 1}</th>
                                                {/* <td className='p-1 border-2'>{admission?.updatedAt.slice(0, -14)}</td> */}
                                                <td className='p-1 border-2'>{admission?.course.name}</td>
                                                <td className='p-1 border-2'>{admission?.batch.name}</td>
                                                <td className='p-1 border-2'>{admission.user.name}</td>
                                                {/* <td className='p-1 border-2'>{admission.head.name}</td> */}
                                                <td className='p-1 border-2'>{admission.name}</td>
                                                <td className='p-1 border-2'>{admission?.phone?.split('p:', 2)}</td>
                                                {/* <td className='p-1 border-2'>{admission?.email?.split('@', 1)}</td> */}
                                                {/* <td className='p-1 border-2'>{admission.admissionFee}</td> */}

                                                <td className='p-1 border-2'>

                                                    {
                                                        new Date(admission.fristInstallmentDate) >= new Date(startDate) &&
                                                            new Date(admission.fristInstallmentDate) <= new Date(endDate) ? admission.fristPaymentAccounts : new Date(admission.secondInstallmentDate) >= new Date(startDate) &&
                                                                new Date(admission.secondInstallmentDate) <= new Date(endDate) ? admission.secondPaymentAccounts : new Date(admission.thirdInstallmentDate) >= new Date(startDate) &&
                                                                    new Date(admission.thirdInstallmentDate) <= new Date(endDate) ? admission.thirdPaymentAccounts : 0
                                                    }
                                                </td>
                                                <td className='p-1 border-2'>

                                                    {
                                                        new Date(admission.fristInstallmentDate) >= new Date(startDate) &&
                                                            new Date(admission.fristInstallmentDate) <= new Date(endDate) ? admission.fristInstallmentTID : new Date(admission.secondInstallmentDate) >= new Date(startDate) &&
                                                                new Date(admission.secondInstallmentDate) <= new Date(endDate) ? admission.secondInstallmentTID : new Date(admission.thirdInstallmentDate) >= new Date(startDate) &&
                                                                    new Date(admission.thirdInstallmentDate) <= new Date(endDate) ? admission.thirdInstallmentTID : 0
                                                    }
                                                </td>

                                                <td className='p-1 border-2'>

                                                    {
                                                        new Date(admission.fristInstallmentDate) >= new Date(startDate) &&
                                                            new Date(admission.fristInstallmentDate) <= new Date(endDate) ? admission.fristInstallmentDate : new Date(admission.secondInstallmentDate) >= new Date(startDate) &&
                                                                new Date(admission.secondInstallmentDate) <= new Date(endDate) ? admission.secondInstallmentDate : new Date(admission.thirdInstallmentDate) >= new Date(startDate) &&
                                                                    new Date(admission.thirdInstallmentDate) <= new Date(endDate) ? admission.thirdInstallmentDate : 0
                                                    }
                                                </td>

                                                <td className='p-1 border-2'>
                                                    {
                                                        new Date(admission.fristInstallmentDate) >= new Date(startDate) &&
                                                            new Date(admission.fristInstallmentDate) <= new Date(endDate) ? admission.fristInstallment : new Date(admission.secondInstallmentDate) >= new Date(startDate) &&
                                                                new Date(admission.secondInstallmentDate) <= new Date(endDate) ? admission.secondInstallment : new Date(admission.thirdInstallmentDate) >= new Date(startDate) &&
                                                                    new Date(admission.thirdInstallmentDate) <= new Date(endDate) ? admission.thirdInstallment : 0
                                                    }

                                                </td>

                                                {/* <td className='p-1 border-2'>{admission.fristInstallment}</td> */}
                                                {/* <td className='p-1 border-2'>{admission.secondInstallment === 0 ? admission.nextInstallmentDate : admission.secondInstallment}</td>
                                                <td className='p-1 border-2'>{admission.thirdInstallment === 0 ? admission.nextInstallmentDate : admission.thirdInstallment}</td> */}
                                                {/* <td className='p-1 border-2'>{admission.closePayment === true ? 0 : admission.admissionFee && (admission.admissionFee - (admission.fristInstallment + admission.secondInstallment + admission.thirdInstallment))}</td> */}

                                                {/* <td className='p-1 border-2'>
                                                    <label onClick={() => handleUpdate(admission)} htmlFor="payModal" className="btn btn-xs btn-accent">Edit</label>
                                                </td>
                                                <td className='p-1 border-2 flex flex-col'>
                                                    <p className='btn btn-xs btn-danger p-1 m-1' onClick={() => handleClosePayment(admission)} >Close</p>
                                                    <p className='btn btn-xs btn-accent p-1 m-1' onClick={() => handleOpenPayment(admission)} >Open</p>
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
                {/* {
                        filterData.map(fd => setClosePayment(fd.closePayment))
                    } */}
                <div className='mt-2 mx-1 flex justify-end'>
                    <p className='p-1 border-2'> Total : {total} BDT</p>
                    {/* <p className='p-1 border-2'> Due : {due} BDT</p> */}
                </div>
            </div>
        </div>
    );
};

export default CollectionReport;