<script>
export default {
    name: 'ModalView',
    emits: ['cancel', 'accept', 'dismiss'],
    props: {
        show: {
            type: Boolean,
            default: false,
            required: true
        }
    },
    computed: {
        displayStatus: {
            get() { return this.show },
            set (value) { this.$emit('dismiss', value) }
        }
    },
    methods: {
        dismiss: function( /** @type {string} */ emitting ) {
            this.displayStatus = false
            if (emitting === 'cancel') {
                this.$emit('cancel')
            } else {
                this.$emit('accept')
            }
        }
    }
}
</script>

<template>
    <Teleport to="#app_modal_area">
        <div class="text-center">
            <v-dialog
            v-model="displayStatus"
            persistent
            width="auto"
            >
            <v-card>
                <v-card-title>
                    <slot name="title">
                        {{ "use <template #title></template> to fill the slot." }}
                    </slot>
                </v-card-title>
                <v-card-text>
                    <slot name="body">
                        {{ "use <template #body></template> to fill the slot." }}
                    </slot>
                </v-card-text>
                <v-card-actions>
                    <slot name="actions">
                        <v-spacer></v-spacer>
                        <v-btn
                        color="error"
                        variant="tonal"
                        @click="dismiss('cancel')">Cancel</v-btn>
                        <v-btn
                        color="blue"
                        variant="tonal"
                        @click="dismiss('accept')">Yes</v-btn>
                    </slot>
                </v-card-actions>
            </v-card>
            </v-dialog>
        </div>
    </Teleport>
</template>