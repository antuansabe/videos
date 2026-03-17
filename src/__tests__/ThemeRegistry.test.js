import { render, screen, fireEvent } from "@testing-library/react";
import ThemeRegistry, { useColorMode } from "@/components/ThemeRegistry";

// Test component to access context
function TestComponent() {
  const { mode, toggleColorMode } = useColorMode();
  return (
    <div>
      <span data-testid="mode">{mode}</span>
      <button onClick={toggleColorMode}>Toggle</button>
    </div>
  );
}

describe("ThemeRegistry", () => {
  it("renders children correctly", () => {
    render(
      <ThemeRegistry>
        <div data-testid="child">Test Child</div>
      </ThemeRegistry>
    );

    expect(screen.getByTestId("child")).toBeInTheDocument();
    expect(screen.getByText("Test Child")).toBeInTheDocument();
  });

  it("provides default dark mode", () => {
    render(
      <ThemeRegistry>
        <TestComponent />
      </ThemeRegistry>
    );

    expect(screen.getByTestId("mode")).toHaveTextContent("dark");
  });

  it("toggles between dark and light mode", () => {
    render(
      <ThemeRegistry>
        <TestComponent />
      </ThemeRegistry>
    );

    const modeDisplay = screen.getByTestId("mode");
    const toggleButton = screen.getByText("Toggle");

    expect(modeDisplay).toHaveTextContent("dark");

    fireEvent.click(toggleButton);
    expect(modeDisplay).toHaveTextContent("light");

    fireEvent.click(toggleButton);
    expect(modeDisplay).toHaveTextContent("dark");
  });

  it("provides toggleColorMode function through context", () => {
    render(
      <ThemeRegistry>
        <TestComponent />
      </ThemeRegistry>
    );

    const toggleButton = screen.getByText("Toggle");
    expect(toggleButton).toBeInTheDocument();

    // Should not throw when clicked
    fireEvent.click(toggleButton);
  });
});

describe("useColorMode hook", () => {
  it("returns mode and toggleColorMode", () => {
    let hookResult;

    function HookTester() {
      hookResult = useColorMode();
      return null;
    }

    render(
      <ThemeRegistry>
        <HookTester />
      </ThemeRegistry>
    );

    expect(hookResult).toHaveProperty("mode");
    expect(hookResult).toHaveProperty("toggleColorMode");
    expect(typeof hookResult.toggleColorMode).toBe("function");
  });
});
