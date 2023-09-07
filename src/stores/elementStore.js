import { defineStore } from 'pinia'
//import * as uuid from '../classes/uuids'

export const useElementStore = defineStore('elements', {
    state: () => ({ 
        elementArray: [
            {
                id: '',
                templateId: 0,
                instanceId: '',
                name: 'Text Field',
                sub: 'Single line',
                icon: 'mdi-text',
                vType: 'VTextField',
                options: {}
            },
            {
                id: '',
                templateId:0,
                instanceId: '',
                name: 'Text Area',
                sub: 'Multiline',
                icon: 'mdi-text-long',
                vType: 'VTextField__area',
                options: {}
            },
            {
                id: '',
                templateId: 0,
                instanceId: '',
                name: 'Number',
                sub: 'Integer/Decimal',
                icon: 'mdi-numeric',
                vType: 'VTextField__numeric',
                options: {}
            },
        ],
        detailsPanelOptions: {
            common: {
                label: {
                    type: 'string',
                    value: 'Label',
                    uiLabel: 'Label',
                    hint: '',
                    required: false
                },
                value: {
                    type: 'string',
                    value: '',
                    uiLabel: 'Value',
                    hint: 'Provide a default value?',
                    required: false
                },
                density: {
                    type: 'select',
                    value: 'default',
                    uiLabel: 'Density',
                    hint: 'Set the density of the input field',
                    required: false
                },
                disabled: {
                    type: 'bool',
                    value: false,
                    uiLabel: 'Field is disabled?',
                    hint: 'Set whether or not this field is disabled',
                    required: false
                },
                flat: {
                    type: 'bool',
                    value: false,
                    uiLabel: 'Flatten?',
                    hint: 'Removes elevation (shadow) added to element when using the solo or solo-inverted style',
                    required: false
                },
                hideDetails: {
                    type: 'bool',
                    value: false,
                    uiLabel: 'Hide details?',
                    hint: 'Hides hint text and validation errors',
                    required: false
                },
                placeholder: {
                    type: 'string',
                    value: 'Placeholder',
                    uiLabel: 'Placeholder Text',
                    hint: "Sets the input's placeholder text",
                    required: false
                },
                variant: {
                    type: 'select',
                    value: 'filled',
                    uiLabel: 'Style Variant',
                    hint: 'Applies a distinct style to the input',
                    required: false
                },
                required: {
                    type: 'bool',
                    value: true,
                    uiLabel: 'Required?',
                    hint: 'Set whether or not the field is required',
                    required: false
                },
                requiredMode:{ 
                    type: 'radio',
                    value: 'default',
                    uiLabel: 'Required Mode',
                    hint: "Sets whether the field's required status uses the default boolean behaviour, or is calculated using a formula",
                    required: false
                },
                readonly: {
                    type: 'bool',
                    value: false,
                    uiLabel: 'Readonly?',
                    hint: 'Sets whether or not the field is readonly',
                    required: false
                },
                hint: {
                    type: 'string',
                    value: '',
                    uiLabel: 'Hint Text',
                    hint: 'Provide text that will appear under the input field to hint the user',
                    required: false
                },
                persistentHint: {
                    type: 'bool',
                    value: false,
                    uiLabel: 'Persistent Hint?',
                    hint: 'Sets whether or not the hint is always visible',
                    required: false
                },
            },
            VTextField: {
                htmlType: 'text',
                clearable: {
                    type: 'bool',
                    value: false,
                    uiLabel: 'Clearable?',
                    hint: 'Appends a button which clears the input',
                    required: false
                },
                persistentClear: {
                    type: 'bool',
                    value: false,
                    uiLabel: 'Persistent Clear Button?',
                    hint: 'Sets whether the clear buttons is always visible when the field has input',
                    required: false
                },
                prefix: {
                    type: 'string',
                    value: '',
                    uiLabel: 'Field Prefix',
                    hint: 'Prefixes a UI element to the input field, but does not prefix it to the data recorded',
                    required: false
                },
                suffix: {
                    type: 'string',
                    value: '',
                    uiLabel: 'Field Suffix',
                    hint: 'Adds a suffix UI element to the input field, but does not add the suffix to the data recorded',
                    required: false
                },
            },
            __numeric: {
                htmlType: 'number',
            },
            __area: {
                htmlType: 'textarea',
                autoGrow: {
                    type: 'bool',
                    value: true,
                    uiLabel: 'Auto grow?',
                    hint: 'Automatically grows and shrinks the height of the input as the user types',
                    required: false
                },
            },
        },
        staticChoices: {
            density: [
                'default',
                'comfortable',
                'compact'
            ],
            variant: [
                'filled',
                'outlined',
                'plain',
                'solo',
                'solo-inverted',
                'solo-filled',
                'underlined'
            ],
            requiredMode: [
                'default',
                'formula'
            ]
        },

    }),
    getters: {
        choices: (state) => state.staticChoices
    },
    actions: {
        getElements() {
            // for each element of the elements array,
            // we need copy all of the common keys and values into the options object.
            // Then we need to check the element's vType and also add each key and value for the corresponding vType key in the detailsPanelOptions Object.
            
            const arr = [...this.elementArray]
            const common = {...this.detailsPanelOptions.common}

            for (let i = 0; i < arr.length; i++) {
                arr[i].templateId = i + 1
                arr[i].options = {...common, ...this.detailsPanelOptions[arr[i].vType]}
            }

            return arr

        },
        getChoicesByKey( /** @type {string} */ key) {
            return this.staticChoices[key] || []
        },
        saveAlert() {
            //this.alerts.push(payload)
        },
        clearAlerts() {
            //this.alerts = []
        }
    },
})