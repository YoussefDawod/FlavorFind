import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Search } from "lucide-react";
import EmptyState from "../components/ui/EmptyState";

describe("EmptyState", () => {
  it("renders title and description", () => {
    render(<EmptyState title="Keine Favoriten" description="Los geht's!" />);
    expect(screen.getByText("Keine Favoriten")).toBeInTheDocument();
    expect(screen.getByText("Los geht's!")).toBeInTheDocument();
  });

  it("renders icon when provided", () => {
    const { container } = render(
      <EmptyState icon={Search} title="x" />,
    );
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("renders action CTA with icon as component", async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(
      <EmptyState
        title="x"
        action={{ label: "Suchen", onClick, icon: Search }}
      />,
    );
    const btn = screen.getByRole("button", { name: /suchen/i });
    expect(btn).toBeInTheDocument();
    await user.click(btn);
    expect(onClick).toHaveBeenCalled();
  });

  it("omits optional parts when absent", () => {
    render(<EmptyState />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
    expect(screen.queryByRole("heading")).not.toBeInTheDocument();
  });
});
