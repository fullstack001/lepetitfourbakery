import { resolveComponent, unref, withCtx, createTextVNode, createVNode, withModifiers, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { A as AppLayout } from "./BT2Gi1aL-2117352433356.js";
import { Head } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./CznY329j-2334615712833.js";
import { W as Wrapper } from "./CbcLIE-O-3135473238126.js";
import "./BW6cC8iL-1754723312335.js";
import "./kZV6a-x4-2437327355113.js";
import "vuetify";
import "./DKEAH6nn-4333751172235.js";
import "mitt";
import "gsap";
import "gsap/ScrollTrigger.js";
import "gsap/ScrollSmoother.js";
import "./1tPrXgE0-1751246333532.js";
import "./AK26aD-S-7313723521453.js";
import "./C6q4kDV--4257163313235.js";
import "./DsvTyKEu-3355343127127.js";
import "./CeVcRmCk-1453137522733.js";
import "./Cyl_ukyB-3352317127354.js";
const _sfc_main = /* @__PURE__ */ Object.assign({ layout: AppLayout }, {
  __name: "Success",
  __ssrInlineRender: true,
  props: {},
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_v_btn = resolveComponent("v-btn");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Success" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, {
        wrapper: "section",
        background: "#c4dcb5"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(Wrapper, { wrapper: "section" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="w-full p-20 text-center" style="${ssrRenderStyle({ "color": "#2C6922" })}"${_scopeId2}><div class="py-20"${_scopeId2}><p class="text-3xl font-bold mb-4"${_scopeId2}>Your order has been successfully placed</p><div class="mt-10"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_v_btn, {
                    onClick: ($event) => _ctx.$inertia.visit(_ctx.route("home")),
                    class: "rounded-pill"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Back to homepage`);
                      } else {
                        return [
                          createTextVNode("Back to homepage")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div></div></div>`);
                } else {
                  return [
                    createVNode("div", {
                      class: "w-full p-20 text-center",
                      style: { "color": "#2C6922" }
                    }, [
                      createVNode("div", { class: "py-20" }, [
                        createVNode("p", { class: "text-3xl font-bold mb-4" }, "Your order has been successfully placed"),
                        createVNode("div", { class: "mt-10" }, [
                          createVNode(_component_v_btn, {
                            onClick: withModifiers(($event) => _ctx.$inertia.visit(_ctx.route("home")), ["prevent"]),
                            class: "rounded-pill"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Back to homepage")
                            ]),
                            _: 1
                          }, 8, ["onClick"])
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(Wrapper, { wrapper: "section" }, {
                default: withCtx(() => [
                  createVNode("div", {
                    class: "w-full p-20 text-center",
                    style: { "color": "#2C6922" }
                  }, [
                    createVNode("div", { class: "py-20" }, [
                      createVNode("p", { class: "text-3xl font-bold mb-4" }, "Your order has been successfully placed"),
                      createVNode("div", { class: "mt-10" }, [
                        createVNode(_component_v_btn, {
                          onClick: withModifiers(($event) => _ctx.$inertia.visit(_ctx.route("home")), ["prevent"]),
                          class: "rounded-pill"
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Back to homepage")
                          ]),
                          _: 1
                        }, 8, ["onClick"])
                      ])
                    ])
                  ])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Checkout/Success.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
