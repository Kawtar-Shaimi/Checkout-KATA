const Checkout = require('./Checkout');

describe('Checkout System', () => {
    let checkout;

    beforeEach(() => {
        checkout = new Checkout();
    });

    it('should calculate total for a single item defined by unit price', () => {
        checkout.setUnitPrice('soup', 1.89);
        checkout.scan('soup');
        expect(checkout.currentTotal()).toBe(1.89);
    });

    it('should calculate total for a weighted item', () => {
        checkout.setUnitPrice('ground beef', 5.99);
        checkout.scan('ground beef', 2);
        expect(checkout.currentTotal()).toBe(11.98);
    });

    it('should apply markdown to an item', () => {
        checkout.setUnitPrice('soup', 1.89);
        checkout.addMarkdown('soup', 0.20);
        checkout.scan('soup');
        expect(checkout.currentTotal()).toBe(1.69);
    });

    it('should apply special offer "N for $X"', () => {
        checkout.setUnitPrice('can', 2.00);
        checkout.addSpecial('can', 3, 5.00);
        checkout.scan('can');
        checkout.scan('can');
        checkout.scan('can');
        expect(checkout.currentTotal()).toBe(5.00);
    });

    it('should apply special offer "Buy N Get M at %X off"', () => {
        checkout.setUnitPrice('butter', 3.00);
        checkout.addBuyNGetMAtXOff('butter', 2, 1, 100);
        checkout.scan('butter');
        checkout.scan('butter');
        checkout.scan('butter');
        expect(checkout.currentTotal()).toBe(6.00);
    });
});
