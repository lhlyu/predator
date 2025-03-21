<template>
    <Panel>
        <template #header>
            <RightHeader :path :comment="document?.comment" :fieldType="document?.type"></RightHeader>
        </template>
        <div class="scrollbar-thin box-border h-full w-full overflow-auto px-6">
            <MdPreview
                :modelValue="document?.doc"
                :codeFoldable="false"
                previewTheme="vuepress"
                theme="light"
            ></MdPreview>
        </div>
    </Panel>
</template>

<script setup lang="ts">
import { MdPreview } from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'

const props = defineProps<{
    path: string
    document: any
}>()
</script>
