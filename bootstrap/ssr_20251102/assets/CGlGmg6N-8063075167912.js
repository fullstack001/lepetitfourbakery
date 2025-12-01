import { ref, mergeProps, withCtx, createTextVNode, toDisplayString, createVNode, useSSRContext, computed, reactive, watch, onMounted, nextTick, resolveComponent, unref, openBlock, createBlock, createCommentVNode, withModifiers, Fragment, renderList } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderStyle, ssrRenderAttr } from "vue/server-renderer";
import { A as AppLayout } from "./BQTBzxda-1835617976051.js";
import { Head, router } from "@inertiajs/vue3";
import { _ as _sfc_main$5 } from "./CznY329j-6813667791076.js";
import { W as Wrapper } from "./CKjt-vIU-6617638167690.js";
import { _ as _sfc_main$6 } from "./BGTMc6Vz-1916666776038.js";
import flatPickr from "vue-flatpickr-component";
import Flickity from "flickity";
/* empty css                       */
import { _ as _sfc_main$2 } from "./D2KjorHx-1875739460561.js";
import { _ as _sfc_main$3 } from "./DsvTyKEu-3067955167518.js";
import { _ as _sfc_main$4 } from "./CeVcRmCk-1577655618930.js";
import { a as _sfc_main$7 } from "./Cyl_ukyB-5873697610160.js";
import { _ as _export_sfc } from "./1tPrXgE0-4581736670159.js";
import "./BW6cC8iL-1677159380657.js";
import "./kZV6a-x4-6055183876791.js";
import "vuetify";
import "./DKEAH6nn-8515365770691.js";
import "mitt";
import "gsap";
import "gsap/ScrollTrigger.js";
import "gsap/ScrollSmoother.js";
import "./BPBs_0V9-9736651018597.js";
import "./C6q4kDV--1536774619085.js";
const _sfc_main$1 = {
  __name: "ConfirmModal",
  __ssrInlineRender: true,
  props: {
    title: null,
    text: null
  },
  emits: ["confirm", "close"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const showConfirmModal = ref(false);
    ref(null);
    const modalTitle = ref(null);
    const saveButtonText = ref(null);
    const props = __props;
    const openConfirm = () => {
      modalTitle.value = props.title;
      saveButtonText.value = props.text;
      showConfirmModal.value = true;
    };
    const closeConfirm = () => {
      showConfirmModal.value = false;
      emit("close");
    };
    const saveConfirm = () => {
      emit("confirm");
    };
    __expose({ openConfirm, closeConfirm });
    const emit = __emit;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$2, mergeProps({
        show: showConfirmModal.value,
        onClose: closeConfirm
      }, _attrs), {
        title: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Please confirm `);
          } else {
            return [
              createTextVNode(" Please confirm ")
            ];
          }
        }),
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(modalTitle.value)}`);
          } else {
            return [
              createTextVNode(toDisplayString(modalTitle.value), 1)
            ];
          }
        }),
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$3, {
              onClick: saveConfirm,
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
            _push2(ssrRenderComponent(_sfc_main$4, { onClick: closeConfirm }, {
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
              createVNode(_sfc_main$3, {
                onClick: saveConfirm,
                class: "me-3"
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(saveButtonText.value), 1)
                ]),
                _: 1
              }),
              createVNode(_sfc_main$4, { onClick: closeConfirm }, {
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
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/ConfirmModal.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ Object.assign({ layout: AppLayout }, {
  __name: "Cart",
  __ssrInlineRender: true,
  props: {
    order_items: Object,
    total_amount: String,
    quick_days: Object,
    first_day_string: String,
    first_pickup_date: String,
    last_pickup_date: String,
    available_times: Object,
    settings: Object,
    closed_dates: Array,
    full_name: { type: String, default: "" },
    email: { type: String, default: "" },
    phone: { type: String, default: "" },
    order_notes: { type: String, default: "" },
    is_auth: Boolean,
    is_weekend_only: Boolean
  },
  setup(__props) {
    const props = __props;
    const carousel = ref(null);
    const calendar = ref(null);
    const localProducts = ref([]);
    const selectedDate = ref("");
    const selectedTime = ref("");
    const showPickupModal = ref(false);
    const modalTitle = ref("");
    ref("");
    const isDragging = ref(false);
    const flickityInit = ref(true);
    const closedDates = ref([]);
    const orderNotes = ref("");
    const updateLocalProducts = () => {
      localProducts.value = props.order_items.map((product) => ({ ...product }));
    };
    computed(() => {
      return localProducts.value.reduce((total, product) => total + product.total_price, 0);
    });
    function isValidUrl(url) {
      try {
        new URL(url);
        return true;
      } catch (e) {
        return false;
      }
    }
    const openCalendar = () => {
      if (showPickupModal.value && calendar.value) {
        nextTick(() => {
          calendar.value.open();
        });
      }
    };
    const flickityCarousel = ref(null);
    const openPickup = () => {
      if (flickityInit.value) {
        modalTitle.value = "Select a date and time for pickup";
        showPickupModal.value = true;
        nextTick(() => {
          flickityInit.value = false;
          if (flickityCarousel.value) flickityCarousel.value.destroy();
          flickityCarousel.value = new Flickity(carousel.value, {
            cellAlign: "left",
            contain: true,
            pageDots: false,
            prevNextButtons: false,
            autoPlay: false
          });
          flickityCarousel.value.on("dragStart", () => {
            isDragging.value = true;
          });
          flickityCarousel.value.on("dragEnd", () => {
            isDragging.value = false;
          });
          setTimeout(() => {
            carousel.value.style.opacity = 1;
          }, 100);
        });
      }
    };
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
    const dateTimeSet = computed(() => {
      return selectedDate.value && selectedTime.value;
    });
    const enteredName = ref("");
    const enteredEmail = ref("");
    const enteredPhone = ref("");
    const useGiftCard = ref(false);
    const giftCardVerified = ref(false);
    const GiftCardNumber = ref("");
    ref("");
    ref("red");
    const amountPaidViaGiftCard = ref(0);
    computed(() => {
      return amountPaidViaGiftCard.value.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
    });
    const remainderToPay = ref(0);
    computed(() => {
      return remainderToPay.value.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
    });
    const errors = reactive({});
    const isOrdering = ref(false);
    const checkout = () => {
      isOrdering.value = true;
      Object.keys(errors).forEach((key) => delete errors[key]);
      axios.post(route("checkout"), {
        date: selectedDate.value,
        time: selectedTime.value,
        full_name: enteredName.value,
        email: enteredEmail.value,
        phone: enteredPhone.value,
        number: GiftCardNumber.value,
        notes: orderNotes.value
      }).then((response) => {
        const url = response.data.url;
        if (url === "error") {
          isOrdering.value = false;
          console.log("An error occurred");
        } else if (isValidUrl(url)) {
          window.location.href = url;
        } else {
          isOrdering.value = false;
          console.log("Invalid URL");
        }
      }).catch((error) => {
        isOrdering.value = false;
        if (error.response && error.response.data && error.response.data.errors) {
          const responseErrors = error.response.data.errors;
          Object.keys(responseErrors).forEach((key) => {
            errors[key] = responseErrors[key];
          });
        } else {
          errors.value = ["An unexpected error occurred. Please try again."];
        }
      });
    };
    const canPlaceOrder = ref(true);
    const updatedProduct = ref(null);
    const canUpdateOrder = ref(true);
    const timeout = ref(null);
    const confirmModal = ref(null);
    const askConfirmDelete = () => {
      confirmModal.value.openConfirm();
    };
    const isTimeSlotAvailable = (time) => {
      return selectedDate.value && timeslotsAvailable.value && time.available;
    };
    const updateQuantity = (uid, quantity) => {
      canUpdateOrder.value = false;
      router.post(route("update_cart_quantity"), {
        uid,
        quantity
      }, {
        preserveScroll: true,
        preserveState: true,
        onSuccess: (page) => {
          console.log("success");
          if (timeout.value) {
            clearTimeout(timeout.value);
          }
          canUpdateOrder.value = true;
          canPlaceOrder.value = true;
          updateLocalProducts();
        },
        onError: (error) => {
          console.log(error);
        }
      });
    };
    const reduceQuantity = (product) => {
      canPlaceOrder.value = false;
      if (canUpdateOrder.value && (updatedProduct.value === null || updatedProduct.value === product.uid)) {
        updatedProduct.value = product.uid;
        if (product.quantity > 1) {
          product.quantity--;
          if (timeout.value) {
            clearTimeout(timeout.value);
          }
          timeout.value = setTimeout(() => {
            updateQuantity(product.uid, product.quantity);
          }, 1e3);
        } else {
          updatedProduct.value = product.uid;
          askConfirmDelete();
        }
      }
    };
    const increaseQuantity = (product) => {
      canPlaceOrder.value = false;
      if (canUpdateOrder.value && (updatedProduct.value === null || updatedProduct.value === product.uid)) {
        updatedProduct.value = product.uid;
        product.quantity++;
        if (timeout.value) {
          clearTimeout(timeout.value);
        }
        timeout.value = setTimeout(() => {
          updateQuantity(product.uid, product.quantity);
        }, 1e3);
      }
    };
    const confirmDelete = () => {
      if (updatedProduct.value) {
        router.post(route("delete_cart_item"), {
          uid: updatedProduct.value
        }, {
          preserveScroll: true,
          preserveState: true,
          onSuccess: (page) => {
            confirmModal.value.closeConfirm();
            updateLocalProducts();
          },
          onError: (error) => {
            console.log(error);
          }
        });
      }
    };
    const closeConfirm = () => {
      updatedProduct.value = null;
    };
    watch(useGiftCard, (newValue) => {
      if (!newValue) {
        GiftCardNumber.value = "";
      }
    });
    const editingNote = ref("");
    const selectedNote = ref("");
    const editNote = (uid, note) => {
      editingNote.value = uid;
      selectedNote.value = note;
    };
    const closeEditNote = () => {
      editingNote.value = "";
      selectedNote.value = "";
    };
    const local_errors = ref({});
    const saveNote = () => {
      local_errors.value = {};
      router.post(route("update_note", { item: editingNote.value }), {
        note: selectedNote.value
      }, {
        preserveScroll: true,
        preserveState: true,
        onSuccess: (page) => {
          closeEditNote();
          updateLocalProducts();
        },
        onError: (error) => {
          local_errors.value = props.errors;
        }
      });
    };
    onMounted(() => {
      nextTick(() => {
        timeslots.value = { ...props.available_times };
        closedDates.value = props.closed_dates;
        updateLocalProducts();
        enteredName.value = props.full_name;
        enteredEmail.value = props.email;
        enteredPhone.value = props.phone;
        orderNotes.value = props.order_notes;
      });
    });
    const calendarTargetRef = ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_v_card = resolveComponent("v-card");
      const _component_v_chip = resolveComponent("v-chip");
      const _component_v_btn = resolveComponent("v-btn");
      const _component_v_textarea = resolveComponent("v-textarea");
      const _component_v_label = resolveComponent("v-label");
      const _component_v_text_field = resolveComponent("v-text-field");
      resolveComponent("v-checkbox");
      resolveComponent("v-table");
      const _component_v_card_item = resolveComponent("v-card-item");
      const _component_v_icon = resolveComponent("v-icon");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Cart" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$5, { wrapper: "section" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(Wrapper, { wrapper: "section" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="pt-10" data-v-65d9041e${_scopeId2}><div data-v-65d9041e${_scopeId2}><div class="flex justify-center" data-v-65d9041e${_scopeId2}><div class="text-center" data-v-65d9041e${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$6, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Cart`);
                      } else {
                        return [
                          createTextVNode("Cart")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div></div></div>`);
                  if (localProducts.value.length > 0) {
                    _push3(`<div data-v-65d9041e${_scopeId2}><div data-v-65d9041e${_scopeId2}><div class="grid grid-cols-1 lg:grid-cols-4 gap-3" data-v-65d9041e${_scopeId2}><div class="col-span-3" data-v-65d9041e${_scopeId2}><!--[-->`);
                    ssrRenderList(localProducts.value, (product) => {
                      _push3(`<div data-v-65d9041e${_scopeId2}>`);
                      _push3(ssrRenderComponent(_component_v_card, {
                        color: "grey-lighten-3",
                        class: "px-4 pt-4 pb-2 my-4",
                        rounded: "lg"
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          var _a, _b, _c, _d;
                          if (_push4) {
                            _push4(`<div class="lg:flex flex-row gap-10" data-v-65d9041e${_scopeId3}><div class="shrink-0" style="${ssrRenderStyle({ "width": "60px" })}" data-v-65d9041e${_scopeId3}><img${ssrRenderAttr("src", product.thumbnail)} alt="" data-v-65d9041e${_scopeId3}><div style="${ssrRenderStyle({ "height": "10px" })}" class="block lg:hidden" data-v-65d9041e${_scopeId3}></div></div><div class="grow" data-v-65d9041e${_scopeId3}><div class="grid grid-cols-2 lg:grid-cols-4 gap-3 h-full" data-v-65d9041e${_scopeId3}><div class="col-span-2 lg:col-span-1 h-full flex items-center" data-v-65d9041e${_scopeId3}><div data-v-65d9041e${_scopeId3}><p class="font-bold" data-v-65d9041e${_scopeId3}>${ssrInterpolate(product.product_name)}</p><p data-v-65d9041e${_scopeId3}>${ssrInterpolate(product.variation_name)}</p>`);
                            if (product.weekend_only) {
                              _push4(`<div class="mt-1" data-v-65d9041e${_scopeId3}>`);
                              _push4(ssrRenderComponent(_component_v_chip, {
                                size: "x-small",
                                variant: "outlined"
                              }, {
                                default: withCtx((_4, _push5, _parent5, _scopeId4) => {
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
                              _push4(`</div>`);
                            } else {
                              _push4(`<!---->`);
                            }
                            _push4(`</div></div><div class="h-full flex items-center lg:justify-center lg:text-center" data-v-65d9041e${_scopeId3}><div data-v-65d9041e${_scopeId3}><p class="text-sm" data-v-65d9041e${_scopeId3}>Price</p><p data-v-65d9041e${_scopeId3}>${ssrInterpolate(product.variation_price)}</p></div></div><div class="h-full flex flex-row items-center lg:justify-center lg:text-center" data-v-65d9041e${_scopeId3}><div data-v-65d9041e${_scopeId3}><p class="text-sm" data-v-65d9041e${_scopeId3}>Quantity</p>`);
                            _push4(ssrRenderComponent(_component_v_btn, {
                              onClick: ($event) => reduceQuantity(product),
                              color: "grey-lighten-3",
                              size: "small",
                              class: "px-0",
                              style: { "width": "30px" },
                              icon: "mdi-minus"
                            }, null, _parent4, _scopeId3));
                            _push4(ssrRenderComponent(_component_v_btn, {
                              color: "grey-lighten-3",
                              class: "px-0",
                              style: { "width": "30px" }
                            }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`${ssrInterpolate(product.quantity)}`);
                                } else {
                                  return [
                                    createTextVNode(toDisplayString(product.quantity), 1)
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                            _push4(ssrRenderComponent(_component_v_btn, {
                              onClick: ($event) => increaseQuantity(product),
                              color: "grey-lighten-3",
                              size: "small",
                              class: "px-0",
                              style: { "width": "30px" },
                              icon: "mdi-plus"
                            }, null, _parent4, _scopeId3));
                            _push4(`</div></div><div class="h-full flex items-center lg:justify-end lg:text-end" data-v-65d9041e${_scopeId3}><div data-v-65d9041e${_scopeId3}><p class="text-sm" data-v-65d9041e${_scopeId3}>Total</p><p data-v-65d9041e${_scopeId3}>${ssrInterpolate(product.amount)}</p></div></div></div></div></div>`);
                            if (((_b = (_a = product == null ? void 0 : product.variation) == null ? void 0 : _a.product) == null ? void 0 : _b.allow_client_note) ?? false) {
                              _push4(`<!--[--><div class="pt-2 pb-0" data-v-65d9041e${_scopeId3}><hr style="${ssrRenderStyle({ "border": "solid 1px #ccc" })}" data-v-65d9041e${_scopeId3}></div><div class="flex flex-row justify-center" data-v-65d9041e${_scopeId3}><div class="w-full pt-3 pb-2" data-v-65d9041e${_scopeId3}><div class="flex flex-row items-center justify-between mb-2" data-v-65d9041e${_scopeId3}><div data-v-65d9041e${_scopeId3}><p class="text-sm" data-v-65d9041e${_scopeId3}>Note (optional)</p></div><div data-v-65d9041e${_scopeId3}>`);
                              _push4(ssrRenderComponent(_component_v_btn, {
                                onClick: ($event) => editNote(product.uid, product.client_note),
                                size: "x-small",
                                color: "grey"
                              }, {
                                default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                  if (_push5) {
                                    _push5(`Edit note`);
                                  } else {
                                    return [
                                      createTextVNode("Edit note")
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent4, _scopeId3));
                              _push4(`</div></div><div data-v-65d9041e${_scopeId3}>`);
                              if (editingNote.value === product.uid) {
                                _push4(`<!--[-->`);
                                _push4(ssrRenderComponent(_component_v_textarea, {
                                  rows: "1",
                                  "auto-grow": "",
                                  modelValue: selectedNote.value,
                                  "onUpdate:modelValue": ($event) => selectedNote.value = $event,
                                  variant: "solo",
                                  flat: "",
                                  "bg-color": "white",
                                  "hide-details": ""
                                }, null, _parent4, _scopeId3));
                                _push4(`<div class="flex flex-row items-center justify-center gap-2 mt-2" data-v-65d9041e${_scopeId3}><div data-v-65d9041e${_scopeId3}>`);
                                _push4(ssrRenderComponent(_component_v_btn, {
                                  onClick: saveNote,
                                  size: "small",
                                  color: "green"
                                }, {
                                  default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                    if (_push5) {
                                      _push5(`Save`);
                                    } else {
                                      return [
                                        createTextVNode("Save")
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent4, _scopeId3));
                                _push4(`</div><div data-v-65d9041e${_scopeId3}>`);
                                _push4(ssrRenderComponent(_component_v_btn, {
                                  onClick: closeEditNote,
                                  size: "small",
                                  color: "grey"
                                }, {
                                  default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                    if (_push5) {
                                      _push5(`Cancel`);
                                    } else {
                                      return [
                                        createTextVNode("Cancel")
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent4, _scopeId3));
                                _push4(`</div></div><!--]-->`);
                              } else {
                                _push4(ssrRenderComponent(_component_v_textarea, {
                                  rows: "1",
                                  "auto-grow": "",
                                  "model-value": product.client_note,
                                  variant: "solo",
                                  flat: "",
                                  "bg-color": "grey-lighten-2",
                                  "hide-details": "",
                                  readonly: ""
                                }, null, _parent4, _scopeId3));
                              }
                              _push4(`</div></div></div><!--]-->`);
                            } else {
                              _push4(`<!---->`);
                            }
                          } else {
                            return [
                              createVNode("div", { class: "lg:flex flex-row gap-10" }, [
                                createVNode("div", {
                                  class: "shrink-0",
                                  style: { "width": "60px" }
                                }, [
                                  createVNode("img", {
                                    src: product.thumbnail,
                                    alt: ""
                                  }, null, 8, ["src"]),
                                  createVNode("div", {
                                    style: { "height": "10px" },
                                    class: "block lg:hidden"
                                  })
                                ]),
                                createVNode("div", { class: "grow" }, [
                                  createVNode("div", { class: "grid grid-cols-2 lg:grid-cols-4 gap-3 h-full" }, [
                                    createVNode("div", { class: "col-span-2 lg:col-span-1 h-full flex items-center" }, [
                                      createVNode("div", null, [
                                        createVNode("p", { class: "font-bold" }, toDisplayString(product.product_name), 1),
                                        createVNode("p", null, toDisplayString(product.variation_name), 1),
                                        product.weekend_only ? (openBlock(), createBlock("div", {
                                          key: 0,
                                          class: "mt-1"
                                        }, [
                                          createVNode(_component_v_chip, {
                                            size: "x-small",
                                            variant: "outlined"
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode("Week-end only")
                                            ]),
                                            _: 1
                                          })
                                        ])) : createCommentVNode("", true)
                                      ])
                                    ]),
                                    createVNode("div", { class: "h-full flex items-center lg:justify-center lg:text-center" }, [
                                      createVNode("div", null, [
                                        createVNode("p", { class: "text-sm" }, "Price"),
                                        createVNode("p", null, toDisplayString(product.variation_price), 1)
                                      ])
                                    ]),
                                    createVNode("div", { class: "h-full flex flex-row items-center lg:justify-center lg:text-center" }, [
                                      createVNode("div", null, [
                                        createVNode("p", { class: "text-sm" }, "Quantity"),
                                        createVNode(_component_v_btn, {
                                          onClick: withModifiers(($event) => reduceQuantity(product), ["prevent"]),
                                          color: "grey-lighten-3",
                                          size: "small",
                                          class: "px-0",
                                          style: { "width": "30px" },
                                          icon: "mdi-minus"
                                        }, null, 8, ["onClick"]),
                                        createVNode(_component_v_btn, {
                                          color: "grey-lighten-3",
                                          class: "px-0",
                                          style: { "width": "30px" }
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(product.quantity), 1)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(_component_v_btn, {
                                          onClick: withModifiers(($event) => increaseQuantity(product), ["prevent"]),
                                          color: "grey-lighten-3",
                                          size: "small",
                                          class: "px-0",
                                          style: { "width": "30px" },
                                          icon: "mdi-plus"
                                        }, null, 8, ["onClick"])
                                      ])
                                    ]),
                                    createVNode("div", { class: "h-full flex items-center lg:justify-end lg:text-end" }, [
                                      createVNode("div", null, [
                                        createVNode("p", { class: "text-sm" }, "Total"),
                                        createVNode("p", null, toDisplayString(product.amount), 1)
                                      ])
                                    ])
                                  ])
                                ])
                              ]),
                              ((_d = (_c = product == null ? void 0 : product.variation) == null ? void 0 : _c.product) == null ? void 0 : _d.allow_client_note) ?? false ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                                createVNode("div", { class: "pt-2 pb-0" }, [
                                  createVNode("hr", { style: { "border": "solid 1px #ccc" } })
                                ]),
                                createVNode("div", { class: "flex flex-row justify-center" }, [
                                  createVNode("div", { class: "w-full pt-3 pb-2" }, [
                                    createVNode("div", { class: "flex flex-row items-center justify-between mb-2" }, [
                                      createVNode("div", null, [
                                        createVNode("p", { class: "text-sm" }, "Note (optional)")
                                      ]),
                                      createVNode("div", null, [
                                        createVNode(_component_v_btn, {
                                          onClick: withModifiers(($event) => editNote(product.uid, product.client_note), ["prevent"]),
                                          size: "x-small",
                                          color: "grey"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode("Edit note")
                                          ]),
                                          _: 2
                                        }, 1032, ["onClick"])
                                      ])
                                    ]),
                                    createVNode("div", null, [
                                      editingNote.value === product.uid ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                                        createVNode(_component_v_textarea, {
                                          rows: "1",
                                          "auto-grow": "",
                                          modelValue: selectedNote.value,
                                          "onUpdate:modelValue": ($event) => selectedNote.value = $event,
                                          variant: "solo",
                                          flat: "",
                                          "bg-color": "white",
                                          "hide-details": ""
                                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                        createVNode("div", { class: "flex flex-row items-center justify-center gap-2 mt-2" }, [
                                          createVNode("div", null, [
                                            createVNode(_component_v_btn, {
                                              onClick: withModifiers(saveNote, ["prevent"]),
                                              size: "small",
                                              color: "green"
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode("Save")
                                              ]),
                                              _: 1
                                            })
                                          ]),
                                          createVNode("div", null, [
                                            createVNode(_component_v_btn, {
                                              onClick: withModifiers(closeEditNote, ["prevent"]),
                                              size: "small",
                                              color: "grey"
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode("Cancel")
                                              ]),
                                              _: 1
                                            })
                                          ])
                                        ])
                                      ], 64)) : (openBlock(), createBlock(_component_v_textarea, {
                                        key: 1,
                                        rows: "1",
                                        "auto-grow": "",
                                        "model-value": product.client_note,
                                        variant: "solo",
                                        flat: "",
                                        "bg-color": "grey-lighten-2",
                                        "hide-details": "",
                                        readonly: ""
                                      }, null, 8, ["model-value"]))
                                    ])
                                  ])
                                ])
                              ], 64)) : createCommentVNode("", true)
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                      _push3(`</div>`);
                    });
                    _push3(`<!--]-->`);
                    {
                      _push3(`<!---->`);
                    }
                    _push3(`<div class="max-w-sm mx-auto" data-v-65d9041e${_scopeId2}><div class="flex flex-row justify-center mt-10" data-v-65d9041e${_scopeId2}><p class="text-2xl" data-v-65d9041e${_scopeId2}>Total: ${ssrInterpolate(props.total_amount)}</p></div><div class="flex flex-row justify-center mt-10" data-v-65d9041e${_scopeId2}><div class="w-full" data-v-65d9041e${_scopeId2}><div class="w-full text-center" data-v-65d9041e${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_v_label, { class: "mb-2" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Your first and last name`);
                        } else {
                          return [
                            createTextVNode("Your first and last name")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_v_text_field, {
                      modelValue: enteredName.value,
                      "onUpdate:modelValue": ($event) => enteredName.value = $event,
                      "error-messages": errors.full_name
                    }, null, _parent3, _scopeId2));
                    _push3(`</div><div class="w-full text-center mt-5" data-v-65d9041e${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_v_label, { class: "mb-2" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Your email address`);
                        } else {
                          return [
                            createTextVNode("Your email address")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_v_text_field, {
                      disabled: props.is_auth,
                      readonly: props.is_auth,
                      modelValue: enteredEmail.value,
                      "onUpdate:modelValue": ($event) => enteredEmail.value = $event,
                      "error-messages": errors.email
                    }, null, _parent3, _scopeId2));
                    _push3(`</div><div class="w-full text-center mt-5" data-v-65d9041e${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_v_label, { class: "mb-2" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Your phone number`);
                        } else {
                          return [
                            createTextVNode("Your phone number")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_v_text_field, {
                      modelValue: enteredPhone.value,
                      "onUpdate:modelValue": ($event) => enteredPhone.value = $event,
                      "error-messages": errors.phone
                    }, null, _parent3, _scopeId2));
                    _push3(`</div></div></div>`);
                    {
                      _push3(`<!---->`);
                    }
                    _push3(`<div class="flex flex-row justify-center mt-10" data-v-65d9041e${_scopeId2}>`);
                    if (canPlaceOrder.value && (dateTimeSet.value && (!useGiftCard.value || useGiftCard.value && giftCardVerified.value))) {
                      _push3(ssrRenderComponent(_component_v_btn, {
                        disabled: isOrdering.value,
                        class: "rounded-pill",
                        onClick: checkout
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`${ssrInterpolate(isOrdering.value ? "Processing" : "Place order")}`);
                          } else {
                            return [
                              createTextVNode(toDisplayString(isOrdering.value ? "Processing" : "Place order"), 1)
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                    } else {
                      _push3(`<div class="text-center" data-v-65d9041e${_scopeId2}>`);
                      _push3(ssrRenderComponent(_component_v_btn, {
                        disabled: isOrdering.value,
                        class: "rounded-pill",
                        color: "grey-darken-1",
                        variant: "tonal"
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`${ssrInterpolate(isOrdering.value ? "Processing" : "Place order")}`);
                          } else {
                            return [
                              createTextVNode(toDisplayString(isOrdering.value ? "Processing" : "Place order"), 1)
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                      if (!dateTimeSet.value) {
                        _push3(`<p class="mt-5 text-red" data-v-65d9041e${_scopeId2}>Please select a date and time for pickup</p>`);
                      } else {
                        _push3(`<!---->`);
                      }
                      if (useGiftCard.value && !giftCardVerified.value) {
                        _push3(`<p class="text-red" data-v-65d9041e${_scopeId2}>Please verify your gift card number</p>`);
                      } else {
                        _push3(`<!---->`);
                      }
                      _push3(`</div>`);
                    }
                    _push3(`</div>`);
                    if ((errors == null ? void 0 : errors.msg) ?? false) {
                      _push3(ssrRenderComponent(_sfc_main$7, {
                        center: true,
                        justify: "center",
                        class: "py-5"
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`<!--[-->`);
                            ssrRenderList(errors.msg, (error) => {
                              _push4(`<p class="font-bold text-red" data-v-65d9041e${_scopeId3}>${ssrInterpolate(error)}</p>`);
                            });
                            _push4(`<!--]-->`);
                          } else {
                            return [
                              (openBlock(true), createBlock(Fragment, null, renderList(errors.msg, (error) => {
                                return openBlock(), createBlock("p", { class: "font-bold text-red" }, toDisplayString(error), 1);
                              }), 256))
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`</div></div><div data-v-65d9041e${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_v_card, {
                      color: "grey-lighten-3",
                      class: "px-4 py-4 my-4",
                      rounded: "lg"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_v_card_item, null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<div class="flex flex-col gap-3" data-v-65d9041e${_scopeId4}><div data-v-65d9041e${_scopeId4}><p class="text-sm font-bold" data-v-65d9041e${_scopeId4}>Pick up address:</p><div data-v-65d9041e${_scopeId4}><p data-v-65d9041e${_scopeId4}>${ssrInterpolate(props.settings.our_address_1)}</p>`);
                                if (props.settings.our_address_2) {
                                  _push5(`<p data-v-65d9041e${_scopeId4}>${ssrInterpolate(props.settings.our_address_2)}</p>`);
                                } else {
                                  _push5(`<!---->`);
                                }
                                _push5(`<p data-v-65d9041e${_scopeId4}>${ssrInterpolate(props.settings.our_city_postcode)}</p></div></div><div data-v-65d9041e${_scopeId4}><p class="text-sm" data-v-65d9041e${_scopeId4}>Date &amp; time:</p>`);
                                if (selectedDate.value && selectedTime.value) {
                                  _push5(`<p class="text-black font-bold" data-v-65d9041e${_scopeId4}>${ssrInterpolate(selectedDate.value)}<br data-v-65d9041e${_scopeId4}>at ${ssrInterpolate(selectedTime.value)}</p>`);
                                } else if (selectedDate.value) {
                                  _push5(`<p data-v-65d9041e${_scopeId4}><strong data-v-65d9041e${_scopeId4}>${ssrInterpolate(selectedDate.value)}</strong><br data-v-65d9041e${_scopeId4}><span class="text-red" data-v-65d9041e${_scopeId4}>(time not set)</span></p>`);
                                } else if (selectedTime.value) {
                                  _push5(`<p data-v-65d9041e${_scopeId4}><strong data-v-65d9041e${_scopeId4}>${ssrInterpolate(selectedTime.value)}</strong><br data-v-65d9041e${_scopeId4}><span class="text-red" data-v-65d9041e${_scopeId4}>(date not set)</span></p>`);
                                } else {
                                  _push5(`<p class="text-red" data-v-65d9041e${_scopeId4}>Not set</p>`);
                                }
                                _push5(`<div class="mt-2" data-v-65d9041e${_scopeId4}>`);
                                _push5(ssrRenderComponent(_component_v_btn, {
                                  onClick: openPickup,
                                  color: dateTimeSet.value ? "grey" : "black",
                                  "prepend-icon": "mdi-calendar"
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`Date &amp; time`);
                                    } else {
                                      return [
                                        createTextVNode("Date & time")
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                                _push5(`</div></div></div>`);
                              } else {
                                return [
                                  createVNode("div", { class: "flex flex-col gap-3" }, [
                                    createVNode("div", null, [
                                      createVNode("p", { class: "text-sm font-bold" }, "Pick up address:"),
                                      createVNode("div", null, [
                                        createVNode("p", null, toDisplayString(props.settings.our_address_1), 1),
                                        props.settings.our_address_2 ? (openBlock(), createBlock("p", { key: 0 }, toDisplayString(props.settings.our_address_2), 1)) : createCommentVNode("", true),
                                        createVNode("p", null, toDisplayString(props.settings.our_city_postcode), 1)
                                      ])
                                    ]),
                                    createVNode("div", null, [
                                      createVNode("p", { class: "text-sm" }, "Date & time:"),
                                      selectedDate.value && selectedTime.value ? (openBlock(), createBlock("p", {
                                        key: 0,
                                        class: "text-black font-bold"
                                      }, [
                                        createTextVNode(toDisplayString(selectedDate.value), 1),
                                        createVNode("br"),
                                        createTextVNode("at " + toDisplayString(selectedTime.value), 1)
                                      ])) : selectedDate.value ? (openBlock(), createBlock("p", { key: 1 }, [
                                        createVNode("strong", null, toDisplayString(selectedDate.value), 1),
                                        createVNode("br"),
                                        createVNode("span", { class: "text-red" }, "(time not set)")
                                      ])) : selectedTime.value ? (openBlock(), createBlock("p", { key: 2 }, [
                                        createVNode("strong", null, toDisplayString(selectedTime.value), 1),
                                        createVNode("br"),
                                        createVNode("span", { class: "text-red" }, "(date not set)")
                                      ])) : (openBlock(), createBlock("p", {
                                        key: 3,
                                        class: "text-red"
                                      }, "Not set")),
                                      createVNode("div", { class: "mt-2" }, [
                                        createVNode(_component_v_btn, {
                                          onClick: withModifiers(openPickup, ["prevent"]),
                                          color: dateTimeSet.value ? "grey" : "black",
                                          "prepend-icon": "mdi-calendar"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode("Date & time")
                                          ]),
                                          _: 1
                                        }, 8, ["color"])
                                      ])
                                    ])
                                  ])
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_v_card_item, null, {
                              default: withCtx(() => [
                                createVNode("div", { class: "flex flex-col gap-3" }, [
                                  createVNode("div", null, [
                                    createVNode("p", { class: "text-sm font-bold" }, "Pick up address:"),
                                    createVNode("div", null, [
                                      createVNode("p", null, toDisplayString(props.settings.our_address_1), 1),
                                      props.settings.our_address_2 ? (openBlock(), createBlock("p", { key: 0 }, toDisplayString(props.settings.our_address_2), 1)) : createCommentVNode("", true),
                                      createVNode("p", null, toDisplayString(props.settings.our_city_postcode), 1)
                                    ])
                                  ]),
                                  createVNode("div", null, [
                                    createVNode("p", { class: "text-sm" }, "Date & time:"),
                                    selectedDate.value && selectedTime.value ? (openBlock(), createBlock("p", {
                                      key: 0,
                                      class: "text-black font-bold"
                                    }, [
                                      createTextVNode(toDisplayString(selectedDate.value), 1),
                                      createVNode("br"),
                                      createTextVNode("at " + toDisplayString(selectedTime.value), 1)
                                    ])) : selectedDate.value ? (openBlock(), createBlock("p", { key: 1 }, [
                                      createVNode("strong", null, toDisplayString(selectedDate.value), 1),
                                      createVNode("br"),
                                      createVNode("span", { class: "text-red" }, "(time not set)")
                                    ])) : selectedTime.value ? (openBlock(), createBlock("p", { key: 2 }, [
                                      createVNode("strong", null, toDisplayString(selectedTime.value), 1),
                                      createVNode("br"),
                                      createVNode("span", { class: "text-red" }, "(date not set)")
                                    ])) : (openBlock(), createBlock("p", {
                                      key: 3,
                                      class: "text-red"
                                    }, "Not set")),
                                    createVNode("div", { class: "mt-2" }, [
                                      createVNode(_component_v_btn, {
                                        onClick: withModifiers(openPickup, ["prevent"]),
                                        color: dateTimeSet.value ? "grey" : "black",
                                        "prepend-icon": "mdi-calendar"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode("Date & time")
                                        ]),
                                        _: 1
                                      }, 8, ["color"])
                                    ])
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
                    _push3(`</div></div></div></div>`);
                  } else {
                    _push3(`<div data-v-65d9041e${_scopeId2}><div class="my-4" data-v-65d9041e${_scopeId2}><div class="flex justify-center" data-v-65d9041e${_scopeId2}><div class="text-center" data-v-65d9041e${_scopeId2}><p data-v-65d9041e${_scopeId2}>Your cart is empty at the moment.</p><div data-v-65d9041e${_scopeId2}> Why not visit our menu page? <div class="mt-5" data-v-65d9041e${_scopeId2}><div class="flex flex-row justify-center gap-3" data-v-65d9041e${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_v_btn, {
                      color: "grey-darken-1",
                      onClick: ($event) => _ctx.$inertia.visit(_ctx.route("catering_menu"))
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`View menu`);
                        } else {
                          return [
                            createTextVNode("View menu")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    if (_ctx.$page.props.auth.user) {
                      _push3(ssrRenderComponent(_component_v_btn, {
                        color: "black",
                        onClick: ($event) => _ctx.$inertia.visit(_ctx.route("orders"))
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`Order history`);
                          } else {
                            return [
                              createTextVNode("Order history")
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`</div></div></div></div></div></div></div>`);
                  }
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "pt-10" }, [
                      createVNode("div", null, [
                        createVNode("div", { class: "flex justify-center" }, [
                          createVNode("div", { class: "text-center" }, [
                            createVNode(_sfc_main$6, null, {
                              default: withCtx(() => [
                                createTextVNode("Cart")
                              ]),
                              _: 1
                            })
                          ])
                        ])
                      ]),
                      localProducts.value.length > 0 ? (openBlock(), createBlock("div", { key: 0 }, [
                        createVNode("div", null, [
                          createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-4 gap-3" }, [
                            createVNode("div", { class: "col-span-3" }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(localProducts.value, (product) => {
                                return openBlock(), createBlock("div", null, [
                                  createVNode(_component_v_card, {
                                    color: "grey-lighten-3",
                                    class: "px-4 pt-4 pb-2 my-4",
                                    rounded: "lg"
                                  }, {
                                    default: withCtx(() => {
                                      var _a, _b;
                                      return [
                                        createVNode("div", { class: "lg:flex flex-row gap-10" }, [
                                          createVNode("div", {
                                            class: "shrink-0",
                                            style: { "width": "60px" }
                                          }, [
                                            createVNode("img", {
                                              src: product.thumbnail,
                                              alt: ""
                                            }, null, 8, ["src"]),
                                            createVNode("div", {
                                              style: { "height": "10px" },
                                              class: "block lg:hidden"
                                            })
                                          ]),
                                          createVNode("div", { class: "grow" }, [
                                            createVNode("div", { class: "grid grid-cols-2 lg:grid-cols-4 gap-3 h-full" }, [
                                              createVNode("div", { class: "col-span-2 lg:col-span-1 h-full flex items-center" }, [
                                                createVNode("div", null, [
                                                  createVNode("p", { class: "font-bold" }, toDisplayString(product.product_name), 1),
                                                  createVNode("p", null, toDisplayString(product.variation_name), 1),
                                                  product.weekend_only ? (openBlock(), createBlock("div", {
                                                    key: 0,
                                                    class: "mt-1"
                                                  }, [
                                                    createVNode(_component_v_chip, {
                                                      size: "x-small",
                                                      variant: "outlined"
                                                    }, {
                                                      default: withCtx(() => [
                                                        createTextVNode("Week-end only")
                                                      ]),
                                                      _: 1
                                                    })
                                                  ])) : createCommentVNode("", true)
                                                ])
                                              ]),
                                              createVNode("div", { class: "h-full flex items-center lg:justify-center lg:text-center" }, [
                                                createVNode("div", null, [
                                                  createVNode("p", { class: "text-sm" }, "Price"),
                                                  createVNode("p", null, toDisplayString(product.variation_price), 1)
                                                ])
                                              ]),
                                              createVNode("div", { class: "h-full flex flex-row items-center lg:justify-center lg:text-center" }, [
                                                createVNode("div", null, [
                                                  createVNode("p", { class: "text-sm" }, "Quantity"),
                                                  createVNode(_component_v_btn, {
                                                    onClick: withModifiers(($event) => reduceQuantity(product), ["prevent"]),
                                                    color: "grey-lighten-3",
                                                    size: "small",
                                                    class: "px-0",
                                                    style: { "width": "30px" },
                                                    icon: "mdi-minus"
                                                  }, null, 8, ["onClick"]),
                                                  createVNode(_component_v_btn, {
                                                    color: "grey-lighten-3",
                                                    class: "px-0",
                                                    style: { "width": "30px" }
                                                  }, {
                                                    default: withCtx(() => [
                                                      createTextVNode(toDisplayString(product.quantity), 1)
                                                    ]),
                                                    _: 2
                                                  }, 1024),
                                                  createVNode(_component_v_btn, {
                                                    onClick: withModifiers(($event) => increaseQuantity(product), ["prevent"]),
                                                    color: "grey-lighten-3",
                                                    size: "small",
                                                    class: "px-0",
                                                    style: { "width": "30px" },
                                                    icon: "mdi-plus"
                                                  }, null, 8, ["onClick"])
                                                ])
                                              ]),
                                              createVNode("div", { class: "h-full flex items-center lg:justify-end lg:text-end" }, [
                                                createVNode("div", null, [
                                                  createVNode("p", { class: "text-sm" }, "Total"),
                                                  createVNode("p", null, toDisplayString(product.amount), 1)
                                                ])
                                              ])
                                            ])
                                          ])
                                        ]),
                                        ((_b = (_a = product == null ? void 0 : product.variation) == null ? void 0 : _a.product) == null ? void 0 : _b.allow_client_note) ?? false ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                                          createVNode("div", { class: "pt-2 pb-0" }, [
                                            createVNode("hr", { style: { "border": "solid 1px #ccc" } })
                                          ]),
                                          createVNode("div", { class: "flex flex-row justify-center" }, [
                                            createVNode("div", { class: "w-full pt-3 pb-2" }, [
                                              createVNode("div", { class: "flex flex-row items-center justify-between mb-2" }, [
                                                createVNode("div", null, [
                                                  createVNode("p", { class: "text-sm" }, "Note (optional)")
                                                ]),
                                                createVNode("div", null, [
                                                  createVNode(_component_v_btn, {
                                                    onClick: withModifiers(($event) => editNote(product.uid, product.client_note), ["prevent"]),
                                                    size: "x-small",
                                                    color: "grey"
                                                  }, {
                                                    default: withCtx(() => [
                                                      createTextVNode("Edit note")
                                                    ]),
                                                    _: 2
                                                  }, 1032, ["onClick"])
                                                ])
                                              ]),
                                              createVNode("div", null, [
                                                editingNote.value === product.uid ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                                                  createVNode(_component_v_textarea, {
                                                    rows: "1",
                                                    "auto-grow": "",
                                                    modelValue: selectedNote.value,
                                                    "onUpdate:modelValue": ($event) => selectedNote.value = $event,
                                                    variant: "solo",
                                                    flat: "",
                                                    "bg-color": "white",
                                                    "hide-details": ""
                                                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                                  createVNode("div", { class: "flex flex-row items-center justify-center gap-2 mt-2" }, [
                                                    createVNode("div", null, [
                                                      createVNode(_component_v_btn, {
                                                        onClick: withModifiers(saveNote, ["prevent"]),
                                                        size: "small",
                                                        color: "green"
                                                      }, {
                                                        default: withCtx(() => [
                                                          createTextVNode("Save")
                                                        ]),
                                                        _: 1
                                                      })
                                                    ]),
                                                    createVNode("div", null, [
                                                      createVNode(_component_v_btn, {
                                                        onClick: withModifiers(closeEditNote, ["prevent"]),
                                                        size: "small",
                                                        color: "grey"
                                                      }, {
                                                        default: withCtx(() => [
                                                          createTextVNode("Cancel")
                                                        ]),
                                                        _: 1
                                                      })
                                                    ])
                                                  ])
                                                ], 64)) : (openBlock(), createBlock(_component_v_textarea, {
                                                  key: 1,
                                                  rows: "1",
                                                  "auto-grow": "",
                                                  "model-value": product.client_note,
                                                  variant: "solo",
                                                  flat: "",
                                                  "bg-color": "grey-lighten-2",
                                                  "hide-details": "",
                                                  readonly: ""
                                                }, null, 8, ["model-value"]))
                                              ])
                                            ])
                                          ])
                                        ], 64)) : createCommentVNode("", true)
                                      ];
                                    }),
                                    _: 2
                                  }, 1024)
                                ]);
                              }), 256)),
                              createCommentVNode("", true),
                              createVNode("div", { class: "max-w-sm mx-auto" }, [
                                createVNode("div", { class: "flex flex-row justify-center mt-10" }, [
                                  createVNode("p", { class: "text-2xl" }, "Total: " + toDisplayString(props.total_amount), 1)
                                ]),
                                createVNode("div", { class: "flex flex-row justify-center mt-10" }, [
                                  createVNode("div", { class: "w-full" }, [
                                    createVNode("div", { class: "w-full text-center" }, [
                                      createVNode(_component_v_label, { class: "mb-2" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Your first and last name")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_v_text_field, {
                                        modelValue: enteredName.value,
                                        "onUpdate:modelValue": ($event) => enteredName.value = $event,
                                        "error-messages": errors.full_name
                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                                    ]),
                                    createVNode("div", { class: "w-full text-center mt-5" }, [
                                      createVNode(_component_v_label, { class: "mb-2" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Your email address")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_v_text_field, {
                                        disabled: props.is_auth,
                                        readonly: props.is_auth,
                                        modelValue: enteredEmail.value,
                                        "onUpdate:modelValue": ($event) => enteredEmail.value = $event,
                                        "error-messages": errors.email
                                      }, null, 8, ["disabled", "readonly", "modelValue", "onUpdate:modelValue", "error-messages"])
                                    ]),
                                    createVNode("div", { class: "w-full text-center mt-5" }, [
                                      createVNode(_component_v_label, { class: "mb-2" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Your phone number")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_v_text_field, {
                                        modelValue: enteredPhone.value,
                                        "onUpdate:modelValue": ($event) => enteredPhone.value = $event,
                                        "error-messages": errors.phone
                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                                    ])
                                  ])
                                ]),
                                createCommentVNode("", true),
                                createVNode("div", { class: "flex flex-row justify-center mt-10" }, [
                                  canPlaceOrder.value && (dateTimeSet.value && (!useGiftCard.value || useGiftCard.value && giftCardVerified.value)) ? (openBlock(), createBlock(_component_v_btn, {
                                    key: 0,
                                    disabled: isOrdering.value,
                                    class: "rounded-pill",
                                    onClick: withModifiers(checkout, ["prevent"])
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(isOrdering.value ? "Processing" : "Place order"), 1)
                                    ]),
                                    _: 1
                                  }, 8, ["disabled"])) : (openBlock(), createBlock("div", {
                                    key: 1,
                                    class: "text-center"
                                  }, [
                                    createVNode(_component_v_btn, {
                                      disabled: isOrdering.value,
                                      class: "rounded-pill",
                                      color: "grey-darken-1",
                                      variant: "tonal"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(isOrdering.value ? "Processing" : "Place order"), 1)
                                      ]),
                                      _: 1
                                    }, 8, ["disabled"]),
                                    !dateTimeSet.value ? (openBlock(), createBlock("p", {
                                      key: 0,
                                      class: "mt-5 text-red"
                                    }, "Please select a date and time for pickup")) : createCommentVNode("", true),
                                    useGiftCard.value && !giftCardVerified.value ? (openBlock(), createBlock("p", {
                                      key: 1,
                                      class: "text-red"
                                    }, "Please verify your gift card number")) : createCommentVNode("", true)
                                  ]))
                                ]),
                                (errors == null ? void 0 : errors.msg) ?? false ? (openBlock(), createBlock(_sfc_main$7, {
                                  key: 1,
                                  center: true,
                                  justify: "center",
                                  class: "py-5"
                                }, {
                                  default: withCtx(() => [
                                    (openBlock(true), createBlock(Fragment, null, renderList(errors.msg, (error) => {
                                      return openBlock(), createBlock("p", { class: "font-bold text-red" }, toDisplayString(error), 1);
                                    }), 256))
                                  ]),
                                  _: 1
                                })) : createCommentVNode("", true)
                              ])
                            ]),
                            createVNode("div", null, [
                              createVNode(_component_v_card, {
                                color: "grey-lighten-3",
                                class: "px-4 py-4 my-4",
                                rounded: "lg"
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_v_card_item, null, {
                                    default: withCtx(() => [
                                      createVNode("div", { class: "flex flex-col gap-3" }, [
                                        createVNode("div", null, [
                                          createVNode("p", { class: "text-sm font-bold" }, "Pick up address:"),
                                          createVNode("div", null, [
                                            createVNode("p", null, toDisplayString(props.settings.our_address_1), 1),
                                            props.settings.our_address_2 ? (openBlock(), createBlock("p", { key: 0 }, toDisplayString(props.settings.our_address_2), 1)) : createCommentVNode("", true),
                                            createVNode("p", null, toDisplayString(props.settings.our_city_postcode), 1)
                                          ])
                                        ]),
                                        createVNode("div", null, [
                                          createVNode("p", { class: "text-sm" }, "Date & time:"),
                                          selectedDate.value && selectedTime.value ? (openBlock(), createBlock("p", {
                                            key: 0,
                                            class: "text-black font-bold"
                                          }, [
                                            createTextVNode(toDisplayString(selectedDate.value), 1),
                                            createVNode("br"),
                                            createTextVNode("at " + toDisplayString(selectedTime.value), 1)
                                          ])) : selectedDate.value ? (openBlock(), createBlock("p", { key: 1 }, [
                                            createVNode("strong", null, toDisplayString(selectedDate.value), 1),
                                            createVNode("br"),
                                            createVNode("span", { class: "text-red" }, "(time not set)")
                                          ])) : selectedTime.value ? (openBlock(), createBlock("p", { key: 2 }, [
                                            createVNode("strong", null, toDisplayString(selectedTime.value), 1),
                                            createVNode("br"),
                                            createVNode("span", { class: "text-red" }, "(date not set)")
                                          ])) : (openBlock(), createBlock("p", {
                                            key: 3,
                                            class: "text-red"
                                          }, "Not set")),
                                          createVNode("div", { class: "mt-2" }, [
                                            createVNode(_component_v_btn, {
                                              onClick: withModifiers(openPickup, ["prevent"]),
                                              color: dateTimeSet.value ? "grey" : "black",
                                              "prepend-icon": "mdi-calendar"
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode("Date & time")
                                              ]),
                                              _: 1
                                            }, 8, ["color"])
                                          ])
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
                        ])
                      ])) : (openBlock(), createBlock("div", { key: 1 }, [
                        createVNode("div", { class: "my-4" }, [
                          createVNode("div", { class: "flex justify-center" }, [
                            createVNode("div", { class: "text-center" }, [
                              createVNode("p", null, "Your cart is empty at the moment."),
                              createVNode("div", null, [
                                createTextVNode(" Why not visit our menu page? "),
                                createVNode("div", { class: "mt-5" }, [
                                  createVNode("div", { class: "flex flex-row justify-center gap-3" }, [
                                    createVNode(_component_v_btn, {
                                      color: "grey-darken-1",
                                      onClick: withModifiers(($event) => _ctx.$inertia.visit(_ctx.route("catering_menu")), ["prevent"])
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode("View menu")
                                      ]),
                                      _: 1
                                    }, 8, ["onClick"]),
                                    _ctx.$page.props.auth.user ? (openBlock(), createBlock(_component_v_btn, {
                                      key: 0,
                                      color: "black",
                                      onClick: withModifiers(($event) => _ctx.$inertia.visit(_ctx.route("orders")), ["prevent"])
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode("Order history")
                                      ]),
                                      _: 1
                                    }, 8, ["onClick"])) : createCommentVNode("", true)
                                  ])
                                ])
                              ])
                            ])
                          ])
                        ])
                      ]))
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(Wrapper, { wrapper: "section" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "pt-10" }, [
                    createVNode("div", null, [
                      createVNode("div", { class: "flex justify-center" }, [
                        createVNode("div", { class: "text-center" }, [
                          createVNode(_sfc_main$6, null, {
                            default: withCtx(() => [
                              createTextVNode("Cart")
                            ]),
                            _: 1
                          })
                        ])
                      ])
                    ]),
                    localProducts.value.length > 0 ? (openBlock(), createBlock("div", { key: 0 }, [
                      createVNode("div", null, [
                        createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-4 gap-3" }, [
                          createVNode("div", { class: "col-span-3" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(localProducts.value, (product) => {
                              return openBlock(), createBlock("div", null, [
                                createVNode(_component_v_card, {
                                  color: "grey-lighten-3",
                                  class: "px-4 pt-4 pb-2 my-4",
                                  rounded: "lg"
                                }, {
                                  default: withCtx(() => {
                                    var _a, _b;
                                    return [
                                      createVNode("div", { class: "lg:flex flex-row gap-10" }, [
                                        createVNode("div", {
                                          class: "shrink-0",
                                          style: { "width": "60px" }
                                        }, [
                                          createVNode("img", {
                                            src: product.thumbnail,
                                            alt: ""
                                          }, null, 8, ["src"]),
                                          createVNode("div", {
                                            style: { "height": "10px" },
                                            class: "block lg:hidden"
                                          })
                                        ]),
                                        createVNode("div", { class: "grow" }, [
                                          createVNode("div", { class: "grid grid-cols-2 lg:grid-cols-4 gap-3 h-full" }, [
                                            createVNode("div", { class: "col-span-2 lg:col-span-1 h-full flex items-center" }, [
                                              createVNode("div", null, [
                                                createVNode("p", { class: "font-bold" }, toDisplayString(product.product_name), 1),
                                                createVNode("p", null, toDisplayString(product.variation_name), 1),
                                                product.weekend_only ? (openBlock(), createBlock("div", {
                                                  key: 0,
                                                  class: "mt-1"
                                                }, [
                                                  createVNode(_component_v_chip, {
                                                    size: "x-small",
                                                    variant: "outlined"
                                                  }, {
                                                    default: withCtx(() => [
                                                      createTextVNode("Week-end only")
                                                    ]),
                                                    _: 1
                                                  })
                                                ])) : createCommentVNode("", true)
                                              ])
                                            ]),
                                            createVNode("div", { class: "h-full flex items-center lg:justify-center lg:text-center" }, [
                                              createVNode("div", null, [
                                                createVNode("p", { class: "text-sm" }, "Price"),
                                                createVNode("p", null, toDisplayString(product.variation_price), 1)
                                              ])
                                            ]),
                                            createVNode("div", { class: "h-full flex flex-row items-center lg:justify-center lg:text-center" }, [
                                              createVNode("div", null, [
                                                createVNode("p", { class: "text-sm" }, "Quantity"),
                                                createVNode(_component_v_btn, {
                                                  onClick: withModifiers(($event) => reduceQuantity(product), ["prevent"]),
                                                  color: "grey-lighten-3",
                                                  size: "small",
                                                  class: "px-0",
                                                  style: { "width": "30px" },
                                                  icon: "mdi-minus"
                                                }, null, 8, ["onClick"]),
                                                createVNode(_component_v_btn, {
                                                  color: "grey-lighten-3",
                                                  class: "px-0",
                                                  style: { "width": "30px" }
                                                }, {
                                                  default: withCtx(() => [
                                                    createTextVNode(toDisplayString(product.quantity), 1)
                                                  ]),
                                                  _: 2
                                                }, 1024),
                                                createVNode(_component_v_btn, {
                                                  onClick: withModifiers(($event) => increaseQuantity(product), ["prevent"]),
                                                  color: "grey-lighten-3",
                                                  size: "small",
                                                  class: "px-0",
                                                  style: { "width": "30px" },
                                                  icon: "mdi-plus"
                                                }, null, 8, ["onClick"])
                                              ])
                                            ]),
                                            createVNode("div", { class: "h-full flex items-center lg:justify-end lg:text-end" }, [
                                              createVNode("div", null, [
                                                createVNode("p", { class: "text-sm" }, "Total"),
                                                createVNode("p", null, toDisplayString(product.amount), 1)
                                              ])
                                            ])
                                          ])
                                        ])
                                      ]),
                                      ((_b = (_a = product == null ? void 0 : product.variation) == null ? void 0 : _a.product) == null ? void 0 : _b.allow_client_note) ?? false ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                                        createVNode("div", { class: "pt-2 pb-0" }, [
                                          createVNode("hr", { style: { "border": "solid 1px #ccc" } })
                                        ]),
                                        createVNode("div", { class: "flex flex-row justify-center" }, [
                                          createVNode("div", { class: "w-full pt-3 pb-2" }, [
                                            createVNode("div", { class: "flex flex-row items-center justify-between mb-2" }, [
                                              createVNode("div", null, [
                                                createVNode("p", { class: "text-sm" }, "Note (optional)")
                                              ]),
                                              createVNode("div", null, [
                                                createVNode(_component_v_btn, {
                                                  onClick: withModifiers(($event) => editNote(product.uid, product.client_note), ["prevent"]),
                                                  size: "x-small",
                                                  color: "grey"
                                                }, {
                                                  default: withCtx(() => [
                                                    createTextVNode("Edit note")
                                                  ]),
                                                  _: 2
                                                }, 1032, ["onClick"])
                                              ])
                                            ]),
                                            createVNode("div", null, [
                                              editingNote.value === product.uid ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                                                createVNode(_component_v_textarea, {
                                                  rows: "1",
                                                  "auto-grow": "",
                                                  modelValue: selectedNote.value,
                                                  "onUpdate:modelValue": ($event) => selectedNote.value = $event,
                                                  variant: "solo",
                                                  flat: "",
                                                  "bg-color": "white",
                                                  "hide-details": ""
                                                }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                                createVNode("div", { class: "flex flex-row items-center justify-center gap-2 mt-2" }, [
                                                  createVNode("div", null, [
                                                    createVNode(_component_v_btn, {
                                                      onClick: withModifiers(saveNote, ["prevent"]),
                                                      size: "small",
                                                      color: "green"
                                                    }, {
                                                      default: withCtx(() => [
                                                        createTextVNode("Save")
                                                      ]),
                                                      _: 1
                                                    })
                                                  ]),
                                                  createVNode("div", null, [
                                                    createVNode(_component_v_btn, {
                                                      onClick: withModifiers(closeEditNote, ["prevent"]),
                                                      size: "small",
                                                      color: "grey"
                                                    }, {
                                                      default: withCtx(() => [
                                                        createTextVNode("Cancel")
                                                      ]),
                                                      _: 1
                                                    })
                                                  ])
                                                ])
                                              ], 64)) : (openBlock(), createBlock(_component_v_textarea, {
                                                key: 1,
                                                rows: "1",
                                                "auto-grow": "",
                                                "model-value": product.client_note,
                                                variant: "solo",
                                                flat: "",
                                                "bg-color": "grey-lighten-2",
                                                "hide-details": "",
                                                readonly: ""
                                              }, null, 8, ["model-value"]))
                                            ])
                                          ])
                                        ])
                                      ], 64)) : createCommentVNode("", true)
                                    ];
                                  }),
                                  _: 2
                                }, 1024)
                              ]);
                            }), 256)),
                            createCommentVNode("", true),
                            createVNode("div", { class: "max-w-sm mx-auto" }, [
                              createVNode("div", { class: "flex flex-row justify-center mt-10" }, [
                                createVNode("p", { class: "text-2xl" }, "Total: " + toDisplayString(props.total_amount), 1)
                              ]),
                              createVNode("div", { class: "flex flex-row justify-center mt-10" }, [
                                createVNode("div", { class: "w-full" }, [
                                  createVNode("div", { class: "w-full text-center" }, [
                                    createVNode(_component_v_label, { class: "mb-2" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Your first and last name")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_v_text_field, {
                                      modelValue: enteredName.value,
                                      "onUpdate:modelValue": ($event) => enteredName.value = $event,
                                      "error-messages": errors.full_name
                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                                  ]),
                                  createVNode("div", { class: "w-full text-center mt-5" }, [
                                    createVNode(_component_v_label, { class: "mb-2" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Your email address")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_v_text_field, {
                                      disabled: props.is_auth,
                                      readonly: props.is_auth,
                                      modelValue: enteredEmail.value,
                                      "onUpdate:modelValue": ($event) => enteredEmail.value = $event,
                                      "error-messages": errors.email
                                    }, null, 8, ["disabled", "readonly", "modelValue", "onUpdate:modelValue", "error-messages"])
                                  ]),
                                  createVNode("div", { class: "w-full text-center mt-5" }, [
                                    createVNode(_component_v_label, { class: "mb-2" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Your phone number")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_v_text_field, {
                                      modelValue: enteredPhone.value,
                                      "onUpdate:modelValue": ($event) => enteredPhone.value = $event,
                                      "error-messages": errors.phone
                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                                  ])
                                ])
                              ]),
                              createCommentVNode("", true),
                              createVNode("div", { class: "flex flex-row justify-center mt-10" }, [
                                canPlaceOrder.value && (dateTimeSet.value && (!useGiftCard.value || useGiftCard.value && giftCardVerified.value)) ? (openBlock(), createBlock(_component_v_btn, {
                                  key: 0,
                                  disabled: isOrdering.value,
                                  class: "rounded-pill",
                                  onClick: withModifiers(checkout, ["prevent"])
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(isOrdering.value ? "Processing" : "Place order"), 1)
                                  ]),
                                  _: 1
                                }, 8, ["disabled"])) : (openBlock(), createBlock("div", {
                                  key: 1,
                                  class: "text-center"
                                }, [
                                  createVNode(_component_v_btn, {
                                    disabled: isOrdering.value,
                                    class: "rounded-pill",
                                    color: "grey-darken-1",
                                    variant: "tonal"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(isOrdering.value ? "Processing" : "Place order"), 1)
                                    ]),
                                    _: 1
                                  }, 8, ["disabled"]),
                                  !dateTimeSet.value ? (openBlock(), createBlock("p", {
                                    key: 0,
                                    class: "mt-5 text-red"
                                  }, "Please select a date and time for pickup")) : createCommentVNode("", true),
                                  useGiftCard.value && !giftCardVerified.value ? (openBlock(), createBlock("p", {
                                    key: 1,
                                    class: "text-red"
                                  }, "Please verify your gift card number")) : createCommentVNode("", true)
                                ]))
                              ]),
                              (errors == null ? void 0 : errors.msg) ?? false ? (openBlock(), createBlock(_sfc_main$7, {
                                key: 1,
                                center: true,
                                justify: "center",
                                class: "py-5"
                              }, {
                                default: withCtx(() => [
                                  (openBlock(true), createBlock(Fragment, null, renderList(errors.msg, (error) => {
                                    return openBlock(), createBlock("p", { class: "font-bold text-red" }, toDisplayString(error), 1);
                                  }), 256))
                                ]),
                                _: 1
                              })) : createCommentVNode("", true)
                            ])
                          ]),
                          createVNode("div", null, [
                            createVNode(_component_v_card, {
                              color: "grey-lighten-3",
                              class: "px-4 py-4 my-4",
                              rounded: "lg"
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_v_card_item, null, {
                                  default: withCtx(() => [
                                    createVNode("div", { class: "flex flex-col gap-3" }, [
                                      createVNode("div", null, [
                                        createVNode("p", { class: "text-sm font-bold" }, "Pick up address:"),
                                        createVNode("div", null, [
                                          createVNode("p", null, toDisplayString(props.settings.our_address_1), 1),
                                          props.settings.our_address_2 ? (openBlock(), createBlock("p", { key: 0 }, toDisplayString(props.settings.our_address_2), 1)) : createCommentVNode("", true),
                                          createVNode("p", null, toDisplayString(props.settings.our_city_postcode), 1)
                                        ])
                                      ]),
                                      createVNode("div", null, [
                                        createVNode("p", { class: "text-sm" }, "Date & time:"),
                                        selectedDate.value && selectedTime.value ? (openBlock(), createBlock("p", {
                                          key: 0,
                                          class: "text-black font-bold"
                                        }, [
                                          createTextVNode(toDisplayString(selectedDate.value), 1),
                                          createVNode("br"),
                                          createTextVNode("at " + toDisplayString(selectedTime.value), 1)
                                        ])) : selectedDate.value ? (openBlock(), createBlock("p", { key: 1 }, [
                                          createVNode("strong", null, toDisplayString(selectedDate.value), 1),
                                          createVNode("br"),
                                          createVNode("span", { class: "text-red" }, "(time not set)")
                                        ])) : selectedTime.value ? (openBlock(), createBlock("p", { key: 2 }, [
                                          createVNode("strong", null, toDisplayString(selectedTime.value), 1),
                                          createVNode("br"),
                                          createVNode("span", { class: "text-red" }, "(date not set)")
                                        ])) : (openBlock(), createBlock("p", {
                                          key: 3,
                                          class: "text-red"
                                        }, "Not set")),
                                        createVNode("div", { class: "mt-2" }, [
                                          createVNode(_component_v_btn, {
                                            onClick: withModifiers(openPickup, ["prevent"]),
                                            color: dateTimeSet.value ? "grey" : "black",
                                            "prepend-icon": "mdi-calendar"
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode("Date & time")
                                            ]),
                                            _: 1
                                          }, 8, ["color"])
                                        ])
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
                      ])
                    ])) : (openBlock(), createBlock("div", { key: 1 }, [
                      createVNode("div", { class: "my-4" }, [
                        createVNode("div", { class: "flex justify-center" }, [
                          createVNode("div", { class: "text-center" }, [
                            createVNode("p", null, "Your cart is empty at the moment."),
                            createVNode("div", null, [
                              createTextVNode(" Why not visit our menu page? "),
                              createVNode("div", { class: "mt-5" }, [
                                createVNode("div", { class: "flex flex-row justify-center gap-3" }, [
                                  createVNode(_component_v_btn, {
                                    color: "grey-darken-1",
                                    onClick: withModifiers(($event) => _ctx.$inertia.visit(_ctx.route("catering_menu")), ["prevent"])
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode("View menu")
                                    ]),
                                    _: 1
                                  }, 8, ["onClick"]),
                                  _ctx.$page.props.auth.user ? (openBlock(), createBlock(_component_v_btn, {
                                    key: 0,
                                    color: "black",
                                    onClick: withModifiers(($event) => _ctx.$inertia.visit(_ctx.route("orders")), ["prevent"])
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode("Order history")
                                    ]),
                                    _: 1
                                  }, 8, ["onClick"])) : createCommentVNode("", true)
                                ])
                              ])
                            ])
                          ])
                        ])
                      ])
                    ]))
                  ])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$2, {
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
            _push2(`<div class="text-center" data-v-65d9041e${_scopeId}><p class="text-lg font-bold text-black" data-v-65d9041e${_scopeId}>Pick a date</p></div><div class="carousel w-full mb-3" data-v-65d9041e${_scopeId}><!--[-->`);
            ssrRenderList(props.quick_days, (quick_day) => {
              _push2(`<div class="carousel-cell m-1" data-v-65d9041e${_scopeId}><div class="p-1 h-full" data-v-65d9041e${_scopeId}>`);
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
                          _push4(`<div class="flex flex-col items-center h-full" data-v-65d9041e${_scopeId3}><div class="font-normal" data-v-65d9041e${_scopeId3}><p class="text-lg" data-v-65d9041e${_scopeId3}>${ssrInterpolate(quick_day.day)}</p><p class="text-md" data-v-65d9041e${_scopeId3}>${ssrInterpolate(quick_day.date)}</p></div></div>`);
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
            _push2(`<!--]--><div class="carousel-cell m-1" data-v-65d9041e${_scopeId}><div class="p-1 h-full" data-v-65d9041e${_scopeId}>`);
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
                        _push4(`<div class="flex flex-col items-center h-full" data-v-65d9041e${_scopeId3}><div data-v-65d9041e${_scopeId3}>`);
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
            _push2(`</div></div></div><div class="px-1 relative" data-v-65d9041e${_scopeId}>`);
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
                ...props.is_weekend_only && {
                  enable: [
                    (date) => {
                      const isWeekend = [0, 6].includes(date.getDay());
                      const isClosed = closedDates.value.some(
                        (d) => date.toDateString() === new Date(d).toDateString()
                      );
                      return isWeekend && !isClosed;
                    }
                  ]
                },
                onReady: (selectedDates, dateStr, instance) => {
                  defineInstance(instance);
                  nextTick(() => {
                    const target = calendarTargetRef.value;
                    if (target) {
                      target.appendChild(instance.calendarContainer);
                      instance.set("static", true);
                      nextTick(() => {
                        Object.assign(instance.calendarContainer.style, {
                          position: "absolute",
                          top: "10px",
                          left: "0",
                          zIndex: "9999"
                        });
                      });
                    }
                  });
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
            _push2(`<div id="calendar-target" class="position-relative" data-v-65d9041e${_scopeId}></div></div><div class="mt-10 mb-3 text-center" data-v-65d9041e${_scopeId}><p class="text-lg font-bold text-black" data-v-65d9041e${_scopeId}>Pick a time</p></div><div class="flex flex-row justify-center mb-5" data-v-65d9041e${_scopeId}><div class="grid grid-cols-4 gap-3" data-v-65d9041e${_scopeId}><!--[-->`);
            ssrRenderList(timeslots.value, (time) => {
              _push2(`<div data-v-65d9041e${_scopeId}>`);
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
              createVNode("div", { class: "px-1 relative" }, [
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
                    ...props.is_weekend_only && {
                      enable: [
                        (date) => {
                          const isWeekend = [0, 6].includes(date.getDay());
                          const isClosed = closedDates.value.some(
                            (d) => date.toDateString() === new Date(d).toDateString()
                          );
                          return isWeekend && !isClosed;
                        }
                      ]
                    },
                    onReady: (selectedDates, dateStr, instance) => {
                      defineInstance(instance);
                      nextTick(() => {
                        const target = calendarTargetRef.value;
                        if (target) {
                          target.appendChild(instance.calendarContainer);
                          instance.set("static", true);
                          nextTick(() => {
                            Object.assign(instance.calendarContainer.style, {
                              position: "absolute",
                              top: "10px",
                              left: "0",
                              zIndex: "9999"
                            });
                          });
                        }
                      });
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
                }, null, 8, ["modelValue", "onUpdate:modelValue", "config"]),
                createVNode("div", {
                  id: "calendar-target",
                  class: "position-relative",
                  ref_key: "calendarTargetRef",
                  ref: calendarTargetRef
                }, null, 512)
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
            _push2(ssrRenderComponent(_sfc_main$4, { onClick: closePickup }, {
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
              createVNode(_sfc_main$4, { onClick: closePickup }, {
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
      _push(ssrRenderComponent(_sfc_main$1, {
        ref_key: "confirmModal",
        ref: confirmModal,
        title: "Are you sure you want to delete this item?",
        text: "Delete item",
        onConfirm: confirmDelete,
        onClose: closeConfirm
      }, null, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Checkout/Cart.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Cart = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-65d9041e"]]);
export {
  Cart as default
};
