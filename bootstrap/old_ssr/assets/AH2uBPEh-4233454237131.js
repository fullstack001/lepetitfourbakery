import { reactive, ref, computed, onMounted, nextTick, resolveComponent, mergeProps, withCtx, createTextVNode, toDisplayString, createVNode, openBlock, createBlock, createCommentVNode, Fragment, renderList, withModifiers, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { A as AdmLayout } from "./Bmk57_E8-5341323707321.js";
import { router } from "@inertiajs/vue3";
import { _ as _export_sfc } from "./1tPrXgE0-1751246333532.js";
import "./BW6cC8iL-1754723312335.js";
import "./kZV6a-x4-2437327355113.js";
const _sfc_main = {
  __name: "Home",
  __ssrInlineRender: true,
  props: {
    refresh: Object,
    products: Object,
    plans: Object,
    active_plans: Object
  },
  setup(__props) {
    const props = __props;
    const form = reactive({
      active_plans: [],
      in_sneak_peek_menu: [],
      in_catering_menu: [],
      in_add_ons_menu: [],
      in_subscriptions: []
    });
    const hasChanged = ref(false);
    const updatePlanProducts = () => {
      nextTick(() => {
        Object.keys(form.in_subscriptions).forEach((planUid) => {
          if (!form.active_plans.includes(planUid)) {
            delete form.in_subscriptions[planUid];
          }
        });
        const newSubscriptions = form.active_plans.reduce((acc, planUid) => {
          const plan = props.active_plans.find((plan2) => plan2.uid === planUid);
          if (plan) {
            acc[planUid] = plan.products.map((product) => product.uid);
          } else {
            acc[planUid] = form.in_subscriptions[planUid] || [];
          }
          return acc;
        }, {});
        form.in_subscriptions = { ...newSubscriptions };
      });
    };
    const updatedPlanSelection = () => {
      updatePlanProducts();
      hasChanged.value = true;
    };
    const updatedProductSelection = () => {
      hasChanged.value = true;
    };
    const importStatus = ref("default");
    const importButtonColor = computed(() => {
      if (importStatus.value === "saving") return "grey";
      if (importStatus.value === "saved") return "green";
      if (importStatus.value === "error") return "red";
      return "black";
    });
    const importButtonText = computed(() => {
      if (importStatus.value === "saving") return "Refreshing...";
      if (importStatus.value === "saved") return "The list of products was successfully refreshed";
      if (importStatus.value === "error") return "An error occurred";
      return "Refresh product list from Square";
    });
    const refreshProducts = () => {
      if (importStatus.value === "default") {
        importStatus.value = "saving";
        router.post(route("admin.refresh_products"), {}, {
          preserveScroll: true,
          preserveState: true,
          only: [""],
          onSuccess: (page) => {
            console.log("success");
            importStatus.value = "saved";
            setTimeout(() => {
              importStatus.value = "default";
            }, 2e3);
          },
          onError: (error) => {
            importStatus.value = "error";
            setTimeout(() => {
              importStatus.value = "default";
            }, 5e3);
            console.log(error);
          }
        });
      }
    };
    const saveSelectionStatus = ref("default");
    const saveSelectionBgColor = computed(() => {
      if (saveSelectionStatus.value === "saving") return "grey";
      if (saveSelectionStatus.value === "saved") return "green";
      if (hasChanged.value) {
        return "yellow";
      }
      return "black";
    });
    const saveSelectionTextColor = computed(() => {
      if (saveSelectionStatus.value === "saving") return "black";
      if (saveSelectionStatus.value === "saved") return "white";
      if (hasChanged.value) {
        return "black";
      }
      return "white";
    });
    const saveSelection = () => {
      if (saveSelectionStatus.value === "default") {
        saveSelectionStatus.value = "saving";
        router.post(route("admin.save_product_selection"), form, {
          preserveScroll: true,
          preserveState: true,
          only: [""],
          onSuccess: (page) => {
            console.log("success");
            saveSelectionStatus.value = "saved";
            setTimeout(() => {
              saveSelectionStatus.value = "default";
              hasChanged.value = false;
            }, 2e3);
          },
          onError: (error) => {
            saveSelectionStatus.value = "error";
            setTimeout(() => {
              saveSelectionStatus.value = "default";
            }, 5e3);
            console.log(error);
          }
        });
      }
    };
    const getPlanName = (uid) => {
      const plan = props.plans.find((plan2) => plan2.uid === uid);
      return plan ? plan.name : "";
    };
    ref(false);
    onMounted(() => {
      nextTick(() => {
        const activePlansArray = Object.values(props.active_plans);
        form.active_plans = activePlansArray.map((plan) => plan.uid);
        form.in_sneak_peek_menu = props.products.filter((product) => product.in_sneak_peek_menu).map((product) => product.uid);
        form.in_catering_menu = props.products.filter((product) => product.in_catering_menu).map((product) => product.uid);
        form.in_add_ons_menu = props.products.filter((product) => product.in_add_ons_menu).map((product) => product.uid);
        form.in_subscriptions = activePlansArray.reduce((acc, plan) => {
          acc[plan.uid] = plan.products.map((product) => product.uid);
          return acc;
        }, {});
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_v_btn = resolveComponent("v-btn");
      const _component_v_card = resolveComponent("v-card");
      const _component_v_card_item = resolveComponent("v-card-item");
      const _component_v_chip = resolveComponent("v-chip");
      const _component_v_checkbox = resolveComponent("v-checkbox");
      const _component_v_img = resolveComponent("v-img");
      _push(ssrRenderComponent(AdmLayout, mergeProps({ title: "Products" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="product-column" data-v-e0b68050${_scopeId}><div class="mt-5 flex justify-between" data-v-e0b68050${_scopeId}>`);
            _push2(ssrRenderComponent(_component_v_btn, {
              color: importButtonColor.value,
              onClick: refreshProducts
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(importButtonText.value)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(importButtonText.value), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<p data-v-e0b68050${_scopeId}>Last refreshed: <strong data-v-e0b68050${_scopeId}>${ssrInterpolate(__props.refresh.formatted)}</strong></p></div><div class="mt-4" data-v-e0b68050${_scopeId}>`);
            _push2(ssrRenderComponent(_component_v_card, { color: "blue-grey" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_v_card_item, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<p data-v-e0b68050${_scopeId3}>Subscription plans: ${ssrInterpolate(props.plans.length)}</p>`);
                      } else {
                        return [
                          createVNode("p", null, "Subscription plans: " + toDisplayString(props.plans.length), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_v_card_item, null, {
                      default: withCtx(() => [
                        createVNode("p", null, "Subscription plans: " + toDisplayString(props.plans.length), 1)
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><!--[-->`);
            ssrRenderList(props.plans, (plan) => {
              _push2(`<div class="mt-4" data-v-e0b68050${_scopeId}>`);
              _push2(ssrRenderComponent(_component_v_card, { elevation: "3" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_v_card_item, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<div class="flex flex-row flex-wrap gap-3" data-v-e0b68050${_scopeId3}><div data-v-e0b68050${_scopeId3}><div data-v-e0b68050${_scopeId3}><p class="text-lg font-bold" data-v-e0b68050${_scopeId3}>${ssrInterpolate(plan.name)}</p><div data-v-e0b68050${_scopeId3}>`);
                          _push4(ssrRenderComponent(_component_v_chip, {
                            variant: "outlined",
                            color: "black",
                            size: "small",
                            class: "me-2 uppercase"
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(` monthly <strong data-v-e0b68050${_scopeId4}>$${ssrInterpolate(plan.price_monthly_string)}</strong>`);
                              } else {
                                return [
                                  createTextVNode(" monthly "),
                                  createVNode("strong", null, "$" + toDisplayString(plan.price_monthly_string), 1)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(_component_v_chip, {
                            variant: "outlined",
                            color: "black",
                            size: "small",
                            class: "me-2 uppercase"
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(` biweekly <strong data-v-e0b68050${_scopeId4}>$${ssrInterpolate(plan.price_biweekly_string)}</strong>`);
                              } else {
                                return [
                                  createTextVNode(" biweekly "),
                                  createVNode("strong", null, "$" + toDisplayString(plan.price_biweekly_string), 1)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(_component_v_chip, {
                            variant: "outlined",
                            color: "black",
                            size: "small",
                            class: "me-2 uppercase"
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(` weekly <strong data-v-e0b68050${_scopeId4}>$${ssrInterpolate(plan.price_weekly_string)}</strong>`);
                              } else {
                                return [
                                  createTextVNode(" weekly "),
                                  createVNode("strong", null, "$" + toDisplayString(plan.price_weekly_string), 1)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                          _push4(`</div></div></div></div><div class="flex gap-6 border mt-3 px-3 rounded-md bg-grey-lighten-3" data-v-e0b68050${_scopeId3}>`);
                          _push4(ssrRenderComponent(_component_v_checkbox, {
                            "onUpdate:modelValue": [updatedPlanSelection, ($event) => form.active_plans = $event],
                            inline: "",
                            label: "Is active",
                            value: plan.uid,
                            modelValue: form.active_plans,
                            "hide-details": ""
                          }, null, _parent4, _scopeId3));
                          _push4(`</div>`);
                        } else {
                          return [
                            createVNode("div", { class: "flex flex-row flex-wrap gap-3" }, [
                              createVNode("div", null, [
                                createVNode("div", null, [
                                  createVNode("p", { class: "text-lg font-bold" }, toDisplayString(plan.name), 1),
                                  createVNode("div", null, [
                                    createVNode(_component_v_chip, {
                                      variant: "outlined",
                                      color: "black",
                                      size: "small",
                                      class: "me-2 uppercase"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(" monthly "),
                                        createVNode("strong", null, "$" + toDisplayString(plan.price_monthly_string), 1)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(_component_v_chip, {
                                      variant: "outlined",
                                      color: "black",
                                      size: "small",
                                      class: "me-2 uppercase"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(" biweekly "),
                                        createVNode("strong", null, "$" + toDisplayString(plan.price_biweekly_string), 1)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(_component_v_chip, {
                                      variant: "outlined",
                                      color: "black",
                                      size: "small",
                                      class: "me-2 uppercase"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(" weekly "),
                                        createVNode("strong", null, "$" + toDisplayString(plan.price_weekly_string), 1)
                                      ]),
                                      _: 2
                                    }, 1024)
                                  ])
                                ])
                              ])
                            ]),
                            createVNode("div", { class: "flex gap-6 border mt-3 px-3 rounded-md bg-grey-lighten-3" }, [
                              createVNode(_component_v_checkbox, {
                                "onUpdate:modelValue": [updatedPlanSelection, ($event) => form.active_plans = $event],
                                inline: "",
                                label: "Is active",
                                value: plan.uid,
                                modelValue: form.active_plans,
                                "hide-details": ""
                              }, null, 8, ["value", "modelValue", "onUpdate:modelValue"])
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
                          createVNode("div", { class: "flex flex-row flex-wrap gap-3" }, [
                            createVNode("div", null, [
                              createVNode("div", null, [
                                createVNode("p", { class: "text-lg font-bold" }, toDisplayString(plan.name), 1),
                                createVNode("div", null, [
                                  createVNode(_component_v_chip, {
                                    variant: "outlined",
                                    color: "black",
                                    size: "small",
                                    class: "me-2 uppercase"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(" monthly "),
                                      createVNode("strong", null, "$" + toDisplayString(plan.price_monthly_string), 1)
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(_component_v_chip, {
                                    variant: "outlined",
                                    color: "black",
                                    size: "small",
                                    class: "me-2 uppercase"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(" biweekly "),
                                      createVNode("strong", null, "$" + toDisplayString(plan.price_biweekly_string), 1)
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(_component_v_chip, {
                                    variant: "outlined",
                                    color: "black",
                                    size: "small",
                                    class: "me-2 uppercase"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(" weekly "),
                                      createVNode("strong", null, "$" + toDisplayString(plan.price_weekly_string), 1)
                                    ]),
                                    _: 2
                                  }, 1024)
                                ])
                              ])
                            ])
                          ]),
                          createVNode("div", { class: "flex gap-6 border mt-3 px-3 rounded-md bg-grey-lighten-3" }, [
                            createVNode(_component_v_checkbox, {
                              "onUpdate:modelValue": [updatedPlanSelection, ($event) => form.active_plans = $event],
                              inline: "",
                              label: "Is active",
                              value: plan.uid,
                              modelValue: form.active_plans,
                              "hide-details": ""
                            }, null, 8, ["value", "modelValue", "onUpdate:modelValue"])
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
            _push2(`<!--]--><div class="mt-4" data-v-e0b68050${_scopeId}>`);
            _push2(ssrRenderComponent(_component_v_card, { color: "blue-grey" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_v_card_item, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<p data-v-e0b68050${_scopeId3}>Products: ${ssrInterpolate(props.products.length)}</p>`);
                      } else {
                        return [
                          createVNode("p", null, "Products: " + toDisplayString(props.products.length), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_v_card_item, null, {
                      default: withCtx(() => [
                        createVNode("p", null, "Products: " + toDisplayString(props.products.length), 1)
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><!--[-->`);
            ssrRenderList(props.products, (product) => {
              _push2(`<div class="mt-4" data-v-e0b68050${_scopeId}>`);
              _push2(ssrRenderComponent(_component_v_card, { elevation: "3" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_v_card_item, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<div class="flex flex-row flex-wrap gap-3" data-v-e0b68050${_scopeId3}><div class="shrink-0" data-v-e0b68050${_scopeId3}>`);
                          if (product.has_image) {
                            _push4(ssrRenderComponent(_component_v_img, {
                              width: "100px",
                              src: product.image_url
                            }, null, _parent4, _scopeId3));
                          } else {
                            _push4(`<!---->`);
                          }
                          _push4(`</div><div class="grow" data-v-e0b68050${_scopeId3}><div data-v-e0b68050${_scopeId3}>`);
                          _push4(ssrRenderComponent(_component_v_chip, {
                            size: "x-small",
                            class: "text-xs"
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`${ssrInterpolate("ABC")}`);
                              } else {
                                return [
                                  createTextVNode(toDisplayString("ABC"))
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                          _push4(`<p class="text-lg font-bold" data-v-e0b68050${_scopeId3}>${ssrInterpolate(product.name)}</p><p class="text-sm" data-v-e0b68050${_scopeId3}>${ssrInterpolate(product.description)}</p><div class="flex flex-row flex-wrap gap-2" data-v-e0b68050${_scopeId3}>`);
                          if (product.variations.length) {
                            _push4(`<div class="flex gap-2" data-v-e0b68050${_scopeId3}><!--[-->`);
                            ssrRenderList(product.variations, (variation) => {
                              _push4(ssrRenderComponent(_component_v_chip, {
                                variant: "outlined",
                                color: "black",
                                size: "small"
                              }, {
                                default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                  if (_push5) {
                                    _push5(`${ssrInterpolate(variation.name)} <strong data-v-e0b68050${_scopeId4}>$${ssrInterpolate(variation.price_formatted)}</strong>`);
                                  } else {
                                    return [
                                      createTextVNode(toDisplayString(variation.name) + " ", 1),
                                      createVNode("strong", null, "$" + toDisplayString(variation.price_formatted), 1)
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent4, _scopeId3));
                            });
                            _push4(`<!--]--></div>`);
                          } else {
                            _push4(`<!---->`);
                          }
                          if (product.categories.length) {
                            _push4(`<div class="flex gap-2" data-v-e0b68050${_scopeId3}><!--[-->`);
                            ssrRenderList(product.categories, (category) => {
                              _push4(ssrRenderComponent(_component_v_chip, {
                                variant: "tonal",
                                color: "black",
                                size: "small"
                              }, {
                                default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                  if (_push5) {
                                    _push5(`${ssrInterpolate(category.name)}`);
                                  } else {
                                    return [
                                      createTextVNode(toDisplayString(category.name), 1)
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent4, _scopeId3));
                            });
                            _push4(`<!--]--></div>`);
                          } else {
                            _push4(`<!---->`);
                          }
                          _push4(`</div></div></div></div>`);
                          if (product.has_checkboxes) {
                            _push4(`<div class="flex gap-6 border mt-3 px-3 rounded-md bg-grey-lighten-3" data-v-e0b68050${_scopeId3}>`);
                            _push4(ssrRenderComponent(_component_v_checkbox, {
                              "onUpdate:modelValue": [updatedProductSelection, ($event) => form.in_sneak_peek_menu = $event],
                              value: product.uid,
                              modelValue: form.in_sneak_peek_menu,
                              inline: "",
                              label: "In sneak peek menu",
                              "hide-details": ""
                            }, null, _parent4, _scopeId3));
                            _push4(ssrRenderComponent(_component_v_checkbox, {
                              "onUpdate:modelValue": [updatedProductSelection, ($event) => form.in_catering_menu = $event],
                              value: product.uid,
                              modelValue: form.in_catering_menu,
                              inline: "",
                              label: "In catering menu",
                              "hide-details": ""
                            }, null, _parent4, _scopeId3));
                            if (form.active_plans.length) {
                              _push4(`<div class="flex gap-3" data-v-e0b68050${_scopeId3}><!--[-->`);
                              ssrRenderList(form.active_plans, (planUid) => {
                                _push4(`<div class="inline-flex" data-v-e0b68050${_scopeId3}>`);
                                _push4(ssrRenderComponent(_component_v_checkbox, {
                                  "onUpdate:modelValue": [updatedProductSelection, ($event) => form.in_subscriptions[planUid] = $event],
                                  modelValue: form.in_subscriptions[planUid],
                                  value: product.uid,
                                  inline: "",
                                  label: `In '${getPlanName(planUid)}' plan`,
                                  "hide-details": ""
                                }, null, _parent4, _scopeId3));
                                _push4(`</div>`);
                              });
                              _push4(`<!--]--></div>`);
                            } else {
                              _push4(`<!---->`);
                            }
                            _push4(ssrRenderComponent(_component_v_checkbox, {
                              "onUpdate:modelValue": [updatedProductSelection, ($event) => form.in_add_ons_menu = $event],
                              value: product.uid,
                              modelValue: form.in_add_ons_menu,
                              inline: "",
                              label: "In add-ons menu",
                              "hide-details": ""
                            }, null, _parent4, _scopeId3));
                            _push4(`</div>`);
                          } else {
                            _push4(`<!---->`);
                          }
                        } else {
                          return [
                            createVNode("div", { class: "flex flex-row flex-wrap gap-3" }, [
                              createVNode("div", { class: "shrink-0" }, [
                                product.has_image ? (openBlock(), createBlock(_component_v_img, {
                                  key: 0,
                                  width: "100px",
                                  src: product.image_url
                                }, null, 8, ["src"])) : createCommentVNode("", true)
                              ]),
                              createVNode("div", { class: "grow" }, [
                                createVNode("div", null, [
                                  createVNode(_component_v_chip, {
                                    size: "x-small",
                                    class: "text-xs"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString("ABC"))
                                    ]),
                                    _: 1
                                  }),
                                  createVNode("p", { class: "text-lg font-bold" }, toDisplayString(product.name), 1),
                                  createVNode("p", { class: "text-sm" }, toDisplayString(product.description), 1),
                                  createVNode("div", { class: "flex flex-row flex-wrap gap-2" }, [
                                    product.variations.length ? (openBlock(), createBlock("div", {
                                      key: 0,
                                      class: "flex gap-2"
                                    }, [
                                      (openBlock(true), createBlock(Fragment, null, renderList(product.variations, (variation) => {
                                        return openBlock(), createBlock(_component_v_chip, {
                                          variant: "outlined",
                                          color: "black",
                                          size: "small"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(variation.name) + " ", 1),
                                            createVNode("strong", null, "$" + toDisplayString(variation.price_formatted), 1)
                                          ]),
                                          _: 2
                                        }, 1024);
                                      }), 256))
                                    ])) : createCommentVNode("", true),
                                    product.categories.length ? (openBlock(), createBlock("div", {
                                      key: 1,
                                      class: "flex gap-2"
                                    }, [
                                      (openBlock(true), createBlock(Fragment, null, renderList(product.categories, (category) => {
                                        return openBlock(), createBlock(_component_v_chip, {
                                          variant: "tonal",
                                          color: "black",
                                          size: "small"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(category.name), 1)
                                          ]),
                                          _: 2
                                        }, 1024);
                                      }), 256))
                                    ])) : createCommentVNode("", true)
                                  ])
                                ])
                              ])
                            ]),
                            product.has_checkboxes ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "flex gap-6 border mt-3 px-3 rounded-md bg-grey-lighten-3"
                            }, [
                              createVNode(_component_v_checkbox, {
                                "onUpdate:modelValue": [updatedProductSelection, ($event) => form.in_sneak_peek_menu = $event],
                                value: product.uid,
                                modelValue: form.in_sneak_peek_menu,
                                inline: "",
                                label: "In sneak peek menu",
                                "hide-details": ""
                              }, null, 8, ["value", "modelValue", "onUpdate:modelValue"]),
                              createVNode(_component_v_checkbox, {
                                "onUpdate:modelValue": [updatedProductSelection, ($event) => form.in_catering_menu = $event],
                                value: product.uid,
                                modelValue: form.in_catering_menu,
                                inline: "",
                                label: "In catering menu",
                                "hide-details": ""
                              }, null, 8, ["value", "modelValue", "onUpdate:modelValue"]),
                              form.active_plans.length ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "flex gap-3"
                              }, [
                                (openBlock(true), createBlock(Fragment, null, renderList(form.active_plans, (planUid) => {
                                  return openBlock(), createBlock("div", {
                                    key: planUid,
                                    class: "inline-flex"
                                  }, [
                                    createVNode(_component_v_checkbox, {
                                      "onUpdate:modelValue": [updatedProductSelection, ($event) => form.in_subscriptions[planUid] = $event],
                                      modelValue: form.in_subscriptions[planUid],
                                      value: product.uid,
                                      inline: "",
                                      label: `In '${getPlanName(planUid)}' plan`,
                                      "hide-details": ""
                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "value", "label"])
                                  ]);
                                }), 128))
                              ])) : createCommentVNode("", true),
                              createVNode(_component_v_checkbox, {
                                "onUpdate:modelValue": [updatedProductSelection, ($event) => form.in_add_ons_menu = $event],
                                value: product.uid,
                                modelValue: form.in_add_ons_menu,
                                inline: "",
                                label: "In add-ons menu",
                                "hide-details": ""
                              }, null, 8, ["value", "modelValue", "onUpdate:modelValue"])
                            ])) : createCommentVNode("", true)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_v_card_item, null, {
                        default: withCtx(() => [
                          createVNode("div", { class: "flex flex-row flex-wrap gap-3" }, [
                            createVNode("div", { class: "shrink-0" }, [
                              product.has_image ? (openBlock(), createBlock(_component_v_img, {
                                key: 0,
                                width: "100px",
                                src: product.image_url
                              }, null, 8, ["src"])) : createCommentVNode("", true)
                            ]),
                            createVNode("div", { class: "grow" }, [
                              createVNode("div", null, [
                                createVNode(_component_v_chip, {
                                  size: "x-small",
                                  class: "text-xs"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString("ABC"))
                                  ]),
                                  _: 1
                                }),
                                createVNode("p", { class: "text-lg font-bold" }, toDisplayString(product.name), 1),
                                createVNode("p", { class: "text-sm" }, toDisplayString(product.description), 1),
                                createVNode("div", { class: "flex flex-row flex-wrap gap-2" }, [
                                  product.variations.length ? (openBlock(), createBlock("div", {
                                    key: 0,
                                    class: "flex gap-2"
                                  }, [
                                    (openBlock(true), createBlock(Fragment, null, renderList(product.variations, (variation) => {
                                      return openBlock(), createBlock(_component_v_chip, {
                                        variant: "outlined",
                                        color: "black",
                                        size: "small"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(variation.name) + " ", 1),
                                          createVNode("strong", null, "$" + toDisplayString(variation.price_formatted), 1)
                                        ]),
                                        _: 2
                                      }, 1024);
                                    }), 256))
                                  ])) : createCommentVNode("", true),
                                  product.categories.length ? (openBlock(), createBlock("div", {
                                    key: 1,
                                    class: "flex gap-2"
                                  }, [
                                    (openBlock(true), createBlock(Fragment, null, renderList(product.categories, (category) => {
                                      return openBlock(), createBlock(_component_v_chip, {
                                        variant: "tonal",
                                        color: "black",
                                        size: "small"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(category.name), 1)
                                        ]),
                                        _: 2
                                      }, 1024);
                                    }), 256))
                                  ])) : createCommentVNode("", true)
                                ])
                              ])
                            ])
                          ]),
                          product.has_checkboxes ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "flex gap-6 border mt-3 px-3 rounded-md bg-grey-lighten-3"
                          }, [
                            createVNode(_component_v_checkbox, {
                              "onUpdate:modelValue": [updatedProductSelection, ($event) => form.in_sneak_peek_menu = $event],
                              value: product.uid,
                              modelValue: form.in_sneak_peek_menu,
                              inline: "",
                              label: "In sneak peek menu",
                              "hide-details": ""
                            }, null, 8, ["value", "modelValue", "onUpdate:modelValue"]),
                            createVNode(_component_v_checkbox, {
                              "onUpdate:modelValue": [updatedProductSelection, ($event) => form.in_catering_menu = $event],
                              value: product.uid,
                              modelValue: form.in_catering_menu,
                              inline: "",
                              label: "In catering menu",
                              "hide-details": ""
                            }, null, 8, ["value", "modelValue", "onUpdate:modelValue"]),
                            form.active_plans.length ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "flex gap-3"
                            }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(form.active_plans, (planUid) => {
                                return openBlock(), createBlock("div", {
                                  key: planUid,
                                  class: "inline-flex"
                                }, [
                                  createVNode(_component_v_checkbox, {
                                    "onUpdate:modelValue": [updatedProductSelection, ($event) => form.in_subscriptions[planUid] = $event],
                                    modelValue: form.in_subscriptions[planUid],
                                    value: product.uid,
                                    inline: "",
                                    label: `In '${getPlanName(planUid)}' plan`,
                                    "hide-details": ""
                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "value", "label"])
                                ]);
                              }), 128))
                            ])) : createCommentVNode("", true),
                            createVNode(_component_v_checkbox, {
                              "onUpdate:modelValue": [updatedProductSelection, ($event) => form.in_add_ons_menu = $event],
                              value: product.uid,
                              modelValue: form.in_add_ons_menu,
                              inline: "",
                              label: "In add-ons menu",
                              "hide-details": ""
                            }, null, 8, ["value", "modelValue", "onUpdate:modelValue"])
                          ])) : createCommentVNode("", true)
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
            _push2(`<!--]--></div><div class="fixed bottom-0 left-0 w-full text-center items center bottom-bar" data-v-e0b68050${_scopeId}>`);
            _push2(ssrRenderComponent(_component_v_card, {
              color: saveSelectionBgColor.value,
              class: "h-full"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_v_card_item, { class: "h-full" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_v_btn, {
                          onClick: saveSelection,
                          variant: "text",
                          color: saveSelectionTextColor.value
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Save plans and product selection`);
                            } else {
                              return [
                                createTextVNode("Save plans and product selection")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_v_btn, {
                            onClick: withModifiers(saveSelection, ["prevent"]),
                            variant: "text",
                            color: saveSelectionTextColor.value
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Save plans and product selection")
                            ]),
                            _: 1
                          }, 8, ["color"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_v_card_item, { class: "h-full" }, {
                      default: withCtx(() => [
                        createVNode(_component_v_btn, {
                          onClick: withModifiers(saveSelection, ["prevent"]),
                          variant: "text",
                          color: saveSelectionTextColor.value
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Save plans and product selection")
                          ]),
                          _: 1
                        }, 8, ["color"])
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
              createVNode("div", { class: "product-column" }, [
                createVNode("div", { class: "mt-5 flex justify-between" }, [
                  createVNode(_component_v_btn, {
                    color: importButtonColor.value,
                    onClick: withModifiers(refreshProducts, ["prevent"])
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(importButtonText.value), 1)
                    ]),
                    _: 1
                  }, 8, ["color"]),
                  createVNode("p", null, [
                    createTextVNode("Last refreshed: "),
                    createVNode("strong", null, toDisplayString(__props.refresh.formatted), 1)
                  ])
                ]),
                createVNode("div", { class: "mt-4" }, [
                  createVNode(_component_v_card, { color: "blue-grey" }, {
                    default: withCtx(() => [
                      createVNode(_component_v_card_item, null, {
                        default: withCtx(() => [
                          createVNode("p", null, "Subscription plans: " + toDisplayString(props.plans.length), 1)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                (openBlock(true), createBlock(Fragment, null, renderList(props.plans, (plan) => {
                  return openBlock(), createBlock("div", { class: "mt-4" }, [
                    createVNode(_component_v_card, { elevation: "3" }, {
                      default: withCtx(() => [
                        createVNode(_component_v_card_item, null, {
                          default: withCtx(() => [
                            createVNode("div", { class: "flex flex-row flex-wrap gap-3" }, [
                              createVNode("div", null, [
                                createVNode("div", null, [
                                  createVNode("p", { class: "text-lg font-bold" }, toDisplayString(plan.name), 1),
                                  createVNode("div", null, [
                                    createVNode(_component_v_chip, {
                                      variant: "outlined",
                                      color: "black",
                                      size: "small",
                                      class: "me-2 uppercase"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(" monthly "),
                                        createVNode("strong", null, "$" + toDisplayString(plan.price_monthly_string), 1)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(_component_v_chip, {
                                      variant: "outlined",
                                      color: "black",
                                      size: "small",
                                      class: "me-2 uppercase"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(" biweekly "),
                                        createVNode("strong", null, "$" + toDisplayString(plan.price_biweekly_string), 1)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(_component_v_chip, {
                                      variant: "outlined",
                                      color: "black",
                                      size: "small",
                                      class: "me-2 uppercase"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(" weekly "),
                                        createVNode("strong", null, "$" + toDisplayString(plan.price_weekly_string), 1)
                                      ]),
                                      _: 2
                                    }, 1024)
                                  ])
                                ])
                              ])
                            ]),
                            createVNode("div", { class: "flex gap-6 border mt-3 px-3 rounded-md bg-grey-lighten-3" }, [
                              createVNode(_component_v_checkbox, {
                                "onUpdate:modelValue": [updatedPlanSelection, ($event) => form.active_plans = $event],
                                inline: "",
                                label: "Is active",
                                value: plan.uid,
                                modelValue: form.active_plans,
                                "hide-details": ""
                              }, null, 8, ["value", "modelValue", "onUpdate:modelValue"])
                            ])
                          ]),
                          _: 2
                        }, 1024)
                      ]),
                      _: 2
                    }, 1024)
                  ]);
                }), 256)),
                createVNode("div", { class: "mt-4" }, [
                  createVNode(_component_v_card, { color: "blue-grey" }, {
                    default: withCtx(() => [
                      createVNode(_component_v_card_item, null, {
                        default: withCtx(() => [
                          createVNode("p", null, "Products: " + toDisplayString(props.products.length), 1)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                (openBlock(true), createBlock(Fragment, null, renderList(props.products, (product) => {
                  return openBlock(), createBlock("div", { class: "mt-4" }, [
                    createVNode(_component_v_card, { elevation: "3" }, {
                      default: withCtx(() => [
                        createVNode(_component_v_card_item, null, {
                          default: withCtx(() => [
                            createVNode("div", { class: "flex flex-row flex-wrap gap-3" }, [
                              createVNode("div", { class: "shrink-0" }, [
                                product.has_image ? (openBlock(), createBlock(_component_v_img, {
                                  key: 0,
                                  width: "100px",
                                  src: product.image_url
                                }, null, 8, ["src"])) : createCommentVNode("", true)
                              ]),
                              createVNode("div", { class: "grow" }, [
                                createVNode("div", null, [
                                  createVNode(_component_v_chip, {
                                    size: "x-small",
                                    class: "text-xs"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString("ABC"))
                                    ]),
                                    _: 1
                                  }),
                                  createVNode("p", { class: "text-lg font-bold" }, toDisplayString(product.name), 1),
                                  createVNode("p", { class: "text-sm" }, toDisplayString(product.description), 1),
                                  createVNode("div", { class: "flex flex-row flex-wrap gap-2" }, [
                                    product.variations.length ? (openBlock(), createBlock("div", {
                                      key: 0,
                                      class: "flex gap-2"
                                    }, [
                                      (openBlock(true), createBlock(Fragment, null, renderList(product.variations, (variation) => {
                                        return openBlock(), createBlock(_component_v_chip, {
                                          variant: "outlined",
                                          color: "black",
                                          size: "small"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(variation.name) + " ", 1),
                                            createVNode("strong", null, "$" + toDisplayString(variation.price_formatted), 1)
                                          ]),
                                          _: 2
                                        }, 1024);
                                      }), 256))
                                    ])) : createCommentVNode("", true),
                                    product.categories.length ? (openBlock(), createBlock("div", {
                                      key: 1,
                                      class: "flex gap-2"
                                    }, [
                                      (openBlock(true), createBlock(Fragment, null, renderList(product.categories, (category) => {
                                        return openBlock(), createBlock(_component_v_chip, {
                                          variant: "tonal",
                                          color: "black",
                                          size: "small"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(category.name), 1)
                                          ]),
                                          _: 2
                                        }, 1024);
                                      }), 256))
                                    ])) : createCommentVNode("", true)
                                  ])
                                ])
                              ])
                            ]),
                            product.has_checkboxes ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "flex gap-6 border mt-3 px-3 rounded-md bg-grey-lighten-3"
                            }, [
                              createVNode(_component_v_checkbox, {
                                "onUpdate:modelValue": [updatedProductSelection, ($event) => form.in_sneak_peek_menu = $event],
                                value: product.uid,
                                modelValue: form.in_sneak_peek_menu,
                                inline: "",
                                label: "In sneak peek menu",
                                "hide-details": ""
                              }, null, 8, ["value", "modelValue", "onUpdate:modelValue"]),
                              createVNode(_component_v_checkbox, {
                                "onUpdate:modelValue": [updatedProductSelection, ($event) => form.in_catering_menu = $event],
                                value: product.uid,
                                modelValue: form.in_catering_menu,
                                inline: "",
                                label: "In catering menu",
                                "hide-details": ""
                              }, null, 8, ["value", "modelValue", "onUpdate:modelValue"]),
                              form.active_plans.length ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "flex gap-3"
                              }, [
                                (openBlock(true), createBlock(Fragment, null, renderList(form.active_plans, (planUid) => {
                                  return openBlock(), createBlock("div", {
                                    key: planUid,
                                    class: "inline-flex"
                                  }, [
                                    createVNode(_component_v_checkbox, {
                                      "onUpdate:modelValue": [updatedProductSelection, ($event) => form.in_subscriptions[planUid] = $event],
                                      modelValue: form.in_subscriptions[planUid],
                                      value: product.uid,
                                      inline: "",
                                      label: `In '${getPlanName(planUid)}' plan`,
                                      "hide-details": ""
                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "value", "label"])
                                  ]);
                                }), 128))
                              ])) : createCommentVNode("", true),
                              createVNode(_component_v_checkbox, {
                                "onUpdate:modelValue": [updatedProductSelection, ($event) => form.in_add_ons_menu = $event],
                                value: product.uid,
                                modelValue: form.in_add_ons_menu,
                                inline: "",
                                label: "In add-ons menu",
                                "hide-details": ""
                              }, null, 8, ["value", "modelValue", "onUpdate:modelValue"])
                            ])) : createCommentVNode("", true)
                          ]),
                          _: 2
                        }, 1024)
                      ]),
                      _: 2
                    }, 1024)
                  ]);
                }), 256))
              ]),
              createVNode("div", { class: "fixed bottom-0 left-0 w-full text-center items center bottom-bar" }, [
                createVNode(_component_v_card, {
                  color: saveSelectionBgColor.value,
                  class: "h-full"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_v_card_item, { class: "h-full" }, {
                      default: withCtx(() => [
                        createVNode(_component_v_btn, {
                          onClick: withModifiers(saveSelection, ["prevent"]),
                          variant: "text",
                          color: saveSelectionTextColor.value
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Save plans and product selection")
                          ]),
                          _: 1
                        }, 8, ["color"])
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 8, ["color"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Products/Home.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Home = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-e0b68050"]]);
export {
  Home as default
};
