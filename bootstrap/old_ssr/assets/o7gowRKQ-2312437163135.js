import { ref, computed, resolveComponent, mergeProps, withCtx, createVNode, createTextVNode, toDisplayString, openBlock, createBlock, createCommentVNode, Fragment, renderList, withModifiers, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderStyle, ssrRenderList } from "vue/server-renderer";
import { _ as _sfc_main$2 } from "./DsvTyKEu-3355343127127.js";
import { _ as _sfc_main$3 } from "./CeVcRmCk-1453137522733.js";
import { _ as _sfc_main$1 } from "./BFeg_3wS-5313717233245.js";
import { router } from "@inertiajs/vue3";
const _sfc_main = {
  __name: "CartProductModal",
  __ssrInlineRender: true,
  props: {},
  setup(__props, { expose: __expose }) {
    const showProductModal = ref(false);
    const selectedProduct = ref(null);
    const selectedVariation = ref(null);
    const selectedVariationUID = ref(null);
    const selectedQuantity = ref(1);
    const selectedNote = ref("");
    const canOpen = ref(true);
    const selectedPrice = computed(() => {
      if (selectedProduct.value && selectedVariation.value) {
        const value = selectedVariation.value.price * selectedQuantity.value;
        return value.toFixed(2);
      } else {
        return 0;
      }
    });
    const modalTitle = ref(null);
    const saveButtonText = ref(null);
    const increaseQuantity = (product) => {
      if (selectedQuantity.value < 20) {
        selectedQuantity.value++;
      }
    };
    const decreaseQuantity = (product) => {
      if (selectedQuantity.value > 1) {
        selectedQuantity.value--;
      }
    };
    const openProduct = (product = null) => {
      if (product && canOpen.value) {
        modalTitle.value = product.name;
        selectedProduct.value = product;
        selectedVariation.value = product.variations[0];
        selectedVariationUID.value = product.variations[0].uid;
        saveButtonText.value = "Add to cart";
        selectedProduct.value = product;
        selectedNote.value = "";
        showProductModal.value = true;
        canOpen.value = false;
      } else {
        showProductModal.value = false;
      }
    };
    const closeProduct = () => {
      resetAll();
    };
    const resetAll = () => {
      showProductModal.value = false;
      setTimeout(() => {
        selectedQuantity.value = 1;
        selectedNote.value = "";
        canOpen.value = true;
      }, 500);
    };
    const resetQuantity = () => {
      selectedQuantity.value = 1;
      selectedVariation.value = selectedProduct.value.variations.find((variation) => variation.uid === selectedVariationUID.value);
    };
    const saveProduct = () => {
      router.post(route("add_to_cart"), {
        product_name: selectedProduct.value.name,
        product_uid: selectedProduct.value.uid,
        variation_name: selectedVariation.value.name,
        variation_uid: selectedVariation.value.uid,
        price: selectedVariation.value.price,
        quantity: selectedQuantity.value,
        note: selectedNote.value,
        thumbnail: selectedVariation.value.image_url
      }, {
        onError: (error) => {
          console.log(error);
        },
        onSuccess: (page) => {
          resetAll();
        },
        only: [""],
        preserveScroll: true,
        preserveState: true
      });
    };
    __expose({ openProduct });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_v_card = resolveComponent("v-card");
      const _component_v_img = resolveComponent("v-img");
      const _component_v_progress_circular = resolveComponent("v-progress-circular");
      const _component_v_chip = resolveComponent("v-chip");
      const _component_v_select = resolveComponent("v-select");
      const _component_v_list_item = resolveComponent("v-list-item");
      const _component_v_btn = resolveComponent("v-btn");
      const _component_v_table = resolveComponent("v-table");
      const _component_v_textarea = resolveComponent("v-textarea");
      _push(ssrRenderComponent(_sfc_main$1, mergeProps({
        show: showProductModal.value,
        onClose: closeProduct,
        maxWidth: "7xl"
      }, _attrs), {
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div${_scopeId}><div class="grid grid-cols-1 lg:grid-cols-5 gap-3"${_scopeId}><div class="col-span-2"${_scopeId}>`);
            if (selectedProduct.value && selectedVariation.value) {
              _push2(ssrRenderComponent(_component_v_card, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_v_img, {
                      "aspect-ratio": "0.6667",
                      class: "rounded-lg",
                      src: selectedVariation.value.image_url
                    }, {
                      placeholder: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<div class="d-flex align-center justify-center fill-height"${_scopeId3}>`);
                          _push4(ssrRenderComponent(_component_v_progress_circular, {
                            color: "grey-lighten-4",
                            indeterminate: ""
                          }, null, _parent4, _scopeId3));
                          _push4(`</div>`);
                        } else {
                          return [
                            createVNode("div", { class: "d-flex align-center justify-center fill-height" }, [
                              createVNode(_component_v_progress_circular, {
                                color: "grey-lighten-4",
                                indeterminate: ""
                              })
                            ])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_v_img, {
                        "aspect-ratio": "0.6667",
                        class: "rounded-lg",
                        src: selectedVariation.value.image_url
                      }, {
                        placeholder: withCtx(() => [
                          createVNode("div", { class: "d-flex align-center justify-center fill-height" }, [
                            createVNode(_component_v_progress_circular, {
                              color: "grey-lighten-4",
                              indeterminate: ""
                            })
                          ])
                        ]),
                        _: 1
                      }, 8, ["src"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="col-span-3"${_scopeId}>`);
            if (selectedProduct.value && selectedVariation.value) {
              _push2(`<div class="p-4"${_scopeId}><p class="text-3xl brand"${_scopeId}>${ssrInterpolate(selectedProduct.value.name)}</p><p class="text-lg mt-3"${_scopeId}>${ssrInterpolate(selectedProduct.value.description)}</p><p class="text-lg my-3"${_scopeId}><strong${_scopeId}>${ssrInterpolate(selectedProduct.value.price_string)}</strong></p><div class="flex flex-row items-center gap-3"${_scopeId}>`);
              if (selectedProduct.value.weekend_only) {
                _push2(`<div class="mb-5"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_v_chip, {
                  color: "black",
                  variant: "outlined",
                  size: "x-small"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`Week-end only`);
                    } else {
                      return [
                        createTextVNode("Week-end only")
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
                _push2(`</div>`);
              } else {
                _push2(`<!---->`);
              }
              if (selectedProduct.value.allow_client_note) {
                _push2(`<div class="mb-5"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_v_chip, {
                  color: "black",
                  variant: "outlined",
                  size: "x-small"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`A note can be added`);
                    } else {
                      return [
                        createTextVNode("A note can be added")
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
                _push2(`</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
              _push2(ssrRenderComponent(_component_v_select, {
                modelValue: selectedVariationUID.value,
                "onUpdate:modelValue": [($event) => selectedVariationUID.value = $event, resetQuantity],
                items: selectedProduct.value.variations,
                "item-title": "name",
                "item-value": "uid"
              }, {
                selection: withCtx(({ item }, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(item.raw.name)} `);
                    if (item.raw.weekend_only) {
                      _push3(ssrRenderComponent(_component_v_chip, {
                        class: "ms-2",
                        size: "x-small",
                        variant: "outlined"
                      }, {
                        default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`Week-end only`);
                          } else {
                            return [
                              createTextVNode("Week-end only")
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    } else {
                      _push3(`<!---->`);
                    }
                  } else {
                    return [
                      createTextVNode(toDisplayString(item.raw.name) + " ", 1),
                      item.raw.weekend_only ? (openBlock(), createBlock(_component_v_chip, {
                        key: 0,
                        class: "ms-2",
                        size: "x-small",
                        variant: "outlined"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Week-end only")
                        ]),
                        _: 1
                      })) : createCommentVNode("", true)
                    ];
                  }
                }),
                item: withCtx(({ item, props }, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_v_list_item, {
                      value: props.value,
                      onClick: props.onClick
                    }, {
                      default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(item.raw.name)} `);
                          if (item.raw.weekend_only) {
                            _push4(ssrRenderComponent(_component_v_chip, {
                              class: "ms-2",
                              size: "x-small",
                              variant: "outlined"
                            }, {
                              default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`Week-end only`);
                                } else {
                                  return [
                                    createTextVNode("Week-end only")
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                          } else {
                            _push4(`<!---->`);
                          }
                        } else {
                          return [
                            createTextVNode(toDisplayString(item.raw.name) + " ", 1),
                            item.raw.weekend_only ? (openBlock(), createBlock(_component_v_chip, {
                              key: 0,
                              class: "ms-2",
                              size: "x-small",
                              variant: "outlined"
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Week-end only")
                              ]),
                              _: 1
                            })) : createCommentVNode("", true)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_v_list_item, {
                        value: props.value,
                        onClick: props.onClick
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(item.raw.name) + " ", 1),
                          item.raw.weekend_only ? (openBlock(), createBlock(_component_v_chip, {
                            key: 0,
                            class: "ms-2",
                            size: "x-small",
                            variant: "outlined"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Week-end only")
                            ]),
                            _: 1
                          })) : createCommentVNode("", true)
                        ]),
                        _: 2
                      }, 1032, ["value", "onClick"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              if (selectedVariation.value) {
                _push2(`<div class="mb-5"${_scopeId}><p class="text-xl"${_scopeId}>${ssrInterpolate(`${selectedVariation.value.name} - ${selectedVariation.value.price_string}`)}</p></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div class="flex flex-row mb-7"${_scopeId}><div${_scopeId}>`);
              _push2(ssrRenderComponent(_component_v_btn, {
                icon: "mdi-minus",
                size: "x-small",
                onClick: decreaseQuantity
              }, null, _parent2, _scopeId));
              _push2(`</div><div class="h-100 text-center text-lg" style="${ssrRenderStyle({ "width": "60px" })}"${_scopeId}><p${_scopeId}>${ssrInterpolate(selectedQuantity.value)}</p></div><div${_scopeId}>`);
              _push2(ssrRenderComponent(_component_v_btn, {
                icon: "mdi-plus",
                size: "x-small",
                onClick: increaseQuantity
              }, null, _parent2, _scopeId));
              _push2(`</div></div>`);
              if (selectedVariation.value.is_box) {
                _push2(`<div${_scopeId}><div class="hidden lg:block"${_scopeId}><p class="text-lg mb-2"${_scopeId}>This is a box of items. The contents are:</p>`);
                if (selectedVariation.value.box_products && selectedVariation.value.box_products.length) {
                  _push2(ssrRenderComponent(_component_v_table, { class: "border" }, {
                    default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(`<thead${_scopeId2}><tr class="border-b"${_scopeId2}><th class="px-0"${_scopeId2}>`);
                        _push3(ssrRenderComponent(_component_v_img, {
                          style: { "width": "50px" },
                          "aspect-ratio": "1",
                          cover: ""
                        }, null, _parent3, _scopeId2));
                        _push3(`</th><th${_scopeId2}><p class="font-bold"${_scopeId2}>Product</p></th><th${_scopeId2}><p class="font-bold"${_scopeId2}>Variation</p></th><th${_scopeId2}><p class="font-bold"${_scopeId2}>Quantity</p></th></tr></thead><tbody${_scopeId2}><!--[-->`);
                        ssrRenderList(selectedVariation.value.box_products, (box_product) => {
                          _push3(`<tr${_scopeId2}><td class="px-0 align-top"${_scopeId2}>`);
                          _push3(ssrRenderComponent(_component_v_img, {
                            src: box_product.display_data.image,
                            style: { "width": "50px" },
                            "aspect-ratio": "1",
                            cover: ""
                          }, null, _parent3, _scopeId2));
                          _push3(`</td><td${_scopeId2}><p${_scopeId2}>${ssrInterpolate(box_product.display_data.product_name)}</p></td><td${_scopeId2}><p${_scopeId2}>${ssrInterpolate(box_product.display_data.variation_name)}</p></td><td${_scopeId2}><p${_scopeId2}>${ssrInterpolate(box_product.display_data.quantity)}</p></td></tr>`);
                        });
                        _push3(`<!--]--></tbody>`);
                      } else {
                        return [
                          createVNode("thead", null, [
                            createVNode("tr", { class: "border-b" }, [
                              createVNode("th", { class: "px-0" }, [
                                createVNode(_component_v_img, {
                                  style: { "width": "50px" },
                                  "aspect-ratio": "1",
                                  cover: ""
                                })
                              ]),
                              createVNode("th", null, [
                                createVNode("p", { class: "font-bold" }, "Product")
                              ]),
                              createVNode("th", null, [
                                createVNode("p", { class: "font-bold" }, "Variation")
                              ]),
                              createVNode("th", null, [
                                createVNode("p", { class: "font-bold" }, "Quantity")
                              ])
                            ])
                          ]),
                          createVNode("tbody", null, [
                            (openBlock(true), createBlock(Fragment, null, renderList(selectedVariation.value.box_products, (box_product) => {
                              return openBlock(), createBlock("tr", null, [
                                createVNode("td", { class: "px-0 align-top" }, [
                                  createVNode(_component_v_img, {
                                    src: box_product.display_data.image,
                                    style: { "width": "50px" },
                                    "aspect-ratio": "1",
                                    cover: ""
                                  }, null, 8, ["src"])
                                ]),
                                createVNode("td", null, [
                                  createVNode("p", null, toDisplayString(box_product.display_data.product_name), 1)
                                ]),
                                createVNode("td", null, [
                                  createVNode("p", null, toDisplayString(box_product.display_data.variation_name), 1)
                                ]),
                                createVNode("td", null, [
                                  createVNode("p", null, toDisplayString(box_product.display_data.quantity), 1)
                                ])
                              ]);
                            }), 256))
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent2, _scopeId));
                } else {
                  _push2(`<div${_scopeId}><p class="text-red"${_scopeId}>An error occurred.</p></div>`);
                }
                _push2(`</div><div class="block lg:hidden"${_scopeId}><p class="text-lg mb-2"${_scopeId}>This is a box of items. The contents are:</p>`);
                if (selectedVariation.value.box_products && selectedVariation.value.box_products.length) {
                  _push2(ssrRenderComponent(_component_v_table, { class: "border" }, {
                    default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(`<tbody${_scopeId2}><!--[-->`);
                        ssrRenderList(selectedVariation.value.box_products, (box_product) => {
                          _push3(`<tr${_scopeId2}><td class="px-0 align-top"${_scopeId2}>`);
                          _push3(ssrRenderComponent(_component_v_img, {
                            src: box_product.display_data.image,
                            style: { "width": "50px" },
                            "aspect-ratio": "1",
                            cover: ""
                          }, null, _parent3, _scopeId2));
                          _push3(`</td><td${_scopeId2}><p${_scopeId2}><strong${_scopeId2}>${ssrInterpolate(`${box_product.display_data.product_name}`)}</strong> ${ssrInterpolate(`(${box_product.display_data.variation_name}) ${box_product.display_data.quantity}`)}</p></td></tr>`);
                        });
                        _push3(`<!--]--></tbody>`);
                      } else {
                        return [
                          createVNode("tbody", null, [
                            (openBlock(true), createBlock(Fragment, null, renderList(selectedVariation.value.box_products, (box_product) => {
                              return openBlock(), createBlock("tr", null, [
                                createVNode("td", { class: "px-0 align-top" }, [
                                  createVNode(_component_v_img, {
                                    src: box_product.display_data.image,
                                    style: { "width": "50px" },
                                    "aspect-ratio": "1",
                                    cover: ""
                                  }, null, 8, ["src"])
                                ]),
                                createVNode("td", null, [
                                  createVNode("p", null, [
                                    createVNode("strong", null, toDisplayString(`${box_product.display_data.product_name}`), 1),
                                    createTextVNode(" " + toDisplayString(`(${box_product.display_data.variation_name}) ${box_product.display_data.quantity}`), 1)
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
                } else {
                  _push2(`<div${_scopeId}><p class="text-red"${_scopeId}>An error occurred.</p></div>`);
                }
                _push2(`</div></div>`);
              } else {
                _push2(`<!---->`);
              }
              if (selectedProduct.value.allow_client_note) {
                _push2(`<!--[--><p${_scopeId}>Note (optional)</p><div${_scopeId}>`);
                _push2(ssrRenderComponent(_component_v_textarea, {
                  rows: "3",
                  "auto-grow": "",
                  modelValue: selectedNote.value,
                  "onUpdate:modelValue": ($event) => selectedNote.value = $event
                }, null, _parent2, _scopeId));
                _push2(`</div><!--]-->`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div>`);
          } else {
            return [
              createVNode("div", null, [
                createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-5 gap-3" }, [
                  createVNode("div", { class: "col-span-2" }, [
                    selectedProduct.value && selectedVariation.value ? (openBlock(), createBlock(_component_v_card, { key: 0 }, {
                      default: withCtx(() => [
                        createVNode(_component_v_img, {
                          "aspect-ratio": "0.6667",
                          class: "rounded-lg",
                          src: selectedVariation.value.image_url
                        }, {
                          placeholder: withCtx(() => [
                            createVNode("div", { class: "d-flex align-center justify-center fill-height" }, [
                              createVNode(_component_v_progress_circular, {
                                color: "grey-lighten-4",
                                indeterminate: ""
                              })
                            ])
                          ]),
                          _: 1
                        }, 8, ["src"])
                      ]),
                      _: 1
                    })) : createCommentVNode("", true)
                  ]),
                  createVNode("div", { class: "col-span-3" }, [
                    selectedProduct.value && selectedVariation.value ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "p-4"
                    }, [
                      createVNode("p", { class: "text-3xl brand" }, toDisplayString(selectedProduct.value.name), 1),
                      createVNode("p", { class: "text-lg mt-3" }, toDisplayString(selectedProduct.value.description), 1),
                      createVNode("p", { class: "text-lg my-3" }, [
                        createVNode("strong", null, toDisplayString(selectedProduct.value.price_string), 1)
                      ]),
                      createVNode("div", { class: "flex flex-row items-center gap-3" }, [
                        selectedProduct.value.weekend_only ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "mb-5"
                        }, [
                          createVNode(_component_v_chip, {
                            color: "black",
                            variant: "outlined",
                            size: "x-small"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Week-end only")
                            ]),
                            _: 1
                          })
                        ])) : createCommentVNode("", true),
                        selectedProduct.value.allow_client_note ? (openBlock(), createBlock("div", {
                          key: 1,
                          class: "mb-5"
                        }, [
                          createVNode(_component_v_chip, {
                            color: "black",
                            variant: "outlined",
                            size: "x-small"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("A note can be added")
                            ]),
                            _: 1
                          })
                        ])) : createCommentVNode("", true)
                      ]),
                      createVNode(_component_v_select, {
                        modelValue: selectedVariationUID.value,
                        "onUpdate:modelValue": [($event) => selectedVariationUID.value = $event, resetQuantity],
                        items: selectedProduct.value.variations,
                        "item-title": "name",
                        "item-value": "uid"
                      }, {
                        selection: withCtx(({ item }) => [
                          createTextVNode(toDisplayString(item.raw.name) + " ", 1),
                          item.raw.weekend_only ? (openBlock(), createBlock(_component_v_chip, {
                            key: 0,
                            class: "ms-2",
                            size: "x-small",
                            variant: "outlined"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Week-end only")
                            ]),
                            _: 1
                          })) : createCommentVNode("", true)
                        ]),
                        item: withCtx(({ item, props }) => [
                          createVNode(_component_v_list_item, {
                            value: props.value,
                            onClick: props.onClick
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(item.raw.name) + " ", 1),
                              item.raw.weekend_only ? (openBlock(), createBlock(_component_v_chip, {
                                key: 0,
                                class: "ms-2",
                                size: "x-small",
                                variant: "outlined"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("Week-end only")
                                ]),
                                _: 1
                              })) : createCommentVNode("", true)
                            ]),
                            _: 2
                          }, 1032, ["value", "onClick"])
                        ]),
                        _: 1
                      }, 8, ["modelValue", "onUpdate:modelValue", "items"]),
                      selectedVariation.value ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "mb-5"
                      }, [
                        createVNode("p", { class: "text-xl" }, toDisplayString(`${selectedVariation.value.name} - ${selectedVariation.value.price_string}`), 1)
                      ])) : createCommentVNode("", true),
                      createVNode("div", { class: "flex flex-row mb-7" }, [
                        createVNode("div", null, [
                          createVNode(_component_v_btn, {
                            icon: "mdi-minus",
                            size: "x-small",
                            onClick: withModifiers(decreaseQuantity, ["prevent"])
                          })
                        ]),
                        createVNode("div", {
                          class: "h-100 text-center text-lg",
                          style: { "width": "60px" }
                        }, [
                          createVNode("p", null, toDisplayString(selectedQuantity.value), 1)
                        ]),
                        createVNode("div", null, [
                          createVNode(_component_v_btn, {
                            icon: "mdi-plus",
                            size: "x-small",
                            onClick: withModifiers(increaseQuantity, ["prevent"])
                          })
                        ])
                      ]),
                      selectedVariation.value.is_box ? (openBlock(), createBlock("div", { key: 1 }, [
                        createVNode("div", { class: "hidden lg:block" }, [
                          createVNode("p", { class: "text-lg mb-2" }, "This is a box of items. The contents are:"),
                          selectedVariation.value.box_products && selectedVariation.value.box_products.length ? (openBlock(), createBlock(_component_v_table, {
                            key: 0,
                            class: "border"
                          }, {
                            default: withCtx(() => [
                              createVNode("thead", null, [
                                createVNode("tr", { class: "border-b" }, [
                                  createVNode("th", { class: "px-0" }, [
                                    createVNode(_component_v_img, {
                                      style: { "width": "50px" },
                                      "aspect-ratio": "1",
                                      cover: ""
                                    })
                                  ]),
                                  createVNode("th", null, [
                                    createVNode("p", { class: "font-bold" }, "Product")
                                  ]),
                                  createVNode("th", null, [
                                    createVNode("p", { class: "font-bold" }, "Variation")
                                  ]),
                                  createVNode("th", null, [
                                    createVNode("p", { class: "font-bold" }, "Quantity")
                                  ])
                                ])
                              ]),
                              createVNode("tbody", null, [
                                (openBlock(true), createBlock(Fragment, null, renderList(selectedVariation.value.box_products, (box_product) => {
                                  return openBlock(), createBlock("tr", null, [
                                    createVNode("td", { class: "px-0 align-top" }, [
                                      createVNode(_component_v_img, {
                                        src: box_product.display_data.image,
                                        style: { "width": "50px" },
                                        "aspect-ratio": "1",
                                        cover: ""
                                      }, null, 8, ["src"])
                                    ]),
                                    createVNode("td", null, [
                                      createVNode("p", null, toDisplayString(box_product.display_data.product_name), 1)
                                    ]),
                                    createVNode("td", null, [
                                      createVNode("p", null, toDisplayString(box_product.display_data.variation_name), 1)
                                    ]),
                                    createVNode("td", null, [
                                      createVNode("p", null, toDisplayString(box_product.display_data.quantity), 1)
                                    ])
                                  ]);
                                }), 256))
                              ])
                            ]),
                            _: 1
                          })) : (openBlock(), createBlock("div", { key: 1 }, [
                            createVNode("p", { class: "text-red" }, "An error occurred.")
                          ]))
                        ]),
                        createVNode("div", { class: "block lg:hidden" }, [
                          createVNode("p", { class: "text-lg mb-2" }, "This is a box of items. The contents are:"),
                          selectedVariation.value.box_products && selectedVariation.value.box_products.length ? (openBlock(), createBlock(_component_v_table, {
                            key: 0,
                            class: "border"
                          }, {
                            default: withCtx(() => [
                              createVNode("tbody", null, [
                                (openBlock(true), createBlock(Fragment, null, renderList(selectedVariation.value.box_products, (box_product) => {
                                  return openBlock(), createBlock("tr", null, [
                                    createVNode("td", { class: "px-0 align-top" }, [
                                      createVNode(_component_v_img, {
                                        src: box_product.display_data.image,
                                        style: { "width": "50px" },
                                        "aspect-ratio": "1",
                                        cover: ""
                                      }, null, 8, ["src"])
                                    ]),
                                    createVNode("td", null, [
                                      createVNode("p", null, [
                                        createVNode("strong", null, toDisplayString(`${box_product.display_data.product_name}`), 1),
                                        createTextVNode(" " + toDisplayString(`(${box_product.display_data.variation_name}) ${box_product.display_data.quantity}`), 1)
                                      ])
                                    ])
                                  ]);
                                }), 256))
                              ])
                            ]),
                            _: 1
                          })) : (openBlock(), createBlock("div", { key: 1 }, [
                            createVNode("p", { class: "text-red" }, "An error occurred.")
                          ]))
                        ])
                      ])) : createCommentVNode("", true),
                      selectedProduct.value.allow_client_note ? (openBlock(), createBlock(Fragment, { key: 2 }, [
                        createVNode("p", null, "Note (optional)"),
                        createVNode("div", null, [
                          createVNode(_component_v_textarea, {
                            rows: "3",
                            "auto-grow": "",
                            modelValue: selectedNote.value,
                            "onUpdate:modelValue": ($event) => selectedNote.value = $event
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ])
                      ], 64)) : createCommentVNode("", true)
                    ])) : createCommentVNode("", true)
                  ])
                ])
              ])
            ];
          }
        }),
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex flex-row flex-wrap gap-3"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, { onClick: saveProduct }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(saveButtonText.value)} ($${ssrInterpolate(selectedPrice.value)})`);
                } else {
                  return [
                    createTextVNode(toDisplayString(saveButtonText.value) + " ($" + toDisplayString(selectedPrice.value) + ")", 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, { onClick: closeProduct }, {
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
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "flex flex-row flex-wrap gap-3" }, [
                createVNode(_sfc_main$2, { onClick: saveProduct }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(saveButtonText.value) + " ($" + toDisplayString(selectedPrice.value) + ")", 1)
                  ]),
                  _: 1
                }),
                createVNode(_sfc_main$3, { onClick: closeProduct }, {
                  default: withCtx(() => [
                    createTextVNode("Cancel")
                  ]),
                  _: 1
                })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/CartProductModal.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
