import { test, expect } from "@playwright/test";

test("Game flow - create game, add scores, and verify history", async ({
  page,
}) => {
  // Open the app
  await page.goto("/");

  // Click on "New Game" to create a new game
  await page.getByRole("link", { name: "New Game" }).click();

  // Verify we're on the new game page
  await expect(page.getByRole("heading", { name: "New Game" })).toBeVisible();

  // Set player names
  const player1Input = page.getByLabel("Player 1");
  await player1Input.click();
  await player1Input.fill("Lolo");

  const player2Input = page.getByLabel("Player 2");
  await player2Input.click();
  await player2Input.fill("Yoyo");

  // Create the game
  await page.getByRole("button", { name: "Create Game" }).click();

  // Verify we're on the game dashboard
  await expect(
    page.getByRole("heading", { name: "Game Dashboard" }),
  ).toBeVisible();

  // Find player cards by their data-testid
  const loloCard = page.getByTestId("player-card-Lolo");
  const yoyoCard = page.getByTestId("player-card-Yoyo");

  // Add scores to Lolo: +10 and +5
  await loloCard.getByRole("button", { name: "+10" }).click();
  await loloCard.getByRole("button", { name: "+5" }).click();

  // Add scores to Yoyo: +10 and -1 twice
  await yoyoCard.getByRole("button", { name: "+10" }).click();
  await yoyoCard.getByRole("button", { name: "-1", exact: true }).click();
  await yoyoCard.getByRole("button", { name: "-1", exact: true }).click();

  // Wait for the countdown to finish (2 seconds as defined in PlayerCard.tsx)
  await page.waitForTimeout(2500);

  // Click on the back arrow to go to game history
  await page.getByRole("link", { name: "back" }).click();

  // Verify we're on the game history page
  await expect(
    page.getByRole("heading", { name: "Game History" }),
  ).toBeVisible();

  // Verify player scores using aria-labels
  await expect(
    page.getByRole("listitem").filter({ hasText: "Lolo" }).getByText("15"),
  ).toBeVisible();
  await expect(
    page.getByRole("listitem").filter({ hasText: "Yoyo" }).getByText("8"),
  ).toBeVisible();
});
