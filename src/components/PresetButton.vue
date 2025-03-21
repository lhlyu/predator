<template>
    <div class="relative" ref="presetDropdown">
        <BaseButton @click.stop="togglePresetDropdown" title="选择预设" v-bind="$attrs">
            <slot></slot>
        </BaseButton>

        <div
            v-if="showPresetDropdown"
            class="absolute right-0 z-20 mt-1 w-40 rounded-md border border-gray-300 bg-white shadow-lg"
        >
            <ul class="max-h-48 overflow-y-auto py-1">
                <li
                    v-for="preset in PRESETS"
                    :key="preset"
                    @click.stop="applyPreset(preset)"
                    class="cursor-pointer px-3 py-2 text-sm"
                    :class="[selectedPreset === preset ? 'bg-blue-100 hover:bg-blue-200' : 'hover:bg-gray-100']"
                >
                    {{ preset }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import { PRESETS } from '../utils'

const presetDropdownRef = useTemplateRef<HTMLDivElement>('presetDropdown')

const selectedPreset = ref('')

const siteStore = useSiteStore()

watch(
    () => siteStore.site,
    (state) => {
        if (state.source !== 'preset') {
            selectedPreset.value = ''
            return
        }
        selectedPreset.value = state.content
    },
    {
        immediate: true,
        deep: true,
    },
)

const showPresetDropdown = ref(false)

const togglePresetDropdown = () => {
    showPresetDropdown.value = !showPresetDropdown.value
}

const emit = defineEmits<{
    changePreset: [preset: string]
}>()

const applyPreset = (preset: string) => {
    selectedPreset.value = preset
    emit('changePreset', preset)
    showPresetDropdown.value = false
}

onClickOutside(presetDropdownRef, (event) => {
    showPresetDropdown.value = false
})
</script>
