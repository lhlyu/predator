import { ALL_COLLAPSES_FLAG, PRESETS } from '../utils'

export type Source = 'file' | 'link' | 'preset'

interface Site {
    // 模式
    mode: 'tree' | 'raw'
    // 开启注释
    enableComment: boolean
    // 搜索关键字
    keyword: string
    // 关闭的path
    collapsedPaths: string[]
    // 选择的path
    selectedPath: string
    // 来源
    source: Source
    // 来源的值
    content: string
}

const defaultSite: Site = {
    mode: 'tree',
    enableComment: true,
    keyword: '',
    collapsedPaths: [],
    selectedPath: '',
    source: 'preset',
    content: PRESETS[0],
}

const useSiteStore = defineStore(
    'site',
    () => {
        const site = ref<Site>(defaultSite)

        const initSite = (param: Partial<Site> = {}) => {
            site.value = Object.assign({ ...site.value }, param)
        }

        const switchMode = () => {
            site.value.mode = site.value.mode === 'tree' ? 'raw' : 'tree'
        }

        const toggleComment = () => {
            site.value.enableComment = !site.value.enableComment
        }

        const toggleCollapse = (path: string) => {
            const set = new Set(site.value.collapsedPaths)
            if (set.has(path)) {
                set.delete(path)
            } else {
                set.add(path)
            }
            site.value.collapsedPaths = Array.from(set)
        }

        // 设置选中
        const setSelectedPath = (path: string) => {
            if (site.value.selectedPath === path) {
                site.value.selectedPath = ''
                return
            }
            site.value.selectedPath = path
        }

        // 全部折叠
        // 当 collapsedPaths 包含 ALL_COLLAPSES_FLAG 标识符时，collapsedPaths 剩余 path 则表示展开
        // 当 collapsedPaths 不包含 ALL_COLLAPSES_FLAG 标识符时，collapsedPaths 剩余 path 则表示折叠
        // 为什么这样设计？偷懒
        const setAllCollapse = () => {
            site.value.collapsedPaths = [ALL_COLLAPSES_FLAG]
        }

        // 设置全部展开
        const setAllExpanded = () => {
            site.value.collapsedPaths = []
        }

        return {
            site,
            initSite,
            switchMode,
            toggleComment,
            toggleCollapse,
            setSelectedPath,
            setAllCollapse,
            setAllExpanded,
        }
    },
    {
        persist: {
            storage: localStorage,
        },
    },
)

export default useSiteStore
