export interface Listener<T> {
	(...params: Parameters<T[keyof T]>): Array<Promise<ReturnType<T[keyof T]>>>;
	fire: (...params: Parameters<T[keyof T]>) => Array<Promise<ReturnType<T[keyof T]>>>;
	connected: () => Set<T>;
}
