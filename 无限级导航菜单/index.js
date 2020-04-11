window.onload = function () {

}
const bar = Symbol('bar');
const my = Symbol('my')

class Navigate {
    static prop = 2;
    instance = 222
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this[bar](x)
    }
    toString() {
        console.log(Navigate.prop);
        return `x: ${this.x}`
    }
    [bar](_my) {
        this[my] = _my
    }
}



let nav = new Navigate(1, 2)
// console.log(Navigate === Navigate.prototype.constructor); // true
// console.log(nav.constructor === Navigate.prototype.constructor); // true
// console.log(nav.constructor === Navigate); // true

console.log(nav.toString());
console.log(nav.instance);

// Navigate.bar()

// const My = class Me {
//     getName() {
//         return Me.name
//     }
// }
// let _my = new My()

// console.log(_my.name);
