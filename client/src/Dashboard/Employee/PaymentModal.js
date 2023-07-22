import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useRef, useState, } from 'react';
import { toast } from 'react-hot-toast';

const PaymentModal = ({ admission, setAdmission, refetchUpdateData }) => {
    // console.log(admission);

    const fristPaymentAccountsRef = useRef()
    const secondPaymentAccountsRef = useRef()
    const thirdPaymentAccountsRef = useRef()

    const handleSubmit = e => {
        e.preventDefault();

        // console.log(admission)

        const admissionFee = e.target.admissionFee.value;

        const batch = e.target.batch.value;
        const preBatch = e.target.preBatch.value;

        const fristInstallment = e.target.fristInstallment.value;
        const fristPaymentAccounts = fristPaymentAccountsRef.current.value;
        console.log(fristPaymentAccounts)
        const fristInstallmentTID = e.target.fristInstallmentTID.value;
        const fristInstallmentDate = e.target.fristInstallmentDate.value;

        const secondInstallment = e.target.secondInstallment.value;
        const secondPaymentAccounts = secondPaymentAccountsRef.current.value;
        console.log(secondPaymentAccounts)
        const secondInstallmentTID = e.target.secondInstallmentTID.value;
        const secondInstallmentDate = e.target.secondInstallmentDate.value;

        const thirdInstallment = e.target.thirdInstallment.value;
        const thirdPaymentAccounts = thirdPaymentAccountsRef.current.value;
        console.log(thirdPaymentAccounts)
        const thirdInstallmentTID = e.target.thirdInstallmentTID.value;
        const thirdInstallmentDate = e.target.thirdInstallmentDate.value;

        const nextInstallmentDate = e.target.nextInstallmentDate.value;

        // const paymentAccounts = e.target.paymentAccounts.value;
        // const transactionId = e.target.transactionId.value;
        const totalInstallment = e.target.totalInstallment.value;

        const admissionStatus = true;

        // console.log(admissionFee, fristInstallment, fristPaymentAccounts,fristInstallmentTID,fristInstallmentDate, nextInstallmentDate, );
        const user = {
            admissionStatus,
            admissionFee,

            batch,
            batchId: admission.batch.id,
            preBatch,

            fristInstallment,
            fristPaymentAccounts,
            fristInstallmentTID,
            fristInstallmentDate,

            secondInstallment,
            secondPaymentAccounts,
            secondInstallmentTID,
            secondInstallmentDate,

            thirdInstallment,
            thirdPaymentAccounts,
            thirdInstallmentTID,
            thirdInstallmentDate,

            nextInstallmentDate,
            totalInstallment

        };

        console.log(user)

        axios.patch(`https://demo-usc-crm-software.vercel.app/update-admission-pay/${admission._id}`, user)
            .then((data) => {
                // console.log(data);
                toast.success('Lead Updates Success')
                setAdmission(null)
                refetchUpdateData()
            });

    }

    const handleCloseBtn = () => {
        setAdmission(null)
    }

    const { data: paygetwaysName = [] } = useQuery({
        queryKey: ['paygetwaysName'],
        queryFn: async () => {
            const res = await fetch(`https://demo-usc-crm-software.vercel.app/pay-getway`);
            const data = await res.json();
            return data;
        }
    });

    console.log(paygetwaysName)


    return (
        <>
            <input type="checkbox" id="payModal" className="modal-toggle" />
            <div className="modal  mt-4">
                <div className="modal-box relative">
                    <label htmlFor="payModal" onClick={handleCloseBtn} className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">Update Info</h3>
                    <form onSubmit={handleSubmit} className='grid grid-cols-1 gap-2 mt-6'>
                        <div className='flex flex-row gap-2'>
                            <input type="text" disabled value={admission?.name} className="input w-full input-bordered " />

                            <input name="name" type="text" defaultValue={admission?.phone} disabled placeholder="Your Name" className="input w-full input-bordered" />
                            <input name="email" type="email" defaultValue={admission?.email ? admission?.email : 'Email not Found'} disabled placeholder="Email Address" className="input w-full input-bordered p-1" />
                        </div>

                        <div className='flex flex-row gap-2'>
                            <input name="batch" type="text" defaultValue={admission?.batch?.name} placeholder="Change Batch Name" className="input w-full input-bordered" />

                            <input name="preBatch" type="text" defaultValue={admission.batch.name} disabled placeholder="Email Address" className="input w-full input-bordered" />
                        </div>
                        {/* <label className="label">
                            <span className="label-text">Admission Fee</span>
                        </label>
                        <input name="admissionFee" type="text" placeholder="Ex: 6000" defaultValue={admission.admissionFee} className="input input-sm w-full input-bordered" /> */}

                        <div className='flex flex-row gap-2'>
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Admission Fee</span>
                                </label>
                                <input name="admissionFee" type="text" defaultValue={admission.admissionFee ? admission.admissionFee : 0} disabled={admission.admissionFee !== 0 ? true : false} className="input input-sm w-full input-bordered" />
                            </div>
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Total Installment</span>
                                </label>
                                <select name="totalInstallment" defaultValue={admission.totalInstallment} disabled={admission.admissionFee !== 0 ? true : false} className="select select-bordered select-sm w-full">
                                    <option disabled selected>Total Installment</option>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                </select>
                            </div>
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Next Installment Date</span>
                                </label>
                                <input name="nextInstallmentDate" type="date" defaultValue={admission.nextInstallmentDate} placeholder="Next Installment Date" className="input input-sm w-full input-bordered" />
                            </div>
                        </div>

                        {/* <label className="label">
                            <span className="label-text">Frist Installment</span>
                        </label>
                        <input name="fristInstallment" type="text" placeholder="Ex : 2000" defaultValue={admission.fristInstallment} className="input input-sm w-full input-bordered" /> */}

                        <div className='flex flex-row gap-2'>
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">1st Install.</span>
                                </label>
                                {/* disabled={admission.fristInstallment !== 0 ? true : false} */}
                                <input name="fristInstallment" type="text" defaultValue={admission.fristInstallment ? admission.fristInstallment : 0} disabled={admission.fristInstallment !== 0 ? true : false} className="input input-sm w-full input-bordered" />
                            </div>
                            {/* <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Pay Accounts</span>
                                </label>
                                <select name="fristPaymentAccounts" defaultValue={admission.fristPaymentAccounts} disabled={admission.fristPaymentAccounts !== "Payment Accounts" ? true : false} className="select select-bordered select-sm w-full">
                                    <option disabled selected>Payment Accounts</option>
                                    <option>Bkash</option>
                                    <option>Nagad</option>
                                    <option>Bank</option>
                                </select>
                            </div> */}
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Pay Accounts</span>
                                </label>
                                <select
                                    name="fristPaymentAccounts"
                                    ref={fristPaymentAccountsRef}
                                    defaultValue={admission.fristPaymentAccounts} disabled={admission.fristPaymentAccounts !== "Payment Accounts" ? true : false}
                                    className="select select-sm w-full border-gray-400"
                                >
                                    <option disabled selected>Pay Accounts</option>
                                    {
                                        paygetwaysName?.users?.map((user) =>
                                            <option
                                                key={user._id}
                                                value={user.name}>
                                                {user.name}
                                            </option>
                                        )
                                    }
                                </select>
                            </div>

                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Install. T ID</span>
                                </label>
                                <input name="fristInstallmentTID" type="text" placeholder="Transaction ID" defaultValue={admission.fristInstallmentTID} disabled={admission.fristInstallmentTID !== "0" ? true : false} className="input input-sm w-full input-bordered" />
                            </div>
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Installment Date</span>
                                </label>
                                <input name="fristInstallmentDate" type="date" placeholder="Next Installment Date" defaultValue={admission.fristInstallmentDate} disabled={admission.fristInstallmentDate === "" ? false : true} className="input input-sm w-full input-bordered" />
                            </div>
                        </div>

                        {/* <label className="label">
                            <span className="label-text">Second Installment</span>
                        </label>
                        <input name="secondInstallment" type="text" placeholder="Ex : 2000" defaultValue={admission.secondInstallment ? admission.secondInstallment : 0} className="input input-sm w-full input-bordered" /> */}

                        <div className='flex flex-row gap-2'>
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">2nd Install.</span>
                                </label>
                                <input name="secondInstallment" type="text" defaultValue={admission.secondInstallment ? admission.secondInstallment : 0} disabled={admission.secondInstallment !== 0 ? true : false} className="input input-sm w-full input-bordered" />
                            </div>
                            {/* <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Pay Account</span>
                                </label>
                                <select name="secondPaymentAccounts" defaultValue={admission.secondPaymentAccounts} disabled={admission.secondPaymentAccounts !== "Payment Accounts" ? true : false} className="select select-bordered select-sm w-full">
                                    <option disabled selected>Payment Accounts</option>
                                    <option>Bkash</option>
                                    <option>Nagad</option>
                                    <option>Bank</option>
                                </select>
                            </div> */}
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Pay Accounts</span>
                                </label>
                                <select
                                    defaultValue={admission.secondPaymentAccounts}
                                    ref={secondPaymentAccountsRef}
                                    disabled={admission.secondPaymentAccounts !== "Payment Account" ? true : false}
                                    className="select select-sm w-full border-gray-400"
                                >
                                    <option disabled selected>Pay Accounts</option>
                                    {
                                        paygetwaysName?.users?.map((user) =>
                                            <option
                                                key={user._id}
                                                value={user.name}>
                                                {user.name}
                                            </option>
                                        )
                                    }
                                </select>
                            </div>
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Install. T ID</span>
                                </label>
                                <input name="secondInstallmentTID" type="text" placeholder="Transaction ID" defaultValue={admission?.secondInstallmentTID}
                                    disabled={admission.secondInstallmentTID !== "" ? true : false}
                                    className="input input-sm w-full input-bordered" />
                            </div>
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Installment Date</span>
                                </label>
                                <input name="secondInstallmentDate" type="date" defaultValue={admission.secondInstallmentDate ? admission.secondInstallmentDate : ""} disabled={admission.secondInstallmentDate !== "" ? true : false} className="input input-sm w-full input-bordered" />
                            </div>
                        </div>

                        {/* <label className="label">
                            <span className="label-text">Third Installment</span>
                        </label>
                        <input name="thirdInstallment" type="text" placeholder="Ex : 2000" defaultValue={admission.thirdInstallment ? admission.thirdInstallment : 0} className="input input-sm w-full input-bordered" /> */}

                        <div className='flex flex-row gap-2'>
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">3rd Install.</span>
                                </label>
                                <input name="thirdInstallment" type="text" placeholder="Ex : 2000" disabled={admission.thirdInstallment !== 0 ? true : false} defaultValue={admission.thirdInstallment ? admission.thirdInstallment : 0} className="input input-sm w-full input-bordered" />
                            </div>
                            {/* <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Pay Account</span>
                                </label>
                                <select name="thirdPaymentAccounts" defaultValue={admission.thirdPaymentAccounts} disabled={admission.thirdPaymentAccounts !== "Payment Accounts" ? true : false} className="select select-bordered select-sm w-full">
                                    <option disabled selected>Payment Accounts</option>
                                    <option>Bkash</option>
                                    <option>Nagad</option>
                                    <option>Bank</option>
                                </select>
                            </div> */}

                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Pay Accounts</span>
                                </label>
                                <select
                                    defaultValue={admission.thirdPaymentAccounts}
                                    disabled={admission.thirdPaymentAccounts !== "Payment Account" ? true : false}
                                    ref={thirdPaymentAccountsRef}
                                    className="select select-sm w-full border-gray-400"
                                >
                                    <option disabled selected>Pay Account</option>
                                    {
                                        paygetwaysName?.users?.map((user) =>
                                            <option
                                                key={user._id}
                                                value={user.name}>
                                                {user.name}
                                            </option>
                                        )
                                    }
                                </select>
                            </div>

                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Install. T ID</span>
                                </label>
                                <input name="thirdInstallmentTID" type="text" placeholder="Transaction ID" defaultValue={admission.thirdInstallmentTID} disabled={admission.thirdInstallmentTID !== "" ? true : false} className="input input-sm w-full input-bordered" />
                            </div>
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Installment Date</span>
                                </label>
                                <input name="thirdInstallmentDate" type="date" defaultValue={admission.thirdInstallmentDate} disabled={admission.thirdInstallmentDate !== "" ? true : false} className="input input-sm w-full input-bordered" />
                            </div>

                        </div>

                        {/* <label className="label">
                            <span className="label-text">Next Installment Date</span>
                        </label>
                        <input name="nextInstallmentDate" type="date" placeholder="Next Installment Date" className="input input-sm w-full input-bordered" /> */}

                        {/* <select name="paymentAccounts" className="select select-bordered select-sm w-full">
                            <option disabled selected>Payment Accounts</option>
                            <option>Bkash</option>
                            <option>Nagad</option>
                            <option>Bank</option>
                        </select>

                        <label className="label">
                            <span className="label-text">Transaction ID</span>
                        </label>
                        <input name="transactionId" type="text" placeholder="Transaction ID" className="input input-sm w-full input-bordered" /> */}

                        <br />
                        <input className='btn btn-accent w-full' type='submit' value="Submit" />
                        {/* <button type='submit' className="btn btn-sm btn-primary mr-2">Update</button> */}
                    </form>
                </div>

            </div>
        </>
    );
};

export default PaymentModal;