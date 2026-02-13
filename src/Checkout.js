module.exports = class Checkout {
    constructor() {
        this.prices = new Map();
        this.total = 0;
    }

    setUnitPrice(item, price) {
        this.prices.set(item, price);
    }

    scan(item) {
        if (this.prices.has(item)) {
            this.total += this.prices.get(item);
        }
    }

    currentTotal() {
        return this.total;
    }
}
