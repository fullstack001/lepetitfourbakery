import { mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderClass, ssrRenderSlot } from "vue/server-renderer";
import "@inertiajs/vue3";
import { _ as _export_sfc } from "./1tPrXgE0-1751246333532.js";
const _sfc_main = {
  __name: "Wrapper",
  __ssrInlineRender: true,
  props: {
    wrapper: { type: String, default: "wrapper" },
    background: { type: String, default: "rgba(255, 255, 255, 0)" },
    maxWidth: { type: String, default: "max-w-6xl" }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: props.wrapper,
        style: `background: ${props.background}`
      }, _attrs))} data-v-2ee95100><div class="${ssrRenderClass([__props.maxWidth, "mx-auto p-5 lg:p-20 py-6"])}" data-v-2ee95100>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Wrapper.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Wrapper = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-2ee95100"]]);
export {
  Wrapper as W
};
