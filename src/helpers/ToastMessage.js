//external lib import
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class ToastMessage {
    static successMessage(msg) {
        return toast.success(msg, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
        });
    }
    static errorMessage(msg) {
        return toast.error(msg, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
        });
    }
}

export default ToastMessage;
