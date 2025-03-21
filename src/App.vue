<template>
    <Teleport to="body">
        <Toaster richColors position="top-right"></Toaster>
    </Teleport>
    <Split class="h-full w-full">
        <template #left>
            <Panel>
                <template #header>
                    <LeftHeader></LeftHeader>
                </template>
                <template v-if="site.mode === 'tree'">
                    <JsonTree :data :comments></JsonTree>
                </template>
                <template v-else>
                    <JsonRaw :data></JsonRaw>
                </template>
            </Panel>
        </template>
        <template #right>
            <template v-if="site.selectedPath.length">
                <Doc :path="site.selectedPath" :document="documents[site.selectedPath]"></Doc>
            </template>
            <template v-else>
                <Welcome></Welcome>
            </template>
        </template>
    </Split>
</template>

<script setup lang="ts">
import { Toaster } from 'vue-sonner'

const siteStore = useSiteStore()

const { site } = storeToRefs(siteStore)

const { data, comments, documents } = useApp()
</script>

<style lang="scss">
#app {
    position: fixed;
    inset: 0;
}
</style>
