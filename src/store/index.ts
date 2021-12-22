import axios from "axios";
import { InjectionKey } from "vue";
import {
  createStore,
  useStore as baseUseStore,
  Store,
  GetterTree,
  MutationTree,
  ActionTree,
} from "vuex";

export interface State {
  count: number;
  title: string;
}

export const key: InjectionKey<Store<State>> | symbol = Symbol();

const getters: GetterTree<State, State> = {
  myCount: (state: State) => {
    return state.count;
  },
};

const mutations: MutationTree<State> = {
  addCount: (state) => {
    state.count += 1;
  },
};

const actions: ActionTree<State, State> = {
  asyncData: async ({ state, commit }) => {
    const res = await (await axios.get("http://localhost:3030/")).data;
    state.title = res;
  },
};

//store 정의
export const store = createStore<State>({
  state: {
    count: 0,
    title: "타이틀틀",
  },
  getters,
  mutations,
  actions,
});

// Composition Api에서 접근할떄 이함수를 사용
export function useStore(): Store<State> {
  return baseUseStore(key);
}
