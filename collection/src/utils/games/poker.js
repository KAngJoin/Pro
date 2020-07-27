// 扑克类
class Poker {
    /**
     * @param {have KING ？} include 
     */
    constructor(include = true) {
        if (new.target === Poker) {
            throw new Error('Poker类不能实例化')
        }
        this.pairs = Poker.maker(include)
    }

    /**
     * 生成一副牌(随机)
     */
    static maker(include) {
        let pair = [];
        Poker.DOT.forEach((d) => {
            Poker.TYPE.forEach((t) => {
                pair.push({
                    dot: d,
                    type: t,
                })
            })
        })
        if (include) {
            // 有大小王
            let kings = [{
                dot: 'King',
                type: 'S',
            }, {
                dot: 'King',
                type: 'L',
            }]
            pair.push(...kings)
        }
        return Poker.disorder(pair)
    }
    // canvas 绘制
    draw() {

    }
    // 静态洗牌算法
    static disorder(arr) {
        let len = arr.length
        if (!len) return arr
        let _arr = []
        for (let i = 0; i < len; i++) {
            let j = Math.floor(Math.random() * (len - i))
            _arr.push(...arr.splice(j, 1))
        }
        return _arr
    }
}
/** 花型
 * S - Spade    - 黑桃  -   (block)
 * H - Heart    - 红心  -   (red)
 * C - Club     - 梅花  -   (block)
 * D - Diamond  - 方块  -   (red)
 */
Poker.TYPE = ['S', 'H', 'C', 'D']
/** 点数 */
Poker.DOT = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
/** 大小王
 * L - 大王
 * S - 小王
 */
Poker.KING = ['L', 'S']

export class Bullfight extends Poker {
    constructor(inculde) {
        super(inculde)
    }
}
