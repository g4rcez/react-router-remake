export namespace Strings {
  export type Split<T extends string, Separator extends string> = T extends `${infer Part}${Separator}${infer Rest}`
    ? [Part, ...Split<Rest, Separator>]
    : [T];

  export type Contains<T extends string, Search extends string> = T extends `${string}${Search}${string}`
    ? true
    : false;

  export type Replace<
    T extends string,
    Look extends string,
    Target extends string
  > = T extends `${infer R}${Look}${infer A}` ? `${R}${Target}${A}` : T;
}

export type Merge<T> = { [K in keyof T]: T[K] } & {};

export namespace RouterUtils {
  export type ParseValue = {
    string: string;
    number: number;
    null: null;
  };
}

export namespace QueryString {
  export type Is<T extends string> = Strings.Split<T, "?">[1] extends infer R
    ? R extends undefined
      ? false
      : true
    : false;

  type MapItem<T> = T extends `${infer K}=${infer V}`
    ? {
        [key in K]: V extends keyof RouterUtils.ParseValue ? RouterUtils.ParseValue[V] : unknown;
      }
    : {};

  export type Reduce<T extends any[]> = T extends [infer First, ...infer Tail] ? First & Reduce<Tail> : {};

  type Map<T extends string[]> = T extends [infer First, ...infer Tail]
    ? [MapItem<First>, ...Map<Tail extends string[] ? Tail : []>]
    : [];

  export type Parse<T extends string> =
    Is<T> extends true ? Merge<Reduce<Map<Strings.Split<NonNullable<Strings.Split<T, "?">[1]>, "&">>>> : {};
}

export type Testing = QueryString.Parse<"/localhost?query=string&id=number">;
