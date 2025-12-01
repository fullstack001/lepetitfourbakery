import { resolveComponent, unref, withCtx, createVNode, toDisplayString, createTextVNode, openBlock, createBlock, Fragment, renderList, withModifiers, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderStyle } from "vue/server-renderer";
import { A as AppLayout } from "./BQTBzxda-1835617976051.js";
import { Head } from "@inertiajs/vue3";
import { W as Wrapper } from "./CKjt-vIU-6617638167690.js";
import { _ as _sfc_main$1 } from "./koZmu1d6-1739686778130.js";
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
const _sfc_main = /* @__PURE__ */ Object.assign({ layout: AppLayout }, {
  __name: "Home",
  __ssrInlineRender: true,
  props: {
    user: Object,
    orders: Object
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_v_card = resolveComponent("v-card");
      const _component_v_card_item = resolveComponent("v-card-item");
      const _component_v_img = resolveComponent("v-img");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Orders" }, null, _parent));
      _push(ssrRenderComponent(Wrapper, { style: { "margin-top": "150px" } }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex justify-center"${_scopeId}><div class="text-center"${_scopeId}><h1 class="text-6xl brand uppercase"${_scopeId}>Orders</h1></div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex justify-center" }, [
                createVNode("div", { class: "text-center" }, [
                  createVNode("h1", { class: "text-6xl brand uppercase" }, "Orders")
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(Wrapper, { wrapper: "row" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(props.orders.data, (order) => {
              _push2(`<div class="mb-6"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_v_card, {
                onClick: ($event) => _ctx.$inertia.visit(_ctx.route("order", { order: order.uid })),
                rounded: "xl",
                color: `${order.status === "initial" ? "amber-lighten-2" : "grey-lighten-4"}`
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_v_card_item, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<div class="grid grid-cols-1 lg:grid-cols-5 gap-3"${_scopeId3}><div${_scopeId3}><p${_scopeId3}>No: <span class="font-bold uppercase"${_scopeId3}>${ssrInterpolate(order.initial)}${ssrInterpolate(order.number)}</span></p></div><div${_scopeId3}><p class="font-bold"${_scopeId3}>${ssrInterpolate(order.created_at_formatted)}</p></div><div${_scopeId3}><p class="font-bold"${_scopeId3}>$${ssrInterpolate(order.amount)}</p></div><div${_scopeId3}><p${_scopeId3}>Status: <strong${_scopeId3}>${ssrInterpolate(order.status)}</strong></p></div><div${_scopeId3}><p${_scopeId3}>Type: <strong${_scopeId3}>${ssrInterpolate(order.type)}</strong></p></div></div><div class="flex flex-row justify-between"${_scopeId3}></div><div class="flex flex-col gap-3 mt-3"${_scopeId3}><!--[-->`);
                          ssrRenderList(order.items, (item) => {
                            _push4(ssrRenderComponent(_component_v_card, {
                              color: `${order.status === "initial" ? "amber-lighten-4" : "grey-lighten-2"}`,
                              rounded: "lg"
                            }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(ssrRenderComponent(_component_v_card_item, null, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`<div class="flex gap-3 p-1"${_scopeId5}><div class="shrink-0" style="${ssrRenderStyle({ "min-width": "50px" })}"${_scopeId5}>`);
                                        _push6(ssrRenderComponent(_component_v_img, {
                                          "aspect-ratio": "1",
                                          cover: "",
                                          src: item.thumbnail,
                                          class: "border",
                                          rounded: "lg"
                                        }, null, _parent6, _scopeId5));
                                        _push6(`</div><div class="grow"${_scopeId5}><div class="grid grid-cols-1 lg:grid-cols-3 gap-3"${_scopeId5}><div${_scopeId5}><p class="font-bold"${_scopeId5}>${ssrInterpolate(item.product_name)}</p><p${_scopeId5}>${ssrInterpolate(item.variation_name)}</p></div><div${_scopeId5}><p${_scopeId5}>Quantity: ${ssrInterpolate(item.quantity)}</p></div><div${_scopeId5}><p${_scopeId5}>Unit: $${ssrInterpolate(item.amount)}</p></div></div></div></div>`);
                                      } else {
                                        return [
                                          createVNode("div", { class: "flex gap-3 p-1" }, [
                                            createVNode("div", {
                                              class: "shrink-0",
                                              style: { "min-width": "50px" }
                                            }, [
                                              createVNode(_component_v_img, {
                                                "aspect-ratio": "1",
                                                cover: "",
                                                src: item.thumbnail,
                                                class: "border",
                                                rounded: "lg"
                                              }, null, 8, ["src"])
                                            ]),
                                            createVNode("div", { class: "grow" }, [
                                              createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-3 gap-3" }, [
                                                createVNode("div", null, [
                                                  createVNode("p", { class: "font-bold" }, toDisplayString(item.product_name), 1),
                                                  createVNode("p", null, toDisplayString(item.variation_name), 1)
                                                ]),
                                                createVNode("div", null, [
                                                  createVNode("p", null, "Quantity: " + toDisplayString(item.quantity), 1)
                                                ]),
                                                createVNode("div", null, [
                                                  createVNode("p", null, "Unit: $" + toDisplayString(item.amount), 1)
                                                ])
                                              ])
                                            ])
                                          ])
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                } else {
                                  return [
                                    createVNode(_component_v_card_item, null, {
                                      default: withCtx(() => [
                                        createVNode("div", { class: "flex gap-3 p-1" }, [
                                          createVNode("div", {
                                            class: "shrink-0",
                                            style: { "min-width": "50px" }
                                          }, [
                                            createVNode(_component_v_img, {
                                              "aspect-ratio": "1",
                                              cover: "",
                                              src: item.thumbnail,
                                              class: "border",
                                              rounded: "lg"
                                            }, null, 8, ["src"])
                                          ]),
                                          createVNode("div", { class: "grow" }, [
                                            createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-3 gap-3" }, [
                                              createVNode("div", null, [
                                                createVNode("p", { class: "font-bold" }, toDisplayString(item.product_name), 1),
                                                createVNode("p", null, toDisplayString(item.variation_name), 1)
                                              ]),
                                              createVNode("div", null, [
                                                createVNode("p", null, "Quantity: " + toDisplayString(item.quantity), 1)
                                              ]),
                                              createVNode("div", null, [
                                                createVNode("p", null, "Unit: $" + toDisplayString(item.amount), 1)
                                              ])
                                            ])
                                          ])
                                        ])
                                      ]),
                                      _: 2
                                    }, 1024)
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                          });
                          _push4(`<!--]--></div>`);
                        } else {
                          return [
                            createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-5 gap-3" }, [
                              createVNode("div", null, [
                                createVNode("p", null, [
                                  createTextVNode("No: "),
                                  createVNode("span", { class: "font-bold uppercase" }, toDisplayString(order.initial) + toDisplayString(order.number), 1)
                                ])
                              ]),
                              createVNode("div", null, [
                                createVNode("p", { class: "font-bold" }, toDisplayString(order.created_at_formatted), 1)
                              ]),
                              createVNode("div", null, [
                                createVNode("p", { class: "font-bold" }, "$" + toDisplayString(order.amount), 1)
                              ]),
                              createVNode("div", null, [
                                createVNode("p", null, [
                                  createTextVNode("Status: "),
                                  createVNode("strong", null, toDisplayString(order.status), 1)
                                ])
                              ]),
                              createVNode("div", null, [
                                createVNode("p", null, [
                                  createTextVNode("Type: "),
                                  createVNode("strong", null, toDisplayString(order.type), 1)
                                ])
                              ])
                            ]),
                            createVNode("div", { class: "flex flex-row justify-between" }),
                            createVNode("div", { class: "flex flex-col gap-3 mt-3" }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(order.items, (item) => {
                                return openBlock(), createBlock(_component_v_card, {
                                  color: `${order.status === "initial" ? "amber-lighten-4" : "grey-lighten-2"}`,
                                  rounded: "lg"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_v_card_item, null, {
                                      default: withCtx(() => [
                                        createVNode("div", { class: "flex gap-3 p-1" }, [
                                          createVNode("div", {
                                            class: "shrink-0",
                                            style: { "min-width": "50px" }
                                          }, [
                                            createVNode(_component_v_img, {
                                              "aspect-ratio": "1",
                                              cover: "",
                                              src: item.thumbnail,
                                              class: "border",
                                              rounded: "lg"
                                            }, null, 8, ["src"])
                                          ]),
                                          createVNode("div", { class: "grow" }, [
                                            createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-3 gap-3" }, [
                                              createVNode("div", null, [
                                                createVNode("p", { class: "font-bold" }, toDisplayString(item.product_name), 1),
                                                createVNode("p", null, toDisplayString(item.variation_name), 1)
                                              ]),
                                              createVNode("div", null, [
                                                createVNode("p", null, "Quantity: " + toDisplayString(item.quantity), 1)
                                              ]),
                                              createVNode("div", null, [
                                                createVNode("p", null, "Unit: $" + toDisplayString(item.amount), 1)
                                              ])
                                            ])
                                          ])
                                        ])
                                      ]),
                                      _: 2
                                    }, 1024)
                                  ]),
                                  _: 2
                                }, 1032, ["color"]);
                              }), 256))
                            ])
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_v_card_item, null, {
                        default: withCtx(() => [
                          createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-5 gap-3" }, [
                            createVNode("div", null, [
                              createVNode("p", null, [
                                createTextVNode("No: "),
                                createVNode("span", { class: "font-bold uppercase" }, toDisplayString(order.initial) + toDisplayString(order.number), 1)
                              ])
                            ]),
                            createVNode("div", null, [
                              createVNode("p", { class: "font-bold" }, toDisplayString(order.created_at_formatted), 1)
                            ]),
                            createVNode("div", null, [
                              createVNode("p", { class: "font-bold" }, "$" + toDisplayString(order.amount), 1)
                            ]),
                            createVNode("div", null, [
                              createVNode("p", null, [
                                createTextVNode("Status: "),
                                createVNode("strong", null, toDisplayString(order.status), 1)
                              ])
                            ]),
                            createVNode("div", null, [
                              createVNode("p", null, [
                                createTextVNode("Type: "),
                                createVNode("strong", null, toDisplayString(order.type), 1)
                              ])
                            ])
                          ]),
                          createVNode("div", { class: "flex flex-row justify-between" }),
                          createVNode("div", { class: "flex flex-col gap-3 mt-3" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(order.items, (item) => {
                              return openBlock(), createBlock(_component_v_card, {
                                color: `${order.status === "initial" ? "amber-lighten-4" : "grey-lighten-2"}`,
                                rounded: "lg"
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_v_card_item, null, {
                                    default: withCtx(() => [
                                      createVNode("div", { class: "flex gap-3 p-1" }, [
                                        createVNode("div", {
                                          class: "shrink-0",
                                          style: { "min-width": "50px" }
                                        }, [
                                          createVNode(_component_v_img, {
                                            "aspect-ratio": "1",
                                            cover: "",
                                            src: item.thumbnail,
                                            class: "border",
                                            rounded: "lg"
                                          }, null, 8, ["src"])
                                        ]),
                                        createVNode("div", { class: "grow" }, [
                                          createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-3 gap-3" }, [
                                            createVNode("div", null, [
                                              createVNode("p", { class: "font-bold" }, toDisplayString(item.product_name), 1),
                                              createVNode("p", null, toDisplayString(item.variation_name), 1)
                                            ]),
                                            createVNode("div", null, [
                                              createVNode("p", null, "Quantity: " + toDisplayString(item.quantity), 1)
                                            ]),
                                            createVNode("div", null, [
                                              createVNode("p", null, "Unit: $" + toDisplayString(item.amount), 1)
                                            ])
                                          ])
                                        ])
                                      ])
                                    ]),
                                    _: 2
                                  }, 1024)
                                ]),
                                _: 2
                              }, 1032, ["color"]);
                            }), 256))
                          ])
                        ]),
                        _: 2
                      }, 1024)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`</div>`);
            });
            _push2(`<!--]--><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              entities: props.orders
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              (openBlock(true), createBlock(Fragment, null, renderList(props.orders.data, (order) => {
                return openBlock(), createBlock("div", { class: "mb-6" }, [
                  createVNode(_component_v_card, {
                    onClick: withModifiers(($event) => _ctx.$inertia.visit(_ctx.route("order", { order: order.uid })), ["prevent"]),
                    rounded: "xl",
                    color: `${order.status === "initial" ? "amber-lighten-2" : "grey-lighten-4"}`
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_v_card_item, null, {
                        default: withCtx(() => [
                          createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-5 gap-3" }, [
                            createVNode("div", null, [
                              createVNode("p", null, [
                                createTextVNode("No: "),
                                createVNode("span", { class: "font-bold uppercase" }, toDisplayString(order.initial) + toDisplayString(order.number), 1)
                              ])
                            ]),
                            createVNode("div", null, [
                              createVNode("p", { class: "font-bold" }, toDisplayString(order.created_at_formatted), 1)
                            ]),
                            createVNode("div", null, [
                              createVNode("p", { class: "font-bold" }, "$" + toDisplayString(order.amount), 1)
                            ]),
                            createVNode("div", null, [
                              createVNode("p", null, [
                                createTextVNode("Status: "),
                                createVNode("strong", null, toDisplayString(order.status), 1)
                              ])
                            ]),
                            createVNode("div", null, [
                              createVNode("p", null, [
                                createTextVNode("Type: "),
                                createVNode("strong", null, toDisplayString(order.type), 1)
                              ])
                            ])
                          ]),
                          createVNode("div", { class: "flex flex-row justify-between" }),
                          createVNode("div", { class: "flex flex-col gap-3 mt-3" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(order.items, (item) => {
                              return openBlock(), createBlock(_component_v_card, {
                                color: `${order.status === "initial" ? "amber-lighten-4" : "grey-lighten-2"}`,
                                rounded: "lg"
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_v_card_item, null, {
                                    default: withCtx(() => [
                                      createVNode("div", { class: "flex gap-3 p-1" }, [
                                        createVNode("div", {
                                          class: "shrink-0",
                                          style: { "min-width": "50px" }
                                        }, [
                                          createVNode(_component_v_img, {
                                            "aspect-ratio": "1",
                                            cover: "",
                                            src: item.thumbnail,
                                            class: "border",
                                            rounded: "lg"
                                          }, null, 8, ["src"])
                                        ]),
                                        createVNode("div", { class: "grow" }, [
                                          createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-3 gap-3" }, [
                                            createVNode("div", null, [
                                              createVNode("p", { class: "font-bold" }, toDisplayString(item.product_name), 1),
                                              createVNode("p", null, toDisplayString(item.variation_name), 1)
                                            ]),
                                            createVNode("div", null, [
                                              createVNode("p", null, "Quantity: " + toDisplayString(item.quantity), 1)
                                            ]),
                                            createVNode("div", null, [
                                              createVNode("p", null, "Unit: $" + toDisplayString(item.amount), 1)
                                            ])
                                          ])
                                        ])
                                      ])
                                    ]),
                                    _: 2
                                  }, 1024)
                                ]),
                                _: 2
                              }, 1032, ["color"]);
                            }), 256))
                          ])
                        ]),
                        _: 2
                      }, 1024)
                    ]),
                    _: 2
                  }, 1032, ["onClick", "color"])
                ]);
              }), 256)),
              createVNode("div", null, [
                createVNode(_sfc_main$1, {
                  entities: props.orders
                }, null, 8, ["entities"])
              ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Orders/Home.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
