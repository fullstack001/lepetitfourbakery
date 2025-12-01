import { mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderSlot } from "vue/server-renderer";
const _sfc_main = {
  __name: "Grid",
  __ssrInlineRender: true,
  props: {
    "cols": { type: String, default: "1" },
    "md": { type: String, default: "2" },
    "lg": { type: String, default: "2" },
    "xl": { type: String, default: "2" },
    "2xl": { type: String, default: "2" },
    "gap": { type: String, default: "3" }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: `grid w-full grid-cols-${props["cols"]} md:grid-cols-${props["md"]} lg:grid-cols-${props[""]} xl:grid-cols-${props["lg"]} 2xl:grid-cols-${props["2xl"]} gap-${props["gap"]}`
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Grid.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
