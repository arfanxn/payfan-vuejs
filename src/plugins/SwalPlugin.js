import Swal from "sweetalert2";
import Helpers from "../Helpers";
import AuthService from "../services/AuthService";
// import AuthService from "../services/AuthService";

export default class SwalPlugin {
    static close() {
        return Swal.close();
    }

    static async alert(title = Helpers.ENV("APP_TITLE"), html = "") {
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

    static async verificationCode(title = 'Verify', onConfirmCallback, resendCallbackOrObjectOrEmail = null) {
        return await Swal.fire({
            title,
            html: `<input type="text" id="verification-code" class="swal2-input " placeholder="Verification Code"><br><small class="text-break">OTP has been sent to your email.</small>
            <div class=" pt-2 pb-1 text-center ">
                <button id="resend" disabled class="btn btn-light">Resend<span class="ms-1">(60)</span></button>
                <span class="px-1"></span>
                <button id="next"
                class="btn btn-primary"
                style="background-color:#003087 !important;">Next</button>
            </div>`,
            allowEscapeKey: false,
            allowOutsideClick: false,
            showCancelButton: false,
            showConfirmButton: false,
            closeOnClickOutside: false,
            closeOnConfirm: false,
            confirmButtonText: 'Next',
            confirmButtonColor: "#003087",
            focusConfirm: false,
            didOpen() {
                let inputVerificationCode = Swal.getPopup().querySelector('#verification-code');

                btnResendTimerCountdown();

                Swal.getPopup().querySelector('#next').addEventListener("click", () => {
                    if (inputVerificationCode.value.length != 6) {
                        Swal.showValidationMessage("Verification Code must be 6 chars!");
                    } else if ((inputVerificationCode.value).match(/\D/)) {
                        Swal.showValidationMessage("Please enter number only!");
                    } else if (!inputVerificationCode.value) {
                        Swal.showValidationMessage(`Please enter Verification Code!`);
                    }

                    if (typeof onConfirmCallback == "function") {
                        onConfirmCallback(inputVerificationCode.value);
                    }
                });

                const btnResend = Swal.getPopup().querySelector('#resend');
                btnResend.addEventListener("click", async () => {
                    let response;

                    if (typeof resendCallbackOrObjectOrEmail == "function") {
                        resendCallbackOrObjectOrEmail();
                    } else if (typeof resendCallbackOrObjectOrEmail == "object") {
                        response = await AuthService.createVerificationCode(resendCallbackOrObjectOrEmail.email);
                    } else if (typeof resendCallbackOrObjectOrEmail == "string") {
                        response = await AuthService.createVerificationCode(resendCallbackOrObjectOrEmail)
                    } else {
                        null; // still on progress build  
                    }

                    if (response.status == 429 && typeof resendCallbackOrObjectOrEmail != "function") {
                        btnResendTimerCountdown();
                    }
                });

                function btnResendTimerCountdown() {
                    new Promise(() => {
                        let timer60Sec = 60;
                        let resendInterval = setInterval(() => {
                            timer60Sec -= 1;
                            btnResend.disabled = true;
                            btnResend.childNodes[1].innerHTML = `(${timer60Sec})`;

                            if (!timer60Sec) {
                                btnResend.disabled = false;
                                btnResend.childNodes[1].innerHTML = "";
                                clearInterval(resendInterval);
                            }
                        }, 1000);
                    })
                }
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

    static async autoCloseAlert(title, html, timer = 2000) {
        return await Swal.fire({
            title,
            html,
            timer,
            timerProgressBar: true,
            allowOutsideClick: false,
            allowEscapeKey: false,
            didOpen: () => {
                Swal.showLoading()
            },
        });
    }
}