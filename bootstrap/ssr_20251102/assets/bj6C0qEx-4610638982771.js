import { reactive, ref, onMounted, watch, resolveComponent, mergeProps, withCtx, createTextVNode, createVNode, withModifiers, openBlock, createBlock, toDisplayString, createCommentVNode, withKeys, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { A as AdmLayout } from "./BZf0ki2W-7956103712867.js";
import { router } from "@inertiajs/vue3";
import { _ as _sfc_main$2 } from "./Cyl_ukyB-5873697610160.js";
import { _ as _sfc_main$1 } from "./CbZ9NF89-6736177896019.js";
import "./BW6cC8iL-1677159380657.js";
import "./kZV6a-x4-6055183876791.js";
import "./1tPrXgE0-4581736670159.js";
const _sfc_main = {
  __name: "Home",
  __ssrInlineRender: true,
  props: {
    settings: Object,
    errors: Object
  },
  setup(__props) {
    const props = __props;
    const addressForm = reactive({});
    const pickupHoursForm = reactive({});
    const openingTimesForm = reactive({});
    const futureHoursForm = reactive({});
    const timeRangeForm = reactive({});
    reactive({});
    const boardScriptForm = reactive({});
    const metaTagsForm = reactive({});
    const local_errors = ref({});
    const saveAddress = () => {
      local_errors.value = {};
      router.post(route("admin.update_settings_address"), addressForm, {
        preserveScroll: true,
        preserveState: true,
        onSuccess: (page) => {
        },
        onError: (error) => {
          local_errors.value = props.errors;
        }
      });
    };
    const savePickupHours = () => {
      local_errors.value = {};
      router.post(route("admin.update_pickup_hours"), pickupHoursForm, {
        preserveScroll: true,
        preserveState: true,
        onSuccess: (page) => {
        },
        onError: (error) => {
          local_errors.value = props.errors;
        }
      });
    };
    const saveFuturePickupDayCount = () => {
      local_errors.value = {};
      router.post(route("admin.update_future_pickup_day_count"), futureHoursForm, {
        preserveScroll: true,
        preserveState: true,
        onSuccess: (page) => {
        },
        onError: (error) => {
          local_errors.value = props.errors;
        }
      });
    };
    const saveOpeningTimes = () => {
      local_errors.value = {};
      router.post(route("admin.update_opening_times"), openingTimesForm, {
        preserveScroll: true,
        preserveState: true,
        onSuccess: (page) => {
        },
        onError: (error) => {
          local_errors.value = props.errors;
        }
      });
    };
    const saveMetaTags = () => {
      local_errors.value = {};
      router.post(route("admin.update_meta_tags"), metaTagsForm, {
        preserveScroll: true,
        preserveState: true,
        onSuccess: (page) => {
        },
        onError: (error) => {
          local_errors.value = props.errors;
        }
      });
    };
    const timeRange = ref([9, 14]);
    const saveTimeRange = () => {
      timeRangeForm.pickup_opening_hour = timeRange.value[0];
      timeRangeForm.pickup_closing_hour = timeRange.value[1];
      router.post(route("admin.update_time_range"), timeRangeForm, {
        preserveScroll: true,
        preserveState: true,
        onSuccess: (page) => {
        },
        onError: (error) => {
          local_errors.value = props.errors;
        }
      });
    };
    const saveBoardScript = () => {
      router.post(route("admin.update_board_script"), boardScriptForm, {
        preserveScroll: true,
        preserveState: true,
        onSuccess: (page) => {
        },
        onError: (error) => {
          local_errors.value = props.errors;
        }
      });
    };
    onMounted(() => {
      addressForm.our_address_1 = props.settings.our_address_1;
      addressForm.our_address_2 = props.settings.our_address_2;
      addressForm.our_city_postcode = props.settings.our_city_postcode;
      addressForm.our_phone_number = props.settings.our_phone_number;
      pickupHoursForm.min_hours_before_pickup = props.settings.min_hours_before_pickup;
      futureHoursForm.future_pickup_day_count = props.settings.future_pickup_day_count;
      timeRange.value = [
        props.settings.pickup_opening_hour,
        props.settings.pickup_closing_hour
      ];
      timeRangeForm.interval_minutes = props.settings.interval_minutes;
      timeRangeForm.max_orders_per_slot = props.settings.max_orders_per_slot;
      openingTimesForm.monday_opening_times = props.settings.monday_opening_times;
      openingTimesForm.tuesday_opening_times = props.settings.tuesday_opening_times;
      openingTimesForm.wednesday_opening_times = props.settings.wednesday_opening_times;
      openingTimesForm.thursday_opening_times = props.settings.thursday_opening_times;
      openingTimesForm.friday_opening_times = props.settings.friday_opening_times;
      openingTimesForm.saturday_opening_times = props.settings.saturday_opening_times;
      openingTimesForm.sunday_opening_times = props.settings.sunday_opening_times;
      boardScriptForm.board_script_on = props.settings.board_script_on === 1;
      metaTagsForm.meta_description_home = props.settings.meta_description_home;
      metaTagsForm.meta_description_boutique = props.settings.meta_description_boutique;
      metaTagsForm.meta_description_catering = props.settings.meta_description_catering;
      metaTagsForm.meta_description_contact = props.settings.meta_description_contact;
    });
    watch(metaTagsForm, (newValues) => {
      Object.keys(newValues).forEach((key) => {
        if (typeof newValues[key] === "string") {
          metaTagsForm[key] = newValues[key].replace(/\n/g, " ").replace("  ", " ");
        }
      });
    }, { deep: true });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_v_card = resolveComponent("v-card");
      const _component_v_label = resolveComponent("v-label");
      const _component_v_text_field = resolveComponent("v-text-field");
      const _component_v_btn = resolveComponent("v-btn");
      const _component_v_slider = resolveComponent("v-slider");
      const _component_v_range_slider = resolveComponent("v-range-slider");
      const _component_v_switch = resolveComponent("v-switch");
      const _component_v_textarea = resolveComponent("v-textarea");
      _push(ssrRenderComponent(AdmLayout, mergeProps({ title: "Settings" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$1, {
              cols: "1",
              md: "1",
              lg: "2",
              xl: "2",
              "2xl": "2"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_sfc_main$2, { gap: "4" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_sfc_main$2, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_v_card, {
                                color: "grey-lighten-3",
                                rounded: "lg"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<div class="p-4"${_scopeId5}>`);
                                    _push6(ssrRenderComponent(_sfc_main$2, null, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`<p class="text-xl"${_scopeId6}>Edit store address</p><p${_scopeId6}>(appears in order pickup notification)</p>`);
                                          _push7(ssrRenderComponent(_sfc_main$2, null, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(ssrRenderComponent(_component_v_label, null, {
                                                  default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                    if (_push9) {
                                                      _push9(`Store name`);
                                                    } else {
                                                      return [
                                                        createTextVNode("Store name")
                                                      ];
                                                    }
                                                  }),
                                                  _: 1
                                                }, _parent8, _scopeId7));
                                                _push8(ssrRenderComponent(_component_v_text_field, {
                                                  modelValue: addressForm.our_address_1,
                                                  "onUpdate:modelValue": ($event) => addressForm.our_address_1 = $event,
                                                  "error-messages": local_errors.value.our_address_1
                                                }, null, _parent8, _scopeId7));
                                              } else {
                                                return [
                                                  createVNode(_component_v_label, null, {
                                                    default: withCtx(() => [
                                                      createTextVNode("Store name")
                                                    ]),
                                                    _: 1
                                                  }),
                                                  createVNode(_component_v_text_field, {
                                                    modelValue: addressForm.our_address_1,
                                                    "onUpdate:modelValue": ($event) => addressForm.our_address_1 = $event,
                                                    "error-messages": local_errors.value.our_address_1
                                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                          _push7(ssrRenderComponent(_sfc_main$2, null, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(ssrRenderComponent(_component_v_label, null, {
                                                  default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                    if (_push9) {
                                                      _push9(`Address`);
                                                    } else {
                                                      return [
                                                        createTextVNode("Address")
                                                      ];
                                                    }
                                                  }),
                                                  _: 1
                                                }, _parent8, _scopeId7));
                                                _push8(ssrRenderComponent(_component_v_text_field, {
                                                  modelValue: addressForm.our_address_2,
                                                  "onUpdate:modelValue": ($event) => addressForm.our_address_2 = $event,
                                                  "error-messages": local_errors.value.our_address_2
                                                }, null, _parent8, _scopeId7));
                                              } else {
                                                return [
                                                  createVNode(_component_v_label, null, {
                                                    default: withCtx(() => [
                                                      createTextVNode("Address")
                                                    ]),
                                                    _: 1
                                                  }),
                                                  createVNode(_component_v_text_field, {
                                                    modelValue: addressForm.our_address_2,
                                                    "onUpdate:modelValue": ($event) => addressForm.our_address_2 = $event,
                                                    "error-messages": local_errors.value.our_address_2
                                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                          _push7(ssrRenderComponent(_sfc_main$2, null, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(ssrRenderComponent(_component_v_label, null, {
                                                  default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                    if (_push9) {
                                                      _push9(`City and post code`);
                                                    } else {
                                                      return [
                                                        createTextVNode("City and post code")
                                                      ];
                                                    }
                                                  }),
                                                  _: 1
                                                }, _parent8, _scopeId7));
                                                _push8(ssrRenderComponent(_component_v_text_field, {
                                                  modelValue: addressForm.our_city_postcode,
                                                  "onUpdate:modelValue": ($event) => addressForm.our_city_postcode = $event,
                                                  "error-messages": local_errors.value.our_city_postcode
                                                }, null, _parent8, _scopeId7));
                                              } else {
                                                return [
                                                  createVNode(_component_v_label, null, {
                                                    default: withCtx(() => [
                                                      createTextVNode("City and post code")
                                                    ]),
                                                    _: 1
                                                  }),
                                                  createVNode(_component_v_text_field, {
                                                    modelValue: addressForm.our_city_postcode,
                                                    "onUpdate:modelValue": ($event) => addressForm.our_city_postcode = $event,
                                                    "error-messages": local_errors.value.our_city_postcode
                                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                          _push7(ssrRenderComponent(_sfc_main$2, null, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(ssrRenderComponent(_component_v_label, null, {
                                                  default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                    if (_push9) {
                                                      _push9(`Phone number`);
                                                    } else {
                                                      return [
                                                        createTextVNode("Phone number")
                                                      ];
                                                    }
                                                  }),
                                                  _: 1
                                                }, _parent8, _scopeId7));
                                                _push8(ssrRenderComponent(_component_v_text_field, {
                                                  modelValue: addressForm.our_phone_number,
                                                  "onUpdate:modelValue": ($event) => addressForm.our_phone_number = $event,
                                                  "error-messages": local_errors.value.our_phone_number
                                                }, null, _parent8, _scopeId7));
                                              } else {
                                                return [
                                                  createVNode(_component_v_label, null, {
                                                    default: withCtx(() => [
                                                      createTextVNode("Phone number")
                                                    ]),
                                                    _: 1
                                                  }),
                                                  createVNode(_component_v_text_field, {
                                                    modelValue: addressForm.our_phone_number,
                                                    "onUpdate:modelValue": ($event) => addressForm.our_phone_number = $event,
                                                    "error-messages": local_errors.value.our_phone_number
                                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                          _push7(`<div class="mt-2"${_scopeId6}>`);
                                          _push7(ssrRenderComponent(_component_v_btn, { onClick: saveAddress }, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(`Update`);
                                              } else {
                                                return [
                                                  createTextVNode("Update")
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                          _push7(`</div>`);
                                        } else {
                                          return [
                                            createVNode("p", { class: "text-xl" }, "Edit store address"),
                                            createVNode("p", null, "(appears in order pickup notification)"),
                                            createVNode(_sfc_main$2, null, {
                                              default: withCtx(() => [
                                                createVNode(_component_v_label, null, {
                                                  default: withCtx(() => [
                                                    createTextVNode("Store name")
                                                  ]),
                                                  _: 1
                                                }),
                                                createVNode(_component_v_text_field, {
                                                  modelValue: addressForm.our_address_1,
                                                  "onUpdate:modelValue": ($event) => addressForm.our_address_1 = $event,
                                                  "error-messages": local_errors.value.our_address_1
                                                }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_sfc_main$2, null, {
                                              default: withCtx(() => [
                                                createVNode(_component_v_label, null, {
                                                  default: withCtx(() => [
                                                    createTextVNode("Address")
                                                  ]),
                                                  _: 1
                                                }),
                                                createVNode(_component_v_text_field, {
                                                  modelValue: addressForm.our_address_2,
                                                  "onUpdate:modelValue": ($event) => addressForm.our_address_2 = $event,
                                                  "error-messages": local_errors.value.our_address_2
                                                }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_sfc_main$2, null, {
                                              default: withCtx(() => [
                                                createVNode(_component_v_label, null, {
                                                  default: withCtx(() => [
                                                    createTextVNode("City and post code")
                                                  ]),
                                                  _: 1
                                                }),
                                                createVNode(_component_v_text_field, {
                                                  modelValue: addressForm.our_city_postcode,
                                                  "onUpdate:modelValue": ($event) => addressForm.our_city_postcode = $event,
                                                  "error-messages": local_errors.value.our_city_postcode
                                                }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_sfc_main$2, null, {
                                              default: withCtx(() => [
                                                createVNode(_component_v_label, null, {
                                                  default: withCtx(() => [
                                                    createTextVNode("Phone number")
                                                  ]),
                                                  _: 1
                                                }),
                                                createVNode(_component_v_text_field, {
                                                  modelValue: addressForm.our_phone_number,
                                                  "onUpdate:modelValue": ($event) => addressForm.our_phone_number = $event,
                                                  "error-messages": local_errors.value.our_phone_number
                                                }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                                              ]),
                                              _: 1
                                            }),
                                            createVNode("div", { class: "mt-2" }, [
                                              createVNode(_component_v_btn, {
                                                onClick: withModifiers(saveAddress, ["prevent"])
                                              }, {
                                                default: withCtx(() => [
                                                  createTextVNode("Update")
                                                ]),
                                                _: 1
                                              })
                                            ])
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(`</div>`);
                                  } else {
                                    return [
                                      createVNode("div", { class: "p-4" }, [
                                        createVNode(_sfc_main$2, null, {
                                          default: withCtx(() => [
                                            createVNode("p", { class: "text-xl" }, "Edit store address"),
                                            createVNode("p", null, "(appears in order pickup notification)"),
                                            createVNode(_sfc_main$2, null, {
                                              default: withCtx(() => [
                                                createVNode(_component_v_label, null, {
                                                  default: withCtx(() => [
                                                    createTextVNode("Store name")
                                                  ]),
                                                  _: 1
                                                }),
                                                createVNode(_component_v_text_field, {
                                                  modelValue: addressForm.our_address_1,
                                                  "onUpdate:modelValue": ($event) => addressForm.our_address_1 = $event,
                                                  "error-messages": local_errors.value.our_address_1
                                                }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_sfc_main$2, null, {
                                              default: withCtx(() => [
                                                createVNode(_component_v_label, null, {
                                                  default: withCtx(() => [
                                                    createTextVNode("Address")
                                                  ]),
                                                  _: 1
                                                }),
                                                createVNode(_component_v_text_field, {
                                                  modelValue: addressForm.our_address_2,
                                                  "onUpdate:modelValue": ($event) => addressForm.our_address_2 = $event,
                                                  "error-messages": local_errors.value.our_address_2
                                                }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_sfc_main$2, null, {
                                              default: withCtx(() => [
                                                createVNode(_component_v_label, null, {
                                                  default: withCtx(() => [
                                                    createTextVNode("City and post code")
                                                  ]),
                                                  _: 1
                                                }),
                                                createVNode(_component_v_text_field, {
                                                  modelValue: addressForm.our_city_postcode,
                                                  "onUpdate:modelValue": ($event) => addressForm.our_city_postcode = $event,
                                                  "error-messages": local_errors.value.our_city_postcode
                                                }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_sfc_main$2, null, {
                                              default: withCtx(() => [
                                                createVNode(_component_v_label, null, {
                                                  default: withCtx(() => [
                                                    createTextVNode("Phone number")
                                                  ]),
                                                  _: 1
                                                }),
                                                createVNode(_component_v_text_field, {
                                                  modelValue: addressForm.our_phone_number,
                                                  "onUpdate:modelValue": ($event) => addressForm.our_phone_number = $event,
                                                  "error-messages": local_errors.value.our_phone_number
                                                }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                                              ]),
                                              _: 1
                                            }),
                                            createVNode("div", { class: "mt-2" }, [
                                              createVNode(_component_v_btn, {
                                                onClick: withModifiers(saveAddress, ["prevent"])
                                              }, {
                                                default: withCtx(() => [
                                                  createTextVNode("Update")
                                                ]),
                                                _: 1
                                              })
                                            ])
                                          ]),
                                          _: 1
                                        })
                                      ])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_v_card, {
                                  color: "grey-lighten-3",
                                  rounded: "lg"
                                }, {
                                  default: withCtx(() => [
                                    createVNode("div", { class: "p-4" }, [
                                      createVNode(_sfc_main$2, null, {
                                        default: withCtx(() => [
                                          createVNode("p", { class: "text-xl" }, "Edit store address"),
                                          createVNode("p", null, "(appears in order pickup notification)"),
                                          createVNode(_sfc_main$2, null, {
                                            default: withCtx(() => [
                                              createVNode(_component_v_label, null, {
                                                default: withCtx(() => [
                                                  createTextVNode("Store name")
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(_component_v_text_field, {
                                                modelValue: addressForm.our_address_1,
                                                "onUpdate:modelValue": ($event) => addressForm.our_address_1 = $event,
                                                "error-messages": local_errors.value.our_address_1
                                              }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_sfc_main$2, null, {
                                            default: withCtx(() => [
                                              createVNode(_component_v_label, null, {
                                                default: withCtx(() => [
                                                  createTextVNode("Address")
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(_component_v_text_field, {
                                                modelValue: addressForm.our_address_2,
                                                "onUpdate:modelValue": ($event) => addressForm.our_address_2 = $event,
                                                "error-messages": local_errors.value.our_address_2
                                              }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_sfc_main$2, null, {
                                            default: withCtx(() => [
                                              createVNode(_component_v_label, null, {
                                                default: withCtx(() => [
                                                  createTextVNode("City and post code")
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(_component_v_text_field, {
                                                modelValue: addressForm.our_city_postcode,
                                                "onUpdate:modelValue": ($event) => addressForm.our_city_postcode = $event,
                                                "error-messages": local_errors.value.our_city_postcode
                                              }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_sfc_main$2, null, {
                                            default: withCtx(() => [
                                              createVNode(_component_v_label, null, {
                                                default: withCtx(() => [
                                                  createTextVNode("Phone number")
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(_component_v_text_field, {
                                                modelValue: addressForm.our_phone_number,
                                                "onUpdate:modelValue": ($event) => addressForm.our_phone_number = $event,
                                                "error-messages": local_errors.value.our_phone_number
                                              }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                                            ]),
                                            _: 1
                                          }),
                                          createVNode("div", { class: "mt-2" }, [
                                            createVNode(_component_v_btn, {
                                              onClick: withModifiers(saveAddress, ["prevent"])
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode("Update")
                                              ]),
                                              _: 1
                                            })
                                          ])
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
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_sfc_main$2, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_v_card, {
                                color: "grey-lighten-3",
                                rounded: "lg"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<div class="p-4"${_scopeId5}>`);
                                    _push6(ssrRenderComponent(_sfc_main$2, null, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`<p class="text-xl"${_scopeId6}>Minimum hours between order and pickup</p>`);
                                          _push7(ssrRenderComponent(_component_v_slider, {
                                            modelValue: pickupHoursForm.min_hours_before_pickup,
                                            "onUpdate:modelValue": ($event) => pickupHoursForm.min_hours_before_pickup = $event,
                                            "error-messages": local_errors.value.min_hours_before_pickup,
                                            min: "0",
                                            max: "120",
                                            ticks: [0, 24, 48, 72, 96, 120],
                                            "show-ticks": "always",
                                            step: "24"
                                          }, null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode("p", { class: "text-xl" }, "Minimum hours between order and pickup"),
                                            createVNode(_component_v_slider, {
                                              modelValue: pickupHoursForm.min_hours_before_pickup,
                                              "onUpdate:modelValue": ($event) => pickupHoursForm.min_hours_before_pickup = $event,
                                              "error-messages": local_errors.value.min_hours_before_pickup,
                                              min: "0",
                                              max: "120",
                                              ticks: [0, 24, 48, 72, 96, 120],
                                              "show-ticks": "always",
                                              step: "24"
                                            }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(`<div class="mt-2"${_scopeId5}>`);
                                    _push6(ssrRenderComponent(_component_v_btn, { onClick: savePickupHours }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`Update`);
                                        } else {
                                          return [
                                            createTextVNode("Update")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(`</div></div>`);
                                  } else {
                                    return [
                                      createVNode("div", { class: "p-4" }, [
                                        createVNode(_sfc_main$2, null, {
                                          default: withCtx(() => [
                                            createVNode("p", { class: "text-xl" }, "Minimum hours between order and pickup"),
                                            createVNode(_component_v_slider, {
                                              modelValue: pickupHoursForm.min_hours_before_pickup,
                                              "onUpdate:modelValue": ($event) => pickupHoursForm.min_hours_before_pickup = $event,
                                              "error-messages": local_errors.value.min_hours_before_pickup,
                                              min: "0",
                                              max: "120",
                                              ticks: [0, 24, 48, 72, 96, 120],
                                              "show-ticks": "always",
                                              step: "24"
                                            }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                                          ]),
                                          _: 1
                                        }),
                                        createVNode("div", { class: "mt-2" }, [
                                          createVNode(_component_v_btn, {
                                            onClick: withModifiers(savePickupHours, ["prevent"])
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode("Update")
                                            ]),
                                            _: 1
                                          })
                                        ])
                                      ])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_v_card, {
                                  color: "grey-lighten-3",
                                  rounded: "lg"
                                }, {
                                  default: withCtx(() => [
                                    createVNode("div", { class: "p-4" }, [
                                      createVNode(_sfc_main$2, null, {
                                        default: withCtx(() => [
                                          createVNode("p", { class: "text-xl" }, "Minimum hours between order and pickup"),
                                          createVNode(_component_v_slider, {
                                            modelValue: pickupHoursForm.min_hours_before_pickup,
                                            "onUpdate:modelValue": ($event) => pickupHoursForm.min_hours_before_pickup = $event,
                                            "error-messages": local_errors.value.min_hours_before_pickup,
                                            min: "0",
                                            max: "120",
                                            ticks: [0, 24, 48, 72, 96, 120],
                                            "show-ticks": "always",
                                            step: "24"
                                          }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                                        ]),
                                        _: 1
                                      }),
                                      createVNode("div", { class: "mt-2" }, [
                                        createVNode(_component_v_btn, {
                                          onClick: withModifiers(savePickupHours, ["prevent"])
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode("Update")
                                          ]),
                                          _: 1
                                        })
                                      ])
                                    ])
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_sfc_main$2, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_v_card, {
                                color: "grey-lighten-3",
                                rounded: "lg"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<div class="p-4"${_scopeId5}>`);
                                    _push6(ssrRenderComponent(_sfc_main$2, null, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`<p class="text-xl"${_scopeId6}>Up to how many days in the future can users set up a pickup date</p>`);
                                          _push7(ssrRenderComponent(_component_v_label, null, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(`Will effectively be 365 if empty`);
                                              } else {
                                                return [
                                                  createTextVNode("Will effectively be 365 if empty")
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                          _push7(ssrRenderComponent(_component_v_text_field, {
                                            modelValue: futureHoursForm.future_pickup_day_count,
                                            "onUpdate:modelValue": ($event) => futureHoursForm.future_pickup_day_count = $event,
                                            "error-messages": local_errors.value.future_pickup_day_count
                                          }, null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode("p", { class: "text-xl" }, "Up to how many days in the future can users set up a pickup date"),
                                            createVNode(_component_v_label, null, {
                                              default: withCtx(() => [
                                                createTextVNode("Will effectively be 365 if empty")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_v_text_field, {
                                              modelValue: futureHoursForm.future_pickup_day_count,
                                              "onUpdate:modelValue": ($event) => futureHoursForm.future_pickup_day_count = $event,
                                              "error-messages": local_errors.value.future_pickup_day_count
                                            }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(`<div class="mt-2"${_scopeId5}>`);
                                    _push6(ssrRenderComponent(_component_v_btn, { onClick: saveFuturePickupDayCount }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`Update`);
                                        } else {
                                          return [
                                            createTextVNode("Update")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(`</div></div>`);
                                  } else {
                                    return [
                                      createVNode("div", { class: "p-4" }, [
                                        createVNode(_sfc_main$2, null, {
                                          default: withCtx(() => [
                                            createVNode("p", { class: "text-xl" }, "Up to how many days in the future can users set up a pickup date"),
                                            createVNode(_component_v_label, null, {
                                              default: withCtx(() => [
                                                createTextVNode("Will effectively be 365 if empty")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_v_text_field, {
                                              modelValue: futureHoursForm.future_pickup_day_count,
                                              "onUpdate:modelValue": ($event) => futureHoursForm.future_pickup_day_count = $event,
                                              "error-messages": local_errors.value.future_pickup_day_count
                                            }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                                          ]),
                                          _: 1
                                        }),
                                        createVNode("div", { class: "mt-2" }, [
                                          createVNode(_component_v_btn, {
                                            onClick: withModifiers(saveFuturePickupDayCount, ["prevent"])
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode("Update")
                                            ]),
                                            _: 1
                                          })
                                        ])
                                      ])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_v_card, {
                                  color: "grey-lighten-3",
                                  rounded: "lg"
                                }, {
                                  default: withCtx(() => [
                                    createVNode("div", { class: "p-4" }, [
                                      createVNode(_sfc_main$2, null, {
                                        default: withCtx(() => [
                                          createVNode("p", { class: "text-xl" }, "Up to how many days in the future can users set up a pickup date"),
                                          createVNode(_component_v_label, null, {
                                            default: withCtx(() => [
                                              createTextVNode("Will effectively be 365 if empty")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_v_text_field, {
                                            modelValue: futureHoursForm.future_pickup_day_count,
                                            "onUpdate:modelValue": ($event) => futureHoursForm.future_pickup_day_count = $event,
                                            "error-messages": local_errors.value.future_pickup_day_count
                                          }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                                        ]),
                                        _: 1
                                      }),
                                      createVNode("div", { class: "mt-2" }, [
                                        createVNode(_component_v_btn, {
                                          onClick: withModifiers(saveFuturePickupDayCount, ["prevent"])
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode("Update")
                                          ]),
                                          _: 1
                                        })
                                      ])
                                    ])
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_v_card, {
                          color: "grey-lighten-3",
                          rounded: "lg"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<div class="p-4"${_scopeId4}>`);
                              _push5(ssrRenderComponent(_sfc_main$2, { gap: "10" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_sfc_main$2, null, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`<p class="text-xl"${_scopeId6}>Hour range for pickup</p>`);
                                          _push7(ssrRenderComponent(_sfc_main$2, null, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(`<div${_scopeId7}>`);
                                                {
                                                  _push8(ssrRenderComponent(_component_v_range_slider, {
                                                    min: "6",
                                                    max: "22",
                                                    modelValue: timeRange.value,
                                                    "onUpdate:modelValue": ($event) => timeRange.value = $event,
                                                    ticks: [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22],
                                                    "show-ticks": "always",
                                                    step: "1",
                                                    strict: ""
                                                  }, null, _parent8, _scopeId7));
                                                }
                                                _push8(`</div>`);
                                              } else {
                                                return [
                                                  createVNode("div", null, [
                                                    (openBlock(), createBlock(_component_v_range_slider, {
                                                      key: 0,
                                                      min: "6",
                                                      max: "22",
                                                      modelValue: timeRange.value,
                                                      "onUpdate:modelValue": ($event) => timeRange.value = $event,
                                                      ticks: [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22],
                                                      "show-ticks": "always",
                                                      step: "1",
                                                      strict: ""
                                                    }, null, 8, ["modelValue", "onUpdate:modelValue"]))
                                                  ])
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode("p", { class: "text-xl" }, "Hour range for pickup"),
                                            createVNode(_sfc_main$2, null, {
                                              default: withCtx(() => [
                                                createVNode("div", null, [
                                                  (openBlock(), createBlock(_component_v_range_slider, {
                                                    key: 0,
                                                    min: "6",
                                                    max: "22",
                                                    modelValue: timeRange.value,
                                                    "onUpdate:modelValue": ($event) => timeRange.value = $event,
                                                    ticks: [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22],
                                                    "show-ticks": "always",
                                                    step: "1",
                                                    strict: ""
                                                  }, null, 8, ["modelValue", "onUpdate:modelValue"]))
                                                ])
                                              ]),
                                              _: 1
                                            })
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(_sfc_main$2, null, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`<p class="text-xl"${_scopeId6}>Pickup interval (minutes)</p>`);
                                          _push7(ssrRenderComponent(_component_v_slider, {
                                            modelValue: timeRangeForm.interval_minutes,
                                            "onUpdate:modelValue": ($event) => timeRangeForm.interval_minutes = $event,
                                            min: "5",
                                            max: "30",
                                            ticks: [5, 10, 15, 20, 25, 30],
                                            "show-ticks": "always",
                                            step: "5"
                                          }, null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode("p", { class: "text-xl" }, "Pickup interval (minutes)"),
                                            createVNode(_component_v_slider, {
                                              modelValue: timeRangeForm.interval_minutes,
                                              "onUpdate:modelValue": ($event) => timeRangeForm.interval_minutes = $event,
                                              min: "5",
                                              max: "30",
                                              ticks: [5, 10, 15, 20, 25, 30],
                                              "show-ticks": "always",
                                              step: "5"
                                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(_sfc_main$2, null, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`<p class="text-xl"${_scopeId6}>Max pickups per slot</p>`);
                                          _push7(ssrRenderComponent(_component_v_slider, {
                                            modelValue: timeRangeForm.max_orders_per_slot,
                                            "onUpdate:modelValue": ($event) => timeRangeForm.max_orders_per_slot = $event,
                                            min: "2",
                                            max: "20",
                                            ticks: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20],
                                            "show-ticks": "always",
                                            step: "2"
                                          }, null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode("p", { class: "text-xl" }, "Max pickups per slot"),
                                            createVNode(_component_v_slider, {
                                              modelValue: timeRangeForm.max_orders_per_slot,
                                              "onUpdate:modelValue": ($event) => timeRangeForm.max_orders_per_slot = $event,
                                              min: "2",
                                              max: "20",
                                              ticks: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20],
                                              "show-ticks": "always",
                                              step: "2"
                                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(`<div class="mt-2"${_scopeId5}>`);
                                    _push6(ssrRenderComponent(_component_v_btn, { onClick: saveTimeRange }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`Update`);
                                        } else {
                                          return [
                                            createTextVNode("Update")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(`</div>`);
                                  } else {
                                    return [
                                      createVNode(_sfc_main$2, null, {
                                        default: withCtx(() => [
                                          createVNode("p", { class: "text-xl" }, "Hour range for pickup"),
                                          createVNode(_sfc_main$2, null, {
                                            default: withCtx(() => [
                                              createVNode("div", null, [
                                                (openBlock(), createBlock(_component_v_range_slider, {
                                                  key: 0,
                                                  min: "6",
                                                  max: "22",
                                                  modelValue: timeRange.value,
                                                  "onUpdate:modelValue": ($event) => timeRange.value = $event,
                                                  ticks: [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22],
                                                  "show-ticks": "always",
                                                  step: "1",
                                                  strict: ""
                                                }, null, 8, ["modelValue", "onUpdate:modelValue"]))
                                              ])
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_sfc_main$2, null, {
                                        default: withCtx(() => [
                                          createVNode("p", { class: "text-xl" }, "Pickup interval (minutes)"),
                                          createVNode(_component_v_slider, {
                                            modelValue: timeRangeForm.interval_minutes,
                                            "onUpdate:modelValue": ($event) => timeRangeForm.interval_minutes = $event,
                                            min: "5",
                                            max: "30",
                                            ticks: [5, 10, 15, 20, 25, 30],
                                            "show-ticks": "always",
                                            step: "5"
                                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_sfc_main$2, null, {
                                        default: withCtx(() => [
                                          createVNode("p", { class: "text-xl" }, "Max pickups per slot"),
                                          createVNode(_component_v_slider, {
                                            modelValue: timeRangeForm.max_orders_per_slot,
                                            "onUpdate:modelValue": ($event) => timeRangeForm.max_orders_per_slot = $event,
                                            min: "2",
                                            max: "20",
                                            ticks: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20],
                                            "show-ticks": "always",
                                            step: "2"
                                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                        ]),
                                        _: 1
                                      }),
                                      createVNode("div", { class: "mt-2" }, [
                                        createVNode(_component_v_btn, {
                                          onClick: withModifiers(saveTimeRange, ["prevent"])
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode("Update")
                                          ]),
                                          _: 1
                                        })
                                      ])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(`</div>`);
                            } else {
                              return [
                                createVNode("div", { class: "p-4" }, [
                                  createVNode(_sfc_main$2, { gap: "10" }, {
                                    default: withCtx(() => [
                                      createVNode(_sfc_main$2, null, {
                                        default: withCtx(() => [
                                          createVNode("p", { class: "text-xl" }, "Hour range for pickup"),
                                          createVNode(_sfc_main$2, null, {
                                            default: withCtx(() => [
                                              createVNode("div", null, [
                                                (openBlock(), createBlock(_component_v_range_slider, {
                                                  key: 0,
                                                  min: "6",
                                                  max: "22",
                                                  modelValue: timeRange.value,
                                                  "onUpdate:modelValue": ($event) => timeRange.value = $event,
                                                  ticks: [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22],
                                                  "show-ticks": "always",
                                                  step: "1",
                                                  strict: ""
                                                }, null, 8, ["modelValue", "onUpdate:modelValue"]))
                                              ])
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_sfc_main$2, null, {
                                        default: withCtx(() => [
                                          createVNode("p", { class: "text-xl" }, "Pickup interval (minutes)"),
                                          createVNode(_component_v_slider, {
                                            modelValue: timeRangeForm.interval_minutes,
                                            "onUpdate:modelValue": ($event) => timeRangeForm.interval_minutes = $event,
                                            min: "5",
                                            max: "30",
                                            ticks: [5, 10, 15, 20, 25, 30],
                                            "show-ticks": "always",
                                            step: "5"
                                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_sfc_main$2, null, {
                                        default: withCtx(() => [
                                          createVNode("p", { class: "text-xl" }, "Max pickups per slot"),
                                          createVNode(_component_v_slider, {
                                            modelValue: timeRangeForm.max_orders_per_slot,
                                            "onUpdate:modelValue": ($event) => timeRangeForm.max_orders_per_slot = $event,
                                            min: "2",
                                            max: "20",
                                            ticks: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20],
                                            "show-ticks": "always",
                                            step: "2"
                                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                        ]),
                                        _: 1
                                      }),
                                      createVNode("div", { class: "mt-2" }, [
                                        createVNode(_component_v_btn, {
                                          onClick: withModifiers(saveTimeRange, ["prevent"])
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode("Update")
                                          ]),
                                          _: 1
                                        })
                                      ])
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
                          createVNode(_sfc_main$2, null, {
                            default: withCtx(() => [
                              createVNode(_component_v_card, {
                                color: "grey-lighten-3",
                                rounded: "lg"
                              }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "p-4" }, [
                                    createVNode(_sfc_main$2, null, {
                                      default: withCtx(() => [
                                        createVNode("p", { class: "text-xl" }, "Edit store address"),
                                        createVNode("p", null, "(appears in order pickup notification)"),
                                        createVNode(_sfc_main$2, null, {
                                          default: withCtx(() => [
                                            createVNode(_component_v_label, null, {
                                              default: withCtx(() => [
                                                createTextVNode("Store name")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_v_text_field, {
                                              modelValue: addressForm.our_address_1,
                                              "onUpdate:modelValue": ($event) => addressForm.our_address_1 = $event,
                                              "error-messages": local_errors.value.our_address_1
                                            }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_sfc_main$2, null, {
                                          default: withCtx(() => [
                                            createVNode(_component_v_label, null, {
                                              default: withCtx(() => [
                                                createTextVNode("Address")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_v_text_field, {
                                              modelValue: addressForm.our_address_2,
                                              "onUpdate:modelValue": ($event) => addressForm.our_address_2 = $event,
                                              "error-messages": local_errors.value.our_address_2
                                            }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_sfc_main$2, null, {
                                          default: withCtx(() => [
                                            createVNode(_component_v_label, null, {
                                              default: withCtx(() => [
                                                createTextVNode("City and post code")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_v_text_field, {
                                              modelValue: addressForm.our_city_postcode,
                                              "onUpdate:modelValue": ($event) => addressForm.our_city_postcode = $event,
                                              "error-messages": local_errors.value.our_city_postcode
                                            }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_sfc_main$2, null, {
                                          default: withCtx(() => [
                                            createVNode(_component_v_label, null, {
                                              default: withCtx(() => [
                                                createTextVNode("Phone number")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_v_text_field, {
                                              modelValue: addressForm.our_phone_number,
                                              "onUpdate:modelValue": ($event) => addressForm.our_phone_number = $event,
                                              "error-messages": local_errors.value.our_phone_number
                                            }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                                          ]),
                                          _: 1
                                        }),
                                        createVNode("div", { class: "mt-2" }, [
                                          createVNode(_component_v_btn, {
                                            onClick: withModifiers(saveAddress, ["prevent"])
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode("Update")
                                            ]),
                                            _: 1
                                          })
                                        ])
                                      ]),
                                      _: 1
                                    })
                                  ])
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(_sfc_main$2, null, {
                            default: withCtx(() => [
                              createVNode(_component_v_card, {
                                color: "grey-lighten-3",
                                rounded: "lg"
                              }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "p-4" }, [
                                    createVNode(_sfc_main$2, null, {
                                      default: withCtx(() => [
                                        createVNode("p", { class: "text-xl" }, "Minimum hours between order and pickup"),
                                        createVNode(_component_v_slider, {
                                          modelValue: pickupHoursForm.min_hours_before_pickup,
                                          "onUpdate:modelValue": ($event) => pickupHoursForm.min_hours_before_pickup = $event,
                                          "error-messages": local_errors.value.min_hours_before_pickup,
                                          min: "0",
                                          max: "120",
                                          ticks: [0, 24, 48, 72, 96, 120],
                                          "show-ticks": "always",
                                          step: "24"
                                        }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                                      ]),
                                      _: 1
                                    }),
                                    createVNode("div", { class: "mt-2" }, [
                                      createVNode(_component_v_btn, {
                                        onClick: withModifiers(savePickupHours, ["prevent"])
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode("Update")
                                        ]),
                                        _: 1
                                      })
                                    ])
                                  ])
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(_sfc_main$2, null, {
                            default: withCtx(() => [
                              createVNode(_component_v_card, {
                                color: "grey-lighten-3",
                                rounded: "lg"
                              }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "p-4" }, [
                                    createVNode(_sfc_main$2, null, {
                                      default: withCtx(() => [
                                        createVNode("p", { class: "text-xl" }, "Up to how many days in the future can users set up a pickup date"),
                                        createVNode(_component_v_label, null, {
                                          default: withCtx(() => [
                                            createTextVNode("Will effectively be 365 if empty")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_v_text_field, {
                                          modelValue: futureHoursForm.future_pickup_day_count,
                                          "onUpdate:modelValue": ($event) => futureHoursForm.future_pickup_day_count = $event,
                                          "error-messages": local_errors.value.future_pickup_day_count
                                        }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                                      ]),
                                      _: 1
                                    }),
                                    createVNode("div", { class: "mt-2" }, [
                                      createVNode(_component_v_btn, {
                                        onClick: withModifiers(saveFuturePickupDayCount, ["prevent"])
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode("Update")
                                        ]),
                                        _: 1
                                      })
                                    ])
                                  ])
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(_component_v_card, {
                            color: "grey-lighten-3",
                            rounded: "lg"
                          }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "p-4" }, [
                                createVNode(_sfc_main$2, { gap: "10" }, {
                                  default: withCtx(() => [
                                    createVNode(_sfc_main$2, null, {
                                      default: withCtx(() => [
                                        createVNode("p", { class: "text-xl" }, "Hour range for pickup"),
                                        createVNode(_sfc_main$2, null, {
                                          default: withCtx(() => [
                                            createVNode("div", null, [
                                              (openBlock(), createBlock(_component_v_range_slider, {
                                                key: 0,
                                                min: "6",
                                                max: "22",
                                                modelValue: timeRange.value,
                                                "onUpdate:modelValue": ($event) => timeRange.value = $event,
                                                ticks: [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22],
                                                "show-ticks": "always",
                                                step: "1",
                                                strict: ""
                                              }, null, 8, ["modelValue", "onUpdate:modelValue"]))
                                            ])
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_sfc_main$2, null, {
                                      default: withCtx(() => [
                                        createVNode("p", { class: "text-xl" }, "Pickup interval (minutes)"),
                                        createVNode(_component_v_slider, {
                                          modelValue: timeRangeForm.interval_minutes,
                                          "onUpdate:modelValue": ($event) => timeRangeForm.interval_minutes = $event,
                                          min: "5",
                                          max: "30",
                                          ticks: [5, 10, 15, 20, 25, 30],
                                          "show-ticks": "always",
                                          step: "5"
                                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_sfc_main$2, null, {
                                      default: withCtx(() => [
                                        createVNode("p", { class: "text-xl" }, "Max pickups per slot"),
                                        createVNode(_component_v_slider, {
                                          modelValue: timeRangeForm.max_orders_per_slot,
                                          "onUpdate:modelValue": ($event) => timeRangeForm.max_orders_per_slot = $event,
                                          min: "2",
                                          max: "20",
                                          ticks: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20],
                                          "show-ticks": "always",
                                          step: "2"
                                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                      ]),
                                      _: 1
                                    }),
                                    createVNode("div", { class: "mt-2" }, [
                                      createVNode(_component_v_btn, {
                                        onClick: withModifiers(saveTimeRange, ["prevent"])
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode("Update")
                                        ]),
                                        _: 1
                                      })
                                    ])
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
                  _push3(ssrRenderComponent(_sfc_main$2, { gap: "4" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_sfc_main$2, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_v_card, {
                                color: "grey-lighten-3",
                                rounded: "lg"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<div class="p-4"${_scopeId5}>`);
                                    _push6(ssrRenderComponent(_sfc_main$2, null, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`<p class="text-xl"${_scopeId6}>Board script state</p>`);
                                          _push7(ssrRenderComponent(_component_v_switch, {
                                            inset: "",
                                            color: "green",
                                            modelValue: boardScriptForm.board_script_on,
                                            "onUpdate:modelValue": ($event) => boardScriptForm.board_script_on = $event
                                          }, null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode("p", { class: "text-xl" }, "Board script state"),
                                            createVNode(_component_v_switch, {
                                              inset: "",
                                              color: "green",
                                              modelValue: boardScriptForm.board_script_on,
                                              "onUpdate:modelValue": ($event) => boardScriptForm.board_script_on = $event
                                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(`<div class="mt-2"${_scopeId5}>`);
                                    _push6(ssrRenderComponent(_component_v_btn, { onClick: saveBoardScript }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`Update`);
                                        } else {
                                          return [
                                            createTextVNode("Update")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(`</div></div>`);
                                  } else {
                                    return [
                                      createVNode("div", { class: "p-4" }, [
                                        createVNode(_sfc_main$2, null, {
                                          default: withCtx(() => [
                                            createVNode("p", { class: "text-xl" }, "Board script state"),
                                            createVNode(_component_v_switch, {
                                              inset: "",
                                              color: "green",
                                              modelValue: boardScriptForm.board_script_on,
                                              "onUpdate:modelValue": ($event) => boardScriptForm.board_script_on = $event
                                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                          ]),
                                          _: 1
                                        }),
                                        createVNode("div", { class: "mt-2" }, [
                                          createVNode(_component_v_btn, {
                                            onClick: withModifiers(saveBoardScript, ["prevent"])
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode("Update")
                                            ]),
                                            _: 1
                                          })
                                        ])
                                      ])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_v_card, {
                                  color: "grey-lighten-3",
                                  rounded: "lg"
                                }, {
                                  default: withCtx(() => [
                                    createVNode("div", { class: "p-4" }, [
                                      createVNode(_sfc_main$2, null, {
                                        default: withCtx(() => [
                                          createVNode("p", { class: "text-xl" }, "Board script state"),
                                          createVNode(_component_v_switch, {
                                            inset: "",
                                            color: "green",
                                            modelValue: boardScriptForm.board_script_on,
                                            "onUpdate:modelValue": ($event) => boardScriptForm.board_script_on = $event
                                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                        ]),
                                        _: 1
                                      }),
                                      createVNode("div", { class: "mt-2" }, [
                                        createVNode(_component_v_btn, {
                                          onClick: withModifiers(saveBoardScript, ["prevent"])
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode("Update")
                                          ]),
                                          _: 1
                                        })
                                      ])
                                    ])
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_sfc_main$2, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_v_card, {
                                color: "grey-lighten-3",
                                rounded: "lg"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<div class="p-4"${_scopeId5}>`);
                                    _push6(ssrRenderComponent(_sfc_main$2, null, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`<p class="text-xl"${_scopeId6}>Footer opening times</p>`);
                                          _push7(ssrRenderComponent(_sfc_main$2, null, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(ssrRenderComponent(_component_v_label, null, {
                                                  default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                    if (_push9) {
                                                      _push9(`Monday (leave empty if closed)`);
                                                    } else {
                                                      return [
                                                        createTextVNode("Monday (leave empty if closed)")
                                                      ];
                                                    }
                                                  }),
                                                  _: 1
                                                }, _parent8, _scopeId7));
                                                _push8(`<p class="text-xs"${_scopeId7}>Original value: empty</p>`);
                                                _push8(ssrRenderComponent(_component_v_text_field, {
                                                  modelValue: openingTimesForm.monday_opening_times,
                                                  "onUpdate:modelValue": ($event) => openingTimesForm.monday_opening_times = $event
                                                }, null, _parent8, _scopeId7));
                                              } else {
                                                return [
                                                  createVNode(_component_v_label, null, {
                                                    default: withCtx(() => [
                                                      createTextVNode("Monday (leave empty if closed)")
                                                    ]),
                                                    _: 1
                                                  }),
                                                  createVNode("p", { class: "text-xs" }, "Original value: empty"),
                                                  createVNode(_component_v_text_field, {
                                                    modelValue: openingTimesForm.monday_opening_times,
                                                    "onUpdate:modelValue": ($event) => openingTimesForm.monday_opening_times = $event
                                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                          _push7(ssrRenderComponent(_sfc_main$2, null, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(ssrRenderComponent(_component_v_label, null, {
                                                  default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                    if (_push9) {
                                                      _push9(`Tuesday (leave empty if closed)`);
                                                    } else {
                                                      return [
                                                        createTextVNode("Tuesday (leave empty if closed)")
                                                      ];
                                                    }
                                                  }),
                                                  _: 1
                                                }, _parent8, _scopeId7));
                                                _push8(`<p class="text-xs"${_scopeId7}>Original value: 8:00am - Sold out</p>`);
                                                _push8(ssrRenderComponent(_component_v_text_field, {
                                                  modelValue: openingTimesForm.tuesday_opening_times,
                                                  "onUpdate:modelValue": ($event) => openingTimesForm.tuesday_opening_times = $event
                                                }, null, _parent8, _scopeId7));
                                              } else {
                                                return [
                                                  createVNode(_component_v_label, null, {
                                                    default: withCtx(() => [
                                                      createTextVNode("Tuesday (leave empty if closed)")
                                                    ]),
                                                    _: 1
                                                  }),
                                                  createVNode("p", { class: "text-xs" }, "Original value: 8:00am - Sold out"),
                                                  createVNode(_component_v_text_field, {
                                                    modelValue: openingTimesForm.tuesday_opening_times,
                                                    "onUpdate:modelValue": ($event) => openingTimesForm.tuesday_opening_times = $event
                                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                          _push7(ssrRenderComponent(_sfc_main$2, null, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(ssrRenderComponent(_component_v_label, null, {
                                                  default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                    if (_push9) {
                                                      _push9(`Wednesday (leave empty if closed)`);
                                                    } else {
                                                      return [
                                                        createTextVNode("Wednesday (leave empty if closed)")
                                                      ];
                                                    }
                                                  }),
                                                  _: 1
                                                }, _parent8, _scopeId7));
                                                _push8(`<p class="text-xs"${_scopeId7}>Original value: 8:00am - Sold out</p>`);
                                                _push8(ssrRenderComponent(_component_v_text_field, {
                                                  modelValue: openingTimesForm.wednesday_opening_times,
                                                  "onUpdate:modelValue": ($event) => openingTimesForm.wednesday_opening_times = $event
                                                }, null, _parent8, _scopeId7));
                                              } else {
                                                return [
                                                  createVNode(_component_v_label, null, {
                                                    default: withCtx(() => [
                                                      createTextVNode("Wednesday (leave empty if closed)")
                                                    ]),
                                                    _: 1
                                                  }),
                                                  createVNode("p", { class: "text-xs" }, "Original value: 8:00am - Sold out"),
                                                  createVNode(_component_v_text_field, {
                                                    modelValue: openingTimesForm.wednesday_opening_times,
                                                    "onUpdate:modelValue": ($event) => openingTimesForm.wednesday_opening_times = $event
                                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                          _push7(ssrRenderComponent(_sfc_main$2, null, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(ssrRenderComponent(_component_v_label, null, {
                                                  default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                    if (_push9) {
                                                      _push9(`Thursday (leave empty if closed)`);
                                                    } else {
                                                      return [
                                                        createTextVNode("Thursday (leave empty if closed)")
                                                      ];
                                                    }
                                                  }),
                                                  _: 1
                                                }, _parent8, _scopeId7));
                                                _push8(`<p class="text-xs"${_scopeId7}>Original value: 8:00am - Sold out</p>`);
                                                _push8(ssrRenderComponent(_component_v_text_field, {
                                                  modelValue: openingTimesForm.thursday_opening_times,
                                                  "onUpdate:modelValue": ($event) => openingTimesForm.thursday_opening_times = $event
                                                }, null, _parent8, _scopeId7));
                                              } else {
                                                return [
                                                  createVNode(_component_v_label, null, {
                                                    default: withCtx(() => [
                                                      createTextVNode("Thursday (leave empty if closed)")
                                                    ]),
                                                    _: 1
                                                  }),
                                                  createVNode("p", { class: "text-xs" }, "Original value: 8:00am - Sold out"),
                                                  createVNode(_component_v_text_field, {
                                                    modelValue: openingTimesForm.thursday_opening_times,
                                                    "onUpdate:modelValue": ($event) => openingTimesForm.thursday_opening_times = $event
                                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                          _push7(ssrRenderComponent(_sfc_main$2, null, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(ssrRenderComponent(_component_v_label, null, {
                                                  default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                    if (_push9) {
                                                      _push9(`Friday (leave empty if closed)`);
                                                    } else {
                                                      return [
                                                        createTextVNode("Friday (leave empty if closed)")
                                                      ];
                                                    }
                                                  }),
                                                  _: 1
                                                }, _parent8, _scopeId7));
                                                _push8(`<p class="text-xs"${_scopeId7}>Original value: 8:00am - Sold out</p>`);
                                                _push8(ssrRenderComponent(_component_v_text_field, {
                                                  modelValue: openingTimesForm.friday_opening_times,
                                                  "onUpdate:modelValue": ($event) => openingTimesForm.friday_opening_times = $event
                                                }, null, _parent8, _scopeId7));
                                              } else {
                                                return [
                                                  createVNode(_component_v_label, null, {
                                                    default: withCtx(() => [
                                                      createTextVNode("Friday (leave empty if closed)")
                                                    ]),
                                                    _: 1
                                                  }),
                                                  createVNode("p", { class: "text-xs" }, "Original value: 8:00am - Sold out"),
                                                  createVNode(_component_v_text_field, {
                                                    modelValue: openingTimesForm.friday_opening_times,
                                                    "onUpdate:modelValue": ($event) => openingTimesForm.friday_opening_times = $event
                                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                          _push7(ssrRenderComponent(_sfc_main$2, null, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(ssrRenderComponent(_component_v_label, null, {
                                                  default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                    if (_push9) {
                                                      _push9(`Saturday (leave empty if closed)`);
                                                    } else {
                                                      return [
                                                        createTextVNode("Saturday (leave empty if closed)")
                                                      ];
                                                    }
                                                  }),
                                                  _: 1
                                                }, _parent8, _scopeId7));
                                                _push8(`<p class="text-xs"${_scopeId7}>Original value: 8:30am - Sold out</p>`);
                                                _push8(ssrRenderComponent(_component_v_text_field, {
                                                  modelValue: openingTimesForm.saturday_opening_times,
                                                  "onUpdate:modelValue": ($event) => openingTimesForm.saturday_opening_times = $event
                                                }, null, _parent8, _scopeId7));
                                              } else {
                                                return [
                                                  createVNode(_component_v_label, null, {
                                                    default: withCtx(() => [
                                                      createTextVNode("Saturday (leave empty if closed)")
                                                    ]),
                                                    _: 1
                                                  }),
                                                  createVNode("p", { class: "text-xs" }, "Original value: 8:30am - Sold out"),
                                                  createVNode(_component_v_text_field, {
                                                    modelValue: openingTimesForm.saturday_opening_times,
                                                    "onUpdate:modelValue": ($event) => openingTimesForm.saturday_opening_times = $event
                                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                          _push7(ssrRenderComponent(_sfc_main$2, null, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(ssrRenderComponent(_component_v_label, null, {
                                                  default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                    if (_push9) {
                                                      _push9(`Sunday (leave empty if closed)`);
                                                    } else {
                                                      return [
                                                        createTextVNode("Sunday (leave empty if closed)")
                                                      ];
                                                    }
                                                  }),
                                                  _: 1
                                                }, _parent8, _scopeId7));
                                                _push8(`<p class="text-xs"${_scopeId7}>Original value: 8:30am - Sold out</p>`);
                                                _push8(ssrRenderComponent(_component_v_text_field, {
                                                  modelValue: openingTimesForm.sunday_opening_times,
                                                  "onUpdate:modelValue": ($event) => openingTimesForm.sunday_opening_times = $event
                                                }, null, _parent8, _scopeId7));
                                              } else {
                                                return [
                                                  createVNode(_component_v_label, null, {
                                                    default: withCtx(() => [
                                                      createTextVNode("Sunday (leave empty if closed)")
                                                    ]),
                                                    _: 1
                                                  }),
                                                  createVNode("p", { class: "text-xs" }, "Original value: 8:30am - Sold out"),
                                                  createVNode(_component_v_text_field, {
                                                    modelValue: openingTimesForm.sunday_opening_times,
                                                    "onUpdate:modelValue": ($event) => openingTimesForm.sunday_opening_times = $event
                                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode("p", { class: "text-xl" }, "Footer opening times"),
                                            createVNode(_sfc_main$2, null, {
                                              default: withCtx(() => [
                                                createVNode(_component_v_label, null, {
                                                  default: withCtx(() => [
                                                    createTextVNode("Monday (leave empty if closed)")
                                                  ]),
                                                  _: 1
                                                }),
                                                createVNode("p", { class: "text-xs" }, "Original value: empty"),
                                                createVNode(_component_v_text_field, {
                                                  modelValue: openingTimesForm.monday_opening_times,
                                                  "onUpdate:modelValue": ($event) => openingTimesForm.monday_opening_times = $event
                                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_sfc_main$2, null, {
                                              default: withCtx(() => [
                                                createVNode(_component_v_label, null, {
                                                  default: withCtx(() => [
                                                    createTextVNode("Tuesday (leave empty if closed)")
                                                  ]),
                                                  _: 1
                                                }),
                                                createVNode("p", { class: "text-xs" }, "Original value: 8:00am - Sold out"),
                                                createVNode(_component_v_text_field, {
                                                  modelValue: openingTimesForm.tuesday_opening_times,
                                                  "onUpdate:modelValue": ($event) => openingTimesForm.tuesday_opening_times = $event
                                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_sfc_main$2, null, {
                                              default: withCtx(() => [
                                                createVNode(_component_v_label, null, {
                                                  default: withCtx(() => [
                                                    createTextVNode("Wednesday (leave empty if closed)")
                                                  ]),
                                                  _: 1
                                                }),
                                                createVNode("p", { class: "text-xs" }, "Original value: 8:00am - Sold out"),
                                                createVNode(_component_v_text_field, {
                                                  modelValue: openingTimesForm.wednesday_opening_times,
                                                  "onUpdate:modelValue": ($event) => openingTimesForm.wednesday_opening_times = $event
                                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_sfc_main$2, null, {
                                              default: withCtx(() => [
                                                createVNode(_component_v_label, null, {
                                                  default: withCtx(() => [
                                                    createTextVNode("Thursday (leave empty if closed)")
                                                  ]),
                                                  _: 1
                                                }),
                                                createVNode("p", { class: "text-xs" }, "Original value: 8:00am - Sold out"),
                                                createVNode(_component_v_text_field, {
                                                  modelValue: openingTimesForm.thursday_opening_times,
                                                  "onUpdate:modelValue": ($event) => openingTimesForm.thursday_opening_times = $event
                                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_sfc_main$2, null, {
                                              default: withCtx(() => [
                                                createVNode(_component_v_label, null, {
                                                  default: withCtx(() => [
                                                    createTextVNode("Friday (leave empty if closed)")
                                                  ]),
                                                  _: 1
                                                }),
                                                createVNode("p", { class: "text-xs" }, "Original value: 8:00am - Sold out"),
                                                createVNode(_component_v_text_field, {
                                                  modelValue: openingTimesForm.friday_opening_times,
                                                  "onUpdate:modelValue": ($event) => openingTimesForm.friday_opening_times = $event
                                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_sfc_main$2, null, {
                                              default: withCtx(() => [
                                                createVNode(_component_v_label, null, {
                                                  default: withCtx(() => [
                                                    createTextVNode("Saturday (leave empty if closed)")
                                                  ]),
                                                  _: 1
                                                }),
                                                createVNode("p", { class: "text-xs" }, "Original value: 8:30am - Sold out"),
                                                createVNode(_component_v_text_field, {
                                                  modelValue: openingTimesForm.saturday_opening_times,
                                                  "onUpdate:modelValue": ($event) => openingTimesForm.saturday_opening_times = $event
                                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_sfc_main$2, null, {
                                              default: withCtx(() => [
                                                createVNode(_component_v_label, null, {
                                                  default: withCtx(() => [
                                                    createTextVNode("Sunday (leave empty if closed)")
                                                  ]),
                                                  _: 1
                                                }),
                                                createVNode("p", { class: "text-xs" }, "Original value: 8:30am - Sold out"),
                                                createVNode(_component_v_text_field, {
                                                  modelValue: openingTimesForm.sunday_opening_times,
                                                  "onUpdate:modelValue": ($event) => openingTimesForm.sunday_opening_times = $event
                                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                              ]),
                                              _: 1
                                            })
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(`<div class="mt-2"${_scopeId5}>`);
                                    _push6(ssrRenderComponent(_component_v_btn, { onClick: saveOpeningTimes }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`Update`);
                                        } else {
                                          return [
                                            createTextVNode("Update")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(`</div></div>`);
                                  } else {
                                    return [
                                      createVNode("div", { class: "p-4" }, [
                                        createVNode(_sfc_main$2, null, {
                                          default: withCtx(() => [
                                            createVNode("p", { class: "text-xl" }, "Footer opening times"),
                                            createVNode(_sfc_main$2, null, {
                                              default: withCtx(() => [
                                                createVNode(_component_v_label, null, {
                                                  default: withCtx(() => [
                                                    createTextVNode("Monday (leave empty if closed)")
                                                  ]),
                                                  _: 1
                                                }),
                                                createVNode("p", { class: "text-xs" }, "Original value: empty"),
                                                createVNode(_component_v_text_field, {
                                                  modelValue: openingTimesForm.monday_opening_times,
                                                  "onUpdate:modelValue": ($event) => openingTimesForm.monday_opening_times = $event
                                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_sfc_main$2, null, {
                                              default: withCtx(() => [
                                                createVNode(_component_v_label, null, {
                                                  default: withCtx(() => [
                                                    createTextVNode("Tuesday (leave empty if closed)")
                                                  ]),
                                                  _: 1
                                                }),
                                                createVNode("p", { class: "text-xs" }, "Original value: 8:00am - Sold out"),
                                                createVNode(_component_v_text_field, {
                                                  modelValue: openingTimesForm.tuesday_opening_times,
                                                  "onUpdate:modelValue": ($event) => openingTimesForm.tuesday_opening_times = $event
                                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_sfc_main$2, null, {
                                              default: withCtx(() => [
                                                createVNode(_component_v_label, null, {
                                                  default: withCtx(() => [
                                                    createTextVNode("Wednesday (leave empty if closed)")
                                                  ]),
                                                  _: 1
                                                }),
                                                createVNode("p", { class: "text-xs" }, "Original value: 8:00am - Sold out"),
                                                createVNode(_component_v_text_field, {
                                                  modelValue: openingTimesForm.wednesday_opening_times,
                                                  "onUpdate:modelValue": ($event) => openingTimesForm.wednesday_opening_times = $event
                                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_sfc_main$2, null, {
                                              default: withCtx(() => [
                                                createVNode(_component_v_label, null, {
                                                  default: withCtx(() => [
                                                    createTextVNode("Thursday (leave empty if closed)")
                                                  ]),
                                                  _: 1
                                                }),
                                                createVNode("p", { class: "text-xs" }, "Original value: 8:00am - Sold out"),
                                                createVNode(_component_v_text_field, {
                                                  modelValue: openingTimesForm.thursday_opening_times,
                                                  "onUpdate:modelValue": ($event) => openingTimesForm.thursday_opening_times = $event
                                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_sfc_main$2, null, {
                                              default: withCtx(() => [
                                                createVNode(_component_v_label, null, {
                                                  default: withCtx(() => [
                                                    createTextVNode("Friday (leave empty if closed)")
                                                  ]),
                                                  _: 1
                                                }),
                                                createVNode("p", { class: "text-xs" }, "Original value: 8:00am - Sold out"),
                                                createVNode(_component_v_text_field, {
                                                  modelValue: openingTimesForm.friday_opening_times,
                                                  "onUpdate:modelValue": ($event) => openingTimesForm.friday_opening_times = $event
                                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_sfc_main$2, null, {
                                              default: withCtx(() => [
                                                createVNode(_component_v_label, null, {
                                                  default: withCtx(() => [
                                                    createTextVNode("Saturday (leave empty if closed)")
                                                  ]),
                                                  _: 1
                                                }),
                                                createVNode("p", { class: "text-xs" }, "Original value: 8:30am - Sold out"),
                                                createVNode(_component_v_text_field, {
                                                  modelValue: openingTimesForm.saturday_opening_times,
                                                  "onUpdate:modelValue": ($event) => openingTimesForm.saturday_opening_times = $event
                                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_sfc_main$2, null, {
                                              default: withCtx(() => [
                                                createVNode(_component_v_label, null, {
                                                  default: withCtx(() => [
                                                    createTextVNode("Sunday (leave empty if closed)")
                                                  ]),
                                                  _: 1
                                                }),
                                                createVNode("p", { class: "text-xs" }, "Original value: 8:30am - Sold out"),
                                                createVNode(_component_v_text_field, {
                                                  modelValue: openingTimesForm.sunday_opening_times,
                                                  "onUpdate:modelValue": ($event) => openingTimesForm.sunday_opening_times = $event
                                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                              ]),
                                              _: 1
                                            })
                                          ]),
                                          _: 1
                                        }),
                                        createVNode("div", { class: "mt-2" }, [
                                          createVNode(_component_v_btn, {
                                            onClick: withModifiers(saveOpeningTimes, ["prevent"])
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode("Update")
                                            ]),
                                            _: 1
                                          })
                                        ])
                                      ])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_v_card, {
                                  color: "grey-lighten-3",
                                  rounded: "lg"
                                }, {
                                  default: withCtx(() => [
                                    createVNode("div", { class: "p-4" }, [
                                      createVNode(_sfc_main$2, null, {
                                        default: withCtx(() => [
                                          createVNode("p", { class: "text-xl" }, "Footer opening times"),
                                          createVNode(_sfc_main$2, null, {
                                            default: withCtx(() => [
                                              createVNode(_component_v_label, null, {
                                                default: withCtx(() => [
                                                  createTextVNode("Monday (leave empty if closed)")
                                                ]),
                                                _: 1
                                              }),
                                              createVNode("p", { class: "text-xs" }, "Original value: empty"),
                                              createVNode(_component_v_text_field, {
                                                modelValue: openingTimesForm.monday_opening_times,
                                                "onUpdate:modelValue": ($event) => openingTimesForm.monday_opening_times = $event
                                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_sfc_main$2, null, {
                                            default: withCtx(() => [
                                              createVNode(_component_v_label, null, {
                                                default: withCtx(() => [
                                                  createTextVNode("Tuesday (leave empty if closed)")
                                                ]),
                                                _: 1
                                              }),
                                              createVNode("p", { class: "text-xs" }, "Original value: 8:00am - Sold out"),
                                              createVNode(_component_v_text_field, {
                                                modelValue: openingTimesForm.tuesday_opening_times,
                                                "onUpdate:modelValue": ($event) => openingTimesForm.tuesday_opening_times = $event
                                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_sfc_main$2, null, {
                                            default: withCtx(() => [
                                              createVNode(_component_v_label, null, {
                                                default: withCtx(() => [
                                                  createTextVNode("Wednesday (leave empty if closed)")
                                                ]),
                                                _: 1
                                              }),
                                              createVNode("p", { class: "text-xs" }, "Original value: 8:00am - Sold out"),
                                              createVNode(_component_v_text_field, {
                                                modelValue: openingTimesForm.wednesday_opening_times,
                                                "onUpdate:modelValue": ($event) => openingTimesForm.wednesday_opening_times = $event
                                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_sfc_main$2, null, {
                                            default: withCtx(() => [
                                              createVNode(_component_v_label, null, {
                                                default: withCtx(() => [
                                                  createTextVNode("Thursday (leave empty if closed)")
                                                ]),
                                                _: 1
                                              }),
                                              createVNode("p", { class: "text-xs" }, "Original value: 8:00am - Sold out"),
                                              createVNode(_component_v_text_field, {
                                                modelValue: openingTimesForm.thursday_opening_times,
                                                "onUpdate:modelValue": ($event) => openingTimesForm.thursday_opening_times = $event
                                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_sfc_main$2, null, {
                                            default: withCtx(() => [
                                              createVNode(_component_v_label, null, {
                                                default: withCtx(() => [
                                                  createTextVNode("Friday (leave empty if closed)")
                                                ]),
                                                _: 1
                                              }),
                                              createVNode("p", { class: "text-xs" }, "Original value: 8:00am - Sold out"),
                                              createVNode(_component_v_text_field, {
                                                modelValue: openingTimesForm.friday_opening_times,
                                                "onUpdate:modelValue": ($event) => openingTimesForm.friday_opening_times = $event
                                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_sfc_main$2, null, {
                                            default: withCtx(() => [
                                              createVNode(_component_v_label, null, {
                                                default: withCtx(() => [
                                                  createTextVNode("Saturday (leave empty if closed)")
                                                ]),
                                                _: 1
                                              }),
                                              createVNode("p", { class: "text-xs" }, "Original value: 8:30am - Sold out"),
                                              createVNode(_component_v_text_field, {
                                                modelValue: openingTimesForm.saturday_opening_times,
                                                "onUpdate:modelValue": ($event) => openingTimesForm.saturday_opening_times = $event
                                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_sfc_main$2, null, {
                                            default: withCtx(() => [
                                              createVNode(_component_v_label, null, {
                                                default: withCtx(() => [
                                                  createTextVNode("Sunday (leave empty if closed)")
                                                ]),
                                                _: 1
                                              }),
                                              createVNode("p", { class: "text-xs" }, "Original value: 8:30am - Sold out"),
                                              createVNode(_component_v_text_field, {
                                                modelValue: openingTimesForm.sunday_opening_times,
                                                "onUpdate:modelValue": ($event) => openingTimesForm.sunday_opening_times = $event
                                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      }),
                                      createVNode("div", { class: "mt-2" }, [
                                        createVNode(_component_v_btn, {
                                          onClick: withModifiers(saveOpeningTimes, ["prevent"])
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode("Update")
                                          ]),
                                          _: 1
                                        })
                                      ])
                                    ])
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_v_card, {
                          color: "grey-lighten-3",
                          rounded: "lg"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<div class="p-4"${_scopeId4}>`);
                              _push5(ssrRenderComponent(_sfc_main$2, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<p class="text-xl"${_scopeId5}>Meta descriptions</p><p class="text-xs"${_scopeId5}>(recommended length: 150-160 characters)</p>`);
                                    _push6(ssrRenderComponent(_sfc_main$2, null, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(_component_v_label, null, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(`Homepage`);
                                                if (metaTagsForm.meta_description_home) {
                                                  _push8(`<span${_scopeId7}> ${ssrInterpolate(metaTagsForm.meta_description_home.length)}/300</span>`);
                                                } else {
                                                  _push8(`<!---->`);
                                                }
                                              } else {
                                                return [
                                                  createTextVNode("Homepage"),
                                                  metaTagsForm.meta_description_home ? (openBlock(), createBlock("span", { key: 0 }, " " + toDisplayString(metaTagsForm.meta_description_home.length) + "/300", 1)) : createCommentVNode("", true)
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                          _push7(ssrRenderComponent(_component_v_textarea, {
                                            rows: "2",
                                            "auto-grow": "",
                                            onKeydown: () => {
                                            },
                                            modelValue: metaTagsForm.meta_description_home,
                                            "onUpdate:modelValue": ($event) => metaTagsForm.meta_description_home = $event,
                                            "error-messages": local_errors.value.meta_description_home
                                          }, null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(_component_v_label, null, {
                                              default: withCtx(() => [
                                                createTextVNode("Homepage"),
                                                metaTagsForm.meta_description_home ? (openBlock(), createBlock("span", { key: 0 }, " " + toDisplayString(metaTagsForm.meta_description_home.length) + "/300", 1)) : createCommentVNode("", true)
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_v_textarea, {
                                              rows: "2",
                                              "auto-grow": "",
                                              onKeydown: withKeys(withModifiers(() => {
                                              }, ["prevent"]), ["enter"]),
                                              modelValue: metaTagsForm.meta_description_home,
                                              "onUpdate:modelValue": ($event) => metaTagsForm.meta_description_home = $event,
                                              "error-messages": local_errors.value.meta_description_home
                                            }, null, 8, ["onKeydown", "modelValue", "onUpdate:modelValue", "error-messages"])
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(_sfc_main$2, null, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(_component_v_label, null, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(`Boutique`);
                                                if (metaTagsForm.meta_description_boutique) {
                                                  _push8(`<span${_scopeId7}> ${ssrInterpolate(metaTagsForm.meta_description_boutique.length)}/300</span>`);
                                                } else {
                                                  _push8(`<!---->`);
                                                }
                                              } else {
                                                return [
                                                  createTextVNode("Boutique"),
                                                  metaTagsForm.meta_description_boutique ? (openBlock(), createBlock("span", { key: 0 }, " " + toDisplayString(metaTagsForm.meta_description_boutique.length) + "/300", 1)) : createCommentVNode("", true)
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                          _push7(ssrRenderComponent(_component_v_textarea, {
                                            rows: "2",
                                            "auto-grow": "",
                                            onKeydown: () => {
                                            },
                                            modelValue: metaTagsForm.meta_description_boutique,
                                            "onUpdate:modelValue": ($event) => metaTagsForm.meta_description_boutique = $event,
                                            "error-messages": local_errors.value.meta_description_boutique
                                          }, null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(_component_v_label, null, {
                                              default: withCtx(() => [
                                                createTextVNode("Boutique"),
                                                metaTagsForm.meta_description_boutique ? (openBlock(), createBlock("span", { key: 0 }, " " + toDisplayString(metaTagsForm.meta_description_boutique.length) + "/300", 1)) : createCommentVNode("", true)
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_v_textarea, {
                                              rows: "2",
                                              "auto-grow": "",
                                              onKeydown: withKeys(withModifiers(() => {
                                              }, ["prevent"]), ["enter"]),
                                              modelValue: metaTagsForm.meta_description_boutique,
                                              "onUpdate:modelValue": ($event) => metaTagsForm.meta_description_boutique = $event,
                                              "error-messages": local_errors.value.meta_description_boutique
                                            }, null, 8, ["onKeydown", "modelValue", "onUpdate:modelValue", "error-messages"])
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(_sfc_main$2, null, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(_component_v_label, null, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(`Catering`);
                                                if (metaTagsForm.meta_description_catering) {
                                                  _push8(`<span${_scopeId7}> ${ssrInterpolate(metaTagsForm.meta_description_catering.length)}/300</span>`);
                                                } else {
                                                  _push8(`<!---->`);
                                                }
                                              } else {
                                                return [
                                                  createTextVNode("Catering"),
                                                  metaTagsForm.meta_description_catering ? (openBlock(), createBlock("span", { key: 0 }, " " + toDisplayString(metaTagsForm.meta_description_catering.length) + "/300", 1)) : createCommentVNode("", true)
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                          _push7(ssrRenderComponent(_component_v_textarea, {
                                            rows: "2",
                                            "auto-grow": "",
                                            onKeydown: () => {
                                            },
                                            modelValue: metaTagsForm.meta_description_catering,
                                            "onUpdate:modelValue": ($event) => metaTagsForm.meta_description_catering = $event,
                                            "error-messages": local_errors.value.meta_description_catering
                                          }, null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(_component_v_label, null, {
                                              default: withCtx(() => [
                                                createTextVNode("Catering"),
                                                metaTagsForm.meta_description_catering ? (openBlock(), createBlock("span", { key: 0 }, " " + toDisplayString(metaTagsForm.meta_description_catering.length) + "/300", 1)) : createCommentVNode("", true)
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_v_textarea, {
                                              rows: "2",
                                              "auto-grow": "",
                                              onKeydown: withKeys(withModifiers(() => {
                                              }, ["prevent"]), ["enter"]),
                                              modelValue: metaTagsForm.meta_description_catering,
                                              "onUpdate:modelValue": ($event) => metaTagsForm.meta_description_catering = $event,
                                              "error-messages": local_errors.value.meta_description_catering
                                            }, null, 8, ["onKeydown", "modelValue", "onUpdate:modelValue", "error-messages"])
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(_sfc_main$2, null, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(_component_v_label, null, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(`Contact`);
                                                if (metaTagsForm.meta_description_contact) {
                                                  _push8(`<span${_scopeId7}> ${ssrInterpolate(metaTagsForm.meta_description_contact.length)}/300</span>`);
                                                } else {
                                                  _push8(`<!---->`);
                                                }
                                              } else {
                                                return [
                                                  createTextVNode("Contact"),
                                                  metaTagsForm.meta_description_contact ? (openBlock(), createBlock("span", { key: 0 }, " " + toDisplayString(metaTagsForm.meta_description_contact.length) + "/300", 1)) : createCommentVNode("", true)
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                          _push7(ssrRenderComponent(_component_v_textarea, {
                                            rows: "2",
                                            "auto-grow": "",
                                            onKeydown: () => {
                                            },
                                            modelValue: metaTagsForm.meta_description_contact,
                                            "onUpdate:modelValue": ($event) => metaTagsForm.meta_description_contact = $event,
                                            "error-messages": local_errors.value.meta_description_contact
                                          }, null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(_component_v_label, null, {
                                              default: withCtx(() => [
                                                createTextVNode("Contact"),
                                                metaTagsForm.meta_description_contact ? (openBlock(), createBlock("span", { key: 0 }, " " + toDisplayString(metaTagsForm.meta_description_contact.length) + "/300", 1)) : createCommentVNode("", true)
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_v_textarea, {
                                              rows: "2",
                                              "auto-grow": "",
                                              onKeydown: withKeys(withModifiers(() => {
                                              }, ["prevent"]), ["enter"]),
                                              modelValue: metaTagsForm.meta_description_contact,
                                              "onUpdate:modelValue": ($event) => metaTagsForm.meta_description_contact = $event,
                                              "error-messages": local_errors.value.meta_description_contact
                                            }, null, 8, ["onKeydown", "modelValue", "onUpdate:modelValue", "error-messages"])
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode("p", { class: "text-xl" }, "Meta descriptions"),
                                      createVNode("p", { class: "text-xs" }, "(recommended length: 150-160 characters)"),
                                      createVNode(_sfc_main$2, null, {
                                        default: withCtx(() => [
                                          createVNode(_component_v_label, null, {
                                            default: withCtx(() => [
                                              createTextVNode("Homepage"),
                                              metaTagsForm.meta_description_home ? (openBlock(), createBlock("span", { key: 0 }, " " + toDisplayString(metaTagsForm.meta_description_home.length) + "/300", 1)) : createCommentVNode("", true)
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_v_textarea, {
                                            rows: "2",
                                            "auto-grow": "",
                                            onKeydown: withKeys(withModifiers(() => {
                                            }, ["prevent"]), ["enter"]),
                                            modelValue: metaTagsForm.meta_description_home,
                                            "onUpdate:modelValue": ($event) => metaTagsForm.meta_description_home = $event,
                                            "error-messages": local_errors.value.meta_description_home
                                          }, null, 8, ["onKeydown", "modelValue", "onUpdate:modelValue", "error-messages"])
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_sfc_main$2, null, {
                                        default: withCtx(() => [
                                          createVNode(_component_v_label, null, {
                                            default: withCtx(() => [
                                              createTextVNode("Boutique"),
                                              metaTagsForm.meta_description_boutique ? (openBlock(), createBlock("span", { key: 0 }, " " + toDisplayString(metaTagsForm.meta_description_boutique.length) + "/300", 1)) : createCommentVNode("", true)
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_v_textarea, {
                                            rows: "2",
                                            "auto-grow": "",
                                            onKeydown: withKeys(withModifiers(() => {
                                            }, ["prevent"]), ["enter"]),
                                            modelValue: metaTagsForm.meta_description_boutique,
                                            "onUpdate:modelValue": ($event) => metaTagsForm.meta_description_boutique = $event,
                                            "error-messages": local_errors.value.meta_description_boutique
                                          }, null, 8, ["onKeydown", "modelValue", "onUpdate:modelValue", "error-messages"])
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_sfc_main$2, null, {
                                        default: withCtx(() => [
                                          createVNode(_component_v_label, null, {
                                            default: withCtx(() => [
                                              createTextVNode("Catering"),
                                              metaTagsForm.meta_description_catering ? (openBlock(), createBlock("span", { key: 0 }, " " + toDisplayString(metaTagsForm.meta_description_catering.length) + "/300", 1)) : createCommentVNode("", true)
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_v_textarea, {
                                            rows: "2",
                                            "auto-grow": "",
                                            onKeydown: withKeys(withModifiers(() => {
                                            }, ["prevent"]), ["enter"]),
                                            modelValue: metaTagsForm.meta_description_catering,
                                            "onUpdate:modelValue": ($event) => metaTagsForm.meta_description_catering = $event,
                                            "error-messages": local_errors.value.meta_description_catering
                                          }, null, 8, ["onKeydown", "modelValue", "onUpdate:modelValue", "error-messages"])
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_sfc_main$2, null, {
                                        default: withCtx(() => [
                                          createVNode(_component_v_label, null, {
                                            default: withCtx(() => [
                                              createTextVNode("Contact"),
                                              metaTagsForm.meta_description_contact ? (openBlock(), createBlock("span", { key: 0 }, " " + toDisplayString(metaTagsForm.meta_description_contact.length) + "/300", 1)) : createCommentVNode("", true)
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_v_textarea, {
                                            rows: "2",
                                            "auto-grow": "",
                                            onKeydown: withKeys(withModifiers(() => {
                                            }, ["prevent"]), ["enter"]),
                                            modelValue: metaTagsForm.meta_description_contact,
                                            "onUpdate:modelValue": ($event) => metaTagsForm.meta_description_contact = $event,
                                            "error-messages": local_errors.value.meta_description_contact
                                          }, null, 8, ["onKeydown", "modelValue", "onUpdate:modelValue", "error-messages"])
                                        ]),
                                        _: 1
                                      })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(`<div class="mt-2"${_scopeId4}>`);
                              _push5(ssrRenderComponent(_component_v_btn, { onClick: saveMetaTags }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Update`);
                                  } else {
                                    return [
                                      createTextVNode("Update")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(`</div></div>`);
                            } else {
                              return [
                                createVNode("div", { class: "p-4" }, [
                                  createVNode(_sfc_main$2, null, {
                                    default: withCtx(() => [
                                      createVNode("p", { class: "text-xl" }, "Meta descriptions"),
                                      createVNode("p", { class: "text-xs" }, "(recommended length: 150-160 characters)"),
                                      createVNode(_sfc_main$2, null, {
                                        default: withCtx(() => [
                                          createVNode(_component_v_label, null, {
                                            default: withCtx(() => [
                                              createTextVNode("Homepage"),
                                              metaTagsForm.meta_description_home ? (openBlock(), createBlock("span", { key: 0 }, " " + toDisplayString(metaTagsForm.meta_description_home.length) + "/300", 1)) : createCommentVNode("", true)
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_v_textarea, {
                                            rows: "2",
                                            "auto-grow": "",
                                            onKeydown: withKeys(withModifiers(() => {
                                            }, ["prevent"]), ["enter"]),
                                            modelValue: metaTagsForm.meta_description_home,
                                            "onUpdate:modelValue": ($event) => metaTagsForm.meta_description_home = $event,
                                            "error-messages": local_errors.value.meta_description_home
                                          }, null, 8, ["onKeydown", "modelValue", "onUpdate:modelValue", "error-messages"])
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_sfc_main$2, null, {
                                        default: withCtx(() => [
                                          createVNode(_component_v_label, null, {
                                            default: withCtx(() => [
                                              createTextVNode("Boutique"),
                                              metaTagsForm.meta_description_boutique ? (openBlock(), createBlock("span", { key: 0 }, " " + toDisplayString(metaTagsForm.meta_description_boutique.length) + "/300", 1)) : createCommentVNode("", true)
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_v_textarea, {
                                            rows: "2",
                                            "auto-grow": "",
                                            onKeydown: withKeys(withModifiers(() => {
                                            }, ["prevent"]), ["enter"]),
                                            modelValue: metaTagsForm.meta_description_boutique,
                                            "onUpdate:modelValue": ($event) => metaTagsForm.meta_description_boutique = $event,
                                            "error-messages": local_errors.value.meta_description_boutique
                                          }, null, 8, ["onKeydown", "modelValue", "onUpdate:modelValue", "error-messages"])
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_sfc_main$2, null, {
                                        default: withCtx(() => [
                                          createVNode(_component_v_label, null, {
                                            default: withCtx(() => [
                                              createTextVNode("Catering"),
                                              metaTagsForm.meta_description_catering ? (openBlock(), createBlock("span", { key: 0 }, " " + toDisplayString(metaTagsForm.meta_description_catering.length) + "/300", 1)) : createCommentVNode("", true)
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_v_textarea, {
                                            rows: "2",
                                            "auto-grow": "",
                                            onKeydown: withKeys(withModifiers(() => {
                                            }, ["prevent"]), ["enter"]),
                                            modelValue: metaTagsForm.meta_description_catering,
                                            "onUpdate:modelValue": ($event) => metaTagsForm.meta_description_catering = $event,
                                            "error-messages": local_errors.value.meta_description_catering
                                          }, null, 8, ["onKeydown", "modelValue", "onUpdate:modelValue", "error-messages"])
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_sfc_main$2, null, {
                                        default: withCtx(() => [
                                          createVNode(_component_v_label, null, {
                                            default: withCtx(() => [
                                              createTextVNode("Contact"),
                                              metaTagsForm.meta_description_contact ? (openBlock(), createBlock("span", { key: 0 }, " " + toDisplayString(metaTagsForm.meta_description_contact.length) + "/300", 1)) : createCommentVNode("", true)
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_v_textarea, {
                                            rows: "2",
                                            "auto-grow": "",
                                            onKeydown: withKeys(withModifiers(() => {
                                            }, ["prevent"]), ["enter"]),
                                            modelValue: metaTagsForm.meta_description_contact,
                                            "onUpdate:modelValue": ($event) => metaTagsForm.meta_description_contact = $event,
                                            "error-messages": local_errors.value.meta_description_contact
                                          }, null, 8, ["onKeydown", "modelValue", "onUpdate:modelValue", "error-messages"])
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode("div", { class: "mt-2" }, [
                                    createVNode(_component_v_btn, {
                                      onClick: withModifiers(saveMetaTags, ["prevent"])
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode("Update")
                                      ]),
                                      _: 1
                                    })
                                  ])
                                ])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_sfc_main$2, null, {
                            default: withCtx(() => [
                              createVNode(_component_v_card, {
                                color: "grey-lighten-3",
                                rounded: "lg"
                              }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "p-4" }, [
                                    createVNode(_sfc_main$2, null, {
                                      default: withCtx(() => [
                                        createVNode("p", { class: "text-xl" }, "Board script state"),
                                        createVNode(_component_v_switch, {
                                          inset: "",
                                          color: "green",
                                          modelValue: boardScriptForm.board_script_on,
                                          "onUpdate:modelValue": ($event) => boardScriptForm.board_script_on = $event
                                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                      ]),
                                      _: 1
                                    }),
                                    createVNode("div", { class: "mt-2" }, [
                                      createVNode(_component_v_btn, {
                                        onClick: withModifiers(saveBoardScript, ["prevent"])
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode("Update")
                                        ]),
                                        _: 1
                                      })
                                    ])
                                  ])
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(_sfc_main$2, null, {
                            default: withCtx(() => [
                              createVNode(_component_v_card, {
                                color: "grey-lighten-3",
                                rounded: "lg"
                              }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "p-4" }, [
                                    createVNode(_sfc_main$2, null, {
                                      default: withCtx(() => [
                                        createVNode("p", { class: "text-xl" }, "Footer opening times"),
                                        createVNode(_sfc_main$2, null, {
                                          default: withCtx(() => [
                                            createVNode(_component_v_label, null, {
                                              default: withCtx(() => [
                                                createTextVNode("Monday (leave empty if closed)")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode("p", { class: "text-xs" }, "Original value: empty"),
                                            createVNode(_component_v_text_field, {
                                              modelValue: openingTimesForm.monday_opening_times,
                                              "onUpdate:modelValue": ($event) => openingTimesForm.monday_opening_times = $event
                                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_sfc_main$2, null, {
                                          default: withCtx(() => [
                                            createVNode(_component_v_label, null, {
                                              default: withCtx(() => [
                                                createTextVNode("Tuesday (leave empty if closed)")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode("p", { class: "text-xs" }, "Original value: 8:00am - Sold out"),
                                            createVNode(_component_v_text_field, {
                                              modelValue: openingTimesForm.tuesday_opening_times,
                                              "onUpdate:modelValue": ($event) => openingTimesForm.tuesday_opening_times = $event
                                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_sfc_main$2, null, {
                                          default: withCtx(() => [
                                            createVNode(_component_v_label, null, {
                                              default: withCtx(() => [
                                                createTextVNode("Wednesday (leave empty if closed)")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode("p", { class: "text-xs" }, "Original value: 8:00am - Sold out"),
                                            createVNode(_component_v_text_field, {
                                              modelValue: openingTimesForm.wednesday_opening_times,
                                              "onUpdate:modelValue": ($event) => openingTimesForm.wednesday_opening_times = $event
                                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_sfc_main$2, null, {
                                          default: withCtx(() => [
                                            createVNode(_component_v_label, null, {
                                              default: withCtx(() => [
                                                createTextVNode("Thursday (leave empty if closed)")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode("p", { class: "text-xs" }, "Original value: 8:00am - Sold out"),
                                            createVNode(_component_v_text_field, {
                                              modelValue: openingTimesForm.thursday_opening_times,
                                              "onUpdate:modelValue": ($event) => openingTimesForm.thursday_opening_times = $event
                                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_sfc_main$2, null, {
                                          default: withCtx(() => [
                                            createVNode(_component_v_label, null, {
                                              default: withCtx(() => [
                                                createTextVNode("Friday (leave empty if closed)")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode("p", { class: "text-xs" }, "Original value: 8:00am - Sold out"),
                                            createVNode(_component_v_text_field, {
                                              modelValue: openingTimesForm.friday_opening_times,
                                              "onUpdate:modelValue": ($event) => openingTimesForm.friday_opening_times = $event
                                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_sfc_main$2, null, {
                                          default: withCtx(() => [
                                            createVNode(_component_v_label, null, {
                                              default: withCtx(() => [
                                                createTextVNode("Saturday (leave empty if closed)")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode("p", { class: "text-xs" }, "Original value: 8:30am - Sold out"),
                                            createVNode(_component_v_text_field, {
                                              modelValue: openingTimesForm.saturday_opening_times,
                                              "onUpdate:modelValue": ($event) => openingTimesForm.saturday_opening_times = $event
                                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_sfc_main$2, null, {
                                          default: withCtx(() => [
                                            createVNode(_component_v_label, null, {
                                              default: withCtx(() => [
                                                createTextVNode("Sunday (leave empty if closed)")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode("p", { class: "text-xs" }, "Original value: 8:30am - Sold out"),
                                            createVNode(_component_v_text_field, {
                                              modelValue: openingTimesForm.sunday_opening_times,
                                              "onUpdate:modelValue": ($event) => openingTimesForm.sunday_opening_times = $event
                                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    }),
                                    createVNode("div", { class: "mt-2" }, [
                                      createVNode(_component_v_btn, {
                                        onClick: withModifiers(saveOpeningTimes, ["prevent"])
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode("Update")
                                        ]),
                                        _: 1
                                      })
                                    ])
                                  ])
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(_component_v_card, {
                            color: "grey-lighten-3",
                            rounded: "lg"
                          }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "p-4" }, [
                                createVNode(_sfc_main$2, null, {
                                  default: withCtx(() => [
                                    createVNode("p", { class: "text-xl" }, "Meta descriptions"),
                                    createVNode("p", { class: "text-xs" }, "(recommended length: 150-160 characters)"),
                                    createVNode(_sfc_main$2, null, {
                                      default: withCtx(() => [
                                        createVNode(_component_v_label, null, {
                                          default: withCtx(() => [
                                            createTextVNode("Homepage"),
                                            metaTagsForm.meta_description_home ? (openBlock(), createBlock("span", { key: 0 }, " " + toDisplayString(metaTagsForm.meta_description_home.length) + "/300", 1)) : createCommentVNode("", true)
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_v_textarea, {
                                          rows: "2",
                                          "auto-grow": "",
                                          onKeydown: withKeys(withModifiers(() => {
                                          }, ["prevent"]), ["enter"]),
                                          modelValue: metaTagsForm.meta_description_home,
                                          "onUpdate:modelValue": ($event) => metaTagsForm.meta_description_home = $event,
                                          "error-messages": local_errors.value.meta_description_home
                                        }, null, 8, ["onKeydown", "modelValue", "onUpdate:modelValue", "error-messages"])
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_sfc_main$2, null, {
                                      default: withCtx(() => [
                                        createVNode(_component_v_label, null, {
                                          default: withCtx(() => [
                                            createTextVNode("Boutique"),
                                            metaTagsForm.meta_description_boutique ? (openBlock(), createBlock("span", { key: 0 }, " " + toDisplayString(metaTagsForm.meta_description_boutique.length) + "/300", 1)) : createCommentVNode("", true)
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_v_textarea, {
                                          rows: "2",
                                          "auto-grow": "",
                                          onKeydown: withKeys(withModifiers(() => {
                                          }, ["prevent"]), ["enter"]),
                                          modelValue: metaTagsForm.meta_description_boutique,
                                          "onUpdate:modelValue": ($event) => metaTagsForm.meta_description_boutique = $event,
                                          "error-messages": local_errors.value.meta_description_boutique
                                        }, null, 8, ["onKeydown", "modelValue", "onUpdate:modelValue", "error-messages"])
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_sfc_main$2, null, {
                                      default: withCtx(() => [
                                        createVNode(_component_v_label, null, {
                                          default: withCtx(() => [
                                            createTextVNode("Catering"),
                                            metaTagsForm.meta_description_catering ? (openBlock(), createBlock("span", { key: 0 }, " " + toDisplayString(metaTagsForm.meta_description_catering.length) + "/300", 1)) : createCommentVNode("", true)
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_v_textarea, {
                                          rows: "2",
                                          "auto-grow": "",
                                          onKeydown: withKeys(withModifiers(() => {
                                          }, ["prevent"]), ["enter"]),
                                          modelValue: metaTagsForm.meta_description_catering,
                                          "onUpdate:modelValue": ($event) => metaTagsForm.meta_description_catering = $event,
                                          "error-messages": local_errors.value.meta_description_catering
                                        }, null, 8, ["onKeydown", "modelValue", "onUpdate:modelValue", "error-messages"])
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_sfc_main$2, null, {
                                      default: withCtx(() => [
                                        createVNode(_component_v_label, null, {
                                          default: withCtx(() => [
                                            createTextVNode("Contact"),
                                            metaTagsForm.meta_description_contact ? (openBlock(), createBlock("span", { key: 0 }, " " + toDisplayString(metaTagsForm.meta_description_contact.length) + "/300", 1)) : createCommentVNode("", true)
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_v_textarea, {
                                          rows: "2",
                                          "auto-grow": "",
                                          onKeydown: withKeys(withModifiers(() => {
                                          }, ["prevent"]), ["enter"]),
                                          modelValue: metaTagsForm.meta_description_contact,
                                          "onUpdate:modelValue": ($event) => metaTagsForm.meta_description_contact = $event,
                                          "error-messages": local_errors.value.meta_description_contact
                                        }, null, 8, ["onKeydown", "modelValue", "onUpdate:modelValue", "error-messages"])
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode("div", { class: "mt-2" }, [
                                  createVNode(_component_v_btn, {
                                    onClick: withModifiers(saveMetaTags, ["prevent"])
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode("Update")
                                    ]),
                                    _: 1
                                  })
                                ])
                              ])
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_sfc_main$2, { gap: "4" }, {
                      default: withCtx(() => [
                        createVNode(_sfc_main$2, null, {
                          default: withCtx(() => [
                            createVNode(_component_v_card, {
                              color: "grey-lighten-3",
                              rounded: "lg"
                            }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "p-4" }, [
                                  createVNode(_sfc_main$2, null, {
                                    default: withCtx(() => [
                                      createVNode("p", { class: "text-xl" }, "Edit store address"),
                                      createVNode("p", null, "(appears in order pickup notification)"),
                                      createVNode(_sfc_main$2, null, {
                                        default: withCtx(() => [
                                          createVNode(_component_v_label, null, {
                                            default: withCtx(() => [
                                              createTextVNode("Store name")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_v_text_field, {
                                            modelValue: addressForm.our_address_1,
                                            "onUpdate:modelValue": ($event) => addressForm.our_address_1 = $event,
                                            "error-messages": local_errors.value.our_address_1
                                          }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_sfc_main$2, null, {
                                        default: withCtx(() => [
                                          createVNode(_component_v_label, null, {
                                            default: withCtx(() => [
                                              createTextVNode("Address")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_v_text_field, {
                                            modelValue: addressForm.our_address_2,
                                            "onUpdate:modelValue": ($event) => addressForm.our_address_2 = $event,
                                            "error-messages": local_errors.value.our_address_2
                                          }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_sfc_main$2, null, {
                                        default: withCtx(() => [
                                          createVNode(_component_v_label, null, {
                                            default: withCtx(() => [
                                              createTextVNode("City and post code")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_v_text_field, {
                                            modelValue: addressForm.our_city_postcode,
                                            "onUpdate:modelValue": ($event) => addressForm.our_city_postcode = $event,
                                            "error-messages": local_errors.value.our_city_postcode
                                          }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_sfc_main$2, null, {
                                        default: withCtx(() => [
                                          createVNode(_component_v_label, null, {
                                            default: withCtx(() => [
                                              createTextVNode("Phone number")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_v_text_field, {
                                            modelValue: addressForm.our_phone_number,
                                            "onUpdate:modelValue": ($event) => addressForm.our_phone_number = $event,
                                            "error-messages": local_errors.value.our_phone_number
                                          }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                                        ]),
                                        _: 1
                                      }),
                                      createVNode("div", { class: "mt-2" }, [
                                        createVNode(_component_v_btn, {
                                          onClick: withModifiers(saveAddress, ["prevent"])
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode("Update")
                                          ]),
                                          _: 1
                                        })
                                      ])
                                    ]),
                                    _: 1
                                  })
                                ])
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(_sfc_main$2, null, {
                          default: withCtx(() => [
                            createVNode(_component_v_card, {
                              color: "grey-lighten-3",
                              rounded: "lg"
                            }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "p-4" }, [
                                  createVNode(_sfc_main$2, null, {
                                    default: withCtx(() => [
                                      createVNode("p", { class: "text-xl" }, "Minimum hours between order and pickup"),
                                      createVNode(_component_v_slider, {
                                        modelValue: pickupHoursForm.min_hours_before_pickup,
                                        "onUpdate:modelValue": ($event) => pickupHoursForm.min_hours_before_pickup = $event,
                                        "error-messages": local_errors.value.min_hours_before_pickup,
                                        min: "0",
                                        max: "120",
                                        ticks: [0, 24, 48, 72, 96, 120],
                                        "show-ticks": "always",
                                        step: "24"
                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                                    ]),
                                    _: 1
                                  }),
                                  createVNode("div", { class: "mt-2" }, [
                                    createVNode(_component_v_btn, {
                                      onClick: withModifiers(savePickupHours, ["prevent"])
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode("Update")
                                      ]),
                                      _: 1
                                    })
                                  ])
                                ])
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(_sfc_main$2, null, {
                          default: withCtx(() => [
                            createVNode(_component_v_card, {
                              color: "grey-lighten-3",
                              rounded: "lg"
                            }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "p-4" }, [
                                  createVNode(_sfc_main$2, null, {
                                    default: withCtx(() => [
                                      createVNode("p", { class: "text-xl" }, "Up to how many days in the future can users set up a pickup date"),
                                      createVNode(_component_v_label, null, {
                                        default: withCtx(() => [
                                          createTextVNode("Will effectively be 365 if empty")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_v_text_field, {
                                        modelValue: futureHoursForm.future_pickup_day_count,
                                        "onUpdate:modelValue": ($event) => futureHoursForm.future_pickup_day_count = $event,
                                        "error-messages": local_errors.value.future_pickup_day_count
                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                                    ]),
                                    _: 1
                                  }),
                                  createVNode("div", { class: "mt-2" }, [
                                    createVNode(_component_v_btn, {
                                      onClick: withModifiers(saveFuturePickupDayCount, ["prevent"])
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode("Update")
                                      ]),
                                      _: 1
                                    })
                                  ])
                                ])
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(_component_v_card, {
                          color: "grey-lighten-3",
                          rounded: "lg"
                        }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "p-4" }, [
                              createVNode(_sfc_main$2, { gap: "10" }, {
                                default: withCtx(() => [
                                  createVNode(_sfc_main$2, null, {
                                    default: withCtx(() => [
                                      createVNode("p", { class: "text-xl" }, "Hour range for pickup"),
                                      createVNode(_sfc_main$2, null, {
                                        default: withCtx(() => [
                                          createVNode("div", null, [
                                            (openBlock(), createBlock(_component_v_range_slider, {
                                              key: 0,
                                              min: "6",
                                              max: "22",
                                              modelValue: timeRange.value,
                                              "onUpdate:modelValue": ($event) => timeRange.value = $event,
                                              ticks: [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22],
                                              "show-ticks": "always",
                                              step: "1",
                                              strict: ""
                                            }, null, 8, ["modelValue", "onUpdate:modelValue"]))
                                          ])
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_sfc_main$2, null, {
                                    default: withCtx(() => [
                                      createVNode("p", { class: "text-xl" }, "Pickup interval (minutes)"),
                                      createVNode(_component_v_slider, {
                                        modelValue: timeRangeForm.interval_minutes,
                                        "onUpdate:modelValue": ($event) => timeRangeForm.interval_minutes = $event,
                                        min: "5",
                                        max: "30",
                                        ticks: [5, 10, 15, 20, 25, 30],
                                        "show-ticks": "always",
                                        step: "5"
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_sfc_main$2, null, {
                                    default: withCtx(() => [
                                      createVNode("p", { class: "text-xl" }, "Max pickups per slot"),
                                      createVNode(_component_v_slider, {
                                        modelValue: timeRangeForm.max_orders_per_slot,
                                        "onUpdate:modelValue": ($event) => timeRangeForm.max_orders_per_slot = $event,
                                        min: "2",
                                        max: "20",
                                        ticks: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20],
                                        "show-ticks": "always",
                                        step: "2"
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ]),
                                    _: 1
                                  }),
                                  createVNode("div", { class: "mt-2" }, [
                                    createVNode(_component_v_btn, {
                                      onClick: withModifiers(saveTimeRange, ["prevent"])
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode("Update")
                                      ]),
                                      _: 1
                                    })
                                  ])
                                ]),
                                _: 1
                              })
                            ])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(_sfc_main$2, { gap: "4" }, {
                      default: withCtx(() => [
                        createVNode(_sfc_main$2, null, {
                          default: withCtx(() => [
                            createVNode(_component_v_card, {
                              color: "grey-lighten-3",
                              rounded: "lg"
                            }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "p-4" }, [
                                  createVNode(_sfc_main$2, null, {
                                    default: withCtx(() => [
                                      createVNode("p", { class: "text-xl" }, "Board script state"),
                                      createVNode(_component_v_switch, {
                                        inset: "",
                                        color: "green",
                                        modelValue: boardScriptForm.board_script_on,
                                        "onUpdate:modelValue": ($event) => boardScriptForm.board_script_on = $event
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ]),
                                    _: 1
                                  }),
                                  createVNode("div", { class: "mt-2" }, [
                                    createVNode(_component_v_btn, {
                                      onClick: withModifiers(saveBoardScript, ["prevent"])
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode("Update")
                                      ]),
                                      _: 1
                                    })
                                  ])
                                ])
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(_sfc_main$2, null, {
                          default: withCtx(() => [
                            createVNode(_component_v_card, {
                              color: "grey-lighten-3",
                              rounded: "lg"
                            }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "p-4" }, [
                                  createVNode(_sfc_main$2, null, {
                                    default: withCtx(() => [
                                      createVNode("p", { class: "text-xl" }, "Footer opening times"),
                                      createVNode(_sfc_main$2, null, {
                                        default: withCtx(() => [
                                          createVNode(_component_v_label, null, {
                                            default: withCtx(() => [
                                              createTextVNode("Monday (leave empty if closed)")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode("p", { class: "text-xs" }, "Original value: empty"),
                                          createVNode(_component_v_text_field, {
                                            modelValue: openingTimesForm.monday_opening_times,
                                            "onUpdate:modelValue": ($event) => openingTimesForm.monday_opening_times = $event
                                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_sfc_main$2, null, {
                                        default: withCtx(() => [
                                          createVNode(_component_v_label, null, {
                                            default: withCtx(() => [
                                              createTextVNode("Tuesday (leave empty if closed)")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode("p", { class: "text-xs" }, "Original value: 8:00am - Sold out"),
                                          createVNode(_component_v_text_field, {
                                            modelValue: openingTimesForm.tuesday_opening_times,
                                            "onUpdate:modelValue": ($event) => openingTimesForm.tuesday_opening_times = $event
                                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_sfc_main$2, null, {
                                        default: withCtx(() => [
                                          createVNode(_component_v_label, null, {
                                            default: withCtx(() => [
                                              createTextVNode("Wednesday (leave empty if closed)")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode("p", { class: "text-xs" }, "Original value: 8:00am - Sold out"),
                                          createVNode(_component_v_text_field, {
                                            modelValue: openingTimesForm.wednesday_opening_times,
                                            "onUpdate:modelValue": ($event) => openingTimesForm.wednesday_opening_times = $event
                                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_sfc_main$2, null, {
                                        default: withCtx(() => [
                                          createVNode(_component_v_label, null, {
                                            default: withCtx(() => [
                                              createTextVNode("Thursday (leave empty if closed)")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode("p", { class: "text-xs" }, "Original value: 8:00am - Sold out"),
                                          createVNode(_component_v_text_field, {
                                            modelValue: openingTimesForm.thursday_opening_times,
                                            "onUpdate:modelValue": ($event) => openingTimesForm.thursday_opening_times = $event
                                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_sfc_main$2, null, {
                                        default: withCtx(() => [
                                          createVNode(_component_v_label, null, {
                                            default: withCtx(() => [
                                              createTextVNode("Friday (leave empty if closed)")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode("p", { class: "text-xs" }, "Original value: 8:00am - Sold out"),
                                          createVNode(_component_v_text_field, {
                                            modelValue: openingTimesForm.friday_opening_times,
                                            "onUpdate:modelValue": ($event) => openingTimesForm.friday_opening_times = $event
                                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_sfc_main$2, null, {
                                        default: withCtx(() => [
                                          createVNode(_component_v_label, null, {
                                            default: withCtx(() => [
                                              createTextVNode("Saturday (leave empty if closed)")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode("p", { class: "text-xs" }, "Original value: 8:30am - Sold out"),
                                          createVNode(_component_v_text_field, {
                                            modelValue: openingTimesForm.saturday_opening_times,
                                            "onUpdate:modelValue": ($event) => openingTimesForm.saturday_opening_times = $event
                                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_sfc_main$2, null, {
                                        default: withCtx(() => [
                                          createVNode(_component_v_label, null, {
                                            default: withCtx(() => [
                                              createTextVNode("Sunday (leave empty if closed)")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode("p", { class: "text-xs" }, "Original value: 8:30am - Sold out"),
                                          createVNode(_component_v_text_field, {
                                            modelValue: openingTimesForm.sunday_opening_times,
                                            "onUpdate:modelValue": ($event) => openingTimesForm.sunday_opening_times = $event
                                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode("div", { class: "mt-2" }, [
                                    createVNode(_component_v_btn, {
                                      onClick: withModifiers(saveOpeningTimes, ["prevent"])
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode("Update")
                                      ]),
                                      _: 1
                                    })
                                  ])
                                ])
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(_component_v_card, {
                          color: "grey-lighten-3",
                          rounded: "lg"
                        }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "p-4" }, [
                              createVNode(_sfc_main$2, null, {
                                default: withCtx(() => [
                                  createVNode("p", { class: "text-xl" }, "Meta descriptions"),
                                  createVNode("p", { class: "text-xs" }, "(recommended length: 150-160 characters)"),
                                  createVNode(_sfc_main$2, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_v_label, null, {
                                        default: withCtx(() => [
                                          createTextVNode("Homepage"),
                                          metaTagsForm.meta_description_home ? (openBlock(), createBlock("span", { key: 0 }, " " + toDisplayString(metaTagsForm.meta_description_home.length) + "/300", 1)) : createCommentVNode("", true)
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_v_textarea, {
                                        rows: "2",
                                        "auto-grow": "",
                                        onKeydown: withKeys(withModifiers(() => {
                                        }, ["prevent"]), ["enter"]),
                                        modelValue: metaTagsForm.meta_description_home,
                                        "onUpdate:modelValue": ($event) => metaTagsForm.meta_description_home = $event,
                                        "error-messages": local_errors.value.meta_description_home
                                      }, null, 8, ["onKeydown", "modelValue", "onUpdate:modelValue", "error-messages"])
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_sfc_main$2, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_v_label, null, {
                                        default: withCtx(() => [
                                          createTextVNode("Boutique"),
                                          metaTagsForm.meta_description_boutique ? (openBlock(), createBlock("span", { key: 0 }, " " + toDisplayString(metaTagsForm.meta_description_boutique.length) + "/300", 1)) : createCommentVNode("", true)
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_v_textarea, {
                                        rows: "2",
                                        "auto-grow": "",
                                        onKeydown: withKeys(withModifiers(() => {
                                        }, ["prevent"]), ["enter"]),
                                        modelValue: metaTagsForm.meta_description_boutique,
                                        "onUpdate:modelValue": ($event) => metaTagsForm.meta_description_boutique = $event,
                                        "error-messages": local_errors.value.meta_description_boutique
                                      }, null, 8, ["onKeydown", "modelValue", "onUpdate:modelValue", "error-messages"])
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_sfc_main$2, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_v_label, null, {
                                        default: withCtx(() => [
                                          createTextVNode("Catering"),
                                          metaTagsForm.meta_description_catering ? (openBlock(), createBlock("span", { key: 0 }, " " + toDisplayString(metaTagsForm.meta_description_catering.length) + "/300", 1)) : createCommentVNode("", true)
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_v_textarea, {
                                        rows: "2",
                                        "auto-grow": "",
                                        onKeydown: withKeys(withModifiers(() => {
                                        }, ["prevent"]), ["enter"]),
                                        modelValue: metaTagsForm.meta_description_catering,
                                        "onUpdate:modelValue": ($event) => metaTagsForm.meta_description_catering = $event,
                                        "error-messages": local_errors.value.meta_description_catering
                                      }, null, 8, ["onKeydown", "modelValue", "onUpdate:modelValue", "error-messages"])
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_sfc_main$2, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_v_label, null, {
                                        default: withCtx(() => [
                                          createTextVNode("Contact"),
                                          metaTagsForm.meta_description_contact ? (openBlock(), createBlock("span", { key: 0 }, " " + toDisplayString(metaTagsForm.meta_description_contact.length) + "/300", 1)) : createCommentVNode("", true)
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_v_textarea, {
                                        rows: "2",
                                        "auto-grow": "",
                                        onKeydown: withKeys(withModifiers(() => {
                                        }, ["prevent"]), ["enter"]),
                                        modelValue: metaTagsForm.meta_description_contact,
                                        "onUpdate:modelValue": ($event) => metaTagsForm.meta_description_contact = $event,
                                        "error-messages": local_errors.value.meta_description_contact
                                      }, null, 8, ["onKeydown", "modelValue", "onUpdate:modelValue", "error-messages"])
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode("div", { class: "mt-2" }, [
                                createVNode(_component_v_btn, {
                                  onClick: withModifiers(saveMetaTags, ["prevent"])
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("Update")
                                  ]),
                                  _: 1
                                })
                              ])
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
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$1, {
                cols: "1",
                md: "1",
                lg: "2",
                xl: "2",
                "2xl": "2"
              }, {
                default: withCtx(() => [
                  createVNode(_sfc_main$2, { gap: "4" }, {
                    default: withCtx(() => [
                      createVNode(_sfc_main$2, null, {
                        default: withCtx(() => [
                          createVNode(_component_v_card, {
                            color: "grey-lighten-3",
                            rounded: "lg"
                          }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "p-4" }, [
                                createVNode(_sfc_main$2, null, {
                                  default: withCtx(() => [
                                    createVNode("p", { class: "text-xl" }, "Edit store address"),
                                    createVNode("p", null, "(appears in order pickup notification)"),
                                    createVNode(_sfc_main$2, null, {
                                      default: withCtx(() => [
                                        createVNode(_component_v_label, null, {
                                          default: withCtx(() => [
                                            createTextVNode("Store name")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_v_text_field, {
                                          modelValue: addressForm.our_address_1,
                                          "onUpdate:modelValue": ($event) => addressForm.our_address_1 = $event,
                                          "error-messages": local_errors.value.our_address_1
                                        }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_sfc_main$2, null, {
                                      default: withCtx(() => [
                                        createVNode(_component_v_label, null, {
                                          default: withCtx(() => [
                                            createTextVNode("Address")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_v_text_field, {
                                          modelValue: addressForm.our_address_2,
                                          "onUpdate:modelValue": ($event) => addressForm.our_address_2 = $event,
                                          "error-messages": local_errors.value.our_address_2
                                        }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_sfc_main$2, null, {
                                      default: withCtx(() => [
                                        createVNode(_component_v_label, null, {
                                          default: withCtx(() => [
                                            createTextVNode("City and post code")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_v_text_field, {
                                          modelValue: addressForm.our_city_postcode,
                                          "onUpdate:modelValue": ($event) => addressForm.our_city_postcode = $event,
                                          "error-messages": local_errors.value.our_city_postcode
                                        }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_sfc_main$2, null, {
                                      default: withCtx(() => [
                                        createVNode(_component_v_label, null, {
                                          default: withCtx(() => [
                                            createTextVNode("Phone number")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_v_text_field, {
                                          modelValue: addressForm.our_phone_number,
                                          "onUpdate:modelValue": ($event) => addressForm.our_phone_number = $event,
                                          "error-messages": local_errors.value.our_phone_number
                                        }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                                      ]),
                                      _: 1
                                    }),
                                    createVNode("div", { class: "mt-2" }, [
                                      createVNode(_component_v_btn, {
                                        onClick: withModifiers(saveAddress, ["prevent"])
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode("Update")
                                        ]),
                                        _: 1
                                      })
                                    ])
                                  ]),
                                  _: 1
                                })
                              ])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(_sfc_main$2, null, {
                        default: withCtx(() => [
                          createVNode(_component_v_card, {
                            color: "grey-lighten-3",
                            rounded: "lg"
                          }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "p-4" }, [
                                createVNode(_sfc_main$2, null, {
                                  default: withCtx(() => [
                                    createVNode("p", { class: "text-xl" }, "Minimum hours between order and pickup"),
                                    createVNode(_component_v_slider, {
                                      modelValue: pickupHoursForm.min_hours_before_pickup,
                                      "onUpdate:modelValue": ($event) => pickupHoursForm.min_hours_before_pickup = $event,
                                      "error-messages": local_errors.value.min_hours_before_pickup,
                                      min: "0",
                                      max: "120",
                                      ticks: [0, 24, 48, 72, 96, 120],
                                      "show-ticks": "always",
                                      step: "24"
                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                                  ]),
                                  _: 1
                                }),
                                createVNode("div", { class: "mt-2" }, [
                                  createVNode(_component_v_btn, {
                                    onClick: withModifiers(savePickupHours, ["prevent"])
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode("Update")
                                    ]),
                                    _: 1
                                  })
                                ])
                              ])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(_sfc_main$2, null, {
                        default: withCtx(() => [
                          createVNode(_component_v_card, {
                            color: "grey-lighten-3",
                            rounded: "lg"
                          }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "p-4" }, [
                                createVNode(_sfc_main$2, null, {
                                  default: withCtx(() => [
                                    createVNode("p", { class: "text-xl" }, "Up to how many days in the future can users set up a pickup date"),
                                    createVNode(_component_v_label, null, {
                                      default: withCtx(() => [
                                        createTextVNode("Will effectively be 365 if empty")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_v_text_field, {
                                      modelValue: futureHoursForm.future_pickup_day_count,
                                      "onUpdate:modelValue": ($event) => futureHoursForm.future_pickup_day_count = $event,
                                      "error-messages": local_errors.value.future_pickup_day_count
                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                                  ]),
                                  _: 1
                                }),
                                createVNode("div", { class: "mt-2" }, [
                                  createVNode(_component_v_btn, {
                                    onClick: withModifiers(saveFuturePickupDayCount, ["prevent"])
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode("Update")
                                    ]),
                                    _: 1
                                  })
                                ])
                              ])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(_component_v_card, {
                        color: "grey-lighten-3",
                        rounded: "lg"
                      }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "p-4" }, [
                            createVNode(_sfc_main$2, { gap: "10" }, {
                              default: withCtx(() => [
                                createVNode(_sfc_main$2, null, {
                                  default: withCtx(() => [
                                    createVNode("p", { class: "text-xl" }, "Hour range for pickup"),
                                    createVNode(_sfc_main$2, null, {
                                      default: withCtx(() => [
                                        createVNode("div", null, [
                                          (openBlock(), createBlock(_component_v_range_slider, {
                                            key: 0,
                                            min: "6",
                                            max: "22",
                                            modelValue: timeRange.value,
                                            "onUpdate:modelValue": ($event) => timeRange.value = $event,
                                            ticks: [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22],
                                            "show-ticks": "always",
                                            step: "1",
                                            strict: ""
                                          }, null, 8, ["modelValue", "onUpdate:modelValue"]))
                                        ])
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(_sfc_main$2, null, {
                                  default: withCtx(() => [
                                    createVNode("p", { class: "text-xl" }, "Pickup interval (minutes)"),
                                    createVNode(_component_v_slider, {
                                      modelValue: timeRangeForm.interval_minutes,
                                      "onUpdate:modelValue": ($event) => timeRangeForm.interval_minutes = $event,
                                      min: "5",
                                      max: "30",
                                      ticks: [5, 10, 15, 20, 25, 30],
                                      "show-ticks": "always",
                                      step: "5"
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                  ]),
                                  _: 1
                                }),
                                createVNode(_sfc_main$2, null, {
                                  default: withCtx(() => [
                                    createVNode("p", { class: "text-xl" }, "Max pickups per slot"),
                                    createVNode(_component_v_slider, {
                                      modelValue: timeRangeForm.max_orders_per_slot,
                                      "onUpdate:modelValue": ($event) => timeRangeForm.max_orders_per_slot = $event,
                                      min: "2",
                                      max: "20",
                                      ticks: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20],
                                      "show-ticks": "always",
                                      step: "2"
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                  ]),
                                  _: 1
                                }),
                                createVNode("div", { class: "mt-2" }, [
                                  createVNode(_component_v_btn, {
                                    onClick: withModifiers(saveTimeRange, ["prevent"])
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode("Update")
                                    ]),
                                    _: 1
                                  })
                                ])
                              ]),
                              _: 1
                            })
                          ])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(_sfc_main$2, { gap: "4" }, {
                    default: withCtx(() => [
                      createVNode(_sfc_main$2, null, {
                        default: withCtx(() => [
                          createVNode(_component_v_card, {
                            color: "grey-lighten-3",
                            rounded: "lg"
                          }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "p-4" }, [
                                createVNode(_sfc_main$2, null, {
                                  default: withCtx(() => [
                                    createVNode("p", { class: "text-xl" }, "Board script state"),
                                    createVNode(_component_v_switch, {
                                      inset: "",
                                      color: "green",
                                      modelValue: boardScriptForm.board_script_on,
                                      "onUpdate:modelValue": ($event) => boardScriptForm.board_script_on = $event
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                  ]),
                                  _: 1
                                }),
                                createVNode("div", { class: "mt-2" }, [
                                  createVNode(_component_v_btn, {
                                    onClick: withModifiers(saveBoardScript, ["prevent"])
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode("Update")
                                    ]),
                                    _: 1
                                  })
                                ])
                              ])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(_sfc_main$2, null, {
                        default: withCtx(() => [
                          createVNode(_component_v_card, {
                            color: "grey-lighten-3",
                            rounded: "lg"
                          }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "p-4" }, [
                                createVNode(_sfc_main$2, null, {
                                  default: withCtx(() => [
                                    createVNode("p", { class: "text-xl" }, "Footer opening times"),
                                    createVNode(_sfc_main$2, null, {
                                      default: withCtx(() => [
                                        createVNode(_component_v_label, null, {
                                          default: withCtx(() => [
                                            createTextVNode("Monday (leave empty if closed)")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode("p", { class: "text-xs" }, "Original value: empty"),
                                        createVNode(_component_v_text_field, {
                                          modelValue: openingTimesForm.monday_opening_times,
                                          "onUpdate:modelValue": ($event) => openingTimesForm.monday_opening_times = $event
                                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_sfc_main$2, null, {
                                      default: withCtx(() => [
                                        createVNode(_component_v_label, null, {
                                          default: withCtx(() => [
                                            createTextVNode("Tuesday (leave empty if closed)")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode("p", { class: "text-xs" }, "Original value: 8:00am - Sold out"),
                                        createVNode(_component_v_text_field, {
                                          modelValue: openingTimesForm.tuesday_opening_times,
                                          "onUpdate:modelValue": ($event) => openingTimesForm.tuesday_opening_times = $event
                                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_sfc_main$2, null, {
                                      default: withCtx(() => [
                                        createVNode(_component_v_label, null, {
                                          default: withCtx(() => [
                                            createTextVNode("Wednesday (leave empty if closed)")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode("p", { class: "text-xs" }, "Original value: 8:00am - Sold out"),
                                        createVNode(_component_v_text_field, {
                                          modelValue: openingTimesForm.wednesday_opening_times,
                                          "onUpdate:modelValue": ($event) => openingTimesForm.wednesday_opening_times = $event
                                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_sfc_main$2, null, {
                                      default: withCtx(() => [
                                        createVNode(_component_v_label, null, {
                                          default: withCtx(() => [
                                            createTextVNode("Thursday (leave empty if closed)")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode("p", { class: "text-xs" }, "Original value: 8:00am - Sold out"),
                                        createVNode(_component_v_text_field, {
                                          modelValue: openingTimesForm.thursday_opening_times,
                                          "onUpdate:modelValue": ($event) => openingTimesForm.thursday_opening_times = $event
                                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_sfc_main$2, null, {
                                      default: withCtx(() => [
                                        createVNode(_component_v_label, null, {
                                          default: withCtx(() => [
                                            createTextVNode("Friday (leave empty if closed)")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode("p", { class: "text-xs" }, "Original value: 8:00am - Sold out"),
                                        createVNode(_component_v_text_field, {
                                          modelValue: openingTimesForm.friday_opening_times,
                                          "onUpdate:modelValue": ($event) => openingTimesForm.friday_opening_times = $event
                                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_sfc_main$2, null, {
                                      default: withCtx(() => [
                                        createVNode(_component_v_label, null, {
                                          default: withCtx(() => [
                                            createTextVNode("Saturday (leave empty if closed)")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode("p", { class: "text-xs" }, "Original value: 8:30am - Sold out"),
                                        createVNode(_component_v_text_field, {
                                          modelValue: openingTimesForm.saturday_opening_times,
                                          "onUpdate:modelValue": ($event) => openingTimesForm.saturday_opening_times = $event
                                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_sfc_main$2, null, {
                                      default: withCtx(() => [
                                        createVNode(_component_v_label, null, {
                                          default: withCtx(() => [
                                            createTextVNode("Sunday (leave empty if closed)")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode("p", { class: "text-xs" }, "Original value: 8:30am - Sold out"),
                                        createVNode(_component_v_text_field, {
                                          modelValue: openingTimesForm.sunday_opening_times,
                                          "onUpdate:modelValue": ($event) => openingTimesForm.sunday_opening_times = $event
                                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode("div", { class: "mt-2" }, [
                                  createVNode(_component_v_btn, {
                                    onClick: withModifiers(saveOpeningTimes, ["prevent"])
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode("Update")
                                    ]),
                                    _: 1
                                  })
                                ])
                              ])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(_component_v_card, {
                        color: "grey-lighten-3",
                        rounded: "lg"
                      }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "p-4" }, [
                            createVNode(_sfc_main$2, null, {
                              default: withCtx(() => [
                                createVNode("p", { class: "text-xl" }, "Meta descriptions"),
                                createVNode("p", { class: "text-xs" }, "(recommended length: 150-160 characters)"),
                                createVNode(_sfc_main$2, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_v_label, null, {
                                      default: withCtx(() => [
                                        createTextVNode("Homepage"),
                                        metaTagsForm.meta_description_home ? (openBlock(), createBlock("span", { key: 0 }, " " + toDisplayString(metaTagsForm.meta_description_home.length) + "/300", 1)) : createCommentVNode("", true)
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_v_textarea, {
                                      rows: "2",
                                      "auto-grow": "",
                                      onKeydown: withKeys(withModifiers(() => {
                                      }, ["prevent"]), ["enter"]),
                                      modelValue: metaTagsForm.meta_description_home,
                                      "onUpdate:modelValue": ($event) => metaTagsForm.meta_description_home = $event,
                                      "error-messages": local_errors.value.meta_description_home
                                    }, null, 8, ["onKeydown", "modelValue", "onUpdate:modelValue", "error-messages"])
                                  ]),
                                  _: 1
                                }),
                                createVNode(_sfc_main$2, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_v_label, null, {
                                      default: withCtx(() => [
                                        createTextVNode("Boutique"),
                                        metaTagsForm.meta_description_boutique ? (openBlock(), createBlock("span", { key: 0 }, " " + toDisplayString(metaTagsForm.meta_description_boutique.length) + "/300", 1)) : createCommentVNode("", true)
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_v_textarea, {
                                      rows: "2",
                                      "auto-grow": "",
                                      onKeydown: withKeys(withModifiers(() => {
                                      }, ["prevent"]), ["enter"]),
                                      modelValue: metaTagsForm.meta_description_boutique,
                                      "onUpdate:modelValue": ($event) => metaTagsForm.meta_description_boutique = $event,
                                      "error-messages": local_errors.value.meta_description_boutique
                                    }, null, 8, ["onKeydown", "modelValue", "onUpdate:modelValue", "error-messages"])
                                  ]),
                                  _: 1
                                }),
                                createVNode(_sfc_main$2, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_v_label, null, {
                                      default: withCtx(() => [
                                        createTextVNode("Catering"),
                                        metaTagsForm.meta_description_catering ? (openBlock(), createBlock("span", { key: 0 }, " " + toDisplayString(metaTagsForm.meta_description_catering.length) + "/300", 1)) : createCommentVNode("", true)
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_v_textarea, {
                                      rows: "2",
                                      "auto-grow": "",
                                      onKeydown: withKeys(withModifiers(() => {
                                      }, ["prevent"]), ["enter"]),
                                      modelValue: metaTagsForm.meta_description_catering,
                                      "onUpdate:modelValue": ($event) => metaTagsForm.meta_description_catering = $event,
                                      "error-messages": local_errors.value.meta_description_catering
                                    }, null, 8, ["onKeydown", "modelValue", "onUpdate:modelValue", "error-messages"])
                                  ]),
                                  _: 1
                                }),
                                createVNode(_sfc_main$2, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_v_label, null, {
                                      default: withCtx(() => [
                                        createTextVNode("Contact"),
                                        metaTagsForm.meta_description_contact ? (openBlock(), createBlock("span", { key: 0 }, " " + toDisplayString(metaTagsForm.meta_description_contact.length) + "/300", 1)) : createCommentVNode("", true)
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_v_textarea, {
                                      rows: "2",
                                      "auto-grow": "",
                                      onKeydown: withKeys(withModifiers(() => {
                                      }, ["prevent"]), ["enter"]),
                                      modelValue: metaTagsForm.meta_description_contact,
                                      "onUpdate:modelValue": ($event) => metaTagsForm.meta_description_contact = $event,
                                      "error-messages": local_errors.value.meta_description_contact
                                    }, null, 8, ["onKeydown", "modelValue", "onUpdate:modelValue", "error-messages"])
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            createVNode("div", { class: "mt-2" }, [
                              createVNode(_component_v_btn, {
                                onClick: withModifiers(saveMetaTags, ["prevent"])
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("Update")
                                ]),
                                _: 1
                              })
                            ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Settings/Home.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
