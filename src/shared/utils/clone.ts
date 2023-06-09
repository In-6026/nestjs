type INotEmptyObject<T> = Record<string, T>

export const deepClone = <T extends { [key: string]: any }>(obj: T): T => {
    if (typeof obj !== 'object' || obj === null) {
        return obj
    }
    let cloned = Array.isArray(obj) ? [] : {}
    for (let key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            (cloned as INotEmptyObject<any>)[key] = deepClone(obj[key])
        }
    }
    return cloned as T
}

export const shallowClone = <T>(obj: T): T => JSON.parse(JSON.stringify(obj))