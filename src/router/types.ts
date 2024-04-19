export namespace Strings {
    export type Split<T extends string, Separator extends string> = T extends `${infer Part}${Separator}${infer Rest}` ?
        [Part, ...Split<Rest, Separator>] : [T]

    export type Contains<T extends string, Search extends string> = T extends `${string}${Search}${string}` ? true : false;

    export type Replace<T extends string, Look extends string, Target extends string> = T extends `${infer R}${Look}${infer A}`
        ? `${R}${Target}${A}` : T
}

export type Merge<T> = { [K in keyof T]: T[K] } & {}
