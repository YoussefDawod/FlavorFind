import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Search, Plus } from "lucide-react";
import Button from "../components/ui/Button";

describe("Button", () => {
  it("renders children", () => {
    render(<Button>Klick mich</Button>);
    expect(screen.getByRole("button", { name: "Klick mich" })).toBeInTheDocument();
  });

  it("defaults to type=button", () => {
    render(<Button>x</Button>);
    expect(screen.getByRole("button")).toHaveAttribute("type", "button");
  });

  it("handles click", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Button onClick={onClick}>go</Button>);
    await user.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("is disabled when isLoading", () => {
    render(<Button isLoading>loading</Button>);
    const btn = screen.getByRole("button");
    expect(btn).toBeDisabled();
    expect(btn).toHaveAttribute("aria-busy", "true");
  });

  it("accepts leftIcon as element", () => {
    render(
      <Button leftIcon={<Search data-testid="icon-el" />}>go</Button>,
    );
    expect(screen.getByTestId("icon-el")).toBeInTheDocument();
  });

  it("accepts leftIcon as component (Lucide)", () => {
    render(<Button leftIcon={Plus}>add</Button>);
    // Lucide renders an <svg>
    const btn = screen.getByRole("button", { name: /add/i });
    expect(btn.querySelector("svg")).toBeInTheDocument();
  });

  it("applies variant class", () => {
    render(<Button variant="danger">delete</Button>);
    expect(screen.getByRole("button").className).toMatch(/bg-danger/);
  });
});
