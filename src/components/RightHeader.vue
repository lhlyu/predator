<template>
    <div class="flex h-[60px] w-full items-center justify-between px-4">
        <div class="mr-4 min-w-0 flex-grow">
            <div class="flex items-center">
                <code class="truncate text-sm font-bold text-blue-600">{{ path }}</code>
                <span class="ml-2 rounded-md bg-gray-200 px-2 py-0.5 text-xs font-medium text-gray-700">
                    {{ fieldType }}
                </span>
            </div>
            <p class="mt-0.5 truncate text-xs text-gray-500">{{ comment }}</p>
        </div>
    </div>
</template>

<script setup>
defineProps({
    path: {
        type: String,
        default: '',
    },
    comment: {
        type: String,
        default: '',
    },
    fieldType: {
        type: String,
        default: 'unknown',
    },
})
</script>
