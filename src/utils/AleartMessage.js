//External Lib Import
import { t } from 'i18next';
import Swal from 'sweetalert2';

class AleartMessage {
    static DeleteFile(arg, request) {
        return Swal.fire({
            title: t("are you sure"),
            text: t("you wont be able to revert this"),
            icon: 'warning',
            input: 'checkbox',
            inputPlaceholder: t('delete permanently'),
            showCancelButton: true,
            confirmButtonText: t('delete'),
            cancelButtonText: t('cancel'),
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: t('yes delete'),
        }).then(function (result) {
            if (result.value === 1) {
                if (Array.isArray(arg?.mediaIds)) {
                    return request({ mediaIds: arg.mediaIds, store: arg.store, permanent: true })
                }
                else {
                    return request({ ...arg, permanent: true })

                }
            } else if (result.value === 0) {
                if (Array.isArray(arg?.mediaIds)) {
                    return request({ mediaIds: arg.mediaIds, store: arg.store, permanent: false })
                }
                else {
                    return request({ ...arg, permanent: false })
                }
            }
        });

    }
    static Delete(id, request) {
        return Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                return request(id);
            }
        });
    }

    static Update(email, status, option, request) {
        return Swal.fire({
            title: 'Change Status',
            input: 'select',
            inputOptions: option,
            inputValue: status,
        }).then((result) => {
            if (result.isConfirmed) {
                return request(email, result.value).then((res) => {
                    return res;
                });
            }
        });
    }
    static SuccessFul(message) {
        return Swal.fire({
            toast: true,
            position: 'top',
            icon: 'success',
            title: message,
            showConfirmButton: false,
            timer: 3000
        });
    }
}

export default AleartMessage;
