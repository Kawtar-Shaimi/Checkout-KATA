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
});
