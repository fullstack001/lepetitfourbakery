import { ref, onMounted, nextTick, watch, resolveComponent, mergeProps, withCtx, createTextVNode, toDisplayString, createVNode, withModifiers, openBlock, createBlock, Fragment, createCommentVNode, unref, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { A as AdmLayout } from "./Bmk57_E8-5341323707321.js";
import { useForm } from "@inertiajs/vue3";
import { a as _sfc_main$1, _ as _sfc_main$2 } from "./Cyl_ukyB-3352317127354.js";
import draggable from "vuedraggable";
import { _ as _export_sfc } from "./1tPrXgE0-1751246333532.js";
import "./BW6cC8iL-1754723312335.js";
import "./kZV6a-x4-2437327355113.js";
const _sfc_main = {
  __name: "Products",
  __ssrInlineRender: true,
  props: {
    category: Object,
    products: Object,
    selected_products: Object,
    product_uids: Object
  },
  setup(__props) {
    const props = __props;
    const selectedProducts = ref([]);
    const form = useForm({
      selected: {}
    });
    const mode = ref("reorder");
    const savingOrder = ref(false);
    const notifyOrderChanged = () => {
      form.selected = selectedProducts.value.map((p) => p.uid);
    };
    const initLists = () => {
      form.selected = props.product_uids;
      selectedProducts.value = Object.values(form.selected ?? {}).map(
        (uid) => props.products.find((p) => p.uid === uid)
      ).filter(Boolean);
      displayProducts.value = true;
    };
    const toggleMode = () => {
      mode.value = mode.value === "reorder" ? "select" : "reorder";
    };
    const display = (uid) => {
      if (mode.value === "select") return true;
      const selected = form.selected;
      return selected.length && selected.includes(uid);
    };
    const saveProducts = () => {
      form.post(route("admin.events_menu.products.save", { category: props.category.uid }), {
        onSuccess: () => {
          form.reset();
          initLists();
        }
      });
    };
    const displayProducts = ref(false);
    onMounted(() => {
      nextTick(() => {
        initLists();
      });
    });
    watch(
      () => form.selected,
      (newSelected) => {
        const selectedUids = Object.values(newSelected ?? {});
        const allProducts = props.products;
        const currentUids = selectedProducts.value.map((p) => p.uid);
        const newProducts = [];
        selectedUids.forEach((uid) => {
          if (!currentUids.includes(uid)) {
            const product = allProducts.find((p) => p.uid === uid);
            if (product) newProducts.push(product);
          }
        });
        selectedProducts.value = selectedProducts.value.filter((p) => selectedUids.includes(p.uid)).concat(newProducts);
      },
      { immediate: true }
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_v_btn = resolveComponent("v-btn");
      const _component_v_card = resolveComponent("v-card");
      const _component_v_checkbox = resolveComponent("v-checkbox");
      const _component_v_icon = resolveComponent("v-icon");
      _push(ssrRenderComponent(AdmLayout, mergeProps({ title: "Events menu products" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (mode.value === "select") {
              _push2(`<div class="fixed bottom-10 end-10 z-50" data-v-a123d988${_scopeId}>`);
              _push2(ssrRenderComponent(_component_v_btn, {
                color: "amber",
                size: "large",
                "prepend-icon": "mdi-check-circle",
                onClick: toggleMode
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`Done`);
                  } else {
                    return [
                      createTextVNode("Done")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<p class="text-4xl mb-7" data-v-a123d988${_scopeId}>Category: <strong data-v-a123d988${_scopeId}>${ssrInterpolate(props.category.name)}</strong></p>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              center: true,
              justify: "between"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_sfc_main$1, {
                    center: true,
                    justify: "start"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div data-v-a123d988${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_v_btn, { onClick: toggleMode }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`${ssrInterpolate(`${mode.value === "select" ? "Done" : "Select"}`)}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(`${mode.value === "select" ? "Done" : "Select"}`), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</div>`);
                        if (mode.value === "reorder") {
                          _push4(`<!--[--><div data-v-a123d988${_scopeId3}>`);
                          _push4(ssrRenderComponent(_component_v_btn, {
                            onClick: saveProducts,
                            color: "green"
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`Save products`);
                              } else {
                                return [
                                  createTextVNode("Save products")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(`</div><p data-v-a123d988${_scopeId3}>You can reorder the products below.</p><!--]-->`);
                        } else {
                          _push4(`<!---->`);
                        }
                      } else {
                        return [
                          createVNode("div", null, [
                            createVNode(_component_v_btn, {
                              onClick: withModifiers(toggleMode, ["prevent"])
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(`${mode.value === "select" ? "Done" : "Select"}`), 1)
                              ]),
                              _: 1
                            })
                          ]),
                          mode.value === "reorder" ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                            createVNode("div", null, [
                              createVNode(_component_v_btn, {
                                onClick: withModifiers(saveProducts, ["prevent"]),
                                color: "green"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("Save products")
                                ]),
                                _: 1
                              })
                            ]),
                            createVNode("p", null, "You can reorder the products below.")
                          ], 64)) : createCommentVNode("", true)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div data-v-a123d988${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_v_btn, {
                    variant: "outlined",
                    onClick: ($event) => _ctx.$inertia.visit(_ctx.route("admin.events_menu"))
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Close`);
                      } else {
                        return [
                          createTextVNode("Close")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode(_sfc_main$1, {
                      center: true,
                      justify: "start"
                    }, {
                      default: withCtx(() => [
                        createVNode("div", null, [
                          createVNode(_component_v_btn, {
                            onClick: withModifiers(toggleMode, ["prevent"])
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(`${mode.value === "select" ? "Done" : "Select"}`), 1)
                            ]),
                            _: 1
                          })
                        ]),
                        mode.value === "reorder" ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                          createVNode("div", null, [
                            createVNode(_component_v_btn, {
                              onClick: withModifiers(saveProducts, ["prevent"]),
                              color: "green"
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Save products")
                              ]),
                              _: 1
                            })
                          ]),
                          createVNode("p", null, "You can reorder the products below.")
                        ], 64)) : createCommentVNode("", true)
                      ]),
                      _: 1
                    }),
                    createVNode("div", null, [
                      createVNode(_component_v_btn, {
                        variant: "outlined",
                        onClick: withModifiers(($event) => _ctx.$inertia.visit(_ctx.route("admin.events_menu")), ["prevent"])
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Close")
                        ]),
                        _: 1
                      }, 8, ["onClick"])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            if (unref(form).selected) {
              _push2(ssrRenderComponent(_sfc_main$2, {
                gap: "4",
                class: "my-3"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    if (mode.value === "select") {
                      _push3(`<!--[-->`);
                      ssrRenderList(props.products, (product) => {
                        _push3(`<!--[-->`);
                        if (display(product.uid)) {
                          _push3(ssrRenderComponent(_component_v_card, {
                            color: "grey-lighten-3",
                            rounded: "lg"
                          }, {
                            default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                              if (_push4) {
                                _push4(`<div class="p-2" data-v-a123d988${_scopeId3}><div class="flex flex-row items-center gap-4" data-v-a123d988${_scopeId3}><div class="shrink-0" data-v-a123d988${_scopeId3}>`);
                                _push4(ssrRenderComponent(_component_v_checkbox, {
                                  modelValue: unref(form).selected,
                                  "onUpdate:modelValue": ($event) => unref(form).selected = $event,
                                  value: product.uid,
                                  density: "compact",
                                  "hide-details": ""
                                }, null, _parent4, _scopeId3));
                                _push4(`</div><div class="grow" data-v-a123d988${_scopeId3}><p data-v-a123d988${_scopeId3}>${ssrInterpolate(product.name)}</p></div></div></div>`);
                              } else {
                                return [
                                  createVNode("div", { class: "p-2" }, [
                                    createVNode("div", { class: "flex flex-row items-center gap-4" }, [
                                      createVNode("div", { class: "shrink-0" }, [
                                        createVNode(_component_v_checkbox, {
                                          modelValue: unref(form).selected,
                                          "onUpdate:modelValue": ($event) => unref(form).selected = $event,
                                          value: product.uid,
                                          density: "compact",
                                          "hide-details": ""
                                        }, null, 8, ["modelValue", "onUpdate:modelValue", "value"])
                                      ]),
                                      createVNode("div", { class: "grow" }, [
                                        createVNode("p", null, toDisplayString(product.name), 1)
                                      ])
                                    ])
                                  ])
                                ];
                              }
                            }),
                            _: 2
                          }, _parent3, _scopeId2));
                        } else {
                          _push3(`<!---->`);
                        }
                        _push3(`<!--]-->`);
                      });
                      _push3(`<!--]-->`);
                    } else if (displayProducts.value && mode.value === "reorder") {
                      _push3(ssrRenderComponent(unref(draggable), {
                        list: selectedProducts.value,
                        sort: true,
                        "item-key": "uid",
                        disabled: savingOrder.value,
                        onEnd: notifyOrderChanged,
                        "ghost-class": "ghost-landing",
                        "drag-class": "ghost-dragging"
                      }, {
                        item: withCtx(({ element }, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            if (display(element.uid)) {
                              _push4(ssrRenderComponent(_component_v_card, {
                                color: "grey-lighten-3 my-2",
                                rounded: "lg"
                              }, {
                                default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                                  if (_push5) {
                                    _push5(`<div class="p-2" data-v-a123d988${_scopeId4}><div class="flex flex-row items-center gap-4" data-v-a123d988${_scopeId4}><div class="shrink-0" data-v-a123d988${_scopeId4}>`);
                                    _push5(ssrRenderComponent(_component_v_icon, null, {
                                      default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                        if (_push6) {
                                          _push6(`mdi-drag`);
                                        } else {
                                          return [
                                            createTextVNode("mdi-drag")
                                          ];
                                        }
                                      }),
                                      _: 2
                                    }, _parent5, _scopeId4));
                                    _push5(`</div><div class="grow" data-v-a123d988${_scopeId4}><p data-v-a123d988${_scopeId4}>${ssrInterpolate(element.name)}</p></div></div></div>`);
                                  } else {
                                    return [
                                      createVNode("div", { class: "p-2" }, [
                                        createVNode("div", { class: "flex flex-row items-center gap-4" }, [
                                          createVNode("div", { class: "shrink-0" }, [
                                            createVNode(_component_v_icon, null, {
                                              default: withCtx(() => [
                                                createTextVNode("mdi-drag")
                                              ]),
                                              _: 1
                                            })
                                          ]),
                                          createVNode("div", { class: "grow" }, [
                                            createVNode("p", null, toDisplayString(element.name), 1)
                                          ])
                                        ])
                                      ])
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent4, _scopeId3));
                            } else {
                              _push4(`<!---->`);
                            }
                          } else {
                            return [
                              display(element.uid) ? (openBlock(), createBlock(_component_v_card, {
                                key: 0,
                                color: "grey-lighten-3 my-2",
                                rounded: "lg"
                              }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "p-2" }, [
                                    createVNode("div", { class: "flex flex-row items-center gap-4" }, [
                                      createVNode("div", { class: "shrink-0" }, [
                                        createVNode(_component_v_icon, null, {
                                          default: withCtx(() => [
                                            createTextVNode("mdi-drag")
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      createVNode("div", { class: "grow" }, [
                                        createVNode("p", null, toDisplayString(element.name), 1)
                                      ])
                                    ])
                                  ])
                                ]),
                                _: 2
                              }, 1024)) : createCommentVNode("", true)
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                    } else {
                      _push3(`<!---->`);
                    }
                  } else {
                    return [
                      mode.value === "select" ? (openBlock(true), createBlock(Fragment, { key: 0 }, renderList(props.products, (product) => {
                        return openBlock(), createBlock(Fragment, null, [
                          display(product.uid) ? (openBlock(), createBlock(_component_v_card, {
                            key: 0,
                            color: "grey-lighten-3",
                            rounded: "lg"
                          }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "p-2" }, [
                                createVNode("div", { class: "flex flex-row items-center gap-4" }, [
                                  createVNode("div", { class: "shrink-0" }, [
                                    createVNode(_component_v_checkbox, {
                                      modelValue: unref(form).selected,
                                      "onUpdate:modelValue": ($event) => unref(form).selected = $event,
                                      value: product.uid,
                                      density: "compact",
                                      "hide-details": ""
                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "value"])
                                  ]),
                                  createVNode("div", { class: "grow" }, [
                                    createVNode("p", null, toDisplayString(product.name), 1)
                                  ])
                                ])
                              ])
                            ]),
                            _: 2
                          }, 1024)) : createCommentVNode("", true)
                        ], 64);
                      }), 256)) : displayProducts.value && mode.value === "reorder" ? (openBlock(), createBlock(unref(draggable), {
                        key: 1,
                        list: selectedProducts.value,
                        sort: true,
                        "item-key": "uid",
                        disabled: savingOrder.value,
                        onEnd: notifyOrderChanged,
                        "ghost-class": "ghost-landing",
                        "drag-class": "ghost-dragging"
                      }, {
                        item: withCtx(({ element }) => [
                          display(element.uid) ? (openBlock(), createBlock(_component_v_card, {
                            key: 0,
                            color: "grey-lighten-3 my-2",
                            rounded: "lg"
                          }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "p-2" }, [
                                createVNode("div", { class: "flex flex-row items-center gap-4" }, [
                                  createVNode("div", { class: "shrink-0" }, [
                                    createVNode(_component_v_icon, null, {
                                      default: withCtx(() => [
                                        createTextVNode("mdi-drag")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  createVNode("div", { class: "grow" }, [
                                    createVNode("p", null, toDisplayString(element.name), 1)
                                  ])
                                ])
                              ])
                            ]),
                            _: 2
                          }, 1024)) : createCommentVNode("", true)
                        ]),
                        _: 1
                      }, 8, ["list", "disabled"])) : createCommentVNode("", true)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              mode.value === "select" ? (openBlock(), createBlock("div", {
                key: 0,
                class: "fixed bottom-10 end-10 z-50"
              }, [
                createVNode(_component_v_btn, {
                  color: "amber",
                  size: "large",
                  "prepend-icon": "mdi-check-circle",
                  onClick: withModifiers(toggleMode, ["prevent"])
                }, {
                  default: withCtx(() => [
                    createTextVNode("Done")
                  ]),
                  _: 1
                })
              ])) : createCommentVNode("", true),
              createVNode("p", { class: "text-4xl mb-7" }, [
                createTextVNode("Category: "),
                createVNode("strong", null, toDisplayString(props.category.name), 1)
              ]),
              createVNode(_sfc_main$1, {
                center: true,
                justify: "between"
              }, {
                default: withCtx(() => [
                  createVNode(_sfc_main$1, {
                    center: true,
                    justify: "start"
                  }, {
                    default: withCtx(() => [
                      createVNode("div", null, [
                        createVNode(_component_v_btn, {
                          onClick: withModifiers(toggleMode, ["prevent"])
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(`${mode.value === "select" ? "Done" : "Select"}`), 1)
                          ]),
                          _: 1
                        })
                      ]),
                      mode.value === "reorder" ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                        createVNode("div", null, [
                          createVNode(_component_v_btn, {
                            onClick: withModifiers(saveProducts, ["prevent"]),
                            color: "green"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Save products")
                            ]),
                            _: 1
                          })
                        ]),
                        createVNode("p", null, "You can reorder the products below.")
                      ], 64)) : createCommentVNode("", true)
                    ]),
                    _: 1
                  }),
                  createVNode("div", null, [
                    createVNode(_component_v_btn, {
                      variant: "outlined",
                      onClick: withModifiers(($event) => _ctx.$inertia.visit(_ctx.route("admin.events_menu")), ["prevent"])
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Close")
                      ]),
                      _: 1
                    }, 8, ["onClick"])
                  ])
                ]),
                _: 1
              }),
              unref(form).selected ? (openBlock(), createBlock(_sfc_main$2, {
                key: 1,
                gap: "4",
                class: "my-3"
              }, {
                default: withCtx(() => [
                  mode.value === "select" ? (openBlock(true), createBlock(Fragment, { key: 0 }, renderList(props.products, (product) => {
                    return openBlock(), createBlock(Fragment, null, [
                      display(product.uid) ? (openBlock(), createBlock(_component_v_card, {
                        key: 0,
                        color: "grey-lighten-3",
                        rounded: "lg"
                      }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "p-2" }, [
                            createVNode("div", { class: "flex flex-row items-center gap-4" }, [
                              createVNode("div", { class: "shrink-0" }, [
                                createVNode(_component_v_checkbox, {
                                  modelValue: unref(form).selected,
                                  "onUpdate:modelValue": ($event) => unref(form).selected = $event,
                                  value: product.uid,
                                  density: "compact",
                                  "hide-details": ""
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "value"])
                              ]),
                              createVNode("div", { class: "grow" }, [
                                createVNode("p", null, toDisplayString(product.name), 1)
                              ])
                            ])
                          ])
                        ]),
                        _: 2
                      }, 1024)) : createCommentVNode("", true)
                    ], 64);
                  }), 256)) : displayProducts.value && mode.value === "reorder" ? (openBlock(), createBlock(unref(draggable), {
                    key: 1,
                    list: selectedProducts.value,
                    sort: true,
                    "item-key": "uid",
                    disabled: savingOrder.value,
                    onEnd: notifyOrderChanged,
                    "ghost-class": "ghost-landing",
                    "drag-class": "ghost-dragging"
                  }, {
                    item: withCtx(({ element }) => [
                      display(element.uid) ? (openBlock(), createBlock(_component_v_card, {
                        key: 0,
                        color: "grey-lighten-3 my-2",
                        rounded: "lg"
                      }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "p-2" }, [
                            createVNode("div", { class: "flex flex-row items-center gap-4" }, [
                              createVNode("div", { class: "shrink-0" }, [
                                createVNode(_component_v_icon, null, {
                                  default: withCtx(() => [
                                    createTextVNode("mdi-drag")
                                  ]),
                                  _: 1
                                })
                              ]),
                              createVNode("div", { class: "grow" }, [
                                createVNode("p", null, toDisplayString(element.name), 1)
                              ])
                            ])
                          ])
                        ]),
                        _: 2
                      }, 1024)) : createCommentVNode("", true)
                    ]),
                    _: 1
                  }, 8, ["list", "disabled"])) : createCommentVNode("", true)
                ]),
                _: 1
              })) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/EventsMenu/Products.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Products = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-a123d988"]]);
export {
  Products as default
};
