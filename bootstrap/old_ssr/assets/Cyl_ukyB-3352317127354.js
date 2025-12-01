import { mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderSlot } from "vue/server-renderer";
const _sfc_main$1 = {
  __name: "Row",
  __ssrInlineRender: true,
  props: {
    justify: { type: String, default: "start" },
    gap: { type: String, default: "3" },
    wrap: { type: Boolean, default: false },
    center: { type: Boolean, default: false },
    full: { type: Boolean, default: false }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["flex flex-row flex-wrap", {
          [`justify-${props.justify}`]: true,
          [`gap-${props.gap}`]: true,
          "flex-wrap": props.wrap,
          "items-center": props.center,
          "w-full": props.full
        }]
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Row.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "Col",
  __ssrInlineRender: true,
  props: {
    justify: { type: String, default: "start" },
    gap: { type: String, default: "1" },
    center: { type: Boolean, default: false },
    full: { type: Boolean, default: false }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["flex flex-col w-full", {
          [`justify-${props.justify}`]: true,
          [`gap-${props.gap}`]: true,
          "items-center": props.center,
          "h-full": props.full
        }]
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Col.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _,
  _sfc_main$1 as a
};
