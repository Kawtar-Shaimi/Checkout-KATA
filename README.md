# Checkout Order Total Kata

A grocery point-of-sale checkout system built with **Test-Driven Development (TDD)** in JavaScript, following the strict **Red → Green → Refactor** cycle.

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+)

### Installation

```bash
npm install
```

### Running Tests

```bash
npm test
```

---

## 🏗️ Project Structure

```
Checkout-KATA/
├── src/
│   ├── Checkout.js        # Core checkout logic
│   └── Checkout.test.js   # Jest test suite
├── package.json
└── README.md
```

---

## 📦 API Reference

### `setUnitPrice(item, price)`
Configure the per-unit price for an item.
```js
checkout.setUnitPrice('soup', 1.89);
```

### `addMarkdown(item, amount)`
Apply a price markdown (discount) to an item.
```js
checkout.addMarkdown('soup', 0.20); // $0.20 off
```

### `addSpecial(item, quantity, price, limit?)`
Add a **"N for $X"** special offer (optionally capped at a maximum quantity).
```js
checkout.addSpecial('can', 3, 5.00);       // 3 cans for $5.00
checkout.addSpecial('can', 3, 5.00, 6);    // 3 for $5.00, limit 6
```

### `addBuyNGetMAtXOff(item, buyN, getM, percentOff)`
Add a **"Buy N Get M at %X off"** special offer.
```js
checkout.addBuyNGetMAtXOff('butter', 2, 1, 100); // Buy 2 get 1 free
```

### `addWeightedSpecial(item, buyLbs, discountLbs, percentOff)`
Add a **lbs-based special offer** for weighted items.
```js
checkout.addWeightedSpecial('ground beef', 2, 1, 50); // Buy 2 lbs, get 1 lb at 50% off
```

### `scan(item, weight?)`
Scan an item. Use optional `weight` (in lbs) for weighted items.
```js
checkout.scan('soup');            // unit item
checkout.scan('ground beef', 2); // 2 lbs of ground beef
```

### `remove(item, weight?)`
Remove a previously scanned item and update the total.
```js
checkout.remove('soup');
```

### `currentTotal()`
Get the current pre-tax total.
```js
checkout.currentTotal(); // e.g. 5.49
```

---

## ✅ Features Implemented

| # | Feature | Description |
|---|---------|-------------|
| 1 | Per-unit scan | Scan items priced per unit |
| 2 | Weighted scan | Scan items priced by weight (lbs) |
| 3 | Markdowns | Apply per-item price reductions |
| 4 | Special: N for $X | e.g. "3 cans for $5.00" |
| 5 | Special: Buy N Get M at %X off | e.g. "Buy 2 get 1 free" |
| 6 | Special with Limit | Cap how many items qualify for the special |
| 7 | Remove Item | Remove a scanned item and recalculate total |
| 8 | Weighted Specials | e.g. "Buy 2 lbs, get next lb at 50% off" |

---

## 🧪 Test Results

```
Test Suites: 1 passed, 1 total
Tests:       8 passed, 8 total
```

---

## 🔄 Development Approach

This project follows strict **TDD** with one Git branch per feature and three commits per feature:

1. **RED** — Write a failing test
2. **GREEN** — Write the minimum code to pass the test
3. **REFACTOR** — Clean up the code without changing behaviour
