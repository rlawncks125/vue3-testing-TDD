import {
  flushPromises,
  mount,
  shallowMount,
  VueWrapper,
} from "@vue/test-utils";
import 데이터접근 from "@/components/데이터_접근.vue";
import DOM접근 from "@/components/Dom_접근.vue";
import 클릭시값증가 from "@/components/클릭시값증가.vue";
import axios컴포넌트 from "@/components/axios.vue";
import vuex컴포넌트 from "@/components/vuex.vue";
import { nextTick } from "vue";
import axios from "axios";
import { key, store, State } from "@/store/index";
import { createStore, Store } from "vuex";
import AppCom from "@/App.vue";
import vue라우터 from "@/components/vue라우터.vue";
import Slots컴포 from "@/components/Slots.vue";
import Stub컴포 from "@/components/stub컴포넌트.vue";
import emit컴포 from "@/components/emit접근.vue";
import 하위emit컴포 from "@/components/하위컴포넌트/하위emit.vue";
import ErroCompo from "@/components/Error.vue";
import { createRouterMock, injectRouterMock, getRouter } from "vue-router-mock";
import router, { routes as indexRoutes } from "@/router/index";

// 모듈 목킹
// jest.mock("axios", () => ({
//   get: () => Promise.resolve({ data: "데이터 목킹헀어 안심해" }),
//   post: () => Promise.resolve({ data: "가짜 데이터야 안심해" }),
// }));
jest.mock("axios");
(axios.get as jest.Mock).mockResolvedValue({ data: "데이터 목킹헀어 안심해" });
(axios.post as jest.Mock).mockResolvedValue({ data: "데이터 목킹헀어 " });

describe("exprect", () => {
  it("비교", () => {
    // toMath(regexp| string) // 문자열이 정규식과 일치하는지 확인
    // toBe(value) // === 평등 연산자 원시값을 비교하거나 체크
  });
});

describe("데이터 접근", () => {
  const state = "state 나쁨";
  const reactive = {
    // ...toRefs()
    title: "테스트 합시다.",
    dsc: "테스트 주도",
  };
  it("html() text() 차이", () => {
    const propsData = "testTing";
    const warpper = shallowMount(데이터접근, {
      props: {
        propsData,
      },
    });

    // html()
    expect(warpper.html()).toContain(`<div>${propsData}</div>`);
    // text()
    expect(warpper.text()).toMatch(propsData);
  });

  describe("컴포넌트 데이터 얻기 ", () => {
    let warpper: VueWrapper<any>;
    const propsData = "testTing";
    const mockData = "mockTestTing";

    beforeEach(() => {
      warpper = shallowMount(데이터접근, {
        props: { propsData },
        global: { mocks: { mockData } },
      });
    });

    it("props데이터 값 얻기", () => {
      expect(warpper.props("propsData")).toBe(propsData);
      expect(warpper.props().propsData).toBe(propsData);
      expect(warpper.vm.propsData).toBe(propsData);
    });

    it("속성 셀렉터로 값 얻기", () => {
      expect(warpper.find('p[data-testid="dsc"]').text()).toBe(reactive.dsc);
      expect(warpper.find('[data-testid="dsc"]').text()).toBe(reactive.dsc);
    });

    it("ref 값 접근 하여 얻기", () => {
      expect(warpper.find({ ref: "pRef" }).text()).toBe(reactive.dsc);
    });

    it("vm : Compoent 읽기 전용 ( setup값 , mock값, props값등 컴포넌트값 ) ", () => {
      // setup값
      expect(warpper.vm.state).toBe(state);
      expect(warpper.vm.title).toBe(reactive.title);
      expect(warpper.vm.dsc).toBe(reactive.dsc);
      // props값
      expect(warpper.vm.propsData).toBe(propsData);
      // mocks 값
      expect(warpper.vm.mockData).toBe(mockData);
    });
  });

  describe("값 변경", () => {
    let warpper: VueWrapper<any>;

    beforeEach(() => {
      warpper = shallowMount(데이터접근);
    });

    it("setProps() props값 변경", async () => {
      const propsData = "propsData입니다.";
      warpper = shallowMount(데이터접근, {
        props: { propsData },
      });

      expect(warpper.props().propsData).toBe(propsData);

      await warpper.setProps({ propsData: "데이터 변경" });
      expect(warpper.props().propsData).toBe("데이터 변경");
    });

    it("setData()", () => {
      // data() { } 사용시 접근
      // setup()만 사용해서 나중에 data()사용할시 추가하자
    });

    it("setValue() Element value값 변경", async () => {
      const input = warpper.find<HTMLInputElement>("input");

      input.setValue("addData");
      expect(input.element.value).toBe("addData");
    });

    it("vm 접근으로 setup()값 변경", async () => {
      warpper.vm.dsc = "changeSetupData";

      await nextTick();
      expect(warpper.vm.dsc).toBe("changeSetupData");
      expect(warpper.html()).toContain("changeSetupData");
    });

    it("vm 접근으로 mock 데이터 값 변경", () => {
      warpper = shallowMount(데이터접근, {
        global: { mocks: { SCV: "출격 준비" } },
      });

      expect(warpper.vm.SCV).toBe("출격 준비");

      warpper.vm.SCV = "일꾼 맞나?";
      expect(warpper.vm.SCV).toBe("일꾼 맞나?");
    });
  });

  describe("vm 으로 데이터  추가", () => {
    it("vm 을 이용한 데이터 추가", () => {
      const warpper = shallowMount(데이터접근);
      const mockData = "mockTesting";
      warpper.vm.mockData = mockData;

      expect(warpper.vm.mockData).toBe(mockData);
    });
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

describe("Slot ", () => {
  it("", () => {
    const wrapper = mount(Slots컴포, {
      slots: {
        header: "<div>Header</div>",
        default: "<div>Main Content</div>",
        footer: "<div>Footer</div>",
      },
    });

    expect(wrapper.html()).toContain("<div>Header</div>");
    expect(wrapper.html()).toContain("<div>Main Content</div>");
    expect(wrapper.html()).toContain("<div>Footer</div>");
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

    await wrapper.find("button").trigger("click");
    expect(Store.state.count).toBe(2);
  });

  it("사용중인 vuex 스택(데이터 쌓임) 확인 ", async () => {
    const wrapper = shallowMount(vuex컴포넌트, {
      global: {
        plugins: [[store, key]],
      },
    });

    expect(wrapper.vm.$store.state.count).toBe(2);
  });

  it("vuex Stub", async () => {
    const stubStore = createStore({
      state: {
        count: 10,
        title: "wwa",
      },
      mutations: {
        addCount: (state) => {
          state.count++;
        },
      },
    });
    const wrapper = shallowMount(vuex컴포넌트, {
      global: {
        plugins: [[stubStore, key]],
      },
    });

    expect(wrapper.vm.$store.state.count).toBe(10);
    expect(wrapper.vm.$store.state.title).toBe("wwa");
    await wrapper.find("button").trigger("click");
    expect(wrapper.vm.$store.state.count).toBe(11);
    expect(wrapper.find(".count").text()).toBe("11");
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

describe("vue 컴포넌트 stubs", () => {
  it("mount를 이용한 stub안한 컴포넌트 받아오기", () => {
    const wrapper = mount(Stub컴포);

    expect(wrapper.html()).toContain("<div>컴포A</div>");
    expect(wrapper.html()).toContain("<div>컴포B</div>");
    expect(wrapper.html()).toContain("<div>컴포C</div>");
  });

  it("shallow Mount를 이용한 모든 하위컴포넌트 stub", () => {
    const wrapper = shallowMount(Stub컴포);

    expect(wrapper.html()).toContain("<compo-a-stub></compo-a-stub>");
    expect(wrapper.html()).toContain("<compo-b-stub></compo-b-stub>");
    expect(wrapper.html()).toContain("<compo-c-stub></compo-c-stub>");
  });

  it("옵션을 이용한 stub 커스텀", () => {
    const wrapper = shallowMount(Stub컴포, {
      global: {
        stubs: {
          compoA: true,
          compoB: false,
          compoC: {
            template: `<span>스텁 했어</span>`,
          },
        },
      },
    });

    expect(wrapper.html()).toContain("<compo-a-stub></compo-a-stub>");
    expect(wrapper.html()).toContain("<div>컴포B</div>");
    expect(wrapper.html()).toContain("<span>스텁 했어</span>");
  });
});

describe("하위 컴포넌트 접근", () => {
  it("하위 컴포넌트 접근", () => {
    const wrapper = mount(Stub컴포, {
      global: {
        stubs: {
          compoB: true,
        },
      },
    });
    const compoA = wrapper.getComponent({ name: "compoA" });
    expect(compoA.html()).toContain("컴포A");

    const compoB = wrapper.getComponent({ name: "compoB" });
    expect(compoB.html()).toContain("compo-b-stub");
  });
});

describe("emit", () => {
  it("emit 있는 컴포넌트 테스트", () => {
    const wrapper = mount(하위emit컴포);

    wrapper.find("button").trigger("click");

    expect(wrapper.emitted().childEvent[0]).toEqual([{ msg: "자식" }]);
    expect(wrapper.emitted().childEvent[1]).toEqual([{ msg: "자식2" }]);
  });

  it("하위 컴포넌트 emit 테스트 ", () => {
    const wrapper = mount(emit컴포);

    const childCompo = wrapper.getComponent({ name: "childCompo" });
    childCompo.find("button").trigger("click");

    expect(childCompo.emitted().childEvent[0]).toEqual([{ msg: "자식" }]);
    expect(childCompo.emitted().childEvent[1]).toEqual([{ msg: "자식2" }]);
  });
});

describe("axios모듈 모킹 문단마다 다르게 값변경 하기", () => {
  it("문단1", async () => {
    (axios.get as jest.Mock).mockResolvedValue({ data: "문단1 axios" });
    const axiosWrapper = shallowMount(axios컴포넌트);

    await flushPromises();
    expect(axiosWrapper.find(".DomData").text()).toBe("문단1 axios");
  });
  it("문단2", async () => {
    (axios.get as jest.Mock).mockResolvedValue({ data: "문단2 axios" });
    const axiosWrapper = shallowMount(axios컴포넌트);

    await flushPromises();
    expect(axiosWrapper.find(".DomData").text()).toBe("문단2 axios");
  });
});

describe("error 처리 ", () => {
  it("에러 처리하는법", () => {
    const warpper = shallowMount(ErroCompo);
    expect(() => warpper.vm.errCall(true)).toThrow("에러 처리 테스트 입니다.");

    expect(() => {
      warpper.vm.errCall("_", true);
    }).toThrow("두번째 에러 발생");
  });

  it("try cath 에러 처리", () => {
    const warpper = shallowMount(ErroCompo);

    try {
      const res = warpper.vm.errCall();
      expect(res).toBeTruthy();

      warpper.vm.errCall(true);
    } catch (e: any) {
      expect(e.message).toBe("에러 처리 테스트 입니다.");
    }

    try {
      warpper.vm.errCall("_", true);
    } catch (e: any) {
      expect(e.message).toBe("두번째 에러 발생");
    }
  });
});

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

  it("stub 은 구조&형식이 같은 데이터 더미를 만들어서 테스트", async () => {
    const mockData = [
      { item: "stub-zz", available: true },
      { item: "stub-ss", available: false },
    ];
    const items = new StubClass();

    expect(await items.fetchItems()).toEqual(mockData);
  });
});

// vue 테스트 : https://vue-test-utils.vuejs.org/api/wrapper/#contains
// vue3 용 테스트 : https://next.vue-test-utils.vuejs.org/guide/advanced/vue-router.html#using-a-mocked-router
// jest : https://jestjs.io/docs/mock-function-api#mockfnmockresolvedvaluevalue
