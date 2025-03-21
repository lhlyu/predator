<template>
    <section ref="containerRef" class="relative flex h-full">
        <div class="h-full overflow-hidden" :style="{ width: leftWidth, minWidth: `${minWidth}px` }">
            <slot name="left" />
        </div>

        <div
            class="relative w-[1px] cursor-col-resize bg-gray-200 transition-all hover:w-1 hover:bg-blue-500"
            @mousedown.prevent="startDrag"
        >
            <div class="absolute top-1/2 h-8 w-full -translate-y-1/2 bg-transparent" />
        </div>

        <div class="flex-1 overflow-hidden">
            <slot name="right" />
        </div>
    </section>
</template>

<script setup lang="ts">
const props = defineProps<{
    minWidth?: number
}>()

const minWidth = props.minWidth ?? 300
const containerRef = ref<HTMLElement>()
const leftWidth = ref('50%')
const isDragging = ref(false)

const { left, width } = useElementBounding(containerRef)

const startDrag = () => {
    isDragging.value = true
    document.body.style.userSelect = 'none'
}

useEventListener('mousemove', (e) => {
    if (!isDragging.value || !containerRef.value) return

    const newWidth = Math.max(minWidth, Math.min(e.clientX - left.value, width.value - minWidth))
    leftWidth.value = `${newWidth}px`
})

useEventListener('mouseup', () => {
    isDragging.value = false
    document.body.style.userSelect = ''
})
</script>
