module.exports = class Checkout {
    constructor() {
        this.unitPrices = new Map();
        this.total = 0;
    }

    setUnitPrice(item, price) {
        this.unitPrices.set(item, price);
    }

    scan(item) {
        if (this.unitPrices.has(item)) {
            this.total += this.unitPrices.get(item);
        }
    }

    currentTotal() {
        return this.total;
    }
}
