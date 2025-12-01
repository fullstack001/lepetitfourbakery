import { ref, reactive, resolveComponent, mergeProps, withCtx, unref, createTextVNode, createVNode, toDisplayString, openBlock, createBlock, Fragment, createCommentVNode, withModifiers, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { A as AdmLayout } from "./Bmk57_E8-5341323707321.js";
import { Head, router } from "@inertiajs/vue3";
import { a as _sfc_main$2 } from "./Cyl_ukyB-3352317127354.js";
import { _ as _sfc_main$1 } from "./BFeg_3wS-5313717233245.js";
import { _ as _sfc_main$3 } from "./DsvTyKEu-3355343127127.js";
import { _ as _sfc_main$4 } from "./CeVcRmCk-1453137522733.js";
import { _ as _export_sfc } from "./1tPrXgE0-1751246333532.js";
import "./BW6cC8iL-1754723312335.js";
import "./kZV6a-x4-2437327355113.js";
import "./C6q4kDV--4257163313235.js";
import "./DKEAH6nn-4333751172235.js";
import "mitt";
const _sfc_main = {
  __name: "Home",
  __ssrInlineRender: true,
  props: {
    subscriptions: Object,
    errors: Object
  },
  setup(__props) {
    const props = __props;
    const showSubscriptionModal = ref(false);
    const selectedSubscription = ref(null);
    const modalTitle = ref(null);
    const saveButtonText = ref(null);
    const isDelivered = ref(false);
    const canOpen = ref(true);
    const openSubscription = (subscription = null) => {
      if (subscription && canOpen.value) {
        modalTitle.value = "View subscription";
        selectedSubscription.value = { ...subscription };
        isDelivered.value = false;
      } else {
        return 0;
      }
      canOpen.value = false;
      saveButtonText.value = "Update subscription";
      showSubscriptionModal.value = true;
    };
    const closeSubscription = () => {
      showSubscriptionModal.value = false;
      setTimeout(() => {
        selectedSubscription.value = null;
        canOpen.value = true;
      }, 500);
    };
    const updateSubscription = () => {
      if (isDelivered.value) {
        let url;
        if (selectedSubscription.value) {
          url = route("admin.update_subscription_status", { subscription: selectedSubscription.value.uid });
        } else {
          return 0;
        }
        router.post(url, {
          delivered: true
        }, {
          preserveScroll: true,
          preserveState: true,
          onSuccess: (page) => {
            closeSubscription();
          },
          onError: (error) => {
            console.log(error);
          }
        });
      }
    };
    const addressForm = reactive({
      full_name: "",
      address_1: "",
      address_2: "",
      post_code: "",
      city: "",
      phone: ""
    });
    const showAddressForm = ref(false);
    const toggleEditAddress = () => {
      if (showAddressForm.value) {
        showAddressForm.value = false;
        Object.assign(addressForm, {
          full_name: "",
          address_1: "",
          address_2: "",
          post_code: "",
          city: "",
          phone: ""
        });
      } else {
        const user = { ...selectedSubscription.value.user };
        Object.assign(addressForm, {
          full_name: user.full_name,
          address_1: user.address_1,
          address_2: user.address_2,
          post_code: user.post_code,
          city: user.city,
          phone: user.phone
        });
        showAddressForm.value = true;
      }
    };
    const local_errors = ref({});
    const saveAddress = () => {
      if (showAddressForm.value) {
        router.post(route("admin.update_delivery_address", { subscription: selectedSubscription.value.uid }), addressForm, {
          preserveScroll: true,
          preserveState: true,
          onSuccess: (page) => {
            const updatedSubscription = props.subscriptions.data.find(
              (subscription) => subscription.uid === selectedSubscription.value.uid
            );
            if (updatedSubscription) {
              selectedSubscription.value = updatedSubscription;
            }
            showAddressForm.value = false;
          },
          onError: (error) => {
            local_errors.value = props.errors;
          }
        });
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_v_card = resolveComponent("v-card");
      const _component_v_card_item = resolveComponent("v-card-item");
      const _component_v_table = resolveComponent("v-table");
      const _component_v_btn = resolveComponent("v-btn");
      resolveComponent("v-checkbox");
      const _component_v_label = resolveComponent("v-label");
      const _component_v_text_field = resolveComponent("v-text-field");
      _push(ssrRenderComponent(AdmLayout, mergeProps({ title: "Subscriptions" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Subscriptions" }, null, _parent2, _scopeId));
            if (props.subscriptions.data.length > 0) {
              _push2(`<div class="flex flex-col gap-3" data-v-fb2ea25d${_scopeId}><!--[-->`);
              ssrRenderList(props.subscriptions.data, (subscription) => {
                _push2(ssrRenderComponent(_component_v_card, null, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_component_v_card_item, null, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(_component_v_table, null, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`<thead data-v-fb2ea25d${_scopeId4}><tr data-v-fb2ea25d${_scopeId4}><th data-v-fb2ea25d${_scopeId4}>Client</th><th data-v-fb2ea25d${_scopeId4}>Next delivery</th><th data-v-fb2ea25d${_scopeId4}>Recipient</th><th data-v-fb2ea25d${_scopeId4}>Plan</th><th data-v-fb2ea25d${_scopeId4}></th></tr></thead><tbody data-v-fb2ea25d${_scopeId4}><tr data-v-fb2ea25d${_scopeId4}><td data-v-fb2ea25d${_scopeId4}>${ssrInterpolate(subscription.user.name)}<br data-v-fb2ea25d${_scopeId4}>${ssrInterpolate(subscription.user.email)}</td><td data-v-fb2ea25d${_scopeId4}>${ssrInterpolate(subscription.next_delivery_formatted)}</td><td data-v-fb2ea25d${_scopeId4}>`);
                                  if (subscription.delivery) {
                                    _push5(`<!--[--><p data-v-fb2ea25d${_scopeId4}>${ssrInterpolate(subscription.delivery.full_name)}</p><p data-v-fb2ea25d${_scopeId4}>${ssrInterpolate(subscription.delivery.address_1)}</p>`);
                                    if (subscription.delivery.address_2) {
                                      _push5(`<p data-v-fb2ea25d${_scopeId4}>${ssrInterpolate(subscription.delivery.address_2)}</p>`);
                                    } else {
                                      _push5(`<!---->`);
                                    }
                                    _push5(`<p data-v-fb2ea25d${_scopeId4}>${ssrInterpolate(`${subscription.delivery.city} - ${subscription.delivery.post_code}`)}</p><p data-v-fb2ea25d${_scopeId4}>${ssrInterpolate(subscription.delivery.phone)}</p><!--]-->`);
                                  } else {
                                    _push5(`<!---->`);
                                  }
                                  _push5(`</td><td data-v-fb2ea25d${_scopeId4}>${ssrInterpolate(subscription.plan.name)}</td><td data-v-fb2ea25d${_scopeId4}>`);
                                  _push5(ssrRenderComponent(_component_v_btn, {
                                    onClick: ($event) => openSubscription(subscription),
                                    size: "small"
                                  }, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`View`);
                                      } else {
                                        return [
                                          createTextVNode("View")
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                  _push5(`</td></tr></tbody>`);
                                } else {
                                  return [
                                    createVNode("thead", null, [
                                      createVNode("tr", null, [
                                        createVNode("th", null, "Client"),
                                        createVNode("th", null, "Next delivery"),
                                        createVNode("th", null, "Recipient"),
                                        createVNode("th", null, "Plan"),
                                        createVNode("th")
                                      ])
                                    ]),
                                    createVNode("tbody", null, [
                                      createVNode("tr", null, [
                                        createVNode("td", null, [
                                          createTextVNode(toDisplayString(subscription.user.name), 1),
                                          createVNode("br"),
                                          createTextVNode(toDisplayString(subscription.user.email), 1)
                                        ]),
                                        createVNode("td", null, toDisplayString(subscription.next_delivery_formatted), 1),
                                        createVNode("td", null, [
                                          subscription.delivery ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                                            createVNode("p", null, toDisplayString(subscription.delivery.full_name), 1),
                                            createVNode("p", null, toDisplayString(subscription.delivery.address_1), 1),
                                            subscription.delivery.address_2 ? (openBlock(), createBlock("p", { key: 0 }, toDisplayString(subscription.delivery.address_2), 1)) : createCommentVNode("", true),
                                            createVNode("p", null, toDisplayString(`${subscription.delivery.city} - ${subscription.delivery.post_code}`), 1),
                                            createVNode("p", null, toDisplayString(subscription.delivery.phone), 1)
                                          ], 64)) : createCommentVNode("", true)
                                        ]),
                                        createVNode("td", null, toDisplayString(subscription.plan.name), 1),
                                        createVNode("td", null, [
                                          createVNode(_component_v_btn, {
                                            onClick: withModifiers(($event) => openSubscription(subscription), ["prevent"]),
                                            size: "small"
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode("View")
                                            ]),
                                            _: 2
                                          }, 1032, ["onClick"])
                                        ])
                                      ])
                                    ])
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                          } else {
                            return [
                              createVNode(_component_v_table, null, {
                                default: withCtx(() => [
                                  createVNode("thead", null, [
                                    createVNode("tr", null, [
                                      createVNode("th", null, "Client"),
                                      createVNode("th", null, "Next delivery"),
                                      createVNode("th", null, "Recipient"),
                                      createVNode("th", null, "Plan"),
                                      createVNode("th")
                                    ])
                                  ]),
                                  createVNode("tbody", null, [
                                    createVNode("tr", null, [
                                      createVNode("td", null, [
                                        createTextVNode(toDisplayString(subscription.user.name), 1),
                                        createVNode("br"),
                                        createTextVNode(toDisplayString(subscription.user.email), 1)
                                      ]),
                                      createVNode("td", null, toDisplayString(subscription.next_delivery_formatted), 1),
                                      createVNode("td", null, [
                                        subscription.delivery ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                                          createVNode("p", null, toDisplayString(subscription.delivery.full_name), 1),
                                          createVNode("p", null, toDisplayString(subscription.delivery.address_1), 1),
                                          subscription.delivery.address_2 ? (openBlock(), createBlock("p", { key: 0 }, toDisplayString(subscription.delivery.address_2), 1)) : createCommentVNode("", true),
                                          createVNode("p", null, toDisplayString(`${subscription.delivery.city} - ${subscription.delivery.post_code}`), 1),
                                          createVNode("p", null, toDisplayString(subscription.delivery.phone), 1)
                                        ], 64)) : createCommentVNode("", true)
                                      ]),
                                      createVNode("td", null, toDisplayString(subscription.plan.name), 1),
                                      createVNode("td", null, [
                                        createVNode(_component_v_btn, {
                                          onClick: withModifiers(($event) => openSubscription(subscription), ["prevent"]),
                                          size: "small"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode("View")
                                          ]),
                                          _: 2
                                        }, 1032, ["onClick"])
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
                      }, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(_component_v_card_item, null, {
                          default: withCtx(() => [
                            createVNode(_component_v_table, null, {
                              default: withCtx(() => [
                                createVNode("thead", null, [
                                  createVNode("tr", null, [
                                    createVNode("th", null, "Client"),
                                    createVNode("th", null, "Next delivery"),
                                    createVNode("th", null, "Recipient"),
                                    createVNode("th", null, "Plan"),
                                    createVNode("th")
                                  ])
                                ]),
                                createVNode("tbody", null, [
                                  createVNode("tr", null, [
                                    createVNode("td", null, [
                                      createTextVNode(toDisplayString(subscription.user.name), 1),
                                      createVNode("br"),
                                      createTextVNode(toDisplayString(subscription.user.email), 1)
                                    ]),
                                    createVNode("td", null, toDisplayString(subscription.next_delivery_formatted), 1),
                                    createVNode("td", null, [
                                      subscription.delivery ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                                        createVNode("p", null, toDisplayString(subscription.delivery.full_name), 1),
                                        createVNode("p", null, toDisplayString(subscription.delivery.address_1), 1),
                                        subscription.delivery.address_2 ? (openBlock(), createBlock("p", { key: 0 }, toDisplayString(subscription.delivery.address_2), 1)) : createCommentVNode("", true),
                                        createVNode("p", null, toDisplayString(`${subscription.delivery.city} - ${subscription.delivery.post_code}`), 1),
                                        createVNode("p", null, toDisplayString(subscription.delivery.phone), 1)
                                      ], 64)) : createCommentVNode("", true)
                                    ]),
                                    createVNode("td", null, toDisplayString(subscription.plan.name), 1),
                                    createVNode("td", null, [
                                      createVNode(_component_v_btn, {
                                        onClick: withModifiers(($event) => openSubscription(subscription), ["prevent"]),
                                        size: "small"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode("View")
                                        ]),
                                        _: 2
                                      }, 1032, ["onClick"])
                                    ])
                                  ])
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
              _push2(`<!--]--></div>`);
            } else {
              _push2(`<div data-v-fb2ea25d${_scopeId}><p data-v-fb2ea25d${_scopeId}>There are no subscriptions to show here at the moment.</p></div>`);
            }
            _push2(ssrRenderComponent(_sfc_main$1, {
              show: showSubscriptionModal.value,
              onClose: closeSubscription,
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
                  if (selectedSubscription.value) {
                    _push3(`<div class="flex flex-col gap-3" data-v-fb2ea25d${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_v_card, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<div class="mb-10" data-v-fb2ea25d${_scopeId3}><p class="text-lg font-bold" data-v-fb2ea25d${_scopeId3}>Subscription information:</p>`);
                          _push4(ssrRenderComponent(_component_v_table, null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<thead data-v-fb2ea25d${_scopeId4}><tr data-v-fb2ea25d${_scopeId4}><th data-v-fb2ea25d${_scopeId4}>Client</th><th data-v-fb2ea25d${_scopeId4}>Next delivery</th><th data-v-fb2ea25d${_scopeId4}>Recipient</th><th data-v-fb2ea25d${_scopeId4}>Plan</th></tr></thead><tbody data-v-fb2ea25d${_scopeId4}><tr data-v-fb2ea25d${_scopeId4}><td data-v-fb2ea25d${_scopeId4}>${ssrInterpolate(selectedSubscription.value.user.name)}<br data-v-fb2ea25d${_scopeId4}>${ssrInterpolate(selectedSubscription.value.user.email)}</td><td data-v-fb2ea25d${_scopeId4}>${ssrInterpolate(selectedSubscription.value.next_delivery_formatted)}</td><td data-v-fb2ea25d${_scopeId4}>`);
                                if (selectedSubscription.value.delivery) {
                                  _push5(`<!--[--><p data-v-fb2ea25d${_scopeId4}>${ssrInterpolate(selectedSubscription.value.delivery.full_name)}</p><p data-v-fb2ea25d${_scopeId4}>${ssrInterpolate(selectedSubscription.value.delivery.address_1)}</p>`);
                                  if (selectedSubscription.value.delivery.address_2) {
                                    _push5(`<p data-v-fb2ea25d${_scopeId4}>${ssrInterpolate(selectedSubscription.value.delivery.address_2)}</p>`);
                                  } else {
                                    _push5(`<!---->`);
                                  }
                                  _push5(`<p data-v-fb2ea25d${_scopeId4}>${ssrInterpolate(`${selectedSubscription.value.delivery.city} - ${selectedSubscription.value.delivery.post_code}`)}</p><p data-v-fb2ea25d${_scopeId4}>${ssrInterpolate(selectedSubscription.value.delivery.phone)}</p><!--]-->`);
                                } else {
                                  _push5(`<!---->`);
                                }
                                _push5(`</td><td data-v-fb2ea25d${_scopeId4}>${ssrInterpolate(selectedSubscription.value.plan.name)}</td></tr></tbody>`);
                              } else {
                                return [
                                  createVNode("thead", null, [
                                    createVNode("tr", null, [
                                      createVNode("th", null, "Client"),
                                      createVNode("th", null, "Next delivery"),
                                      createVNode("th", null, "Recipient"),
                                      createVNode("th", null, "Plan")
                                    ])
                                  ]),
                                  createVNode("tbody", null, [
                                    createVNode("tr", null, [
                                      createVNode("td", null, [
                                        createTextVNode(toDisplayString(selectedSubscription.value.user.name), 1),
                                        createVNode("br"),
                                        createTextVNode(toDisplayString(selectedSubscription.value.user.email), 1)
                                      ]),
                                      createVNode("td", null, toDisplayString(selectedSubscription.value.next_delivery_formatted), 1),
                                      createVNode("td", null, [
                                        selectedSubscription.value.delivery ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                                          createVNode("p", null, toDisplayString(selectedSubscription.value.delivery.full_name), 1),
                                          createVNode("p", null, toDisplayString(selectedSubscription.value.delivery.address_1), 1),
                                          selectedSubscription.value.delivery.address_2 ? (openBlock(), createBlock("p", { key: 0 }, toDisplayString(selectedSubscription.value.delivery.address_2), 1)) : createCommentVNode("", true),
                                          createVNode("p", null, toDisplayString(`${selectedSubscription.value.delivery.city} - ${selectedSubscription.value.delivery.post_code}`), 1),
                                          createVNode("p", null, toDisplayString(selectedSubscription.value.delivery.phone), 1)
                                        ], 64)) : createCommentVNode("", true)
                                      ]),
                                      createVNode("td", null, toDisplayString(selectedSubscription.value.plan.name), 1)
                                    ])
                                  ])
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(`</div><div data-v-fb2ea25d${_scopeId3}><p class="text-lg font-bold" data-v-fb2ea25d${_scopeId3}>List of products</p>`);
                          _push4(ssrRenderComponent(_component_v_table, null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<tbody data-v-fb2ea25d${_scopeId4}>`);
                                if (selectedSubscription.value.plan.has_customization) {
                                  _push5(`<!--[-->`);
                                  ssrRenderList(selectedSubscription.value.user.premium_subscription_items, (product) => {
                                    _push5(`<tr data-v-fb2ea25d${_scopeId4}><td class="uppercase" data-v-fb2ea25d${_scopeId4}>${ssrInterpolate(product.product.name)} (${ssrInterpolate(product.variation.name)})</td><td class="lowercase" data-v-fb2ea25d${_scopeId4}>x${ssrInterpolate(product.quantity)}</td></tr>`);
                                  });
                                  _push5(`<!--]-->`);
                                } else {
                                  _push5(`<!--[-->`);
                                  ssrRenderList(selectedSubscription.value.plan.products, (product) => {
                                    _push5(`<tr data-v-fb2ea25d${_scopeId4}><td class="uppercase" data-v-fb2ea25d${_scopeId4}>${ssrInterpolate(product.name)}</td><td class="lowercase" data-v-fb2ea25d${_scopeId4}>x${ssrInterpolate(product.pivot.quantity)}</td></tr>`);
                                  });
                                  _push5(`<!--]-->`);
                                }
                                _push5(`</tbody>`);
                              } else {
                                return [
                                  createVNode("tbody", null, [
                                    selectedSubscription.value.plan.has_customization ? (openBlock(true), createBlock(Fragment, { key: 0 }, renderList(selectedSubscription.value.user.premium_subscription_items, (product) => {
                                      return openBlock(), createBlock("tr", null, [
                                        createVNode("td", { class: "uppercase" }, toDisplayString(product.product.name) + " (" + toDisplayString(product.variation.name) + ")", 1),
                                        createVNode("td", { class: "lowercase" }, "x" + toDisplayString(product.quantity), 1)
                                      ]);
                                    }), 256)) : (openBlock(true), createBlock(Fragment, { key: 1 }, renderList(selectedSubscription.value.plan.products, (product) => {
                                      return openBlock(), createBlock("tr", null, [
                                        createVNode("td", { class: "uppercase" }, toDisplayString(product.name), 1),
                                        createVNode("td", { class: "lowercase" }, "x" + toDisplayString(product.pivot.quantity), 1)
                                      ]);
                                    }), 256))
                                  ])
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(`</div>`);
                          if (selectedSubscription.value.delivery_addon_items.length) {
                            _push4(`<div class="mt-5" data-v-fb2ea25d${_scopeId3}><p class="text-lg font-bold" data-v-fb2ea25d${_scopeId3}>List of add-on products</p>`);
                            _push4(ssrRenderComponent(_component_v_table, null, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`<tbody data-v-fb2ea25d${_scopeId4}><!--[-->`);
                                  ssrRenderList(selectedSubscription.value.delivery_addon_items, (item) => {
                                    _push5(`<tr data-v-fb2ea25d${_scopeId4}><td class="uppercase" data-v-fb2ea25d${_scopeId4}>${ssrInterpolate(item.product_name)} (${ssrInterpolate(item.variation_name)})</td><td class="lowercase" data-v-fb2ea25d${_scopeId4}>x${ssrInterpolate(item.quantity)}</td></tr>`);
                                  });
                                  _push5(`<!--]--></tbody>`);
                                } else {
                                  return [
                                    createVNode("tbody", null, [
                                      (openBlock(true), createBlock(Fragment, null, renderList(selectedSubscription.value.delivery_addon_items, (item) => {
                                        return openBlock(), createBlock("tr", null, [
                                          createVNode("td", { class: "uppercase" }, toDisplayString(item.product_name) + " (" + toDisplayString(item.variation_name) + ")", 1),
                                          createVNode("td", { class: "lowercase" }, "x" + toDisplayString(item.quantity), 1)
                                        ]);
                                      }), 256))
                                    ])
                                  ];
                                }
                              }),
                              _: 1
                            }, _parent4, _scopeId3));
                            _push4(`</div>`);
                          } else {
                            _push4(`<!---->`);
                          }
                          {
                            _push4(`<!---->`);
                          }
                        } else {
                          return [
                            createVNode("div", { class: "mb-10" }, [
                              createVNode("p", { class: "text-lg font-bold" }, "Subscription information:"),
                              createVNode(_component_v_table, null, {
                                default: withCtx(() => [
                                  createVNode("thead", null, [
                                    createVNode("tr", null, [
                                      createVNode("th", null, "Client"),
                                      createVNode("th", null, "Next delivery"),
                                      createVNode("th", null, "Recipient"),
                                      createVNode("th", null, "Plan")
                                    ])
                                  ]),
                                  createVNode("tbody", null, [
                                    createVNode("tr", null, [
                                      createVNode("td", null, [
                                        createTextVNode(toDisplayString(selectedSubscription.value.user.name), 1),
                                        createVNode("br"),
                                        createTextVNode(toDisplayString(selectedSubscription.value.user.email), 1)
                                      ]),
                                      createVNode("td", null, toDisplayString(selectedSubscription.value.next_delivery_formatted), 1),
                                      createVNode("td", null, [
                                        selectedSubscription.value.delivery ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                                          createVNode("p", null, toDisplayString(selectedSubscription.value.delivery.full_name), 1),
                                          createVNode("p", null, toDisplayString(selectedSubscription.value.delivery.address_1), 1),
                                          selectedSubscription.value.delivery.address_2 ? (openBlock(), createBlock("p", { key: 0 }, toDisplayString(selectedSubscription.value.delivery.address_2), 1)) : createCommentVNode("", true),
                                          createVNode("p", null, toDisplayString(`${selectedSubscription.value.delivery.city} - ${selectedSubscription.value.delivery.post_code}`), 1),
                                          createVNode("p", null, toDisplayString(selectedSubscription.value.delivery.phone), 1)
                                        ], 64)) : createCommentVNode("", true)
                                      ]),
                                      createVNode("td", null, toDisplayString(selectedSubscription.value.plan.name), 1)
                                    ])
                                  ])
                                ]),
                                _: 1
                              })
                            ]),
                            createVNode("div", null, [
                              createVNode("p", { class: "text-lg font-bold" }, "List of products"),
                              createVNode(_component_v_table, null, {
                                default: withCtx(() => [
                                  createVNode("tbody", null, [
                                    selectedSubscription.value.plan.has_customization ? (openBlock(true), createBlock(Fragment, { key: 0 }, renderList(selectedSubscription.value.user.premium_subscription_items, (product) => {
                                      return openBlock(), createBlock("tr", null, [
                                        createVNode("td", { class: "uppercase" }, toDisplayString(product.product.name) + " (" + toDisplayString(product.variation.name) + ")", 1),
                                        createVNode("td", { class: "lowercase" }, "x" + toDisplayString(product.quantity), 1)
                                      ]);
                                    }), 256)) : (openBlock(true), createBlock(Fragment, { key: 1 }, renderList(selectedSubscription.value.plan.products, (product) => {
                                      return openBlock(), createBlock("tr", null, [
                                        createVNode("td", { class: "uppercase" }, toDisplayString(product.name), 1),
                                        createVNode("td", { class: "lowercase" }, "x" + toDisplayString(product.pivot.quantity), 1)
                                      ]);
                                    }), 256))
                                  ])
                                ]),
                                _: 1
                              })
                            ]),
                            selectedSubscription.value.delivery_addon_items.length ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "mt-5"
                            }, [
                              createVNode("p", { class: "text-lg font-bold" }, "List of add-on products"),
                              createVNode(_component_v_table, null, {
                                default: withCtx(() => [
                                  createVNode("tbody", null, [
                                    (openBlock(true), createBlock(Fragment, null, renderList(selectedSubscription.value.delivery_addon_items, (item) => {
                                      return openBlock(), createBlock("tr", null, [
                                        createVNode("td", { class: "uppercase" }, toDisplayString(item.product_name) + " (" + toDisplayString(item.variation_name) + ")", 1),
                                        createVNode("td", { class: "lowercase" }, "x" + toDisplayString(item.quantity), 1)
                                      ]);
                                    }), 256))
                                  ])
                                ]),
                                _: 1
                              })
                            ])) : createCommentVNode("", true),
                            createCommentVNode("", true)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`<div class="mb-6 w-full text-center" data-v-fb2ea25d${_scopeId2}>`);
                    if (showAddressForm.value) {
                      _push3(`<div class="max-w-xl mx-auto mb-5" data-v-fb2ea25d${_scopeId2}><div class="w-full" data-v-fb2ea25d${_scopeId2}>`);
                      _push3(ssrRenderComponent(_component_v_label, null, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`Full name`);
                          } else {
                            return [
                              createTextVNode("Full name")
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                      _push3(ssrRenderComponent(_component_v_text_field, {
                        modelValue: addressForm.full_name,
                        "onUpdate:modelValue": ($event) => addressForm.full_name = $event,
                        "error-messages": local_errors.value.full_name
                      }, null, _parent3, _scopeId2));
                      _push3(`</div><div class="w-full" data-v-fb2ea25d${_scopeId2}>`);
                      _push3(ssrRenderComponent(_component_v_label, null, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`Address line 1`);
                          } else {
                            return [
                              createTextVNode("Address line 1")
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                      _push3(ssrRenderComponent(_component_v_text_field, {
                        modelValue: addressForm.address_1,
                        "onUpdate:modelValue": ($event) => addressForm.address_1 = $event,
                        "error-messages": local_errors.value.address_1
                      }, null, _parent3, _scopeId2));
                      _push3(`</div><div class="w-full" data-v-fb2ea25d${_scopeId2}>`);
                      _push3(ssrRenderComponent(_component_v_label, null, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`Address line 2`);
                          } else {
                            return [
                              createTextVNode("Address line 2")
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                      _push3(ssrRenderComponent(_component_v_text_field, {
                        modelValue: addressForm.address_2,
                        "onUpdate:modelValue": ($event) => addressForm.address_2 = $event,
                        "error-messages": local_errors.value.address_2
                      }, null, _parent3, _scopeId2));
                      _push3(`</div><div class="w-full" data-v-fb2ea25d${_scopeId2}>`);
                      _push3(ssrRenderComponent(_component_v_label, null, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`Post code`);
                          } else {
                            return [
                              createTextVNode("Post code")
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                      _push3(ssrRenderComponent(_component_v_text_field, {
                        modelValue: addressForm.post_code,
                        "onUpdate:modelValue": ($event) => addressForm.post_code = $event,
                        "error-messages": local_errors.value.post_code
                      }, null, _parent3, _scopeId2));
                      _push3(`</div><div class="w-full" data-v-fb2ea25d${_scopeId2}>`);
                      _push3(ssrRenderComponent(_component_v_label, null, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`City`);
                          } else {
                            return [
                              createTextVNode("City")
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                      _push3(ssrRenderComponent(_component_v_text_field, {
                        modelValue: addressForm.city,
                        "onUpdate:modelValue": ($event) => addressForm.city = $event,
                        "error-messages": local_errors.value.city
                      }, null, _parent3, _scopeId2));
                      _push3(`</div><div class="w-full" data-v-fb2ea25d${_scopeId2}>`);
                      _push3(ssrRenderComponent(_component_v_label, null, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`Phone`);
                          } else {
                            return [
                              createTextVNode("Phone")
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                      _push3(ssrRenderComponent(_component_v_text_field, {
                        modelValue: addressForm.phone,
                        "onUpdate:modelValue": ($event) => addressForm.phone = $event,
                        "error-messages": local_errors.value.phone
                      }, null, _parent3, _scopeId2));
                      _push3(`</div><div class="w-full" data-v-fb2ea25d${_scopeId2}><p data-v-fb2ea25d${_scopeId2}>This will update the user&#39;s current address as well as this delivery&#39;s address</p></div></div>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`<div class="flex flex-row flex-wrap gap-3 justify-center" data-v-fb2ea25d${_scopeId2}>`);
                    if (showAddressForm.value) {
                      _push3(ssrRenderComponent(_component_v_btn, {
                        onClick: saveAddress,
                        color: "grey",
                        variant: "outlined"
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`Save delivery address`);
                          } else {
                            return [
                              createTextVNode("Save delivery address")
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(ssrRenderComponent(_component_v_btn, {
                      onClick: toggleEditAddress,
                      variant: "plain"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(showAddressForm.value ? "Hide" : "Show")} user address form`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(showAddressForm.value ? "Hide" : "Show") + " user address form", 1)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`</div></div></div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    selectedSubscription.value ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "flex flex-col gap-3"
                    }, [
                      createVNode(_component_v_card, null, {
                        default: withCtx(() => [
                          createVNode("div", { class: "mb-10" }, [
                            createVNode("p", { class: "text-lg font-bold" }, "Subscription information:"),
                            createVNode(_component_v_table, null, {
                              default: withCtx(() => [
                                createVNode("thead", null, [
                                  createVNode("tr", null, [
                                    createVNode("th", null, "Client"),
                                    createVNode("th", null, "Next delivery"),
                                    createVNode("th", null, "Recipient"),
                                    createVNode("th", null, "Plan")
                                  ])
                                ]),
                                createVNode("tbody", null, [
                                  createVNode("tr", null, [
                                    createVNode("td", null, [
                                      createTextVNode(toDisplayString(selectedSubscription.value.user.name), 1),
                                      createVNode("br"),
                                      createTextVNode(toDisplayString(selectedSubscription.value.user.email), 1)
                                    ]),
                                    createVNode("td", null, toDisplayString(selectedSubscription.value.next_delivery_formatted), 1),
                                    createVNode("td", null, [
                                      selectedSubscription.value.delivery ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                                        createVNode("p", null, toDisplayString(selectedSubscription.value.delivery.full_name), 1),
                                        createVNode("p", null, toDisplayString(selectedSubscription.value.delivery.address_1), 1),
                                        selectedSubscription.value.delivery.address_2 ? (openBlock(), createBlock("p", { key: 0 }, toDisplayString(selectedSubscription.value.delivery.address_2), 1)) : createCommentVNode("", true),
                                        createVNode("p", null, toDisplayString(`${selectedSubscription.value.delivery.city} - ${selectedSubscription.value.delivery.post_code}`), 1),
                                        createVNode("p", null, toDisplayString(selectedSubscription.value.delivery.phone), 1)
                                      ], 64)) : createCommentVNode("", true)
                                    ]),
                                    createVNode("td", null, toDisplayString(selectedSubscription.value.plan.name), 1)
                                  ])
                                ])
                              ]),
                              _: 1
                            })
                          ]),
                          createVNode("div", null, [
                            createVNode("p", { class: "text-lg font-bold" }, "List of products"),
                            createVNode(_component_v_table, null, {
                              default: withCtx(() => [
                                createVNode("tbody", null, [
                                  selectedSubscription.value.plan.has_customization ? (openBlock(true), createBlock(Fragment, { key: 0 }, renderList(selectedSubscription.value.user.premium_subscription_items, (product) => {
                                    return openBlock(), createBlock("tr", null, [
                                      createVNode("td", { class: "uppercase" }, toDisplayString(product.product.name) + " (" + toDisplayString(product.variation.name) + ")", 1),
                                      createVNode("td", { class: "lowercase" }, "x" + toDisplayString(product.quantity), 1)
                                    ]);
                                  }), 256)) : (openBlock(true), createBlock(Fragment, { key: 1 }, renderList(selectedSubscription.value.plan.products, (product) => {
                                    return openBlock(), createBlock("tr", null, [
                                      createVNode("td", { class: "uppercase" }, toDisplayString(product.name), 1),
                                      createVNode("td", { class: "lowercase" }, "x" + toDisplayString(product.pivot.quantity), 1)
                                    ]);
                                  }), 256))
                                ])
                              ]),
                              _: 1
                            })
                          ]),
                          selectedSubscription.value.delivery_addon_items.length ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "mt-5"
                          }, [
                            createVNode("p", { class: "text-lg font-bold" }, "List of add-on products"),
                            createVNode(_component_v_table, null, {
                              default: withCtx(() => [
                                createVNode("tbody", null, [
                                  (openBlock(true), createBlock(Fragment, null, renderList(selectedSubscription.value.delivery_addon_items, (item) => {
                                    return openBlock(), createBlock("tr", null, [
                                      createVNode("td", { class: "uppercase" }, toDisplayString(item.product_name) + " (" + toDisplayString(item.variation_name) + ")", 1),
                                      createVNode("td", { class: "lowercase" }, "x" + toDisplayString(item.quantity), 1)
                                    ]);
                                  }), 256))
                                ])
                              ]),
                              _: 1
                            })
                          ])) : createCommentVNode("", true),
                          createCommentVNode("", true)
                        ]),
                        _: 1
                      }),
                      createVNode("div", { class: "mb-6 w-full text-center" }, [
                        showAddressForm.value ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "max-w-xl mx-auto mb-5"
                        }, [
                          createVNode("div", { class: "w-full" }, [
                            createVNode(_component_v_label, null, {
                              default: withCtx(() => [
                                createTextVNode("Full name")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_v_text_field, {
                              modelValue: addressForm.full_name,
                              "onUpdate:modelValue": ($event) => addressForm.full_name = $event,
                              "error-messages": local_errors.value.full_name
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                          ]),
                          createVNode("div", { class: "w-full" }, [
                            createVNode(_component_v_label, null, {
                              default: withCtx(() => [
                                createTextVNode("Address line 1")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_v_text_field, {
                              modelValue: addressForm.address_1,
                              "onUpdate:modelValue": ($event) => addressForm.address_1 = $event,
                              "error-messages": local_errors.value.address_1
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                          ]),
                          createVNode("div", { class: "w-full" }, [
                            createVNode(_component_v_label, null, {
                              default: withCtx(() => [
                                createTextVNode("Address line 2")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_v_text_field, {
                              modelValue: addressForm.address_2,
                              "onUpdate:modelValue": ($event) => addressForm.address_2 = $event,
                              "error-messages": local_errors.value.address_2
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                          ]),
                          createVNode("div", { class: "w-full" }, [
                            createVNode(_component_v_label, null, {
                              default: withCtx(() => [
                                createTextVNode("Post code")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_v_text_field, {
                              modelValue: addressForm.post_code,
                              "onUpdate:modelValue": ($event) => addressForm.post_code = $event,
                              "error-messages": local_errors.value.post_code
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                          ]),
                          createVNode("div", { class: "w-full" }, [
                            createVNode(_component_v_label, null, {
                              default: withCtx(() => [
                                createTextVNode("City")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_v_text_field, {
                              modelValue: addressForm.city,
                              "onUpdate:modelValue": ($event) => addressForm.city = $event,
                              "error-messages": local_errors.value.city
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                          ]),
                          createVNode("div", { class: "w-full" }, [
                            createVNode(_component_v_label, null, {
                              default: withCtx(() => [
                                createTextVNode("Phone")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_v_text_field, {
                              modelValue: addressForm.phone,
                              "onUpdate:modelValue": ($event) => addressForm.phone = $event,
                              "error-messages": local_errors.value.phone
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                          ]),
                          createVNode("div", { class: "w-full" }, [
                            createVNode("p", null, "This will update the user's current address as well as this delivery's address")
                          ])
                        ])) : createCommentVNode("", true),
                        createVNode("div", { class: "flex flex-row flex-wrap gap-3 justify-center" }, [
                          showAddressForm.value ? (openBlock(), createBlock(_component_v_btn, {
                            key: 0,
                            onClick: withModifiers(saveAddress, ["prevent"]),
                            color: "grey",
                            variant: "outlined"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Save delivery address")
                            ]),
                            _: 1
                          })) : createCommentVNode("", true),
                          createVNode(_component_v_btn, {
                            onClick: withModifiers(toggleEditAddress, ["prevent"]),
                            variant: "plain"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(showAddressForm.value ? "Hide" : "Show") + " user address form", 1)
                            ]),
                            _: 1
                          })
                        ])
                      ])
                    ])) : createCommentVNode("", true)
                  ];
                }
              }),
              footer: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_sfc_main$2, {
                    center: true,
                    justify: "between"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_sfc_main$3, { onClick: updateSubscription }, {
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
                        _push4(ssrRenderComponent(_sfc_main$4, { onClick: closeSubscription }, {
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
                          createVNode(_sfc_main$3, { onClick: updateSubscription }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(saveButtonText.value), 1)
                            ]),
                            _: 1
                          }),
                          createVNode(_sfc_main$4, { onClick: closeSubscription }, {
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
                    createVNode(_sfc_main$2, {
                      center: true,
                      justify: "between"
                    }, {
                      default: withCtx(() => [
                        createVNode(_sfc_main$3, { onClick: updateSubscription }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(saveButtonText.value), 1)
                          ]),
                          _: 1
                        }),
                        createVNode(_sfc_main$4, { onClick: closeSubscription }, {
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
              createVNode(unref(Head), { title: "Subscriptions" }),
              props.subscriptions.data.length > 0 ? (openBlock(), createBlock("div", {
                key: 0,
                class: "flex flex-col gap-3"
              }, [
                (openBlock(true), createBlock(Fragment, null, renderList(props.subscriptions.data, (subscription) => {
                  return openBlock(), createBlock(_component_v_card, null, {
                    default: withCtx(() => [
                      createVNode(_component_v_card_item, null, {
                        default: withCtx(() => [
                          createVNode(_component_v_table, null, {
                            default: withCtx(() => [
                              createVNode("thead", null, [
                                createVNode("tr", null, [
                                  createVNode("th", null, "Client"),
                                  createVNode("th", null, "Next delivery"),
                                  createVNode("th", null, "Recipient"),
                                  createVNode("th", null, "Plan"),
                                  createVNode("th")
                                ])
                              ]),
                              createVNode("tbody", null, [
                                createVNode("tr", null, [
                                  createVNode("td", null, [
                                    createTextVNode(toDisplayString(subscription.user.name), 1),
                                    createVNode("br"),
                                    createTextVNode(toDisplayString(subscription.user.email), 1)
                                  ]),
                                  createVNode("td", null, toDisplayString(subscription.next_delivery_formatted), 1),
                                  createVNode("td", null, [
                                    subscription.delivery ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                                      createVNode("p", null, toDisplayString(subscription.delivery.full_name), 1),
                                      createVNode("p", null, toDisplayString(subscription.delivery.address_1), 1),
                                      subscription.delivery.address_2 ? (openBlock(), createBlock("p", { key: 0 }, toDisplayString(subscription.delivery.address_2), 1)) : createCommentVNode("", true),
                                      createVNode("p", null, toDisplayString(`${subscription.delivery.city} - ${subscription.delivery.post_code}`), 1),
                                      createVNode("p", null, toDisplayString(subscription.delivery.phone), 1)
                                    ], 64)) : createCommentVNode("", true)
                                  ]),
                                  createVNode("td", null, toDisplayString(subscription.plan.name), 1),
                                  createVNode("td", null, [
                                    createVNode(_component_v_btn, {
                                      onClick: withModifiers(($event) => openSubscription(subscription), ["prevent"]),
                                      size: "small"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode("View")
                                      ]),
                                      _: 2
                                    }, 1032, ["onClick"])
                                  ])
                                ])
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
                }), 256))
              ])) : (openBlock(), createBlock("div", { key: 1 }, [
                createVNode("p", null, "There are no subscriptions to show here at the moment.")
              ])),
              createVNode(_sfc_main$1, {
                show: showSubscriptionModal.value,
                onClose: closeSubscription,
                maxWidth: "6xl"
              }, {
                title: withCtx(() => [
                  createTextVNode(toDisplayString(modalTitle.value), 1)
                ]),
                content: withCtx(() => [
                  selectedSubscription.value ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "flex flex-col gap-3"
                  }, [
                    createVNode(_component_v_card, null, {
                      default: withCtx(() => [
                        createVNode("div", { class: "mb-10" }, [
                          createVNode("p", { class: "text-lg font-bold" }, "Subscription information:"),
                          createVNode(_component_v_table, null, {
                            default: withCtx(() => [
                              createVNode("thead", null, [
                                createVNode("tr", null, [
                                  createVNode("th", null, "Client"),
                                  createVNode("th", null, "Next delivery"),
                                  createVNode("th", null, "Recipient"),
                                  createVNode("th", null, "Plan")
                                ])
                              ]),
                              createVNode("tbody", null, [
                                createVNode("tr", null, [
                                  createVNode("td", null, [
                                    createTextVNode(toDisplayString(selectedSubscription.value.user.name), 1),
                                    createVNode("br"),
                                    createTextVNode(toDisplayString(selectedSubscription.value.user.email), 1)
                                  ]),
                                  createVNode("td", null, toDisplayString(selectedSubscription.value.next_delivery_formatted), 1),
                                  createVNode("td", null, [
                                    selectedSubscription.value.delivery ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                                      createVNode("p", null, toDisplayString(selectedSubscription.value.delivery.full_name), 1),
                                      createVNode("p", null, toDisplayString(selectedSubscription.value.delivery.address_1), 1),
                                      selectedSubscription.value.delivery.address_2 ? (openBlock(), createBlock("p", { key: 0 }, toDisplayString(selectedSubscription.value.delivery.address_2), 1)) : createCommentVNode("", true),
                                      createVNode("p", null, toDisplayString(`${selectedSubscription.value.delivery.city} - ${selectedSubscription.value.delivery.post_code}`), 1),
                                      createVNode("p", null, toDisplayString(selectedSubscription.value.delivery.phone), 1)
                                    ], 64)) : createCommentVNode("", true)
                                  ]),
                                  createVNode("td", null, toDisplayString(selectedSubscription.value.plan.name), 1)
                                ])
                              ])
                            ]),
                            _: 1
                          })
                        ]),
                        createVNode("div", null, [
                          createVNode("p", { class: "text-lg font-bold" }, "List of products"),
                          createVNode(_component_v_table, null, {
                            default: withCtx(() => [
                              createVNode("tbody", null, [
                                selectedSubscription.value.plan.has_customization ? (openBlock(true), createBlock(Fragment, { key: 0 }, renderList(selectedSubscription.value.user.premium_subscription_items, (product) => {
                                  return openBlock(), createBlock("tr", null, [
                                    createVNode("td", { class: "uppercase" }, toDisplayString(product.product.name) + " (" + toDisplayString(product.variation.name) + ")", 1),
                                    createVNode("td", { class: "lowercase" }, "x" + toDisplayString(product.quantity), 1)
                                  ]);
                                }), 256)) : (openBlock(true), createBlock(Fragment, { key: 1 }, renderList(selectedSubscription.value.plan.products, (product) => {
                                  return openBlock(), createBlock("tr", null, [
                                    createVNode("td", { class: "uppercase" }, toDisplayString(product.name), 1),
                                    createVNode("td", { class: "lowercase" }, "x" + toDisplayString(product.pivot.quantity), 1)
                                  ]);
                                }), 256))
                              ])
                            ]),
                            _: 1
                          })
                        ]),
                        selectedSubscription.value.delivery_addon_items.length ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "mt-5"
                        }, [
                          createVNode("p", { class: "text-lg font-bold" }, "List of add-on products"),
                          createVNode(_component_v_table, null, {
                            default: withCtx(() => [
                              createVNode("tbody", null, [
                                (openBlock(true), createBlock(Fragment, null, renderList(selectedSubscription.value.delivery_addon_items, (item) => {
                                  return openBlock(), createBlock("tr", null, [
                                    createVNode("td", { class: "uppercase" }, toDisplayString(item.product_name) + " (" + toDisplayString(item.variation_name) + ")", 1),
                                    createVNode("td", { class: "lowercase" }, "x" + toDisplayString(item.quantity), 1)
                                  ]);
                                }), 256))
                              ])
                            ]),
                            _: 1
                          })
                        ])) : createCommentVNode("", true),
                        createCommentVNode("", true)
                      ]),
                      _: 1
                    }),
                    createVNode("div", { class: "mb-6 w-full text-center" }, [
                      showAddressForm.value ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "max-w-xl mx-auto mb-5"
                      }, [
                        createVNode("div", { class: "w-full" }, [
                          createVNode(_component_v_label, null, {
                            default: withCtx(() => [
                              createTextVNode("Full name")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_v_text_field, {
                            modelValue: addressForm.full_name,
                            "onUpdate:modelValue": ($event) => addressForm.full_name = $event,
                            "error-messages": local_errors.value.full_name
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                        ]),
                        createVNode("div", { class: "w-full" }, [
                          createVNode(_component_v_label, null, {
                            default: withCtx(() => [
                              createTextVNode("Address line 1")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_v_text_field, {
                            modelValue: addressForm.address_1,
                            "onUpdate:modelValue": ($event) => addressForm.address_1 = $event,
                            "error-messages": local_errors.value.address_1
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                        ]),
                        createVNode("div", { class: "w-full" }, [
                          createVNode(_component_v_label, null, {
                            default: withCtx(() => [
                              createTextVNode("Address line 2")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_v_text_field, {
                            modelValue: addressForm.address_2,
                            "onUpdate:modelValue": ($event) => addressForm.address_2 = $event,
                            "error-messages": local_errors.value.address_2
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                        ]),
                        createVNode("div", { class: "w-full" }, [
                          createVNode(_component_v_label, null, {
                            default: withCtx(() => [
                              createTextVNode("Post code")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_v_text_field, {
                            modelValue: addressForm.post_code,
                            "onUpdate:modelValue": ($event) => addressForm.post_code = $event,
                            "error-messages": local_errors.value.post_code
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                        ]),
                        createVNode("div", { class: "w-full" }, [
                          createVNode(_component_v_label, null, {
                            default: withCtx(() => [
                              createTextVNode("City")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_v_text_field, {
                            modelValue: addressForm.city,
                            "onUpdate:modelValue": ($event) => addressForm.city = $event,
                            "error-messages": local_errors.value.city
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                        ]),
                        createVNode("div", { class: "w-full" }, [
                          createVNode(_component_v_label, null, {
                            default: withCtx(() => [
                              createTextVNode("Phone")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_v_text_field, {
                            modelValue: addressForm.phone,
                            "onUpdate:modelValue": ($event) => addressForm.phone = $event,
                            "error-messages": local_errors.value.phone
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                        ]),
                        createVNode("div", { class: "w-full" }, [
                          createVNode("p", null, "This will update the user's current address as well as this delivery's address")
                        ])
                      ])) : createCommentVNode("", true),
                      createVNode("div", { class: "flex flex-row flex-wrap gap-3 justify-center" }, [
                        showAddressForm.value ? (openBlock(), createBlock(_component_v_btn, {
                          key: 0,
                          onClick: withModifiers(saveAddress, ["prevent"]),
                          color: "grey",
                          variant: "outlined"
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Save delivery address")
                          ]),
                          _: 1
                        })) : createCommentVNode("", true),
                        createVNode(_component_v_btn, {
                          onClick: withModifiers(toggleEditAddress, ["prevent"]),
                          variant: "plain"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(showAddressForm.value ? "Hide" : "Show") + " user address form", 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ])) : createCommentVNode("", true)
                ]),
                footer: withCtx(() => [
                  createVNode(_sfc_main$2, {
                    center: true,
                    justify: "between"
                  }, {
                    default: withCtx(() => [
                      createVNode(_sfc_main$3, { onClick: updateSubscription }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(saveButtonText.value), 1)
                        ]),
                        _: 1
                      }),
                      createVNode(_sfc_main$4, { onClick: closeSubscription }, {
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Subscriptions/Home.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Home = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-fb2ea25d"]]);
export {
  Home as default
};
