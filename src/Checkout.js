module.exports = class Checkout {
    constructor() {
        this.unitPrices = new Map();
        this.total = 0;
    }

    setUnitPrice(item, price) {
        this.unitPrices.set(item, price);
    }

    scan(item, weight = 1) {
        if (this.unitPrices.has(item)) {
            this.total += this.calculateItemPrice(item, weight);
        }
    }

    calculateItemPrice(item, weight) {
        return this.unitPrices.get(item) * weight;
    }

    currentTotal() {
        return this.total;
    }
}
