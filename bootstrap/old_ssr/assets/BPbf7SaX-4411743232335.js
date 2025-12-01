import { ref, mergeProps, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { A as AdmLayout } from "./Bmk57_E8-5341323707321.js";
import "@inertiajs/vue3";
import "./BW6cC8iL-1754723312335.js";
import "./kZV6a-x4-2437327355113.js";
import "./1tPrXgE0-1751246333532.js";
const _sfc_main = {
  __name: "Dashboard",
  __ssrInlineRender: true,
  props: {},
  setup(__props) {
    ref("Dashboard");
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AdmLayout, mergeProps({ title: "Dashboard" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<p${_scopeId}>Select a section in the sidebar to start.</p>`);
          } else {
            return [
              createVNode("p", null, "Select a section in the sidebar to start.")
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Dashboard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
