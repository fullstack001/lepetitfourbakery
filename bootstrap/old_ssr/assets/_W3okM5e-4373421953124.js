import { ref, reactive, resolveComponent, mergeProps, withCtx, createTextVNode, toDisplayString, createVNode, useSSRContext, nextTick } from "vue";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { _ as _sfc_main$2 } from "./BFeg_3wS-5313717233245.js";
import { _ as _sfc_main$4 } from "./DsvTyKEu-3355343127127.js";
import { _ as _sfc_main$5 } from "./CeVcRmCk-1453137522733.js";
import { router } from "@inertiajs/vue3";
import { _ as _sfc_main$3 } from "./Cyl_ukyB-3352317127354.js";
const _sfc_main$1 = {
  __name: "LegalCategoryModal",
  __ssrInlineRender: true,
  props: {
    errors: Object
  },
  emits: ["complete"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const showCategoryModal = ref(false);
    const selectedCategory = ref(null);
    const modalTitle = ref(null);
    const saveButtonText = ref(null);
    const titleInput = ref(null);
    const selectedType = ref("");
    const formCategory = reactive({});
    const openCategory = (type, category = null) => {
      local_errors.value = {};
      selectedType.value = type;
      if (category) {
        modalTitle.value = `Edit ${type} category`;
        selectedCategory.value = category;
        formCategory.title = category.title;
      } else {
        modalTitle.value = `Create ${type} category`;
        selectedCategory.value = null;
        formCategory.title = "";
      }
      saveButtonText.value = "Save";
      showCategoryModal.value = true;
      nextTick(() => {
        titleInput.value.focus();
      });
    };
    const closeCategory = () => {
      showCategoryModal.value = false;
    };
    const local_errors = ref({});
    const saveCategory = () => {
      let url;
      if (selectedCategory.value) {
        url = route(`admin.update_${selectedType.value}_category`, { category: selectedCategory.value.id });
      } else {
        url = route(`admin.create_${selectedType.value}_category`);
      }
      router.post(url, formCategory, {
        preserveScroll: true,
        preserveState: true,
        onSuccess: (response) => {
          emit("complete");
          closeCategory();
        },
        onError: (error) => {
          local_errors.value = props.errors;
        }
      });
    };
    __expose({ openCategory });
    const emit = __emit;
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
                                    _push6(`Title`);
                                  } else {
                                    return [
                                      createTextVNode("Title")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_v_text_field, {
                                ref_key: "titleInput",
                                ref: titleInput,
                                modelValue: formCategory.title,
                                "onUpdate:modelValue": ($event) => formCategory.title = $event,
                                "error-messages": local_errors.value.title
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_v_label, null, {
                                  default: withCtx(() => [
                                    createTextVNode("Title")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_v_text_field, {
                                  ref_key: "titleInput",
                                  ref: titleInput,
                                  modelValue: formCategory.title,
                                  "onUpdate:modelValue": ($event) => formCategory.title = $event,
                                  "error-messages": local_errors.value.title
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
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
                                  createTextVNode("Title")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_v_text_field, {
                                ref_key: "titleInput",
                                ref: titleInput,
                                modelValue: formCategory.title,
                                "onUpdate:modelValue": ($event) => formCategory.title = $event,
                                "error-messages": local_errors.value.title
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
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
                                  createTextVNode("Title")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_v_text_field, {
                                ref_key: "titleInput",
                                ref: titleInput,
                                modelValue: formCategory.title,
                                "onUpdate:modelValue": ($event) => formCategory.title = $event,
                                "error-messages": local_errors.value.title
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
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
                                createTextVNode("Title")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_v_text_field, {
                              ref_key: "titleInput",
                              ref: titleInput,
                              modelValue: formCategory.title,
                              "onUpdate:modelValue": ($event) => formCategory.title = $event,
                              "error-messages": local_errors.value.title
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
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
                onClick: saveCategory,
                class: "me-3"
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(saveButtonText.value), 1)
                ]),
                _: 1
              }),
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Content/LegalCategoryModal.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "LegalParagraphModal",
  __ssrInlineRender: true,
  props: {
    errors: Object
  },
  emits: ["complete"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const showParagraphModal = ref(false);
    const selectedCategory = ref(null);
    const selectedParagraph = ref(null);
    const modalTitle = ref(null);
    const saveButtonText = ref(null);
    const titleInput = ref(null);
    const selectedType = ref("");
    const formParagraph = reactive({});
    const openParagraph = (type, category, paragraph = null) => {
      local_errors.value = {};
      selectedType.value = type;
      selectedCategory.value = category;
      formParagraph.category_id = category.id;
      if (paragraph) {
        modalTitle.value = `Edit ${type} paragraph`;
        selectedParagraph.value = paragraph;
        formParagraph.title = paragraph.title;
        formParagraph.content = paragraph.content;
      } else {
        modalTitle.value = `Create ${type} paragraph`;
        selectedParagraph.value = null;
        formParagraph.title = "";
        formParagraph.content = "";
      }
      saveButtonText.value = `Save paragraph`;
      showParagraphModal.value = true;
      nextTick(() => {
        titleInput.value.focus();
      });
    };
    const closeParagraph = () => {
      showParagraphModal.value = false;
    };
    const local_errors = ref({});
    const saveParagraph = () => {
      let url;
      if (selectedParagraph.value) {
        url = route(`admin.update_${selectedType.value}_paragraph`, { paragraph: selectedParagraph.value.id });
      } else {
        url = route(`admin.create_${selectedType.value}_paragraph`);
      }
      router.post(url, formParagraph, {
        preserveScroll: true,
        preserveState: true,
        onSuccess: (page) => {
          emit("complete");
          closeParagraph();
        },
        onError: (error) => {
          local_errors.value = props.errors;
        }
      });
    };
    __expose({ openParagraph });
    const emit = __emit;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_v_card = resolveComponent("v-card");
      const _component_v_label = resolveComponent("v-label");
      const _component_v_text_field = resolveComponent("v-text-field");
      const _component_v_textarea = resolveComponent("v-textarea");
      _push(ssrRenderComponent(_sfc_main$2, mergeProps({
        show: showParagraphModal.value,
        onClose: closeParagraph
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
                                    _push6(`Title`);
                                  } else {
                                    return [
                                      createTextVNode("Title")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_v_text_field, {
                                ref_key: "titleInput",
                                ref: titleInput,
                                "bg-color": "white",
                                modelValue: formParagraph.title,
                                "onUpdate:modelValue": ($event) => formParagraph.title = $event,
                                "error-messages": local_errors.value.title
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_v_label, null, {
                                  default: withCtx(() => [
                                    createTextVNode("Title")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_v_text_field, {
                                  ref_key: "titleInput",
                                  ref: titleInput,
                                  "bg-color": "white",
                                  modelValue: formParagraph.title,
                                  "onUpdate:modelValue": ($event) => formParagraph.title = $event,
                                  "error-messages": local_errors.value.title
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_sfc_main$3, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_v_label, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Content`);
                                  } else {
                                    return [
                                      createTextVNode("Content")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_v_textarea, {
                                "bg-color": "white",
                                modelValue: formParagraph.content,
                                "onUpdate:modelValue": ($event) => formParagraph.content = $event,
                                "error-messages": local_errors.value.content,
                                "auto-grow": "",
                                rows: "2"
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_v_label, null, {
                                  default: withCtx(() => [
                                    createTextVNode("Content")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_v_textarea, {
                                  "bg-color": "white",
                                  modelValue: formParagraph.content,
                                  "onUpdate:modelValue": ($event) => formParagraph.content = $event,
                                  "error-messages": local_errors.value.content,
                                  "auto-grow": "",
                                  rows: "2"
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
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
                                  createTextVNode("Title")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_v_text_field, {
                                ref_key: "titleInput",
                                ref: titleInput,
                                "bg-color": "white",
                                modelValue: formParagraph.title,
                                "onUpdate:modelValue": ($event) => formParagraph.title = $event,
                                "error-messages": local_errors.value.title
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                            ]),
                            _: 1
                          }),
                          createVNode(_sfc_main$3, null, {
                            default: withCtx(() => [
                              createVNode(_component_v_label, null, {
                                default: withCtx(() => [
                                  createTextVNode("Content")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_v_textarea, {
                                "bg-color": "white",
                                modelValue: formParagraph.content,
                                "onUpdate:modelValue": ($event) => formParagraph.content = $event,
                                "error-messages": local_errors.value.content,
                                "auto-grow": "",
                                rows: "2"
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
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
                                  createTextVNode("Title")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_v_text_field, {
                                ref_key: "titleInput",
                                ref: titleInput,
                                "bg-color": "white",
                                modelValue: formParagraph.title,
                                "onUpdate:modelValue": ($event) => formParagraph.title = $event,
                                "error-messages": local_errors.value.title
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                            ]),
                            _: 1
                          }),
                          createVNode(_sfc_main$3, null, {
                            default: withCtx(() => [
                              createVNode(_component_v_label, null, {
                                default: withCtx(() => [
                                  createTextVNode("Content")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_v_textarea, {
                                "bg-color": "white",
                                modelValue: formParagraph.content,
                                "onUpdate:modelValue": ($event) => formParagraph.content = $event,
                                "error-messages": local_errors.value.content,
                                "auto-grow": "",
                                rows: "2"
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
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
                                createTextVNode("Title")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_v_text_field, {
                              ref_key: "titleInput",
                              ref: titleInput,
                              "bg-color": "white",
                              modelValue: formParagraph.title,
                              "onUpdate:modelValue": ($event) => formParagraph.title = $event,
                              "error-messages": local_errors.value.title
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                          ]),
                          _: 1
                        }),
                        createVNode(_sfc_main$3, null, {
                          default: withCtx(() => [
                            createVNode(_component_v_label, null, {
                              default: withCtx(() => [
                                createTextVNode("Content")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_v_textarea, {
                              "bg-color": "white",
                              modelValue: formParagraph.content,
                              "onUpdate:modelValue": ($event) => formParagraph.content = $event,
                              "error-messages": local_errors.value.content,
                              "auto-grow": "",
                              rows: "2"
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
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
              onClick: saveParagraph,
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
            _push2(ssrRenderComponent(_sfc_main$5, { onClick: closeParagraph }, {
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
                onClick: saveParagraph,
                class: "me-3"
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(saveButtonText.value), 1)
                ]),
                _: 1
              }),
              createVNode(_sfc_main$5, { onClick: closeParagraph }, {
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
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Content/LegalParagraphModal.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main$1 as _,
  _sfc_main as a
};
