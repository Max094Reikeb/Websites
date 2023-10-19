import { reactive, toRefs } from "vue";

const state = reactive({
    allSeries: [],
});

export default toRefs(state);
