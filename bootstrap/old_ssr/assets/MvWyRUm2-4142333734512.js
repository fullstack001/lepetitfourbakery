import { resolveComponent, unref, withCtx, createTextVNode, createVNode, withModifiers, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
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
  __name: "Account",
  __ssrInlineRender: true,
  props: {
    user: Object
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_v_btn = resolveComponent("v-btn");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Account" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, { style: { "margin-top": "150px" } }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(Wrapper, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex justify-center"${_scopeId2}><div class="text-center"${_scopeId2}><h1 class="text-6xl brand uppercase"${_scopeId2}>Account</h1>`);
                  _push3(ssrRenderComponent(_component_v_btn, {
                    onClick: ($event) => _ctx.$inertia.visit(_ctx.route("profile.show")),
                    variant: "plain",
                    color: "black",
                    size: "small"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Manage profile`);
                      } else {
                        return [
                          createTextVNode("Manage profile")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div></div><div class="text-center"${_scopeId2}><p${_scopeId2}> Username: <strong${_scopeId2}>${ssrInterpolate(props.user.name)}</strong></p><p${_scopeId2}> Can subscribe: <strong${_scopeId2}>${ssrInterpolate(props.user.can_subscribe ? "yes" : "no")}</strong></p></div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex justify-center" }, [
                      createVNode("div", { class: "text-center" }, [
                        createVNode("h1", { class: "text-6xl brand uppercase" }, "Account"),
                        createVNode(_component_v_btn, {
                          onClick: withModifiers(($event) => _ctx.$inertia.visit(_ctx.route("profile.show")), ["prevent"]),
                          variant: "plain",
                          color: "black",
                          size: "small"
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Manage profile")
                          ]),
                          _: 1
                        }, 8, ["onClick"])
                      ])
                    ]),
                    createVNode("div", { class: "text-center" }, [
                      createVNode("p", null, [
                        createTextVNode(" Username: "),
                        createVNode("strong", null, toDisplayString(props.user.name), 1)
                      ]),
                      createVNode("p", null, [
                        createTextVNode(" Can subscribe: "),
                        createVNode("strong", null, toDisplayString(props.user.can_subscribe ? "yes" : "no"), 1)
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(Wrapper, null, {
                default: withCtx(() => [
                  createVNode("div", { class: "flex justify-center" }, [
                    createVNode("div", { class: "text-center" }, [
                      createVNode("h1", { class: "text-6xl brand uppercase" }, "Account"),
                      createVNode(_component_v_btn, {
                        onClick: withModifiers(($event) => _ctx.$inertia.visit(_ctx.route("profile.show")), ["prevent"]),
                        variant: "plain",
                        color: "black",
                        size: "small"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Manage profile")
                        ]),
                        _: 1
                      }, 8, ["onClick"])
                    ])
                  ]),
                  createVNode("div", { class: "text-center" }, [
                    createVNode("p", null, [
                      createTextVNode(" Username: "),
                      createVNode("strong", null, toDisplayString(props.user.name), 1)
                    ]),
                    createVNode("p", null, [
                      createTextVNode(" Can subscribe: "),
                      createVNode("strong", null, toDisplayString(props.user.can_subscribe ? "yes" : "no"), 1)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Account.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
