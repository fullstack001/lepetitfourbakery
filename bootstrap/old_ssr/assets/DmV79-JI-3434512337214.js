import { ref, computed, onMounted, nextTick, resolveComponent, unref, withCtx, createTextVNode, createVNode, withModifiers, toDisplayString, openBlock, createBlock, createCommentVNode, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { A as AppLayout } from "./BT2Gi1aL-2117352433356.js";
import { Head, router } from "@inertiajs/vue3";
import { W as Wrapper } from "./CbcLIE-O-3135473238126.js";
import flatPickr from "vue-flatpickr-component";
import "flickity";
/* empty css                       */
import { _ as _sfc_main$1 } from "./BFeg_3wS-5313717233245.js";
import { _ as _sfc_main$2 } from "./CeVcRmCk-1453137522733.js";
import { _ as _export_sfc } from "./1tPrXgE0-1751246333532.js";
import "./BW6cC8iL-1754723312335.js";
import "./kZV6a-x4-2437327355113.js";
import "vuetify";
import "./DKEAH6nn-4333751172235.js";
import "mitt";
import "gsap";
import "gsap/ScrollTrigger.js";
import "gsap/ScrollSmoother.js";
import "./AK26aD-S-7313723521453.js";
import "./C6q4kDV--4257163313235.js";
import "./DsvTyKEu-3355343127127.js";
import "./Cyl_ukyB-3352317127354.js";
const _sfc_main = /* @__PURE__ */ Object.assign({ layout: AppLayout }, {
  __name: "Single",
  __ssrInlineRender: true,
  props: {
    order: Object,
    date: String,
    time: String,
    quick_days: Object,
    first_day_string: String,
    first_pickup_date: String,
    last_pickup_date: String,
    available_times: Object,
    closed_dates: Array,
    date_valid: Boolean,
    total_amount: String,
    full_name: { type: String, default: "" },
    email: { type: String, default: "" },
    phone: { type: String, default: "" },
    errors: Object
  },
  setup(__props) {
    const props = __props;
    const carousel = ref(null);
    const calendar = ref(null);
    ref([]);
    const selectedDate = ref("");
    const selectedTime = ref("");
    const showPickupModal = ref(false);
    const modalTitle = ref("");
    ref("");
    const isDragging = ref(false);
    const flickityInit = ref(true);
    const enteredName = ref("");
    const enteredEmail = ref("");
    const enteredPhone = ref("");
    const openCalendar = () => {
      if (showPickupModal.value && calendar.value) {
        nextTick(() => {
          calendar.value.open();
        });
      }
    };
    const flickityCarousel = ref(null);
    const timeslotsAvailable = ref(false);
    const timeslots = ref({});
    const getPickupTimes = () => {
      timeslotsAvailable.value = false;
      selectedTime.value = "";
      nextTick(() => {
        axios.post(route("get_pickup_times"), {
          date: selectedDate.value
        }).then((response) => {
          timeslots.value = { ...response.data.available_times };
          timeslotsAvailable.value = true;
        }).catch((error) => {
          console.error("error");
        });
      });
    };
    const selectDate = (date) => {
      if (!isDragging.value) {
        calendar.value.setDate(date.selection, true, "m/d/Y");
      }
      getPickupTimes();
    };
    const selectTime = (time) => {
      selectedTime.value = time;
    };
    const defineInstance = (instance) => {
      calendar.value = instance;
    };
    const closePickup = () => {
      carousel.value.style.opacity = 0;
      showPickupModal.value = false;
      console.log("close");
      setTimeout(() => {
        flickityCarousel.value.destroy();
        flickityInit.value = true;
      }, 200);
    };
    computed(() => {
      return selectedDate.value && selectedTime.value;
    });
    ref(false);
    const isTimeSlotAvailable = (time) => {
      return selectedDate.value && timeslotsAvailable.value && time.available;
    };
    const resetOrder = () => {
      router.post(route("order_reset", { order: props.order.uid }), {}, {
        preserveScroll: true,
        preserveState: true,
        onSuccess: (page) => {
          console.log("success");
        },
        onError: (error) => {
          console.error("error");
        }
      });
    };
    const cancelOrder = () => {
      router.post(route("order_cancel", { order: props.order.uid }), {}, {
        preserveScroll: true,
        preserveState: true,
        onSuccess: (page) => {
          console.log("success");
        },
        onError: (error) => {
          console.error("error");
        }
      });
    };
    const closedDates = ref([]);
    onMounted(() => {
      nextTick(() => {
        if (props.order.status === "initial") {
          if (props.date_valid) {
            timeslots.value = { ...props.available_times };
            closedDates.value = props.closed_dates;
            selectedDate.value = props.date;
            selectedTime.value = props.time;
            enteredName.value = props.full_name;
            enteredEmail.value = props.email;
            enteredPhone.value = props.phone;
          }
        }
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_v_btn = resolveComponent("v-btn");
      const _component_v_table = resolveComponent("v-table");
      const _component_v_img = resolveComponent("v-img");
      resolveComponent("v-label");
      resolveComponent("v-text-field");
      resolveComponent("v-tooltip");
      const _component_v_card = resolveComponent("v-card");
      const _component_v_card_item = resolveComponent("v-card-item");
      const _component_v_icon = resolveComponent("v-icon");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: `Order ${props.order.number}`
      }, null, _parent));
      _push(ssrRenderComponent(Wrapper, { style: { "margin-top": "150px" } }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex justify-center" data-v-fa103345${_scopeId}><div class="text-center" data-v-fa103345${_scopeId}><h1 class="text-6xl brand uppercase" data-v-fa103345${_scopeId}>Order</h1><div class="my-4" data-v-fa103345${_scopeId}>`);
            _push2(ssrRenderComponent(_component_v_btn, {
              onClick: ($event) => _ctx.$inertia.visit(_ctx.route("orders"))
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Close`);
                } else {
                  return [
                    createTextVNode("Close")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex justify-center" }, [
                createVNode("div", { class: "text-center" }, [
                  createVNode("h1", { class: "text-6xl brand uppercase" }, "Order"),
                  createVNode("div", { class: "my-4" }, [
                    createVNode(_component_v_btn, {
                      onClick: withModifiers(($event) => _ctx.$inertia.visit(_ctx.route("orders")), ["prevent"])
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Close")
                      ]),
                      _: 1
                    }, 8, ["onClick"])
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(Wrapper, { wrapper: "row" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div data-v-fa103345${_scopeId}>`);
            _push2(ssrRenderComponent(_component_v_table, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<tbody data-v-fa103345${_scopeId2}><tr data-v-fa103345${_scopeId2}><td data-v-fa103345${_scopeId2}>Number</td><td class="uppercase" data-v-fa103345${_scopeId2}>${ssrInterpolate(props.order.initial)}${ssrInterpolate(props.order.number)}</td></tr><tr data-v-fa103345${_scopeId2}><td data-v-fa103345${_scopeId2}>Amount</td><td class="uppercase" data-v-fa103345${_scopeId2}>$${ssrInterpolate(props.order.amount)}</td></tr><tr data-v-fa103345${_scopeId2}><td data-v-fa103345${_scopeId2}>Type</td><td class="uppercase" data-v-fa103345${_scopeId2}>${ssrInterpolate(props.order.type)}</td></tr><tr data-v-fa103345${_scopeId2}><td data-v-fa103345${_scopeId2}>Status</td><td class="uppercase" data-v-fa103345${_scopeId2}>${ssrInterpolate(props.order.status)}</td></tr>`);
                  if (props.order.type === "catering") {
                    _push3(`<tr data-v-fa103345${_scopeId2}><td data-v-fa103345${_scopeId2}>Date &amp; time</td><td class="uppercase" data-v-fa103345${_scopeId2}><div class="flex flex-row items-center gap-3" data-v-fa103345${_scopeId2}><div data-v-fa103345${_scopeId2}>`);
                    if (props.order.status === "initial") {
                      _push3(`<div data-v-fa103345${_scopeId2}>`);
                      if (selectedDate.value && selectedTime.value) {
                        _push3(`<p class="text-black font-bold" data-v-fa103345${_scopeId2}>${ssrInterpolate(selectedDate.value)} at ${ssrInterpolate(selectedTime.value)}</p>`);
                      } else if (selectedDate.value) {
                        _push3(`<p data-v-fa103345${_scopeId2}><strong data-v-fa103345${_scopeId2}>${ssrInterpolate(selectedDate.value)}</strong> <span class="text-red" data-v-fa103345${_scopeId2}>(time not set)</span></p>`);
                      } else if (selectedTime.value) {
                        _push3(`<p data-v-fa103345${_scopeId2}><strong data-v-fa103345${_scopeId2}>${ssrInterpolate(selectedTime.value)}</strong> <span class="text-red" data-v-fa103345${_scopeId2}>(date not set)</span></p>`);
                      } else {
                        _push3(`<p class="text-red" data-v-fa103345${_scopeId2}>Not set</p>`);
                      }
                      _push3(`</div>`);
                    } else {
                      _push3(`<div class="text-black font-bold" data-v-fa103345${_scopeId2}>${ssrInterpolate(props.date)} at ${ssrInterpolate(props.time)}</div>`);
                    }
                    _push3(`</div>`);
                    if (props.order.status === "initial") {
                      _push3(`<div class="flex flex-row flex-wrap gap-3" data-v-fa103345${_scopeId2}>`);
                      _push3(ssrRenderComponent(_component_v_btn, {
                        color: "amber",
                        onClick: resetOrder
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`Reset order`);
                          } else {
                            return [
                              createTextVNode("Reset order")
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                      _push3(ssrRenderComponent(_component_v_btn, {
                        variant: "outlined",
                        color: "red",
                        onClick: cancelOrder
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`Cancel order`);
                          } else {
                            return [
                              createTextVNode("Cancel order")
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                      _push3(`</div>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`</div></td></tr>`);
                  } else {
                    _push3(`<tr data-v-fa103345${_scopeId2}><td data-v-fa103345${_scopeId2}>Delivery</td><td data-v-fa103345${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_v_btn, {
                      variant: "outlined",
                      color: "red",
                      onClick: cancelOrder
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Cancel order`);
                        } else {
                          return [
                            createTextVNode("Cancel order")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`</td></tr>`);
                  }
                  _push3(`</tbody>`);
                } else {
                  return [
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, "Number"),
                        createVNode("td", { class: "uppercase" }, toDisplayString(props.order.initial) + toDisplayString(props.order.number), 1)
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, "Amount"),
                        createVNode("td", { class: "uppercase" }, "$" + toDisplayString(props.order.amount), 1)
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, "Type"),
                        createVNode("td", { class: "uppercase" }, toDisplayString(props.order.type), 1)
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, "Status"),
                        createVNode("td", { class: "uppercase" }, toDisplayString(props.order.status), 1)
                      ]),
                      props.order.type === "catering" ? (openBlock(), createBlock("tr", { key: 0 }, [
                        createVNode("td", null, "Date & time"),
                        createVNode("td", { class: "uppercase" }, [
                          createVNode("div", { class: "flex flex-row items-center gap-3" }, [
                            createVNode("div", null, [
                              props.order.status === "initial" ? (openBlock(), createBlock("div", { key: 0 }, [
                                selectedDate.value && selectedTime.value ? (openBlock(), createBlock("p", {
                                  key: 0,
                                  class: "text-black font-bold"
                                }, toDisplayString(selectedDate.value) + " at " + toDisplayString(selectedTime.value), 1)) : selectedDate.value ? (openBlock(), createBlock("p", { key: 1 }, [
                                  createVNode("strong", null, toDisplayString(selectedDate.value), 1),
                                  createTextVNode(),
                                  createVNode("span", { class: "text-red" }, "(time not set)")
                                ])) : selectedTime.value ? (openBlock(), createBlock("p", { key: 2 }, [
                                  createVNode("strong", null, toDisplayString(selectedTime.value), 1),
                                  createTextVNode(),
                                  createVNode("span", { class: "text-red" }, "(date not set)")
                                ])) : (openBlock(), createBlock("p", {
                                  key: 3,
                                  class: "text-red"
                                }, "Not set"))
                              ])) : (openBlock(), createBlock("div", {
                                key: 1,
                                class: "text-black font-bold"
                              }, toDisplayString(props.date) + " at " + toDisplayString(props.time), 1))
                            ]),
                            props.order.status === "initial" ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "flex flex-row flex-wrap gap-3"
                            }, [
                              createVNode(_component_v_btn, {
                                color: "amber",
                                onClick: withModifiers(resetOrder, ["prevent"])
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("Reset order")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_v_btn, {
                                variant: "outlined",
                                color: "red",
                                onClick: withModifiers(cancelOrder, ["prevent"])
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("Cancel order")
                                ]),
                                _: 1
                              })
                            ])) : createCommentVNode("", true)
                          ])
                        ])
                      ])) : (openBlock(), createBlock("tr", { key: 1 }, [
                        createVNode("td", null, "Delivery"),
                        createVNode("td", null, [
                          createVNode(_component_v_btn, {
                            variant: "outlined",
                            color: "red",
                            onClick: withModifiers(cancelOrder, ["prevent"])
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Cancel order")
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
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", null, [
                createVNode(_component_v_table, null, {
                  default: withCtx(() => [
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, "Number"),
                        createVNode("td", { class: "uppercase" }, toDisplayString(props.order.initial) + toDisplayString(props.order.number), 1)
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, "Amount"),
                        createVNode("td", { class: "uppercase" }, "$" + toDisplayString(props.order.amount), 1)
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, "Type"),
                        createVNode("td", { class: "uppercase" }, toDisplayString(props.order.type), 1)
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, "Status"),
                        createVNode("td", { class: "uppercase" }, toDisplayString(props.order.status), 1)
                      ]),
                      props.order.type === "catering" ? (openBlock(), createBlock("tr", { key: 0 }, [
                        createVNode("td", null, "Date & time"),
                        createVNode("td", { class: "uppercase" }, [
                          createVNode("div", { class: "flex flex-row items-center gap-3" }, [
                            createVNode("div", null, [
                              props.order.status === "initial" ? (openBlock(), createBlock("div", { key: 0 }, [
                                selectedDate.value && selectedTime.value ? (openBlock(), createBlock("p", {
                                  key: 0,
                                  class: "text-black font-bold"
                                }, toDisplayString(selectedDate.value) + " at " + toDisplayString(selectedTime.value), 1)) : selectedDate.value ? (openBlock(), createBlock("p", { key: 1 }, [
                                  createVNode("strong", null, toDisplayString(selectedDate.value), 1),
                                  createTextVNode(),
                                  createVNode("span", { class: "text-red" }, "(time not set)")
                                ])) : selectedTime.value ? (openBlock(), createBlock("p", { key: 2 }, [
                                  createVNode("strong", null, toDisplayString(selectedTime.value), 1),
                                  createTextVNode(),
                                  createVNode("span", { class: "text-red" }, "(date not set)")
                                ])) : (openBlock(), createBlock("p", {
                                  key: 3,
                                  class: "text-red"
                                }, "Not set"))
                              ])) : (openBlock(), createBlock("div", {
                                key: 1,
                                class: "text-black font-bold"
                              }, toDisplayString(props.date) + " at " + toDisplayString(props.time), 1))
                            ]),
                            props.order.status === "initial" ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "flex flex-row flex-wrap gap-3"
                            }, [
                              createVNode(_component_v_btn, {
                                color: "amber",
                                onClick: withModifiers(resetOrder, ["prevent"])
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("Reset order")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_v_btn, {
                                variant: "outlined",
                                color: "red",
                                onClick: withModifiers(cancelOrder, ["prevent"])
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("Cancel order")
                                ]),
                                _: 1
                              })
                            ])) : createCommentVNode("", true)
                          ])
                        ])
                      ])) : (openBlock(), createBlock("tr", { key: 1 }, [
                        createVNode("td", null, "Delivery"),
                        createVNode("td", null, [
                          createVNode(_component_v_btn, {
                            variant: "outlined",
                            color: "red",
                            onClick: withModifiers(cancelOrder, ["prevent"])
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Cancel order")
                            ]),
                            _: 1
                          })
                        ])
                      ]))
                    ])
                  ]),
                  _: 1
                })
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(Wrapper, { wrapper: "row" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div data-v-fa103345${_scopeId}>`);
            _push2(ssrRenderComponent(_component_v_table, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<tbody data-v-fa103345${_scopeId2}><!--[-->`);
                  ssrRenderList(props.order.items, (item) => {
                    _push3(`<tr data-v-fa103345${_scopeId2}><td data-v-fa103345${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_v_img, {
                      src: item.thumbnail
                    }, null, _parent3, _scopeId2));
                    _push3(`</td><td class="uppercase" data-v-fa103345${_scopeId2}>${ssrInterpolate(item.product_name)}</td><td class="uppercase" data-v-fa103345${_scopeId2}>${ssrInterpolate(item.variation_name)}</td><td class="uppercase" data-v-fa103345${_scopeId2}>$${ssrInterpolate(item.variation_price)}</td><td class="uppercase" data-v-fa103345${_scopeId2}>${ssrInterpolate(item.quantity)}</td><td class="uppercase" data-v-fa103345${_scopeId2}>$${ssrInterpolate(item.amount)}</td></tr>`);
                  });
                  _push3(`<!--]--></tbody>`);
                } else {
                  return [
                    createVNode("tbody", null, [
                      (openBlock(true), createBlock(Fragment, null, renderList(props.order.items, (item) => {
                        return openBlock(), createBlock("tr", null, [
                          createVNode("td", null, [
                            createVNode(_component_v_img, {
                              src: item.thumbnail
                            }, null, 8, ["src"])
                          ]),
                          createVNode("td", { class: "uppercase" }, toDisplayString(item.product_name), 1),
                          createVNode("td", { class: "uppercase" }, toDisplayString(item.variation_name), 1),
                          createVNode("td", { class: "uppercase" }, "$" + toDisplayString(item.variation_price), 1),
                          createVNode("td", { class: "uppercase" }, toDisplayString(item.quantity), 1),
                          createVNode("td", { class: "uppercase" }, "$" + toDisplayString(item.amount), 1)
                        ]);
                      }), 256))
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", null, [
                createVNode(_component_v_table, null, {
                  default: withCtx(() => [
                    createVNode("tbody", null, [
                      (openBlock(true), createBlock(Fragment, null, renderList(props.order.items, (item) => {
                        return openBlock(), createBlock("tr", null, [
                          createVNode("td", null, [
                            createVNode(_component_v_img, {
                              src: item.thumbnail
                            }, null, 8, ["src"])
                          ]),
                          createVNode("td", { class: "uppercase" }, toDisplayString(item.product_name), 1),
                          createVNode("td", { class: "uppercase" }, toDisplayString(item.variation_name), 1),
                          createVNode("td", { class: "uppercase" }, "$" + toDisplayString(item.variation_price), 1),
                          createVNode("td", { class: "uppercase" }, toDisplayString(item.quantity), 1),
                          createVNode("td", { class: "uppercase" }, "$" + toDisplayString(item.amount), 1)
                        ]);
                      }), 256))
                    ])
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
      _push(ssrRenderComponent(_sfc_main$1, {
        show: showPickupModal.value,
        onClose: closePickup
      }, {
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
            _push2(`<div class="text-center" data-v-fa103345${_scopeId}><p class="text-lg font-bold text-black" data-v-fa103345${_scopeId}>Pick a date</p></div><div class="carousel w-full mb-3" data-v-fa103345${_scopeId}><!--[-->`);
            ssrRenderList(props.quick_days, (quick_day) => {
              _push2(`<div class="carousel-cell m-1" data-v-fa103345${_scopeId}><div class="p-1 h-full" data-v-fa103345${_scopeId}>`);
              _push2(ssrRenderComponent(_component_v_card, {
                onClick: ($event) => selectDate(quick_day),
                elevation: "3",
                class: "h-full",
                color: selectedDate.value === quick_day.selection ? "#000000" : "#f99c19"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_v_card_item, { class: "h-full" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<div class="flex flex-col items-center h-full" data-v-fa103345${_scopeId3}><div class="font-normal" data-v-fa103345${_scopeId3}><p class="text-lg" data-v-fa103345${_scopeId3}>${ssrInterpolate(quick_day.day)}</p><p class="text-md" data-v-fa103345${_scopeId3}>${ssrInterpolate(quick_day.date)}</p></div></div>`);
                        } else {
                          return [
                            createVNode("div", { class: "flex flex-col items-center h-full" }, [
                              createVNode("div", { class: "font-normal" }, [
                                createVNode("p", { class: "text-lg" }, toDisplayString(quick_day.day), 1),
                                createVNode("p", { class: "text-md" }, toDisplayString(quick_day.date), 1)
                              ])
                            ])
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_v_card_item, { class: "h-full" }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "flex flex-col items-center h-full" }, [
                            createVNode("div", { class: "font-normal" }, [
                              createVNode("p", { class: "text-lg" }, toDisplayString(quick_day.day), 1),
                              createVNode("p", { class: "text-md" }, toDisplayString(quick_day.date), 1)
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
              _push2(`</div></div>`);
            });
            _push2(`<!--]--><div class="carousel-cell m-1" data-v-fa103345${_scopeId}><div class="p-1 h-full" data-v-fa103345${_scopeId}>`);
            _push2(ssrRenderComponent(_component_v_card, {
              onClick: openCalendar,
              elevation: "3",
              class: "h-full",
              color: "#f99c19"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_v_card_item, { class: "h-full" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="flex flex-col items-center h-full" data-v-fa103345${_scopeId3}><div data-v-fa103345${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_v_icon, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`mdi-calendar`);
                            } else {
                              return [
                                createTextVNode("mdi-calendar")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</div></div>`);
                      } else {
                        return [
                          createVNode("div", { class: "flex flex-col items-center h-full" }, [
                            createVNode("div", null, [
                              createVNode(_component_v_icon, null, {
                                default: withCtx(() => [
                                  createTextVNode("mdi-calendar")
                                ]),
                                _: 1
                              })
                            ])
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_v_card_item, { class: "h-full" }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "flex flex-col items-center h-full" }, [
                          createVNode("div", null, [
                            createVNode(_component_v_icon, null, {
                              default: withCtx(() => [
                                createTextVNode("mdi-calendar")
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
            }, _parent2, _scopeId));
            _push2(`</div></div></div><div class="px-1" data-v-fa103345${_scopeId}>`);
            _push2(ssrRenderComponent(unref(flatPickr), {
              ref: "datepicker",
              modelValue: selectedDate.value,
              "onUpdate:modelValue": ($event) => selectedDate.value = $event,
              placeholder: "No date selected",
              config: {
                dateFormat: "m/d/Y",
                minDate: props.first_pickup_date,
                maxDate: props.last_pickup_date,
                disable: closedDates.value,
                onReady: (selectedDates, dateStr, instance) => {
                  defineInstance(instance);
                },
                onValueUpdate: (selectedDates, dateStr, instance) => {
                  defineInstance(instance);
                },
                onClose: (selectedDates, dateStr, instance) => {
                  getPickupTimes();
                  defineInstance(instance);
                }
              },
              class: "main-input rounded-md"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="mt-10 mb-3 text-center" data-v-fa103345${_scopeId}><p class="text-lg font-bold text-black" data-v-fa103345${_scopeId}>Pick a time</p></div><div class="flex flex-row justify-center mb-5" data-v-fa103345${_scopeId}><div class="grid grid-cols-4 gap-3" data-v-fa103345${_scopeId}><!--[-->`);
            ssrRenderList(timeslots.value, (time) => {
              _push2(`<div data-v-fa103345${_scopeId}>`);
              _push2(ssrRenderComponent(_component_v_btn, {
                disabled: !isTimeSlotAvailable(time),
                class: `${isTimeSlotAvailable(time) ? "opacity-100" : "opacity-40"}`,
                onClick: ($event) => selectTime(time.displayed_time),
                color: isTimeSlotAvailable(time) ? selectedTime.value === time.displayed_time ? "#000000" : "#f99c19" : "#ffffff"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(time.displayed_time)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(time.displayed_time), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`</div>`);
            });
            _push2(`<!--]--></div></div>`);
          } else {
            return [
              createVNode("div", { class: "text-center" }, [
                createVNode("p", { class: "text-lg font-bold text-black" }, "Pick a date")
              ]),
              createVNode("div", {
                ref_key: "carousel",
                ref: carousel,
                class: "carousel w-full mb-3"
              }, [
                (openBlock(true), createBlock(Fragment, null, renderList(props.quick_days, (quick_day) => {
                  return openBlock(), createBlock("div", { class: "carousel-cell m-1" }, [
                    createVNode("div", { class: "p-1 h-full" }, [
                      createVNode(_component_v_card, {
                        onClick: withModifiers(($event) => selectDate(quick_day), ["prevent"]),
                        elevation: "3",
                        class: "h-full",
                        color: selectedDate.value === quick_day.selection ? "#000000" : "#f99c19"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_v_card_item, { class: "h-full" }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "flex flex-col items-center h-full" }, [
                                createVNode("div", { class: "font-normal" }, [
                                  createVNode("p", { class: "text-lg" }, toDisplayString(quick_day.day), 1),
                                  createVNode("p", { class: "text-md" }, toDisplayString(quick_day.date), 1)
                                ])
                              ])
                            ]),
                            _: 2
                          }, 1024)
                        ]),
                        _: 2
                      }, 1032, ["onClick", "color"])
                    ])
                  ]);
                }), 256)),
                createVNode("div", { class: "carousel-cell m-1" }, [
                  createVNode("div", { class: "p-1 h-full" }, [
                    createVNode(_component_v_card, {
                      onClick: withModifiers(openCalendar, ["prevent"]),
                      elevation: "3",
                      class: "h-full",
                      color: "#f99c19"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_v_card_item, { class: "h-full" }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "flex flex-col items-center h-full" }, [
                              createVNode("div", null, [
                                createVNode(_component_v_icon, null, {
                                  default: withCtx(() => [
                                    createTextVNode("mdi-calendar")
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
                  ])
                ])
              ], 512),
              createVNode("div", { class: "px-1" }, [
                createVNode(unref(flatPickr), {
                  ref: "datepicker",
                  modelValue: selectedDate.value,
                  "onUpdate:modelValue": ($event) => selectedDate.value = $event,
                  placeholder: "No date selected",
                  config: {
                    dateFormat: "m/d/Y",
                    minDate: props.first_pickup_date,
                    maxDate: props.last_pickup_date,
                    disable: closedDates.value,
                    onReady: (selectedDates, dateStr, instance) => {
                      defineInstance(instance);
                    },
                    onValueUpdate: (selectedDates, dateStr, instance) => {
                      defineInstance(instance);
                    },
                    onClose: (selectedDates, dateStr, instance) => {
                      getPickupTimes();
                      defineInstance(instance);
                    }
                  },
                  class: "main-input rounded-md"
                }, null, 8, ["modelValue", "onUpdate:modelValue", "config"])
              ]),
              createVNode("div", { class: "mt-10 mb-3 text-center" }, [
                createVNode("p", { class: "text-lg font-bold text-black" }, "Pick a time")
              ]),
              createVNode("div", { class: "flex flex-row justify-center mb-5" }, [
                createVNode("div", { class: "grid grid-cols-4 gap-3" }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(timeslots.value, (time) => {
                    return openBlock(), createBlock("div", null, [
                      createVNode(_component_v_btn, {
                        disabled: !isTimeSlotAvailable(time),
                        class: `${isTimeSlotAvailable(time) ? "opacity-100" : "opacity-40"}`,
                        onClick: withModifiers(($event) => selectTime(time.displayed_time), ["prevent"]),
                        color: isTimeSlotAvailable(time) ? selectedTime.value === time.displayed_time ? "#000000" : "#f99c19" : "#ffffff"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(time.displayed_time), 1)
                        ]),
                        _: 2
                      }, 1032, ["disabled", "class", "onClick", "color"])
                    ]);
                  }), 256))
                ])
              ])
            ];
          }
        }),
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$2, { onClick: closePickup }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Close`);
                } else {
                  return [
                    createTextVNode("Close")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$2, { onClick: closePickup }, {
                default: withCtx(() => [
                  createTextVNode("Close")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Orders/Single.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Single = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-fa103345"]]);
export {
  Single as default
};
