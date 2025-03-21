<template>
    <button
        :disabled="loading"
        class="rounded-md p-2 transition-colors"
        :class="[
            active ? 'bg-blue-100 hover:bg-blue-200' : 'hover:bg-gray-100',
            loading ? 'cursor-not-allowed opacity-50' : '',
        ]"
        :title
    >
        <slot></slot>
    </button>
</template>

<script setup lang="ts">
defineProps({
    title: {
        type: String,
        default: '',
    },
    active: {
        type: Boolean,
        default: false,
    },
})

const loading = inject('loading', false)
</script>
