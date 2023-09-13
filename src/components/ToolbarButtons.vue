<script>
export default {
    emits: [ 'edit', 'moveUp', 'moveDown', 'delete'],
    props: {
        editColor: {
            type: String,
            default: 'success'
        },
        arrowUpColor: {
            type: String,
            default: 'blue'
        },
        arrowDownColor: {
            type: String,
            default: 'blue'
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
        <v-tooltip text="Move Down" location="bottom">
            <template v-slot:activator="{ props }">
                <v-btn
                v-bind="props"
                :color="arrowDownColor"
                icon="mdi-arrow-down-bold-outline"
                @click.stop="$emit('moveDown')"></v-btn>
            </template>
        </v-tooltip>
        <v-tooltip text="Move Up" location="bottom">
            <template v-slot:activator="{ props }">
                <v-btn
                v-bind="props"
                :color="arrowUpColor"
                icon="mdi-arrow-up-bold-outline"
                @click.stop="$emit('moveUp')"></v-btn>
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