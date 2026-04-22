import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Chip from "../components/ui/Chip";

describe("Chip", () => {
  it("renders children", () => {
    render(<Chip>Vegan</Chip>);
    expect(screen.getByText("Vegan")).toBeInTheDocument();
  });

  it("renders as a button when onClick present", async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(<Chip onClick={onClick}>Filter</Chip>);
    const btn = screen.getByRole("button", { name: /filter/i });
    await user.click(btn);
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("applies active style when active", () => {
    const { container } = render(<Chip active>on</Chip>);
    expect(container.firstChild.className).toMatch(/bg-accent/);
  });

  it("renders remove button when onRemove provided", async () => {
    const onRemove = vi.fn();
    const user = userEvent.setup();
    render(<Chip onRemove={onRemove}>tomate</Chip>);
    const remove = screen.getByRole("button", { name: /entfernen|remove/i });
    await user.click(remove);
    expect(onRemove).toHaveBeenCalled();
  });
});
