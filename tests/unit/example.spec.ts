import { flushPromises, mount, shallowMount } from "@vue/test-utils";
import HelloWorld from "@/components/HelloWorld.vue";
import 데이터접근 from "@/components/데이터_접근.vue";
import DOM접근 from "@/components/Dom_접근.vue";
import 클릭시값증가 from "@/components/클릭시값증가.vue";
import axios컴포넌트 from "@/components/axios.vue";
import vuex컴포넌트 from "@/components/vuex.vue";
import { nextTick } from "vue";
import axios from "axios";
import { key, store, State, useStore } from "@/store/index";
import { Store } from "vuex";
import AppCom from "@/App.vue";
import vue라우터 from "@/components/vue라우터.vue";
import { createRouterMock, injectRouterMock, getRouter } from "vue-router-mock";
import router, { routes as indexRoutes } from "@/router/index";
import { createWebHistory } from "vue-router";

// 모듈 목킹
jest.mock("axios", () => ({
  get: () => Promise.resolve({ data: "데이터 목킹헀어 안심해" }),
  post: () => Promise.resolve({ data: "가짜 데이터야 안심해" }),
}));

describe("exprect", () => {
  it("비교", () => {
    // toMath(regexp| string) // 문자열이 정규식과 일치하는지 확인
    // toBe(value) // === 평등 연산자 원시값을 비교하거나 체크
  });
});

describe("데이터 접근", () => {
  it("html() text() 차이", () => {
    const propsData = "testTing";
    const warpper = shallowMount(데이터접근, {
      props: {
        propsData,
      },
    });

    // html()
    expect(warpper.html()).toBe(`<div>${propsData}</div>`);
    // text()
    expect(warpper.text()).toMatch(propsData);
  });

  it("props & setup() return 값 등 컴포넌트 데이터 접근", () => {
    const propsData = "testTing";
    const warpper = shallowMount(데이터접근, {
      props: {
        propsData,
      },
      global: {
        // 컴포넌트 안에 데이터 mcoking
        mocks: {
          // state: "dwdw",
        },
      },
    });

    // props데이터 접근방법
    expect(warpper.props().propsData).toBe(propsData);
    expect(warpper.vm.propsData).toBe(propsData);

    const state = "state 나쁨";
    const reactive = {
      // ...toRefs()
      title: "테스트 합시다.",
      dsc: "테스트 주도",
    };

    // vm : Component 읽기 전용
    // setup() 데이터 접근 방법
    expect(warpper.vm.state).toBe(state);
    expect(warpper.vm.title).toBe(reactive.title);
    expect(warpper.vm.dsc).toBe(reactive.dsc);

    // mock 데이터 추가 & 접근
    warpper.vm.mockData = "mockData";
    expect(warpper.vm.mockData).toBe("mockData");
  });
});

describe("DOM 접근", () => {
  it("input 타입 접근", () => {
    const warpper = shallowMount(DOM접근);

    const _value = "daw";
    const textInput = warpper.find<HTMLInputElement>("#textInput");
    // 값 셋팅
    textInput.setValue(_value);
    // 값비교
    expect(textInput.element.value).toBe(_value);
  });

  it("spyOn Mocking하여 이벤트 발생 감지", async () => {
    const warpper = shallowMount(DOM접근);

    // spy할 jest.spyOn(객체 , 함수)
    const spy = jest.spyOn(warpper.vm, "clickEvent");
    const btnInput = warpper.find<HTMLButtonElement>(".btn");
    await btnInput.trigger("click");
    expect(spy).toBeCalled();

    await btnInput.trigger("click");
    await btnInput.trigger("click");
    expect(spy).toHaveBeenCalledTimes(3);
  });
});

describe("함수 Mocking", () => {
  it("기본 목킹", () => {
    const mockFn = jest.fn();
    mockFn();
    expect(mockFn).toBeCalledTimes(1);
  });

  it("리턴값 있는 목킹", () => {
    const returnValue = "리턴값 반환ㅎㅎㅎㅎ";
    const mockFn = jest.fn().mockReturnValue(returnValue);

    expect(mockFn()).toBe(returnValue);
  });

  it("비동기 유형 목킹", async () => {
    const asyncValue = 23;
    const mockFn = jest.fn().mockResolvedValue(asyncValue);

    const result = await mockFn();

    expect(result).toBe(asyncValue);
    expect(mockFn).toBeCalledTimes(1);
  });

  it("구현 코드 형식 목킹", () => {
    const mockFn = jest
      .fn()
      .mockImplementation((name: string) => `내이름:${name}`);

    expect(mockFn("감")).toBe("내이름:감");
  });
});

describe("spy 동작 감시", () => {
  it("", () => {
    const calculator = {
      add: (a: number, b: number) => a + b,
    };

    // spy할 jest.spyOn(객체 , 함수)
    const spyFn = jest.spyOn(calculator, "add");

    calculator.add(1, 2);
    calculator.add(2, 3);

    expect(spyFn).toBeCalledTimes(2);
  });
});

describe("DOM 비동기 동작", () => {
  it("DOM 업데이트 반영 될떄 기다리기", async () => {
    const wrapper = shallowMount(클릭시값증가);

    expect(wrapper.find("h1").text()).toBe("0");

    wrapper.find("button").trigger("click");

    // DOM 업데이트될떄까지 기달림
    await nextTick(); // import { nextTick } from "vue";
    expect(wrapper.find("h1").text()).toBe("1");
  });

  it("async데이터 받아올때 DOM 업데이트 반영 될때까지 기달리기", async () => {
    const wrapper = shallowMount(axios컴포넌트);

    // DOM이 업데이트 될때까지 기달림
    await flushPromises();
    expect(wrapper.find(".DomData").text()).toBe("데이터 목킹헀어 안심해");
  });
});

describe("Vuex", () => {
  it("사용중인 vuex 활용 ", async () => {
    const wrapper = shallowMount(vuex컴포넌트, {
      global: {
        plugins: [[store, key]],
      },
    });

    const Store: Store<State> = wrapper.vm.$store;

    expect(Store.state.count).toBe(0);
    Store.commit("addCount");
    await Store.dispatch("asyncData");

    await nextTick(); // 비동기 Dom 반영 대기 import { nextTick } from "vue";
    expect(Store.state.count).toBe(1);
    expect(Store.state.title).toBe("데이터 목킹헀어 안심해");
  });

  it("vuex 목킹", async () => {
    const wrapper = shallowMount(vuex컴포넌트, {
      global: {
        plugins: [[store, key]],
        mocks: {
          $store: {
            state: {
              count: 25,
              title: "www",
            },
            computed: jest.fn(),
            commit: jest
              .fn()
              .mockImplementation((name: string) => `${name} mock`),
            dispacth: jest.fn(),
          },
        },
      },
    });
    expect(wrapper.vm.$store.state.count).toBe(25);
    expect(wrapper.vm.$store.state.title).toBe("www");
    expect(wrapper.vm.$store.commit("add")).toBe("add mock");
  });
});

describe("vueRotuer", () => {
  it("사용중인 vue 라우터 이용한 to link 이동", async () => {
    router.push("/");

    await router.isReady();

    const wrapper = mount(AppCom, {
      global: {
        plugins: [router],
      },
    });

    await wrapper.find(".Dom").trigger("click");

    await flushPromises();
    expect(wrapper.vm.$route.name).toBe("Dom");
    expect(wrapper.find("h2").text()).toBe("Dom접근");
  });

  it("vue 라우터 목킹 라이브러리 vue-router-mock 이용", async () => {
    const m_router = createRouterMock({
      routes: indexRoutes,
    });

    // inject it globally to ensure `useRoute()`, `$route`, etc work
    // properly and give you access to test specific functions
    injectRouterMock(m_router);

    const wrapper = shallowMount(vue라우터, {
      global: {
        mocks: {
          $router: m_router,
        },
      },
    });
    const push = jest.spyOn(m_router, "push");
    expect(push).toBeCalledTimes(0);

    await wrapper.vm.$router.push("/Dom");
    expect(wrapper.vm.$route.name).toBe("Dom");
    expect(push).toBeCalledTimes(1);

    await wrapper.find("button").trigger("click");
    expect(push).toHaveBeenCalledWith("Dom");
    expect(push).toBeCalledTimes(2);
  });
});

// vue 테스트 : https://vue-test-utils.vuejs.org/api/wrapper/#contains
// vue3 용 테스트 : https://next.vue-test-utils.vuejs.org/guide/advanced/vue-router.html#using-a-mocked-router
// jest : https://jestjs.io/docs/mock-function-api#mockfnmockresolvedvaluevalue

import MockClass from "@/../tests/unit/util/MockClass";
import StubClass from "@/../tests/unit/util/StubClass";
jest.mock("@/../tests/unit/util/MockClass");

describe("mock stub 차이", () => {
  beforeEach(() => {
    // 생성자와 모든 메서드에 대한 모든 인스턴스와 호출을 지움
    (MockClass as jest.Mock).mockClear();
  });

  it("mock 은 테스트할 부분적 데이터를 Mock하여 테스트", async () => {
    const mockData = [
      { item: "mock--zz", available: true },
      { item: "mock--ss", available: false },
    ];
    // const fetchItems = jest.fn().mockResolvedValue(mockData);
    // (MockClass as jest.Mock).mockImplementation(() => {
    //   return {
    //     fetchItems,
    //   };
    // });

    (MockClass as jest.Mock).mockImplementation(() => ({
      fetchItems: () => Promise.resolve(mockData),
    }));

    const items = new MockClass();

    expect(await items.fetchItems()).toEqual(mockData);
  });

  it("stub 은 준비해놓은 구조&형식을 가진 데이터를 만들어서 테스트", async () => {
    const mockData = [
      { item: "stub-zz", available: true },
      { item: "stub-ss", available: false },
    ];
    const items = new StubClass();

    expect(await items.fetchItems()).toEqual(mockData);
  });
});
