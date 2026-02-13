module.exports = class Checkout {
    constructor() {
        this.unitPrices = new Map();
        this.markdowns = new Map();
        this.total = 0;
    }

    setUnitPrice(item, price) {
        this.unitPrices.set(item, price);
    }

    addMarkdown(item, amount) {
        this.markdowns.set(item, amount);
    }

    scan(item, weight = 1) {
        if (this.unitPrices.has(item)) {
            this.total += this.calculateItemPrice(item, weight);
        }
    }

    calculateItemPrice(item, weight) {
        return this.getEffectiveUnitPrice(item) * weight;
    }

    getEffectiveUnitPrice(item) {
        let price = this.unitPrices.get(item);
        if (this.markdowns.has(item)) {
            price -= this.markdowns.get(item);
        }
        return price;
    }

    currentTotal() {
        return this.total;
    }
}
