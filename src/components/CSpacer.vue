<script>
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