<script>
import NotificationView from './NotificationView.vue';
export default {
    name: 'IdChip',
    props: {
        instanceId: {
            type: String,
            required: true
        },
        parentType: {
            type: String,
            required: true
        },
        parentInstance: {
            type: String,
            required: false
        }
    },
    data() {
        return {
            notify: false,
            success: false,
        }
    },
    components: {
        NotificationView,
    },
    computed: {
        uiText() {
            return this.instanceId.substring(0, (this.instanceId.lastIndexOf("-") + 4))
        }
    },
    methods: {
        copyIdToClipboard: async function() {
            try {
                await navigator.clipboard.writeText(this.instanceId);
                this.success = true
                this.notify = true
            } catch(err) {
                this.success = false
                this.notify = true
            }
        }
    }
}
</script>

<template>
    <NotificationView
    :show="notify"
    :color="(success ? 'success' : 'error')"
    @update="notify = $event">
        <template #text>{{ (success ? `Copied ID ${uiText}... to clipboard` : 'Could not copy the id to your clipboard.') }}</template>
    </NotificationView>

    <v-tooltip :text="instanceId" location="top">
        <template v-slot:activator="{ props }">
            <v-chip
            v-bind="props"
            @click="copyIdToClipboard"
            >
                ID: {{ uiText }}
            </v-chip>
        </template>
    </v-tooltip>
</template>