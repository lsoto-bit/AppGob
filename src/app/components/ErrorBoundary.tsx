import { Component, type ErrorInfo, type ReactNode } from "react";
import { Button } from "./Button";

type ErrorBoundaryProps = {
  children: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
};

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("ErrorBoundary:", error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 text-center gap-4">
          <p className="text-[15px] text-foreground">Ocurrió un error inesperado.</p>
          <p className="text-[12px] text-muted-foreground leading-relaxed">
            Puedes recargar la aplicación para continuar.
          </p>
          <Button
            onClick={() => window.location.reload()}
            variant="primary"
            size="md"
          >
            Recargar
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
