module.exports = class Checkout {
    constructor() {
        this.unitPrices = new Map();
        this.markdowns = new Map();
        this.specials = new Map();
        this.bogoSpecials = new Map();
        this.itemCounts = new Map();
        this.total = 0;
    }

    setUnitPrice(item, price) {
        this.unitPrices.set(item, price);
    }

    addMarkdown(item, amount) {
        this.markdowns.set(item, amount);
    }

    addSpecial(item, quantity, price, limit = Infinity) {
        this.specials.set(item, { quantity, price, limit });
    }

    addBuyNGetMAtXOff(item, buyN, getM, percentOff) {
        this.bogoSpecials.set(item, { buyN, getM, percentOff });
    }

    scan(item, weight = 1) {
        if (this.unitPrices.has(item)) {
            this.total += this.calculateItemPrice(item, weight);
            if (weight === 1) {
                const count = this.incrementItemCount(item);
                this.applyAllDiscounts(item, count);
            }
        }
    }

    applyAllDiscounts(item, count) {
        this.applyNForXDiscount(item, count);
        this.applyBOGODiscount(item, count);
    }

    incrementItemCount(item) {
        const count = (this.itemCounts.get(item) || 0) + 1;
        this.itemCounts.set(item, count);
        return count;
    }

    applyNForXDiscount(item, count) {
        if (!this.specials.has(item)) return;
        const { quantity, price, limit } = this.specials.get(item);
        if (count > limit) return;
        if (count % quantity === 0) {
            this.total += price - (this.getEffectiveUnitPrice(item) * quantity);
        }
    }

    applyBOGODiscount(item, count) {
        if (!this.bogoSpecials.has(item)) return;
        const { buyN, getM, percentOff } = this.bogoSpecials.get(item);
        const cycleLength = buyN + getM;
        const positionInCycle = ((count - 1) % cycleLength) + 1;
        if (positionInCycle > buyN) {
            this.total -= this.getEffectiveUnitPrice(item) * (percentOff / 100);
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
