import { ref, onMounted, nextTick, resolveComponent, mergeProps, withCtx, createTextVNode, createVNode, withModifiers, toDisplayString, unref, openBlock, createBlock, createCommentVNode, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { A as AdmLayout } from "./Bmk57_E8-5341323707321.js";
import { router } from "@inertiajs/vue3";
import { a as _sfc_main$1, _ as _sfc_main$2 } from "./Cyl_ukyB-3352317127354.js";
import { _ as _sfc_main$3, a as _sfc_main$4 } from "./_W3okM5e-4373421953124.js";
import draggable from "vuedraggable";
import "./BW6cC8iL-1754723312335.js";
import "./kZV6a-x4-2437327355113.js";
import "./1tPrXgE0-1751246333532.js";
import "./BFeg_3wS-5313717233245.js";
import "./C6q4kDV--4257163313235.js";
import "./DKEAH6nn-4333751172235.js";
import "mitt";
import "./DsvTyKEu-3355343127127.js";
import "./CeVcRmCk-1453137522733.js";
const _sfc_main = {
  __name: "Terms",
  __ssrInlineRender: true,
  props: {
    categories: Object,
    errors: Object
  },
  setup(__props) {
    const props = __props;
    const legalCategoryModal = ref(null);
    const legalParagraphModal = ref(null);
    const showParagraphContent = ref(true);
    const categoryList = ref([]);
    const local_errors = ref({});
    const orderChanged = ref(false);
    const saving = ref(false);
    const notifyOrderChanged = () => {
      orderChanged.value = true;
      categoryList.value.forEach((category, index) => {
        const originalCategory = props.categories.find((c) => c.id === category.id);
        if (originalCategory) {
          category.paragraphs = [...originalCategory.paragraphs];
        }
      });
    };
    const initLists = () => {
      categoryList.value = props.categories.map((category) => ({
        ...category,
        paragraphs: category.paragraphs
      }));
    };
    const saveOrder = () => {
      saving.value = true;
      router.post(route("admin.update_terms_order"), {
        categories: categoryList.value
      }, {
        preserveScroll: true,
        preserveState: true,
        onSuccess: (page) => {
          setTimeout(() => {
            orderChanged.value = false;
            saving.value = false;
            initLists();
          }, 1e3);
        },
        onError: (error) => {
          setTimeout(() => {
          }, 1e3);
          saving.value = false;
          local_errors.value = props.errors;
        }
      });
    };
    onMounted(() => {
      nextTick(() => {
        initLists();
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_v_btn = resolveComponent("v-btn");
      const _component_v_card = resolveComponent("v-card");
      const _component_v_checkbox = resolveComponent("v-checkbox");
      const _component_v_icon = resolveComponent("v-icon");
      _push(ssrRenderComponent(AdmLayout, mergeProps({ title: "Terms & Conditions" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$1, {
              center: true,
              justify: "start"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_v_btn, {
                    variant: "outlined",
                    onClick: ($event) => _ctx.$inertia.visit(_ctx.route("admin.legal_content"))
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
                  _push3(ssrRenderComponent(_component_v_btn, {
                    onClick: ($event) => legalCategoryModal.value.openCategory("terms")
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Create category`);
                      } else {
                        return [
                          createTextVNode("Create category")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_v_btn, {
                      variant: "outlined",
                      onClick: withModifiers(($event) => _ctx.$inertia.visit(_ctx.route("admin.legal_content")), ["prevent"])
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Close")
                      ]),
                      _: 1
                    }, 8, ["onClick"]),
                    createVNode(_component_v_btn, {
                      onClick: withModifiers(($event) => legalCategoryModal.value.openCategory("terms"), ["prevent"])
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Create category")
                      ]),
                      _: 1
                    }, 8, ["onClick"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="py-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="grow"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$2, { gap: "4" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_v_card, {
                          color: "white",
                          rounded: "lg"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<div class="p-4"${_scopeId4}>`);
                              _push5(ssrRenderComponent(_sfc_main$2, { gap: "2" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_sfc_main$1, {
                                      center: true,
                                      justify: "between"
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`<p class="font-bold"${_scopeId6}>List of categories and paragraphs</p>`);
                                          _push7(ssrRenderComponent(_component_v_checkbox, {
                                            modelValue: showParagraphContent.value,
                                            "onUpdate:modelValue": ($event) => showParagraphContent.value = $event,
                                            label: "Show paragraphs",
                                            "hide-details": ""
                                          }, null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode("p", { class: "font-bold" }, "List of categories and paragraphs"),
                                            createVNode(_component_v_checkbox, {
                                              modelValue: showParagraphContent.value,
                                              "onUpdate:modelValue": ($event) => showParagraphContent.value = $event,
                                              label: "Show paragraphs",
                                              "hide-details": ""
                                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(`<!--[-->`);
                                    ssrRenderList(categoryList.value, (category) => {
                                      _push6(ssrRenderComponent(_component_v_card, {
                                        color: "grey-lighten-3",
                                        rounded: "lg"
                                      }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`<div class="p-4"${_scopeId6}>`);
                                            _push7(ssrRenderComponent(_sfc_main$2, { gap: "2" }, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(ssrRenderComponent(_sfc_main$1, {
                                                    center: true,
                                                    justify: "between"
                                                  }, {
                                                    default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                      if (_push9) {
                                                        _push9(`<div${_scopeId8}><p class="text-xl"${_scopeId8}>${ssrInterpolate(category.position)}. ${ssrInterpolate(category.title)}</p></div><div${_scopeId8}>`);
                                                        _push9(ssrRenderComponent(_component_v_btn, {
                                                          variant: "outlined",
                                                          onClick: ($event) => legalCategoryModal.value.openCategory("terms", category),
                                                          size: "small"
                                                        }, {
                                                          default: withCtx((_9, _push10, _parent10, _scopeId9) => {
                                                            if (_push10) {
                                                              _push10(`Edit category`);
                                                            } else {
                                                              return [
                                                                createTextVNode("Edit category")
                                                              ];
                                                            }
                                                          }),
                                                          _: 2
                                                        }, _parent9, _scopeId8));
                                                        _push9(`</div>`);
                                                      } else {
                                                        return [
                                                          createVNode("div", null, [
                                                            createVNode("p", { class: "text-xl" }, toDisplayString(category.position) + ". " + toDisplayString(category.title), 1)
                                                          ]),
                                                          createVNode("div", null, [
                                                            createVNode(_component_v_btn, {
                                                              variant: "outlined",
                                                              onClick: withModifiers(($event) => legalCategoryModal.value.openCategory("terms", category), ["prevent"]),
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
                                                  }, _parent8, _scopeId7));
                                                  _push8(ssrRenderComponent(unref(draggable), {
                                                    list: category.paragraphs,
                                                    group: `paragraphs-${category.id}`,
                                                    sort: true,
                                                    "item-key": "id",
                                                    disabled: saving.value,
                                                    onEnd: notifyOrderChanged,
                                                    style: { "min-height": "50px" }
                                                  }, {
                                                    item: withCtx(({ element }, _push9, _parent9, _scopeId8) => {
                                                      if (_push9) {
                                                        _push9(`<div class="my-2"${_scopeId8}>`);
                                                        _push9(ssrRenderComponent(_component_v_card, {
                                                          color: "white",
                                                          rounded: "lg"
                                                        }, {
                                                          default: withCtx((_8, _push10, _parent10, _scopeId9) => {
                                                            if (_push10) {
                                                              _push10(`<div class="p-2"${_scopeId9}>`);
                                                              _push10(ssrRenderComponent(_sfc_main$1, {
                                                                center: true,
                                                                justify: "between"
                                                              }, {
                                                                default: withCtx((_9, _push11, _parent11, _scopeId10) => {
                                                                  if (_push11) {
                                                                    _push11(ssrRenderComponent(_sfc_main$2, null, {
                                                                      default: withCtx((_10, _push12, _parent12, _scopeId11) => {
                                                                        if (_push12) {
                                                                          _push12(ssrRenderComponent(_sfc_main$1, {
                                                                            center: true,
                                                                            justify: "between"
                                                                          }, {
                                                                            default: withCtx((_11, _push13, _parent13, _scopeId12) => {
                                                                              if (_push13) {
                                                                                _push13(ssrRenderComponent(_sfc_main$1, {
                                                                                  center: true,
                                                                                  justify: "start"
                                                                                }, {
                                                                                  default: withCtx((_12, _push14, _parent14, _scopeId13) => {
                                                                                    if (_push14) {
                                                                                      _push14(ssrRenderComponent(_component_v_icon, { size: "small" }, {
                                                                                        default: withCtx((_13, _push15, _parent15, _scopeId14) => {
                                                                                          if (_push15) {
                                                                                            _push15(`mdi-drag`);
                                                                                          } else {
                                                                                            return [
                                                                                              createTextVNode("mdi-drag")
                                                                                            ];
                                                                                          }
                                                                                        }),
                                                                                        _: 2
                                                                                      }, _parent14, _scopeId13));
                                                                                      _push14(`<p class="font-bold"${_scopeId13}>${ssrInterpolate(category.position)}.${ssrInterpolate(element.position)}. ${ssrInterpolate(element.title)}</p>`);
                                                                                    } else {
                                                                                      return [
                                                                                        createVNode(_component_v_icon, { size: "small" }, {
                                                                                          default: withCtx(() => [
                                                                                            createTextVNode("mdi-drag")
                                                                                          ]),
                                                                                          _: 1
                                                                                        }),
                                                                                        createVNode("p", { class: "font-bold" }, toDisplayString(category.position) + "." + toDisplayString(element.position) + ". " + toDisplayString(element.title), 1)
                                                                                      ];
                                                                                    }
                                                                                  }),
                                                                                  _: 2
                                                                                }, _parent13, _scopeId12));
                                                                                _push13(ssrRenderComponent(_component_v_btn, {
                                                                                  onClick: ($event) => legalParagraphModal.value.openParagraph("terms", category, element),
                                                                                  variant: "outlined",
                                                                                  size: "small"
                                                                                }, {
                                                                                  default: withCtx((_12, _push14, _parent14, _scopeId13) => {
                                                                                    if (_push14) {
                                                                                      _push14(`Edit paragraph`);
                                                                                    } else {
                                                                                      return [
                                                                                        createTextVNode("Edit paragraph")
                                                                                      ];
                                                                                    }
                                                                                  }),
                                                                                  _: 2
                                                                                }, _parent13, _scopeId12));
                                                                              } else {
                                                                                return [
                                                                                  createVNode(_sfc_main$1, {
                                                                                    center: true,
                                                                                    justify: "start"
                                                                                  }, {
                                                                                    default: withCtx(() => [
                                                                                      createVNode(_component_v_icon, { size: "small" }, {
                                                                                        default: withCtx(() => [
                                                                                          createTextVNode("mdi-drag")
                                                                                        ]),
                                                                                        _: 1
                                                                                      }),
                                                                                      createVNode("p", { class: "font-bold" }, toDisplayString(category.position) + "." + toDisplayString(element.position) + ". " + toDisplayString(element.title), 1)
                                                                                    ]),
                                                                                    _: 2
                                                                                  }, 1024),
                                                                                  createVNode(_component_v_btn, {
                                                                                    onClick: withModifiers(($event) => legalParagraphModal.value.openParagraph("terms", category, element), ["prevent"]),
                                                                                    variant: "outlined",
                                                                                    size: "small"
                                                                                  }, {
                                                                                    default: withCtx(() => [
                                                                                      createTextVNode("Edit paragraph")
                                                                                    ]),
                                                                                    _: 2
                                                                                  }, 1032, ["onClick"])
                                                                                ];
                                                                              }
                                                                            }),
                                                                            _: 2
                                                                          }, _parent12, _scopeId11));
                                                                          if (showParagraphContent.value) {
                                                                            _push12(ssrRenderComponent(_sfc_main$1, null, {
                                                                              default: withCtx((_11, _push13, _parent13, _scopeId12) => {
                                                                                if (_push13) {
                                                                                  _push13(ssrRenderComponent(_component_v_icon, {
                                                                                    size: "small",
                                                                                    color: "transparent"
                                                                                  }, {
                                                                                    default: withCtx((_12, _push14, _parent14, _scopeId13) => {
                                                                                      if (_push14) {
                                                                                        _push14(`mdi-drag`);
                                                                                      } else {
                                                                                        return [
                                                                                          createTextVNode("mdi-drag")
                                                                                        ];
                                                                                      }
                                                                                    }),
                                                                                    _: 2
                                                                                  }, _parent13, _scopeId12));
                                                                                  _push13(`<p${_scopeId12}>${element.content_formatted ?? ""}</p>`);
                                                                                } else {
                                                                                  return [
                                                                                    createVNode(_component_v_icon, {
                                                                                      size: "small",
                                                                                      color: "transparent"
                                                                                    }, {
                                                                                      default: withCtx(() => [
                                                                                        createTextVNode("mdi-drag")
                                                                                      ]),
                                                                                      _: 1
                                                                                    }),
                                                                                    createVNode("p", {
                                                                                      innerHTML: element.content_formatted
                                                                                    }, null, 8, ["innerHTML"])
                                                                                  ];
                                                                                }
                                                                              }),
                                                                              _: 2
                                                                            }, _parent12, _scopeId11));
                                                                          } else {
                                                                            _push12(`<!---->`);
                                                                          }
                                                                        } else {
                                                                          return [
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
                                                                                    createVNode(_component_v_icon, { size: "small" }, {
                                                                                      default: withCtx(() => [
                                                                                        createTextVNode("mdi-drag")
                                                                                      ]),
                                                                                      _: 1
                                                                                    }),
                                                                                    createVNode("p", { class: "font-bold" }, toDisplayString(category.position) + "." + toDisplayString(element.position) + ". " + toDisplayString(element.title), 1)
                                                                                  ]),
                                                                                  _: 2
                                                                                }, 1024),
                                                                                createVNode(_component_v_btn, {
                                                                                  onClick: withModifiers(($event) => legalParagraphModal.value.openParagraph("terms", category, element), ["prevent"]),
                                                                                  variant: "outlined",
                                                                                  size: "small"
                                                                                }, {
                                                                                  default: withCtx(() => [
                                                                                    createTextVNode("Edit paragraph")
                                                                                  ]),
                                                                                  _: 2
                                                                                }, 1032, ["onClick"])
                                                                              ]),
                                                                              _: 2
                                                                            }, 1024),
                                                                            showParagraphContent.value ? (openBlock(), createBlock(_sfc_main$1, { key: 0 }, {
                                                                              default: withCtx(() => [
                                                                                createVNode(_component_v_icon, {
                                                                                  size: "small",
                                                                                  color: "transparent"
                                                                                }, {
                                                                                  default: withCtx(() => [
                                                                                    createTextVNode("mdi-drag")
                                                                                  ]),
                                                                                  _: 1
                                                                                }),
                                                                                createVNode("p", {
                                                                                  innerHTML: element.content_formatted
                                                                                }, null, 8, ["innerHTML"])
                                                                              ]),
                                                                              _: 2
                                                                            }, 1024)) : createCommentVNode("", true)
                                                                          ];
                                                                        }
                                                                      }),
                                                                      _: 2
                                                                    }, _parent11, _scopeId10));
                                                                  } else {
                                                                    return [
                                                                      createVNode(_sfc_main$2, null, {
                                                                        default: withCtx(() => [
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
                                                                                  createVNode(_component_v_icon, { size: "small" }, {
                                                                                    default: withCtx(() => [
                                                                                      createTextVNode("mdi-drag")
                                                                                    ]),
                                                                                    _: 1
                                                                                  }),
                                                                                  createVNode("p", { class: "font-bold" }, toDisplayString(category.position) + "." + toDisplayString(element.position) + ". " + toDisplayString(element.title), 1)
                                                                                ]),
                                                                                _: 2
                                                                              }, 1024),
                                                                              createVNode(_component_v_btn, {
                                                                                onClick: withModifiers(($event) => legalParagraphModal.value.openParagraph("terms", category, element), ["prevent"]),
                                                                                variant: "outlined",
                                                                                size: "small"
                                                                              }, {
                                                                                default: withCtx(() => [
                                                                                  createTextVNode("Edit paragraph")
                                                                                ]),
                                                                                _: 2
                                                                              }, 1032, ["onClick"])
                                                                            ]),
                                                                            _: 2
                                                                          }, 1024),
                                                                          showParagraphContent.value ? (openBlock(), createBlock(_sfc_main$1, { key: 0 }, {
                                                                            default: withCtx(() => [
                                                                              createVNode(_component_v_icon, {
                                                                                size: "small",
                                                                                color: "transparent"
                                                                              }, {
                                                                                default: withCtx(() => [
                                                                                  createTextVNode("mdi-drag")
                                                                                ]),
                                                                                _: 1
                                                                              }),
                                                                              createVNode("p", {
                                                                                innerHTML: element.content_formatted
                                                                              }, null, 8, ["innerHTML"])
                                                                            ]),
                                                                            _: 2
                                                                          }, 1024)) : createCommentVNode("", true)
                                                                        ]),
                                                                        _: 2
                                                                      }, 1024)
                                                                    ];
                                                                  }
                                                                }),
                                                                _: 2
                                                              }, _parent10, _scopeId9));
                                                              _push10(`</div>`);
                                                            } else {
                                                              return [
                                                                createVNode("div", { class: "p-2" }, [
                                                                  createVNode(_sfc_main$1, {
                                                                    center: true,
                                                                    justify: "between"
                                                                  }, {
                                                                    default: withCtx(() => [
                                                                      createVNode(_sfc_main$2, null, {
                                                                        default: withCtx(() => [
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
                                                                                  createVNode(_component_v_icon, { size: "small" }, {
                                                                                    default: withCtx(() => [
                                                                                      createTextVNode("mdi-drag")
                                                                                    ]),
                                                                                    _: 1
                                                                                  }),
                                                                                  createVNode("p", { class: "font-bold" }, toDisplayString(category.position) + "." + toDisplayString(element.position) + ". " + toDisplayString(element.title), 1)
                                                                                ]),
                                                                                _: 2
                                                                              }, 1024),
                                                                              createVNode(_component_v_btn, {
                                                                                onClick: withModifiers(($event) => legalParagraphModal.value.openParagraph("terms", category, element), ["prevent"]),
                                                                                variant: "outlined",
                                                                                size: "small"
                                                                              }, {
                                                                                default: withCtx(() => [
                                                                                  createTextVNode("Edit paragraph")
                                                                                ]),
                                                                                _: 2
                                                                              }, 1032, ["onClick"])
                                                                            ]),
                                                                            _: 2
                                                                          }, 1024),
                                                                          showParagraphContent.value ? (openBlock(), createBlock(_sfc_main$1, { key: 0 }, {
                                                                            default: withCtx(() => [
                                                                              createVNode(_component_v_icon, {
                                                                                size: "small",
                                                                                color: "transparent"
                                                                              }, {
                                                                                default: withCtx(() => [
                                                                                  createTextVNode("mdi-drag")
                                                                                ]),
                                                                                _: 1
                                                                              }),
                                                                              createVNode("p", {
                                                                                innerHTML: element.content_formatted
                                                                              }, null, 8, ["innerHTML"])
                                                                            ]),
                                                                            _: 2
                                                                          }, 1024)) : createCommentVNode("", true)
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
                                                        }, _parent9, _scopeId8));
                                                        _push9(`</div>`);
                                                      } else {
                                                        return [
                                                          createVNode("div", { class: "my-2" }, [
                                                            createVNode(_component_v_card, {
                                                              color: "white",
                                                              rounded: "lg"
                                                            }, {
                                                              default: withCtx(() => [
                                                                createVNode("div", { class: "p-2" }, [
                                                                  createVNode(_sfc_main$1, {
                                                                    center: true,
                                                                    justify: "between"
                                                                  }, {
                                                                    default: withCtx(() => [
                                                                      createVNode(_sfc_main$2, null, {
                                                                        default: withCtx(() => [
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
                                                                                  createVNode(_component_v_icon, { size: "small" }, {
                                                                                    default: withCtx(() => [
                                                                                      createTextVNode("mdi-drag")
                                                                                    ]),
                                                                                    _: 1
                                                                                  }),
                                                                                  createVNode("p", { class: "font-bold" }, toDisplayString(category.position) + "." + toDisplayString(element.position) + ". " + toDisplayString(element.title), 1)
                                                                                ]),
                                                                                _: 2
                                                                              }, 1024),
                                                                              createVNode(_component_v_btn, {
                                                                                onClick: withModifiers(($event) => legalParagraphModal.value.openParagraph("terms", category, element), ["prevent"]),
                                                                                variant: "outlined",
                                                                                size: "small"
                                                                              }, {
                                                                                default: withCtx(() => [
                                                                                  createTextVNode("Edit paragraph")
                                                                                ]),
                                                                                _: 2
                                                                              }, 1032, ["onClick"])
                                                                            ]),
                                                                            _: 2
                                                                          }, 1024),
                                                                          showParagraphContent.value ? (openBlock(), createBlock(_sfc_main$1, { key: 0 }, {
                                                                            default: withCtx(() => [
                                                                              createVNode(_component_v_icon, {
                                                                                size: "small",
                                                                                color: "transparent"
                                                                              }, {
                                                                                default: withCtx(() => [
                                                                                  createTextVNode("mdi-drag")
                                                                                ]),
                                                                                _: 1
                                                                              }),
                                                                              createVNode("p", {
                                                                                innerHTML: element.content_formatted
                                                                              }, null, 8, ["innerHTML"])
                                                                            ]),
                                                                            _: 2
                                                                          }, 1024)) : createCommentVNode("", true)
                                                                        ]),
                                                                        _: 2
                                                                      }, 1024)
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
                                                  }, _parent8, _scopeId7));
                                                  _push8(`<div${_scopeId7}>`);
                                                  _push8(ssrRenderComponent(_component_v_btn, {
                                                    onClick: ($event) => legalParagraphModal.value.openParagraph("terms", category),
                                                    size: "small"
                                                  }, {
                                                    default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                      if (_push9) {
                                                        _push9(`Create paragraph`);
                                                      } else {
                                                        return [
                                                          createTextVNode("Create paragraph")
                                                        ];
                                                      }
                                                    }),
                                                    _: 2
                                                  }, _parent8, _scopeId7));
                                                  _push8(`</div>`);
                                                } else {
                                                  return [
                                                    createVNode(_sfc_main$1, {
                                                      center: true,
                                                      justify: "between"
                                                    }, {
                                                      default: withCtx(() => [
                                                        createVNode("div", null, [
                                                          createVNode("p", { class: "text-xl" }, toDisplayString(category.position) + ". " + toDisplayString(category.title), 1)
                                                        ]),
                                                        createVNode("div", null, [
                                                          createVNode(_component_v_btn, {
                                                            variant: "outlined",
                                                            onClick: withModifiers(($event) => legalCategoryModal.value.openCategory("terms", category), ["prevent"]),
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
                                                    }, 1024),
                                                    createVNode(unref(draggable), {
                                                      list: category.paragraphs,
                                                      group: `paragraphs-${category.id}`,
                                                      sort: true,
                                                      "item-key": "id",
                                                      disabled: saving.value,
                                                      onEnd: notifyOrderChanged,
                                                      style: { "min-height": "50px" }
                                                    }, {
                                                      item: withCtx(({ element }) => [
                                                        createVNode("div", { class: "my-2" }, [
                                                          createVNode(_component_v_card, {
                                                            color: "white",
                                                            rounded: "lg"
                                                          }, {
                                                            default: withCtx(() => [
                                                              createVNode("div", { class: "p-2" }, [
                                                                createVNode(_sfc_main$1, {
                                                                  center: true,
                                                                  justify: "between"
                                                                }, {
                                                                  default: withCtx(() => [
                                                                    createVNode(_sfc_main$2, null, {
                                                                      default: withCtx(() => [
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
                                                                                createVNode(_component_v_icon, { size: "small" }, {
                                                                                  default: withCtx(() => [
                                                                                    createTextVNode("mdi-drag")
                                                                                  ]),
                                                                                  _: 1
                                                                                }),
                                                                                createVNode("p", { class: "font-bold" }, toDisplayString(category.position) + "." + toDisplayString(element.position) + ". " + toDisplayString(element.title), 1)
                                                                              ]),
                                                                              _: 2
                                                                            }, 1024),
                                                                            createVNode(_component_v_btn, {
                                                                              onClick: withModifiers(($event) => legalParagraphModal.value.openParagraph("terms", category, element), ["prevent"]),
                                                                              variant: "outlined",
                                                                              size: "small"
                                                                            }, {
                                                                              default: withCtx(() => [
                                                                                createTextVNode("Edit paragraph")
                                                                              ]),
                                                                              _: 2
                                                                            }, 1032, ["onClick"])
                                                                          ]),
                                                                          _: 2
                                                                        }, 1024),
                                                                        showParagraphContent.value ? (openBlock(), createBlock(_sfc_main$1, { key: 0 }, {
                                                                          default: withCtx(() => [
                                                                            createVNode(_component_v_icon, {
                                                                              size: "small",
                                                                              color: "transparent"
                                                                            }, {
                                                                              default: withCtx(() => [
                                                                                createTextVNode("mdi-drag")
                                                                              ]),
                                                                              _: 1
                                                                            }),
                                                                            createVNode("p", {
                                                                              innerHTML: element.content_formatted
                                                                            }, null, 8, ["innerHTML"])
                                                                          ]),
                                                                          _: 2
                                                                        }, 1024)) : createCommentVNode("", true)
                                                                      ]),
                                                                      _: 2
                                                                    }, 1024)
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
                                                    }, 1032, ["list", "group", "disabled"]),
                                                    createVNode("div", null, [
                                                      createVNode(_component_v_btn, {
                                                        onClick: withModifiers(($event) => legalParagraphModal.value.openParagraph("terms", category), ["prevent"]),
                                                        size: "small"
                                                      }, {
                                                        default: withCtx(() => [
                                                          createTextVNode("Create paragraph")
                                                        ]),
                                                        _: 2
                                                      }, 1032, ["onClick"])
                                                    ])
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent7, _scopeId6));
                                            _push7(`</div>`);
                                          } else {
                                            return [
                                              createVNode("div", { class: "p-4" }, [
                                                createVNode(_sfc_main$2, { gap: "2" }, {
                                                  default: withCtx(() => [
                                                    createVNode(_sfc_main$1, {
                                                      center: true,
                                                      justify: "between"
                                                    }, {
                                                      default: withCtx(() => [
                                                        createVNode("div", null, [
                                                          createVNode("p", { class: "text-xl" }, toDisplayString(category.position) + ". " + toDisplayString(category.title), 1)
                                                        ]),
                                                        createVNode("div", null, [
                                                          createVNode(_component_v_btn, {
                                                            variant: "outlined",
                                                            onClick: withModifiers(($event) => legalCategoryModal.value.openCategory("terms", category), ["prevent"]),
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
                                                    }, 1024),
                                                    createVNode(unref(draggable), {
                                                      list: category.paragraphs,
                                                      group: `paragraphs-${category.id}`,
                                                      sort: true,
                                                      "item-key": "id",
                                                      disabled: saving.value,
                                                      onEnd: notifyOrderChanged,
                                                      style: { "min-height": "50px" }
                                                    }, {
                                                      item: withCtx(({ element }) => [
                                                        createVNode("div", { class: "my-2" }, [
                                                          createVNode(_component_v_card, {
                                                            color: "white",
                                                            rounded: "lg"
                                                          }, {
                                                            default: withCtx(() => [
                                                              createVNode("div", { class: "p-2" }, [
                                                                createVNode(_sfc_main$1, {
                                                                  center: true,
                                                                  justify: "between"
                                                                }, {
                                                                  default: withCtx(() => [
                                                                    createVNode(_sfc_main$2, null, {
                                                                      default: withCtx(() => [
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
                                                                                createVNode(_component_v_icon, { size: "small" }, {
                                                                                  default: withCtx(() => [
                                                                                    createTextVNode("mdi-drag")
                                                                                  ]),
                                                                                  _: 1
                                                                                }),
                                                                                createVNode("p", { class: "font-bold" }, toDisplayString(category.position) + "." + toDisplayString(element.position) + ". " + toDisplayString(element.title), 1)
                                                                              ]),
                                                                              _: 2
                                                                            }, 1024),
                                                                            createVNode(_component_v_btn, {
                                                                              onClick: withModifiers(($event) => legalParagraphModal.value.openParagraph("terms", category, element), ["prevent"]),
                                                                              variant: "outlined",
                                                                              size: "small"
                                                                            }, {
                                                                              default: withCtx(() => [
                                                                                createTextVNode("Edit paragraph")
                                                                              ]),
                                                                              _: 2
                                                                            }, 1032, ["onClick"])
                                                                          ]),
                                                                          _: 2
                                                                        }, 1024),
                                                                        showParagraphContent.value ? (openBlock(), createBlock(_sfc_main$1, { key: 0 }, {
                                                                          default: withCtx(() => [
                                                                            createVNode(_component_v_icon, {
                                                                              size: "small",
                                                                              color: "transparent"
                                                                            }, {
                                                                              default: withCtx(() => [
                                                                                createTextVNode("mdi-drag")
                                                                              ]),
                                                                              _: 1
                                                                            }),
                                                                            createVNode("p", {
                                                                              innerHTML: element.content_formatted
                                                                            }, null, 8, ["innerHTML"])
                                                                          ]),
                                                                          _: 2
                                                                        }, 1024)) : createCommentVNode("", true)
                                                                      ]),
                                                                      _: 2
                                                                    }, 1024)
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
                                                    }, 1032, ["list", "group", "disabled"]),
                                                    createVNode("div", null, [
                                                      createVNode(_component_v_btn, {
                                                        onClick: withModifiers(($event) => legalParagraphModal.value.openParagraph("terms", category), ["prevent"]),
                                                        size: "small"
                                                      }, {
                                                        default: withCtx(() => [
                                                          createTextVNode("Create paragraph")
                                                        ]),
                                                        _: 2
                                                      }, 1032, ["onClick"])
                                                    ])
                                                  ]),
                                                  _: 2
                                                }, 1024)
                                              ])
                                            ];
                                          }
                                        }),
                                        _: 2
                                      }, _parent6, _scopeId5));
                                    });
                                    _push6(`<!--]-->`);
                                  } else {
                                    return [
                                      createVNode(_sfc_main$1, {
                                        center: true,
                                        justify: "between"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode("p", { class: "font-bold" }, "List of categories and paragraphs"),
                                          createVNode(_component_v_checkbox, {
                                            modelValue: showParagraphContent.value,
                                            "onUpdate:modelValue": ($event) => showParagraphContent.value = $event,
                                            label: "Show paragraphs",
                                            "hide-details": ""
                                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                        ]),
                                        _: 1
                                      }),
                                      (openBlock(true), createBlock(Fragment, null, renderList(categoryList.value, (category) => {
                                        return openBlock(), createBlock(_component_v_card, {
                                          color: "grey-lighten-3",
                                          rounded: "lg"
                                        }, {
                                          default: withCtx(() => [
                                            createVNode("div", { class: "p-4" }, [
                                              createVNode(_sfc_main$2, { gap: "2" }, {
                                                default: withCtx(() => [
                                                  createVNode(_sfc_main$1, {
                                                    center: true,
                                                    justify: "between"
                                                  }, {
                                                    default: withCtx(() => [
                                                      createVNode("div", null, [
                                                        createVNode("p", { class: "text-xl" }, toDisplayString(category.position) + ". " + toDisplayString(category.title), 1)
                                                      ]),
                                                      createVNode("div", null, [
                                                        createVNode(_component_v_btn, {
                                                          variant: "outlined",
                                                          onClick: withModifiers(($event) => legalCategoryModal.value.openCategory("terms", category), ["prevent"]),
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
                                                  }, 1024),
                                                  createVNode(unref(draggable), {
                                                    list: category.paragraphs,
                                                    group: `paragraphs-${category.id}`,
                                                    sort: true,
                                                    "item-key": "id",
                                                    disabled: saving.value,
                                                    onEnd: notifyOrderChanged,
                                                    style: { "min-height": "50px" }
                                                  }, {
                                                    item: withCtx(({ element }) => [
                                                      createVNode("div", { class: "my-2" }, [
                                                        createVNode(_component_v_card, {
                                                          color: "white",
                                                          rounded: "lg"
                                                        }, {
                                                          default: withCtx(() => [
                                                            createVNode("div", { class: "p-2" }, [
                                                              createVNode(_sfc_main$1, {
                                                                center: true,
                                                                justify: "between"
                                                              }, {
                                                                default: withCtx(() => [
                                                                  createVNode(_sfc_main$2, null, {
                                                                    default: withCtx(() => [
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
                                                                              createVNode(_component_v_icon, { size: "small" }, {
                                                                                default: withCtx(() => [
                                                                                  createTextVNode("mdi-drag")
                                                                                ]),
                                                                                _: 1
                                                                              }),
                                                                              createVNode("p", { class: "font-bold" }, toDisplayString(category.position) + "." + toDisplayString(element.position) + ". " + toDisplayString(element.title), 1)
                                                                            ]),
                                                                            _: 2
                                                                          }, 1024),
                                                                          createVNode(_component_v_btn, {
                                                                            onClick: withModifiers(($event) => legalParagraphModal.value.openParagraph("terms", category, element), ["prevent"]),
                                                                            variant: "outlined",
                                                                            size: "small"
                                                                          }, {
                                                                            default: withCtx(() => [
                                                                              createTextVNode("Edit paragraph")
                                                                            ]),
                                                                            _: 2
                                                                          }, 1032, ["onClick"])
                                                                        ]),
                                                                        _: 2
                                                                      }, 1024),
                                                                      showParagraphContent.value ? (openBlock(), createBlock(_sfc_main$1, { key: 0 }, {
                                                                        default: withCtx(() => [
                                                                          createVNode(_component_v_icon, {
                                                                            size: "small",
                                                                            color: "transparent"
                                                                          }, {
                                                                            default: withCtx(() => [
                                                                              createTextVNode("mdi-drag")
                                                                            ]),
                                                                            _: 1
                                                                          }),
                                                                          createVNode("p", {
                                                                            innerHTML: element.content_formatted
                                                                          }, null, 8, ["innerHTML"])
                                                                        ]),
                                                                        _: 2
                                                                      }, 1024)) : createCommentVNode("", true)
                                                                    ]),
                                                                    _: 2
                                                                  }, 1024)
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
                                                  }, 1032, ["list", "group", "disabled"]),
                                                  createVNode("div", null, [
                                                    createVNode(_component_v_btn, {
                                                      onClick: withModifiers(($event) => legalParagraphModal.value.openParagraph("terms", category), ["prevent"]),
                                                      size: "small"
                                                    }, {
                                                      default: withCtx(() => [
                                                        createTextVNode("Create paragraph")
                                                      ]),
                                                      _: 2
                                                    }, 1032, ["onClick"])
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
                              }, _parent5, _scopeId4));
                              _push5(`</div>`);
                            } else {
                              return [
                                createVNode("div", { class: "p-4" }, [
                                  createVNode(_sfc_main$2, { gap: "2" }, {
                                    default: withCtx(() => [
                                      createVNode(_sfc_main$1, {
                                        center: true,
                                        justify: "between"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode("p", { class: "font-bold" }, "List of categories and paragraphs"),
                                          createVNode(_component_v_checkbox, {
                                            modelValue: showParagraphContent.value,
                                            "onUpdate:modelValue": ($event) => showParagraphContent.value = $event,
                                            label: "Show paragraphs",
                                            "hide-details": ""
                                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                        ]),
                                        _: 1
                                      }),
                                      (openBlock(true), createBlock(Fragment, null, renderList(categoryList.value, (category) => {
                                        return openBlock(), createBlock(_component_v_card, {
                                          color: "grey-lighten-3",
                                          rounded: "lg"
                                        }, {
                                          default: withCtx(() => [
                                            createVNode("div", { class: "p-4" }, [
                                              createVNode(_sfc_main$2, { gap: "2" }, {
                                                default: withCtx(() => [
                                                  createVNode(_sfc_main$1, {
                                                    center: true,
                                                    justify: "between"
                                                  }, {
                                                    default: withCtx(() => [
                                                      createVNode("div", null, [
                                                        createVNode("p", { class: "text-xl" }, toDisplayString(category.position) + ". " + toDisplayString(category.title), 1)
                                                      ]),
                                                      createVNode("div", null, [
                                                        createVNode(_component_v_btn, {
                                                          variant: "outlined",
                                                          onClick: withModifiers(($event) => legalCategoryModal.value.openCategory("terms", category), ["prevent"]),
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
                                                  }, 1024),
                                                  createVNode(unref(draggable), {
                                                    list: category.paragraphs,
                                                    group: `paragraphs-${category.id}`,
                                                    sort: true,
                                                    "item-key": "id",
                                                    disabled: saving.value,
                                                    onEnd: notifyOrderChanged,
                                                    style: { "min-height": "50px" }
                                                  }, {
                                                    item: withCtx(({ element }) => [
                                                      createVNode("div", { class: "my-2" }, [
                                                        createVNode(_component_v_card, {
                                                          color: "white",
                                                          rounded: "lg"
                                                        }, {
                                                          default: withCtx(() => [
                                                            createVNode("div", { class: "p-2" }, [
                                                              createVNode(_sfc_main$1, {
                                                                center: true,
                                                                justify: "between"
                                                              }, {
                                                                default: withCtx(() => [
                                                                  createVNode(_sfc_main$2, null, {
                                                                    default: withCtx(() => [
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
                                                                              createVNode(_component_v_icon, { size: "small" }, {
                                                                                default: withCtx(() => [
                                                                                  createTextVNode("mdi-drag")
                                                                                ]),
                                                                                _: 1
                                                                              }),
                                                                              createVNode("p", { class: "font-bold" }, toDisplayString(category.position) + "." + toDisplayString(element.position) + ". " + toDisplayString(element.title), 1)
                                                                            ]),
                                                                            _: 2
                                                                          }, 1024),
                                                                          createVNode(_component_v_btn, {
                                                                            onClick: withModifiers(($event) => legalParagraphModal.value.openParagraph("terms", category, element), ["prevent"]),
                                                                            variant: "outlined",
                                                                            size: "small"
                                                                          }, {
                                                                            default: withCtx(() => [
                                                                              createTextVNode("Edit paragraph")
                                                                            ]),
                                                                            _: 2
                                                                          }, 1032, ["onClick"])
                                                                        ]),
                                                                        _: 2
                                                                      }, 1024),
                                                                      showParagraphContent.value ? (openBlock(), createBlock(_sfc_main$1, { key: 0 }, {
                                                                        default: withCtx(() => [
                                                                          createVNode(_component_v_icon, {
                                                                            size: "small",
                                                                            color: "transparent"
                                                                          }, {
                                                                            default: withCtx(() => [
                                                                              createTextVNode("mdi-drag")
                                                                            ]),
                                                                            _: 1
                                                                          }),
                                                                          createVNode("p", {
                                                                            innerHTML: element.content_formatted
                                                                          }, null, 8, ["innerHTML"])
                                                                        ]),
                                                                        _: 2
                                                                      }, 1024)) : createCommentVNode("", true)
                                                                    ]),
                                                                    _: 2
                                                                  }, 1024)
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
                                                  }, 1032, ["list", "group", "disabled"]),
                                                  createVNode("div", null, [
                                                    createVNode(_component_v_btn, {
                                                      onClick: withModifiers(($event) => legalParagraphModal.value.openParagraph("terms", category), ["prevent"]),
                                                      size: "small"
                                                    }, {
                                                      default: withCtx(() => [
                                                        createTextVNode("Create paragraph")
                                                      ]),
                                                      _: 2
                                                    }, 1032, ["onClick"])
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
                                ])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_v_card, {
                            color: "white",
                            rounded: "lg"
                          }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "p-4" }, [
                                createVNode(_sfc_main$2, { gap: "2" }, {
                                  default: withCtx(() => [
                                    createVNode(_sfc_main$1, {
                                      center: true,
                                      justify: "between"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode("p", { class: "font-bold" }, "List of categories and paragraphs"),
                                        createVNode(_component_v_checkbox, {
                                          modelValue: showParagraphContent.value,
                                          "onUpdate:modelValue": ($event) => showParagraphContent.value = $event,
                                          label: "Show paragraphs",
                                          "hide-details": ""
                                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                      ]),
                                      _: 1
                                    }),
                                    (openBlock(true), createBlock(Fragment, null, renderList(categoryList.value, (category) => {
                                      return openBlock(), createBlock(_component_v_card, {
                                        color: "grey-lighten-3",
                                        rounded: "lg"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode("div", { class: "p-4" }, [
                                            createVNode(_sfc_main$2, { gap: "2" }, {
                                              default: withCtx(() => [
                                                createVNode(_sfc_main$1, {
                                                  center: true,
                                                  justify: "between"
                                                }, {
                                                  default: withCtx(() => [
                                                    createVNode("div", null, [
                                                      createVNode("p", { class: "text-xl" }, toDisplayString(category.position) + ". " + toDisplayString(category.title), 1)
                                                    ]),
                                                    createVNode("div", null, [
                                                      createVNode(_component_v_btn, {
                                                        variant: "outlined",
                                                        onClick: withModifiers(($event) => legalCategoryModal.value.openCategory("terms", category), ["prevent"]),
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
                                                }, 1024),
                                                createVNode(unref(draggable), {
                                                  list: category.paragraphs,
                                                  group: `paragraphs-${category.id}`,
                                                  sort: true,
                                                  "item-key": "id",
                                                  disabled: saving.value,
                                                  onEnd: notifyOrderChanged,
                                                  style: { "min-height": "50px" }
                                                }, {
                                                  item: withCtx(({ element }) => [
                                                    createVNode("div", { class: "my-2" }, [
                                                      createVNode(_component_v_card, {
                                                        color: "white",
                                                        rounded: "lg"
                                                      }, {
                                                        default: withCtx(() => [
                                                          createVNode("div", { class: "p-2" }, [
                                                            createVNode(_sfc_main$1, {
                                                              center: true,
                                                              justify: "between"
                                                            }, {
                                                              default: withCtx(() => [
                                                                createVNode(_sfc_main$2, null, {
                                                                  default: withCtx(() => [
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
                                                                            createVNode(_component_v_icon, { size: "small" }, {
                                                                              default: withCtx(() => [
                                                                                createTextVNode("mdi-drag")
                                                                              ]),
                                                                              _: 1
                                                                            }),
                                                                            createVNode("p", { class: "font-bold" }, toDisplayString(category.position) + "." + toDisplayString(element.position) + ". " + toDisplayString(element.title), 1)
                                                                          ]),
                                                                          _: 2
                                                                        }, 1024),
                                                                        createVNode(_component_v_btn, {
                                                                          onClick: withModifiers(($event) => legalParagraphModal.value.openParagraph("terms", category, element), ["prevent"]),
                                                                          variant: "outlined",
                                                                          size: "small"
                                                                        }, {
                                                                          default: withCtx(() => [
                                                                            createTextVNode("Edit paragraph")
                                                                          ]),
                                                                          _: 2
                                                                        }, 1032, ["onClick"])
                                                                      ]),
                                                                      _: 2
                                                                    }, 1024),
                                                                    showParagraphContent.value ? (openBlock(), createBlock(_sfc_main$1, { key: 0 }, {
                                                                      default: withCtx(() => [
                                                                        createVNode(_component_v_icon, {
                                                                          size: "small",
                                                                          color: "transparent"
                                                                        }, {
                                                                          default: withCtx(() => [
                                                                            createTextVNode("mdi-drag")
                                                                          ]),
                                                                          _: 1
                                                                        }),
                                                                        createVNode("p", {
                                                                          innerHTML: element.content_formatted
                                                                        }, null, 8, ["innerHTML"])
                                                                      ]),
                                                                      _: 2
                                                                    }, 1024)) : createCommentVNode("", true)
                                                                  ]),
                                                                  _: 2
                                                                }, 1024)
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
                                                }, 1032, ["list", "group", "disabled"]),
                                                createVNode("div", null, [
                                                  createVNode(_component_v_btn, {
                                                    onClick: withModifiers(($event) => legalParagraphModal.value.openParagraph("terms", category), ["prevent"]),
                                                    size: "small"
                                                  }, {
                                                    default: withCtx(() => [
                                                      createTextVNode("Create paragraph")
                                                    ]),
                                                    _: 2
                                                  }, 1032, ["onClick"])
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
                              ])
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div><div class="shrink-0 w-[400px]"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$2, { gap: "4" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_v_card, {
                          color: "grey-lighten-3",
                          rounded: "lg"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<div class="p-4"${_scopeId4}><p class="font-bold"${_scopeId4}>Reorder categories</p>`);
                              _push5(ssrRenderComponent(_sfc_main$2, { gap: "2" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(draggable), {
                                      list: categoryList.value,
                                      group: `categories`,
                                      sort: true,
                                      "item-key": "id",
                                      disabled: saving.value,
                                      onEnd: notifyOrderChanged,
                                      style: { "min-height": "50px" }
                                    }, {
                                      item: withCtx(({ element }, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`<div class="my-2"${_scopeId6}>`);
                                          _push7(ssrRenderComponent(_component_v_card, { rounded: "lg" }, {
                                            default: withCtx((_6, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(`<div class="p-2"${_scopeId7}>`);
                                                _push8(ssrRenderComponent(_sfc_main$1, {
                                                  center: true,
                                                  justify: "start",
                                                  gap: "1"
                                                }, {
                                                  default: withCtx((_7, _push9, _parent9, _scopeId8) => {
                                                    if (_push9) {
                                                      _push9(ssrRenderComponent(_component_v_icon, { size: "small" }, {
                                                        default: withCtx((_8, _push10, _parent10, _scopeId9) => {
                                                          if (_push10) {
                                                            _push10(`mdi-drag`);
                                                          } else {
                                                            return [
                                                              createTextVNode("mdi-drag")
                                                            ];
                                                          }
                                                        }),
                                                        _: 2
                                                      }, _parent9, _scopeId8));
                                                      _push9(`<p class="text-sm"${_scopeId8}>${ssrInterpolate(element.title)}</p>`);
                                                    } else {
                                                      return [
                                                        createVNode(_component_v_icon, { size: "small" }, {
                                                          default: withCtx(() => [
                                                            createTextVNode("mdi-drag")
                                                          ]),
                                                          _: 1
                                                        }),
                                                        createVNode("p", { class: "text-sm" }, toDisplayString(element.title), 1)
                                                      ];
                                                    }
                                                  }),
                                                  _: 2
                                                }, _parent8, _scopeId7));
                                                _push8(`</div>`);
                                              } else {
                                                return [
                                                  createVNode("div", { class: "p-2" }, [
                                                    createVNode(_sfc_main$1, {
                                                      center: true,
                                                      justify: "start",
                                                      gap: "1"
                                                    }, {
                                                      default: withCtx(() => [
                                                        createVNode(_component_v_icon, { size: "small" }, {
                                                          default: withCtx(() => [
                                                            createTextVNode("mdi-drag")
                                                          ]),
                                                          _: 1
                                                        }),
                                                        createVNode("p", { class: "text-sm" }, toDisplayString(element.title), 1)
                                                      ]),
                                                      _: 2
                                                    }, 1024)
                                                  ])
                                                ];
                                              }
                                            }),
                                            _: 2
                                          }, _parent7, _scopeId6));
                                          _push7(`</div>`);
                                        } else {
                                          return [
                                            createVNode("div", { class: "my-2" }, [
                                              createVNode(_component_v_card, { rounded: "lg" }, {
                                                default: withCtx(() => [
                                                  createVNode("div", { class: "p-2" }, [
                                                    createVNode(_sfc_main$1, {
                                                      center: true,
                                                      justify: "start",
                                                      gap: "1"
                                                    }, {
                                                      default: withCtx(() => [
                                                        createVNode(_component_v_icon, { size: "small" }, {
                                                          default: withCtx(() => [
                                                            createTextVNode("mdi-drag")
                                                          ]),
                                                          _: 1
                                                        }),
                                                        createVNode("p", { class: "text-sm" }, toDisplayString(element.title), 1)
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
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(unref(draggable), {
                                        list: categoryList.value,
                                        group: `categories`,
                                        sort: true,
                                        "item-key": "id",
                                        disabled: saving.value,
                                        onEnd: notifyOrderChanged,
                                        style: { "min-height": "50px" }
                                      }, {
                                        item: withCtx(({ element }) => [
                                          createVNode("div", { class: "my-2" }, [
                                            createVNode(_component_v_card, { rounded: "lg" }, {
                                              default: withCtx(() => [
                                                createVNode("div", { class: "p-2" }, [
                                                  createVNode(_sfc_main$1, {
                                                    center: true,
                                                    justify: "start",
                                                    gap: "1"
                                                  }, {
                                                    default: withCtx(() => [
                                                      createVNode(_component_v_icon, { size: "small" }, {
                                                        default: withCtx(() => [
                                                          createTextVNode("mdi-drag")
                                                        ]),
                                                        _: 1
                                                      }),
                                                      createVNode("p", { class: "text-sm" }, toDisplayString(element.title), 1)
                                                    ]),
                                                    _: 2
                                                  }, 1024)
                                                ])
                                              ]),
                                              _: 2
                                            }, 1024)
                                          ])
                                        ]),
                                        _: 1
                                      }, 8, ["list", "disabled"])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(`</div>`);
                            } else {
                              return [
                                createVNode("div", { class: "p-4" }, [
                                  createVNode("p", { class: "font-bold" }, "Reorder categories"),
                                  createVNode(_sfc_main$2, { gap: "2" }, {
                                    default: withCtx(() => [
                                      createVNode(unref(draggable), {
                                        list: categoryList.value,
                                        group: `categories`,
                                        sort: true,
                                        "item-key": "id",
                                        disabled: saving.value,
                                        onEnd: notifyOrderChanged,
                                        style: { "min-height": "50px" }
                                      }, {
                                        item: withCtx(({ element }) => [
                                          createVNode("div", { class: "my-2" }, [
                                            createVNode(_component_v_card, { rounded: "lg" }, {
                                              default: withCtx(() => [
                                                createVNode("div", { class: "p-2" }, [
                                                  createVNode(_sfc_main$1, {
                                                    center: true,
                                                    justify: "start",
                                                    gap: "1"
                                                  }, {
                                                    default: withCtx(() => [
                                                      createVNode(_component_v_icon, { size: "small" }, {
                                                        default: withCtx(() => [
                                                          createTextVNode("mdi-drag")
                                                        ]),
                                                        _: 1
                                                      }),
                                                      createVNode("p", { class: "text-sm" }, toDisplayString(element.title), 1)
                                                    ]),
                                                    _: 2
                                                  }, 1024)
                                                ])
                                              ]),
                                              _: 2
                                            }, 1024)
                                          ])
                                        ]),
                                        _: 1
                                      }, 8, ["list", "disabled"])
                                    ]),
                                    _: 1
                                  })
                                ])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_v_card, {
                            color: "grey-lighten-3",
                            rounded: "lg"
                          }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "p-4" }, [
                                createVNode("p", { class: "font-bold" }, "Reorder categories"),
                                createVNode(_sfc_main$2, { gap: "2" }, {
                                  default: withCtx(() => [
                                    createVNode(unref(draggable), {
                                      list: categoryList.value,
                                      group: `categories`,
                                      sort: true,
                                      "item-key": "id",
                                      disabled: saving.value,
                                      onEnd: notifyOrderChanged,
                                      style: { "min-height": "50px" }
                                    }, {
                                      item: withCtx(({ element }) => [
                                        createVNode("div", { class: "my-2" }, [
                                          createVNode(_component_v_card, { rounded: "lg" }, {
                                            default: withCtx(() => [
                                              createVNode("div", { class: "p-2" }, [
                                                createVNode(_sfc_main$1, {
                                                  center: true,
                                                  justify: "start",
                                                  gap: "1"
                                                }, {
                                                  default: withCtx(() => [
                                                    createVNode(_component_v_icon, { size: "small" }, {
                                                      default: withCtx(() => [
                                                        createTextVNode("mdi-drag")
                                                      ]),
                                                      _: 1
                                                    }),
                                                    createVNode("p", { class: "text-sm" }, toDisplayString(element.title), 1)
                                                  ]),
                                                  _: 2
                                                }, 1024)
                                              ])
                                            ]),
                                            _: 2
                                          }, 1024)
                                        ])
                                      ]),
                                      _: 1
                                    }, 8, ["list", "disabled"])
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
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "grow" }, [
                      createVNode(_sfc_main$2, { gap: "4" }, {
                        default: withCtx(() => [
                          createVNode(_component_v_card, {
                            color: "white",
                            rounded: "lg"
                          }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "p-4" }, [
                                createVNode(_sfc_main$2, { gap: "2" }, {
                                  default: withCtx(() => [
                                    createVNode(_sfc_main$1, {
                                      center: true,
                                      justify: "between"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode("p", { class: "font-bold" }, "List of categories and paragraphs"),
                                        createVNode(_component_v_checkbox, {
                                          modelValue: showParagraphContent.value,
                                          "onUpdate:modelValue": ($event) => showParagraphContent.value = $event,
                                          label: "Show paragraphs",
                                          "hide-details": ""
                                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                      ]),
                                      _: 1
                                    }),
                                    (openBlock(true), createBlock(Fragment, null, renderList(categoryList.value, (category) => {
                                      return openBlock(), createBlock(_component_v_card, {
                                        color: "grey-lighten-3",
                                        rounded: "lg"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode("div", { class: "p-4" }, [
                                            createVNode(_sfc_main$2, { gap: "2" }, {
                                              default: withCtx(() => [
                                                createVNode(_sfc_main$1, {
                                                  center: true,
                                                  justify: "between"
                                                }, {
                                                  default: withCtx(() => [
                                                    createVNode("div", null, [
                                                      createVNode("p", { class: "text-xl" }, toDisplayString(category.position) + ". " + toDisplayString(category.title), 1)
                                                    ]),
                                                    createVNode("div", null, [
                                                      createVNode(_component_v_btn, {
                                                        variant: "outlined",
                                                        onClick: withModifiers(($event) => legalCategoryModal.value.openCategory("terms", category), ["prevent"]),
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
                                                }, 1024),
                                                createVNode(unref(draggable), {
                                                  list: category.paragraphs,
                                                  group: `paragraphs-${category.id}`,
                                                  sort: true,
                                                  "item-key": "id",
                                                  disabled: saving.value,
                                                  onEnd: notifyOrderChanged,
                                                  style: { "min-height": "50px" }
                                                }, {
                                                  item: withCtx(({ element }) => [
                                                    createVNode("div", { class: "my-2" }, [
                                                      createVNode(_component_v_card, {
                                                        color: "white",
                                                        rounded: "lg"
                                                      }, {
                                                        default: withCtx(() => [
                                                          createVNode("div", { class: "p-2" }, [
                                                            createVNode(_sfc_main$1, {
                                                              center: true,
                                                              justify: "between"
                                                            }, {
                                                              default: withCtx(() => [
                                                                createVNode(_sfc_main$2, null, {
                                                                  default: withCtx(() => [
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
                                                                            createVNode(_component_v_icon, { size: "small" }, {
                                                                              default: withCtx(() => [
                                                                                createTextVNode("mdi-drag")
                                                                              ]),
                                                                              _: 1
                                                                            }),
                                                                            createVNode("p", { class: "font-bold" }, toDisplayString(category.position) + "." + toDisplayString(element.position) + ". " + toDisplayString(element.title), 1)
                                                                          ]),
                                                                          _: 2
                                                                        }, 1024),
                                                                        createVNode(_component_v_btn, {
                                                                          onClick: withModifiers(($event) => legalParagraphModal.value.openParagraph("terms", category, element), ["prevent"]),
                                                                          variant: "outlined",
                                                                          size: "small"
                                                                        }, {
                                                                          default: withCtx(() => [
                                                                            createTextVNode("Edit paragraph")
                                                                          ]),
                                                                          _: 2
                                                                        }, 1032, ["onClick"])
                                                                      ]),
                                                                      _: 2
                                                                    }, 1024),
                                                                    showParagraphContent.value ? (openBlock(), createBlock(_sfc_main$1, { key: 0 }, {
                                                                      default: withCtx(() => [
                                                                        createVNode(_component_v_icon, {
                                                                          size: "small",
                                                                          color: "transparent"
                                                                        }, {
                                                                          default: withCtx(() => [
                                                                            createTextVNode("mdi-drag")
                                                                          ]),
                                                                          _: 1
                                                                        }),
                                                                        createVNode("p", {
                                                                          innerHTML: element.content_formatted
                                                                        }, null, 8, ["innerHTML"])
                                                                      ]),
                                                                      _: 2
                                                                    }, 1024)) : createCommentVNode("", true)
                                                                  ]),
                                                                  _: 2
                                                                }, 1024)
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
                                                }, 1032, ["list", "group", "disabled"]),
                                                createVNode("div", null, [
                                                  createVNode(_component_v_btn, {
                                                    onClick: withModifiers(($event) => legalParagraphModal.value.openParagraph("terms", category), ["prevent"]),
                                                    size: "small"
                                                  }, {
                                                    default: withCtx(() => [
                                                      createTextVNode("Create paragraph")
                                                    ]),
                                                    _: 2
                                                  }, 1032, ["onClick"])
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
                              ])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ]),
                    createVNode("div", { class: "shrink-0 w-[400px]" }, [
                      createVNode(_sfc_main$2, { gap: "4" }, {
                        default: withCtx(() => [
                          createVNode(_component_v_card, {
                            color: "grey-lighten-3",
                            rounded: "lg"
                          }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "p-4" }, [
                                createVNode("p", { class: "font-bold" }, "Reorder categories"),
                                createVNode(_sfc_main$2, { gap: "2" }, {
                                  default: withCtx(() => [
                                    createVNode(unref(draggable), {
                                      list: categoryList.value,
                                      group: `categories`,
                                      sort: true,
                                      "item-key": "id",
                                      disabled: saving.value,
                                      onEnd: notifyOrderChanged,
                                      style: { "min-height": "50px" }
                                    }, {
                                      item: withCtx(({ element }) => [
                                        createVNode("div", { class: "my-2" }, [
                                          createVNode(_component_v_card, { rounded: "lg" }, {
                                            default: withCtx(() => [
                                              createVNode("div", { class: "p-2" }, [
                                                createVNode(_sfc_main$1, {
                                                  center: true,
                                                  justify: "start",
                                                  gap: "1"
                                                }, {
                                                  default: withCtx(() => [
                                                    createVNode(_component_v_icon, { size: "small" }, {
                                                      default: withCtx(() => [
                                                        createTextVNode("mdi-drag")
                                                      ]),
                                                      _: 1
                                                    }),
                                                    createVNode("p", { class: "text-sm" }, toDisplayString(element.title), 1)
                                                  ]),
                                                  _: 2
                                                }, 1024)
                                              ])
                                            ]),
                                            _: 2
                                          }, 1024)
                                        ])
                                      ]),
                                      _: 1
                                    }, 8, ["list", "disabled"])
                                  ]),
                                  _: 1
                                })
                              ])
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
            _push2(`</div>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              ref_key: "legalCategoryModal",
              ref: legalCategoryModal,
              onComplete: initLists,
              errors: props.errors
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, {
              ref_key: "legalParagraphModal",
              ref: legalParagraphModal,
              onComplete: initLists,
              errors: props.errors
            }, null, _parent2, _scopeId));
            if (orderChanged.value) {
              _push2(`<div class="fixed z-50 bottom-10 right-10"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_v_btn, {
                onClick: saveOrder,
                color: "red",
                disabled: saving.value
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`Save order`);
                  } else {
                    return [
                      createTextVNode("Save order")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode(_sfc_main$1, {
                center: true,
                justify: "start"
              }, {
                default: withCtx(() => [
                  createVNode(_component_v_btn, {
                    variant: "outlined",
                    onClick: withModifiers(($event) => _ctx.$inertia.visit(_ctx.route("admin.legal_content")), ["prevent"])
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Close")
                    ]),
                    _: 1
                  }, 8, ["onClick"]),
                  createVNode(_component_v_btn, {
                    onClick: withModifiers(($event) => legalCategoryModal.value.openCategory("terms"), ["prevent"])
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Create category")
                    ]),
                    _: 1
                  }, 8, ["onClick"])
                ]),
                _: 1
              }),
              createVNode("div", { class: "py-4" }, [
                createVNode(_sfc_main$1, null, {
                  default: withCtx(() => [
                    createVNode("div", { class: "grow" }, [
                      createVNode(_sfc_main$2, { gap: "4" }, {
                        default: withCtx(() => [
                          createVNode(_component_v_card, {
                            color: "white",
                            rounded: "lg"
                          }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "p-4" }, [
                                createVNode(_sfc_main$2, { gap: "2" }, {
                                  default: withCtx(() => [
                                    createVNode(_sfc_main$1, {
                                      center: true,
                                      justify: "between"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode("p", { class: "font-bold" }, "List of categories and paragraphs"),
                                        createVNode(_component_v_checkbox, {
                                          modelValue: showParagraphContent.value,
                                          "onUpdate:modelValue": ($event) => showParagraphContent.value = $event,
                                          label: "Show paragraphs",
                                          "hide-details": ""
                                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                      ]),
                                      _: 1
                                    }),
                                    (openBlock(true), createBlock(Fragment, null, renderList(categoryList.value, (category) => {
                                      return openBlock(), createBlock(_component_v_card, {
                                        color: "grey-lighten-3",
                                        rounded: "lg"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode("div", { class: "p-4" }, [
                                            createVNode(_sfc_main$2, { gap: "2" }, {
                                              default: withCtx(() => [
                                                createVNode(_sfc_main$1, {
                                                  center: true,
                                                  justify: "between"
                                                }, {
                                                  default: withCtx(() => [
                                                    createVNode("div", null, [
                                                      createVNode("p", { class: "text-xl" }, toDisplayString(category.position) + ". " + toDisplayString(category.title), 1)
                                                    ]),
                                                    createVNode("div", null, [
                                                      createVNode(_component_v_btn, {
                                                        variant: "outlined",
                                                        onClick: withModifiers(($event) => legalCategoryModal.value.openCategory("terms", category), ["prevent"]),
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
                                                }, 1024),
                                                createVNode(unref(draggable), {
                                                  list: category.paragraphs,
                                                  group: `paragraphs-${category.id}`,
                                                  sort: true,
                                                  "item-key": "id",
                                                  disabled: saving.value,
                                                  onEnd: notifyOrderChanged,
                                                  style: { "min-height": "50px" }
                                                }, {
                                                  item: withCtx(({ element }) => [
                                                    createVNode("div", { class: "my-2" }, [
                                                      createVNode(_component_v_card, {
                                                        color: "white",
                                                        rounded: "lg"
                                                      }, {
                                                        default: withCtx(() => [
                                                          createVNode("div", { class: "p-2" }, [
                                                            createVNode(_sfc_main$1, {
                                                              center: true,
                                                              justify: "between"
                                                            }, {
                                                              default: withCtx(() => [
                                                                createVNode(_sfc_main$2, null, {
                                                                  default: withCtx(() => [
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
                                                                            createVNode(_component_v_icon, { size: "small" }, {
                                                                              default: withCtx(() => [
                                                                                createTextVNode("mdi-drag")
                                                                              ]),
                                                                              _: 1
                                                                            }),
                                                                            createVNode("p", { class: "font-bold" }, toDisplayString(category.position) + "." + toDisplayString(element.position) + ". " + toDisplayString(element.title), 1)
                                                                          ]),
                                                                          _: 2
                                                                        }, 1024),
                                                                        createVNode(_component_v_btn, {
                                                                          onClick: withModifiers(($event) => legalParagraphModal.value.openParagraph("terms", category, element), ["prevent"]),
                                                                          variant: "outlined",
                                                                          size: "small"
                                                                        }, {
                                                                          default: withCtx(() => [
                                                                            createTextVNode("Edit paragraph")
                                                                          ]),
                                                                          _: 2
                                                                        }, 1032, ["onClick"])
                                                                      ]),
                                                                      _: 2
                                                                    }, 1024),
                                                                    showParagraphContent.value ? (openBlock(), createBlock(_sfc_main$1, { key: 0 }, {
                                                                      default: withCtx(() => [
                                                                        createVNode(_component_v_icon, {
                                                                          size: "small",
                                                                          color: "transparent"
                                                                        }, {
                                                                          default: withCtx(() => [
                                                                            createTextVNode("mdi-drag")
                                                                          ]),
                                                                          _: 1
                                                                        }),
                                                                        createVNode("p", {
                                                                          innerHTML: element.content_formatted
                                                                        }, null, 8, ["innerHTML"])
                                                                      ]),
                                                                      _: 2
                                                                    }, 1024)) : createCommentVNode("", true)
                                                                  ]),
                                                                  _: 2
                                                                }, 1024)
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
                                                }, 1032, ["list", "group", "disabled"]),
                                                createVNode("div", null, [
                                                  createVNode(_component_v_btn, {
                                                    onClick: withModifiers(($event) => legalParagraphModal.value.openParagraph("terms", category), ["prevent"]),
                                                    size: "small"
                                                  }, {
                                                    default: withCtx(() => [
                                                      createTextVNode("Create paragraph")
                                                    ]),
                                                    _: 2
                                                  }, 1032, ["onClick"])
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
                              ])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ]),
                    createVNode("div", { class: "shrink-0 w-[400px]" }, [
                      createVNode(_sfc_main$2, { gap: "4" }, {
                        default: withCtx(() => [
                          createVNode(_component_v_card, {
                            color: "grey-lighten-3",
                            rounded: "lg"
                          }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "p-4" }, [
                                createVNode("p", { class: "font-bold" }, "Reorder categories"),
                                createVNode(_sfc_main$2, { gap: "2" }, {
                                  default: withCtx(() => [
                                    createVNode(unref(draggable), {
                                      list: categoryList.value,
                                      group: `categories`,
                                      sort: true,
                                      "item-key": "id",
                                      disabled: saving.value,
                                      onEnd: notifyOrderChanged,
                                      style: { "min-height": "50px" }
                                    }, {
                                      item: withCtx(({ element }) => [
                                        createVNode("div", { class: "my-2" }, [
                                          createVNode(_component_v_card, { rounded: "lg" }, {
                                            default: withCtx(() => [
                                              createVNode("div", { class: "p-2" }, [
                                                createVNode(_sfc_main$1, {
                                                  center: true,
                                                  justify: "start",
                                                  gap: "1"
                                                }, {
                                                  default: withCtx(() => [
                                                    createVNode(_component_v_icon, { size: "small" }, {
                                                      default: withCtx(() => [
                                                        createTextVNode("mdi-drag")
                                                      ]),
                                                      _: 1
                                                    }),
                                                    createVNode("p", { class: "text-sm" }, toDisplayString(element.title), 1)
                                                  ]),
                                                  _: 2
                                                }, 1024)
                                              ])
                                            ]),
                                            _: 2
                                          }, 1024)
                                        ])
                                      ]),
                                      _: 1
                                    }, 8, ["list", "disabled"])
                                  ]),
                                  _: 1
                                })
                              ])
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
              ]),
              createVNode(_sfc_main$3, {
                ref_key: "legalCategoryModal",
                ref: legalCategoryModal,
                onComplete: initLists,
                errors: props.errors
              }, null, 8, ["errors"]),
              createVNode(_sfc_main$4, {
                ref_key: "legalParagraphModal",
                ref: legalParagraphModal,
                onComplete: initLists,
                errors: props.errors
              }, null, 8, ["errors"]),
              orderChanged.value ? (openBlock(), createBlock("div", {
                key: 0,
                class: "fixed z-50 bottom-10 right-10"
              }, [
                createVNode(_component_v_btn, {
                  onClick: withModifiers(saveOrder, ["prevent"]),
                  color: "red",
                  disabled: saving.value
                }, {
                  default: withCtx(() => [
                    createTextVNode("Save order")
                  ]),
                  _: 1
                }, 8, ["disabled"])
              ])) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Content/Terms.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
