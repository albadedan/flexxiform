<script>
export default {
    name: 'NotificationView',
    emits: [ 'update' ],
    props: {
        show: {
            type: Boolean,
            default: false,
            required: true
        },
        color: {
            type: String,
            default: ''
        }
    },
    computed: {
        isVisible: {
            get() { return this.show },
            set (value) { this.$emit('update', value) }
        }
    }
}
</script>

<template>
    <Teleport to="#app_notification_area">
        <v-snackbar
        v-model="isVisible"
        :color="color"
        >
            <slot name="text"></slot>
        </v-snackbar>
    </Teleport>
</template>