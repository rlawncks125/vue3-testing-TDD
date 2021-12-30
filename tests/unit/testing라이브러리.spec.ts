import { render, fireEvent, getByText } from "@testing-library/vue";
import Compo from "@/components/라이브러리예제.vue";
import vuex컴포넌트 from "@/components/vuex.vue";
import { key, store, State } from "@/store/index";
import { Store } from "vuex";

describe("테스팅 라이브러리 테스트", () => {
  it("render 예제", async () => {
    const { getByText } = render(Compo);

    // getByText returns the first matching node for the provided text, and
    // throws an error if no elements match or if more than one match is found.
    getByText("Times clicked: 0");

    const button = getByText("increment");

    // Dispatch a native click event to our button element.
    await fireEvent.click(button);
    await fireEvent.click(button);

    getByText("Times clicked: 2");
  });
});

describe("vuex", () => {
  it("사용중인 vuex 활용", () => {
    const { getByTestId, getByText } = render(vuex컴포넌트, {
      global: {
        plugins: [[store, key]],
      },
    });

    getByTestId("카운트");
  });
});

// describe("Vuex", () => {
//     it("사용중인 vuex 활용 ", async () => {
//       const wrapper = shallowMount(vuex컴포넌트, {
//         global: {
//           plugins: [[store, key]],
//         },
//       });

//       const Store: Store<State> = wrapper.vm.$store;

//       expect(Store.state.count).toBe(0);
//       Store.commit("addCount");
//       await Store.dispatch("asyncData");

//       await nextTick(); // 비동기 Dom 반영 대기 import { nextTick } from "vue";
//       expect(Store.state.count).toBe(1);
//       expect(Store.state.title).toBe("데이터 목킹헀어 안심해");
//     });

//     it("vuex 목킹", async () => {
//       const wrapper = shallowMount(vuex컴포넌트, {
//         global: {
//           plugins: [[store, key]],
//           mocks: {
//             $store: {
//               state: {
//                 count: 25,
//                 title: "www",
//               },
//               computed: jest.fn(),
//               commit: jest
//                 .fn()
//                 .mockImplementation((name: string) => `${name} mock`),
//               dispacth: jest.fn(),
//             },
//           },
//         },
//       });
//       expect(wrapper.vm.$store.state.count).toBe(25);
//       expect(wrapper.vm.$store.state.title).toBe("www");
//       expect(wrapper.vm.$store.commit("add")).toBe("add mock");
//     });
//   });
