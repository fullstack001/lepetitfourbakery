import { ref, resolveComponent, mergeProps, withCtx, createTextVNode, toDisplayString, createVNode, openBlock, createBlock, createCommentVNode, withModifiers, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { T as TeamLayout } from "./SpnW4ICj-2487091673710.js";
import { router } from "@inertiajs/vue3";
import { _ as _sfc_main$3 } from "./koZmu1d6-1739686778130.js";
import { a as _sfc_main$2, _ as _sfc_main$5 } from "./Cyl_ukyB-5873697610160.js";
import { _ as _sfc_main$4 } from "./D2KjorHx-1875739460561.js";
import { _ as _sfc_main$6 } from "./DsvTyKEu-3067955167518.js";
import { _ as _sfc_main$7 } from "./CeVcRmCk-1577655618930.js";
import { _ as _sfc_main$1 } from "./CbZ9NF89-6736177896019.js";
import { _ as _export_sfc } from "./1tPrXgE0-4581736670159.js";
import "./BW6cC8iL-1677159380657.js";
import "./kZV6a-x4-6055183876791.js";
import "./BQTBzxda-1835617976051.js";
import "vuetify";
import "./DKEAH6nn-8515365770691.js";
import "mitt";
import "gsap";
import "gsap/ScrollTrigger.js";
import "gsap/ScrollSmoother.js";
import "./BPBs_0V9-9736651018597.js";
import "./C6q4kDV--1536774619085.js";
const _sfc_main = {
  __name: "Home",
  __ssrInlineRender: true,
  props: {
    orders: Object,
    paid_count: Number,
    ready_count: Number,
    completed_count: Number,
    canceled_count: Number,
    errors: Object
  },
  setup(__props) {
    const props = __props;
    const showOrderModal = ref(false);
    const selectedOrder = ref(null);
    const modalTitle = ref(null);
    const saveButtonText = ref(null);
    const canOpen = ref(true);
    const openOrder = (order = null) => {
      if (order && canOpen.value) {
        modalTitle.value = "View order";
        selectedOrder.value = order;
        currentStatus.value = order.status;
      } else {
        return 0;
      }
      canOpen.value = false;
      saveButtonText.value = "Update order";
      editOrderNotes.value = false;
      showOrderModal.value = true;
    };
    const closeOrder = () => {
      showOrderModal.value = false;
      setTimeout(() => {
        selectedOrder.value = null;
        canOpen.value = true;
      }, 500);
    };
    const updateOrder = () => {
      let url;
      if (selectedOrder.value) {
        url = route("team.update_order_status", { order: selectedOrder.value.uid });
      } else {
        return 0;
      }
      router.post(url, {
        status: currentStatus.value
      }, {
        preserveScroll: true,
        preserveState: true,
        onSuccess: (page) => {
          closeOrder();
        },
        onError: (error) => {
          console.log(error);
        }
      });
    };
    const statuses = ref(["paid", "ready", "completed"]);
    const currentStatus = ref(null);
    const editOrderNotes = ref(false);
    const orderNotes = ref("");
    const toggleEditOrderNotes = () => {
      orderNotes.value = selectedOrder.value.notes;
      editOrderNotes.value = !editOrderNotes.value;
    };
    const local_errors = ref({});
    const updateOrderNotes = () => {
      local_errors.value = {};
      router.post(route("admin.update_order_notes", { order: selectedOrder.value.uid }), {
        notes: orderNotes.value
      }, {
        preserveScroll: true,
        preserveState: true,
        onSuccess: (page) => {
          console.log(props.orders);
          selectedOrder.value = props.orders.data.find((o) => o.uid === selectedOrder.value.uid);
          editOrderNotes.value = false;
        },
        onError: (error) => {
          local_errors.value = props.errors;
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_v_btn = resolveComponent("v-btn");
      const _component_v_card = resolveComponent("v-card");
      const _component_v_card_item = resolveComponent("v-card-item");
      const _component_v_icon = resolveComponent("v-icon");
      const _component_v_textarea = resolveComponent("v-textarea");
      const _component_v_img = resolveComponent("v-img");
      const _component_v_radio_group = resolveComponent("v-radio-group");
      const _component_v_radio = resolveComponent("v-radio");
      _push(ssrRenderComponent(TeamLayout, mergeProps({ title: "Orders" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex flex-row flex-wrap gap-3 mb-5" data-v-dad6822f${_scopeId}>`);
            _push2(ssrRenderComponent(_component_v_btn, {
              onClick: ($event) => _ctx.$inertia.visit(_ctx.route("team.orders"))
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Paid orders ${ssrInterpolate(`(${props.paid_count})`)}`);
                } else {
                  return [
                    createTextVNode(" Paid orders " + toDisplayString(`(${props.paid_count})`), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_v_btn, {
              onClick: ($event) => _ctx.$inertia.visit(_ctx.route("team.orders_ready"))
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Ready orders ${ssrInterpolate(`(${props.ready_count})`)}`);
                } else {
                  return [
                    createTextVNode(" Ready orders " + toDisplayString(`(${props.ready_count})`), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_v_btn, {
              onClick: ($event) => _ctx.$inertia.visit(_ctx.route("team.orders_completed"))
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Completed orders ${ssrInterpolate(`(${props.completed_count})`)}`);
                } else {
                  return [
                    createTextVNode(" Completed orders " + toDisplayString(`(${props.completed_count})`), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_v_btn, {
              onClick: ($event) => _ctx.$inertia.visit(_ctx.route("team.orders_canceled"))
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Canceled orders ${ssrInterpolate(`(${props.canceled_count})`)}`);
                } else {
                  return [
                    createTextVNode(" Canceled orders " + toDisplayString(`(${props.canceled_count})`), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
            if (props.orders.data.length > 0) {
              _push2(`<div class="flex flex-col gap-7 md:gap-3 text-sm" data-v-dad6822f${_scopeId}><!--[-->`);
              ssrRenderList(props.orders.data, (order) => {
                _push2(ssrRenderComponent(_component_v_card, null, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_component_v_card_item, null, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(_sfc_main$1, {
                              cols: "2",
                              md: "2",
                              lg: "5",
                              xl: "5",
                              "2xl": "5",
                              gap: "2"
                            }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`<div class="flex flex-col justify-center bg-grey-lighten-3 p-2 col-span-2 lg:col-span-1" data-v-dad6822f${_scopeId4}><div data-v-dad6822f${_scopeId4}><strong data-v-dad6822f${_scopeId4}>${ssrInterpolate(order.initial)}${ssrInterpolate(order.number)} </strong><span class="text-blue" data-v-dad6822f${_scopeId4}>(${ssrInterpolate(order.type)})</span></div><p data-v-dad6822f${_scopeId4}><span data-v-dad6822f${_scopeId4}>${ssrInterpolate(order.full_name ?? "No name")}</span>`);
                                  if (order.user_id) {
                                    _push5(`<span data-v-dad6822f${_scopeId4}> (${ssrInterpolate(order.user.name)})</span>`);
                                  } else {
                                    _push5(`<span data-v-dad6822f${_scopeId4}> (guest)</span>`);
                                  }
                                  _push5(`</p><div class="flex flex-row flex-wrap items-center gap-0" data-v-dad6822f${_scopeId4}><p data-v-dad6822f${_scopeId4}>${ssrInterpolate(order.email ?? "no email")}</p>`);
                                  if (order.phone) {
                                    _push5(ssrRenderComponent(_component_v_icon, null, {
                                      default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                        if (_push6) {
                                          _push6(`mdi-circle-small`);
                                        } else {
                                          return [
                                            createTextVNode("mdi-circle-small")
                                          ];
                                        }
                                      }),
                                      _: 2
                                    }, _parent5, _scopeId4));
                                  } else {
                                    _push5(`<!---->`);
                                  }
                                  if (order.phone) {
                                    _push5(`<p data-v-dad6822f${_scopeId4}>${ssrInterpolate(order.phone)}</p>`);
                                  } else {
                                    _push5(`<!---->`);
                                  }
                                  _push5(`</div></div><div class="flex flex-col justify-center bg-grey-lighten-3 p-2" data-v-dad6822f${_scopeId4}><p class="font-bold" data-v-dad6822f${_scopeId4}>Amount</p> $${ssrInterpolate(order.amount)}</div><div class="flex flex-col justify-center bg-grey-lighten-3 p-2" data-v-dad6822f${_scopeId4}>`);
                                  _push5(ssrRenderComponent(_sfc_main$2, {
                                    center: true,
                                    justify: "start"
                                  }, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`<p class="font-bold" data-v-dad6822f${_scopeId5}>${ssrInterpolate(order.type === "catering" ? "Pickup" : "Delivery")}</p>`);
                                        if (order.notes) {
                                          _push6(ssrRenderComponent(_component_v_icon, null, {
                                            default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                              if (_push7) {
                                                _push7(`mdi-pencil-circle`);
                                              } else {
                                                return [
                                                  createTextVNode("mdi-pencil-circle")
                                                ];
                                              }
                                            }),
                                            _: 2
                                          }, _parent6, _scopeId5));
                                        } else {
                                          _push6(`<!---->`);
                                        }
                                      } else {
                                        return [
                                          createVNode("p", { class: "font-bold" }, toDisplayString(order.type === "catering" ? "Pickup" : "Delivery"), 1),
                                          order.notes ? (openBlock(), createBlock(_component_v_icon, { key: 0 }, {
                                            default: withCtx(() => [
                                              createTextVNode("mdi-pencil-circle")
                                            ]),
                                            _: 1
                                          })) : createCommentVNode("", true)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                  _push5(` ${ssrInterpolate(order.datetime_formatted)}</div><div class="flex flex-col justify-center bg-grey-lighten-3 p-2" data-v-dad6822f${_scopeId4}><p class="font-bold" data-v-dad6822f${_scopeId4}>Items</p><div data-v-dad6822f${_scopeId4}>`);
                                  _push5(ssrRenderComponent(_component_v_btn, {
                                    onClick: ($event) => openOrder(order),
                                    size: "small"
                                  }, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`${ssrInterpolate(order.total_quantity)}`);
                                      } else {
                                        return [
                                          createTextVNode(toDisplayString(order.total_quantity), 1)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                  _push5(`</div></div><div class="uppercase flex flex-col justify-center bg-grey-lighten-3 p-2" data-v-dad6822f${_scopeId4}><p class="font-bold" data-v-dad6822f${_scopeId4}>Status</p> ${ssrInterpolate(order.status)} `);
                                  if (order.source === "custom") {
                                    _push5(`<!--[--> (custom) <!--]-->`);
                                  } else {
                                    _push5(`<!---->`);
                                  }
                                  _push5(`</div>`);
                                } else {
                                  return [
                                    createVNode("div", { class: "flex flex-col justify-center bg-grey-lighten-3 p-2 col-span-2 lg:col-span-1" }, [
                                      createVNode("div", null, [
                                        createVNode("strong", null, toDisplayString(order.initial) + toDisplayString(order.number) + " ", 1),
                                        createVNode("span", { class: "text-blue" }, "(" + toDisplayString(order.type) + ")", 1)
                                      ]),
                                      createVNode("p", null, [
                                        createVNode("span", null, toDisplayString(order.full_name ?? "No name"), 1),
                                        order.user_id ? (openBlock(), createBlock("span", { key: 0 }, " (" + toDisplayString(order.user.name) + ")", 1)) : (openBlock(), createBlock("span", { key: 1 }, " (guest)"))
                                      ]),
                                      createVNode("div", { class: "flex flex-row flex-wrap items-center gap-0" }, [
                                        createVNode("p", null, toDisplayString(order.email ?? "no email"), 1),
                                        order.phone ? (openBlock(), createBlock(_component_v_icon, { key: 0 }, {
                                          default: withCtx(() => [
                                            createTextVNode("mdi-circle-small")
                                          ]),
                                          _: 1
                                        })) : createCommentVNode("", true),
                                        order.phone ? (openBlock(), createBlock("p", { key: 1 }, toDisplayString(order.phone), 1)) : createCommentVNode("", true)
                                      ])
                                    ]),
                                    createVNode("div", { class: "flex flex-col justify-center bg-grey-lighten-3 p-2" }, [
                                      createVNode("p", { class: "font-bold" }, "Amount"),
                                      createTextVNode(" $" + toDisplayString(order.amount), 1)
                                    ]),
                                    createVNode("div", { class: "flex flex-col justify-center bg-grey-lighten-3 p-2" }, [
                                      createVNode(_sfc_main$2, {
                                        center: true,
                                        justify: "start"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode("p", { class: "font-bold" }, toDisplayString(order.type === "catering" ? "Pickup" : "Delivery"), 1),
                                          order.notes ? (openBlock(), createBlock(_component_v_icon, { key: 0 }, {
                                            default: withCtx(() => [
                                              createTextVNode("mdi-pencil-circle")
                                            ]),
                                            _: 1
                                          })) : createCommentVNode("", true)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createTextVNode(" " + toDisplayString(order.datetime_formatted), 1)
                                    ]),
                                    createVNode("div", { class: "flex flex-col justify-center bg-grey-lighten-3 p-2" }, [
                                      createVNode("p", { class: "font-bold" }, "Items"),
                                      createVNode("div", null, [
                                        createVNode(_component_v_btn, {
                                          onClick: withModifiers(($event) => openOrder(order), ["prevent"]),
                                          size: "small"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(order.total_quantity), 1)
                                          ]),
                                          _: 2
                                        }, 1032, ["onClick"])
                                      ])
                                    ]),
                                    createVNode("div", { class: "uppercase flex flex-col justify-center bg-grey-lighten-3 p-2" }, [
                                      createVNode("p", { class: "font-bold" }, "Status"),
                                      createTextVNode(" " + toDisplayString(order.status) + " ", 1),
                                      order.source === "custom" ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                                        createTextVNode(" (custom) ")
                                      ], 64)) : createCommentVNode("", true)
                                    ])
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                          } else {
                            return [
                              createVNode(_sfc_main$1, {
                                cols: "2",
                                md: "2",
                                lg: "5",
                                xl: "5",
                                "2xl": "5",
                                gap: "2"
                              }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "flex flex-col justify-center bg-grey-lighten-3 p-2 col-span-2 lg:col-span-1" }, [
                                    createVNode("div", null, [
                                      createVNode("strong", null, toDisplayString(order.initial) + toDisplayString(order.number) + " ", 1),
                                      createVNode("span", { class: "text-blue" }, "(" + toDisplayString(order.type) + ")", 1)
                                    ]),
                                    createVNode("p", null, [
                                      createVNode("span", null, toDisplayString(order.full_name ?? "No name"), 1),
                                      order.user_id ? (openBlock(), createBlock("span", { key: 0 }, " (" + toDisplayString(order.user.name) + ")", 1)) : (openBlock(), createBlock("span", { key: 1 }, " (guest)"))
                                    ]),
                                    createVNode("div", { class: "flex flex-row flex-wrap items-center gap-0" }, [
                                      createVNode("p", null, toDisplayString(order.email ?? "no email"), 1),
                                      order.phone ? (openBlock(), createBlock(_component_v_icon, { key: 0 }, {
                                        default: withCtx(() => [
                                          createTextVNode("mdi-circle-small")
                                        ]),
                                        _: 1
                                      })) : createCommentVNode("", true),
                                      order.phone ? (openBlock(), createBlock("p", { key: 1 }, toDisplayString(order.phone), 1)) : createCommentVNode("", true)
                                    ])
                                  ]),
                                  createVNode("div", { class: "flex flex-col justify-center bg-grey-lighten-3 p-2" }, [
                                    createVNode("p", { class: "font-bold" }, "Amount"),
                                    createTextVNode(" $" + toDisplayString(order.amount), 1)
                                  ]),
                                  createVNode("div", { class: "flex flex-col justify-center bg-grey-lighten-3 p-2" }, [
                                    createVNode(_sfc_main$2, {
                                      center: true,
                                      justify: "start"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode("p", { class: "font-bold" }, toDisplayString(order.type === "catering" ? "Pickup" : "Delivery"), 1),
                                        order.notes ? (openBlock(), createBlock(_component_v_icon, { key: 0 }, {
                                          default: withCtx(() => [
                                            createTextVNode("mdi-pencil-circle")
                                          ]),
                                          _: 1
                                        })) : createCommentVNode("", true)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createTextVNode(" " + toDisplayString(order.datetime_formatted), 1)
                                  ]),
                                  createVNode("div", { class: "flex flex-col justify-center bg-grey-lighten-3 p-2" }, [
                                    createVNode("p", { class: "font-bold" }, "Items"),
                                    createVNode("div", null, [
                                      createVNode(_component_v_btn, {
                                        onClick: withModifiers(($event) => openOrder(order), ["prevent"]),
                                        size: "small"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(order.total_quantity), 1)
                                        ]),
                                        _: 2
                                      }, 1032, ["onClick"])
                                    ])
                                  ]),
                                  createVNode("div", { class: "uppercase flex flex-col justify-center bg-grey-lighten-3 p-2" }, [
                                    createVNode("p", { class: "font-bold" }, "Status"),
                                    createTextVNode(" " + toDisplayString(order.status) + " ", 1),
                                    order.source === "custom" ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                                      createTextVNode(" (custom) ")
                                    ], 64)) : createCommentVNode("", true)
                                  ])
                                ]),
                                _: 2
                              }, 1024)
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(_component_v_card_item, null, {
                          default: withCtx(() => [
                            createVNode(_sfc_main$1, {
                              cols: "2",
                              md: "2",
                              lg: "5",
                              xl: "5",
                              "2xl": "5",
                              gap: "2"
                            }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "flex flex-col justify-center bg-grey-lighten-3 p-2 col-span-2 lg:col-span-1" }, [
                                  createVNode("div", null, [
                                    createVNode("strong", null, toDisplayString(order.initial) + toDisplayString(order.number) + " ", 1),
                                    createVNode("span", { class: "text-blue" }, "(" + toDisplayString(order.type) + ")", 1)
                                  ]),
                                  createVNode("p", null, [
                                    createVNode("span", null, toDisplayString(order.full_name ?? "No name"), 1),
                                    order.user_id ? (openBlock(), createBlock("span", { key: 0 }, " (" + toDisplayString(order.user.name) + ")", 1)) : (openBlock(), createBlock("span", { key: 1 }, " (guest)"))
                                  ]),
                                  createVNode("div", { class: "flex flex-row flex-wrap items-center gap-0" }, [
                                    createVNode("p", null, toDisplayString(order.email ?? "no email"), 1),
                                    order.phone ? (openBlock(), createBlock(_component_v_icon, { key: 0 }, {
                                      default: withCtx(() => [
                                        createTextVNode("mdi-circle-small")
                                      ]),
                                      _: 1
                                    })) : createCommentVNode("", true),
                                    order.phone ? (openBlock(), createBlock("p", { key: 1 }, toDisplayString(order.phone), 1)) : createCommentVNode("", true)
                                  ])
                                ]),
                                createVNode("div", { class: "flex flex-col justify-center bg-grey-lighten-3 p-2" }, [
                                  createVNode("p", { class: "font-bold" }, "Amount"),
                                  createTextVNode(" $" + toDisplayString(order.amount), 1)
                                ]),
                                createVNode("div", { class: "flex flex-col justify-center bg-grey-lighten-3 p-2" }, [
                                  createVNode(_sfc_main$2, {
                                    center: true,
                                    justify: "start"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode("p", { class: "font-bold" }, toDisplayString(order.type === "catering" ? "Pickup" : "Delivery"), 1),
                                      order.notes ? (openBlock(), createBlock(_component_v_icon, { key: 0 }, {
                                        default: withCtx(() => [
                                          createTextVNode("mdi-pencil-circle")
                                        ]),
                                        _: 1
                                      })) : createCommentVNode("", true)
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createTextVNode(" " + toDisplayString(order.datetime_formatted), 1)
                                ]),
                                createVNode("div", { class: "flex flex-col justify-center bg-grey-lighten-3 p-2" }, [
                                  createVNode("p", { class: "font-bold" }, "Items"),
                                  createVNode("div", null, [
                                    createVNode(_component_v_btn, {
                                      onClick: withModifiers(($event) => openOrder(order), ["prevent"]),
                                      size: "small"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(order.total_quantity), 1)
                                      ]),
                                      _: 2
                                    }, 1032, ["onClick"])
                                  ])
                                ]),
                                createVNode("div", { class: "uppercase flex flex-col justify-center bg-grey-lighten-3 p-2" }, [
                                  createVNode("p", { class: "font-bold" }, "Status"),
                                  createTextVNode(" " + toDisplayString(order.status) + " ", 1),
                                  order.source === "custom" ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                                    createTextVNode(" (custom) ")
                                  ], 64)) : createCommentVNode("", true)
                                ])
                              ]),
                              _: 2
                            }, 1024)
                          ]),
                          _: 2
                        }, 1024)
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              });
              _push2(`<!--]--><div data-v-dad6822f${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$3, {
                entities: props.orders
              }, null, _parent2, _scopeId));
              _push2(`</div></div>`);
            } else {
              _push2(`<div data-v-dad6822f${_scopeId}><p data-v-dad6822f${_scopeId}>There are no orders to show here at the moment.</p></div>`);
            }
            _push2(ssrRenderComponent(_sfc_main$4, {
              show: showOrderModal.value,
              onClose: closeOrder,
              maxWidth: "6xl"
            }, {
              title: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(modalTitle.value)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(modalTitle.value), 1)
                  ];
                }
              }),
              content: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (selectedOrder.value) {
                    _push3(`<div class="flex flex-col gap-3" data-v-dad6822f${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_v_card, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<div class="mb-5" data-v-dad6822f${_scopeId3}><p class="text-2xl font-bold mb-2" data-v-dad6822f${_scopeId3}>Order summary</p>`);
                          _push4(ssrRenderComponent(_component_v_card, null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<div data-v-dad6822f${_scopeId4}>`);
                                _push5(ssrRenderComponent(_sfc_main$1, {
                                  cols: "2",
                                  md: "2",
                                  lg: "5",
                                  xl: "5",
                                  "2xl": "5",
                                  gap: "2"
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`<div class="flex flex-col justify-center bg-grey-lighten-3 p-2 col-span-2 lg:col-span-1" data-v-dad6822f${_scopeId5}><div data-v-dad6822f${_scopeId5}><strong data-v-dad6822f${_scopeId5}>${ssrInterpolate(selectedOrder.value.initial)}${ssrInterpolate(selectedOrder.value.number)} </strong><span class="text-blue" data-v-dad6822f${_scopeId5}>(${ssrInterpolate(selectedOrder.value.type)})</span></div><p data-v-dad6822f${_scopeId5}><span data-v-dad6822f${_scopeId5}>${ssrInterpolate(selectedOrder.value.full_name ?? "No name")}</span>`);
                                      if (selectedOrder.value.user_id) {
                                        _push6(`<span data-v-dad6822f${_scopeId5}> (${ssrInterpolate(selectedOrder.value.user.name)})</span>`);
                                      } else {
                                        _push6(`<span data-v-dad6822f${_scopeId5}> (guest)</span>`);
                                      }
                                      _push6(`</p><div data-v-dad6822f${_scopeId5}><p data-v-dad6822f${_scopeId5}>${ssrInterpolate(selectedOrder.value.email ?? "no email")}</p>`);
                                      if (selectedOrder.value.phone) {
                                        _push6(`<p data-v-dad6822f${_scopeId5}>${ssrInterpolate(selectedOrder.value.phone)}</p>`);
                                      } else {
                                        _push6(`<!---->`);
                                      }
                                      _push6(`</div></div><div class="flex flex-col justify-center bg-grey-lighten-3 p-2" data-v-dad6822f${_scopeId5}><p class="font-bold" data-v-dad6822f${_scopeId5}>Amount</p> $${ssrInterpolate(selectedOrder.value.amount)}</div><div class="flex flex-col justify-center bg-grey-lighten-3 p-2" data-v-dad6822f${_scopeId5}><p class="font-bold" data-v-dad6822f${_scopeId5}>${ssrInterpolate(selectedOrder.value.type === "catering" ? "Pickup" : "Delivery")}</p> ${ssrInterpolate(selectedOrder.value.datetime_formatted)}</div><div class="flex flex-col justify-center bg-grey-lighten-3 p-2" data-v-dad6822f${_scopeId5}><p class="font-bold" data-v-dad6822f${_scopeId5}>Items</p><div data-v-dad6822f${_scopeId5}>`);
                                      _push6(ssrRenderComponent(_component_v_btn, {
                                        size: "small",
                                        color: "grey-darken-2"
                                      }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`${ssrInterpolate(selectedOrder.value.total_quantity)}`);
                                          } else {
                                            return [
                                              createTextVNode(toDisplayString(selectedOrder.value.total_quantity), 1)
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                      _push6(`</div></div><div class="flex flex-col justify-center uppercase bg-grey-lighten-3 p-2" data-v-dad6822f${_scopeId5}><p class="font-bold" data-v-dad6822f${_scopeId5}>Status</p> ${ssrInterpolate(selectedOrder.value.status)} `);
                                      if (selectedOrder.value.source === "custom") {
                                        _push6(`<!--[--> (custom) <!--]-->`);
                                      } else {
                                        _push6(`<!---->`);
                                      }
                                      _push6(`</div>`);
                                    } else {
                                      return [
                                        createVNode("div", { class: "flex flex-col justify-center bg-grey-lighten-3 p-2 col-span-2 lg:col-span-1" }, [
                                          createVNode("div", null, [
                                            createVNode("strong", null, toDisplayString(selectedOrder.value.initial) + toDisplayString(selectedOrder.value.number) + " ", 1),
                                            createVNode("span", { class: "text-blue" }, "(" + toDisplayString(selectedOrder.value.type) + ")", 1)
                                          ]),
                                          createVNode("p", null, [
                                            createVNode("span", null, toDisplayString(selectedOrder.value.full_name ?? "No name"), 1),
                                            selectedOrder.value.user_id ? (openBlock(), createBlock("span", { key: 0 }, " (" + toDisplayString(selectedOrder.value.user.name) + ")", 1)) : (openBlock(), createBlock("span", { key: 1 }, " (guest)"))
                                          ]),
                                          createVNode("div", null, [
                                            createVNode("p", null, toDisplayString(selectedOrder.value.email ?? "no email"), 1),
                                            selectedOrder.value.phone ? (openBlock(), createBlock("p", { key: 0 }, toDisplayString(selectedOrder.value.phone), 1)) : createCommentVNode("", true)
                                          ])
                                        ]),
                                        createVNode("div", { class: "flex flex-col justify-center bg-grey-lighten-3 p-2" }, [
                                          createVNode("p", { class: "font-bold" }, "Amount"),
                                          createTextVNode(" $" + toDisplayString(selectedOrder.value.amount), 1)
                                        ]),
                                        createVNode("div", { class: "flex flex-col justify-center bg-grey-lighten-3 p-2" }, [
                                          createVNode("p", { class: "font-bold" }, toDisplayString(selectedOrder.value.type === "catering" ? "Pickup" : "Delivery"), 1),
                                          createTextVNode(" " + toDisplayString(selectedOrder.value.datetime_formatted), 1)
                                        ]),
                                        createVNode("div", { class: "flex flex-col justify-center bg-grey-lighten-3 p-2" }, [
                                          createVNode("p", { class: "font-bold" }, "Items"),
                                          createVNode("div", null, [
                                            createVNode(_component_v_btn, {
                                              size: "small",
                                              color: "grey-darken-2"
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(selectedOrder.value.total_quantity), 1)
                                              ]),
                                              _: 1
                                            })
                                          ])
                                        ]),
                                        createVNode("div", { class: "flex flex-col justify-center uppercase bg-grey-lighten-3 p-2" }, [
                                          createVNode("p", { class: "font-bold" }, "Status"),
                                          createTextVNode(" " + toDisplayString(selectedOrder.value.status) + " ", 1),
                                          selectedOrder.value.source === "custom" ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                                            createTextVNode(" (custom) ")
                                          ], 64)) : createCommentVNode("", true)
                                        ])
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                                _push5(`</div>`);
                              } else {
                                return [
                                  createVNode("div", null, [
                                    createVNode(_sfc_main$1, {
                                      cols: "2",
                                      md: "2",
                                      lg: "5",
                                      xl: "5",
                                      "2xl": "5",
                                      gap: "2"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode("div", { class: "flex flex-col justify-center bg-grey-lighten-3 p-2 col-span-2 lg:col-span-1" }, [
                                          createVNode("div", null, [
                                            createVNode("strong", null, toDisplayString(selectedOrder.value.initial) + toDisplayString(selectedOrder.value.number) + " ", 1),
                                            createVNode("span", { class: "text-blue" }, "(" + toDisplayString(selectedOrder.value.type) + ")", 1)
                                          ]),
                                          createVNode("p", null, [
                                            createVNode("span", null, toDisplayString(selectedOrder.value.full_name ?? "No name"), 1),
                                            selectedOrder.value.user_id ? (openBlock(), createBlock("span", { key: 0 }, " (" + toDisplayString(selectedOrder.value.user.name) + ")", 1)) : (openBlock(), createBlock("span", { key: 1 }, " (guest)"))
                                          ]),
                                          createVNode("div", null, [
                                            createVNode("p", null, toDisplayString(selectedOrder.value.email ?? "no email"), 1),
                                            selectedOrder.value.phone ? (openBlock(), createBlock("p", { key: 0 }, toDisplayString(selectedOrder.value.phone), 1)) : createCommentVNode("", true)
                                          ])
                                        ]),
                                        createVNode("div", { class: "flex flex-col justify-center bg-grey-lighten-3 p-2" }, [
                                          createVNode("p", { class: "font-bold" }, "Amount"),
                                          createTextVNode(" $" + toDisplayString(selectedOrder.value.amount), 1)
                                        ]),
                                        createVNode("div", { class: "flex flex-col justify-center bg-grey-lighten-3 p-2" }, [
                                          createVNode("p", { class: "font-bold" }, toDisplayString(selectedOrder.value.type === "catering" ? "Pickup" : "Delivery"), 1),
                                          createTextVNode(" " + toDisplayString(selectedOrder.value.datetime_formatted), 1)
                                        ]),
                                        createVNode("div", { class: "flex flex-col justify-center bg-grey-lighten-3 p-2" }, [
                                          createVNode("p", { class: "font-bold" }, "Items"),
                                          createVNode("div", null, [
                                            createVNode(_component_v_btn, {
                                              size: "small",
                                              color: "grey-darken-2"
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(selectedOrder.value.total_quantity), 1)
                                              ]),
                                              _: 1
                                            })
                                          ])
                                        ]),
                                        createVNode("div", { class: "flex flex-col justify-center uppercase bg-grey-lighten-3 p-2" }, [
                                          createVNode("p", { class: "font-bold" }, "Status"),
                                          createTextVNode(" " + toDisplayString(selectedOrder.value.status) + " ", 1),
                                          selectedOrder.value.source === "custom" ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                                            createTextVNode(" (custom) ")
                                          ], 64)) : createCommentVNode("", true)
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
                          _push4(`</div><div class="mb-5" data-v-dad6822f${_scopeId3}><p class="text-2xl font-bold mb-2" data-v-dad6822f${_scopeId3}>Order notes</p>`);
                          _push4(ssrRenderComponent(_component_v_card, {
                            color: "grey-lighten-3",
                            rounded: "lg"
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<div class="p-4" data-v-dad6822f${_scopeId4}>`);
                                if (editOrderNotes.value) {
                                  _push5(`<div class="mb-4" data-v-dad6822f${_scopeId4}>`);
                                  _push5(ssrRenderComponent(_component_v_textarea, {
                                    modelValue: orderNotes.value,
                                    "onUpdate:modelValue": ($event) => orderNotes.value = $event,
                                    rows: "3",
                                    "auto-grow": "",
                                    "hide-details": ""
                                  }, null, _parent5, _scopeId4));
                                  _push5(`</div>`);
                                } else if (selectedOrder.value.notes) {
                                  _push5(`<p data-v-dad6822f${_scopeId4}>${selectedOrder.value.notes_formatted ?? ""}</p>`);
                                } else {
                                  _push5(`<!---->`);
                                }
                                _push5(`<div class="mt-2" data-v-dad6822f${_scopeId4}>`);
                                _push5(ssrRenderComponent(_sfc_main$2, {
                                  center: true,
                                  justify: "start"
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      if (editOrderNotes.value) {
                                        _push6(`<div data-v-dad6822f${_scopeId5}>`);
                                        _push6(ssrRenderComponent(_component_v_btn, {
                                          size: "small",
                                          onClick: updateOrderNotes
                                        }, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(`Save`);
                                            } else {
                                              return [
                                                createTextVNode("Save")
                                              ];
                                            }
                                          }),
                                          _: 1
                                        }, _parent6, _scopeId5));
                                        _push6(`</div>`);
                                      } else {
                                        _push6(`<!---->`);
                                      }
                                      _push6(`<div data-v-dad6822f${_scopeId5}>`);
                                      _push6(ssrRenderComponent(_component_v_btn, {
                                        size: "small",
                                        variant: "outlined",
                                        onClick: toggleEditOrderNotes
                                      }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`${ssrInterpolate(editOrderNotes.value ? "Cancel" : "Edit notes")}`);
                                          } else {
                                            return [
                                              createTextVNode(toDisplayString(editOrderNotes.value ? "Cancel" : "Edit notes"), 1)
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                      _push6(`</div>`);
                                    } else {
                                      return [
                                        editOrderNotes.value ? (openBlock(), createBlock("div", { key: 0 }, [
                                          createVNode(_component_v_btn, {
                                            size: "small",
                                            onClick: withModifiers(updateOrderNotes, ["prevent"])
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode("Save")
                                            ]),
                                            _: 1
                                          })
                                        ])) : createCommentVNode("", true),
                                        createVNode("div", null, [
                                          createVNode(_component_v_btn, {
                                            size: "small",
                                            variant: "outlined",
                                            onClick: withModifiers(toggleEditOrderNotes, ["prevent"])
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(editOrderNotes.value ? "Cancel" : "Edit notes"), 1)
                                            ]),
                                            _: 1
                                          })
                                        ])
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                                _push5(`</div></div>`);
                              } else {
                                return [
                                  createVNode("div", { class: "p-4" }, [
                                    editOrderNotes.value ? (openBlock(), createBlock("div", {
                                      key: 0,
                                      class: "mb-4"
                                    }, [
                                      createVNode(_component_v_textarea, {
                                        modelValue: orderNotes.value,
                                        "onUpdate:modelValue": ($event) => orderNotes.value = $event,
                                        rows: "3",
                                        "auto-grow": "",
                                        "hide-details": ""
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ])) : selectedOrder.value.notes ? (openBlock(), createBlock("p", {
                                      key: 1,
                                      innerHTML: selectedOrder.value.notes_formatted
                                    }, null, 8, ["innerHTML"])) : createCommentVNode("", true),
                                    createVNode("div", { class: "mt-2" }, [
                                      createVNode(_sfc_main$2, {
                                        center: true,
                                        justify: "start"
                                      }, {
                                        default: withCtx(() => [
                                          editOrderNotes.value ? (openBlock(), createBlock("div", { key: 0 }, [
                                            createVNode(_component_v_btn, {
                                              size: "small",
                                              onClick: withModifiers(updateOrderNotes, ["prevent"])
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode("Save")
                                              ]),
                                              _: 1
                                            })
                                          ])) : createCommentVNode("", true),
                                          createVNode("div", null, [
                                            createVNode(_component_v_btn, {
                                              size: "small",
                                              variant: "outlined",
                                              onClick: withModifiers(toggleEditOrderNotes, ["prevent"])
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(editOrderNotes.value ? "Cancel" : "Edit notes"), 1)
                                              ]),
                                              _: 1
                                            })
                                          ])
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
                          _push4(`</div><p class="text-2xl font-bold mb-2" data-v-dad6822f${_scopeId3}>Order items</p><div data-v-dad6822f${_scopeId3}>`);
                          _push4(ssrRenderComponent(_sfc_main$5, { gap: "4" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<!--[-->`);
                                ssrRenderList(selectedOrder.value.items, (item) => {
                                  _push5(`<div class="bg-grey-lighten-2 p-3" data-v-dad6822f${_scopeId4}><div class="flex lg:flex-row items-center justify-start gap-3 w-full" data-v-dad6822f${_scopeId4}><div class="hidden lg:flex shrink-0 w-[70px]" data-v-dad6822f${_scopeId4}>`);
                                  _push5(ssrRenderComponent(_component_v_img, {
                                    "aspect-ratio": "1",
                                    src: item.thumbnail,
                                    cover: ""
                                  }, null, _parent5, _scopeId4));
                                  _push5(`</div><div class="grow" data-v-dad6822f${_scopeId4}>`);
                                  _push5(ssrRenderComponent(_sfc_main$1, {
                                    cols: "1",
                                    md: "5",
                                    lg: "5",
                                    xl: "5",
                                    "2xl": "5",
                                    gap: "1"
                                  }, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`<div class="uppercase font-bold" data-v-dad6822f${_scopeId5}>${ssrInterpolate(item.product_name)}</div><div class="uppercase" data-v-dad6822f${_scopeId5}>${ssrInterpolate(item.variation_name)}</div><div class="uppercase" data-v-dad6822f${_scopeId5}>$${ssrInterpolate(item.variation_price)}</div><div class="uppercase" data-v-dad6822f${_scopeId5}>${ssrInterpolate(item.quantity)}</div><div class="uppercase" data-v-dad6822f${_scopeId5}>$${ssrInterpolate(item.amount)}</div>`);
                                      } else {
                                        return [
                                          createVNode("div", { class: "uppercase font-bold" }, toDisplayString(item.product_name), 1),
                                          createVNode("div", { class: "uppercase" }, toDisplayString(item.variation_name), 1),
                                          createVNode("div", { class: "uppercase" }, "$" + toDisplayString(item.variation_price), 1),
                                          createVNode("div", { class: "uppercase" }, toDisplayString(item.quantity), 1),
                                          createVNode("div", { class: "uppercase" }, "$" + toDisplayString(item.amount), 1)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                  _push5(`</div></div>`);
                                  if (item.client_note) {
                                    _push5(`<div class="mt-2" data-v-dad6822f${_scopeId4}><p class="text-red" data-v-dad6822f${_scopeId4}>Client note</p>`);
                                    _push5(ssrRenderComponent(_component_v_textarea, {
                                      rows: "1",
                                      "auto-grow": "",
                                      "model-value": item.client_note,
                                      variant: "solo",
                                      flat: "",
                                      "bg-color": "red-lighten-3",
                                      "hide-details": "",
                                      readonly: ""
                                    }, null, _parent5, _scopeId4));
                                    _push5(`</div>`);
                                  } else {
                                    _push5(`<!---->`);
                                  }
                                  _push5(`</div>`);
                                });
                                _push5(`<!--]-->`);
                              } else {
                                return [
                                  (openBlock(true), createBlock(Fragment, null, renderList(selectedOrder.value.items, (item) => {
                                    return openBlock(), createBlock("div", { class: "bg-grey-lighten-2 p-3" }, [
                                      createVNode("div", { class: "flex lg:flex-row items-center justify-start gap-3 w-full" }, [
                                        createVNode("div", { class: "hidden lg:flex shrink-0 w-[70px]" }, [
                                          createVNode(_component_v_img, {
                                            "aspect-ratio": "1",
                                            src: item.thumbnail,
                                            cover: ""
                                          }, null, 8, ["src"])
                                        ]),
                                        createVNode("div", { class: "grow" }, [
                                          createVNode(_sfc_main$1, {
                                            cols: "1",
                                            md: "5",
                                            lg: "5",
                                            xl: "5",
                                            "2xl": "5",
                                            gap: "1"
                                          }, {
                                            default: withCtx(() => [
                                              createVNode("div", { class: "uppercase font-bold" }, toDisplayString(item.product_name), 1),
                                              createVNode("div", { class: "uppercase" }, toDisplayString(item.variation_name), 1),
                                              createVNode("div", { class: "uppercase" }, "$" + toDisplayString(item.variation_price), 1),
                                              createVNode("div", { class: "uppercase" }, toDisplayString(item.quantity), 1),
                                              createVNode("div", { class: "uppercase" }, "$" + toDisplayString(item.amount), 1)
                                            ]),
                                            _: 2
                                          }, 1024)
                                        ])
                                      ]),
                                      item.client_note ? (openBlock(), createBlock("div", {
                                        key: 0,
                                        class: "mt-2"
                                      }, [
                                        createVNode("p", { class: "text-red" }, "Client note"),
                                        createVNode(_component_v_textarea, {
                                          rows: "1",
                                          "auto-grow": "",
                                          "model-value": item.client_note,
                                          variant: "solo",
                                          flat: "",
                                          "bg-color": "red-lighten-3",
                                          "hide-details": "",
                                          readonly: ""
                                        }, null, 8, ["model-value"])
                                      ])) : createCommentVNode("", true)
                                    ]);
                                  }), 256))
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(`</div>`);
                        } else {
                          return [
                            createVNode("div", { class: "mb-5" }, [
                              createVNode("p", { class: "text-2xl font-bold mb-2" }, "Order summary"),
                              createVNode(_component_v_card, null, {
                                default: withCtx(() => [
                                  createVNode("div", null, [
                                    createVNode(_sfc_main$1, {
                                      cols: "2",
                                      md: "2",
                                      lg: "5",
                                      xl: "5",
                                      "2xl": "5",
                                      gap: "2"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode("div", { class: "flex flex-col justify-center bg-grey-lighten-3 p-2 col-span-2 lg:col-span-1" }, [
                                          createVNode("div", null, [
                                            createVNode("strong", null, toDisplayString(selectedOrder.value.initial) + toDisplayString(selectedOrder.value.number) + " ", 1),
                                            createVNode("span", { class: "text-blue" }, "(" + toDisplayString(selectedOrder.value.type) + ")", 1)
                                          ]),
                                          createVNode("p", null, [
                                            createVNode("span", null, toDisplayString(selectedOrder.value.full_name ?? "No name"), 1),
                                            selectedOrder.value.user_id ? (openBlock(), createBlock("span", { key: 0 }, " (" + toDisplayString(selectedOrder.value.user.name) + ")", 1)) : (openBlock(), createBlock("span", { key: 1 }, " (guest)"))
                                          ]),
                                          createVNode("div", null, [
                                            createVNode("p", null, toDisplayString(selectedOrder.value.email ?? "no email"), 1),
                                            selectedOrder.value.phone ? (openBlock(), createBlock("p", { key: 0 }, toDisplayString(selectedOrder.value.phone), 1)) : createCommentVNode("", true)
                                          ])
                                        ]),
                                        createVNode("div", { class: "flex flex-col justify-center bg-grey-lighten-3 p-2" }, [
                                          createVNode("p", { class: "font-bold" }, "Amount"),
                                          createTextVNode(" $" + toDisplayString(selectedOrder.value.amount), 1)
                                        ]),
                                        createVNode("div", { class: "flex flex-col justify-center bg-grey-lighten-3 p-2" }, [
                                          createVNode("p", { class: "font-bold" }, toDisplayString(selectedOrder.value.type === "catering" ? "Pickup" : "Delivery"), 1),
                                          createTextVNode(" " + toDisplayString(selectedOrder.value.datetime_formatted), 1)
                                        ]),
                                        createVNode("div", { class: "flex flex-col justify-center bg-grey-lighten-3 p-2" }, [
                                          createVNode("p", { class: "font-bold" }, "Items"),
                                          createVNode("div", null, [
                                            createVNode(_component_v_btn, {
                                              size: "small",
                                              color: "grey-darken-2"
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(selectedOrder.value.total_quantity), 1)
                                              ]),
                                              _: 1
                                            })
                                          ])
                                        ]),
                                        createVNode("div", { class: "flex flex-col justify-center uppercase bg-grey-lighten-3 p-2" }, [
                                          createVNode("p", { class: "font-bold" }, "Status"),
                                          createTextVNode(" " + toDisplayString(selectedOrder.value.status) + " ", 1),
                                          selectedOrder.value.source === "custom" ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                                            createTextVNode(" (custom) ")
                                          ], 64)) : createCommentVNode("", true)
                                        ])
                                      ]),
                                      _: 1
                                    })
                                  ])
                                ]),
                                _: 1
                              })
                            ]),
                            createVNode("div", { class: "mb-5" }, [
                              createVNode("p", { class: "text-2xl font-bold mb-2" }, "Order notes"),
                              createVNode(_component_v_card, {
                                color: "grey-lighten-3",
                                rounded: "lg"
                              }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "p-4" }, [
                                    editOrderNotes.value ? (openBlock(), createBlock("div", {
                                      key: 0,
                                      class: "mb-4"
                                    }, [
                                      createVNode(_component_v_textarea, {
                                        modelValue: orderNotes.value,
                                        "onUpdate:modelValue": ($event) => orderNotes.value = $event,
                                        rows: "3",
                                        "auto-grow": "",
                                        "hide-details": ""
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ])) : selectedOrder.value.notes ? (openBlock(), createBlock("p", {
                                      key: 1,
                                      innerHTML: selectedOrder.value.notes_formatted
                                    }, null, 8, ["innerHTML"])) : createCommentVNode("", true),
                                    createVNode("div", { class: "mt-2" }, [
                                      createVNode(_sfc_main$2, {
                                        center: true,
                                        justify: "start"
                                      }, {
                                        default: withCtx(() => [
                                          editOrderNotes.value ? (openBlock(), createBlock("div", { key: 0 }, [
                                            createVNode(_component_v_btn, {
                                              size: "small",
                                              onClick: withModifiers(updateOrderNotes, ["prevent"])
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode("Save")
                                              ]),
                                              _: 1
                                            })
                                          ])) : createCommentVNode("", true),
                                          createVNode("div", null, [
                                            createVNode(_component_v_btn, {
                                              size: "small",
                                              variant: "outlined",
                                              onClick: withModifiers(toggleEditOrderNotes, ["prevent"])
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(editOrderNotes.value ? "Cancel" : "Edit notes"), 1)
                                              ]),
                                              _: 1
                                            })
                                          ])
                                        ]),
                                        _: 1
                                      })
                                    ])
                                  ])
                                ]),
                                _: 1
                              })
                            ]),
                            createVNode("p", { class: "text-2xl font-bold mb-2" }, "Order items"),
                            createVNode("div", null, [
                              createVNode(_sfc_main$5, { gap: "4" }, {
                                default: withCtx(() => [
                                  (openBlock(true), createBlock(Fragment, null, renderList(selectedOrder.value.items, (item) => {
                                    return openBlock(), createBlock("div", { class: "bg-grey-lighten-2 p-3" }, [
                                      createVNode("div", { class: "flex lg:flex-row items-center justify-start gap-3 w-full" }, [
                                        createVNode("div", { class: "hidden lg:flex shrink-0 w-[70px]" }, [
                                          createVNode(_component_v_img, {
                                            "aspect-ratio": "1",
                                            src: item.thumbnail,
                                            cover: ""
                                          }, null, 8, ["src"])
                                        ]),
                                        createVNode("div", { class: "grow" }, [
                                          createVNode(_sfc_main$1, {
                                            cols: "1",
                                            md: "5",
                                            lg: "5",
                                            xl: "5",
                                            "2xl": "5",
                                            gap: "1"
                                          }, {
                                            default: withCtx(() => [
                                              createVNode("div", { class: "uppercase font-bold" }, toDisplayString(item.product_name), 1),
                                              createVNode("div", { class: "uppercase" }, toDisplayString(item.variation_name), 1),
                                              createVNode("div", { class: "uppercase" }, "$" + toDisplayString(item.variation_price), 1),
                                              createVNode("div", { class: "uppercase" }, toDisplayString(item.quantity), 1),
                                              createVNode("div", { class: "uppercase" }, "$" + toDisplayString(item.amount), 1)
                                            ]),
                                            _: 2
                                          }, 1024)
                                        ])
                                      ]),
                                      item.client_note ? (openBlock(), createBlock("div", {
                                        key: 0,
                                        class: "mt-2"
                                      }, [
                                        createVNode("p", { class: "text-red" }, "Client note"),
                                        createVNode(_component_v_textarea, {
                                          rows: "1",
                                          "auto-grow": "",
                                          "model-value": item.client_note,
                                          variant: "solo",
                                          flat: "",
                                          "bg-color": "red-lighten-3",
                                          "hide-details": "",
                                          readonly: ""
                                        }, null, 8, ["model-value"])
                                      ])) : createCommentVNode("", true)
                                    ]);
                                  }), 256))
                                ]),
                                _: 1
                              })
                            ])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_sfc_main$1, {
                      cols: "1",
                      md: "2",
                      lg: "2",
                      xl: "2",
                      "2xl": "2"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<div class="my-5 h-full bg-grey-lighten-2 px-3 py-2" data-v-dad6822f${_scopeId3}><p class="text-2xl font-bold mb-2" data-v-dad6822f${_scopeId3}>Order status</p>`);
                          _push4(ssrRenderComponent(_component_v_card, { color: "grey-lighten-2" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<div class="p-1" data-v-dad6822f${_scopeId4}>`);
                                _push5(ssrRenderComponent(_component_v_radio_group, {
                                  modelValue: currentStatus.value,
                                  "onUpdate:modelValue": ($event) => currentStatus.value = $event,
                                  "hide-details": "",
                                  density: "comfortable"
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`<!--[-->`);
                                      ssrRenderList(statuses.value, (status) => {
                                        _push6(`<div data-v-dad6822f${_scopeId5}>`);
                                        _push6(ssrRenderComponent(_component_v_radio, {
                                          value: status,
                                          label: status,
                                          "hide-details": ""
                                        }, null, _parent6, _scopeId5));
                                        _push6(`</div>`);
                                      });
                                      _push6(`<!--]-->`);
                                    } else {
                                      return [
                                        (openBlock(true), createBlock(Fragment, null, renderList(statuses.value, (status) => {
                                          return openBlock(), createBlock("div", null, [
                                            createVNode(_component_v_radio, {
                                              value: status,
                                              label: status,
                                              "hide-details": ""
                                            }, null, 8, ["value", "label"])
                                          ]);
                                        }), 256))
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                                _push5(`</div>`);
                              } else {
                                return [
                                  createVNode("div", { class: "p-1" }, [
                                    createVNode(_component_v_radio_group, {
                                      modelValue: currentStatus.value,
                                      "onUpdate:modelValue": ($event) => currentStatus.value = $event,
                                      "hide-details": "",
                                      density: "comfortable"
                                    }, {
                                      default: withCtx(() => [
                                        (openBlock(true), createBlock(Fragment, null, renderList(statuses.value, (status) => {
                                          return openBlock(), createBlock("div", null, [
                                            createVNode(_component_v_radio, {
                                              value: status,
                                              label: status,
                                              "hide-details": ""
                                            }, null, 8, ["value", "label"])
                                          ]);
                                        }), 256))
                                      ]),
                                      _: 1
                                    }, 8, ["modelValue", "onUpdate:modelValue"])
                                  ])
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(`</div>`);
                        } else {
                          return [
                            createVNode("div", { class: "my-5 h-full bg-grey-lighten-2 px-3 py-2" }, [
                              createVNode("p", { class: "text-2xl font-bold mb-2" }, "Order status"),
                              createVNode(_component_v_card, { color: "grey-lighten-2" }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "p-1" }, [
                                    createVNode(_component_v_radio_group, {
                                      modelValue: currentStatus.value,
                                      "onUpdate:modelValue": ($event) => currentStatus.value = $event,
                                      "hide-details": "",
                                      density: "comfortable"
                                    }, {
                                      default: withCtx(() => [
                                        (openBlock(true), createBlock(Fragment, null, renderList(statuses.value, (status) => {
                                          return openBlock(), createBlock("div", null, [
                                            createVNode(_component_v_radio, {
                                              value: status,
                                              label: status,
                                              "hide-details": ""
                                            }, null, 8, ["value", "label"])
                                          ]);
                                        }), 256))
                                      ]),
                                      _: 1
                                    }, 8, ["modelValue", "onUpdate:modelValue"])
                                  ])
                                ]),
                                _: 1
                              })
                            ])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`</div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    selectedOrder.value ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "flex flex-col gap-3"
                    }, [
                      createVNode(_component_v_card, null, {
                        default: withCtx(() => [
                          createVNode("div", { class: "mb-5" }, [
                            createVNode("p", { class: "text-2xl font-bold mb-2" }, "Order summary"),
                            createVNode(_component_v_card, null, {
                              default: withCtx(() => [
                                createVNode("div", null, [
                                  createVNode(_sfc_main$1, {
                                    cols: "2",
                                    md: "2",
                                    lg: "5",
                                    xl: "5",
                                    "2xl": "5",
                                    gap: "2"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode("div", { class: "flex flex-col justify-center bg-grey-lighten-3 p-2 col-span-2 lg:col-span-1" }, [
                                        createVNode("div", null, [
                                          createVNode("strong", null, toDisplayString(selectedOrder.value.initial) + toDisplayString(selectedOrder.value.number) + " ", 1),
                                          createVNode("span", { class: "text-blue" }, "(" + toDisplayString(selectedOrder.value.type) + ")", 1)
                                        ]),
                                        createVNode("p", null, [
                                          createVNode("span", null, toDisplayString(selectedOrder.value.full_name ?? "No name"), 1),
                                          selectedOrder.value.user_id ? (openBlock(), createBlock("span", { key: 0 }, " (" + toDisplayString(selectedOrder.value.user.name) + ")", 1)) : (openBlock(), createBlock("span", { key: 1 }, " (guest)"))
                                        ]),
                                        createVNode("div", null, [
                                          createVNode("p", null, toDisplayString(selectedOrder.value.email ?? "no email"), 1),
                                          selectedOrder.value.phone ? (openBlock(), createBlock("p", { key: 0 }, toDisplayString(selectedOrder.value.phone), 1)) : createCommentVNode("", true)
                                        ])
                                      ]),
                                      createVNode("div", { class: "flex flex-col justify-center bg-grey-lighten-3 p-2" }, [
                                        createVNode("p", { class: "font-bold" }, "Amount"),
                                        createTextVNode(" $" + toDisplayString(selectedOrder.value.amount), 1)
                                      ]),
                                      createVNode("div", { class: "flex flex-col justify-center bg-grey-lighten-3 p-2" }, [
                                        createVNode("p", { class: "font-bold" }, toDisplayString(selectedOrder.value.type === "catering" ? "Pickup" : "Delivery"), 1),
                                        createTextVNode(" " + toDisplayString(selectedOrder.value.datetime_formatted), 1)
                                      ]),
                                      createVNode("div", { class: "flex flex-col justify-center bg-grey-lighten-3 p-2" }, [
                                        createVNode("p", { class: "font-bold" }, "Items"),
                                        createVNode("div", null, [
                                          createVNode(_component_v_btn, {
                                            size: "small",
                                            color: "grey-darken-2"
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(selectedOrder.value.total_quantity), 1)
                                            ]),
                                            _: 1
                                          })
                                        ])
                                      ]),
                                      createVNode("div", { class: "flex flex-col justify-center uppercase bg-grey-lighten-3 p-2" }, [
                                        createVNode("p", { class: "font-bold" }, "Status"),
                                        createTextVNode(" " + toDisplayString(selectedOrder.value.status) + " ", 1),
                                        selectedOrder.value.source === "custom" ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                                          createTextVNode(" (custom) ")
                                        ], 64)) : createCommentVNode("", true)
                                      ])
                                    ]),
                                    _: 1
                                  })
                                ])
                              ]),
                              _: 1
                            })
                          ]),
                          createVNode("div", { class: "mb-5" }, [
                            createVNode("p", { class: "text-2xl font-bold mb-2" }, "Order notes"),
                            createVNode(_component_v_card, {
                              color: "grey-lighten-3",
                              rounded: "lg"
                            }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "p-4" }, [
                                  editOrderNotes.value ? (openBlock(), createBlock("div", {
                                    key: 0,
                                    class: "mb-4"
                                  }, [
                                    createVNode(_component_v_textarea, {
                                      modelValue: orderNotes.value,
                                      "onUpdate:modelValue": ($event) => orderNotes.value = $event,
                                      rows: "3",
                                      "auto-grow": "",
                                      "hide-details": ""
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                  ])) : selectedOrder.value.notes ? (openBlock(), createBlock("p", {
                                    key: 1,
                                    innerHTML: selectedOrder.value.notes_formatted
                                  }, null, 8, ["innerHTML"])) : createCommentVNode("", true),
                                  createVNode("div", { class: "mt-2" }, [
                                    createVNode(_sfc_main$2, {
                                      center: true,
                                      justify: "start"
                                    }, {
                                      default: withCtx(() => [
                                        editOrderNotes.value ? (openBlock(), createBlock("div", { key: 0 }, [
                                          createVNode(_component_v_btn, {
                                            size: "small",
                                            onClick: withModifiers(updateOrderNotes, ["prevent"])
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode("Save")
                                            ]),
                                            _: 1
                                          })
                                        ])) : createCommentVNode("", true),
                                        createVNode("div", null, [
                                          createVNode(_component_v_btn, {
                                            size: "small",
                                            variant: "outlined",
                                            onClick: withModifiers(toggleEditOrderNotes, ["prevent"])
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(editOrderNotes.value ? "Cancel" : "Edit notes"), 1)
                                            ]),
                                            _: 1
                                          })
                                        ])
                                      ]),
                                      _: 1
                                    })
                                  ])
                                ])
                              ]),
                              _: 1
                            })
                          ]),
                          createVNode("p", { class: "text-2xl font-bold mb-2" }, "Order items"),
                          createVNode("div", null, [
                            createVNode(_sfc_main$5, { gap: "4" }, {
                              default: withCtx(() => [
                                (openBlock(true), createBlock(Fragment, null, renderList(selectedOrder.value.items, (item) => {
                                  return openBlock(), createBlock("div", { class: "bg-grey-lighten-2 p-3" }, [
                                    createVNode("div", { class: "flex lg:flex-row items-center justify-start gap-3 w-full" }, [
                                      createVNode("div", { class: "hidden lg:flex shrink-0 w-[70px]" }, [
                                        createVNode(_component_v_img, {
                                          "aspect-ratio": "1",
                                          src: item.thumbnail,
                                          cover: ""
                                        }, null, 8, ["src"])
                                      ]),
                                      createVNode("div", { class: "grow" }, [
                                        createVNode(_sfc_main$1, {
                                          cols: "1",
                                          md: "5",
                                          lg: "5",
                                          xl: "5",
                                          "2xl": "5",
                                          gap: "1"
                                        }, {
                                          default: withCtx(() => [
                                            createVNode("div", { class: "uppercase font-bold" }, toDisplayString(item.product_name), 1),
                                            createVNode("div", { class: "uppercase" }, toDisplayString(item.variation_name), 1),
                                            createVNode("div", { class: "uppercase" }, "$" + toDisplayString(item.variation_price), 1),
                                            createVNode("div", { class: "uppercase" }, toDisplayString(item.quantity), 1),
                                            createVNode("div", { class: "uppercase" }, "$" + toDisplayString(item.amount), 1)
                                          ]),
                                          _: 2
                                        }, 1024)
                                      ])
                                    ]),
                                    item.client_note ? (openBlock(), createBlock("div", {
                                      key: 0,
                                      class: "mt-2"
                                    }, [
                                      createVNode("p", { class: "text-red" }, "Client note"),
                                      createVNode(_component_v_textarea, {
                                        rows: "1",
                                        "auto-grow": "",
                                        "model-value": item.client_note,
                                        variant: "solo",
                                        flat: "",
                                        "bg-color": "red-lighten-3",
                                        "hide-details": "",
                                        readonly: ""
                                      }, null, 8, ["model-value"])
                                    ])) : createCommentVNode("", true)
                                  ]);
                                }), 256))
                              ]),
                              _: 1
                            })
                          ])
                        ]),
                        _: 1
                      }),
                      createVNode(_sfc_main$1, {
                        cols: "1",
                        md: "2",
                        lg: "2",
                        xl: "2",
                        "2xl": "2"
                      }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "my-5 h-full bg-grey-lighten-2 px-3 py-2" }, [
                            createVNode("p", { class: "text-2xl font-bold mb-2" }, "Order status"),
                            createVNode(_component_v_card, { color: "grey-lighten-2" }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "p-1" }, [
                                  createVNode(_component_v_radio_group, {
                                    modelValue: currentStatus.value,
                                    "onUpdate:modelValue": ($event) => currentStatus.value = $event,
                                    "hide-details": "",
                                    density: "comfortable"
                                  }, {
                                    default: withCtx(() => [
                                      (openBlock(true), createBlock(Fragment, null, renderList(statuses.value, (status) => {
                                        return openBlock(), createBlock("div", null, [
                                          createVNode(_component_v_radio, {
                                            value: status,
                                            label: status,
                                            "hide-details": ""
                                          }, null, 8, ["value", "label"])
                                        ]);
                                      }), 256))
                                    ]),
                                    _: 1
                                  }, 8, ["modelValue", "onUpdate:modelValue"])
                                ])
                              ]),
                              _: 1
                            })
                          ])
                        ]),
                        _: 1
                      })
                    ])) : createCommentVNode("", true)
                  ];
                }
              }),
              footer: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_sfc_main$2, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_sfc_main$6, { onClick: updateOrder }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`${ssrInterpolate(saveButtonText.value)}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(saveButtonText.value), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_sfc_main$7, { onClick: closeOrder }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`close`);
                            } else {
                              return [
                                createTextVNode("close")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_sfc_main$6, { onClick: updateOrder }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(saveButtonText.value), 1)
                            ]),
                            _: 1
                          }),
                          createVNode(_sfc_main$7, { onClick: closeOrder }, {
                            default: withCtx(() => [
                              createTextVNode("close")
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
                    createVNode(_sfc_main$2, null, {
                      default: withCtx(() => [
                        createVNode(_sfc_main$6, { onClick: updateOrder }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(saveButtonText.value), 1)
                          ]),
                          _: 1
                        }),
                        createVNode(_sfc_main$7, { onClick: closeOrder }, {
                          default: withCtx(() => [
                            createTextVNode("close")
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
              createVNode("div", { class: "flex flex-row flex-wrap gap-3 mb-5" }, [
                createVNode(_component_v_btn, {
                  onClick: withModifiers(($event) => _ctx.$inertia.visit(_ctx.route("team.orders")), ["prevent"])
                }, {
                  default: withCtx(() => [
                    createTextVNode(" Paid orders " + toDisplayString(`(${props.paid_count})`), 1)
                  ]),
                  _: 1
                }, 8, ["onClick"]),
                createVNode(_component_v_btn, {
                  onClick: withModifiers(($event) => _ctx.$inertia.visit(_ctx.route("team.orders_ready")), ["prevent"])
                }, {
                  default: withCtx(() => [
                    createTextVNode(" Ready orders " + toDisplayString(`(${props.ready_count})`), 1)
                  ]),
                  _: 1
                }, 8, ["onClick"]),
                createVNode(_component_v_btn, {
                  onClick: withModifiers(($event) => _ctx.$inertia.visit(_ctx.route("team.orders_completed")), ["prevent"])
                }, {
                  default: withCtx(() => [
                    createTextVNode(" Completed orders " + toDisplayString(`(${props.completed_count})`), 1)
                  ]),
                  _: 1
                }, 8, ["onClick"]),
                createVNode(_component_v_btn, {
                  onClick: withModifiers(($event) => _ctx.$inertia.visit(_ctx.route("team.orders_canceled")), ["prevent"])
                }, {
                  default: withCtx(() => [
                    createTextVNode(" Canceled orders " + toDisplayString(`(${props.canceled_count})`), 1)
                  ]),
                  _: 1
                }, 8, ["onClick"])
              ]),
              props.orders.data.length > 0 ? (openBlock(), createBlock("div", {
                key: 0,
                class: "flex flex-col gap-7 md:gap-3 text-sm"
              }, [
                (openBlock(true), createBlock(Fragment, null, renderList(props.orders.data, (order) => {
                  return openBlock(), createBlock(_component_v_card, null, {
                    default: withCtx(() => [
                      createVNode(_component_v_card_item, null, {
                        default: withCtx(() => [
                          createVNode(_sfc_main$1, {
                            cols: "2",
                            md: "2",
                            lg: "5",
                            xl: "5",
                            "2xl": "5",
                            gap: "2"
                          }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "flex flex-col justify-center bg-grey-lighten-3 p-2 col-span-2 lg:col-span-1" }, [
                                createVNode("div", null, [
                                  createVNode("strong", null, toDisplayString(order.initial) + toDisplayString(order.number) + " ", 1),
                                  createVNode("span", { class: "text-blue" }, "(" + toDisplayString(order.type) + ")", 1)
                                ]),
                                createVNode("p", null, [
                                  createVNode("span", null, toDisplayString(order.full_name ?? "No name"), 1),
                                  order.user_id ? (openBlock(), createBlock("span", { key: 0 }, " (" + toDisplayString(order.user.name) + ")", 1)) : (openBlock(), createBlock("span", { key: 1 }, " (guest)"))
                                ]),
                                createVNode("div", { class: "flex flex-row flex-wrap items-center gap-0" }, [
                                  createVNode("p", null, toDisplayString(order.email ?? "no email"), 1),
                                  order.phone ? (openBlock(), createBlock(_component_v_icon, { key: 0 }, {
                                    default: withCtx(() => [
                                      createTextVNode("mdi-circle-small")
                                    ]),
                                    _: 1
                                  })) : createCommentVNode("", true),
                                  order.phone ? (openBlock(), createBlock("p", { key: 1 }, toDisplayString(order.phone), 1)) : createCommentVNode("", true)
                                ])
                              ]),
                              createVNode("div", { class: "flex flex-col justify-center bg-grey-lighten-3 p-2" }, [
                                createVNode("p", { class: "font-bold" }, "Amount"),
                                createTextVNode(" $" + toDisplayString(order.amount), 1)
                              ]),
                              createVNode("div", { class: "flex flex-col justify-center bg-grey-lighten-3 p-2" }, [
                                createVNode(_sfc_main$2, {
                                  center: true,
                                  justify: "start"
                                }, {
                                  default: withCtx(() => [
                                    createVNode("p", { class: "font-bold" }, toDisplayString(order.type === "catering" ? "Pickup" : "Delivery"), 1),
                                    order.notes ? (openBlock(), createBlock(_component_v_icon, { key: 0 }, {
                                      default: withCtx(() => [
                                        createTextVNode("mdi-pencil-circle")
                                      ]),
                                      _: 1
                                    })) : createCommentVNode("", true)
                                  ]),
                                  _: 2
                                }, 1024),
                                createTextVNode(" " + toDisplayString(order.datetime_formatted), 1)
                              ]),
                              createVNode("div", { class: "flex flex-col justify-center bg-grey-lighten-3 p-2" }, [
                                createVNode("p", { class: "font-bold" }, "Items"),
                                createVNode("div", null, [
                                  createVNode(_component_v_btn, {
                                    onClick: withModifiers(($event) => openOrder(order), ["prevent"]),
                                    size: "small"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(order.total_quantity), 1)
                                    ]),
                                    _: 2
                                  }, 1032, ["onClick"])
                                ])
                              ]),
                              createVNode("div", { class: "uppercase flex flex-col justify-center bg-grey-lighten-3 p-2" }, [
                                createVNode("p", { class: "font-bold" }, "Status"),
                                createTextVNode(" " + toDisplayString(order.status) + " ", 1),
                                order.source === "custom" ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                                  createTextVNode(" (custom) ")
                                ], 64)) : createCommentVNode("", true)
                              ])
                            ]),
                            _: 2
                          }, 1024)
                        ]),
                        _: 2
                      }, 1024)
                    ]),
                    _: 2
                  }, 1024);
                }), 256)),
                createVNode("div", null, [
                  createVNode(_sfc_main$3, {
                    entities: props.orders
                  }, null, 8, ["entities"])
                ])
              ])) : (openBlock(), createBlock("div", { key: 1 }, [
                createVNode("p", null, "There are no orders to show here at the moment.")
              ])),
              createVNode(_sfc_main$4, {
                show: showOrderModal.value,
                onClose: closeOrder,
                maxWidth: "6xl"
              }, {
                title: withCtx(() => [
                  createTextVNode(toDisplayString(modalTitle.value), 1)
                ]),
                content: withCtx(() => [
                  selectedOrder.value ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "flex flex-col gap-3"
                  }, [
                    createVNode(_component_v_card, null, {
                      default: withCtx(() => [
                        createVNode("div", { class: "mb-5" }, [
                          createVNode("p", { class: "text-2xl font-bold mb-2" }, "Order summary"),
                          createVNode(_component_v_card, null, {
                            default: withCtx(() => [
                              createVNode("div", null, [
                                createVNode(_sfc_main$1, {
                                  cols: "2",
                                  md: "2",
                                  lg: "5",
                                  xl: "5",
                                  "2xl": "5",
                                  gap: "2"
                                }, {
                                  default: withCtx(() => [
                                    createVNode("div", { class: "flex flex-col justify-center bg-grey-lighten-3 p-2 col-span-2 lg:col-span-1" }, [
                                      createVNode("div", null, [
                                        createVNode("strong", null, toDisplayString(selectedOrder.value.initial) + toDisplayString(selectedOrder.value.number) + " ", 1),
                                        createVNode("span", { class: "text-blue" }, "(" + toDisplayString(selectedOrder.value.type) + ")", 1)
                                      ]),
                                      createVNode("p", null, [
                                        createVNode("span", null, toDisplayString(selectedOrder.value.full_name ?? "No name"), 1),
                                        selectedOrder.value.user_id ? (openBlock(), createBlock("span", { key: 0 }, " (" + toDisplayString(selectedOrder.value.user.name) + ")", 1)) : (openBlock(), createBlock("span", { key: 1 }, " (guest)"))
                                      ]),
                                      createVNode("div", null, [
                                        createVNode("p", null, toDisplayString(selectedOrder.value.email ?? "no email"), 1),
                                        selectedOrder.value.phone ? (openBlock(), createBlock("p", { key: 0 }, toDisplayString(selectedOrder.value.phone), 1)) : createCommentVNode("", true)
                                      ])
                                    ]),
                                    createVNode("div", { class: "flex flex-col justify-center bg-grey-lighten-3 p-2" }, [
                                      createVNode("p", { class: "font-bold" }, "Amount"),
                                      createTextVNode(" $" + toDisplayString(selectedOrder.value.amount), 1)
                                    ]),
                                    createVNode("div", { class: "flex flex-col justify-center bg-grey-lighten-3 p-2" }, [
                                      createVNode("p", { class: "font-bold" }, toDisplayString(selectedOrder.value.type === "catering" ? "Pickup" : "Delivery"), 1),
                                      createTextVNode(" " + toDisplayString(selectedOrder.value.datetime_formatted), 1)
                                    ]),
                                    createVNode("div", { class: "flex flex-col justify-center bg-grey-lighten-3 p-2" }, [
                                      createVNode("p", { class: "font-bold" }, "Items"),
                                      createVNode("div", null, [
                                        createVNode(_component_v_btn, {
                                          size: "small",
                                          color: "grey-darken-2"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(selectedOrder.value.total_quantity), 1)
                                          ]),
                                          _: 1
                                        })
                                      ])
                                    ]),
                                    createVNode("div", { class: "flex flex-col justify-center uppercase bg-grey-lighten-3 p-2" }, [
                                      createVNode("p", { class: "font-bold" }, "Status"),
                                      createTextVNode(" " + toDisplayString(selectedOrder.value.status) + " ", 1),
                                      selectedOrder.value.source === "custom" ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                                        createTextVNode(" (custom) ")
                                      ], 64)) : createCommentVNode("", true)
                                    ])
                                  ]),
                                  _: 1
                                })
                              ])
                            ]),
                            _: 1
                          })
                        ]),
                        createVNode("div", { class: "mb-5" }, [
                          createVNode("p", { class: "text-2xl font-bold mb-2" }, "Order notes"),
                          createVNode(_component_v_card, {
                            color: "grey-lighten-3",
                            rounded: "lg"
                          }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "p-4" }, [
                                editOrderNotes.value ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "mb-4"
                                }, [
                                  createVNode(_component_v_textarea, {
                                    modelValue: orderNotes.value,
                                    "onUpdate:modelValue": ($event) => orderNotes.value = $event,
                                    rows: "3",
                                    "auto-grow": "",
                                    "hide-details": ""
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ])) : selectedOrder.value.notes ? (openBlock(), createBlock("p", {
                                  key: 1,
                                  innerHTML: selectedOrder.value.notes_formatted
                                }, null, 8, ["innerHTML"])) : createCommentVNode("", true),
                                createVNode("div", { class: "mt-2" }, [
                                  createVNode(_sfc_main$2, {
                                    center: true,
                                    justify: "start"
                                  }, {
                                    default: withCtx(() => [
                                      editOrderNotes.value ? (openBlock(), createBlock("div", { key: 0 }, [
                                        createVNode(_component_v_btn, {
                                          size: "small",
                                          onClick: withModifiers(updateOrderNotes, ["prevent"])
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode("Save")
                                          ]),
                                          _: 1
                                        })
                                      ])) : createCommentVNode("", true),
                                      createVNode("div", null, [
                                        createVNode(_component_v_btn, {
                                          size: "small",
                                          variant: "outlined",
                                          onClick: withModifiers(toggleEditOrderNotes, ["prevent"])
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(editOrderNotes.value ? "Cancel" : "Edit notes"), 1)
                                          ]),
                                          _: 1
                                        })
                                      ])
                                    ]),
                                    _: 1
                                  })
                                ])
                              ])
                            ]),
                            _: 1
                          })
                        ]),
                        createVNode("p", { class: "text-2xl font-bold mb-2" }, "Order items"),
                        createVNode("div", null, [
                          createVNode(_sfc_main$5, { gap: "4" }, {
                            default: withCtx(() => [
                              (openBlock(true), createBlock(Fragment, null, renderList(selectedOrder.value.items, (item) => {
                                return openBlock(), createBlock("div", { class: "bg-grey-lighten-2 p-3" }, [
                                  createVNode("div", { class: "flex lg:flex-row items-center justify-start gap-3 w-full" }, [
                                    createVNode("div", { class: "hidden lg:flex shrink-0 w-[70px]" }, [
                                      createVNode(_component_v_img, {
                                        "aspect-ratio": "1",
                                        src: item.thumbnail,
                                        cover: ""
                                      }, null, 8, ["src"])
                                    ]),
                                    createVNode("div", { class: "grow" }, [
                                      createVNode(_sfc_main$1, {
                                        cols: "1",
                                        md: "5",
                                        lg: "5",
                                        xl: "5",
                                        "2xl": "5",
                                        gap: "1"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode("div", { class: "uppercase font-bold" }, toDisplayString(item.product_name), 1),
                                          createVNode("div", { class: "uppercase" }, toDisplayString(item.variation_name), 1),
                                          createVNode("div", { class: "uppercase" }, "$" + toDisplayString(item.variation_price), 1),
                                          createVNode("div", { class: "uppercase" }, toDisplayString(item.quantity), 1),
                                          createVNode("div", { class: "uppercase" }, "$" + toDisplayString(item.amount), 1)
                                        ]),
                                        _: 2
                                      }, 1024)
                                    ])
                                  ]),
                                  item.client_note ? (openBlock(), createBlock("div", {
                                    key: 0,
                                    class: "mt-2"
                                  }, [
                                    createVNode("p", { class: "text-red" }, "Client note"),
                                    createVNode(_component_v_textarea, {
                                      rows: "1",
                                      "auto-grow": "",
                                      "model-value": item.client_note,
                                      variant: "solo",
                                      flat: "",
                                      "bg-color": "red-lighten-3",
                                      "hide-details": "",
                                      readonly: ""
                                    }, null, 8, ["model-value"])
                                  ])) : createCommentVNode("", true)
                                ]);
                              }), 256))
                            ]),
                            _: 1
                          })
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(_sfc_main$1, {
                      cols: "1",
                      md: "2",
                      lg: "2",
                      xl: "2",
                      "2xl": "2"
                    }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "my-5 h-full bg-grey-lighten-2 px-3 py-2" }, [
                          createVNode("p", { class: "text-2xl font-bold mb-2" }, "Order status"),
                          createVNode(_component_v_card, { color: "grey-lighten-2" }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "p-1" }, [
                                createVNode(_component_v_radio_group, {
                                  modelValue: currentStatus.value,
                                  "onUpdate:modelValue": ($event) => currentStatus.value = $event,
                                  "hide-details": "",
                                  density: "comfortable"
                                }, {
                                  default: withCtx(() => [
                                    (openBlock(true), createBlock(Fragment, null, renderList(statuses.value, (status) => {
                                      return openBlock(), createBlock("div", null, [
                                        createVNode(_component_v_radio, {
                                          value: status,
                                          label: status,
                                          "hide-details": ""
                                        }, null, 8, ["value", "label"])
                                      ]);
                                    }), 256))
                                  ]),
                                  _: 1
                                }, 8, ["modelValue", "onUpdate:modelValue"])
                              ])
                            ]),
                            _: 1
                          })
                        ])
                      ]),
                      _: 1
                    })
                  ])) : createCommentVNode("", true)
                ]),
                footer: withCtx(() => [
                  createVNode(_sfc_main$2, null, {
                    default: withCtx(() => [
                      createVNode(_sfc_main$6, { onClick: updateOrder }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(saveButtonText.value), 1)
                        ]),
                        _: 1
                      }),
                      createVNode(_sfc_main$7, { onClick: closeOrder }, {
                        default: withCtx(() => [
                          createTextVNode("close")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["show"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Team/Orders/Home.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Home = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-dad6822f"]]);
export {
  Home as default
};
