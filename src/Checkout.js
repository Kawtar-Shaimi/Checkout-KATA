module.exports = class Checkout {
    constructor() {
        this.unitPrices = new Map();
        this.markdowns = new Map();
        this.specials = new Map();
        this.bogoSpecials = new Map();
        this.weightedSpecials = new Map();
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

    addWeightedSpecial(item, buyLbs, discountLbs, percentOff) {
        this.weightedSpecials.set(item, { buyLbs, discountLbs, percentOff });
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

    remove(item, weight = 1) {
        if (this.unitPrices.has(item)) {
            this.total -= this.calculateItemPrice(item, weight);
            if (weight === 1) {
                this.decrementItemCount(item);
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

    decrementItemCount(item) {
        const count = (this.itemCounts.get(item) || 1) - 1;
        this.itemCounts.set(item, count);
    }

    applyNForXDiscount(item, count) {
        if (!this.specials.has(item)) return;
        const special = this.specials.get(item);
        if (this.specialAppliesAt(special, count)) {
            this.total += special.price - (this.getEffectiveUnitPrice(item) * special.quantity);
        }
    }

    specialAppliesAt(special, count) {
        return count <= special.limit && count % special.quantity === 0;
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
        if (weight !== 1 && this.weightedSpecials.has(item)) {
            return this.calculateWeightedSpecialPrice(item, weight);
        }
        return this.getEffectiveUnitPrice(item) * weight;
    }

    calculateWeightedSpecialPrice(item, weight) {
        const { buyLbs, discountLbs, percentOff } = this.weightedSpecials.get(item);
        const cycleLength = buyLbs + discountLbs;
        const fullCycles = Math.floor(weight / cycleLength);
        const remaining = weight % cycleLength;
        const unitPrice = this.getEffectiveUnitPrice(item);
        const discountedPrice = unitPrice * (1 - percentOff / 100);
        const fullCyclePrice = buyLbs * unitPrice + discountLbs * discountedPrice;
        const remainderPrice = Math.min(remaining, buyLbs) * unitPrice
            + Math.max(0, remaining - buyLbs) * discountedPrice;
        return this.round(fullCycles * fullCyclePrice + remainderPrice);
    }

    round(amount) {
        return Number(amount.toFixed(2));
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
