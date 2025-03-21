<template>
    <div class="relative h-9 flex-grow">
        <input
            v-model.trim="keyword"
            :disabled="loading"
            @keyup.enter="search"
            :class="[loading ? 'cursor-not-allowed opacity-50' : '']"
            type="text"
            placeholder="搜索..."
            class="h-full w-full rounded-md border border-gray-300 pr-2 pl-8 text-sm focus:ring-1 focus:ring-blue-200 focus:outline-none"
        />
        <Search class="absolute top-2.5 left-2.5 h-4 w-4 text-gray-400" />
    </div>
</template>

<script setup lang="ts">
import { Search } from 'lucide-vue-next'

const keyword = defineModel({ type: String, default: '' })

const emit = defineEmits<{
    search: [keyword: string]
}>()

const loading = inject('loading', false)

const search = () => {
    emit('search', keyword.value.trim())
}
</script>

<style scoped lang="scss"></style>
