<template>
    <div class="flex h-full w-full items-center px-4">
        <InputSearch v-model="site.keyword" @search="(keyword) => emit('search', keyword)"></InputSearch>

        <div class="ml-2 flex flex-shrink-0 items-center space-x-1">
            <BaseButton @click="emit('fileOpen')" :active="site.source === 'file'" title="打开文件">
                <FolderOpen class="h-4 w-4 text-gray-600" />
            </BaseButton>

            <BaseButton @click="showInputModalHandler" :active="site.source === 'link'" title="输入链接">
                <Link class="h-4 w-4 text-gray-600" />
            </BaseButton>

            <PresetButton @changePreset="(preset) => emit('selectPreset', preset)" :active="site.source === 'preset'">
                <Lightbulb class="h-4 w-4 text-gray-600" />
            </PresetButton>

            <BaseButton @click="emit('expandAll')" title="全部展开">
                <ChevronsUpDown class="h-4 w-4 text-gray-600" />
            </BaseButton>

            <BaseButton @click="emit('collapseAll')" title="全部折叠">
                <ChevronsDownUp class="h-4 w-4 text-gray-600" />
            </BaseButton>

            <BaseButton @click="emit('toggleComment')" :title="site.enableComment ? '展示注释' : '关闭注释'">
                <MessageSquare v-if="site.enableComment" class="h-4 w-4 text-gray-600" />
                <MessageSquareOff v-else class="h-4 w-4 text-gray-600" />
            </BaseButton>

            <BaseButton @click="emit('switchMode')" title="模式切换">
                <BookOpen v-if="site.mode === 'tree'" class="h-4 w-4 text-gray-600" />
                <SquareCode v-else class="h-4 w-4 text-gray-600" />
            </BaseButton>
        </div>

        <InputModal v-model="showInputModal" @changeLink="(link) => emit('updateLink', link)"></InputModal>
    </div>
</template>

<script setup lang="ts">
import {
    Lightbulb,
    ChevronsDownUp,
    ChevronsUpDown,
    FolderOpen,
    Link,
    MessageSquare,
    MessageSquareOff,
    BookOpen,
    SquareCode,
} from 'lucide-vue-next'

const showInputModal = ref(false)

const showInputModalHandler = () => {
    showInputModal.value = true
}

const { emit } = useBus()

const siteStore = useSiteStore()

const { site } = storeToRefs(siteStore)
</script>
