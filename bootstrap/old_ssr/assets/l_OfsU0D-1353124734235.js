import { resolveComponent, unref, withCtx, createTextVNode, createVNode, toDisplayString, openBlock, createBlock, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { A as AppLayout } from "./BT2Gi1aL-2117352433356.js";
import { Head } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./CznY329j-2334615712833.js";
import { W as Wrapper } from "./CbcLIE-O-3135473238126.js";
import { _ as _sfc_main$2 } from "./BGTMc6Vz-1731362423358.js";
import { _ as _sfc_main$3 } from "./Cyl_ukyB-3352317127354.js";
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
const _sfc_main = /* @__PURE__ */ Object.assign({ layout: AppLayout }, {
  __name: "Terms",
  __ssrInlineRender: true,
  props: {
    categories: Object
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_v_card = resolveComponent("v-card");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Terms and Conditions" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, { wrapper: "section" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(Wrapper, {
              wrapper: "section",
              maxWidth: "max-w-4xl"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="pt-10"${_scopeId2}><div${_scopeId2}><div${_scopeId2}><div${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$2, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Terms and conditions`);
                      } else {
                        return [
                          createTextVNode("Terms and conditions")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div></div></div></div><div${_scopeId2}><div${_scopeId2}><div class="block"${_scopeId2}><div${_scopeId2}><!--[-->`);
                  ssrRenderList(props.categories, (category) => {
                    _push3(`<div${_scopeId2}>`);
                    _push3(ssrRenderComponent(_sfc_main$3, { gap: "4" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<h2 class="text-2xl mt-10"${_scopeId3}>${ssrInterpolate(category.position)}. ${ssrInterpolate(category.title)}</h2><!--[-->`);
                          ssrRenderList(category.paragraphs, (paragraph) => {
                            _push4(ssrRenderComponent(_component_v_card, {
                              color: "grey-lighten-4",
                              rounded: "lg"
                            }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`<div class="p-4"${_scopeId4}><p class="text-lg"${_scopeId4}>${ssrInterpolate(category.position)}.${ssrInterpolate(paragraph.position)}. ${ssrInterpolate(paragraph.title)}</p><p${_scopeId4}>${paragraph.content_formatted ?? ""}</p></div>`);
                                } else {
                                  return [
                                    createVNode("div", { class: "p-4" }, [
                                      createVNode("p", { class: "text-lg" }, toDisplayString(category.position) + "." + toDisplayString(paragraph.position) + ". " + toDisplayString(paragraph.title), 1),
                                      createVNode("p", {
                                        innerHTML: paragraph.content_formatted
                                      }, null, 8, ["innerHTML"])
                                    ])
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                          });
                          _push4(`<!--]-->`);
                        } else {
                          return [
                            createVNode("h2", { class: "text-2xl mt-10" }, toDisplayString(category.position) + ". " + toDisplayString(category.title), 1),
                            (openBlock(true), createBlock(Fragment, null, renderList(category.paragraphs, (paragraph) => {
                              return openBlock(), createBlock(_component_v_card, {
                                color: "grey-lighten-4",
                                rounded: "lg"
                              }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "p-4" }, [
                                    createVNode("p", { class: "text-lg" }, toDisplayString(category.position) + "." + toDisplayString(paragraph.position) + ". " + toDisplayString(paragraph.title), 1),
                                    createVNode("p", {
                                      innerHTML: paragraph.content_formatted
                                    }, null, 8, ["innerHTML"])
                                  ])
                                ]),
                                _: 2
                              }, 1024);
                            }), 256))
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(`</div>`);
                  });
                  _push3(`<!--]--></div></div></div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "pt-10" }, [
                      createVNode("div", null, [
                        createVNode("div", null, [
                          createVNode("div", null, [
                            createVNode(_sfc_main$2, null, {
                              default: withCtx(() => [
                                createTextVNode("Terms and conditions")
                              ]),
                              _: 1
                            })
                          ])
                        ])
                      ])
                    ]),
                    createVNode("div", null, [
                      createVNode("div", null, [
                        createVNode("div", { class: "block" }, [
                          createVNode("div", null, [
                            (openBlock(true), createBlock(Fragment, null, renderList(props.categories, (category) => {
                              return openBlock(), createBlock("div", null, [
                                createVNode(_sfc_main$3, { gap: "4" }, {
                                  default: withCtx(() => [
                                    createVNode("h2", { class: "text-2xl mt-10" }, toDisplayString(category.position) + ". " + toDisplayString(category.title), 1),
                                    (openBlock(true), createBlock(Fragment, null, renderList(category.paragraphs, (paragraph) => {
                                      return openBlock(), createBlock(_component_v_card, {
                                        color: "grey-lighten-4",
                                        rounded: "lg"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode("div", { class: "p-4" }, [
                                            createVNode("p", { class: "text-lg" }, toDisplayString(category.position) + "." + toDisplayString(paragraph.position) + ". " + toDisplayString(paragraph.title), 1),
                                            createVNode("p", {
                                              innerHTML: paragraph.content_formatted
                                            }, null, 8, ["innerHTML"])
                                          ])
                                        ]),
                                        _: 2
                                      }, 1024);
                                    }), 256))
                                  ]),
                                  _: 2
                                }, 1024)
                              ]);
                            }), 256))
                          ])
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
              createVNode(Wrapper, {
                wrapper: "section",
                maxWidth: "max-w-4xl"
              }, {
                default: withCtx(() => [
                  createVNode("div", { class: "pt-10" }, [
                    createVNode("div", null, [
                      createVNode("div", null, [
                        createVNode("div", null, [
                          createVNode(_sfc_main$2, null, {
                            default: withCtx(() => [
                              createTextVNode("Terms and conditions")
                            ]),
                            _: 1
                          })
                        ])
                      ])
                    ])
                  ]),
                  createVNode("div", null, [
                    createVNode("div", null, [
                      createVNode("div", { class: "block" }, [
                        createVNode("div", null, [
                          (openBlock(true), createBlock(Fragment, null, renderList(props.categories, (category) => {
                            return openBlock(), createBlock("div", null, [
                              createVNode(_sfc_main$3, { gap: "4" }, {
                                default: withCtx(() => [
                                  createVNode("h2", { class: "text-2xl mt-10" }, toDisplayString(category.position) + ". " + toDisplayString(category.title), 1),
                                  (openBlock(true), createBlock(Fragment, null, renderList(category.paragraphs, (paragraph) => {
                                    return openBlock(), createBlock(_component_v_card, {
                                      color: "grey-lighten-4",
                                      rounded: "lg"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode("div", { class: "p-4" }, [
                                          createVNode("p", { class: "text-lg" }, toDisplayString(category.position) + "." + toDisplayString(paragraph.position) + ". " + toDisplayString(paragraph.title), 1),
                                          createVNode("p", {
                                            innerHTML: paragraph.content_formatted
                                          }, null, 8, ["innerHTML"])
                                        ])
                                      ]),
                                      _: 2
                                    }, 1024);
                                  }), 256))
                                ]),
                                _: 2
                              }, 1024)
                            ]);
                          }), 256))
                        ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Terms.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
