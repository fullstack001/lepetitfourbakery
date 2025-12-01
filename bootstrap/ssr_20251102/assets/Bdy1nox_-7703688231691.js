import { ref, mergeProps, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { T as TeamLayout } from "./SpnW4ICj-2487091673710.js";
import "@inertiajs/vue3";
import "./BW6cC8iL-1677159380657.js";
import "./kZV6a-x4-6055183876791.js";
import "./1tPrXgE0-4581736670159.js";
const _sfc_main = {
  __name: "Dashboard",
  __ssrInlineRender: true,
  props: {},
  setup(__props) {
    ref("Dashboard");
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(TeamLayout, mergeProps({ title: "Dashboard" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<p class="text-red text-sm uppercase font-bold my-4"${_scopeId}>redirect admin and bakers to bakery section, redirect front team members to orders section</p>`);
          } else {
            return [
              createVNode("p", { class: "text-red text-sm uppercase font-bold my-4" }, "redirect admin and bakers to bakery section, redirect front team members to orders section")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Team/Dashboard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
