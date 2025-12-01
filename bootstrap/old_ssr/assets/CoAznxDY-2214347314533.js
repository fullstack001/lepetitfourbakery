import { ref, reactive, computed, resolveComponent, mergeProps, withCtx, createTextVNode, toDisplayString, createVNode, openBlock, createBlock, Fragment, renderList, createCommentVNode, useSSRContext, withModifiers } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderStyle } from "vue/server-renderer";
import { A as AdmLayout } from "./Bmk57_E8-5341323707321.js";
import { router } from "@inertiajs/vue3";
import { _ as _sfc_main$2 } from "./BFeg_3wS-5313717233245.js";
import "./DsvTyKEu-3355343127127.js";
import "./CeVcRmCk-1453137522733.js";
import { a as _sfc_main$3 } from "./Cyl_ukyB-3352317127354.js";
import "./BW6cC8iL-1754723312335.js";
import "./kZV6a-x4-2437327355113.js";
import "./1tPrXgE0-1751246333532.js";
import "./C6q4kDV--4257163313235.js";
import "./DKEAH6nn-4333751172235.js";
import "mitt";
const _sfc_main$1 = {
  __name: "SubscriptionPlanModal",
  __ssrInlineRender: true,
  props: {
    products: Object,
    errors: Object
  },
  setup(__props, { expose: __expose }) {
    const props = __props;
    const showPlanModal = ref(false);
    const selectedPlan = ref(null);
    const modalTitle = ref(null);
    const saveButtonText = ref(null);
    const form = reactive({
      name: null,
      price_weekly: null,
      price_biweekly: null,
      price_monthly: null,
      variations: [],
      quantities: {}
    });
    const openPlan = (plan = null) => {
      local_errors.value = {};
      if (plan) {
        modalTitle.value = "Edit subscription plan";
        selectedPlan.value = plan;
        form.name = plan.name;
        form.price_weekly = plan.price_weekly;
        form.price_biweekly = plan.price_biweekly;
        form.price_monthly = plan.price_monthly;
        form.variations = plan.variation_uids;
        form.quantities = plan.quantities;
        form.active = plan.active === 1;
      } else {
        modalTitle.value = "Create subscription plan";
        selectedPlan.value = null;
        form.name = null;
        form.price_weekly = null;
        form.price_biweekly = null;
        form.price_monthly = null;
        form.variations = [];
        form.quantities = {};
        form.active = true;
      }
      saveButtonText.value = "Save plan";
      showPlanModal.value = true;
    };
    const handleCheckboxChange = (uid) => {
      if (selectedPlan.value && !selectedPlan.value.has_customization) {
        if (form.variations.includes(uid)) {
          if (!form.quantities[uid]) {
            form.quantities = { ...form.quantities, [uid]: 1 };
          }
        } else {
          delete form.quantities[uid];
        }
      }
    };
    const productQuantity = computed(() => {
      if (selectedPlan.value) {
        if (selectedPlan.value.has_customization) {
          return form.variations.length;
        } else {
          return Object.values(form.quantities).reduce((sum, quantity) => sum + quantity, 0);
        }
      } else {
        return 0;
      }
    });
    const isActive = (uid) => {
      return form.variations.includes(uid);
    };
    const local_errors = ref({});
    const closePlan = () => {
      showPlanModal.value = false;
      selectedPlan.value = null;
    };
    const savePlan = () => {
      let url;
      if (selectedPlan.value) {
        url = route("admin.update_plan", { plan: selectedPlan.value.uid });
      } else {
        return;
      }
      router.post(url, form, {
        preserveScroll: true,
        preserveState: true,
        onSuccess: (page) => {
          closePlan();
        },
        onError: (error) => {
          local_errors.value = props.errors;
        }
      });
    };
    __expose({ openPlan });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_v_label = resolveComponent("v-label");
      const _component_v_text_field = resolveComponent("v-text-field");
      const _component_v_checkbox = resolveComponent("v-checkbox");
      const _component_v_card = resolveComponent("v-card");
      const _component_v_number_input = resolveComponent("v-number-input");
      const _component_v_btn = resolveComponent("v-btn");
      _push(ssrRenderComponent(_sfc_main$2, mergeProps({
        show: showPlanModal.value,
        onClose: closePlan
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
            _push2(`<div${_scopeId}>`);
            _push2(ssrRenderComponent(_component_v_label, { class: "uppercase" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Name`);
                } else {
                  return [
                    createTextVNode("Name")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_v_text_field, {
              modelValue: form.name,
              "onUpdate:modelValue": ($event) => form.name = $event,
              "error-messages": local_errors.value.name,
              disabled: ""
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
            if (selectedPlan.value && !selectedPlan.value.has_customization) {
              _push2(`<div class="mb-5 flex flex-row justify-center"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_v_checkbox, {
                label: "is active",
                modelValue: form.active,
                "onUpdate:modelValue": ($event) => form.active = $event,
                "error-messages": local_errors.value.active
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div${_scopeId}><div class="grid grid-cols-1 lg:grid-cols-3 gap-3"${_scopeId}><div${_scopeId}>`);
            _push2(ssrRenderComponent(_component_v_label, { class: "uppercase" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Once per week`);
                } else {
                  return [
                    createTextVNode("Once per week")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_v_text_field, {
              "prepend-inner-icon": "mdi-currency-usd",
              modelValue: form.price_weekly,
              "onUpdate:modelValue": ($event) => form.price_weekly = $event,
              "error-messages": local_errors.value.price_weekly
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_component_v_label, { class: "uppercase" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Twice per month`);
                } else {
                  return [
                    createTextVNode("Twice per month")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_v_text_field, {
              "prepend-inner-icon": "mdi-currency-usd",
              modelValue: form.price_biweekly,
              "onUpdate:modelValue": ($event) => form.price_biweekly = $event,
              "error-messages": local_errors.value.price_biweekly
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_component_v_label, { class: "uppercase" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Once per month`);
                } else {
                  return [
                    createTextVNode("Once per month")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_v_text_field, {
              "prepend-inner-icon": "mdi-currency-usd",
              modelValue: form.price_monthly,
              "onUpdate:modelValue": ($event) => form.price_monthly = $event,
              "error-messages": local_errors.value.price_monthly
            }, null, _parent2, _scopeId));
            _push2(`</div></div></div><div${_scopeId}>`);
            if (Object.keys(props.products).length) {
              _push2(`<div class="flex flex-col gap-3"${_scopeId}><p class="text-lg"${_scopeId}>Select one or more products</p>`);
              if (local_errors.value.products) {
                _push2(`<p class="text-red"${_scopeId}>${ssrInterpolate(local_errors.value.products)}</p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<!--[-->`);
              ssrRenderList(props.products, (product, name) => {
                _push2(ssrRenderComponent(_component_v_card, {
                  key: name,
                  color: "black",
                  variant: "tonal",
                  density: "compact"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<div class="px-2 py-2"${_scopeId2}><p class="text-lg"${_scopeId2}>${ssrInterpolate(name)}</p><!--[-->`);
                      ssrRenderList(product, (variation) => {
                        _push3(`<div${_scopeId2}><div class="flex flex-row items-center gap-10 w-full my-2"${_scopeId2}><div class="grow"${_scopeId2}>`);
                        _push3(ssrRenderComponent(_component_v_checkbox, {
                          class: "grow",
                          label: variation.name,
                          value: variation.uid,
                          modelValue: form.variations,
                          "onUpdate:modelValue": ($event) => form.variations = $event,
                          density: "compact",
                          multiple: "",
                          "hide-details": "",
                          disabled: selectedPlan.value && (selectedPlan.value.has_customization ? false : productQuantity.value >= 9 && !isActive(variation.uid)),
                          onChange: ($event) => handleCheckboxChange(variation.uid)
                        }, null, _parent3, _scopeId2));
                        _push3(`</div><div style="${ssrRenderStyle({ "width": "200px" })}" class="shrink-0"${_scopeId2}>`);
                        if (form.variations.includes(variation.uid) && selectedPlan.value && !selectedPlan.value.has_customization) {
                          _push3(ssrRenderComponent(_component_v_number_input, {
                            class: "shrink-0",
                            modelValue: form.quantities[variation.uid],
                            "onUpdate:modelValue": ($event) => form.quantities[variation.uid] = $event,
                            type: "number",
                            density: "compact",
                            variant: "outlined",
                            "control-variant": "stacked",
                            min: 1,
                            max: 9 - (productQuantity.value - form.quantities[variation.uid]),
                            "hide-details": ""
                          }, null, _parent3, _scopeId2));
                        } else {
                          _push3(`<!---->`);
                        }
                        _push3(`</div></div></div>`);
                      });
                      _push3(`<!--]--></div>`);
                    } else {
                      return [
                        createVNode("div", { class: "px-2 py-2" }, [
                          createVNode("p", { class: "text-lg" }, toDisplayString(name), 1),
                          (openBlock(true), createBlock(Fragment, null, renderList(product, (variation) => {
                            return openBlock(), createBlock("div", {
                              key: variation.uid
                            }, [
                              createVNode("div", { class: "flex flex-row items-center gap-10 w-full my-2" }, [
                                createVNode("div", { class: "grow" }, [
                                  createVNode(_component_v_checkbox, {
                                    class: "grow",
                                    label: variation.name,
                                    value: variation.uid,
                                    modelValue: form.variations,
                                    "onUpdate:modelValue": ($event) => form.variations = $event,
                                    density: "compact",
                                    multiple: "",
                                    "hide-details": "",
                                    disabled: selectedPlan.value && (selectedPlan.value.has_customization ? false : productQuantity.value >= 9 && !isActive(variation.uid)),
                                    onChange: ($event) => handleCheckboxChange(variation.uid)
                                  }, null, 8, ["label", "value", "modelValue", "onUpdate:modelValue", "disabled", "onChange"])
                                ]),
                                createVNode("div", {
                                  style: { "width": "200px" },
                                  class: "shrink-0"
                                }, [
                                  form.variations.includes(variation.uid) && selectedPlan.value && !selectedPlan.value.has_customization ? (openBlock(), createBlock(_component_v_number_input, {
                                    key: 0,
                                    class: "shrink-0",
                                    modelValue: form.quantities[variation.uid],
                                    "onUpdate:modelValue": ($event) => form.quantities[variation.uid] = $event,
                                    type: "number",
                                    density: "compact",
                                    variant: "outlined",
                                    "control-variant": "stacked",
                                    min: 1,
                                    max: 9 - (productQuantity.value - form.quantities[variation.uid]),
                                    "hide-details": ""
                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "max"])) : createCommentVNode("", true)
                                ])
                              ])
                            ]);
                          }), 128))
                        ])
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              });
              _push2(`<!--]--></div>`);
            } else {
              _push2(`<div${_scopeId}><p class="text-red"${_scopeId}>You haven&#39;t created any products yet</p></div>`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", null, [
                createVNode(_component_v_label, { class: "uppercase" }, {
                  default: withCtx(() => [
                    createTextVNode("Name")
                  ]),
                  _: 1
                }),
                createVNode(_component_v_text_field, {
                  modelValue: form.name,
                  "onUpdate:modelValue": ($event) => form.name = $event,
                  "error-messages": local_errors.value.name,
                  disabled: ""
                }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
              ]),
              selectedPlan.value && !selectedPlan.value.has_customization ? (openBlock(), createBlock("div", {
                key: 0,
                class: "mb-5 flex flex-row justify-center"
              }, [
                createVNode(_component_v_checkbox, {
                  label: "is active",
                  modelValue: form.active,
                  "onUpdate:modelValue": ($event) => form.active = $event,
                  "error-messages": local_errors.value.active
                }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
              ])) : createCommentVNode("", true),
              createVNode("div", null, [
                createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-3 gap-3" }, [
                  createVNode("div", null, [
                    createVNode(_component_v_label, { class: "uppercase" }, {
                      default: withCtx(() => [
                        createTextVNode("Once per week")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_v_text_field, {
                      "prepend-inner-icon": "mdi-currency-usd",
                      modelValue: form.price_weekly,
                      "onUpdate:modelValue": ($event) => form.price_weekly = $event,
                      "error-messages": local_errors.value.price_weekly
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                  ]),
                  createVNode("div", null, [
                    createVNode(_component_v_label, { class: "uppercase" }, {
                      default: withCtx(() => [
                        createTextVNode("Twice per month")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_v_text_field, {
                      "prepend-inner-icon": "mdi-currency-usd",
                      modelValue: form.price_biweekly,
                      "onUpdate:modelValue": ($event) => form.price_biweekly = $event,
                      "error-messages": local_errors.value.price_biweekly
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                  ]),
                  createVNode("div", null, [
                    createVNode(_component_v_label, { class: "uppercase" }, {
                      default: withCtx(() => [
                        createTextVNode("Once per month")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_v_text_field, {
                      "prepend-inner-icon": "mdi-currency-usd",
                      modelValue: form.price_monthly,
                      "onUpdate:modelValue": ($event) => form.price_monthly = $event,
                      "error-messages": local_errors.value.price_monthly
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                  ])
                ])
              ]),
              createVNode("div", null, [
                Object.keys(props.products).length ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "flex flex-col gap-3"
                }, [
                  createVNode("p", { class: "text-lg" }, "Select one or more products"),
                  local_errors.value.products ? (openBlock(), createBlock("p", {
                    key: 0,
                    class: "text-red"
                  }, toDisplayString(local_errors.value.products), 1)) : createCommentVNode("", true),
                  (openBlock(true), createBlock(Fragment, null, renderList(props.products, (product, name) => {
                    return openBlock(), createBlock(_component_v_card, {
                      key: name,
                      color: "black",
                      variant: "tonal",
                      density: "compact"
                    }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "px-2 py-2" }, [
                          createVNode("p", { class: "text-lg" }, toDisplayString(name), 1),
                          (openBlock(true), createBlock(Fragment, null, renderList(product, (variation) => {
                            return openBlock(), createBlock("div", {
                              key: variation.uid
                            }, [
                              createVNode("div", { class: "flex flex-row items-center gap-10 w-full my-2" }, [
                                createVNode("div", { class: "grow" }, [
                                  createVNode(_component_v_checkbox, {
                                    class: "grow",
                                    label: variation.name,
                                    value: variation.uid,
                                    modelValue: form.variations,
                                    "onUpdate:modelValue": ($event) => form.variations = $event,
                                    density: "compact",
                                    multiple: "",
                                    "hide-details": "",
                                    disabled: selectedPlan.value && (selectedPlan.value.has_customization ? false : productQuantity.value >= 9 && !isActive(variation.uid)),
                                    onChange: ($event) => handleCheckboxChange(variation.uid)
                                  }, null, 8, ["label", "value", "modelValue", "onUpdate:modelValue", "disabled", "onChange"])
                                ]),
                                createVNode("div", {
                                  style: { "width": "200px" },
                                  class: "shrink-0"
                                }, [
                                  form.variations.includes(variation.uid) && selectedPlan.value && !selectedPlan.value.has_customization ? (openBlock(), createBlock(_component_v_number_input, {
                                    key: 0,
                                    class: "shrink-0",
                                    modelValue: form.quantities[variation.uid],
                                    "onUpdate:modelValue": ($event) => form.quantities[variation.uid] = $event,
                                    type: "number",
                                    density: "compact",
                                    variant: "outlined",
                                    "control-variant": "stacked",
                                    min: 1,
                                    max: 9 - (productQuantity.value - form.quantities[variation.uid]),
                                    "hide-details": ""
                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "max"])) : createCommentVNode("", true)
                                ])
                              ])
                            ]);
                          }), 128))
                        ])
                      ]),
                      _: 2
                    }, 1024);
                  }), 128))
                ])) : (openBlock(), createBlock("div", { key: 1 }, [
                  createVNode("p", { class: "text-red" }, "You haven't created any products yet")
                ]))
              ])
            ];
          }
        }),
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$3, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_v_btn, {
                    variant: "flat",
                    color: "#000",
                    onClick: savePlan
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(saveButtonText.value)} ${ssrInterpolate(`(${productQuantity.value} product${productQuantity.value === 1 ? "" : "s"})`)}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(saveButtonText.value) + " " + toDisplayString(`(${productQuantity.value} product${productQuantity.value === 1 ? "" : "s"})`), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_v_btn, {
                    variant: "tonal",
                    color: "#000",
                    onClick: closePlan
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Cancel`);
                      } else {
                        return [
                          createTextVNode("Cancel")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_v_btn, {
                      variant: "flat",
                      color: "#000",
                      onClick: savePlan
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(saveButtonText.value) + " " + toDisplayString(`(${productQuantity.value} product${productQuantity.value === 1 ? "" : "s"})`), 1)
                      ]),
                      _: 1
                    }),
                    createVNode(_component_v_btn, {
                      variant: "tonal",
                      color: "#000",
                      onClick: closePlan
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Cancel")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$3, null, {
                default: withCtx(() => [
                  createVNode(_component_v_btn, {
                    variant: "flat",
                    color: "#000",
                    onClick: savePlan
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(saveButtonText.value) + " " + toDisplayString(`(${productQuantity.value} product${productQuantity.value === 1 ? "" : "s"})`), 1)
                    ]),
                    _: 1
                  }),
                  createVNode(_component_v_btn, {
                    variant: "tonal",
                    color: "#000",
                    onClick: closePlan
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Cancel")
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
      }, _parent));
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/SubscriptionPlanModal.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "Plans",
  __ssrInlineRender: true,
  props: {
    plans: Object,
    products: Object,
    errors: Object
  },
  setup(__props) {
    const props = __props;
    const planModal = ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_v_card = resolveComponent("v-card");
      const _component_v_card_item = resolveComponent("v-card-item");
      const _component_v_btn = resolveComponent("v-btn");
      const _component_v_img = resolveComponent("v-img");
      _push(ssrRenderComponent(AdmLayout, mergeProps({ title: "Subscription plans" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="grid grid-cols-1 lg:grid-cols-2 gap-3"${_scopeId}><!--[-->`);
            ssrRenderList(props.plans, (plan) => {
              _push2(`<div${_scopeId}>`);
              _push2(ssrRenderComponent(_component_v_card, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_v_card_item, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<div class="flex flex-row items-center justify-between"${_scopeId3}><div class="flex flex-row items-center gap-3"${_scopeId3}><p class="text-xl"${_scopeId3}>Plan: <strong${_scopeId3}>${ssrInterpolate(plan.name)}</strong></p>`);
                          _push4(ssrRenderComponent(_component_v_btn, {
                            color: plan.active ? "green" : "red",
                            "prepend-icon": plan.active ? "mdi-eye" : "mdi-eye-off",
                            size: "small",
                            variant: "outlined"
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`${ssrInterpolate(plan.active ? "Active" : "Disabled")}`);
                              } else {
                                return [
                                  createTextVNode(toDisplayString(plan.active ? "Active" : "Disabled"), 1)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                          _push4(`</div><div${_scopeId3}>`);
                          _push4(ssrRenderComponent(_component_v_btn, {
                            onClick: ($event) => planModal.value.openPlan(plan),
                            size: "small"
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`Edit plan`);
                              } else {
                                return [
                                  createTextVNode("Edit plan")
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                          _push4(`</div></div><div class="my-2"${_scopeId3}><hr${_scopeId3}></div><div${_scopeId3}><div class="grid grid-cols-1 lg:grid-cols-3 gap-3"${_scopeId3}><div${_scopeId3}><p${_scopeId3}>Once per week</p><p class="text-lg font-bold"${_scopeId3}>${ssrInterpolate(plan.price_weekly_string)}</p></div><div${_scopeId3}><p${_scopeId3}>Twice per month</p><p class="text-lg font-bold"${_scopeId3}>${ssrInterpolate(plan.price_biweekly_string)}</p></div><div${_scopeId3}><p${_scopeId3}>Once per month</p><p class="text-lg font-bold"${_scopeId3}>${ssrInterpolate(plan.price_monthly_string)}</p></div></div></div><div class="my-2"${_scopeId3}><hr${_scopeId3}></div><div${_scopeId3}><div class="flex flex-col gap-2"${_scopeId3}><!--[-->`);
                          ssrRenderList(plan.variations, (variation) => {
                            _push4(`<div${_scopeId3}>`);
                            _push4(ssrRenderComponent(_component_v_card, { color: "grey-lighten-2" }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`<div class="flex flex-row items-center"${_scopeId4}><div style="${ssrRenderStyle({ "width": "50px" })}" class="shrink-0"${_scopeId4}>`);
                                  _push5(ssrRenderComponent(_component_v_img, {
                                    "aspect-ratio": "0.6667",
                                    src: variation.product.image_url,
                                    width: "50px"
                                  }, null, _parent5, _scopeId4));
                                  _push5(`</div><div class="p-3 flex-1 min-w-0"${_scopeId4}><div class="flex flex-row items-center gap-2 w-full"${_scopeId4}><p class="font-bold"${_scopeId4}>${ssrInterpolate(variation.product.name)} (${ssrInterpolate(variation.name)})</p>`);
                                  if (!plan.has_customization) {
                                    _push5(`<p${_scopeId4}>x ${ssrInterpolate(variation.pivot.quantity)}</p>`);
                                  } else {
                                    _push5(`<!---->`);
                                  }
                                  _push5(`</div></div></div>`);
                                } else {
                                  return [
                                    createVNode("div", { class: "flex flex-row items-center" }, [
                                      createVNode("div", {
                                        style: { "width": "50px" },
                                        class: "shrink-0"
                                      }, [
                                        createVNode(_component_v_img, {
                                          "aspect-ratio": "0.6667",
                                          src: variation.product.image_url,
                                          width: "50px"
                                        }, null, 8, ["src"])
                                      ]),
                                      createVNode("div", { class: "p-3 flex-1 min-w-0" }, [
                                        createVNode("div", { class: "flex flex-row items-center gap-2 w-full" }, [
                                          createVNode("p", { class: "font-bold" }, toDisplayString(variation.product.name) + " (" + toDisplayString(variation.name) + ")", 1),
                                          !plan.has_customization ? (openBlock(), createBlock("p", { key: 0 }, "x " + toDisplayString(variation.pivot.quantity), 1)) : createCommentVNode("", true)
                                        ])
                                      ])
                                    ])
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                            _push4(`</div>`);
                          });
                          _push4(`<!--]--></div></div>`);
                        } else {
                          return [
                            createVNode("div", { class: "flex flex-row items-center justify-between" }, [
                              createVNode("div", { class: "flex flex-row items-center gap-3" }, [
                                createVNode("p", { class: "text-xl" }, [
                                  createTextVNode("Plan: "),
                                  createVNode("strong", null, toDisplayString(plan.name), 1)
                                ]),
                                createVNode(_component_v_btn, {
                                  color: plan.active ? "green" : "red",
                                  "prepend-icon": plan.active ? "mdi-eye" : "mdi-eye-off",
                                  size: "small",
                                  variant: "outlined"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(plan.active ? "Active" : "Disabled"), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["color", "prepend-icon"])
                              ]),
                              createVNode("div", null, [
                                createVNode(_component_v_btn, {
                                  onClick: withModifiers(($event) => planModal.value.openPlan(plan), ["prevent"]),
                                  size: "small"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("Edit plan")
                                  ]),
                                  _: 2
                                }, 1032, ["onClick"])
                              ])
                            ]),
                            createVNode("div", { class: "my-2" }, [
                              createVNode("hr")
                            ]),
                            createVNode("div", null, [
                              createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-3 gap-3" }, [
                                createVNode("div", null, [
                                  createVNode("p", null, "Once per week"),
                                  createVNode("p", { class: "text-lg font-bold" }, toDisplayString(plan.price_weekly_string), 1)
                                ]),
                                createVNode("div", null, [
                                  createVNode("p", null, "Twice per month"),
                                  createVNode("p", { class: "text-lg font-bold" }, toDisplayString(plan.price_biweekly_string), 1)
                                ]),
                                createVNode("div", null, [
                                  createVNode("p", null, "Once per month"),
                                  createVNode("p", { class: "text-lg font-bold" }, toDisplayString(plan.price_monthly_string), 1)
                                ])
                              ])
                            ]),
                            createVNode("div", { class: "my-2" }, [
                              createVNode("hr")
                            ]),
                            createVNode("div", null, [
                              createVNode("div", { class: "flex flex-col gap-2" }, [
                                (openBlock(true), createBlock(Fragment, null, renderList(plan.variations, (variation) => {
                                  return openBlock(), createBlock("div", null, [
                                    createVNode(_component_v_card, { color: "grey-lighten-2" }, {
                                      default: withCtx(() => [
                                        createVNode("div", { class: "flex flex-row items-center" }, [
                                          createVNode("div", {
                                            style: { "width": "50px" },
                                            class: "shrink-0"
                                          }, [
                                            createVNode(_component_v_img, {
                                              "aspect-ratio": "0.6667",
                                              src: variation.product.image_url,
                                              width: "50px"
                                            }, null, 8, ["src"])
                                          ]),
                                          createVNode("div", { class: "p-3 flex-1 min-w-0" }, [
                                            createVNode("div", { class: "flex flex-row items-center gap-2 w-full" }, [
                                              createVNode("p", { class: "font-bold" }, toDisplayString(variation.product.name) + " (" + toDisplayString(variation.name) + ")", 1),
                                              !plan.has_customization ? (openBlock(), createBlock("p", { key: 0 }, "x " + toDisplayString(variation.pivot.quantity), 1)) : createCommentVNode("", true)
                                            ])
                                          ])
                                        ])
                                      ]),
                                      _: 2
                                    }, 1024)
                                  ]);
                                }), 256))
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
                          createVNode("div", { class: "flex flex-row items-center justify-between" }, [
                            createVNode("div", { class: "flex flex-row items-center gap-3" }, [
                              createVNode("p", { class: "text-xl" }, [
                                createTextVNode("Plan: "),
                                createVNode("strong", null, toDisplayString(plan.name), 1)
                              ]),
                              createVNode(_component_v_btn, {
                                color: plan.active ? "green" : "red",
                                "prepend-icon": plan.active ? "mdi-eye" : "mdi-eye-off",
                                size: "small",
                                variant: "outlined"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(plan.active ? "Active" : "Disabled"), 1)
                                ]),
                                _: 2
                              }, 1032, ["color", "prepend-icon"])
                            ]),
                            createVNode("div", null, [
                              createVNode(_component_v_btn, {
                                onClick: withModifiers(($event) => planModal.value.openPlan(plan), ["prevent"]),
                                size: "small"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("Edit plan")
                                ]),
                                _: 2
                              }, 1032, ["onClick"])
                            ])
                          ]),
                          createVNode("div", { class: "my-2" }, [
                            createVNode("hr")
                          ]),
                          createVNode("div", null, [
                            createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-3 gap-3" }, [
                              createVNode("div", null, [
                                createVNode("p", null, "Once per week"),
                                createVNode("p", { class: "text-lg font-bold" }, toDisplayString(plan.price_weekly_string), 1)
                              ]),
                              createVNode("div", null, [
                                createVNode("p", null, "Twice per month"),
                                createVNode("p", { class: "text-lg font-bold" }, toDisplayString(plan.price_biweekly_string), 1)
                              ]),
                              createVNode("div", null, [
                                createVNode("p", null, "Once per month"),
                                createVNode("p", { class: "text-lg font-bold" }, toDisplayString(plan.price_monthly_string), 1)
                              ])
                            ])
                          ]),
                          createVNode("div", { class: "my-2" }, [
                            createVNode("hr")
                          ]),
                          createVNode("div", null, [
                            createVNode("div", { class: "flex flex-col gap-2" }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(plan.variations, (variation) => {
                                return openBlock(), createBlock("div", null, [
                                  createVNode(_component_v_card, { color: "grey-lighten-2" }, {
                                    default: withCtx(() => [
                                      createVNode("div", { class: "flex flex-row items-center" }, [
                                        createVNode("div", {
                                          style: { "width": "50px" },
                                          class: "shrink-0"
                                        }, [
                                          createVNode(_component_v_img, {
                                            "aspect-ratio": "0.6667",
                                            src: variation.product.image_url,
                                            width: "50px"
                                          }, null, 8, ["src"])
                                        ]),
                                        createVNode("div", { class: "p-3 flex-1 min-w-0" }, [
                                          createVNode("div", { class: "flex flex-row items-center gap-2 w-full" }, [
                                            createVNode("p", { class: "font-bold" }, toDisplayString(variation.product.name) + " (" + toDisplayString(variation.name) + ")", 1),
                                            !plan.has_customization ? (openBlock(), createBlock("p", { key: 0 }, "x " + toDisplayString(variation.pivot.quantity), 1)) : createCommentVNode("", true)
                                          ])
                                        ])
                                      ])
                                    ]),
                                    _: 2
                                  }, 1024)
                                ]);
                              }), 256))
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
            _push2(`<!--]--></div>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              ref_key: "planModal",
              ref: planModal,
              products: props.products,
              errors: props.errors
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-2 gap-3" }, [
                (openBlock(true), createBlock(Fragment, null, renderList(props.plans, (plan) => {
                  return openBlock(), createBlock("div", null, [
                    createVNode(_component_v_card, null, {
                      default: withCtx(() => [
                        createVNode(_component_v_card_item, null, {
                          default: withCtx(() => [
                            createVNode("div", { class: "flex flex-row items-center justify-between" }, [
                              createVNode("div", { class: "flex flex-row items-center gap-3" }, [
                                createVNode("p", { class: "text-xl" }, [
                                  createTextVNode("Plan: "),
                                  createVNode("strong", null, toDisplayString(plan.name), 1)
                                ]),
                                createVNode(_component_v_btn, {
                                  color: plan.active ? "green" : "red",
                                  "prepend-icon": plan.active ? "mdi-eye" : "mdi-eye-off",
                                  size: "small",
                                  variant: "outlined"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(plan.active ? "Active" : "Disabled"), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["color", "prepend-icon"])
                              ]),
                              createVNode("div", null, [
                                createVNode(_component_v_btn, {
                                  onClick: withModifiers(($event) => planModal.value.openPlan(plan), ["prevent"]),
                                  size: "small"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("Edit plan")
                                  ]),
                                  _: 2
                                }, 1032, ["onClick"])
                              ])
                            ]),
                            createVNode("div", { class: "my-2" }, [
                              createVNode("hr")
                            ]),
                            createVNode("div", null, [
                              createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-3 gap-3" }, [
                                createVNode("div", null, [
                                  createVNode("p", null, "Once per week"),
                                  createVNode("p", { class: "text-lg font-bold" }, toDisplayString(plan.price_weekly_string), 1)
                                ]),
                                createVNode("div", null, [
                                  createVNode("p", null, "Twice per month"),
                                  createVNode("p", { class: "text-lg font-bold" }, toDisplayString(plan.price_biweekly_string), 1)
                                ]),
                                createVNode("div", null, [
                                  createVNode("p", null, "Once per month"),
                                  createVNode("p", { class: "text-lg font-bold" }, toDisplayString(plan.price_monthly_string), 1)
                                ])
                              ])
                            ]),
                            createVNode("div", { class: "my-2" }, [
                              createVNode("hr")
                            ]),
                            createVNode("div", null, [
                              createVNode("div", { class: "flex flex-col gap-2" }, [
                                (openBlock(true), createBlock(Fragment, null, renderList(plan.variations, (variation) => {
                                  return openBlock(), createBlock("div", null, [
                                    createVNode(_component_v_card, { color: "grey-lighten-2" }, {
                                      default: withCtx(() => [
                                        createVNode("div", { class: "flex flex-row items-center" }, [
                                          createVNode("div", {
                                            style: { "width": "50px" },
                                            class: "shrink-0"
                                          }, [
                                            createVNode(_component_v_img, {
                                              "aspect-ratio": "0.6667",
                                              src: variation.product.image_url,
                                              width: "50px"
                                            }, null, 8, ["src"])
                                          ]),
                                          createVNode("div", { class: "p-3 flex-1 min-w-0" }, [
                                            createVNode("div", { class: "flex flex-row items-center gap-2 w-full" }, [
                                              createVNode("p", { class: "font-bold" }, toDisplayString(variation.product.name) + " (" + toDisplayString(variation.name) + ")", 1),
                                              !plan.has_customization ? (openBlock(), createBlock("p", { key: 0 }, "x " + toDisplayString(variation.pivot.quantity), 1)) : createCommentVNode("", true)
                                            ])
                                          ])
                                        ])
                                      ]),
                                      _: 2
                                    }, 1024)
                                  ]);
                                }), 256))
                              ])
                            ])
                          ]),
                          _: 2
                        }, 1024)
                      ]),
                      _: 2
                    }, 1024)
                  ]);
                }), 256))
              ]),
              createVNode(_sfc_main$1, {
                ref_key: "planModal",
                ref: planModal,
                products: props.products,
                errors: props.errors
              }, null, 8, ["products", "errors"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Subscriptions/Plans.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
