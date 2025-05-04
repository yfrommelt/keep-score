# End-to-End Tests

This directory contains end-to-end tests for the Keep Score application using Playwright.

## Setup

The tests use Playwright, which is installed as a dev dependency. The configuration is in `playwright.config.ts` at the project root.

## Running Tests

You can run the tests using the following npm scripts:

```bash
# Run tests in headless mode
pnpm test:e2e

# Run tests with UI for debugging
pnpm test:e2e:ui
```

## Test Scenarios

### Game Flow

The `game-flow.spec.ts` test covers the following scenario:

1. Open the app
2. Create a new game with 2 players
   - Player 1 is named "Lolo"
   - Player 2 is named "Yoyo"
3. On the game dashboard:
   - Add +10 and +5 points to Lolo (total: 15)
   - Add +10 and -2 points to Yoyo (total: 8)
4. Wait for the countdown to finish
5. Navigate back to the game history page
6. Verify that the game card shows:
   - Lolo with 15 points
   - Yoyo with 8 points

## Accessibility

The tests use accessibility attributes (aria-labels) to select elements, making the tests more reliable and easier to maintain. These attributes also improve the application's accessibility for users with disabilities.