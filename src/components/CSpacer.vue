<script>
/**
 * Provides an easier vertical and/or horizontal spacer module.
 * Renders a div with customisable proportions
 * 
 * ### PROPS
 * @param {boolean} [vertical] default = false; Create vertical space
 * @param {number} [height] default = 10; Create vertical space of 10 pixels
 * @param {boolean} [horizontal] default = false; Create horizontal space
 * @param {number} [width] default = 10; Create horizontal space of 10 pixels
 * 
 * @author Dan Barker <dan@dan-barker.co.uk>
 */
export default {
    name: 'CSpacer',
    props: {
        vertical: {
            type: Boolean,
            default: false
        },
        height: {
            type: Number,
            default: 10
        },
        horizontal: {
            type: Boolean,
            default: false
        },
        width: {
            type: Number,
            default: 10
        }
    }
}
</script>

<template>
    <div
    :style="`height: ${(vertical ? height : 0)}px; width: ${(horizontal ? width : 0)}px`"
    ></div>
</template>