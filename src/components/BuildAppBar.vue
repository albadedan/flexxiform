<script>
export default {
    name: 'BuildAppBar',
    props: {
        disabled: {
            type: Boolean,
            default: true
        }
    }
}
</script>

<template>
    <v-toolbar>
        <v-toolbar-title>
            Form Builder
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items
        variant="tonal">
            <v-btn color="blue">Save</v-btn>
            <v-btn :disabled="disabled" color="success">Publish</v-btn>
        </v-toolbar-items>
    </v-toolbar>
</template>