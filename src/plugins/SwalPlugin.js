import Swal from "sweetalert2";

export default class SwalPlugin {
    static close() {
        return Swal.close();
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