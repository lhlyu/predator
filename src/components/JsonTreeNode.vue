<template>
    <article class="text-md font-mono">
        <!-- 节点内容 -->
        <div
            class="box-border flex cursor-pointer items-start rounded px-2 py-1"
            :class="[isSelected ? 'bg-blue-100 hover:bg-blue-200' : 'hover:bg-gray-100']"
            @click.stop="emit('select', path)"
        >
            <!-- 展开图标 -->
            <span
                v-if="isObject"
                class="w-4 text-gray-500 select-none hover:text-gray-700"
                @click.stop="emit('toggle', path)"
            >
                {{ isCollapsed ? '▶' : '▼' }}
            </span>

            <!-- 键名 -->
            <span v-if="name !== null && !isObject" class="whitespace-nowrap text-purple-600">{{ name }}</span>
            <span v-else-if="name !== null && isObject" class="whitespace-nowrap text-pink-500">{{ name }}</span>

            <span v-if="name !== null" class="text-black select-none">:</span>

            <span v-if="isObject && enableComment" class="ml-4 text-gray-400/60 select-none"
                >{ {{ childrenLength }} items }</span
            >

            <!-- 值显示 -->
            <span v-if="!isObject" class="break-all whitespace-normal" :class="valueTypeClass"
                >&nbsp;{{ formattedValue }}</span
            >

            <span v-if="enableComment" class="ml-4 text-gray-400"> // {{ comments[path] ?? '' }}</span>

            <!--            <span class="ml-4 text-gray-400">{{ path }}</span>-->
        </div>

        <!-- 子节点 -->
        <div v-if="isObject && !isCollapsed" class="ml-3 border-l border-gray-300 pl-6">
            <JsonTreeNode
                v-for="(childValue, key) in value"
                :key="key"
                :path="childPath(key)"
                :name="isArray ? null : key.toString()"
                :value="childValue"
                :level="(level ?? 0) + 1"
                :selectedPath
                :collapsedPaths
                :enableComment
                :comments
                @select="emit('select', $event)"
                @toggle="emit('toggle', $event)"
            />
        </div>
    </article>
</template>

<script setup lang="ts">
import { ALL_COLLAPSES_FLAG, getPath } from '../utils'

const props = defineProps<{
    path: string
    name: string | null
    value: any
    level?: number
    selectedPath: string
    collapsedPaths: string[]
    enableComment: boolean
    comments: Record<string, string>
}>()

const emit = defineEmits<{
    select: [path: string]
    toggle: [path: string]
}>()

// 类型判断
const isObject = computed(() => props.value !== null && typeof props.value === 'object')
const isArray = computed(() => Array.isArray(props.value))

// 获取子元素长度
const childrenLength = computed(() => {
    if (isArray.value) {
        return props.value.length
    }
    return Object.keys(props.value).length
})

const isCollapsed = computed(() => {
    if (props.collapsedPaths.includes(ALL_COLLAPSES_FLAG)) {
        return !props.collapsedPaths.includes(props.path)
    }
    return props.collapsedPaths.includes(props.path) ?? false
})
const isSelected = computed(() => props.selectedPath === props.path)

// 值格式化
const valueTypeClass = computed(() => {
    const type = typeof props.value

    const types: Record<string, string> = {
        string: 'text-green-600',
        number: 'text-blue-600',
        boolean: 'text-red-500',
    }

    return types[type] || 'text-gray-600'
})

const formattedValue = computed(() => {
    if (props.value === null) return 'null'
    if (typeof props.value === 'string') return `"${props.value}"`
    if (typeof props.value === 'boolean') return props.value.toString()
    if (typeof props.value === 'number') return props.value.toString()
    return props.value
})

// 工具方法
const childPath = (key: string | number) => {
    return getPath(isArray.value, props.path, key)
}
</script>
