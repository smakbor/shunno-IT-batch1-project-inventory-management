//External Lib Import
import { t } from 'i18next';
import Swal from 'sweetalert2';

class AleartMessage {
    static DeleteFile(arg, request) {
        return Swal.fire({
            title: 'Delete Confirmation',
            input: 'checkbox',
            inputPlaceholder: 'delete permanently',
            showCancelButton: true,
            confirmButtonText: 'Delete',
            cancelButtonText: 'Cancel',
        }).then(function (result) {
            if (result.value === 1) {
                return request({ ...arg, permanent: true })
            } else if (result.value === 0) {
                return request({ ...arg, permanent: false })
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
}

export default AleartMessage;
