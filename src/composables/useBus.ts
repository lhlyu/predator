type BusEvent =
    | 'search'
    | 'fileOpen'
    | 'updateLink'
    | 'selectPreset'
    | 'expandAll'
    | 'collapseAll'
    | 'switchMode'
    | 'toggleComment'

type EventFunction = (param: any) => Promise<void>

// 必须设置个全局的key
const key = Symbol('bus')

const useBus = () => {
    const bus = useEventBus<BusEvent>(key)

    // 发送事件
    const emit = (event: BusEvent, payload?: any): void => {
        bus.emit(event, payload)
    }

    // 监听事件
    const listen = (handlerMap: Partial<Record<BusEvent, EventFunction>>) => {
        bus.on(async (event, payload) => {
            if (event in handlerMap && handlerMap[event]) {
                await handlerMap[event](payload)
            }
        })
    }

    return {
        emit,
        listen,
    }
}

export default useBus
