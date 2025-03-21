<template>
    <Teleport to="body">
        <Transition>
            <div
                v-if="show"
                @click.self="show = false"
                class="bg-opacity-30 fixed inset-0 z-30 flex items-center justify-center bg-black/20"
            >
                <div class="w-full max-w-md rounded-lg bg-white p-4 shadow-lg">
                    <h3 class="mb-2 text-lg font-medium">输入链接</h3>
                    <p class="mb-3 text-sm text-gray-500">请求地址允许跨域 且 响应为 json 或 yaml</p>
                    <div class="relative mb-4">
                        <input
                            v-model.trim="link"
                            :disabled="loading"
                            @keyup.enter="confirm"
                            type="text"
                            placeholder="https://..."
                            :class="[loading ? 'cursor-not-allowed opacity-50' : '']"
                            class="w-full rounded-md border border-gray-300 py-2 pr-3 pl-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>
                    <div class="flex justify-end space-x-2">
                        <button
                            @click="show = false"
                            :disabled="loading"
                            :class="[loading ? 'cursor-not-allowed opacity-50' : '']"
                            class="rounded-md border border-gray-300 px-4 py-1 hover:bg-gray-100"
                        >
                            取消
                        </button>
                        <button
                            @click="confirm"
                            :disabled="loading"
                            :class="[loading ? 'cursor-not-allowed opacity-50' : '']"
                            class="rounded-md bg-blue-500 px-4 py-1 text-white hover:bg-blue-600"
                        >
                            确定
                        </button>
                    </div>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<script setup lang="ts">
const show = defineModel({ type: Boolean, default: false })

const link = ref('')

const loading = inject('loading', false)

const emit = defineEmits<{
    changeLink: [link: string]
}>()

const confirm = () => {
    emit('changeLink', link.value.toString().trim())
}

const siteStore = useSiteStore()

watch(
    () => siteStore.site,
    (state) => {
        if (state.source !== 'link') {
            link.value = ''
            return
        }
        link.value = state.content
    },
    {
        immediate: true,
        deep: true,
    },
)
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
    transition: opacity 0.2s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}
</style>
