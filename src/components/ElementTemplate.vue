<script>
import CSpacer from './CSpacer.vue'
export default {
    components: {
        CSpacer,
    },
    props: {
        source: {
            // The data source for the component
            type: Object,
            required: true
        },
        index: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            hover: false
        }
    },
}
</script>

<template>
    <div>
        <v-card
        elevation="1"
        variant="outlined"
        :hover="!hover"
        @mouseenter="hover = true"
        @mouseleave="hover = false"
        >
            <v-toolbar
            density="compact"
            class="draggableItem handle">
                <template #prepend>
                    <v-icon :icon="source.icon"></v-icon>
                </template>
                <v-toolbar-title>[{{ index + 1 }}] {{ source.name }}</v-toolbar-title>
                <v-spacer></v-spacer>
                <slot name="toolbarAppendSlot">
                </slot>
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
        <CSpacer :vertical="true"></CSpacer>
    </div>
</template>