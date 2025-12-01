import { ref, resolveComponent, mergeProps, withCtx, createVNode, openBlock, createBlock, Fragment, renderList, toDisplayString, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { T as TeamLayout } from "./SpnW4ICj-2487091673710.js";
import "@inertiajs/vue3";
import "./BW6cC8iL-1677159380657.js";
import "./kZV6a-x4-6055183876791.js";
import "./1tPrXgE0-4581736670159.js";
const _sfc_main = {
  __name: "Home",
  __ssrInlineRender: true,
  props: {
    dates: Object,
    special_products: Object
  },
  setup(__props) {
    const props = __props;
    ref("Dashboard");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_v_card = resolveComponent("v-card");
      _push(ssrRenderComponent(TeamLayout, mergeProps({ title: "Bakery" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex flex-col items-center gap-10 w-full"${_scopeId}><!--[-->`);
            ssrRenderList(props.dates, (items, date) => {
              _push2(`<div class="w-full"${_scopeId}><p class="mb-2 text-2xl font-bold"${_scopeId}>${ssrInterpolate(date)}</p><div class="max-w-7xl flex flex-col gap-3 w-full bg-blue-grey-lighten-3 p-3"${_scopeId}><!--[-->`);
              ssrRenderList(items, (item) => {
                _push2(`<div class="grid grid-cols-1 lg:grid-cols-3 bg-blue-grey-lighten-2 p-3"${_scopeId}><div${_scopeId}><p class="text-black font-normal"${_scopeId}>${ssrInterpolate(item.product_name)}</p></div><div${_scopeId}><p class="text-black font-normal"${_scopeId}>${ssrInterpolate(item.variation_name)}</p></div><div${_scopeId}><p class="text-black font-normal"${_scopeId}>${ssrInterpolate(item.quantity)}</p></div></div>`);
              });
              _push2(`<!--]--></div>`);
              if (date in props.special_products) {
                _push2(`<div${_scopeId}><div class="my-2"${_scopeId}><p class="mb-2 text-red-darken-3 font-bold"${_scopeId}>Amongst the items for ${ssrInterpolate(date)}, the following require a note to be added:</p>`);
                _push2(ssrRenderComponent(_component_v_card, {
                  class: "max-w-7xl",
                  color: "grey-lighten-3"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<div class="p-3 flex flex-col gap-3"${_scopeId2}><!--[-->`);
                      ssrRenderList(props.special_products[date], (item) => {
                        _push3(`<div${_scopeId2}><div class="grid grid-cols-4 gap-0 items-center"${_scopeId2}><div class="col-span-2 lg:col-span-1 h-full"${_scopeId2}><div class="p-2 bg-grey-lighten-1 h-full"${_scopeId2}><p class="font-bold text-grey-darken-2"${_scopeId2}>Order:</p><p class="text-black"${_scopeId2}>${ssrInterpolate(item.number)}</p></div></div><div class="col-span-2 lg:col-span-1 h-full"${_scopeId2}><div class="p-2 bg-grey-lighten-1 h-full"${_scopeId2}><p class="font-bold text-grey-darken-2"${_scopeId2}>Item:</p><p class="text-black"${_scopeId2}>${ssrInterpolate(item.product)} (${ssrInterpolate(item.variation)})</p></div></div><div class="col-span-4 lg:col-span-2 h-full"${_scopeId2}><div class="p-2 bg-grey-lighten-1 h-full"${_scopeId2}><p class="font-bold text-grey-darken-2"${_scopeId2}>Note:</p><p class="text-black"${_scopeId2}>${item.note ?? ""}</p></div></div></div></div>`);
                      });
                      _push3(`<!--]--></div>`);
                    } else {
                      return [
                        createVNode("div", { class: "p-3 flex flex-col gap-3" }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(props.special_products[date], (item) => {
                            return openBlock(), createBlock("div", null, [
                              createVNode("div", { class: "grid grid-cols-4 gap-0 items-center" }, [
                                createVNode("div", { class: "col-span-2 lg:col-span-1 h-full" }, [
                                  createVNode("div", { class: "p-2 bg-grey-lighten-1 h-full" }, [
                                    createVNode("p", { class: "font-bold text-grey-darken-2" }, "Order:"),
                                    createVNode("p", { class: "text-black" }, toDisplayString(item.number), 1)
                                  ])
                                ]),
                                createVNode("div", { class: "col-span-2 lg:col-span-1 h-full" }, [
                                  createVNode("div", { class: "p-2 bg-grey-lighten-1 h-full" }, [
                                    createVNode("p", { class: "font-bold text-grey-darken-2" }, "Item:"),
                                    createVNode("p", { class: "text-black" }, toDisplayString(item.product) + " (" + toDisplayString(item.variation) + ")", 1)
                                  ])
                                ]),
                                createVNode("div", { class: "col-span-4 lg:col-span-2 h-full" }, [
                                  createVNode("div", { class: "p-2 bg-grey-lighten-1 h-full" }, [
                                    createVNode("p", { class: "font-bold text-grey-darken-2" }, "Note:"),
                                    createVNode("p", {
                                      class: "text-black",
                                      innerHTML: item.note
                                    }, null, 8, ["innerHTML"])
                                  ])
                                ])
                              ])
                            ]);
                          }), 256))
                        ])
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(`</div></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            });
            _push2(`<!--]--></div>`);
          } else {
            return [
              createVNode("div", { class: "flex flex-col items-center gap-10 w-full" }, [
                (openBlock(true), createBlock(Fragment, null, renderList(props.dates, (items, date) => {
                  return openBlock(), createBlock("div", { class: "w-full" }, [
                    createVNode("p", { class: "mb-2 text-2xl font-bold" }, toDisplayString(date), 1),
                    createVNode("div", { class: "max-w-7xl flex flex-col gap-3 w-full bg-blue-grey-lighten-3 p-3" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(items, (item) => {
                        return openBlock(), createBlock("div", { class: "grid grid-cols-1 lg:grid-cols-3 bg-blue-grey-lighten-2 p-3" }, [
                          createVNode("div", null, [
                            createVNode("p", { class: "text-black font-normal" }, toDisplayString(item.product_name), 1)
                          ]),
                          createVNode("div", null, [
                            createVNode("p", { class: "text-black font-normal" }, toDisplayString(item.variation_name), 1)
                          ]),
                          createVNode("div", null, [
                            createVNode("p", { class: "text-black font-normal" }, toDisplayString(item.quantity), 1)
                          ])
                        ]);
                      }), 256))
                    ]),
                    date in props.special_products ? (openBlock(), createBlock("div", { key: 0 }, [
                      createVNode("div", { class: "my-2" }, [
                        createVNode("p", { class: "mb-2 text-red-darken-3 font-bold" }, "Amongst the items for " + toDisplayString(date) + ", the following require a note to be added:", 1),
                        createVNode(_component_v_card, {
                          class: "max-w-7xl",
                          color: "grey-lighten-3"
                        }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "p-3 flex flex-col gap-3" }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(props.special_products[date], (item) => {
                                return openBlock(), createBlock("div", null, [
                                  createVNode("div", { class: "grid grid-cols-4 gap-0 items-center" }, [
                                    createVNode("div", { class: "col-span-2 lg:col-span-1 h-full" }, [
                                      createVNode("div", { class: "p-2 bg-grey-lighten-1 h-full" }, [
                                        createVNode("p", { class: "font-bold text-grey-darken-2" }, "Order:"),
                                        createVNode("p", { class: "text-black" }, toDisplayString(item.number), 1)
                                      ])
                                    ]),
                                    createVNode("div", { class: "col-span-2 lg:col-span-1 h-full" }, [
                                      createVNode("div", { class: "p-2 bg-grey-lighten-1 h-full" }, [
                                        createVNode("p", { class: "font-bold text-grey-darken-2" }, "Item:"),
                                        createVNode("p", { class: "text-black" }, toDisplayString(item.product) + " (" + toDisplayString(item.variation) + ")", 1)
                                      ])
                                    ]),
                                    createVNode("div", { class: "col-span-4 lg:col-span-2 h-full" }, [
                                      createVNode("div", { class: "p-2 bg-grey-lighten-1 h-full" }, [
                                        createVNode("p", { class: "font-bold text-grey-darken-2" }, "Note:"),
                                        createVNode("p", {
                                          class: "text-black",
                                          innerHTML: item.note
                                        }, null, 8, ["innerHTML"])
                                      ])
                                    ])
                                  ])
                                ]);
                              }), 256))
                            ])
                          ]),
                          _: 2
                        }, 1024)
                      ])
                    ])) : createCommentVNode("", true)
                  ]);
                }), 256))
              ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Team/Bakery/Home.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
