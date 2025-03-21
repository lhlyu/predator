<template>
    <div class="flex h-full items-center justify-center">
        <div class="w-full max-w-2xl px-6">
            <div class="mb-8 ml-2 text-left">
                <h1 class="mb-3 text-3xl font-bold text-gray-800">配置查看器</h1>
                <p class="text-md text-gray-600">
                    支持 <code>JSON</code>、<code>YAML</code> 格式，支持打开文件，支持从链接读取，点击左侧 key
                    查看具体文档
                </p>
            </div>

            <div class="space-y-2">
                <button
                    v-for="item in items"
                    :key="item.title"
                    class="flex items-center rounded-md p-2 transition-colors hover:bg-gray-100"
                    :title="item.title"
                >
                    <component :is="item.icon" class="h-5 w-5 text-gray-600"></component>
                    <span class="ml-2">{{ item.title }}</span>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { FolderOpen, Link, Lightbulb, ChevronsDownUp, ChevronsUpDown, MessageSquare, BookOpen } from 'lucide-vue-next'

const items = [
    { title: '打开文件', icon: FolderOpen },
    { title: '输入链接', icon: Link },
    { title: '选择预设', icon: Lightbulb },
    { title: '全部展开', icon: ChevronsDownUp },
    { title: '全部折叠', icon: ChevronsUpDown },
    { title: '展示注释', icon: MessageSquare },
    { title: '模式切换', icon: BookOpen },
]
</script>

<style scoped lang="scss"></style>
