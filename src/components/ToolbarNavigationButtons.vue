<script>
export default {
    emits: ['moveUp', 'moveDown'],
    props: {
        color: {
            type: String,
            default: 'blue'
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
        <v-tooltip text="Move Down" location="bottom">
            <template v-slot:activator="{ props }">
                <v-btn
                v-bind="props"
                :color="color"
                icon="mdi-arrow-down-bold-outline"
                @click.stop="$emit('moveDown')"></v-btn>
            </template>
        </v-tooltip>
        <v-tooltip text="Move Up" location="bottom">
            <template v-slot:activator="{ props }">
                <v-btn
                v-bind="props"
                :color="color"
                icon="mdi-arrow-up-bold-outline"
                @click.stop="$emit('moveUp')"></v-btn>
            </template>
        </v-tooltip>
    </v-toolbar-items>
</template>