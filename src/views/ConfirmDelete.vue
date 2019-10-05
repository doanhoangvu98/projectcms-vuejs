<template>
    <div class="modal fade" id="modalDelete" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
            <h5 class="modal-title" id="">発売号の削除</h5>
            </div>
            <div class="modal-body">
            この発売号を削除してよろしいですか。
            </div>
            <div class="modal-footer">
            <button type="button" class="btn btn-secondary mr-auto">はい</button>
            <button type="button" class="btn btn-primary mr-auto" data-dismiss="modal">いいえ</button>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
export default {
        props: ['release'],
        methods: {
            show: function() {
                $('#modalDelete').modal('show')
            },
        }
    }
</script>
