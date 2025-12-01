import { ref, onMounted, onBeforeUnmount, resolveComponent, unref, withCtx, createTextVNode, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { A as AppLayout } from "./BT2Gi1aL-2117352433356.js";
import { Head } from "@inertiajs/vue3";
import { W as Wrapper } from "./CbcLIE-O-3135473238126.js";
import { _ as _sfc_main$1 } from "./BGTMc6Vz-1731362423358.js";
import { _ as _sfc_main$2 } from "./CznY329j-2334615712833.js";
import Isotope from "isotope-layout";
import imagesLoaded from "imagesloaded";
import "./BW6cC8iL-1754723312335.js";
import "./kZV6a-x4-2437327355113.js";
import "vuetify";
import "./DKEAH6nn-4333751172235.js";
import "mitt";
import "gsap";
import "gsap/ScrollTrigger.js";
import "gsap/ScrollSmoother.js";
import "./1tPrXgE0-1751246333532.js";
import "./AK26aD-S-7313723521453.js";
import "./C6q4kDV--4257163313235.js";
import "./DsvTyKEu-3355343127127.js";
import "./CeVcRmCk-1453137522733.js";
import "./Cyl_ukyB-3352317127354.js";
const _sfc_main = /* @__PURE__ */ Object.assign({ layout: AppLayout }, {
  __name: "Gallery",
  __ssrInlineRender: true,
  props: {},
  setup(__props) {
    const isotope = ref(null);
    function filterItems(filter) {
      isotope.value.arrange({ filter });
    }
    function sortItems(sortBy) {
      console.log(sortBy);
      isotope.value.arrange({ sortBy });
    }
    onMounted(() => {
      const gridElement = document.querySelector(".collection");
      imagesLoaded(gridElement, function() {
        isotope.value = new Isotope(gridElement, {
          itemSelector: ".collection-item",
          layoutMode: "fitRows",
          transitionDuration: "0.7s"
        });
        isotope.value.on("layoutComplete", function() {
          console.log("9203492");
        });
      });
    });
    onBeforeUnmount(() => {
      const heroImage = document.querySelector(".hero-image");
      heroImage.removeEventListener("load", onLoad);
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_v_btn = resolveComponent("v-btn");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "La Boutique" }, null, _parent));
      _push(ssrRenderComponent(Wrapper, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$1, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`La Boutique`);
                } else {
                  return [
                    createTextVNode("La Boutique")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$1, null, {
                default: withCtx(() => [
                  createTextVNode("La Boutique")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$2, { wrapper: "section" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(Wrapper, { wrapper: "section" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div${_scopeId2}><div class="mb-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_v_btn, {
                    class: "me-2",
                    onClick: ($event) => filterItems("*")
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Show All`);
                      } else {
                        return [
                          createTextVNode("Show All")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_v_btn, {
                    class: "me-2",
                    onClick: ($event) => filterItems(".metal")
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Metal`);
                      } else {
                        return [
                          createTextVNode("Metal")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_v_btn, {
                    class: "me-2",
                    onClick: ($event) => filterItems(".transition")
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Transition`);
                      } else {
                        return [
                          createTextVNode("Transition")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_v_btn, {
                    class: "me-2",
                    onClick: ($event) => sortItems("original-order")
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Original Order`);
                      } else {
                        return [
                          createTextVNode("Original Order")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_v_btn, {
                    class: "me-2",
                    onClick: ($event) => sortItems("name")
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Name`);
                      } else {
                        return [
                          createTextVNode("Name")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div><div class="collection"${_scopeId2}><div class="w-1/2 collection-item metal" data-name="Iron"${_scopeId2}>Iron</div><div class="w-1/2 collection-item metal" data-name="Gold"${_scopeId2}>Gold</div><div class="w-1/2 collection-item transition" data-name="Copper"${_scopeId2}>Copper</div><div class="w-1/2 collection-item transition" data-name="Zinc"${_scopeId2}>Zinc</div></div></div>`);
                } else {
                  return [
                    createVNode("div", null, [
                      createVNode("div", { class: "mb-2" }, [
                        createVNode(_component_v_btn, {
                          class: "me-2",
                          onClick: ($event) => filterItems("*")
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Show All")
                          ]),
                          _: 1
                        }, 8, ["onClick"]),
                        createVNode(_component_v_btn, {
                          class: "me-2",
                          onClick: ($event) => filterItems(".metal")
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Metal")
                          ]),
                          _: 1
                        }, 8, ["onClick"]),
                        createVNode(_component_v_btn, {
                          class: "me-2",
                          onClick: ($event) => filterItems(".transition")
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Transition")
                          ]),
                          _: 1
                        }, 8, ["onClick"]),
                        createVNode(_component_v_btn, {
                          class: "me-2",
                          onClick: ($event) => sortItems("original-order")
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Original Order")
                          ]),
                          _: 1
                        }, 8, ["onClick"]),
                        createVNode(_component_v_btn, {
                          class: "me-2",
                          onClick: ($event) => sortItems("name")
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Name")
                          ]),
                          _: 1
                        }, 8, ["onClick"])
                      ]),
                      createVNode("div", { class: "collection" }, [
                        createVNode("div", {
                          class: "w-1/2 collection-item metal",
                          "data-name": "Iron"
                        }, "Iron"),
                        createVNode("div", {
                          class: "w-1/2 collection-item metal",
                          "data-name": "Gold"
                        }, "Gold"),
                        createVNode("div", {
                          class: "w-1/2 collection-item transition",
                          "data-name": "Copper"
                        }, "Copper"),
                        createVNode("div", {
                          class: "w-1/2 collection-item transition",
                          "data-name": "Zinc"
                        }, "Zinc")
                      ])
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
                  createVNode("div", null, [
                    createVNode("div", { class: "mb-2" }, [
                      createVNode(_component_v_btn, {
                        class: "me-2",
                        onClick: ($event) => filterItems("*")
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Show All")
                        ]),
                        _: 1
                      }, 8, ["onClick"]),
                      createVNode(_component_v_btn, {
                        class: "me-2",
                        onClick: ($event) => filterItems(".metal")
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Metal")
                        ]),
                        _: 1
                      }, 8, ["onClick"]),
                      createVNode(_component_v_btn, {
                        class: "me-2",
                        onClick: ($event) => filterItems(".transition")
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Transition")
                        ]),
                        _: 1
                      }, 8, ["onClick"]),
                      createVNode(_component_v_btn, {
                        class: "me-2",
                        onClick: ($event) => sortItems("original-order")
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Original Order")
                        ]),
                        _: 1
                      }, 8, ["onClick"]),
                      createVNode(_component_v_btn, {
                        class: "me-2",
                        onClick: ($event) => sortItems("name")
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Name")
                        ]),
                        _: 1
                      }, 8, ["onClick"])
                    ]),
                    createVNode("div", { class: "collection" }, [
                      createVNode("div", {
                        class: "w-1/2 collection-item metal",
                        "data-name": "Iron"
                      }, "Iron"),
                      createVNode("div", {
                        class: "w-1/2 collection-item metal",
                        "data-name": "Gold"
                      }, "Gold"),
                      createVNode("div", {
                        class: "w-1/2 collection-item transition",
                        "data-name": "Copper"
                      }, "Copper"),
                      createVNode("div", {
                        class: "w-1/2 collection-item transition",
                        "data-name": "Zinc"
                      }, "Zinc")
                    ])
                  ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Gallery.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
