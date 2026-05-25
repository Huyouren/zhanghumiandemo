# Zhanghumian Commerce Demo Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a browser-runnable mobile commerce demo for Zhanghumian with five mini-program-style tabs, trust-led product shopping, traceability, cart checkout simulation, member services, and prepared gpt-image-2 asset prompts.

**Architecture:** Create a Vite + React front-end app in the workspace root. Keep data, state logic, components, and styles separated: static commerce data in `src/data`, pure tested business logic in `src/lib`, UI components in `src/components`, and page-level tab views in `src/pages`. Use local React state only; no backend or real payment.

**Tech Stack:** Vite, React, Vitest, plain CSS, optional lucide-react if dependencies install successfully, static asset prompt metadata for gpt-image-2.

---

## File Structure

- Create `package.json`: project scripts and dependencies.
- Create `index.html`: Vite app mount point.
- Create `vite.config.js`: React and Vitest configuration.
- Create `src/main.jsx`: React entry point.
- Create `src/App.jsx`: shell, tab state, modal state, and app composition.
- Create `src/styles.css`: full responsive mini-program visual system.
- Create `src/data/catalog.js`: products, trace record, craft timeline, member profile, stores, and image prompt metadata.
- Create `src/lib/cart.js`: tested cart operations and totals.
- Create `src/lib/trace.js`: tested trace lookup behavior.
- Create `src/lib/appointment.js`: tested appointment validation behavior.
- Create `src/lib/*.test.js`: Vitest tests for cart, trace, and appointment logic.
- Create `src/components/AppShell.jsx`: phone frame, top bar, bottom tabs.
- Create `src/components/ProductCard.jsx`: reusable product card.
- Create `src/components/ProductDetail.jsx`: detail sheet.
- Create `src/components/AppointmentSheet.jsx`: appointment modal.
- Create `src/components/CheckoutSheet.jsx`: checkout modal.
- Create `src/components/ImagePanel.jsx`: generated-asset-ready visual fallback component.
- Create `src/pages/Home.jsx`: home tab.
- Create `src/pages/Category.jsx`: category tab.
- Create `src/pages/Trace.jsx`: trace tab.
- Create `src/pages/Cart.jsx`: cart tab.
- Create `src/pages/Mine.jsx`: mine tab.
- Create `tools/image-prompts/gpt-image-2-prompts.json`: exact gpt-image-2 prompt set for future generation.

## Task 1: Project Skeleton

**Files:**
- Create: `package.json`
- Create: `index.html`
- Create: `vite.config.js`
- Create: `src/main.jsx`
- Create: `src/App.jsx`
- Create: `src/styles.css`

- [ ] **Step 1: Create project metadata and scripts**

Write `package.json`:

```json
{
  "scripts": {
    "dev": "vite --host 0.0.0.0",
    "build": "vite build",
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "dependencies": {
    "@vitejs/plugin-react": "latest",
    "vite": "latest",
    "react": "latest",
    "react-dom": "latest",
    "lucide-react": "latest"
  },
  "devDependencies": {
    "vitest": "latest",
    "jsdom": "latest"
  }
}
```

- [ ] **Step 2: Create Vite HTML entry**

Write `index.html` with a `div#root`, viewport metadata, and title `张蝴绵非遗商城`.

- [ ] **Step 3: Configure Vite and tests**

Write `vite.config.js` using `@vitejs/plugin-react` and Vitest `environment: "jsdom"`.

- [ ] **Step 4: Create minimal React entry**

Write `src/main.jsx` to render `<App />` and import `src/styles.css`.

- [ ] **Step 5: Create temporary App shell**

Write `src/App.jsx` with a minimal `张蝴绵非遗商城` heading so the app can boot before the full UI exists.

- [ ] **Step 6: Run initial build**

Run: `npm run build`

Expected: build exits 0. If dependencies are missing, run `npm install` with network approval if required.

- [ ] **Step 7: Commit**

Not applicable because `E:\cmau\Demo` is not a git repository.

## Task 2: TDD Business Logic

**Files:**
- Create: `src/lib/cart.js`
- Create: `src/lib/cart.test.js`
- Create: `src/lib/trace.js`
- Create: `src/lib/trace.test.js`
- Create: `src/lib/appointment.js`
- Create: `src/lib/appointment.test.js`

- [ ] **Step 1: Write failing cart tests**

`src/lib/cart.test.js`:

```js
import { describe, expect, it } from "vitest";
import { addToCart, changeQuantity, removeFromCart, summarizeCart } from "./cart";

const products = [
  { id: "gold", price: 2699 },
  { id: "gift", price: 3299 }
];

describe("cart logic", () => {
  it("adds a new product and merges the same product/spec by increasing quantity", () => {
    const first = addToCart([], { productId: "gold", spec: "200x230cm" });
    const second = addToCart(first, { productId: "gold", spec: "200x230cm" });

    expect(second).toEqual([{ productId: "gold", spec: "200x230cm", quantity: 2 }]);
  });

  it("keeps different specs as separate rows", () => {
    const cart = addToCart(
      [{ productId: "gold", spec: "200x230cm", quantity: 1 }],
      { productId: "gold", spec: "220x240cm" }
    );

    expect(cart).toHaveLength(2);
    expect(cart[1]).toEqual({ productId: "gold", spec: "220x240cm", quantity: 1 });
  });

  it("changes quantity and removes rows that reach zero", () => {
    const cart = [{ productId: "gold", spec: "200x230cm", quantity: 2 }];

    expect(changeQuantity(cart, "gold", "200x230cm", -1)[0].quantity).toBe(1);
    expect(changeQuantity(cart, "gold", "200x230cm", -2)).toEqual([]);
  });

  it("removes a matching product/spec row", () => {
    const cart = [
      { productId: "gold", spec: "200x230cm", quantity: 1 },
      { productId: "gift", spec: "礼盒装", quantity: 1 }
    ];

    expect(removeFromCart(cart, "gold", "200x230cm")).toEqual([
      { productId: "gift", spec: "礼盒装", quantity: 1 }
    ]);
  });

  it("summarizes item count, subtotal, discount, and total", () => {
    const cart = [
      { productId: "gold", spec: "200x230cm", quantity: 2 },
      { productId: "gift", spec: "礼盒装", quantity: 1 }
    ];

    expect(summarizeCart(cart, products, 120)).toEqual({
      itemCount: 3,
      subtotal: 8697,
      discount: 120,
      total: 8577
    });
  });
});
```

- [ ] **Step 2: Run cart tests and verify they fail**

Run: `npm test -- src/lib/cart.test.js`

Expected: fail because `src/lib/cart.js` is missing or exports are missing.

- [ ] **Step 3: Implement cart logic**

`src/lib/cart.js`:

```js
export function addToCart(cart, item) {
  const next = cart.map((row) => ({ ...row }));
  const existing = next.find((row) => row.productId === item.productId && row.spec === item.spec);

  if (existing) {
    existing.quantity += item.quantity ?? 1;
    return next;
  }

  return [...next, { productId: item.productId, spec: item.spec, quantity: item.quantity ?? 1 }];
}

export function changeQuantity(cart, productId, spec, delta) {
  return cart
    .map((row) => {
      if (row.productId !== productId || row.spec !== spec) return row;
      return { ...row, quantity: row.quantity + delta };
    })
    .filter((row) => row.quantity > 0);
}

export function removeFromCart(cart, productId, spec) {
  return cart.filter((row) => row.productId !== productId || row.spec !== spec);
}

export function summarizeCart(cart, products, discount = 0) {
  const subtotal = cart.reduce((sum, row) => {
    const product = products.find((item) => item.id === row.productId);
    return sum + (product?.price ?? 0) * row.quantity;
  }, 0);
  const itemCount = cart.reduce((sum, row) => sum + row.quantity, 0);
  const safeDiscount = Math.min(discount, subtotal);

  return {
    itemCount,
    subtotal,
    discount: safeDiscount,
    total: subtotal - safeDiscount
  };
}
```

- [ ] **Step 4: Run cart tests and verify they pass**

Run: `npm test -- src/lib/cart.test.js`

Expected: all cart tests pass.

- [ ] **Step 5: Write failing trace tests**

`src/lib/trace.test.js`:

```js
import { describe, expect, it } from "vitest";
import { lookupTraceRecord } from "./trace";

const record = {
  code: "ZHM-2026-0518",
  origin: "云南昭通"
};

describe("trace lookup", () => {
  it("returns the matching record for a normalized code", () => {
    expect(lookupTraceRecord(" zhm-2026-0518 ", [record])).toEqual({
      ok: true,
      record
    });
  });

  it("returns a friendly error for empty code", () => {
    expect(lookupTraceRecord("", [record])).toEqual({
      ok: false,
      message: "请输入溯源码或点击示例码"
    });
  });

  it("returns a friendly error for unknown code", () => {
    expect(lookupTraceRecord("ZHM-0000", [record])).toEqual({
      ok: false,
      message: "没有找到该溯源码，请试试示例码 ZHM-2026-0518"
    });
  });
});
```

- [ ] **Step 6: Run trace tests and verify they fail**

Run: `npm test -- src/lib/trace.test.js`

Expected: fail because `src/lib/trace.js` is missing or exports are missing.

- [ ] **Step 7: Implement trace lookup**

`src/lib/trace.js`:

```js
export function lookupTraceRecord(code, records) {
  const normalized = code.trim().toUpperCase();

  if (!normalized) {
    return { ok: false, message: "请输入溯源码或点击示例码" };
  }

  const record = records.find((item) => item.code.toUpperCase() === normalized);

  if (!record) {
    return { ok: false, message: "没有找到该溯源码，请试试示例码 ZHM-2026-0518" };
  }

  return { ok: true, record };
}
```

- [ ] **Step 8: Run trace tests and verify they pass**

Run: `npm test -- src/lib/trace.test.js`

Expected: all trace tests pass.

- [ ] **Step 9: Write failing appointment tests**

`src/lib/appointment.test.js`:

```js
import { describe, expect, it } from "vitest";
import { validateAppointment } from "./appointment";

describe("appointment validation", () => {
  it("requires contact name and phone", () => {
    expect(validateAppointment({ contactName: "", phone: "" })).toEqual({
      ok: false,
      errors: {
        contactName: "请填写联系人",
        phone: "请填写手机号"
      }
    });
  });

  it("requires a mainland China mobile phone shape for the demo", () => {
    expect(validateAppointment({ contactName: "张女士", phone: "12345" })).toEqual({
      ok: false,
      errors: {
        phone: "请填写 11 位手机号"
      }
    });
  });

  it("accepts a complete appointment", () => {
    expect(validateAppointment({ contactName: "张女士", phone: "13800138000" })).toEqual({
      ok: true,
      errors: {}
    });
  });
});
```

- [ ] **Step 10: Run appointment tests and verify they fail**

Run: `npm test -- src/lib/appointment.test.js`

Expected: fail because `src/lib/appointment.js` is missing or exports are missing.

- [ ] **Step 11: Implement appointment validation**

`src/lib/appointment.js`:

```js
export function validateAppointment(values) {
  const errors = {};
  const contactName = values.contactName?.trim() ?? "";
  const phone = values.phone?.trim() ?? "";

  if (!contactName) {
    errors.contactName = "请填写联系人";
  }

  if (!phone) {
    errors.phone = "请填写手机号";
  } else if (!/^1\d{10}$/.test(phone)) {
    errors.phone = "请填写 11 位手机号";
  }

  return {
    ok: Object.keys(errors).length === 0,
    errors
  };
}
```

- [ ] **Step 12: Run all logic tests**

Run: `npm test`

Expected: all tests pass.

- [ ] **Step 13: Commit**

Not applicable because `E:\cmau\Demo` is not a git repository.

## Task 3: Static Data and Asset Prompts

**Files:**
- Create: `src/data/catalog.js`
- Create: `tools/image-prompts/gpt-image-2-prompts.json`

- [ ] **Step 1: Create commerce data**

Write `src/data/catalog.js` with:

- Four products: golden silk quilt, mulberry silk quilt, four-season child-parent quilt, and gift set.
- One trace record for `ZHM-2026-0518`.
- Eighteen craft timeline steps.
- Member profile and store info.
- Image prompt metadata for the four target assets.

- [ ] **Step 2: Create gpt-image-2 prompt JSON**

Write `tools/image-prompts/gpt-image-2-prompts.json` with the four prompts from the design spec, each containing `file`, `useCase`, `size`, `quality`, and `prompt`.

- [ ] **Step 3: Verify data imports**

Run: `npm run build`

Expected: build exits 0 once UI imports are connected. If UI is not connected yet, run after Task 4.

- [ ] **Step 4: Commit**

Not applicable because `E:\cmau\Demo` is not a git repository.

## Task 4: UI Components and Pages

**Files:**
- Create: `src/components/AppShell.jsx`
- Create: `src/components/ProductCard.jsx`
- Create: `src/components/ProductDetail.jsx`
- Create: `src/components/AppointmentSheet.jsx`
- Create: `src/components/CheckoutSheet.jsx`
- Create: `src/components/ImagePanel.jsx`
- Create: `src/pages/Home.jsx`
- Create: `src/pages/Category.jsx`
- Create: `src/pages/Trace.jsx`
- Create: `src/pages/Cart.jsx`
- Create: `src/pages/Mine.jsx`
- Modify: `src/App.jsx`
- Modify: `src/styles.css`

- [ ] **Step 1: Build app shell**

Create `AppShell.jsx` with a phone frame, fixed bottom tab bar, top brand bar, and content slot.

- [ ] **Step 2: Build shared components**

Create product card, image fallback panel, product detail sheet, appointment sheet, and checkout sheet.

- [ ] **Step 3: Build Home tab**

Implement hero, scene cards, recommended products, trust strip, craft teaser, and appointment button.

- [ ] **Step 4: Build Category tab**

Implement category filter chips, product grid/list, add-to-cart, and product detail sheet opening.

- [ ] **Step 5: Build Trace tab**

Implement sample trace code interaction, trace lookup, error state, record detail, and eighteen-step timeline.

- [ ] **Step 6: Build Cart tab**

Implement cart rows, quantity controls, remove, subtotal, coupon, empty state, checkout modal, and success state.

- [ ] **Step 7: Build Mine tab**

Implement member card, appointment card, care services, referral sheet, and store info.

- [ ] **Step 8: Wire App state**

Use `App.jsx` to manage active tab, selected category, selected product, cart state, appointment sheet state, checkout state, and toast/success messages.

- [ ] **Step 9: Style full mobile UI**

Write `styles.css` with responsive phone frame, stable card dimensions, bottom tab safe area, readable text sizing, and no overlapping text.

- [ ] **Step 10: Build**

Run: `npm run build`

Expected: build exits 0.

- [ ] **Step 11: Commit**

Not applicable because `E:\cmau\Demo` is not a git repository.

## Task 5: Browser Verification

**Files:**
- No source files unless verification reveals layout bugs.

- [ ] **Step 1: Run all tests**

Run: `npm test`

Expected: all tests pass.

- [ ] **Step 2: Run production build**

Run: `npm run build`

Expected: build exits 0.

- [ ] **Step 3: Start local dev server**

Run: `npm run dev -- --port 5173`

Expected: Vite serves the app at `http://127.0.0.1:5173/`.

- [ ] **Step 4: Capture screenshots**

Use Playwright or `npx playwright screenshot` to capture desktop/mobile screenshots of Home and at least one interaction screen.

- [ ] **Step 5: Verify core flows manually or with browser automation**

Required checks:

- Home renders.
- Five tabs are reachable.
- Product can be added to cart.
- Cart subtotal changes.
- Trace sample code reveals record.
- Invalid trace code shows an error.
- Appointment validation blocks empty fields.
- Checkout success state appears.

- [ ] **Step 6: Fix verification issues and rerun relevant commands**

If any check fails, patch source files and rerun `npm test` and `npm run build`.

- [ ] **Step 7: Commit**

Not applicable because `E:\cmau\Demo` is not a git repository.

## Self-Review

- Spec coverage: covered five tabs, cart, traceability, appointment, member services, static data, generated asset prompts, no backend/payment, and verification.
- Placeholder scan: no TBD/TODO/later/fill-in steps are required for implementation.
- Type consistency: `Product`, `CartItem`, trace record, appointment values, and member profile names are consistent across tasks.
- Git note: commit steps are explicitly marked not applicable because the workspace is not a git repository.

