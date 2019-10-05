import Swal from 'sweetalert2'

export default {
    success(){
        Swal.fire({
            title: '成功',
            type: 'success',
            position: 'center',
            timer: 1000,
            showConfirmButton: false
        })
    },
    failure(){
        Swal.fire({
            title: '失敗した',
            text: '失敗した',
            type: 'error',
            position: 'center',
            timer: 1000,
            showConfirmButton: false
        })
    }
}