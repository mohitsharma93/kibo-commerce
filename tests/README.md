# tests Directory Structure

The `tests` directory is organized by project features. Each feature has its own folder, which contains subfolders for elements, pages, fixtures, and the test specification file.

## Structure

```
tests/
├── shared/
│   ├── elements/         # Reusable UI elements for this feature 
├── <feature1>/
│   ├── pages/            # Page Object Model classes for this feature
│   ├── fixtures/         # Setup logic and state initialization for this feature
│   └── <feature1>.spec.ts # Test cases for this feature
├── <feature2>/
│   ├── pages/
│   ├── fixtures/
│   └── <feature2>.spec.ts
└── ...
```

* ***shared/***  contains cross-cutting elements and components reused across multiple test suites (e.g., buttons, modals, search inputs),
* -**elements/**  Contains reusable UI element abstractions. Each file defines selectors and actions for a specific UI component, making tests more maintainable and readable.
* **pages/** Implements the Page Object Model (POM) pattern. Each class represents a page and provides methods to interact with its elements, encapsulating page-specific logic.
* **fixtures/** Contains setup and teardown logic, such as initializing application state or navigating to a specific page. Fixtures ensure tests run with consistent preconditions.
* **`<page>`.spec.ts**  Test specification files containing actual test cases for the corresponding page. These files use the page objects and fixtures to perform assertions and validate application behavior.

This structure keeps tests modular, maintainable, and organized.
