import axios from "axios";
import SwalPlugin from '@/plugins/SwalPlugin.js'
import StrHelper from "@/helpers/StrHelper.js";
// import Swal from "sweetalert2";

import TransactionService from '@/services/TransactionService.js'
import Helpers from '@/Helpers.js'
import AuthService from '@/services/AuthService.js'

export const searchPeoplesOnPayfan = async (keyword) => {
    try {
        const response = await axios.get(`/api/users-and-contacts/search`, {
            params: {
                keyword
            }
        });

        return response;
    } catch (error) {
        return error.response;
    }
}

export const handleSendPayment = ({
    amount,
    name,
    note,
    wallet,
    amountInUSD
}) => {
    const walletAddress = typeof wallet === 'string' ? wallet : wallet['address'];
    amountInUSD = amountInUSD ? amountInUSD : StrHelper.make(amount).toUSD().get();

    SwalPlugin.confirm({
        title: 'Confirm your payment',
        html: `Send payment ${amountInUSD} to "${name}" ?`,
        icon: 'question'
    }).then(result => {
        if (result.isConfirmed) {
            Helpers.closeBSModal(`#btn-close-modal-transfer-preview`).then(() => {
                AuthService.createVerificationCode().then(() => {
                    SwalPlugin.verificationCode("Verify to continue", async verificationCode => {
                        return await TransactionService.sendPayment({
                            amount,
                            note,
                            to_wallet: walletAddress,
                            code: verificationCode,
                        }).then(r => {
                            if (r.status == 200) {
                                SwalPlugin.autoCloseAlert('Send Payment success', `Send payment to "${name}", amount ${amountInUSD} successfully.`, "success", 2000);
                            } else if ("error_message" in r.data) {
                                SwalPlugin.autoCloseAlert(r.data.error_message, null, "error", 2000);
                            }
                            return r;
                        })
                    })
                })
            });
        }
    });
};

export const handleMakeRequestPayment = ({
    amount,
    wallet,
    note,
    name,
    amountInUSD
}) => {
    const walletAddress = typeof wallet === 'string' ? wallet : wallet['address'];
    amountInUSD = amountInUSD ? amountInUSD : StrHelper.make(amount).toUSD().get();

    SwalPlugin.confirm({
        title: 'Make a request',
        html: `Request a payment for ${amountInUSD} from "${name}" ?`,
        icon: 'question'
    }).then(result => {
        if (result.isConfirmed) {
            Helpers.closeBSModal(`#btn-close-modal-transfer-preview`).then(() => {
                TransactionService.makeRequestPayment({
                    amount,
                    note,
                    to_wallet: walletAddress,
                }).then(r => {
                    if (r.status == 200) {
                        SwalPlugin.alertPositioned({
                            title: "Request sent",
                            html: `Request a payment for ${amountInUSD} from "${name}" has been sent, and waiting for approval from "${name}".`,
                            icon: 'success',
                            timer: 5000,
                        });
                    } else if ("error_message" in r.data) {
                        SwalPlugin.autoCloseAlert(r.data.error_message, null, "error", 2000);
                    }
                    return r;
                })
            });
        }
    });
};