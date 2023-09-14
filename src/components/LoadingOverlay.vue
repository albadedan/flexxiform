<script>
export default {
    name: 'LoadingOverlay',
    props: {
        show: {
            type: Boolean,
            default: false,
            required: true
        }
    }
}
</script>

<template>
    <Teleport to="#app_loading_area">
        <v-overlay
        :model-value="show"
        persistent
        class="align-center justify-center"
        >
            <v-progress-circular
            color="primary"
            indeterminate
            size="84"
            >Flexxiform</v-progress-circular>
        </v-overlay>
    </Teleport>
</template>