import Swal from "sweetalert2";
// import AuthService from "../services/AuthService";

export default class SwalPlugin {
    static close() {
        return Swal.close();
    }

    static async alert(title, html) {
        return await Swal.fire({
            title,
            html,
            allowEscapeKey: true,
            allowOutsideClick: true,
            closeOnClickOutside: true,
            showCancelButton: false, // There won't be any cancel button
            showConfirmButton: false, // There won't be any confirm button 
            buttons: false,
            closeOnConfirm: false,
        });
    }

    static async showVerificationCode(title = 'Verify') {
        return await Swal.fire({
            title,
            html: `<input type="text" id="verification-code" class="swal2-input " placeholder="Verification Code"><br><small class="text-break">OTP has been sent to your email.</small>`,
            allowEscapeKey: false,
            allowOutsideClick: false,
            closeOnClickOutside: false,
            closeOnConfirm: false,
            confirmButtonText: 'Next',
            confirmButtonColor: "#003087",
            focusConfirm: false,
            preConfirm: () => {
                const verificationCode = Swal.getPopup().querySelector('#verification-code');
                const verificationCodeValue = verificationCode.value;

                if (verificationCodeValue.length != 6) {
                    Swal.showValidationMessage("Verification Code must be 6 chars!");
                }
                if ((verificationCodeValue).match(/\D/)) {
                    Swal.showValidationMessage("Please enter number only!");
                }
                if (!verificationCodeValue) {
                    Swal.showValidationMessage(`Please enter Verification Code!`);
                }
                return {
                    verification_code: verificationCodeValue
                };
            }
        });
    }

    static async showLoading(callback = null) {
        Swal.fire({
            title: 'Please wait. . .',
            allowEscapeKey: false,
            allowOutsideClick: false,
            closeOnClickOutside: false,
            showCancelButton: false, // There won't be any cancel button
            showConfirmButton: false, // There won't be any confirm button 
            buttons: false,
            closeOnConfirm: false,
            didOpen: () => {
                Swal.showLoading();
            }
        })

        // if u want to use "callback" parameter/argument of this function please make sure your callback returning a value and also asynchronus function/callback; 
        if (typeof callback == "function") {
            const resultOfCallback = await callback().then(
                () => Swal.close()
            ).catch(() => Swal.close());
            return await resultOfCallback;
        }
        // if "callback" parameter/argument of this function is null or not a function, then return Swal;  
        return Swal;
    }
}