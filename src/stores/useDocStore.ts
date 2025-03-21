interface Doc {
    // 对象
    root: any
    // 所有字段的文档信息
    fields: any[]
}

const defaultDoc: Doc = {
    root: null,
    fields: [],
}

const useDocStore = defineStore(
    'doc',
    () => {
        const doc = ref<Doc>(defaultDoc)

        // 是否已初始化
        const initialized = computed(() => !!doc.value.root)

        const initDoc = (param: any = null) => {
            if (!param) {
                doc.value = defaultDoc
                return
            }

            // 是否是数组
            if (Array.isArray(param)) {
                doc.value.root = param
                doc.value.fields = []
                return
            }

            // 是否是predator协议
            if (param.hasOwnProperty('proto') && param.proto === 'predator') {
                const obj = Object.assign(defaultDoc, param)

                doc.value.root = obj.root
                doc.value.fields = obj.fields ?? []

                return
            }

            // 普通对象
            doc.value.root = param
            doc.value.fields = []
        }

        return {
            doc,
            initialized,
            initDoc,
        }
    },
    {
        persist: {
            storage: localStorage,
        },
    },
)

export default useDocStore
