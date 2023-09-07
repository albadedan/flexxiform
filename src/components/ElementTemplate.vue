<script>
import ToolbarNavigationButtons from './ToolbarNavigationButtons.vue'
export default {
    emits: ['click', 'moveUp', 'moveDown', 'delete'],
    components: {
        NavButtons: ToolbarNavigationButtons,
    },
    props: {
        source: {
            // The data source for the component
            type: Object,
            required: true
        },
        sourceDepth: {
            // How deep into the origin source this component's source comes from
            // Value will either be 'sections' or 'elements'
            type: String,
            required: true
        },
        parentId: {
            // the ID of the source's parent
            type: String,
            required: true
        }
    },
    data() {
        return {
            hover: false
        }
    },
    methods: {
        emitClick(/** @type {string} str */ str) {
            const obj = { instance: this.source.instanceId, formDepth: this.sourceDepth, parentId: this.parentId }
            // @ts-ignore
            this.$emit(this.$.components.NavButtons.emits.filter(a => a === str)[0], obj)
        }
    }
}
</script>

<template>
    <v-card
    elevation="1"
    :hover="!hover"
    @mouseenter="hover = true"
    @mouseleave="hover = false"
    class="clickableItem"
    @click="$emit('click', { 
        instanceId: source.instanceId,
        formDepth: sourceDepth,
        parentId: parentId
    } )">
        <v-toolbar
        density="compact">
            <template #prepend>
                <v-icon :icon="source.icon"></v-icon>
            </template>
            <v-toolbar-title>{{ source.name }}</v-toolbar-title>
            <v-spacer></v-spacer>
            <NavButtons
            @moveUp="emitClick('moveUp')"
            @moveDown="emitClick('moveDown')"></NavButtons>
            <v-toolbar-items variant="tonal">
                <v-tooltip text="Delete" location="bottom">
                    <template v-slot:activator="{ props }">
                        <v-btn v-bind="props" color="error" icon="mdi-trash-can-outline"></v-btn>
                    </template>
                </v-tooltip>
            </v-toolbar-items>
        </v-toolbar>
        <v-container>
            <v-row>
                <v-col>

                    <!-- Single line Text Field OR Numeric Text field -->
                    <template
                    v-if="source.vType === 'VTextField' || source.vType === 'VTextFieldNumeric'">

                        <v-text-field
                        :type="source.options.htmlType"
                        :v-model="source.options.value.value"
                        :label="source.options.label.value"
                        :density="source.options.density.value"
                        :flat="source.options.flat.value"
                        :disabled="source.options.disabled.value"
                        :placeholder="source.options.placeholder.value"
                        :variant="source.options.variant.value"
                        :required="source.options.required.value"
                        :readonly="source.options.readonly.value"
                        :hint="source.options.hint.value"
                        :persistent-hint="source.options.persistentHint.value"
                        :hide-details="source.options.hideDetails.value"
                        :clearable="source.options.clearable.value"
                        :persistent-clear="source.options.persistentClear.value"
                        :prefix="source.options.prefix.value"
                        :suffix="source.options.suffix.value"
                        ></v-text-field>

                    </template>

                </v-col>
            </v-row>
        </v-container>
    </v-card>
</template>