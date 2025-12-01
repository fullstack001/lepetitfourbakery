import { mergeProps, useSSRContext, ref, reactive, resolveComponent, withCtx, createTextVNode, toDisplayString, createVNode, openBlock, createBlock, createCommentVNode, watch, unref, Fragment, renderList, withModifiers } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderList, ssrRenderStyle, ssrRenderAttr } from "vue/server-renderer";
import { A as AdmLayout } from "./Bmk57_E8-5341323707321.js";
import { router } from "@inertiajs/vue3";
import { _ as _sfc_main$4 } from "./BFeg_3wS-5313717233245.js";
import { _ as _sfc_main$5 } from "./DsvTyKEu-3355343127127.js";
import { _ as _sfc_main$6 } from "./CeVcRmCk-1453137522733.js";
import VuePictureCropper, { cropper } from "vue-picture-cropper";
import { a as _sfc_main$7 } from "./Cyl_ukyB-3352317127354.js";
import "./BW6cC8iL-1754723312335.js";
import "./kZV6a-x4-2437327355113.js";
import "./1tPrXgE0-1751246333532.js";
import "./C6q4kDV--4257163313235.js";
import "./DKEAH6nn-4333751172235.js";
import "mitt";
const _sfc_main$3 = {
  __name: "ErrorModule",
  __ssrInlineRender: true,
  props: {
    error_text: { type: String, default: null }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      if (props.error_text) {
        _push(`<div${ssrRenderAttrs(mergeProps({
          class: "fixed bottom-0 right-0 p-10 bg",
          style: { "z-index": "999000" }
        }, _attrs))}><p class="bg-red-darken-1 px-5 py-2">${ssrInterpolate(props.error_text)}</p></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/ErrorModule.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = {
  __name: "ProductModal",
  __ssrInlineRender: true,
  props: {
    categories: Object,
    event_menu_categories: Object,
    errors: Object
  },
  setup(__props, { expose: __expose }) {
    const props = __props;
    const showProductModal = ref(false);
    const selectedProduct = ref(null);
    const modalTitle = ref(null);
    const saveButtonText = ref(null);
    const form = reactive({
      name: null,
      description: null,
      in_sneak_peek_menu: false,
      in_catering_menu: false,
      in_add_ons_menu: false,
      active: true,
      categories: [],
      event_menu_categories: [],
      weekend_only: false
    });
    const openProduct = (product = null) => {
      local_errors.value = {};
      if (product) {
        modalTitle.value = "Edit product";
        selectedProduct.value = product;
        form.name = product.name;
        form.description = product.description;
        form.in_sneak_peek_menu = product.in_sneak_peek_menu === 1;
        form.in_catering_menu = product.in_catering_menu === 1;
        form.in_add_ons_menu = product.in_add_ons_menu === 1;
        form.active = product.active === 1;
        form.weekend_only = product.weekend_only === 1;
        form.allow_client_note = product.allow_client_note === 1;
        form.categories = product.category_uids;
        form.event_menu_categories = product.event_menu_category_uids;
      } else {
        modalTitle.value = "Create product";
        selectedProduct.value = null;
        form.name = null;
        form.description = null;
        form.in_sneak_peek_menu = false;
        form.in_catering_menu = false;
        form.in_add_ons_menu = false;
        form.active = true;
        form.weekend_only = false;
        form.allow_client_note = false;
        form.categories = [];
        form.event_menu_categories = [];
      }
      saveButtonText.value = "Save product";
      showProductModal.value = true;
    };
    const local_errors = ref({});
    const closeProduct = () => {
      showProductModal.value = false;
      selectedProduct.value = null;
    };
    const saveProduct = () => {
      let url;
      if (selectedProduct.value) {
        url = route("admin.update_product", { product: selectedProduct.value.uid });
      } else {
        url = route(`admin.create_product`);
      }
      router.post(url, form, {
        preserveScroll: true,
        preserveState: true,
        onSuccess: (page) => {
          closeProduct();
        },
        onError: (error) => {
          local_errors.value = props.errors;
        }
      });
    };
    __expose({ openProduct });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_v_label = resolveComponent("v-label");
      const _component_v_text_field = resolveComponent("v-text-field");
      const _component_v_textarea = resolveComponent("v-textarea");
      const _component_v_checkbox = resolveComponent("v-checkbox");
      const _component_v_select = resolveComponent("v-select");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_sfc_main$4, {
        show: showProductModal.value,
        onClose: closeProduct
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
              "error-messages": local_errors.value.name
            }, null, _parent2, _scopeId));
            if (selectedProduct.value) {
              _push2(`<p class="mb-5 italic w-full text-center"${_scopeId}>Rename to &quot;delete product&quot; to delete</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_component_v_label, { class: "uppercase" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Description (optional)`);
                } else {
                  return [
                    createTextVNode("Description (optional)")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_v_textarea, {
              modelValue: form.description,
              "onUpdate:modelValue": ($event) => form.description = $event,
              "error-messages": local_errors.value.description
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}><div${_scopeId}>`);
            _push2(ssrRenderComponent(_component_v_label, { class: "uppercase" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Appears in`);
                } else {
                  return [
                    createTextVNode("Appears in")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="grid grid-cols-3"${_scopeId}><div${_scopeId}>`);
            _push2(ssrRenderComponent(_component_v_checkbox, {
              label: "Sneak peek",
              modelValue: form.in_sneak_peek_menu,
              "onUpdate:modelValue": ($event) => form.in_sneak_peek_menu = $event,
              "error-messages": local_errors.value.in_sneak_peek_menu
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
            {
              _push2(`<!---->`);
            }
            _push2(`<div${_scopeId}>`);
            _push2(ssrRenderComponent(_component_v_checkbox, {
              label: "Add-ons",
              modelValue: form.in_add_ons_menu,
              "onUpdate:modelValue": ($event) => form.in_add_ons_menu = $event,
              "error-messages": local_errors.value.in_add_ons_menu
            }, null, _parent2, _scopeId));
            _push2(`</div></div></div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_component_v_label, { class: "uppercase" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Event menu categories`);
                } else {
                  return [
                    createTextVNode("Event menu categories")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            if (props.event_menu_categories.length) {
              _push2(ssrRenderComponent(_component_v_select, {
                modelValue: form.event_menu_categories,
                "onUpdate:modelValue": ($event) => form.event_menu_categories = $event,
                items: props.event_menu_categories,
                "item-value": "uid",
                "item-title": "name",
                multiple: "",
                chips: "",
                "error-messages": local_errors.value.event_menu_categories
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<div${_scopeId}><p class="text-red"${_scopeId}>You need to create at least one event menu category in able to show this product in the events menu</p></div>`);
            }
            _push2(`</div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_component_v_label, { class: "uppercase" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Settings`);
                } else {
                  return [
                    createTextVNode("Settings")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="grid grid-cols-3"${_scopeId}><div${_scopeId}>`);
            _push2(ssrRenderComponent(_component_v_checkbox, {
              label: "Is active",
              modelValue: form.active,
              "onUpdate:modelValue": ($event) => form.active = $event,
              "error-messages": props.errors.active
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_component_v_checkbox, {
              label: "Week-end only",
              modelValue: form.weekend_only,
              "onUpdate:modelValue": ($event) => form.weekend_only = $event,
              "error-messages": props.errors.weekend_only
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_component_v_checkbox, {
              label: "Client note",
              modelValue: form.allow_client_note,
              "onUpdate:modelValue": ($event) => form.allow_client_note = $event,
              "error-messages": props.errors.allow_client_note
            }, null, _parent2, _scopeId));
            _push2(`</div></div></div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_component_v_label, { class: "uppercase" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Categories`);
                } else {
                  return [
                    createTextVNode("Categories")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            if (props.categories.length) {
              _push2(ssrRenderComponent(_component_v_select, {
                modelValue: form.categories,
                "onUpdate:modelValue": ($event) => form.categories = $event,
                items: props.categories,
                "item-value": "uid",
                "item-title": "name",
                multiple: "",
                chips: "",
                "error-messages": local_errors.value.categories
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<div${_scopeId}><p class="text-red"${_scopeId}>You need to create at least one category in able to save a product</p></div>`);
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
                  "error-messages": local_errors.value.name
                }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"]),
                selectedProduct.value ? (openBlock(), createBlock("p", {
                  key: 0,
                  class: "mb-5 italic w-full text-center"
                }, 'Rename to "delete product" to delete')) : createCommentVNode("", true)
              ]),
              createVNode("div", null, [
                createVNode(_component_v_label, { class: "uppercase" }, {
                  default: withCtx(() => [
                    createTextVNode("Description (optional)")
                  ]),
                  _: 1
                }),
                createVNode(_component_v_textarea, {
                  modelValue: form.description,
                  "onUpdate:modelValue": ($event) => form.description = $event,
                  "error-messages": local_errors.value.description
                }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
              ]),
              createVNode("div", null, [
                createVNode("div", null, [
                  createVNode(_component_v_label, { class: "uppercase" }, {
                    default: withCtx(() => [
                      createTextVNode("Appears in")
                    ]),
                    _: 1
                  })
                ]),
                createVNode("div", { class: "grid grid-cols-3" }, [
                  createVNode("div", null, [
                    createVNode(_component_v_checkbox, {
                      label: "Sneak peek",
                      modelValue: form.in_sneak_peek_menu,
                      "onUpdate:modelValue": ($event) => form.in_sneak_peek_menu = $event,
                      "error-messages": local_errors.value.in_sneak_peek_menu
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                  ]),
                  createCommentVNode("", true),
                  createVNode("div", null, [
                    createVNode(_component_v_checkbox, {
                      label: "Add-ons",
                      modelValue: form.in_add_ons_menu,
                      "onUpdate:modelValue": ($event) => form.in_add_ons_menu = $event,
                      "error-messages": local_errors.value.in_add_ons_menu
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                  ])
                ])
              ]),
              createVNode("div", null, [
                createVNode(_component_v_label, { class: "uppercase" }, {
                  default: withCtx(() => [
                    createTextVNode("Event menu categories")
                  ]),
                  _: 1
                }),
                props.event_menu_categories.length ? (openBlock(), createBlock(_component_v_select, {
                  key: 0,
                  modelValue: form.event_menu_categories,
                  "onUpdate:modelValue": ($event) => form.event_menu_categories = $event,
                  items: props.event_menu_categories,
                  "item-value": "uid",
                  "item-title": "name",
                  multiple: "",
                  chips: "",
                  "error-messages": local_errors.value.event_menu_categories
                }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "error-messages"])) : (openBlock(), createBlock("div", { key: 1 }, [
                  createVNode("p", { class: "text-red" }, "You need to create at least one event menu category in able to show this product in the events menu")
                ]))
              ]),
              createVNode("div", null, [
                createVNode(_component_v_label, { class: "uppercase" }, {
                  default: withCtx(() => [
                    createTextVNode("Settings")
                  ]),
                  _: 1
                }),
                createVNode("div", { class: "grid grid-cols-3" }, [
                  createVNode("div", null, [
                    createVNode(_component_v_checkbox, {
                      label: "Is active",
                      modelValue: form.active,
                      "onUpdate:modelValue": ($event) => form.active = $event,
                      "error-messages": props.errors.active
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                  ]),
                  createVNode("div", null, [
                    createVNode(_component_v_checkbox, {
                      label: "Week-end only",
                      modelValue: form.weekend_only,
                      "onUpdate:modelValue": ($event) => form.weekend_only = $event,
                      "error-messages": props.errors.weekend_only
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                  ]),
                  createVNode("div", null, [
                    createVNode(_component_v_checkbox, {
                      label: "Client note",
                      modelValue: form.allow_client_note,
                      "onUpdate:modelValue": ($event) => form.allow_client_note = $event,
                      "error-messages": props.errors.allow_client_note
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                  ])
                ])
              ]),
              createVNode("div", null, [
                createVNode(_component_v_label, { class: "uppercase" }, {
                  default: withCtx(() => [
                    createTextVNode("Categories")
                  ]),
                  _: 1
                }),
                props.categories.length ? (openBlock(), createBlock(_component_v_select, {
                  key: 0,
                  modelValue: form.categories,
                  "onUpdate:modelValue": ($event) => form.categories = $event,
                  items: props.categories,
                  "item-value": "uid",
                  "item-title": "name",
                  multiple: "",
                  chips: "",
                  "error-messages": local_errors.value.categories
                }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "error-messages"])) : (openBlock(), createBlock("div", { key: 1 }, [
                  createVNode("p", { class: "text-red" }, "You need to create at least one category in able to save a product")
                ]))
              ])
            ];
          }
        }),
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$5, {
              onClick: saveProduct,
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
            _push2(ssrRenderComponent(_sfc_main$6, { onClick: closeProduct }, {
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
              createVNode(_sfc_main$5, {
                onClick: saveProduct,
                class: "me-3"
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(saveButtonText.value), 1)
                ]),
                _: 1
              }),
              createVNode(_sfc_main$6, { onClick: closeProduct }, {
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
      _push(ssrRenderComponent(_sfc_main$3, {
        error_text: local_errors.value.msg
      }, null, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/ProductModal.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const defaultThumbnail = "/build/assets/BUigtZKe-3357235211234.jpg";
const _sfc_main$1 = {
  __name: "VariationModal",
  __ssrInlineRender: true,
  props: {
    products: Object,
    errors: Object
  },
  setup(__props, { expose: __expose }) {
    const props = __props;
    const selectedProduct = ref(null);
    const showVariationModal = ref(false);
    const selectedVariation = ref(null);
    const modalTitle = ref(null);
    const saveButtonText = ref(null);
    const int_type = ref("");
    const form = reactive({
      name: null,
      items: 1,
      price: null,
      image: null,
      is_box: 0,
      variation_uids: [],
      variation_quantities: {},
      weekend_only: false
    });
    const openVariation = (product, variation = null) => {
      selectedProduct.value = product;
      if (variation) {
        int_type.value = "edit";
        modalTitle.value = 'Edit variation for "' + product.name + '"';
        selectedVariation.value = variation;
        form.name = variation.name;
        form.items = variation.items;
        form.price = variation.price;
        form.image = null;
        form.is_box = variation.is_box ? 1 : 0;
        form.variation_uids = variation.box_product_uids;
        form.variation_quantities = variation.box_product_quantities;
        form.weekend_only = variation.weekend_only === 1;
      } else {
        int_type.value = "create";
        modalTitle.value = 'Create variation for "' + product.name + '"';
        selectedVariation.value = null;
        form.name = null;
        form.items = 1;
        form.price = null;
        form.image = null;
        form.is_box = 0;
        form.variation_uids = [];
        form.variation_quantities = {};
        form.weekend_only = false;
      }
      saveButtonText.value = "Save variation";
      showVariationModal.value = true;
    };
    const handleCheckboxChange = (uid) => {
      if (form.variation_uids.includes(uid)) {
        if (!form.variation_quantities[uid]) {
          form.variation_quantities = { ...form.variation_quantities, [uid]: 1 };
        }
      } else {
        delete form.variation_quantities[uid];
      }
    };
    const local_errors = ref({});
    const closeVariation = () => {
      showVariationModal.value = false;
      local_errors.value = {};
      uploadedImg.value = "";
      imgDataURL.value = "";
      imgBlobURL.value = "";
    };
    const saveVariation = () => {
      let url;
      if (selectedVariation.value) {
        url = route("admin.update_variation", { product: selectedProduct.value.uid, variation: selectedVariation.value.uid });
      } else {
        url = route("admin.create_variation", { product: selectedProduct.value.uid });
      }
      form.weekend_only_string = form.weekend_only ? "true" : "false";
      if (cropper) {
        const base64 = cropper.getDataURL();
        cropper.getBlob().then((blob) => {
          if (!blob) {
            return;
          }
          cropper.getFile({
            fileName: "default"
          }).then((file) => {
            imgDataURL.value = base64;
            imgBlobURL.value = URL.createObjectURL(blob);
            let formData = new FormData();
            formData.append("image", blob, "image.jpg");
            formData.append("name", form.name);
            formData.append("items", form.items);
            formData.append("price", form.price);
            formData.append("is_box", form.is_box);
            formData.append("weekend_only_string", form.weekend_only_string);
            router.post(url, formData, {
              preserveScroll: true,
              preserveState: true,
              onSuccess: (page) => {
                closeVariation();
              },
              onError: (error) => {
                local_errors.value = props.errors;
              }
            });
          }).catch((error) => {
            console.log(error);
          });
        });
      } else {
        router.post(url, form, {
          preserveScroll: true,
          preserveState: true,
          onSuccess: (page) => {
            closeVariation();
          },
          onError: (error) => {
            local_errors.value = props.errors;
            console.log(props.errors);
          }
        });
      }
    };
    const onFileChange = (e) => {
      uploadedImg.value = "";
      imgDataURL.value = "";
      imgBlobURL.value = "";
      const files = e.target.files;
      if (!files || !files.length) return;
      const file = files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        uploadedImg.value = String(reader.result);
        isCropping.value = true;
        if (!uploadInput.value) return;
        uploadInput.value = {};
      };
    };
    ref(null);
    const isCropping = ref(false);
    ref(defaultThumbnail);
    const uploadedImg = ref("");
    const imgDataURL = ref("");
    const imgBlobURL = ref("");
    const uploadInput = ref({});
    const options = ref({
      size: [400, 267],
      viewMode: 1,
      dragMode: "crop",
      aspectRatio: 2 / 3
    });
    __expose({ openVariation });
    watch(form, async (newValue) => {
      if (newValue) {
        if (newValue.is_box === 1) {
          form.items = 1;
        }
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_v_label = resolveComponent("v-label");
      const _component_v_text_field = resolveComponent("v-text-field");
      const _component_v_radio_group = resolveComponent("v-radio-group");
      const _component_v_radio = resolveComponent("v-radio");
      const _component_v_checkbox = resolveComponent("v-checkbox");
      const _component_v_number_input = resolveComponent("v-number-input");
      const _component_v_file_input = resolveComponent("v-file-input");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_sfc_main$4, {
        show: showVariationModal.value,
        onClose: closeVariation
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
              "error-messages": local_errors.value.name
            }, null, _parent2, _scopeId));
            if (selectedVariation.value) {
              _push2(`<p class="mb-5 italic w-full text-center"${_scopeId}>Rename to &quot;delete variation&quot; to delete</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_component_v_label, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`This is a box`);
                } else {
                  return [
                    createTextVNode("This is a box")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_v_radio_group, {
              modelValue: form.is_box,
              "onUpdate:modelValue": ($event) => form.is_box = $event,
              inline: ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_v_radio, {
                    label: "No",
                    value: 0
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_v_radio, {
                    label: "Yes",
                    value: 1
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_v_radio, {
                      label: "No",
                      value: 0
                    }),
                    createVNode(_component_v_radio, {
                      label: "Yes",
                      value: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div${_scopeId}>`);
            _push2(ssrRenderComponent(_component_v_checkbox, {
              label: "Week-end only",
              modelValue: form.weekend_only,
              "onUpdate:modelValue": ($event) => form.weekend_only = $event,
              "error-messages": props.errors.weekend_only_string
            }, null, _parent2, _scopeId));
            _push2(`</div></div>`);
            if (form.is_box === 0) {
              _push2(`<div${_scopeId}>`);
              _push2(ssrRenderComponent(_component_v_label, { class: "uppercase" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`Number of items`);
                  } else {
                    return [
                      createTextVNode("Number of items")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_v_text_field, {
                modelValue: form.items,
                "onUpdate:modelValue": ($event) => form.items = $event,
                "error-messages": local_errors.value.items
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else if (form.is_box === 1) {
              _push2(`<div class="mb-7"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_v_label, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`Select products`);
                  } else {
                    return [
                      createTextVNode("Select products")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              if (local_errors.value.variation_uids) {
                _push2(`<p class="text-red-500 my-2"${_scopeId}>${ssrInterpolate(local_errors.value.variation_uids)}</p>`);
              } else {
                _push2(`<!---->`);
              }
              if (local_errors.value.variation_quantities) {
                _push2(`<p class="text-red-500 my-2"${_scopeId}>${ssrInterpolate(local_errors.value.variation_quantities)}</p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div class="bg-slate-200 px-4 py-3 rounded-lg"${_scopeId}><!--[-->`);
              ssrRenderList(props.products, (product) => {
                _push2(`<div${_scopeId}><p class="font-bold"${_scopeId}>Product [${ssrInterpolate(product.name)}]</p><div class="border-2 border-gray-400 px-2 py-1 mb-3"${_scopeId}>`);
                if (product.variations.length) {
                  _push2(`<div${_scopeId}><!--[-->`);
                  ssrRenderList(product.variations, (variation) => {
                    _push2(`<div${_scopeId}>`);
                    if (variation.is_box) {
                      _push2(`<div class="w-full"${_scopeId}><p${_scopeId}>You can&#39;t add a box to another box</p></div>`);
                    } else {
                      _push2(`<div class="w-full"${_scopeId}><div class="flex flex-row items-center gap-10 w-full my-2"${_scopeId}><div class="grow"${_scopeId}>`);
                      _push2(ssrRenderComponent(_component_v_checkbox, {
                        modelValue: form.variation_uids,
                        "onUpdate:modelValue": ($event) => form.variation_uids = $event,
                        value: variation.uid,
                        label: `Variation [${variation.name}]`,
                        "hide-details": "",
                        density: "compact",
                        onChange: ($event) => handleCheckboxChange(variation.uid)
                      }, null, _parent2, _scopeId));
                      _push2(`</div><div style="${ssrRenderStyle({ "width": "200px" })}" class="shrink-0"${_scopeId}>`);
                      if (form.variation_uids.includes(variation.uid)) {
                        _push2(ssrRenderComponent(_component_v_number_input, {
                          class: "shrink-0",
                          modelValue: form.variation_quantities[variation.uid],
                          "onUpdate:modelValue": ($event) => form.variation_quantities[variation.uid] = $event,
                          type: "number",
                          density: "compact",
                          variant: "outlined",
                          "control-variant": "stacked",
                          min: 1,
                          "hide-details": ""
                        }, null, _parent2, _scopeId));
                      } else {
                        _push2(`<!---->`);
                      }
                      _push2(`</div></div></div>`);
                    }
                    _push2(`</div>`);
                  });
                  _push2(`<!--]--></div>`);
                } else {
                  _push2(`<div${_scopeId}><p${_scopeId}>This product doesn&#39;t have variations</p></div>`);
                }
                _push2(`</div></div>`);
              });
              _push2(`<!--]--></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div${_scopeId}>`);
            _push2(ssrRenderComponent(_component_v_label, { class: "uppercase" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Price`);
                } else {
                  return [
                    createTextVNode("Price")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_v_text_field, {
              "prepend-inner-icon": "mdi-currency-usd",
              modelValue: form.price,
              "onUpdate:modelValue": ($event) => form.price = $event,
              "error-messages": local_errors.value.price
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}>`);
            if (isCropping.value) {
              _push2(ssrRenderComponent(unref(VuePictureCropper), {
                boxStyle: {
                  width: "200px",
                  height: "300px",
                  backgroundColor: "#f8f8f8",
                  margin: "auto"
                },
                img: uploadedImg.value,
                options: options.value
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<img${ssrRenderAttr("src", int_type.value === "edit" ? selectedVariation.value.image_url : "/images/products/default.jpg")} alt="Default Image" width="200" height="300" class="mx-auto"${_scopeId}>`);
            }
            _push2(ssrRenderComponent(_component_v_file_input, {
              modelValue: uploadInput.value,
              "onUpdate:modelValue": ($event) => uploadInput.value = $event,
              "prepend-icon": "",
              variant: "outlined",
              density: "compact",
              "prepend-inner-icon": "mdi-image",
              class: "form-control mt-5",
              type: "file",
              id: "uploadImage",
              accept: "image/jpg, image/jpeg, image/png",
              onChange: onFileChange
            }, null, _parent2, _scopeId));
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
                  "error-messages": local_errors.value.name
                }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"]),
                selectedVariation.value ? (openBlock(), createBlock("p", {
                  key: 0,
                  class: "mb-5 italic w-full text-center"
                }, 'Rename to "delete variation" to delete')) : createCommentVNode("", true)
              ]),
              createVNode("div", null, [
                createVNode(_component_v_label, null, {
                  default: withCtx(() => [
                    createTextVNode("This is a box")
                  ]),
                  _: 1
                }),
                createVNode(_component_v_radio_group, {
                  modelValue: form.is_box,
                  "onUpdate:modelValue": ($event) => form.is_box = $event,
                  inline: ""
                }, {
                  default: withCtx(() => [
                    createVNode(_component_v_radio, {
                      label: "No",
                      value: 0
                    }),
                    createVNode(_component_v_radio, {
                      label: "Yes",
                      value: 1
                    })
                  ]),
                  _: 1
                }, 8, ["modelValue", "onUpdate:modelValue"]),
                createVNode("div", null, [
                  createVNode(_component_v_checkbox, {
                    label: "Week-end only",
                    modelValue: form.weekend_only,
                    "onUpdate:modelValue": ($event) => form.weekend_only = $event,
                    "error-messages": props.errors.weekend_only_string
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                ])
              ]),
              form.is_box === 0 ? (openBlock(), createBlock("div", { key: 0 }, [
                createVNode(_component_v_label, { class: "uppercase" }, {
                  default: withCtx(() => [
                    createTextVNode("Number of items")
                  ]),
                  _: 1
                }),
                createVNode(_component_v_text_field, {
                  modelValue: form.items,
                  "onUpdate:modelValue": ($event) => form.items = $event,
                  "error-messages": local_errors.value.items
                }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
              ])) : form.is_box === 1 ? (openBlock(), createBlock("div", {
                key: 1,
                class: "mb-7"
              }, [
                createVNode(_component_v_label, null, {
                  default: withCtx(() => [
                    createTextVNode("Select products")
                  ]),
                  _: 1
                }),
                local_errors.value.variation_uids ? (openBlock(), createBlock("p", {
                  key: 0,
                  class: "text-red-500 my-2"
                }, toDisplayString(local_errors.value.variation_uids), 1)) : createCommentVNode("", true),
                local_errors.value.variation_quantities ? (openBlock(), createBlock("p", {
                  key: 1,
                  class: "text-red-500 my-2"
                }, toDisplayString(local_errors.value.variation_quantities), 1)) : createCommentVNode("", true),
                createVNode("div", { class: "bg-slate-200 px-4 py-3 rounded-lg" }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(props.products, (product) => {
                    return openBlock(), createBlock("div", null, [
                      createVNode("p", { class: "font-bold" }, "Product [" + toDisplayString(product.name) + "]", 1),
                      createVNode("div", { class: "border-2 border-gray-400 px-2 py-1 mb-3" }, [
                        product.variations.length ? (openBlock(), createBlock("div", { key: 0 }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(product.variations, (variation) => {
                            return openBlock(), createBlock("div", null, [
                              variation.is_box ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "w-full"
                              }, [
                                createVNode("p", null, "You can't add a box to another box")
                              ])) : (openBlock(), createBlock("div", {
                                key: 1,
                                class: "w-full"
                              }, [
                                createVNode("div", { class: "flex flex-row items-center gap-10 w-full my-2" }, [
                                  createVNode("div", { class: "grow" }, [
                                    createVNode(_component_v_checkbox, {
                                      modelValue: form.variation_uids,
                                      "onUpdate:modelValue": ($event) => form.variation_uids = $event,
                                      value: variation.uid,
                                      label: `Variation [${variation.name}]`,
                                      "hide-details": "",
                                      density: "compact",
                                      onChange: ($event) => handleCheckboxChange(variation.uid)
                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "value", "label", "onChange"])
                                  ]),
                                  createVNode("div", {
                                    style: { "width": "200px" },
                                    class: "shrink-0"
                                  }, [
                                    form.variation_uids.includes(variation.uid) ? (openBlock(), createBlock(_component_v_number_input, {
                                      key: 0,
                                      class: "shrink-0",
                                      modelValue: form.variation_quantities[variation.uid],
                                      "onUpdate:modelValue": ($event) => form.variation_quantities[variation.uid] = $event,
                                      type: "number",
                                      density: "compact",
                                      variant: "outlined",
                                      "control-variant": "stacked",
                                      min: 1,
                                      "hide-details": ""
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])) : createCommentVNode("", true)
                                  ])
                                ])
                              ]))
                            ]);
                          }), 256))
                        ])) : (openBlock(), createBlock("div", { key: 1 }, [
                          createVNode("p", null, "This product doesn't have variations")
                        ]))
                      ])
                    ]);
                  }), 256))
                ])
              ])) : createCommentVNode("", true),
              createVNode("div", null, [
                createVNode(_component_v_label, { class: "uppercase" }, {
                  default: withCtx(() => [
                    createTextVNode("Price")
                  ]),
                  _: 1
                }),
                createVNode(_component_v_text_field, {
                  "prepend-inner-icon": "mdi-currency-usd",
                  modelValue: form.price,
                  "onUpdate:modelValue": ($event) => form.price = $event,
                  "error-messages": local_errors.value.price
                }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
              ]),
              createVNode("div", null, [
                isCropping.value ? (openBlock(), createBlock(unref(VuePictureCropper), {
                  key: 0,
                  boxStyle: {
                    width: "200px",
                    height: "300px",
                    backgroundColor: "#f8f8f8",
                    margin: "auto"
                  },
                  img: uploadedImg.value,
                  options: options.value
                }, null, 8, ["img", "options"])) : (openBlock(), createBlock("img", {
                  key: 1,
                  src: int_type.value === "edit" ? selectedVariation.value.image_url : "/images/products/default.jpg",
                  alt: "Default Image",
                  width: "200",
                  height: "300",
                  class: "mx-auto"
                }, null, 8, ["src"])),
                createVNode(_component_v_file_input, {
                  modelValue: uploadInput.value,
                  "onUpdate:modelValue": ($event) => uploadInput.value = $event,
                  "prepend-icon": "",
                  variant: "outlined",
                  density: "compact",
                  "prepend-inner-icon": "mdi-image",
                  class: "form-control mt-5",
                  type: "file",
                  id: "uploadImage",
                  accept: "image/jpg, image/jpeg, image/png",
                  onChange: onFileChange
                }, null, 8, ["modelValue", "onUpdate:modelValue"])
              ])
            ];
          }
        }),
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$5, {
              onClick: saveVariation,
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
            _push2(ssrRenderComponent(_sfc_main$6, { onClick: closeVariation }, {
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
              createVNode(_sfc_main$5, {
                onClick: saveVariation,
                class: "me-3"
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(saveButtonText.value), 1)
                ]),
                _: 1
              }),
              createVNode(_sfc_main$6, { onClick: closeVariation }, {
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
      _push(ssrRenderComponent(_sfc_main$3, {
        error_text: local_errors.value.msg
      }, null, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/VariationModal.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "List",
  __ssrInlineRender: true,
  props: {
    categories: Object,
    event_menu_categories: Object,
    products: Object,
    boxable_products: Object,
    errors: Object
  },
  setup(__props) {
    const props = __props;
    const productModal = ref(null);
    const variationModal = ref(null);
    const createVariation = (product) => {
      variationModal.value.openVariation(product, null);
    };
    const editVariation = (product, variation) => {
      variationModal.value.openVariation(product, variation);
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_v_btn = resolveComponent("v-btn");
      const _component_v_card = resolveComponent("v-card");
      const _component_v_card_item = resolveComponent("v-card-item");
      const _component_v_icon = resolveComponent("v-icon");
      const _component_v_tooltip = resolveComponent("v-tooltip");
      const _component_v_chip = resolveComponent("v-chip");
      const _component_v_img = resolveComponent("v-img");
      _push(ssrRenderComponent(AdmLayout, mergeProps({ title: "Products" }, _attrs), {
        buttons: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_v_btn, {
              onClick: ($event) => productModal.value.openProduct(null),
              size: "small"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Create new product`);
                } else {
                  return [
                    createTextVNode("Create new product")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_v_btn, {
                onClick: withModifiers(($event) => productModal.value.openProduct(null), ["prevent"]),
                size: "small"
              }, {
                default: withCtx(() => [
                  createTextVNode("Create new product")
                ]),
                _: 1
              }, 8, ["onClick"])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (props.products.length) {
              _push2(`<div${_scopeId}><div${_scopeId}><div class="flex flex-col gap-3"${_scopeId}><!--[-->`);
              ssrRenderList(props.products, (product) => {
                _push2(`<div${_scopeId}>`);
                _push2(ssrRenderComponent(_component_v_card, null, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_component_v_card_item, null, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`<div class="flex flex-row items-center justify-between"${_scopeId3}><div class="flex flex-row items-center gap-2"${_scopeId3}><p class="text-lg font-bold"${_scopeId3}>${ssrInterpolate(product.name)} - ${ssrInterpolate(product.price_string)}</p>`);
                            _push4(ssrRenderComponent(_component_v_icon, {
                              color: product.active ? "green" : "red"
                            }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`${ssrInterpolate(product.active ? "mdi-eye" : "mdi-eye-off")}`);
                                } else {
                                  return [
                                    createTextVNode(toDisplayString(product.active ? "mdi-eye" : "mdi-eye-off"), 1)
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                            if (product.weekend_only) {
                              _push4(ssrRenderComponent(_component_v_tooltip, {
                                text: "Week-end-only",
                                location: "top"
                              }, {
                                activator: withCtx(({ props: props2 }, _push5, _parent5, _scopeId4) => {
                                  if (_push5) {
                                    _push5(ssrRenderComponent(_component_v_chip, mergeProps({ ref_for: true }, props2, {
                                      color: "amber",
                                      variant: "flat",
                                      size: "x-small"
                                    }), {
                                      default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                        if (_push6) {
                                          _push6(`WE`);
                                        } else {
                                          return [
                                            createTextVNode("WE")
                                          ];
                                        }
                                      }),
                                      _: 2
                                    }, _parent5, _scopeId4));
                                  } else {
                                    return [
                                      createVNode(_component_v_chip, mergeProps({ ref_for: true }, props2, {
                                        color: "amber",
                                        variant: "flat",
                                        size: "x-small"
                                      }), {
                                        default: withCtx(() => [
                                          createTextVNode("WE")
                                        ]),
                                        _: 2
                                      }, 1040)
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent4, _scopeId3));
                            } else {
                              _push4(`<!---->`);
                            }
                            if (product.allow_client_note) {
                              _push4(ssrRenderComponent(_component_v_tooltip, {
                                text: "Client note allowed",
                                location: "top"
                              }, {
                                activator: withCtx(({ props: props2 }, _push5, _parent5, _scopeId4) => {
                                  if (_push5) {
                                    _push5(ssrRenderComponent(_component_v_chip, mergeProps({ ref_for: true }, props2, {
                                      color: "cyan-lighten-2",
                                      variant: "flat",
                                      size: "x-small"
                                    }), {
                                      default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                        if (_push6) {
                                          _push6(`NT`);
                                        } else {
                                          return [
                                            createTextVNode("NT")
                                          ];
                                        }
                                      }),
                                      _: 2
                                    }, _parent5, _scopeId4));
                                  } else {
                                    return [
                                      createVNode(_component_v_chip, mergeProps({ ref_for: true }, props2, {
                                        color: "cyan-lighten-2",
                                        variant: "flat",
                                        size: "x-small"
                                      }), {
                                        default: withCtx(() => [
                                          createTextVNode("NT")
                                        ]),
                                        _: 2
                                      }, 1040)
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent4, _scopeId3));
                            } else {
                              _push4(`<!---->`);
                            }
                            _push4(`</div>`);
                            _push4(ssrRenderComponent(_component_v_btn, {
                              onClick: ($event) => productModal.value.openProduct(product),
                              size: "small"
                            }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`Edit product`);
                                } else {
                                  return [
                                    createTextVNode("Edit product")
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                            _push4(`</div>`);
                            if (product.description) {
                              _push4(`<div${_scopeId3}><p${_scopeId3}>${ssrInterpolate(product.description_formatted)}</p></div>`);
                            } else {
                              _push4(`<!---->`);
                            }
                            _push4(`<hr class="my-2"${_scopeId3}><div class="mt-2"${_scopeId3}>`);
                            if (product.categories.length) {
                              _push4(`<div${_scopeId3}><div class="flex flex-row flex-wrap gap-1"${_scopeId3}>`);
                              if (product.in_sneak_peek_menu) {
                                _push4(`<div${_scopeId3}>`);
                                _push4(ssrRenderComponent(_component_v_chip, {
                                  size: "small",
                                  variant: "outlined"
                                }, {
                                  default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                    if (_push5) {
                                      _push5(`Sneak peek`);
                                    } else {
                                      return [
                                        createTextVNode("Sneak peek")
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent4, _scopeId3));
                                _push4(`</div>`);
                              } else {
                                _push4(`<!---->`);
                              }
                              if (product.in_catering_menu) {
                                _push4(`<div${_scopeId3}>`);
                                _push4(ssrRenderComponent(_component_v_chip, {
                                  size: "small",
                                  variant: "outlined"
                                }, {
                                  default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                    if (_push5) {
                                      _push5(`Events menu`);
                                    } else {
                                      return [
                                        createTextVNode("Events menu")
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent4, _scopeId3));
                                _push4(`</div>`);
                              } else {
                                _push4(`<!---->`);
                              }
                              if (product.in_add_ons_menu) {
                                _push4(`<div${_scopeId3}>`);
                                _push4(ssrRenderComponent(_component_v_chip, {
                                  size: "small",
                                  variant: "outlined"
                                }, {
                                  default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                    if (_push5) {
                                      _push5(`Add-ons`);
                                    } else {
                                      return [
                                        createTextVNode("Add-ons")
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent4, _scopeId3));
                                _push4(`</div>`);
                              } else {
                                _push4(`<!---->`);
                              }
                              _push4(`<!--[-->`);
                              ssrRenderList(product.categories, (category) => {
                                _push4(`<div${_scopeId3}>`);
                                _push4(ssrRenderComponent(_component_v_chip, {
                                  size: "small",
                                  color: "red-darken-4"
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
                                _push4(`</div>`);
                              });
                              _push4(`<!--]--><!--[-->`);
                              ssrRenderList(product.event_menu_categories, (category) => {
                                _push4(`<div${_scopeId3}>`);
                                _push4(ssrRenderComponent(_component_v_chip, {
                                  size: "small",
                                  color: "blue-darken-4"
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
                                _push4(`</div>`);
                              });
                              _push4(`<!--]--></div></div>`);
                            } else {
                              _push4(`<div${_scopeId3}>`);
                              _push4(ssrRenderComponent(_component_v_chip, { size: "x-small" }, {
                                default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                  if (_push5) {
                                    _push5(`Uncategorized`);
                                  } else {
                                    return [
                                      createTextVNode("Uncategorized")
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent4, _scopeId3));
                              _push4(`</div>`);
                            }
                            _push4(`</div><div class="mt-2"${_scopeId3}><div${_scopeId3}><div class="grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-6 gap-3"${_scopeId3}><!--[-->`);
                            ssrRenderList(product.variations, (variation) => {
                              _push4(`<div${_scopeId3}>`);
                              _push4(ssrRenderComponent(_component_v_card, {
                                color: "grey-lighten-4",
                                class: "h-full"
                              }, {
                                default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                  if (_push5) {
                                    _push5(`<div class="flex flex-row items-center h-full"${_scopeId4}><div style="${ssrRenderStyle({ "width": "60px", "height": "100%" })}" class="shrink-0"${_scopeId4}>`);
                                    _push5(ssrRenderComponent(_component_v_img, {
                                      src: variation.image_url,
                                      width: "60px",
                                      class: "h-full",
                                      cover: ""
                                    }, null, _parent5, _scopeId4));
                                    _push5(`</div><div class="p-3 flex-1 min-w-0"${_scopeId4}><p class="truncate"${_scopeId4}>${ssrInterpolate(variation.name)}</p>`);
                                    if (variation.is_box) {
                                      _push5(`<p class="text-sm"${_scopeId4}>(box: ${ssrInterpolate(variation.box_contents)})</p>`);
                                    } else {
                                      _push5(`<p class="text-sm"${_scopeId4}>(${ssrInterpolate(variation.items)} item${ssrInterpolate(variation.items > 1 ? "s" : "")})</p>`);
                                    }
                                    _push5(ssrRenderComponent(_sfc_main$7, {
                                      center: true,
                                      justify: "between"
                                    }, {
                                      default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                        if (_push6) {
                                          _push6(`<div${_scopeId5}>`);
                                          _push6(ssrRenderComponent(_component_v_btn, {
                                            onClick: ($event) => editVariation(product, variation),
                                            size: "x-small"
                                          }, {
                                            default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                              if (_push7) {
                                                _push7(`${ssrInterpolate(variation.price_string)}`);
                                              } else {
                                                return [
                                                  createTextVNode(toDisplayString(variation.price_string), 1)
                                                ];
                                              }
                                            }),
                                            _: 2
                                          }, _parent6, _scopeId5));
                                          _push6(`</div>`);
                                          if (variation.weekend_only) {
                                            _push6(`<div${_scopeId5}>`);
                                            _push6(ssrRenderComponent(_component_v_tooltip, {
                                              text: "Week-end only",
                                              location: "top"
                                            }, {
                                              activator: withCtx(({ props: props2 }, _push7, _parent7, _scopeId6) => {
                                                if (_push7) {
                                                  _push7(ssrRenderComponent(_component_v_chip, mergeProps({ ref_for: true }, props2, {
                                                    color: "amber",
                                                    variant: "flat",
                                                    size: "x-small"
                                                  }), {
                                                    default: withCtx((_6, _push8, _parent8, _scopeId7) => {
                                                      if (_push8) {
                                                        _push8(`WE`);
                                                      } else {
                                                        return [
                                                          createTextVNode("WE")
                                                        ];
                                                      }
                                                    }),
                                                    _: 2
                                                  }, _parent7, _scopeId6));
                                                } else {
                                                  return [
                                                    createVNode(_component_v_chip, mergeProps({ ref_for: true }, props2, {
                                                      color: "amber",
                                                      variant: "flat",
                                                      size: "x-small"
                                                    }), {
                                                      default: withCtx(() => [
                                                        createTextVNode("WE")
                                                      ]),
                                                      _: 2
                                                    }, 1040)
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent6, _scopeId5));
                                            _push6(`</div>`);
                                          } else {
                                            _push6(`<!---->`);
                                          }
                                        } else {
                                          return [
                                            createVNode("div", null, [
                                              createVNode(_component_v_btn, {
                                                onClick: withModifiers(($event) => editVariation(product, variation), ["prevent"]),
                                                size: "x-small"
                                              }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(variation.price_string), 1)
                                                ]),
                                                _: 2
                                              }, 1032, ["onClick"])
                                            ]),
                                            variation.weekend_only ? (openBlock(), createBlock("div", { key: 0 }, [
                                              createVNode(_component_v_tooltip, {
                                                text: "Week-end only",
                                                location: "top"
                                              }, {
                                                activator: withCtx(({ props: props2 }) => [
                                                  createVNode(_component_v_chip, mergeProps({ ref_for: true }, props2, {
                                                    color: "amber",
                                                    variant: "flat",
                                                    size: "x-small"
                                                  }), {
                                                    default: withCtx(() => [
                                                      createTextVNode("WE")
                                                    ]),
                                                    _: 2
                                                  }, 1040)
                                                ]),
                                                _: 1
                                              })
                                            ])) : createCommentVNode("", true)
                                          ];
                                        }
                                      }),
                                      _: 2
                                    }, _parent5, _scopeId4));
                                    _push5(`</div></div>`);
                                  } else {
                                    return [
                                      createVNode("div", { class: "flex flex-row items-center h-full" }, [
                                        createVNode("div", {
                                          style: { "width": "60px", "height": "100%" },
                                          class: "shrink-0"
                                        }, [
                                          createVNode(_component_v_img, {
                                            src: variation.image_url,
                                            width: "60px",
                                            class: "h-full",
                                            cover: ""
                                          }, null, 8, ["src"])
                                        ]),
                                        createVNode("div", { class: "p-3 flex-1 min-w-0" }, [
                                          createVNode("p", { class: "truncate" }, toDisplayString(variation.name), 1),
                                          variation.is_box ? (openBlock(), createBlock("p", {
                                            key: 0,
                                            class: "text-sm"
                                          }, "(box: " + toDisplayString(variation.box_contents) + ")", 1)) : (openBlock(), createBlock("p", {
                                            key: 1,
                                            class: "text-sm"
                                          }, "(" + toDisplayString(variation.items) + " item" + toDisplayString(variation.items > 1 ? "s" : "") + ")", 1)),
                                          createVNode(_sfc_main$7, {
                                            center: true,
                                            justify: "between"
                                          }, {
                                            default: withCtx(() => [
                                              createVNode("div", null, [
                                                createVNode(_component_v_btn, {
                                                  onClick: withModifiers(($event) => editVariation(product, variation), ["prevent"]),
                                                  size: "x-small"
                                                }, {
                                                  default: withCtx(() => [
                                                    createTextVNode(toDisplayString(variation.price_string), 1)
                                                  ]),
                                                  _: 2
                                                }, 1032, ["onClick"])
                                              ]),
                                              variation.weekend_only ? (openBlock(), createBlock("div", { key: 0 }, [
                                                createVNode(_component_v_tooltip, {
                                                  text: "Week-end only",
                                                  location: "top"
                                                }, {
                                                  activator: withCtx(({ props: props2 }) => [
                                                    createVNode(_component_v_chip, mergeProps({ ref_for: true }, props2, {
                                                      color: "amber",
                                                      variant: "flat",
                                                      size: "x-small"
                                                    }), {
                                                      default: withCtx(() => [
                                                        createTextVNode("WE")
                                                      ]),
                                                      _: 2
                                                    }, 1040)
                                                  ]),
                                                  _: 1
                                                })
                                              ])) : createCommentVNode("", true)
                                            ]),
                                            _: 2
                                          }, 1024)
                                        ])
                                      ])
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent4, _scopeId3));
                              _push4(`</div>`);
                            });
                            _push4(`<!--]-->`);
                            _push4(ssrRenderComponent(_component_v_card, {
                              color: "grey-darken-2",
                              class: "h-full"
                            }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`<div class="flex flex-row items-center h-full"${_scopeId4}><div style="${ssrRenderStyle({ "width": "60px", "height": "100%" })}" class="shrink-0"${_scopeId4}>`);
                                  _push5(ssrRenderComponent(_component_v_img, {
                                    src: "/images/products/default.jpg",
                                    width: "60px",
                                    class: "h-full",
                                    cover: ""
                                  }, null, _parent5, _scopeId4));
                                  _push5(`</div><div class="p-3"${_scopeId4}>`);
                                  _push5(ssrRenderComponent(_component_v_btn, {
                                    onClick: ($event) => createVariation(product),
                                    size: "x-small"
                                  }, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`Create variation`);
                                      } else {
                                        return [
                                          createTextVNode("Create variation")
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                  _push5(`</div></div>`);
                                } else {
                                  return [
                                    createVNode("div", { class: "flex flex-row items-center h-full" }, [
                                      createVNode("div", {
                                        style: { "width": "60px", "height": "100%" },
                                        class: "shrink-0"
                                      }, [
                                        createVNode(_component_v_img, {
                                          src: "/images/products/default.jpg",
                                          width: "60px",
                                          class: "h-full",
                                          cover: ""
                                        })
                                      ]),
                                      createVNode("div", { class: "p-3" }, [
                                        createVNode(_component_v_btn, {
                                          onClick: withModifiers(($event) => createVariation(product), ["prevent"]),
                                          size: "x-small"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode("Create variation")
                                          ]),
                                          _: 2
                                        }, 1032, ["onClick"])
                                      ])
                                    ])
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                            _push4(`</div></div></div>`);
                          } else {
                            return [
                              createVNode("div", { class: "flex flex-row items-center justify-between" }, [
                                createVNode("div", { class: "flex flex-row items-center gap-2" }, [
                                  createVNode("p", { class: "text-lg font-bold" }, toDisplayString(product.name) + " - " + toDisplayString(product.price_string), 1),
                                  createVNode(_component_v_icon, {
                                    color: product.active ? "green" : "red"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(product.active ? "mdi-eye" : "mdi-eye-off"), 1)
                                    ]),
                                    _: 2
                                  }, 1032, ["color"]),
                                  product.weekend_only ? (openBlock(), createBlock(_component_v_tooltip, {
                                    key: 0,
                                    text: "Week-end-only",
                                    location: "top"
                                  }, {
                                    activator: withCtx(({ props: props2 }) => [
                                      createVNode(_component_v_chip, mergeProps({ ref_for: true }, props2, {
                                        color: "amber",
                                        variant: "flat",
                                        size: "x-small"
                                      }), {
                                        default: withCtx(() => [
                                          createTextVNode("WE")
                                        ]),
                                        _: 2
                                      }, 1040)
                                    ]),
                                    _: 1
                                  })) : createCommentVNode("", true),
                                  product.allow_client_note ? (openBlock(), createBlock(_component_v_tooltip, {
                                    key: 1,
                                    text: "Client note allowed",
                                    location: "top"
                                  }, {
                                    activator: withCtx(({ props: props2 }) => [
                                      createVNode(_component_v_chip, mergeProps({ ref_for: true }, props2, {
                                        color: "cyan-lighten-2",
                                        variant: "flat",
                                        size: "x-small"
                                      }), {
                                        default: withCtx(() => [
                                          createTextVNode("NT")
                                        ]),
                                        _: 2
                                      }, 1040)
                                    ]),
                                    _: 1
                                  })) : createCommentVNode("", true)
                                ]),
                                createVNode(_component_v_btn, {
                                  onClick: withModifiers(($event) => productModal.value.openProduct(product), ["prevent"]),
                                  size: "small"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("Edit product")
                                  ]),
                                  _: 2
                                }, 1032, ["onClick"])
                              ]),
                              product.description ? (openBlock(), createBlock("div", { key: 0 }, [
                                createVNode("p", null, toDisplayString(product.description_formatted), 1)
                              ])) : createCommentVNode("", true),
                              createVNode("hr", { class: "my-2" }),
                              createVNode("div", { class: "mt-2" }, [
                                product.categories.length ? (openBlock(), createBlock("div", { key: 0 }, [
                                  createVNode("div", { class: "flex flex-row flex-wrap gap-1" }, [
                                    product.in_sneak_peek_menu ? (openBlock(), createBlock("div", { key: 0 }, [
                                      createVNode(_component_v_chip, {
                                        size: "small",
                                        variant: "outlined"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode("Sneak peek")
                                        ]),
                                        _: 1
                                      })
                                    ])) : createCommentVNode("", true),
                                    product.in_catering_menu ? (openBlock(), createBlock("div", { key: 1 }, [
                                      createVNode(_component_v_chip, {
                                        size: "small",
                                        variant: "outlined"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode("Events menu")
                                        ]),
                                        _: 1
                                      })
                                    ])) : createCommentVNode("", true),
                                    product.in_add_ons_menu ? (openBlock(), createBlock("div", { key: 2 }, [
                                      createVNode(_component_v_chip, {
                                        size: "small",
                                        variant: "outlined"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode("Add-ons")
                                        ]),
                                        _: 1
                                      })
                                    ])) : createCommentVNode("", true),
                                    (openBlock(true), createBlock(Fragment, null, renderList(product.categories, (category) => {
                                      return openBlock(), createBlock("div", null, [
                                        createVNode(_component_v_chip, {
                                          size: "small",
                                          color: "red-darken-4"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(category.name), 1)
                                          ]),
                                          _: 2
                                        }, 1024)
                                      ]);
                                    }), 256)),
                                    (openBlock(true), createBlock(Fragment, null, renderList(product.event_menu_categories, (category) => {
                                      return openBlock(), createBlock("div", null, [
                                        createVNode(_component_v_chip, {
                                          size: "small",
                                          color: "blue-darken-4"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(category.name), 1)
                                          ]),
                                          _: 2
                                        }, 1024)
                                      ]);
                                    }), 256))
                                  ])
                                ])) : (openBlock(), createBlock("div", { key: 1 }, [
                                  createVNode(_component_v_chip, { size: "x-small" }, {
                                    default: withCtx(() => [
                                      createTextVNode("Uncategorized")
                                    ]),
                                    _: 1
                                  })
                                ]))
                              ]),
                              createVNode("div", { class: "mt-2" }, [
                                createVNode("div", null, [
                                  createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-6 gap-3" }, [
                                    (openBlock(true), createBlock(Fragment, null, renderList(product.variations, (variation) => {
                                      return openBlock(), createBlock("div", null, [
                                        createVNode(_component_v_card, {
                                          color: "grey-lighten-4",
                                          class: "h-full"
                                        }, {
                                          default: withCtx(() => [
                                            createVNode("div", { class: "flex flex-row items-center h-full" }, [
                                              createVNode("div", {
                                                style: { "width": "60px", "height": "100%" },
                                                class: "shrink-0"
                                              }, [
                                                createVNode(_component_v_img, {
                                                  src: variation.image_url,
                                                  width: "60px",
                                                  class: "h-full",
                                                  cover: ""
                                                }, null, 8, ["src"])
                                              ]),
                                              createVNode("div", { class: "p-3 flex-1 min-w-0" }, [
                                                createVNode("p", { class: "truncate" }, toDisplayString(variation.name), 1),
                                                variation.is_box ? (openBlock(), createBlock("p", {
                                                  key: 0,
                                                  class: "text-sm"
                                                }, "(box: " + toDisplayString(variation.box_contents) + ")", 1)) : (openBlock(), createBlock("p", {
                                                  key: 1,
                                                  class: "text-sm"
                                                }, "(" + toDisplayString(variation.items) + " item" + toDisplayString(variation.items > 1 ? "s" : "") + ")", 1)),
                                                createVNode(_sfc_main$7, {
                                                  center: true,
                                                  justify: "between"
                                                }, {
                                                  default: withCtx(() => [
                                                    createVNode("div", null, [
                                                      createVNode(_component_v_btn, {
                                                        onClick: withModifiers(($event) => editVariation(product, variation), ["prevent"]),
                                                        size: "x-small"
                                                      }, {
                                                        default: withCtx(() => [
                                                          createTextVNode(toDisplayString(variation.price_string), 1)
                                                        ]),
                                                        _: 2
                                                      }, 1032, ["onClick"])
                                                    ]),
                                                    variation.weekend_only ? (openBlock(), createBlock("div", { key: 0 }, [
                                                      createVNode(_component_v_tooltip, {
                                                        text: "Week-end only",
                                                        location: "top"
                                                      }, {
                                                        activator: withCtx(({ props: props2 }) => [
                                                          createVNode(_component_v_chip, mergeProps({ ref_for: true }, props2, {
                                                            color: "amber",
                                                            variant: "flat",
                                                            size: "x-small"
                                                          }), {
                                                            default: withCtx(() => [
                                                              createTextVNode("WE")
                                                            ]),
                                                            _: 2
                                                          }, 1040)
                                                        ]),
                                                        _: 1
                                                      })
                                                    ])) : createCommentVNode("", true)
                                                  ]),
                                                  _: 2
                                                }, 1024)
                                              ])
                                            ])
                                          ]),
                                          _: 2
                                        }, 1024)
                                      ]);
                                    }), 256)),
                                    createVNode(_component_v_card, {
                                      color: "grey-darken-2",
                                      class: "h-full"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode("div", { class: "flex flex-row items-center h-full" }, [
                                          createVNode("div", {
                                            style: { "width": "60px", "height": "100%" },
                                            class: "shrink-0"
                                          }, [
                                            createVNode(_component_v_img, {
                                              src: "/images/products/default.jpg",
                                              width: "60px",
                                              class: "h-full",
                                              cover: ""
                                            })
                                          ]),
                                          createVNode("div", { class: "p-3" }, [
                                            createVNode(_component_v_btn, {
                                              onClick: withModifiers(($event) => createVariation(product), ["prevent"]),
                                              size: "x-small"
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode("Create variation")
                                              ]),
                                              _: 2
                                            }, 1032, ["onClick"])
                                          ])
                                        ])
                                      ]),
                                      _: 2
                                    }, 1024)
                                  ])
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
                              createVNode("div", { class: "flex flex-row items-center gap-2" }, [
                                createVNode("p", { class: "text-lg font-bold" }, toDisplayString(product.name) + " - " + toDisplayString(product.price_string), 1),
                                createVNode(_component_v_icon, {
                                  color: product.active ? "green" : "red"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(product.active ? "mdi-eye" : "mdi-eye-off"), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["color"]),
                                product.weekend_only ? (openBlock(), createBlock(_component_v_tooltip, {
                                  key: 0,
                                  text: "Week-end-only",
                                  location: "top"
                                }, {
                                  activator: withCtx(({ props: props2 }) => [
                                    createVNode(_component_v_chip, mergeProps({ ref_for: true }, props2, {
                                      color: "amber",
                                      variant: "flat",
                                      size: "x-small"
                                    }), {
                                      default: withCtx(() => [
                                        createTextVNode("WE")
                                      ]),
                                      _: 2
                                    }, 1040)
                                  ]),
                                  _: 1
                                })) : createCommentVNode("", true),
                                product.allow_client_note ? (openBlock(), createBlock(_component_v_tooltip, {
                                  key: 1,
                                  text: "Client note allowed",
                                  location: "top"
                                }, {
                                  activator: withCtx(({ props: props2 }) => [
                                    createVNode(_component_v_chip, mergeProps({ ref_for: true }, props2, {
                                      color: "cyan-lighten-2",
                                      variant: "flat",
                                      size: "x-small"
                                    }), {
                                      default: withCtx(() => [
                                        createTextVNode("NT")
                                      ]),
                                      _: 2
                                    }, 1040)
                                  ]),
                                  _: 1
                                })) : createCommentVNode("", true)
                              ]),
                              createVNode(_component_v_btn, {
                                onClick: withModifiers(($event) => productModal.value.openProduct(product), ["prevent"]),
                                size: "small"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("Edit product")
                                ]),
                                _: 2
                              }, 1032, ["onClick"])
                            ]),
                            product.description ? (openBlock(), createBlock("div", { key: 0 }, [
                              createVNode("p", null, toDisplayString(product.description_formatted), 1)
                            ])) : createCommentVNode("", true),
                            createVNode("hr", { class: "my-2" }),
                            createVNode("div", { class: "mt-2" }, [
                              product.categories.length ? (openBlock(), createBlock("div", { key: 0 }, [
                                createVNode("div", { class: "flex flex-row flex-wrap gap-1" }, [
                                  product.in_sneak_peek_menu ? (openBlock(), createBlock("div", { key: 0 }, [
                                    createVNode(_component_v_chip, {
                                      size: "small",
                                      variant: "outlined"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode("Sneak peek")
                                      ]),
                                      _: 1
                                    })
                                  ])) : createCommentVNode("", true),
                                  product.in_catering_menu ? (openBlock(), createBlock("div", { key: 1 }, [
                                    createVNode(_component_v_chip, {
                                      size: "small",
                                      variant: "outlined"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode("Events menu")
                                      ]),
                                      _: 1
                                    })
                                  ])) : createCommentVNode("", true),
                                  product.in_add_ons_menu ? (openBlock(), createBlock("div", { key: 2 }, [
                                    createVNode(_component_v_chip, {
                                      size: "small",
                                      variant: "outlined"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode("Add-ons")
                                      ]),
                                      _: 1
                                    })
                                  ])) : createCommentVNode("", true),
                                  (openBlock(true), createBlock(Fragment, null, renderList(product.categories, (category) => {
                                    return openBlock(), createBlock("div", null, [
                                      createVNode(_component_v_chip, {
                                        size: "small",
                                        color: "red-darken-4"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(category.name), 1)
                                        ]),
                                        _: 2
                                      }, 1024)
                                    ]);
                                  }), 256)),
                                  (openBlock(true), createBlock(Fragment, null, renderList(product.event_menu_categories, (category) => {
                                    return openBlock(), createBlock("div", null, [
                                      createVNode(_component_v_chip, {
                                        size: "small",
                                        color: "blue-darken-4"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(category.name), 1)
                                        ]),
                                        _: 2
                                      }, 1024)
                                    ]);
                                  }), 256))
                                ])
                              ])) : (openBlock(), createBlock("div", { key: 1 }, [
                                createVNode(_component_v_chip, { size: "x-small" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Uncategorized")
                                  ]),
                                  _: 1
                                })
                              ]))
                            ]),
                            createVNode("div", { class: "mt-2" }, [
                              createVNode("div", null, [
                                createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-6 gap-3" }, [
                                  (openBlock(true), createBlock(Fragment, null, renderList(product.variations, (variation) => {
                                    return openBlock(), createBlock("div", null, [
                                      createVNode(_component_v_card, {
                                        color: "grey-lighten-4",
                                        class: "h-full"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode("div", { class: "flex flex-row items-center h-full" }, [
                                            createVNode("div", {
                                              style: { "width": "60px", "height": "100%" },
                                              class: "shrink-0"
                                            }, [
                                              createVNode(_component_v_img, {
                                                src: variation.image_url,
                                                width: "60px",
                                                class: "h-full",
                                                cover: ""
                                              }, null, 8, ["src"])
                                            ]),
                                            createVNode("div", { class: "p-3 flex-1 min-w-0" }, [
                                              createVNode("p", { class: "truncate" }, toDisplayString(variation.name), 1),
                                              variation.is_box ? (openBlock(), createBlock("p", {
                                                key: 0,
                                                class: "text-sm"
                                              }, "(box: " + toDisplayString(variation.box_contents) + ")", 1)) : (openBlock(), createBlock("p", {
                                                key: 1,
                                                class: "text-sm"
                                              }, "(" + toDisplayString(variation.items) + " item" + toDisplayString(variation.items > 1 ? "s" : "") + ")", 1)),
                                              createVNode(_sfc_main$7, {
                                                center: true,
                                                justify: "between"
                                              }, {
                                                default: withCtx(() => [
                                                  createVNode("div", null, [
                                                    createVNode(_component_v_btn, {
                                                      onClick: withModifiers(($event) => editVariation(product, variation), ["prevent"]),
                                                      size: "x-small"
                                                    }, {
                                                      default: withCtx(() => [
                                                        createTextVNode(toDisplayString(variation.price_string), 1)
                                                      ]),
                                                      _: 2
                                                    }, 1032, ["onClick"])
                                                  ]),
                                                  variation.weekend_only ? (openBlock(), createBlock("div", { key: 0 }, [
                                                    createVNode(_component_v_tooltip, {
                                                      text: "Week-end only",
                                                      location: "top"
                                                    }, {
                                                      activator: withCtx(({ props: props2 }) => [
                                                        createVNode(_component_v_chip, mergeProps({ ref_for: true }, props2, {
                                                          color: "amber",
                                                          variant: "flat",
                                                          size: "x-small"
                                                        }), {
                                                          default: withCtx(() => [
                                                            createTextVNode("WE")
                                                          ]),
                                                          _: 2
                                                        }, 1040)
                                                      ]),
                                                      _: 1
                                                    })
                                                  ])) : createCommentVNode("", true)
                                                ]),
                                                _: 2
                                              }, 1024)
                                            ])
                                          ])
                                        ]),
                                        _: 2
                                      }, 1024)
                                    ]);
                                  }), 256)),
                                  createVNode(_component_v_card, {
                                    color: "grey-darken-2",
                                    class: "h-full"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode("div", { class: "flex flex-row items-center h-full" }, [
                                        createVNode("div", {
                                          style: { "width": "60px", "height": "100%" },
                                          class: "shrink-0"
                                        }, [
                                          createVNode(_component_v_img, {
                                            src: "/images/products/default.jpg",
                                            width: "60px",
                                            class: "h-full",
                                            cover: ""
                                          })
                                        ]),
                                        createVNode("div", { class: "p-3" }, [
                                          createVNode(_component_v_btn, {
                                            onClick: withModifiers(($event) => createVariation(product), ["prevent"]),
                                            size: "x-small"
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode("Create variation")
                                            ]),
                                            _: 2
                                          }, 1032, ["onClick"])
                                        ])
                                      ])
                                    ]),
                                    _: 2
                                  }, 1024)
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
                }, _parent2, _scopeId));
                _push2(`</div>`);
              });
              _push2(`<!--]--></div></div></div>`);
            } else {
              _push2(`<div${_scopeId}><p${_scopeId}>There are no products for now</p></div>`);
            }
            _push2(ssrRenderComponent(_sfc_main$2, {
              ref_key: "productModal",
              ref: productModal,
              categories: props.categories,
              event_menu_categories: props.event_menu_categories,
              errors: props.errors
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1, {
              ref_key: "variationModal",
              ref: variationModal,
              products: props.boxable_products,
              errors: props.errors
            }, null, _parent2, _scopeId));
          } else {
            return [
              props.products.length ? (openBlock(), createBlock("div", { key: 0 }, [
                createVNode("div", null, [
                  createVNode("div", { class: "flex flex-col gap-3" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(props.products, (product) => {
                      return openBlock(), createBlock("div", null, [
                        createVNode(_component_v_card, null, {
                          default: withCtx(() => [
                            createVNode(_component_v_card_item, null, {
                              default: withCtx(() => [
                                createVNode("div", { class: "flex flex-row items-center justify-between" }, [
                                  createVNode("div", { class: "flex flex-row items-center gap-2" }, [
                                    createVNode("p", { class: "text-lg font-bold" }, toDisplayString(product.name) + " - " + toDisplayString(product.price_string), 1),
                                    createVNode(_component_v_icon, {
                                      color: product.active ? "green" : "red"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(product.active ? "mdi-eye" : "mdi-eye-off"), 1)
                                      ]),
                                      _: 2
                                    }, 1032, ["color"]),
                                    product.weekend_only ? (openBlock(), createBlock(_component_v_tooltip, {
                                      key: 0,
                                      text: "Week-end-only",
                                      location: "top"
                                    }, {
                                      activator: withCtx(({ props: props2 }) => [
                                        createVNode(_component_v_chip, mergeProps({ ref_for: true }, props2, {
                                          color: "amber",
                                          variant: "flat",
                                          size: "x-small"
                                        }), {
                                          default: withCtx(() => [
                                            createTextVNode("WE")
                                          ]),
                                          _: 2
                                        }, 1040)
                                      ]),
                                      _: 1
                                    })) : createCommentVNode("", true),
                                    product.allow_client_note ? (openBlock(), createBlock(_component_v_tooltip, {
                                      key: 1,
                                      text: "Client note allowed",
                                      location: "top"
                                    }, {
                                      activator: withCtx(({ props: props2 }) => [
                                        createVNode(_component_v_chip, mergeProps({ ref_for: true }, props2, {
                                          color: "cyan-lighten-2",
                                          variant: "flat",
                                          size: "x-small"
                                        }), {
                                          default: withCtx(() => [
                                            createTextVNode("NT")
                                          ]),
                                          _: 2
                                        }, 1040)
                                      ]),
                                      _: 1
                                    })) : createCommentVNode("", true)
                                  ]),
                                  createVNode(_component_v_btn, {
                                    onClick: withModifiers(($event) => productModal.value.openProduct(product), ["prevent"]),
                                    size: "small"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode("Edit product")
                                    ]),
                                    _: 2
                                  }, 1032, ["onClick"])
                                ]),
                                product.description ? (openBlock(), createBlock("div", { key: 0 }, [
                                  createVNode("p", null, toDisplayString(product.description_formatted), 1)
                                ])) : createCommentVNode("", true),
                                createVNode("hr", { class: "my-2" }),
                                createVNode("div", { class: "mt-2" }, [
                                  product.categories.length ? (openBlock(), createBlock("div", { key: 0 }, [
                                    createVNode("div", { class: "flex flex-row flex-wrap gap-1" }, [
                                      product.in_sneak_peek_menu ? (openBlock(), createBlock("div", { key: 0 }, [
                                        createVNode(_component_v_chip, {
                                          size: "small",
                                          variant: "outlined"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode("Sneak peek")
                                          ]),
                                          _: 1
                                        })
                                      ])) : createCommentVNode("", true),
                                      product.in_catering_menu ? (openBlock(), createBlock("div", { key: 1 }, [
                                        createVNode(_component_v_chip, {
                                          size: "small",
                                          variant: "outlined"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode("Events menu")
                                          ]),
                                          _: 1
                                        })
                                      ])) : createCommentVNode("", true),
                                      product.in_add_ons_menu ? (openBlock(), createBlock("div", { key: 2 }, [
                                        createVNode(_component_v_chip, {
                                          size: "small",
                                          variant: "outlined"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode("Add-ons")
                                          ]),
                                          _: 1
                                        })
                                      ])) : createCommentVNode("", true),
                                      (openBlock(true), createBlock(Fragment, null, renderList(product.categories, (category) => {
                                        return openBlock(), createBlock("div", null, [
                                          createVNode(_component_v_chip, {
                                            size: "small",
                                            color: "red-darken-4"
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(category.name), 1)
                                            ]),
                                            _: 2
                                          }, 1024)
                                        ]);
                                      }), 256)),
                                      (openBlock(true), createBlock(Fragment, null, renderList(product.event_menu_categories, (category) => {
                                        return openBlock(), createBlock("div", null, [
                                          createVNode(_component_v_chip, {
                                            size: "small",
                                            color: "blue-darken-4"
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(category.name), 1)
                                            ]),
                                            _: 2
                                          }, 1024)
                                        ]);
                                      }), 256))
                                    ])
                                  ])) : (openBlock(), createBlock("div", { key: 1 }, [
                                    createVNode(_component_v_chip, { size: "x-small" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Uncategorized")
                                      ]),
                                      _: 1
                                    })
                                  ]))
                                ]),
                                createVNode("div", { class: "mt-2" }, [
                                  createVNode("div", null, [
                                    createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-6 gap-3" }, [
                                      (openBlock(true), createBlock(Fragment, null, renderList(product.variations, (variation) => {
                                        return openBlock(), createBlock("div", null, [
                                          createVNode(_component_v_card, {
                                            color: "grey-lighten-4",
                                            class: "h-full"
                                          }, {
                                            default: withCtx(() => [
                                              createVNode("div", { class: "flex flex-row items-center h-full" }, [
                                                createVNode("div", {
                                                  style: { "width": "60px", "height": "100%" },
                                                  class: "shrink-0"
                                                }, [
                                                  createVNode(_component_v_img, {
                                                    src: variation.image_url,
                                                    width: "60px",
                                                    class: "h-full",
                                                    cover: ""
                                                  }, null, 8, ["src"])
                                                ]),
                                                createVNode("div", { class: "p-3 flex-1 min-w-0" }, [
                                                  createVNode("p", { class: "truncate" }, toDisplayString(variation.name), 1),
                                                  variation.is_box ? (openBlock(), createBlock("p", {
                                                    key: 0,
                                                    class: "text-sm"
                                                  }, "(box: " + toDisplayString(variation.box_contents) + ")", 1)) : (openBlock(), createBlock("p", {
                                                    key: 1,
                                                    class: "text-sm"
                                                  }, "(" + toDisplayString(variation.items) + " item" + toDisplayString(variation.items > 1 ? "s" : "") + ")", 1)),
                                                  createVNode(_sfc_main$7, {
                                                    center: true,
                                                    justify: "between"
                                                  }, {
                                                    default: withCtx(() => [
                                                      createVNode("div", null, [
                                                        createVNode(_component_v_btn, {
                                                          onClick: withModifiers(($event) => editVariation(product, variation), ["prevent"]),
                                                          size: "x-small"
                                                        }, {
                                                          default: withCtx(() => [
                                                            createTextVNode(toDisplayString(variation.price_string), 1)
                                                          ]),
                                                          _: 2
                                                        }, 1032, ["onClick"])
                                                      ]),
                                                      variation.weekend_only ? (openBlock(), createBlock("div", { key: 0 }, [
                                                        createVNode(_component_v_tooltip, {
                                                          text: "Week-end only",
                                                          location: "top"
                                                        }, {
                                                          activator: withCtx(({ props: props2 }) => [
                                                            createVNode(_component_v_chip, mergeProps({ ref_for: true }, props2, {
                                                              color: "amber",
                                                              variant: "flat",
                                                              size: "x-small"
                                                            }), {
                                                              default: withCtx(() => [
                                                                createTextVNode("WE")
                                                              ]),
                                                              _: 2
                                                            }, 1040)
                                                          ]),
                                                          _: 1
                                                        })
                                                      ])) : createCommentVNode("", true)
                                                    ]),
                                                    _: 2
                                                  }, 1024)
                                                ])
                                              ])
                                            ]),
                                            _: 2
                                          }, 1024)
                                        ]);
                                      }), 256)),
                                      createVNode(_component_v_card, {
                                        color: "grey-darken-2",
                                        class: "h-full"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode("div", { class: "flex flex-row items-center h-full" }, [
                                            createVNode("div", {
                                              style: { "width": "60px", "height": "100%" },
                                              class: "shrink-0"
                                            }, [
                                              createVNode(_component_v_img, {
                                                src: "/images/products/default.jpg",
                                                width: "60px",
                                                class: "h-full",
                                                cover: ""
                                              })
                                            ]),
                                            createVNode("div", { class: "p-3" }, [
                                              createVNode(_component_v_btn, {
                                                onClick: withModifiers(($event) => createVariation(product), ["prevent"]),
                                                size: "x-small"
                                              }, {
                                                default: withCtx(() => [
                                                  createTextVNode("Create variation")
                                                ]),
                                                _: 2
                                              }, 1032, ["onClick"])
                                            ])
                                          ])
                                        ]),
                                        _: 2
                                      }, 1024)
                                    ])
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
                  ])
                ])
              ])) : (openBlock(), createBlock("div", { key: 1 }, [
                createVNode("p", null, "There are no products for now")
              ])),
              createVNode(_sfc_main$2, {
                ref_key: "productModal",
                ref: productModal,
                categories: props.categories,
                event_menu_categories: props.event_menu_categories,
                errors: props.errors
              }, null, 8, ["categories", "event_menu_categories", "errors"]),
              createVNode(_sfc_main$1, {
                ref_key: "variationModal",
                ref: variationModal,
                products: props.boxable_products,
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Products/List.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
