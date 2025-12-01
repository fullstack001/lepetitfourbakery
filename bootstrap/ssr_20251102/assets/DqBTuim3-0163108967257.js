import { useSSRContext, resolveComponent, unref, withCtx, createTextVNode, createVNode, openBlock, createBlock, withModifiers } from "vue";
import { ssrRenderAttrs, ssrRenderSlot, ssrRenderComponent } from "vue/server-renderer";
import { A as AppLayout } from "./BQTBzxda-1835617976051.js";
import { Head } from "@inertiajs/vue3";
import { _ as _sfc_main$2 } from "./CznY329j-6813667791076.js";
import { W as Wrapper } from "./CKjt-vIU-6617638167690.js";
import { _ as _export_sfc } from "./1tPrXgE0-4581736670159.js";
import "./BW6cC8iL-1677159380657.js";
import "./kZV6a-x4-6055183876791.js";
import "vuetify";
import "./DKEAH6nn-8515365770691.js";
import "mitt";
import "gsap";
import "gsap/ScrollTrigger.js";
import "gsap/ScrollSmoother.js";
import "./BPBs_0V9-9736651018597.js";
import "./C6q4kDV--1536774619085.js";
import "./DsvTyKEu-3067955167518.js";
import "./CeVcRmCk-1577655618930.js";
import "./Cyl_ukyB-5873697610160.js";
const _sfc_main$1 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 class="text-6xl brand uppercase">`);
  ssrRenderSlot(_ctx.$slots, "title", {}, null, _push, _parent);
  _push(`</h1><p class="mt-3">`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</p></div>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/ErrorMessage.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const ErrorMessage = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main = /* @__PURE__ */ Object.assign({ layout: AppLayout }, {
  __name: "Error",
  __ssrInlineRender: true,
  props: {
    status: { type: [String, Number], default: null },
    message: String
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_v_btn = resolveComponent("v-btn");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: __props.status + " " + __props.message
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$2, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(Wrapper, {
              wrapper: "section",
              background: "#1f1f1f"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex items-center justify-center text-white py-20"${_scopeId2}><div class="text-center py-20"${_scopeId2}><div${_scopeId2}>`);
                  if (__props.status === 404) {
                    _push3(`<div${_scopeId2}>`);
                    _push3(ssrRenderComponent(ErrorMessage, null, {
                      title: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`You appear to be lost`);
                        } else {
                          return [
                            createTextVNode("You appear to be lost")
                          ];
                        }
                      }),
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(` The page you are looking for doesn&#39;t exist. `);
                        } else {
                          return [
                            createTextVNode(" The page you are looking for doesn't exist. ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`</div>`);
                  } else if (__props.status === 401) {
                    _push3(`<div${_scopeId2}>`);
                    _push3(ssrRenderComponent(ErrorMessage, null, {
                      title: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Unauthorized`);
                        } else {
                          return [
                            createTextVNode("Unauthorized")
                          ];
                        }
                      }),
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(` Sorry, you are not allowed to visit this page. `);
                        } else {
                          return [
                            createTextVNode(" Sorry, you are not allowed to visit this page. ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`</div>`);
                  } else if (__props.status === 403) {
                    _push3(`<div${_scopeId2}>`);
                    _push3(ssrRenderComponent(ErrorMessage, null, {
                      title: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Forbidden`);
                        } else {
                          return [
                            createTextVNode("Forbidden")
                          ];
                        }
                      }),
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(` Sorry, you can&#39;t visit this page. `);
                        } else {
                          return [
                            createTextVNode(" Sorry, you can't visit this page. ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`</div>`);
                  } else if (__props.status === 419) {
                    _push3(`<div${_scopeId2}>`);
                    _push3(ssrRenderComponent(ErrorMessage, null, {
                      title: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Page Expired`);
                        } else {
                          return [
                            createTextVNode("Page Expired")
                          ];
                        }
                      }),
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(` Please refresh the page and try again. `);
                        } else {
                          return [
                            createTextVNode(" Please refresh the page and try again. ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`</div>`);
                  } else if (__props.status === 429) {
                    _push3(`<div${_scopeId2}>`);
                    _push3(ssrRenderComponent(ErrorMessage, null, {
                      title: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Too Many Requests`);
                        } else {
                          return [
                            createTextVNode("Too Many Requests")
                          ];
                        }
                      }),
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(` Don&#39;t hesitate to contact us if you need assistance. `);
                        } else {
                          return [
                            createTextVNode(" Don't hesitate to contact us if you need assistance. ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`</div>`);
                  } else if (__props.status === 503) {
                    _push3(`<div${_scopeId2}>`);
                    _push3(ssrRenderComponent(ErrorMessage, null, {
                      title: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Service Unavailable`);
                        } else {
                          return [
                            createTextVNode("Service Unavailable")
                          ];
                        }
                      }),
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(` Don&#39;t hesitate to contact us if you need assistance. `);
                        } else {
                          return [
                            createTextVNode(" Don't hesitate to contact us if you need assistance. ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`</div>`);
                  } else {
                    _push3(`<div${_scopeId2}>`);
                    _push3(ssrRenderComponent(ErrorMessage, null, {
                      title: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`An unknown error occurred.`);
                        } else {
                          return [
                            createTextVNode("An unknown error occurred.")
                          ];
                        }
                      }),
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(` Don&#39;t hesitate to contact us if you need assistance. `);
                        } else {
                          return [
                            createTextVNode(" Don't hesitate to contact us if you need assistance. ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`</div>`);
                  }
                  _push3(`</div><div class="mt-10"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_v_btn, {
                    onClick: ($event) => _ctx.$inertia.visit(_ctx.route("home")),
                    variant: "flat",
                    color: "white"
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
                    createVNode("div", { class: "flex items-center justify-center text-white py-20" }, [
                      createVNode("div", { class: "text-center py-20" }, [
                        createVNode("div", null, [
                          __props.status === 404 ? (openBlock(), createBlock("div", { key: 0 }, [
                            createVNode(ErrorMessage, null, {
                              title: withCtx(() => [
                                createTextVNode("You appear to be lost")
                              ]),
                              default: withCtx(() => [
                                createTextVNode(" The page you are looking for doesn't exist. ")
                              ]),
                              _: 1
                            })
                          ])) : __props.status === 401 ? (openBlock(), createBlock("div", { key: 1 }, [
                            createVNode(ErrorMessage, null, {
                              title: withCtx(() => [
                                createTextVNode("Unauthorized")
                              ]),
                              default: withCtx(() => [
                                createTextVNode(" Sorry, you are not allowed to visit this page. ")
                              ]),
                              _: 1
                            })
                          ])) : __props.status === 403 ? (openBlock(), createBlock("div", { key: 2 }, [
                            createVNode(ErrorMessage, null, {
                              title: withCtx(() => [
                                createTextVNode("Forbidden")
                              ]),
                              default: withCtx(() => [
                                createTextVNode(" Sorry, you can't visit this page. ")
                              ]),
                              _: 1
                            })
                          ])) : __props.status === 419 ? (openBlock(), createBlock("div", { key: 3 }, [
                            createVNode(ErrorMessage, null, {
                              title: withCtx(() => [
                                createTextVNode("Page Expired")
                              ]),
                              default: withCtx(() => [
                                createTextVNode(" Please refresh the page and try again. ")
                              ]),
                              _: 1
                            })
                          ])) : __props.status === 429 ? (openBlock(), createBlock("div", { key: 4 }, [
                            createVNode(ErrorMessage, null, {
                              title: withCtx(() => [
                                createTextVNode("Too Many Requests")
                              ]),
                              default: withCtx(() => [
                                createTextVNode(" Don't hesitate to contact us if you need assistance. ")
                              ]),
                              _: 1
                            })
                          ])) : __props.status === 503 ? (openBlock(), createBlock("div", { key: 5 }, [
                            createVNode(ErrorMessage, null, {
                              title: withCtx(() => [
                                createTextVNode("Service Unavailable")
                              ]),
                              default: withCtx(() => [
                                createTextVNode(" Don't hesitate to contact us if you need assistance. ")
                              ]),
                              _: 1
                            })
                          ])) : (openBlock(), createBlock("div", { key: 6 }, [
                            createVNode(ErrorMessage, null, {
                              title: withCtx(() => [
                                createTextVNode("An unknown error occurred.")
                              ]),
                              default: withCtx(() => [
                                createTextVNode(" Don't hesitate to contact us if you need assistance. ")
                              ]),
                              _: 1
                            })
                          ]))
                        ]),
                        createVNode("div", { class: "mt-10" }, [
                          createVNode(_component_v_btn, {
                            onClick: withModifiers(($event) => _ctx.$inertia.visit(_ctx.route("home")), ["prevent"]),
                            variant: "flat",
                            color: "white"
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
              createVNode(Wrapper, {
                wrapper: "section",
                background: "#1f1f1f"
              }, {
                default: withCtx(() => [
                  createVNode("div", { class: "flex items-center justify-center text-white py-20" }, [
                    createVNode("div", { class: "text-center py-20" }, [
                      createVNode("div", null, [
                        __props.status === 404 ? (openBlock(), createBlock("div", { key: 0 }, [
                          createVNode(ErrorMessage, null, {
                            title: withCtx(() => [
                              createTextVNode("You appear to be lost")
                            ]),
                            default: withCtx(() => [
                              createTextVNode(" The page you are looking for doesn't exist. ")
                            ]),
                            _: 1
                          })
                        ])) : __props.status === 401 ? (openBlock(), createBlock("div", { key: 1 }, [
                          createVNode(ErrorMessage, null, {
                            title: withCtx(() => [
                              createTextVNode("Unauthorized")
                            ]),
                            default: withCtx(() => [
                              createTextVNode(" Sorry, you are not allowed to visit this page. ")
                            ]),
                            _: 1
                          })
                        ])) : __props.status === 403 ? (openBlock(), createBlock("div", { key: 2 }, [
                          createVNode(ErrorMessage, null, {
                            title: withCtx(() => [
                              createTextVNode("Forbidden")
                            ]),
                            default: withCtx(() => [
                              createTextVNode(" Sorry, you can't visit this page. ")
                            ]),
                            _: 1
                          })
                        ])) : __props.status === 419 ? (openBlock(), createBlock("div", { key: 3 }, [
                          createVNode(ErrorMessage, null, {
                            title: withCtx(() => [
                              createTextVNode("Page Expired")
                            ]),
                            default: withCtx(() => [
                              createTextVNode(" Please refresh the page and try again. ")
                            ]),
                            _: 1
                          })
                        ])) : __props.status === 429 ? (openBlock(), createBlock("div", { key: 4 }, [
                          createVNode(ErrorMessage, null, {
                            title: withCtx(() => [
                              createTextVNode("Too Many Requests")
                            ]),
                            default: withCtx(() => [
                              createTextVNode(" Don't hesitate to contact us if you need assistance. ")
                            ]),
                            _: 1
                          })
                        ])) : __props.status === 503 ? (openBlock(), createBlock("div", { key: 5 }, [
                          createVNode(ErrorMessage, null, {
                            title: withCtx(() => [
                              createTextVNode("Service Unavailable")
                            ]),
                            default: withCtx(() => [
                              createTextVNode(" Don't hesitate to contact us if you need assistance. ")
                            ]),
                            _: 1
                          })
                        ])) : (openBlock(), createBlock("div", { key: 6 }, [
                          createVNode(ErrorMessage, null, {
                            title: withCtx(() => [
                              createTextVNode("An unknown error occurred.")
                            ]),
                            default: withCtx(() => [
                              createTextVNode(" Don't hesitate to contact us if you need assistance. ")
                            ]),
                            _: 1
                          })
                        ]))
                      ]),
                      createVNode("div", { class: "mt-10" }, [
                        createVNode(_component_v_btn, {
                          onClick: withModifiers(($event) => _ctx.$inertia.visit(_ctx.route("home")), ["prevent"]),
                          variant: "flat",
                          color: "white"
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Error.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
