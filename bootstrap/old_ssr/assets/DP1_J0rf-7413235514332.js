import { resolveComponent, mergeProps, withCtx, createTextVNode, createVNode, withModifiers, openBlock, createBlock, createCommentVNode, Fragment, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { A as AppLayout } from "./BT2Gi1aL-2117352433356.js";
import _sfc_main$5 from "./QjNG9ydz-2133371452345.js";
import _sfc_main$4 from "./Cuekc-W5-1233453754231.js";
import { S as SectionBorder } from "./sfaSHfMj-1751343733225.js";
import _sfc_main$3 from "./QHwaysAP-7424313251533.js";
import _sfc_main$2 from "./kVJQAUAa-1253132745433.js";
import _sfc_main$1 from "./WSd1a6Ji-2334312345715.js";
import { W as Wrapper } from "./CbcLIE-O-3135473238126.js";
import "@inertiajs/vue3";
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
import "./9QJW0e5e-5374365312132.js";
import "./-Rj_bF2B-2634515733123.js";
import "./s5hiF3bK-2313375631425.js";
import "./BFeg_3wS-5313717233245.js";
import "./UWdZNfnI-1737334521532.js";
import "./CMRC4Q_0-1375365422331.js";
import "./Do1v5jZF-4731251352373.js";
import "./TZ9B_Y_9-7254333153127.js";
const _sfc_main = {
  __name: "Show",
  __ssrInlineRender: true,
  props: {
    confirmsTwoFactorAuthentication: Boolean,
    sessions: Array
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_v_btn = resolveComponent("v-btn");
      _push(ssrRenderComponent(AppLayout, mergeProps({ title: "Profile" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(Wrapper, { style: { "margin-top": "150px" } }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex justify-center"${_scopeId2}><div class="text-center"${_scopeId2}><h1 class="text-6xl brand uppercase"${_scopeId2}>Profile</h1>`);
                  _push3(ssrRenderComponent(_component_v_btn, {
                    onClick: ($event) => _ctx.$inertia.visit(_ctx.route("account")),
                    variant: "plain",
                    color: "black",
                    size: "small"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Back to account`);
                      } else {
                        return [
                          createTextVNode("Back to account")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div></div><div class="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8"${_scopeId2}>`);
                  if (_ctx.$page.props.jetstream.canUpdateProfileInformation) {
                    _push3(`<div${_scopeId2}>`);
                    _push3(ssrRenderComponent(_sfc_main$1, {
                      user: _ctx.$page.props.auth.user
                    }, null, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(SectionBorder, null, null, _parent3, _scopeId2));
                    _push3(`</div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  if (_ctx.$page.props.jetstream.canUpdatePassword) {
                    _push3(`<div${_scopeId2}>`);
                    _push3(ssrRenderComponent(_sfc_main$2, { class: "mt-10 sm:mt-0" }, null, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(SectionBorder, null, null, _parent3, _scopeId2));
                    _push3(`</div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  if (_ctx.$page.props.jetstream.canManageTwoFactorAuthentication) {
                    _push3(`<div${_scopeId2}>`);
                    _push3(ssrRenderComponent(_sfc_main$3, {
                      "requires-confirmation": __props.confirmsTwoFactorAuthentication,
                      class: "mt-10 sm:mt-0"
                    }, null, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(SectionBorder, null, null, _parent3, _scopeId2));
                    _push3(`</div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(ssrRenderComponent(_sfc_main$4, {
                    sessions: __props.sessions,
                    class: "mt-10 sm:mt-0"
                  }, null, _parent3, _scopeId2));
                  if (_ctx.$page.props.jetstream.hasAccountDeletionFeatures) {
                    _push3(`<!--[-->`);
                    _push3(ssrRenderComponent(SectionBorder, null, null, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_sfc_main$5, { class: "mt-10 sm:mt-0" }, null, _parent3, _scopeId2));
                    _push3(`<!--]-->`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex justify-center" }, [
                      createVNode("div", { class: "text-center" }, [
                        createVNode("h1", { class: "text-6xl brand uppercase" }, "Profile"),
                        createVNode(_component_v_btn, {
                          onClick: withModifiers(($event) => _ctx.$inertia.visit(_ctx.route("account")), ["prevent"]),
                          variant: "plain",
                          color: "black",
                          size: "small"
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Back to account")
                          ]),
                          _: 1
                        }, 8, ["onClick"])
                      ])
                    ]),
                    createVNode("div", { class: "max-w-7xl mx-auto py-10 sm:px-6 lg:px-8" }, [
                      _ctx.$page.props.jetstream.canUpdateProfileInformation ? (openBlock(), createBlock("div", { key: 0 }, [
                        createVNode(_sfc_main$1, {
                          user: _ctx.$page.props.auth.user
                        }, null, 8, ["user"]),
                        createVNode(SectionBorder)
                      ])) : createCommentVNode("", true),
                      _ctx.$page.props.jetstream.canUpdatePassword ? (openBlock(), createBlock("div", { key: 1 }, [
                        createVNode(_sfc_main$2, { class: "mt-10 sm:mt-0" }),
                        createVNode(SectionBorder)
                      ])) : createCommentVNode("", true),
                      _ctx.$page.props.jetstream.canManageTwoFactorAuthentication ? (openBlock(), createBlock("div", { key: 2 }, [
                        createVNode(_sfc_main$3, {
                          "requires-confirmation": __props.confirmsTwoFactorAuthentication,
                          class: "mt-10 sm:mt-0"
                        }, null, 8, ["requires-confirmation"]),
                        createVNode(SectionBorder)
                      ])) : createCommentVNode("", true),
                      createVNode(_sfc_main$4, {
                        sessions: __props.sessions,
                        class: "mt-10 sm:mt-0"
                      }, null, 8, ["sessions"]),
                      _ctx.$page.props.jetstream.hasAccountDeletionFeatures ? (openBlock(), createBlock(Fragment, { key: 3 }, [
                        createVNode(SectionBorder),
                        createVNode(_sfc_main$5, { class: "mt-10 sm:mt-0" })
                      ], 64)) : createCommentVNode("", true)
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(Wrapper, { style: { "margin-top": "150px" } }, {
                default: withCtx(() => [
                  createVNode("div", { class: "flex justify-center" }, [
                    createVNode("div", { class: "text-center" }, [
                      createVNode("h1", { class: "text-6xl brand uppercase" }, "Profile"),
                      createVNode(_component_v_btn, {
                        onClick: withModifiers(($event) => _ctx.$inertia.visit(_ctx.route("account")), ["prevent"]),
                        variant: "plain",
                        color: "black",
                        size: "small"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Back to account")
                        ]),
                        _: 1
                      }, 8, ["onClick"])
                    ])
                  ]),
                  createVNode("div", { class: "max-w-7xl mx-auto py-10 sm:px-6 lg:px-8" }, [
                    _ctx.$page.props.jetstream.canUpdateProfileInformation ? (openBlock(), createBlock("div", { key: 0 }, [
                      createVNode(_sfc_main$1, {
                        user: _ctx.$page.props.auth.user
                      }, null, 8, ["user"]),
                      createVNode(SectionBorder)
                    ])) : createCommentVNode("", true),
                    _ctx.$page.props.jetstream.canUpdatePassword ? (openBlock(), createBlock("div", { key: 1 }, [
                      createVNode(_sfc_main$2, { class: "mt-10 sm:mt-0" }),
                      createVNode(SectionBorder)
                    ])) : createCommentVNode("", true),
                    _ctx.$page.props.jetstream.canManageTwoFactorAuthentication ? (openBlock(), createBlock("div", { key: 2 }, [
                      createVNode(_sfc_main$3, {
                        "requires-confirmation": __props.confirmsTwoFactorAuthentication,
                        class: "mt-10 sm:mt-0"
                      }, null, 8, ["requires-confirmation"]),
                      createVNode(SectionBorder)
                    ])) : createCommentVNode("", true),
                    createVNode(_sfc_main$4, {
                      sessions: __props.sessions,
                      class: "mt-10 sm:mt-0"
                    }, null, 8, ["sessions"]),
                    _ctx.$page.props.jetstream.hasAccountDeletionFeatures ? (openBlock(), createBlock(Fragment, { key: 3 }, [
                      createVNode(SectionBorder),
                      createVNode(_sfc_main$5, { class: "mt-10 sm:mt-0" })
                    ], 64)) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Profile/Show.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
