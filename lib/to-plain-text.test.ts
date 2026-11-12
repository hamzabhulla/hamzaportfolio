import { createElement } from "react";
import { describe, expect, it } from "vitest";

import { toPlainText } from "./to-plain-text";

describe("toPlainText", () => {
  it("returns plain strings unchanged", () => {
    expect(toPlainText("Hello, Lahore")).toBe("Hello, Lahore");
  });

  it("stringifies numbers", () => {
    expect(toPlainText(42)).toBe("42");
  });

  it("joins arrays of nodes", () => {
    expect(toPlainText(["a", "b", "c"])).toBe("abc");
  });

  it("strips link markup, keeping only the link text", () => {
    const node = createElement(
      "a",
      { href: "https://hamzabhulla.vercel.app" },
      "my portfolio",
    );
    expect(toPlainText(node)).toBe("my portfolio");
  });

  it("unwraps nested elements", () => {
    const node = createElement("span", null, [
      "Hello ",
      createElement("strong", null, "world"),
      "!",
    ]);
    expect(toPlainText(node)).toBe("Hello world!");
  });

  it("unwraps an element whose children mix text and links", () => {
    const node = createElement("p", null, [
      "See ",
      createElement("a", { href: "/x" }, "this page"),
      " for details.",
    ]);
    expect(toPlainText(node)).toBe("See this page for details.");
  });

  it("returns empty string for null, undefined and booleans", () => {
    expect(toPlainText(null)).toBe("");
    expect(toPlainText(undefined)).toBe("");
    expect(toPlainText(true)).toBe("");
    expect(toPlainText(false)).toBe("");
  });
});
