import { ref, resolveComponent, mergeProps, withCtx, createTextVNode, toDisplayString, openBlock, createBlock, Fragment, renderList, createVNode, withModifiers, unref, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { A as AdmLayout } from "./BZf0ki2W-7956103712867.js";
import { useForm, router } from "@inertiajs/vue3";
import { a as _sfc_main$1, _ as _sfc_main$4 } from "./Cyl_ukyB-5873697610160.js";
import { _ as _sfc_main$3 } from "./D2KjorHx-1875739460561.js";
import { _ as _sfc_main$6 } from "./DsvTyKEu-3067955167518.js";
import { _ as _sfc_main$2 } from "./CeVcRmCk-1577655618930.js";
import "./koZmu1d6-1739686778130.js";
import _sfc_main$5 from "./DNhdppJ3-1804687613972.js";
import "./BW6cC8iL-1677159380657.js";
import "./kZV6a-x4-6055183876791.js";
import "./1tPrXgE0-4581736670159.js";
import "./C6q4kDV--1536774619085.js";
import "./DKEAH6nn-8515365770691.js";
import "mitt";
import "./BQTBzxda-1835617976051.js";
import "vuetify";
import "gsap";
import "gsap/ScrollTrigger.js";
import "gsap/ScrollSmoother.js";
import "./BPBs_0V9-9736651018597.js";
const _sfc_main = {
  __name: "Deliveries",
  __ssrInlineRender: true,
  props: {
    deliveries: Object,
    selected_status: String
  },
  setup(__props) {
    const props = __props;
    const orders = ref([]);
    const selectedDelivery = ref(null);
    const openDelivery = (delivery) => {
      selectedDelivery.value = delivery;
      axios.get(route("admin.open_delivery", { delivery: delivery.uid })).then((response) => {
        formDelivery.status = response.data.delivery.status;
        orders.value = response.data.orders;
        showDeliveryModal.value = true;
      }).catch((error) => {
        console.error(error);
      });
    };
    const formDelivery = useForm({
      status: "initial,"
    });
    const showDeliveryModal = ref(false);
    const closeDelivery = () => {
      showDeliveryModal.value = false;
    };
    const statuses = ["initial", "completed", "canceled"];
    const saveDelivery = () => {
      formDelivery.post(route("admin.update_delivery", { delivery: selectedDelivery.value.uid }), {
        onSuccess: () => {
          formDelivery.reset("status");
          closeDelivery();
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_v_btn = resolveComponent("v-btn");
      const _component_v_table = resolveComponent("v-table");
      const _component_v_card = resolveComponent("v-card");
      const _component_v_label = resolveComponent("v-label");
      const _component_v_radio_group = resolveComponent("v-radio-group");
      const _component_v_radio = resolveComponent("v-radio");
      _push(ssrRenderComponent(AdmLayout, mergeProps({ title: "Deliveries" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="mb-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              center: true,
              justify: "start"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(statuses, (status) => {
                    _push3(`<div${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_v_btn, {
                      variant: status === props.selected_status ? "flat" : "tonal",
                      onClick: ($event) => _ctx.$inertia.visit(_ctx.route("admin.deliveries", { status }))
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(status)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(status), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(`</div>`);
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(), createBlock(Fragment, null, renderList(statuses, (status) => {
                      return createVNode("div", null, [
                        createVNode(_component_v_btn, {
                          variant: status === props.selected_status ? "flat" : "tonal",
                          onClick: withModifiers(($event) => _ctx.$inertia.visit(_ctx.route("admin.deliveries", { status })), ["prevent"])
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(status), 1)
                          ]),
                          _: 2
                        }, 1032, ["variant", "onClick"])
                      ]);
                    }), 64))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="w-full"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_v_table, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<thead${_scopeId2}><tr${_scopeId2}><th${_scopeId2}>Name</th><th${_scopeId2}>Delivery</th><th${_scopeId2}>Addr 1</th><th${_scopeId2}>Addr 2</th><th${_scopeId2}>Post code</th><th${_scopeId2}>City</th><th${_scopeId2}>Email</th><th${_scopeId2}>Phone</th><th${_scopeId2}>Subscription</th><th${_scopeId2}>Status</th></tr></thead><tbody${_scopeId2}><!--[-->`);
                  ssrRenderList(props.deliveries.data, (delivery) => {
                    var _a;
                    _push3(`<tr${_scopeId2}><td${_scopeId2}><p${_scopeId2}>${ssrInterpolate(delivery.full_name)}</p></td><td${_scopeId2}><p${_scopeId2}>${ssrInterpolate(delivery.datetime_formatted)}</p></td><td${_scopeId2}><p${_scopeId2}>${ssrInterpolate(delivery.address_1 ?? "-")}</p></td><td${_scopeId2}><p${_scopeId2}>${ssrInterpolate(delivery.address_2 ?? "-")}</p></td><td${_scopeId2}><p${_scopeId2}>${ssrInterpolate(delivery.post_code ?? "-")}</p></td><td${_scopeId2}><p${_scopeId2}>${ssrInterpolate(delivery.city ?? "-")}</p></td><td${_scopeId2}><p${_scopeId2}>${ssrInterpolate(delivery.email ?? "-")}</p></td><td${_scopeId2}><p${_scopeId2}>${ssrInterpolate(delivery.phone ?? "-")}</p></td><td${_scopeId2}><p${_scopeId2}>${ssrInterpolate(((_a = delivery.subscription) == null ? void 0 : _a.status) ?? "-")}</p></td><td${_scopeId2}><div${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_v_btn, {
                      onClick: ($event) => openDelivery(delivery),
                      variant: "outlined",
                      size: "small"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(delivery.status)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(delivery.status), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(`</div></td></tr>`);
                  });
                  _push3(`<!--]--></tbody>`);
                } else {
                  return [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Name"),
                        createVNode("th", null, "Delivery"),
                        createVNode("th", null, "Addr 1"),
                        createVNode("th", null, "Addr 2"),
                        createVNode("th", null, "Post code"),
                        createVNode("th", null, "City"),
                        createVNode("th", null, "Email"),
                        createVNode("th", null, "Phone"),
                        createVNode("th", null, "Subscription"),
                        createVNode("th", null, "Status")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      (openBlock(true), createBlock(Fragment, null, renderList(props.deliveries.data, (delivery) => {
                        var _a;
                        return openBlock(), createBlock("tr", null, [
                          createVNode("td", null, [
                            createVNode("p", null, toDisplayString(delivery.full_name), 1)
                          ]),
                          createVNode("td", null, [
                            createVNode("p", null, toDisplayString(delivery.datetime_formatted), 1)
                          ]),
                          createVNode("td", null, [
                            createVNode("p", null, toDisplayString(delivery.address_1 ?? "-"), 1)
                          ]),
                          createVNode("td", null, [
                            createVNode("p", null, toDisplayString(delivery.address_2 ?? "-"), 1)
                          ]),
                          createVNode("td", null, [
                            createVNode("p", null, toDisplayString(delivery.post_code ?? "-"), 1)
                          ]),
                          createVNode("td", null, [
                            createVNode("p", null, toDisplayString(delivery.city ?? "-"), 1)
                          ]),
                          createVNode("td", null, [
                            createVNode("p", null, toDisplayString(delivery.email ?? "-"), 1)
                          ]),
                          createVNode("td", null, [
                            createVNode("p", null, toDisplayString(delivery.phone ?? "-"), 1)
                          ]),
                          createVNode("td", null, [
                            createVNode("p", null, toDisplayString(((_a = delivery.subscription) == null ? void 0 : _a.status) ?? "-"), 1)
                          ]),
                          createVNode("td", null, [
                            createVNode("div", null, [
                              createVNode(_component_v_btn, {
                                onClick: withModifiers(($event) => openDelivery(delivery), ["prevent"]),
                                variant: "outlined",
                                size: "small"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(delivery.status), 1)
                                ]),
                                _: 2
                              }, 1032, ["onClick"])
                            ])
                          ])
                        ]);
                      }), 256))
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="pagination"${_scopeId}><div class="flex justify-center mt-5 mb-3"${_scopeId}><span${_scopeId}>Page ${ssrInterpolate(props.deliveries.current_page)} of ${ssrInterpolate(props.deliveries.last_page)}</span></div><div class="flex justify-center"${_scopeId}>`);
            if (props.deliveries.prev_page_url) {
              _push2(ssrRenderComponent(_sfc_main$2, {
                class: "mx-2",
                onClick: ($event) => unref(router).visit(props.deliveries.prev_page_url + "&status=" + props.selected_status)
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Previous `);
                  } else {
                    return [
                      createTextVNode(" Previous ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            if (props.deliveries.next_page_url) {
              _push2(ssrRenderComponent(_sfc_main$2, {
                class: "mx-2",
                onClick: ($event) => unref(router).visit(props.deliveries.next_page_url + "&status=" + props.selected_status)
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Next `);
                  } else {
                    return [
                      createTextVNode(" Next ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              show: showDeliveryModal.value,
              onClose: closeDelivery
            }, {
              title: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Delivery `);
                } else {
                  return [
                    createTextVNode(" Delivery ")
                  ];
                }
              }),
              content: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_sfc_main$4, { gap: "4" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_sfc_main$4, { gap: "4" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              if (orders.value && orders.value.length > 0) {
                                _push5(ssrRenderComponent(_component_v_card, {
                                  color: "grey-lighten-1",
                                  rounded: "lg"
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`<div class="p-4"${_scopeId5}>`);
                                      _push6(ssrRenderComponent(_sfc_main$4, { gap: "3" }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`<!--[-->`);
                                            ssrRenderList(orders.value, (order) => {
                                              _push7(`<!--[-->`);
                                              if (order.type === "subscription") {
                                                _push7(ssrRenderComponent(_sfc_main$5, {
                                                  order,
                                                  title: "Subscription order"
                                                }, null, _parent7, _scopeId6));
                                              } else {
                                                _push7(`<!---->`);
                                              }
                                              _push7(`<!--]-->`);
                                            });
                                            _push7(`<!--]--><!--[-->`);
                                            ssrRenderList(orders.value, (order) => {
                                              _push7(`<!--[-->`);
                                              if (order.type === "add-on") {
                                                _push7(ssrRenderComponent(_sfc_main$5, {
                                                  order,
                                                  title: "Add-ons"
                                                }, null, _parent7, _scopeId6));
                                              } else {
                                                _push7(`<!---->`);
                                              }
                                              _push7(`<!--]-->`);
                                            });
                                            _push7(`<!--]-->`);
                                          } else {
                                            return [
                                              (openBlock(true), createBlock(Fragment, null, renderList(orders.value, (order) => {
                                                return openBlock(), createBlock(Fragment, null, [
                                                  order.type === "subscription" ? (openBlock(), createBlock(_sfc_main$5, {
                                                    key: 0,
                                                    order,
                                                    title: "Subscription order"
                                                  }, null, 8, ["order"])) : createCommentVNode("", true)
                                                ], 64);
                                              }), 256)),
                                              (openBlock(true), createBlock(Fragment, null, renderList(orders.value, (order) => {
                                                return openBlock(), createBlock(Fragment, null, [
                                                  order.type === "add-on" ? (openBlock(), createBlock(_sfc_main$5, {
                                                    key: 0,
                                                    order,
                                                    title: "Add-ons"
                                                  }, null, 8, ["order"])) : createCommentVNode("", true)
                                                ], 64);
                                              }), 256))
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                      _push6(`</div>`);
                                    } else {
                                      return [
                                        createVNode("div", { class: "p-4" }, [
                                          createVNode(_sfc_main$4, { gap: "3" }, {
                                            default: withCtx(() => [
                                              (openBlock(true), createBlock(Fragment, null, renderList(orders.value, (order) => {
                                                return openBlock(), createBlock(Fragment, null, [
                                                  order.type === "subscription" ? (openBlock(), createBlock(_sfc_main$5, {
                                                    key: 0,
                                                    order,
                                                    title: "Subscription order"
                                                  }, null, 8, ["order"])) : createCommentVNode("", true)
                                                ], 64);
                                              }), 256)),
                                              (openBlock(true), createBlock(Fragment, null, renderList(orders.value, (order) => {
                                                return openBlock(), createBlock(Fragment, null, [
                                                  order.type === "add-on" ? (openBlock(), createBlock(_sfc_main$5, {
                                                    key: 0,
                                                    order,
                                                    title: "Add-ons"
                                                  }, null, 8, ["order"])) : createCommentVNode("", true)
                                                ], 64);
                                              }), 256))
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
                                _push5(`<p${_scopeId4}>This delivery doesn&#39;t have any products.</p>`);
                              }
                            } else {
                              return [
                                orders.value && orders.value.length > 0 ? (openBlock(), createBlock(_component_v_card, {
                                  key: 0,
                                  color: "grey-lighten-1",
                                  rounded: "lg"
                                }, {
                                  default: withCtx(() => [
                                    createVNode("div", { class: "p-4" }, [
                                      createVNode(_sfc_main$4, { gap: "3" }, {
                                        default: withCtx(() => [
                                          (openBlock(true), createBlock(Fragment, null, renderList(orders.value, (order) => {
                                            return openBlock(), createBlock(Fragment, null, [
                                              order.type === "subscription" ? (openBlock(), createBlock(_sfc_main$5, {
                                                key: 0,
                                                order,
                                                title: "Subscription order"
                                              }, null, 8, ["order"])) : createCommentVNode("", true)
                                            ], 64);
                                          }), 256)),
                                          (openBlock(true), createBlock(Fragment, null, renderList(orders.value, (order) => {
                                            return openBlock(), createBlock(Fragment, null, [
                                              order.type === "add-on" ? (openBlock(), createBlock(_sfc_main$5, {
                                                key: 0,
                                                order,
                                                title: "Add-ons"
                                              }, null, 8, ["order"])) : createCommentVNode("", true)
                                            ], 64);
                                          }), 256))
                                        ]),
                                        _: 1
                                      })
                                    ])
                                  ]),
                                  _: 1
                                })) : (openBlock(), createBlock("p", { key: 1 }, "This delivery doesn't have any products."))
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_sfc_main$4, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_v_card, {
                                color: "grey-lighten-2",
                                rounded: "lg"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<div class="p-4"${_scopeId5}>`);
                                    _push6(ssrRenderComponent(_sfc_main$4, { gap: "2" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(_component_v_label, null, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(`Delivery status:`);
                                              } else {
                                                return [
                                                  createTextVNode("Delivery status:")
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                          _push7(ssrRenderComponent(_sfc_main$1, {
                                            center: true,
                                            justify: "start"
                                          }, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(ssrRenderComponent(_component_v_radio_group, {
                                                  inline: "",
                                                  modelValue: unref(formDelivery).status,
                                                  "onUpdate:modelValue": ($event) => unref(formDelivery).status = $event,
                                                  "hide-details": ""
                                                }, {
                                                  default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                    if (_push9) {
                                                      _push9(`<!--[-->`);
                                                      ssrRenderList(statuses, (status) => {
                                                        _push9(ssrRenderComponent(_component_v_radio, {
                                                          label: status,
                                                          value: status
                                                        }, null, _parent9, _scopeId8));
                                                      });
                                                      _push9(`<!--]-->`);
                                                    } else {
                                                      return [
                                                        (openBlock(), createBlock(Fragment, null, renderList(statuses, (status) => {
                                                          return createVNode(_component_v_radio, {
                                                            label: status,
                                                            value: status
                                                          }, null, 8, ["label", "value"]);
                                                        }), 64))
                                                      ];
                                                    }
                                                  }),
                                                  _: 1
                                                }, _parent8, _scopeId7));
                                              } else {
                                                return [
                                                  createVNode(_component_v_radio_group, {
                                                    inline: "",
                                                    modelValue: unref(formDelivery).status,
                                                    "onUpdate:modelValue": ($event) => unref(formDelivery).status = $event,
                                                    "hide-details": ""
                                                  }, {
                                                    default: withCtx(() => [
                                                      (openBlock(), createBlock(Fragment, null, renderList(statuses, (status) => {
                                                        return createVNode(_component_v_radio, {
                                                          label: status,
                                                          value: status
                                                        }, null, 8, ["label", "value"]);
                                                      }), 64))
                                                    ]),
                                                    _: 1
                                                  }, 8, ["modelValue", "onUpdate:modelValue"])
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(_component_v_label, null, {
                                              default: withCtx(() => [
                                                createTextVNode("Delivery status:")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_sfc_main$1, {
                                              center: true,
                                              justify: "start"
                                            }, {
                                              default: withCtx(() => [
                                                createVNode(_component_v_radio_group, {
                                                  inline: "",
                                                  modelValue: unref(formDelivery).status,
                                                  "onUpdate:modelValue": ($event) => unref(formDelivery).status = $event,
                                                  "hide-details": ""
                                                }, {
                                                  default: withCtx(() => [
                                                    (openBlock(), createBlock(Fragment, null, renderList(statuses, (status) => {
                                                      return createVNode(_component_v_radio, {
                                                        label: status,
                                                        value: status
                                                      }, null, 8, ["label", "value"]);
                                                    }), 64))
                                                  ]),
                                                  _: 1
                                                }, 8, ["modelValue", "onUpdate:modelValue"])
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
                                    return [
                                      createVNode("div", { class: "p-4" }, [
                                        createVNode(_sfc_main$4, { gap: "2" }, {
                                          default: withCtx(() => [
                                            createVNode(_component_v_label, null, {
                                              default: withCtx(() => [
                                                createTextVNode("Delivery status:")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_sfc_main$1, {
                                              center: true,
                                              justify: "start"
                                            }, {
                                              default: withCtx(() => [
                                                createVNode(_component_v_radio_group, {
                                                  inline: "",
                                                  modelValue: unref(formDelivery).status,
                                                  "onUpdate:modelValue": ($event) => unref(formDelivery).status = $event,
                                                  "hide-details": ""
                                                }, {
                                                  default: withCtx(() => [
                                                    (openBlock(), createBlock(Fragment, null, renderList(statuses, (status) => {
                                                      return createVNode(_component_v_radio, {
                                                        label: status,
                                                        value: status
                                                      }, null, 8, ["label", "value"]);
                                                    }), 64))
                                                  ]),
                                                  _: 1
                                                }, 8, ["modelValue", "onUpdate:modelValue"])
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
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_v_card, {
                                  color: "grey-lighten-2",
                                  rounded: "lg"
                                }, {
                                  default: withCtx(() => [
                                    createVNode("div", { class: "p-4" }, [
                                      createVNode(_sfc_main$4, { gap: "2" }, {
                                        default: withCtx(() => [
                                          createVNode(_component_v_label, null, {
                                            default: withCtx(() => [
                                              createTextVNode("Delivery status:")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_sfc_main$1, {
                                            center: true,
                                            justify: "start"
                                          }, {
                                            default: withCtx(() => [
                                              createVNode(_component_v_radio_group, {
                                                inline: "",
                                                modelValue: unref(formDelivery).status,
                                                "onUpdate:modelValue": ($event) => unref(formDelivery).status = $event,
                                                "hide-details": ""
                                              }, {
                                                default: withCtx(() => [
                                                  (openBlock(), createBlock(Fragment, null, renderList(statuses, (status) => {
                                                    return createVNode(_component_v_radio, {
                                                      label: status,
                                                      value: status
                                                    }, null, 8, ["label", "value"]);
                                                  }), 64))
                                                ]),
                                                _: 1
                                              }, 8, ["modelValue", "onUpdate:modelValue"])
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
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_sfc_main$4, { gap: "4" }, {
                            default: withCtx(() => [
                              orders.value && orders.value.length > 0 ? (openBlock(), createBlock(_component_v_card, {
                                key: 0,
                                color: "grey-lighten-1",
                                rounded: "lg"
                              }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "p-4" }, [
                                    createVNode(_sfc_main$4, { gap: "3" }, {
                                      default: withCtx(() => [
                                        (openBlock(true), createBlock(Fragment, null, renderList(orders.value, (order) => {
                                          return openBlock(), createBlock(Fragment, null, [
                                            order.type === "subscription" ? (openBlock(), createBlock(_sfc_main$5, {
                                              key: 0,
                                              order,
                                              title: "Subscription order"
                                            }, null, 8, ["order"])) : createCommentVNode("", true)
                                          ], 64);
                                        }), 256)),
                                        (openBlock(true), createBlock(Fragment, null, renderList(orders.value, (order) => {
                                          return openBlock(), createBlock(Fragment, null, [
                                            order.type === "add-on" ? (openBlock(), createBlock(_sfc_main$5, {
                                              key: 0,
                                              order,
                                              title: "Add-ons"
                                            }, null, 8, ["order"])) : createCommentVNode("", true)
                                          ], 64);
                                        }), 256))
                                      ]),
                                      _: 1
                                    })
                                  ])
                                ]),
                                _: 1
                              })) : (openBlock(), createBlock("p", { key: 1 }, "This delivery doesn't have any products."))
                            ]),
                            _: 1
                          }),
                          createVNode(_sfc_main$4, null, {
                            default: withCtx(() => [
                              createVNode(_component_v_card, {
                                color: "grey-lighten-2",
                                rounded: "lg"
                              }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "p-4" }, [
                                    createVNode(_sfc_main$4, { gap: "2" }, {
                                      default: withCtx(() => [
                                        createVNode(_component_v_label, null, {
                                          default: withCtx(() => [
                                            createTextVNode("Delivery status:")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_sfc_main$1, {
                                          center: true,
                                          justify: "start"
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(_component_v_radio_group, {
                                              inline: "",
                                              modelValue: unref(formDelivery).status,
                                              "onUpdate:modelValue": ($event) => unref(formDelivery).status = $event,
                                              "hide-details": ""
                                            }, {
                                              default: withCtx(() => [
                                                (openBlock(), createBlock(Fragment, null, renderList(statuses, (status) => {
                                                  return createVNode(_component_v_radio, {
                                                    label: status,
                                                    value: status
                                                  }, null, 8, ["label", "value"]);
                                                }), 64))
                                              ]),
                                              _: 1
                                            }, 8, ["modelValue", "onUpdate:modelValue"])
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
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_sfc_main$4, { gap: "4" }, {
                      default: withCtx(() => [
                        createVNode(_sfc_main$4, { gap: "4" }, {
                          default: withCtx(() => [
                            orders.value && orders.value.length > 0 ? (openBlock(), createBlock(_component_v_card, {
                              key: 0,
                              color: "grey-lighten-1",
                              rounded: "lg"
                            }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "p-4" }, [
                                  createVNode(_sfc_main$4, { gap: "3" }, {
                                    default: withCtx(() => [
                                      (openBlock(true), createBlock(Fragment, null, renderList(orders.value, (order) => {
                                        return openBlock(), createBlock(Fragment, null, [
                                          order.type === "subscription" ? (openBlock(), createBlock(_sfc_main$5, {
                                            key: 0,
                                            order,
                                            title: "Subscription order"
                                          }, null, 8, ["order"])) : createCommentVNode("", true)
                                        ], 64);
                                      }), 256)),
                                      (openBlock(true), createBlock(Fragment, null, renderList(orders.value, (order) => {
                                        return openBlock(), createBlock(Fragment, null, [
                                          order.type === "add-on" ? (openBlock(), createBlock(_sfc_main$5, {
                                            key: 0,
                                            order,
                                            title: "Add-ons"
                                          }, null, 8, ["order"])) : createCommentVNode("", true)
                                        ], 64);
                                      }), 256))
                                    ]),
                                    _: 1
                                  })
                                ])
                              ]),
                              _: 1
                            })) : (openBlock(), createBlock("p", { key: 1 }, "This delivery doesn't have any products."))
                          ]),
                          _: 1
                        }),
                        createVNode(_sfc_main$4, null, {
                          default: withCtx(() => [
                            createVNode(_component_v_card, {
                              color: "grey-lighten-2",
                              rounded: "lg"
                            }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "p-4" }, [
                                  createVNode(_sfc_main$4, { gap: "2" }, {
                                    default: withCtx(() => [
                                      createVNode(_component_v_label, null, {
                                        default: withCtx(() => [
                                          createTextVNode("Delivery status:")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_sfc_main$1, {
                                        center: true,
                                        justify: "start"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(_component_v_radio_group, {
                                            inline: "",
                                            modelValue: unref(formDelivery).status,
                                            "onUpdate:modelValue": ($event) => unref(formDelivery).status = $event,
                                            "hide-details": ""
                                          }, {
                                            default: withCtx(() => [
                                              (openBlock(), createBlock(Fragment, null, renderList(statuses, (status) => {
                                                return createVNode(_component_v_radio, {
                                                  label: status,
                                                  value: status
                                                }, null, 8, ["label", "value"]);
                                              }), 64))
                                            ]),
                                            _: 1
                                          }, 8, ["modelValue", "onUpdate:modelValue"])
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
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              footer: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_sfc_main$6, {
                    disabled: unref(formDelivery).processing,
                    onClick: saveDelivery,
                    class: "me-3"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Save`);
                      } else {
                        return [
                          createTextVNode("Save")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_sfc_main$2, { onClick: closeDelivery }, {
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
                } else {
                  return [
                    createVNode(_sfc_main$6, {
                      disabled: unref(formDelivery).processing,
                      onClick: saveDelivery,
                      class: "me-3"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Save")
                      ]),
                      _: 1
                    }, 8, ["disabled"]),
                    createVNode(_sfc_main$2, { onClick: closeDelivery }, {
                      default: withCtx(() => [
                        createTextVNode("Close")
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
              createVNode("div", { class: "mb-4" }, [
                createVNode(_sfc_main$1, {
                  center: true,
                  justify: "start"
                }, {
                  default: withCtx(() => [
                    (openBlock(), createBlock(Fragment, null, renderList(statuses, (status) => {
                      return createVNode("div", null, [
                        createVNode(_component_v_btn, {
                          variant: status === props.selected_status ? "flat" : "tonal",
                          onClick: withModifiers(($event) => _ctx.$inertia.visit(_ctx.route("admin.deliveries", { status })), ["prevent"])
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(status), 1)
                          ]),
                          _: 2
                        }, 1032, ["variant", "onClick"])
                      ]);
                    }), 64))
                  ]),
                  _: 1
                })
              ]),
              createVNode("div", { class: "w-full" }, [
                createVNode(_component_v_table, null, {
                  default: withCtx(() => [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Name"),
                        createVNode("th", null, "Delivery"),
                        createVNode("th", null, "Addr 1"),
                        createVNode("th", null, "Addr 2"),
                        createVNode("th", null, "Post code"),
                        createVNode("th", null, "City"),
                        createVNode("th", null, "Email"),
                        createVNode("th", null, "Phone"),
                        createVNode("th", null, "Subscription"),
                        createVNode("th", null, "Status")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      (openBlock(true), createBlock(Fragment, null, renderList(props.deliveries.data, (delivery) => {
                        var _a;
                        return openBlock(), createBlock("tr", null, [
                          createVNode("td", null, [
                            createVNode("p", null, toDisplayString(delivery.full_name), 1)
                          ]),
                          createVNode("td", null, [
                            createVNode("p", null, toDisplayString(delivery.datetime_formatted), 1)
                          ]),
                          createVNode("td", null, [
                            createVNode("p", null, toDisplayString(delivery.address_1 ?? "-"), 1)
                          ]),
                          createVNode("td", null, [
                            createVNode("p", null, toDisplayString(delivery.address_2 ?? "-"), 1)
                          ]),
                          createVNode("td", null, [
                            createVNode("p", null, toDisplayString(delivery.post_code ?? "-"), 1)
                          ]),
                          createVNode("td", null, [
                            createVNode("p", null, toDisplayString(delivery.city ?? "-"), 1)
                          ]),
                          createVNode("td", null, [
                            createVNode("p", null, toDisplayString(delivery.email ?? "-"), 1)
                          ]),
                          createVNode("td", null, [
                            createVNode("p", null, toDisplayString(delivery.phone ?? "-"), 1)
                          ]),
                          createVNode("td", null, [
                            createVNode("p", null, toDisplayString(((_a = delivery.subscription) == null ? void 0 : _a.status) ?? "-"), 1)
                          ]),
                          createVNode("td", null, [
                            createVNode("div", null, [
                              createVNode(_component_v_btn, {
                                onClick: withModifiers(($event) => openDelivery(delivery), ["prevent"]),
                                variant: "outlined",
                                size: "small"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(delivery.status), 1)
                                ]),
                                _: 2
                              }, 1032, ["onClick"])
                            ])
                          ])
                        ]);
                      }), 256))
                    ])
                  ]),
                  _: 1
                }),
                createVNode("div", { class: "pagination" }, [
                  createVNode("div", { class: "flex justify-center mt-5 mb-3" }, [
                    createVNode("span", null, "Page " + toDisplayString(props.deliveries.current_page) + " of " + toDisplayString(props.deliveries.last_page), 1)
                  ]),
                  createVNode("div", { class: "flex justify-center" }, [
                    props.deliveries.prev_page_url ? (openBlock(), createBlock(_sfc_main$2, {
                      key: 0,
                      class: "mx-2",
                      onClick: ($event) => unref(router).visit(props.deliveries.prev_page_url + "&status=" + props.selected_status)
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Previous ")
                      ]),
                      _: 1
                    }, 8, ["onClick"])) : createCommentVNode("", true),
                    props.deliveries.next_page_url ? (openBlock(), createBlock(_sfc_main$2, {
                      key: 1,
                      class: "mx-2",
                      onClick: ($event) => unref(router).visit(props.deliveries.next_page_url + "&status=" + props.selected_status)
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Next ")
                      ]),
                      _: 1
                    }, 8, ["onClick"])) : createCommentVNode("", true)
                  ])
                ])
              ]),
              createVNode(_sfc_main$3, {
                show: showDeliveryModal.value,
                onClose: closeDelivery
              }, {
                title: withCtx(() => [
                  createTextVNode(" Delivery ")
                ]),
                content: withCtx(() => [
                  createVNode(_sfc_main$4, { gap: "4" }, {
                    default: withCtx(() => [
                      createVNode(_sfc_main$4, { gap: "4" }, {
                        default: withCtx(() => [
                          orders.value && orders.value.length > 0 ? (openBlock(), createBlock(_component_v_card, {
                            key: 0,
                            color: "grey-lighten-1",
                            rounded: "lg"
                          }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "p-4" }, [
                                createVNode(_sfc_main$4, { gap: "3" }, {
                                  default: withCtx(() => [
                                    (openBlock(true), createBlock(Fragment, null, renderList(orders.value, (order) => {
                                      return openBlock(), createBlock(Fragment, null, [
                                        order.type === "subscription" ? (openBlock(), createBlock(_sfc_main$5, {
                                          key: 0,
                                          order,
                                          title: "Subscription order"
                                        }, null, 8, ["order"])) : createCommentVNode("", true)
                                      ], 64);
                                    }), 256)),
                                    (openBlock(true), createBlock(Fragment, null, renderList(orders.value, (order) => {
                                      return openBlock(), createBlock(Fragment, null, [
                                        order.type === "add-on" ? (openBlock(), createBlock(_sfc_main$5, {
                                          key: 0,
                                          order,
                                          title: "Add-ons"
                                        }, null, 8, ["order"])) : createCommentVNode("", true)
                                      ], 64);
                                    }), 256))
                                  ]),
                                  _: 1
                                })
                              ])
                            ]),
                            _: 1
                          })) : (openBlock(), createBlock("p", { key: 1 }, "This delivery doesn't have any products."))
                        ]),
                        _: 1
                      }),
                      createVNode(_sfc_main$4, null, {
                        default: withCtx(() => [
                          createVNode(_component_v_card, {
                            color: "grey-lighten-2",
                            rounded: "lg"
                          }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "p-4" }, [
                                createVNode(_sfc_main$4, { gap: "2" }, {
                                  default: withCtx(() => [
                                    createVNode(_component_v_label, null, {
                                      default: withCtx(() => [
                                        createTextVNode("Delivery status:")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_sfc_main$1, {
                                      center: true,
                                      justify: "start"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(_component_v_radio_group, {
                                          inline: "",
                                          modelValue: unref(formDelivery).status,
                                          "onUpdate:modelValue": ($event) => unref(formDelivery).status = $event,
                                          "hide-details": ""
                                        }, {
                                          default: withCtx(() => [
                                            (openBlock(), createBlock(Fragment, null, renderList(statuses, (status) => {
                                              return createVNode(_component_v_radio, {
                                                label: status,
                                                value: status
                                              }, null, 8, ["label", "value"]);
                                            }), 64))
                                          ]),
                                          _: 1
                                        }, 8, ["modelValue", "onUpdate:modelValue"])
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
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                footer: withCtx(() => [
                  createVNode(_sfc_main$6, {
                    disabled: unref(formDelivery).processing,
                    onClick: saveDelivery,
                    class: "me-3"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Save")
                    ]),
                    _: 1
                  }, 8, ["disabled"]),
                  createVNode(_sfc_main$2, { onClick: closeDelivery }, {
                    default: withCtx(() => [
                      createTextVNode("Close")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Subscriptions/Deliveries.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
