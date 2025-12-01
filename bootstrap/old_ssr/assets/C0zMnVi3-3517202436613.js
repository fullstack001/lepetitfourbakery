import { ref, resolveComponent, unref, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderSlot } from "vue/server-renderer";
import { Head } from "@inertiajs/vue3";
import "./BW6cC8iL-1754723312335.js";
import "./kZV6a-x4-2437327355113.js";
import { _ as _export_sfc } from "./1tPrXgE0-1751246333532.js";
const _sfc_main = {
  __name: "TeamLayout",
  __ssrInlineRender: true,
  props: {
    title: String
  },
  setup(__props) {
    const props = __props;
    ref(false);
    ref(null);
    ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_v_btn = resolveComponent("v-btn");
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-7ee8e853>`);
      _push(ssrRenderComponent(unref(Head), {
        title: `${props.title} :: Admin`
      }, null, _parent));
      _push(`<div class="min-h-screen bg-gray-100" data-v-7ee8e853><div class="flex flex-row" data-v-7ee8e853><div id="sidebar" class="min-h-screen shrink-0 bg-blue-grey-darken-4 p-0 px-md-6 py-6" data-v-7ee8e853><div class="mb-10" data-v-7ee8e853>`);
      _push(ssrRenderComponent(_component_v_btn, {
        onClick: ($event) => _ctx.$inertia.visit(_ctx.route("home")),
        "prepend-icon": "mdi-arrow-left",
        variant: "flat",
        color: "white"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="hidden d-md-block" data-v-7ee8e853${_scopeId}>Back to site</span>`);
          } else {
            return [
              createVNode("span", { class: "hidden d-md-block" }, "Back to site")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      if (_ctx.$page.props.ia) {
        _push(`<div data-v-7ee8e853>`);
        _push(ssrRenderComponent(_component_v_btn, {
          onClick: ($event) => _ctx.$inertia.visit(_ctx.route("admin")),
          "prepend-icon": "mdi-arrow-left",
          variant: "plain",
          color: "white"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="hidden d-md-block" data-v-7ee8e853${_scopeId}>Back to admin</span>`);
            } else {
              return [
                createVNode("span", { class: "hidden d-md-block" }, "Back to admin")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div data-v-7ee8e853>`);
      _push(ssrRenderComponent(_component_v_btn, {
        onClick: ($event) => _ctx.$inertia.visit(_ctx.route("team.orders")),
        "prepend-icon": "mdi-printer-pos",
        variant: "plain",
        color: "white"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="hidden d-md-block" data-v-7ee8e853${_scopeId}>Orders</span>`);
          } else {
            return [
              createVNode("span", { class: "hidden d-md-block" }, "Orders")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div data-v-7ee8e853>`);
      _push(ssrRenderComponent(_component_v_btn, {
        onClick: ($event) => _ctx.$inertia.visit(_ctx.route("team.bakery")),
        "prepend-icon": "mdi-baguette",
        variant: "plain",
        color: "white"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="hidden d-md-block" data-v-7ee8e853${_scopeId}>Bakery</span>`);
          } else {
            return [
              createVNode("span", { class: "hidden d-md-block" }, "Bakery")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="h-screen grow bg-blue-grey-lighten-4 p-6 overflow-x-hidden overflow-y-scroll" data-v-7ee8e853>`);
      if (props.title) {
        _push(`<div data-v-7ee8e853><p class="text-4xl font-medium mb-3 uppercase" data-v-7ee8e853>${ssrInterpolate(props.title)}</p></div>`);
      } else {
        _push(`<!---->`);
      }
      if (_ctx.$slots.buttons) {
        _push(`<div class="mb-3" data-v-7ee8e853>`);
        ssrRenderSlot(_ctx.$slots, "buttons", {}, null, _push, _parent);
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/TeamLayout.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const TeamLayout = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-7ee8e853"]]);
export {
  TeamLayout as T
};
