import { mergeProps, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { A as AdmLayout } from "./Bmk57_E8-5341323707321.js";
import "@inertiajs/vue3";
import "./BW6cC8iL-1754723312335.js";
import "./kZV6a-x4-2437327355113.js";
import "./1tPrXgE0-1751246333532.js";
const _sfc_main = {
  __name: "Summary",
  __ssrInlineRender: true,
  props: {},
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AdmLayout, mergeProps({ title: "Summary" }, _attrs), null, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Summary.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
