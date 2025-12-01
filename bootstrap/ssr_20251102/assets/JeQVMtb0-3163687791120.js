import { mergeProps, withCtx, openBlock, createBlock, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { A as AdmLayout } from "./BZf0ki2W-7956103712867.js";
import "@inertiajs/vue3";
import "./BW6cC8iL-1677159380657.js";
import "./kZV6a-x4-6055183876791.js";
import "./1tPrXgE0-4581736670159.js";
const _sfc_main = {
  __name: "Home",
  __ssrInlineRender: true,
  props: {
    cards: Object
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AdmLayout, mergeProps({ title: "Gift cards" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (props.cards.data.length > 0) {
              _push2(`<div${_scopeId}></div>`);
            } else {
              _push2(`<div${_scopeId}><p${_scopeId}>No gift cards were purchased at this time.</p></div>`);
            }
          } else {
            return [
              props.cards.data.length > 0 ? (openBlock(), createBlock("div", { key: 0 })) : (openBlock(), createBlock("div", { key: 1 }, [
                createVNode("p", null, "No gift cards were purchased at this time.")
              ]))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Cards/Home.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
