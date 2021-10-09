export type ClassType<T> = { [P in keyof T]?: T[P] };
