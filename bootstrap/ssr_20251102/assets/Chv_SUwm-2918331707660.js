import { ref, onMounted, resolveComponent, unref, withCtx, createVNode, openBlock, createBlock, createCommentVNode, createTextVNode, toDisplayString, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrRenderList, ssrRenderClass, ssrInterpolate } from "vue/server-renderer";
import { A as AppLayout } from "./BQTBzxda-1835617976051.js";
import { Head } from "@inertiajs/vue3";
import { W as Wrapper } from "./CKjt-vIU-6617638167690.js";
import { _ as _sfc_main$1 } from "./BGTMc6Vz-1916666776038.js";
import { _ as _sfc_main$2 } from "./CznY329j-6813667791076.js";
import Flickity from "flickity";
/* empty css                       */
import imagesLoaded from "imagesloaded";
import { f as formatTitle, l as linkOutcome } from "./DEmmWHtk-6761739876106.js";
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
import "./DsvTyKEu-3067955167518.js";
import "./CeVcRmCk-1577655618930.js";
import "./Cyl_ukyB-5873697610160.js";
const _sfc_main = /* @__PURE__ */ Object.assign({ layout: AppLayout }, {
  __name: "About",
  __ssrInlineRender: true,
  props: {
    content: Object,
    meta_description: { type: String, default: "" },
    is_production: { type: Boolean, default: false }
  },
  setup(__props) {
    ref(null);
    const props = __props;
    const carousel = ref(null);
    const monthCreationImages = ref([
      "monthly-1.jpg",
      "monthly-2.jpg",
      "monthly-3.jpg",
      "monthly-4.jpg",
      "monthly-5.jpg"
    ]);
    onMounted(() => {
      if (monthCreationImages.value.length) {
        imagesLoaded(carousel.value, function() {
          new Flickity(carousel.value, {
            cellAlign: "center",
            contain: true,
            pageDots: false,
            prevNextButtons: false,
            wrapAround: true,
            autoPlay: true
          });
        });
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_v_card = resolveComponent("v-card");
      const _component_v_img = resolveComponent("v-img");
      const _component_v_card_title = resolveComponent("v-card-title");
      const _component_v_card_subtitle = resolveComponent("v-card-subtitle");
      const _component_v_btn = resolveComponent("v-btn");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<title data-v-b93fd8b2${_scopeId}>La Boutique</title>`);
            if (props.meta_description) {
              _push2(`<meta name="description"${ssrRenderAttr("content", props.meta_description)} data-v-b93fd8b2${_scopeId}>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<meta name="robots"${ssrRenderAttr("content", props.is_production ?? false ? "index, follow" : "noindex, nofollow")} data-v-b93fd8b2${_scopeId}>`);
          } else {
            return [
              createVNode("title", null, "La Boutique"),
              props.meta_description ? (openBlock(), createBlock("meta", {
                key: 0,
                name: "description",
                content: props.meta_description
              }, null, 8, ["content"])) : createCommentVNode("", true),
              createVNode("meta", {
                name: "robots",
                content: props.is_production ?? false ? "index, follow" : "noindex, nofollow"
              }, null, 8, ["content"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(Wrapper, { style: { "margin-top": "150px" } }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$1, null, {
              description: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-b93fd8b2${_scopeId2}>${props.content.introduction ?? ""}</p>`);
                } else {
                  return [
                    createVNode("p", {
                      innerHTML: props.content.introduction
                    }, null, 8, ["innerHTML"])
                  ];
                }
              }),
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex justify-center" data-v-b93fd8b2${_scopeId2}><div class="text-center" data-v-b93fd8b2${_scopeId2}><h1 class="text-6xl brand uppercase" data-v-b93fd8b2${_scopeId2}>${unref(formatTitle)(props.content.title) ?? ""}</h1></div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex justify-center" }, [
                      createVNode("div", { class: "text-center" }, [
                        createVNode("h1", {
                          class: "text-6xl brand uppercase",
                          innerHTML: unref(formatTitle)(props.content.title)
                        }, null, 8, ["innerHTML"])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$1, null, {
                description: withCtx(() => [
                  createVNode("p", {
                    innerHTML: props.content.introduction
                  }, null, 8, ["innerHTML"])
                ]),
                default: withCtx(() => [
                  createVNode("div", { class: "flex justify-center" }, [
                    createVNode("div", { class: "text-center" }, [
                      createVNode("h1", {
                        class: "text-6xl brand uppercase",
                        innerHTML: unref(formatTitle)(props.content.title)
                      }, null, 8, ["innerHTML"])
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
      _push(ssrRenderComponent(_sfc_main$2, { wrapper: "section" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(Wrapper, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div data-v-b93fd8b2${_scopeId2}><div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3" data-v-b93fd8b2${_scopeId2}><!--[-->`);
                  ssrRenderList(9, (module) => {
                    _push3(`<div class="${ssrRenderClass(`xl:col-span-${props.content[`module_${module}_size`]}`)}" data-v-b93fd8b2${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_v_card, {
                      color: "grey-lighten-3",
                      rounded: "lg"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<a${ssrRenderAttr("href", props.content[`module_${module}_button_link`] ?? "#")}${ssrRenderAttr("target", unref(linkOutcome)(props.content[`module_${module}_button_link`] ?? "#", "_self", "_blank"))} data-v-b93fd8b2${_scopeId3}>`);
                          _push4(ssrRenderComponent(_component_v_img, {
                            height: "350px",
                            class: "align-end",
                            src: `/images/content/${props.content[`module_${module}_image`] ?? "empty.png"}`,
                            gradient: `${props.content[`module_${module}_button_link`] ? "to bottom left, rgba(0,0,0,.1), rgba(0,0,0,.8)" : "to bottom left, rgba(0,0,0,.08), rgba(0,0,0,.2)"}`,
                            cover: ""
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<div class="pb-3 text-white" data-v-b93fd8b2${_scopeId4}>`);
                                _push5(ssrRenderComponent(_component_v_card_title, null, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`${ssrInterpolate(props.content[`module_${module}_title`] ?? "Coming soon")}`);
                                    } else {
                                      return [
                                        createTextVNode(toDisplayString(props.content[`module_${module}_title`] ?? "Coming soon"), 1)
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                                if (props.content[`module_${module}_button_link`] ?? false) {
                                  _push5(ssrRenderComponent(_component_v_card_subtitle, null, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(ssrRenderComponent(_component_v_btn, {
                                          color: "white",
                                          size: "small",
                                          "append-icon": unref(linkOutcome)(props.content[`module_${module}_button_link`] ?? "#", "", "mdi-open-in-new")
                                        }, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(`${ssrInterpolate(props.content[`module_${module}_button_text`] ?? "")}`);
                                            } else {
                                              return [
                                                createTextVNode(toDisplayString(props.content[`module_${module}_button_text`] ?? ""), 1)
                                              ];
                                            }
                                          }),
                                          _: 2
                                        }, _parent6, _scopeId5));
                                      } else {
                                        return [
                                          createVNode(_component_v_btn, {
                                            color: "white",
                                            size: "small",
                                            "append-icon": unref(linkOutcome)(props.content[`module_${module}_button_link`] ?? "#", "", "mdi-open-in-new")
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(props.content[`module_${module}_button_text`] ?? ""), 1)
                                            ]),
                                            _: 2
                                          }, 1032, ["append-icon"])
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                } else {
                                  _push5(`<!---->`);
                                }
                                _push5(`</div>`);
                              } else {
                                return [
                                  createVNode("div", { class: "pb-3 text-white" }, [
                                    createVNode(_component_v_card_title, null, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(props.content[`module_${module}_title`] ?? "Coming soon"), 1)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    props.content[`module_${module}_button_link`] ?? false ? (openBlock(), createBlock(_component_v_card_subtitle, { key: 0 }, {
                                      default: withCtx(() => [
                                        createVNode(_component_v_btn, {
                                          color: "white",
                                          size: "small",
                                          "append-icon": unref(linkOutcome)(props.content[`module_${module}_button_link`] ?? "#", "", "mdi-open-in-new")
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(props.content[`module_${module}_button_text`] ?? ""), 1)
                                          ]),
                                          _: 2
                                        }, 1032, ["append-icon"])
                                      ]),
                                      _: 2
                                    }, 1024)) : createCommentVNode("", true)
                                  ])
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                          _push4(`</a>`);
                        } else {
                          return [
                            createVNode("a", {
                              href: props.content[`module_${module}_button_link`] ?? "#",
                              target: unref(linkOutcome)(props.content[`module_${module}_button_link`] ?? "#", "_self", "_blank")
                            }, [
                              createVNode(_component_v_img, {
                                height: "350px",
                                class: "align-end",
                                src: `/images/content/${props.content[`module_${module}_image`] ?? "empty.png"}`,
                                gradient: `${props.content[`module_${module}_button_link`] ? "to bottom left, rgba(0,0,0,.1), rgba(0,0,0,.8)" : "to bottom left, rgba(0,0,0,.08), rgba(0,0,0,.2)"}`,
                                cover: ""
                              }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "pb-3 text-white" }, [
                                    createVNode(_component_v_card_title, null, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(props.content[`module_${module}_title`] ?? "Coming soon"), 1)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    props.content[`module_${module}_button_link`] ?? false ? (openBlock(), createBlock(_component_v_card_subtitle, { key: 0 }, {
                                      default: withCtx(() => [
                                        createVNode(_component_v_btn, {
                                          color: "white",
                                          size: "small",
                                          "append-icon": unref(linkOutcome)(props.content[`module_${module}_button_link`] ?? "#", "", "mdi-open-in-new")
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(props.content[`module_${module}_button_text`] ?? ""), 1)
                                          ]),
                                          _: 2
                                        }, 1032, ["append-icon"])
                                      ]),
                                      _: 2
                                    }, 1024)) : createCommentVNode("", true)
                                  ])
                                ]),
                                _: 2
                              }, 1032, ["src", "gradient"])
                            ], 8, ["href", "target"])
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(`</div>`);
                  });
                  _push3(`<!--]--></div></div>`);
                } else {
                  return [
                    createVNode("div", null, [
                      createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3" }, [
                        (openBlock(), createBlock(Fragment, null, renderList(9, (module) => {
                          return createVNode("div", {
                            class: `xl:col-span-${props.content[`module_${module}_size`]}`
                          }, [
                            createVNode(_component_v_card, {
                              color: "grey-lighten-3",
                              rounded: "lg"
                            }, {
                              default: withCtx(() => [
                                createVNode("a", {
                                  href: props.content[`module_${module}_button_link`] ?? "#",
                                  target: unref(linkOutcome)(props.content[`module_${module}_button_link`] ?? "#", "_self", "_blank")
                                }, [
                                  createVNode(_component_v_img, {
                                    height: "350px",
                                    class: "align-end",
                                    src: `/images/content/${props.content[`module_${module}_image`] ?? "empty.png"}`,
                                    gradient: `${props.content[`module_${module}_button_link`] ? "to bottom left, rgba(0,0,0,.1), rgba(0,0,0,.8)" : "to bottom left, rgba(0,0,0,.08), rgba(0,0,0,.2)"}`,
                                    cover: ""
                                  }, {
                                    default: withCtx(() => [
                                      createVNode("div", { class: "pb-3 text-white" }, [
                                        createVNode(_component_v_card_title, null, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(props.content[`module_${module}_title`] ?? "Coming soon"), 1)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        props.content[`module_${module}_button_link`] ?? false ? (openBlock(), createBlock(_component_v_card_subtitle, { key: 0 }, {
                                          default: withCtx(() => [
                                            createVNode(_component_v_btn, {
                                              color: "white",
                                              size: "small",
                                              "append-icon": unref(linkOutcome)(props.content[`module_${module}_button_link`] ?? "#", "", "mdi-open-in-new")
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(props.content[`module_${module}_button_text`] ?? ""), 1)
                                              ]),
                                              _: 2
                                            }, 1032, ["append-icon"])
                                          ]),
                                          _: 2
                                        }, 1024)) : createCommentVNode("", true)
                                      ])
                                    ]),
                                    _: 2
                                  }, 1032, ["src", "gradient"])
                                ], 8, ["href", "target"])
                              ]),
                              _: 2
                            }, 1024)
                          ], 2);
                        }), 64))
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(Wrapper, { class: "mt-10" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="text-center" data-v-b93fd8b2${_scopeId2}><h2 class="text-5xl uppercase mb-5" data-v-b93fd8b2${_scopeId2}>${unref(formatTitle)(props.content.testimonials_title) ?? ""}</h2><p data-v-b93fd8b2${_scopeId2}>${props.content.testimonials_introduction ?? ""}</p></div><div class="mt-10" data-v-b93fd8b2${_scopeId2}><div class="grid grid-cols-1 lg:grid-cols-3 gap-8" data-v-b93fd8b2${_scopeId2}><!--[-->`);
                  ssrRenderList(3, (i) => {
                    _push3(`<div data-v-b93fd8b2${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_v_img, { class: "brand-bg text-white rounded-3xl" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<div class="p-12" data-v-b93fd8b2${_scopeId3}><p class="mb-5 uppercase text-orange-lighten-4 font-bold" data-v-b93fd8b2${_scopeId3}>${ssrInterpolate(props.content[`testimonial_${i}_name`])}</p><div data-v-b93fd8b2${_scopeId3}><p data-v-b93fd8b2${_scopeId3}>${props.content[`testimonial_${i}_content`] ?? ""}</p></div></div>`);
                        } else {
                          return [
                            createVNode("div", { class: "p-12" }, [
                              createVNode("p", { class: "mb-5 uppercase text-orange-lighten-4 font-bold" }, toDisplayString(props.content[`testimonial_${i}_name`]), 1),
                              createVNode("div", null, [
                                createVNode("p", {
                                  innerHTML: props.content[`testimonial_${i}_content`]
                                }, null, 8, ["innerHTML"])
                              ])
                            ])
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(`</div>`);
                  });
                  _push3(`<!--]--></div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "text-center" }, [
                      createVNode("h2", {
                        class: "text-5xl uppercase mb-5",
                        innerHTML: unref(formatTitle)(props.content.testimonials_title)
                      }, null, 8, ["innerHTML"]),
                      createVNode("p", {
                        innerHTML: props.content.testimonials_introduction
                      }, null, 8, ["innerHTML"])
                    ]),
                    createVNode("div", { class: "mt-10" }, [
                      createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-3 gap-8" }, [
                        (openBlock(), createBlock(Fragment, null, renderList(3, (i) => {
                          return createVNode("div", null, [
                            createVNode(_component_v_img, { class: "brand-bg text-white rounded-3xl" }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "p-12" }, [
                                  createVNode("p", { class: "mb-5 uppercase text-orange-lighten-4 font-bold" }, toDisplayString(props.content[`testimonial_${i}_name`]), 1),
                                  createVNode("div", null, [
                                    createVNode("p", {
                                      innerHTML: props.content[`testimonial_${i}_content`]
                                    }, null, 8, ["innerHTML"])
                                  ])
                                ])
                              ]),
                              _: 2
                            }, 1024)
                          ]);
                        }), 64))
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(Wrapper, null, {
                default: withCtx(() => [
                  createVNode("div", null, [
                    createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3" }, [
                      (openBlock(), createBlock(Fragment, null, renderList(9, (module) => {
                        return createVNode("div", {
                          class: `xl:col-span-${props.content[`module_${module}_size`]}`
                        }, [
                          createVNode(_component_v_card, {
                            color: "grey-lighten-3",
                            rounded: "lg"
                          }, {
                            default: withCtx(() => [
                              createVNode("a", {
                                href: props.content[`module_${module}_button_link`] ?? "#",
                                target: unref(linkOutcome)(props.content[`module_${module}_button_link`] ?? "#", "_self", "_blank")
                              }, [
                                createVNode(_component_v_img, {
                                  height: "350px",
                                  class: "align-end",
                                  src: `/images/content/${props.content[`module_${module}_image`] ?? "empty.png"}`,
                                  gradient: `${props.content[`module_${module}_button_link`] ? "to bottom left, rgba(0,0,0,.1), rgba(0,0,0,.8)" : "to bottom left, rgba(0,0,0,.08), rgba(0,0,0,.2)"}`,
                                  cover: ""
                                }, {
                                  default: withCtx(() => [
                                    createVNode("div", { class: "pb-3 text-white" }, [
                                      createVNode(_component_v_card_title, null, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(props.content[`module_${module}_title`] ?? "Coming soon"), 1)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      props.content[`module_${module}_button_link`] ?? false ? (openBlock(), createBlock(_component_v_card_subtitle, { key: 0 }, {
                                        default: withCtx(() => [
                                          createVNode(_component_v_btn, {
                                            color: "white",
                                            size: "small",
                                            "append-icon": unref(linkOutcome)(props.content[`module_${module}_button_link`] ?? "#", "", "mdi-open-in-new")
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(props.content[`module_${module}_button_text`] ?? ""), 1)
                                            ]),
                                            _: 2
                                          }, 1032, ["append-icon"])
                                        ]),
                                        _: 2
                                      }, 1024)) : createCommentVNode("", true)
                                    ])
                                  ]),
                                  _: 2
                                }, 1032, ["src", "gradient"])
                              ], 8, ["href", "target"])
                            ]),
                            _: 2
                          }, 1024)
                        ], 2);
                      }), 64))
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode(Wrapper, { class: "mt-10" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "text-center" }, [
                    createVNode("h2", {
                      class: "text-5xl uppercase mb-5",
                      innerHTML: unref(formatTitle)(props.content.testimonials_title)
                    }, null, 8, ["innerHTML"]),
                    createVNode("p", {
                      innerHTML: props.content.testimonials_introduction
                    }, null, 8, ["innerHTML"])
                  ]),
                  createVNode("div", { class: "mt-10" }, [
                    createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-3 gap-8" }, [
                      (openBlock(), createBlock(Fragment, null, renderList(3, (i) => {
                        return createVNode("div", null, [
                          createVNode(_component_v_img, { class: "brand-bg text-white rounded-3xl" }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "p-12" }, [
                                createVNode("p", { class: "mb-5 uppercase text-orange-lighten-4 font-bold" }, toDisplayString(props.content[`testimonial_${i}_name`]), 1),
                                createVNode("div", null, [
                                  createVNode("p", {
                                    innerHTML: props.content[`testimonial_${i}_content`]
                                  }, null, 8, ["innerHTML"])
                                ])
                              ])
                            ]),
                            _: 2
                          }, 1024)
                        ]);
                      }), 64))
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
      if (props.content.instructions_baked_goods_youtube_video_id) {
        _push(ssrRenderComponent(Wrapper, { class: "mt-10 pb-20" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="text-center" data-v-b93fd8b2${_scopeId}><h2 class="text-5xl uppercase" data-v-b93fd8b2${_scopeId}>${unref(formatTitle)(props.content.instructions_baked_goods_title) ?? ""}</h2>`);
              _push2(ssrRenderComponent(_component_v_card, {
                class: "mt-10",
                rounded: "xl"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_v_img, { "aspect-ratio": "1.777" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<iframe class="w-full h-full"${ssrRenderAttr("src", `https://www.youtube.com/embed/${props.content.instructions_baked_goods_youtube_video_id}?modestbranding=1&rel=0&controls=1`)} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen data-v-b93fd8b2${_scopeId3}></iframe>`);
                        } else {
                          return [
                            createVNode("iframe", {
                              class: "w-full h-full",
                              src: `https://www.youtube.com/embed/${props.content.instructions_baked_goods_youtube_video_id}?modestbranding=1&rel=0&controls=1`,
                              title: "YouTube video player",
                              frameborder: "0",
                              allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
                              referrerpolicy: "strict-origin-when-cross-origin",
                              allowfullscreen: ""
                            }, null, 8, ["src"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_v_img, { "aspect-ratio": "1.777" }, {
                        default: withCtx(() => [
                          createVNode("iframe", {
                            class: "w-full h-full",
                            src: `https://www.youtube.com/embed/${props.content.instructions_baked_goods_youtube_video_id}?modestbranding=1&rel=0&controls=1`,
                            title: "YouTube video player",
                            frameborder: "0",
                            allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
                            referrerpolicy: "strict-origin-when-cross-origin",
                            allowfullscreen: ""
                          }, null, 8, ["src"])
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              return [
                createVNode("div", { class: "text-center" }, [
                  createVNode("h2", {
                    class: "text-5xl uppercase",
                    innerHTML: unref(formatTitle)(props.content.instructions_baked_goods_title)
                  }, null, 8, ["innerHTML"]),
                  createVNode(_component_v_card, {
                    class: "mt-10",
                    rounded: "xl"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_v_img, { "aspect-ratio": "1.777" }, {
                        default: withCtx(() => [
                          createVNode("iframe", {
                            class: "w-full h-full",
                            src: `https://www.youtube.com/embed/${props.content.instructions_baked_goods_youtube_video_id}?modestbranding=1&rel=0&controls=1`,
                            title: "YouTube video player",
                            frameborder: "0",
                            allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
                            referrerpolicy: "strict-origin-when-cross-origin",
                            allowfullscreen: ""
                          }, null, 8, ["src"])
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
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/About.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const About = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-b93fd8b2"]]);
export {
  About as default
};
