import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Badge from "../components/ui/Badge";

describe("Badge", () => {
  it("renders children", () => {
    render(<Badge>Neu</Badge>);
    expect(screen.getByText("Neu")).toBeInTheDocument();
  });

  it("defaults to neutral variant", () => {
    render(<Badge>x</Badge>);
    expect(screen.getByText("x").className).toMatch(/bg-surface-elevated/);
  });

  it("applies accent variant", () => {
    render(<Badge variant="accent">A</Badge>);
    expect(screen.getByText("A").className).toMatch(/text-accent/);
  });

  it("applies size sm", () => {
    render(<Badge size="sm">S</Badge>);
    expect(screen.getByText("S").className).toMatch(/uppercase/);
  });

  it("passes through arbitrary props", () => {
    render(<Badge data-testid="b">x</Badge>);
    expect(screen.getByTestId("b")).toBeInTheDocument();
  });
});
