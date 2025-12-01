import { ref, reactive, resolveComponent, mergeProps, withCtx, createTextVNode, toDisplayString, createVNode, useSSRContext, onMounted, withModifiers, openBlock, createBlock, createCommentVNode, Fragment, renderList } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderAttr } from "vue/server-renderer";
import { A as AdmLayout } from "./BZf0ki2W-7956103712867.js";
import { router } from "@inertiajs/vue3";
import { _ as _sfc_main$3 } from "./DsvTyKEu-3067955167518.js";
import { _ as _sfc_main$4 } from "./CeVcRmCk-1577655618930.js";
import { _ as _sfc_main$2 } from "./D2KjorHx-1875739460561.js";
import { cloneDeep } from "lodash";
import "./BW6cC8iL-1677159380657.js";
import "./kZV6a-x4-6055183876791.js";
import "./1tPrXgE0-4581736670159.js";
import "./C6q4kDV--1536774619085.js";
import "./DKEAH6nn-8515365770691.js";
import "mitt";
const _sfc_main$1 = {
  __name: "CategoryModal",
  __ssrInlineRender: true,
  emits: ["refresh"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const showCategoryModal = ref(false);
    const selectedCategory = ref(null);
    const modalTitle = ref(null);
    const saveButtonText = ref(null);
    const form = reactive({
      name: null
    });
    const openCategory = (category = null) => {
      if (category) {
        modalTitle.value = "Edit category";
        selectedCategory.value = category;
        form.name = category.name;
      } else {
        modalTitle.value = "Create category";
        selectedCategory.value = null;
        form.name = null;
      }
      saveButtonText.value = "Save category";
      showCategoryModal.value = true;
    };
    const closeCategory = () => {
      showCategoryModal.value = false;
      selectedCategory.value = null;
    };
    const saveCategory = () => {
      let url;
      if (selectedCategory.value) {
        url = route("admin.update_category", { category: selectedCategory.value.uid });
      } else {
        url = route(`admin.create_category`);
      }
      router.post(url, form, {
        preserveScroll: true,
        preserveState: true,
        only: [""],
        onSuccess: (page) => {
          emit("refresh");
          closeCategory();
        },
        onError: (error) => {
          console.log(error);
        }
      });
    };
    __expose({ openCategory });
    const emit = __emit;
    return (_ctx, _push, _parent, _attrs) => {
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
            _push2(ssrRenderComponent(_component_v_label, { class: "uppercase" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Category name`);
                } else {
                  return [
                    createTextVNode("Category name")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_v_text_field, {
              modelValue: form.name,
              "onUpdate:modelValue": ($event) => form.name = $event,
              density: "compact",
              class: "mt-1"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_v_label, { class: "uppercase" }, {
                default: withCtx(() => [
                  createTextVNode("Category name")
                ]),
                _: 1
              }),
              createVNode(_component_v_text_field, {
                modelValue: form.name,
                "onUpdate:modelValue": ($event) => form.name = $event,
                density: "compact",
                class: "mt-1"
              }, null, 8, ["modelValue", "onUpdate:modelValue"])
            ];
          }
        }),
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$3, {
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
            _push2(ssrRenderComponent(_sfc_main$4, { onClick: closeCategory }, {
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
              createVNode(_sfc_main$3, {
                onClick: saveCategory,
                class: "me-3"
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(saveButtonText.value), 1)
                ]),
                _: 1
              }),
              createVNode(_sfc_main$4, { onClick: closeCategory }, {
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/CategoryModal.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "List",
  __ssrInlineRender: true,
  props: {
    categories: Object
  },
  setup(__props) {
    const props = __props;
    const categoryModal = ref(null);
    const isReordering = ref(false);
    const reorderCategories = () => {
      isReordering.value = !isReordering.value;
    };
    const categoriesOrder = ref({});
    const draggedIndex = ref(null);
    const dragStart = (event, index) => {
      draggedIndex.value = index;
      event.dataTransfer.effectAllowed = "move";
    };
    const dragOver = (event) => {
      event.preventDefault();
    };
    const drop = (event, dropIndex) => {
      event.preventDefault();
      const itemToMove = categoriesOrder.value.splice(draggedIndex.value, 1)[0];
      categoriesOrder.value.splice(dropIndex, 0, itemToMove);
      saveCategoryOrder();
    };
    const saveCategoryOrder = () => {
      const list = categoriesOrder.value.map((category) => category.uid);
      const data = {
        list
      };
      router.post(route("admin.reorder_groups"), data, {
        preserveScroll: true,
        preserveState: true,
        only: [""],
        onSuccess: (page) => {
          initializeOrder();
        },
        onError: (error) => {
          console.log("error");
        }
      });
    };
    const initializeOrder = () => {
      categoriesOrder.value = cloneDeep(props.categories);
    };
    onMounted(() => {
      initializeOrder();
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_v_btn = resolveComponent("v-btn");
      const _component_v_card = resolveComponent("v-card");
      const _component_v_card_item = resolveComponent("v-card-item");
      const _component_v_icon = resolveComponent("v-icon");
      _push(ssrRenderComponent(AdmLayout, mergeProps({ title: "Categories" }, _attrs), {
        buttons: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex flex-row items-center gap-2 w-full"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_v_btn, {
              onClick: ($event) => categoryModal.value.openCategory(null),
              size: "small"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Create new category`);
                } else {
                  return [
                    createTextVNode("Create new category")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_v_btn, {
              variant: "outlined",
              onClick: reorderCategories,
              size: "small"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Reorder categories`);
                } else {
                  return [
                    createTextVNode("Reorder categories")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "flex flex-row items-center gap-2 w-full" }, [
                createVNode(_component_v_btn, {
                  onClick: withModifiers(($event) => categoryModal.value.openCategory(null), ["prevent"]),
                  size: "small"
                }, {
                  default: withCtx(() => [
                    createTextVNode("Create new category")
                  ]),
                  _: 1
                }, 8, ["onClick"]),
                createVNode(_component_v_btn, {
                  variant: "outlined",
                  onClick: withModifiers(reorderCategories, ["prevent"]),
                  size: "small"
                }, {
                  default: withCtx(() => [
                    createTextVNode("Reorder categories")
                  ]),
                  _: 1
                })
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (props.categories.length) {
              _push2(`<div${_scopeId}><div class="flex flex-col gap-3"${_scopeId}><!--[-->`);
              ssrRenderList(categoriesOrder.value, (category, index) => {
                _push2(`<div${ssrRenderAttr("draggable", isReordering.value)}${_scopeId}>`);
                _push2(ssrRenderComponent(_component_v_card, null, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_component_v_card_item, null, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`<div class="flex flex-row w-full gap-3"${_scopeId3}>`);
                            if (isReordering.value) {
                              _push4(`<div class="shrink-0"${_scopeId3}>`);
                              _push4(ssrRenderComponent(_component_v_btn, {
                                size: "small",
                                color: "transparent"
                              }, {
                                default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                  if (_push5) {
                                    _push5(ssrRenderComponent(_component_v_icon, { size: "x-large" }, {
                                      default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                        if (_push6) {
                                          _push6(`mdi-drag-horizontal`);
                                        } else {
                                          return [
                                            createTextVNode("mdi-drag-horizontal")
                                          ];
                                        }
                                      }),
                                      _: 2
                                    }, _parent5, _scopeId4));
                                  } else {
                                    return [
                                      createVNode(_component_v_icon, { size: "x-large" }, {
                                        default: withCtx(() => [
                                          createTextVNode("mdi-drag-horizontal")
                                        ]),
                                        _: 1
                                      })
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent4, _scopeId3));
                              _push4(`</div>`);
                            } else {
                              _push4(`<!---->`);
                            }
                            _push4(`<div class="grow"${_scopeId3}><div class="flex flex-row-items-center justify-between"${_scopeId3}><div class="flex items-center gap-1"${_scopeId3}><p class="text-xl"${_scopeId3}>${ssrInterpolate(category.name)} <span class="text-grey"${_scopeId3}>(${ssrInterpolate(category.products_count)})</span></p></div><div${_scopeId3}>`);
                            _push4(ssrRenderComponent(_component_v_btn, {
                              onClick: ($event) => categoryModal.value.openCategory(category),
                              size: "small"
                            }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`Edit category`);
                                } else {
                                  return [
                                    createTextVNode("Edit category")
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                            _push4(`</div></div></div></div>`);
                          } else {
                            return [
                              createVNode("div", { class: "flex flex-row w-full gap-3" }, [
                                isReordering.value ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "shrink-0"
                                }, [
                                  createVNode(_component_v_btn, {
                                    size: "small",
                                    color: "transparent"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(_component_v_icon, { size: "x-large" }, {
                                        default: withCtx(() => [
                                          createTextVNode("mdi-drag-horizontal")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  })
                                ])) : createCommentVNode("", true),
                                createVNode("div", { class: "grow" }, [
                                  createVNode("div", { class: "flex flex-row-items-center justify-between" }, [
                                    createVNode("div", { class: "flex items-center gap-1" }, [
                                      createVNode("p", { class: "text-xl" }, [
                                        createTextVNode(toDisplayString(category.name) + " ", 1),
                                        createVNode("span", { class: "text-grey" }, "(" + toDisplayString(category.products_count) + ")", 1)
                                      ])
                                    ]),
                                    createVNode("div", null, [
                                      createVNode(_component_v_btn, {
                                        onClick: withModifiers(($event) => categoryModal.value.openCategory(category), ["prevent"]),
                                        size: "small"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode("Edit category")
                                        ]),
                                        _: 2
                                      }, 1032, ["onClick"])
                                    ])
                                  ])
                                ])
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
                            createVNode("div", { class: "flex flex-row w-full gap-3" }, [
                              isReordering.value ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "shrink-0"
                              }, [
                                createVNode(_component_v_btn, {
                                  size: "small",
                                  color: "transparent"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_v_icon, { size: "x-large" }, {
                                      default: withCtx(() => [
                                        createTextVNode("mdi-drag-horizontal")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })
                              ])) : createCommentVNode("", true),
                              createVNode("div", { class: "grow" }, [
                                createVNode("div", { class: "flex flex-row-items-center justify-between" }, [
                                  createVNode("div", { class: "flex items-center gap-1" }, [
                                    createVNode("p", { class: "text-xl" }, [
                                      createTextVNode(toDisplayString(category.name) + " ", 1),
                                      createVNode("span", { class: "text-grey" }, "(" + toDisplayString(category.products_count) + ")", 1)
                                    ])
                                  ]),
                                  createVNode("div", null, [
                                    createVNode(_component_v_btn, {
                                      onClick: withModifiers(($event) => categoryModal.value.openCategory(category), ["prevent"]),
                                      size: "small"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode("Edit category")
                                      ]),
                                      _: 2
                                    }, 1032, ["onClick"])
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
                }, _parent2, _scopeId));
                _push2(`</div>`);
              });
              _push2(`<!--]--></div></div>`);
            } else {
              _push2(`<div${_scopeId}><p${_scopeId}>There are no categories for now</p></div>`);
            }
            _push2(ssrRenderComponent(_sfc_main$1, {
              ref_key: "categoryModal",
              ref: categoryModal,
              onRefresh: initializeOrder
            }, null, _parent2, _scopeId));
          } else {
            return [
              props.categories.length ? (openBlock(), createBlock("div", { key: 0 }, [
                createVNode("div", { class: "flex flex-col gap-3" }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(categoriesOrder.value, (category, index) => {
                    return openBlock(), createBlock("div", {
                      draggable: isReordering.value,
                      onDragstart: (event) => dragStart(event, index),
                      onDragover: dragOver,
                      onDrop: (event) => drop(event, index)
                    }, [
                      createVNode(_component_v_card, null, {
                        default: withCtx(() => [
                          createVNode(_component_v_card_item, null, {
                            default: withCtx(() => [
                              createVNode("div", { class: "flex flex-row w-full gap-3" }, [
                                isReordering.value ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "shrink-0"
                                }, [
                                  createVNode(_component_v_btn, {
                                    size: "small",
                                    color: "transparent"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(_component_v_icon, { size: "x-large" }, {
                                        default: withCtx(() => [
                                          createTextVNode("mdi-drag-horizontal")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  })
                                ])) : createCommentVNode("", true),
                                createVNode("div", { class: "grow" }, [
                                  createVNode("div", { class: "flex flex-row-items-center justify-between" }, [
                                    createVNode("div", { class: "flex items-center gap-1" }, [
                                      createVNode("p", { class: "text-xl" }, [
                                        createTextVNode(toDisplayString(category.name) + " ", 1),
                                        createVNode("span", { class: "text-grey" }, "(" + toDisplayString(category.products_count) + ")", 1)
                                      ])
                                    ]),
                                    createVNode("div", null, [
                                      createVNode(_component_v_btn, {
                                        onClick: withModifiers(($event) => categoryModal.value.openCategory(category), ["prevent"]),
                                        size: "small"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode("Edit category")
                                        ]),
                                        _: 2
                                      }, 1032, ["onClick"])
                                    ])
                                  ])
                                ])
                              ])
                            ]),
                            _: 2
                          }, 1024)
                        ]),
                        _: 2
                      }, 1024)
                    ], 40, ["draggable", "onDragstart", "onDrop"]);
                  }), 256))
                ])
              ])) : (openBlock(), createBlock("div", { key: 1 }, [
                createVNode("p", null, "There are no categories for now")
              ])),
              createVNode(_sfc_main$1, {
                ref_key: "categoryModal",
                ref: categoryModal,
                onRefresh: initializeOrder
              }, null, 512)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Categories/List.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
