export interface RequestTemplate<T, U> {
    handle(request: T): Promise<U>
}