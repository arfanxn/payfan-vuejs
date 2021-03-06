import Swal from "sweetalert2";
import Helpers from "../Helpers";
import AuthService from "../services/AuthService";

export default class SwalPlugin {
    static close() {
        return Swal.close();
    }

    static async alert({
        title,
        html,
        icon
    }) {
        return await Swal.fire({
            title: title ? title : Helpers.ENV("APP_TITLE"),
            html,
            icon,
            allowEscapeKey: true,
            allowOutsideClick: true,
            closeOnClickOutside: true,
            showCancelButton: false, // There won't be any cancel button
            showConfirmButton: false, // There won't be any confirm button 
            buttons: false,
            closeOnConfirm: false,
        });
    }

    static async alertPositioned({
        title,
        html,
        icon,
        position,
        timer,
    }) {
        return await Swal.fire({
            position: position || 'top-end',
            html,
            icon: icon || 'success',
            title: title || Helpers.ENV("APP_TITLE"),
            showConfirmButton: false,
            timer: timer || 1000
        })
    }

    static async confirm({
        title,
        html,
        icon,
        showDenyButton,
        denyButtonColor,
        denyButtonText,
        cancelButtonText,
        confirmButtonText,
        allowEscapeKey,
        allowOutsideClick
    }) {
        return await Swal.fire({
            title: title || Helpers.ENV("APP_TITLE"),
            html,
            icon,
            showDenyButton: showDenyButton || false,
            denyButtonColor: denyButtonColor || null,
            denyButtonText: denyButtonText || "No",
            showCancelButton: true,
            backdrop: true,
            allowEscapeKey: allowEscapeKey || true,
            allowOutsideClick: allowOutsideClick || true,
            cancelButtonText: cancelButtonText || "Cancel",
            confirmButtonText: confirmButtonText || "Confirm",
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

                showResendButtonTimerCountdown();

                Swal.getPopup().querySelector('#next').addEventListener("click", () => {
                    // begin validation
                    if (inputVerificationCode.value.length != 6) {
                        Swal.showValidationMessage("Verification Code must be 6 chars!");
                    } else if ((inputVerificationCode.value).match(/\D/)) {
                        Swal.showValidationMessage("Please enter number only!");
                    } else if (!inputVerificationCode.value) {
                        Swal.showValidationMessage(`Please enter Verification Code!`);
                    }
                    // end validation

                    if (typeof onConfirmCallback == "function") { // trigger "onConfirmCallback"
                        onConfirmCallback(inputVerificationCode.value).then(response => {
                            if (response.statusText.toLowerCase() == "verifyverificationcodemiddleware") {
                                if ("verification_code_error_message" in response.data)
                                    Swal.showValidationMessage(`${response.data.verification_code_error_message}`);
                            }
                            return response;
                        });
                    }
                });

                const btnResend = Swal.getPopup().querySelector('#resend');
                btnResend.addEventListener("click", async () => { // listen to click events on the button resend verfication code
                    let response;

                    if (resendCallbackOrObjectOrEmail == null) {
                        response = await AuthService.createVerificationCode();
                    } else if (typeof resendCallbackOrObjectOrEmail == "function") {
                        resendCallbackOrObjectOrEmail();
                    } else if (typeof resendCallbackOrObjectOrEmail == "object") {
                        response = await AuthService.createVerificationCode(resendCallbackOrObjectOrEmail.email);
                    } else if (typeof resendCallbackOrObjectOrEmail == "string") {
                        response = await AuthService.createVerificationCode(resendCallbackOrObjectOrEmail)
                    } else {
                        null; // still on progress build  
                    }

                    if ((response.statusText == "OK" || resendCallbackOrObjectOrEmail == null || "status" in response ||
                            response.status == 429) && typeof resendCallbackOrObjectOrEmail != "function") {
                        showResendButtonTimerCountdown();
                    }
                });

                function showResendButtonTimerCountdown() {
                    new Promise(() => {
                        let ratelimitRemaining = 60;
                        let countdownBtnResend = setInterval(() => {
                            ratelimitRemaining -= 1;
                            btnResend.disabled = true;
                            btnResend.childNodes[1].innerHTML = `(${ratelimitRemaining})`;

                            if (!ratelimitRemaining) {
                                btnResend.disabled = false;
                                btnResend.childNodes[1].innerHTML = "";
                                clearInterval(countdownBtnResend);
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

    static async autoCloseAlert(title, html = null, icon, timer = 2000) {
        return await Swal.fire({
            title,
            html,
            timer,
            icon,
            timerProgressBar: true,
            allowOutsideClick: false,
            allowEscapeKey: false,
            didOpen: () => {
                Swal.showLoading()
            },
        });
    }
}