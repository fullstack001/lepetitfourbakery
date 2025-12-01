import { mergeProps, unref, withCtx, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent } from "vue/server-renderer";
import "./BQTBzxda-1835617976051.js";
import { router } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./CeVcRmCk-1577655618930.js";
const _sfc_main = {
  __name: "Pagination",
  __ssrInlineRender: true,
  props: {
    entities: Object
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "pagination" }, _attrs))}><div class="flex justify-center mt-5 mb-3"><span>Page ${ssrInterpolate(props.entities.current_page)} of ${ssrInterpolate(props.entities.last_page)}</span></div><div class="flex justify-center">`);
      if (props.entities.prev_page_url) {
        _push(ssrRenderComponent(_sfc_main$1, {
          class: "mx-2",
          onClick: ($event) => unref(router).visit(props.entities.prev_page_url)
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Previous `);
            } else {
              return [
                createTextVNode(" Previous ")
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      if (props.entities.next_page_url) {
        _push(ssrRenderComponent(_sfc_main$1, {
          class: "mx-2",
          onClick: ($event) => unref(router).visit(props.entities.next_page_url)
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Next `);
            } else {
              return [
                createTextVNode(" Next ")
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Pagination.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
