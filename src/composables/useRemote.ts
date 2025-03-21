import { toast } from 'vue-sonner'
import yaml from 'yaml'

const useRemote = () => {
    const fetchData = async (url: string): Promise<any> => {
        try {
            const response = await fetch(url)
            const text = await response.text()

            try {
                return JSON.parse(text)
            } catch {
                try {
                    return yaml.parse(text)
                } catch (err) {
                    toast.error('无法解析为 JSON/YAML 格式')
                }
            }
        } catch (e) {
            toast.error('地址请求异常')
        }
        return null
    }

    return { fetchData }
}

export default useRemote
