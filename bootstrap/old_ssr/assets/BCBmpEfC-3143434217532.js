import { resolveComponent, withCtx, createVNode, toDisplayString, openBlock, createBlock, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { _ as _sfc_main$1, a as _sfc_main$2 } from "./Cyl_ukyB-3352317127354.js";
const _sfc_main = {
  __name: "DeliveryOrderItems",
  __ssrInlineRender: true,
  props: {
    order: Object,
    title: String
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_v_card = resolveComponent("v-card");
      const _component_v_img = resolveComponent("v-img");
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$1, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p class="text-base font-bold"${_scopeId2}>${ssrInterpolate(props.title)}</p>`);
                } else {
                  return [
                    createVNode("p", { class: "text-base font-bold" }, toDisplayString(props.title), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1, { gap: "2" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(props.order.items, (item) => {
                    _push3(ssrRenderComponent(_component_v_card, {
                      color: "grey-lighten-3",
                      rounded: "lg"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<div class="p-4"${_scopeId3}>`);
                          _push4(ssrRenderComponent(_sfc_main$2, {
                            center: true,
                            justify: "start"
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<div class="shrink-0 w-[50px]"${_scopeId4}>`);
                                _push5(ssrRenderComponent(_component_v_img, {
                                  "aspect-ratio": "1",
                                  color: "grey",
                                  src: item.thumbnail,
                                  cover: "",
                                  class: "rounded-circle"
                                }, null, _parent5, _scopeId4));
                                _push5(`</div><div class="grow"${_scopeId4}>`);
                                _push5(ssrRenderComponent(_sfc_main$2, {
                                  center: true,
                                  justify: "between"
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`<div${_scopeId5}><p class="font-bold"${_scopeId5}>${ssrInterpolate(item.product_name)}</p><p${_scopeId5}>${ssrInterpolate(item.variation_name)}</p></div><div${_scopeId5}><p class="text-2xl"${_scopeId5}>x${ssrInterpolate(item.quantity)}</p></div>`);
                                    } else {
                                      return [
                                        createVNode("div", null, [
                                          createVNode("p", { class: "font-bold" }, toDisplayString(item.product_name), 1),
                                          createVNode("p", null, toDisplayString(item.variation_name), 1)
                                        ]),
                                        createVNode("div", null, [
                                          createVNode("p", { class: "text-2xl" }, "x" + toDisplayString(item.quantity), 1)
                                        ])
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                                _push5(`</div>`);
                              } else {
                                return [
                                  createVNode("div", { class: "shrink-0 w-[50px]" }, [
                                    createVNode(_component_v_img, {
                                      "aspect-ratio": "1",
                                      color: "grey",
                                      src: item.thumbnail,
                                      cover: "",
                                      class: "rounded-circle"
                                    }, null, 8, ["src"])
                                  ]),
                                  createVNode("div", { class: "grow" }, [
                                    createVNode(_sfc_main$2, {
                                      center: true,
                                      justify: "between"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode("div", null, [
                                          createVNode("p", { class: "font-bold" }, toDisplayString(item.product_name), 1),
                                          createVNode("p", null, toDisplayString(item.variation_name), 1)
                                        ]),
                                        createVNode("div", null, [
                                          createVNode("p", { class: "text-2xl" }, "x" + toDisplayString(item.quantity), 1)
                                        ])
                                      ]),
                                      _: 2
                                    }, 1024)
                                  ])
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                          _push4(`</div>`);
                        } else {
                          return [
                            createVNode("div", { class: "p-4" }, [
                              createVNode(_sfc_main$2, {
                                center: true,
                                justify: "start"
                              }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "shrink-0 w-[50px]" }, [
                                    createVNode(_component_v_img, {
                                      "aspect-ratio": "1",
                                      color: "grey",
                                      src: item.thumbnail,
                                      cover: "",
                                      class: "rounded-circle"
                                    }, null, 8, ["src"])
                                  ]),
                                  createVNode("div", { class: "grow" }, [
                                    createVNode(_sfc_main$2, {
                                      center: true,
                                      justify: "between"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode("div", null, [
                                          createVNode("p", { class: "font-bold" }, toDisplayString(item.product_name), 1),
                                          createVNode("p", null, toDisplayString(item.variation_name), 1)
                                        ]),
                                        createVNode("div", null, [
                                          createVNode("p", { class: "text-2xl" }, "x" + toDisplayString(item.quantity), 1)
                                        ])
                                      ]),
                                      _: 2
                                    }, 1024)
                                  ])
                                ]),
                                _: 2
                              }, 1024)
                            ])
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(true), createBlock(Fragment, null, renderList(props.order.items, (item) => {
                      return openBlock(), createBlock(_component_v_card, {
                        color: "grey-lighten-3",
                        rounded: "lg"
                      }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "p-4" }, [
                            createVNode(_sfc_main$2, {
                              center: true,
                              justify: "start"
                            }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "shrink-0 w-[50px]" }, [
                                  createVNode(_component_v_img, {
                                    "aspect-ratio": "1",
                                    color: "grey",
                                    src: item.thumbnail,
                                    cover: "",
                                    class: "rounded-circle"
                                  }, null, 8, ["src"])
                                ]),
                                createVNode("div", { class: "grow" }, [
                                  createVNode(_sfc_main$2, {
                                    center: true,
                                    justify: "between"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode("div", null, [
                                        createVNode("p", { class: "font-bold" }, toDisplayString(item.product_name), 1),
                                        createVNode("p", null, toDisplayString(item.variation_name), 1)
                                      ]),
                                      createVNode("div", null, [
                                        createVNode("p", { class: "text-2xl" }, "x" + toDisplayString(item.quantity), 1)
                                      ])
                                    ]),
                                    _: 2
                                  }, 1024)
                                ])
                              ]),
                              _: 2
                            }, 1024)
                          ])
                        ]),
                        _: 2
                      }, 1024);
                    }), 256))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$1, null, {
                default: withCtx(() => [
                  createVNode("p", { class: "text-base font-bold" }, toDisplayString(props.title), 1)
                ]),
                _: 1
              }),
              createVNode(_sfc_main$1, { gap: "2" }, {
                default: withCtx(() => [
                  (openBlock(true), createBlock(Fragment, null, renderList(props.order.items, (item) => {
                    return openBlock(), createBlock(_component_v_card, {
                      color: "grey-lighten-3",
                      rounded: "lg"
                    }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "p-4" }, [
                          createVNode(_sfc_main$2, {
                            center: true,
                            justify: "start"
                          }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "shrink-0 w-[50px]" }, [
                                createVNode(_component_v_img, {
                                  "aspect-ratio": "1",
                                  color: "grey",
                                  src: item.thumbnail,
                                  cover: "",
                                  class: "rounded-circle"
                                }, null, 8, ["src"])
                              ]),
                              createVNode("div", { class: "grow" }, [
                                createVNode(_sfc_main$2, {
                                  center: true,
                                  justify: "between"
                                }, {
                                  default: withCtx(() => [
                                    createVNode("div", null, [
                                      createVNode("p", { class: "font-bold" }, toDisplayString(item.product_name), 1),
                                      createVNode("p", null, toDisplayString(item.variation_name), 1)
                                    ]),
                                    createVNode("div", null, [
                                      createVNode("p", { class: "text-2xl" }, "x" + toDisplayString(item.quantity), 1)
                                    ])
                                  ]),
                                  _: 2
                                }, 1024)
                              ])
                            ]),
                            _: 2
                          }, 1024)
                        ])
                      ]),
                      _: 2
                    }, 1024);
                  }), 256))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Subscriptions/DeliveryOrderItems.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
