import {
  render,
  fireEvent,
  RenderResult,
  RenderOptions,
} from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import Compo from "@/components/테스팅라이브러리/라이브러리예제.vue";
import vuex컴포넌트 from "@/components/vuex.vue";
import Slots컴포 from "@/components/Slots.vue";
import Stub컴포 from "@/components/stub컴포넌트.vue";
import 데이터접근 from "@/components/데이터_접근.vue";
import axios컴포넌트 from "@/components/axios.vue";
import comsole컴포넌트 from "@/components/consoleLog.vue";
import { key, store } from "@/store/index";
import { createStore } from "vuex";
import axios from "axios";
import { flushPromises } from "@vue/test-utils";

jest.mock("axios");
(axios.get as jest.Mock).mockResolvedValue({ data: "데이터 목킹헀어 안심해" });

describe("widnow 함수 모킹", () => {
  let log: string[] = [];
  console.log = jest.fn((msg) => log.push(msg));

  it("console.log", () => {
    console.log("test log");

    const logs = ["test log"].join("\n");

    expect(log.join("\n")).toBe(logs);
  });

  it("component console.log", () => {
    log = [];

    const component = render(comsole컴포넌트);

    const logs = ["console log testing", "onMounted"].join("\n");

    expect(log.join("\n")).toBe(logs);
  });
});

describe("데이터 접근", () => {
  let component: RenderResult;
  const propsData = "testTing";

  beforeEach(() => {
    component = render(데이터접근, {
      props: { propsData },
    });
  });

  it("html() ", () => {
    expect(component.html()).toContain(`<div>${propsData}</div>`);
  });

  it("el value 값 변경", () => {
    // userEvent 라이브러리 설치 npm install --save-dev @testing-library/user-event
    const input = component.getByTestId("input") as HTMLInputElement;

    userEvent.type(input, "value change");
    expect(input.value).toBe("value change");
  });
});

describe("이벤트 트리거 발생", () => {
  it("클릭 이벤트 발생", async () => {
    const { getByText } = render(Compo);

    getByText("Times clicked: 0");

    const button = getByText("increment");

    await fireEvent.click(button); // 내부적 실행처럼
    await userEvent.click(button); // 유저 행동 실행 처럼

    getByText("Times clicked: 2");
  });
});

describe("Slot ", () => {
  it("", () => {
    const { getByText } = render(Slots컴포, {
      slots: {
        header: "<div>Header</div>",
        default: "<div>Main Content</div>",
        footer: "<div>Footer</div>",
      },
    });
    getByText("Header");
    getByText("Main Content");
    getByText("Footer");
  });
});

describe("vuex", () => {
  it("사용중인 vuex 활용", async () => {
    const { getByTestId, getByText, rerender } = render(vuex컴포넌트, {
      global: {
        plugins: [[store, key]],
      },
    });

    expect(getByTestId("카운트").textContent).toBe("0");

    await fireEvent.click(getByText("+"));
    await fireEvent.click(getByText("+"));

    expect(getByTestId("카운트").textContent).toBe("2");
  });

  it("사용중인 vuex 스택(데이터 쌓임) 확인", () => {
    const { getByTestId } = render(vuex컴포넌트, {
      global: {
        plugins: [[store, key]],
      },
    });

    expect(getByTestId("카운트").textContent).toBe("2");
  });

  it("vuex Stub", async () => {
    const stubStore = createStore({
      state: {
        count: 10,
      },
      getters: {
        myCount: jest.fn(),
      },
      mutations: {
        addCount: (state) => {
          state.count++;
        },
      },
      actions: {},
    });
    const { getByTestId, getByText } = render(vuex컴포넌트, {
      global: {
        plugins: [[stubStore, key]],
      },
    });

    await fireEvent.click(getByText("+"));
    expect(getByTestId("카운트").textContent).toBe("11");
  });
});

describe("vue 컴포넌트 stubs", () => {
  it("render로 받아올떄 stub안한 컴포넌트로 받아옴", () => {
    const { html } = render(Stub컴포);

    expect(html()).toContain("<div>컴포A</div>");
    expect(html()).toContain("<div>컴포B</div>");
    expect(html()).toContain("<div>컴포C</div>");
  });

  it("옵션을 이용한 stub 커스텀", () => {
    const { html } = render(Stub컴포, {
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

    expect(html()).toContain("<compo-a-stub></compo-a-stub>");
    expect(html()).toContain("<div>컴포B</div>");
    expect(html()).toContain("<span>스텁 했어</span>");
  });
});

describe("axios모듈 모킹 문단마다 다르게 값변경 하기", () => {
  it("문단1", async () => {
    (axios.get as jest.Mock).mockResolvedValue({ data: "문단1 axios" });
    const { getByTestId } = render(axios컴포넌트);

    await flushPromises();
    expect(getByTestId("DomData").textContent).toBe("문단1 axios");
  });
  it("문단2", async () => {
    (axios.get as jest.Mock).mockResolvedValue({ data: "문단2 axios" });
    const { getByTestId } = render(axios컴포넌트);

    await flushPromises();
    expect(getByTestId("DomData").textContent).toBe("문단2 axios");
  });
});
