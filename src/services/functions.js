import axios from "axios";
import SwalPlugin from '@/plugins/SwalPlugin.js'
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
    SwalPlugin.confirm({
        title: 'Confirm your payment',
        html: `Send money ${amountInUSD} to "${name}" ?`,
        icon: 'question'
    }).then(result => {
        if (result.isConfirmed) {
            Helpers.closeBSModal(`#btn-close-modal-transfer-preview`).then(() => {
                AuthService.createVerificationCode().then(() => {
                    SwalPlugin.verificationCode("Verify to continue", async verificationCode => {
                        return await TransactionService.sendMoney({
                            amount,
                            note,
                            to_wallet: wallet['address'],
                            code: verificationCode,
                        }).then(r => {
                            if (r.status == 200) {
                                SwalPlugin.autoCloseAlert('Send Money success', `Send money to "${name}", amount ${amountInUSD} successfully.`, "success", 2000);
                            }
                            return r;
                        })
                    })
                })
            });
        }
    });
};