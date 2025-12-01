import { ref, resolveComponent, unref, withCtx, createTextVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { Head, router } from "@inertiajs/vue3";
import "./CKjt-vIU-6617638167690.js";
import "./1tPrXgE0-4581736670159.js";
const _sfc_main = {
  __name: "Welcome",
  __ssrInlineRender: true,
  props: {
    errors: Object
  },
  setup(__props) {
    const props = __props;
    const key = ref(null);
    const local_errors = ref({});
    const resetErrors = () => {
      local_errors.value = {};
    };
    const validateKey = () => {
      router.post(route("validate_key"), {
        key: key.value
      }, {
        preserveScroll: true,
        preserveState: true,
        onSuccess: (response) => {
        },
        onError: (error) => {
          local_errors.value = props.errors;
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_v_label = resolveComponent("v-label");
      const _component_v_text_field = resolveComponent("v-text-field");
      const _component_v_btn = resolveComponent("v-btn");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Welcome" }, null, _parent));
      _push(`<div class="my-20 py-20 max-w-lg mx-auto text-center">`);
      _push(ssrRenderComponent(_component_v_label, { class: "mb-3" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Password:`);
          } else {
            return [
              createTextVNode("Password:")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_v_text_field, {
        onKeyup: resetErrors,
        modelValue: key.value,
        "onUpdate:modelValue": ($event) => key.value = $event
      }, null, _parent));
      _push(ssrRenderComponent(_component_v_btn, {
        onClick: validateKey,
        class: "rounded-pill"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Enter`);
          } else {
            return [
              createTextVNode("Enter")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="my-10"><!--[-->`);
      ssrRenderList(local_errors.value, (error) => {
        _push(`<div><p class="text-red">${ssrInterpolate(error)}</p></div>`);
      });
      _push(`<!--]--></div></div><!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Welcome.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
