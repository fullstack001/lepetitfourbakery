import { ref, resolveComponent, mergeProps, withCtx, createTextVNode, toDisplayString, unref, createVNode, useSSRContext, withModifiers, openBlock, createBlock, Fragment, renderList } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { A as AdmLayout } from "./BZf0ki2W-7956103712867.js";
import { useForm } from "@inertiajs/vue3";
import { _ as _sfc_main$3, a as _sfc_main$6 } from "./Cyl_ukyB-5873697610160.js";
import { _ as _sfc_main$2 } from "./D2KjorHx-1875739460561.js";
import { _ as _sfc_main$4 } from "./DsvTyKEu-3067955167518.js";
import { _ as _sfc_main$5 } from "./CeVcRmCk-1577655618930.js";
import "./BW6cC8iL-1677159380657.js";
import "./kZV6a-x4-6055183876791.js";
import "./1tPrXgE0-4581736670159.js";
import "./C6q4kDV--1536774619085.js";
import "./DKEAH6nn-8515365770691.js";
import "mitt";
const _sfc_main$1 = {
  __name: "EventsMenuModal",
  __ssrInlineRender: true,
  props: {
    errors: Object
  },
  setup(__props, { expose: __expose }) {
    const showCategoryModal = ref(false);
    const selectedCategory = ref(null);
    const modalTitle = ref(null);
    const saveButtonText = ref(null);
    const formCategory = useForm({
      name: ""
    });
    const openCategory = (category = null) => {
      if (category) {
        modalTitle.value = "Edit category";
        selectedCategory.value = category;
        formCategory.name = category.name;
      } else {
        modalTitle.value = "Create category";
        selectedCategory.value = null;
        formCategory.name = "";
      }
      saveButtonText.value = "Save category";
      showCategoryModal.value = true;
    };
    const closeCategory = () => {
      showCategoryModal.value = false;
    };
    const resetFormCategory = () => {
      formCategory.reset("name");
    };
    const saveCategory = () => {
      let url;
      if (selectedCategory.value) {
        url = route("admin.events_menu.update_category", { category: selectedCategory.value.uid });
      } else {
        url = route("admin.events_menu.create_category");
      }
      formCategory.post(url, {
        onSuccess: () => {
          resetFormCategory();
          closeCategory();
        }
      });
    };
    __expose({ openCategory });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_v_card = resolveComponent("v-card");
      const _component_v_label = resolveComponent("v-label");
      const _component_v_text_field = resolveComponent("v-text-field");
      _push(ssrRenderComponent(_sfc_main$2, mergeProps({
        show: showCategoryModal.value,
        onClose: closeCategory
      }, _attrs), {
        title: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(modalTitle.value)}`);
          } else {
            return [
              createTextVNode(toDisplayString(modalTitle.value), 1)
            ];
          }
        }),
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_v_card, {
              color: "grey-lighten-3",
              rounded: "lg"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="p-4"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$3, { gap: "5" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_sfc_main$3, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_v_label, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Name`);
                                  } else {
                                    return [
                                      createTextVNode("Name")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_v_text_field, {
                                ref: "nameInput",
                                modelValue: unref(formCategory).name,
                                "onUpdate:modelValue": ($event) => unref(formCategory).name = $event
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_v_label, null, {
                                  default: withCtx(() => [
                                    createTextVNode("Name")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_v_text_field, {
                                  ref: "nameInput",
                                  modelValue: unref(formCategory).name,
                                  "onUpdate:modelValue": ($event) => unref(formCategory).name = $event
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_sfc_main$3, null, {
                            default: withCtx(() => [
                              createVNode(_component_v_label, null, {
                                default: withCtx(() => [
                                  createTextVNode("Name")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_v_text_field, {
                                ref: "nameInput",
                                modelValue: unref(formCategory).name,
                                "onUpdate:modelValue": ($event) => unref(formCategory).name = $event
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "p-4" }, [
                      createVNode(_sfc_main$3, { gap: "5" }, {
                        default: withCtx(() => [
                          createVNode(_sfc_main$3, null, {
                            default: withCtx(() => [
                              createVNode(_component_v_label, null, {
                                default: withCtx(() => [
                                  createTextVNode("Name")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_v_text_field, {
                                ref: "nameInput",
                                modelValue: unref(formCategory).name,
                                "onUpdate:modelValue": ($event) => unref(formCategory).name = $event
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_v_card, {
                color: "grey-lighten-3",
                rounded: "lg"
              }, {
                default: withCtx(() => [
                  createVNode("div", { class: "p-4" }, [
                    createVNode(_sfc_main$3, { gap: "5" }, {
                      default: withCtx(() => [
                        createVNode(_sfc_main$3, null, {
                          default: withCtx(() => [
                            createVNode(_component_v_label, null, {
                              default: withCtx(() => [
                                createTextVNode("Name")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_v_text_field, {
                              ref: "nameInput",
                              modelValue: unref(formCategory).name,
                              "onUpdate:modelValue": ($event) => unref(formCategory).name = $event
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ])
                ]),
                _: 1
              })
            ];
          }
        }),
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$4, {
              disabled: unref(formCategory).processing,
              onClick: saveCategory,
              class: "me-3"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(saveButtonText.value)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(saveButtonText.value), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$5, { onClick: closeCategory }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Cancel`);
                } else {
                  return [
                    createTextVNode("Cancel")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$4, {
                disabled: unref(formCategory).processing,
                onClick: saveCategory,
                class: "me-3"
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(saveButtonText.value), 1)
                ]),
                _: 1
              }, 8, ["disabled"]),
              createVNode(_sfc_main$5, { onClick: closeCategory }, {
                default: withCtx(() => [
                  createTextVNode("Cancel")
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
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/EventsMenuModal.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "Home",
  __ssrInlineRender: true,
  props: {
    categories: Object,
    errors: Object
  },
  setup(__props) {
    const props = __props;
    const eventsMenuModal = ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_v_btn = resolveComponent("v-btn");
      const _component_v_card = resolveComponent("v-card");
      _push(ssrRenderComponent(AdmLayout, mergeProps({ title: "Events menu" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div${_scopeId}>`);
            _push2(ssrRenderComponent(_component_v_btn, {
              onClick: ($event) => eventsMenuModal.value.openCategory(),
              size: "small"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Create event menu category`);
                } else {
                  return [
                    createTextVNode("Create event menu category")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="my-3"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$3, { gap: "4" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(props.categories, (category) => {
                    _push3(ssrRenderComponent(_component_v_card, {
                      color: "grey-lighten-3",
                      rounded: "lg"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<div class="p-4"${_scopeId3}>`);
                          _push4(ssrRenderComponent(_sfc_main$6, {
                            center: true,
                            justify: "between"
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<p${_scopeId4}>${ssrInterpolate(category.name)} (${ssrInterpolate(category.products_count)})</p>`);
                                _push5(ssrRenderComponent(_sfc_main$6, {
                                  center: true,
                                  justify: "end"
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`<div${_scopeId5}>`);
                                      _push6(ssrRenderComponent(_component_v_btn, {
                                        onClick: ($event) => _ctx.$inertia.visit(_ctx.route("admin.events_menu.products", { category: category.uid })),
                                        variant: "outlined",
                                        size: "small"
                                      }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`Manage products`);
                                          } else {
                                            return [
                                              createTextVNode("Manage products")
                                            ];
                                          }
                                        }),
                                        _: 2
                                      }, _parent6, _scopeId5));
                                      _push6(`</div><div${_scopeId5}>`);
                                      _push6(ssrRenderComponent(_component_v_btn, {
                                        onClick: ($event) => eventsMenuModal.value.openCategory(category),
                                        variant: "outlined",
                                        size: "small"
                                      }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`Edit category`);
                                          } else {
                                            return [
                                              createTextVNode("Edit category")
                                            ];
                                          }
                                        }),
                                        _: 2
                                      }, _parent6, _scopeId5));
                                      _push6(`</div>`);
                                    } else {
                                      return [
                                        createVNode("div", null, [
                                          createVNode(_component_v_btn, {
                                            onClick: withModifiers(($event) => _ctx.$inertia.visit(_ctx.route("admin.events_menu.products", { category: category.uid })), ["prevent"]),
                                            variant: "outlined",
                                            size: "small"
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode("Manage products")
                                            ]),
                                            _: 2
                                          }, 1032, ["onClick"])
                                        ]),
                                        createVNode("div", null, [
                                          createVNode(_component_v_btn, {
                                            onClick: withModifiers(($event) => eventsMenuModal.value.openCategory(category), ["prevent"]),
                                            variant: "outlined",
                                            size: "small"
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode("Edit category")
                                            ]),
                                            _: 2
                                          }, 1032, ["onClick"])
                                        ])
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode("p", null, toDisplayString(category.name) + " (" + toDisplayString(category.products_count) + ")", 1),
                                  createVNode(_sfc_main$6, {
                                    center: true,
                                    justify: "end"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode("div", null, [
                                        createVNode(_component_v_btn, {
                                          onClick: withModifiers(($event) => _ctx.$inertia.visit(_ctx.route("admin.events_menu.products", { category: category.uid })), ["prevent"]),
                                          variant: "outlined",
                                          size: "small"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode("Manage products")
                                          ]),
                                          _: 2
                                        }, 1032, ["onClick"])
                                      ]),
                                      createVNode("div", null, [
                                        createVNode(_component_v_btn, {
                                          onClick: withModifiers(($event) => eventsMenuModal.value.openCategory(category), ["prevent"]),
                                          variant: "outlined",
                                          size: "small"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode("Edit category")
                                          ]),
                                          _: 2
                                        }, 1032, ["onClick"])
                                      ])
                                    ]),
                                    _: 2
                                  }, 1024)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                          _push4(`</div>`);
                        } else {
                          return [
                            createVNode("div", { class: "p-4" }, [
                              createVNode(_sfc_main$6, {
                                center: true,
                                justify: "between"
                              }, {
                                default: withCtx(() => [
                                  createVNode("p", null, toDisplayString(category.name) + " (" + toDisplayString(category.products_count) + ")", 1),
                                  createVNode(_sfc_main$6, {
                                    center: true,
                                    justify: "end"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode("div", null, [
                                        createVNode(_component_v_btn, {
                                          onClick: withModifiers(($event) => _ctx.$inertia.visit(_ctx.route("admin.events_menu.products", { category: category.uid })), ["prevent"]),
                                          variant: "outlined",
                                          size: "small"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode("Manage products")
                                          ]),
                                          _: 2
                                        }, 1032, ["onClick"])
                                      ]),
                                      createVNode("div", null, [
                                        createVNode(_component_v_btn, {
                                          onClick: withModifiers(($event) => eventsMenuModal.value.openCategory(category), ["prevent"]),
                                          variant: "outlined",
                                          size: "small"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode("Edit category")
                                          ]),
                                          _: 2
                                        }, 1032, ["onClick"])
                                      ])
                                    ]),
                                    _: 2
                                  }, 1024)
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
                    (openBlock(true), createBlock(Fragment, null, renderList(props.categories, (category) => {
                      return openBlock(), createBlock(_component_v_card, {
                        color: "grey-lighten-3",
                        rounded: "lg"
                      }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "p-4" }, [
                            createVNode(_sfc_main$6, {
                              center: true,
                              justify: "between"
                            }, {
                              default: withCtx(() => [
                                createVNode("p", null, toDisplayString(category.name) + " (" + toDisplayString(category.products_count) + ")", 1),
                                createVNode(_sfc_main$6, {
                                  center: true,
                                  justify: "end"
                                }, {
                                  default: withCtx(() => [
                                    createVNode("div", null, [
                                      createVNode(_component_v_btn, {
                                        onClick: withModifiers(($event) => _ctx.$inertia.visit(_ctx.route("admin.events_menu.products", { category: category.uid })), ["prevent"]),
                                        variant: "outlined",
                                        size: "small"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode("Manage products")
                                        ]),
                                        _: 2
                                      }, 1032, ["onClick"])
                                    ]),
                                    createVNode("div", null, [
                                      createVNode(_component_v_btn, {
                                        onClick: withModifiers(($event) => eventsMenuModal.value.openCategory(category), ["prevent"]),
                                        variant: "outlined",
                                        size: "small"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode("Edit category")
                                        ]),
                                        _: 2
                                      }, 1032, ["onClick"])
                                    ])
                                  ]),
                                  _: 2
                                }, 1024)
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
            _push2(`</div>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              ref_key: "eventsMenuModal",
              ref: eventsMenuModal,
              errors: props.errors
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode("div", null, [
                createVNode(_component_v_btn, {
                  onClick: withModifiers(($event) => eventsMenuModal.value.openCategory(), ["prevent"]),
                  size: "small"
                }, {
                  default: withCtx(() => [
                    createTextVNode("Create event menu category")
                  ]),
                  _: 1
                }, 8, ["onClick"])
              ]),
              createVNode("div", { class: "my-3" }, [
                createVNode(_sfc_main$3, { gap: "4" }, {
                  default: withCtx(() => [
                    (openBlock(true), createBlock(Fragment, null, renderList(props.categories, (category) => {
                      return openBlock(), createBlock(_component_v_card, {
                        color: "grey-lighten-3",
                        rounded: "lg"
                      }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "p-4" }, [
                            createVNode(_sfc_main$6, {
                              center: true,
                              justify: "between"
                            }, {
                              default: withCtx(() => [
                                createVNode("p", null, toDisplayString(category.name) + " (" + toDisplayString(category.products_count) + ")", 1),
                                createVNode(_sfc_main$6, {
                                  center: true,
                                  justify: "end"
                                }, {
                                  default: withCtx(() => [
                                    createVNode("div", null, [
                                      createVNode(_component_v_btn, {
                                        onClick: withModifiers(($event) => _ctx.$inertia.visit(_ctx.route("admin.events_menu.products", { category: category.uid })), ["prevent"]),
                                        variant: "outlined",
                                        size: "small"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode("Manage products")
                                        ]),
                                        _: 2
                                      }, 1032, ["onClick"])
                                    ]),
                                    createVNode("div", null, [
                                      createVNode(_component_v_btn, {
                                        onClick: withModifiers(($event) => eventsMenuModal.value.openCategory(category), ["prevent"]),
                                        variant: "outlined",
                                        size: "small"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode("Edit category")
                                        ]),
                                        _: 2
                                      }, 1032, ["onClick"])
                                    ])
                                  ]),
                                  _: 2
                                }, 1024)
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
              ]),
              createVNode(_sfc_main$1, {
                ref_key: "eventsMenuModal",
                ref: eventsMenuModal,
                errors: props.errors
              }, null, 8, ["errors"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/EventsMenu/Home.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
