<script>
import ModalView from './ModalView.vue'
export default {
    name: 'PeekCode',
    emits: ['update'],
    props: {
        show: {
            type: Boolean,
            required: true
        }
    },
    components: {
        ModalView
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
    <ModalView
    :show="isVisible"
    >

        <template #title>
            <slot name="title"></slot>
        </template>

        <template #body>
            <slot name=body></slot>
        </template>

        <template #actions>
            <div></div>
        </template>

    </ModalView>
</template>