import { createHighlighter } from 'shiki'

// 全部折叠标识符
export const ALL_COLLAPSES_FLAG = '~!@#$%^&*()_+'

/**
 * 获取路径
 * @param isArray 是否是数组
 * @param parentPath 父级的路径
 * @param key 当前字段的key
 */
export const getPath = (isArray: boolean, parentPath: string, key: string | number) => {
    if (parentPath.length === 0) {
        return isArray ? `[${key}]` : `${key}`
    }
    return isArray ? `${parentPath}.[${key}]` : `${parentPath}.${key}`
}

export function filterObjectByKeyword(obj: any, keywords: string[]) {
    if (!Array.isArray(keywords) || keywords.length === 0) {
        throw new Error('Keywords must be a non-empty array')
    }

    const maxDepth = 100

    // 检查是否匹配关键字
    function isMatch(str: string): boolean {
        const normalizedStr = str.toLowerCase()
        return keywords.some((keyword) => normalizedStr.includes(keyword))
    }

    // 检查值是否匹配
    function checkValue(value: any): boolean {
        if (value === null || value === undefined) return false
        if (typeof value === 'string') return isMatch(value)
        if (typeof value === 'number' || typeof value === 'boolean') {
            return isMatch(String(value))
        }
        return false
    }

    // 处理对象或数组
    function searchInObject(input: any, currentPath: string = '', depth: number = 0): any {
        if (depth > maxDepth) {
            console.warn(`Maximum depth of ${maxDepth} reached. Stopping recursion.`)
            return null
        }

        // 如果是数组
        if (Array.isArray(input)) {
            const result = input
                .map((item, index) => {
                    const itemPath = getPath(true, currentPath, index)

                    if (isMatch(itemPath)) {
                        return item
                    }

                    if (Array.isArray(item) || (typeof item === 'object' && item !== null)) {
                        const filtered = searchInObject(item, itemPath, depth + 1)
                        return filtered &&
                            (Array.isArray(filtered) ? filtered.length > 0 : Object.keys(filtered).length > 0)
                            ? filtered
                            : null
                    }
                    return checkValue(item) ? item : null
                })
                .filter((item) => item !== null)

            return result.length > 0 ? result : null
        }

        // 如果是对象
        if (typeof input === 'object' && input !== null) {
            const result: Record<string, any> = {}
            let hasMatch = false

            for (const key in input) {
                const value = input[key]
                const keyPath = getPath(false, currentPath, key)
                const keyMatches = isMatch(key) || isMatch(keyPath)

                if (Array.isArray(value) || (typeof value === 'object' && value !== null)) {
                    const filtered = searchInObject(value, keyPath, depth + 1)
                    if (filtered !== null || keyMatches) {
                        result[key] = filtered || value
                        hasMatch = true
                    }
                } else if (keyMatches || checkValue(value)) {
                    result[key] = value
                    hasMatch = true
                }
            }

            return hasMatch ? result : null
        }

        return null
    }

    try {
        const result = searchInObject(obj)
        return result === null ? (Array.isArray(obj) ? [] : {}) : result
    } catch (error) {
        console.error('Error during object filtering:', error)
        return Array.isArray(obj) ? [] : {}
    }
}

const presets: Record<string, string> = {
    // 'Tauri Configuration': '/tauri.yaml',
    'Simple Template': '/simple.yaml',
}

export const PRESETS = Object.keys(presets)

export const getPresetLink = (key: string) => {
    return presets[key] ?? presets[PRESETS[0]]
}

// `createHighlighter` 是异步的，它会初始化高亮器
// 并加载指定的语言和主题。
const highlighter = await createHighlighter({
    themes: ['vitesse-light'],
    langs: ['json', 'yaml'],
})

export const codeToHtml = (code: string, lang: string) => {
    return highlighter.codeToHtml(code, {
        lang: lang,
        theme: 'vitesse-light',
    })
}
