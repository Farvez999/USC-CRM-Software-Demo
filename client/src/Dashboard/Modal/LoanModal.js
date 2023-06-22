import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

const LoanModal = ({ updateData, setUpdateData, setFilterData }) => {
    console.log(updateData)

    // const [loanReceive, setLoanReceive] = useState()

    const handleSubmit = e => {
        e.preventDefault();

        const loan = e.target.loanDue.value;

        // if (update.loanAmount < loan) {
        //     console.log("Total loan amount to update Loan amount bigger than")
        // }
        // else if (update.loanDue < loan) {
        //     console.log("Loan amount to update Loan amount bigger than")
        // }
        // else {
        const loanReceive = {
            loanDue: updateData.loanDue === -1 ? updateData.loanAmount - loan : updateData.loanDue - loan
        };
        console.log(loanReceive)
        // }




        axios.patch(`http://localhost:5000/update-loan-pay/${updateData._id}`, loanReceive)
            .then((data) => {
                // console.log(data);
                // setFilterData(data)
                toast.success('Loan Updates Success')
                setUpdateData(null)
            });

    }

    const handleCloseBtn = () => {
        setUpdateData(null)
    }
    return (
        <>
            <input type="checkbox" id="loanModal" className="modal-toggle" />
            <div className="modal  mt-4">
                <div className="modal-box relative">
                    <label htmlFor="loanModal" onClick={handleCloseBtn} className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">Update Info</h3>
                    <form onSubmit={handleSubmit} className='grid grid-cols-1 gap-2 mt-6'>
                        <div className='flex flex-row gap-2'>
                            <input type="text" className="input w-full input-bordered " disabled value={updateData.loanReceipt} />
                            <input type="text" disabled value={updateData.loanReceive} className="input w-full input-bordered" />
                            <input type="email" disabled value={updateData.loanAmount} className="input w-full input-bordered" />
                        </div>

                        <div className='flex flex-row gap-2'>
                            <input type="text" disabled value={updateData.loanPurpose} className="input w-full input-bordered" />

                            <input name="loanDue" type="text" className="input w-full input-bordered" />
                        </div>


                        <br />
                        <input className='btn btn-accent w-full' type='submit' value="Submit" />
                    </form>
                </div>

            </div>
        </>
    );
};

export default LoanModal;