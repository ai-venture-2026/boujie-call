import { getConfig } from "@testing-library/react";

describe("Test time limits under a busy machine", () => {
  it("gives each test 20 seconds", ({ task }) => {
    expect(task.timeout).toBe(20000);
  });

  it("waits up to 5 seconds for an element to appear", () => {
    expect(getConfig().asyncUtilTimeout).toBe(5000);
  });
});
