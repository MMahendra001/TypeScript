//// [deepComparisons.ts]
function f1<T, K1 extends keyof T, K2 extends keyof T[K1]>() {
    let v1: Extract<T, string> = 0 as any as T;  // Error
    let v2: Extract<T[K1], string> = 0 as any as T[K1];  // Error
    let v3: Extract<T[K1][K2], string> = 0 as any as T[K1][K2];  // No error
}

type Foo<T> = { x: Foo<T> };
type Bar<T> = { x: Bar<T[]> };

function f2<U>() {
    let x: Foo<U> = 0 as any as Bar<U>;  // Error, excessive stack depth
}

type Foo1<T> = { x: Foo2<T> };
type Foo2<T> = { x: Foo1<T> };

function f3<U>() {
    let x: Foo1<U> = 0 as any as Bar<U>;  // No error!
}

//// [deepComparisons.js]
function f1() {
    var v1 = 0; // Error
    var v2 = 0; // Error
    var v3 = 0; // No error
}
function f2() {
    var x = 0; // Error, excessive stack depth
}
function f3() {
    var x = 0; // No error!
}
