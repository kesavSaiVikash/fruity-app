## Fruity App (Finofo take home assignment - KB) ReadMe:

**Setup Instructions:**

1. Clone the repository:

   - git clone https://github.com/kesavSaiVikash/fruity-app.git
   - cd fruity-app

2. Install dependencies:

   - npm install

3. Start development server:

   - npm start

4. Open the app:

   - Open http://localhost:3000 to view the app in your browser.

---

**Project Overview:**

The Fruits Jar Application is built with React and TypeScript. It lets you view and manage a list of fruits from the Fruityvice API. You can group fruits, add them to a jar, and see the total calories of your selections.

---

**Features:**

- Data Fetching: Fetches fruit data from the Fruityvice API.
- Group By Functionality: Group fruits by "None", "Family", "Order", or "Genus".
- Pagination: Navigate through fruit pages.
- Fruit List: Add fruits to the jar individually or by group. Manage duplicates and display their quantities.

- Jar Functionality:
  - Add/Remove Fruits: Adjust fruit quantities in the jar with + and - buttons.
  - Confirmation Modal: Includes a modal for confirming the "Remove All" action from the jar.
  - Total Calories: Shows total calories of fruits in the jar.

---

**Architecture and Design:**

- Custom Hooks:

  - useFruits: Manages fruit data, grouping, pagination, and data fetching. Utilizes useMemo and useCallback for efficient rendering and state updates.

    - useMemo: Optimizes performance by memoizing grouped fruit quantities and calories in the jar.
    - useCallback: Avoids unnecessary re-renders by memoizing functions for updating fruit quantities and handling state changes.

  - useJar: Handles jar state, including adding/removing fruits and calculating total calories. Uses useMemo to calculate grouped fruits with quantities and calories.

- Modularization: The application is modularized to enhance reusability and maintainability.

  - Components: All the Components are designed to reuse across the application (mostly on app's pages).
  - Hooks: Custom hooks manage specific aspects of functionality, making it easy to extend or modify features based on any new requirements/ features and functionality debugging is easy. (These hooks are used on app's pages)

- State Management with Jotai:

  - Jar Atoms: State for jar fruits and total calories is managed using Jotai atoms. This ensures that state changes are efficiently propagated across components.
    - jarFruitsAtom: Holds the current fruits in the jar and their quantities.
    - totalCaloriesAtom: Tracks the total calories of the fruits in the jar.

- Tailwind CSS:

  - Styling: Utilizes Tailwind CSS for utility-first styling, allowing for fast and consistent design implementation.
  - @apply Directive: Simplifies custom CSS rules.
  - Responsiveness: Ensures mobile-friendliness and adapts to various screen sizes.

---

**Future Enhancements**

- Search Functionality: Add a search bar for filtering fruits or groups.
- Improved Grouping: Add additional grouping options.
- User Accounts: Save jar contents and favorite fruits with a backend setup.
- UI/UX Enhancements: Improve user experience with advanced UI features.

---

**Thanks for reading me!**
