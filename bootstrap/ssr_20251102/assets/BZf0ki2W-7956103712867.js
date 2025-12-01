import { ref, watch, resolveComponent, unref, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderSlot } from "vue/server-renderer";
import { usePage, Head } from "@inertiajs/vue3";
import "./BW6cC8iL-1677159380657.js";
import "./kZV6a-x4-6055183876791.js";
import { _ as _export_sfc } from "./1tPrXgE0-4581736670159.js";
const _sfc_main = {
  __name: "AdmLayout",
  __ssrInlineRender: true,
  props: {
    title: String
  },
  setup(__props) {
    const props = __props;
    ref(false);
    ref(null);
    ref(false);
    const showSnackbar = ref(false);
    const snackbarColor = ref("black");
    const snackbarMessage = ref(null);
    const page = usePage();
    watch(() => page.props.flash, (flash) => {
      const message = (flash == null ? void 0 : flash.message) ?? "";
      const error = (flash == null ? void 0 : flash.error) ?? "";
      if (message) {
        snackbarMessage.value = message;
        snackbarColor.value = "success";
        showSnackbar.value = true;
      }
      if (error) {
        snackbarMessage.value = error;
        snackbarColor.value = "error";
        showSnackbar.value = true;
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_v_btn = resolveComponent("v-btn");
      const _component_v_snackbar = resolveComponent("v-snackbar");
      _push(`<!--[--><div data-v-3a8cba52>`);
      _push(ssrRenderComponent(unref(Head), {
        title: `${props.title} :: Admin`
      }, null, _parent));
      _push(`<div class="min-h-screen bg-gray-100" data-v-3a8cba52><div class="flex flex-row" data-v-3a8cba52><div id="sidebar" class="min-h-screen shrink-0 bg-grey-darken-4 p-0 px-md-6 py-6" data-v-3a8cba52><div class="mb-10" data-v-3a8cba52>`);
      _push(ssrRenderComponent(_component_v_btn, {
        onClick: ($event) => _ctx.$inertia.visit(_ctx.route("home")),
        "prepend-icon": "mdi-arrow-left",
        variant: "flat",
        color: "white"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="hidden d-md-block" data-v-3a8cba52${_scopeId}>Back to site</span>`);
          } else {
            return [
              createVNode("span", { class: "hidden d-md-block" }, "Back to site")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div data-v-3a8cba52>`);
      _push(ssrRenderComponent(_component_v_btn, {
        onClick: ($event) => _ctx.$inertia.visit(_ctx.route("admin")),
        "prepend-icon": "mdi-view-dashboard",
        variant: "plain",
        color: "white"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="hidden d-md-block" data-v-3a8cba52${_scopeId}>Dashboard</span>`);
          } else {
            return [
              createVNode("span", { class: "hidden d-md-block" }, "Dashboard")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      if (_ctx.$page.props.ia) {
        _push(`<div data-v-3a8cba52>`);
        _push(ssrRenderComponent(_component_v_btn, {
          onClick: ($event) => _ctx.$inertia.visit(_ctx.route("admin.orders")),
          "prepend-icon": "mdi-printer-pos",
          variant: "plain",
          color: "white"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="hidden d-md-block" data-v-3a8cba52${_scopeId}>Orders</span>`);
            } else {
              return [
                createVNode("span", { class: "hidden d-md-block" }, "Orders")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (_ctx.$page.props.ia) {
        _push(`<div data-v-3a8cba52>`);
        _push(ssrRenderComponent(_component_v_btn, {
          onClick: ($event) => _ctx.$inertia.visit(_ctx.route("admin.subscriptions")),
          "prepend-icon": "mdi-calendar",
          variant: "plain",
          color: "white"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="hidden d-md-block" data-v-3a8cba52${_scopeId}>Subscriptions</span>`);
            } else {
              return [
                createVNode("span", { class: "hidden d-md-block" }, "Subscriptions")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (_ctx.$page.props.ia) {
        _push(`<div data-v-3a8cba52>`);
        _push(ssrRenderComponent(_component_v_btn, {
          onClick: ($event) => _ctx.$inertia.visit(_ctx.route("admin.deliveries")),
          "prepend-icon": "mdi-truck",
          variant: "plain",
          color: "white"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="hidden d-md-block" data-v-3a8cba52${_scopeId}>Deliveries</span>`);
            } else {
              return [
                createVNode("span", { class: "hidden d-md-block" }, "Deliveries")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (_ctx.$page.props.ia) {
        _push(`<div data-v-3a8cba52>`);
        _push(ssrRenderComponent(_component_v_btn, {
          onClick: ($event) => _ctx.$inertia.visit(_ctx.route("admin.categories")),
          "prepend-icon": "mdi-shape",
          variant: "plain",
          color: "white"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="hidden d-md-block" data-v-3a8cba52${_scopeId}>Categories</span>`);
            } else {
              return [
                createVNode("span", { class: "hidden d-md-block" }, "Categories")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (_ctx.$page.props.ia) {
        _push(`<div data-v-3a8cba52>`);
        _push(ssrRenderComponent(_component_v_btn, {
          onClick: ($event) => _ctx.$inertia.visit(_ctx.route("admin.products")),
          "prepend-icon": "mdi-baguette",
          variant: "plain",
          color: "white"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="hidden d-md-block" data-v-3a8cba52${_scopeId}>Products</span>`);
            } else {
              return [
                createVNode("span", { class: "hidden d-md-block" }, "Products")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (_ctx.$page.props.ia) {
        _push(`<div data-v-3a8cba52>`);
        _push(ssrRenderComponent(_component_v_btn, {
          onClick: ($event) => _ctx.$inertia.visit(_ctx.route("admin.events_menu")),
          "prepend-icon": "mdi-table-chair",
          variant: "plain",
          color: "white"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="hidden d-md-block" data-v-3a8cba52${_scopeId}>Events Menu</span>`);
            } else {
              return [
                createVNode("span", { class: "hidden d-md-block" }, "Events Menu")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (_ctx.$page.props.ia) {
        _push(`<div class="hidden lg:block" data-v-3a8cba52>`);
        _push(ssrRenderComponent(_component_v_btn, {
          onClick: ($event) => _ctx.$inertia.visit(_ctx.route("admin.subscription_plans")),
          "prepend-icon": "mdi-autorenew",
          variant: "plain",
          color: "white"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="hidden d-md-block" data-v-3a8cba52${_scopeId}>Subscription plans</span>`);
            } else {
              return [
                createVNode("span", { class: "hidden d-md-block" }, "Subscription plans")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (_ctx.$page.props.ia) {
        _push(`<div data-v-3a8cba52>`);
        _push(ssrRenderComponent(_component_v_btn, {
          onClick: ($event) => _ctx.$inertia.visit(_ctx.route("admin.closed_dates")),
          "prepend-icon": "mdi-cancel",
          variant: "plain",
          color: "white"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="hidden d-md-block" data-v-3a8cba52${_scopeId}>Closed dates</span>`);
            } else {
              return [
                createVNode("span", { class: "hidden d-md-block" }, "Closed dates")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (_ctx.$page.props.ia) {
        _push(`<div class="hidden lg:block" data-v-3a8cba52>`);
        _push(ssrRenderComponent(_component_v_btn, {
          onClick: ($event) => _ctx.$inertia.visit(_ctx.route("admin.post_codes")),
          "prepend-icon": "mdi-map-marker",
          variant: "plain",
          color: "white"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="hidden d-md-block" data-v-3a8cba52${_scopeId}>Post codes</span>`);
            } else {
              return [
                createVNode("span", { class: "hidden d-md-block" }, "Post codes")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (_ctx.$page.props.ia) {
        _push(`<div class="hidden" data-v-3a8cba52>`);
        _push(ssrRenderComponent(_component_v_btn, {
          onClick: ($event) => _ctx.$inertia.visit(_ctx.route("admin.cards")),
          "prepend-icon": "mdi-cards-outline",
          variant: "plain",
          color: "white"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="hidden d-md-block" data-v-3a8cba52${_scopeId}>Gift cards</span>`);
            } else {
              return [
                createVNode("span", { class: "hidden d-md-block" }, "Gift cards")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (_ctx.$page.props.ia) {
        _push(`<div data-v-3a8cba52>`);
        _push(ssrRenderComponent(_component_v_btn, {
          onClick: ($event) => _ctx.$inertia.visit(_ctx.route("admin.payments")),
          "prepend-icon": "mdi-currency-usd",
          variant: "plain",
          color: "white"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="hidden d-md-block" data-v-3a8cba52${_scopeId}>Payments</span>`);
            } else {
              return [
                createVNode("span", { class: "hidden d-md-block" }, "Payments")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (_ctx.$page.props.ia) {
        _push(`<div class="hidden lg:block" data-v-3a8cba52>`);
        _push(ssrRenderComponent(_component_v_btn, {
          onClick: ($event) => _ctx.$inertia.visit(_ctx.route("admin.users")),
          "prepend-icon": "mdi-account",
          variant: "plain",
          color: "white"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="hidden d-md-block" data-v-3a8cba52${_scopeId}>Users</span>`);
            } else {
              return [
                createVNode("span", { class: "hidden d-md-block" }, "Users")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (_ctx.$page.props.ia) {
        _push(`<div data-v-3a8cba52>`);
        _push(ssrRenderComponent(_component_v_btn, {
          onClick: ($event) => _ctx.$inertia.visit(_ctx.route("admin.settings")),
          "prepend-icon": "mdi-cogs",
          variant: "plain",
          color: "white"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="hidden d-md-block" data-v-3a8cba52${_scopeId}>Settings</span>`);
            } else {
              return [
                createVNode("span", { class: "hidden d-md-block" }, "Settings")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (_ctx.$page.props.ia) {
        _push(`<div data-v-3a8cba52>`);
        _push(ssrRenderComponent(_component_v_btn, {
          onClick: ($event) => _ctx.$inertia.visit(_ctx.route("admin.landing_modal")),
          "prepend-icon": "mdi-window-restore",
          variant: "plain",
          color: "white"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="hidden d-md-block" data-v-3a8cba52${_scopeId}>Landing modal</span>`);
            } else {
              return [
                createVNode("span", { class: "hidden d-md-block" }, "Landing modal")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (_ctx.$page.props.ia) {
        _push(`<div class="hidden lg:block" data-v-3a8cba52>`);
        _push(ssrRenderComponent(_component_v_btn, {
          onClick: ($event) => _ctx.$inertia.visit(_ctx.route("admin.team")),
          "prepend-icon": "mdi-account-outline",
          variant: "plain",
          color: "white"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="hidden d-md-block" data-v-3a8cba52${_scopeId}>Team members</span>`);
            } else {
              return [
                createVNode("span", { class: "hidden d-md-block" }, "Team members")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div data-v-3a8cba52>`);
      _push(ssrRenderComponent(_component_v_btn, {
        onClick: ($event) => _ctx.$inertia.visit(_ctx.route("team.orders")),
        "prepend-icon": "mdi-clipboard-outline",
        variant: "plain",
        color: "white"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="hidden d-md-block" data-v-3a8cba52${_scopeId}>Team dashboard</span>`);
          } else {
            return [
              createVNode("span", { class: "hidden d-md-block" }, "Team dashboard")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      if (_ctx.$page.props.ia) {
        _push(`<div class="hidden lg:block" data-v-3a8cba52>`);
        _push(ssrRenderComponent(_component_v_btn, {
          onClick: ($event) => _ctx.$inertia.visit(_ctx.route("admin.main_content")),
          "prepend-icon": "mdi-text-long",
          variant: "plain",
          color: "white"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="hidden d-md-block" data-v-3a8cba52${_scopeId}>Main Content</span>`);
            } else {
              return [
                createVNode("span", { class: "hidden d-md-block" }, "Main Content")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (_ctx.$page.props.ia) {
        _push(`<div class="hidden lg:block" data-v-3a8cba52>`);
        _push(ssrRenderComponent(_component_v_btn, {
          onClick: ($event) => _ctx.$inertia.visit(_ctx.route("admin.legal_content")),
          "prepend-icon": "mdi-text-long",
          variant: "plain",
          color: "white"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="hidden d-md-block" data-v-3a8cba52${_scopeId}>Legal Content</span>`);
            } else {
              return [
                createVNode("span", { class: "hidden d-md-block" }, "Legal Content")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="h-screen grow bg-blue-grey-lighten-4 p-6 overflow-x-hidden overflow-y-scroll" data-v-3a8cba52>`);
      if (props.title) {
        _push(`<div data-v-3a8cba52><p class="text-4xl font-medium mb-3 uppercase" data-v-3a8cba52>${ssrInterpolate(props.title)}</p></div>`);
      } else {
        _push(`<!---->`);
      }
      if (_ctx.$slots.buttons) {
        _push(`<div class="mb-3" data-v-3a8cba52>`);
        ssrRenderSlot(_ctx.$slots, "buttons", {}, null, _push, _parent);
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></div></div></div>`);
      _push(ssrRenderComponent(_component_v_snackbar, {
        modelValue: showSnackbar.value,
        "onUpdate:modelValue": ($event) => showSnackbar.value = $event,
        text: snackbarMessage.value,
        color: snackbarColor.value,
        class: "mb-5"
      }, null, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/AdmLayout.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const AdmLayout = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-3a8cba52"]]);
export {
  AdmLayout as A
};
