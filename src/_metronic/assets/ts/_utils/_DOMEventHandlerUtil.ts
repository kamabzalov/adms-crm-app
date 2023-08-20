import { getUniqueIdWithPrefix } from './_TypesHelpers'

export class DOMEventHandlerUtil {
    public static store = new Map()

    public static on(
        element: HTMLElement,
        selector: string,
        eventName: string,
        callBack: any
    ): string {
        const eventId = getUniqueIdWithPrefix('DOMEvent')
        DOMEventHandlerUtil.store.set(eventId, (e: Event) => {
            const targets = element.querySelectorAll(selector)
            let target: HTMLElement | null = e.target as HTMLElement
            while (target && target !== element) {
                for (let i = 0; i < targets.length; i++) {
                    if (target === targets[i]) {
                        callBack.call(target, e)
                    }
                }

                if (target.parentElement) {
                    target = target.parentElement
                } else {
                    target = null
                }
            }
        })
        element.addEventListener(eventName, DOMEventHandlerUtil.store.get(eventId))
        return eventId
    }

    public static off(element: HTMLElement, eventName: string, eventId: string): void {
        const funcFromStore = DOMEventHandlerUtil.store.get(eventId)
        if (!funcFromStore) {
            return
        }

        element.removeEventListener(eventName, funcFromStore)
        DOMEventHandlerUtil.store.delete(eventId)
    }
}
