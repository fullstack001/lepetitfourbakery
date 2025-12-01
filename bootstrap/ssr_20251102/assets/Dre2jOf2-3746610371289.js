import { ref, resolveComponent, mergeProps, withCtx, createTextVNode, createVNode, withModifiers, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { A as AdmLayout } from "./BZf0ki2W-7956103712867.js";
import "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./Cyl_ukyB-5873697610160.js";
import "./BW6cC8iL-1677159380657.js";
import "./kZV6a-x4-6055183876791.js";
import "./1tPrXgE0-4581736670159.js";
const _sfc_main = {
  __name: "Legal",
  __ssrInlineRender: true,
  props: {
    errors: Object
  },
  setup(__props) {
    ref(null);
    ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_v_btn = resolveComponent("v-btn");
      _push(ssrRenderComponent(AdmLayout, mergeProps({ title: "Content" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$1, { gap: "4" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_v_btn, {
                    onClick: ($event) => _ctx.$inertia.visit(_ctx.route("admin.terms"))
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Terms &amp; Conditions`);
                      } else {
                        return [
                          createTextVNode("Terms & Conditions")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div><div${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_v_btn, {
                    onClick: ($event) => _ctx.$inertia.visit(_ctx.route("admin.privacy"))
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Privacy Policy`);
                      } else {
                        return [
                          createTextVNode("Privacy Policy")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", null, [
                      createVNode(_component_v_btn, {
                        onClick: withModifiers(($event) => _ctx.$inertia.visit(_ctx.route("admin.terms")), ["prevent"])
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Terms & Conditions")
                        ]),
                        _: 1
                      }, 8, ["onClick"])
                    ]),
                    createVNode("div", null, [
                      createVNode(_component_v_btn, {
                        onClick: withModifiers(($event) => _ctx.$inertia.visit(_ctx.route("admin.privacy")), ["prevent"])
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Privacy Policy")
                        ]),
                        _: 1
                      }, 8, ["onClick"])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$1, { gap: "4" }, {
                default: withCtx(() => [
                  createVNode("div", null, [
                    createVNode(_component_v_btn, {
                      onClick: withModifiers(($event) => _ctx.$inertia.visit(_ctx.route("admin.terms")), ["prevent"])
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Terms & Conditions")
                      ]),
                      _: 1
                    }, 8, ["onClick"])
                  ]),
                  createVNode("div", null, [
                    createVNode(_component_v_btn, {
                      onClick: withModifiers(($event) => _ctx.$inertia.visit(_ctx.route("admin.privacy")), ["prevent"])
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Privacy Policy")
                      ]),
                      _: 1
                    }, 8, ["onClick"])
                  ])
                ]),
                _: 1
              })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Content/Legal.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
