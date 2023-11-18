export interface RequestHandler<T, U> {
    handle(request: T): Promise<U>
}