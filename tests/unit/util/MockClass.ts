export interface MockClassType {
  fetchItems: () => Promise<{ item: string; available: boolean }[]>;
}

export default class MockClass implements MockClassType {
  constructor() {}

  fetchItems(): Promise<{ item: string; available: boolean }[]> {
    return new Promise((res) => {
      setTimeout(() => {
        res([
          { item: "zz", available: true },
          { item: "ss", available: false },
        ]);
      }, 100);
    });
  }
}
