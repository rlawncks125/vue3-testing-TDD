import { MockClassType } from "./MockClass";

export default class StubClassStub implements MockClassType {
  constructor() {}

  fetchItems(): Promise<{ item: string; available: boolean }[]> {
    return new Promise((res) => {
      setTimeout(() => {
        res([
          { item: "stub-zz", available: true },
          { item: "stub-ss", available: false },
        ]);
      }, 2);
    });
  }
}
