import type { Source } from '../stores/useSiteStore.ts'
import { getPresetLink, filterObjectByKeyword } from '../utils'

const useApp = () => {
    const docStore = useDocStore()
    const siteStore = useSiteStore()
    const { openFile } = useFile()
    const { fetchData } = useRemote()

    // 是否加载中
    const loading = ref(false)

    provide('loading', loading)

    // 展示的数据
    const data = ref<any>(null)
    // 注释集
    const comments = ref<Record<string, string>>({})
    // 文档集
    const documents = ref<Record<string, any>>({})

    // 初始化
    const initApp = async (source: Source, content: string, data: any) => {
        docStore.initDoc(data)
        switch (source) {
            case 'file':
                siteStore.initSite({
                    keyword: '',
                    collapsedPaths: [],
                    selectedPath: '',
                    source,
                    content,
                })
                break
            case 'link':
                siteStore.initSite({
                    keyword: '',
                    collapsedPaths: [],
                    selectedPath: '',
                    source,
                    content,
                })
                break
            case 'preset':
                // 这里在设置预设时，会出现无法自动持久化保存的问题，所以强制持久化
                docStore.$persist()
                siteStore.initSite({
                    keyword: '',
                    collapsedPaths: [],
                    selectedPath: '',
                    source,
                    content,
                })
                break
        }
        await searchHandler(siteStore.site.keyword)
    }

    // 搜索
    const searchHandler = async (param: any) => {
        if (siteStore.site.keyword.length) {
            const keyword = siteStore.site.keyword.toLowerCase()
            const filterPaths = docStore.doc.fields
                .filter(
                    (field) =>
                        field.comment?.toLowerCase().includes(keyword) || field.doc?.toLowerCase().includes(keyword),
                )
                .map((field) => field.path)
            console.log(filterPaths, keyword)
            data.value = filterObjectByKeyword(docStore.doc.root, [keyword, ...filterPaths])
        } else {
            data.value = docStore.doc.root
        }
        comments.value = Object.fromEntries(docStore.doc.fields.map((item) => [item.path, item.comment]))
        documents.value = Object.fromEntries(docStore.doc.fields.map((item) => [item.path, item]))
    }

    // 打开文件
    const fileOpenHandler = async (param: any) => {
        loading.value = true
        const result = await openFile()
        if (!result) {
            loading.value = false
            return
        }
        await initApp('file', '', result)
        loading.value = false
    }

    // 打开链接输入框
    const updateLinkHandler = async (param: any) => {
        loading.value = true
        const result = await fetchData(param as string)
        if (!result) {
            loading.value = false
            return
        }
        await initApp('link', param as string, result)
        loading.value = false
    }

    // 选择预设
    const selectPresetHandler = async (param: any) => {
        loading.value = true
        const result = await fetchData(getPresetLink(param as string))
        if (!result) {
            loading.value = false
            return
        }
        await initApp('preset', param as string, result)
        loading.value = false
    }

    // 全部展开
    const expandAllHandler = async (param: any) => {
        siteStore.setAllExpanded()
    }

    // 全部折叠
    const collapseAllHandler = async (param: any) => {
        siteStore.setAllCollapse()
    }

    // 切换模式
    const switchModeHandler = async (param: any) => {
        siteStore.switchMode()
    }

    // 切换展示注释
    const toggleCommentHandler = async (param: any) => {
        siteStore.toggleComment()
    }

    const { listen } = useBus()

    listen({
        search: searchHandler,
        fileOpen: fileOpenHandler,
        updateLink: updateLinkHandler,
        selectPreset: selectPresetHandler,
        expandAll: expandAllHandler,
        collapseAll: collapseAllHandler,
        switchMode: switchModeHandler,
        toggleComment: toggleCommentHandler,
    })

    onBeforeMount(async () => {
        if (docStore.initialized) {
            await searchHandler(siteStore.site.keyword)
            return
        }
        await selectPresetHandler(siteStore.site.content)
    })

    return {
        data,
        comments,
        documents,
    }
}

export default useApp
