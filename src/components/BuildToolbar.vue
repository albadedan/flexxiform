<script>
import * as uuid from '../classes/uuids'
export default {
    name: 'BuildToolbar',
    emits: ['click'],
    props: {
        id: {
            type: String,
            default: uuid.generateStandard()
        },
        title: {
            type: String,
            default: 'Panel'
        },
        iconPosition: {
            type: String,
            default: 'append'
        },
        hidePointsLeft: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            hide: false,
            hideIcon: 'mdi-chevron-left',
            showIcon: 'mdi-chevron-right',
        }
    },
    methods: {
        toggleHide: function() {
            const element = document.getElementById(`${this.id}-${this.title}-panelVisibilityButton`)
            element?.classList.add('animate__animated', 'animate__flip')
            this.hide = !this.hide
            this.$emit('click', this.hide)
            element?.addEventListener('animationend', () => {
                element?.classList.remove('animate__animated', 'animate__flip')
            });
        }
    },
    mounted() {
        if (!this.hidePointsLeft) {
            this.hideIcon = 'mdi-chevron-right'
            this.showIcon = 'mdi-chevron-left'
        }
        this.$emit('click', this.hide)
    }
}
</script>

<template>
    <v-list>
        <v-list-item
        :title='title'
        >
            <template v-slot:[iconPosition]>
                <v-btn
                :id="`${id}-${title}-panelVisibilityButton`"
                @click="toggleHide"
                :icon="(!hide ? hideIcon : showIcon)"
                variant="text"></v-btn>
            </template>
        </v-list-item>
    </v-list>

    <v-divider></v-divider>

    <slot name="content">
        <v-list density="compact" nav>
            <v-list-item prepend-icon="mdi-folder" title="My Files" value="myfiles"></v-list-item>
            <v-list-item prepend-icon="mdi-account-multiple" title="Shared with me" value="shared"></v-list-item>
            <v-list-item prepend-icon="mdi-star" title="Starred" value="starred"></v-list-item>
        </v-list>
    </slot>

</template>