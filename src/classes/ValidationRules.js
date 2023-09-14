export default class ValidationRules {
    constructor() {
    }

    /**
     * Require input of some kind
     */
    notBlank = [
        v => !!v || 'This field is required',
        v => typeof v !== typeof undefined || 'This field is required'
    ]

    /**
     * Require input of some kind, uses date specific error message
     */
    dateRules = [
        ...this.notBlank
    ]

    /**
     * Require input of some kind, uses availability specific error message
     */
    available = [
        v => !!v || 'Unavailable'
    ]

    /**
     * Require a properly formatted What3Words address
     */
    w3w = [
        ...this.notBlank,
        v => !/\s/.test(v) || 'Spaces are not allowed. Please use format "what.three.words" or "///what.three.words"',
        v => /^[^.]*\.[^.]*\.[^.]*$/.test(v) || 'Address must contain exactly two fullstops',
        v => this.w3wSlashes(v),
        v => this.w3wFinalWord(v)
    ]

    /**
     * Require properly formatted email address
     */
    email = [
        //v => !!v || 'This field is required',
        ...this.notBlank,
        // eslint-disable-next-line no-useless-escape
        v => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v) || 'Please enter a valid email address'
    ]

    /**
     * Require a password of sufficient complexity
     */
    password = [
        ...this.notBlank,
        v => v.length>9 || 'Password must be at least 10 characters long',
        v => /[A-Z]/.test(v) || 'Password must contain at least 1 capital letter',
        v => /[a-z]/.test(v) || 'Password must contain at least 1 lower case letter',
        v => /\d/.test(v) || 'Password must contain at least 1 number',
        v => /\W/.test(v) || 'Password must contain at least 1 special character',
    ]

    /**
     * The input must be greater than zero
     */
    greaterThanZero = [
        ...this.notBlank,
        v => v > 0 || 'Must be greater than zero'
    ]

    /**
     * The input must be exactly one and of type number
     */
    exactlyOne = [
        ...this.notBlank,
        v => Number(v) === 1 || 'Must be exactly 1'
    ]

    /**
     * Require unique input
     * @param {Array} arr The array through which to search.
     * @param {Number} row The index of the array that represents this instance
     * @returns {(Boolean|String)} True or error string
     */
    unique(arr, row) {
        let status = true
        for (let i = 0; i < arr.length; i++) {
            // check to see if this element appears more than once
            const len = (arr.filter(a => a === arr[row])).length
            if (len > 1) {
                // this element appears more than once in the list.
                return 'Duplicate'
            }
        }
        return status
    }

    /**
     * Require unique input from an array of objects.
     * @param {Array} arr The array through which to search
     * @param {String} key The key of the item in the array that will be compared
     * @param {Number} thisIndex The index of array that represents this instance
     * @returns {(Boolean|String)} True or error string
     */
    uniqueFromObjectArray(arr, key, thisIndex) {
        let status = true
        let _arr = [];
        for (const element in arr) {
            _arr.push(arr[element][key])
        }
        const len = (_arr.filter(a => a[thisIndex])).length
        if (len > 1) {
            // this element appears more than once in the list
            return 'Duplicate'
        }
        return status
    }

    /**
     * Require that the input already exist
     * @param {Array} existing The array through which to search
     * @param {*} value The value to look for
     * @returns {(Boolean|String)} True or error string
     */
    existingOnly(existing, value) {
        let status = 'Must be a pre-existing value'
        for (let i = 0; i < existing.length; i++) {
            const len = (existing.filter(a => a.value === value)).length
            if (len > 0) {
                return true
            }
        }
        return status
    }

    /**
     * Require that at least 1 response be provided
     * @param {Array} arr The array of responses
     * @returns {(Boolean|String)} True or error string
     */
    lengthGreaterThan0(arr) {
        let status = 'You must provide at least one response'
        if(typeof arr === typeof []) {
            if (arr.length > 0) {
                return true
            }
        }
        return status
    }

    notBlankAtArrayIndex(arr, index) {        
        let loopLimit = []
        if (typeof index === 'object') {
            loopLimit = index
        } else {
            loopLimit.push(index)
        }

        for (let i = 0; i < loopLimit.length; i++) {
            if (arr === null || arr.length < 0 || arr.length < loopLimit[i] || arr[loopLimit[i]] === '' || arr[loopLimit[i]] === null || arr[loopLimit[i]] === undefined) {
                return ['This field is required']
            }
        }

        return []
    }

    /**
     * Ensure the final address word of a What3Words address is provided
     * @param {String} value The address
     * @returns {(Boolean|String)} True or error string
     */
    w3wFinalWord(value) {
        let x = /^(?:[^.]*\.){2}([^.]*)/.exec(value)
        let msg = 'Final address word is missing'
        if (x !== null && x.length > 0) {
            
            if (x[1] !== '') {
                return true
            }

        }

        return msg
    }

    /**
     * Ensure that all three slashes are present at the beginning of the What3Words address
     * @param {String} value The address
     * @returns {(Boolean|String)} True or error string
     */
    w3wSlashes(value) {
        const v = value.split("/").length - 1
        if (v === 0) {
            return true
        }

        if (v === 3) {
            if (/^\/{3}/.test(value)) {
                return true
            } else {
                return 'Slashes must be consecutive and must be at the beginning'
            }
        }

        if (v >0 && v <3) {
            return 'Not enough slashes. Use three slashes, or use none'
        } else {
            return 'Too many slashes. Use three slashes, or use none'
        }
    }

    /**
     * 
     * @param {Number} value 
     * @param {Number} max 
     * @returns {(Boolean|String)} True or error string
     */
    lessThanOrEqual (value, max) {
        if (value <= max) {
            return true
        } else {
            return `Value must be <= ${max}`
        }
    }

    /**
     * 
     * @param {Number} value 
     * @param {Number} max 
     * @returns {(Boolean|String)} True or error string
     */
    lessThan (value, max) {
        if (value < max) {
            return true
        } else {
            return `Value must be < ${max}`
        }
    }

    /**
     * 
     * @param {Number} value 
     * @param {Number} min 
     * @returns {(Boolean|String)} True or error string
     */
    greaterThanOrEqual (value, min) {
        if (value >= min) {
            return true
        } else {
            return `Value must be >= ${min}`
        }
    }

    /**
     * 
     * @param {Number} value 
     * @param {Number} min 
     * @returns {(Boolean|String)} True or error string
     */
    greaterThan (value, min) {
        if (value > min) {
            return true
        } else {
            return `Value must be > ${min}`
        }
    }

    /**
     * Require input be equal to a predefined value
     * @param {Number} value 
     * @param {Number} min 
     * @returns {(Boolean|String)} True or error string
     */
    equalTo (value, min) {
        if (value == min) {
            return true
        } else {
            return `Value must be exactly ${min}`
        }
    }

    /**
     * Require input be equal to a predefined value and be of type number
     * @param {Number} value 
     * @param {Number} min 
     * @returns {(Boolean|String)} True or error string
     */
    equalToNumber(value, min) {
        if (Number(value) === Number(min)) {
            return true
        } else {
            return `Value must be exactly ${Number(min)}`
        }
    }

    /**
     * Require input be within a specified range, including the upper and lower limits
     * @param {Number} value 
     * @param {Number} min 
     * @param {Number} max
     * @returns {(Boolean|String)} True or error string
     */
    inInclusiveRange(value, min, max) {
        if (Number(value) >= Number(min) && Number(value) <= Number(max)) {
            return true
        } else {
            return `Value must be in range ${min} - ${max} (inclusive)`
        }
    }

    /**
     * Require input be within a specified range, not including the upper and lower limits
     * @param {Number} value 
     * @param {Number} min 
     * @param {Number} max 
     * @returns {(Boolean|String)} True or error string
     */
    inExclusiveRange(value, min, max) {
        if (Number(value) > Number(min) && Number(value) < Number(max)) {
            return true
        } else {
            return `Value must be in range ${min} - ${max} (exclusive)`
        }
    }

    /**
     * Require that an input be exactly equal to (including in type) to another value
     * @param {*} value 
     * @param {*} criteria 
     * @returns {(Boolean|String)} True or error string
     */
    identicalTo(value, criteria) {
        return value === criteria
    }

    /**
     * Require that input be of type Boolean
     * @param {*} value 
     * @returns {Boolean}
     */
    isOfTypeBoolean(value) {
        return (typeof value === typeof true)
    }

    /**
     * A array used to populate and control form validation in the form builder.
     */
    validationOptionList = [
            { 
                name: 'Required',
                value: 'notBlank',
                desc: 'The user must provide a value for this field',
                compatibleWith:
                [
                    'VTextField',
                ]
            },
            {
                name: 'Date required' ,
                value: 'dateRules',
                desc: 'The user must provide a date',
                compatibleWith:
                [
                    'VDateField',
                ]
            },
            {
                name: 'At least one response',
                value: 'lengthGreaterThan0',
                desc: 'The user must provide at least one response',
                compatibleWith:
                [
                    'VTextField',
                ]
            },
            {
                name: 'Available',
                value: 'available',
                desc: 'The result of the response must be "available"',
                compatibleWith:
                [
                    'VTextField',
                ]
            },
            {
                name: 'What3Words',
                value: 'w3w',
                desc: 'The user must provide a response in a valid What3Words format',
                compatibleWith:
                [
                    'VTextField',
                ]
            },
            {
                name: 'Email',
                value: 'email',
                desc: 'The user must provide a valid email address',
                compatibleWith:
                [
                    'VTextField__type=email__',
                ]
            },
            {
                name: 'Password',
                value: 'password',
                desc: 'The user must provide a password of sufficient complexity',
                compatibleWith:
                [
                    'VTextField__type=password__',
                ]
            },
            {
                name: 'Unique response',
                value: 'unique',
                desc: 'The user must provide a response that does not already exist',
                compatibleWith:
                [
                    '',
                ]
            },
            {
                name: 'Existing response',
                value: 'existingOnly',
                desc: 'The user may only respond with a value that already exists',
                compatibleWith:
                [
                    '',
                ]
            },
            {
                name: 'Not blank at index',
                value: 'notBlankAtArrayIndex',
                desc: 'The specified array index must not be blank',
                compatibleWith:
                [
                    '',
                ]
            },
            {
                name: 'Less than',
                value: 'lessThan',
                desc: 'The response must be less than a specified value',
                compatibleWith:
                [
                    'VTextField__type=numeric__',
                ]
            },
            {
                name: 'Less than or equal to',
                value: 'lessThanOrEqual',
                desc: 'The response must be less than or equal to a specified value',
                compatibleWith:
                [
                    'VTextField__type=numeric__',
                ]
            },
            {
                name: 'Greater than',
                value: 'greaterThan',
                desc: 'The response must be greater than a specified value',
                compatibleWith:
                [
                    'VTextField__type=numeric__',
                ]
            },
            {
                name: 'Greater than or equal to',
                value: 'greaterThanOrEqual',
                desc: 'The response must be greater than or equal to a specified value',
                compatibleWith:
                [
                    'VTextField__type=numeric__',
                ]
            },
            {
                name: 'Equal to',
                value: 'equalTo',
                desc: 'The response must be equal to a specified value',
                compatibleWith:
                [
                    'VTextField',
                ]
            },
            {
                name: 'Identical to',
                value: 'identicalTo',
                desc: 'The response must be identical to a specified value and type. E.g., 42 === \'42\' = false. (Type Number does not equal type String.)',
                compatibleWith:
                [
                    'VTextField',
                ]
            },
            {
                name: 'In Range (inclusive)',
                value: 'inInclusiveRange',
                desc: 'Require the input to be within a specified range, including the upper and lower limits',
                compatibleWith:
                [
                    'VTextField__type=numeric__'
                ]
            },
            {
                name: 'In Range (exclusive)',
                value: 'inExclusiveRange',
                desc: 'Require the input to be within a specified range, excluding the upper and lower limits',
                compatibleWith:
                [
                    'VTextField__type=numeric__'
                ]
            }
        ]
    
        
}