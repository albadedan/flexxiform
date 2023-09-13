<script>
export default {
    emits: [ 'edit', 'delete'],
    props: {
        editColor: {
            type: String,
            default: 'success'
        },
        deleteColor: {
            type: String,
            default: 'error'
        },
        variant: {
            type: String,
            default: 'tonal'
        },
    }
}
</script>

<template>
    <v-toolbar-items :variant="variant">
        <v-tooltip text="Edit" location="bottom">
            <template v-slot:activator="{ props }">
                <v-btn
                v-bind="props"
                :color="editColor"
                icon="mdi-pencil-outline"
                @click.stop="$emit('edit')"></v-btn>
            </template>
        </v-tooltip>
        <v-tooltip text="Delete" location="bottom">
            <template v-slot:activator="{ props }">
                <v-btn
                v-bind="props"
                :color="deleteColor"
                icon="mdi-trash-can-outline"
                @click.stop="$emit('delete')"></v-btn>
            </template>
        </v-tooltip>
    </v-toolbar-items>
</template>