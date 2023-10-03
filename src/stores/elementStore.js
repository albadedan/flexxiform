import { defineStore } from 'pinia'
import * as uuid from '../classes/uuids'
import ValidationRules from '../classes/ValidationRules'
const rules = new ValidationRules()

export const useElementStore = defineStore('elements', {
    state: () => ({
        sectionArray: [ 
            { type: 'subheader', name: 'SECTIONS' },
            {
                id: '',
                templateId: 0,
                instanceId: '',
                name: 'Section',
                sub: '',
                desc: 'Section Description',
                icon: 'mdi-book-open-page-variant-outline',
                dragGroup: 'formSections',
                vType: ['ffSection'],
                elements: [],
                props: {}
            },
        ],
        uiArray: [
            { type: 'subheader', name: 'PRESENTATION' },
            {
                id: '',
                templateId: 0,
                instanceId: '',
                name: 'Header',
                sub: 'Fixed Text',
                icon: 'mdi-format-header-pound',
                vType: ['uiText'],
                props: {}
            },
        ],
        inputArray: [
            { type: 'subheader', name: 'FIELDS' },
            {
                id: '',
                templateId: 0,
                instanceId: '',
                name: 'Text/Number Field',
                sub: 'Single line',
                icon: 'mdi-text',
                vTypeMaster: 'VTextField',
                vType: ['common', 'VTextField'],
                props: {}
            },
            {
                id: '',
                templateId: 1,
                instanceId: '',
                name: 'Text Area',
                sub: 'Multiline',
                icon: 'mdi-text-long',
                vTypeMaster: 'VTextarea',
                vType: ['common', 'VTextField', 'VTextarea'],
                props: {}
            },
            {
                id: '',
                templateId: 5,
                instanceId: '',
                name: 'Range Slider',
                sub: 'Range of values along a slider',
                icon: 'mdi-arrow-expand-horizontal',
                vTypeMaster: 'VSlider',
                vType: ['common', 'VSlider'],
                props: {}
            },
            {
                id: '',
                templateId: 6,
                instanceId: '',
                name: 'Selector',
                sub: 'Select item(s) from a list',
                icon: 'mdi-form-select',
                vTypeMaster: 'VSelect',
                vType: ['common', 'VSelect'],
                props: {}
            },
            {
                id: '',
                templateId: 7,
                instanceId: '',
                name: 'Selector (search)',
                sub: 'Select item(s) by typing',
                icon: 'mdi-form-dropdown',
                vTypeMaster: 'VAutocomplete',
                vType: ['common', 'VAutocomplete'],
                props: {}
            },
            {
                id: '',
                templateId: 8,
                instanceId: '',
                name: 'File Input',
                sub: 'Upload files',
                icon: 'mdi-file-upload-outline',
                vTypeMaster: 'VFileInput',
                vType: ['common', 'VFileInput'],
                props: {}
            },
            { type: 'subheader', name: 'GROUPS' },
            {
                id: '',
                templateId: 2,
                instanceId: '',
                name: 'Switch',
                sub: 'Toggle value(s)',
                icon: 'mdi-toggle-switch-outline',
                vTypeMaster: 'VSwitch',
                vType: ['common', 'VCheckbox'],
                props: {}
            },
            {
                id: '',
                templateId: 3,
                instanceId: '',
                name: 'Checkbox',
                sub: 'Inclusive choice(s)',
                icon: 'mdi-checkbox-outline',
                vTypeMaster: 'VGroup',
                vType: ['common', 'VCheckbox'],
                vGroupElementType: 'VCheckbox',
                props: {},
                subElements: [],
            },
            {
                id: '',
                templateId: 4,
                instanceId: '',
                name: 'Radio',
                sub: 'Exclusive choice',
                icon: 'mdi-radiobox-marked',
                vTypeMaster: 'VRadio',
                vType: ['common', 'VRadio'],
                props: {}
            },

        ],
        detailsPanelOptions: [
            {
                id: uuid.generateStandard(),
                propName: 'type',
                type: 'select',
                lookupKey: 'htmlTypes',
                value: 'text',
                uiLabel: 'Field Type',
                hint: '',
                sortGroup: 'ui',
                sortNum: 0,
                required: false,
                vType: [
                    'VTextField',
                ],
            },
            {
                id: uuid.generateStandard(),
                propName: 'label',
                type: 'string',
                value: 'Label',
                uiLabel: 'Label',
                hint: '',
                sortGroup: 'ui',
                sortNum: 0,
                required: false,
                vType: [
                    'common',
                ],
            },
            {
                id: uuid.generateStandard(),
                propName: 'density',
                type: 'select',
                lookupKey: 'density',
                value: 'compact',
                uiLabel: 'Density',
                hint: 'Set the density of the input field',
                sortGroup: 'ui',
                sortNum: 4.2,
                required: false,
                vType: [
                    'common',
                ],
            },
            {
                id: uuid.generateStandard(),
                propName: 'flat',
                type: 'bool',
                value: false,
                uiLabel: 'Flatten?',
                hint: 'Removes elevation (shadow) added to element when using the solo or solo-inverted style',
                sortGroup: 'ui',
                sortNum: 4.1,
                required: false,
                vType: [
                    'common',
                ],
            },
            {
                id: uuid.generateStandard(),
                propName: 'hideDetails',
                type: 'bool',
                value: false,
                uiLabel: 'Hide details?',
                hint: 'Hides hint text and validation errors',
                sortGroup: 'ui',
                sortNum: 3.2,
                required: false,
                vType: [
                    'common',
                ],
            },
            {
                id: uuid.generateStandard(),
                propName: 'placeholder',
                type: 'string',
                value: 'Placeholder',
                uiLabel: 'Placeholder Text',
                hint: "Sets the input's placeholder text",
                sortGroup: 'ui',
                sortNum: 2,
                required: false,
                vType: [
                    'VTextField',
                    'VTextArea'
                ],
            },
            {
                id: uuid.generateStandard(),
                propName: 'variant',
                type: 'select',
                lookupKey: 'variant',
                value: 'outlined',
                uiLabel: 'Style Variant',
                hint: 'Applies a distinct style to the input',
                sortGroup: 'ui',
                sortNum: 4,
                required: false,
                vType: [
                    'common',
                ],
            },
            {
                id: uuid.generateStandard(),
                propName: 'required',
                type: 'bool',
                value: true,
                uiLabel: 'Required?',
                hint: 'Set whether or not the field is required',
                sortGroup: 'validation',
                sortNum: 0,
                required: false,
                vType: [
                    'common',
                ],
            },
            {
                id: uuid.generateStandard(),
                propName: 'validateOn',
                type: 'select',
                lookupKey: 'validateOn',
                value: 'input',
                uiLabel: 'Validate trigger',
                hint: "Sets the point at which the validation rules will be applied",
                sortGroup: 'validation',
                sortNum: 0,
                required: false,
                vType: [
                    'common',
                ],
            },
            {
                id: uuid.generateStandard(),
                propName: 'rulesBuilder',
                type: 'button',
                lookupKey: 'predefinedValidationRules',
                uiLabel: 'Validation Rules',
                hint: 'Limit the types of responses users can provide',
                sortGroup: 'validation',
                sortNum: 0.5,
                required: false,
                vType: [
                    'common',
                ],
            },
            {
                id: uuid.generateStandard(),
                propName: 'hint',
                type: 'string',
                value: '',
                uiLabel: 'Hint Text',
                hint: 'Provide text that will appear under the input field to hint the user',
                sortGroup: 'ui',
                sortNum: 3,
                required: false,
                vType: [
                    'common',
                ],
            },
            {
                id: uuid.generateStandard(),
                propName: 'persistentHint',
                type: 'bool',
                value: false,
                uiLabel: 'Persistent Hint?',
                hint: 'Sets whether or not the hint is always visible',
                sortGroup: 'ui',
                sortNum: 3.1,
                required: false,
                vType: [
                    'common',
                ],
            },
            {
                id: uuid.generateStandard(),
                propName: 'clearable',
                type: 'bool',
                value: false,
                uiLabel: 'Clearable?',
                hint: 'Appends a button which clears the input',
                sortGroup: 'ui',
                sortNum: 1.1,
                required: false,
                vType: [
                    'VTextField',
                    'VTextArea',
                    'VSelect',
                    'VAutocomplete'
                ],
            },
            {
                id: uuid.generateStandard(),
                propName: 'persistentClear',
                type: 'bool',
                value: false,
                uiLabel: 'Persistent Clear Button?',
                hint: 'Sets whether the clear buttons is always visible when the field has input',
                sortGroup: 'ui',
                sortNum: 1.2,
                required: false,
                vType: [
                    'VTextField',
                    'VTextArea',
                    'VSelect',
                    'VAutocomplete'
                ],
            },
            {
                id: uuid.generateStandard(),
                propName: 'prefix',
                type: 'string',
                value: '',
                uiLabel: 'Field Prefix',
                hint: 'Prefixes a UI element to the input field, but does not prefix it to the data recorded',
                sortGroup: 'ui',
                sortNum: 1.3,
                required: false,
                vType: [
                    'VTextField',
                ],
            },
            {
                id: uuid.generateStandard(),
                propName: 'suffix',
                type: 'string',
                value: '',
                uiLabel: 'Field Suffix',
                hint: 'Adds a suffix UI element to the input field, but does not add the suffix to the data recorded',
                sortGroup: 'ui',
                sortNum: 1.4,
                required: false,
                vType: [
                    'VTextField',
                ],
            },
            {
                id: uuid.generateStandard(),
                propName: 'autoGrow',
                type: 'bool',
                value: true,
                uiLabel: 'Auto grow?',
                hint: 'Automatically grows and shrinks the height of the input as the user types',
                sortGroup: 'ui',
                sortNum: 1.01,
                required: false,
                vType: [
                    'VTextarea'
                ],
            },
            ],

        staticChoices: {
            density: [
                { title: 'Tall', value: 'default', props: { subtitle: 'No density' } },
                { title: 'Medium', value: 'comfortable', props: { subtitle: 'Medium density' } },
                { title: 'Small', value: 'compact', props: { subtitle: 'Default density, compact' } },
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
            ],
            requiredChoices: [
                { title: 'Required', value: 'required', props: { subtitle: 'Require a response' } },
                { title: 'Not Required', value: 'not_required', props: { subtitle: 'Allow optional responses' } },
                { title: 'Predefined Validation Rule', value: 'validation_rule', props: { subtitle: 'Require a response, using a predefined validation rule' } },
                { title: 'Use a formula', value: 'formula', props: { subtitle: 'Require a response using a custom formula' } },
            ],
            htmlTypes: [
                'text',
                'number',
                'tel',
                'email',
                'url',
                'password',
            ],
            validateOn: [
                { title: 'Immediate', value: 'input', props: { subtitle: 'Triggers immediately upon input' } },
                { title: 'After', value: 'blur', props: { subtitle: 'Triggers after the user has entered data and move away from the field' } },
                { title: 'Soon', value: 'lazy', props: { subtitle: 'After input, but before moving away' } },
                { title: 'Manual', value: 'submit', props: { subtitle: 'Requires a manual validation trigger' } },
            ],
            predefinedValidationRules: [
                { title: 'Required', value: rules.notBlank , props: {subtitle: 'Require a response of some kind'} },
                { title: 'Email', value: rules.email, props: {subtitle: 'The response must be in the form of an email address'} }
            ]
        },
        propSortOrder: [
            'type',
            'label',
            'prefix',
            'suffix',
            'autoGrow',
            'placeholder',
            'clearable',
            'persistentClear',
            'density',
            'variant',
            'flat',
            'hint',
            'persistentHint',
            'hideDetails',
        ]

    }),
    getters: {
        choices: (state) => state.staticChoices
    },
    actions: {
        getElements: function(/** @type {string} */ kind) {

            // determine which type of element's have been requested
            let arrName = ''
            switch(kind) {
                case 'section':
                    arrName = 'sectionArray'
                    break;

                case 'ui':
                    arrName = 'uiArray'
                    break;

                case 'input':
                    arrName = 'inputArray'
                    break;

                default:
            }

            // get the appropriate elements
            const arr = [...this[arrName]]


            /*
                
                !! WHAT YOU'RE ABOUT TO WITNESS IS TERRIBLE, BUT AT THE MOMENT I'M JUST EXPERIMENTING
                
            */
            
            // for each element of the arr array above
            // compare the elements of the vType array with each of the elements of the vType array in the detailsPanelOptions array
            // where they match, it means that that control which the details panel will render is compatible with this type of element.
            // in which case, create a new key/value pair in the element's props object such that the rendered detail control will be able to affect that input in the desired way
            
            for (let elementIndex = 0; elementIndex < arr.length; elementIndex++) {
                // first, determine if this element is part of the list component's meta data or not.
                // if it is not, processing can continue.
                
                if (typeof arr[elementIndex].type === typeof undefined) {
                    // this is a processable element

                    // each processable element has a vType array which lists all the
                    // different types of detailsPanelOptions objects that the element is compatible with
                    
                    for (let vTypeIndex = 0; vTypeIndex < arr[elementIndex].vType.length; vTypeIndex++) {
                        // for each value of the element's vType array
                        
                        // access each element of the detailsPanelOptions array
                        for (let detailOptionIndex = 0; detailOptionIndex < this.detailsPanelOptions.length; detailOptionIndex++) {
                            // for each value of the detailsPanelOptions array
                            
                            // access the vType array
                            for (let dvTypeIndex = 0; dvTypeIndex < this.detailsPanelOptions[detailOptionIndex].vType.length; dvTypeIndex++) {
                                // for each value of the detailsPanelOptions' array's vType array
                                
                                // compare the element's vType with the detailsPanelOptions' elements' vType
                                if (arr[elementIndex].vType[vTypeIndex] === this.detailsPanelOptions[detailOptionIndex].vType[dvTypeIndex]) {
                                    // these values match, so we can now create a new key/value pair in the element's props object
                                    arr[elementIndex].props = Object.assign(
                                        {
                                            [this.detailsPanelOptions[detailOptionIndex].propName]: this.detailsPanelOptions[detailOptionIndex].value
                                        },
                                        arr[elementIndex].props
                                    )
                                }
                            }
                        }
                    }
                }
            }

            return arr
        },
        getBlankSection: function() {
            const arr = [...this.getElements('section')]
            return arr[1]
        },
        getChoicesByKey: function( /** @type {string} */ key) {
            return this.staticChoices[key] || []
        },
        saveAlert: function() {
            //this.alerts.push(payload)
        },
        clearAlerts: function() {
            //this.alerts = []
        },
        createPropsArray: function(/** @type {array} */ propsRequired) {
            let _props = []
            for (let i = 0; i < propsRequired.length; i++) {
                _props.push(this.detailsPanelOptions.filter(a => a.propName === propsRequired[i])[0])
            }
            return _props

        },
        populateDetailsPanel: function() {
            // we need to get every item from the detailsPanelOptions array,
            // but they need to be grouped and sorted first.

            const arr = [...this.detailsPanelOptions]

            const groups = [...new Set(arr.map(item => item.sortGroup))];
            const obj = {}
            const _pArr = []
            
            // for each group
            for (let g = 0; g < groups.length; g++) {
                const _arr = arr.filter(a => a.sortGroup === groups[g])
                obj[groups[g]] = [ {type: 'subheader', name: groups[g].toUpperCase()}, ..._arr ]
                obj[groups[g]].sort((a, b) => a - b)
                _pArr.push(...obj[groups[g]])
            }

            const returnArr = JSON.parse(JSON.stringify(_pArr))
            
            return [...returnArr]
            
        }
    },
})