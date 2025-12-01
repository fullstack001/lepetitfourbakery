import { reactive, ref, computed, onMounted, resolveComponent, withCtx, unref, createTextVNode, toDisplayString, createVNode, withModifiers, createCommentVNode, openBlock, createBlock, Fragment, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { A as AdmLayout } from "./BZf0ki2W-7956103712867.js";
import { Head, router } from "@inertiajs/vue3";
import { a as _sfc_main$1, _ as _sfc_main$2 } from "./Cyl_ukyB-5873697610160.js";
import { _ as _sfc_main$3 } from "./CbZ9NF89-6736177896019.js";
import "./BPBs_0V9-9736651018597.js";
import { _ as _export_sfc } from "./1tPrXgE0-4581736670159.js";
import "./BW6cC8iL-1677159380657.js";
import "./kZV6a-x4-6055183876791.js";
import "./C6q4kDV--1536774619085.js";
import "./DsvTyKEu-3067955167518.js";
import "./CeVcRmCk-1577655618930.js";
const _sfc_main = {
  __name: "Home",
  __ssrInlineRender: true,
  props: {
    landing_modal: Object,
    active: Boolean,
    errors: Object
  },
  setup(__props) {
    const props = __props;
    const form = reactive({});
    const uploadNewImage = ref(false);
    const saving = ref(false);
    const resetForm = () => {
      saving.value = false;
      form.image_upload = null;
      uploadNewImage.value = false;
      form.title_top = props.landing_modal.title_top;
      form.content_top = props.landing_modal.content_top;
      form.title_bottom = props.landing_modal.title_bottom;
      form.content_bottom = props.landing_modal.content_bottom;
      form.image = props.landing_modal.image;
      form.generate_new_code = false;
      form.opacity = props.landing_modal.opacity;
      form.delay_seconds = props.landing_modal.delay_seconds;
      form.show_newsletter_form = props.landing_modal.show_newsletter_form === 1;
      form.active_begin_date = props.landing_modal.active_begin_date ? new Date(props.landing_modal.active_begin_date) : null;
      form.active_end_date = props.landing_modal.active_end_date ? new Date(props.landing_modal.active_end_date) : null;
    };
    const saveContents = () => {
      saving.value = true;
      router.post(route("admin.save_landing_modal_contents"), form, {
        preserveScroll: true,
        preserveState: true,
        onSuccess: (page) => {
          resetForm();
        },
        onError: (error) => {
          local_errors.value = props.errors;
          saving.value = false;
        }
      });
    };
    const clearBeginDate = () => {
      form.active_begin_date = null;
    };
    const clearEndDate = () => {
      form.active_end_date = null;
    };
    const formattedBeginDate = computed(() => {
      if (!form.active_begin_date) return null;
      const parts = form.active_begin_date.toDateString().split(" ");
      return `${parts[0]}, ${parts[1]} ${parts[2]}`;
    });
    const formattedEndDate = computed(() => {
      if (!form.active_end_date) return null;
      const parts = form.active_end_date.toDateString().split(" ");
      return `${parts[0]}, ${parts[1]} ${parts[2]}`;
    });
    ref(null);
    const local_errors = ref({});
    ref(false);
    onMounted(() => {
      resetForm();
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_v_chip = resolveComponent("v-chip");
      const _component_v_btn = resolveComponent("v-btn");
      const _component_v_card = resolveComponent("v-card");
      const _component_v_card_text = resolveComponent("v-card-text");
      const _component_v_checkbox = resolveComponent("v-checkbox");
      const _component_v_label = resolveComponent("v-label");
      const _component_v_textarea = resolveComponent("v-textarea");
      const _component_v_file_upload = resolveComponent("v-file-upload");
      const _component_v_img = resolveComponent("v-img");
      const _component_v_slider = resolveComponent("v-slider");
      const _component_v_date_picker = resolveComponent("v-date-picker");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(AdmLayout, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: `Landing Modal :: Admin` }, null, _parent2, _scopeId));
            _push2(`<div class="max-w-4xl mb-4" data-v-248b731d${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              center: true,
              justify: "between"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div data-v-248b731d${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$1, {
                    center: true,
                    justify: "start"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<p class="text-3xl" data-v-248b731d${_scopeId3}>Landing Modal</p>`);
                        _push4(ssrRenderComponent(_component_v_chip, {
                          size: "small",
                          class: "rounded-pill",
                          variant: "flat",
                          color: props.active ? "green" : "grey"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`${ssrInterpolate(props.active ? "Active" : "Inactive")}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(props.active ? "Active" : "Inactive"), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode("p", { class: "text-3xl" }, "Landing Modal"),
                          createVNode(_component_v_chip, {
                            size: "small",
                            class: "rounded-pill",
                            variant: "flat",
                            color: props.active ? "green" : "grey"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(props.active ? "Active" : "Inactive"), 1)
                            ]),
                            _: 1
                          }, 8, ["color"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                  _push3(ssrRenderComponent(_sfc_main$1, { center: true }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_v_btn, {
                          disabled: saving.value,
                          onClick: saveContents
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Update`);
                            } else {
                              return [
                                createTextVNode("Update")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        {
                          _push4(`<!---->`);
                        }
                      } else {
                        return [
                          createVNode(_component_v_btn, {
                            disabled: saving.value,
                            onClick: withModifiers(saveContents, ["prevent"])
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Update")
                            ]),
                            _: 1
                          }, 8, ["disabled"]),
                          createCommentVNode("", true)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", null, [
                      createVNode(_sfc_main$1, {
                        center: true,
                        justify: "start"
                      }, {
                        default: withCtx(() => [
                          createVNode("p", { class: "text-3xl" }, "Landing Modal"),
                          createVNode(_component_v_chip, {
                            size: "small",
                            class: "rounded-pill",
                            variant: "flat",
                            color: props.active ? "green" : "grey"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(props.active ? "Active" : "Inactive"), 1)
                            ]),
                            _: 1
                          }, 8, ["color"])
                        ]),
                        _: 1
                      })
                    ]),
                    createVNode(_sfc_main$1, { center: true }, {
                      default: withCtx(() => [
                        createVNode(_component_v_btn, {
                          disabled: saving.value,
                          onClick: withModifiers(saveContents, ["prevent"])
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Update")
                          ]),
                          _: 1
                        }, 8, ["disabled"]),
                        createCommentVNode("", true)
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(_sfc_main$2, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="max-w-4xl mb-5" data-v-248b731d${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_v_card, {
                    color: "grey-lighten-1",
                    rounded: "lg"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_v_card_text, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_sfc_main$2, { gap: "2" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<p class="font-bold" data-v-248b731d${_scopeId5}>How it works:</p><div data-v-248b731d${_scopeId5}><p data-v-248b731d${_scopeId5}>The popup window will be active as soon as you save it with the following rules:</p><p data-v-248b731d${_scopeId5}>1. A begin date that is earlier or equal to today</p><p data-v-248b731d${_scopeId5}>2. No end date or an end date that is equal or later than today</p></div><p data-v-248b731d${_scopeId5}>Once a user dismisses a popup, we use a unique code to ensure that they don&#39;t see it again during their session.</p><div data-v-248b731d${_scopeId5}><p class="font-bold" data-v-248b731d${_scopeId5}>If you check &quot;Generate new code&quot; and update, all users will see the updated popup, even if they dismissed it recently.</p><p class="font-bold text-red-darken-3" data-v-248b731d${_scopeId5}>Use responsibly.</p></div>`);
                                  } else {
                                    return [
                                      createVNode("p", { class: "font-bold" }, "How it works:"),
                                      createVNode("div", null, [
                                        createVNode("p", null, "The popup window will be active as soon as you save it with the following rules:"),
                                        createVNode("p", null, "1. A begin date that is earlier or equal to today"),
                                        createVNode("p", null, "2. No end date or an end date that is equal or later than today")
                                      ]),
                                      createVNode("p", null, "Once a user dismisses a popup, we use a unique code to ensure that they don't see it again during their session."),
                                      createVNode("div", null, [
                                        createVNode("p", { class: "font-bold" }, 'If you check "Generate new code" and update, all users will see the updated popup, even if they dismissed it recently.'),
                                        createVNode("p", { class: "font-bold text-red-darken-3" }, "Use responsibly.")
                                      ])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_sfc_main$2, { gap: "2" }, {
                                  default: withCtx(() => [
                                    createVNode("p", { class: "font-bold" }, "How it works:"),
                                    createVNode("div", null, [
                                      createVNode("p", null, "The popup window will be active as soon as you save it with the following rules:"),
                                      createVNode("p", null, "1. A begin date that is earlier or equal to today"),
                                      createVNode("p", null, "2. No end date or an end date that is equal or later than today")
                                    ]),
                                    createVNode("p", null, "Once a user dismisses a popup, we use a unique code to ensure that they don't see it again during their session."),
                                    createVNode("div", null, [
                                      createVNode("p", { class: "font-bold" }, 'If you check "Generate new code" and update, all users will see the updated popup, even if they dismissed it recently.'),
                                      createVNode("p", { class: "font-bold text-red-darken-3" }, "Use responsibly.")
                                    ])
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_v_card_text, null, {
                            default: withCtx(() => [
                              createVNode(_sfc_main$2, { gap: "2" }, {
                                default: withCtx(() => [
                                  createVNode("p", { class: "font-bold" }, "How it works:"),
                                  createVNode("div", null, [
                                    createVNode("p", null, "The popup window will be active as soon as you save it with the following rules:"),
                                    createVNode("p", null, "1. A begin date that is earlier or equal to today"),
                                    createVNode("p", null, "2. No end date or an end date that is equal or later than today")
                                  ]),
                                  createVNode("p", null, "Once a user dismisses a popup, we use a unique code to ensure that they don't see it again during their session."),
                                  createVNode("div", null, [
                                    createVNode("p", { class: "font-bold" }, 'If you check "Generate new code" and update, all users will see the updated popup, even if they dismissed it recently.'),
                                    createVNode("p", { class: "font-bold text-red-darken-3" }, "Use responsibly.")
                                  ])
                                ]),
                                _: 1
                              })
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
                    createVNode("div", { class: "max-w-4xl mb-5" }, [
                      createVNode(_component_v_card, {
                        color: "grey-lighten-1",
                        rounded: "lg"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_v_card_text, null, {
                            default: withCtx(() => [
                              createVNode(_sfc_main$2, { gap: "2" }, {
                                default: withCtx(() => [
                                  createVNode("p", { class: "font-bold" }, "How it works:"),
                                  createVNode("div", null, [
                                    createVNode("p", null, "The popup window will be active as soon as you save it with the following rules:"),
                                    createVNode("p", null, "1. A begin date that is earlier or equal to today"),
                                    createVNode("p", null, "2. No end date or an end date that is equal or later than today")
                                  ]),
                                  createVNode("p", null, "Once a user dismisses a popup, we use a unique code to ensure that they don't see it again during their session."),
                                  createVNode("div", null, [
                                    createVNode("p", { class: "font-bold" }, 'If you check "Generate new code" and update, all users will see the updated popup, even if they dismissed it recently.'),
                                    createVNode("p", { class: "font-bold text-red-darken-3" }, "Use responsibly.")
                                  ])
                                ]),
                                _: 1
                              })
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
            _push2(`<div class="max-w-4xl" data-v-248b731d${_scopeId}><div data-v-248b731d${_scopeId}>`);
            _push2(ssrRenderComponent(_component_v_checkbox, {
              label: "Generate new code (new announcement only)",
              modelValue: form.generate_new_code,
              "onUpdate:modelValue": ($event) => form.generate_new_code = $event
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(_sfc_main$2, { gap: "2" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_sfc_main$2, { gap: "2" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="module p-4" data-v-248b731d${_scopeId3}>`);
                        _push4(ssrRenderComponent(_sfc_main$2, { center: true }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_v_checkbox, {
                                label: "Show newsletter subscription form",
                                modelValue: form.show_newsletter_form,
                                "onUpdate:modelValue": ($event) => form.show_newsletter_form = $event,
                                "hide-details": ""
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_v_checkbox, {
                                  label: "Show newsletter subscription form",
                                  modelValue: form.show_newsletter_form,
                                  "onUpdate:modelValue": ($event) => form.show_newsletter_form = $event,
                                  "hide-details": ""
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</div><div class="module p-4" data-v-248b731d${_scopeId3}>`);
                        _push4(ssrRenderComponent(_sfc_main$2, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_sfc_main$2, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_v_label, null, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`Title top`);
                                        } else {
                                          return [
                                            createTextVNode("Title top")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(_component_v_textarea, {
                                      modelValue: form.title_top,
                                      "onUpdate:modelValue": ($event) => form.title_top = $event,
                                      "error-messages": local_errors.value.title_top,
                                      rows: "1",
                                      "auto-grow": ""
                                    }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_v_label, null, {
                                        default: withCtx(() => [
                                          createTextVNode("Title top")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_v_textarea, {
                                        modelValue: form.title_top,
                                        "onUpdate:modelValue": ($event) => form.title_top = $event,
                                        "error-messages": local_errors.value.title_top,
                                        rows: "1",
                                        "auto-grow": ""
                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_sfc_main$2, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_v_label, null, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`Content top`);
                                        } else {
                                          return [
                                            createTextVNode("Content top")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(_component_v_textarea, {
                                      modelValue: form.content_top,
                                      "onUpdate:modelValue": ($event) => form.content_top = $event,
                                      "error-messages": local_errors.value.content_top,
                                      rows: "1",
                                      "auto-grow": ""
                                    }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_v_label, null, {
                                        default: withCtx(() => [
                                          createTextVNode("Content top")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_v_textarea, {
                                        modelValue: form.content_top,
                                        "onUpdate:modelValue": ($event) => form.content_top = $event,
                                        "error-messages": local_errors.value.content_top,
                                        rows: "1",
                                        "auto-grow": ""
                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_sfc_main$2, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_v_label, null, {
                                      default: withCtx(() => [
                                        createTextVNode("Title top")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_v_textarea, {
                                      modelValue: form.title_top,
                                      "onUpdate:modelValue": ($event) => form.title_top = $event,
                                      "error-messages": local_errors.value.title_top,
                                      rows: "1",
                                      "auto-grow": ""
                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                                  ]),
                                  _: 1
                                }),
                                createVNode(_sfc_main$2, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_v_label, null, {
                                      default: withCtx(() => [
                                        createTextVNode("Content top")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_v_textarea, {
                                      modelValue: form.content_top,
                                      "onUpdate:modelValue": ($event) => form.content_top = $event,
                                      "error-messages": local_errors.value.content_top,
                                      rows: "1",
                                      "auto-grow": ""
                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</div><div class="module p-4" data-v-248b731d${_scopeId3}>`);
                        _push4(ssrRenderComponent(_sfc_main$2, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_sfc_main$2, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_v_label, null, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`Title bottom (optional)`);
                                        } else {
                                          return [
                                            createTextVNode("Title bottom (optional)")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(_component_v_textarea, {
                                      modelValue: form.title_bottom,
                                      "onUpdate:modelValue": ($event) => form.title_bottom = $event,
                                      "error-messages": local_errors.value.title_bottom,
                                      rows: "1",
                                      "auto-grow": ""
                                    }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_v_label, null, {
                                        default: withCtx(() => [
                                          createTextVNode("Title bottom (optional)")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_v_textarea, {
                                        modelValue: form.title_bottom,
                                        "onUpdate:modelValue": ($event) => form.title_bottom = $event,
                                        "error-messages": local_errors.value.title_bottom,
                                        rows: "1",
                                        "auto-grow": ""
                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_sfc_main$2, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_v_label, null, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`Content bottom (optional)`);
                                        } else {
                                          return [
                                            createTextVNode("Content bottom (optional)")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(_component_v_textarea, {
                                      modelValue: form.content_bottom,
                                      "onUpdate:modelValue": ($event) => form.content_bottom = $event,
                                      "error-messages": local_errors.value.content_bottom,
                                      rows: "1",
                                      "auto-grow": ""
                                    }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_v_label, null, {
                                        default: withCtx(() => [
                                          createTextVNode("Content bottom (optional)")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_v_textarea, {
                                        modelValue: form.content_bottom,
                                        "onUpdate:modelValue": ($event) => form.content_bottom = $event,
                                        "error-messages": local_errors.value.content_bottom,
                                        rows: "1",
                                        "auto-grow": ""
                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_sfc_main$2, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_v_label, null, {
                                      default: withCtx(() => [
                                        createTextVNode("Title bottom (optional)")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_v_textarea, {
                                      modelValue: form.title_bottom,
                                      "onUpdate:modelValue": ($event) => form.title_bottom = $event,
                                      "error-messages": local_errors.value.title_bottom,
                                      rows: "1",
                                      "auto-grow": ""
                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                                  ]),
                                  _: 1
                                }),
                                createVNode(_sfc_main$2, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_v_label, null, {
                                      default: withCtx(() => [
                                        createTextVNode("Content bottom (optional)")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_v_textarea, {
                                      modelValue: form.content_bottom,
                                      "onUpdate:modelValue": ($event) => form.content_bottom = $event,
                                      "error-messages": local_errors.value.content_bottom,
                                      rows: "1",
                                      "auto-grow": ""
                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</div><div class="module p-4" data-v-248b731d${_scopeId3}>`);
                        _push4(ssrRenderComponent(_sfc_main$2, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_sfc_main$1, {
                                center: true,
                                justify: "between"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_v_label, null, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`Image`);
                                        } else {
                                          return [
                                            createTextVNode("Image")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(`<div data-v-248b731d${_scopeId5}>`);
                                    _push6(ssrRenderComponent(_component_v_checkbox, {
                                      modelValue: uploadNewImage.value,
                                      "onUpdate:modelValue": ($event) => uploadNewImage.value = $event,
                                      label: "Replace image",
                                      "hide-details": ""
                                    }, null, _parent6, _scopeId5));
                                    _push6(`</div>`);
                                  } else {
                                    return [
                                      createVNode(_component_v_label, null, {
                                        default: withCtx(() => [
                                          createTextVNode("Image")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode("div", null, [
                                        createVNode(_component_v_checkbox, {
                                          modelValue: uploadNewImage.value,
                                          "onUpdate:modelValue": ($event) => uploadNewImage.value = $event,
                                          label: "Replace image",
                                          "hide-details": ""
                                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                      ])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              if (uploadNewImage.value) {
                                _push5(`<!--[-->`);
                                _push5(ssrRenderComponent(_component_v_file_upload, {
                                  clearable: "",
                                  modelValue: form.image_upload,
                                  "onUpdate:modelValue": ($event) => form.image_upload = $event,
                                  "error-messages": local_errors.value.image_upload,
                                  title: "Drop or Select image",
                                  icon: ""
                                }, null, _parent5, _scopeId4));
                                _push5(`<p class="text-center text-red text-sm" data-v-248b731d${_scopeId4}>Please select an image of at least 1200x600px</p><!--]-->`);
                              } else {
                                _push5(`<!--[-->`);
                                if (form.image) {
                                  _push5(ssrRenderComponent(_component_v_img, {
                                    src: `/storage/assets/images/landing/${form.image}`,
                                    "aspect-ratio": "2",
                                    color: "grey-lighten-3",
                                    cover: "",
                                    gradient: `to bottom, rgba(0,0,0,${form.opacity}), rgba(0,0,0,${form.opacity})`,
                                    class: "text-white align-center text-center"
                                  }, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(ssrRenderComponent(_sfc_main$2, null, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(`<p class="text-4xl" data-v-248b731d${_scopeId6}>${ssrInterpolate(form.title_top)}</p><p class="text-xl py-2" data-v-248b731d${_scopeId6}>${ssrInterpolate(form.content_top)}</p>`);
                                              if (form.title_bottom) {
                                                _push7(`<p class="text-4xl" data-v-248b731d${_scopeId6}>${ssrInterpolate(form.title_bottom)}</p>`);
                                              } else {
                                                _push7(`<!---->`);
                                              }
                                              if (form.content_bottom) {
                                                _push7(`<p class="text-xl" data-v-248b731d${_scopeId6}>${ssrInterpolate(form.content_bottom)}</p>`);
                                              } else {
                                                _push7(`<!---->`);
                                              }
                                            } else {
                                              return [
                                                createVNode("p", { class: "text-4xl" }, toDisplayString(form.title_top), 1),
                                                createVNode("p", { class: "text-xl py-2" }, toDisplayString(form.content_top), 1),
                                                form.title_bottom ? (openBlock(), createBlock("p", {
                                                  key: 0,
                                                  class: "text-4xl"
                                                }, toDisplayString(form.title_bottom), 1)) : createCommentVNode("", true),
                                                form.content_bottom ? (openBlock(), createBlock("p", {
                                                  key: 1,
                                                  class: "text-xl"
                                                }, toDisplayString(form.content_bottom), 1)) : createCommentVNode("", true)
                                              ];
                                            }
                                          }),
                                          _: 1
                                        }, _parent6, _scopeId5));
                                      } else {
                                        return [
                                          createVNode(_sfc_main$2, null, {
                                            default: withCtx(() => [
                                              createVNode("p", { class: "text-4xl" }, toDisplayString(form.title_top), 1),
                                              createVNode("p", { class: "text-xl py-2" }, toDisplayString(form.content_top), 1),
                                              form.title_bottom ? (openBlock(), createBlock("p", {
                                                key: 0,
                                                class: "text-4xl"
                                              }, toDisplayString(form.title_bottom), 1)) : createCommentVNode("", true),
                                              form.content_bottom ? (openBlock(), createBlock("p", {
                                                key: 1,
                                                class: "text-xl"
                                              }, toDisplayString(form.content_bottom), 1)) : createCommentVNode("", true)
                                            ]),
                                            _: 1
                                          })
                                        ];
                                      }
                                    }),
                                    _: 1
                                  }, _parent5, _scopeId4));
                                } else {
                                  _push5(`<p data-v-248b731d${_scopeId4}>No image</p>`);
                                }
                                _push5(`<!--]-->`);
                              }
                            } else {
                              return [
                                createVNode(_sfc_main$1, {
                                  center: true,
                                  justify: "between"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_v_label, null, {
                                      default: withCtx(() => [
                                        createTextVNode("Image")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode("div", null, [
                                      createVNode(_component_v_checkbox, {
                                        modelValue: uploadNewImage.value,
                                        "onUpdate:modelValue": ($event) => uploadNewImage.value = $event,
                                        label: "Replace image",
                                        "hide-details": ""
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ])
                                  ]),
                                  _: 1
                                }),
                                uploadNewImage.value ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                                  createVNode(_component_v_file_upload, {
                                    clearable: "",
                                    modelValue: form.image_upload,
                                    "onUpdate:modelValue": ($event) => form.image_upload = $event,
                                    "error-messages": local_errors.value.image_upload,
                                    title: "Drop or Select image",
                                    icon: ""
                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"]),
                                  createVNode("p", { class: "text-center text-red text-sm" }, "Please select an image of at least 1200x600px")
                                ], 64)) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                                  form.image ? (openBlock(), createBlock(_component_v_img, {
                                    key: 0,
                                    src: `/storage/assets/images/landing/${form.image}`,
                                    "aspect-ratio": "2",
                                    color: "grey-lighten-3",
                                    cover: "",
                                    gradient: `to bottom, rgba(0,0,0,${form.opacity}), rgba(0,0,0,${form.opacity})`,
                                    class: "text-white align-center text-center"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(_sfc_main$2, null, {
                                        default: withCtx(() => [
                                          createVNode("p", { class: "text-4xl" }, toDisplayString(form.title_top), 1),
                                          createVNode("p", { class: "text-xl py-2" }, toDisplayString(form.content_top), 1),
                                          form.title_bottom ? (openBlock(), createBlock("p", {
                                            key: 0,
                                            class: "text-4xl"
                                          }, toDisplayString(form.title_bottom), 1)) : createCommentVNode("", true),
                                          form.content_bottom ? (openBlock(), createBlock("p", {
                                            key: 1,
                                            class: "text-xl"
                                          }, toDisplayString(form.content_bottom), 1)) : createCommentVNode("", true)
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  }, 8, ["src", "gradient"])) : (openBlock(), createBlock("p", { key: 1 }, "No image"))
                                ], 64))
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</div><div class="module p-4" data-v-248b731d${_scopeId3}>`);
                        _push4(ssrRenderComponent(_sfc_main$2, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_v_label, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Overlay opacity`);
                                  } else {
                                    return [
                                      createTextVNode("Overlay opacity")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_v_slider, {
                                modelValue: form.opacity,
                                "onUpdate:modelValue": ($event) => form.opacity = $event,
                                "error-messages": local_errors.value.opacity,
                                min: "0",
                                max: "1",
                                ticks: ["0", "0.1", "0.2", "0.3", "0.4", "0.5", "0.6", "0.7", "0.8", "0.9", "1"],
                                "show-ticks": "always",
                                step: "0.1"
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_v_label, null, {
                                  default: withCtx(() => [
                                    createTextVNode("Overlay opacity")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_v_slider, {
                                  modelValue: form.opacity,
                                  "onUpdate:modelValue": ($event) => form.opacity = $event,
                                  "error-messages": local_errors.value.opacity,
                                  min: "0",
                                  max: "1",
                                  ticks: ["0", "0.1", "0.2", "0.3", "0.4", "0.5", "0.6", "0.7", "0.8", "0.9", "1"],
                                  "show-ticks": "always",
                                  step: "0.1"
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</div><div class="module p-4" data-v-248b731d${_scopeId3}>`);
                        _push4(ssrRenderComponent(_sfc_main$2, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_v_label, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Delay before opens (seconds)`);
                                  } else {
                                    return [
                                      createTextVNode("Delay before opens (seconds)")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_v_slider, {
                                modelValue: form.delay_seconds,
                                "onUpdate:modelValue": ($event) => form.delay_seconds = $event,
                                "error-messages": local_errors.value.delay_seconds,
                                min: "0",
                                max: "30",
                                ticks: [0, 3, 6, 9, 12, 15, 18, 21, 24, 27, 30],
                                "show-ticks": "always",
                                step: "3"
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_v_label, null, {
                                  default: withCtx(() => [
                                    createTextVNode("Delay before opens (seconds)")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_v_slider, {
                                  modelValue: form.delay_seconds,
                                  "onUpdate:modelValue": ($event) => form.delay_seconds = $event,
                                  "error-messages": local_errors.value.delay_seconds,
                                  min: "0",
                                  max: "30",
                                  ticks: [0, 3, 6, 9, 12, 15, 18, 21, 24, 27, 30],
                                  "show-ticks": "always",
                                  step: "3"
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</div>`);
                      } else {
                        return [
                          createVNode("div", { class: "module p-4" }, [
                            createVNode(_sfc_main$2, { center: true }, {
                              default: withCtx(() => [
                                createVNode(_component_v_checkbox, {
                                  label: "Show newsletter subscription form",
                                  modelValue: form.show_newsletter_form,
                                  "onUpdate:modelValue": ($event) => form.show_newsletter_form = $event,
                                  "hide-details": ""
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ]),
                              _: 1
                            })
                          ]),
                          createVNode("div", { class: "module p-4" }, [
                            createVNode(_sfc_main$2, null, {
                              default: withCtx(() => [
                                createVNode(_sfc_main$2, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_v_label, null, {
                                      default: withCtx(() => [
                                        createTextVNode("Title top")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_v_textarea, {
                                      modelValue: form.title_top,
                                      "onUpdate:modelValue": ($event) => form.title_top = $event,
                                      "error-messages": local_errors.value.title_top,
                                      rows: "1",
                                      "auto-grow": ""
                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                                  ]),
                                  _: 1
                                }),
                                createVNode(_sfc_main$2, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_v_label, null, {
                                      default: withCtx(() => [
                                        createTextVNode("Content top")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_v_textarea, {
                                      modelValue: form.content_top,
                                      "onUpdate:modelValue": ($event) => form.content_top = $event,
                                      "error-messages": local_errors.value.content_top,
                                      rows: "1",
                                      "auto-grow": ""
                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            })
                          ]),
                          createVNode("div", { class: "module p-4" }, [
                            createVNode(_sfc_main$2, null, {
                              default: withCtx(() => [
                                createVNode(_sfc_main$2, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_v_label, null, {
                                      default: withCtx(() => [
                                        createTextVNode("Title bottom (optional)")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_v_textarea, {
                                      modelValue: form.title_bottom,
                                      "onUpdate:modelValue": ($event) => form.title_bottom = $event,
                                      "error-messages": local_errors.value.title_bottom,
                                      rows: "1",
                                      "auto-grow": ""
                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                                  ]),
                                  _: 1
                                }),
                                createVNode(_sfc_main$2, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_v_label, null, {
                                      default: withCtx(() => [
                                        createTextVNode("Content bottom (optional)")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_v_textarea, {
                                      modelValue: form.content_bottom,
                                      "onUpdate:modelValue": ($event) => form.content_bottom = $event,
                                      "error-messages": local_errors.value.content_bottom,
                                      rows: "1",
                                      "auto-grow": ""
                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            })
                          ]),
                          createVNode("div", { class: "module p-4" }, [
                            createVNode(_sfc_main$2, null, {
                              default: withCtx(() => [
                                createVNode(_sfc_main$1, {
                                  center: true,
                                  justify: "between"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_v_label, null, {
                                      default: withCtx(() => [
                                        createTextVNode("Image")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode("div", null, [
                                      createVNode(_component_v_checkbox, {
                                        modelValue: uploadNewImage.value,
                                        "onUpdate:modelValue": ($event) => uploadNewImage.value = $event,
                                        label: "Replace image",
                                        "hide-details": ""
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ])
                                  ]),
                                  _: 1
                                }),
                                uploadNewImage.value ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                                  createVNode(_component_v_file_upload, {
                                    clearable: "",
                                    modelValue: form.image_upload,
                                    "onUpdate:modelValue": ($event) => form.image_upload = $event,
                                    "error-messages": local_errors.value.image_upload,
                                    title: "Drop or Select image",
                                    icon: ""
                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"]),
                                  createVNode("p", { class: "text-center text-red text-sm" }, "Please select an image of at least 1200x600px")
                                ], 64)) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                                  form.image ? (openBlock(), createBlock(_component_v_img, {
                                    key: 0,
                                    src: `/storage/assets/images/landing/${form.image}`,
                                    "aspect-ratio": "2",
                                    color: "grey-lighten-3",
                                    cover: "",
                                    gradient: `to bottom, rgba(0,0,0,${form.opacity}), rgba(0,0,0,${form.opacity})`,
                                    class: "text-white align-center text-center"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(_sfc_main$2, null, {
                                        default: withCtx(() => [
                                          createVNode("p", { class: "text-4xl" }, toDisplayString(form.title_top), 1),
                                          createVNode("p", { class: "text-xl py-2" }, toDisplayString(form.content_top), 1),
                                          form.title_bottom ? (openBlock(), createBlock("p", {
                                            key: 0,
                                            class: "text-4xl"
                                          }, toDisplayString(form.title_bottom), 1)) : createCommentVNode("", true),
                                          form.content_bottom ? (openBlock(), createBlock("p", {
                                            key: 1,
                                            class: "text-xl"
                                          }, toDisplayString(form.content_bottom), 1)) : createCommentVNode("", true)
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  }, 8, ["src", "gradient"])) : (openBlock(), createBlock("p", { key: 1 }, "No image"))
                                ], 64))
                              ]),
                              _: 1
                            })
                          ]),
                          createVNode("div", { class: "module p-4" }, [
                            createVNode(_sfc_main$2, null, {
                              default: withCtx(() => [
                                createVNode(_component_v_label, null, {
                                  default: withCtx(() => [
                                    createTextVNode("Overlay opacity")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_v_slider, {
                                  modelValue: form.opacity,
                                  "onUpdate:modelValue": ($event) => form.opacity = $event,
                                  "error-messages": local_errors.value.opacity,
                                  min: "0",
                                  max: "1",
                                  ticks: ["0", "0.1", "0.2", "0.3", "0.4", "0.5", "0.6", "0.7", "0.8", "0.9", "1"],
                                  "show-ticks": "always",
                                  step: "0.1"
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                              ]),
                              _: 1
                            })
                          ]),
                          createVNode("div", { class: "module p-4" }, [
                            createVNode(_sfc_main$2, null, {
                              default: withCtx(() => [
                                createVNode(_component_v_label, null, {
                                  default: withCtx(() => [
                                    createTextVNode("Delay before opens (seconds)")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_v_slider, {
                                  modelValue: form.delay_seconds,
                                  "onUpdate:modelValue": ($event) => form.delay_seconds = $event,
                                  "error-messages": local_errors.value.delay_seconds,
                                  min: "0",
                                  max: "30",
                                  ticks: [0, 3, 6, 9, 12, 15, 18, 21, 24, 27, 30],
                                  "show-ticks": "always",
                                  step: "3"
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                              ]),
                              _: 1
                            })
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_sfc_main$3, {
                    cols: "1",
                    md: "2",
                    lg: "2",
                    xl: "2",
                    "2xl": "2",
                    gap: "2"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="module p-4" data-v-248b731d${_scopeId3}>`);
                        _push4(ssrRenderComponent(_sfc_main$2, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_v_label, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Active begin date`);
                                  } else {
                                    return [
                                      createTextVNode("Active begin date")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_v_date_picker, {
                                modelValue: form.active_begin_date,
                                "onUpdate:modelValue": ($event) => form.active_begin_date = $event
                              }, {
                                header: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<div class="p-5" data-v-248b731d${_scopeId5}>`);
                                    if (form.active_begin_date) {
                                      _push6(`<div data-v-248b731d${_scopeId5}>`);
                                      _push6(ssrRenderComponent(_sfc_main$1, {
                                        center: true,
                                        justify: "between"
                                      }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`<p class="text-xl text-blue font-bold" data-v-248b731d${_scopeId6}>${ssrInterpolate(formattedBeginDate.value)}</p>`);
                                            _push7(ssrRenderComponent(_component_v_btn, {
                                              onClick: clearBeginDate,
                                              color: "red",
                                              size: "small",
                                              variant: "text"
                                            }, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(`Clear date`);
                                                } else {
                                                  return [
                                                    createTextVNode("Clear date")
                                                  ];
                                                }
                                              }),
                                              _: 1
                                            }, _parent7, _scopeId6));
                                          } else {
                                            return [
                                              createVNode("p", { class: "text-xl text-blue font-bold" }, toDisplayString(formattedBeginDate.value), 1),
                                              createVNode(_component_v_btn, {
                                                onClick: withModifiers(clearBeginDate, ["prevent"]),
                                                color: "red",
                                                size: "small",
                                                variant: "text"
                                              }, {
                                                default: withCtx(() => [
                                                  createTextVNode("Clear date")
                                                ]),
                                                _: 1
                                              })
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                      _push6(`</div>`);
                                    } else {
                                      _push6(`<div data-v-248b731d${_scopeId5}><div data-v-248b731d${_scopeId5}>`);
                                      _push6(ssrRenderComponent(_sfc_main$1, {
                                        center: true,
                                        justify: "between"
                                      }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`<p class="text-xl font-bold" data-v-248b731d${_scopeId6}>Select begin date</p>`);
                                          } else {
                                            return [
                                              createVNode("p", { class: "text-xl font-bold" }, "Select begin date")
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                      _push6(`</div></div>`);
                                    }
                                    _push6(`</div>`);
                                  } else {
                                    return [
                                      createVNode("div", { class: "p-5" }, [
                                        form.active_begin_date ? (openBlock(), createBlock("div", { key: 0 }, [
                                          createVNode(_sfc_main$1, {
                                            center: true,
                                            justify: "between"
                                          }, {
                                            default: withCtx(() => [
                                              createVNode("p", { class: "text-xl text-blue font-bold" }, toDisplayString(formattedBeginDate.value), 1),
                                              createVNode(_component_v_btn, {
                                                onClick: withModifiers(clearBeginDate, ["prevent"]),
                                                color: "red",
                                                size: "small",
                                                variant: "text"
                                              }, {
                                                default: withCtx(() => [
                                                  createTextVNode("Clear date")
                                                ]),
                                                _: 1
                                              })
                                            ]),
                                            _: 1
                                          })
                                        ])) : (openBlock(), createBlock("div", { key: 1 }, [
                                          createVNode("div", null, [
                                            createVNode(_sfc_main$1, {
                                              center: true,
                                              justify: "between"
                                            }, {
                                              default: withCtx(() => [
                                                createVNode("p", { class: "text-xl font-bold" }, "Select begin date")
                                              ]),
                                              _: 1
                                            })
                                          ])
                                        ]))
                                      ])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_v_label, null, {
                                  default: withCtx(() => [
                                    createTextVNode("Active begin date")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_v_date_picker, {
                                  modelValue: form.active_begin_date,
                                  "onUpdate:modelValue": ($event) => form.active_begin_date = $event
                                }, {
                                  header: withCtx(() => [
                                    createVNode("div", { class: "p-5" }, [
                                      form.active_begin_date ? (openBlock(), createBlock("div", { key: 0 }, [
                                        createVNode(_sfc_main$1, {
                                          center: true,
                                          justify: "between"
                                        }, {
                                          default: withCtx(() => [
                                            createVNode("p", { class: "text-xl text-blue font-bold" }, toDisplayString(formattedBeginDate.value), 1),
                                            createVNode(_component_v_btn, {
                                              onClick: withModifiers(clearBeginDate, ["prevent"]),
                                              color: "red",
                                              size: "small",
                                              variant: "text"
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode("Clear date")
                                              ]),
                                              _: 1
                                            })
                                          ]),
                                          _: 1
                                        })
                                      ])) : (openBlock(), createBlock("div", { key: 1 }, [
                                        createVNode("div", null, [
                                          createVNode(_sfc_main$1, {
                                            center: true,
                                            justify: "between"
                                          }, {
                                            default: withCtx(() => [
                                              createVNode("p", { class: "text-xl font-bold" }, "Select begin date")
                                            ]),
                                            _: 1
                                          })
                                        ])
                                      ]))
                                    ])
                                  ]),
                                  _: 1
                                }, 8, ["modelValue", "onUpdate:modelValue"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</div><div class="module p-4" data-v-248b731d${_scopeId3}>`);
                        _push4(ssrRenderComponent(_sfc_main$2, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_v_label, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Active end date`);
                                  } else {
                                    return [
                                      createTextVNode("Active end date")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_v_date_picker, {
                                modelValue: form.active_end_date,
                                "onUpdate:modelValue": ($event) => form.active_end_date = $event
                              }, {
                                header: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<div class="p-5" data-v-248b731d${_scopeId5}>`);
                                    if (form.active_end_date) {
                                      _push6(`<div data-v-248b731d${_scopeId5}>`);
                                      _push6(ssrRenderComponent(_sfc_main$1, {
                                        center: true,
                                        justify: "between"
                                      }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`<p class="text-xl text-blue font-bold" data-v-248b731d${_scopeId6}>${ssrInterpolate(formattedEndDate.value)}</p>`);
                                            _push7(ssrRenderComponent(_component_v_btn, {
                                              onClick: clearEndDate,
                                              color: "red",
                                              size: "small",
                                              variant: "text"
                                            }, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(`Clear date`);
                                                } else {
                                                  return [
                                                    createTextVNode("Clear date")
                                                  ];
                                                }
                                              }),
                                              _: 1
                                            }, _parent7, _scopeId6));
                                          } else {
                                            return [
                                              createVNode("p", { class: "text-xl text-blue font-bold" }, toDisplayString(formattedEndDate.value), 1),
                                              createVNode(_component_v_btn, {
                                                onClick: withModifiers(clearEndDate, ["prevent"]),
                                                color: "red",
                                                size: "small",
                                                variant: "text"
                                              }, {
                                                default: withCtx(() => [
                                                  createTextVNode("Clear date")
                                                ]),
                                                _: 1
                                              })
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                      _push6(`</div>`);
                                    } else {
                                      _push6(`<div data-v-248b731d${_scopeId5}><div data-v-248b731d${_scopeId5}>`);
                                      _push6(ssrRenderComponent(_sfc_main$1, {
                                        center: true,
                                        justify: "between"
                                      }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`<p class="text-xl font-bold" data-v-248b731d${_scopeId6}>Select end date</p>`);
                                          } else {
                                            return [
                                              createVNode("p", { class: "text-xl font-bold" }, "Select end date")
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                      _push6(`</div></div>`);
                                    }
                                    _push6(`</div>`);
                                  } else {
                                    return [
                                      createVNode("div", { class: "p-5" }, [
                                        form.active_end_date ? (openBlock(), createBlock("div", { key: 0 }, [
                                          createVNode(_sfc_main$1, {
                                            center: true,
                                            justify: "between"
                                          }, {
                                            default: withCtx(() => [
                                              createVNode("p", { class: "text-xl text-blue font-bold" }, toDisplayString(formattedEndDate.value), 1),
                                              createVNode(_component_v_btn, {
                                                onClick: withModifiers(clearEndDate, ["prevent"]),
                                                color: "red",
                                                size: "small",
                                                variant: "text"
                                              }, {
                                                default: withCtx(() => [
                                                  createTextVNode("Clear date")
                                                ]),
                                                _: 1
                                              })
                                            ]),
                                            _: 1
                                          })
                                        ])) : (openBlock(), createBlock("div", { key: 1 }, [
                                          createVNode("div", null, [
                                            createVNode(_sfc_main$1, {
                                              center: true,
                                              justify: "between"
                                            }, {
                                              default: withCtx(() => [
                                                createVNode("p", { class: "text-xl font-bold" }, "Select end date")
                                              ]),
                                              _: 1
                                            })
                                          ])
                                        ]))
                                      ])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_v_label, null, {
                                  default: withCtx(() => [
                                    createTextVNode("Active end date")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_v_date_picker, {
                                  modelValue: form.active_end_date,
                                  "onUpdate:modelValue": ($event) => form.active_end_date = $event
                                }, {
                                  header: withCtx(() => [
                                    createVNode("div", { class: "p-5" }, [
                                      form.active_end_date ? (openBlock(), createBlock("div", { key: 0 }, [
                                        createVNode(_sfc_main$1, {
                                          center: true,
                                          justify: "between"
                                        }, {
                                          default: withCtx(() => [
                                            createVNode("p", { class: "text-xl text-blue font-bold" }, toDisplayString(formattedEndDate.value), 1),
                                            createVNode(_component_v_btn, {
                                              onClick: withModifiers(clearEndDate, ["prevent"]),
                                              color: "red",
                                              size: "small",
                                              variant: "text"
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode("Clear date")
                                              ]),
                                              _: 1
                                            })
                                          ]),
                                          _: 1
                                        })
                                      ])) : (openBlock(), createBlock("div", { key: 1 }, [
                                        createVNode("div", null, [
                                          createVNode(_sfc_main$1, {
                                            center: true,
                                            justify: "between"
                                          }, {
                                            default: withCtx(() => [
                                              createVNode("p", { class: "text-xl font-bold" }, "Select end date")
                                            ]),
                                            _: 1
                                          })
                                        ])
                                      ]))
                                    ])
                                  ]),
                                  _: 1
                                }, 8, ["modelValue", "onUpdate:modelValue"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</div>`);
                      } else {
                        return [
                          createVNode("div", { class: "module p-4" }, [
                            createVNode(_sfc_main$2, null, {
                              default: withCtx(() => [
                                createVNode(_component_v_label, null, {
                                  default: withCtx(() => [
                                    createTextVNode("Active begin date")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_v_date_picker, {
                                  modelValue: form.active_begin_date,
                                  "onUpdate:modelValue": ($event) => form.active_begin_date = $event
                                }, {
                                  header: withCtx(() => [
                                    createVNode("div", { class: "p-5" }, [
                                      form.active_begin_date ? (openBlock(), createBlock("div", { key: 0 }, [
                                        createVNode(_sfc_main$1, {
                                          center: true,
                                          justify: "between"
                                        }, {
                                          default: withCtx(() => [
                                            createVNode("p", { class: "text-xl text-blue font-bold" }, toDisplayString(formattedBeginDate.value), 1),
                                            createVNode(_component_v_btn, {
                                              onClick: withModifiers(clearBeginDate, ["prevent"]),
                                              color: "red",
                                              size: "small",
                                              variant: "text"
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode("Clear date")
                                              ]),
                                              _: 1
                                            })
                                          ]),
                                          _: 1
                                        })
                                      ])) : (openBlock(), createBlock("div", { key: 1 }, [
                                        createVNode("div", null, [
                                          createVNode(_sfc_main$1, {
                                            center: true,
                                            justify: "between"
                                          }, {
                                            default: withCtx(() => [
                                              createVNode("p", { class: "text-xl font-bold" }, "Select begin date")
                                            ]),
                                            _: 1
                                          })
                                        ])
                                      ]))
                                    ])
                                  ]),
                                  _: 1
                                }, 8, ["modelValue", "onUpdate:modelValue"])
                              ]),
                              _: 1
                            })
                          ]),
                          createVNode("div", { class: "module p-4" }, [
                            createVNode(_sfc_main$2, null, {
                              default: withCtx(() => [
                                createVNode(_component_v_label, null, {
                                  default: withCtx(() => [
                                    createTextVNode("Active end date")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_v_date_picker, {
                                  modelValue: form.active_end_date,
                                  "onUpdate:modelValue": ($event) => form.active_end_date = $event
                                }, {
                                  header: withCtx(() => [
                                    createVNode("div", { class: "p-5" }, [
                                      form.active_end_date ? (openBlock(), createBlock("div", { key: 0 }, [
                                        createVNode(_sfc_main$1, {
                                          center: true,
                                          justify: "between"
                                        }, {
                                          default: withCtx(() => [
                                            createVNode("p", { class: "text-xl text-blue font-bold" }, toDisplayString(formattedEndDate.value), 1),
                                            createVNode(_component_v_btn, {
                                              onClick: withModifiers(clearEndDate, ["prevent"]),
                                              color: "red",
                                              size: "small",
                                              variant: "text"
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode("Clear date")
                                              ]),
                                              _: 1
                                            })
                                          ]),
                                          _: 1
                                        })
                                      ])) : (openBlock(), createBlock("div", { key: 1 }, [
                                        createVNode("div", null, [
                                          createVNode(_sfc_main$1, {
                                            center: true,
                                            justify: "between"
                                          }, {
                                            default: withCtx(() => [
                                              createVNode("p", { class: "text-xl font-bold" }, "Select end date")
                                            ]),
                                            _: 1
                                          })
                                        ])
                                      ]))
                                    ])
                                  ]),
                                  _: 1
                                }, 8, ["modelValue", "onUpdate:modelValue"])
                              ]),
                              _: 1
                            })
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_sfc_main$2, { gap: "2" }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "module p-4" }, [
                          createVNode(_sfc_main$2, { center: true }, {
                            default: withCtx(() => [
                              createVNode(_component_v_checkbox, {
                                label: "Show newsletter subscription form",
                                modelValue: form.show_newsletter_form,
                                "onUpdate:modelValue": ($event) => form.show_newsletter_form = $event,
                                "hide-details": ""
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          })
                        ]),
                        createVNode("div", { class: "module p-4" }, [
                          createVNode(_sfc_main$2, null, {
                            default: withCtx(() => [
                              createVNode(_sfc_main$2, null, {
                                default: withCtx(() => [
                                  createVNode(_component_v_label, null, {
                                    default: withCtx(() => [
                                      createTextVNode("Title top")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_v_textarea, {
                                    modelValue: form.title_top,
                                    "onUpdate:modelValue": ($event) => form.title_top = $event,
                                    "error-messages": local_errors.value.title_top,
                                    rows: "1",
                                    "auto-grow": ""
                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                                ]),
                                _: 1
                              }),
                              createVNode(_sfc_main$2, null, {
                                default: withCtx(() => [
                                  createVNode(_component_v_label, null, {
                                    default: withCtx(() => [
                                      createTextVNode("Content top")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_v_textarea, {
                                    modelValue: form.content_top,
                                    "onUpdate:modelValue": ($event) => form.content_top = $event,
                                    "error-messages": local_errors.value.content_top,
                                    rows: "1",
                                    "auto-grow": ""
                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        createVNode("div", { class: "module p-4" }, [
                          createVNode(_sfc_main$2, null, {
                            default: withCtx(() => [
                              createVNode(_sfc_main$2, null, {
                                default: withCtx(() => [
                                  createVNode(_component_v_label, null, {
                                    default: withCtx(() => [
                                      createTextVNode("Title bottom (optional)")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_v_textarea, {
                                    modelValue: form.title_bottom,
                                    "onUpdate:modelValue": ($event) => form.title_bottom = $event,
                                    "error-messages": local_errors.value.title_bottom,
                                    rows: "1",
                                    "auto-grow": ""
                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                                ]),
                                _: 1
                              }),
                              createVNode(_sfc_main$2, null, {
                                default: withCtx(() => [
                                  createVNode(_component_v_label, null, {
                                    default: withCtx(() => [
                                      createTextVNode("Content bottom (optional)")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_v_textarea, {
                                    modelValue: form.content_bottom,
                                    "onUpdate:modelValue": ($event) => form.content_bottom = $event,
                                    "error-messages": local_errors.value.content_bottom,
                                    rows: "1",
                                    "auto-grow": ""
                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        createVNode("div", { class: "module p-4" }, [
                          createVNode(_sfc_main$2, null, {
                            default: withCtx(() => [
                              createVNode(_sfc_main$1, {
                                center: true,
                                justify: "between"
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_v_label, null, {
                                    default: withCtx(() => [
                                      createTextVNode("Image")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode("div", null, [
                                    createVNode(_component_v_checkbox, {
                                      modelValue: uploadNewImage.value,
                                      "onUpdate:modelValue": ($event) => uploadNewImage.value = $event,
                                      label: "Replace image",
                                      "hide-details": ""
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                  ])
                                ]),
                                _: 1
                              }),
                              uploadNewImage.value ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                                createVNode(_component_v_file_upload, {
                                  clearable: "",
                                  modelValue: form.image_upload,
                                  "onUpdate:modelValue": ($event) => form.image_upload = $event,
                                  "error-messages": local_errors.value.image_upload,
                                  title: "Drop or Select image",
                                  icon: ""
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"]),
                                createVNode("p", { class: "text-center text-red text-sm" }, "Please select an image of at least 1200x600px")
                              ], 64)) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                                form.image ? (openBlock(), createBlock(_component_v_img, {
                                  key: 0,
                                  src: `/storage/assets/images/landing/${form.image}`,
                                  "aspect-ratio": "2",
                                  color: "grey-lighten-3",
                                  cover: "",
                                  gradient: `to bottom, rgba(0,0,0,${form.opacity}), rgba(0,0,0,${form.opacity})`,
                                  class: "text-white align-center text-center"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_sfc_main$2, null, {
                                      default: withCtx(() => [
                                        createVNode("p", { class: "text-4xl" }, toDisplayString(form.title_top), 1),
                                        createVNode("p", { class: "text-xl py-2" }, toDisplayString(form.content_top), 1),
                                        form.title_bottom ? (openBlock(), createBlock("p", {
                                          key: 0,
                                          class: "text-4xl"
                                        }, toDisplayString(form.title_bottom), 1)) : createCommentVNode("", true),
                                        form.content_bottom ? (openBlock(), createBlock("p", {
                                          key: 1,
                                          class: "text-xl"
                                        }, toDisplayString(form.content_bottom), 1)) : createCommentVNode("", true)
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }, 8, ["src", "gradient"])) : (openBlock(), createBlock("p", { key: 1 }, "No image"))
                              ], 64))
                            ]),
                            _: 1
                          })
                        ]),
                        createVNode("div", { class: "module p-4" }, [
                          createVNode(_sfc_main$2, null, {
                            default: withCtx(() => [
                              createVNode(_component_v_label, null, {
                                default: withCtx(() => [
                                  createTextVNode("Overlay opacity")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_v_slider, {
                                modelValue: form.opacity,
                                "onUpdate:modelValue": ($event) => form.opacity = $event,
                                "error-messages": local_errors.value.opacity,
                                min: "0",
                                max: "1",
                                ticks: ["0", "0.1", "0.2", "0.3", "0.4", "0.5", "0.6", "0.7", "0.8", "0.9", "1"],
                                "show-ticks": "always",
                                step: "0.1"
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                            ]),
                            _: 1
                          })
                        ]),
                        createVNode("div", { class: "module p-4" }, [
                          createVNode(_sfc_main$2, null, {
                            default: withCtx(() => [
                              createVNode(_component_v_label, null, {
                                default: withCtx(() => [
                                  createTextVNode("Delay before opens (seconds)")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_v_slider, {
                                modelValue: form.delay_seconds,
                                "onUpdate:modelValue": ($event) => form.delay_seconds = $event,
                                "error-messages": local_errors.value.delay_seconds,
                                min: "0",
                                max: "30",
                                ticks: [0, 3, 6, 9, 12, 15, 18, 21, 24, 27, 30],
                                "show-ticks": "always",
                                step: "3"
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                            ]),
                            _: 1
                          })
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(_sfc_main$3, {
                      cols: "1",
                      md: "2",
                      lg: "2",
                      xl: "2",
                      "2xl": "2",
                      gap: "2"
                    }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "module p-4" }, [
                          createVNode(_sfc_main$2, null, {
                            default: withCtx(() => [
                              createVNode(_component_v_label, null, {
                                default: withCtx(() => [
                                  createTextVNode("Active begin date")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_v_date_picker, {
                                modelValue: form.active_begin_date,
                                "onUpdate:modelValue": ($event) => form.active_begin_date = $event
                              }, {
                                header: withCtx(() => [
                                  createVNode("div", { class: "p-5" }, [
                                    form.active_begin_date ? (openBlock(), createBlock("div", { key: 0 }, [
                                      createVNode(_sfc_main$1, {
                                        center: true,
                                        justify: "between"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode("p", { class: "text-xl text-blue font-bold" }, toDisplayString(formattedBeginDate.value), 1),
                                          createVNode(_component_v_btn, {
                                            onClick: withModifiers(clearBeginDate, ["prevent"]),
                                            color: "red",
                                            size: "small",
                                            variant: "text"
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode("Clear date")
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      })
                                    ])) : (openBlock(), createBlock("div", { key: 1 }, [
                                      createVNode("div", null, [
                                        createVNode(_sfc_main$1, {
                                          center: true,
                                          justify: "between"
                                        }, {
                                          default: withCtx(() => [
                                            createVNode("p", { class: "text-xl font-bold" }, "Select begin date")
                                          ]),
                                          _: 1
                                        })
                                      ])
                                    ]))
                                  ])
                                ]),
                                _: 1
                              }, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          })
                        ]),
                        createVNode("div", { class: "module p-4" }, [
                          createVNode(_sfc_main$2, null, {
                            default: withCtx(() => [
                              createVNode(_component_v_label, null, {
                                default: withCtx(() => [
                                  createTextVNode("Active end date")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_v_date_picker, {
                                modelValue: form.active_end_date,
                                "onUpdate:modelValue": ($event) => form.active_end_date = $event
                              }, {
                                header: withCtx(() => [
                                  createVNode("div", { class: "p-5" }, [
                                    form.active_end_date ? (openBlock(), createBlock("div", { key: 0 }, [
                                      createVNode(_sfc_main$1, {
                                        center: true,
                                        justify: "between"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode("p", { class: "text-xl text-blue font-bold" }, toDisplayString(formattedEndDate.value), 1),
                                          createVNode(_component_v_btn, {
                                            onClick: withModifiers(clearEndDate, ["prevent"]),
                                            color: "red",
                                            size: "small",
                                            variant: "text"
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode("Clear date")
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      })
                                    ])) : (openBlock(), createBlock("div", { key: 1 }, [
                                      createVNode("div", null, [
                                        createVNode(_sfc_main$1, {
                                          center: true,
                                          justify: "between"
                                        }, {
                                          default: withCtx(() => [
                                            createVNode("p", { class: "text-xl font-bold" }, "Select end date")
                                          ]),
                                          _: 1
                                        })
                                      ])
                                    ]))
                                  ])
                                ]),
                                _: 1
                              }, 8, ["modelValue", "onUpdate:modelValue"])
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
            }, _parent2, _scopeId));
            _push2(`</div><div class="max-w-4xl my-4" data-v-248b731d${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              center: true,
              justify: "between"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div data-v-248b731d${_scopeId2}></div>`);
                  _push3(ssrRenderComponent(_sfc_main$1, { center: true }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_v_btn, {
                          disabled: saving.value,
                          onClick: saveContents
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Update`);
                            } else {
                              return [
                                createTextVNode("Update")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        {
                          _push4(`<!---->`);
                        }
                      } else {
                        return [
                          createVNode(_component_v_btn, {
                            disabled: saving.value,
                            onClick: withModifiers(saveContents, ["prevent"])
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Update")
                            ]),
                            _: 1
                          }, 8, ["disabled"]),
                          createCommentVNode("", true)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div"),
                    createVNode(_sfc_main$1, { center: true }, {
                      default: withCtx(() => [
                        createVNode(_component_v_btn, {
                          disabled: saving.value,
                          onClick: withModifiers(saveContents, ["prevent"])
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Update")
                          ]),
                          _: 1
                        }, 8, ["disabled"]),
                        createCommentVNode("", true)
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode(unref(Head), { title: `Landing Modal :: Admin` }),
              createVNode("div", { class: "max-w-4xl mb-4" }, [
                createVNode(_sfc_main$1, {
                  center: true,
                  justify: "between"
                }, {
                  default: withCtx(() => [
                    createVNode("div", null, [
                      createVNode(_sfc_main$1, {
                        center: true,
                        justify: "start"
                      }, {
                        default: withCtx(() => [
                          createVNode("p", { class: "text-3xl" }, "Landing Modal"),
                          createVNode(_component_v_chip, {
                            size: "small",
                            class: "rounded-pill",
                            variant: "flat",
                            color: props.active ? "green" : "grey"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(props.active ? "Active" : "Inactive"), 1)
                            ]),
                            _: 1
                          }, 8, ["color"])
                        ]),
                        _: 1
                      })
                    ]),
                    createVNode(_sfc_main$1, { center: true }, {
                      default: withCtx(() => [
                        createVNode(_component_v_btn, {
                          disabled: saving.value,
                          onClick: withModifiers(saveContents, ["prevent"])
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Update")
                          ]),
                          _: 1
                        }, 8, ["disabled"]),
                        createCommentVNode("", true)
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                })
              ]),
              createVNode(_sfc_main$2, null, {
                default: withCtx(() => [
                  createVNode("div", { class: "max-w-4xl mb-5" }, [
                    createVNode(_component_v_card, {
                      color: "grey-lighten-1",
                      rounded: "lg"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_v_card_text, null, {
                          default: withCtx(() => [
                            createVNode(_sfc_main$2, { gap: "2" }, {
                              default: withCtx(() => [
                                createVNode("p", { class: "font-bold" }, "How it works:"),
                                createVNode("div", null, [
                                  createVNode("p", null, "The popup window will be active as soon as you save it with the following rules:"),
                                  createVNode("p", null, "1. A begin date that is earlier or equal to today"),
                                  createVNode("p", null, "2. No end date or an end date that is equal or later than today")
                                ]),
                                createVNode("p", null, "Once a user dismisses a popup, we use a unique code to ensure that they don't see it again during their session."),
                                createVNode("div", null, [
                                  createVNode("p", { class: "font-bold" }, 'If you check "Generate new code" and update, all users will see the updated popup, even if they dismissed it recently.'),
                                  createVNode("p", { class: "font-bold text-red-darken-3" }, "Use responsibly.")
                                ])
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ])
                ]),
                _: 1
              }),
              createVNode("div", { class: "max-w-4xl" }, [
                createVNode("div", null, [
                  createVNode(_component_v_checkbox, {
                    label: "Generate new code (new announcement only)",
                    modelValue: form.generate_new_code,
                    "onUpdate:modelValue": ($event) => form.generate_new_code = $event
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                createVNode(_sfc_main$2, { gap: "2" }, {
                  default: withCtx(() => [
                    createVNode(_sfc_main$2, { gap: "2" }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "module p-4" }, [
                          createVNode(_sfc_main$2, { center: true }, {
                            default: withCtx(() => [
                              createVNode(_component_v_checkbox, {
                                label: "Show newsletter subscription form",
                                modelValue: form.show_newsletter_form,
                                "onUpdate:modelValue": ($event) => form.show_newsletter_form = $event,
                                "hide-details": ""
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          })
                        ]),
                        createVNode("div", { class: "module p-4" }, [
                          createVNode(_sfc_main$2, null, {
                            default: withCtx(() => [
                              createVNode(_sfc_main$2, null, {
                                default: withCtx(() => [
                                  createVNode(_component_v_label, null, {
                                    default: withCtx(() => [
                                      createTextVNode("Title top")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_v_textarea, {
                                    modelValue: form.title_top,
                                    "onUpdate:modelValue": ($event) => form.title_top = $event,
                                    "error-messages": local_errors.value.title_top,
                                    rows: "1",
                                    "auto-grow": ""
                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                                ]),
                                _: 1
                              }),
                              createVNode(_sfc_main$2, null, {
                                default: withCtx(() => [
                                  createVNode(_component_v_label, null, {
                                    default: withCtx(() => [
                                      createTextVNode("Content top")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_v_textarea, {
                                    modelValue: form.content_top,
                                    "onUpdate:modelValue": ($event) => form.content_top = $event,
                                    "error-messages": local_errors.value.content_top,
                                    rows: "1",
                                    "auto-grow": ""
                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        createVNode("div", { class: "module p-4" }, [
                          createVNode(_sfc_main$2, null, {
                            default: withCtx(() => [
                              createVNode(_sfc_main$2, null, {
                                default: withCtx(() => [
                                  createVNode(_component_v_label, null, {
                                    default: withCtx(() => [
                                      createTextVNode("Title bottom (optional)")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_v_textarea, {
                                    modelValue: form.title_bottom,
                                    "onUpdate:modelValue": ($event) => form.title_bottom = $event,
                                    "error-messages": local_errors.value.title_bottom,
                                    rows: "1",
                                    "auto-grow": ""
                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                                ]),
                                _: 1
                              }),
                              createVNode(_sfc_main$2, null, {
                                default: withCtx(() => [
                                  createVNode(_component_v_label, null, {
                                    default: withCtx(() => [
                                      createTextVNode("Content bottom (optional)")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_v_textarea, {
                                    modelValue: form.content_bottom,
                                    "onUpdate:modelValue": ($event) => form.content_bottom = $event,
                                    "error-messages": local_errors.value.content_bottom,
                                    rows: "1",
                                    "auto-grow": ""
                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        createVNode("div", { class: "module p-4" }, [
                          createVNode(_sfc_main$2, null, {
                            default: withCtx(() => [
                              createVNode(_sfc_main$1, {
                                center: true,
                                justify: "between"
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_v_label, null, {
                                    default: withCtx(() => [
                                      createTextVNode("Image")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode("div", null, [
                                    createVNode(_component_v_checkbox, {
                                      modelValue: uploadNewImage.value,
                                      "onUpdate:modelValue": ($event) => uploadNewImage.value = $event,
                                      label: "Replace image",
                                      "hide-details": ""
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                  ])
                                ]),
                                _: 1
                              }),
                              uploadNewImage.value ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                                createVNode(_component_v_file_upload, {
                                  clearable: "",
                                  modelValue: form.image_upload,
                                  "onUpdate:modelValue": ($event) => form.image_upload = $event,
                                  "error-messages": local_errors.value.image_upload,
                                  title: "Drop or Select image",
                                  icon: ""
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"]),
                                createVNode("p", { class: "text-center text-red text-sm" }, "Please select an image of at least 1200x600px")
                              ], 64)) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                                form.image ? (openBlock(), createBlock(_component_v_img, {
                                  key: 0,
                                  src: `/storage/assets/images/landing/${form.image}`,
                                  "aspect-ratio": "2",
                                  color: "grey-lighten-3",
                                  cover: "",
                                  gradient: `to bottom, rgba(0,0,0,${form.opacity}), rgba(0,0,0,${form.opacity})`,
                                  class: "text-white align-center text-center"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_sfc_main$2, null, {
                                      default: withCtx(() => [
                                        createVNode("p", { class: "text-4xl" }, toDisplayString(form.title_top), 1),
                                        createVNode("p", { class: "text-xl py-2" }, toDisplayString(form.content_top), 1),
                                        form.title_bottom ? (openBlock(), createBlock("p", {
                                          key: 0,
                                          class: "text-4xl"
                                        }, toDisplayString(form.title_bottom), 1)) : createCommentVNode("", true),
                                        form.content_bottom ? (openBlock(), createBlock("p", {
                                          key: 1,
                                          class: "text-xl"
                                        }, toDisplayString(form.content_bottom), 1)) : createCommentVNode("", true)
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }, 8, ["src", "gradient"])) : (openBlock(), createBlock("p", { key: 1 }, "No image"))
                              ], 64))
                            ]),
                            _: 1
                          })
                        ]),
                        createVNode("div", { class: "module p-4" }, [
                          createVNode(_sfc_main$2, null, {
                            default: withCtx(() => [
                              createVNode(_component_v_label, null, {
                                default: withCtx(() => [
                                  createTextVNode("Overlay opacity")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_v_slider, {
                                modelValue: form.opacity,
                                "onUpdate:modelValue": ($event) => form.opacity = $event,
                                "error-messages": local_errors.value.opacity,
                                min: "0",
                                max: "1",
                                ticks: ["0", "0.1", "0.2", "0.3", "0.4", "0.5", "0.6", "0.7", "0.8", "0.9", "1"],
                                "show-ticks": "always",
                                step: "0.1"
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                            ]),
                            _: 1
                          })
                        ]),
                        createVNode("div", { class: "module p-4" }, [
                          createVNode(_sfc_main$2, null, {
                            default: withCtx(() => [
                              createVNode(_component_v_label, null, {
                                default: withCtx(() => [
                                  createTextVNode("Delay before opens (seconds)")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_v_slider, {
                                modelValue: form.delay_seconds,
                                "onUpdate:modelValue": ($event) => form.delay_seconds = $event,
                                "error-messages": local_errors.value.delay_seconds,
                                min: "0",
                                max: "30",
                                ticks: [0, 3, 6, 9, 12, 15, 18, 21, 24, 27, 30],
                                "show-ticks": "always",
                                step: "3"
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                            ]),
                            _: 1
                          })
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(_sfc_main$3, {
                      cols: "1",
                      md: "2",
                      lg: "2",
                      xl: "2",
                      "2xl": "2",
                      gap: "2"
                    }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "module p-4" }, [
                          createVNode(_sfc_main$2, null, {
                            default: withCtx(() => [
                              createVNode(_component_v_label, null, {
                                default: withCtx(() => [
                                  createTextVNode("Active begin date")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_v_date_picker, {
                                modelValue: form.active_begin_date,
                                "onUpdate:modelValue": ($event) => form.active_begin_date = $event
                              }, {
                                header: withCtx(() => [
                                  createVNode("div", { class: "p-5" }, [
                                    form.active_begin_date ? (openBlock(), createBlock("div", { key: 0 }, [
                                      createVNode(_sfc_main$1, {
                                        center: true,
                                        justify: "between"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode("p", { class: "text-xl text-blue font-bold" }, toDisplayString(formattedBeginDate.value), 1),
                                          createVNode(_component_v_btn, {
                                            onClick: withModifiers(clearBeginDate, ["prevent"]),
                                            color: "red",
                                            size: "small",
                                            variant: "text"
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode("Clear date")
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      })
                                    ])) : (openBlock(), createBlock("div", { key: 1 }, [
                                      createVNode("div", null, [
                                        createVNode(_sfc_main$1, {
                                          center: true,
                                          justify: "between"
                                        }, {
                                          default: withCtx(() => [
                                            createVNode("p", { class: "text-xl font-bold" }, "Select begin date")
                                          ]),
                                          _: 1
                                        })
                                      ])
                                    ]))
                                  ])
                                ]),
                                _: 1
                              }, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          })
                        ]),
                        createVNode("div", { class: "module p-4" }, [
                          createVNode(_sfc_main$2, null, {
                            default: withCtx(() => [
                              createVNode(_component_v_label, null, {
                                default: withCtx(() => [
                                  createTextVNode("Active end date")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_v_date_picker, {
                                modelValue: form.active_end_date,
                                "onUpdate:modelValue": ($event) => form.active_end_date = $event
                              }, {
                                header: withCtx(() => [
                                  createVNode("div", { class: "p-5" }, [
                                    form.active_end_date ? (openBlock(), createBlock("div", { key: 0 }, [
                                      createVNode(_sfc_main$1, {
                                        center: true,
                                        justify: "between"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode("p", { class: "text-xl text-blue font-bold" }, toDisplayString(formattedEndDate.value), 1),
                                          createVNode(_component_v_btn, {
                                            onClick: withModifiers(clearEndDate, ["prevent"]),
                                            color: "red",
                                            size: "small",
                                            variant: "text"
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode("Clear date")
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      })
                                    ])) : (openBlock(), createBlock("div", { key: 1 }, [
                                      createVNode("div", null, [
                                        createVNode(_sfc_main$1, {
                                          center: true,
                                          justify: "between"
                                        }, {
                                          default: withCtx(() => [
                                            createVNode("p", { class: "text-xl font-bold" }, "Select end date")
                                          ]),
                                          _: 1
                                        })
                                      ])
                                    ]))
                                  ])
                                ]),
                                _: 1
                              }, 8, ["modelValue", "onUpdate:modelValue"])
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
              createVNode("div", { class: "max-w-4xl my-4" }, [
                createVNode(_sfc_main$1, {
                  center: true,
                  justify: "between"
                }, {
                  default: withCtx(() => [
                    createVNode("div"),
                    createVNode(_sfc_main$1, { center: true }, {
                      default: withCtx(() => [
                        createVNode(_component_v_btn, {
                          disabled: saving.value,
                          onClick: withModifiers(saveContents, ["prevent"])
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Update")
                          ]),
                          _: 1
                        }, 8, ["disabled"]),
                        createCommentVNode("", true)
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
      }, _parent));
      {
        _push(`<!---->`);
      }
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/LandingModal/Home.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Home = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-248b731d"]]);
export {
  Home as default
};
