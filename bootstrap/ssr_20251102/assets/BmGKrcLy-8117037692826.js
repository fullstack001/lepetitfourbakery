import { resolveComponent, mergeProps, withCtx, createTextVNode, createVNode, withModifiers, openBlock, createBlock, createCommentVNode, Fragment, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { A as AppLayout } from "./BQTBzxda-1835617976051.js";
import _sfc_main$5 from "./C6Y0ObKx-1685702716931.js";
import _sfc_main$4 from "./D-jSyJLQ-8276893627110.js";
import { S as SectionBorder } from "./CcSysHbI-9308617566751.js";
import _sfc_main$3 from "./BOOLoKhZ-2863108717962.js";
import _sfc_main$2 from "./T-YEhJn4-8076671928312.js";
import _sfc_main$1 from "./CSGyDJPg-9720671138268.js";
import { W as Wrapper } from "./CKjt-vIU-6617638167690.js";
import "@inertiajs/vue3";
import "./BW6cC8iL-1677159380657.js";
import "./kZV6a-x4-6055183876791.js";
import "vuetify";
import "./DKEAH6nn-8515365770691.js";
import "mitt";
import "gsap";
import "gsap/ScrollTrigger.js";
import "gsap/ScrollSmoother.js";
import "./1tPrXgE0-4581736670159.js";
import "./BPBs_0V9-9736651018597.js";
import "./C6q4kDV--1536774619085.js";
import "./DsvTyKEu-3067955167518.js";
import "./CeVcRmCk-1577655618930.js";
import "./Cyl_ukyB-5873697610160.js";
import "./B_Jfpe8w-5319163705867.js";
import "./BTUP9oKb-3683679175105.js";
import "./s5hiF3bK-7607155148936.js";
import "./D2KjorHx-1875739460561.js";
import "./UWdZNfnI-1370566578159.js";
import "./CMRC4Q_0-1790786351536.js";
import "./Do1v5jZF-7061761358955.js";
import "./BAYjN8pI-7657018516395.js";
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
