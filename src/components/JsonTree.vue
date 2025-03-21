<template>
    <div class="scrollbar-thin box-border h-full overflow-auto p-2">
        <template v-if="!isValidData">
            <div class="p-4 text-gray-400">没数据，看个鬼</div>
        </template>

        <template v-else>
            <JsonTreeNode
                v-for="(item, key) in normalizedData"
                :key="key"
                :path="getPath(isArray ?? false, '', key)"
                :name="isArray ? null : key"
                :value="item"
                :selectedPath="siteStore.site.selectedPath"
                :collapsedPaths="siteStore.site.collapsedPaths"
                :enableComment="siteStore.site.enableComment"
                :comments
                @select="siteStore.setSelectedPath"
                @toggle="siteStore.toggleCollapse"
            />
        </template>
    </div>
</template>

<script setup lang="ts">
import { getPath } from '../utils'

const props = defineProps<{
    data?: object | null
    comments: Record<string, string>
}>()

const siteStore = useSiteStore()

const isValidData = computed(() => props.data && typeof props.data === 'object')

const isArray = computed(() => isValidData.value && Array.isArray(props.data))

const normalizedData = computed(() => (isArray.value ? props.data : props.data || {}))
</script>
