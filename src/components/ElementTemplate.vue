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
        v-memo="[source.props]"
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

                        <!-- Single line Text Field -->
                        <template
                        v-if="source.vTypeMaster === 'VTextField'">
                            <v-text-field
                            v-bind.prop="source.props"
                            ></v-text-field>
                        </template>

                        <!-- Multiline Text Field -->
                        <template
                        v-if="source.vTypeMaster === 'VTextarea'">
                            <v-textarea
                            v-bind.prop="source.props"
                            ></v-textarea>
                        </template>

                        <!-- Checkbox Field -->
                        <template
                        v-if="source.vTypeMaster === 'VCheckbox'">
                            <v-checkbox
                            v-bind.prop="source.props"
                            ></v-checkbox>
                        </template>

                        <!-- Switch Field -->
                        <template
                        v-if="source.vTypeMaster === 'VSwitch'">
                            <v-switch
                            v-bind.prop="source.props"
                            ></v-switch>
                        </template>

                        <!-- Radio Field -->
                        <template
                        v-if="source.vTypeMaster === 'VRadio'">
                            <v-radio
                            v-bind.prop="source.props"
                            ></v-radio>
                        </template>

                        <!-- Range Slide Field -->
                        <template
                        v-if="source.vTypeMaster === 'VSlider'">
                            <v-slider
                            v-bind.prop="source.props"
                            ></v-slider>
                        </template>

                        <!-- Select Field -->
                        <template
                        v-if="source.vTypeMaster === 'VSelect'">
                            <v-select
                            v-bind.prop="source.props"
                            ></v-select>
                        </template>

                        <!-- Autocomplete Field -->
                        <template
                        v-if="source.vTypeMaster === 'VAutocomplete'">
                            <v-autocomplete
                            v-bind.prop="source.props"
                            ></v-autocomplete>
                        </template>

                        <!-- File Input Field -->
                        <template
                        v-if="source.vTypeMaster === 'VFileInput'">
                            <v-file-input
                            v-bind.prop="source.props"
                            ></v-file-input>
                        </template>

                    </v-col>
                </v-row>
            </v-container>
        </v-card>
        <CSpacer :vertical="true"></CSpacer>
    </div>
</template>