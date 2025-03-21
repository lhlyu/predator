<template>
    <div class="scrollbar-thin relative box-border h-full w-full overflow-auto p-2">
        <template v-if="!isValidData">
            <div class="p-4 text-gray-400">没数据，看个鬼</div>
        </template>
        <template v-else>
            <div class="p-4" v-html="ht"></div>
            <button
                class="absolute top-6 right-6 cursor-pointer rounded-md bg-gray-100 p-2 hover:bg-gray-200"
                @click="copy(raw)"
            >
                <ClipboardCheck v-if="copied" class="h-5 w-5 text-gray-600"></ClipboardCheck>
                <Clipboard v-else class="h-5 w-5 text-gray-600"></Clipboard>
            </button>
        </template>
    </div>
</template>

<script setup lang="ts">
import { Clipboard, ClipboardCheck } from 'lucide-vue-next'
import { codeToHtml } from '../utils'

const props = defineProps<{
    data?: object | null
}>()

const isValidData = computed(() => props.data && typeof props.data === 'object')

const raw = computed(() => {
    return JSON.stringify(props.data, null, 4)
})

const ht = computed(() => {
    if (isValidData.value) {
        return codeToHtml(raw.value, 'json')
    }
    return ''
})

const { copy, copied } = useClipboard()
</script>

<style scoped lang="scss"></style>
