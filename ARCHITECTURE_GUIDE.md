# Hairvana UI Code Organization & Clean Architecture Guide

## 1. Folder Structure

```
src/
  app/                # Next.js app directory (routing, pages, entry points)
  components/
    common/           # Reusable UI elements (Button, Card, Modal, etc.)
    layout/           # Layout wrappers (AppLayout, Header, Footer, Nav)
    views/            # Main screen/view components (HomeView, GalleryView, etc.)
    cards/            # Card components (HairstyleCard, SalonCard, etc.)
    modals/           # Modal dialogs (BookingModal, RatingModal, etc.)
  lib/
    hooks/            # Custom React hooks (useClickOutside, useAutoResizeTextarea, etc.)
    utils/            # Utility functions (cn, formatting, helpers)
  styles/             # Global and component-level CSS/SCSS
  locales/            # i18n translation files (en.json, ar.json, etc.)
```

---

## 2. Componentization Strategy

### A. Identify and Extract Components
- **Presentational Components:** Stateless, UI-only, reusable (e.g., `Button`, `Card`, `Modal`, `HairstyleCard`).
- **Container Components:** Hold state, logic, and pass props to presentational components (e.g., `HomeView`, `GalleryView`).
- **Layout Components:** App shell, navigation, headers, footers.

### B. Group by Responsibility
- **/common:** For atomic, reusable UI elements.
- **/views:** For each main screen (Home, Gallery, Profile, etc.).
- **/cards, /modals:** For specialized, reusable UI blocks.

---

## 3. Code Clean-Up Checklist

- **No hardcoded strings:** Use a translation function (`t`) for all user-facing text.
- **No inline styles:** Use CSS modules, Tailwind, or styled-components.
- **No duplicated code:** Extract repeated UI into shared components.
- **No business logic in presentational components:** Keep logic in containers or hooks.
- **Type everything:** Use TypeScript interfaces/types for props, state, and data models.
- **Consistent naming:** Use clear, descriptive, and consistent names for files, components, and props.

---

## 4. Refactoring Process (Step-by-Step)

1. **Audit the main file** (e.g., `page.tsx`):  
   - List all major UI sections and repeated UI blocks.
2. **Extract presentational components**:  
   - Move UI blocks (cards, modals, popovers, etc.) into `/components`.
   - Pass all data and handlers as props.
3. **Extract main views/screens**:  
   - Move each main screen (Home, Gallery, etc.) into `/components/views/`.
   - Each view receives only the data and handlers it needs.
4. **Move hooks and utilities**:  
   - Place custom hooks in `/lib/hooks/`.
   - Place helpers in `/lib/utils/`.
5. **Centralize translations**:  
   - Use `/locales/en.json`, `/locales/ar.json`, etc. for i18n.
   - Use a `t` function everywhere for text.
6. **Refactor layout**:  
   - Use `/components/layout/` for app shell, navigation, and header.
7. **Update imports**:  
   - Use absolute or alias imports for clarity.
8. **Test and iterate**:  
   - After each extraction, test the UI and logic.
   - Refactor further as needed.

---

## 5. Example: Extracting a Card Component

**Before (inline in a view):**
```tsx
<div className="card">
  <img src={style.image} />
  <h3>{style.name}</h3>
  ...
</div>
```

**After (in `/components/cards/HairstyleCard.tsx`):**
```tsx
const HairstyleCard = ({ style, onClick }) => (
  <div className="card" onClick={onClick}>
    <img src={style.image} />
    <h3>{style.name}</h3>
    ...
  </div>
);
export default HairstyleCard;
```
**Usage:**
```tsx
<HairstyleCard style={style} onClick={...} />
```

---

## 6. Best Practices

- **Single Responsibility:** Each component does one thing.
- **Props Drilling:** Pass only what's needed; use context for global state.
- **Reusability:** Design components to be reused in multiple places.
- **Documentation:** Add comments and README for complex logic or patterns.
- **Testing:** Add unit and integration tests for critical components.

---

## 7. How to Start

1. **Pick one view (e.g., Home) and extract all its UI blocks.**
2. **Move logic to hooks if reused elsewhere.**
3. **Repeat for each view and major UI block.**
4. **Refactor the main app file to use only container logic and imports.**
5. **Document your structure and conventions in a `CONTRIBUTING.md` or `README.md`.**

---

## 8. Template for Contributors

> ### Hairvana UI Code Organization & Clean Architecture Guide
>
> 1. **Folder Structure:**  
>    - `/components/common/` for shared UI  
>    - `/components/views/` for main screens  
>    - `/lib/hooks/` for custom hooks  
>    - `/locales/` for translations  
>    - etc.
>
> 2. **Component Extraction:**  
>    - Extract all repeated UI into components  
>    - Use props for data/handlers  
>    - No business logic in presentational components
>
> 3. **State & Logic:**  
>    - Keep state in containers or hooks  
>    - Use context for global state (theme, language)
>
> 4. **Styling:**  
>    - Use CSS modules or Tailwind  
>    - No inline styles
>
> 5. **i18n:**  
>    - All text via `t` function  
>    - No hardcoded strings
>
> 6. **Type Safety:**  
>    - Use TypeScript everywhere
>
> 7. **Testing:**  
>    - Add tests for critical logic/components
>
> 8. **Documentation:**  
>    - Keep this guide up to date! 