"use client";

import type { PropsWithChildren } from "react";
import type { FallbackProps } from "react-error-boundary";
import { ErrorBoundary } from "react-error-boundary";
import { Alert, Button, Stack } from "@mui/material";
import { Link } from "react-router";

type AppErrorBoundaryProps = PropsWithChildren<{}>;

export default function AppErrorBoundary({ children }: AppErrorBoundaryProps) {
  function fallbackRender({ error, resetErrorBoundary }: FallbackProps) {
    return (
      <Stack spacing={1}>
        <Alert variant="filled" severity="error">
          {error.message}
        </Alert>
        <Button
          variant="contained"
          component={Link}
          to="/"
          onClick={resetErrorBoundary}
        >
          Go back to a safe place
        </Button>
      </Stack>
    );
  }

  return (
    <ErrorBoundary
      fallbackRender={fallbackRender}
      onReset={(details) => {
        // Reset the state of your app so the error doesn't happen again
        console.error(details);
      }}
    >
      {children}
    </ErrorBoundary>
  );
}
