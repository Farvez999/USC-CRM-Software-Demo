import axios from 'axios';
import React from 'react';
import { toast } from 'react-hot-toast';

const LoanRecModal = ({ updateData, setUpdateData }) => {

    console.log(updateData)

    // const [loanReceive, setLoanReceive] = useState()

    const handleSubmit = e => {
        e.preventDefault();

        const loan = e.target.loanProvideDue.value;

        // if (update.loanAmount < loan) {
        //     console.log("Total loan amount to update Loan amount bigger than")
        // }
        // else if (update.loanDue < loan) {
        //     console.log("Loan amount to update Loan amount bigger than")
        // }
        // else {
        const loanReceive = {
            loanProvideDue: updateData.loanProvideDue === -1 ? updateData.loanAmount - loan : updateData.loanProvideDue - loan
        };
        console.log(loanReceive)
        // }




        axios.patch(`https://demo-usc-crm-server.vercel.app/update-loanPro-pay/${updateData._id}`, loanReceive)
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
        <div>
            <input type="checkbox" id="loanRecModal" className="modal-toggle" />
            <div className="modal  mt-4">
                <div className="modal-box relative">
                    <label htmlFor="loanRecModal" onClick={handleCloseBtn} className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">Update Info</h3>
                    <form onSubmit={handleSubmit} className='grid grid-cols-1 gap-2 mt-6'>
                        <div className='flex flex-row gap-2'>
                            <input type="text" className="input w-full input-bordered " disabled value={updateData.loanReceipt} />
                            <input type="text" disabled value={updateData.loanProvide} className="input w-full input-bordered" />
                            <input type="email" disabled value={updateData.loanAmount} className="input w-full input-bordered" />
                        </div>

                        <div className='flex flex-row gap-2'>
                            <input type="text" disabled value={updateData.loanPurpose} className="input w-full input-bordered" />

                            <input name="loanProvideDue" type="text" className="input w-full input-bordered" />
                        </div>


                        <br />
                        <input className='btn btn-accent w-full' type='submit' value="Submit" />
                    </form>
                </div>

            </div>
        </div>
    );
};

export default LoanRecModal;