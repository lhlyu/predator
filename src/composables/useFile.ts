import { toast } from 'vue-sonner'
import yaml from 'yaml'

// 打开文件处理
const useFile = () => {
    // 获取文件后缀
    const getFileExtension = (filename: string) => {
        return filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2).toLowerCase()
    }

    // 读取文件
    const readFile = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.onload = () => resolve(reader.result as string)
            reader.onerror = reject
            reader.readAsText(file)
        })
    }

    // 解析内容
    const parseContent = (content: string, extension: string) => {
        try {
            if (extension === 'json') {
                return JSON.parse(content)
            }
            if (['yaml', 'yml'].includes(extension)) {
                return yaml.parse(content)
            }
            throw new Error('Unsupported file format')
        } catch (err) {
            throw new Error(`解析错误: ${err instanceof Error ? err.message : '未知错误'}`)
        }
    }

    const openFile = async (): Promise<any> => {
        return new Promise((resolve) => {
            const input = document.createElement('input')
            input.type = 'file'
            input.accept = '.json,.yaml,.yml'

            input.onchange = async (e: Event) => {
                const file = (e.target as HTMLInputElement).files?.[0]
                if (!file) return resolve(null)

                if (file.size > 5 * 1024 * 1024) {
                    toast.error('文件大小不能超过5M')
                    return resolve(null)
                }

                const extension = getFileExtension(file.name)
                if (!['json', 'yaml', 'yml'].includes(extension)) {
                    toast.error('不支持的文件类型')
                    return resolve(null)
                }

                try {
                    const content = await readFile(file)
                    const parsed = parseContent(content, extension)
                    resolve(parsed)
                } catch (err: any) {
                    toast.error(err.message)
                    resolve(null)
                }
            }

            input.click()
        })
    }

    return {
        openFile,
    }
}

export default useFile
