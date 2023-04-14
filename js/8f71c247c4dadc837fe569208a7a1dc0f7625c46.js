if (!document.createElement("canvas").getContext) {
    (function() {
        var v = Math;
        var w = v.round;
        var s = v.sin;
        var E = v.cos;
        var n = v.abs;
        var D = v.sqrt;
        var a = 10;
        var o = a / 2;

        function h() {
            return this.context_ || (this.context_ = new q(this))
        }
        var u = Array.prototype.slice;

        function F(j, m, G) {
            var i = u.call(arguments, 2);
            return function() {
                return j.apply(m, i.concat(u.call(arguments)))
            }
        }
        var k = {
            init: function(i) {
                if (/MSIE/.test(navigator.userAgent) && !window.opera) {
                    var j = i || document;
                    j.createElement("canvas");
                    if (j.readyState !== "complete") {
                        j.attachEvent("onreadystatechange", F(this.init_, this, j))
                    } else {
                        this.init_(j)
                    }
                }
            },
            init_: function(H) {
                if (!H.namespaces.g_vml_) {
                    H.namespaces.add("g_vml_", "urn:schemas-microsoft-com:vml", "#default#VML")
                }
                if (!H.namespaces.g_o_) {
                    H.namespaces.add("g_o_", "urn:schemas-microsoft-com:office:office", "#default#VML")
                }
                if (!H.styleSheets.ex_canvas_) {
                    var G = H.createStyleSheet();
                    G.owningElement.id = "ex_canvas_";
                    G.cssText = "canvas{display:inline-block;overflow:hidden;text-align:left;width:300px;height:150px}g_vml_\\:*{behavior:url(#default#VML)}g_o_\\:*{behavior:url(#default#VML)}"
                }
                var m = H.getElementsByTagName("canvas");
                for (var j = 0; j < m.length; j++) {
                    this.initElement(m[j])
                }
            },
            initElement: function(j) {
                if (!j.getContext) {
                    j.getContext = h;
                    j.innerHTML = "";
                    j.attachEvent("onpropertychange", C);
                    j.attachEvent("onresize", b);
                    var i = j.attributes;
                    if (i.width && i.width.specified) {
                        j.style.width = i.width.nodeValue + "px"
                    } else {
                        j.width = j.clientWidth
                    }
                    if (i.height && i.height.specified) {
                        j.style.height = i.height.nodeValue + "px"
                    } else {
                        j.height = j.clientHeight
                    }
                }
                return j
            }
        };

        function C(j) {
            var i = j.srcElement;
            switch (j.propertyName) {
                case "width":
                    i.style.width = i.attributes.width.nodeValue + "px";
                    i.getContext().clearRect();
                    break;
                case "height":
                    i.style.height = i.attributes.height.nodeValue + "px";
                    i.getContext().clearRect();
                    break
            }
        }

        function b(j) {
            var i = j.srcElement;
            if (i.firstChild) {
                i.firstChild.style.width = i.clientWidth + "px";
                i.firstChild.style.height = i.clientHeight + "px"
            }
        }
        k.init();
        var e = [];
        for (var z = 0; z < 16; z++) {
            for (var y = 0; y < 16; y++) {
                e[z * 16 + y] = z.toString(16) + y.toString(16)
            }
        }

        function r() {
            return [
                [1, 0, 0],
                [0, 1, 0],
                [0, 0, 1]
            ]
        }

        function d(G, m) {
            var j = r();
            for (var i = 0; i < 3; i++) {
                for (var J = 0; J < 3; J++) {
                    var H = 0;
                    for (var I = 0; I < 3; I++) {
                        H += G[i][I] * m[I][J]
                    }
                    j[i][J] = H
                }
            }
            return j
        }

        function x(j, i) {
            i.fillStyle = j.fillStyle;
            i.lineCap = j.lineCap;
            i.lineJoin = j.lineJoin;
            i.lineWidth = j.lineWidth;
            i.miterLimit = j.miterLimit;
            i.shadowBlur = j.shadowBlur;
            i.shadowColor = j.shadowColor;
            i.shadowOffsetX = j.shadowOffsetX;
            i.shadowOffsetY = j.shadowOffsetY;
            i.strokeStyle = j.strokeStyle;
            i.globalAlpha = j.globalAlpha;
            i.arcScaleX_ = j.arcScaleX_;
            i.arcScaleY_ = j.arcScaleY_;
            i.lineScale_ = j.lineScale_
        }

        function c(m) {
            var I, H = 1;
            m = String(m);
            if (m.substring(0, 3) == "rgb") {
                var K = m.indexOf("(", 3);
                var j = m.indexOf(")", K + 1);
                var J = m.substring(K + 1, j).split(",");
                I = "#";
                for (var G = 0; G < 3; G++) {
                    I += e[Number(J[G])]
                }
                if (J.length == 4 && m.substr(3, 1) == "a") {
                    H = J[3]
                }
            } else {
                I = m
            }
            return {
                color: I,
                alpha: H
            }
        }

        function t(i) {
            switch (i) {
                case "butt":
                    return "flat";
                case "round":
                    return "round";
                case "square":
                default:
                    return "square"
            }
        }

        function q(j) {
            this.m_ = r();
            this.mStack_ = [];
            this.aStack_ = [];
            this.currentPath_ = [];
            this.strokeStyle = "#000";
            this.fillStyle = "#000";
            this.lineWidth = 1;
            this.lineJoin = "miter";
            this.lineCap = "butt";
            this.miterLimit = a * 1;
            this.globalAlpha = 1;
            this.canvas = j;
            var i = j.ownerDocument.createElement("div");
            i.style.width = j.clientWidth + "px";
            i.style.height = j.clientHeight + "px";
            i.style.overflow = "hidden";
            i.style.position = "absolute";
            j.appendChild(i);
            this.element_ = i;
            this.arcScaleX_ = 1;
            this.arcScaleY_ = 1;
            this.lineScale_ = 1
        }
        var l = q.prototype;
        l.clearRect = function() {
            this.element_.innerHTML = ""
        };
        l.beginPath = function() {
            this.currentPath_ = []
        };
        l.moveTo = function(j, i) {
            var m = this.getCoords_(j, i);
            this.currentPath_.push({
                type: "moveTo",
                x: m.x,
                y: m.y
            });
            this.currentX_ = m.x;
            this.currentY_ = m.y
        };
        l.lineTo = function(j, i) {
            var m = this.getCoords_(j, i);
            this.currentPath_.push({
                type: "lineTo",
                x: m.x,
                y: m.y
            });
            this.currentX_ = m.x;
            this.currentY_ = m.y
        };
        l.bezierCurveTo = function(m, j, L, K, J, H) {
            var i = this.getCoords_(J, H);
            var I = this.getCoords_(m, j);
            var G = this.getCoords_(L, K);
            p(this, I, G, i)
        };

        function p(i, G, m, j) {
            i.currentPath_.push({
                type: "bezierCurveTo",
                cp1x: G.x,
                cp1y: G.y,
                cp2x: m.x,
                cp2y: m.y,
                x: j.x,
                y: j.y
            });
            i.currentX_ = j.x;
            i.currentY_ = j.y
        }
        l.quadraticCurveTo = function(J, m, j, i) {
            var I = this.getCoords_(J, m);
            var H = this.getCoords_(j, i);
            var K = {
                x: this.currentX_ + 2 / 3 * (I.x - this.currentX_),
                y: this.currentY_ + 2 / 3 * (I.y - this.currentY_)
            };
            var G = {
                x: K.x + (H.x - this.currentX_) / 3,
                y: K.y + (H.y - this.currentY_) / 3
            };
            p(this, K, G, H)
        };
        l.arc = function(M, K, L, H, j, m) {
            L *= a;
            var Q = m ? "at" : "wa";
            var N = M + E(H) * L - o;
            var P = K + s(H) * L - o;
            var i = M + E(j) * L - o;
            var O = K + s(j) * L - o;
            if (N == i && !m) {
                N += 0.125
            }
            var G = this.getCoords_(M, K);
            var J = this.getCoords_(N, P);
            var I = this.getCoords_(i, O);
            this.currentPath_.push({
                type: Q,
                x: G.x,
                y: G.y,
                radius: L,
                xStart: J.x,
                yStart: J.y,
                xEnd: I.x,
                yEnd: I.y
            })
        };
        l.rect = function(m, j, i, G) {
            this.moveTo(m, j);
            this.lineTo(m + i, j);
            this.lineTo(m + i, j + G);
            this.lineTo(m, j + G);
            this.closePath()
        };
        l.strokeRect = function(m, j, i, G) {
            var H = this.currentPath_;
            this.beginPath();
            this.moveTo(m, j);
            this.lineTo(m + i, j);
            this.lineTo(m + i, j + G);
            this.lineTo(m, j + G);
            this.closePath();
            this.stroke();
            this.currentPath_ = H
        };
        l.fillRect = function(m, j, i, G) {
            var H = this.currentPath_;
            this.beginPath();
            this.moveTo(m, j);
            this.lineTo(m + i, j);
            this.lineTo(m + i, j + G);
            this.lineTo(m, j + G);
            this.closePath();
            this.fill();
            this.currentPath_ = H
        };
        l.createLinearGradient = function(j, G, i, m) {
            var H = new A("gradient");
            H.x0_ = j;
            H.y0_ = G;
            H.x1_ = i;
            H.y1_ = m;
            return H
        };
        l.createRadialGradient = function(G, I, m, j, H, i) {
            var J = new A("gradientradial");
            J.x0_ = G;
            J.y0_ = I;
            J.r0_ = m;
            J.x1_ = j;
            J.y1_ = H;
            J.r1_ = i;
            return J
        };
        l.drawImage = function(T, m) {
            var M, K, O, ab, R, P, V, ad;
            var N = T.runtimeStyle.width;
            var S = T.runtimeStyle.height;
            T.runtimeStyle.width = "auto";
            T.runtimeStyle.height = "auto";
            var L = T.width;
            var Z = T.height;
            T.runtimeStyle.width = N;
            T.runtimeStyle.height = S;
            if (arguments.length == 3) {
                M = arguments[1];
                K = arguments[2];
                R = P = 0;
                V = O = L;
                ad = ab = Z
            } else {
                if (arguments.length == 5) {
                    M = arguments[1];
                    K = arguments[2];
                    O = arguments[3];
                    ab = arguments[4];
                    R = P = 0;
                    V = L;
                    ad = Z
                } else {
                    if (arguments.length == 9) {
                        R = arguments[1];
                        P = arguments[2];
                        V = arguments[3];
                        ad = arguments[4];
                        M = arguments[5];
                        K = arguments[6];
                        O = arguments[7];
                        ab = arguments[8]
                    } else {
                        throw Error("Invalid number of arguments")
                    }
                }
            }
            var ac = this.getCoords_(M, K);
            var G = V / 2;
            var j = ad / 2;
            var aa = [];
            var i = 10;
            var J = 10;
            aa.push(" <g_vml_:group", ' coordsize="', a * i, ",", a * J, '"', ' coordorigin="0,0"', ' style="width:', i, "px;height:", J, "px;position:absolute;");
            if (this.m_[0][0] != 1 || this.m_[0][1]) {
                var I = [];
                I.push("M11=", this.m_[0][0], ",", "M12=", this.m_[1][0], ",", "M21=", this.m_[0][1], ",", "M22=", this.m_[1][1], ",", "Dx=", w(ac.x / a), ",", "Dy=", w(ac.y / a), "");
                var Y = ac;
                var X = this.getCoords_(M + O, K);
                var U = this.getCoords_(M, K + ab);
                var Q = this.getCoords_(M + O, K + ab);
                Y.x = v.max(Y.x, X.x, U.x, Q.x);
                Y.y = v.max(Y.y, X.y, U.y, Q.y);
                aa.push("padding:0 ", w(Y.x / a), "px ", w(Y.y / a), "px 0;filter:progid:DXImageTransform.Microsoft.Matrix(", I.join(""), ", sizingmethod='clip');")
            } else {
                aa.push("top:", w(ac.y / a), "px;left:", w(ac.x / a), "px;")
            }
            aa.push(' ">', '<g_vml_:image src="', T.src, '"', ' style="width:', a * O, "px;", " height:", a * ab, 'px;"', ' cropleft="', R / L, '"', ' croptop="', P / Z, '"', ' cropright="', (L - R - V) / L, '"', ' cropbottom="', (Z - P - ad) / Z, '"', " />", "</g_vml_:group>");
            this.element_.insertAdjacentHTML("BeforeEnd", aa.join(""))
        };
        l.stroke = function(ag) {
            var L = [];
            var M = false;
            var ar = c(ag ? this.fillStyle : this.strokeStyle);
            var ac = ar.color;
            var am = ar.alpha * this.globalAlpha;
            var I = 10;
            var O = 10;
            L.push("<g_vml_:shape", ' filled="', !!ag, '"', ' style="position:absolute;width:', I, "px;height:", O, 'px;"', ' coordorigin="0 0" coordsize="', a * I, " ", a * O, '"', ' stroked="', !ag, '"', ' path="');
            var N = false;
            var aq = {
                x: null,
                y: null
            };
            var Y = {
                x: null,
                y: null
            };
            for (var al = 0; al < this.currentPath_.length; al++) {
                var ak = this.currentPath_[al];
                var ap;
                switch (ak.type) {
                    case "moveTo":
                        ap = ak;
                        L.push(" m ", w(ak.x), ",", w(ak.y));
                        break;
                    case "lineTo":
                        L.push(" l ", w(ak.x), ",", w(ak.y));
                        break;
                    case "close":
                        L.push(" x ");
                        ak = null;
                        break;
                    case "bezierCurveTo":
                        L.push(" c ", w(ak.cp1x), ",", w(ak.cp1y), ",", w(ak.cp2x), ",", w(ak.cp2y), ",", w(ak.x), ",", w(ak.y));
                        break;
                    case "at":
                    case "wa":
                        L.push(" ", ak.type, " ", w(ak.x - this.arcScaleX_ * ak.radius), ",", w(ak.y - this.arcScaleY_ * ak.radius), " ", w(ak.x + this.arcScaleX_ * ak.radius), ",", w(ak.y + this.arcScaleY_ * ak.radius), " ", w(ak.xStart), ",", w(ak.yStart), " ", w(ak.xEnd), ",", w(ak.yEnd));
                        break
                }
                if (ak) {
                    if (aq.x == null || ak.x < aq.x) {
                        aq.x = ak.x
                    }
                    if (Y.x == null || ak.x > Y.x) {
                        Y.x = ak.x
                    }
                    if (aq.y == null || ak.y < aq.y) {
                        aq.y = ak.y
                    }
                    if (Y.y == null || ak.y > Y.y) {
                        Y.y = ak.y
                    }
                }
            }
            L.push(' ">');
            if (!ag) {
                var X = this.lineScale_ * this.lineWidth;
                if (X < 1) {
                    am *= X
                }
                L.push("<g_vml_:stroke", ' opacity="', am, '"', ' joinstyle="', this.lineJoin, '"', ' miterlimit="', this.miterLimit, '"', ' endcap="', t(this.lineCap), '"', ' weight="', X, 'px"', ' color="', ac, '" />')
            } else {
                if (typeof this.fillStyle == "object") {
                    var P = this.fillStyle;
                    var U = 0;
                    var aj = {
                        x: 0,
                        y: 0
                    };
                    var ad = 0;
                    var S = 1;
                    if (P.type_ == "gradient") {
                        var R = P.x0_ / this.arcScaleX_;
                        var m = P.y0_ / this.arcScaleY_;
                        var Q = P.x1_ / this.arcScaleX_;
                        var at = P.y1_ / this.arcScaleY_;
                        var ao = this.getCoords_(R, m);
                        var an = this.getCoords_(Q, at);
                        var K = an.x - ao.x;
                        var J = an.y - ao.y;
                        U = Math.atan2(K, J) * 180 / Math.PI;
                        if (U < 0) {
                            U += 360
                        }
                        if (U < 0.000001) {
                            U = 0
                        }
                    } else {
                        var ao = this.getCoords_(P.x0_, P.y0_);
                        var j = Y.x - aq.x;
                        var G = Y.y - aq.y;
                        aj = {
                            x: (ao.x - aq.x) / j,
                            y: (ao.y - aq.y) / G
                        };
                        j /= this.arcScaleX_ * a;
                        G /= this.arcScaleY_ * a;
                        var ai = v.max(j, G);
                        ad = 2 * P.r0_ / ai;
                        S = 2 * P.r1_ / ai - ad
                    }
                    var ab = P.colors_;
                    ab.sort(function(H, i) {
                        return H.offset - i.offset
                    });
                    var V = ab.length;
                    var aa = ab[0].color;
                    var Z = ab[V - 1].color;
                    var af = ab[0].alpha * this.globalAlpha;
                    var ae = ab[V - 1].alpha * this.globalAlpha;
                    var ah = [];
                    for (var al = 0; al < V; al++) {
                        var T = ab[al];
                        ah.push(T.offset * S + ad + " " + T.color)
                    }
                    L.push('<g_vml_:fill type="', P.type_, '"', ' method="none" focus="100%"', ' color="', aa, '"', ' color2="', Z, '"', ' colors="', ah.join(","), '"', ' opacity="', ae, '"', ' g_o_:opacity2="', af, '"', ' angle="', U, '"', ' focusposition="', aj.x, ",", aj.y, '" />')
                } else {
                    L.push('<g_vml_:fill color="', ac, '" opacity="', am, '" />')
                }
            }
            L.push("</g_vml_:shape>");
            this.element_.insertAdjacentHTML("beforeEnd", L.join(""))
        };
        l.fill = function() {
            this.stroke(true)
        };
        l.closePath = function() {
            this.currentPath_.push({
                type: "close"
            })
        };
        l.getCoords_ = function(G, j) {
            var i = this.m_;
            return {
                x: a * (G * i[0][0] + j * i[1][0] + i[2][0]) - o,
                y: a * (G * i[0][1] + j * i[1][1] + i[2][1]) - o
            }
        };
        l.save = function() {
            var i = {};
            x(this, i);
            this.aStack_.push(i);
            this.mStack_.push(this.m_);
            this.m_ = d(r(), this.m_)
        };
        l.restore = function() {
            x(this.aStack_.pop(), this);
            this.m_ = this.mStack_.pop()
        };

        function g(i) {
            for (var H = 0; H < 3; H++) {
                for (var G = 0; G < 2; G++) {
                    if (!isFinite(i[H][G]) || isNaN(i[H][G])) {
                        return false
                    }
                }
            }
            return true
        }

        function B(j, i, G) {
            if (!g(i)) {
                return
            }
            j.m_ = i;
            if (G) {
                var H = i[0][0] * i[1][1] - i[0][1] * i[1][0];
                j.lineScale_ = D(n(H))
            }
        }
        l.translate = function(m, j) {
            var i = [
                [1, 0, 0],
                [0, 1, 0],
                [m, j, 1]
            ];
            B(this, d(i, this.m_), false)
        };
        l.rotate = function(j) {
            var G = E(j);
            var m = s(j);
            var i = [
                [G, m, 0],
                [-m, G, 0],
                [0, 0, 1]
            ];
            B(this, d(i, this.m_), false)
        };
        l.scale = function(m, j) {
            this.arcScaleX_ *= m;
            this.arcScaleY_ *= j;
            var i = [
                [m, 0, 0],
                [0, j, 0],
                [0, 0, 1]
            ];
            B(this, d(i, this.m_), true)
        };
        l.transform = function(H, G, J, I, j, i) {
            var m = [
                [H, G, 0],
                [J, I, 0],
                [j, i, 1]
            ];
            B(this, d(m, this.m_), true)
        };
        l.setTransform = function(I, H, K, J, G, j) {
            var i = [
                [I, H, 0],
                [K, J, 0],
                [G, j, 1]
            ];
            B(this, i, true)
        };
        l.clip = function() {};
        l.arcTo = function() {};
        l.createPattern = function() {
            return new f
        };

        function A(i) {
            this.type_ = i;
            this.x0_ = 0;
            this.y0_ = 0;
            this.r0_ = 0;
            this.x1_ = 0;
            this.y1_ = 0;
            this.r1_ = 0;
            this.colors_ = []
        }
        A.prototype.addColorStop = function(j, i) {
            i = c(i);
            this.colors_.push({
                offset: j,
                color: i.color,
                alpha: i.alpha
            })
        };

        function f() {}
        G_vmlCanvasManager = k;
        CanvasRenderingContext2D = q;
        CanvasGradient = A;
        CanvasPattern = f
    })()
};
/*!
 * jQuery UI 1.8.15
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI
 */
(function(c, j) {
    function k(a, b) {
        var d = a.nodeName.toLowerCase();
        if ("area" === d) {
            b = a.parentNode;
            d = b.name;
            if (!a.href || !d || b.nodeName.toLowerCase() !== "map") return false;
            a = c("img[usemap=#" + d + "]")[0];
            return !!a && l(a)
        }
        return (/input|select|textarea|button|object/.test(d) ? !a.disabled : "a" == d ? a.href || b : b) && l(a)
    }

    function l(a) {
        return !c(a).parents().andSelf().filter(function() {
            return c.curCSS(this, "visibility") === "hidden" || c.expr.filters.hidden(this)
        }).length
    }
    c.ui = c.ui || {};
    if (!c.ui.version) {
        c.extend(c.ui, {
            version: "1.8.15",
            keyCode: {
                ALT: 18,
                BACKSPACE: 8,
                CAPS_LOCK: 20,
                COMMA: 188,
                COMMAND: 91,
                COMMAND_LEFT: 91,
                COMMAND_RIGHT: 93,
                CONTROL: 17,
                DELETE: 46,
                DOWN: 40,
                END: 35,
                ENTER: 13,
                ESCAPE: 27,
                HOME: 36,
                INSERT: 45,
                LEFT: 37,
                MENU: 93,
                NUMPAD_ADD: 107,
                NUMPAD_DECIMAL: 110,
                NUMPAD_DIVIDE: 111,
                NUMPAD_ENTER: 108,
                NUMPAD_MULTIPLY: 106,
                NUMPAD_SUBTRACT: 109,
                PAGE_DOWN: 34,
                PAGE_UP: 33,
                PERIOD: 190,
                RIGHT: 39,
                SHIFT: 16,
                SPACE: 32,
                TAB: 9,
                UP: 38,
                WINDOWS: 91
            }
        });
        c.fn.extend({
            propAttr: c.fn.prop || c.fn.attr,
            _focus: c.fn.focus,
            focus: function(a, b) {
                return typeof a === "number" ? this.each(function() {
                    var d =
                        this;
                    setTimeout(function() {
                        c(d).focus();
                        b && b.call(d)
                    }, a)
                }) : this._focus.apply(this, arguments)
            },
            scrollParent: function() {
                var a;
                a = c.browser.msie && /(static|relative)/.test(this.css("position")) || /absolute/.test(this.css("position")) ? this.parents().filter(function() {
                    return /(relative|absolute|fixed)/.test(c.curCSS(this, "position", 1)) && /(auto|scroll)/.test(c.curCSS(this, "overflow", 1) + c.curCSS(this, "overflow-y", 1) + c.curCSS(this, "overflow-x", 1))
                }).eq(0) : this.parents().filter(function() {
                    return /(auto|scroll)/.test(c.curCSS(this,
                        "overflow", 1) + c.curCSS(this, "overflow-y", 1) + c.curCSS(this, "overflow-x", 1))
                }).eq(0);
                return /fixed/.test(this.css("position")) || !a.length ? c(document) : a
            },
            zIndex: function(a) {
                if (a !== j) return this.css("zIndex", a);
                if (this.length) {
                    a = c(this[0]);
                    for (var b; a.length && a[0] !== document;) {
                        b = a.css("position");
                        if (b === "absolute" || b === "relative" || b === "fixed") {
                            b = parseInt(a.css("zIndex"), 10);
                            if (!isNaN(b) && b !== 0) return b
                        }
                        a = a.parent()
                    }
                }
                return 0
            },
            disableSelection: function() {
                return this.bind((c.support.selectstart ? "selectstart" :
                    "mousedown") + ".ui-disableSelection", function(a) {
                    a.preventDefault()
                })
            },
            enableSelection: function() {
                return this.unbind(".ui-disableSelection")
            }
        });
        c.each(["Width", "Height"], function(a, b) {
            function d(f, g, m, n) {
                c.each(e, function() {
                    g -= parseFloat(c.curCSS(f, "padding" + this, true)) || 0;
                    if (m) g -= parseFloat(c.curCSS(f, "border" + this + "Width", true)) || 0;
                    if (n) g -= parseFloat(c.curCSS(f, "margin" + this, true)) || 0
                });
                return g
            }
            var e = b === "Width" ? ["Left", "Right"] : ["Top", "Bottom"],
                h = b.toLowerCase(),
                i = {
                    innerWidth: c.fn.innerWidth,
                    innerHeight: c.fn.innerHeight,
                    outerWidth: c.fn.outerWidth,
                    outerHeight: c.fn.outerHeight
                };
            c.fn["inner" + b] = function(f) {
                if (f === j) return i["inner" + b].call(this);
                return this.each(function() {
                    c(this).css(h, d(this, f) + "px")
                })
            };
            c.fn["outer" + b] = function(f, g) {
                if (typeof f !== "number") return i["outer" + b].call(this, f);
                return this.each(function() {
                    c(this).css(h, d(this, f, true, g) + "px")
                })
            }
        });
        c.extend(c.expr[":"], {
            data: function(a, b, d) {
                return !!c.data(a, d[3])
            },
            focusable: function(a) {
                return k(a, !isNaN(c.attr(a, "tabindex")))
            },
            tabbable: function(a) {
                var b = c.attr(a,
                        "tabindex"),
                    d = isNaN(b);
                return (d || b >= 0) && k(a, !d)
            }
        });
        c(function() {
            var a = document.body,
                b = a.appendChild(b = document.createElement("div"));
            c.extend(b.style, {
                minHeight: "100px",
                height: "auto",
                padding: 0,
                borderWidth: 0
            });
            c.support.minHeight = b.offsetHeight === 100;
            c.support.selectstart = "onselectstart" in b;
            a.removeChild(b).style.display = "none"
        });
        c.extend(c.ui, {
            plugin: {
                add: function(a, b, d) {
                    a = c.ui[a].prototype;
                    for (var e in d) {
                        a.plugins[e] = a.plugins[e] || [];
                        a.plugins[e].push([b, d[e]])
                    }
                },
                call: function(a, b, d) {
                    if ((b = a.plugins[b]) &&
                        a.element[0].parentNode)
                        for (var e = 0; e < b.length; e++) a.options[b[e][0]] && b[e][1].apply(a.element, d)
                }
            },
            contains: function(a, b) {
                return document.compareDocumentPosition ? a.compareDocumentPosition(b) & 16 : a !== b && a.contains(b)
            },
            hasScroll: function(a, b) {
                if (c(a).css("overflow") === "hidden") return false;
                b = b && b === "left" ? "scrollLeft" : "scrollTop";
                var d = false;
                if (a[b] > 0) return true;
                a[b] = 1;
                d = a[b] > 0;
                a[b] = 0;
                return d
            },
            isOverAxis: function(a, b, d) {
                return a > b && a < b + d
            },
            isOver: function(a, b, d, e, h, i) {
                return c.ui.isOverAxis(a, d, h) &&
                    c.ui.isOverAxis(b, e, i)
            }
        })
    }
})(jQuery);;
/*!
 * jQuery UI Widget 1.8.15
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Widget
 */
(function(b, j) {
    if (b.cleanData) {
        var k = b.cleanData;
        b.cleanData = function(a) {
            for (var c = 0, d;
                (d = a[c]) != null; c++) b(d).triggerHandler("remove");
            k(a)
        }
    } else {
        var l = b.fn.remove;
        b.fn.remove = function(a, c) {
            return this.each(function() {
                if (!c)
                    if (!a || b.filter(a, [this]).length) b("*", this).add([this]).each(function() {
                        b(this).triggerHandler("remove")
                    });
                return l.call(b(this), a, c)
            })
        }
    }
    b.widget = function(a, c, d) {
        var e = a.split(".")[0],
            f;
        a = a.split(".")[1];
        f = e + "-" + a;
        if (!d) {
            d = c;
            c = b.Widget
        }
        b.expr[":"][f] = function(h) {
            return !!b.data(h,
                a)
        };
        b[e] = b[e] || {};
        b[e][a] = function(h, g) {
            arguments.length && this._createWidget(h, g)
        };
        c = new c;
        c.options = b.extend(true, {}, c.options);
        b[e][a].prototype = b.extend(true, c, {
            namespace: e,
            widgetName: a,
            widgetEventPrefix: b[e][a].prototype.widgetEventPrefix || a,
            widgetBaseClass: f
        }, d);
        b.widget.bridge(a, b[e][a])
    };
    b.widget.bridge = function(a, c) {
        b.fn[a] = function(d) {
            var e = typeof d === "string",
                f = Array.prototype.slice.call(arguments, 1),
                h = this;
            d = !e && f.length ? b.extend.apply(null, [true, d].concat(f)) : d;
            if (e && d.charAt(0) === "_") return h;
            e ? this.each(function() {
                var g = b.data(this, a),
                    i = g && b.isFunction(g[d]) ? g[d].apply(g, f) : g;
                if (i !== g && i !== j) {
                    h = i;
                    return false
                }
            }) : this.each(function() {
                var g = b.data(this, a);
                g ? g.option(d || {})._init() : b.data(this, a, new c(d, this))
            });
            return h
        }
    };
    b.Widget = function(a, c) {
        arguments.length && this._createWidget(a, c)
    };
    b.Widget.prototype = {
        widgetName: "widget",
        widgetEventPrefix: "",
        options: {
            disabled: false
        },
        _createWidget: function(a, c) {
            b.data(c, this.widgetName, this);
            this.element = b(c);
            this.options = b.extend(true, {}, this.options,
                this._getCreateOptions(), a);
            var d = this;
            this.element.bind("remove." + this.widgetName, function() {
                d.destroy()
            });
            this._create();
            this._trigger("create");
            this._init()
        },
        _getCreateOptions: function() {
            return b.metadata && b.metadata.get(this.element[0])[this.widgetName]
        },
        _create: function() {},
        _init: function() {},
        destroy: function() {
            this.element.unbind("." + this.widgetName).removeData(this.widgetName);
            this.widget().unbind("." + this.widgetName).removeAttr("aria-disabled").removeClass(this.widgetBaseClass + "-disabled ui-state-disabled")
        },
        widget: function() {
            return this.element
        },
        option: function(a, c) {
            var d = a;
            if (arguments.length === 0) return b.extend({}, this.options);
            if (typeof a === "string") {
                if (c === j) return this.options[a];
                d = {};
                d[a] = c
            }
            this._setOptions(d);
            return this
        },
        _setOptions: function(a) {
            var c = this;
            b.each(a, function(d, e) {
                c._setOption(d, e)
            });
            return this
        },
        _setOption: function(a, c) {
            this.options[a] = c;
            if (a === "disabled") this.widget()[c ? "addClass" : "removeClass"](this.widgetBaseClass + "-disabled ui-state-disabled").attr("aria-disabled", c);
            return this
        },
        enable: function() {
            return this._setOption("disabled", false)
        },
        disable: function() {
            return this._setOption("disabled", true)
        },
        _trigger: function(a, c, d) {
            var e = this.options[a];
            c = b.Event(c);
            c.type = (a === this.widgetEventPrefix ? a : this.widgetEventPrefix + a).toLowerCase();
            d = d || {};
            if (c.originalEvent) {
                a = b.event.props.length;
                for (var f; a;) {
                    f = b.event.props[--a];
                    c[f] = c.originalEvent[f]
                }
            }
            this.element.trigger(c, d);
            return !(b.isFunction(e) && e.call(this.element[0], c, d) === false || c.isDefaultPrevented())
        }
    }
})(jQuery);;
/*!
 * jQuery UI Mouse 1.8.15
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Mouse
 *
 * Depends:
 *	jquery.ui.widget.js
 */
(function(b) {
    b.widget("ui.mouse", {
        options: {
            cancel: ":input,option",
            distance: 1,
            delay: 0
        },
        _mouseInit: function() {
            var a = this;
            this.element.bind("mousedown." + this.widgetName, function(c) {
                return a._mouseDown(c)
            }).bind("click." + this.widgetName, function(c) {
                if (true === b.data(c.target, a.widgetName + ".preventClickEvent")) {
                    b.removeData(c.target, a.widgetName + ".preventClickEvent");
                    c.stopImmediatePropagation();
                    return false
                }
            });
            this.started = false
        },
        _mouseDestroy: function() {
            this.element.unbind("." + this.widgetName)
        },
        _mouseDown: function(a) {
            a.originalEvent =
                a.originalEvent || {};
            if (!a.originalEvent.mouseHandled) {
                this._mouseStarted && this._mouseUp(a);
                this._mouseDownEvent = a;
                var c = this,
                    e = a.which == 1,
                    f = typeof this.options.cancel == "string" ? b(a.target).closest(this.options.cancel).length : false;
                if (!e || f || !this._mouseCapture(a)) return true;
                this.mouseDelayMet = !this.options.delay;
                if (!this.mouseDelayMet) this._mouseDelayTimer = setTimeout(function() {
                    c.mouseDelayMet = true
                }, this.options.delay);
                if (this._mouseDistanceMet(a) && this._mouseDelayMet(a)) {
                    this._mouseStarted = this._mouseStart(a) !==
                        false;
                    if (!this._mouseStarted) {
                        a.preventDefault();
                        return true
                    }
                }
                true === b.data(a.target, this.widgetName + ".preventClickEvent") && b.removeData(a.target, this.widgetName + ".preventClickEvent");
                this._mouseMoveDelegate = function(d) {
                    return c._mouseMove(d)
                };
                this._mouseUpDelegate = function(d) {
                    return c._mouseUp(d)
                };
                b(document).bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate);
                a.preventDefault();
                return a.originalEvent.mouseHandled = true
            }
        },
        _mouseMove: function(a) {
            if (b.browser.msie &&
                !(document.documentMode >= 9) && !a.button) return this._mouseUp(a);
            if (this._mouseStarted) {
                this._mouseDrag(a);
                return a.preventDefault()
            }
            if (this._mouseDistanceMet(a) && this._mouseDelayMet(a))(this._mouseStarted = this._mouseStart(this._mouseDownEvent, a) !== false) ? this._mouseDrag(a) : this._mouseUp(a);
            return !this._mouseStarted
        },
        _mouseUp: function(a) {
            b(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate);
            if (this._mouseStarted) {
                this._mouseStarted =
                    false;
                a.target == this._mouseDownEvent.target && b.data(a.target, this.widgetName + ".preventClickEvent", true);
                this._mouseStop(a)
            }
            return false
        },
        _mouseDistanceMet: function(a) {
            return Math.max(Math.abs(this._mouseDownEvent.pageX - a.pageX), Math.abs(this._mouseDownEvent.pageY - a.pageY)) >= this.options.distance
        },
        _mouseDelayMet: function() {
            return this.mouseDelayMet
        },
        _mouseStart: function() {},
        _mouseDrag: function() {},
        _mouseStop: function() {},
        _mouseCapture: function() {
            return true
        }
    })
})(jQuery);;
/*
 * jQuery UI Position 1.8.15
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Position
 */
(function(c) {
    c.ui = c.ui || {};
    var n = /left|center|right/,
        o = /top|center|bottom/,
        t = c.fn.position,
        u = c.fn.offset;
    c.fn.position = function(b) {
        if (!b || !b.of) return t.apply(this, arguments);
        b = c.extend({}, b);
        var a = c(b.of),
            d = a[0],
            g = (b.collision || "flip").split(" "),
            e = b.offset ? b.offset.split(" ") : [0, 0],
            h, k, j;
        if (d.nodeType === 9) {
            h = a.width();
            k = a.height();
            j = {
                top: 0,
                left: 0
            }
        } else if (d.setTimeout) {
            h = a.width();
            k = a.height();
            j = {
                top: a.scrollTop(),
                left: a.scrollLeft()
            }
        } else if (d.preventDefault) {
            b.at = "left top";
            h = k = 0;
            j = {
                top: b.of.pageY,
                left: b.of.pageX
            }
        } else {
            h = a.outerWidth();
            k = a.outerHeight();
            j = a.offset()
        }
        c.each(["my", "at"], function() {
            var f = (b[this] || "").split(" ");
            if (f.length === 1) f = n.test(f[0]) ? f.concat(["center"]) : o.test(f[0]) ? ["center"].concat(f) : ["center", "center"];
            f[0] = n.test(f[0]) ? f[0] : "center";
            f[1] = o.test(f[1]) ? f[1] : "center";
            b[this] = f
        });
        if (g.length === 1) g[1] = g[0];
        e[0] = parseInt(e[0], 10) || 0;
        if (e.length === 1) e[1] = e[0];
        e[1] = parseInt(e[1], 10) || 0;
        if (b.at[0] === "right") j.left += h;
        else if (b.at[0] === "center") j.left += h / 2;
        if (b.at[1] === "bottom") j.top +=
            k;
        else if (b.at[1] === "center") j.top += k / 2;
        j.left += e[0];
        j.top += e[1];
        return this.each(function() {
            var f = c(this),
                l = f.outerWidth(),
                m = f.outerHeight(),
                p = parseInt(c.curCSS(this, "marginLeft", true)) || 0,
                q = parseInt(c.curCSS(this, "marginTop", true)) || 0,
                v = l + p + (parseInt(c.curCSS(this, "marginRight", true)) || 0),
                w = m + q + (parseInt(c.curCSS(this, "marginBottom", true)) || 0),
                i = c.extend({}, j),
                r;
            if (b.my[0] === "right") i.left -= l;
            else if (b.my[0] === "center") i.left -= l / 2;
            if (b.my[1] === "bottom") i.top -= m;
            else if (b.my[1] === "center") i.top -=
                m / 2;
            i.left = Math.round(i.left);
            i.top = Math.round(i.top);
            r = {
                left: i.left - p,
                top: i.top - q
            };
            c.each(["left", "top"], function(s, x) {
                c.ui.position[g[s]] && c.ui.position[g[s]][x](i, {
                    targetWidth: h,
                    targetHeight: k,
                    elemWidth: l,
                    elemHeight: m,
                    collisionPosition: r,
                    collisionWidth: v,
                    collisionHeight: w,
                    offset: e,
                    my: b.my,
                    at: b.at
                })
            });
            c.fn.bgiframe && f.bgiframe();
            f.offset(c.extend(i, {
                using: b.using
            }))
        })
    };
    c.ui.position = {
        fit: {
            left: function(b, a) {
                var d = c(window);
                d = a.collisionPosition.left + a.collisionWidth - d.width() - d.scrollLeft();
                b.left =
                    d > 0 ? b.left - d : Math.max(b.left - a.collisionPosition.left, b.left)
            },
            top: function(b, a) {
                var d = c(window);
                d = a.collisionPosition.top + a.collisionHeight - d.height() - d.scrollTop();
                b.top = d > 0 ? b.top - d : Math.max(b.top - a.collisionPosition.top, b.top)
            }
        },
        flip: {
            left: function(b, a) {
                if (a.at[0] !== "center") {
                    var d = c(window);
                    d = a.collisionPosition.left + a.collisionWidth - d.width() - d.scrollLeft();
                    var g = a.my[0] === "left" ? -a.elemWidth : a.my[0] === "right" ? a.elemWidth : 0,
                        e = a.at[0] === "left" ? a.targetWidth : -a.targetWidth,
                        h = -2 * a.offset[0];
                    b.left +=
                        a.collisionPosition.left < 0 ? g + e + h : d > 0 ? g + e + h : 0
                }
            },
            top: function(b, a) {
                if (a.at[1] !== "center") {
                    var d = c(window);
                    d = a.collisionPosition.top + a.collisionHeight - d.height() - d.scrollTop();
                    var g = a.my[1] === "top" ? -a.elemHeight : a.my[1] === "bottom" ? a.elemHeight : 0,
                        e = a.at[1] === "top" ? a.targetHeight : -a.targetHeight,
                        h = -2 * a.offset[1];
                    b.top += a.collisionPosition.top < 0 ? g + e + h : d > 0 ? g + e + h : 0
                }
            }
        }
    };
    if (!c.offset.setOffset) {
        c.offset.setOffset = function(b, a) {
            if (/static/.test(c.curCSS(b, "position"))) b.style.position = "relative";
            var d = c(b),
                g = d.offset(),
                e = parseInt(c.curCSS(b, "top", true), 10) || 0,
                h = parseInt(c.curCSS(b, "left", true), 10) || 0;
            g = {
                top: a.top - g.top + e,
                left: a.left - g.left + h
            };
            "using" in a ? a.using.call(b, g) : d.css(g)
        };
        c.fn.offset = function(b) {
            var a = this[0];
            if (!a || !a.ownerDocument) return null;
            if (b) return this.each(function() {
                c.offset.setOffset(this, b)
            });
            return u.call(this)
        }
    }
})(jQuery);;
/*
 * jQuery UI Draggable 1.8.15
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Draggables
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.mouse.js
 *	jquery.ui.widget.js
 */
(function(d) {
    d.widget("ui.draggable", d.ui.mouse, {
        widgetEventPrefix: "drag",
        options: {
            addClasses: true,
            appendTo: "parent",
            axis: false,
            connectToSortable: false,
            containment: false,
            cursor: "auto",
            cursorAt: false,
            grid: false,
            handle: false,
            helper: "original",
            iframeFix: false,
            opacity: false,
            refreshPositions: false,
            revert: false,
            revertDuration: 500,
            scope: "default",
            scroll: true,
            scrollSensitivity: 20,
            scrollSpeed: 20,
            snap: false,
            snapMode: "both",
            snapTolerance: 20,
            stack: false,
            zIndex: false
        },
        _create: function() {
            if (this.options.helper ==
                "original" && !/^(?:r|a|f)/.test(this.element.css("position"))) this.element[0].style.position = "relative";
            this.options.addClasses && this.element.addClass("ui-draggable");
            this.options.disabled && this.element.addClass("ui-draggable-disabled");
            this._mouseInit()
        },
        destroy: function() {
            if (this.element.data("draggable")) {
                this.element.removeData("draggable").unbind(".draggable").removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled");
                this._mouseDestroy();
                return this
            }
        },
        _mouseCapture: function(a) {
            var b =
                this.options;
            if (this.helper || b.disabled || d(a.target).is(".ui-resizable-handle")) return false;
            this.handle = this._getHandle(a);
            if (!this.handle) return false;
            d(b.iframeFix === true ? "iframe" : b.iframeFix).each(function() {
                d('<div class="ui-draggable-iframeFix" style="background: #fff;"></div>').css({
                    width: this.offsetWidth + "px",
                    height: this.offsetHeight + "px",
                    position: "absolute",
                    opacity: "0.001",
                    zIndex: 1E3
                }).css(d(this).offset()).appendTo("body")
            });
            return true
        },
        _mouseStart: function(a) {
            var b = this.options;
            this.helper =
                this._createHelper(a);
            this._cacheHelperProportions();
            if (d.ui.ddmanager) d.ui.ddmanager.current = this;
            this._cacheMargins();
            this.cssPosition = this.helper.css("position");
            this.scrollParent = this.helper.scrollParent();
            this.offset = this.positionAbs = this.element.offset();
            this.offset = {
                top: this.offset.top - this.margins.top,
                left: this.offset.left - this.margins.left
            };
            d.extend(this.offset, {
                click: {
                    left: a.pageX - this.offset.left,
                    top: a.pageY - this.offset.top
                },
                parent: this._getParentOffset(),
                relative: this._getRelativeOffset()
            });
            this.originalPosition = this.position = this._generatePosition(a);
            this.originalPageX = a.pageX;
            this.originalPageY = a.pageY;
            b.cursorAt && this._adjustOffsetFromHelper(b.cursorAt);
            b.containment && this._setContainment();
            if (this._trigger("start", a) === false) {
                this._clear();
                return false
            }
            this._cacheHelperProportions();
            d.ui.ddmanager && !b.dropBehaviour && d.ui.ddmanager.prepareOffsets(this, a);
            this.helper.addClass("ui-draggable-dragging");
            this._mouseDrag(a, true);
            d.ui.ddmanager && d.ui.ddmanager.dragStart(this, a);
            return true
        },
        _mouseDrag: function(a, b) {
            this.position = this._generatePosition(a);
            this.positionAbs = this._convertPositionTo("absolute");
            if (!b) {
                b = this._uiHash();
                if (this._trigger("drag", a, b) === false) {
                    this._mouseUp({});
                    return false
                }
                this.position = b.position
            }
            if (!this.options.axis || this.options.axis != "y") this.helper[0].style.left = this.position.left + "px";
            if (!this.options.axis || this.options.axis != "x") this.helper[0].style.top = this.position.top + "px";
            d.ui.ddmanager && d.ui.ddmanager.drag(this, a);
            return false
        },
        _mouseStop: function(a) {
            var b =
                false;
            if (d.ui.ddmanager && !this.options.dropBehaviour) b = d.ui.ddmanager.drop(this, a);
            if (this.dropped) {
                b = this.dropped;
                this.dropped = false
            }
            if ((!this.element[0] || !this.element[0].parentNode) && this.options.helper == "original") return false;
            if (this.options.revert == "invalid" && !b || this.options.revert == "valid" && b || this.options.revert === true || d.isFunction(this.options.revert) && this.options.revert.call(this.element, b)) {
                var c = this;
                d(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration,
                    10), function() {
                    c._trigger("stop", a) !== false && c._clear()
                })
            } else this._trigger("stop", a) !== false && this._clear();
            return false
        },
        _mouseUp: function(a) {
            this.options.iframeFix === true && d("div.ui-draggable-iframeFix").each(function() {
                this.parentNode.removeChild(this)
            });
            d.ui.ddmanager && d.ui.ddmanager.dragStop(this, a);
            return d.ui.mouse.prototype._mouseUp.call(this, a)
        },
        cancel: function() {
            this.helper.is(".ui-draggable-dragging") ? this._mouseUp({}) : this._clear();
            return this
        },
        _getHandle: function(a) {
            var b = !this.options.handle ||
                !d(this.options.handle, this.element).length ? true : false;
            d(this.options.handle, this.element).find("*").andSelf().each(function() {
                if (this == a.target) b = true
            });
            return b
        },
        _createHelper: function(a) {
            var b = this.options;
            a = d.isFunction(b.helper) ? d(b.helper.apply(this.element[0], [a])) : b.helper == "clone" ? this.element.clone().removeAttr("id") : this.element;
            a.parents("body").length || a.appendTo(b.appendTo == "parent" ? this.element[0].parentNode : b.appendTo);
            a[0] != this.element[0] && !/(fixed|absolute)/.test(a.css("position")) &&
                a.css("position", "absolute");
            return a
        },
        _adjustOffsetFromHelper: function(a) {
            if (typeof a == "string") a = a.split(" ");
            if (d.isArray(a)) a = {
                left: +a[0],
                top: +a[1] || 0
            };
            if ("left" in a) this.offset.click.left = a.left + this.margins.left;
            if ("right" in a) this.offset.click.left = this.helperProportions.width - a.right + this.margins.left;
            if ("top" in a) this.offset.click.top = a.top + this.margins.top;
            if ("bottom" in a) this.offset.click.top = this.helperProportions.height - a.bottom + this.margins.top
        },
        _getParentOffset: function() {
            this.offsetParent =
                this.helper.offsetParent();
            var a = this.offsetParent.offset();
            if (this.cssPosition == "absolute" && this.scrollParent[0] != document && d.ui.contains(this.scrollParent[0], this.offsetParent[0])) {
                a.left += this.scrollParent.scrollLeft();
                a.top += this.scrollParent.scrollTop()
            }
            if (this.offsetParent[0] == document.body || this.offsetParent[0].tagName && this.offsetParent[0].tagName.toLowerCase() == "html" && d.browser.msie) a = {
                top: 0,
                left: 0
            };
            return {
                top: a.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                left: a.left + (parseInt(this.offsetParent.css("borderLeftWidth"),
                    10) || 0)
            }
        },
        _getRelativeOffset: function() {
            if (this.cssPosition == "relative") {
                var a = this.element.position();
                return {
                    top: a.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
                    left: a.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
                }
            } else return {
                top: 0,
                left: 0
            }
        },
        _cacheMargins: function() {
            this.margins = {
                left: parseInt(this.element.css("marginLeft"), 10) || 0,
                top: parseInt(this.element.css("marginTop"), 10) || 0,
                right: parseInt(this.element.css("marginRight"), 10) || 0,
                bottom: parseInt(this.element.css("marginBottom"),
                    10) || 0
            }
        },
        _cacheHelperProportions: function() {
            this.helperProportions = {
                width: this.helper.outerWidth(),
                height: this.helper.outerHeight()
            }
        },
        _setContainment: function() {
            var a = this.options;
            if (a.containment == "parent") a.containment = this.helper[0].parentNode;
            if (a.containment == "document" || a.containment == "window") this.containment = [a.containment == "document" ? 0 : d(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left, a.containment == "document" ? 0 : d(window).scrollTop() - this.offset.relative.top - this.offset.parent.top,
                (a.containment == "document" ? 0 : d(window).scrollLeft()) + d(a.containment == "document" ? document : window).width() - this.helperProportions.width - this.margins.left, (a.containment == "document" ? 0 : d(window).scrollTop()) + (d(a.containment == "document" ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top
            ];
            if (!/^(document|window|parent)$/.test(a.containment) && a.containment.constructor != Array) {
                a = d(a.containment);
                var b = a[0];
                if (b) {
                    a.offset();
                    var c = d(b).css("overflow") !=
                        "hidden";
                    this.containment = [(parseInt(d(b).css("borderLeftWidth"), 10) || 0) + (parseInt(d(b).css("paddingLeft"), 10) || 0), (parseInt(d(b).css("borderTopWidth"), 10) || 0) + (parseInt(d(b).css("paddingTop"), 10) || 0), (c ? Math.max(b.scrollWidth, b.offsetWidth) : b.offsetWidth) - (parseInt(d(b).css("borderLeftWidth"), 10) || 0) - (parseInt(d(b).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right, (c ? Math.max(b.scrollHeight, b.offsetHeight) : b.offsetHeight) - (parseInt(d(b).css("borderTopWidth"),
                        10) || 0) - (parseInt(d(b).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top - this.margins.bottom];
                    this.relative_container = a
                }
            } else if (a.containment.constructor == Array) this.containment = a.containment
        },
        _convertPositionTo: function(a, b) {
            if (!b) b = this.position;
            a = a == "absolute" ? 1 : -1;
            var c = this.cssPosition == "absolute" && !(this.scrollParent[0] != document && d.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent,
                f = /(html|body)/i.test(c[0].tagName);
            return {
                top: b.top +
                    this.offset.relative.top * a + this.offset.parent.top * a - (d.browser.safari && d.browser.version < 526 && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : f ? 0 : c.scrollTop()) * a),
                left: b.left + this.offset.relative.left * a + this.offset.parent.left * a - (d.browser.safari && d.browser.version < 526 && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : f ? 0 : c.scrollLeft()) * a)
            }
        },
        _generatePosition: function(a) {
            var b = this.options,
                c = this.cssPosition == "absolute" &&
                !(this.scrollParent[0] != document && d.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent,
                f = /(html|body)/i.test(c[0].tagName),
                e = a.pageX,
                h = a.pageY;
            if (this.originalPosition) {
                var g;
                if (this.containment) {
                    if (this.relative_container) {
                        g = this.relative_container.offset();
                        g = [this.containment[0] + g.left, this.containment[1] + g.top, this.containment[2] + g.left, this.containment[3] + g.top]
                    } else g = this.containment;
                    if (a.pageX - this.offset.click.left < g[0]) e = g[0] + this.offset.click.left;
                    if (a.pageY - this.offset.click.top < g[1]) h = g[1] + this.offset.click.top;
                    if (a.pageX - this.offset.click.left > g[2]) e = g[2] + this.offset.click.left;
                    if (a.pageY - this.offset.click.top > g[3]) h = g[3] + this.offset.click.top
                }
                if (b.grid) {
                    h = b.grid[1] ? this.originalPageY + Math.round((h - this.originalPageY) / b.grid[1]) * b.grid[1] : this.originalPageY;
                    h = g ? !(h - this.offset.click.top < g[1] || h - this.offset.click.top > g[3]) ? h : !(h - this.offset.click.top < g[1]) ? h - b.grid[1] : h + b.grid[1] : h;
                    e = b.grid[0] ? this.originalPageX + Math.round((e - this.originalPageX) /
                        b.grid[0]) * b.grid[0] : this.originalPageX;
                    e = g ? !(e - this.offset.click.left < g[0] || e - this.offset.click.left > g[2]) ? e : !(e - this.offset.click.left < g[0]) ? e - b.grid[0] : e + b.grid[0] : e
                }
            }
            return {
                top: h - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + (d.browser.safari && d.browser.version < 526 && this.cssPosition == "fixed" ? 0 : this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : f ? 0 : c.scrollTop()),
                left: e - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + (d.browser.safari && d.browser.version <
                    526 && this.cssPosition == "fixed" ? 0 : this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : f ? 0 : c.scrollLeft())
            }
        },
        _clear: function() {
            this.helper.removeClass("ui-draggable-dragging");
            this.helper[0] != this.element[0] && !this.cancelHelperRemoval && this.helper.remove();
            this.helper = null;
            this.cancelHelperRemoval = false
        },
        _trigger: function(a, b, c) {
            c = c || this._uiHash();
            d.ui.plugin.call(this, a, [b, c]);
            if (a == "drag") this.positionAbs = this._convertPositionTo("absolute");
            return d.Widget.prototype._trigger.call(this, a, b,
                c)
        },
        plugins: {},
        _uiHash: function() {
            return {
                helper: this.helper,
                position: this.position,
                originalPosition: this.originalPosition,
                offset: this.positionAbs
            }
        }
    });
    d.extend(d.ui.draggable, {
        version: "1.8.15"
    });
    d.ui.plugin.add("draggable", "connectToSortable", {
        start: function(a, b) {
            var c = d(this).data("draggable"),
                f = c.options,
                e = d.extend({}, b, {
                    item: c.element
                });
            c.sortables = [];
            d(f.connectToSortable).each(function() {
                var h = d.data(this, "sortable");
                if (h && !h.options.disabled) {
                    c.sortables.push({
                        instance: h,
                        shouldRevert: h.options.revert
                    });
                    h.refreshPositions();
                    h._trigger("activate", a, e)
                }
            })
        },
        stop: function(a, b) {
            var c = d(this).data("draggable"),
                f = d.extend({}, b, {
                    item: c.element
                });
            d.each(c.sortables, function() {
                if (this.instance.isOver) {
                    this.instance.isOver = 0;
                    c.cancelHelperRemoval = true;
                    this.instance.cancelHelperRemoval = false;
                    if (this.shouldRevert) this.instance.options.revert = true;
                    this.instance._mouseStop(a);
                    this.instance.options.helper = this.instance.options._helper;
                    c.options.helper == "original" && this.instance.currentItem.css({
                        top: "auto",
                        left: "auto"
                    })
                } else {
                    this.instance.cancelHelperRemoval =
                        false;
                    this.instance._trigger("deactivate", a, f)
                }
            })
        },
        drag: function(a, b) {
            var c = d(this).data("draggable"),
                f = this;
            d.each(c.sortables, function() {
                this.instance.positionAbs = c.positionAbs;
                this.instance.helperProportions = c.helperProportions;
                this.instance.offset.click = c.offset.click;
                if (this.instance._intersectsWith(this.instance.containerCache)) {
                    if (!this.instance.isOver) {
                        this.instance.isOver = 1;
                        this.instance.currentItem = d(f).clone().removeAttr("id").appendTo(this.instance.element).data("sortable-item", true);
                        this.instance.options._helper = this.instance.options.helper;
                        this.instance.options.helper = function() {
                            return b.helper[0]
                        };
                        a.target = this.instance.currentItem[0];
                        this.instance._mouseCapture(a, true);
                        this.instance._mouseStart(a, true, true);
                        this.instance.offset.click.top = c.offset.click.top;
                        this.instance.offset.click.left = c.offset.click.left;
                        this.instance.offset.parent.left -= c.offset.parent.left - this.instance.offset.parent.left;
                        this.instance.offset.parent.top -= c.offset.parent.top - this.instance.offset.parent.top;
                        c._trigger("toSortable", a);
                        c.dropped = this.instance.element;
                        c.currentItem = c.element;
                        this.instance.fromOutside = c
                    }
                    this.instance.currentItem && this.instance._mouseDrag(a)
                } else if (this.instance.isOver) {
                    this.instance.isOver = 0;
                    this.instance.cancelHelperRemoval = true;
                    this.instance.options.revert = false;
                    this.instance._trigger("out", a, this.instance._uiHash(this.instance));
                    this.instance._mouseStop(a, true);
                    this.instance.options.helper = this.instance.options._helper;
                    this.instance.currentItem.remove();
                    this.instance.placeholder &&
                        this.instance.placeholder.remove();
                    c._trigger("fromSortable", a);
                    c.dropped = false
                }
            })
        }
    });
    d.ui.plugin.add("draggable", "cursor", {
        start: function() {
            var a = d("body"),
                b = d(this).data("draggable").options;
            if (a.css("cursor")) b._cursor = a.css("cursor");
            a.css("cursor", b.cursor)
        },
        stop: function() {
            var a = d(this).data("draggable").options;
            a._cursor && d("body").css("cursor", a._cursor)
        }
    });
    d.ui.plugin.add("draggable", "opacity", {
        start: function(a, b) {
            a = d(b.helper);
            b = d(this).data("draggable").options;
            if (a.css("opacity")) b._opacity =
                a.css("opacity");
            a.css("opacity", b.opacity)
        },
        stop: function(a, b) {
            a = d(this).data("draggable").options;
            a._opacity && d(b.helper).css("opacity", a._opacity)
        }
    });
    d.ui.plugin.add("draggable", "scroll", {
        start: function() {
            var a = d(this).data("draggable");
            if (a.scrollParent[0] != document && a.scrollParent[0].tagName != "HTML") a.overflowOffset = a.scrollParent.offset()
        },
        drag: function(a) {
            var b = d(this).data("draggable"),
                c = b.options,
                f = false;
            if (b.scrollParent[0] != document && b.scrollParent[0].tagName != "HTML") {
                if (!c.axis || c.axis !=
                    "x")
                    if (b.overflowOffset.top + b.scrollParent[0].offsetHeight - a.pageY < c.scrollSensitivity) b.scrollParent[0].scrollTop = f = b.scrollParent[0].scrollTop + c.scrollSpeed;
                    else if (a.pageY - b.overflowOffset.top < c.scrollSensitivity) b.scrollParent[0].scrollTop = f = b.scrollParent[0].scrollTop - c.scrollSpeed;
                if (!c.axis || c.axis != "y")
                    if (b.overflowOffset.left + b.scrollParent[0].offsetWidth - a.pageX < c.scrollSensitivity) b.scrollParent[0].scrollLeft = f = b.scrollParent[0].scrollLeft + c.scrollSpeed;
                    else if (a.pageX - b.overflowOffset.left <
                    c.scrollSensitivity) b.scrollParent[0].scrollLeft = f = b.scrollParent[0].scrollLeft - c.scrollSpeed
            } else {
                if (!c.axis || c.axis != "x")
                    if (a.pageY - d(document).scrollTop() < c.scrollSensitivity) f = d(document).scrollTop(d(document).scrollTop() - c.scrollSpeed);
                    else if (d(window).height() - (a.pageY - d(document).scrollTop()) < c.scrollSensitivity) f = d(document).scrollTop(d(document).scrollTop() + c.scrollSpeed);
                if (!c.axis || c.axis != "y")
                    if (a.pageX - d(document).scrollLeft() < c.scrollSensitivity) f = d(document).scrollLeft(d(document).scrollLeft() -
                        c.scrollSpeed);
                    else if (d(window).width() - (a.pageX - d(document).scrollLeft()) < c.scrollSensitivity) f = d(document).scrollLeft(d(document).scrollLeft() + c.scrollSpeed)
            }
            f !== false && d.ui.ddmanager && !c.dropBehaviour && d.ui.ddmanager.prepareOffsets(b, a)
        }
    });
    d.ui.plugin.add("draggable", "snap", {
        start: function() {
            var a = d(this).data("draggable"),
                b = a.options;
            a.snapElements = [];
            d(b.snap.constructor != String ? b.snap.items || ":data(draggable)" : b.snap).each(function() {
                var c = d(this),
                    f = c.offset();
                this != a.element[0] && a.snapElements.push({
                    item: this,
                    width: c.outerWidth(),
                    height: c.outerHeight(),
                    top: f.top,
                    left: f.left
                })
            })
        },
        drag: function(a, b) {
            for (var c = d(this).data("draggable"), f = c.options, e = f.snapTolerance, h = b.offset.left, g = h + c.helperProportions.width, n = b.offset.top, o = n + c.helperProportions.height, i = c.snapElements.length - 1; i >= 0; i--) {
                var j = c.snapElements[i].left,
                    l = j + c.snapElements[i].width,
                    k = c.snapElements[i].top,
                    m = k + c.snapElements[i].height;
                if (j - e < h && h < l + e && k - e < n && n < m + e || j - e < h && h < l + e && k - e < o && o < m + e || j - e < g && g < l + e && k - e < n && n < m + e || j - e < g && g < l + e && k - e < o &&
                    o < m + e) {
                    if (f.snapMode != "inner") {
                        var p = Math.abs(k - o) <= e,
                            q = Math.abs(m - n) <= e,
                            r = Math.abs(j - g) <= e,
                            s = Math.abs(l - h) <= e;
                        if (p) b.position.top = c._convertPositionTo("relative", {
                            top: k - c.helperProportions.height,
                            left: 0
                        }).top - c.margins.top;
                        if (q) b.position.top = c._convertPositionTo("relative", {
                            top: m,
                            left: 0
                        }).top - c.margins.top;
                        if (r) b.position.left = c._convertPositionTo("relative", {
                            top: 0,
                            left: j - c.helperProportions.width
                        }).left - c.margins.left;
                        if (s) b.position.left = c._convertPositionTo("relative", {
                            top: 0,
                            left: l
                        }).left - c.margins.left
                    }
                    var t =
                        p || q || r || s;
                    if (f.snapMode != "outer") {
                        p = Math.abs(k - n) <= e;
                        q = Math.abs(m - o) <= e;
                        r = Math.abs(j - h) <= e;
                        s = Math.abs(l - g) <= e;
                        if (p) b.position.top = c._convertPositionTo("relative", {
                            top: k,
                            left: 0
                        }).top - c.margins.top;
                        if (q) b.position.top = c._convertPositionTo("relative", {
                            top: m - c.helperProportions.height,
                            left: 0
                        }).top - c.margins.top;
                        if (r) b.position.left = c._convertPositionTo("relative", {
                            top: 0,
                            left: j
                        }).left - c.margins.left;
                        if (s) b.position.left = c._convertPositionTo("relative", {
                            top: 0,
                            left: l - c.helperProportions.width
                        }).left - c.margins.left
                    }
                    if (!c.snapElements[i].snapping &&
                        (p || q || r || s || t)) c.options.snap.snap && c.options.snap.snap.call(c.element, a, d.extend(c._uiHash(), {
                        snapItem: c.snapElements[i].item
                    }));
                    c.snapElements[i].snapping = p || q || r || s || t
                } else {
                    c.snapElements[i].snapping && c.options.snap.release && c.options.snap.release.call(c.element, a, d.extend(c._uiHash(), {
                        snapItem: c.snapElements[i].item
                    }));
                    c.snapElements[i].snapping = false
                }
            }
        }
    });
    d.ui.plugin.add("draggable", "stack", {
        start: function() {
            var a = d(this).data("draggable").options;
            a = d.makeArray(d(a.stack)).sort(function(c, f) {
                return (parseInt(d(c).css("zIndex"),
                    10) || 0) - (parseInt(d(f).css("zIndex"), 10) || 0)
            });
            if (a.length) {
                var b = parseInt(a[0].style.zIndex) || 0;
                d(a).each(function(c) {
                    this.style.zIndex = b + c
                });
                this[0].style.zIndex = b + a.length
            }
        }
    });
    d.ui.plugin.add("draggable", "zIndex", {
        start: function(a, b) {
            a = d(b.helper);
            b = d(this).data("draggable").options;
            if (a.css("zIndex")) b._zIndex = a.css("zIndex");
            a.css("zIndex", b.zIndex)
        },
        stop: function(a, b) {
            a = d(this).data("draggable").options;
            a._zIndex && d(b.helper).css("zIndex", a._zIndex)
        }
    })
})(jQuery);;
/*
 * jQuery UI Droppable 1.8.15
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Droppables
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 *	jquery.ui.mouse.js
 *	jquery.ui.draggable.js
 */
(function(d) {
    d.widget("ui.droppable", {
        widgetEventPrefix: "drop",
        options: {
            accept: "*",
            activeClass: false,
            addClasses: true,
            greedy: false,
            hoverClass: false,
            scope: "default",
            tolerance: "intersect"
        },
        _create: function() {
            var a = this.options,
                b = a.accept;
            this.isover = 0;
            this.isout = 1;
            this.accept = d.isFunction(b) ? b : function(c) {
                return c.is(b)
            };
            this.proportions = {
                width: this.element[0].offsetWidth,
                height: this.element[0].offsetHeight
            };
            d.ui.ddmanager.droppables[a.scope] = d.ui.ddmanager.droppables[a.scope] || [];
            d.ui.ddmanager.droppables[a.scope].push(this);
            a.addClasses && this.element.addClass("ui-droppable")
        },
        destroy: function() {
            for (var a = d.ui.ddmanager.droppables[this.options.scope], b = 0; b < a.length; b++) a[b] == this && a.splice(b, 1);
            this.element.removeClass("ui-droppable ui-droppable-disabled").removeData("droppable").unbind(".droppable");
            return this
        },
        _setOption: function(a, b) {
            if (a == "accept") this.accept = d.isFunction(b) ? b : function(c) {
                return c.is(b)
            };
            d.Widget.prototype._setOption.apply(this, arguments)
        },
        _activate: function(a) {
            var b = d.ui.ddmanager.current;
            this.options.activeClass &&
                this.element.addClass(this.options.activeClass);
            b && this._trigger("activate", a, this.ui(b))
        },
        _deactivate: function(a) {
            var b = d.ui.ddmanager.current;
            this.options.activeClass && this.element.removeClass(this.options.activeClass);
            b && this._trigger("deactivate", a, this.ui(b))
        },
        _over: function(a) {
            var b = d.ui.ddmanager.current;
            if (!(!b || (b.currentItem || b.element)[0] == this.element[0]))
                if (this.accept.call(this.element[0], b.currentItem || b.element)) {
                    this.options.hoverClass && this.element.addClass(this.options.hoverClass);
                    this._trigger("over", a, this.ui(b))
                }
        },
        _out: function(a) {
            var b = d.ui.ddmanager.current;
            if (!(!b || (b.currentItem || b.element)[0] == this.element[0]))
                if (this.accept.call(this.element[0], b.currentItem || b.element)) {
                    this.options.hoverClass && this.element.removeClass(this.options.hoverClass);
                    this._trigger("out", a, this.ui(b))
                }
        },
        _drop: function(a, b) {
            var c = b || d.ui.ddmanager.current;
            if (!c || (c.currentItem || c.element)[0] == this.element[0]) return false;
            var e = false;
            this.element.find(":data(droppable)").not(".ui-draggable-dragging").each(function() {
                var g =
                    d.data(this, "droppable");
                if (g.options.greedy && !g.options.disabled && g.options.scope == c.options.scope && g.accept.call(g.element[0], c.currentItem || c.element) && d.ui.intersect(c, d.extend(g, {
                        offset: g.element.offset()
                    }), g.options.tolerance)) {
                    e = true;
                    return false
                }
            });
            if (e) return false;
            if (this.accept.call(this.element[0], c.currentItem || c.element)) {
                this.options.activeClass && this.element.removeClass(this.options.activeClass);
                this.options.hoverClass && this.element.removeClass(this.options.hoverClass);
                this._trigger("drop",
                    a, this.ui(c));
                return this.element
            }
            return false
        },
        ui: function(a) {
            return {
                draggable: a.currentItem || a.element,
                helper: a.helper,
                position: a.position,
                offset: a.positionAbs
            }
        }
    });
    d.extend(d.ui.droppable, {
        version: "1.8.15"
    });
    d.ui.intersect = function(a, b, c) {
        if (!b.offset) return false;
        var e = (a.positionAbs || a.position.absolute).left,
            g = e + a.helperProportions.width,
            f = (a.positionAbs || a.position.absolute).top,
            h = f + a.helperProportions.height,
            i = b.offset.left,
            k = i + b.proportions.width,
            j = b.offset.top,
            l = j + b.proportions.height;
        switch (c) {
            case "fit":
                return i <= e && g <= k && j <= f && h <= l;
            case "intersect":
                return i < e + a.helperProportions.width / 2 && g - a.helperProportions.width / 2 < k && j < f + a.helperProportions.height / 2 && h - a.helperProportions.height / 2 < l;
            case "pointer":
                return d.ui.isOver((a.positionAbs || a.position.absolute).top + (a.clickOffset || a.offset.click).top, (a.positionAbs || a.position.absolute).left + (a.clickOffset || a.offset.click).left, j, i, b.proportions.height, b.proportions.width);
            case "touch":
                return (f >= j && f <= l || h >= j && h <= l || f < j && h > l) && (e >=
                    i && e <= k || g >= i && g <= k || e < i && g > k);
            default:
                return false
        }
    };
    d.ui.ddmanager = {
        current: null,
        droppables: {
            "default": []
        },
        prepareOffsets: function(a, b) {
            var c = d.ui.ddmanager.droppables[a.options.scope] || [],
                e = b ? b.type : null,
                g = (a.currentItem || a.element).find(":data(droppable)").andSelf(),
                f = 0;
            a: for (; f < c.length; f++)
                if (!(c[f].options.disabled || a && !c[f].accept.call(c[f].element[0], a.currentItem || a.element))) {
                    for (var h = 0; h < g.length; h++)
                        if (g[h] == c[f].element[0]) {
                            c[f].proportions.height = 0;
                            continue a
                        }
                    c[f].visible = c[f].element.css("display") !=
                        "none";
                    if (c[f].visible) {
                        e == "mousedown" && c[f]._activate.call(c[f], b);
                        c[f].offset = c[f].element.offset();
                        c[f].proportions = {
                            width: c[f].element[0].offsetWidth,
                            height: c[f].element[0].offsetHeight
                        }
                    }
                }
        },
        drop: function(a, b) {
            var c = false;
            d.each(d.ui.ddmanager.droppables[a.options.scope] || [], function() {
                if (this.options) {
                    if (!this.options.disabled && this.visible && d.ui.intersect(a, this, this.options.tolerance)) c = c || this._drop.call(this, b);
                    if (!this.options.disabled && this.visible && this.accept.call(this.element[0], a.currentItem ||
                            a.element)) {
                        this.isout = 1;
                        this.isover = 0;
                        this._deactivate.call(this, b)
                    }
                }
            });
            return c
        },
        dragStart: function(a, b) {
            a.element.parentsUntil("body").bind("scroll.droppable", function() {
                a.options.refreshPositions || d.ui.ddmanager.prepareOffsets(a, b)
            })
        },
        drag: function(a, b) {
            a.options.refreshPositions && d.ui.ddmanager.prepareOffsets(a, b);
            d.each(d.ui.ddmanager.droppables[a.options.scope] || [], function() {
                if (!(this.options.disabled || this.greedyChild || !this.visible)) {
                    var c = d.ui.intersect(a, this, this.options.tolerance);
                    if (c = !c && this.isover == 1 ? "isout" : c && this.isover == 0 ? "isover" : null) {
                        var e;
                        if (this.options.greedy) {
                            var g = this.element.parents(":data(droppable):eq(0)");
                            if (g.length) {
                                e = d.data(g[0], "droppable");
                                e.greedyChild = c == "isover" ? 1 : 0
                            }
                        }
                        if (e && c == "isover") {
                            e.isover = 0;
                            e.isout = 1;
                            e._out.call(e, b)
                        }
                        this[c] = 1;
                        this[c == "isout" ? "isover" : "isout"] = 0;
                        this[c == "isover" ? "_over" : "_out"].call(this, b);
                        if (e && c == "isout") {
                            e.isout = 0;
                            e.isover = 1;
                            e._over.call(e, b)
                        }
                    }
                }
            })
        },
        dragStop: function(a, b) {
            a.element.parentsUntil("body").unbind("scroll.droppable");
            a.options.refreshPositions || d.ui.ddmanager.prepareOffsets(a, b)
        }
    }
})(jQuery);;
/*
 * jQuery UI Resizable 1.8.15
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Resizables
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.mouse.js
 *	jquery.ui.widget.js
 */
(function(e) {
    e.widget("ui.resizable", e.ui.mouse, {
        widgetEventPrefix: "resize",
        options: {
            alsoResize: false,
            animate: false,
            animateDuration: "slow",
            animateEasing: "swing",
            aspectRatio: false,
            autoHide: false,
            containment: false,
            ghost: false,
            grid: false,
            handles: "e,s,se",
            helper: false,
            maxHeight: null,
            maxWidth: null,
            minHeight: 10,
            minWidth: 10,
            zIndex: 1E3
        },
        _create: function() {
            var b = this,
                a = this.options;
            this.element.addClass("ui-resizable");
            e.extend(this, {
                _aspectRatio: !!a.aspectRatio,
                aspectRatio: a.aspectRatio,
                originalElement: this.element,
                _proportionallyResizeElements: [],
                _helper: a.helper || a.ghost || a.animate ? a.helper || "ui-resizable-helper" : null
            });
            if (this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i)) {
                /relative/.test(this.element.css("position")) && e.browser.opera && this.element.css({
                    position: "relative",
                    top: "auto",
                    left: "auto"
                });
                this.element.wrap(e('<div class="ui-wrapper" style="overflow: hidden;"></div>').css({
                    position: this.element.css("position"),
                    width: this.element.outerWidth(),
                    height: this.element.outerHeight(),
                    top: this.element.css("top"),
                    left: this.element.css("left")
                }));
                this.element = this.element.parent().data("resizable", this.element.data("resizable"));
                this.elementIsWrapper = true;
                this.element.css({
                    marginLeft: this.originalElement.css("marginLeft"),
                    marginTop: this.originalElement.css("marginTop"),
                    marginRight: this.originalElement.css("marginRight"),
                    marginBottom: this.originalElement.css("marginBottom")
                });
                this.originalElement.css({
                    marginLeft: 0,
                    marginTop: 0,
                    marginRight: 0,
                    marginBottom: 0
                });
                this.originalResizeStyle =
                    this.originalElement.css("resize");
                this.originalElement.css("resize", "none");
                this._proportionallyResizeElements.push(this.originalElement.css({
                    position: "static",
                    zoom: 1,
                    display: "block"
                }));
                this.originalElement.css({
                    margin: this.originalElement.css("margin")
                });
                this._proportionallyResize()
            }
            this.handles = a.handles || (!e(".ui-resizable-handle", this.element).length ? "e,s,se" : {
                n: ".ui-resizable-n",
                e: ".ui-resizable-e",
                s: ".ui-resizable-s",
                w: ".ui-resizable-w",
                se: ".ui-resizable-se",
                sw: ".ui-resizable-sw",
                ne: ".ui-resizable-ne",
                nw: ".ui-resizable-nw"
            });
            if (this.handles.constructor == String) {
                if (this.handles == "all") this.handles = "n,e,s,w,se,sw,ne,nw";
                var c = this.handles.split(",");
                this.handles = {};
                for (var d = 0; d < c.length; d++) {
                    var f = e.trim(c[d]),
                        g = e('<div class="ui-resizable-handle ' + ("ui-resizable-" + f) + '"></div>');
                    /sw|se|ne|nw/.test(f) && g.css({
                        zIndex: ++a.zIndex
                    });
                    "se" == f && g.addClass("ui-icon ui-icon-gripsmall-diagonal-se");
                    this.handles[f] = ".ui-resizable-" + f;
                    this.element.append(g)
                }
            }
            this._renderAxis = function(h) {
                h = h || this.element;
                for (var i in this.handles) {
                    if (this.handles[i].constructor ==
                        String) this.handles[i] = e(this.handles[i], this.element).show();
                    if (this.elementIsWrapper && this.originalElement[0].nodeName.match(/textarea|input|select|button/i)) {
                        var j = e(this.handles[i], this.element),
                            l = 0;
                        l = /sw|ne|nw|se|n|s/.test(i) ? j.outerHeight() : j.outerWidth();
                        j = ["padding", /ne|nw|n/.test(i) ? "Top" : /se|sw|s/.test(i) ? "Bottom" : /^e$/.test(i) ? "Right" : "Left"].join("");
                        h.css(j, l);
                        this._proportionallyResize()
                    }
                    e(this.handles[i])
                }
            };
            this._renderAxis(this.element);
            this._handles = e(".ui-resizable-handle", this.element).disableSelection();
            this._handles.mouseover(function() {
                if (!b.resizing) {
                    if (this.className) var h = this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i);
                    b.axis = h && h[1] ? h[1] : "se"
                }
            });
            if (a.autoHide) {
                this._handles.hide();
                e(this.element).addClass("ui-resizable-autohide").hover(function() {
                    if (!a.disabled) {
                        e(this).removeClass("ui-resizable-autohide");
                        b._handles.show()
                    }
                }, function() {
                    if (!a.disabled)
                        if (!b.resizing) {
                            e(this).addClass("ui-resizable-autohide");
                            b._handles.hide()
                        }
                })
            }
            this._mouseInit()
        },
        destroy: function() {
            this._mouseDestroy();
            var b = function(c) {
                e(c).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").unbind(".resizable").find(".ui-resizable-handle").remove()
            };
            if (this.elementIsWrapper) {
                b(this.element);
                var a = this.element;
                a.after(this.originalElement.css({
                    position: a.css("position"),
                    width: a.outerWidth(),
                    height: a.outerHeight(),
                    top: a.css("top"),
                    left: a.css("left")
                })).remove()
            }
            this.originalElement.css("resize", this.originalResizeStyle);
            b(this.originalElement);
            return this
        },
        _mouseCapture: function(b) {
            var a =
                false;
            for (var c in this.handles)
                if (e(this.handles[c])[0] == b.target) a = true;
            return !this.options.disabled && a
        },
        _mouseStart: function(b) {
            var a = this.options,
                c = this.element.position(),
                d = this.element;
            this.resizing = true;
            this.documentScroll = {
                top: e(document).scrollTop(),
                left: e(document).scrollLeft()
            };
            if (d.is(".ui-draggable") || /absolute/.test(d.css("position"))) d.css({
                position: "absolute",
                top: c.top,
                left: c.left
            });
            e.browser.opera && /relative/.test(d.css("position")) && d.css({
                position: "relative",
                top: "auto",
                left: "auto"
            });
            this._renderProxy();
            c = m(this.helper.css("left"));
            var f = m(this.helper.css("top"));
            if (a.containment) {
                c += e(a.containment).scrollLeft() || 0;
                f += e(a.containment).scrollTop() || 0
            }
            this.offset = this.helper.offset();
            this.position = {
                left: c,
                top: f
            };
            this.size = this._helper ? {
                width: d.outerWidth(),
                height: d.outerHeight()
            } : {
                width: d.width(),
                height: d.height()
            };
            this.originalSize = this._helper ? {
                width: d.outerWidth(),
                height: d.outerHeight()
            } : {
                width: d.width(),
                height: d.height()
            };
            this.originalPosition = {
                left: c,
                top: f
            };
            this.sizeDiff = {
                width: d.outerWidth() - d.width(),
                height: d.outerHeight() - d.height()
            };
            this.originalMousePosition = {
                left: b.pageX,
                top: b.pageY
            };
            this.aspectRatio = typeof a.aspectRatio == "number" ? a.aspectRatio : this.originalSize.width / this.originalSize.height || 1;
            a = e(".ui-resizable-" + this.axis).css("cursor");
            e("body").css("cursor", a == "auto" ? this.axis + "-resize" : a);
            d.addClass("ui-resizable-resizing");
            this._propagate("start", b);
            return true
        },
        _mouseDrag: function(b) {
            var a = this.helper,
                c = this.originalMousePosition,
                d = this._change[this.axis];
            if (!d) return false;
            c = d.apply(this, [b, b.pageX - c.left || 0, b.pageY - c.top || 0]);
            this._updateVirtualBoundaries(b.shiftKey);
            if (this._aspectRatio || b.shiftKey) c = this._updateRatio(c, b);
            c = this._respectSize(c, b);
            this._propagate("resize", b);
            a.css({
                top: this.position.top + "px",
                left: this.position.left + "px",
                width: this.size.width + "px",
                height: this.size.height + "px"
            });
            !this._helper && this._proportionallyResizeElements.length && this._proportionallyResize();
            this._updateCache(c);
            this._trigger("resize", b, this.ui());
            return false
        },
        _mouseStop: function(b) {
            this.resizing = false;
            var a = this.options,
                c = this;
            if (this._helper) {
                var d = this._proportionallyResizeElements,
                    f = d.length && /textarea/i.test(d[0].nodeName);
                d = f && e.ui.hasScroll(d[0], "left") ? 0 : c.sizeDiff.height;
                f = f ? 0 : c.sizeDiff.width;
                f = {
                    width: c.helper.width() - f,
                    height: c.helper.height() - d
                };
                d = parseInt(c.element.css("left"), 10) + (c.position.left - c.originalPosition.left) || null;
                var g = parseInt(c.element.css("top"), 10) + (c.position.top - c.originalPosition.top) || null;
                a.animate || this.element.css(e.extend(f, {
                    top: g,
                    left: d
                }));
                c.helper.height(c.size.height);
                c.helper.width(c.size.width);
                this._helper && !a.animate && this._proportionallyResize()
            }
            e("body").css("cursor", "auto");
            this.element.removeClass("ui-resizable-resizing");
            this._propagate("stop", b);
            this._helper && this.helper.remove();
            return false
        },
        _updateVirtualBoundaries: function(b) {
            var a = this.options,
                c, d, f;
            a = {
                minWidth: k(a.minWidth) ? a.minWidth : 0,
                maxWidth: k(a.maxWidth) ? a.maxWidth : Infinity,
                minHeight: k(a.minHeight) ? a.minHeight : 0,
                maxHeight: k(a.maxHeight) ? a.maxHeight : Infinity
            };
            if (this._aspectRatio || b) {
                b = a.minHeight * this.aspectRatio;
                d = a.minWidth / this.aspectRatio;
                c = a.maxHeight * this.aspectRatio;
                f = a.maxWidth / this.aspectRatio;
                if (b > a.minWidth) a.minWidth = b;
                if (d > a.minHeight) a.minHeight = d;
                if (c < a.maxWidth) a.maxWidth = c;
                if (f < a.maxHeight) a.maxHeight = f
            }
            this._vBoundaries = a
        },
        _updateCache: function(b) {
            this.offset = this.helper.offset();
            if (k(b.left)) this.position.left = b.left;
            if (k(b.top)) this.position.top = b.top;
            if (k(b.height)) this.size.height = b.height;
            if (k(b.width)) this.size.width =
                b.width
        },
        _updateRatio: function(b) {
            var a = this.position,
                c = this.size,
                d = this.axis;
            if (k(b.height)) b.width = b.height * this.aspectRatio;
            else if (k(b.width)) b.height = b.width / this.aspectRatio;
            if (d == "sw") {
                b.left = a.left + (c.width - b.width);
                b.top = null
            }
            if (d == "nw") {
                b.top = a.top + (c.height - b.height);
                b.left = a.left + (c.width - b.width)
            }
            return b
        },
        _respectSize: function(b) {
            var a = this._vBoundaries,
                c = this.axis,
                d = k(b.width) && a.maxWidth && a.maxWidth < b.width,
                f = k(b.height) && a.maxHeight && a.maxHeight < b.height,
                g = k(b.width) && a.minWidth &&
                a.minWidth > b.width,
                h = k(b.height) && a.minHeight && a.minHeight > b.height;
            if (g) b.width = a.minWidth;
            if (h) b.height = a.minHeight;
            if (d) b.width = a.maxWidth;
            if (f) b.height = a.maxHeight;
            var i = this.originalPosition.left + this.originalSize.width,
                j = this.position.top + this.size.height,
                l = /sw|nw|w/.test(c);
            c = /nw|ne|n/.test(c);
            if (g && l) b.left = i - a.minWidth;
            if (d && l) b.left = i - a.maxWidth;
            if (h && c) b.top = j - a.minHeight;
            if (f && c) b.top = j - a.maxHeight;
            if ((a = !b.width && !b.height) && !b.left && b.top) b.top = null;
            else if (a && !b.top && b.left) b.left =
                null;
            return b
        },
        _proportionallyResize: function() {
            if (this._proportionallyResizeElements.length)
                for (var b = this.helper || this.element, a = 0; a < this._proportionallyResizeElements.length; a++) {
                    var c = this._proportionallyResizeElements[a];
                    if (!this.borderDif) {
                        var d = [c.css("borderTopWidth"), c.css("borderRightWidth"), c.css("borderBottomWidth"), c.css("borderLeftWidth")],
                            f = [c.css("paddingTop"), c.css("paddingRight"), c.css("paddingBottom"), c.css("paddingLeft")];
                        this.borderDif = e.map(d, function(g, h) {
                            g = parseInt(g, 10) ||
                                0;
                            h = parseInt(f[h], 10) || 0;
                            return g + h
                        })
                    }
                    e.browser.msie && (e(b).is(":hidden") || e(b).parents(":hidden").length) || c.css({
                        height: b.height() - this.borderDif[0] - this.borderDif[2] || 0,
                        width: b.width() - this.borderDif[1] - this.borderDif[3] || 0
                    })
                }
        },
        _renderProxy: function() {
            var b = this.options;
            this.elementOffset = this.element.offset();
            if (this._helper) {
                this.helper = this.helper || e('<div style="overflow:hidden;"></div>');
                var a = e.browser.msie && e.browser.version < 7,
                    c = a ? 1 : 0;
                a = a ? 2 : -1;
                this.helper.addClass(this._helper).css({
                    width: this.element.outerWidth() +
                        a,
                    height: this.element.outerHeight() + a,
                    position: "absolute",
                    left: this.elementOffset.left - c + "px",
                    top: this.elementOffset.top - c + "px",
                    zIndex: ++b.zIndex
                });
                this.helper.appendTo("body").disableSelection()
            } else this.helper = this.element
        },
        _change: {
            e: function(b, a) {
                return {
                    width: this.originalSize.width + a
                }
            },
            w: function(b, a) {
                return {
                    left: this.originalPosition.left + a,
                    width: this.originalSize.width - a
                }
            },
            n: function(b, a, c) {
                return {
                    top: this.originalPosition.top + c,
                    height: this.originalSize.height - c
                }
            },
            s: function(b, a, c) {
                return {
                    height: this.originalSize.height +
                        c
                }
            },
            se: function(b, a, c) {
                return e.extend(this._change.s.apply(this, arguments), this._change.e.apply(this, [b, a, c]))
            },
            sw: function(b, a, c) {
                return e.extend(this._change.s.apply(this, arguments), this._change.w.apply(this, [b, a, c]))
            },
            ne: function(b, a, c) {
                return e.extend(this._change.n.apply(this, arguments), this._change.e.apply(this, [b, a, c]))
            },
            nw: function(b, a, c) {
                return e.extend(this._change.n.apply(this, arguments), this._change.w.apply(this, [b, a, c]))
            }
        },
        _propagate: function(b, a) {
            e.ui.plugin.call(this, b, [a, this.ui()]);
            b != "resize" && this._trigger(b, a, this.ui())
        },
        plugins: {},
        ui: function() {
            return {
                originalElement: this.originalElement,
                element: this.element,
                helper: this.helper,
                position: this.position,
                size: this.size,
                originalSize: this.originalSize,
                originalPosition: this.originalPosition
            }
        }
    });
    e.extend(e.ui.resizable, {
        version: "1.8.15"
    });
    e.ui.plugin.add("resizable", "alsoResize", {
        start: function() {
            var b = e(this).data("resizable").options,
                a = function(c) {
                    e(c).each(function() {
                        var d = e(this);
                        d.data("resizable-alsoresize", {
                            width: parseInt(d.width(),
                                10),
                            height: parseInt(d.height(), 10),
                            left: parseInt(d.css("left"), 10),
                            top: parseInt(d.css("top"), 10),
                            position: d.css("position")
                        })
                    })
                };
            if (typeof b.alsoResize == "object" && !b.alsoResize.parentNode)
                if (b.alsoResize.length) {
                    b.alsoResize = b.alsoResize[0];
                    a(b.alsoResize)
                } else e.each(b.alsoResize, function(c) {
                    a(c)
                });
            else a(b.alsoResize)
        },
        resize: function(b, a) {
            var c = e(this).data("resizable");
            b = c.options;
            var d = c.originalSize,
                f = c.originalPosition,
                g = {
                    height: c.size.height - d.height || 0,
                    width: c.size.width - d.width || 0,
                    top: c.position.top -
                        f.top || 0,
                    left: c.position.left - f.left || 0
                },
                h = function(i, j) {
                    e(i).each(function() {
                        var l = e(this),
                            q = e(this).data("resizable-alsoresize"),
                            p = {},
                            r = j && j.length ? j : l.parents(a.originalElement[0]).length ? ["width", "height"] : ["width", "height", "top", "left"];
                        e.each(r, function(n, o) {
                            if ((n = (q[o] || 0) + (g[o] || 0)) && n >= 0) p[o] = n || null
                        });
                        if (e.browser.opera && /relative/.test(l.css("position"))) {
                            c._revertToRelativePosition = true;
                            l.css({
                                position: "absolute",
                                top: "auto",
                                left: "auto"
                            })
                        }
                        l.css(p)
                    })
                };
            typeof b.alsoResize == "object" && !b.alsoResize.nodeType ?
                e.each(b.alsoResize, function(i, j) {
                    h(i, j)
                }) : h(b.alsoResize)
        },
        stop: function() {
            var b = e(this).data("resizable"),
                a = b.options,
                c = function(d) {
                    e(d).each(function() {
                        var f = e(this);
                        f.css({
                            position: f.data("resizable-alsoresize").position
                        })
                    })
                };
            if (b._revertToRelativePosition) {
                b._revertToRelativePosition = false;
                typeof a.alsoResize == "object" && !a.alsoResize.nodeType ? e.each(a.alsoResize, function(d) {
                    c(d)
                }) : c(a.alsoResize)
            }
            e(this).removeData("resizable-alsoresize")
        }
    });
    e.ui.plugin.add("resizable", "animate", {
        stop: function(b) {
            var a =
                e(this).data("resizable"),
                c = a.options,
                d = a._proportionallyResizeElements,
                f = d.length && /textarea/i.test(d[0].nodeName),
                g = f && e.ui.hasScroll(d[0], "left") ? 0 : a.sizeDiff.height;
            f = {
                width: a.size.width - (f ? 0 : a.sizeDiff.width),
                height: a.size.height - g
            };
            g = parseInt(a.element.css("left"), 10) + (a.position.left - a.originalPosition.left) || null;
            var h = parseInt(a.element.css("top"), 10) + (a.position.top - a.originalPosition.top) || null;
            a.element.animate(e.extend(f, h && g ? {
                top: h,
                left: g
            } : {}), {
                duration: c.animateDuration,
                easing: c.animateEasing,
                step: function() {
                    var i = {
                        width: parseInt(a.element.css("width"), 10),
                        height: parseInt(a.element.css("height"), 10),
                        top: parseInt(a.element.css("top"), 10),
                        left: parseInt(a.element.css("left"), 10)
                    };
                    d && d.length && e(d[0]).css({
                        width: i.width,
                        height: i.height
                    });
                    a._updateCache(i);
                    a._propagate("resize", b)
                }
            })
        }
    });
    e.ui.plugin.add("resizable", "containment", {
        start: function() {
            var b = e(this).data("resizable"),
                a = b.element,
                c = b.options.containment;
            if (a = c instanceof e ? c.get(0) : /parent/.test(c) ? a.parent().get(0) : c) {
                b.containerElement =
                    e(a);
                if (/document/.test(c) || c == document) {
                    b.containerOffset = {
                        left: 0,
                        top: 0
                    };
                    b.containerPosition = {
                        left: 0,
                        top: 0
                    };
                    b.parentData = {
                        element: e(document),
                        left: 0,
                        top: 0,
                        width: e(document).width(),
                        height: e(document).height() || document.body.parentNode.scrollHeight
                    }
                } else {
                    var d = e(a),
                        f = [];
                    e(["Top", "Right", "Left", "Bottom"]).each(function(i, j) {
                        f[i] = m(d.css("padding" + j))
                    });
                    b.containerOffset = d.offset();
                    b.containerPosition = d.position();
                    b.containerSize = {
                        height: d.innerHeight() - f[3],
                        width: d.innerWidth() - f[1]
                    };
                    c = b.containerOffset;
                    var g = b.containerSize.height,
                        h = b.containerSize.width;
                    h = e.ui.hasScroll(a, "left") ? a.scrollWidth : h;
                    g = e.ui.hasScroll(a) ? a.scrollHeight : g;
                    b.parentData = {
                        element: a,
                        left: c.left,
                        top: c.top,
                        width: h,
                        height: g
                    }
                }
            }
        },
        resize: function(b) {
            var a = e(this).data("resizable"),
                c = a.options,
                d = a.containerOffset,
                f = a.position;
            b = a._aspectRatio || b.shiftKey;
            var g = {
                    top: 0,
                    left: 0
                },
                h = a.containerElement;
            if (h[0] != document && /static/.test(h.css("position"))) g = d;
            if (f.left < (a._helper ? d.left : 0)) {
                a.size.width += a._helper ? a.position.left - d.left :
                    a.position.left - g.left;
                if (b) a.size.height = a.size.width / c.aspectRatio;
                a.position.left = c.helper ? d.left : 0
            }
            if (f.top < (a._helper ? d.top : 0)) {
                a.size.height += a._helper ? a.position.top - d.top : a.position.top;
                if (b) a.size.width = a.size.height * c.aspectRatio;
                a.position.top = a._helper ? d.top : 0
            }
            a.offset.left = a.parentData.left + a.position.left;
            a.offset.top = a.parentData.top + a.position.top;
            c = Math.abs((a._helper ? a.offset.left - g.left : a.offset.left - g.left) + a.sizeDiff.width);
            d = Math.abs((a._helper ? a.offset.top - g.top : a.offset.top -
                d.top) + a.sizeDiff.height);
            f = a.containerElement.get(0) == a.element.parent().get(0);
            g = /relative|absolute/.test(a.containerElement.css("position"));
            if (f && g) c -= a.parentData.left;
            if (c + a.size.width >= a.parentData.width) {
                a.size.width = a.parentData.width - c;
                if (b) a.size.height = a.size.width / a.aspectRatio
            }
            if (d + a.size.height >= a.parentData.height) {
                a.size.height = a.parentData.height - d;
                if (b) a.size.width = a.size.height * a.aspectRatio
            }
        },
        stop: function() {
            var b = e(this).data("resizable"),
                a = b.options,
                c = b.containerOffset,
                d = b.containerPosition,
                f = b.containerElement,
                g = e(b.helper),
                h = g.offset(),
                i = g.outerWidth() - b.sizeDiff.width;
            g = g.outerHeight() - b.sizeDiff.height;
            b._helper && !a.animate && /relative/.test(f.css("position")) && e(this).css({
                left: h.left - d.left - c.left,
                width: i,
                height: g
            });
            b._helper && !a.animate && /static/.test(f.css("position")) && e(this).css({
                left: h.left - d.left - c.left,
                width: i,
                height: g
            })
        }
    });
    e.ui.plugin.add("resizable", "ghost", {
        start: function() {
            var b = e(this).data("resizable"),
                a = b.options,
                c = b.size;
            b.ghost = b.originalElement.clone();
            b.ghost.css({
                opacity: 0.25,
                display: "block",
                position: "relative",
                height: c.height,
                width: c.width,
                margin: 0,
                left: 0,
                top: 0
            }).addClass("ui-resizable-ghost").addClass(typeof a.ghost == "string" ? a.ghost : "");
            b.ghost.appendTo(b.helper)
        },
        resize: function() {
            var b = e(this).data("resizable");
            b.ghost && b.ghost.css({
                position: "relative",
                height: b.size.height,
                width: b.size.width
            })
        },
        stop: function() {
            var b = e(this).data("resizable");
            b.ghost && b.helper && b.helper.get(0).removeChild(b.ghost.get(0))
        }
    });
    e.ui.plugin.add("resizable", "grid", {
        resize: function() {
            var b =
                e(this).data("resizable"),
                a = b.options,
                c = b.size,
                d = b.originalSize,
                f = b.originalPosition,
                g = b.axis;
            a.grid = typeof a.grid == "number" ? [a.grid, a.grid] : a.grid;
            var h = Math.round((c.width - d.width) / (a.grid[0] || 1)) * (a.grid[0] || 1);
            a = Math.round((c.height - d.height) / (a.grid[1] || 1)) * (a.grid[1] || 1);
            if (/^(se|s|e)$/.test(g)) {
                b.size.width = d.width + h;
                b.size.height = d.height + a
            } else if (/^(ne)$/.test(g)) {
                b.size.width = d.width + h;
                b.size.height = d.height + a;
                b.position.top = f.top - a
            } else {
                if (/^(sw)$/.test(g)) {
                    b.size.width = d.width + h;
                    b.size.height =
                        d.height + a
                } else {
                    b.size.width = d.width + h;
                    b.size.height = d.height + a;
                    b.position.top = f.top - a
                }
                b.position.left = f.left - h
            }
        }
    });
    var m = function(b) {
            return parseInt(b, 10) || 0
        },
        k = function(b) {
            return !isNaN(parseInt(b, 10))
        }
})(jQuery);;
/*
 * jQuery UI Selectable 1.8.15
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Selectables
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.mouse.js
 *	jquery.ui.widget.js
 */
(function(e) {
    e.widget("ui.selectable", e.ui.mouse, {
        options: {
            appendTo: "body",
            autoRefresh: true,
            distance: 0,
            filter: "*",
            tolerance: "touch"
        },
        _create: function() {
            var c = this;
            this.element.addClass("ui-selectable");
            this.dragged = false;
            var f;
            this.refresh = function() {
                f = e(c.options.filter, c.element[0]);
                f.each(function() {
                    var d = e(this),
                        b = d.offset();
                    e.data(this, "selectable-item", {
                        element: this,
                        $element: d,
                        left: b.left,
                        top: b.top,
                        right: b.left + d.outerWidth(),
                        bottom: b.top + d.outerHeight(),
                        startselected: false,
                        selected: d.hasClass("ui-selected"),
                        selecting: d.hasClass("ui-selecting"),
                        unselecting: d.hasClass("ui-unselecting")
                    })
                })
            };
            this.refresh();
            this.selectees = f.addClass("ui-selectee");
            this._mouseInit();
            this.helper = e("<div class='ui-selectable-helper'></div>")
        },
        destroy: function() {
            this.selectees.removeClass("ui-selectee").removeData("selectable-item");
            this.element.removeClass("ui-selectable ui-selectable-disabled").removeData("selectable").unbind(".selectable");
            this._mouseDestroy();
            return this
        },
        _mouseStart: function(c) {
            var f = this;
            this.opos = [c.pageX,
                c.pageY
            ];
            if (!this.options.disabled) {
                var d = this.options;
                this.selectees = e(d.filter, this.element[0]);
                this._trigger("start", c);
                e(d.appendTo).append(this.helper);
                this.helper.css({
                    left: c.clientX,
                    top: c.clientY,
                    width: 0,
                    height: 0
                });
                d.autoRefresh && this.refresh();
                this.selectees.filter(".ui-selected").each(function() {
                    var b = e.data(this, "selectable-item");
                    b.startselected = true;
                    if (!c.metaKey) {
                        b.$element.removeClass("ui-selected");
                        b.selected = false;
                        b.$element.addClass("ui-unselecting");
                        b.unselecting = true;
                        f._trigger("unselecting",
                            c, {
                                unselecting: b.element
                            })
                    }
                });
                e(c.target).parents().andSelf().each(function() {
                    var b = e.data(this, "selectable-item");
                    if (b) {
                        var g = !c.metaKey || !b.$element.hasClass("ui-selected");
                        b.$element.removeClass(g ? "ui-unselecting" : "ui-selected").addClass(g ? "ui-selecting" : "ui-unselecting");
                        b.unselecting = !g;
                        b.selecting = g;
                        (b.selected = g) ? f._trigger("selecting", c, {
                            selecting: b.element
                        }): f._trigger("unselecting", c, {
                            unselecting: b.element
                        });
                        return false
                    }
                })
            }
        },
        _mouseDrag: function(c) {
            var f = this;
            this.dragged = true;
            if (!this.options.disabled) {
                var d =
                    this.options,
                    b = this.opos[0],
                    g = this.opos[1],
                    h = c.pageX,
                    i = c.pageY;
                if (b > h) {
                    var j = h;
                    h = b;
                    b = j
                }
                if (g > i) {
                    j = i;
                    i = g;
                    g = j
                }
                this.helper.css({
                    left: b,
                    top: g,
                    width: h - b,
                    height: i - g
                });
                this.selectees.each(function() {
                    var a = e.data(this, "selectable-item");
                    if (!(!a || a.element == f.element[0])) {
                        var k = false;
                        if (d.tolerance == "touch") k = !(a.left > h || a.right < b || a.top > i || a.bottom < g);
                        else if (d.tolerance == "fit") k = a.left > b && a.right < h && a.top > g && a.bottom < i;
                        if (k) {
                            if (a.selected) {
                                a.$element.removeClass("ui-selected");
                                a.selected = false
                            }
                            if (a.unselecting) {
                                a.$element.removeClass("ui-unselecting");
                                a.unselecting = false
                            }
                            if (!a.selecting) {
                                a.$element.addClass("ui-selecting");
                                a.selecting = true;
                                f._trigger("selecting", c, {
                                    selecting: a.element
                                })
                            }
                        } else {
                            if (a.selecting)
                                if (c.metaKey && a.startselected) {
                                    a.$element.removeClass("ui-selecting");
                                    a.selecting = false;
                                    a.$element.addClass("ui-selected");
                                    a.selected = true
                                } else {
                                    a.$element.removeClass("ui-selecting");
                                    a.selecting = false;
                                    if (a.startselected) {
                                        a.$element.addClass("ui-unselecting");
                                        a.unselecting = true
                                    }
                                    f._trigger("unselecting", c, {
                                        unselecting: a.element
                                    })
                                }
                            if (a.selected)
                                if (!c.metaKey &&
                                    !a.startselected) {
                                    a.$element.removeClass("ui-selected");
                                    a.selected = false;
                                    a.$element.addClass("ui-unselecting");
                                    a.unselecting = true;
                                    f._trigger("unselecting", c, {
                                        unselecting: a.element
                                    })
                                }
                        }
                    }
                });
                return false
            }
        },
        _mouseStop: function(c) {
            var f = this;
            this.dragged = false;
            e(".ui-unselecting", this.element[0]).each(function() {
                var d = e.data(this, "selectable-item");
                d.$element.removeClass("ui-unselecting");
                d.unselecting = false;
                d.startselected = false;
                f._trigger("unselected", c, {
                    unselected: d.element
                })
            });
            e(".ui-selecting", this.element[0]).each(function() {
                var d =
                    e.data(this, "selectable-item");
                d.$element.removeClass("ui-selecting").addClass("ui-selected");
                d.selecting = false;
                d.selected = true;
                d.startselected = true;
                f._trigger("selected", c, {
                    selected: d.element
                })
            });
            this._trigger("stop", c);
            this.helper.remove();
            return false
        }
    });
    e.extend(e.ui.selectable, {
        version: "1.8.15"
    })
})(jQuery);;
/*
 * jQuery UI Sortable 1.8.15
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Sortables
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.mouse.js
 *	jquery.ui.widget.js
 */
(function(d) {
    d.widget("ui.sortable", d.ui.mouse, {
        widgetEventPrefix: "sort",
        options: {
            appendTo: "parent",
            axis: false,
            connectWith: false,
            containment: false,
            cursor: "auto",
            cursorAt: false,
            dropOnEmpty: true,
            forcePlaceholderSize: false,
            forceHelperSize: false,
            grid: false,
            handle: false,
            helper: "original",
            items: "> *",
            opacity: false,
            placeholder: false,
            revert: false,
            scroll: true,
            scrollSensitivity: 20,
            scrollSpeed: 20,
            scope: "default",
            tolerance: "intersect",
            zIndex: 1E3
        },
        _create: function() {
            var a = this.options;
            this.containerCache = {};
            this.element.addClass("ui-sortable");
            this.refresh();
            this.floating = this.items.length ? a.axis === "x" || /left|right/.test(this.items[0].item.css("float")) || /inline|table-cell/.test(this.items[0].item.css("display")) : false;
            this.offset = this.element.offset();
            this._mouseInit()
        },
        destroy: function() {
            this.element.removeClass("ui-sortable ui-sortable-disabled").removeData("sortable").unbind(".sortable");
            this._mouseDestroy();
            for (var a = this.items.length - 1; a >= 0; a--) this.items[a].item.removeData("sortable-item");
            return this
        },
        _setOption: function(a, b) {
            if (a ===
                "disabled") {
                this.options[a] = b;
                this.widget()[b ? "addClass" : "removeClass"]("ui-sortable-disabled")
            } else d.Widget.prototype._setOption.apply(this, arguments)
        },
        _mouseCapture: function(a, b) {
            if (this.reverting) return false;
            if (this.options.disabled || this.options.type == "static") return false;
            this._refreshItems(a);
            var c = null,
                e = this;
            d(a.target).parents().each(function() {
                if (d.data(this, "sortable-item") == e) {
                    c = d(this);
                    return false
                }
            });
            if (d.data(a.target, "sortable-item") == e) c = d(a.target);
            if (!c) return false;
            if (this.options.handle &&
                !b) {
                var f = false;
                d(this.options.handle, c).find("*").andSelf().each(function() {
                    if (this == a.target) f = true
                });
                if (!f) return false
            }
            this.currentItem = c;
            this._removeCurrentsFromItems();
            return true
        },
        _mouseStart: function(a, b, c) {
            b = this.options;
            var e = this;
            this.currentContainer = this;
            this.refreshPositions();
            this.helper = this._createHelper(a);
            this._cacheHelperProportions();
            this._cacheMargins();
            this.scrollParent = this.helper.scrollParent();
            this.offset = this.currentItem.offset();
            this.offset = {
                top: this.offset.top - this.margins.top,
                left: this.offset.left - this.margins.left
            };
            this.helper.css("position", "absolute");
            this.cssPosition = this.helper.css("position");
            d.extend(this.offset, {
                click: {
                    left: a.pageX - this.offset.left,
                    top: a.pageY - this.offset.top
                },
                parent: this._getParentOffset(),
                relative: this._getRelativeOffset()
            });
            this.originalPosition = this._generatePosition(a);
            this.originalPageX = a.pageX;
            this.originalPageY = a.pageY;
            b.cursorAt && this._adjustOffsetFromHelper(b.cursorAt);
            this.domPosition = {
                prev: this.currentItem.prev()[0],
                parent: this.currentItem.parent()[0]
            };
            this.helper[0] != this.currentItem[0] && this.currentItem.hide();
            this._createPlaceholder();
            b.containment && this._setContainment();
            if (b.cursor) {
                if (d("body").css("cursor")) this._storedCursor = d("body").css("cursor");
                d("body").css("cursor", b.cursor)
            }
            if (b.opacity) {
                if (this.helper.css("opacity")) this._storedOpacity = this.helper.css("opacity");
                this.helper.css("opacity", b.opacity)
            }
            if (b.zIndex) {
                if (this.helper.css("zIndex")) this._storedZIndex = this.helper.css("zIndex");
                this.helper.css("zIndex", b.zIndex)
            }
            if (this.scrollParent[0] !=
                document && this.scrollParent[0].tagName != "HTML") this.overflowOffset = this.scrollParent.offset();
            this._trigger("start", a, this._uiHash());
            this._preserveHelperProportions || this._cacheHelperProportions();
            if (!c)
                for (c = this.containers.length - 1; c >= 0; c--) this.containers[c]._trigger("activate", a, e._uiHash(this));
            if (d.ui.ddmanager) d.ui.ddmanager.current = this;
            d.ui.ddmanager && !b.dropBehaviour && d.ui.ddmanager.prepareOffsets(this, a);
            this.dragging = true;
            this.helper.addClass("ui-sortable-helper");
            this._mouseDrag(a);
            return true
        },
        _mouseDrag: function(a) {
            this.position = this._generatePosition(a);
            this.positionAbs = this._convertPositionTo("absolute");
            if (!this.lastPositionAbs) this.lastPositionAbs = this.positionAbs;
            if (this.options.scroll) {
                var b = this.options,
                    c = false;
                if (this.scrollParent[0] != document && this.scrollParent[0].tagName != "HTML") {
                    if (this.overflowOffset.top + this.scrollParent[0].offsetHeight - a.pageY < b.scrollSensitivity) this.scrollParent[0].scrollTop = c = this.scrollParent[0].scrollTop + b.scrollSpeed;
                    else if (a.pageY - this.overflowOffset.top <
                        b.scrollSensitivity) this.scrollParent[0].scrollTop = c = this.scrollParent[0].scrollTop - b.scrollSpeed;
                    if (this.overflowOffset.left + this.scrollParent[0].offsetWidth - a.pageX < b.scrollSensitivity) this.scrollParent[0].scrollLeft = c = this.scrollParent[0].scrollLeft + b.scrollSpeed;
                    else if (a.pageX - this.overflowOffset.left < b.scrollSensitivity) this.scrollParent[0].scrollLeft = c = this.scrollParent[0].scrollLeft - b.scrollSpeed
                } else {
                    if (a.pageY - d(document).scrollTop() < b.scrollSensitivity) c = d(document).scrollTop(d(document).scrollTop() -
                        b.scrollSpeed);
                    else if (d(window).height() - (a.pageY - d(document).scrollTop()) < b.scrollSensitivity) c = d(document).scrollTop(d(document).scrollTop() + b.scrollSpeed);
                    if (a.pageX - d(document).scrollLeft() < b.scrollSensitivity) c = d(document).scrollLeft(d(document).scrollLeft() - b.scrollSpeed);
                    else if (d(window).width() - (a.pageX - d(document).scrollLeft()) < b.scrollSensitivity) c = d(document).scrollLeft(d(document).scrollLeft() + b.scrollSpeed)
                }
                c !== false && d.ui.ddmanager && !b.dropBehaviour && d.ui.ddmanager.prepareOffsets(this,
                    a)
            }
            this.positionAbs = this._convertPositionTo("absolute");
            if (!this.options.axis || this.options.axis != "y") this.helper[0].style.left = this.position.left + "px";
            if (!this.options.axis || this.options.axis != "x") this.helper[0].style.top = this.position.top + "px";
            for (b = this.items.length - 1; b >= 0; b--) {
                c = this.items[b];
                var e = c.item[0],
                    f = this._intersectsWithPointer(c);
                if (f)
                    if (e != this.currentItem[0] && this.placeholder[f == 1 ? "next" : "prev"]()[0] != e && !d.ui.contains(this.placeholder[0], e) && (this.options.type == "semi-dynamic" ? !d.ui.contains(this.element[0],
                            e) : true)) {
                        this.direction = f == 1 ? "down" : "up";
                        if (this.options.tolerance == "pointer" || this._intersectsWithSides(c)) this._rearrange(a, c);
                        else break;
                        this._trigger("change", a, this._uiHash());
                        break
                    }
            }
            this._contactContainers(a);
            d.ui.ddmanager && d.ui.ddmanager.drag(this, a);
            this._trigger("sort", a, this._uiHash());
            this.lastPositionAbs = this.positionAbs;
            return false
        },
        _mouseStop: function(a, b) {
            if (a) {
                d.ui.ddmanager && !this.options.dropBehaviour && d.ui.ddmanager.drop(this, a);
                if (this.options.revert) {
                    var c = this;
                    b = c.placeholder.offset();
                    c.reverting = true;
                    d(this.helper).animate({
                        left: b.left - this.offset.parent.left - c.margins.left + (this.offsetParent[0] == document.body ? 0 : this.offsetParent[0].scrollLeft),
                        top: b.top - this.offset.parent.top - c.margins.top + (this.offsetParent[0] == document.body ? 0 : this.offsetParent[0].scrollTop)
                    }, parseInt(this.options.revert, 10) || 500, function() {
                        c._clear(a)
                    })
                } else this._clear(a, b);
                return false
            }
        },
        cancel: function() {
            var a = this;
            if (this.dragging) {
                this._mouseUp({
                    target: null
                });
                this.options.helper == "original" ? this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper") :
                    this.currentItem.show();
                for (var b = this.containers.length - 1; b >= 0; b--) {
                    this.containers[b]._trigger("deactivate", null, a._uiHash(this));
                    if (this.containers[b].containerCache.over) {
                        this.containers[b]._trigger("out", null, a._uiHash(this));
                        this.containers[b].containerCache.over = 0
                    }
                }
            }
            if (this.placeholder) {
                this.placeholder[0].parentNode && this.placeholder[0].parentNode.removeChild(this.placeholder[0]);
                this.options.helper != "original" && this.helper && this.helper[0].parentNode && this.helper.remove();
                d.extend(this, {
                    helper: null,
                    dragging: false,
                    reverting: false,
                    _noFinalSort: null
                });
                this.domPosition.prev ? d(this.domPosition.prev).after(this.currentItem) : d(this.domPosition.parent).prepend(this.currentItem)
            }
            return this
        },
        serialize: function(a) {
            var b = this._getItemsAsjQuery(a && a.connected),
                c = [];
            a = a || {};
            d(b).each(function() {
                var e = (d(a.item || this).attr(a.attribute || "id") || "").match(a.expression || /(.+)[-=_](.+)/);
                if (e) c.push((a.key || e[1] + "[]") + "=" + (a.key && a.expression ? e[1] : e[2]))
            });
            !c.length && a.key && c.push(a.key + "=");
            return c.join("&")
        },
        toArray: function(a) {
            var b = this._getItemsAsjQuery(a && a.connected),
                c = [];
            a = a || {};
            b.each(function() {
                c.push(d(a.item || this).attr(a.attribute || "id") || "")
            });
            return c
        },
        _intersectsWith: function(a) {
            var b = this.positionAbs.left,
                c = b + this.helperProportions.width,
                e = this.positionAbs.top,
                f = e + this.helperProportions.height,
                g = a.left,
                h = g + a.width,
                i = a.top,
                k = i + a.height,
                j = this.offset.click.top,
                l = this.offset.click.left;
            j = e + j > i && e + j < k && b + l > g && b + l < h;
            return this.options.tolerance == "pointer" || this.options.forcePointerForContainers ||
                this.options.tolerance != "pointer" && this.helperProportions[this.floating ? "width" : "height"] > a[this.floating ? "width" : "height"] ? j : g < b + this.helperProportions.width / 2 && c - this.helperProportions.width / 2 < h && i < e + this.helperProportions.height / 2 && f - this.helperProportions.height / 2 < k
        },
        _intersectsWithPointer: function(a) {
            var b = d.ui.isOverAxis(this.positionAbs.top + this.offset.click.top, a.top, a.height);
            a = d.ui.isOverAxis(this.positionAbs.left + this.offset.click.left, a.left, a.width);
            b = b && a;
            a = this._getDragVerticalDirection();
            var c = this._getDragHorizontalDirection();
            if (!b) return false;
            return this.floating ? c && c == "right" || a == "down" ? 2 : 1 : a && (a == "down" ? 2 : 1)
        },
        _intersectsWithSides: function(a) {
            var b = d.ui.isOverAxis(this.positionAbs.top + this.offset.click.top, a.top + a.height / 2, a.height);
            a = d.ui.isOverAxis(this.positionAbs.left + this.offset.click.left, a.left + a.width / 2, a.width);
            var c = this._getDragVerticalDirection(),
                e = this._getDragHorizontalDirection();
            return this.floating && e ? e == "right" && a || e == "left" && !a : c && (c == "down" && b || c == "up" && !b)
        },
        _getDragVerticalDirection: function() {
            var a = this.positionAbs.top - this.lastPositionAbs.top;
            return a != 0 && (a > 0 ? "down" : "up")
        },
        _getDragHorizontalDirection: function() {
            var a = this.positionAbs.left - this.lastPositionAbs.left;
            return a != 0 && (a > 0 ? "right" : "left")
        },
        refresh: function(a) {
            this._refreshItems(a);
            this.refreshPositions();
            return this
        },
        _connectWith: function() {
            var a = this.options;
            return a.connectWith.constructor == String ? [a.connectWith] : a.connectWith
        },
        _getItemsAsjQuery: function(a) {
            var b = [],
                c = [],
                e = this._connectWith();
            if (e && a)
                for (a = e.length - 1; a >= 0; a--)
                    for (var f = d(e[a]), g = f.length - 1; g >= 0; g--) {
                        var h = d.data(f[g], "sortable");
                        if (h && h != this && !h.options.disabled) c.push([d.isFunction(h.options.items) ? h.options.items.call(h.element) : d(h.options.items, h.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), h])
                    }
            c.push([d.isFunction(this.options.items) ? this.options.items.call(this.element, null, {
                    options: this.options,
                    item: this.currentItem
                }) : d(this.options.items, this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),
                this
            ]);
            for (a = c.length - 1; a >= 0; a--) c[a][0].each(function() {
                b.push(this)
            });
            return d(b)
        },
        _removeCurrentsFromItems: function() {
            for (var a = this.currentItem.find(":data(sortable-item)"), b = 0; b < this.items.length; b++)
                for (var c = 0; c < a.length; c++) a[c] == this.items[b].item[0] && this.items.splice(b, 1)
        },
        _refreshItems: function(a) {
            this.items = [];
            this.containers = [this];
            var b = this.items,
                c = [
                    [d.isFunction(this.options.items) ? this.options.items.call(this.element[0], a, {
                            item: this.currentItem
                        }) : d(this.options.items, this.element),
                        this
                    ]
                ],
                e = this._connectWith();
            if (e)
                for (var f = e.length - 1; f >= 0; f--)
                    for (var g = d(e[f]), h = g.length - 1; h >= 0; h--) {
                        var i = d.data(g[h], "sortable");
                        if (i && i != this && !i.options.disabled) {
                            c.push([d.isFunction(i.options.items) ? i.options.items.call(i.element[0], a, {
                                item: this.currentItem
                            }) : d(i.options.items, i.element), i]);
                            this.containers.push(i)
                        }
                    }
            for (f = c.length - 1; f >= 0; f--) {
                a = c[f][1];
                e = c[f][0];
                h = 0;
                for (g = e.length; h < g; h++) {
                    i = d(e[h]);
                    i.data("sortable-item", a);
                    b.push({
                        item: i,
                        instance: a,
                        width: 0,
                        height: 0,
                        left: 0,
                        top: 0
                    })
                }
            }
        },
        refreshPositions: function(a) {
            if (this.offsetParent &&
                this.helper) this.offset.parent = this._getParentOffset();
            for (var b = this.items.length - 1; b >= 0; b--) {
                var c = this.items[b];
                if (!(c.instance != this.currentContainer && this.currentContainer && c.item[0] != this.currentItem[0])) {
                    var e = this.options.toleranceElement ? d(this.options.toleranceElement, c.item) : c.item;
                    if (!a) {
                        c.width = e.outerWidth();
                        c.height = e.outerHeight()
                    }
                    e = e.offset();
                    c.left = e.left;
                    c.top = e.top
                }
            }
            if (this.options.custom && this.options.custom.refreshContainers) this.options.custom.refreshContainers.call(this);
            else
                for (b =
                    this.containers.length - 1; b >= 0; b--) {
                    e = this.containers[b].element.offset();
                    this.containers[b].containerCache.left = e.left;
                    this.containers[b].containerCache.top = e.top;
                    this.containers[b].containerCache.width = this.containers[b].element.outerWidth();
                    this.containers[b].containerCache.height = this.containers[b].element.outerHeight()
                }
            return this
        },
        _createPlaceholder: function(a) {
            var b = a || this,
                c = b.options;
            if (!c.placeholder || c.placeholder.constructor == String) {
                var e = c.placeholder;
                c.placeholder = {
                    element: function() {
                        var f =
                            d(document.createElement(b.currentItem[0].nodeName)).addClass(e || b.currentItem[0].className + " ui-sortable-placeholder").removeClass("ui-sortable-helper")[0];
                        if (!e) f.style.visibility = "hidden";
                        return f
                    },
                    update: function(f, g) {
                        if (!(e && !c.forcePlaceholderSize)) {
                            g.height() || g.height(b.currentItem.innerHeight() - parseInt(b.currentItem.css("paddingTop") || 0, 10) - parseInt(b.currentItem.css("paddingBottom") || 0, 10));
                            g.width() || g.width(b.currentItem.innerWidth() - parseInt(b.currentItem.css("paddingLeft") || 0, 10) - parseInt(b.currentItem.css("paddingRight") ||
                                0, 10))
                        }
                    }
                }
            }
            b.placeholder = d(c.placeholder.element.call(b.element, b.currentItem));
            b.currentItem.after(b.placeholder);
            c.placeholder.update(b, b.placeholder)
        },
        _contactContainers: function(a) {
            for (var b = null, c = null, e = this.containers.length - 1; e >= 0; e--)
                if (!d.ui.contains(this.currentItem[0], this.containers[e].element[0]))
                    if (this._intersectsWith(this.containers[e].containerCache)) {
                        if (!(b && d.ui.contains(this.containers[e].element[0], b.element[0]))) {
                            b = this.containers[e];
                            c = e
                        }
                    } else if (this.containers[e].containerCache.over) {
                this.containers[e]._trigger("out",
                    a, this._uiHash(this));
                this.containers[e].containerCache.over = 0
            }
            if (b)
                if (this.containers.length === 1) {
                    this.containers[c]._trigger("over", a, this._uiHash(this));
                    this.containers[c].containerCache.over = 1
                } else if (this.currentContainer != this.containers[c]) {
                b = 1E4;
                e = null;
                for (var f = this.positionAbs[this.containers[c].floating ? "left" : "top"], g = this.items.length - 1; g >= 0; g--)
                    if (d.ui.contains(this.containers[c].element[0], this.items[g].item[0])) {
                        var h = this.items[g][this.containers[c].floating ? "left" : "top"];
                        if (Math.abs(h -
                                f) < b) {
                            b = Math.abs(h - f);
                            e = this.items[g]
                        }
                    }
                if (e || this.options.dropOnEmpty) {
                    this.currentContainer = this.containers[c];
                    e ? this._rearrange(a, e, null, true) : this._rearrange(a, null, this.containers[c].element, true);
                    this._trigger("change", a, this._uiHash());
                    this.containers[c]._trigger("change", a, this._uiHash(this));
                    this.options.placeholder.update(this.currentContainer, this.placeholder);
                    this.containers[c]._trigger("over", a, this._uiHash(this));
                    this.containers[c].containerCache.over = 1
                }
            }
        },
        _createHelper: function(a) {
            var b =
                this.options;
            a = d.isFunction(b.helper) ? d(b.helper.apply(this.element[0], [a, this.currentItem])) : b.helper == "clone" ? this.currentItem.clone() : this.currentItem;
            a.parents("body").length || d(b.appendTo != "parent" ? b.appendTo : this.currentItem[0].parentNode)[0].appendChild(a[0]);
            if (a[0] == this.currentItem[0]) this._storedCSS = {
                width: this.currentItem[0].style.width,
                height: this.currentItem[0].style.height,
                position: this.currentItem.css("position"),
                top: this.currentItem.css("top"),
                left: this.currentItem.css("left")
            };
            if (a[0].style.width ==
                "" || b.forceHelperSize) a.width(this.currentItem.width());
            if (a[0].style.height == "" || b.forceHelperSize) a.height(this.currentItem.height());
            return a
        },
        _adjustOffsetFromHelper: function(a) {
            if (typeof a == "string") a = a.split(" ");
            if (d.isArray(a)) a = {
                left: +a[0],
                top: +a[1] || 0
            };
            if ("left" in a) this.offset.click.left = a.left + this.margins.left;
            if ("right" in a) this.offset.click.left = this.helperProportions.width - a.right + this.margins.left;
            if ("top" in a) this.offset.click.top = a.top + this.margins.top;
            if ("bottom" in a) this.offset.click.top =
                this.helperProportions.height - a.bottom + this.margins.top
        },
        _getParentOffset: function() {
            this.offsetParent = this.helper.offsetParent();
            var a = this.offsetParent.offset();
            if (this.cssPosition == "absolute" && this.scrollParent[0] != document && d.ui.contains(this.scrollParent[0], this.offsetParent[0])) {
                a.left += this.scrollParent.scrollLeft();
                a.top += this.scrollParent.scrollTop()
            }
            if (this.offsetParent[0] == document.body || this.offsetParent[0].tagName && this.offsetParent[0].tagName.toLowerCase() == "html" && d.browser.msie) a = {
                top: 0,
                left: 0
            };
            return {
                top: a.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                left: a.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
            }
        },
        _getRelativeOffset: function() {
            if (this.cssPosition == "relative") {
                var a = this.currentItem.position();
                return {
                    top: a.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
                    left: a.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
                }
            } else return {
                top: 0,
                left: 0
            }
        },
        _cacheMargins: function() {
            this.margins = {
                left: parseInt(this.currentItem.css("marginLeft"),
                    10) || 0,
                top: parseInt(this.currentItem.css("marginTop"), 10) || 0
            }
        },
        _cacheHelperProportions: function() {
            this.helperProportions = {
                width: this.helper.outerWidth(),
                height: this.helper.outerHeight()
            }
        },
        _setContainment: function() {
            var a = this.options;
            if (a.containment == "parent") a.containment = this.helper[0].parentNode;
            if (a.containment == "document" || a.containment == "window") this.containment = [0 - this.offset.relative.left - this.offset.parent.left, 0 - this.offset.relative.top - this.offset.parent.top, d(a.containment == "document" ?
                document : window).width() - this.helperProportions.width - this.margins.left, (d(a.containment == "document" ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top];
            if (!/^(document|window|parent)$/.test(a.containment)) {
                var b = d(a.containment)[0];
                a = d(a.containment).offset();
                var c = d(b).css("overflow") != "hidden";
                this.containment = [a.left + (parseInt(d(b).css("borderLeftWidth"), 10) || 0) + (parseInt(d(b).css("paddingLeft"), 10) || 0) - this.margins.left, a.top + (parseInt(d(b).css("borderTopWidth"),
                    10) || 0) + (parseInt(d(b).css("paddingTop"), 10) || 0) - this.margins.top, a.left + (c ? Math.max(b.scrollWidth, b.offsetWidth) : b.offsetWidth) - (parseInt(d(b).css("borderLeftWidth"), 10) || 0) - (parseInt(d(b).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left, a.top + (c ? Math.max(b.scrollHeight, b.offsetHeight) : b.offsetHeight) - (parseInt(d(b).css("borderTopWidth"), 10) || 0) - (parseInt(d(b).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top]
            }
        },
        _convertPositionTo: function(a, b) {
            if (!b) b =
                this.position;
            a = a == "absolute" ? 1 : -1;
            var c = this.cssPosition == "absolute" && !(this.scrollParent[0] != document && d.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent,
                e = /(html|body)/i.test(c[0].tagName);
            return {
                top: b.top + this.offset.relative.top * a + this.offset.parent.top * a - (d.browser.safari && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : e ? 0 : c.scrollTop()) * a),
                left: b.left + this.offset.relative.left * a + this.offset.parent.left * a - (d.browser.safari &&
                    this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : e ? 0 : c.scrollLeft()) * a)
            }
        },
        _generatePosition: function(a) {
            var b = this.options,
                c = this.cssPosition == "absolute" && !(this.scrollParent[0] != document && d.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent,
                e = /(html|body)/i.test(c[0].tagName);
            if (this.cssPosition == "relative" && !(this.scrollParent[0] != document && this.scrollParent[0] != this.offsetParent[0])) this.offset.relative = this._getRelativeOffset();
            var f = a.pageX,
                g = a.pageY;
            if (this.originalPosition) {
                if (this.containment) {
                    if (a.pageX - this.offset.click.left < this.containment[0]) f = this.containment[0] + this.offset.click.left;
                    if (a.pageY - this.offset.click.top < this.containment[1]) g = this.containment[1] + this.offset.click.top;
                    if (a.pageX - this.offset.click.left > this.containment[2]) f = this.containment[2] + this.offset.click.left;
                    if (a.pageY - this.offset.click.top > this.containment[3]) g = this.containment[3] + this.offset.click.top
                }
                if (b.grid) {
                    g = this.originalPageY + Math.round((g -
                        this.originalPageY) / b.grid[1]) * b.grid[1];
                    g = this.containment ? !(g - this.offset.click.top < this.containment[1] || g - this.offset.click.top > this.containment[3]) ? g : !(g - this.offset.click.top < this.containment[1]) ? g - b.grid[1] : g + b.grid[1] : g;
                    f = this.originalPageX + Math.round((f - this.originalPageX) / b.grid[0]) * b.grid[0];
                    f = this.containment ? !(f - this.offset.click.left < this.containment[0] || f - this.offset.click.left > this.containment[2]) ? f : !(f - this.offset.click.left < this.containment[0]) ? f - b.grid[0] : f + b.grid[0] : f
                }
            }
            return {
                top: g -
                    this.offset.click.top - this.offset.relative.top - this.offset.parent.top + (d.browser.safari && this.cssPosition == "fixed" ? 0 : this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : e ? 0 : c.scrollTop()),
                left: f - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + (d.browser.safari && this.cssPosition == "fixed" ? 0 : this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : e ? 0 : c.scrollLeft())
            }
        },
        _rearrange: function(a, b, c, e) {
            c ? c[0].appendChild(this.placeholder[0]) : b.item[0].parentNode.insertBefore(this.placeholder[0],
                this.direction == "down" ? b.item[0] : b.item[0].nextSibling);
            this.counter = this.counter ? ++this.counter : 1;
            var f = this,
                g = this.counter;
            window.setTimeout(function() {
                g == f.counter && f.refreshPositions(!e)
            }, 0)
        },
        _clear: function(a, b) {
            this.reverting = false;
            var c = [];
            !this._noFinalSort && this.currentItem.parent().length && this.placeholder.before(this.currentItem);
            this._noFinalSort = null;
            if (this.helper[0] == this.currentItem[0]) {
                for (var e in this._storedCSS)
                    if (this._storedCSS[e] == "auto" || this._storedCSS[e] == "static") this._storedCSS[e] =
                        "";
                this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")
            } else this.currentItem.show();
            this.fromOutside && !b && c.push(function(f) {
                this._trigger("receive", f, this._uiHash(this.fromOutside))
            });
            if ((this.fromOutside || this.domPosition.prev != this.currentItem.prev().not(".ui-sortable-helper")[0] || this.domPosition.parent != this.currentItem.parent()[0]) && !b) c.push(function(f) {
                this._trigger("update", f, this._uiHash())
            });
            if (!d.ui.contains(this.element[0], this.currentItem[0])) {
                b || c.push(function(f) {
                    this._trigger("remove",
                        f, this._uiHash())
                });
                for (e = this.containers.length - 1; e >= 0; e--)
                    if (d.ui.contains(this.containers[e].element[0], this.currentItem[0]) && !b) {
                        c.push(function(f) {
                            return function(g) {
                                f._trigger("receive", g, this._uiHash(this))
                            }
                        }.call(this, this.containers[e]));
                        c.push(function(f) {
                            return function(g) {
                                f._trigger("update", g, this._uiHash(this))
                            }
                        }.call(this, this.containers[e]))
                    }
            }
            for (e = this.containers.length - 1; e >= 0; e--) {
                b || c.push(function(f) {
                    return function(g) {
                        f._trigger("deactivate", g, this._uiHash(this))
                    }
                }.call(this,
                    this.containers[e]));
                if (this.containers[e].containerCache.over) {
                    c.push(function(f) {
                        return function(g) {
                            f._trigger("out", g, this._uiHash(this))
                        }
                    }.call(this, this.containers[e]));
                    this.containers[e].containerCache.over = 0
                }
            }
            this._storedCursor && d("body").css("cursor", this._storedCursor);
            this._storedOpacity && this.helper.css("opacity", this._storedOpacity);
            if (this._storedZIndex) this.helper.css("zIndex", this._storedZIndex == "auto" ? "" : this._storedZIndex);
            this.dragging = false;
            if (this.cancelHelperRemoval) {
                if (!b) {
                    this._trigger("beforeStop",
                        a, this._uiHash());
                    for (e = 0; e < c.length; e++) c[e].call(this, a);
                    this._trigger("stop", a, this._uiHash())
                }
                return false
            }
            b || this._trigger("beforeStop", a, this._uiHash());
            this.placeholder[0].parentNode.removeChild(this.placeholder[0]);
            this.helper[0] != this.currentItem[0] && this.helper.remove();
            this.helper = null;
            if (!b) {
                for (e = 0; e < c.length; e++) c[e].call(this, a);
                this._trigger("stop", a, this._uiHash())
            }
            this.fromOutside = false;
            return true
        },
        _trigger: function() {
            d.Widget.prototype._trigger.apply(this, arguments) === false && this.cancel()
        },
        _uiHash: function(a) {
            var b = a || this;
            return {
                helper: b.helper,
                placeholder: b.placeholder || d([]),
                position: b.position,
                originalPosition: b.originalPosition,
                offset: b.positionAbs,
                item: b.currentItem,
                sender: a ? a.element : null
            }
        }
    });
    d.extend(d.ui.sortable, {
        version: "1.8.15"
    })
})(jQuery);;
/*
 * jQuery UI Accordion 1.8.15
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Accordion
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 */
(function(c) {
    c.widget("ui.accordion", {
        options: {
            active: 0,
            animated: "slide",
            autoHeight: true,
            clearStyle: false,
            collapsible: false,
            event: "click",
            fillSpace: false,
            header: "> li > :first-child,> :not(li):even",
            icons: {
                header: "ui-icon-triangle-1-e",
                headerSelected: "ui-icon-triangle-1-s"
            },
            navigation: false,
            navigationFilter: function() {
                return this.href.toLowerCase() === location.href.toLowerCase()
            }
        },
        _create: function() {
            var a = this,
                b = a.options;
            a.running = 0;
            a.element.addClass("ui-accordion ui-widget ui-helper-reset").children("li").addClass("ui-accordion-li-fix");
            a.headers = a.element.find(b.header).addClass("ui-accordion-header ui-helper-reset ui-state-default ui-corner-all").bind("mouseenter.accordion", function() {
                b.disabled || c(this).addClass("ui-state-hover")
            }).bind("mouseleave.accordion", function() {
                b.disabled || c(this).removeClass("ui-state-hover")
            }).bind("focus.accordion", function() {
                b.disabled || c(this).addClass("ui-state-focus")
            }).bind("blur.accordion", function() {
                b.disabled || c(this).removeClass("ui-state-focus")
            });
            a.headers.next().addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom");
            if (b.navigation) {
                var d = a.element.find("a").filter(b.navigationFilter).eq(0);
                if (d.length) {
                    var h = d.closest(".ui-accordion-header");
                    a.active = h.length ? h : d.closest(".ui-accordion-content").prev()
                }
            }
            a.active = a._findActive(a.active || b.active).addClass("ui-state-default ui-state-active").toggleClass("ui-corner-all").toggleClass("ui-corner-top");
            a.active.next().addClass("ui-accordion-content-active");
            a._createIcons();
            a.resize();
            a.element.attr("role", "tablist");
            a.headers.attr("role", "tab").bind("keydown.accordion",
                function(f) {
                    return a._keydown(f)
                }).next().attr("role", "tabpanel");
            a.headers.not(a.active || "").attr({
                "aria-expanded": "false",
                "aria-selected": "false",
                tabIndex: -1
            }).next().hide();
            a.active.length ? a.active.attr({
                "aria-expanded": "true",
                "aria-selected": "true",
                tabIndex: 0
            }) : a.headers.eq(0).attr("tabIndex", 0);
            c.browser.safari || a.headers.find("a").attr("tabIndex", -1);
            b.event && a.headers.bind(b.event.split(" ").join(".accordion ") + ".accordion", function(f) {
                a._clickHandler.call(a, f, this);
                f.preventDefault()
            })
        },
        _createIcons: function() {
            var a =
                this.options;
            if (a.icons) {
                c("<span></span>").addClass("ui-icon " + a.icons.header).prependTo(this.headers);
                this.active.children(".ui-icon").toggleClass(a.icons.header).toggleClass(a.icons.headerSelected);
                this.element.addClass("ui-accordion-icons")
            }
        },
        _destroyIcons: function() {
            this.headers.children(".ui-icon").remove();
            this.element.removeClass("ui-accordion-icons")
        },
        destroy: function() {
            var a = this.options;
            this.element.removeClass("ui-accordion ui-widget ui-helper-reset").removeAttr("role");
            this.headers.unbind(".accordion").removeClass("ui-accordion-header ui-accordion-disabled ui-helper-reset ui-state-default ui-corner-all ui-state-active ui-state-disabled ui-corner-top").removeAttr("role").removeAttr("aria-expanded").removeAttr("aria-selected").removeAttr("tabIndex");
            this.headers.find("a").removeAttr("tabIndex");
            this._destroyIcons();
            var b = this.headers.next().css("display", "").removeAttr("role").removeClass("ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content ui-accordion-content-active ui-accordion-disabled ui-state-disabled");
            if (a.autoHeight || a.fillHeight) b.css("height", "");
            return c.Widget.prototype.destroy.call(this)
        },
        _setOption: function(a, b) {
            c.Widget.prototype._setOption.apply(this, arguments);
            a == "active" && this.activate(b);
            if (a == "icons") {
                this._destroyIcons();
                b && this._createIcons()
            }
            if (a == "disabled") this.headers.add(this.headers.next())[b ? "addClass" : "removeClass"]("ui-accordion-disabled ui-state-disabled")
        },
        _keydown: function(a) {
            if (!(this.options.disabled || a.altKey || a.ctrlKey)) {
                var b = c.ui.keyCode,
                    d = this.headers.length,
                    h = this.headers.index(a.target),
                    f = false;
                switch (a.keyCode) {
                    case b.RIGHT:
                    case b.DOWN:
                        f = this.headers[(h + 1) % d];
                        break;
                    case b.LEFT:
                    case b.UP:
                        f = this.headers[(h - 1 + d) % d];
                        break;
                    case b.SPACE:
                    case b.ENTER:
                        this._clickHandler({
                            target: a.target
                        }, a.target);
                        a.preventDefault()
                }
                if (f) {
                    c(a.target).attr("tabIndex", -1);
                    c(f).attr("tabIndex", 0);
                    f.focus();
                    return false
                }
                return true
            }
        },
        resize: function() {
            var a = this.options,
                b;
            if (a.fillSpace) {
                if (c.browser.msie) {
                    var d = this.element.parent().css("overflow");
                    this.element.parent().css("overflow", "hidden")
                }
                b = this.element.parent().height();
                c.browser.msie && this.element.parent().css("overflow", d);
                this.headers.each(function() {
                    b -= c(this).outerHeight(true)
                });
                this.headers.next().each(function() {
                    c(this).height(Math.max(0, b - c(this).innerHeight() +
                        c(this).height()))
                }).css("overflow", "auto")
            } else if (a.autoHeight) {
                b = 0;
                this.headers.next().each(function() {
                    b = Math.max(b, c(this).height("").height())
                }).height(b)
            }
            return this
        },
        activate: function(a) {
            this.options.active = a;
            a = this._findActive(a)[0];
            this._clickHandler({
                target: a
            }, a);
            return this
        },
        _findActive: function(a) {
            return a ? typeof a === "number" ? this.headers.filter(":eq(" + a + ")") : this.headers.not(this.headers.not(a)) : a === false ? c([]) : this.headers.filter(":eq(0)")
        },
        _clickHandler: function(a, b) {
            var d = this.options;
            if (!d.disabled)
                if (a.target) {
                    a = c(a.currentTarget || b);
                    b = a[0] === this.active[0];
                    d.active = d.collapsible && b ? false : this.headers.index(a);
                    if (!(this.running || !d.collapsible && b)) {
                        var h = this.active;
                        j = a.next();
                        g = this.active.next();
                        e = {
                            options: d,
                            newHeader: b && d.collapsible ? c([]) : a,
                            oldHeader: this.active,
                            newContent: b && d.collapsible ? c([]) : j,
                            oldContent: g
                        };
                        var f = this.headers.index(this.active[0]) > this.headers.index(a[0]);
                        this.active = b ? c([]) : a;
                        this._toggle(j, g, e, b, f);
                        h.removeClass("ui-state-active ui-corner-top").addClass("ui-state-default ui-corner-all").children(".ui-icon").removeClass(d.icons.headerSelected).addClass(d.icons.header);
                        if (!b) {
                            a.removeClass("ui-state-default ui-corner-all").addClass("ui-state-active ui-corner-top").children(".ui-icon").removeClass(d.icons.header).addClass(d.icons.headerSelected);
                            a.next().addClass("ui-accordion-content-active")
                        }
                    }
                } else if (d.collapsible) {
                this.active.removeClass("ui-state-active ui-corner-top").addClass("ui-state-default ui-corner-all").children(".ui-icon").removeClass(d.icons.headerSelected).addClass(d.icons.header);
                this.active.next().addClass("ui-accordion-content-active");
                var g = this.active.next(),
                    e = {
                        options: d,
                        newHeader: c([]),
                        oldHeader: d.active,
                        newContent: c([]),
                        oldContent: g
                    },
                    j = this.active = c([]);
                this._toggle(j, g, e)
            }
        },
        _toggle: function(a, b, d, h, f) {
            var g = this,
                e = g.options;
            g.toShow = a;
            g.toHide = b;
            g.data = d;
            var j = function() {
                if (g) return g._completed.apply(g, arguments)
            };
            g._trigger("changestart", null, g.data);
            g.running = b.size() === 0 ? a.size() : b.size();
            if (e.animated) {
                d = {};
                d = e.collapsible && h ? {
                    toShow: c([]),
                    toHide: b,
                    complete: j,
                    down: f,
                    autoHeight: e.autoHeight || e.fillSpace
                } : {
                    toShow: a,
                    toHide: b,
                    complete: j,
                    down: f,
                    autoHeight: e.autoHeight ||
                        e.fillSpace
                };
                if (!e.proxied) e.proxied = e.animated;
                if (!e.proxiedDuration) e.proxiedDuration = e.duration;
                e.animated = c.isFunction(e.proxied) ? e.proxied(d) : e.proxied;
                e.duration = c.isFunction(e.proxiedDuration) ? e.proxiedDuration(d) : e.proxiedDuration;
                h = c.ui.accordion.animations;
                var i = e.duration,
                    k = e.animated;
                if (k && !h[k] && !c.easing[k]) k = "slide";
                h[k] || (h[k] = function(l) {
                    this.slide(l, {
                        easing: k,
                        duration: i || 700
                    })
                });
                h[k](d)
            } else {
                if (e.collapsible && h) a.toggle();
                else {
                    b.hide();
                    a.show()
                }
                j(true)
            }
            b.prev().attr({
                "aria-expanded": "false",
                "aria-selected": "false",
                tabIndex: -1
            }).blur();
            a.prev().attr({
                "aria-expanded": "true",
                "aria-selected": "true",
                tabIndex: 0
            }).focus()
        },
        _completed: function(a) {
            this.running = a ? 0 : --this.running;
            if (!this.running) {
                this.options.clearStyle && this.toShow.add(this.toHide).css({
                    height: "",
                    overflow: ""
                });
                this.toHide.removeClass("ui-accordion-content-active");
                if (this.toHide.length) this.toHide.parent()[0].className = this.toHide.parent()[0].className;
                this._trigger("change", null, this.data)
            }
        }
    });
    c.extend(c.ui.accordion, {
        version: "1.8.15",
        animations: {
            slide: function(a, b) {
                a = c.extend({
                    easing: "swing",
                    duration: 300
                }, a, b);
                if (a.toHide.size())
                    if (a.toShow.size()) {
                        var d = a.toShow.css("overflow"),
                            h = 0,
                            f = {},
                            g = {},
                            e;
                        b = a.toShow;
                        e = b[0].style.width;
                        b.width(parseInt(b.parent().width(), 10) - parseInt(b.css("paddingLeft"), 10) - parseInt(b.css("paddingRight"), 10) - (parseInt(b.css("borderLeftWidth"), 10) || 0) - (parseInt(b.css("borderRightWidth"), 10) || 0));
                        c.each(["height", "paddingTop", "paddingBottom"], function(j, i) {
                            g[i] = "hide";
                            j = ("" + c.css(a.toShow[0], i)).match(/^([\d+-.]+)(.*)$/);
                            f[i] = {
                                value: j[1],
                                unit: j[2] || "px"
                            }
                        });
                        a.toShow.css({
                            height: 0,
                            overflow: "hidden"
                        }).show();
                        a.toHide.filter(":hidden").each(a.complete).end().filter(":visible").animate(g, {
                            step: function(j, i) {
                                if (i.prop == "height") h = i.end - i.start === 0 ? 0 : (i.now - i.start) / (i.end - i.start);
                                a.toShow[0].style[i.prop] = h * f[i.prop].value + f[i.prop].unit
                            },
                            duration: a.duration,
                            easing: a.easing,
                            complete: function() {
                                a.autoHeight || a.toShow.css("height", "");
                                a.toShow.css({
                                    width: e,
                                    overflow: d
                                });
                                a.complete()
                            }
                        })
                    } else a.toHide.animate({
                        height: "hide",
                        paddingTop: "hide",
                        paddingBottom: "hide"
                    }, a);
                else a.toShow.animate({
                    height: "show",
                    paddingTop: "show",
                    paddingBottom: "show"
                }, a)
            },
            bounceslide: function(a) {
                this.slide(a, {
                    easing: a.down ? "easeOutBounce" : "swing",
                    duration: a.down ? 1E3 : 200
                })
            }
        }
    })
})(jQuery);;
/*
 * jQuery UI Autocomplete 1.8.15
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Autocomplete
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 *	jquery.ui.position.js
 */
(function(d) {
    var e = 0;
    d.widget("ui.autocomplete", {
        options: {
            appendTo: "body",
            autoFocus: false,
            delay: 300,
            minLength: 1,
            position: {
                my: "left top",
                at: "left bottom",
                collision: "none"
            },
            source: null
        },
        pending: 0,
        _create: function() {
            var a = this,
                b = this.element[0].ownerDocument,
                g;
            this.element.addClass("ui-autocomplete-input").attr("autocomplete", "off").attr({
                role: "textbox",
                "aria-autocomplete": "list",
                "aria-haspopup": "true"
            }).bind("keydown.autocomplete", function(c) {
                if (!(a.options.disabled || a.element.propAttr("readOnly"))) {
                    g =
                        false;
                    var f = d.ui.keyCode;
                    switch (c.keyCode) {
                        case f.PAGE_UP:
                            a._move("previousPage", c);
                            break;
                        case f.PAGE_DOWN:
                            a._move("nextPage", c);
                            break;
                        case f.UP:
                            a._move("previous", c);
                            c.preventDefault();
                            break;
                        case f.DOWN:
                            a._move("next", c);
                            c.preventDefault();
                            break;
                        case f.ENTER:
                        case f.NUMPAD_ENTER:
                            if (a.menu.active) {
                                g = true;
                                c.preventDefault()
                            }
                        case f.TAB:
                            if (!a.menu.active) return;
                            a.menu.select(c);
                            break;
                        case f.ESCAPE:
                            a.element.val(a.term);
                            a.close(c);
                            break;
                        default:
                            clearTimeout(a.searching);
                            a.searching = setTimeout(function() {
                                if (a.term !=
                                    a.element.val()) {
                                    a.selectedItem = null;
                                    a.search(null, c)
                                }
                            }, a.options.delay);
                            break
                    }
                }
            }).bind("keypress.autocomplete", function(c) {
                if (g) {
                    g = false;
                    c.preventDefault()
                }
            }).bind("focus.autocomplete", function() {
                if (!a.options.disabled) {
                    a.selectedItem = null;
                    a.previous = a.element.val()
                }
            }).bind("blur.autocomplete", function(c) {
                if (!a.options.disabled) {
                    clearTimeout(a.searching);
                    a.closing = setTimeout(function() {
                        a.close(c);
                        a._change(c)
                    }, 150)
                }
            });
            this._initSource();
            this.response = function() {
                return a._response.apply(a, arguments)
            };
            this.menu = d("<ul></ul>").addClass("ui-autocomplete").appendTo(d(this.options.appendTo || "body", b)[0]).mousedown(function(c) {
                var f = a.menu.element[0];
                d(c.target).closest(".ui-menu-item").length || setTimeout(function() {
                    d(document).one("mousedown", function(h) {
                        h.target !== a.element[0] && h.target !== f && !d.ui.contains(f, h.target) && a.close()
                    })
                }, 1);
                setTimeout(function() {
                    clearTimeout(a.closing)
                }, 13)
            }).menu({
                focus: function(c, f) {
                    f = f.item.data("item.autocomplete");
                    false !== a._trigger("focus", c, {
                            item: f
                        }) && /^key/.test(c.originalEvent.type) &&
                        a.element.val(f.value)
                },
                selected: function(c, f) {
                    var h = f.item.data("item.autocomplete"),
                        i = a.previous;
                    if (a.element[0] !== b.activeElement) {
                        a.element.focus();
                        a.previous = i;
                        setTimeout(function() {
                            a.previous = i;
                            a.selectedItem = h
                        }, 1)
                    }
                    false !== a._trigger("select", c, {
                        item: h
                    }) && a.element.val(h.value);
                    a.term = a.element.val();
                    a.close(c);
                    a.selectedItem = h
                },
                blur: function() {
                    a.menu.element.is(":visible") && a.element.val() !== a.term && a.element.val(a.term)
                }
            }).zIndex(this.element.zIndex() + 1).css({
                top: 0,
                left: 0
            }).hide().data("menu");
            d.fn.bgiframe && this.menu.element.bgiframe()
        },
        destroy: function() {
            this.element.removeClass("ui-autocomplete-input").removeAttr("autocomplete").removeAttr("role").removeAttr("aria-autocomplete").removeAttr("aria-haspopup");
            this.menu.element.remove();
            d.Widget.prototype.destroy.call(this)
        },
        _setOption: function(a, b) {
            d.Widget.prototype._setOption.apply(this, arguments);
            a === "source" && this._initSource();
            if (a === "appendTo") this.menu.element.appendTo(d(b || "body", this.element[0].ownerDocument)[0]);
            a === "disabled" &&
                b && this.xhr && this.xhr.abort()
        },
        _initSource: function() {
            var a = this,
                b, g;
            if (d.isArray(this.options.source)) {
                b = this.options.source;
                this.source = function(c, f) {
                    f(d.ui.autocomplete.filter(b, c.term))
                }
            } else if (typeof this.options.source === "string") {
                g = this.options.source;
                this.source = function(c, f) {
                    a.xhr && a.xhr.abort();
                    a.xhr = d.ajax({
                        url: g,
                        data: c,
                        dataType: "json",
                        autocompleteRequest: ++e,
                        success: function(h) {
                            this.autocompleteRequest === e && f(h)
                        },
                        error: function() {
                            this.autocompleteRequest === e && f([])
                        }
                    })
                }
            } else this.source =
                this.options.source
        },
        search: function(a, b) {
            a = a != null ? a : this.element.val();
            this.term = this.element.val();
            if (a.length < this.options.minLength) return this.close(b);
            clearTimeout(this.closing);
            if (this._trigger("search", b) !== false) return this._search(a)
        },
        _search: function(a) {
            this.pending++;
            this.element.addClass("ui-autocomplete-loading");
            this.source({
                term: a
            }, this.response)
        },
        _response: function(a) {
            if (!this.options.disabled && a && a.length) {
                a = this._normalize(a);
                this._suggest(a);
                this._trigger("open")
            } else this.close();
            this.pending--;
            this.pending || this.element.removeClass("ui-autocomplete-loading")
        },
        close: function(a) {
            clearTimeout(this.closing);
            if (this.menu.element.is(":visible")) {
                this.menu.element.hide();
                this.menu.deactivate();
                this._trigger("close", a)
            }
        },
        _change: function(a) {
            this.previous !== this.element.val() && this._trigger("change", a, {
                item: this.selectedItem
            })
        },
        _normalize: function(a) {
            if (a.length && a[0].label && a[0].value) return a;
            return d.map(a, function(b) {
                if (typeof b === "string") return {
                    label: b,
                    value: b
                };
                return d.extend({
                    label: b.label ||
                        b.value,
                    value: b.value || b.label
                }, b)
            })
        },
        _suggest: function(a) {
            var b = this.menu.element.empty().zIndex(this.element.zIndex() + 1);
            this._renderMenu(b, a);
            this.menu.deactivate();
            this.menu.refresh();
            b.show();
            this._resizeMenu();
            b.position(d.extend({ of: this.element
            }, this.options.position));
            this.options.autoFocus && this.menu.next(new d.Event("mouseover"))
        },
        _resizeMenu: function() {
            var a = this.menu.element;
            a.outerWidth(Math.max(a.width("").outerWidth(), this.element.outerWidth()))
        },
        _renderMenu: function(a, b) {
            var g = this;
            d.each(b, function(c, f) {
                g._renderItem(a, f)
            })
        },
        _renderItem: function(a, b) {
            return d("<li></li>").data("item.autocomplete", b).append(d("<a></a>").text(b.label)).appendTo(a)
        },
        _move: function(a, b) {
            if (this.menu.element.is(":visible"))
                if (this.menu.first() && /^previous/.test(a) || this.menu.last() && /^next/.test(a)) {
                    this.element.val(this.term);
                    this.menu.deactivate()
                } else this.menu[a](b);
            else this.search(null, b)
        },
        widget: function() {
            return this.menu.element
        }
    });
    d.extend(d.ui.autocomplete, {
        escapeRegex: function(a) {
            return a.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,
                "\\$&")
        },
        filter: function(a, b) {
            var g = new RegExp(d.ui.autocomplete.escapeRegex(b), "i");
            return d.grep(a, function(c) {
                return g.test(c.label || c.value || c)
            })
        }
    })
})(jQuery);
(function(d) {
    d.widget("ui.menu", {
        _create: function() {
            var e = this;
            this.element.addClass("ui-menu ui-widget ui-widget-content ui-corner-all").attr({
                role: "listbox",
                "aria-activedescendant": "ui-active-menuitem"
            }).click(function(a) {
                if (d(a.target).closest(".ui-menu-item a").length) {
                    a.preventDefault();
                    e.select(a)
                }
            });
            this.refresh()
        },
        refresh: function() {
            var e = this;
            this.element.children("li:not(.ui-menu-item):has(a)").addClass("ui-menu-item").attr("role", "menuitem").children("a").addClass("ui-corner-all").attr("tabindex", -1).mouseenter(function(a) {
                e.activate(a, d(this).parent())
            }).mouseleave(function() {
                e.deactivate()
            })
        },
        activate: function(e, a) {
            this.deactivate();
            if (this.hasScroll()) {
                var b = a.offset().top - this.element.offset().top,
                    g = this.element.scrollTop(),
                    c = this.element.height();
                if (b < 0) this.element.scrollTop(g + b);
                else b >= c && this.element.scrollTop(g + b - c + a.height())
            }
            this.active = a.eq(0).children("a").addClass("ui-state-hover").attr("id", "ui-active-menuitem").end();
            this._trigger("focus", e, {
                item: a
            })
        },
        deactivate: function() {
            if (this.active) {
                this.active.children("a").removeClass("ui-state-hover").removeAttr("id");
                this._trigger("blur");
                this.active = null
            }
        },
        next: function(e) {
            this.move("next", ".ui-menu-item:first", e)
        },
        previous: function(e) {
            this.move("prev", ".ui-menu-item:last", e)
        },
        first: function() {
            return this.active && !this.active.prevAll(".ui-menu-item").length
        },
        last: function() {
            return this.active && !this.active.nextAll(".ui-menu-item").length
        },
        move: function(e, a, b) {
            if (this.active) {
                e = this.active[e + "All"](".ui-menu-item").eq(0);
                e.length ? this.activate(b, e) : this.activate(b, this.element.children(a))
            } else this.activate(b,
                this.element.children(a))
        },
        nextPage: function(e) {
            if (this.hasScroll())
                if (!this.active || this.last()) this.activate(e, this.element.children(".ui-menu-item:first"));
                else {
                    var a = this.active.offset().top,
                        b = this.element.height(),
                        g = this.element.children(".ui-menu-item").filter(function() {
                            var c = d(this).offset().top - a - b + d(this).height();
                            return c < 10 && c > -10
                        });
                    g.length || (g = this.element.children(".ui-menu-item:last"));
                    this.activate(e, g)
                }
            else this.activate(e, this.element.children(".ui-menu-item").filter(!this.active ||
                this.last() ? ":first" : ":last"))
        },
        previousPage: function(e) {
            if (this.hasScroll())
                if (!this.active || this.first()) this.activate(e, this.element.children(".ui-menu-item:last"));
                else {
                    var a = this.active.offset().top,
                        b = this.element.height();
                    result = this.element.children(".ui-menu-item").filter(function() {
                        var g = d(this).offset().top - a + b - d(this).height();
                        return g < 10 && g > -10
                    });
                    result.length || (result = this.element.children(".ui-menu-item:first"));
                    this.activate(e, result)
                }
            else this.activate(e, this.element.children(".ui-menu-item").filter(!this.active ||
                this.first() ? ":last" : ":first"))
        },
        hasScroll: function() {
            return this.element.height() < this.element[d.fn.prop ? "prop" : "attr"]("scrollHeight")
        },
        select: function(e) {
            this._trigger("selected", e, {
                item: this.active
            })
        }
    })
})(jQuery);;
/*
 * jQuery UI Button 1.8.15
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Button
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 */
(function(b) {
    var h, i, j, g, l = function() {
            var a = b(this).find(":ui-button");
            setTimeout(function() {
                a.button("refresh")
            }, 1)
        },
        k = function(a) {
            var c = a.name,
                e = a.form,
                f = b([]);
            if (c) f = e ? b(e).find("[name='" + c + "']") : b("[name='" + c + "']", a.ownerDocument).filter(function() {
                return !this.form
            });
            return f
        };
    b.widget("ui.button", {
        options: {
            disabled: null,
            text: true,
            label: null,
            icons: {
                primary: null,
                secondary: null
            }
        },
        _create: function() {
            this.element.closest("form").unbind("reset.button").bind("reset.button", l);
            if (typeof this.options.disabled !==
                "boolean") this.options.disabled = this.element.propAttr("disabled");
            this._determineButtonType();
            this.hasTitle = !!this.buttonElement.attr("title");
            var a = this,
                c = this.options,
                e = this.type === "checkbox" || this.type === "radio",
                f = "ui-state-hover" + (!e ? " ui-state-active" : "");
            if (c.label === null) c.label = this.buttonElement.html();
            if (this.element.is(":disabled")) c.disabled = true;
            this.buttonElement.addClass("ui-button ui-widget ui-state-default ui-corner-all").attr("role", "button").bind("mouseenter.button", function() {
                if (!c.disabled) {
                    b(this).addClass("ui-state-hover");
                    this === h && b(this).addClass("ui-state-active")
                }
            }).bind("mouseleave.button", function() {
                c.disabled || b(this).removeClass(f)
            }).bind("click.button", function(d) {
                if (c.disabled) {
                    d.preventDefault();
                    d.stopImmediatePropagation()
                }
            });
            this.element.bind("focus.button", function() {
                a.buttonElement.addClass("ui-state-focus")
            }).bind("blur.button", function() {
                a.buttonElement.removeClass("ui-state-focus")
            });
            if (e) {
                this.element.bind("change.button", function() {
                    g || a.refresh()
                });
                this.buttonElement.bind("mousedown.button", function(d) {
                    if (!c.disabled) {
                        g =
                            false;
                        i = d.pageX;
                        j = d.pageY
                    }
                }).bind("mouseup.button", function(d) {
                    if (!c.disabled)
                        if (i !== d.pageX || j !== d.pageY) g = true
                })
            }
            if (this.type === "checkbox") this.buttonElement.bind("click.button", function() {
                if (c.disabled || g) return false;
                b(this).toggleClass("ui-state-active");
                a.buttonElement.attr("aria-pressed", a.element[0].checked)
            });
            else if (this.type === "radio") this.buttonElement.bind("click.button", function() {
                if (c.disabled || g) return false;
                b(this).addClass("ui-state-active");
                a.buttonElement.attr("aria-pressed", "true");
                var d = a.element[0];
                k(d).not(d).map(function() {
                    return b(this).button("widget")[0]
                }).removeClass("ui-state-active").attr("aria-pressed", "false")
            });
            else {
                this.buttonElement.bind("mousedown.button", function() {
                    if (c.disabled) return false;
                    b(this).addClass("ui-state-active");
                    h = this;
                    b(document).one("mouseup", function() {
                        h = null
                    })
                }).bind("mouseup.button", function() {
                    if (c.disabled) return false;
                    b(this).removeClass("ui-state-active")
                }).bind("keydown.button", function(d) {
                    if (c.disabled) return false;
                    if (d.keyCode == b.ui.keyCode.SPACE ||
                        d.keyCode == b.ui.keyCode.ENTER) b(this).addClass("ui-state-active")
                }).bind("keyup.button", function() {
                    b(this).removeClass("ui-state-active")
                });
                this.buttonElement.is("a") && this.buttonElement.keyup(function(d) {
                    d.keyCode === b.ui.keyCode.SPACE && b(this).click()
                })
            }
            this._setOption("disabled", c.disabled);
            this._resetButton()
        },
        _determineButtonType: function() {
            this.type = this.element.is(":checkbox") ? "checkbox" : this.element.is(":radio") ? "radio" : this.element.is("input") ? "input" : "button";
            if (this.type === "checkbox" || this.type ===
                "radio") {
                var a = this.element.parents().filter(":last"),
                    c = "label[for=" + this.element.attr("id") + "]";
                this.buttonElement = a.find(c);
                if (!this.buttonElement.length) {
                    a = a.length ? a.siblings() : this.element.siblings();
                    this.buttonElement = a.filter(c);
                    if (!this.buttonElement.length) this.buttonElement = a.find(c)
                }
                this.element.addClass("ui-helper-hidden-accessible");
                (a = this.element.is(":checked")) && this.buttonElement.addClass("ui-state-active");
                this.buttonElement.attr("aria-pressed", a)
            } else this.buttonElement = this.element
        },
        widget: function() {
            return this.buttonElement
        },
        destroy: function() {
            this.element.removeClass("ui-helper-hidden-accessible");
            this.buttonElement.removeClass("ui-button ui-widget ui-state-default ui-corner-all ui-state-hover ui-state-active  ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only").removeAttr("role").removeAttr("aria-pressed").html(this.buttonElement.find(".ui-button-text").html());
            this.hasTitle || this.buttonElement.removeAttr("title");
            b.Widget.prototype.destroy.call(this)
        },
        _setOption: function(a, c) {
            b.Widget.prototype._setOption.apply(this, arguments);
            if (a === "disabled") c ? this.element.propAttr("disabled", true) : this.element.propAttr("disabled", false);
            else this._resetButton()
        },
        refresh: function() {
            var a = this.element.is(":disabled");
            a !== this.options.disabled && this._setOption("disabled", a);
            if (this.type === "radio") k(this.element[0]).each(function() {
                b(this).is(":checked") ? b(this).button("widget").addClass("ui-state-active").attr("aria-pressed",
                    "true") : b(this).button("widget").removeClass("ui-state-active").attr("aria-pressed", "false")
            });
            else if (this.type === "checkbox") this.element.is(":checked") ? this.buttonElement.addClass("ui-state-active").attr("aria-pressed", "true") : this.buttonElement.removeClass("ui-state-active").attr("aria-pressed", "false")
        },
        _resetButton: function() {
            if (this.type === "input") this.options.label && this.element.val(this.options.label);
            else {
                var a = this.buttonElement.removeClass("ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only"),
                    c = b("<span></span>").addClass("ui-button-text").html(this.options.label).appendTo(a.empty()).text(),
                    e = this.options.icons,
                    f = e.primary && e.secondary,
                    d = [];
                if (e.primary || e.secondary) {
                    if (this.options.text) d.push("ui-button-text-icon" + (f ? "s" : e.primary ? "-primary" : "-secondary"));
                    e.primary && a.prepend("<span class='ui-button-icon-primary ui-icon " + e.primary + "'></span>");
                    e.secondary && a.append("<span class='ui-button-icon-secondary ui-icon " + e.secondary + "'></span>");
                    if (!this.options.text) {
                        d.push(f ? "ui-button-icons-only" :
                            "ui-button-icon-only");
                        this.hasTitle || a.attr("title", c)
                    }
                } else d.push("ui-button-text-only");
                a.addClass(d.join(" "))
            }
        }
    });
    b.widget("ui.buttonset", {
        options: {
            items: ":button, :submit, :reset, :checkbox, :radio, a, :data(button)"
        },
        _create: function() {
            this.element.addClass("ui-buttonset")
        },
        _init: function() {
            this.refresh()
        },
        _setOption: function(a, c) {
            a === "disabled" && this.buttons.button("option", a, c);
            b.Widget.prototype._setOption.apply(this, arguments)
        },
        refresh: function() {
            var a = this.element.css("direction") ===
                "ltr";
            this.buttons = this.element.find(this.options.items).filter(":ui-button").button("refresh").end().not(":ui-button").button().end().map(function() {
                return b(this).button("widget")[0]
            }).removeClass("ui-corner-all ui-corner-left ui-corner-right").filter(":first").addClass(a ? "ui-corner-left" : "ui-corner-right").end().filter(":last").addClass(a ? "ui-corner-right" : "ui-corner-left").end().end()
        },
        destroy: function() {
            this.element.removeClass("ui-buttonset");
            this.buttons.map(function() {
                return b(this).button("widget")[0]
            }).removeClass("ui-corner-left ui-corner-right").end().button("destroy");
            b.Widget.prototype.destroy.call(this)
        }
    })
})(jQuery);;
/*
 * jQuery UI Dialog 1.8.15
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Dialog
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 *  jquery.ui.button.js
 *	jquery.ui.draggable.js
 *	jquery.ui.mouse.js
 *	jquery.ui.position.js
 *	jquery.ui.resizable.js
 */
(function(c, l) {
    var m = {
            buttons: true,
            height: true,
            maxHeight: true,
            maxWidth: true,
            minHeight: true,
            minWidth: true,
            width: true
        },
        n = {
            maxHeight: true,
            maxWidth: true,
            minHeight: true,
            minWidth: true
        },
        o = c.attrFn || {
            val: true,
            css: true,
            html: true,
            text: true,
            data: true,
            width: true,
            height: true,
            offset: true,
            click: true
        };
    c.widget("ui.dialog", {
        options: {
            autoOpen: true,
            buttons: {},
            closeOnEscape: true,
            closeText: "close",
            dialogClass: "",
            draggable: true,
            hide: null,
            height: "auto",
            maxHeight: false,
            maxWidth: false,
            minHeight: 150,
            minWidth: 150,
            modal: false,
            position: {
                my: "center",
                at: "center",
                collision: "fit",
                using: function(a) {
                    var b = c(this).css(a).offset().top;
                    b < 0 && c(this).css("top", a.top - b)
                }
            },
            resizable: true,
            show: null,
            stack: true,
            title: "",
            width: 300,
            zIndex: 1E3
        },
        _create: function() {
            this.originalTitle = this.element.attr("title");
            if (typeof this.originalTitle !== "string") this.originalTitle = "";
            this.options.title = this.options.title || this.originalTitle;
            var a = this,
                b = a.options,
                d = b.title || "&#160;",
                e = c.ui.dialog.getTitleId(a.element),
                g = (a.uiDialog = c("<div></div>")).appendTo(document.body).hide().addClass("ui-dialog ui-widget ui-widget-content ui-corner-all " +
                    b.dialogClass).css({
                    zIndex: b.zIndex
                }).attr("tabIndex", -1).css("outline", 0).keydown(function(i) {
                    if (b.closeOnEscape && i.keyCode && i.keyCode === c.ui.keyCode.ESCAPE) {
                        a.close(i);
                        i.preventDefault()
                    }
                }).attr({
                    role: "dialog",
                    "aria-labelledby": e
                }).mousedown(function(i) {
                    a.moveToTop(false, i)
                });
            a.element.show().removeAttr("title").addClass("ui-dialog-content ui-widget-content").appendTo(g);
            var f = (a.uiDialogTitlebar = c("<div></div>")).addClass("ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix").prependTo(g),
                h = c('<a href="#"></a>').addClass("ui-dialog-titlebar-close ui-corner-all").attr("role", "button").hover(function() {
                    h.addClass("ui-state-hover")
                }, function() {
                    h.removeClass("ui-state-hover")
                }).focus(function() {
                    h.addClass("ui-state-focus")
                }).blur(function() {
                    h.removeClass("ui-state-focus")
                }).click(function(i) {
                    a.close(i);
                    return false
                }).appendTo(f);
            (a.uiDialogTitlebarCloseText = c("<span></span>")).addClass("ui-icon ui-icon-closethick").text(b.closeText).appendTo(h);
            c("<span></span>").addClass("ui-dialog-title").attr("id",
                e).html(d).prependTo(f);
            if (c.isFunction(b.beforeclose) && !c.isFunction(b.beforeClose)) b.beforeClose = b.beforeclose;
            f.find("*").add(f).disableSelection();
            b.draggable && c.fn.draggable && a._makeDraggable();
            b.resizable && c.fn.resizable && a._makeResizable();
            a._createButtons(b.buttons);
            a._isOpen = false;
            c.fn.bgiframe && g.bgiframe()
        },
        _init: function() {
            this.options.autoOpen && this.open()
        },
        destroy: function() {
            var a = this;
            a.overlay && a.overlay.destroy();
            a.uiDialog.hide();
            a.element.unbind(".dialog").removeData("dialog").removeClass("ui-dialog-content ui-widget-content").hide().appendTo("body");
            a.uiDialog.remove();
            a.originalTitle && a.element.attr("title", a.originalTitle);
            return a
        },
        widget: function() {
            return this.uiDialog
        },
        close: function(a) {
            var b = this,
                d, e;
            if (false !== b._trigger("beforeClose", a)) {
                b.overlay && b.overlay.destroy();
                b.uiDialog.unbind("keypress.ui-dialog");
                b._isOpen = false;
                if (b.options.hide) b.uiDialog.hide(b.options.hide, function() {
                    b._trigger("close", a)
                });
                else {
                    b.uiDialog.hide();
                    b._trigger("close", a)
                }
                c.ui.dialog.overlay.resize();
                if (b.options.modal) {
                    d = 0;
                    c(".ui-dialog").each(function() {
                        if (this !==
                            b.uiDialog[0]) {
                            e = c(this).css("z-index");
                            isNaN(e) || (d = Math.max(d, e))
                        }
                    });
                    c.ui.dialog.maxZ = d
                }
                return b
            }
        },
        isOpen: function() {
            return this._isOpen
        },
        moveToTop: function(a, b) {
            var d = this,
                e = d.options;
            if (e.modal && !a || !e.stack && !e.modal) return d._trigger("focus", b);
            if (e.zIndex > c.ui.dialog.maxZ) c.ui.dialog.maxZ = e.zIndex;
            if (d.overlay) {
                c.ui.dialog.maxZ += 1;
                d.overlay.$el.css("z-index", c.ui.dialog.overlay.maxZ = c.ui.dialog.maxZ)
            }
            a = {
                scrollTop: d.element.scrollTop(),
                scrollLeft: d.element.scrollLeft()
            };
            c.ui.dialog.maxZ += 1;
            d.uiDialog.css("z-index", c.ui.dialog.maxZ);
            d.element.attr(a);
            d._trigger("focus", b);
            return d
        },
        open: function() {
            if (!this._isOpen) {
                var a = this,
                    b = a.options,
                    d = a.uiDialog;
                a.overlay = b.modal ? new c.ui.dialog.overlay(a) : null;
                a._size();
                a._position(b.position);
                d.show(b.show);
                a.moveToTop(true);
                b.modal && d.bind("keypress.ui-dialog", function(e) {
                    if (e.keyCode === c.ui.keyCode.TAB) {
                        var g = c(":tabbable", this),
                            f = g.filter(":first");
                        g = g.filter(":last");
                        if (e.target === g[0] && !e.shiftKey) {
                            f.focus(1);
                            return false
                        } else if (e.target ===
                            f[0] && e.shiftKey) {
                            g.focus(1);
                            return false
                        }
                    }
                });
                c(a.element.find(":tabbable").get().concat(d.find(".ui-dialog-buttonpane :tabbable").get().concat(d.get()))).eq(0).focus();
                a._isOpen = true;
                a._trigger("open");
                return a
            }
        },
        _createButtons: function(a) {
            var b = this,
                d = false,
                e = c("<div></div>").addClass("ui-dialog-buttonpane ui-widget-content ui-helper-clearfix"),
                g = c("<div></div>").addClass("ui-dialog-buttonset").appendTo(e);
            b.uiDialog.find(".ui-dialog-buttonpane").remove();
            typeof a === "object" && a !== null && c.each(a,
                function() {
                    return !(d = true)
                });
            if (d) {
                c.each(a, function(f, h) {
                    h = c.isFunction(h) ? {
                        click: h,
                        text: f
                    } : h;
                    var i = c('<button type="button"></button>').click(function() {
                        h.click.apply(b.element[0], arguments)
                    }).appendTo(g);
                    c.each(h, function(j, k) {
                        if (j !== "click") j in o ? i[j](k) : i.attr(j, k)
                    });
                    c.fn.button && i.button()
                });
                e.appendTo(b.uiDialog)
            }
        },
        _makeDraggable: function() {
            function a(f) {
                return {
                    position: f.position,
                    offset: f.offset
                }
            }
            var b = this,
                d = b.options,
                e = c(document),
                g;
            b.uiDialog.draggable({
                cancel: ".ui-dialog-content, .ui-dialog-titlebar-close",
                handle: ".ui-dialog-titlebar",
                containment: "document",
                start: function(f, h) {
                    g = d.height === "auto" ? "auto" : c(this).height();
                    c(this).height(c(this).height()).addClass("ui-dialog-dragging");
                    b._trigger("dragStart", f, a(h))
                },
                drag: function(f, h) {
                    b._trigger("drag", f, a(h))
                },
                stop: function(f, h) {
                    d.position = [h.position.left - e.scrollLeft(), h.position.top - e.scrollTop()];
                    c(this).removeClass("ui-dialog-dragging").height(g);
                    b._trigger("dragStop", f, a(h));
                    c.ui.dialog.overlay.resize()
                }
            })
        },
        _makeResizable: function(a) {
            function b(f) {
                return {
                    originalPosition: f.originalPosition,
                    originalSize: f.originalSize,
                    position: f.position,
                    size: f.size
                }
            }
            a = a === l ? this.options.resizable : a;
            var d = this,
                e = d.options,
                g = d.uiDialog.css("position");
            a = typeof a === "string" ? a : "n,e,s,w,se,sw,ne,nw";
            d.uiDialog.resizable({
                cancel: ".ui-dialog-content",
                containment: "document",
                alsoResize: d.element,
                maxWidth: e.maxWidth,
                maxHeight: e.maxHeight,
                minWidth: e.minWidth,
                minHeight: d._minHeight(),
                handles: a,
                start: function(f, h) {
                    c(this).addClass("ui-dialog-resizing");
                    d._trigger("resizeStart", f, b(h))
                },
                resize: function(f, h) {
                    d._trigger("resize",
                        f, b(h))
                },
                stop: function(f, h) {
                    c(this).removeClass("ui-dialog-resizing");
                    e.height = c(this).height();
                    e.width = c(this).width();
                    d._trigger("resizeStop", f, b(h));
                    c.ui.dialog.overlay.resize()
                }
            }).css("position", g).find(".ui-resizable-se").addClass("ui-icon ui-icon-grip-diagonal-se")
        },
        _minHeight: function() {
            var a = this.options;
            return a.height === "auto" ? a.minHeight : Math.min(a.minHeight, a.height)
        },
        _position: function(a) {
            var b = [],
                d = [0, 0],
                e;
            if (a) {
                if (typeof a === "string" || typeof a === "object" && "0" in a) {
                    b = a.split ? a.split(" ") : [a[0], a[1]];
                    if (b.length === 1) b[1] = b[0];
                    c.each(["left", "top"], function(g, f) {
                        if (+b[g] === b[g]) {
                            d[g] = b[g];
                            b[g] = f
                        }
                    });
                    a = {
                        my: b.join(" "),
                        at: b.join(" "),
                        offset: d.join(" ")
                    }
                }
                a = c.extend({}, c.ui.dialog.prototype.options.position, a)
            } else a = c.ui.dialog.prototype.options.position;
            (e = this.uiDialog.is(":visible")) || this.uiDialog.show();
            this.uiDialog.css({
                top: 0,
                left: 0
            }).position(c.extend({ of: window
            }, a));
            e || this.uiDialog.hide()
        },
        _setOptions: function(a) {
            var b = this,
                d = {},
                e = false;
            c.each(a, function(g, f) {
                b._setOption(g, f);
                if (g in m) e = true;
                if (g in n) d[g] = f
            });
            e && this._size();
            this.uiDialog.is(":data(resizable)") && this.uiDialog.resizable("option", d)
        },
        _setOption: function(a, b) {
            var d = this,
                e = d.uiDialog;
            switch (a) {
                case "beforeclose":
                    a = "beforeClose";
                    break;
                case "buttons":
                    d._createButtons(b);
                    break;
                case "closeText":
                    d.uiDialogTitlebarCloseText.text("" + b);
                    break;
                case "dialogClass":
                    e.removeClass(d.options.dialogClass).addClass("ui-dialog ui-widget ui-widget-content ui-corner-all " + b);
                    break;
                case "disabled":
                    b ? e.addClass("ui-dialog-disabled") :
                        e.removeClass("ui-dialog-disabled");
                    break;
                case "draggable":
                    var g = e.is(":data(draggable)");
                    g && !b && e.draggable("destroy");
                    !g && b && d._makeDraggable();
                    break;
                case "position":
                    d._position(b);
                    break;
                case "resizable":
                    (g = e.is(":data(resizable)")) && !b && e.resizable("destroy");
                    g && typeof b === "string" && e.resizable("option", "handles", b);
                    !g && b !== false && d._makeResizable(b);
                    break;
                case "title":
                    c(".ui-dialog-title", d.uiDialogTitlebar).html("" + (b || "&#160;"));
                    break
            }
            c.Widget.prototype._setOption.apply(d, arguments)
        },
        _size: function() {
            var a =
                this.options,
                b, d, e = this.uiDialog.is(":visible");
            this.element.show().css({
                width: "auto",
                minHeight: 0,
                height: 0
            });
            if (a.minWidth > a.width) a.width = a.minWidth;
            b = this.uiDialog.css({
                height: "auto",
                width: a.width
            }).height();
            d = Math.max(0, a.minHeight - b);
            if (a.height === "auto")
                if (c.support.minHeight) this.element.css({
                    minHeight: d,
                    height: "auto"
                });
                else {
                    this.uiDialog.show();
                    a = this.element.css("height", "auto").height();
                    e || this.uiDialog.hide();
                    this.element.height(Math.max(a, d))
                }
            else this.element.height(Math.max(a.height -
                b, 0));
            this.uiDialog.is(":data(resizable)") && this.uiDialog.resizable("option", "minHeight", this._minHeight())
        }
    });
    c.extend(c.ui.dialog, {
        version: "1.8.15",
        uuid: 0,
        maxZ: 0,
        getTitleId: function(a) {
            a = a.attr("id");
            if (!a) {
                this.uuid += 1;
                a = this.uuid
            }
            return "ui-dialog-title-" + a
        },
        overlay: function(a) {
            this.$el = c.ui.dialog.overlay.create(a)
        }
    });
    c.extend(c.ui.dialog.overlay, {
        instances: [],
        oldInstances: [],
        maxZ: 0,
        events: c.map("focus,mousedown,mouseup,keydown,keypress,click".split(","), function(a) {
            return a + ".dialog-overlay"
        }).join(" "),
        create: function(a) {
            if (this.instances.length === 0) {
                setTimeout(function() {
                    c.ui.dialog.overlay.instances.length && c(document).bind(c.ui.dialog.overlay.events, function(d) {
                        if (c(d.target).zIndex() < c.ui.dialog.overlay.maxZ) return false
                    })
                }, 1);
                c(document).bind("keydown.dialog-overlay", function(d) {
                    if (a.options.closeOnEscape && d.keyCode && d.keyCode === c.ui.keyCode.ESCAPE) {
                        a.close(d);
                        d.preventDefault()
                    }
                });
                c(window).bind("resize.dialog-overlay", c.ui.dialog.overlay.resize)
            }
            var b = (this.oldInstances.pop() || c("<div></div>").addClass("ui-widget-overlay")).appendTo(document.body).css({
                width: this.width(),
                height: this.height()
            });
            c.fn.bgiframe && b.bgiframe();
            this.instances.push(b);
            return b
        },
        destroy: function(a) {
            var b = c.inArray(a, this.instances);
            b != -1 && this.oldInstances.push(this.instances.splice(b, 1)[0]);
            this.instances.length === 0 && c([document, window]).unbind(".dialog-overlay");
            a.remove();
            var d = 0;
            c.each(this.instances, function() {
                d = Math.max(d, this.css("z-index"))
            });
            this.maxZ = d
        },
        height: function() {
            var a, b;
            if (c.browser.msie && c.browser.version < 7) {
                a = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
                b = Math.max(document.documentElement.offsetHeight, document.body.offsetHeight);
                return a < b ? c(window).height() + "px" : a + "px"
            } else return c(document).height() + "px"
        },
        width: function() {
            var a, b;
            if (c.browser.msie) {
                a = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth);
                b = Math.max(document.documentElement.offsetWidth, document.body.offsetWidth);
                return a < b ? c(window).width() + "px" : a + "px"
            } else return c(document).width() + "px"
        },
        resize: function() {
            var a = c([]);
            c.each(c.ui.dialog.overlay.instances, function() {
                a =
                    a.add(this)
            });
            a.css({
                width: 0,
                height: 0
            }).css({
                width: c.ui.dialog.overlay.width(),
                height: c.ui.dialog.overlay.height()
            })
        }
    });
    c.extend(c.ui.dialog.overlay.prototype, {
        destroy: function() {
            c.ui.dialog.overlay.destroy(this.$el)
        }
    })
})(jQuery);;
/*
 * jQuery UI Slider 1.8.15
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Slider
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.mouse.js
 *	jquery.ui.widget.js
 */
(function(d) {
    d.widget("ui.slider", d.ui.mouse, {
        widgetEventPrefix: "slide",
        options: {
            animate: false,
            distance: 0,
            max: 100,
            min: 0,
            orientation: "horizontal",
            range: false,
            step: 1,
            value: 0,
            values: null
        },
        _create: function() {
            var a = this,
                b = this.options,
                c = this.element.find(".ui-slider-handle").addClass("ui-state-default ui-corner-all"),
                f = b.values && b.values.length || 1,
                e = [];
            this._mouseSliding = this._keySliding = false;
            this._animateOff = true;
            this._handleIndex = null;
            this._detectOrientation();
            this._mouseInit();
            this.element.addClass("ui-slider ui-slider-" +
                this.orientation + " ui-widget ui-widget-content ui-corner-all" + (b.disabled ? " ui-slider-disabled ui-disabled" : ""));
            this.range = d([]);
            if (b.range) {
                if (b.range === true) {
                    if (!b.values) b.values = [this._valueMin(), this._valueMin()];
                    if (b.values.length && b.values.length !== 2) b.values = [b.values[0], b.values[0]]
                }
                this.range = d("<div></div>").appendTo(this.element).addClass("ui-slider-range ui-widget-header" + (b.range === "min" || b.range === "max" ? " ui-slider-range-" + b.range : ""))
            }
            for (var j = c.length; j < f; j += 1) e.push("<a class='ui-slider-handle ui-state-default ui-corner-all' href='#'></a>");
            this.handles = c.add(d(e.join("")).appendTo(a.element));
            this.handle = this.handles.eq(0);
            this.handles.add(this.range).filter("a").click(function(g) {
                g.preventDefault()
            }).hover(function() {
                b.disabled || d(this).addClass("ui-state-hover")
            }, function() {
                d(this).removeClass("ui-state-hover")
            }).focus(function() {
                if (b.disabled) d(this).blur();
                else {
                    d(".ui-slider .ui-state-focus").removeClass("ui-state-focus");
                    d(this).addClass("ui-state-focus")
                }
            }).blur(function() {
                d(this).removeClass("ui-state-focus")
            });
            this.handles.each(function(g) {
                d(this).data("index.ui-slider-handle",
                    g)
            });
            this.handles.keydown(function(g) {
                var k = true,
                    l = d(this).data("index.ui-slider-handle"),
                    i, h, m;
                if (!a.options.disabled) {
                    switch (g.keyCode) {
                        case d.ui.keyCode.HOME:
                        case d.ui.keyCode.END:
                        case d.ui.keyCode.PAGE_UP:
                        case d.ui.keyCode.PAGE_DOWN:
                        case d.ui.keyCode.UP:
                        case d.ui.keyCode.RIGHT:
                        case d.ui.keyCode.DOWN:
                        case d.ui.keyCode.LEFT:
                            k = false;
                            if (!a._keySliding) {
                                a._keySliding = true;
                                d(this).addClass("ui-state-active");
                                i = a._start(g, l);
                                if (i === false) return
                            }
                            break
                    }
                    m = a.options.step;
                    i = a.options.values && a.options.values.length ?
                        (h = a.values(l)) : (h = a.value());
                    switch (g.keyCode) {
                        case d.ui.keyCode.HOME:
                            h = a._valueMin();
                            break;
                        case d.ui.keyCode.END:
                            h = a._valueMax();
                            break;
                        case d.ui.keyCode.PAGE_UP:
                            h = a._trimAlignValue(i + (a._valueMax() - a._valueMin()) / 5);
                            break;
                        case d.ui.keyCode.PAGE_DOWN:
                            h = a._trimAlignValue(i - (a._valueMax() - a._valueMin()) / 5);
                            break;
                        case d.ui.keyCode.UP:
                        case d.ui.keyCode.RIGHT:
                            if (i === a._valueMax()) return;
                            h = a._trimAlignValue(i + m);
                            break;
                        case d.ui.keyCode.DOWN:
                        case d.ui.keyCode.LEFT:
                            if (i === a._valueMin()) return;
                            h = a._trimAlignValue(i -
                                m);
                            break
                    }
                    a._slide(g, l, h);
                    return k
                }
            }).keyup(function(g) {
                var k = d(this).data("index.ui-slider-handle");
                if (a._keySliding) {
                    a._keySliding = false;
                    a._stop(g, k);
                    a._change(g, k);
                    d(this).removeClass("ui-state-active")
                }
            });
            this._refreshValue();
            this._animateOff = false
        },
        destroy: function() {
            this.handles.remove();
            this.range.remove();
            this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-slider-disabled ui-widget ui-widget-content ui-corner-all").removeData("slider").unbind(".slider");
            this._mouseDestroy();
            return this
        },
        _mouseCapture: function(a) {
            var b = this.options,
                c, f, e, j, g;
            if (b.disabled) return false;
            this.elementSize = {
                width: this.element.outerWidth(),
                height: this.element.outerHeight()
            };
            this.elementOffset = this.element.offset();
            c = this._normValueFromMouse({
                x: a.pageX,
                y: a.pageY
            });
            f = this._valueMax() - this._valueMin() + 1;
            j = this;
            this.handles.each(function(k) {
                var l = Math.abs(c - j.values(k));
                if (f > l) {
                    f = l;
                    e = d(this);
                    g = k
                }
            });
            if (b.range === true && this.values(1) === b.min) {
                g += 1;
                e = d(this.handles[g])
            }
            if (this._start(a, g) === false) return false;
            this._mouseSliding = true;
            j._handleIndex = g;
            e.addClass("ui-state-active").focus();
            b = e.offset();
            this._clickOffset = !d(a.target).parents().andSelf().is(".ui-slider-handle") ? {
                left: 0,
                top: 0
            } : {
                left: a.pageX - b.left - e.width() / 2,
                top: a.pageY - b.top - e.height() / 2 - (parseInt(e.css("borderTopWidth"), 10) || 0) - (parseInt(e.css("borderBottomWidth"), 10) || 0) + (parseInt(e.css("marginTop"), 10) || 0)
            };
            this.handles.hasClass("ui-state-hover") || this._slide(a, g, c);
            return this._animateOff = true
        },
        _mouseStart: function() {
            return true
        },
        _mouseDrag: function(a) {
            var b =
                this._normValueFromMouse({
                    x: a.pageX,
                    y: a.pageY
                });
            this._slide(a, this._handleIndex, b);
            return false
        },
        _mouseStop: function(a) {
            this.handles.removeClass("ui-state-active");
            this._mouseSliding = false;
            this._stop(a, this._handleIndex);
            this._change(a, this._handleIndex);
            this._clickOffset = this._handleIndex = null;
            return this._animateOff = false
        },
        _detectOrientation: function() {
            this.orientation = this.options.orientation === "vertical" ? "vertical" : "horizontal"
        },
        _normValueFromMouse: function(a) {
            var b;
            if (this.orientation === "horizontal") {
                b =
                    this.elementSize.width;
                a = a.x - this.elementOffset.left - (this._clickOffset ? this._clickOffset.left : 0)
            } else {
                b = this.elementSize.height;
                a = a.y - this.elementOffset.top - (this._clickOffset ? this._clickOffset.top : 0)
            }
            b = a / b;
            if (b > 1) b = 1;
            if (b < 0) b = 0;
            if (this.orientation === "vertical") b = 1 - b;
            a = this._valueMax() - this._valueMin();
            return this._trimAlignValue(this._valueMin() + b * a)
        },
        _start: function(a, b) {
            var c = {
                handle: this.handles[b],
                value: this.value()
            };
            if (this.options.values && this.options.values.length) {
                c.value = this.values(b);
                c.values = this.values()
            }
            return this._trigger("start", a, c)
        },
        _slide: function(a, b, c) {
            var f;
            if (this.options.values && this.options.values.length) {
                f = this.values(b ? 0 : 1);
                if (this.options.values.length === 2 && this.options.range === true && (b === 0 && c > f || b === 1 && c < f)) c = f;
                if (c !== this.values(b)) {
                    f = this.values();
                    f[b] = c;
                    a = this._trigger("slide", a, {
                        handle: this.handles[b],
                        value: c,
                        values: f
                    });
                    this.values(b ? 0 : 1);
                    a !== false && this.values(b, c, true)
                }
            } else if (c !== this.value()) {
                a = this._trigger("slide", a, {
                    handle: this.handles[b],
                    value: c
                });
                a !== false && this.value(c)
            }
        },
        _stop: function(a, b) {
            var c = {
                handle: this.handles[b],
                value: this.value()
            };
            if (this.options.values && this.options.values.length) {
                c.value = this.values(b);
                c.values = this.values()
            }
            this._trigger("stop", a, c)
        },
        _change: function(a, b) {
            if (!this._keySliding && !this._mouseSliding) {
                var c = {
                    handle: this.handles[b],
                    value: this.value()
                };
                if (this.options.values && this.options.values.length) {
                    c.value = this.values(b);
                    c.values = this.values()
                }
                this._trigger("change", a, c)
            }
        },
        value: function(a) {
            if (arguments.length) {
                this.options.value =
                    this._trimAlignValue(a);
                this._refreshValue();
                this._change(null, 0)
            } else return this._value()
        },
        values: function(a, b) {
            var c, f, e;
            if (arguments.length > 1) {
                this.options.values[a] = this._trimAlignValue(b);
                this._refreshValue();
                this._change(null, a)
            } else if (arguments.length)
                if (d.isArray(arguments[0])) {
                    c = this.options.values;
                    f = arguments[0];
                    for (e = 0; e < c.length; e += 1) {
                        c[e] = this._trimAlignValue(f[e]);
                        this._change(null, e)
                    }
                    this._refreshValue()
                } else return this.options.values && this.options.values.length ? this._values(a) :
                    this.value();
            else return this._values()
        },
        _setOption: function(a, b) {
            var c, f = 0;
            if (d.isArray(this.options.values)) f = this.options.values.length;
            d.Widget.prototype._setOption.apply(this, arguments);
            switch (a) {
                case "disabled":
                    if (b) {
                        this.handles.filter(".ui-state-focus").blur();
                        this.handles.removeClass("ui-state-hover");
                        this.handles.propAttr("disabled", true);
                        this.element.addClass("ui-disabled")
                    } else {
                        this.handles.propAttr("disabled", false);
                        this.element.removeClass("ui-disabled")
                    }
                    break;
                case "orientation":
                    this._detectOrientation();
                    this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-" + this.orientation);
                    this._refreshValue();
                    break;
                case "value":
                    this._animateOff = true;
                    this._refreshValue();
                    this._change(null, 0);
                    this._animateOff = false;
                    break;
                case "values":
                    this._animateOff = true;
                    this._refreshValue();
                    for (c = 0; c < f; c += 1) this._change(null, c);
                    this._animateOff = false;
                    break
            }
        },
        _value: function() {
            var a = this.options.value;
            return a = this._trimAlignValue(a)
        },
        _values: function(a) {
            var b, c;
            if (arguments.length) {
                b = this.options.values[a];
                return b = this._trimAlignValue(b)
            } else {
                b = this.options.values.slice();
                for (c = 0; c < b.length; c += 1) b[c] = this._trimAlignValue(b[c]);
                return b
            }
        },
        _trimAlignValue: function(a) {
            if (a <= this._valueMin()) return this._valueMin();
            if (a >= this._valueMax()) return this._valueMax();
            var b = this.options.step > 0 ? this.options.step : 1,
                c = (a - this._valueMin()) % b;
            a = a - c;
            if (Math.abs(c) * 2 >= b) a += c > 0 ? b : -b;
            return parseFloat(a.toFixed(5))
        },
        _valueMin: function() {
            return this.options.min
        },
        _valueMax: function() {
            return this.options.max
        },
        _refreshValue: function() {
            var a =
                this.options.range,
                b = this.options,
                c = this,
                f = !this._animateOff ? b.animate : false,
                e, j = {},
                g, k, l, i;
            if (this.options.values && this.options.values.length) this.handles.each(function(h) {
                e = (c.values(h) - c._valueMin()) / (c._valueMax() - c._valueMin()) * 100;
                j[c.orientation === "horizontal" ? "left" : "bottom"] = e + "%";
                d(this).stop(1, 1)[f ? "animate" : "css"](j, b.animate);
                if (c.options.range === true)
                    if (c.orientation === "horizontal") {
                        if (h === 0) c.range.stop(1, 1)[f ? "animate" : "css"]({
                            left: e + "%"
                        }, b.animate);
                        if (h === 1) c.range[f ? "animate" : "css"]({
                            width: e -
                                g + "%"
                        }, {
                            queue: false,
                            duration: b.animate
                        })
                    } else {
                        if (h === 0) c.range.stop(1, 1)[f ? "animate" : "css"]({
                            bottom: e + "%"
                        }, b.animate);
                        if (h === 1) c.range[f ? "animate" : "css"]({
                            height: e - g + "%"
                        }, {
                            queue: false,
                            duration: b.animate
                        })
                    }
                g = e
            });
            else {
                k = this.value();
                l = this._valueMin();
                i = this._valueMax();
                e = i !== l ? (k - l) / (i - l) * 100 : 0;
                j[c.orientation === "horizontal" ? "left" : "bottom"] = e + "%";
                this.handle.stop(1, 1)[f ? "animate" : "css"](j, b.animate);
                if (a === "min" && this.orientation === "horizontal") this.range.stop(1, 1)[f ? "animate" : "css"]({
                        width: e + "%"
                    },
                    b.animate);
                if (a === "max" && this.orientation === "horizontal") this.range[f ? "animate" : "css"]({
                    width: 100 - e + "%"
                }, {
                    queue: false,
                    duration: b.animate
                });
                if (a === "min" && this.orientation === "vertical") this.range.stop(1, 1)[f ? "animate" : "css"]({
                    height: e + "%"
                }, b.animate);
                if (a === "max" && this.orientation === "vertical") this.range[f ? "animate" : "css"]({
                    height: 100 - e + "%"
                }, {
                    queue: false,
                    duration: b.animate
                })
            }
        }
    });
    d.extend(d.ui.slider, {
        version: "1.8.15"
    })
})(jQuery);;
/*
 * jQuery UI Tabs 1.8.15
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Tabs
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 */
(function(d, p) {
    function u() {
        return ++v
    }

    function w() {
        return ++x
    }
    var v = 0,
        x = 0;
    d.widget("ui.tabs", {
        options: {
            add: null,
            ajaxOptions: null,
            cache: false,
            cookie: null,
            collapsible: false,
            disable: null,
            disabled: [],
            enable: null,
            event: "click",
            fx: null,
            idPrefix: "ui-tabs-",
            load: null,
            panelTemplate: "<div></div>",
            remove: null,
            select: null,
            show: null,
            spinner: "<em>Loading&#8230;</em>",
            tabTemplate: "<li><a href='#{href}'><span>#{label}</span></a></li>"
        },
        _create: function() {
            this._tabify(true)
        },
        _setOption: function(b, e) {
            if (b == "selected") this.options.collapsible &&
                e == this.options.selected || this.select(e);
            else {
                this.options[b] = e;
                this._tabify()
            }
        },
        _tabId: function(b) {
            return b.title && b.title.replace(/\s/g, "_").replace(/[^\w\u00c0-\uFFFF-]/g, "") || this.options.idPrefix + u()
        },
        _sanitizeSelector: function(b) {
            return b.replace(/:/g, "\\:")
        },
        _cookie: function() {
            var b = this.cookie || (this.cookie = this.options.cookie.name || "ui-tabs-" + w());
            return d.cookie.apply(null, [b].concat(d.makeArray(arguments)))
        },
        _ui: function(b, e) {
            return {
                tab: b,
                panel: e,
                index: this.anchors.index(b)
            }
        },
        _cleanup: function() {
            this.lis.filter(".ui-state-processing").removeClass("ui-state-processing").find("span:data(label.tabs)").each(function() {
                var b =
                    d(this);
                b.html(b.data("label.tabs")).removeData("label.tabs")
            })
        },
        _tabify: function(b) {
            function e(g, f) {
                g.css("display", "");
                !d.support.opacity && f.opacity && g[0].style.removeAttribute("filter")
            }
            var a = this,
                c = this.options,
                h = /^#.+/;
            this.list = this.element.find("ol,ul").eq(0);
            this.lis = d(" > li:has(a[href])", this.list);
            this.anchors = this.lis.map(function() {
                return d("a", this)[0]
            });
            this.panels = d([]);
            this.anchors.each(function(g, f) {
                var i = d(f).attr("href"),
                    l = i.split("#")[0],
                    q;
                if (l && (l === location.toString().split("#")[0] ||
                        (q = d("base")[0]) && l === q.href)) {
                    i = f.hash;
                    f.href = i
                }
                if (h.test(i)) a.panels = a.panels.add(a.element.find(a._sanitizeSelector(i)));
                else if (i && i !== "#") {
                    d.data(f, "href.tabs", i);
                    d.data(f, "load.tabs", i.replace(/#.*$/, ""));
                    i = a._tabId(f);
                    f.href = "#" + i;
                    f = a.element.find("#" + i);
                    if (!f.length) {
                        f = d(c.panelTemplate).attr("id", i).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").insertAfter(a.panels[g - 1] || a.list);
                        f.data("destroy.tabs", true)
                    }
                    a.panels = a.panels.add(f)
                } else c.disabled.push(g)
            });
            if (b) {
                this.element.addClass("ui-tabs ui-widget ui-widget-content ui-corner-all");
                this.list.addClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all");
                this.lis.addClass("ui-state-default ui-corner-top");
                this.panels.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom");
                if (c.selected === p) {
                    location.hash && this.anchors.each(function(g, f) {
                        if (f.hash == location.hash) {
                            c.selected = g;
                            return false
                        }
                    });
                    if (typeof c.selected !== "number" && c.cookie) c.selected = parseInt(a._cookie(), 10);
                    if (typeof c.selected !== "number" && this.lis.filter(".ui-tabs-selected").length) c.selected =
                        this.lis.index(this.lis.filter(".ui-tabs-selected"));
                    c.selected = c.selected || (this.lis.length ? 0 : -1)
                } else if (c.selected === null) c.selected = -1;
                c.selected = c.selected >= 0 && this.anchors[c.selected] || c.selected < 0 ? c.selected : 0;
                c.disabled = d.unique(c.disabled.concat(d.map(this.lis.filter(".ui-state-disabled"), function(g) {
                    return a.lis.index(g)
                }))).sort();
                d.inArray(c.selected, c.disabled) != -1 && c.disabled.splice(d.inArray(c.selected, c.disabled), 1);
                this.panels.addClass("ui-tabs-hide");
                this.lis.removeClass("ui-tabs-selected ui-state-active");
                if (c.selected >= 0 && this.anchors.length) {
                    a.element.find(a._sanitizeSelector(a.anchors[c.selected].hash)).removeClass("ui-tabs-hide");
                    this.lis.eq(c.selected).addClass("ui-tabs-selected ui-state-active");
                    a.element.queue("tabs", function() {
                        a._trigger("show", null, a._ui(a.anchors[c.selected], a.element.find(a._sanitizeSelector(a.anchors[c.selected].hash))[0]))
                    });
                    this.load(c.selected)
                }
                d(window).bind("unload", function() {
                    a.lis.add(a.anchors).unbind(".tabs");
                    a.lis = a.anchors = a.panels = null
                })
            } else c.selected = this.lis.index(this.lis.filter(".ui-tabs-selected"));
            this.element[c.collapsible ? "addClass" : "removeClass"]("ui-tabs-collapsible");
            c.cookie && this._cookie(c.selected, c.cookie);
            b = 0;
            for (var j; j = this.lis[b]; b++) d(j)[d.inArray(b, c.disabled) != -1 && !d(j).hasClass("ui-tabs-selected") ? "addClass" : "removeClass"]("ui-state-disabled");
            c.cache === false && this.anchors.removeData("cache.tabs");
            this.lis.add(this.anchors).unbind(".tabs");
            if (c.event !== "mouseover") {
                var k = function(g, f) {
                        f.is(":not(.ui-state-disabled)") && f.addClass("ui-state-" + g)
                    },
                    n = function(g, f) {
                        f.removeClass("ui-state-" +
                            g)
                    };
                this.lis.bind("mouseover.tabs", function() {
                    k("hover", d(this))
                });
                this.lis.bind("mouseout.tabs", function() {
                    n("hover", d(this))
                });
                this.anchors.bind("focus.tabs", function() {
                    k("focus", d(this).closest("li"))
                });
                this.anchors.bind("blur.tabs", function() {
                    n("focus", d(this).closest("li"))
                })
            }
            var m, o;
            if (c.fx)
                if (d.isArray(c.fx)) {
                    m = c.fx[0];
                    o = c.fx[1]
                } else m = o = c.fx;
            var r = o ? function(g, f) {
                    d(g).closest("li").addClass("ui-tabs-selected ui-state-active");
                    f.hide().removeClass("ui-tabs-hide").animate(o, o.duration || "normal",
                        function() {
                            e(f, o);
                            a._trigger("show", null, a._ui(g, f[0]))
                        })
                } : function(g, f) {
                    d(g).closest("li").addClass("ui-tabs-selected ui-state-active");
                    f.removeClass("ui-tabs-hide");
                    a._trigger("show", null, a._ui(g, f[0]))
                },
                s = m ? function(g, f) {
                    f.animate(m, m.duration || "normal", function() {
                        a.lis.removeClass("ui-tabs-selected ui-state-active");
                        f.addClass("ui-tabs-hide");
                        e(f, m);
                        a.element.dequeue("tabs")
                    })
                } : function(g, f) {
                    a.lis.removeClass("ui-tabs-selected ui-state-active");
                    f.addClass("ui-tabs-hide");
                    a.element.dequeue("tabs")
                };
            this.anchors.bind(c.event + ".tabs", function() {
                var g = this,
                    f = d(g).closest("li"),
                    i = a.panels.filter(":not(.ui-tabs-hide)"),
                    l = a.element.find(a._sanitizeSelector(g.hash));
                if (f.hasClass("ui-tabs-selected") && !c.collapsible || f.hasClass("ui-state-disabled") || f.hasClass("ui-state-processing") || a.panels.filter(":animated").length || a._trigger("select", null, a._ui(this, l[0])) === false) {
                    this.blur();
                    return false
                }
                c.selected = a.anchors.index(this);
                a.abort();
                if (c.collapsible)
                    if (f.hasClass("ui-tabs-selected")) {
                        c.selected = -1;
                        c.cookie && a._cookie(c.selected, c.cookie);
                        a.element.queue("tabs", function() {
                            s(g, i)
                        }).dequeue("tabs");
                        this.blur();
                        return false
                    } else if (!i.length) {
                    c.cookie && a._cookie(c.selected, c.cookie);
                    a.element.queue("tabs", function() {
                        r(g, l)
                    });
                    a.load(a.anchors.index(this));
                    this.blur();
                    return false
                }
                c.cookie && a._cookie(c.selected, c.cookie);
                if (l.length) {
                    i.length && a.element.queue("tabs", function() {
                        s(g, i)
                    });
                    a.element.queue("tabs", function() {
                        r(g, l)
                    });
                    a.load(a.anchors.index(this))
                } else throw "jQuery UI Tabs: Mismatching fragment identifier.";
                d.browser.msie && this.blur()
            });
            this.anchors.bind("click.tabs", function() {
                return false
            })
        },
        _getIndex: function(b) {
            if (typeof b == "string") b = this.anchors.index(this.anchors.filter("[href$=" + b + "]"));
            return b
        },
        destroy: function() {
            var b = this.options;
            this.abort();
            this.element.unbind(".tabs").removeClass("ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible").removeData("tabs");
            this.list.removeClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all");
            this.anchors.each(function() {
                var e =
                    d.data(this, "href.tabs");
                if (e) this.href = e;
                var a = d(this).unbind(".tabs");
                d.each(["href", "load", "cache"], function(c, h) {
                    a.removeData(h + ".tabs")
                })
            });
            this.lis.unbind(".tabs").add(this.panels).each(function() {
                d.data(this, "destroy.tabs") ? d(this).remove() : d(this).removeClass("ui-state-default ui-corner-top ui-tabs-selected ui-state-active ui-state-hover ui-state-focus ui-state-disabled ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide")
            });
            b.cookie && this._cookie(null, b.cookie);
            return this
        },
        add: function(b,
            e, a) {
            if (a === p) a = this.anchors.length;
            var c = this,
                h = this.options;
            e = d(h.tabTemplate.replace(/#\{href\}/g, b).replace(/#\{label\}/g, e));
            b = !b.indexOf("#") ? b.replace("#", "") : this._tabId(d("a", e)[0]);
            e.addClass("ui-state-default ui-corner-top").data("destroy.tabs", true);
            var j = c.element.find("#" + b);
            j.length || (j = d(h.panelTemplate).attr("id", b).data("destroy.tabs", true));
            j.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide");
            if (a >= this.lis.length) {
                e.appendTo(this.list);
                j.appendTo(this.list[0].parentNode)
            } else {
                e.insertBefore(this.lis[a]);
                j.insertBefore(this.panels[a])
            }
            h.disabled = d.map(h.disabled, function(k) {
                return k >= a ? ++k : k
            });
            this._tabify();
            if (this.anchors.length == 1) {
                h.selected = 0;
                e.addClass("ui-tabs-selected ui-state-active");
                j.removeClass("ui-tabs-hide");
                this.element.queue("tabs", function() {
                    c._trigger("show", null, c._ui(c.anchors[0], c.panels[0]))
                });
                this.load(0)
            }
            this._trigger("add", null, this._ui(this.anchors[a], this.panels[a]));
            return this
        },
        remove: function(b) {
            b = this._getIndex(b);
            var e = this.options,
                a = this.lis.eq(b).remove(),
                c = this.panels.eq(b).remove();
            if (a.hasClass("ui-tabs-selected") && this.anchors.length > 1) this.select(b + (b + 1 < this.anchors.length ? 1 : -1));
            e.disabled = d.map(d.grep(e.disabled, function(h) {
                return h != b
            }), function(h) {
                return h >= b ? --h : h
            });
            this._tabify();
            this._trigger("remove", null, this._ui(a.find("a")[0], c[0]));
            return this
        },
        enable: function(b) {
            b = this._getIndex(b);
            var e = this.options;
            if (d.inArray(b, e.disabled) != -1) {
                this.lis.eq(b).removeClass("ui-state-disabled");
                e.disabled = d.grep(e.disabled, function(a) {
                    return a != b
                });
                this._trigger("enable", null,
                    this._ui(this.anchors[b], this.panels[b]));
                return this
            }
        },
        disable: function(b) {
            b = this._getIndex(b);
            var e = this.options;
            if (b != e.selected) {
                this.lis.eq(b).addClass("ui-state-disabled");
                e.disabled.push(b);
                e.disabled.sort();
                this._trigger("disable", null, this._ui(this.anchors[b], this.panels[b]))
            }
            return this
        },
        select: function(b) {
            b = this._getIndex(b);
            if (b == -1)
                if (this.options.collapsible && this.options.selected != -1) b = this.options.selected;
                else return this;
            this.anchors.eq(b).trigger(this.options.event + ".tabs");
            return this
        },
        load: function(b) {
            b = this._getIndex(b);
            var e = this,
                a = this.options,
                c = this.anchors.eq(b)[0],
                h = d.data(c, "load.tabs");
            this.abort();
            if (!h || this.element.queue("tabs").length !== 0 && d.data(c, "cache.tabs")) this.element.dequeue("tabs");
            else {
                this.lis.eq(b).addClass("ui-state-processing");
                if (a.spinner) {
                    var j = d("span", c);
                    j.data("label.tabs", j.html()).html(a.spinner)
                }
                this.xhr = d.ajax(d.extend({}, a.ajaxOptions, {
                    url: h,
                    success: function(k, n) {
                        e.element.find(e._sanitizeSelector(c.hash)).html(k);
                        e._cleanup();
                        a.cache && d.data(c,
                            "cache.tabs", true);
                        e._trigger("load", null, e._ui(e.anchors[b], e.panels[b]));
                        try {
                            a.ajaxOptions.success(k, n)
                        } catch (m) {}
                    },
                    error: function(k, n) {
                        e._cleanup();
                        e._trigger("load", null, e._ui(e.anchors[b], e.panels[b]));
                        try {
                            a.ajaxOptions.error(k, n, b, c)
                        } catch (m) {}
                    }
                }));
                e.element.dequeue("tabs");
                return this
            }
        },
        abort: function() {
            this.element.queue([]);
            this.panels.stop(false, true);
            this.element.queue("tabs", this.element.queue("tabs").splice(-2, 2));
            if (this.xhr) {
                this.xhr.abort();
                delete this.xhr
            }
            this._cleanup();
            return this
        },
        url: function(b, e) {
            this.anchors.eq(b).removeData("cache.tabs").data("load.tabs", e);
            return this
        },
        length: function() {
            return this.anchors.length
        }
    });
    d.extend(d.ui.tabs, {
        version: "1.8.15"
    });
    d.extend(d.ui.tabs.prototype, {
        rotation: null,
        rotate: function(b, e) {
            var a = this,
                c = this.options,
                h = a._rotate || (a._rotate = function(j) {
                    clearTimeout(a.rotation);
                    a.rotation = setTimeout(function() {
                        var k = c.selected;
                        a.select(++k < a.anchors.length ? k : 0)
                    }, b);
                    j && j.stopPropagation()
                });
            e = a._unrotate || (a._unrotate = !e ? function(j) {
                j.clientX &&
                    a.rotate(null)
            } : function() {
                t = c.selected;
                h()
            });
            if (b) {
                this.element.bind("tabsshow", h);
                this.anchors.bind(c.event + ".tabs", e);
                h()
            } else {
                clearTimeout(a.rotation);
                this.element.unbind("tabsshow", h);
                this.anchors.unbind(c.event + ".tabs", e);
                delete this._rotate;
                delete this._unrotate
            }
            return this
        }
    })
})(jQuery);;
/*
 * jQuery UI Datepicker 1.8.15
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Datepicker
 *
 * Depends:
 *	jquery.ui.core.js
 */
(function(d, C) {
    function M() {
        this.debug = false;
        this._curInst = null;
        this._keyEvent = false;
        this._disabledInputs = [];
        this._inDialog = this._datepickerShowing = false;
        this._mainDivId = "ui-datepicker-div";
        this._inlineClass = "ui-datepicker-inline";
        this._appendClass = "ui-datepicker-append";
        this._triggerClass = "ui-datepicker-trigger";
        this._dialogClass = "ui-datepicker-dialog";
        this._disableClass = "ui-datepicker-disabled";
        this._unselectableClass = "ui-datepicker-unselectable";
        this._currentClass = "ui-datepicker-current-day";
        this._dayOverClass =
            "ui-datepicker-days-cell-over";
        this.regional = [];
        this.regional[""] = {
            closeText: "Done",
            prevText: "Prev",
            nextText: "Next",
            currentText: "Today",
            monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            dayNamesMin: ["Su",
                "Mo", "Tu", "We", "Th", "Fr", "Sa"
            ],
            weekHeader: "Wk",
            dateFormat: "mm/dd/yy",
            firstDay: 0,
            isRTL: false,
            showMonthAfterYear: false,
            yearSuffix: ""
        };
        this._defaults = {
            showOn: "focus",
            showAnim: "fadeIn",
            showOptions: {},
            defaultDate: null,
            appendText: "",
            buttonText: "...",
            buttonImage: "",
            buttonImageOnly: false,
            hideIfNoPrevNext: false,
            navigationAsDateFormat: false,
            gotoCurrent: false,
            changeMonth: false,
            changeYear: false,
            yearRange: "c-10:c+10",
            showOtherMonths: false,
            selectOtherMonths: false,
            showWeek: false,
            calculateWeek: this.iso8601Week,
            shortYearCutoff: "+10",
            minDate: null,
            maxDate: null,
            duration: "fast",
            beforeShowDay: null,
            beforeShow: null,
            onSelect: null,
            onChangeMonthYear: null,
            onClose: null,
            numberOfMonths: 1,
            showCurrentAtPos: 0,
            stepMonths: 1,
            stepBigMonths: 12,
            altField: "",
            altFormat: "",
            constrainInput: true,
            showButtonPanel: false,
            autoSize: false,
            disabled: false
        };
        d.extend(this._defaults, this.regional[""]);
        this.dpDiv = N(d('<div id="' + this._mainDivId + '" class="ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>'))
    }

    function N(a) {
        return a.bind("mouseout",
            function(b) {
                b = d(b.target).closest("button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a");
                b.length && b.removeClass("ui-state-hover ui-datepicker-prev-hover ui-datepicker-next-hover")
            }).bind("mouseover", function(b) {
            b = d(b.target).closest("button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a");
            if (!(d.datepicker._isDisabledDatepicker(J.inline ? a.parent()[0] : J.input[0]) || !b.length)) {
                b.parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover");
                b.addClass("ui-state-hover");
                b.hasClass("ui-datepicker-prev") && b.addClass("ui-datepicker-prev-hover");
                b.hasClass("ui-datepicker-next") && b.addClass("ui-datepicker-next-hover")
            }
        })
    }

    function H(a, b) {
        d.extend(a, b);
        for (var c in b)
            if (b[c] == null || b[c] == C) a[c] = b[c];
        return a
    }
    d.extend(d.ui, {
        datepicker: {
            version: "1.8.15"
        }
    });
    var B = (new Date).getTime(),
        J;
    d.extend(M.prototype, {
        markerClassName: "hasDatepicker",
        maxRows: 4,
        log: function() {
            this.debug && console.log.apply("", arguments)
        },
        _widgetDatepicker: function() {
            return this.dpDiv
        },
        setDefaults: function(a) {
            H(this._defaults, a || {});
            return this
        },
        _attachDatepicker: function(a, b) {
            var c = null;
            for (var e in this._defaults) {
                var f = a.getAttribute("date:" + e);
                if (f) {
                    c = c || {};
                    try {
                        c[e] = eval(f)
                    } catch (h) {
                        c[e] = f
                    }
                }
            }
            e = a.nodeName.toLowerCase();
            f = e == "div" || e == "span";
            if (!a.id) {
                this.uuid += 1;
                a.id = "dp" + this.uuid
            }
            var i = this._newInst(d(a), f);
            i.settings = d.extend({}, b || {}, c || {});
            if (e == "input") this._connectDatepicker(a, i);
            else f && this._inlineDatepicker(a, i)
        },
        _newInst: function(a, b) {
            return {
                id: a[0].id.replace(/([^A-Za-z0-9_-])/g,
                    "\\\\$1"),
                input: a,
                selectedDay: 0,
                selectedMonth: 0,
                selectedYear: 0,
                drawMonth: 0,
                drawYear: 0,
                inline: b,
                dpDiv: !b ? this.dpDiv : N(d('<div class="' + this._inlineClass + ' ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>'))
            }
        },
        _connectDatepicker: function(a, b) {
            var c = d(a);
            b.append = d([]);
            b.trigger = d([]);
            if (!c.hasClass(this.markerClassName)) {
                this._attachments(c, b);
                c.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp).bind("setData.datepicker",
                    function(e, f, h) {
                        b.settings[f] = h
                    }).bind("getData.datepicker", function(e, f) {
                    return this._get(b, f)
                });
                this._autoSize(b);
                d.data(a, "datepicker", b);
                b.settings.disabled && this._disableDatepicker(a)
            }
        },
        _attachments: function(a, b) {
            var c = this._get(b, "appendText"),
                e = this._get(b, "isRTL");
            b.append && b.append.remove();
            if (c) {
                b.append = d('<span class="' + this._appendClass + '">' + c + "</span>");
                a[e ? "before" : "after"](b.append)
            }
            a.unbind("focus", this._showDatepicker);
            b.trigger && b.trigger.remove();
            c = this._get(b, "showOn");
            if (c ==
                "focus" || c == "both") a.focus(this._showDatepicker);
            if (c == "button" || c == "both") {
                c = this._get(b, "buttonText");
                var f = this._get(b, "buttonImage");
                b.trigger = d(this._get(b, "buttonImageOnly") ? d("<img/>").addClass(this._triggerClass).attr({
                    src: f,
                    alt: c,
                    title: c
                }) : d('<button type="button"></button>').addClass(this._triggerClass).html(f == "" ? c : d("<img/>").attr({
                    src: f,
                    alt: c,
                    title: c
                })));
                a[e ? "before" : "after"](b.trigger);
                b.trigger.click(function() {
                    d.datepicker._datepickerShowing && d.datepicker._lastInput == a[0] ? d.datepicker._hideDatepicker() :
                        d.datepicker._showDatepicker(a[0]);
                    return false
                })
            }
        },
        _autoSize: function(a) {
            if (this._get(a, "autoSize") && !a.inline) {
                var b = new Date(2009, 11, 20),
                    c = this._get(a, "dateFormat");
                if (c.match(/[DM]/)) {
                    var e = function(f) {
                        for (var h = 0, i = 0, g = 0; g < f.length; g++)
                            if (f[g].length > h) {
                                h = f[g].length;
                                i = g
                            }
                        return i
                    };
                    b.setMonth(e(this._get(a, c.match(/MM/) ? "monthNames" : "monthNamesShort")));
                    b.setDate(e(this._get(a, c.match(/DD/) ? "dayNames" : "dayNamesShort")) + 20 - b.getDay())
                }
                a.input.attr("size", this._formatDate(a, b).length)
            }
        },
        _inlineDatepicker: function(a,
            b) {
            var c = d(a);
            if (!c.hasClass(this.markerClassName)) {
                c.addClass(this.markerClassName).append(b.dpDiv).bind("setData.datepicker", function(e, f, h) {
                    b.settings[f] = h
                }).bind("getData.datepicker", function(e, f) {
                    return this._get(b, f)
                });
                d.data(a, "datepicker", b);
                this._setDate(b, this._getDefaultDate(b), true);
                this._updateDatepicker(b);
                this._updateAlternate(b);
                b.settings.disabled && this._disableDatepicker(a);
                b.dpDiv.css("display", "block")
            }
        },
        _dialogDatepicker: function(a, b, c, e, f) {
            a = this._dialogInst;
            if (!a) {
                this.uuid +=
                    1;
                this._dialogInput = d('<input type="text" id="' + ("dp" + this.uuid) + '" style="position: absolute; top: -100px; width: 0px; z-index: -10;"/>');
                this._dialogInput.keydown(this._doKeyDown);
                d("body").append(this._dialogInput);
                a = this._dialogInst = this._newInst(this._dialogInput, false);
                a.settings = {};
                d.data(this._dialogInput[0], "datepicker", a)
            }
            H(a.settings, e || {});
            b = b && b.constructor == Date ? this._formatDate(a, b) : b;
            this._dialogInput.val(b);
            this._pos = f ? f.length ? f : [f.pageX, f.pageY] : null;
            if (!this._pos) this._pos = [document.documentElement.clientWidth /
                2 - 100 + (document.documentElement.scrollLeft || document.body.scrollLeft), document.documentElement.clientHeight / 2 - 150 + (document.documentElement.scrollTop || document.body.scrollTop)
            ];
            this._dialogInput.css("left", this._pos[0] + 20 + "px").css("top", this._pos[1] + "px");
            a.settings.onSelect = c;
            this._inDialog = true;
            this.dpDiv.addClass(this._dialogClass);
            this._showDatepicker(this._dialogInput[0]);
            d.blockUI && d.blockUI(this.dpDiv);
            d.data(this._dialogInput[0], "datepicker", a);
            return this
        },
        _destroyDatepicker: function(a) {
            var b =
                d(a),
                c = d.data(a, "datepicker");
            if (b.hasClass(this.markerClassName)) {
                var e = a.nodeName.toLowerCase();
                d.removeData(a, "datepicker");
                if (e == "input") {
                    c.append.remove();
                    c.trigger.remove();
                    b.removeClass(this.markerClassName).unbind("focus", this._showDatepicker).unbind("keydown", this._doKeyDown).unbind("keypress", this._doKeyPress).unbind("keyup", this._doKeyUp)
                } else if (e == "div" || e == "span") b.removeClass(this.markerClassName).empty()
            }
        },
        _enableDatepicker: function(a) {
            var b = d(a),
                c = d.data(a, "datepicker");
            if (b.hasClass(this.markerClassName)) {
                var e =
                    a.nodeName.toLowerCase();
                if (e == "input") {
                    a.disabled = false;
                    c.trigger.filter("button").each(function() {
                        this.disabled = false
                    }).end().filter("img").css({
                        opacity: "1.0",
                        cursor: ""
                    })
                } else if (e == "div" || e == "span") {
                    b = b.children("." + this._inlineClass);
                    b.children().removeClass("ui-state-disabled");
                    b.find("select.ui-datepicker-month, select.ui-datepicker-year").removeAttr("disabled")
                }
                this._disabledInputs = d.map(this._disabledInputs, function(f) {
                    return f == a ? null : f
                })
            }
        },
        _disableDatepicker: function(a) {
            var b = d(a),
                c = d.data(a,
                    "datepicker");
            if (b.hasClass(this.markerClassName)) {
                var e = a.nodeName.toLowerCase();
                if (e == "input") {
                    a.disabled = true;
                    c.trigger.filter("button").each(function() {
                        this.disabled = true
                    }).end().filter("img").css({
                        opacity: "0.5",
                        cursor: "default"
                    })
                } else if (e == "div" || e == "span") {
                    b = b.children("." + this._inlineClass);
                    b.children().addClass("ui-state-disabled");
                    b.find("select.ui-datepicker-month, select.ui-datepicker-year").attr("disabled", "disabled")
                }
                this._disabledInputs = d.map(this._disabledInputs, function(f) {
                    return f ==
                        a ? null : f
                });
                this._disabledInputs[this._disabledInputs.length] = a
            }
        },
        _isDisabledDatepicker: function(a) {
            if (!a) return false;
            for (var b = 0; b < this._disabledInputs.length; b++)
                if (this._disabledInputs[b] == a) return true;
            return false
        },
        _getInst: function(a) {
            try {
                return d.data(a, "datepicker")
            } catch (b) {
                throw "Missing instance data for this datepicker";
            }
        },
        _optionDatepicker: function(a, b, c) {
            var e = this._getInst(a);
            if (arguments.length == 2 && typeof b == "string") return b == "defaults" ? d.extend({}, d.datepicker._defaults) : e ? b == "all" ?
                d.extend({}, e.settings) : this._get(e, b) : null;
            var f = b || {};
            if (typeof b == "string") {
                f = {};
                f[b] = c
            }
            if (e) {
                this._curInst == e && this._hideDatepicker();
                var h = this._getDateDatepicker(a, true),
                    i = this._getMinMaxDate(e, "min"),
                    g = this._getMinMaxDate(e, "max");
                H(e.settings, f);
                if (i !== null && f.dateFormat !== C && f.minDate === C) e.settings.minDate = this._formatDate(e, i);
                if (g !== null && f.dateFormat !== C && f.maxDate === C) e.settings.maxDate = this._formatDate(e, g);
                this._attachments(d(a), e);
                this._autoSize(e);
                this._setDate(e, h);
                this._updateAlternate(e);
                this._updateDatepicker(e)
            }
        },
        _changeDatepicker: function(a, b, c) {
            this._optionDatepicker(a, b, c)
        },
        _refreshDatepicker: function(a) {
            (a = this._getInst(a)) && this._updateDatepicker(a)
        },
        _setDateDatepicker: function(a, b) {
            if (a = this._getInst(a)) {
                this._setDate(a, b);
                this._updateDatepicker(a);
                this._updateAlternate(a)
            }
        },
        _getDateDatepicker: function(a, b) {
            (a = this._getInst(a)) && !a.inline && this._setDateFromField(a, b);
            return a ? this._getDate(a) : null
        },
        _doKeyDown: function(a) {
            var b = d.datepicker._getInst(a.target),
                c = true,
                e = b.dpDiv.is(".ui-datepicker-rtl");
            b._keyEvent = true;
            if (d.datepicker._datepickerShowing) switch (a.keyCode) {
                    case 9:
                        d.datepicker._hideDatepicker();
                        c = false;
                        break;
                    case 13:
                        c = d("td." + d.datepicker._dayOverClass + ":not(." + d.datepicker._currentClass + ")", b.dpDiv);
                        c[0] && d.datepicker._selectDay(a.target, b.selectedMonth, b.selectedYear, c[0]);
                        if (a = d.datepicker._get(b, "onSelect")) {
                            c = d.datepicker._formatDate(b);
                            a.apply(b.input ? b.input[0] : null, [c, b])
                        } else d.datepicker._hideDatepicker();
                        return false;
                    case 27:
                        d.datepicker._hideDatepicker();
                        break;
                    case 33:
                        d.datepicker._adjustDate(a.target,
                            a.ctrlKey ? -d.datepicker._get(b, "stepBigMonths") : -d.datepicker._get(b, "stepMonths"), "M");
                        break;
                    case 34:
                        d.datepicker._adjustDate(a.target, a.ctrlKey ? +d.datepicker._get(b, "stepBigMonths") : +d.datepicker._get(b, "stepMonths"), "M");
                        break;
                    case 35:
                        if (a.ctrlKey || a.metaKey) d.datepicker._clearDate(a.target);
                        c = a.ctrlKey || a.metaKey;
                        break;
                    case 36:
                        if (a.ctrlKey || a.metaKey) d.datepicker._gotoToday(a.target);
                        c = a.ctrlKey || a.metaKey;
                        break;
                    case 37:
                        if (a.ctrlKey || a.metaKey) d.datepicker._adjustDate(a.target, e ? +1 : -1, "D");
                        c =
                            a.ctrlKey || a.metaKey;
                        if (a.originalEvent.altKey) d.datepicker._adjustDate(a.target, a.ctrlKey ? -d.datepicker._get(b, "stepBigMonths") : -d.datepicker._get(b, "stepMonths"), "M");
                        break;
                    case 38:
                        if (a.ctrlKey || a.metaKey) d.datepicker._adjustDate(a.target, -7, "D");
                        c = a.ctrlKey || a.metaKey;
                        break;
                    case 39:
                        if (a.ctrlKey || a.metaKey) d.datepicker._adjustDate(a.target, e ? -1 : +1, "D");
                        c = a.ctrlKey || a.metaKey;
                        if (a.originalEvent.altKey) d.datepicker._adjustDate(a.target, a.ctrlKey ? +d.datepicker._get(b, "stepBigMonths") : +d.datepicker._get(b,
                            "stepMonths"), "M");
                        break;
                    case 40:
                        if (a.ctrlKey || a.metaKey) d.datepicker._adjustDate(a.target, +7, "D");
                        c = a.ctrlKey || a.metaKey;
                        break;
                    default:
                        c = false
                } else if (a.keyCode == 36 && a.ctrlKey) d.datepicker._showDatepicker(this);
                else c = false;
            if (c) {
                a.preventDefault();
                a.stopPropagation()
            }
        },
        _doKeyPress: function(a) {
            var b = d.datepicker._getInst(a.target);
            if (d.datepicker._get(b, "constrainInput")) {
                b = d.datepicker._possibleChars(d.datepicker._get(b, "dateFormat"));
                var c = String.fromCharCode(a.charCode == C ? a.keyCode : a.charCode);
                return a.ctrlKey || a.metaKey || c < " " || !b || b.indexOf(c) > -1
            }
        },
        _doKeyUp: function(a) {
            a = d.datepicker._getInst(a.target);
            if (a.input.val() != a.lastVal) try {
                if (d.datepicker.parseDate(d.datepicker._get(a, "dateFormat"), a.input ? a.input.val() : null, d.datepicker._getFormatConfig(a))) {
                    d.datepicker._setDateFromField(a);
                    d.datepicker._updateAlternate(a);
                    d.datepicker._updateDatepicker(a)
                }
            } catch (b) {
                d.datepicker.log(b)
            }
            return true
        },
        _showDatepicker: function(a) {
            a = a.target || a;
            if (a.nodeName.toLowerCase() != "input") a = d("input",
                a.parentNode)[0];
            if (!(d.datepicker._isDisabledDatepicker(a) || d.datepicker._lastInput == a)) {
                var b = d.datepicker._getInst(a);
                if (d.datepicker._curInst && d.datepicker._curInst != b) {
                    d.datepicker._datepickerShowing && d.datepicker._triggerOnClose(d.datepicker._curInst);
                    d.datepicker._curInst.dpDiv.stop(true, true)
                }
                var c = d.datepicker._get(b, "beforeShow");
                H(b.settings, c ? c.apply(a, [a, b]) : {});
                b.lastVal = null;
                d.datepicker._lastInput = a;
                d.datepicker._setDateFromField(b);
                if (d.datepicker._inDialog) a.value = "";
                if (!d.datepicker._pos) {
                    d.datepicker._pos =
                        d.datepicker._findPos(a);
                    d.datepicker._pos[1] += a.offsetHeight
                }
                var e = false;
                d(a).parents().each(function() {
                    e |= d(this).css("position") == "fixed";
                    return !e
                });
                if (e && d.browser.opera) {
                    d.datepicker._pos[0] -= document.documentElement.scrollLeft;
                    d.datepicker._pos[1] -= document.documentElement.scrollTop
                }
                c = {
                    left: d.datepicker._pos[0],
                    top: d.datepicker._pos[1]
                };
                d.datepicker._pos = null;
                b.dpDiv.empty();
                b.dpDiv.css({
                    position: "absolute",
                    display: "block",
                    top: "-1000px"
                });
                d.datepicker._updateDatepicker(b);
                c = d.datepicker._checkOffset(b,
                    c, e);
                b.dpDiv.css({
                    position: d.datepicker._inDialog && d.blockUI ? "static" : e ? "fixed" : "absolute",
                    display: "none",
                    left: c.left + "px",
                    top: c.top + "px"
                });
                if (!b.inline) {
                    c = d.datepicker._get(b, "showAnim");
                    var f = d.datepicker._get(b, "duration"),
                        h = function() {
                            var i = b.dpDiv.find("iframe.ui-datepicker-cover");
                            if (i.length) {
                                var g = d.datepicker._getBorders(b.dpDiv);
                                i.css({
                                    left: -g[0],
                                    top: -g[1],
                                    width: b.dpDiv.outerWidth(),
                                    height: b.dpDiv.outerHeight()
                                })
                            }
                        };
                    b.dpDiv.zIndex(d(a).zIndex() + 1);
                    d.datepicker._datepickerShowing = true;
                    d.effects &&
                        d.effects[c] ? b.dpDiv.show(c, d.datepicker._get(b, "showOptions"), f, h) : b.dpDiv[c || "show"](c ? f : null, h);
                    if (!c || !f) h();
                    b.input.is(":visible") && !b.input.is(":disabled") && b.input.focus();
                    d.datepicker._curInst = b
                }
            }
        },
        _updateDatepicker: function(a) {
            this.maxRows = 4;
            var b = d.datepicker._getBorders(a.dpDiv);
            J = a;
            a.dpDiv.empty().append(this._generateHTML(a));
            var c = a.dpDiv.find("iframe.ui-datepicker-cover");
            c.length && c.css({
                left: -b[0],
                top: -b[1],
                width: a.dpDiv.outerWidth(),
                height: a.dpDiv.outerHeight()
            });
            a.dpDiv.find("." +
                this._dayOverClass + " a").mouseover();
            b = this._getNumberOfMonths(a);
            c = b[1];
            a.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width("");
            c > 1 && a.dpDiv.addClass("ui-datepicker-multi-" + c).css("width", 17 * c + "em");
            a.dpDiv[(b[0] != 1 || b[1] != 1 ? "add" : "remove") + "Class"]("ui-datepicker-multi");
            a.dpDiv[(this._get(a, "isRTL") ? "add" : "remove") + "Class"]("ui-datepicker-rtl");
            a == d.datepicker._curInst && d.datepicker._datepickerShowing && a.input && a.input.is(":visible") && !a.input.is(":disabled") &&
                a.input[0] != document.activeElement && a.input.focus();
            if (a.yearshtml) {
                var e = a.yearshtml;
                setTimeout(function() {
                    e === a.yearshtml && a.yearshtml && a.dpDiv.find("select.ui-datepicker-year:first").replaceWith(a.yearshtml);
                    e = a.yearshtml = null
                }, 0)
            }
        },
        _getBorders: function(a) {
            var b = function(c) {
                return {
                    thin: 1,
                    medium: 2,
                    thick: 3
                }[c] || c
            };
            return [parseFloat(b(a.css("border-left-width"))), parseFloat(b(a.css("border-top-width")))]
        },
        _checkOffset: function(a, b, c) {
            var e = a.dpDiv.outerWidth(),
                f = a.dpDiv.outerHeight(),
                h = a.input ? a.input.outerWidth() :
                0,
                i = a.input ? a.input.outerHeight() : 0,
                g = document.documentElement.clientWidth + d(document).scrollLeft(),
                j = document.documentElement.clientHeight + d(document).scrollTop();
            b.left -= this._get(a, "isRTL") ? e - h : 0;
            b.left -= c && b.left == a.input.offset().left ? d(document).scrollLeft() : 0;
            b.top -= c && b.top == a.input.offset().top + i ? d(document).scrollTop() : 0;
            b.left -= Math.min(b.left, b.left + e > g && g > e ? Math.abs(b.left + e - g) : 0);
            b.top -= Math.min(b.top, b.top + f > j && j > f ? Math.abs(f + i) : 0);
            return b
        },
        _findPos: function(a) {
            for (var b = this._get(this._getInst(a),
                    "isRTL"); a && (a.type == "hidden" || a.nodeType != 1 || d.expr.filters.hidden(a));) a = a[b ? "previousSibling" : "nextSibling"];
            a = d(a).offset();
            return [a.left, a.top]
        },
        _triggerOnClose: function(a) {
            var b = this._get(a, "onClose");
            if (b) b.apply(a.input ? a.input[0] : null, [a.input ? a.input.val() : "", a])
        },
        _hideDatepicker: function(a) {
            var b = this._curInst;
            if (!(!b || a && b != d.data(a, "datepicker")))
                if (this._datepickerShowing) {
                    a = this._get(b, "showAnim");
                    var c = this._get(b, "duration"),
                        e = function() {
                            d.datepicker._tidyDialog(b);
                            this._curInst =
                                null
                        };
                    d.effects && d.effects[a] ? b.dpDiv.hide(a, d.datepicker._get(b, "showOptions"), c, e) : b.dpDiv[a == "slideDown" ? "slideUp" : a == "fadeIn" ? "fadeOut" : "hide"](a ? c : null, e);
                    a || e();
                    d.datepicker._triggerOnClose(b);
                    this._datepickerShowing = false;
                    this._lastInput = null;
                    if (this._inDialog) {
                        this._dialogInput.css({
                            position: "absolute",
                            left: "0",
                            top: "-100px"
                        });
                        if (d.blockUI) {
                            d.unblockUI();
                            d("body").append(this.dpDiv)
                        }
                    }
                    this._inDialog = false
                }
        },
        _tidyDialog: function(a) {
            a.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar")
        },
        _checkExternalClick: function(a) {
            if (d.datepicker._curInst) {
                a = d(a.target);
                a[0].id != d.datepicker._mainDivId && a.parents("#" + d.datepicker._mainDivId).length == 0 && !a.hasClass(d.datepicker.markerClassName) && !a.hasClass(d.datepicker._triggerClass) && d.datepicker._datepickerShowing && !(d.datepicker._inDialog && d.blockUI) && d.datepicker._hideDatepicker()
            }
        },
        _adjustDate: function(a, b, c) {
            a = d(a);
            var e = this._getInst(a[0]);
            if (!this._isDisabledDatepicker(a[0])) {
                this._adjustInstDate(e, b + (c == "M" ? this._get(e, "showCurrentAtPos") :
                    0), c);
                this._updateDatepicker(e)
            }
        },
        _gotoToday: function(a) {
            a = d(a);
            var b = this._getInst(a[0]);
            if (this._get(b, "gotoCurrent") && b.currentDay) {
                b.selectedDay = b.currentDay;
                b.drawMonth = b.selectedMonth = b.currentMonth;
                b.drawYear = b.selectedYear = b.currentYear
            } else {
                var c = new Date;
                b.selectedDay = c.getDate();
                b.drawMonth = b.selectedMonth = c.getMonth();
                b.drawYear = b.selectedYear = c.getFullYear()
            }
            this._notifyChange(b);
            this._adjustDate(a)
        },
        _selectMonthYear: function(a, b, c) {
            a = d(a);
            var e = this._getInst(a[0]);
            e["selected" + (c == "M" ?
                "Month" : "Year")] = e["draw" + (c == "M" ? "Month" : "Year")] = parseInt(b.options[b.selectedIndex].value, 10);
            this._notifyChange(e);
            this._adjustDate(a)
        },
        _selectDay: function(a, b, c, e) {
            var f = d(a);
            if (!(d(e).hasClass(this._unselectableClass) || this._isDisabledDatepicker(f[0]))) {
                f = this._getInst(f[0]);
                f.selectedDay = f.currentDay = d("a", e).html();
                f.selectedMonth = f.currentMonth = b;
                f.selectedYear = f.currentYear = c;
                this._selectDate(a, this._formatDate(f, f.currentDay, f.currentMonth, f.currentYear))
            }
        },
        _clearDate: function(a) {
            a = d(a);
            this._getInst(a[0]);
            this._selectDate(a, "")
        },
        _selectDate: function(a, b) {
            a = this._getInst(d(a)[0]);
            b = b != null ? b : this._formatDate(a);
            a.input && a.input.val(b);
            this._updateAlternate(a);
            var c = this._get(a, "onSelect");
            if (c) c.apply(a.input ? a.input[0] : null, [b, a]);
            else a.input && a.input.trigger("change");
            if (a.inline) this._updateDatepicker(a);
            else {
                this._hideDatepicker();
                this._lastInput = a.input[0];
                a.input.focus();
                this._lastInput = null
            }
        },
        _updateAlternate: function(a) {
            var b = this._get(a, "altField");
            if (b) {
                var c = this._get(a,
                        "altFormat") || this._get(a, "dateFormat"),
                    e = this._getDate(a),
                    f = this.formatDate(c, e, this._getFormatConfig(a));
                d(b).each(function() {
                    d(this).val(f)
                })
            }
        },
        noWeekends: function(a) {
            a = a.getDay();
            return [a > 0 && a < 6, ""]
        },
        iso8601Week: function(a) {
            a = new Date(a.getTime());
            a.setDate(a.getDate() + 4 - (a.getDay() || 7));
            var b = a.getTime();
            a.setMonth(0);
            a.setDate(1);
            return Math.floor(Math.round((b - a) / 864E5) / 7) + 1
        },
        parseDate: function(a, b, c) {
            if (a == null || b == null) throw "Invalid arguments";
            b = typeof b == "object" ? b.toString() : b + "";
            if (b ==
                "") return null;
            var e = (c ? c.shortYearCutoff : null) || this._defaults.shortYearCutoff;
            e = typeof e != "string" ? e : (new Date).getFullYear() % 100 + parseInt(e, 10);
            for (var f = (c ? c.dayNamesShort : null) || this._defaults.dayNamesShort, h = (c ? c.dayNames : null) || this._defaults.dayNames, i = (c ? c.monthNamesShort : null) || this._defaults.monthNamesShort, g = (c ? c.monthNames : null) || this._defaults.monthNames, j = c = -1, l = -1, u = -1, k = false, o = function(p) {
                    (p = A + 1 < a.length && a.charAt(A + 1) == p) && A++;
                    return p
                }, m = function(p) {
                    var D = o(p);
                    p = new RegExp("^\\d{1," +
                        (p == "@" ? 14 : p == "!" ? 20 : p == "y" && D ? 4 : p == "o" ? 3 : 2) + "}");
                    p = b.substring(q).match(p);
                    if (!p) throw "Missing number at position " + q;
                    q += p[0].length;
                    return parseInt(p[0], 10)
                }, n = function(p, D, K) {
                    p = d.map(o(p) ? K : D, function(w, x) {
                        return [
                            [x, w]
                        ]
                    }).sort(function(w, x) {
                        return -(w[1].length - x[1].length)
                    });
                    var E = -1;
                    d.each(p, function(w, x) {
                        w = x[1];
                        if (b.substr(q, w.length).toLowerCase() == w.toLowerCase()) {
                            E = x[0];
                            q += w.length;
                            return false
                        }
                    });
                    if (E != -1) return E + 1;
                    else throw "Unknown name at position " + q;
                }, s = function() {
                    if (b.charAt(q) != a.charAt(A)) throw "Unexpected literal at position " +
                        q;
                    q++
                }, q = 0, A = 0; A < a.length; A++)
                if (k)
                    if (a.charAt(A) == "'" && !o("'")) k = false;
                    else s();
            else switch (a.charAt(A)) {
                case "d":
                    l = m("d");
                    break;
                case "D":
                    n("D", f, h);
                    break;
                case "o":
                    u = m("o");
                    break;
                case "m":
                    j = m("m");
                    break;
                case "M":
                    j = n("M", i, g);
                    break;
                case "y":
                    c = m("y");
                    break;
                case "@":
                    var v = new Date(m("@"));
                    c = v.getFullYear();
                    j = v.getMonth() + 1;
                    l = v.getDate();
                    break;
                case "!":
                    v = new Date((m("!") - this._ticksTo1970) / 1E4);
                    c = v.getFullYear();
                    j = v.getMonth() + 1;
                    l = v.getDate();
                    break;
                case "'":
                    if (o("'")) s();
                    else k = true;
                    break;
                default:
                    s()
            }
            if (q <
                b.length) throw "Extra/unparsed characters found in date: " + b.substring(q);
            if (c == -1) c = (new Date).getFullYear();
            else if (c < 100) c += (new Date).getFullYear() - (new Date).getFullYear() % 100 + (c <= e ? 0 : -100);
            if (u > -1) {
                j = 1;
                l = u;
                do {
                    e = this._getDaysInMonth(c, j - 1);
                    if (l <= e) break;
                    j++;
                    l -= e
                } while (1)
            }
            v = this._daylightSavingAdjust(new Date(c, j - 1, l));
            if (v.getFullYear() != c || v.getMonth() + 1 != j || v.getDate() != l) throw "Invalid date";
            return v
        },
        ATOM: "yy-mm-dd",
        COOKIE: "D, dd M yy",
        ISO_8601: "yy-mm-dd",
        RFC_822: "D, d M y",
        RFC_850: "DD, dd-M-y",
        RFC_1036: "D, d M y",
        RFC_1123: "D, d M yy",
        RFC_2822: "D, d M yy",
        RSS: "D, d M y",
        TICKS: "!",
        TIMESTAMP: "@",
        W3C: "yy-mm-dd",
        _ticksTo1970: (718685 + Math.floor(492.5) - Math.floor(19.7) + Math.floor(4.925)) * 24 * 60 * 60 * 1E7,
        formatDate: function(a, b, c) {
            if (!b) return "";
            var e = (c ? c.dayNamesShort : null) || this._defaults.dayNamesShort,
                f = (c ? c.dayNames : null) || this._defaults.dayNames,
                h = (c ? c.monthNamesShort : null) || this._defaults.monthNamesShort;
            c = (c ? c.monthNames : null) || this._defaults.monthNames;
            var i = function(o) {
                    (o = k + 1 < a.length &&
                        a.charAt(k + 1) == o) && k++;
                    return o
                },
                g = function(o, m, n) {
                    m = "" + m;
                    if (i(o))
                        for (; m.length < n;) m = "0" + m;
                    return m
                },
                j = function(o, m, n, s) {
                    return i(o) ? s[m] : n[m]
                },
                l = "",
                u = false;
            if (b)
                for (var k = 0; k < a.length; k++)
                    if (u)
                        if (a.charAt(k) == "'" && !i("'")) u = false;
                        else l += a.charAt(k);
            else switch (a.charAt(k)) {
                case "d":
                    l += g("d", b.getDate(), 2);
                    break;
                case "D":
                    l += j("D", b.getDay(), e, f);
                    break;
                case "o":
                    l += g("o", Math.round(((new Date(b.getFullYear(), b.getMonth(), b.getDate())).getTime() - (new Date(b.getFullYear(), 0, 0)).getTime()) / 864E5), 3);
                    break;
                case "m":
                    l += g("m", b.getMonth() + 1, 2);
                    break;
                case "M":
                    l += j("M", b.getMonth(), h, c);
                    break;
                case "y":
                    l += i("y") ? b.getFullYear() : (b.getYear() % 100 < 10 ? "0" : "") + b.getYear() % 100;
                    break;
                case "@":
                    l += b.getTime();
                    break;
                case "!":
                    l += b.getTime() * 1E4 + this._ticksTo1970;
                    break;
                case "'":
                    if (i("'")) l += "'";
                    else u = true;
                    break;
                default:
                    l += a.charAt(k)
            }
            return l
        },
        _possibleChars: function(a) {
            for (var b = "", c = false, e = function(h) {
                    (h = f + 1 < a.length && a.charAt(f + 1) == h) && f++;
                    return h
                }, f = 0; f < a.length; f++)
                if (c)
                    if (a.charAt(f) == "'" && !e("'")) c =
                        false;
                    else b += a.charAt(f);
            else switch (a.charAt(f)) {
                case "d":
                case "m":
                case "y":
                case "@":
                    b += "0123456789";
                    break;
                case "D":
                case "M":
                    return null;
                case "'":
                    if (e("'")) b += "'";
                    else c = true;
                    break;
                default:
                    b += a.charAt(f)
            }
            return b
        },
        _get: function(a, b) {
            return a.settings[b] !== C ? a.settings[b] : this._defaults[b]
        },
        _setDateFromField: function(a, b) {
            if (a.input.val() != a.lastVal) {
                var c = this._get(a, "dateFormat"),
                    e = a.lastVal = a.input ? a.input.val() : null,
                    f, h;
                f = h = this._getDefaultDate(a);
                var i = this._getFormatConfig(a);
                try {
                    f = this.parseDate(c,
                        e, i) || h
                } catch (g) {
                    this.log(g);
                    e = b ? "" : e
                }
                a.selectedDay = f.getDate();
                a.drawMonth = a.selectedMonth = f.getMonth();
                a.drawYear = a.selectedYear = f.getFullYear();
                a.currentDay = e ? f.getDate() : 0;
                a.currentMonth = e ? f.getMonth() : 0;
                a.currentYear = e ? f.getFullYear() : 0;
                this._adjustInstDate(a)
            }
        },
        _getDefaultDate: function(a) {
            return this._restrictMinMax(a, this._determineDate(a, this._get(a, "defaultDate"), new Date))
        },
        _determineDate: function(a, b, c) {
            var e = function(h) {
                    var i = new Date;
                    i.setDate(i.getDate() + h);
                    return i
                },
                f = function(h) {
                    try {
                        return d.datepicker.parseDate(d.datepicker._get(a,
                            "dateFormat"), h, d.datepicker._getFormatConfig(a))
                    } catch (i) {}
                    var g = (h.toLowerCase().match(/^c/) ? d.datepicker._getDate(a) : null) || new Date,
                        j = g.getFullYear(),
                        l = g.getMonth();
                    g = g.getDate();
                    for (var u = /([+-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g, k = u.exec(h); k;) {
                        switch (k[2] || "d") {
                            case "d":
                            case "D":
                                g += parseInt(k[1], 10);
                                break;
                            case "w":
                            case "W":
                                g += parseInt(k[1], 10) * 7;
                                break;
                            case "m":
                            case "M":
                                l += parseInt(k[1], 10);
                                g = Math.min(g, d.datepicker._getDaysInMonth(j, l));
                                break;
                            case "y":
                            case "Y":
                                j += parseInt(k[1], 10);
                                g = Math.min(g,
                                    d.datepicker._getDaysInMonth(j, l));
                                break
                        }
                        k = u.exec(h)
                    }
                    return new Date(j, l, g)
                };
            if (b = (b = b == null || b === "" ? c : typeof b == "string" ? f(b) : typeof b == "number" ? isNaN(b) ? c : e(b) : new Date(b.getTime())) && b.toString() == "Invalid Date" ? c : b) {
                b.setHours(0);
                b.setMinutes(0);
                b.setSeconds(0);
                b.setMilliseconds(0)
            }
            return this._daylightSavingAdjust(b)
        },
        _daylightSavingAdjust: function(a) {
            if (!a) return null;
            a.setHours(a.getHours() > 12 ? a.getHours() + 2 : 0);
            return a
        },
        _setDate: function(a, b, c) {
            var e = !b,
                f = a.selectedMonth,
                h = a.selectedYear;
            b = this._restrictMinMax(a, this._determineDate(a, b, new Date));
            a.selectedDay = a.currentDay = b.getDate();
            a.drawMonth = a.selectedMonth = a.currentMonth = b.getMonth();
            a.drawYear = a.selectedYear = a.currentYear = b.getFullYear();
            if ((f != a.selectedMonth || h != a.selectedYear) && !c) this._notifyChange(a);
            this._adjustInstDate(a);
            if (a.input) a.input.val(e ? "" : this._formatDate(a));
            if (c = this._get(a, "onSelect")) {
                e = this._formatDate(a);
                c.apply(a.input ? a.input[0] : null, [e, a])
            }
        },
        _getDate: function(a) {
            return !a.currentYear || a.input && a.input.val() ==
                "" ? null : this._daylightSavingAdjust(new Date(a.currentYear, a.currentMonth, a.currentDay))
        },
        _generateHTML: function(a) {
            var b = new Date;
            b = this._daylightSavingAdjust(new Date(b.getFullYear(), b.getMonth(), b.getDate()));
            var c = this._get(a, "isRTL"),
                e = this._get(a, "showButtonPanel"),
                f = this._get(a, "hideIfNoPrevNext"),
                h = this._get(a, "navigationAsDateFormat"),
                i = this._getNumberOfMonths(a),
                g = this._get(a, "showCurrentAtPos"),
                j = this._get(a, "stepMonths"),
                l = i[0] != 1 || i[1] != 1,
                u = this._daylightSavingAdjust(!a.currentDay ? new Date(9999,
                    9, 9) : new Date(a.currentYear, a.currentMonth, a.currentDay)),
                k = this._getMinMaxDate(a, "min"),
                o = this._getMinMaxDate(a, "max");
            g = a.drawMonth - g;
            var m = a.drawYear;
            if (g < 0) {
                g += 12;
                m--
            }
            if (o) {
                var n = this._daylightSavingAdjust(new Date(o.getFullYear(), o.getMonth() - i[0] * i[1] + 1, o.getDate()));
                for (n = k && n < k ? k : n; this._daylightSavingAdjust(new Date(m, g, 1)) > n;) {
                    g--;
                    if (g < 0) {
                        g = 11;
                        m--
                    }
                }
            }
            a.drawMonth = g;
            a.drawYear = m;
            n = this._get(a, "prevText");
            n = !h ? n : this.formatDate(n, this._daylightSavingAdjust(new Date(m, g - j, 1)), this._getFormatConfig(a));
            n = this._canAdjustMonth(a, -1, m, g) ? '<a class="ui-datepicker-prev ui-corner-all" onclick="DP_jQuery_' + B + ".datepicker._adjustDate('#" + a.id + "', -" + j + ", 'M');\" title=\"" + n + '"><span class="ui-icon ui-icon-circle-triangle-' + (c ? "e" : "w") + '">' + n + "</span></a>" : f ? "" : '<a class="ui-datepicker-prev ui-corner-all ui-state-disabled" title="' + n + '"><span class="ui-icon ui-icon-circle-triangle-' + (c ? "e" : "w") + '">' + n + "</span></a>";
            var s = this._get(a, "nextText");
            s = !h ? s : this.formatDate(s, this._daylightSavingAdjust(new Date(m,
                g + j, 1)), this._getFormatConfig(a));
            f = this._canAdjustMonth(a, +1, m, g) ? '<a class="ui-datepicker-next ui-corner-all" onclick="DP_jQuery_' + B + ".datepicker._adjustDate('#" + a.id + "', +" + j + ", 'M');\" title=\"" + s + '"><span class="ui-icon ui-icon-circle-triangle-' + (c ? "w" : "e") + '">' + s + "</span></a>" : f ? "" : '<a class="ui-datepicker-next ui-corner-all ui-state-disabled" title="' + s + '"><span class="ui-icon ui-icon-circle-triangle-' + (c ? "w" : "e") + '">' + s + "</span></a>";
            j = this._get(a, "currentText");
            s = this._get(a, "gotoCurrent") &&
                a.currentDay ? u : b;
            j = !h ? j : this.formatDate(j, s, this._getFormatConfig(a));
            h = !a.inline ? '<button type="button" class="ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all" onclick="DP_jQuery_' + B + '.datepicker._hideDatepicker();">' + this._get(a, "closeText") + "</button>" : "";
            e = e ? '<div class="ui-datepicker-buttonpane ui-widget-content">' + (c ? h : "") + (this._isInRange(a, s) ? '<button type="button" class="ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all" onclick="DP_jQuery_' +
                B + ".datepicker._gotoToday('#" + a.id + "');\">" + j + "</button>" : "") + (c ? "" : h) + "</div>" : "";
            h = parseInt(this._get(a, "firstDay"), 10);
            h = isNaN(h) ? 0 : h;
            j = this._get(a, "showWeek");
            s = this._get(a, "dayNames");
            this._get(a, "dayNamesShort");
            var q = this._get(a, "dayNamesMin"),
                A = this._get(a, "monthNames"),
                v = this._get(a, "monthNamesShort"),
                p = this._get(a, "beforeShowDay"),
                D = this._get(a, "showOtherMonths"),
                K = this._get(a, "selectOtherMonths");
            this._get(a, "calculateWeek");
            for (var E = this._getDefaultDate(a), w = "", x = 0; x < i[0]; x++) {
                var O =
                    "";
                this.maxRows = 4;
                for (var G = 0; G < i[1]; G++) {
                    var P = this._daylightSavingAdjust(new Date(m, g, a.selectedDay)),
                        t = " ui-corner-all",
                        y = "";
                    if (l) {
                        y += '<div class="ui-datepicker-group';
                        if (i[1] > 1) switch (G) {
                            case 0:
                                y += " ui-datepicker-group-first";
                                t = " ui-corner-" + (c ? "right" : "left");
                                break;
                            case i[1] - 1:
                                y += " ui-datepicker-group-last";
                                t = " ui-corner-" + (c ? "left" : "right");
                                break;
                            default:
                                y += " ui-datepicker-group-middle";
                                t = "";
                                break
                        }
                        y += '">'
                    }
                    y += '<div class="ui-datepicker-header ui-widget-header ui-helper-clearfix' + t + '">' + (/all|left/.test(t) &&
                        x == 0 ? c ? f : n : "") + (/all|right/.test(t) && x == 0 ? c ? n : f : "") + this._generateMonthYearHeader(a, g, m, k, o, x > 0 || G > 0, A, v) + '</div><table class="ui-datepicker-calendar"><thead><tr>';
                    var z = j ? '<th class="ui-datepicker-week-col">' + this._get(a, "weekHeader") + "</th>" : "";
                    for (t = 0; t < 7; t++) {
                        var r = (t + h) % 7;
                        z += "<th" + ((t + h + 6) % 7 >= 5 ? ' class="ui-datepicker-week-end"' : "") + '><span title="' + s[r] + '">' + q[r] + "</span></th>"
                    }
                    y += z + "</tr></thead><tbody>";
                    z = this._getDaysInMonth(m, g);
                    if (m == a.selectedYear && g == a.selectedMonth) a.selectedDay = Math.min(a.selectedDay,
                        z);
                    t = (this._getFirstDayOfMonth(m, g) - h + 7) % 7;
                    z = Math.ceil((t + z) / 7);
                    this.maxRows = z = l ? this.maxRows > z ? this.maxRows : z : z;
                    r = this._daylightSavingAdjust(new Date(m, g, 1 - t));
                    for (var Q = 0; Q < z; Q++) {
                        y += "<tr>";
                        var R = !j ? "" : '<td class="ui-datepicker-week-col">' + this._get(a, "calculateWeek")(r) + "</td>";
                        for (t = 0; t < 7; t++) {
                            var I = p ? p.apply(a.input ? a.input[0] : null, [r]) : [true, ""],
                                F = r.getMonth() != g,
                                L = F && !K || !I[0] || k && r < k || o && r > o;
                            R += '<td class="' + ((t + h + 6) % 7 >= 5 ? " ui-datepicker-week-end" : "") + (F ? " ui-datepicker-other-month" : "") + (r.getTime() ==
                                P.getTime() && g == a.selectedMonth && a._keyEvent || E.getTime() == r.getTime() && E.getTime() == P.getTime() ? " " + this._dayOverClass : "") + (L ? " " + this._unselectableClass + " ui-state-disabled" : "") + (F && !D ? "" : " " + I[1] + (r.getTime() == u.getTime() ? " " + this._currentClass : "") + (r.getTime() == b.getTime() ? " ui-datepicker-today" : "")) + '"' + ((!F || D) && I[2] ? ' title="' + I[2] + '"' : "") + (L ? "" : ' onclick="DP_jQuery_' + B + ".datepicker._selectDay('#" + a.id + "'," + r.getMonth() + "," + r.getFullYear() + ', this);return false;"') + ">" + (F && !D ? "&#xa0;" : L ? '<span class="ui-state-default">' +
                                r.getDate() + "</span>" : '<a class="ui-state-default' + (r.getTime() == b.getTime() ? " ui-state-highlight" : "") + (r.getTime() == u.getTime() ? " ui-state-active" : "") + (F ? " ui-priority-secondary" : "") + '" href="#">' + r.getDate() + "</a>") + "</td>";
                            r.setDate(r.getDate() + 1);
                            r = this._daylightSavingAdjust(r)
                        }
                        y += R + "</tr>"
                    }
                    g++;
                    if (g > 11) {
                        g = 0;
                        m++
                    }
                    y += "</tbody></table>" + (l ? "</div>" + (i[0] > 0 && G == i[1] - 1 ? '<div class="ui-datepicker-row-break"></div>' : "") : "");
                    O += y
                }
                w += O
            }
            w += e + (d.browser.msie && parseInt(d.browser.version, 10) < 7 && !a.inline ? '<iframe src="javascript:false;" class="ui-datepicker-cover" frameborder="0"></iframe>' :
                "");
            a._keyEvent = false;
            return w
        },
        _generateMonthYearHeader: function(a, b, c, e, f, h, i, g) {
            var j = this._get(a, "changeMonth"),
                l = this._get(a, "changeYear"),
                u = this._get(a, "showMonthAfterYear"),
                k = '<div class="ui-datepicker-title">',
                o = "";
            if (h || !j) o += '<span class="ui-datepicker-month">' + i[b] + "</span>";
            else {
                i = e && e.getFullYear() == c;
                var m = f && f.getFullYear() == c;
                o += '<select class="ui-datepicker-month" onchange="DP_jQuery_' + B + ".datepicker._selectMonthYear('#" + a.id + "', this, 'M');\" >";
                for (var n = 0; n < 12; n++)
                    if ((!i || n >= e.getMonth()) &&
                        (!m || n <= f.getMonth())) o += '<option value="' + n + '"' + (n == b ? ' selected="selected"' : "") + ">" + g[n] + "</option>";
                o += "</select>"
            }
            u || (k += o + (h || !(j && l) ? "&#xa0;" : ""));
            if (!a.yearshtml) {
                a.yearshtml = "";
                if (h || !l) k += '<span class="ui-datepicker-year">' + c + "</span>";
                else {
                    g = this._get(a, "yearRange").split(":");
                    var s = (new Date).getFullYear();
                    i = function(q) {
                        q = q.match(/c[+-].*/) ? c + parseInt(q.substring(1), 10) : q.match(/[+-].*/) ? s + parseInt(q, 10) : parseInt(q, 10);
                        return isNaN(q) ? s : q
                    };
                    b = i(g[0]);
                    g = Math.max(b, i(g[1] || ""));
                    b = e ? Math.max(b,
                        e.getFullYear()) : b;
                    g = f ? Math.min(g, f.getFullYear()) : g;
                    for (a.yearshtml += '<select class="ui-datepicker-year" onchange="DP_jQuery_' + B + ".datepicker._selectMonthYear('#" + a.id + "', this, 'Y');\" >"; b <= g; b++) a.yearshtml += '<option value="' + b + '"' + (b == c ? ' selected="selected"' : "") + ">" + b + "</option>";
                    a.yearshtml += "</select>";
                    k += a.yearshtml;
                    a.yearshtml = null
                }
            }
            k += this._get(a, "yearSuffix");
            if (u) k += (h || !(j && l) ? "&#xa0;" : "") + o;
            k += "</div>";
            return k
        },
        _adjustInstDate: function(a, b, c) {
            var e = a.drawYear + (c == "Y" ? b : 0),
                f = a.drawMonth +
                (c == "M" ? b : 0);
            b = Math.min(a.selectedDay, this._getDaysInMonth(e, f)) + (c == "D" ? b : 0);
            e = this._restrictMinMax(a, this._daylightSavingAdjust(new Date(e, f, b)));
            a.selectedDay = e.getDate();
            a.drawMonth = a.selectedMonth = e.getMonth();
            a.drawYear = a.selectedYear = e.getFullYear();
            if (c == "M" || c == "Y") this._notifyChange(a)
        },
        _restrictMinMax: function(a, b) {
            var c = this._getMinMaxDate(a, "min");
            a = this._getMinMaxDate(a, "max");
            b = c && b < c ? c : b;
            return b = a && b > a ? a : b
        },
        _notifyChange: function(a) {
            var b = this._get(a, "onChangeMonthYear");
            if (b) b.apply(a.input ?
                a.input[0] : null, [a.selectedYear, a.selectedMonth + 1, a])
        },
        _getNumberOfMonths: function(a) {
            a = this._get(a, "numberOfMonths");
            return a == null ? [1, 1] : typeof a == "number" ? [1, a] : a
        },
        _getMinMaxDate: function(a, b) {
            return this._determineDate(a, this._get(a, b + "Date"), null)
        },
        _getDaysInMonth: function(a, b) {
            return 32 - this._daylightSavingAdjust(new Date(a, b, 32)).getDate()
        },
        _getFirstDayOfMonth: function(a, b) {
            return (new Date(a, b, 1)).getDay()
        },
        _canAdjustMonth: function(a, b, c, e) {
            var f = this._getNumberOfMonths(a);
            c = this._daylightSavingAdjust(new Date(c,
                e + (b < 0 ? b : f[0] * f[1]), 1));
            b < 0 && c.setDate(this._getDaysInMonth(c.getFullYear(), c.getMonth()));
            return this._isInRange(a, c)
        },
        _isInRange: function(a, b) {
            var c = this._getMinMaxDate(a, "min");
            a = this._getMinMaxDate(a, "max");
            return (!c || b.getTime() >= c.getTime()) && (!a || b.getTime() <= a.getTime())
        },
        _getFormatConfig: function(a) {
            var b = this._get(a, "shortYearCutoff");
            b = typeof b != "string" ? b : (new Date).getFullYear() % 100 + parseInt(b, 10);
            return {
                shortYearCutoff: b,
                dayNamesShort: this._get(a, "dayNamesShort"),
                dayNames: this._get(a,
                    "dayNames"),
                monthNamesShort: this._get(a, "monthNamesShort"),
                monthNames: this._get(a, "monthNames")
            }
        },
        _formatDate: function(a, b, c, e) {
            if (!b) {
                a.currentDay = a.selectedDay;
                a.currentMonth = a.selectedMonth;
                a.currentYear = a.selectedYear
            }
            b = b ? typeof b == "object" ? b : this._daylightSavingAdjust(new Date(e, c, b)) : this._daylightSavingAdjust(new Date(a.currentYear, a.currentMonth, a.currentDay));
            return this.formatDate(this._get(a, "dateFormat"), b, this._getFormatConfig(a))
        }
    });
    d.fn.datepicker = function(a) {
        if (!this.length) return this;
        if (!d.datepicker.initialized) {
            d(document).mousedown(d.datepicker._checkExternalClick).find("body").append(d.datepicker.dpDiv);
            d.datepicker.initialized = true
        }
        var b = Array.prototype.slice.call(arguments, 1);
        if (typeof a == "string" && (a == "isDisabled" || a == "getDate" || a == "widget")) return d.datepicker["_" + a + "Datepicker"].apply(d.datepicker, [this[0]].concat(b));
        if (a == "option" && arguments.length == 2 && typeof arguments[1] == "string") return d.datepicker["_" + a + "Datepicker"].apply(d.datepicker, [this[0]].concat(b));
        return this.each(function() {
            typeof a ==
                "string" ? d.datepicker["_" + a + "Datepicker"].apply(d.datepicker, [this].concat(b)) : d.datepicker._attachDatepicker(this, a)
        })
    };
    d.datepicker = new M;
    d.datepicker.initialized = false;
    d.datepicker.uuid = (new Date).getTime();
    d.datepicker.version = "1.8.15";
    window["DP_jQuery_" + B] = d
})(jQuery);;
/*
 * jQuery UI Progressbar 1.8.15
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Progressbar
 *
 * Depends:
 *   jquery.ui.core.js
 *   jquery.ui.widget.js
 */
(function(b, d) {
    b.widget("ui.progressbar", {
        options: {
            value: 0,
            max: 100
        },
        min: 0,
        _create: function() {
            this.element.addClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").attr({
                role: "progressbar",
                "aria-valuemin": this.min,
                "aria-valuemax": this.options.max,
                "aria-valuenow": this._value()
            });
            this.valueDiv = b("<div class='ui-progressbar-value ui-widget-header ui-corner-left'></div>").appendTo(this.element);
            this.oldValue = this._value();
            this._refreshValue()
        },
        destroy: function() {
            this.element.removeClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow");
            this.valueDiv.remove();
            b.Widget.prototype.destroy.apply(this, arguments)
        },
        value: function(a) {
            if (a === d) return this._value();
            this._setOption("value", a);
            return this
        },
        _setOption: function(a, c) {
            if (a === "value") {
                this.options.value = c;
                this._refreshValue();
                this._value() === this.options.max && this._trigger("complete")
            }
            b.Widget.prototype._setOption.apply(this, arguments)
        },
        _value: function() {
            var a = this.options.value;
            if (typeof a !== "number") a = 0;
            return Math.min(this.options.max, Math.max(this.min, a))
        },
        _percentage: function() {
            return 100 *
                this._value() / this.options.max
        },
        _refreshValue: function() {
            var a = this.value(),
                c = this._percentage();
            if (this.oldValue !== a) {
                this.oldValue = a;
                this._trigger("change")
            }
            this.valueDiv.toggle(a > this.min).toggleClass("ui-corner-right", a === this.options.max).width(c.toFixed(0) + "%");
            this.element.attr("aria-valuenow", a)
        }
    });
    b.extend(b.ui.progressbar, {
        version: "1.8.15"
    })
})(jQuery);;
/*
 * jQuery UI Effects 1.8.15
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Effects/
 */
jQuery.effects || function(f, j) {
    function m(c) {
        var a;
        if (c && c.constructor == Array && c.length == 3) return c;
        if (a = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(c)) return [parseInt(a[1], 10), parseInt(a[2], 10), parseInt(a[3], 10)];
        if (a = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(c)) return [parseFloat(a[1]) * 2.55, parseFloat(a[2]) * 2.55, parseFloat(a[3]) * 2.55];
        if (a = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(c)) return [parseInt(a[1],
            16), parseInt(a[2], 16), parseInt(a[3], 16)];
        if (a = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(c)) return [parseInt(a[1] + a[1], 16), parseInt(a[2] + a[2], 16), parseInt(a[3] + a[3], 16)];
        if (/rgba\(0, 0, 0, 0\)/.exec(c)) return n.transparent;
        return n[f.trim(c).toLowerCase()]
    }

    function s(c, a) {
        var b;
        do {
            b = f.curCSS(c, a);
            if (b != "" && b != "transparent" || f.nodeName(c, "body")) break;
            a = "backgroundColor"
        } while (c = c.parentNode);
        return m(b)
    }

    function o() {
        var c = document.defaultView ? document.defaultView.getComputedStyle(this, null) : this.currentStyle,
            a = {},
            b, d;
        if (c && c.length && c[0] && c[c[0]])
            for (var e = c.length; e--;) {
                b = c[e];
                if (typeof c[b] == "string") {
                    d = b.replace(/\-(\w)/g, function(g, h) {
                        return h.toUpperCase()
                    });
                    a[d] = c[b]
                }
            } else
                for (b in c)
                    if (typeof c[b] === "string") a[b] = c[b];
        return a
    }

    function p(c) {
        var a, b;
        for (a in c) {
            b = c[a];
            if (b == null || f.isFunction(b) || a in t || /scrollbar/.test(a) || !/color/i.test(a) && isNaN(parseFloat(b))) delete c[a]
        }
        return c
    }

    function u(c, a) {
        var b = {
                _: 0
            },
            d;
        for (d in a)
            if (c[d] != a[d]) b[d] = a[d];
        return b
    }

    function k(c, a, b, d) {
        if (typeof c == "object") {
            d =
                a;
            b = null;
            a = c;
            c = a.effect
        }
        if (f.isFunction(a)) {
            d = a;
            b = null;
            a = {}
        }
        if (typeof a == "number" || f.fx.speeds[a]) {
            d = b;
            b = a;
            a = {}
        }
        if (f.isFunction(b)) {
            d = b;
            b = null
        }
        a = a || {};
        b = b || a.duration;
        b = f.fx.off ? 0 : typeof b == "number" ? b : b in f.fx.speeds ? f.fx.speeds[b] : f.fx.speeds._default;
        d = d || a.complete;
        return [c, a, b, d]
    }

    function l(c) {
        if (!c || typeof c === "number" || f.fx.speeds[c]) return true;
        if (typeof c === "string" && !f.effects[c]) return true;
        return false
    }
    f.effects = {};
    f.each(["backgroundColor", "borderBottomColor", "borderLeftColor", "borderRightColor",
        "borderTopColor", "borderColor", "color", "outlineColor"
    ], function(c, a) {
        f.fx.step[a] = function(b) {
            if (!b.colorInit) {
                b.start = s(b.elem, a);
                b.end = m(b.end);
                b.colorInit = true
            }
            b.elem.style[a] = "rgb(" + Math.max(Math.min(parseInt(b.pos * (b.end[0] - b.start[0]) + b.start[0], 10), 255), 0) + "," + Math.max(Math.min(parseInt(b.pos * (b.end[1] - b.start[1]) + b.start[1], 10), 255), 0) + "," + Math.max(Math.min(parseInt(b.pos * (b.end[2] - b.start[2]) + b.start[2], 10), 255), 0) + ")"
        }
    });
    var n = {
            aqua: [0, 255, 255],
            azure: [240, 255, 255],
            beige: [245, 245, 220],
            black: [0,
                0, 0
            ],
            blue: [0, 0, 255],
            brown: [165, 42, 42],
            cyan: [0, 255, 255],
            darkblue: [0, 0, 139],
            darkcyan: [0, 139, 139],
            darkgrey: [169, 169, 169],
            darkgreen: [0, 100, 0],
            darkkhaki: [189, 183, 107],
            darkmagenta: [139, 0, 139],
            darkolivegreen: [85, 107, 47],
            darkorange: [255, 140, 0],
            darkorchid: [153, 50, 204],
            darkred: [139, 0, 0],
            darksalmon: [233, 150, 122],
            darkviolet: [148, 0, 211],
            fuchsia: [255, 0, 255],
            gold: [255, 215, 0],
            green: [0, 128, 0],
            indigo: [75, 0, 130],
            khaki: [240, 230, 140],
            lightblue: [173, 216, 230],
            lightcyan: [224, 255, 255],
            lightgreen: [144, 238, 144],
            lightgrey: [211,
                211, 211
            ],
            lightpink: [255, 182, 193],
            lightyellow: [255, 255, 224],
            lime: [0, 255, 0],
            magenta: [255, 0, 255],
            maroon: [128, 0, 0],
            navy: [0, 0, 128],
            olive: [128, 128, 0],
            orange: [255, 165, 0],
            pink: [255, 192, 203],
            purple: [128, 0, 128],
            violet: [128, 0, 128],
            red: [255, 0, 0],
            silver: [192, 192, 192],
            white: [255, 255, 255],
            yellow: [255, 255, 0],
            transparent: [255, 255, 255]
        },
        q = ["add", "remove", "toggle"],
        t = {
            border: 1,
            borderBottom: 1,
            borderColor: 1,
            borderLeft: 1,
            borderRight: 1,
            borderTop: 1,
            borderWidth: 1,
            margin: 1,
            padding: 1
        };
    f.effects.animateClass = function(c, a, b,
        d) {
        if (f.isFunction(b)) {
            d = b;
            b = null
        }
        return this.queue(function() {
            var e = f(this),
                g = e.attr("style") || " ",
                h = p(o.call(this)),
                r, v = e.attr("class");
            f.each(q, function(w, i) {
                c[i] && e[i + "Class"](c[i])
            });
            r = p(o.call(this));
            e.attr("class", v);
            e.animate(u(h, r), {
                queue: false,
                duration: a,
                easing: b,
                complete: function() {
                    f.each(q, function(w, i) {
                        c[i] && e[i + "Class"](c[i])
                    });
                    if (typeof e.attr("style") == "object") {
                        e.attr("style").cssText = "";
                        e.attr("style").cssText = g
                    } else e.attr("style", g);
                    d && d.apply(this, arguments);
                    f.dequeue(this)
                }
            })
        })
    };
    f.fn.extend({
        _addClass: f.fn.addClass,
        addClass: function(c, a, b, d) {
            return a ? f.effects.animateClass.apply(this, [{
                add: c
            }, a, b, d]) : this._addClass(c)
        },
        _removeClass: f.fn.removeClass,
        removeClass: function(c, a, b, d) {
            return a ? f.effects.animateClass.apply(this, [{
                remove: c
            }, a, b, d]) : this._removeClass(c)
        },
        _toggleClass: f.fn.toggleClass,
        toggleClass: function(c, a, b, d, e) {
            return typeof a == "boolean" || a === j ? b ? f.effects.animateClass.apply(this, [a ? {
                add: c
            } : {
                remove: c
            }, b, d, e]) : this._toggleClass(c, a) : f.effects.animateClass.apply(this, [{
                toggle: c
            }, a, b, d])
        },
        switchClass: function(c, a, b, d, e) {
            return f.effects.animateClass.apply(this, [{
                add: a,
                remove: c
            }, b, d, e])
        }
    });
    f.extend(f.effects, {
        version: "1.8.15",
        save: function(c, a) {
            for (var b = 0; b < a.length; b++) a[b] !== null && c.data("ec.storage." + a[b], c[0].style[a[b]])
        },
        restore: function(c, a) {
            for (var b = 0; b < a.length; b++) a[b] !== null && c.css(a[b], c.data("ec.storage." + a[b]))
        },
        setMode: function(c, a) {
            if (a == "toggle") a = c.is(":hidden") ? "show" : "hide";
            return a
        },
        getBaseline: function(c, a) {
            var b;
            switch (c[0]) {
                case "top":
                    b =
                        0;
                    break;
                case "middle":
                    b = 0.5;
                    break;
                case "bottom":
                    b = 1;
                    break;
                default:
                    b = c[0] / a.height
            }
            switch (c[1]) {
                case "left":
                    c = 0;
                    break;
                case "center":
                    c = 0.5;
                    break;
                case "right":
                    c = 1;
                    break;
                default:
                    c = c[1] / a.width
            }
            return {
                x: c,
                y: b
            }
        },
        createWrapper: function(c) {
            if (c.parent().is(".ui-effects-wrapper")) return c.parent();
            var a = {
                    width: c.outerWidth(true),
                    height: c.outerHeight(true),
                    "float": c.css("float")
                },
                b = f("<div></div>").addClass("ui-effects-wrapper").css({
                    fontSize: "100%",
                    background: "transparent",
                    border: "none",
                    margin: 0,
                    padding: 0
                });
            c.wrap(b);
            b = c.parent();
            if (c.css("position") == "static") {
                b.css({
                    position: "relative"
                });
                c.css({
                    position: "relative"
                })
            } else {
                f.extend(a, {
                    position: c.css("position"),
                    zIndex: c.css("z-index")
                });
                f.each(["top", "left", "bottom", "right"], function(d, e) {
                    a[e] = c.css(e);
                    if (isNaN(parseInt(a[e], 10))) a[e] = "auto"
                });
                c.css({
                    position: "relative",
                    top: 0,
                    left: 0,
                    right: "auto",
                    bottom: "auto"
                })
            }
            return b.css(a).show()
        },
        removeWrapper: function(c) {
            if (c.parent().is(".ui-effects-wrapper")) return c.parent().replaceWith(c);
            return c
        },
        setTransition: function(c,
            a, b, d) {
            d = d || {};
            f.each(a, function(e, g) {
                unit = c.cssUnit(g);
                if (unit[0] > 0) d[g] = unit[0] * b + unit[1]
            });
            return d
        }
    });
    f.fn.extend({
        effect: function(c) {
            var a = k.apply(this, arguments),
                b = {
                    options: a[1],
                    duration: a[2],
                    callback: a[3]
                };
            a = b.options.mode;
            var d = f.effects[c];
            if (f.fx.off || !d) return a ? this[a](b.duration, b.callback) : this.each(function() {
                b.callback && b.callback.call(this)
            });
            return d.call(this, b)
        },
        _show: f.fn.show,
        show: function(c) {
            if (l(c)) return this._show.apply(this, arguments);
            else {
                var a = k.apply(this, arguments);
                a[1].mode = "show";
                return this.effect.apply(this, a)
            }
        },
        _hide: f.fn.hide,
        hide: function(c) {
            if (l(c)) return this._hide.apply(this, arguments);
            else {
                var a = k.apply(this, arguments);
                a[1].mode = "hide";
                return this.effect.apply(this, a)
            }
        },
        __toggle: f.fn.toggle,
        toggle: function(c) {
            if (l(c) || typeof c === "boolean" || f.isFunction(c)) return this.__toggle.apply(this, arguments);
            else {
                var a = k.apply(this, arguments);
                a[1].mode = "toggle";
                return this.effect.apply(this, a)
            }
        },
        cssUnit: function(c) {
            var a = this.css(c),
                b = [];
            f.each(["em", "px", "%",
                "pt"
            ], function(d, e) {
                if (a.indexOf(e) > 0) b = [parseFloat(a), e]
            });
            return b
        }
    });
    f.easing.jswing = f.easing.swing;
    f.extend(f.easing, {
        def: "easeOutQuad",
        swing: function(c, a, b, d, e) {
            return f.easing[f.easing.def](c, a, b, d, e)
        },
        easeInQuad: function(c, a, b, d, e) {
            return d * (a /= e) * a + b
        },
        easeOutQuad: function(c, a, b, d, e) {
            return -d * (a /= e) * (a - 2) + b
        },
        easeInOutQuad: function(c, a, b, d, e) {
            if ((a /= e / 2) < 1) return d / 2 * a * a + b;
            return -d / 2 * (--a * (a - 2) - 1) + b
        },
        easeInCubic: function(c, a, b, d, e) {
            return d * (a /= e) * a * a + b
        },
        easeOutCubic: function(c, a, b, d, e) {
            return d *
                ((a = a / e - 1) * a * a + 1) + b
        },
        easeInOutCubic: function(c, a, b, d, e) {
            if ((a /= e / 2) < 1) return d / 2 * a * a * a + b;
            return d / 2 * ((a -= 2) * a * a + 2) + b
        },
        easeInQuart: function(c, a, b, d, e) {
            return d * (a /= e) * a * a * a + b
        },
        easeOutQuart: function(c, a, b, d, e) {
            return -d * ((a = a / e - 1) * a * a * a - 1) + b
        },
        easeInOutQuart: function(c, a, b, d, e) {
            if ((a /= e / 2) < 1) return d / 2 * a * a * a * a + b;
            return -d / 2 * ((a -= 2) * a * a * a - 2) + b
        },
        easeInQuint: function(c, a, b, d, e) {
            return d * (a /= e) * a * a * a * a + b
        },
        easeOutQuint: function(c, a, b, d, e) {
            return d * ((a = a / e - 1) * a * a * a * a + 1) + b
        },
        easeInOutQuint: function(c, a, b, d, e) {
            if ((a /=
                    e / 2) < 1) return d / 2 * a * a * a * a * a + b;
            return d / 2 * ((a -= 2) * a * a * a * a + 2) + b
        },
        easeInSine: function(c, a, b, d, e) {
            return -d * Math.cos(a / e * (Math.PI / 2)) + d + b
        },
        easeOutSine: function(c, a, b, d, e) {
            return d * Math.sin(a / e * (Math.PI / 2)) + b
        },
        easeInOutSine: function(c, a, b, d, e) {
            return -d / 2 * (Math.cos(Math.PI * a / e) - 1) + b
        },
        easeInExpo: function(c, a, b, d, e) {
            return a == 0 ? b : d * Math.pow(2, 10 * (a / e - 1)) + b
        },
        easeOutExpo: function(c, a, b, d, e) {
            return a == e ? b + d : d * (-Math.pow(2, -10 * a / e) + 1) + b
        },
        easeInOutExpo: function(c, a, b, d, e) {
            if (a == 0) return b;
            if (a == e) return b + d;
            if ((a /=
                    e / 2) < 1) return d / 2 * Math.pow(2, 10 * (a - 1)) + b;
            return d / 2 * (-Math.pow(2, -10 * --a) + 2) + b
        },
        easeInCirc: function(c, a, b, d, e) {
            return -d * (Math.sqrt(1 - (a /= e) * a) - 1) + b
        },
        easeOutCirc: function(c, a, b, d, e) {
            return d * Math.sqrt(1 - (a = a / e - 1) * a) + b
        },
        easeInOutCirc: function(c, a, b, d, e) {
            if ((a /= e / 2) < 1) return -d / 2 * (Math.sqrt(1 - a * a) - 1) + b;
            return d / 2 * (Math.sqrt(1 - (a -= 2) * a) + 1) + b
        },
        easeInElastic: function(c, a, b, d, e) {
            c = 1.70158;
            var g = 0,
                h = d;
            if (a == 0) return b;
            if ((a /= e) == 1) return b + d;
            g || (g = e * 0.3);
            if (h < Math.abs(d)) {
                h = d;
                c = g / 4
            } else c = g / (2 * Math.PI) * Math.asin(d /
                h);
            return -(h * Math.pow(2, 10 * (a -= 1)) * Math.sin((a * e - c) * 2 * Math.PI / g)) + b
        },
        easeOutElastic: function(c, a, b, d, e) {
            c = 1.70158;
            var g = 0,
                h = d;
            if (a == 0) return b;
            if ((a /= e) == 1) return b + d;
            g || (g = e * 0.3);
            if (h < Math.abs(d)) {
                h = d;
                c = g / 4
            } else c = g / (2 * Math.PI) * Math.asin(d / h);
            return h * Math.pow(2, -10 * a) * Math.sin((a * e - c) * 2 * Math.PI / g) + d + b
        },
        easeInOutElastic: function(c, a, b, d, e) {
            c = 1.70158;
            var g = 0,
                h = d;
            if (a == 0) return b;
            if ((a /= e / 2) == 2) return b + d;
            g || (g = e * 0.3 * 1.5);
            if (h < Math.abs(d)) {
                h = d;
                c = g / 4
            } else c = g / (2 * Math.PI) * Math.asin(d / h);
            if (a < 1) return -0.5 *
                h * Math.pow(2, 10 * (a -= 1)) * Math.sin((a * e - c) * 2 * Math.PI / g) + b;
            return h * Math.pow(2, -10 * (a -= 1)) * Math.sin((a * e - c) * 2 * Math.PI / g) * 0.5 + d + b
        },
        easeInBack: function(c, a, b, d, e, g) {
            if (g == j) g = 1.70158;
            return d * (a /= e) * a * ((g + 1) * a - g) + b
        },
        easeOutBack: function(c, a, b, d, e, g) {
            if (g == j) g = 1.70158;
            return d * ((a = a / e - 1) * a * ((g + 1) * a + g) + 1) + b
        },
        easeInOutBack: function(c, a, b, d, e, g) {
            if (g == j) g = 1.70158;
            if ((a /= e / 2) < 1) return d / 2 * a * a * (((g *= 1.525) + 1) * a - g) + b;
            return d / 2 * ((a -= 2) * a * (((g *= 1.525) + 1) * a + g) + 2) + b
        },
        easeInBounce: function(c, a, b, d, e) {
            return d - f.easing.easeOutBounce(c,
                e - a, 0, d, e) + b
        },
        easeOutBounce: function(c, a, b, d, e) {
            return (a /= e) < 1 / 2.75 ? d * 7.5625 * a * a + b : a < 2 / 2.75 ? d * (7.5625 * (a -= 1.5 / 2.75) * a + 0.75) + b : a < 2.5 / 2.75 ? d * (7.5625 * (a -= 2.25 / 2.75) * a + 0.9375) + b : d * (7.5625 * (a -= 2.625 / 2.75) * a + 0.984375) + b
        },
        easeInOutBounce: function(c, a, b, d, e) {
            if (a < e / 2) return f.easing.easeInBounce(c, a * 2, 0, d, e) * 0.5 + b;
            return f.easing.easeOutBounce(c, a * 2 - e, 0, d, e) * 0.5 + d * 0.5 + b
        }
    })
}(jQuery);;
/*
 * jQuery UI Effects Blind 1.8.15
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Effects/Blind
 *
 * Depends:
 *	jquery.effects.core.js
 */
(function(b) {
    b.effects.blind = function(c) {
        return this.queue(function() {
            var a = b(this),
                g = ["position", "top", "bottom", "left", "right"],
                f = b.effects.setMode(a, c.options.mode || "hide"),
                d = c.options.direction || "vertical";
            b.effects.save(a, g);
            a.show();
            var e = b.effects.createWrapper(a).css({
                    overflow: "hidden"
                }),
                h = d == "vertical" ? "height" : "width";
            d = d == "vertical" ? e.height() : e.width();
            f == "show" && e.css(h, 0);
            var i = {};
            i[h] = f == "show" ? d : 0;
            e.animate(i, c.duration, c.options.easing, function() {
                f == "hide" && a.hide();
                b.effects.restore(a,
                    g);
                b.effects.removeWrapper(a);
                c.callback && c.callback.apply(a[0], arguments);
                a.dequeue()
            })
        })
    }
})(jQuery);;
/*
 * jQuery UI Effects Bounce 1.8.15
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Effects/Bounce
 *
 * Depends:
 *	jquery.effects.core.js
 */
(function(e) {
    e.effects.bounce = function(b) {
        return this.queue(function() {
            var a = e(this),
                l = ["position", "top", "bottom", "left", "right"],
                h = e.effects.setMode(a, b.options.mode || "effect"),
                d = b.options.direction || "up",
                c = b.options.distance || 20,
                m = b.options.times || 5,
                i = b.duration || 250;
            /show|hide/.test(h) && l.push("opacity");
            e.effects.save(a, l);
            a.show();
            e.effects.createWrapper(a);
            var f = d == "up" || d == "down" ? "top" : "left";
            d = d == "up" || d == "left" ? "pos" : "neg";
            c = b.options.distance || (f == "top" ? a.outerHeight({
                    margin: true
                }) / 3 : a.outerWidth({
                    margin: true
                }) /
                3);
            if (h == "show") a.css("opacity", 0).css(f, d == "pos" ? -c : c);
            if (h == "hide") c /= m * 2;
            h != "hide" && m--;
            if (h == "show") {
                var g = {
                    opacity: 1
                };
                g[f] = (d == "pos" ? "+=" : "-=") + c;
                a.animate(g, i / 2, b.options.easing);
                c /= 2;
                m--
            }
            for (g = 0; g < m; g++) {
                var j = {},
                    k = {};
                j[f] = (d == "pos" ? "-=" : "+=") + c;
                k[f] = (d == "pos" ? "+=" : "-=") + c;
                a.animate(j, i / 2, b.options.easing).animate(k, i / 2, b.options.easing);
                c = h == "hide" ? c * 2 : c / 2
            }
            if (h == "hide") {
                g = {
                    opacity: 0
                };
                g[f] = (d == "pos" ? "-=" : "+=") + c;
                a.animate(g, i / 2, b.options.easing, function() {
                    a.hide();
                    e.effects.restore(a, l);
                    e.effects.removeWrapper(a);
                    b.callback && b.callback.apply(this, arguments)
                })
            } else {
                j = {};
                k = {};
                j[f] = (d == "pos" ? "-=" : "+=") + c;
                k[f] = (d == "pos" ? "+=" : "-=") + c;
                a.animate(j, i / 2, b.options.easing).animate(k, i / 2, b.options.easing, function() {
                    e.effects.restore(a, l);
                    e.effects.removeWrapper(a);
                    b.callback && b.callback.apply(this, arguments)
                })
            }
            a.queue("fx", function() {
                a.dequeue()
            });
            a.dequeue()
        })
    }
})(jQuery);;
/*
 * jQuery UI Effects Clip 1.8.15
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Effects/Clip
 *
 * Depends:
 *	jquery.effects.core.js
 */
(function(b) {
    b.effects.clip = function(e) {
        return this.queue(function() {
            var a = b(this),
                i = ["position", "top", "bottom", "left", "right", "height", "width"],
                f = b.effects.setMode(a, e.options.mode || "hide"),
                c = e.options.direction || "vertical";
            b.effects.save(a, i);
            a.show();
            var d = b.effects.createWrapper(a).css({
                overflow: "hidden"
            });
            d = a[0].tagName == "IMG" ? d : a;
            var g = {
                size: c == "vertical" ? "height" : "width",
                position: c == "vertical" ? "top" : "left"
            };
            c = c == "vertical" ? d.height() : d.width();
            if (f == "show") {
                d.css(g.size, 0);
                d.css(g.position,
                    c / 2)
            }
            var h = {};
            h[g.size] = f == "show" ? c : 0;
            h[g.position] = f == "show" ? 0 : c / 2;
            d.animate(h, {
                queue: false,
                duration: e.duration,
                easing: e.options.easing,
                complete: function() {
                    f == "hide" && a.hide();
                    b.effects.restore(a, i);
                    b.effects.removeWrapper(a);
                    e.callback && e.callback.apply(a[0], arguments);
                    a.dequeue()
                }
            })
        })
    }
})(jQuery);;
/*
 * jQuery UI Effects Drop 1.8.15
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Effects/Drop
 *
 * Depends:
 *	jquery.effects.core.js
 */
(function(c) {
    c.effects.drop = function(d) {
        return this.queue(function() {
            var a = c(this),
                h = ["position", "top", "bottom", "left", "right", "opacity"],
                e = c.effects.setMode(a, d.options.mode || "hide"),
                b = d.options.direction || "left";
            c.effects.save(a, h);
            a.show();
            c.effects.createWrapper(a);
            var f = b == "up" || b == "down" ? "top" : "left";
            b = b == "up" || b == "left" ? "pos" : "neg";
            var g = d.options.distance || (f == "top" ? a.outerHeight({
                margin: true
            }) / 2 : a.outerWidth({
                margin: true
            }) / 2);
            if (e == "show") a.css("opacity", 0).css(f, b == "pos" ? -g : g);
            var i = {
                opacity: e ==
                    "show" ? 1 : 0
            };
            i[f] = (e == "show" ? b == "pos" ? "+=" : "-=" : b == "pos" ? "-=" : "+=") + g;
            a.animate(i, {
                queue: false,
                duration: d.duration,
                easing: d.options.easing,
                complete: function() {
                    e == "hide" && a.hide();
                    c.effects.restore(a, h);
                    c.effects.removeWrapper(a);
                    d.callback && d.callback.apply(this, arguments);
                    a.dequeue()
                }
            })
        })
    }
})(jQuery);;
/*
 * jQuery UI Effects Explode 1.8.15
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Effects/Explode
 *
 * Depends:
 *	jquery.effects.core.js
 */
(function(j) {
    j.effects.explode = function(a) {
        return this.queue(function() {
            var c = a.options.pieces ? Math.round(Math.sqrt(a.options.pieces)) : 3,
                d = a.options.pieces ? Math.round(Math.sqrt(a.options.pieces)) : 3;
            a.options.mode = a.options.mode == "toggle" ? j(this).is(":visible") ? "hide" : "show" : a.options.mode;
            var b = j(this).show().css("visibility", "hidden"),
                g = b.offset();
            g.top -= parseInt(b.css("marginTop"), 10) || 0;
            g.left -= parseInt(b.css("marginLeft"), 10) || 0;
            for (var h = b.outerWidth(true), i = b.outerHeight(true), e = 0; e < c; e++)
                for (var f =
                        0; f < d; f++) b.clone().appendTo("body").wrap("<div></div>").css({
                    position: "absolute",
                    visibility: "visible",
                    left: -f * (h / d),
                    top: -e * (i / c)
                }).parent().addClass("ui-effects-explode").css({
                    position: "absolute",
                    overflow: "hidden",
                    width: h / d,
                    height: i / c,
                    left: g.left + f * (h / d) + (a.options.mode == "show" ? (f - Math.floor(d / 2)) * (h / d) : 0),
                    top: g.top + e * (i / c) + (a.options.mode == "show" ? (e - Math.floor(c / 2)) * (i / c) : 0),
                    opacity: a.options.mode == "show" ? 0 : 1
                }).animate({
                    left: g.left + f * (h / d) + (a.options.mode == "show" ? 0 : (f - Math.floor(d / 2)) * (h / d)),
                    top: g.top +
                        e * (i / c) + (a.options.mode == "show" ? 0 : (e - Math.floor(c / 2)) * (i / c)),
                    opacity: a.options.mode == "show" ? 1 : 0
                }, a.duration || 500);
            setTimeout(function() {
                a.options.mode == "show" ? b.css({
                    visibility: "visible"
                }) : b.css({
                    visibility: "visible"
                }).hide();
                a.callback && a.callback.apply(b[0]);
                b.dequeue();
                j("div.ui-effects-explode").remove()
            }, a.duration || 500)
        })
    }
})(jQuery);;
/*
 * jQuery UI Effects Fade 1.8.15
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Effects/Fade
 *
 * Depends:
 *	jquery.effects.core.js
 */
(function(b) {
    b.effects.fade = function(a) {
        return this.queue(function() {
            var c = b(this),
                d = b.effects.setMode(c, a.options.mode || "hide");
            c.animate({
                opacity: d
            }, {
                queue: false,
                duration: a.duration,
                easing: a.options.easing,
                complete: function() {
                    a.callback && a.callback.apply(this, arguments);
                    c.dequeue()
                }
            })
        })
    }
})(jQuery);;
/*
 * jQuery UI Effects Fold 1.8.15
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Effects/Fold
 *
 * Depends:
 *	jquery.effects.core.js
 */
(function(c) {
    c.effects.fold = function(a) {
        return this.queue(function() {
            var b = c(this),
                j = ["position", "top", "bottom", "left", "right"],
                d = c.effects.setMode(b, a.options.mode || "hide"),
                g = a.options.size || 15,
                h = !!a.options.horizFirst,
                k = a.duration ? a.duration / 2 : c.fx.speeds._default / 2;
            c.effects.save(b, j);
            b.show();
            var e = c.effects.createWrapper(b).css({
                    overflow: "hidden"
                }),
                f = d == "show" != h,
                l = f ? ["width", "height"] : ["height", "width"];
            f = f ? [e.width(), e.height()] : [e.height(), e.width()];
            var i = /([0-9]+)%/.exec(g);
            if (i) g = parseInt(i[1],
                10) / 100 * f[d == "hide" ? 0 : 1];
            if (d == "show") e.css(h ? {
                height: 0,
                width: g
            } : {
                height: g,
                width: 0
            });
            h = {};
            i = {};
            h[l[0]] = d == "show" ? f[0] : g;
            i[l[1]] = d == "show" ? f[1] : 0;
            e.animate(h, k, a.options.easing).animate(i, k, a.options.easing, function() {
                d == "hide" && b.hide();
                c.effects.restore(b, j);
                c.effects.removeWrapper(b);
                a.callback && a.callback.apply(b[0], arguments);
                b.dequeue()
            })
        })
    }
})(jQuery);;
/*
 * jQuery UI Effects Highlight 1.8.15
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Effects/Highlight
 *
 * Depends:
 *	jquery.effects.core.js
 */
(function(b) {
    b.effects.highlight = function(c) {
        return this.queue(function() {
            var a = b(this),
                e = ["backgroundImage", "backgroundColor", "opacity"],
                d = b.effects.setMode(a, c.options.mode || "show"),
                f = {
                    backgroundColor: a.css("backgroundColor")
                };
            if (d == "hide") f.opacity = 0;
            b.effects.save(a, e);
            a.show().css({
                backgroundImage: "none",
                backgroundColor: c.options.color || "#ffff99"
            }).animate(f, {
                queue: false,
                duration: c.duration,
                easing: c.options.easing,
                complete: function() {
                    d == "hide" && a.hide();
                    b.effects.restore(a, e);
                    d == "show" && !b.support.opacity &&
                        this.style.removeAttribute("filter");
                    c.callback && c.callback.apply(this, arguments);
                    a.dequeue()
                }
            })
        })
    }
})(jQuery);;
/*
 * jQuery UI Effects Pulsate 1.8.15
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Effects/Pulsate
 *
 * Depends:
 *	jquery.effects.core.js
 */
(function(d) {
    d.effects.pulsate = function(a) {
        return this.queue(function() {
            var b = d(this),
                c = d.effects.setMode(b, a.options.mode || "show");
            times = (a.options.times || 5) * 2 - 1;
            duration = a.duration ? a.duration / 2 : d.fx.speeds._default / 2;
            isVisible = b.is(":visible");
            animateTo = 0;
            if (!isVisible) {
                b.css("opacity", 0).show();
                animateTo = 1
            }
            if (c == "hide" && isVisible || c == "show" && !isVisible) times--;
            for (c = 0; c < times; c++) {
                b.animate({
                    opacity: animateTo
                }, duration, a.options.easing);
                animateTo = (animateTo + 1) % 2
            }
            b.animate({
                    opacity: animateTo
                }, duration,
                a.options.easing,
                function() {
                    animateTo == 0 && b.hide();
                    a.callback && a.callback.apply(this, arguments)
                });
            b.queue("fx", function() {
                b.dequeue()
            }).dequeue()
        })
    }
})(jQuery);;
/*
 * jQuery UI Effects Scale 1.8.15
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Effects/Scale
 *
 * Depends:
 *	jquery.effects.core.js
 */
(function(c) {
    c.effects.puff = function(b) {
        return this.queue(function() {
            var a = c(this),
                e = c.effects.setMode(a, b.options.mode || "hide"),
                g = parseInt(b.options.percent, 10) || 150,
                h = g / 100,
                i = {
                    height: a.height(),
                    width: a.width()
                };
            c.extend(b.options, {
                fade: true,
                mode: e,
                percent: e == "hide" ? g : 100,
                from: e == "hide" ? i : {
                    height: i.height * h,
                    width: i.width * h
                }
            });
            a.effect("scale", b.options, b.duration, b.callback);
            a.dequeue()
        })
    };
    c.effects.scale = function(b) {
        return this.queue(function() {
            var a = c(this),
                e = c.extend(true, {}, b.options),
                g = c.effects.setMode(a,
                    b.options.mode || "effect"),
                h = parseInt(b.options.percent, 10) || (parseInt(b.options.percent, 10) == 0 ? 0 : g == "hide" ? 0 : 100),
                i = b.options.direction || "both",
                f = b.options.origin;
            if (g != "effect") {
                e.origin = f || ["middle", "center"];
                e.restore = true
            }
            f = {
                height: a.height(),
                width: a.width()
            };
            a.from = b.options.from || (g == "show" ? {
                height: 0,
                width: 0
            } : f);
            h = {
                y: i != "horizontal" ? h / 100 : 1,
                x: i != "vertical" ? h / 100 : 1
            };
            a.to = {
                height: f.height * h.y,
                width: f.width * h.x
            };
            if (b.options.fade) {
                if (g == "show") {
                    a.from.opacity = 0;
                    a.to.opacity = 1
                }
                if (g == "hide") {
                    a.from.opacity =
                        1;
                    a.to.opacity = 0
                }
            }
            e.from = a.from;
            e.to = a.to;
            e.mode = g;
            a.effect("size", e, b.duration, b.callback);
            a.dequeue()
        })
    };
    c.effects.size = function(b) {
        return this.queue(function() {
            var a = c(this),
                e = ["position", "top", "bottom", "left", "right", "width", "height", "overflow", "opacity"],
                g = ["position", "top", "bottom", "left", "right", "overflow", "opacity"],
                h = ["width", "height", "overflow"],
                i = ["fontSize"],
                f = ["borderTopWidth", "borderBottomWidth", "paddingTop", "paddingBottom"],
                k = ["borderLeftWidth", "borderRightWidth", "paddingLeft", "paddingRight"],
                p = c.effects.setMode(a, b.options.mode || "effect"),
                n = b.options.restore || false,
                m = b.options.scale || "both",
                l = b.options.origin,
                j = {
                    height: a.height(),
                    width: a.width()
                };
            a.from = b.options.from || j;
            a.to = b.options.to || j;
            if (l) {
                l = c.effects.getBaseline(l, j);
                a.from.top = (j.height - a.from.height) * l.y;
                a.from.left = (j.width - a.from.width) * l.x;
                a.to.top = (j.height - a.to.height) * l.y;
                a.to.left = (j.width - a.to.width) * l.x
            }
            var d = {
                from: {
                    y: a.from.height / j.height,
                    x: a.from.width / j.width
                },
                to: {
                    y: a.to.height / j.height,
                    x: a.to.width / j.width
                }
            };
            if (m == "box" || m == "both") {
                if (d.from.y != d.to.y) {
                    e = e.concat(f);
                    a.from = c.effects.setTransition(a, f, d.from.y, a.from);
                    a.to = c.effects.setTransition(a, f, d.to.y, a.to)
                }
                if (d.from.x != d.to.x) {
                    e = e.concat(k);
                    a.from = c.effects.setTransition(a, k, d.from.x, a.from);
                    a.to = c.effects.setTransition(a, k, d.to.x, a.to)
                }
            }
            if (m == "content" || m == "both")
                if (d.from.y != d.to.y) {
                    e = e.concat(i);
                    a.from = c.effects.setTransition(a, i, d.from.y, a.from);
                    a.to = c.effects.setTransition(a, i, d.to.y, a.to)
                }
            c.effects.save(a, n ? e : g);
            a.show();
            c.effects.createWrapper(a);
            a.css("overflow", "hidden").css(a.from);
            if (m == "content" || m == "both") {
                f = f.concat(["marginTop", "marginBottom"]).concat(i);
                k = k.concat(["marginLeft", "marginRight"]);
                h = e.concat(f).concat(k);
                a.find("*[width]").each(function() {
                    child = c(this);
                    n && c.effects.save(child, h);
                    var o = {
                        height: child.height(),
                        width: child.width()
                    };
                    child.from = {
                        height: o.height * d.from.y,
                        width: o.width * d.from.x
                    };
                    child.to = {
                        height: o.height * d.to.y,
                        width: o.width * d.to.x
                    };
                    if (d.from.y != d.to.y) {
                        child.from = c.effects.setTransition(child, f, d.from.y, child.from);
                        child.to = c.effects.setTransition(child, f, d.to.y, child.to)
                    }
                    if (d.from.x != d.to.x) {
                        child.from = c.effects.setTransition(child, k, d.from.x, child.from);
                        child.to = c.effects.setTransition(child, k, d.to.x, child.to)
                    }
                    child.css(child.from);
                    child.animate(child.to, b.duration, b.options.easing, function() {
                        n && c.effects.restore(child, h)
                    })
                })
            }
            a.animate(a.to, {
                queue: false,
                duration: b.duration,
                easing: b.options.easing,
                complete: function() {
                    a.to.opacity === 0 && a.css("opacity", a.from.opacity);
                    p == "hide" && a.hide();
                    c.effects.restore(a,
                        n ? e : g);
                    c.effects.removeWrapper(a);
                    b.callback && b.callback.apply(this, arguments);
                    a.dequeue()
                }
            })
        })
    }
})(jQuery);;
/*
 * jQuery UI Effects Shake 1.8.15
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Effects/Shake
 *
 * Depends:
 *	jquery.effects.core.js
 */
(function(d) {
    d.effects.shake = function(a) {
        return this.queue(function() {
            var b = d(this),
                j = ["position", "top", "bottom", "left", "right"];
            d.effects.setMode(b, a.options.mode || "effect");
            var c = a.options.direction || "left",
                e = a.options.distance || 20,
                l = a.options.times || 3,
                f = a.duration || a.options.duration || 140;
            d.effects.save(b, j);
            b.show();
            d.effects.createWrapper(b);
            var g = c == "up" || c == "down" ? "top" : "left",
                h = c == "up" || c == "left" ? "pos" : "neg";
            c = {};
            var i = {},
                k = {};
            c[g] = (h == "pos" ? "-=" : "+=") + e;
            i[g] = (h == "pos" ? "+=" : "-=") + e * 2;
            k[g] =
                (h == "pos" ? "-=" : "+=") + e * 2;
            b.animate(c, f, a.options.easing);
            for (e = 1; e < l; e++) b.animate(i, f, a.options.easing).animate(k, f, a.options.easing);
            b.animate(i, f, a.options.easing).animate(c, f / 2, a.options.easing, function() {
                d.effects.restore(b, j);
                d.effects.removeWrapper(b);
                a.callback && a.callback.apply(this, arguments)
            });
            b.queue("fx", function() {
                b.dequeue()
            });
            b.dequeue()
        })
    }
})(jQuery);;
/*
 * jQuery UI Effects Slide 1.8.15
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Effects/Slide
 *
 * Depends:
 *	jquery.effects.core.js
 */
(function(c) {
    c.effects.slide = function(d) {
        return this.queue(function() {
            var a = c(this),
                h = ["position", "top", "bottom", "left", "right"],
                f = c.effects.setMode(a, d.options.mode || "show"),
                b = d.options.direction || "left";
            c.effects.save(a, h);
            a.show();
            c.effects.createWrapper(a).css({
                overflow: "hidden"
            });
            var g = b == "up" || b == "down" ? "top" : "left";
            b = b == "up" || b == "left" ? "pos" : "neg";
            var e = d.options.distance || (g == "top" ? a.outerHeight({
                margin: true
            }) : a.outerWidth({
                margin: true
            }));
            if (f == "show") a.css(g, b == "pos" ? isNaN(e) ? "-" + e : -e : e);
            var i = {};
            i[g] = (f == "show" ? b == "pos" ? "+=" : "-=" : b == "pos" ? "-=" : "+=") + e;
            a.animate(i, {
                queue: false,
                duration: d.duration,
                easing: d.options.easing,
                complete: function() {
                    f == "hide" && a.hide();
                    c.effects.restore(a, h);
                    c.effects.removeWrapper(a);
                    d.callback && d.callback.apply(this, arguments);
                    a.dequeue()
                }
            })
        })
    }
})(jQuery);;
/*
 * jQuery UI Effects Transfer 1.8.15
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Effects/Transfer
 *
 * Depends:
 *	jquery.effects.core.js
 */
(function(e) {
    e.effects.transfer = function(a) {
        return this.queue(function() {
            var b = e(this),
                c = e(a.options.to),
                d = c.offset();
            c = {
                top: d.top,
                left: d.left,
                height: c.innerHeight(),
                width: c.innerWidth()
            };
            d = b.offset();
            var f = e('<div class="ui-effects-transfer"></div>').appendTo(document.body).addClass(a.options.className).css({
                top: d.top,
                left: d.left,
                height: b.innerHeight(),
                width: b.innerWidth(),
                position: "absolute"
            }).animate(c, a.duration, a.options.easing, function() {
                f.remove();
                a.callback && a.callback.apply(b[0], arguments);
                b.dequeue()
            })
        })
    }
})(jQuery);;
(function($, window, document) {
    $.fn.dataTableSettings = [];
    var _aoSettings = $.fn.dataTableSettings;
    $.fn.dataTableExt = {};
    var _oExt = $.fn.dataTableExt;
    _oExt.sVersion = "1.8.1";
    _oExt.sErrMode = "alert";
    _oExt.iApiIndex = 0;
    _oExt.oApi = {};
    _oExt.afnFiltering = [];
    _oExt.aoFeatures = [];
    _oExt.ofnSearch = {};
    _oExt.afnSortData = [];
    _oExt.oStdClasses = {
        sPagePrevEnabled: "paginate_enabled_previous",
        sPagePrevDisabled: "paginate_disabled_previous",
        sPageNextEnabled: "paginate_enabled_next",
        sPageNextDisabled: "paginate_disabled_next",
        sPageJUINext: "",
        sPageJUIPrev: "",
        sPageButton: "paginate_button",
        sPageButtonActive: "paginate_active",
        sPageButtonStaticDisabled: "paginate_button paginate_button_disabled",
        sPageFirst: "first",
        sPagePrevious: "previous",
        sPageNext: "next",
        sPageLast: "last",
        sStripOdd: "odd",
        sStripEven: "even",
        sRowEmpty: "dataTables_empty",
        sWrapper: "dataTables_wrapper",
        sFilter: "dataTables_filter",
        sInfo: "dataTables_info",
        sPaging: "dataTables_paginate paging_",
        sLength: "dataTables_length",
        sProcessing: "dataTables_processing",
        sSortAsc: "sorting_asc",
        sSortDesc: "sorting_desc",
        sSortable: "sorting",
        sSortableAsc: "sorting_asc_disabled",
        sSortableDesc: "sorting_desc_disabled",
        sSortableNone: "sorting_disabled",
        sSortColumn: "sorting_",
        sSortJUIAsc: "",
        sSortJUIDesc: "",
        sSortJUI: "",
        sSortJUIAscAllowed: "",
        sSortJUIDescAllowed: "",
        sSortJUIWrapper: "",
        sSortIcon: "",
        sScrollWrapper: "dataTables_scroll",
        sScrollHead: "dataTables_scrollHead",
        sScrollHeadInner: "dataTables_scrollHeadInner",
        sScrollBody: "dataTables_scrollBody",
        sScrollFoot: "dataTables_scrollFoot",
        sScrollFootInner: "dataTables_scrollFootInner",
        sFooterTH: ""
    };
    _oExt.oJUIClasses = {
        sPagePrevEnabled: "fg-button ui-button ui-state-default ui-corner-left",
        sPagePrevDisabled: "fg-button ui-button ui-state-default ui-corner-left ui-state-disabled",
        sPageNextEnabled: "fg-button ui-button ui-state-default ui-corner-right",
        sPageNextDisabled: "fg-button ui-button ui-state-default ui-corner-right ui-state-disabled",
        sPageJUINext: "ui-icon ui-icon-circle-arrow-e",
        sPageJUIPrev: "ui-icon ui-icon-circle-arrow-w",
        sPageButton: "fg-button ui-button ui-state-default",
        sPageButtonActive: "fg-button ui-button ui-state-default ui-state-disabled",
        sPageButtonStaticDisabled: "fg-button ui-button ui-state-default ui-state-disabled",
        sPageFirst: "first ui-corner-tl ui-corner-bl",
        sPagePrevious: "previous",
        sPageNext: "next",
        sPageLast: "last ui-corner-tr ui-corner-br",
        sStripOdd: "odd",
        sStripEven: "even",
        sRowEmpty: "dataTables_empty",
        sWrapper: "dataTables_wrapper",
        sFilter: "dataTables_filter",
        sInfo: "dataTables_info",
        sPaging: "dataTables_paginate fg-buttonset ui-buttonset fg-buttonset-multi ui-buttonset-multi paging_",
        sLength: "dataTables_length",
        sProcessing: "dataTables_processing",
        sSortAsc: "ui-state-default",
        sSortDesc: "ui-state-default",
        sSortable: "ui-state-default",
        sSortableAsc: "ui-state-default",
        sSortableDesc: "ui-state-default",
        sSortableNone: "ui-state-default",
        sSortColumn: "sorting_",
        sSortJUIAsc: "css_right ui-icon ui-icon-triangle-1-n",
        sSortJUIDesc: "css_right ui-icon ui-icon-triangle-1-s",
        sSortJUI: "css_right ui-icon ui-icon-carat-2-n-s",
        sSortJUIAscAllowed: "css_right ui-icon ui-icon-carat-1-n",
        sSortJUIDescAllowed: "css_right ui-icon ui-icon-carat-1-s",
        sSortJUIWrapper: "DataTables_sort_wrapper",
        sSortIcon: "DataTables_sort_icon",
        sScrollWrapper: "dataTables_scroll",
        sScrollHead: "dataTables_scrollHead ui-state-default",
        sScrollHeadInner: "dataTables_scrollHeadInner",
        sScrollBody: "dataTables_scrollBody",
        sScrollFoot: "dataTables_scrollFoot ui-state-default",
        sScrollFootInner: "dataTables_scrollFootInner",
        sFooterTH: "ui-state-default"
    };
    _oExt.oPagination = {
        two_button: {
            fnInit: function(oSettings, nPaging, fnCallbackDraw) {
                var nPrevious, nNext, nPreviousInner, nNextInner;
                if (!oSettings.bJUI) {
                    nPrevious = document.createElement("div");
                    nNext = document.createElement("div")
                } else {
                    nPrevious = document.createElement("a");
                    nNext = document.createElement("a");
                    nNextInner = document.createElement("span");
                    nNextInner.className = oSettings.oClasses.sPageJUINext;
                    nNext.appendChild(nNextInner);
                    nPreviousInner = document.createElement("span");
                    nPreviousInner.className = oSettings.oClasses.sPageJUIPrev;
                    nPrevious.appendChild(nPreviousInner)
                }
                nPrevious.className = oSettings.oClasses.sPagePrevDisabled;
                nNext.className = oSettings.oClasses.sPageNextDisabled;
                nPrevious.title = oSettings.oLanguage.oPaginate.sPrevious;
                nNext.title = oSettings.oLanguage.oPaginate.sNext;
                nPaging.appendChild(nPrevious);
                nPaging.appendChild(nNext);
                $(nPrevious).bind("click.DT", function() {
                    if (oSettings.oApi._fnPageChange(oSettings, "previous")) {
                        fnCallbackDraw(oSettings)
                    }
                });
                $(nNext).bind("click.DT", function() {
                    if (oSettings.oApi._fnPageChange(oSettings, "next")) {
                        fnCallbackDraw(oSettings)
                    }
                });
                $(nPrevious).bind("selectstart.DT", function() {
                    return false
                });
                $(nNext).bind("selectstart.DT", function() {
                    return false
                });
                if (oSettings.sTableId !== "" && typeof oSettings.aanFeatures.p == "undefined") {
                    nPaging.setAttribute("id", oSettings.sTableId + "_paginate");
                    nPrevious.setAttribute("id", oSettings.sTableId + "_previous");
                    nNext.setAttribute("id", oSettings.sTableId + "_next")
                }
            },
            fnUpdate: function(oSettings, fnCallbackDraw) {
                if (!oSettings.aanFeatures.p) {
                    return
                }
                var an = oSettings.aanFeatures.p;
                for (var i = 0, iLen = an.length; i < iLen; i++) {
                    if (an[i].childNodes.length !== 0) {
                        an[i].childNodes[0].className = (oSettings._iDisplayStart === 0) ? oSettings.oClasses.sPagePrevDisabled : oSettings.oClasses.sPagePrevEnabled;
                        an[i].childNodes[1].className = (oSettings.fnDisplayEnd() == oSettings.fnRecordsDisplay()) ? oSettings.oClasses.sPageNextDisabled : oSettings.oClasses.sPageNextEnabled
                    }
                }
            }
        },
        iFullNumbersShowPages: 5,
        full_numbers: {
            fnInit: function(oSettings, nPaging, fnCallbackDraw) {
                var nFirst = document.createElement("span");
                var nPrevious = document.createElement("span");
                var nList = document.createElement("span");
                var nNext = document.createElement("span");
                var nLast = document.createElement("span");
                nFirst.innerHTML = oSettings.oLanguage.oPaginate.sFirst;
                nPrevious.innerHTML = oSettings.oLanguage.oPaginate.sPrevious;
                nNext.innerHTML = oSettings.oLanguage.oPaginate.sNext;
                nLast.innerHTML = oSettings.oLanguage.oPaginate.sLast;
                var oClasses = oSettings.oClasses;
                nFirst.className = oClasses.sPageButton + " " + oClasses.sPageFirst;
                nPrevious.className = oClasses.sPageButton + " " + oClasses.sPagePrevious;
                nNext.className = oClasses.sPageButton + " " + oClasses.sPageNext;
                nLast.className = oClasses.sPageButton + " " + oClasses.sPageLast;
                nPaging.appendChild(nFirst);
                nPaging.appendChild(nPrevious);
                nPaging.appendChild(nList);
                nPaging.appendChild(nNext);
                nPaging.appendChild(nLast);
                $(nFirst).bind("click.DT", function() {
                    if (oSettings.oApi._fnPageChange(oSettings, "first")) {
                        fnCallbackDraw(oSettings)
                    }
                });
                $(nPrevious).bind("click.DT", function() {
                    if (oSettings.oApi._fnPageChange(oSettings, "previous")) {
                        fnCallbackDraw(oSettings)
                    }
                });
                $(nNext).bind("click.DT", function() {
                    if (oSettings.oApi._fnPageChange(oSettings, "next")) {
                        fnCallbackDraw(oSettings)
                    }
                });
                $(nLast).bind("click.DT", function() {
                    if (oSettings.oApi._fnPageChange(oSettings, "last")) {
                        fnCallbackDraw(oSettings)
                    }
                });
                $("span", nPaging).bind("mousedown.DT", function() {
                    return false
                }).bind("selectstart.DT", function() {
                    return false
                });
                if (oSettings.sTableId !== "" && typeof oSettings.aanFeatures.p == "undefined") {
                    nPaging.setAttribute("id", oSettings.sTableId + "_paginate");
                    nFirst.setAttribute("id", oSettings.sTableId + "_first");
                    nPrevious.setAttribute("id", oSettings.sTableId + "_previous");
                    nNext.setAttribute("id", oSettings.sTableId + "_next");
                    nLast.setAttribute("id", oSettings.sTableId + "_last")
                }
            },
            fnUpdate: function(oSettings, fnCallbackDraw) {
                if (!oSettings.aanFeatures.p) {
                    return
                }
                var iPageCount = _oExt.oPagination.iFullNumbersShowPages;
                var iPageCountHalf = Math.floor(iPageCount / 2);
                var iPages = Math.ceil((oSettings.fnRecordsDisplay()) / oSettings._iDisplayLength);
                var iCurrentPage = Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength) + 1;
                var sList = "";
                var iStartButton, iEndButton, i, iLen;
                var oClasses = oSettings.oClasses;
                if (iPages < iPageCount) {
                    iStartButton = 1;
                    iEndButton = iPages
                } else {
                    if (iCurrentPage <= iPageCountHalf) {
                        iStartButton = 1;
                        iEndButton = iPageCount
                    } else {
                        if (iCurrentPage >= (iPages - iPageCountHalf)) {
                            iStartButton = iPages - iPageCount + 1;
                            iEndButton = iPages
                        } else {
                            iStartButton = iCurrentPage - Math.ceil(iPageCount / 2) + 1;
                            iEndButton = iStartButton + iPageCount - 1
                        }
                    }
                }
                for (i = iStartButton; i <= iEndButton; i++) {
                    if (iCurrentPage != i) {
                        sList += '<span class="' + oClasses.sPageButton + '">' + i + "</span>"
                    } else {
                        sList += '<span class="' + oClasses.sPageButtonActive + '">' + i + "</span>"
                    }
                }
                var an = oSettings.aanFeatures.p;
                var anButtons, anStatic, nPaginateList;
                var fnClick = function(e) {
                    var iTarget = (this.innerHTML * 1) - 1;
                    oSettings._iDisplayStart = iTarget * oSettings._iDisplayLength;
                    fnCallbackDraw(oSettings);
                    e.preventDefault()
                };
                var fnFalse = function() {
                    return false
                };
                for (i = 0, iLen = an.length; i < iLen; i++) {
                    if (an[i].childNodes.length === 0) {
                        continue
                    }
                    var qjPaginateList = $("span:eq(2)", an[i]);
                    qjPaginateList.html(sList);
                    $("span", qjPaginateList).bind("click.DT", fnClick).bind("mousedown.DT", fnFalse).bind("selectstart.DT", fnFalse);
                    anButtons = an[i].getElementsByTagName("span");
                    anStatic = [anButtons[0], anButtons[1], anButtons[anButtons.length - 2], anButtons[anButtons.length - 1]];
                    $(anStatic).removeClass(oClasses.sPageButton + " " + oClasses.sPageButtonActive + " " + oClasses.sPageButtonStaticDisabled);
                    if (iCurrentPage == 1) {
                        anStatic[0].className += " " + oClasses.sPageButtonStaticDisabled;
                        anStatic[1].className += " " + oClasses.sPageButtonStaticDisabled
                    } else {
                        anStatic[0].className += " " + oClasses.sPageButton;
                        anStatic[1].className += " " + oClasses.sPageButton
                    }
                    if (iPages === 0 || iCurrentPage == iPages || oSettings._iDisplayLength == -1) {
                        anStatic[2].className += " " + oClasses.sPageButtonStaticDisabled;
                        anStatic[3].className += " " + oClasses.sPageButtonStaticDisabled
                    } else {
                        anStatic[2].className += " " + oClasses.sPageButton;
                        anStatic[3].className += " " + oClasses.sPageButton
                    }
                }
            }
        }
    };
    _oExt.oSort = {
        "string-asc": function(a, b) {
            if (typeof a != "string") {
                a = ""
            }
            if (typeof b != "string") {
                b = ""
            }
            var x = a.toLowerCase();
            var y = b.toLowerCase();
            return ((x < y) ? -1 : ((x > y) ? 1 : 0))
        },
        "string-desc": function(a, b) {
            if (typeof a != "string") {
                a = ""
            }
            if (typeof b != "string") {
                b = ""
            }
            var x = a.toLowerCase();
            var y = b.toLowerCase();
            return ((x < y) ? 1 : ((x > y) ? -1 : 0))
        },
        "html-asc": function(a, b) {
            var x = a.replace(/<.*?>/g, "").toLowerCase();
            var y = b.replace(/<.*?>/g, "").toLowerCase();
            return ((x < y) ? -1 : ((x > y) ? 1 : 0))
        },
        "html-desc": function(a, b) {
            var x = a.replace(/<.*?>/g, "").toLowerCase();
            var y = b.replace(/<.*?>/g, "").toLowerCase();
            return ((x < y) ? 1 : ((x > y) ? -1 : 0))
        },
        "date-asc": function(a, b) {
            var x = Date.parse(a);
            var y = Date.parse(b);
            if (isNaN(x) || x === "") {
                x = Date.parse("01/01/1970 00:00:00")
            }
            if (isNaN(y) || y === "") {
                y = Date.parse("01/01/1970 00:00:00")
            }
            return x - y
        },
        "date-desc": function(a, b) {
            var x = Date.parse(a);
            var y = Date.parse(b);
            if (isNaN(x) || x === "") {
                x = Date.parse("01/01/1970 00:00:00")
            }
            if (isNaN(y) || y === "") {
                y = Date.parse("01/01/1970 00:00:00")
            }
            return y - x
        },
        "numeric-asc": function(a, b) {
            var x = (a == "-" || a === "") ? 0 : a * 1;
            var y = (b == "-" || b === "") ? 0 : b * 1;
            return x - y
        },
        "numeric-desc": function(a, b) {
            var x = (a == "-" || a === "") ? 0 : a * 1;
            var y = (b == "-" || b === "") ? 0 : b * 1;
            return y - x
        }
    };
    _oExt.aTypes = [function(sData) {
        if (typeof sData == "number") {
            return "numeric"
        } else {
            if (typeof sData != "string") {
                return null
            }
        }
        var sValidFirstChars = "0123456789-";
        var sValidChars = "0123456789.";
        var Char;
        var bDecimal = false;
        Char = sData.charAt(0);
        if (sValidFirstChars.indexOf(Char) == -1) {
            return null
        }
        for (var i = 1; i < sData.length; i++) {
            Char = sData.charAt(i);
            if (sValidChars.indexOf(Char) == -1) {
                return null
            }
            if (Char == ".") {
                if (bDecimal) {
                    return null
                }
                bDecimal = true
            }
        }
        return "numeric"
    }, function(sData) {
        var iParse = Date.parse(sData);
        if ((iParse !== null && !isNaN(iParse)) || (typeof sData == "string" && sData.length === 0)) {
            return "date"
        }
        return null
    }, function(sData) {
        if (typeof sData == "string" && sData.indexOf("<") != -1 && sData.indexOf(">") != -1) {
            return "html"
        }
        return null
    }];
    _oExt.fnVersionCheck = function(sVersion) {
        var fnZPad = function(Zpad, count) {
            while (Zpad.length < count) {
                Zpad += "0"
            }
            return Zpad
        };
        var aThis = _oExt.sVersion.split(".");
        var aThat = sVersion.split(".");
        var sThis = "",
            sThat = "";
        for (var i = 0, iLen = aThat.length; i < iLen; i++) {
            sThis += fnZPad(aThis[i], 3);
            sThat += fnZPad(aThat[i], 3)
        }
        return parseInt(sThis, 10) >= parseInt(sThat, 10)
    };
    _oExt._oExternConfig = {
        iNextUnique: 0
    };
    $.fn.dataTable = function(oInit) {
        function classSettings() {
            this.fnRecordsTotal = function() {
                if (this.oFeatures.bServerSide) {
                    return parseInt(this._iRecordsTotal, 10)
                } else {
                    return this.aiDisplayMaster.length
                }
            };
            this.fnRecordsDisplay = function() {
                if (this.oFeatures.bServerSide) {
                    return parseInt(this._iRecordsDisplay, 10)
                } else {
                    return this.aiDisplay.length
                }
            };
            this.fnDisplayEnd = function() {
                if (this.oFeatures.bServerSide) {
                    if (this.oFeatures.bPaginate === false || this._iDisplayLength == -1) {
                        return this._iDisplayStart + this.aiDisplay.length
                    } else {
                        return Math.min(this._iDisplayStart + this._iDisplayLength, this._iRecordsDisplay)
                    }
                } else {
                    return this._iDisplayEnd
                }
            };
            this.oInstance = null;
            this.sInstance = null;
            this.oFeatures = {
                bPaginate: true,
                bLengthChange: true,
                bFilter: true,
                bSort: true,
                bInfo: true,
                bAutoWidth: true,
                bProcessing: false,
                bSortClasses: true,
                bStateSave: false,
                bServerSide: false,
                bDeferRender: false
            };
            this.oScroll = {
                sX: "",
                sXInner: "",
                sY: "",
                bCollapse: false,
                bInfinite: false,
                iLoadGap: 100,
                iBarWidth: 0,
                bAutoCss: true
            };
            this.aanFeatures = [];
            this.oLanguage = {
                sProcessing: "Processing...",
                sLengthMenu: "Show _MENU_ entries",
                sZeroRecords: "No matching records found",
                sEmptyTable: "No data available in table",
                sLoadingRecords: "Loading...",
                sInfo: "Showing _START_ to _END_ of _TOTAL_ entries",
                sInfoEmpty: "Showing 0 to 0 of 0 entries",
                sInfoFiltered: "(filtered from _MAX_ total entries)",
                sInfoPostFix: "",
                sSearch: "Search:",
                sUrl: "",
                oPaginate: {
                    sFirst: "First",
                    sPrevious: "Previous",
                    sNext: "Next",
                    sLast: "Last"
                },
                fnInfoCallback: null
            };
            this.aoData = [];
            this.aiDisplay = [];
            this.aiDisplayMaster = [];
            this.aoColumns = [];
            this.aoHeader = [];
            this.aoFooter = [];
            this.iNextId = 0;
            this.asDataSearch = [];
            this.oPreviousSearch = {
                sSearch: "",
                bRegex: false,
                bSmart: true
            };
            this.aoPreSearchCols = [];
            this.aaSorting = [
                [0, "asc", 0]
            ];
            this.aaSortingFixed = null;
            this.asStripClasses = [];
            this.asDestoryStrips = [];
            this.sDestroyWidth = 0;
            this.fnRowCallback = null;
            this.fnHeaderCallback = null;
            this.fnFooterCallback = null;
            this.aoDrawCallback = [];
            this.fnPreDrawCallback = null;
            this.fnInitComplete = null;
            this.sTableId = "";
            this.nTable = null;
            this.nTHead = null;
            this.nTFoot = null;
            this.nTBody = null;
            this.nTableWrapper = null;
            this.bDeferLoading = false;
            this.bInitialised = false;
            this.aoOpenRows = [];
            this.sDom = '<"top"lf<"clear">>rt<"block-actions"ip>';
            this.sPaginationType = "full_numbers";
            this.iCookieDuration = 60 * 60 * 2;
            this.sCookiePrefix = "SpryMedia_DataTables_";
            this.fnCookieCallback = null;
            this.aoStateSave = [];
            this.aoStateLoad = [];
            this.oLoadedState = null;
            this.sAjaxSource = null;
            this.sAjaxDataProp = "aaData";
            this.bAjaxDataGet = true;
            this.jqXHR = null;
            this.fnServerData = function(url, data, callback, settings) {
                settings.jqXHR = $.ajax({
                    url: url,
                    data: data,
                    success: callback,
                    dataType: "json",
                    cache: false,
                    error: function(xhr, error, thrown) {
                        if (error == "parsererror") {
                            alert("DataTables warning: JSON data from server could not be parsed. This is caused by a JSON formatting error.")
                        }
                    }
                })
            };
            this.fnFormatNumber = function(iIn) {
                if (iIn < 1000) {
                    return iIn
                } else {
                    var s = (iIn + ""),
                        a = s.split(""),
                        out = "",
                        iLen = s.length;
                    for (var i = 0; i < iLen; i++) {
                        if (i % 3 === 0 && i !== 0) {
                            out = "," + out
                        }
                        out = a[iLen - i - 1] + out
                    }
                }
                return out
            };
            this.aLengthMenu = [10, 25, 50, 100];
            this.iDraw = 0;
            this.bDrawing = 0;
            this.iDrawError = -1;
            this._iDisplayLength = 10;
            this._iDisplayStart = 0;
            this._iDisplayEnd = 10;
            this._iRecordsTotal = 0;
            this._iRecordsDisplay = 0;
            this.bJUI = false;
            this.oClasses = _oExt.oStdClasses;
            this.bFiltered = false;
            this.bSorted = false;
            this.bSortCellsTop = false;
            this.oInit = null
        }
        this.oApi = {};
        this.fnDraw = function(bComplete) {
            var oSettings = _fnSettingsFromNode(this[_oExt.iApiIndex]);
            if (typeof bComplete != "undefined" && bComplete === false) {
                _fnCalculateEnd(oSettings);
                _fnDraw(oSettings)
            } else {
                _fnReDraw(oSettings)
            }
        };
        this.fnFilter = function(sInput, iColumn, bRegex, bSmart, bShowGlobal) {
            var oSettings = _fnSettingsFromNode(this[_oExt.iApiIndex]);
            if (!oSettings.oFeatures.bFilter) {
                return
            }
            if (typeof bRegex == "undefined") {
                bRegex = false
            }
            if (typeof bSmart == "undefined") {
                bSmart = true
            }
            if (typeof bShowGlobal == "undefined") {
                bShowGlobal = true
            }
            if (typeof iColumn == "undefined" || iColumn === null) {
                _fnFilterComplete(oSettings, {
                    sSearch: sInput,
                    bRegex: bRegex,
                    bSmart: bSmart
                }, 1);
                if (bShowGlobal && typeof oSettings.aanFeatures.f != "undefined") {
                    var n = oSettings.aanFeatures.f;
                    for (var i = 0, iLen = n.length; i < iLen; i++) {
                        $("input", n[i]).val(sInput)
                    }
                }
            } else {
                oSettings.aoPreSearchCols[iColumn].sSearch = sInput;
                oSettings.aoPreSearchCols[iColumn].bRegex = bRegex;
                oSettings.aoPreSearchCols[iColumn].bSmart = bSmart;
                _fnFilterComplete(oSettings, oSettings.oPreviousSearch, 1)
            }
        };
        this.fnSettings = function(nNode) {
            return _fnSettingsFromNode(this[_oExt.iApiIndex])
        };
        this.fnVersionCheck = _oExt.fnVersionCheck;
        this.fnSort = function(aaSort) {
            var oSettings = _fnSettingsFromNode(this[_oExt.iApiIndex]);
            oSettings.aaSorting = aaSort;
            _fnSort(oSettings)
        };
        this.fnSortListener = function(nNode, iColumn, fnCallback) {
            _fnSortAttachListener(_fnSettingsFromNode(this[_oExt.iApiIndex]), nNode, iColumn, fnCallback)
        };
        this.fnAddData = function(mData, bRedraw) {
            if (mData.length === 0) {
                return []
            }
            var aiReturn = [];
            var iTest;
            var oSettings = _fnSettingsFromNode(this[_oExt.iApiIndex]);
            if (typeof mData[0] == "object") {
                for (var i = 0; i < mData.length; i++) {
                    iTest = _fnAddData(oSettings, mData[i]);
                    if (iTest == -1) {
                        return aiReturn
                    }
                    aiReturn.push(iTest)
                }
            } else {
                iTest = _fnAddData(oSettings, mData);
                if (iTest == -1) {
                    return aiReturn
                }
                aiReturn.push(iTest)
            }
            oSettings.aiDisplay = oSettings.aiDisplayMaster.slice();
            if (typeof bRedraw == "undefined" || bRedraw) {
                _fnReDraw(oSettings)
            }
            return aiReturn
        };
        this.fnDeleteRow = function(mTarget, fnCallBack, bRedraw) {
            var oSettings = _fnSettingsFromNode(this[_oExt.iApiIndex]);
            var i, iAODataIndex;
            iAODataIndex = (typeof mTarget == "object") ? _fnNodeToDataIndex(oSettings, mTarget) : mTarget;
            var oData = oSettings.aoData.splice(iAODataIndex, 1);
            var iDisplayIndex = $.inArray(iAODataIndex, oSettings.aiDisplay);
            oSettings.asDataSearch.splice(iDisplayIndex, 1);
            _fnDeleteIndex(oSettings.aiDisplayMaster, iAODataIndex);
            _fnDeleteIndex(oSettings.aiDisplay, iAODataIndex);
            if (typeof fnCallBack == "function") {
                fnCallBack.call(this, oSettings, oData)
            }
            if (oSettings._iDisplayStart >= oSettings.aiDisplay.length) {
                oSettings._iDisplayStart -= oSettings._iDisplayLength;
                if (oSettings._iDisplayStart < 0) {
                    oSettings._iDisplayStart = 0
                }
            }
            if (typeof bRedraw == "undefined" || bRedraw) {
                _fnCalculateEnd(oSettings);
                _fnDraw(oSettings)
            }
            return oData
        };
        this.fnClearTable = function(bRedraw) {
            var oSettings = _fnSettingsFromNode(this[_oExt.iApiIndex]);
            _fnClearTable(oSettings);
            if (typeof bRedraw == "undefined" || bRedraw) {
                _fnDraw(oSettings)
            }
        };
        this.fnOpen = function(nTr, mHtml, sClass) {
            var oSettings = _fnSettingsFromNode(this[_oExt.iApiIndex]);
            this.fnClose(nTr);
            var nNewRow = document.createElement("tr");
            var nNewCell = document.createElement("td");
            nNewRow.appendChild(nNewCell);
            nNewCell.className = sClass;
            nNewCell.colSpan = _fnVisbleColumns(oSettings);
            if (typeof mHtml.jquery != "undefined" || typeof mHtml == "object") {
                nNewCell.appendChild(mHtml)
            } else {
                nNewCell.innerHTML = mHtml
            }
            var nTrs = $("tr", oSettings.nTBody);
            if ($.inArray(nTr, nTrs) != -1) {
                $(nNewRow).insertAfter(nTr)
            }
            oSettings.aoOpenRows.push({
                nTr: nNewRow,
                nParent: nTr
            });
            return nNewRow
        };
        this.fnClose = function(nTr) {
            var oSettings = _fnSettingsFromNode(this[_oExt.iApiIndex]);
            for (var i = 0; i < oSettings.aoOpenRows.length; i++) {
                if (oSettings.aoOpenRows[i].nParent == nTr) {
                    var nTrParent = oSettings.aoOpenRows[i].nTr.parentNode;
                    if (nTrParent) {
                        nTrParent.removeChild(oSettings.aoOpenRows[i].nTr)
                    }
                    oSettings.aoOpenRows.splice(i, 1);
                    return 0
                }
            }
            return 1
        };
        this.fnGetData = function(mRow, iCol) {
            var oSettings = _fnSettingsFromNode(this[_oExt.iApiIndex]);
            if (typeof mRow != "undefined") {
                var iRow = (typeof mRow == "object") ? _fnNodeToDataIndex(oSettings, mRow) : mRow;
                if (typeof iCol != "undefined") {
                    return _fnGetCellData(oSettings, iRow, iCol, "")
                }
                return (typeof oSettings.aoData[iRow] != "undefined") ? oSettings.aoData[iRow]._aData : null
            }
            return _fnGetDataMaster(oSettings)
        };
        this.fnGetNodes = function(iRow) {
            var oSettings = _fnSettingsFromNode(this[_oExt.iApiIndex]);
            if (typeof iRow != "undefined") {
                return (typeof oSettings.aoData[iRow] != "undefined") ? oSettings.aoData[iRow].nTr : null
            }
            return _fnGetTrNodes(oSettings)
        };
        this.fnGetPosition = function(nNode) {
            var oSettings = _fnSettingsFromNode(this[_oExt.iApiIndex]);
            var sNodeName = nNode.nodeName.toUpperCase();
            if (sNodeName == "TR") {
                return _fnNodeToDataIndex(oSettings, nNode)
            } else {
                if (sNodeName == "TD" || sNodeName == "TH") {
                    var iDataIndex = _fnNodeToDataIndex(oSettings, nNode.parentNode);
                    var anCells = _fnGetTdNodes(oSettings, iDataIndex);
                    for (var i = 0; i < oSettings.aoColumns.length; i++) {
                        if (anCells[i] == nNode) {
                            return [iDataIndex, _fnColumnIndexToVisible(oSettings, i), i]
                        }
                    }
                }
            }
            return null
        };
        this.fnUpdate = function(mData, mRow, iColumn, bRedraw, bAction) {
            var oSettings = _fnSettingsFromNode(this[_oExt.iApiIndex]);
            var iVisibleColumn, i, iLen, sDisplay;
            var iRow = (typeof mRow == "object") ? _fnNodeToDataIndex(oSettings, mRow) : mRow;
            if ($.isArray(mData) && typeof mData == "object") {
                oSettings.aoData[iRow]._aData = mData.slice();
                for (i = 0; i < oSettings.aoColumns.length; i++) {
                    this.fnUpdate(_fnGetCellData(oSettings, iRow, i), iRow, i, false, false)
                }
            } else {
                if (typeof mData == "object") {
                    oSettings.aoData[iRow]._aData = $.extend(true, {}, mData);
                    for (i = 0; i < oSettings.aoColumns.length; i++) {
                        this.fnUpdate(_fnGetCellData(oSettings, iRow, i), iRow, i, false, false)
                    }
                } else {
                    sDisplay = mData;
                    _fnSetCellData(oSettings, iRow, iColumn, sDisplay);
                    if (oSettings.aoColumns[iColumn].fnRender !== null) {
                        sDisplay = oSettings.aoColumns[iColumn].fnRender({
                            iDataRow: iRow,
                            iDataColumn: iColumn,
                            aData: oSettings.aoData[iRow]._aData,
                            oSettings: oSettings
                        });
                        if (oSettings.aoColumns[iColumn].bUseRendered) {
                            _fnSetCellData(oSettings, iRow, iColumn, sDisplay)
                        }
                    }
                    if (oSettings.aoData[iRow].nTr !== null) {
                        _fnGetTdNodes(oSettings, iRow)[iColumn].innerHTML = sDisplay
                    }
                }
            }
            var iDisplayIndex = $.inArray(iRow, oSettings.aiDisplay);
            oSettings.asDataSearch[iDisplayIndex] = _fnBuildSearchRow(oSettings, _fnGetRowData(oSettings, iRow, "filter"));
            if (typeof bAction == "undefined" || bAction) {
                _fnAjustColumnSizing(oSettings)
            }
            if (typeof bRedraw == "undefined" || bRedraw) {
                _fnReDraw(oSettings)
            }
            return 0
        };
        this.fnSetColumnVis = function(iCol, bShow, bRedraw) {
            var oSettings = _fnSettingsFromNode(this[_oExt.iApiIndex]);
            var i, iLen;
            var iColumns = oSettings.aoColumns.length;
            var nTd, nCell, anTrs, jqChildren, bAppend, iBefore;
            if (oSettings.aoColumns[iCol].bVisible == bShow) {
                return
            }
            if (bShow) {
                var iInsert = 0;
                for (i = 0; i < iCol; i++) {
                    if (oSettings.aoColumns[i].bVisible) {
                        iInsert++
                    }
                }
                bAppend = (iInsert >= _fnVisbleColumns(oSettings));
                if (!bAppend) {
                    for (i = iCol; i < iColumns; i++) {
                        if (oSettings.aoColumns[i].bVisible) {
                            iBefore = i;
                            break
                        }
                    }
                }
                for (i = 0, iLen = oSettings.aoData.length; i < iLen; i++) {
                    if (oSettings.aoData[i].nTr !== null) {
                        if (bAppend) {
                            oSettings.aoData[i].nTr.appendChild(oSettings.aoData[i]._anHidden[iCol])
                        } else {
                            oSettings.aoData[i].nTr.insertBefore(oSettings.aoData[i]._anHidden[iCol], _fnGetTdNodes(oSettings, i)[iBefore])
                        }
                    }
                }
            } else {
                for (i = 0, iLen = oSettings.aoData.length; i < iLen; i++) {
                    if (oSettings.aoData[i].nTr !== null) {
                        nTd = _fnGetTdNodes(oSettings, i)[iCol];
                        oSettings.aoData[i]._anHidden[iCol] = nTd;
                        nTd.parentNode.removeChild(nTd)
                    }
                }
            }
            oSettings.aoColumns[iCol].bVisible = bShow;
            _fnDrawHead(oSettings, oSettings.aoHeader);
            if (oSettings.nTFoot) {
                _fnDrawHead(oSettings, oSettings.aoFooter)
            }
            for (i = 0, iLen = oSettings.aoOpenRows.length; i < iLen; i++) {
                oSettings.aoOpenRows[i].nTr.colSpan = _fnVisbleColumns(oSettings)
            }
            if (typeof bRedraw == "undefined" || bRedraw) {
                _fnAjustColumnSizing(oSettings);
                _fnDraw(oSettings)
            }
            _fnSaveState(oSettings)
        };
        this.fnPageChange = function(sAction, bRedraw) {
            var oSettings = _fnSettingsFromNode(this[_oExt.iApiIndex]);
            _fnPageChange(oSettings, sAction);
            _fnCalculateEnd(oSettings);
            if (typeof bRedraw == "undefined" || bRedraw) {
                _fnDraw(oSettings)
            }
        };
        this.fnDestroy = function() {
            var oSettings = _fnSettingsFromNode(this[_oExt.iApiIndex]);
            var nOrig = oSettings.nTableWrapper.parentNode;
            var nBody = oSettings.nTBody;
            var i, iLen;
            oSettings.bDestroying = true;
            for (i = 0, iLen = oSettings.aoColumns.length; i < iLen; i++) {
                if (oSettings.aoColumns[i].bVisible === false) {
                    this.fnSetColumnVis(i, true)
                }
            }
            $(oSettings.nTableWrapper).find("*").andSelf().unbind(".DT");
            $("tbody>tr>td." + oSettings.oClasses.sRowEmpty, oSettings.nTable).parent().remove();
            if (oSettings.nTable != oSettings.nTHead.parentNode) {
                $(">thead", oSettings.nTable).remove();
                oSettings.nTable.appendChild(oSettings.nTHead)
            }
            if (oSettings.nTFoot && oSettings.nTable != oSettings.nTFoot.parentNode) {
                $(">tfoot", oSettings.nTable).remove();
                oSettings.nTable.appendChild(oSettings.nTFoot)
            }
            oSettings.nTable.parentNode.removeChild(oSettings.nTable);
            $(oSettings.nTableWrapper).remove();
            oSettings.aaSorting = [];
            oSettings.aaSortingFixed = [];
            _fnSortingClasses(oSettings);
            $(_fnGetTrNodes(oSettings)).removeClass(oSettings.asStripClasses.join(" "));
            if (!oSettings.bJUI) {
                $("th", oSettings.nTHead).removeClass([_oExt.oStdClasses.sSortable, _oExt.oStdClasses.sSortableAsc, _oExt.oStdClasses.sSortableDesc, _oExt.oStdClasses.sSortableNone].join(" "))
            } else {
                $("th", oSettings.nTHead).removeClass([_oExt.oStdClasses.sSortable, _oExt.oJUIClasses.sSortableAsc, _oExt.oJUIClasses.sSortableDesc, _oExt.oJUIClasses.sSortableNone].join(" "));
                $("th span." + _oExt.oJUIClasses.sSortIcon, oSettings.nTHead).remove();
                $("th", oSettings.nTHead).each(function() {
                    var jqWrapper = $("div." + _oExt.oJUIClasses.sSortJUIWrapper, this);
                    var kids = jqWrapper.contents();
                    $(this).append(kids);
                    jqWrapper.remove()
                })
            }
            if (oSettings.nTableReinsertBefore) {
                nOrig.insertBefore(oSettings.nTable, oSettings.nTableReinsertBefore)
            } else {
                nOrig.appendChild(oSettings.nTable)
            }
            for (i = 0, iLen = oSettings.aoData.length; i < iLen; i++) {
                if (oSettings.aoData[i].nTr !== null) {
                    nBody.appendChild(oSettings.aoData[i].nTr)
                }
            }
            if (oSettings.oFeatures.bAutoWidth === true) {
                oSettings.nTable.style.width = _fnStringToCss(oSettings.sDestroyWidth)
            }
            $(">tr:even", nBody).addClass(oSettings.asDestoryStrips[0]);
            $(">tr:odd", nBody).addClass(oSettings.asDestoryStrips[1]);
            for (i = 0, iLen = _aoSettings.length; i < iLen; i++) {
                if (_aoSettings[i] == oSettings) {
                    _aoSettings.splice(i, 1)
                }
            }
            oSettings = null
        };
        this.fnAdjustColumnSizing = function(bRedraw) {
            var oSettings = _fnSettingsFromNode(this[_oExt.iApiIndex]);
            _fnAjustColumnSizing(oSettings);
            if (typeof bRedraw == "undefined" || bRedraw) {
                this.fnDraw(false)
            } else {
                if (oSettings.oScroll.sX !== "" || oSettings.oScroll.sY !== "") {
                    this.oApi._fnScrollDraw(oSettings)
                }
            }
        };

        function _fnExternApiFunc(sFunc) {
            return function() {
                var aArgs = [_fnSettingsFromNode(this[_oExt.iApiIndex])].concat(Array.prototype.slice.call(arguments));
                return _oExt.oApi[sFunc].apply(this, aArgs)
            }
        }
        for (var sFunc in _oExt.oApi) {
            if (sFunc) {
                this[sFunc] = _fnExternApiFunc(sFunc)
            }
        }

        function _fnInitalise(oSettings) {
            var i, iLen, iAjaxStart = oSettings.iInitDisplayStart;
            if (oSettings.bInitialised === false) {
                setTimeout(function() {
                    _fnInitalise(oSettings)
                }, 200);
                return
            }
            _fnAddOptionsHtml(oSettings);
            _fnBuildHead(oSettings);
            _fnDrawHead(oSettings, oSettings.aoHeader);
            if (oSettings.nTFoot) {
                _fnDrawHead(oSettings, oSettings.aoFooter)
            }
            _fnProcessingDisplay(oSettings, true);
            if (oSettings.oFeatures.bAutoWidth) {
                _fnCalculateColumnWidths(oSettings)
            }
            for (i = 0, iLen = oSettings.aoColumns.length; i < iLen; i++) {
                if (oSettings.aoColumns[i].sWidth !== null) {
                    oSettings.aoColumns[i].nTh.style.width = _fnStringToCss(oSettings.aoColumns[i].sWidth)
                }
            }
            if (oSettings.oFeatures.bSort) {
                _fnSort(oSettings)
            } else {
                if (oSettings.oFeatures.bFilter) {
                    _fnFilterComplete(oSettings, oSettings.oPreviousSearch)
                } else {
                    oSettings.aiDisplay = oSettings.aiDisplayMaster.slice();
                    _fnCalculateEnd(oSettings);
                    _fnDraw(oSettings)
                }
            }
            if (oSettings.sAjaxSource !== null && !oSettings.oFeatures.bServerSide) {
                oSettings.fnServerData.call(oSettings.oInstance, oSettings.sAjaxSource, [], function(json) {
                    var aData = json;
                    if (oSettings.sAjaxDataProp !== "") {
                        var fnDataSrc = _fnGetObjectDataFn(oSettings.sAjaxDataProp);
                        aData = fnDataSrc(json)
                    }
                    for (i = 0; i < aData.length; i++) {
                        _fnAddData(oSettings, aData[i])
                    }
                    oSettings.iInitDisplayStart = iAjaxStart;
                    if (oSettings.oFeatures.bSort) {
                        _fnSort(oSettings)
                    } else {
                        oSettings.aiDisplay = oSettings.aiDisplayMaster.slice();
                        _fnCalculateEnd(oSettings);
                        _fnDraw(oSettings)
                    }
                    _fnProcessingDisplay(oSettings, false);
                    _fnInitComplete(oSettings, json)
                }, oSettings);
                return
            }
            if (!oSettings.oFeatures.bServerSide) {
                _fnProcessingDisplay(oSettings, false);
                _fnInitComplete(oSettings)
            }
        }

        function _fnInitComplete(oSettings, json) {
            oSettings._bInitComplete = true;
            if (typeof oSettings.fnInitComplete == "function") {
                if (typeof json != "undefined") {
                    oSettings.fnInitComplete.call(oSettings.oInstance, oSettings, json)
                } else {
                    oSettings.fnInitComplete.call(oSettings.oInstance, oSettings)
                }
            }
        }

        function _fnLanguageProcess(oSettings, oLanguage, bInit) {
            _fnMap(oSettings.oLanguage, oLanguage, "sProcessing");
            _fnMap(oSettings.oLanguage, oLanguage, "sLengthMenu");
            _fnMap(oSettings.oLanguage, oLanguage, "sEmptyTable");
            _fnMap(oSettings.oLanguage, oLanguage, "sLoadingRecords");
            _fnMap(oSettings.oLanguage, oLanguage, "sZeroRecords");
            _fnMap(oSettings.oLanguage, oLanguage, "sInfo");
            _fnMap(oSettings.oLanguage, oLanguage, "sInfoEmpty");
            _fnMap(oSettings.oLanguage, oLanguage, "sInfoFiltered");
            _fnMap(oSettings.oLanguage, oLanguage, "sInfoPostFix");
            _fnMap(oSettings.oLanguage, oLanguage, "sSearch");
            if (typeof oLanguage.oPaginate != "undefined") {
                _fnMap(oSettings.oLanguage.oPaginate, oLanguage.oPaginate, "sFirst");
                _fnMap(oSettings.oLanguage.oPaginate, oLanguage.oPaginate, "sPrevious");
                _fnMap(oSettings.oLanguage.oPaginate, oLanguage.oPaginate, "sNext");
                _fnMap(oSettings.oLanguage.oPaginate, oLanguage.oPaginate, "sLast")
            }
            if (typeof oLanguage.sEmptyTable == "undefined" && typeof oLanguage.sZeroRecords != "undefined") {
                _fnMap(oSettings.oLanguage, oLanguage, "sZeroRecords", "sEmptyTable")
            }
            if (typeof oLanguage.sLoadingRecords == "undefined" && typeof oLanguage.sZeroRecords != "undefined") {
                _fnMap(oSettings.oLanguage, oLanguage, "sZeroRecords", "sLoadingRecords")
            }
            if (bInit) {
                _fnInitalise(oSettings)
            }
        }

        function _fnAddColumn(oSettings, nTh) {
            var iCol = oSettings.aoColumns.length;
            var oCol = {
                sType: null,
                _bAutoType: true,
                bVisible: true,
                bSearchable: true,
                bSortable: true,
                asSorting: ["asc", "desc"],
                sSortingClass: oSettings.oClasses.sSortable,
                sSortingClassJUI: oSettings.oClasses.sSortJUI,
                sTitle: nTh ? nTh.innerHTML : "",
                sName: "",
                sWidth: null,
                sWidthOrig: null,
                sClass: null,
                fnRender: null,
                bUseRendered: true,
                iDataSort: iCol,
                mDataProp: iCol,
                fnGetData: null,
                fnSetData: null,
                sSortDataType: "std",
                sDefaultContent: null,
                sContentPadding: "",
                nTh: nTh ? nTh : document.createElement("th"),
                nTf: null
            };
            oSettings.aoColumns.push(oCol);
            if (typeof oSettings.aoPreSearchCols[iCol] == "undefined" || oSettings.aoPreSearchCols[iCol] === null) {
                oSettings.aoPreSearchCols[iCol] = {
                    sSearch: "",
                    bRegex: false,
                    bSmart: true
                }
            } else {
                if (typeof oSettings.aoPreSearchCols[iCol].bRegex == "undefined") {
                    oSettings.aoPreSearchCols[iCol].bRegex = true
                }
                if (typeof oSettings.aoPreSearchCols[iCol].bSmart == "undefined") {
                    oSettings.aoPreSearchCols[iCol].bSmart = true
                }
            }
            _fnColumnOptions(oSettings, iCol, null)
        }

        function _fnColumnOptions(oSettings, iCol, oOptions) {
            var oCol = oSettings.aoColumns[iCol];
            if (typeof oOptions != "undefined" && oOptions !== null) {
                if (typeof oOptions.sType != "undefined") {
                    oCol.sType = oOptions.sType;
                    oCol._bAutoType = false
                }
                _fnMap(oCol, oOptions, "bVisible");
                _fnMap(oCol, oOptions, "bSearchable");
                _fnMap(oCol, oOptions, "bSortable");
                _fnMap(oCol, oOptions, "sTitle");
                _fnMap(oCol, oOptions, "sName");
                _fnMap(oCol, oOptions, "sWidth");
                _fnMap(oCol, oOptions, "sWidth", "sWidthOrig");
                _fnMap(oCol, oOptions, "sClass");
                _fnMap(oCol, oOptions, "fnRender");
                _fnMap(oCol, oOptions, "bUseRendered");
                _fnMap(oCol, oOptions, "iDataSort");
                _fnMap(oCol, oOptions, "mDataProp");
                _fnMap(oCol, oOptions, "asSorting");
                _fnMap(oCol, oOptions, "sSortDataType");
                _fnMap(oCol, oOptions, "sDefaultContent");
                _fnMap(oCol, oOptions, "sContentPadding")
            }
            oCol.fnGetData = _fnGetObjectDataFn(oCol.mDataProp);
            oCol.fnSetData = _fnSetObjectDataFn(oCol.mDataProp);
            if (!oSettings.oFeatures.bSort) {
                oCol.bSortable = false
            }
            if (!oCol.bSortable || ($.inArray("asc", oCol.asSorting) == -1 && $.inArray("desc", oCol.asSorting) == -1)) {
                oCol.sSortingClass = oSettings.oClasses.sSortableNone;
                oCol.sSortingClassJUI = ""
            } else {
                if (oCol.bSortable || ($.inArray("asc", oCol.asSorting) == -1 && $.inArray("desc", oCol.asSorting) == -1)) {
                    oCol.sSortingClass = oSettings.oClasses.sSortable;
                    oCol.sSortingClassJUI = oSettings.oClasses.sSortJUI
                } else {
                    if ($.inArray("asc", oCol.asSorting) != -1 && $.inArray("desc", oCol.asSorting) == -1) {
                        oCol.sSortingClass = oSettings.oClasses.sSortableAsc;
                        oCol.sSortingClassJUI = oSettings.oClasses.sSortJUIAscAllowed
                    } else {
                        if ($.inArray("asc", oCol.asSorting) == -1 && $.inArray("desc", oCol.asSorting) != -1) {
                            oCol.sSortingClass = oSettings.oClasses.sSortableDesc;
                            oCol.sSortingClassJUI = oSettings.oClasses.sSortJUIDescAllowed
                        }
                    }
                }
            }
        }

        function _fnAddData(oSettings, aDataSupplied) {
            var oCol;
            var aDataIn = (typeof aDataSupplied.length == "number") ? aDataSupplied.slice() : $.extend(true, {}, aDataSupplied);
            var iRow = oSettings.aoData.length;
            var oData = {
                nTr: null,
                _iId: oSettings.iNextId++,
                _aData: aDataIn,
                _anHidden: [],
                _sRowStripe: ""
            };
            oSettings.aoData.push(oData);
            var nTd, sThisType;
            for (var i = 0, iLen = oSettings.aoColumns.length; i < iLen; i++) {
                oCol = oSettings.aoColumns[i];
                if (typeof oCol.fnRender == "function" && oCol.bUseRendered && oCol.mDataProp !== null) {
                    _fnSetCellData(oSettings, iRow, i, oCol.fnRender({
                        iDataRow: iRow,
                        iDataColumn: i,
                        aData: oData._aData,
                        oSettings: oSettings
                    }))
                }
                if (oCol._bAutoType && oCol.sType != "string") {
                    var sVarType = _fnGetCellData(oSettings, iRow, i, "type");
                    if (sVarType !== null && sVarType !== "") {
                        sThisType = _fnDetectType(sVarType);
                        if (oCol.sType === null) {
                            oCol.sType = sThisType
                        } else {
                            if (oCol.sType != sThisType) {
                                oCol.sType = "string"
                            }
                        }
                    }
                }
            }
            oSettings.aiDisplayMaster.push(iRow);
            if (!oSettings.oFeatures.bDeferRender) {
                _fnCreateTr(oSettings, iRow)
            }
            return iRow
        }

        function _fnCreateTr(oSettings, iRow) {
            var oData = oSettings.aoData[iRow];
            var nTd;
            if (oData.nTr === null) {
                oData.nTr = document.createElement("tr");
                if (typeof oData._aData.DT_RowId != "undefined") {
                    oData.nTr.setAttribute("id", oData._aData.DT_RowId)
                }
                if (typeof oData._aData.DT_RowClass != "undefined") {
                    $(oData.nTr).addClass(oData._aData.DT_RowClass)
                }
                for (var i = 0, iLen = oSettings.aoColumns.length; i < iLen; i++) {
                    var oCol = oSettings.aoColumns[i];
                    nTd = document.createElement("td");
                    if (typeof oCol.fnRender == "function" && (!oCol.bUseRendered || oCol.mDataProp === null)) {
                        nTd.innerHTML = oCol.fnRender({
                            iDataRow: iRow,
                            iDataColumn: i,
                            aData: oData._aData,
                            oSettings: oSettings
                        })
                    } else {
                        nTd.innerHTML = _fnGetCellData(oSettings, iRow, i, "display")
                    }
                    if (oCol.sClass !== null) {
                        nTd.className = oCol.sClass
                    }
                    if (oCol.bVisible) {
                        oData.nTr.appendChild(nTd);
                        oData._anHidden[i] = null
                    } else {
                        oData._anHidden[i] = nTd
                    }
                }
            }
        }

        function _fnGatherData(oSettings) {
            var iLoop, i, iLen, j, jLen, jInner, nTds, nTrs, nTd, aLocalData, iThisIndex, iRow, iRows, iColumn, iColumns, sNodeName;
            if (oSettings.bDeferLoading || oSettings.sAjaxSource === null) {
                nTrs = oSettings.nTBody.childNodes;
                for (i = 0, iLen = nTrs.length; i < iLen; i++) {
                    if (nTrs[i].nodeName.toUpperCase() == "TR") {
                        iThisIndex = oSettings.aoData.length;
                        oSettings.aoData.push({
                            nTr: nTrs[i],
                            _iId: oSettings.iNextId++,
                            _aData: [],
                            _anHidden: [],
                            _sRowStripe: ""
                        });
                        oSettings.aiDisplayMaster.push(iThisIndex);
                        nTds = nTrs[i].childNodes;
                        jInner = 0;
                        for (j = 0, jLen = nTds.length; j < jLen; j++) {
                            sNodeName = nTds[j].nodeName.toUpperCase();
                            if (sNodeName == "TD" || sNodeName == "TH") {
                                _fnSetCellData(oSettings, iThisIndex, jInner, $.trim(nTds[j].innerHTML));
                                jInner++
                            }
                        }
                    }
                }
            }
            nTrs = _fnGetTrNodes(oSettings);
            nTds = [];
            for (i = 0, iLen = nTrs.length; i < iLen; i++) {
                for (j = 0, jLen = nTrs[i].childNodes.length; j < jLen; j++) {
                    nTd = nTrs[i].childNodes[j];
                    sNodeName = nTd.nodeName.toUpperCase();
                    if (sNodeName == "TD" || sNodeName == "TH") {
                        nTds.push(nTd)
                    }
                }
            }
            if (nTds.length != nTrs.length * oSettings.aoColumns.length) {
                _fnLog(oSettings, 1, "Unexpected number of TD elements. Expected " + (nTrs.length * oSettings.aoColumns.length) + " and got " + nTds.length + ". DataTables does not support rowspan / colspan in the table body, and there must be one cell for each row/column combination.")
            }
            for (iColumn = 0, iColumns = oSettings.aoColumns.length; iColumn < iColumns; iColumn++) {
                if (oSettings.aoColumns[iColumn].sTitle === null) {
                    oSettings.aoColumns[iColumn].sTitle = oSettings.aoColumns[iColumn].nTh.innerHTML
                }
                var bAutoType = oSettings.aoColumns[iColumn]._bAutoType,
                    bRender = typeof oSettings.aoColumns[iColumn].fnRender == "function",
                    bClass = oSettings.aoColumns[iColumn].sClass !== null,
                    bVisible = oSettings.aoColumns[iColumn].bVisible,
                    nCell, sThisType, sRendered, sValType;
                if (bAutoType || bRender || bClass || !bVisible) {
                    for (iRow = 0, iRows = oSettings.aoData.length; iRow < iRows; iRow++) {
                        nCell = nTds[(iRow * iColumns) + iColumn];
                        if (bAutoType && oSettings.aoColumns[iColumn].sType != "string") {
                            sValType = _fnGetCellData(oSettings, iRow, iColumn, "type");
                            if (sValType !== "") {
                                sThisType = _fnDetectType(sValType);
                                if (oSettings.aoColumns[iColumn].sType === null) {
                                    oSettings.aoColumns[iColumn].sType = sThisType
                                } else {
                                    if (oSettings.aoColumns[iColumn].sType != sThisType) {
                                        oSettings.aoColumns[iColumn].sType = "string"
                                    }
                                }
                            }
                        }
                        if (bRender) {
                            sRendered = oSettings.aoColumns[iColumn].fnRender({
                                iDataRow: iRow,
                                iDataColumn: iColumn,
                                aData: oSettings.aoData[iRow]._aData,
                                oSettings: oSettings
                            });
                            nCell.innerHTML = sRendered;
                            if (oSettings.aoColumns[iColumn].bUseRendered) {
                                _fnSetCellData(oSettings, iRow, iColumn, sRendered)
                            }
                        }
                        if (bClass) {
                            nCell.className += " " + oSettings.aoColumns[iColumn].sClass
                        }
                        if (!bVisible) {
                            oSettings.aoData[iRow]._anHidden[iColumn] = nCell;
                            nCell.parentNode.removeChild(nCell)
                        } else {
                            oSettings.aoData[iRow]._anHidden[iColumn] = null
                        }
                    }
                }
            }
        }

        function _fnBuildHead(oSettings) {
            var i, nTh, iLen, j, jLen;
            var anTr = oSettings.nTHead.getElementsByTagName("tr");
            var iThs = oSettings.nTHead.getElementsByTagName("th").length;
            var iCorrector = 0;
            var jqChildren;
            if (iThs !== 0) {
                for (i = 0, iLen = oSettings.aoColumns.length; i < iLen; i++) {
                    nTh = oSettings.aoColumns[i].nTh;
                    if (oSettings.aoColumns[i].sClass !== null) {
                        $(nTh).addClass(oSettings.aoColumns[i].sClass)
                    }
                    if (oSettings.aoColumns[i].sTitle != nTh.innerHTML) {
                        nTh.innerHTML = oSettings.aoColumns[i].sTitle
                    }
                }
            } else {
                var nTr = document.createElement("tr");
                for (i = 0, iLen = oSettings.aoColumns.length; i < iLen; i++) {
                    nTh = oSettings.aoColumns[i].nTh;
                    nTh.innerHTML = oSettings.aoColumns[i].sTitle;
                    if (oSettings.aoColumns[i].sClass !== null) {
                        $(nTh).addClass(oSettings.aoColumns[i].sClass)
                    }
                    nTr.appendChild(nTh)
                }
                $(oSettings.nTHead).html("")[0].appendChild(nTr);
                _fnDetectHeader(oSettings.aoHeader, oSettings.nTHead)
            }
            if (oSettings.bJUI) {
                for (i = 0, iLen = oSettings.aoColumns.length; i < iLen; i++) {
                    nTh = oSettings.aoColumns[i].nTh;
                    var nDiv = document.createElement("div");
                    nDiv.className = oSettings.oClasses.sSortJUIWrapper;
                    $(nTh).contents().appendTo(nDiv);
                    var nSpan = document.createElement("span");
                    nSpan.className = oSettings.oClasses.sSortIcon;
                    nDiv.appendChild(nSpan);
                    nTh.appendChild(nDiv)
                }
            }
            var fnNoSelect = function(e) {
                this.onselectstart = function() {
                    return false
                };
                return false
            };
            if (oSettings.oFeatures.bSort) {
                for (i = 0; i < oSettings.aoColumns.length; i++) {
                    if (oSettings.aoColumns[i].bSortable !== false) {
                        _fnSortAttachListener(oSettings, oSettings.aoColumns[i].nTh, i);
                        $(oSettings.aoColumns[i].nTh).bind("mousedown.DT", fnNoSelect)
                    } else {
                        $(oSettings.aoColumns[i].nTh).addClass(oSettings.oClasses.sSortableNone)
                    }
                }
            }
            if (oSettings.oClasses.sFooterTH !== "") {
                $(">tr>th", oSettings.nTFoot).addClass(oSettings.oClasses.sFooterTH)
            }
            if (oSettings.nTFoot !== null) {
                var anCells = _fnGetUniqueThs(oSettings, null, oSettings.aoFooter);
                for (i = 0, iLen = oSettings.aoColumns.length; i < iLen; i++) {
                    if (typeof anCells[i] != "undefined") {
                        oSettings.aoColumns[i].nTf = anCells[i]
                    }
                }
            }
        }

        function _fnDrawHead(oSettings, aoSource, bIncludeHidden) {
            var i, iLen, j, jLen, k, kLen;
            var aoLocal = [];
            var aApplied = [];
            var iColumns = oSettings.aoColumns.length;
            var iRowspan, iColspan;
            if (typeof bIncludeHidden == "undefined") {
                bIncludeHidden = false
            }
            for (i = 0, iLen = aoSource.length; i < iLen; i++) {
                aoLocal[i] = aoSource[i].slice();
                aoLocal[i].nTr = aoSource[i].nTr;
                for (j = iColumns - 1; j >= 0; j--) {
                    if (!oSettings.aoColumns[j].bVisible && !bIncludeHidden) {
                        aoLocal[i].splice(j, 1)
                    }
                }
                aApplied.push([])
            }
            for (i = 0, iLen = aoLocal.length; i < iLen; i++) {
                if (aoLocal[i].nTr) {
                    for (k = 0, kLen = aoLocal[i].nTr.childNodes.length; k < kLen; k++) {
                        aoLocal[i].nTr.removeChild(aoLocal[i].nTr.childNodes[0])
                    }
                }
                for (j = 0, jLen = aoLocal[i].length; j < jLen; j++) {
                    iRowspan = 1;
                    iColspan = 1;
                    if (typeof aApplied[i][j] == "undefined") {
                        aoLocal[i].nTr.appendChild(aoLocal[i][j].cell);
                        aApplied[i][j] = 1;
                        while (typeof aoLocal[i + iRowspan] != "undefined" && aoLocal[i][j].cell == aoLocal[i + iRowspan][j].cell) {
                            aApplied[i + iRowspan][j] = 1;
                            iRowspan++
                        }
                        while (typeof aoLocal[i][j + iColspan] != "undefined" && aoLocal[i][j].cell == aoLocal[i][j + iColspan].cell) {
                            for (k = 0; k < iRowspan; k++) {
                                aApplied[i + k][j + iColspan] = 1
                            }
                            iColspan++
                        }
                        aoLocal[i][j].cell.setAttribute("rowspan", iRowspan);
                        aoLocal[i][j].cell.setAttribute("colspan", iColspan)
                    }
                }
            }
        }

        function _fnDraw(oSettings) {
            var i, iLen;
            var anRows = [];
            var iRowCount = 0;
            var bRowError = false;
            var iStrips = oSettings.asStripClasses.length;
            var iOpenRows = oSettings.aoOpenRows.length;
            if (oSettings.fnPreDrawCallback !== null && oSettings.fnPreDrawCallback.call(oSettings.oInstance, oSettings) === false) {
                return
            }
            oSettings.bDrawing = true;
            if (typeof oSettings.iInitDisplayStart != "undefined" && oSettings.iInitDisplayStart != -1) {
                if (oSettings.oFeatures.bServerSide) {
                    oSettings._iDisplayStart = oSettings.iInitDisplayStart
                } else {
                    oSettings._iDisplayStart = (oSettings.iInitDisplayStart >= oSettings.fnRecordsDisplay()) ? 0 : oSettings.iInitDisplayStart
                }
                oSettings.iInitDisplayStart = -1;
                _fnCalculateEnd(oSettings)
            }
            if (oSettings.bDeferLoading) {
                oSettings.bDeferLoading = false;
                oSettings.iDraw++
            } else {
                if (!oSettings.oFeatures.bServerSide) {
                    oSettings.iDraw++
                } else {
                    if (!oSettings.bDestroying && !_fnAjaxUpdate(oSettings)) {
                        return
                    }
                }
            }
            if (oSettings.aiDisplay.length !== 0) {
                var iStart = oSettings._iDisplayStart;
                var iEnd = oSettings._iDisplayEnd;
                if (oSettings.oFeatures.bServerSide) {
                    iStart = 0;
                    iEnd = oSettings.aoData.length
                }
                for (var j = iStart; j < iEnd; j++) {
                    var aoData = oSettings.aoData[oSettings.aiDisplay[j]];
                    if (aoData.nTr === null) {
                        _fnCreateTr(oSettings, oSettings.aiDisplay[j])
                    }
                    var nRow = aoData.nTr;
                    if (iStrips !== 0) {
                        var sStrip = oSettings.asStripClasses[iRowCount % iStrips];
                        if (aoData._sRowStripe != sStrip) {
                            $(nRow).removeClass(aoData._sRowStripe).addClass(sStrip);
                            aoData._sRowStripe = sStrip
                        }
                    }
                    if (typeof oSettings.fnRowCallback == "function") {
                        nRow = oSettings.fnRowCallback.call(oSettings.oInstance, nRow, oSettings.aoData[oSettings.aiDisplay[j]]._aData, iRowCount, j);
                        if (!nRow && !bRowError) {
                            _fnLog(oSettings, 0, "A node was not returned by fnRowCallback");
                            bRowError = true
                        }
                    }
                    anRows.push(nRow);
                    iRowCount++;
                    if (iOpenRows !== 0) {
                        for (var k = 0; k < iOpenRows; k++) {
                            if (nRow == oSettings.aoOpenRows[k].nParent) {
                                anRows.push(oSettings.aoOpenRows[k].nTr)
                            }
                        }
                    }
                }
            } else {
                anRows[0] = document.createElement("tr");
                if (typeof oSettings.asStripClasses[0] != "undefined") {
                    anRows[0].className = oSettings.asStripClasses[0]
                }
                var sZero = oSettings.oLanguage.sZeroRecords.replace("_MAX_", oSettings.fnFormatNumber(oSettings.fnRecordsTotal()));
                if (oSettings.iDraw == 1 && oSettings.sAjaxSource !== null && !oSettings.oFeatures.bServerSide) {
                    sZero = oSettings.oLanguage.sLoadingRecords
                } else {
                    if (typeof oSettings.oLanguage.sEmptyTable != "undefined" && oSettings.fnRecordsTotal() === 0) {
                        sZero = oSettings.oLanguage.sEmptyTable
                    }
                }
                var nTd = document.createElement("td");
                nTd.setAttribute("valign", "top");
                nTd.colSpan = _fnVisbleColumns(oSettings);
                nTd.className = oSettings.oClasses.sRowEmpty;
                nTd.innerHTML = sZero;
                anRows[iRowCount].appendChild(nTd)
            }
            if (typeof oSettings.fnHeaderCallback == "function") {
                oSettings.fnHeaderCallback.call(oSettings.oInstance, $(">tr", oSettings.nTHead)[0], _fnGetDataMaster(oSettings), oSettings._iDisplayStart, oSettings.fnDisplayEnd(), oSettings.aiDisplay)
            }
            if (typeof oSettings.fnFooterCallback == "function") {
                oSettings.fnFooterCallback.call(oSettings.oInstance, $(">tr", oSettings.nTFoot)[0], _fnGetDataMaster(oSettings), oSettings._iDisplayStart, oSettings.fnDisplayEnd(), oSettings.aiDisplay)
            }
            var nAddFrag = document.createDocumentFragment(),
                nRemoveFrag = document.createDocumentFragment(),
                nBodyPar, nTrs;
            if (oSettings.nTBody) {
                nBodyPar = oSettings.nTBody.parentNode;
                nRemoveFrag.appendChild(oSettings.nTBody);
                if (!oSettings.oScroll.bInfinite || !oSettings._bInitComplete || oSettings.bSorted || oSettings.bFiltered) {
                    nTrs = oSettings.nTBody.childNodes;
                    for (i = nTrs.length - 1; i >= 0; i--) {
                        nTrs[i].parentNode.removeChild(nTrs[i])
                    }
                }
                for (i = 0, iLen = anRows.length; i < iLen; i++) {
                    nAddFrag.appendChild(anRows[i])
                }
                oSettings.nTBody.appendChild(nAddFrag);
                if (nBodyPar !== null) {
                    nBodyPar.appendChild(oSettings.nTBody)
                }
            }
            for (i = oSettings.aoDrawCallback.length - 1; i >= 0; i--) {
                oSettings.aoDrawCallback[i].fn.call(oSettings.oInstance, oSettings)
            }
            oSettings.bSorted = false;
            oSettings.bFiltered = false;
            oSettings.bDrawing = false;
            if (oSettings.oFeatures.bServerSide) {
                _fnProcessingDisplay(oSettings, false);
                if (typeof oSettings._bInitComplete == "undefined") {
                    _fnInitComplete(oSettings)
                }
            }
        }

        function _fnReDraw(oSettings) {
            if (oSettings.oFeatures.bSort) {
                _fnSort(oSettings, oSettings.oPreviousSearch)
            } else {
                if (oSettings.oFeatures.bFilter) {
                    _fnFilterComplete(oSettings, oSettings.oPreviousSearch)
                } else {
                    _fnCalculateEnd(oSettings);
                    _fnDraw(oSettings)
                }
            }
        }

        function _fnAjaxUpdate(oSettings) {
            if (oSettings.bAjaxDataGet) {
                _fnProcessingDisplay(oSettings, true);
                var iColumns = oSettings.aoColumns.length;
                var aoData = [],
                    mDataProp;
                var i;
                oSettings.iDraw++;
                aoData.push({
                    name: "sEcho",
                    value: oSettings.iDraw
                });
                aoData.push({
                    name: "iColumns",
                    value: iColumns
                });
                aoData.push({
                    name: "sColumns",
                    value: _fnColumnOrdering(oSettings)
                });
                aoData.push({
                    name: "iDisplayStart",
                    value: oSettings._iDisplayStart
                });
                aoData.push({
                    name: "iDisplayLength",
                    value: oSettings.oFeatures.bPaginate !== false ? oSettings._iDisplayLength : -1
                });
                for (i = 0; i < iColumns; i++) {
                    mDataProp = oSettings.aoColumns[i].mDataProp;
                    aoData.push({
                        name: "mDataProp_" + i,
                        value: typeof(mDataProp) == "function" ? "function" : mDataProp
                    })
                }
                if (oSettings.oFeatures.bFilter !== false) {
                    aoData.push({
                        name: "sSearch",
                        value: oSettings.oPreviousSearch.sSearch
                    });
                    aoData.push({
                        name: "bRegex",
                        value: oSettings.oPreviousSearch.bRegex
                    });
                    for (i = 0; i < iColumns; i++) {
                        aoData.push({
                            name: "sSearch_" + i,
                            value: oSettings.aoPreSearchCols[i].sSearch
                        });
                        aoData.push({
                            name: "bRegex_" + i,
                            value: oSettings.aoPreSearchCols[i].bRegex
                        });
                        aoData.push({
                            name: "bSearchable_" + i,
                            value: oSettings.aoColumns[i].bSearchable
                        })
                    }
                }
                if (oSettings.oFeatures.bSort !== false) {
                    var iFixed = oSettings.aaSortingFixed !== null ? oSettings.aaSortingFixed.length : 0;
                    var iUser = oSettings.aaSorting.length;
                    aoData.push({
                        name: "iSortingCols",
                        value: iFixed + iUser
                    });
                    for (i = 0; i < iFixed; i++) {
                        aoData.push({
                            name: "iSortCol_" + i,
                            value: oSettings.aaSortingFixed[i][0]
                        });
                        aoData.push({
                            name: "sSortDir_" + i,
                            value: oSettings.aaSortingFixed[i][1]
                        })
                    }
                    for (i = 0; i < iUser; i++) {
                        aoData.push({
                            name: "iSortCol_" + (i + iFixed),
                            value: oSettings.aaSorting[i][0]
                        });
                        aoData.push({
                            name: "sSortDir_" + (i + iFixed),
                            value: oSettings.aaSorting[i][1]
                        })
                    }
                    for (i = 0; i < iColumns; i++) {
                        aoData.push({
                            name: "bSortable_" + i,
                            value: oSettings.aoColumns[i].bSortable
                        })
                    }
                }
                oSettings.fnServerData.call(oSettings.oInstance, oSettings.sAjaxSource, aoData, function(json) {
                    _fnAjaxUpdateDraw(oSettings, json)
                }, oSettings);
                return false
            } else {
                return true
            }
        }

        function _fnAjaxUpdateDraw(oSettings, json) {
            if (typeof json.sEcho != "undefined") {
                if (json.sEcho * 1 < oSettings.iDraw) {
                    return
                } else {
                    oSettings.iDraw = json.sEcho * 1
                }
            }
            if (!oSettings.oScroll.bInfinite || (oSettings.oScroll.bInfinite && (oSettings.bSorted || oSettings.bFiltered))) {
                _fnClearTable(oSettings)
            }
            oSettings._iRecordsTotal = json.iTotalRecords;
            oSettings._iRecordsDisplay = json.iTotalDisplayRecords;
            var sOrdering = _fnColumnOrdering(oSettings);
            var bReOrder = (typeof json.sColumns != "undefined" && sOrdering !== "" && json.sColumns != sOrdering);
            if (bReOrder) {
                var aiIndex = _fnReOrderIndex(oSettings, json.sColumns)
            }
            var fnDataSrc = _fnGetObjectDataFn(oSettings.sAjaxDataProp);
            var aData = fnDataSrc(json);
            for (var i = 0, iLen = aData.length; i < iLen; i++) {
                if (bReOrder) {
                    var aDataSorted = [];
                    for (var j = 0, jLen = oSettings.aoColumns.length; j < jLen; j++) {
                        aDataSorted.push(aData[i][aiIndex[j]])
                    }
                    _fnAddData(oSettings, aDataSorted)
                } else {
                    _fnAddData(oSettings, aData[i])
                }
            }
            oSettings.aiDisplay = oSettings.aiDisplayMaster.slice();
            oSettings.bAjaxDataGet = false;
            _fnDraw(oSettings);
            oSettings.bAjaxDataGet = true;
            _fnProcessingDisplay(oSettings, false)
        }

        function _fnAddOptionsHtml(oSettings) {
            var nHolding = document.createElement("div");
            oSettings.nTable.parentNode.insertBefore(nHolding, oSettings.nTable);
            oSettings.nTableWrapper = document.createElement("div");
            oSettings.nTableWrapper.className = oSettings.oClasses.sWrapper;
            if (oSettings.sTableId !== "") {
                oSettings.nTableWrapper.setAttribute("id", oSettings.sTableId + "_wrapper")
            }
            oSettings.nTableReinsertBefore = oSettings.nTable.nextSibling;
            var nInsertNode = oSettings.nTableWrapper;
            var aDom = oSettings.sDom.split("");
            var nTmp, iPushFeature, cOption, nNewNode, cNext, sAttr, j;
            for (var i = 0; i < aDom.length; i++) {
                iPushFeature = 0;
                cOption = aDom[i];
                if (cOption == "<") {
                    nNewNode = document.createElement("div");
                    cNext = aDom[i + 1];
                    if (cNext == "'" || cNext == '"') {
                        sAttr = "";
                        j = 2;
                        while (aDom[i + j] != cNext) {
                            sAttr += aDom[i + j];
                            j++
                        }
                        if (sAttr == "H") {
                            sAttr = "fg-toolbar ui-toolbar ui-widget-header ui-corner-tl ui-corner-tr ui-helper-clearfix"
                        } else {
                            if (sAttr == "F") {
                                sAttr = "fg-toolbar ui-toolbar ui-widget-header ui-corner-bl ui-corner-br ui-helper-clearfix"
                            }
                        }
                        if (sAttr.indexOf(".") != -1) {
                            var aSplit = sAttr.split(".");
                            nNewNode.setAttribute("id", aSplit[0].substr(1, aSplit[0].length - 1));
                            nNewNode.className = aSplit[1]
                        } else {
                            if (sAttr.charAt(0) == "#") {
                                nNewNode.setAttribute("id", sAttr.substr(1, sAttr.length - 1))
                            } else {
                                nNewNode.className = sAttr
                            }
                        }
                        i += j
                    }
                    nInsertNode.appendChild(nNewNode);
                    nInsertNode = nNewNode
                } else {
                    if (cOption == ">") {
                        nInsertNode = nInsertNode.parentNode
                    } else {
                        if (cOption == "l" && oSettings.oFeatures.bPaginate && oSettings.oFeatures.bLengthChange) {
                            nTmp = _fnFeatureHtmlLength(oSettings);
                            iPushFeature = 1
                        } else {
                            if (cOption == "f" && oSettings.oFeatures.bFilter) {
                                nTmp = _fnFeatureHtmlFilter(oSettings);
                                iPushFeature = 1
                            } else {
                                if (cOption == "r" && oSettings.oFeatures.bProcessing) {
                                    nTmp = _fnFeatureHtmlProcessing(oSettings);
                                    iPushFeature = 1
                                } else {
                                    if (cOption == "t") {
                                        nTmp = _fnFeatureHtmlTable(oSettings);
                                        iPushFeature = 1
                                    } else {
                                        if (cOption == "i" && oSettings.oFeatures.bInfo) {
                                            nTmp = _fnFeatureHtmlInfo(oSettings);
                                            iPushFeature = 1
                                        } else {
                                            if (cOption == "p" && oSettings.oFeatures.bPaginate) {
                                                nTmp = _fnFeatureHtmlPaginate(oSettings);
                                                iPushFeature = 1
                                            } else {
                                                if (_oExt.aoFeatures.length !== 0) {
                                                    var aoFeatures = _oExt.aoFeatures;
                                                    for (var k = 0, kLen = aoFeatures.length; k < kLen; k++) {
                                                        if (cOption == aoFeatures[k].cFeature) {
                                                            nTmp = aoFeatures[k].fnInit(oSettings);
                                                            if (nTmp) {
                                                                iPushFeature = 1
                                                            }
                                                            break
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                if (iPushFeature == 1 && nTmp !== null) {
                    if (typeof oSettings.aanFeatures[cOption] != "object") {
                        oSettings.aanFeatures[cOption] = []
                    }
                    oSettings.aanFeatures[cOption].push(nTmp);
                    nInsertNode.appendChild(nTmp)
                }
            }
            nHolding.parentNode.replaceChild(oSettings.nTableWrapper, nHolding)
        }

        function _fnFeatureHtmlTable(oSettings) {
            if (oSettings.oScroll.sX === "" && oSettings.oScroll.sY === "") {
                return oSettings.nTable
            }
            var nScroller = document.createElement("div"),
                nScrollHead = document.createElement("div"),
                nScrollHeadInner = document.createElement("div"),
                nScrollBody = document.createElement("div"),
                nScrollFoot = document.createElement("div"),
                nScrollFootInner = document.createElement("div"),
                nScrollHeadTable = oSettings.nTable.cloneNode(false),
                nScrollFootTable = oSettings.nTable.cloneNode(false),
                nThead = oSettings.nTable.getElementsByTagName("thead")[0],
                nTfoot = oSettings.nTable.getElementsByTagName("tfoot").length === 0 ? null : oSettings.nTable.getElementsByTagName("tfoot")[0],
                oClasses = (typeof oInit.bJQueryUI != "undefined" && oInit.bJQueryUI) ? _oExt.oJUIClasses : _oExt.oStdClasses;
            nScrollHead.appendChild(nScrollHeadInner);
            nScrollFoot.appendChild(nScrollFootInner);
            nScrollBody.appendChild(oSettings.nTable);
            nScroller.appendChild(nScrollHead);
            nScroller.appendChild(nScrollBody);
            nScrollHeadInner.appendChild(nScrollHeadTable);
            nScrollHeadTable.appendChild(nThead);
            if (nTfoot !== null) {
                nScroller.appendChild(nScrollFoot);
                nScrollFootInner.appendChild(nScrollFootTable);
                nScrollFootTable.appendChild(nTfoot)
            }
            nScroller.className = oClasses.sScrollWrapper;
            nScrollHead.className = oClasses.sScrollHead;
            nScrollHeadInner.className = oClasses.sScrollHeadInner;
            nScrollBody.className = oClasses.sScrollBody;
            nScrollFoot.className = oClasses.sScrollFoot;
            nScrollFootInner.className = oClasses.sScrollFootInner;
            if (oSettings.oScroll.bAutoCss) {
                nScrollHead.style.overflow = "hidden";
                nScrollHead.style.position = "relative";
                nScrollFoot.style.overflow = "hidden";
                nScrollBody.style.overflow = "auto"
            }
            nScrollHead.style.border = "0";
            nScrollHead.style.width = "100%";
            nScrollFoot.style.border = "0";
            nScrollHeadInner.style.width = "150%";
            nScrollHeadTable.removeAttribute("id");
            nScrollHeadTable.style.marginLeft = "0";
            oSettings.nTable.style.marginLeft = "0";
            if (nTfoot !== null) {
                nScrollFootTable.removeAttribute("id");
                nScrollFootTable.style.marginLeft = "0"
            }
            var nCaptions = $(">caption", oSettings.nTable);
            for (var i = 0, iLen = nCaptions.length; i < iLen; i++) {
                nScrollHeadTable.appendChild(nCaptions[i])
            }
            if (oSettings.oScroll.sX !== "") {
                nScrollHead.style.width = _fnStringToCss(oSettings.oScroll.sX);
                nScrollBody.style.width = _fnStringToCss(oSettings.oScroll.sX);
                if (nTfoot !== null) {
                    nScrollFoot.style.width = _fnStringToCss(oSettings.oScroll.sX)
                }
                $(nScrollBody).scroll(function(e) {
                    nScrollHead.scrollLeft = this.scrollLeft;
                    if (nTfoot !== null) {
                        nScrollFoot.scrollLeft = this.scrollLeft
                    }
                })
            }
            if (oSettings.oScroll.sY !== "") {
                nScrollBody.style.height = _fnStringToCss(oSettings.oScroll.sY)
            }
            oSettings.aoDrawCallback.push({
                fn: _fnScrollDraw,
                sName: "scrolling"
            });
            if (oSettings.oScroll.bInfinite) {
                $(nScrollBody).scroll(function() {
                    if (!oSettings.bDrawing) {
                        if ($(this).scrollTop() + $(this).height() > $(oSettings.nTable).height() - oSettings.oScroll.iLoadGap) {
                            if (oSettings.fnDisplayEnd() < oSettings.fnRecordsDisplay()) {
                                _fnPageChange(oSettings, "next");
                                _fnCalculateEnd(oSettings);
                                _fnDraw(oSettings)
                            }
                        }
                    }
                })
            }
            oSettings.nScrollHead = nScrollHead;
            oSettings.nScrollFoot = nScrollFoot;
            return nScroller
        }

        function _fnScrollDraw(o) {
            var nScrollHeadInner = o.nScrollHead.getElementsByTagName("div")[0],
                nScrollHeadTable = nScrollHeadInner.getElementsByTagName("table")[0],
                nScrollBody = o.nTable.parentNode,
                i, iLen, j, jLen, anHeadToSize, anHeadSizers, anFootSizers, anFootToSize, oStyle, iVis, iWidth, aApplied = [],
                iSanityWidth;
            var nTheadSize = o.nTable.getElementsByTagName("thead");
            if (nTheadSize.length > 0) {
                o.nTable.removeChild(nTheadSize[0])
            }
            if (o.nTFoot !== null) {
                var nTfootSize = o.nTable.getElementsByTagName("tfoot");
                if (nTfootSize.length > 0) {
                    o.nTable.removeChild(nTfootSize[0])
                }
            }
            nTheadSize = o.nTHead.cloneNode(true);
            o.nTable.insertBefore(nTheadSize, o.nTable.childNodes[0]);
            if (o.nTFoot !== null) {
                nTfootSize = o.nTFoot.cloneNode(true);
                o.nTable.insertBefore(nTfootSize, o.nTable.childNodes[1])
            }
            if (o.oScroll.sX === "") {
                nScrollBody.style.width = "100%";
                nScrollHeadInner.parentNode.style.width = "100%"
            }
            var nThs = _fnGetUniqueThs(o, nTheadSize);
            for (i = 0, iLen = nThs.length; i < iLen; i++) {
                iVis = _fnVisibleToColumnIndex(o, i);
                nThs[i].style.width = o.aoColumns[iVis].sWidth
            }
            if (o.nTFoot !== null) {
                _fnApplyToChildren(function(n) {
                    n.style.width = ""
                }, nTfootSize.getElementsByTagName("tr"))
            }
            iSanityWidth = $(o.nTable).outerWidth();
            if (o.oScroll.sX === "") {
                o.nTable.style.width = "100%";
                if ($.browser.msie && $.browser.version <= 7) {
                    o.nTable.style.width = _fnStringToCss($(o.nTable).outerWidth() - o.oScroll.iBarWidth)
                }
            } else {
                if (o.oScroll.sXInner !== "") {
                    o.nTable.style.width = _fnStringToCss(o.oScroll.sXInner)
                } else {
                    if (iSanityWidth == $(nScrollBody).width() && $(nScrollBody).height() < $(o.nTable).height()) {
                        o.nTable.style.width = _fnStringToCss(iSanityWidth - o.oScroll.iBarWidth);
                        if ($(o.nTable).outerWidth() > iSanityWidth - o.oScroll.iBarWidth) {
                            o.nTable.style.width = _fnStringToCss(iSanityWidth)
                        }
                    } else {
                        o.nTable.style.width = _fnStringToCss(iSanityWidth)
                    }
                }
            }
            iSanityWidth = $(o.nTable).outerWidth();
            if (o.oScroll.sX === "") {
                nScrollBody.style.width = _fnStringToCss(iSanityWidth + o.oScroll.iBarWidth);
                nScrollHeadInner.parentNode.style.width = _fnStringToCss(iSanityWidth + o.oScroll.iBarWidth)
            }
            anHeadToSize = o.nTHead.getElementsByTagName("tr");
            anHeadSizers = nTheadSize.getElementsByTagName("tr");
            _fnApplyToChildren(function(nSizer, nToSize) {
                oStyle = nSizer.style;
                oStyle.paddingTop = "0";
                oStyle.paddingBottom = "0";
                oStyle.borderTopWidth = "0";
                oStyle.borderBottomWidth = "0";
                oStyle.height = 0;
                iWidth = $(nSizer).width();
                nToSize.style.width = _fnStringToCss(iWidth);
                aApplied.push(iWidth)
            }, anHeadSizers, anHeadToSize);
            $(anHeadSizers).height(0);
            if (o.nTFoot !== null) {
                anFootSizers = nTfootSize.getElementsByTagName("tr");
                anFootToSize = o.nTFoot.getElementsByTagName("tr");
                _fnApplyToChildren(function(nSizer, nToSize) {
                    oStyle = nSizer.style;
                    oStyle.paddingTop = "0";
                    oStyle.paddingBottom = "0";
                    oStyle.borderTopWidth = "0";
                    oStyle.borderBottomWidth = "0";
                    oStyle.height = 0;
                    iWidth = $(nSizer).width();
                    nToSize.style.width = _fnStringToCss(iWidth);
                    aApplied.push(iWidth)
                }, anFootSizers, anFootToSize);
                $(anFootSizers).height(0)
            }
            _fnApplyToChildren(function(nSizer) {
                nSizer.innerHTML = "";
                nSizer.style.width = _fnStringToCss(aApplied.shift())
            }, anHeadSizers);
            if (o.nTFoot !== null) {
                _fnApplyToChildren(function(nSizer) {
                    nSizer.innerHTML = "";
                    nSizer.style.width = _fnStringToCss(aApplied.shift())
                }, anFootSizers)
            }
            if ($(o.nTable).outerWidth() < iSanityWidth) {
                if (o.oScroll.sX === "") {
                    _fnLog(o, 1, "The table cannot fit into the current element which will cause column misalignment. It is suggested that you enable x-scrolling or increase the width the table has in which to be drawn")
                } else {
                    if (o.oScroll.sXInner !== "") {
                        _fnLog(o, 1, "The table cannot fit into the current element which will cause column misalignment. It is suggested that you increase the sScrollXInner property to allow it to draw in a larger area, or simply remove that parameter to allow automatic calculation")
                    }
                }
            }
            if (o.oScroll.sY === "") {
                if ($.browser.msie && $.browser.version <= 7) {
                    nScrollBody.style.height = _fnStringToCss(o.nTable.offsetHeight + o.oScroll.iBarWidth)
                }
            }
            if (o.oScroll.sY !== "" && o.oScroll.bCollapse) {
                nScrollBody.style.height = _fnStringToCss(o.oScroll.sY);
                var iExtra = (o.oScroll.sX !== "" && o.nTable.offsetWidth > nScrollBody.offsetWidth) ? o.oScroll.iBarWidth : 0;
                if (o.nTable.offsetHeight < nScrollBody.offsetHeight) {
                    nScrollBody.style.height = _fnStringToCss($(o.nTable).height() + iExtra)
                }
            }
            var iOuterWidth = $(o.nTable).outerWidth();
            nScrollHeadTable.style.width = _fnStringToCss(iOuterWidth);
            nScrollHeadInner.style.width = _fnStringToCss(iOuterWidth + o.oScroll.iBarWidth);
            if (o.nTFoot !== null) {
                var nScrollFootInner = o.nScrollFoot.getElementsByTagName("div")[0],
                    nScrollFootTable = nScrollFootInner.getElementsByTagName("table")[0];
                nScrollFootInner.style.width = _fnStringToCss(o.nTable.offsetWidth + o.oScroll.iBarWidth);
                nScrollFootTable.style.width = _fnStringToCss(o.nTable.offsetWidth)
            }
            if (o.bSorted || o.bFiltered) {
                nScrollBody.scrollTop = 0
            }
        }

        function _fnAjustColumnSizing(oSettings) {
            if (oSettings.oFeatures.bAutoWidth === false) {
                return false
            }
            _fnCalculateColumnWidths(oSettings);
            for (var i = 0, iLen = oSettings.aoColumns.length; i < iLen; i++) {
                oSettings.aoColumns[i].nTh.style.width = oSettings.aoColumns[i].sWidth
            }
        }

        function _fnFeatureHtmlFilter(oSettings) {
            var sSearchStr = oSettings.oLanguage.sSearch;
            sSearchStr = (sSearchStr.indexOf("_INPUT_") !== -1) ? sSearchStr.replace("_INPUT_", '<input type="text" />') : sSearchStr === "" ? '<input type="text" />' : sSearchStr + ' <input type="text" />';
            var nFilter = document.createElement("div");
            nFilter.className = oSettings.oClasses.sFilter;
            nFilter.innerHTML = "<label>" + sSearchStr + "</label>";
            if (oSettings.sTableId !== "" && typeof oSettings.aanFeatures.f == "undefined") {
                nFilter.setAttribute("id", oSettings.sTableId + "_filter")
            }
            var jqFilter = $("input", nFilter);
            jqFilter.val(oSettings.oPreviousSearch.sSearch.replace('"', "&quot;"));
            jqFilter.bind("keyup.DT", function(e) {
                var n = oSettings.aanFeatures.f;
                for (var i = 0, iLen = n.length; i < iLen; i++) {
                    if (n[i] != this.parentNode) {
                        $("input", n[i]).val(this.value)
                    }
                }
                if (this.value != oSettings.oPreviousSearch.sSearch) {
                    _fnFilterComplete(oSettings, {
                        sSearch: this.value,
                        bRegex: oSettings.oPreviousSearch.bRegex,
                        bSmart: oSettings.oPreviousSearch.bSmart
                    })
                }
            });
            jqFilter.bind("keypress.DT", function(e) {
                if (e.keyCode == 13) {
                    return false
                }
            });
            return nFilter
        }

        function _fnFilterComplete(oSettings, oInput, iForce) {
            _fnFilter(oSettings, oInput.sSearch, iForce, oInput.bRegex, oInput.bSmart);
            for (var i = 0; i < oSettings.aoPreSearchCols.length; i++) {
                _fnFilterColumn(oSettings, oSettings.aoPreSearchCols[i].sSearch, i, oSettings.aoPreSearchCols[i].bRegex, oSettings.aoPreSearchCols[i].bSmart)
            }
            if (_oExt.afnFiltering.length !== 0) {
                _fnFilterCustom(oSettings)
            }
            oSettings.bFiltered = true;
            oSettings._iDisplayStart = 0;
            _fnCalculateEnd(oSettings);
            _fnDraw(oSettings);
            _fnBuildSearchArray(oSettings, 0)
        }

        function _fnFilterCustom(oSettings) {
            var afnFilters = _oExt.afnFiltering;
            for (var i = 0, iLen = afnFilters.length; i < iLen; i++) {
                var iCorrector = 0;
                for (var j = 0, jLen = oSettings.aiDisplay.length; j < jLen; j++) {
                    var iDisIndex = oSettings.aiDisplay[j - iCorrector];
                    if (!afnFilters[i](oSettings, _fnGetRowData(oSettings, iDisIndex, "filter"), iDisIndex)) {
                        oSettings.aiDisplay.splice(j - iCorrector, 1);
                        iCorrector++
                    }
                }
            }
        }

        function _fnFilterColumn(oSettings, sInput, iColumn, bRegex, bSmart) {
            if (sInput === "") {
                return
            }
            var iIndexCorrector = 0;
            var rpSearch = _fnFilterCreateSearch(sInput, bRegex, bSmart);
            for (var i = oSettings.aiDisplay.length - 1; i >= 0; i--) {
                var sData = _fnDataToSearch(_fnGetCellData(oSettings, oSettings.aiDisplay[i], iColumn, "filter"), oSettings.aoColumns[iColumn].sType);
                if (!rpSearch.test(sData)) {
                    oSettings.aiDisplay.splice(i, 1);
                    iIndexCorrector++
                }
            }
        }

        function _fnFilter(oSettings, sInput, iForce, bRegex, bSmart) {
            var i;
            var rpSearch = _fnFilterCreateSearch(sInput, bRegex, bSmart);
            if (typeof iForce == "undefined" || iForce === null) {
                iForce = 0
            }
            if (_oExt.afnFiltering.length !== 0) {
                iForce = 1
            }
            if (sInput.length <= 0) {
                oSettings.aiDisplay.splice(0, oSettings.aiDisplay.length);
                oSettings.aiDisplay = oSettings.aiDisplayMaster.slice()
            } else {
                if (oSettings.aiDisplay.length == oSettings.aiDisplayMaster.length || oSettings.oPreviousSearch.sSearch.length > sInput.length || iForce == 1 || sInput.indexOf(oSettings.oPreviousSearch.sSearch) !== 0) {
                    oSettings.aiDisplay.splice(0, oSettings.aiDisplay.length);
                    _fnBuildSearchArray(oSettings, 1);
                    for (i = 0; i < oSettings.aiDisplayMaster.length; i++) {
                        if (rpSearch.test(oSettings.asDataSearch[i])) {
                            oSettings.aiDisplay.push(oSettings.aiDisplayMaster[i])
                        }
                    }
                } else {
                    var iIndexCorrector = 0;
                    for (i = 0; i < oSettings.asDataSearch.length; i++) {
                        if (!rpSearch.test(oSettings.asDataSearch[i])) {
                            oSettings.aiDisplay.splice(i - iIndexCorrector, 1);
                            iIndexCorrector++
                        }
                    }
                }
            }
            oSettings.oPreviousSearch.sSearch = sInput;
            oSettings.oPreviousSearch.bRegex = bRegex;
            oSettings.oPreviousSearch.bSmart = bSmart
        }

        function _fnBuildSearchArray(oSettings, iMaster) {
            oSettings.asDataSearch.splice(0, oSettings.asDataSearch.length);
            var aArray = (typeof iMaster != "undefined" && iMaster == 1) ? oSettings.aiDisplayMaster : oSettings.aiDisplay;
            for (var i = 0, iLen = aArray.length; i < iLen; i++) {
                oSettings.asDataSearch[i] = _fnBuildSearchRow(oSettings, _fnGetRowData(oSettings, aArray[i], "filter"))
            }
        }

        function _fnBuildSearchRow(oSettings, aData) {
            var sSearch = "";
            if (typeof oSettings.__nTmpFilter == "undefined") {
                oSettings.__nTmpFilter = document.createElement("div")
            }
            var nTmp = oSettings.__nTmpFilter;
            for (var j = 0, jLen = oSettings.aoColumns.length; j < jLen; j++) {
                if (oSettings.aoColumns[j].bSearchable) {
                    var sData = aData[j];
                    sSearch += _fnDataToSearch(sData, oSettings.aoColumns[j].sType) + "  "
                }
            }
            if (sSearch.indexOf("&") !== -1) {
                nTmp.innerHTML = sSearch;
                sSearch = nTmp.textContent ? nTmp.textContent : nTmp.innerText;
                sSearch = sSearch.replace(/\n/g, " ").replace(/\r/g, "")
            }
            return sSearch
        }

        function _fnFilterCreateSearch(sSearch, bRegex, bSmart) {
            var asSearch, sRegExpString;
            if (bSmart) {
                asSearch = bRegex ? sSearch.split(" ") : _fnEscapeRegex(sSearch).split(" ");
                sRegExpString = "^(?=.*?" + asSearch.join(")(?=.*?") + ").*$";
                return new RegExp(sRegExpString, "i")
            } else {
                sSearch = bRegex ? sSearch : _fnEscapeRegex(sSearch);
                return new RegExp(sSearch, "i")
            }
        }

        function _fnDataToSearch(sData, sType) {
            if (typeof _oExt.ofnSearch[sType] == "function") {
                return _oExt.ofnSearch[sType](sData)
            } else {
                if (sType == "html") {
                    return sData.replace(/\n/g, " ").replace(/<.*?>/g, "")
                } else {
                    if (typeof sData == "string") {
                        return sData.replace(/\n/g, " ")
                    } else {
                        if (sData === null) {
                            return ""
                        }
                    }
                }
            }
            return sData
        }

        function _fnSort(oSettings, bApplyClasses) {
            var iDataSort, iDataType, i, iLen, j, jLen, aaSort = [],
                aiOrig = [],
                oSort = _oExt.oSort,
                aoData = oSettings.aoData,
                aoColumns = oSettings.aoColumns;
            if (!oSettings.oFeatures.bServerSide && (oSettings.aaSorting.length !== 0 || oSettings.aaSortingFixed !== null)) {
                if (oSettings.aaSortingFixed !== null) {
                    aaSort = oSettings.aaSortingFixed.concat(oSettings.aaSorting)
                } else {
                    aaSort = oSettings.aaSorting.slice()
                }
                for (i = 0; i < aaSort.length; i++) {
                    var iColumn = aaSort[i][0];
                    var iVisColumn = _fnColumnIndexToVisible(oSettings, iColumn);
                    var sDataType = oSettings.aoColumns[iColumn].sSortDataType;
                    if (typeof _oExt.afnSortData[sDataType] != "undefined") {
                        var aData = _oExt.afnSortData[sDataType](oSettings, iColumn, iVisColumn);
                        for (j = 0, jLen = aoData.length; j < jLen; j++) {
                            _fnSetCellData(oSettings, j, iColumn, aData[j])
                        }
                    }
                }
                for (i = 0, iLen = oSettings.aiDisplayMaster.length; i < iLen; i++) {
                    aiOrig[oSettings.aiDisplayMaster[i]] = i
                }
                var iSortLen = aaSort.length;
                oSettings.aiDisplayMaster.sort(function(a, b) {
                    var iTest, iDataSort, sDataType;
                    for (i = 0; i < iSortLen; i++) {
                        iDataSort = aoColumns[aaSort[i][0]].iDataSort;
                        sDataType = aoColumns[iDataSort].sType;
                        iTest = oSort[(sDataType ? sDataType : "string") + "-" + aaSort[i][1]](_fnGetCellData(oSettings, a, iDataSort, "sort"), _fnGetCellData(oSettings, b, iDataSort, "sort"));
                        if (iTest !== 0) {
                            return iTest
                        }
                    }
                    return oSort["numeric-asc"](aiOrig[a], aiOrig[b])
                })
            }
            if ((typeof bApplyClasses == "undefined" || bApplyClasses) && !oSettings.oFeatures.bDeferRender) {
                _fnSortingClasses(oSettings)
            }
            oSettings.bSorted = true;
            if (oSettings.oFeatures.bFilter) {
                _fnFilterComplete(oSettings, oSettings.oPreviousSearch, 1)
            } else {
                oSettings.aiDisplay = oSettings.aiDisplayMaster.slice();
                oSettings._iDisplayStart = 0;
                _fnCalculateEnd(oSettings);
                _fnDraw(oSettings)
            }
        }

        function _fnSortAttachListener(oSettings, nNode, iDataIndex, fnCallback) {
            $(nNode).bind("click.DT", function(e) {
                if (oSettings.aoColumns[iDataIndex].bSortable === false) {
                    return
                }
                var fnInnerSorting = function() {
                    var iColumn, iNextSort;
                    if (e.shiftKey) {
                        var bFound = false;
                        for (var i = 0; i < oSettings.aaSorting.length; i++) {
                            if (oSettings.aaSorting[i][0] == iDataIndex) {
                                bFound = true;
                                iColumn = oSettings.aaSorting[i][0];
                                iNextSort = oSettings.aaSorting[i][2] + 1;
                                if (typeof oSettings.aoColumns[iColumn].asSorting[iNextSort] == "undefined") {
                                    oSettings.aaSorting.splice(i, 1)
                                } else {
                                    oSettings.aaSorting[i][1] = oSettings.aoColumns[iColumn].asSorting[iNextSort];
                                    oSettings.aaSorting[i][2] = iNextSort
                                }
                                break
                            }
                        }
                        if (bFound === false) {
                            oSettings.aaSorting.push([iDataIndex, oSettings.aoColumns[iDataIndex].asSorting[0], 0])
                        }
                    } else {
                        if (oSettings.aaSorting.length == 1 && oSettings.aaSorting[0][0] == iDataIndex) {
                            iColumn = oSettings.aaSorting[0][0];
                            iNextSort = oSettings.aaSorting[0][2] + 1;
                            if (typeof oSettings.aoColumns[iColumn].asSorting[iNextSort] == "undefined") {
                                iNextSort = 0
                            }
                            oSettings.aaSorting[0][1] = oSettings.aoColumns[iColumn].asSorting[iNextSort];
                            oSettings.aaSorting[0][2] = iNextSort
                        } else {
                            oSettings.aaSorting.splice(0, oSettings.aaSorting.length);
                            oSettings.aaSorting.push([iDataIndex, oSettings.aoColumns[iDataIndex].asSorting[0], 0])
                        }
                    }
                    _fnSort(oSettings)
                };
                if (!oSettings.oFeatures.bProcessing) {
                    fnInnerSorting()
                } else {
                    _fnProcessingDisplay(oSettings, true);
                    setTimeout(function() {
                        fnInnerSorting();
                        if (!oSettings.oFeatures.bServerSide) {
                            _fnProcessingDisplay(oSettings, false)
                        }
                    }, 0)
                }
                if (typeof fnCallback == "function") {
                    fnCallback(oSettings)
                }
            })
        }

        function _fnSortingClasses(oSettings) {
            var i, iLen, j, jLen, iFound;
            var aaSort, sClass;
            var iColumns = oSettings.aoColumns.length;
            var oClasses = oSettings.oClasses;
            for (i = 0; i < iColumns; i++) {
                if (oSettings.aoColumns[i].bSortable) {
                    $(oSettings.aoColumns[i].nTh).removeClass(oClasses.sSortAsc + " " + oClasses.sSortDesc + " " + oSettings.aoColumns[i].sSortingClass)
                }
            }
            if (oSettings.aaSortingFixed !== null) {
                aaSort = oSettings.aaSortingFixed.concat(oSettings.aaSorting)
            } else {
                aaSort = oSettings.aaSorting.slice()
            }
            for (i = 0; i < oSettings.aoColumns.length; i++) {
                if (oSettings.aoColumns[i].bSortable) {
                    sClass = oSettings.aoColumns[i].sSortingClass;
                    iFound = -1;
                    for (j = 0; j < aaSort.length; j++) {
                        if (aaSort[j][0] == i) {
                            sClass = (aaSort[j][1] == "asc") ? oClasses.sSortAsc : oClasses.sSortDesc;
                            iFound = j;
                            break
                        }
                    }
                    $(oSettings.aoColumns[i].nTh).addClass(sClass);
                    if (oSettings.bJUI) {
                        var jqSpan = $("span", oSettings.aoColumns[i].nTh);
                        jqSpan.removeClass(oClasses.sSortJUIAsc + " " + oClasses.sSortJUIDesc + " " + oClasses.sSortJUI + " " + oClasses.sSortJUIAscAllowed + " " + oClasses.sSortJUIDescAllowed);
                        var sSpanClass;
                        if (iFound == -1) {
                            sSpanClass = oSettings.aoColumns[i].sSortingClassJUI
                        } else {
                            if (aaSort[iFound][1] == "asc") {
                                sSpanClass = oClasses.sSortJUIAsc
                            } else {
                                sSpanClass = oClasses.sSortJUIDesc
                            }
                        }
                        jqSpan.addClass(sSpanClass)
                    }
                } else {
                    $(oSettings.aoColumns[i].nTh).addClass(oSettings.aoColumns[i].sSortingClass)
                }
            }
            sClass = oClasses.sSortColumn;
            if (oSettings.oFeatures.bSort && oSettings.oFeatures.bSortClasses) {
                var nTds = _fnGetTdNodes(oSettings);
                if (oSettings.oFeatures.bDeferRender) {
                    $(nTds).removeClass(sClass + "1 " + sClass + "2 " + sClass + "3")
                } else {
                    if (nTds.length >= iColumns) {
                        for (i = 0; i < iColumns; i++) {
                            if (nTds[i].className.indexOf(sClass + "1") != -1) {
                                for (j = 0, jLen = (nTds.length / iColumns); j < jLen; j++) {
                                    nTds[(iColumns * j) + i].className = $.trim(nTds[(iColumns * j) + i].className.replace(sClass + "1", ""))
                                }
                            } else {
                                if (nTds[i].className.indexOf(sClass + "2") != -1) {
                                    for (j = 0, jLen = (nTds.length / iColumns); j < jLen; j++) {
                                        nTds[(iColumns * j) + i].className = $.trim(nTds[(iColumns * j) + i].className.replace(sClass + "2", ""))
                                    }
                                } else {
                                    if (nTds[i].className.indexOf(sClass + "3") != -1) {
                                        for (j = 0, jLen = (nTds.length / iColumns); j < jLen; j++) {
                                            nTds[(iColumns * j) + i].className = $.trim(nTds[(iColumns * j) + i].className.replace(" " + sClass + "3", ""))
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                var iClass = 1,
                    iTargetCol;
                for (i = 0; i < aaSort.length; i++) {
                    iTargetCol = parseInt(aaSort[i][0], 10);
                    for (j = 0, jLen = (nTds.length / iColumns); j < jLen; j++) {
                        nTds[(iColumns * j) + iTargetCol].className += " " + sClass + iClass
                    }
                    if (iClass < 3) {
                        iClass++
                    }
                }
            }
        }

        function _fnFeatureHtmlPaginate(oSettings) {
            if (oSettings.oScroll.bInfinite) {
                return null
            }
            var nPaginate = document.createElement("div");
            nPaginate.className = oSettings.oClasses.sPaging + oSettings.sPaginationType;
            _oExt.oPagination[oSettings.sPaginationType].fnInit(oSettings, nPaginate, function(oSettings) {
                _fnCalculateEnd(oSettings);
                _fnDraw(oSettings)
            });
            if (typeof oSettings.aanFeatures.p == "undefined") {
                oSettings.aoDrawCallback.push({
                    fn: function(oSettings) {
                        _oExt.oPagination[oSettings.sPaginationType].fnUpdate(oSettings, function(oSettings) {
                            _fnCalculateEnd(oSettings);
                            _fnDraw(oSettings)
                        })
                    },
                    sName: "pagination"
                })
            }
            return nPaginate
        }

        function _fnPageChange(oSettings, sAction) {
            var iOldStart = oSettings._iDisplayStart;
            if (sAction == "first") {
                oSettings._iDisplayStart = 0
            } else {
                if (sAction == "previous") {
                    oSettings._iDisplayStart = oSettings._iDisplayLength >= 0 ? oSettings._iDisplayStart - oSettings._iDisplayLength : 0;
                    if (oSettings._iDisplayStart < 0) {
                        oSettings._iDisplayStart = 0
                    }
                } else {
                    if (sAction == "next") {
                        if (oSettings._iDisplayLength >= 0) {
                            if (oSettings._iDisplayStart + oSettings._iDisplayLength < oSettings.fnRecordsDisplay()) {
                                oSettings._iDisplayStart += oSettings._iDisplayLength
                            }
                        } else {
                            oSettings._iDisplayStart = 0
                        }
                    } else {
                        if (sAction == "last") {
                            if (oSettings._iDisplayLength >= 0) {
                                var iPages = parseInt((oSettings.fnRecordsDisplay() - 1) / oSettings._iDisplayLength, 10) + 1;
                                oSettings._iDisplayStart = (iPages - 1) * oSettings._iDisplayLength
                            } else {
                                oSettings._iDisplayStart = 0
                            }
                        } else {
                            _fnLog(oSettings, 0, "Unknown paging action: " + sAction)
                        }
                    }
                }
            }
            return iOldStart != oSettings._iDisplayStart
        }

        function _fnFeatureHtmlInfo(oSettings) {
            var nInfo = document.createElement("div");
            nInfo.className = oSettings.oClasses.sInfo;
            if (typeof oSettings.aanFeatures.i == "undefined") {
                oSettings.aoDrawCallback.push({
                    fn: _fnUpdateInfo,
                    sName: "information"
                });
                if (oSettings.sTableId !== "") {
                    nInfo.setAttribute("id", oSettings.sTableId + "_info")
                }
            }
            return nInfo
        }

        function _fnUpdateInfo(oSettings) {
            if (!oSettings.oFeatures.bInfo || oSettings.aanFeatures.i.length === 0) {
                return
            }
            var iStart = oSettings._iDisplayStart + 1,
                iEnd = oSettings.fnDisplayEnd(),
                iMax = oSettings.fnRecordsTotal(),
                iTotal = oSettings.fnRecordsDisplay(),
                sStart = oSettings.fnFormatNumber(iStart),
                sEnd = oSettings.fnFormatNumber(iEnd),
                sMax = oSettings.fnFormatNumber(iMax),
                sTotal = oSettings.fnFormatNumber(iTotal),
                sOut;
            if (oSettings.oScroll.bInfinite) {
                sStart = oSettings.fnFormatNumber(1)
            }
            if (oSettings.fnRecordsDisplay() === 0 && oSettings.fnRecordsDisplay() == oSettings.fnRecordsTotal()) {
                sOut = oSettings.oLanguage.sInfoEmpty + oSettings.oLanguage.sInfoPostFix
            } else {
                if (oSettings.fnRecordsDisplay() === 0) {
                    sOut = oSettings.oLanguage.sInfoEmpty + " " + oSettings.oLanguage.sInfoFiltered.replace("_MAX_", sMax) + oSettings.oLanguage.sInfoPostFix
                } else {
                    if (oSettings.fnRecordsDisplay() == oSettings.fnRecordsTotal()) {
                        sOut = oSettings.oLanguage.sInfo.replace("_START_", sStart).replace("_END_", sEnd).replace("_TOTAL_", sTotal) + oSettings.oLanguage.sInfoPostFix
                    } else {
                        sOut = oSettings.oLanguage.sInfo.replace("_START_", sStart).replace("_END_", sEnd).replace("_TOTAL_", sTotal) + " " + oSettings.oLanguage.sInfoFiltered.replace("_MAX_", oSettings.fnFormatNumber(oSettings.fnRecordsTotal())) + oSettings.oLanguage.sInfoPostFix
                    }
                }
            }
            if (oSettings.oLanguage.fnInfoCallback !== null) {
                sOut = oSettings.oLanguage.fnInfoCallback(oSettings, iStart, iEnd, iMax, iTotal, sOut)
            }
            var n = oSettings.aanFeatures.i;
            for (var i = 0, iLen = n.length; i < iLen; i++) {
                $(n[i]).html(sOut)
            }
        }

        function _fnFeatureHtmlLength(oSettings) {
            if (oSettings.oScroll.bInfinite) {
                return null
            }
            var sName = (oSettings.sTableId === "") ? "" : 'name="' + oSettings.sTableId + '_length"';
            var sStdMenu = '<select size="1" ' + sName + ">";
            var i, iLen;
            if (oSettings.aLengthMenu.length == 2 && typeof oSettings.aLengthMenu[0] == "object" && typeof oSettings.aLengthMenu[1] == "object") {
                for (i = 0, iLen = oSettings.aLengthMenu[0].length; i < iLen; i++) {
                    sStdMenu += '<option value="' + oSettings.aLengthMenu[0][i] + '">' + oSettings.aLengthMenu[1][i] + "</option>"
                }
            } else {
                for (i = 0, iLen = oSettings.aLengthMenu.length; i < iLen; i++) {
                    sStdMenu += '<option value="' + oSettings.aLengthMenu[i] + '">' + oSettings.aLengthMenu[i] + "</option>"
                }
            }
            sStdMenu += "</select>";
            var nLength = document.createElement("div");
            if (oSettings.sTableId !== "" && typeof oSettings.aanFeatures.l == "undefined") {
                nLength.setAttribute("id", oSettings.sTableId + "_length")
            }
            nLength.className = oSettings.oClasses.sLength;
            nLength.innerHTML = "<label>" + oSettings.oLanguage.sLengthMenu.replace("_MENU_", sStdMenu) + "</label>";
            $('select option[value="' + oSettings._iDisplayLength + '"]', nLength).attr("selected", true);
            $("select", nLength).bind("change.DT", function(e) {
                var iVal = $(this).val();
                var n = oSettings.aanFeatures.l;
                for (i = 0, iLen = n.length; i < iLen; i++) {
                    if (n[i] != this.parentNode) {
                        $("select", n[i]).val(iVal)
                    }
                }
                oSettings._iDisplayLength = parseInt(iVal, 10);
                _fnCalculateEnd(oSettings);
                if (oSettings.fnDisplayEnd() == oSettings.fnRecordsDisplay()) {
                    oSettings._iDisplayStart = oSettings.fnDisplayEnd() - oSettings._iDisplayLength;
                    if (oSettings._iDisplayStart < 0) {
                        oSettings._iDisplayStart = 0
                    }
                }
                if (oSettings._iDisplayLength == -1) {
                    oSettings._iDisplayStart = 0
                }
                _fnDraw(oSettings)
            });
            return nLength
        }

        function _fnFeatureHtmlProcessing(oSettings) {
            var nProcessing = document.createElement("div");
            if (oSettings.sTableId !== "" && typeof oSettings.aanFeatures.r == "undefined") {
                nProcessing.setAttribute("id", oSettings.sTableId + "_processing")
            }
            nProcessing.innerHTML = oSettings.oLanguage.sProcessing;
            nProcessing.className = oSettings.oClasses.sProcessing;
            oSettings.nTable.parentNode.insertBefore(nProcessing, oSettings.nTable);
            return nProcessing
        }

        function _fnProcessingDisplay(oSettings, bShow) {
            if (oSettings.oFeatures.bProcessing) {
                var an = oSettings.aanFeatures.r;
                for (var i = 0, iLen = an.length; i < iLen; i++) {
                    an[i].style.visibility = bShow ? "visible" : "hidden"
                }
            }
        }

        function _fnVisibleToColumnIndex(oSettings, iMatch) {
            var iColumn = -1;
            for (var i = 0; i < oSettings.aoColumns.length; i++) {
                if (oSettings.aoColumns[i].bVisible === true) {
                    iColumn++
                }
                if (iColumn == iMatch) {
                    return i
                }
            }
            return null
        }

        function _fnColumnIndexToVisible(oSettings, iMatch) {
            var iVisible = -1;
            for (var i = 0; i < oSettings.aoColumns.length; i++) {
                if (oSettings.aoColumns[i].bVisible === true) {
                    iVisible++
                }
                if (i == iMatch) {
                    return oSettings.aoColumns[i].bVisible === true ? iVisible : null
                }
            }
            return null
        }

        function _fnNodeToDataIndex(s, n) {
            var i, iLen;
            for (i = s._iDisplayStart, iLen = s._iDisplayEnd; i < iLen; i++) {
                if (s.aoData[s.aiDisplay[i]].nTr == n) {
                    return s.aiDisplay[i]
                }
            }
            for (i = 0, iLen = s.aoData.length; i < iLen; i++) {
                if (s.aoData[i].nTr == n) {
                    return i
                }
            }
            return null
        }

        function _fnVisbleColumns(oS) {
            var iVis = 0;
            for (var i = 0; i < oS.aoColumns.length; i++) {
                if (oS.aoColumns[i].bVisible === true) {
                    iVis++
                }
            }
            return iVis
        }

        function _fnCalculateEnd(oSettings) {
            if (oSettings.oFeatures.bPaginate === false) {
                oSettings._iDisplayEnd = oSettings.aiDisplay.length
            } else {
                if (oSettings._iDisplayStart + oSettings._iDisplayLength > oSettings.aiDisplay.length || oSettings._iDisplayLength == -1) {
                    oSettings._iDisplayEnd = oSettings.aiDisplay.length
                } else {
                    oSettings._iDisplayEnd = oSettings._iDisplayStart + oSettings._iDisplayLength
                }
            }
        }

        function _fnConvertToWidth(sWidth, nParent) {
            if (!sWidth || sWidth === null || sWidth === "") {
                return 0
            }
            if (typeof nParent == "undefined") {
                nParent = document.getElementsByTagName("body")[0]
            }
            var iWidth;
            var nTmp = document.createElement("div");
            nTmp.style.width = _fnStringToCss(sWidth);
            nParent.appendChild(nTmp);
            iWidth = nTmp.offsetWidth;
            nParent.removeChild(nTmp);
            return (iWidth)
        }

        function _fnCalculateColumnWidths(oSettings) {
            var iTableWidth = oSettings.nTable.offsetWidth;
            var iUserInputs = 0;
            var iTmpWidth;
            var iVisibleColumns = 0;
            var iColums = oSettings.aoColumns.length;
            var i, iIndex, iCorrector, iWidth;
            var oHeaders = $("th", oSettings.nTHead);
            for (i = 0; i < iColums; i++) {
                if (oSettings.aoColumns[i].bVisible) {
                    iVisibleColumns++;
                    if (oSettings.aoColumns[i].sWidth !== null) {
                        iTmpWidth = _fnConvertToWidth(oSettings.aoColumns[i].sWidthOrig, oSettings.nTable.parentNode);
                        if (iTmpWidth !== null) {
                            oSettings.aoColumns[i].sWidth = _fnStringToCss(iTmpWidth)
                        }
                        iUserInputs++
                    }
                }
            }
            if (iColums == oHeaders.length && iUserInputs === 0 && iVisibleColumns == iColums && oSettings.oScroll.sX === "" && oSettings.oScroll.sY === "") {
                for (i = 0; i < oSettings.aoColumns.length; i++) {
                    iTmpWidth = $(oHeaders[i]).width();
                    if (iTmpWidth !== null) {
                        oSettings.aoColumns[i].sWidth = _fnStringToCss(iTmpWidth)
                    }
                }
            } else {
                var nCalcTmp = oSettings.nTable.cloneNode(false),
                    nTheadClone = oSettings.nTHead.cloneNode(true),
                    nBody = document.createElement("tbody"),
                    nTr = document.createElement("tr"),
                    nDivSizing;
                nCalcTmp.removeAttribute("id");
                nCalcTmp.appendChild(nTheadClone);
                if (oSettings.nTFoot !== null) {
                    nCalcTmp.appendChild(oSettings.nTFoot.cloneNode(true));
                    _fnApplyToChildren(function(n) {
                        n.style.width = ""
                    }, nCalcTmp.getElementsByTagName("tr"))
                }
                nCalcTmp.appendChild(nBody);
                nBody.appendChild(nTr);
                var jqColSizing = $("thead th", nCalcTmp);
                if (jqColSizing.length === 0) {
                    jqColSizing = $("tbody tr:eq(0)>td", nCalcTmp)
                }
                var nThs = _fnGetUniqueThs(oSettings, nTheadClone);
                iCorrector = 0;
                for (i = 0; i < iColums; i++) {
                    var oColumn = oSettings.aoColumns[i];
                    if (oColumn.bVisible && oColumn.sWidthOrig !== null && oColumn.sWidthOrig !== "") {
                        nThs[i - iCorrector].style.width = _fnStringToCss(oColumn.sWidthOrig)
                    } else {
                        if (oColumn.bVisible) {
                            nThs[i - iCorrector].style.width = ""
                        } else {
                            iCorrector++
                        }
                    }
                }
                for (i = 0; i < iColums; i++) {
                    if (oSettings.aoColumns[i].bVisible) {
                        var nTd = _fnGetWidestNode(oSettings, i);
                        if (nTd !== null) {
                            nTd = nTd.cloneNode(true);
                            if (oSettings.aoColumns[i].sContentPadding !== "") {
                                nTd.innerHTML += oSettings.aoColumns[i].sContentPadding
                            }
                            nTr.appendChild(nTd)
                        }
                    }
                }
                var nWrapper = oSettings.nTable.parentNode;
                nWrapper.appendChild(nCalcTmp);
                if (oSettings.oScroll.sX !== "" && oSettings.oScroll.sXInner !== "") {
                    nCalcTmp.style.width = _fnStringToCss(oSettings.oScroll.sXInner)
                } else {
                    if (oSettings.oScroll.sX !== "") {
                        nCalcTmp.style.width = "";
                        if ($(nCalcTmp).width() < nWrapper.offsetWidth) {
                            nCalcTmp.style.width = _fnStringToCss(nWrapper.offsetWidth)
                        }
                    } else {
                        if (oSettings.oScroll.sY !== "") {
                            nCalcTmp.style.width = _fnStringToCss(nWrapper.offsetWidth)
                        }
                    }
                }
                nCalcTmp.style.visibility = "hidden";
                _fnScrollingWidthAdjust(oSettings, nCalcTmp);
                var oNodes = $("tbody tr:eq(0)", nCalcTmp).children();
                if (oNodes.length === 0) {
                    oNodes = _fnGetUniqueThs(oSettings, $("thead", nCalcTmp)[0])
                }
                if (oSettings.oScroll.sX !== "") {
                    var iTotal = 0;
                    iCorrector = 0;
                    for (i = 0; i < oSettings.aoColumns.length; i++) {
                        if (oSettings.aoColumns[i].bVisible) {
                            if (oSettings.aoColumns[i].sWidthOrig === null) {
                                iTotal += $(oNodes[iCorrector]).outerWidth()
                            } else {
                                iTotal += parseInt(oSettings.aoColumns[i].sWidth.replace("px", ""), 10) + ($(oNodes[iCorrector]).outerWidth() - $(oNodes[iCorrector]).width())
                            }
                            iCorrector++
                        }
                    }
                    nCalcTmp.style.width = _fnStringToCss(iTotal);
                    oSettings.nTable.style.width = _fnStringToCss(iTotal)
                }
                iCorrector = 0;
                for (i = 0; i < oSettings.aoColumns.length; i++) {
                    if (oSettings.aoColumns[i].bVisible) {
                        iWidth = $(oNodes[iCorrector]).width();
                        if (iWidth !== null && iWidth > 0) {
                            oSettings.aoColumns[i].sWidth = _fnStringToCss(iWidth)
                        }
                        iCorrector++
                    }
                }
                oSettings.nTable.style.width = _fnStringToCss($(nCalcTmp).outerWidth());
                nCalcTmp.parentNode.removeChild(nCalcTmp)
            }
        }

        function _fnScrollingWidthAdjust(oSettings, n) {
            if (oSettings.oScroll.sX === "" && oSettings.oScroll.sY !== "") {
                var iOrigWidth = $(n).width();
                n.style.width = _fnStringToCss($(n).outerWidth() - oSettings.oScroll.iBarWidth)
            } else {
                if (oSettings.oScroll.sX !== "") {
                    n.style.width = _fnStringToCss($(n).outerWidth())
                }
            }
        }

        function _fnGetWidestNode(oSettings, iCol) {
            var iMaxIndex = _fnGetMaxLenString(oSettings, iCol);
            if (iMaxIndex < 0) {
                return null
            }
            if (oSettings.aoData[iMaxIndex].nTr === null) {
                var n = document.createElement("td");
                n.innerHTML = _fnGetCellData(oSettings, iMaxIndex, iCol, "");
                return n
            }
            return _fnGetTdNodes(oSettings, iMaxIndex)[iCol]
        }

        function _fnGetMaxLenString(oSettings, iCol) {
            var iMax = -1;
            var iMaxIndex = -1;
            for (var i = 0; i < oSettings.aoData.length; i++) {
                var s = _fnGetCellData(oSettings, i, iCol, "display") + "";
                s = s.replace(/<.*?>/g, "");
                if (s.length > iMax) {
                    iMax = s.length;
                    iMaxIndex = i
                }
            }
            return iMaxIndex
        }

        function _fnStringToCss(s) {
            if (s === null) {
                return "0px"
            }
            if (typeof s == "number") {
                if (s < 0) {
                    return "0px"
                }
                return s + "px"
            }
            var c = s.charCodeAt(s.length - 1);
            if (c < 48 || c > 57) {
                return s
            }
            return s + "px"
        }

        function _fnArrayCmp(aArray1, aArray2) {
            if (aArray1.length != aArray2.length) {
                return 1
            }
            for (var i = 0; i < aArray1.length; i++) {
                if (aArray1[i] != aArray2[i]) {
                    return 2
                }
            }
            return 0
        }

        function _fnDetectType(sData) {
            var aTypes = _oExt.aTypes;
            var iLen = aTypes.length;
            for (var i = 0; i < iLen; i++) {
                var sType = aTypes[i](sData);
                if (sType !== null) {
                    return sType
                }
            }
            return "string"
        }

        function _fnSettingsFromNode(nTable) {
            for (var i = 0; i < _aoSettings.length; i++) {
                if (_aoSettings[i].nTable == nTable) {
                    return _aoSettings[i]
                }
            }
            return null
        }

        function _fnGetDataMaster(oSettings) {
            var aData = [];
            var iLen = oSettings.aoData.length;
            for (var i = 0; i < iLen; i++) {
                aData.push(oSettings.aoData[i]._aData)
            }
            return aData
        }

        function _fnGetTrNodes(oSettings) {
            var aNodes = [];
            for (var i = 0, iLen = oSettings.aoData.length; i < iLen; i++) {
                if (oSettings.aoData[i].nTr !== null) {
                    aNodes.push(oSettings.aoData[i].nTr)
                }
            }
            return aNodes
        }

        function _fnGetTdNodes(oSettings, iIndividualRow) {
            var anReturn = [];
            var iCorrector;
            var anTds;
            var iRow, iRows = oSettings.aoData.length,
                iColumn, iColumns, oData, sNodeName, iStart = 0,
                iEnd = iRows;
            if (typeof iIndividualRow != "undefined") {
                iStart = iIndividualRow;
                iEnd = iIndividualRow + 1
            }
            for (iRow = iStart; iRow < iEnd; iRow++) {
                oData = oSettings.aoData[iRow];
                if (oData.nTr !== null) {
                    anTds = [];
                    for (iColumn = 0, iColumns = oData.nTr.childNodes.length; iColumn < iColumns; iColumn++) {
                        sNodeName = oData.nTr.childNodes[iColumn].nodeName.toLowerCase();
                        if (sNodeName == "td" || sNodeName == "th") {
                            anTds.push(oData.nTr.childNodes[iColumn])
                        }
                    }
                    iCorrector = 0;
                    for (iColumn = 0, iColumns = oSettings.aoColumns.length; iColumn < iColumns; iColumn++) {
                        if (oSettings.aoColumns[iColumn].bVisible) {
                            anReturn.push(anTds[iColumn - iCorrector])
                        } else {
                            anReturn.push(oData._anHidden[iColumn]);
                            iCorrector++
                        }
                    }
                }
            }
            return anReturn
        }

        function _fnEscapeRegex(sVal) {
            var acEscape = ["/", ".", "*", "+", "?", "|", "(", ")", "[", "]", "{", "}", "\\", "$", "^"];
            var reReplace = new RegExp("(\\" + acEscape.join("|\\") + ")", "g");
            return sVal.replace(reReplace, "\\$1")
        }

        function _fnDeleteIndex(a, iTarget) {
            var iTargetIndex = -1;
            for (var i = 0, iLen = a.length; i < iLen; i++) {
                if (a[i] == iTarget) {
                    iTargetIndex = i
                } else {
                    if (a[i] > iTarget) {
                        a[i]--
                    }
                }
            }
            if (iTargetIndex != -1) {
                a.splice(iTargetIndex, 1)
            }
        }

        function _fnReOrderIndex(oSettings, sColumns) {
            var aColumns = sColumns.split(",");
            var aiReturn = [];
            for (var i = 0, iLen = oSettings.aoColumns.length; i < iLen; i++) {
                for (var j = 0; j < iLen; j++) {
                    if (oSettings.aoColumns[i].sName == aColumns[j]) {
                        aiReturn.push(j);
                        break
                    }
                }
            }
            return aiReturn
        }

        function _fnColumnOrdering(oSettings) {
            var sNames = "";
            for (var i = 0, iLen = oSettings.aoColumns.length; i < iLen; i++) {
                sNames += oSettings.aoColumns[i].sName + ","
            }
            if (sNames.length == iLen) {
                return ""
            }
            return sNames.slice(0, -1)
        }

        function _fnLog(oSettings, iLevel, sMesg) {
            var sAlert = oSettings.sTableId === "" ? "DataTables warning: " + sMesg : "DataTables warning (table id = '" + oSettings.sTableId + "'): " + sMesg;
            if (iLevel === 0) {
                if (_oExt.sErrMode == "alert") {
                    alert(sAlert)
                } else {
                    throw sAlert
                }
                return
            } else {
                if (typeof console != "undefined" && typeof console.log != "undefined") {
                    console.log(sAlert)
                }
            }
        }

        function _fnClearTable(oSettings) {
            oSettings.aoData.splice(0, oSettings.aoData.length);
            oSettings.aiDisplayMaster.splice(0, oSettings.aiDisplayMaster.length);
            oSettings.aiDisplay.splice(0, oSettings.aiDisplay.length);
            _fnCalculateEnd(oSettings)
        }

        function _fnSaveState(oSettings) {
            if (!oSettings.oFeatures.bStateSave || typeof oSettings.bDestroying != "undefined") {
                return
            }
            var i, iLen, sTmp;
            var sValue = "{";
            sValue += '"iCreate":' + new Date().getTime() + ",";
            sValue += '"iStart":' + (oSettings.oScroll.bInfinite ? 0 : oSettings._iDisplayStart) + ",";
            sValue += '"iEnd":' + (oSettings.oScroll.bInfinite ? oSettings._iDisplayLength : oSettings._iDisplayEnd) + ",";
            sValue += '"iLength":' + oSettings._iDisplayLength + ",";
            sValue += '"sFilter":"' + encodeURIComponent(oSettings.oPreviousSearch.sSearch) + '",';
            sValue += '"sFilterEsc":' + !oSettings.oPreviousSearch.bRegex + ",";
            sValue += '"aaSorting":[ ';
            for (i = 0; i < oSettings.aaSorting.length; i++) {
                sValue += "[" + oSettings.aaSorting[i][0] + ',"' + oSettings.aaSorting[i][1] + '"],'
            }
            sValue = sValue.substring(0, sValue.length - 1);
            sValue += "],";
            sValue += '"aaSearchCols":[ ';
            for (i = 0; i < oSettings.aoPreSearchCols.length; i++) {
                sValue += '["' + encodeURIComponent(oSettings.aoPreSearchCols[i].sSearch) + '",' + !oSettings.aoPreSearchCols[i].bRegex + "],"
            }
            sValue = sValue.substring(0, sValue.length - 1);
            sValue += "],";
            sValue += '"abVisCols":[ ';
            for (i = 0; i < oSettings.aoColumns.length; i++) {
                sValue += oSettings.aoColumns[i].bVisible + ","
            }
            sValue = sValue.substring(0, sValue.length - 1);
            sValue += "]";
            for (i = 0, iLen = oSettings.aoStateSave.length; i < iLen; i++) {
                sTmp = oSettings.aoStateSave[i].fn(oSettings, sValue);
                if (sTmp !== "") {
                    sValue = sTmp
                }
            }
            sValue += "}";
            _fnCreateCookie(oSettings.sCookiePrefix + oSettings.sInstance, sValue, oSettings.iCookieDuration, oSettings.sCookiePrefix, oSettings.fnCookieCallback)
        }

        function _fnLoadState(oSettings, oInit) {
            if (!oSettings.oFeatures.bStateSave) {
                return
            }
            var oData, i, iLen;
            var sData = _fnReadCookie(oSettings.sCookiePrefix + oSettings.sInstance);
            if (sData !== null && sData !== "") {
                try {
                    oData = (typeof $.parseJSON == "function") ? $.parseJSON(sData.replace(/'/g, '"')) : eval("(" + sData + ")")
                } catch (e) {
                    return
                }
                for (i = 0, iLen = oSettings.aoStateLoad.length; i < iLen; i++) {
                    if (!oSettings.aoStateLoad[i].fn(oSettings, oData)) {
                        return
                    }
                }
                oSettings.oLoadedState = $.extend(true, {}, oData);
                oSettings._iDisplayStart = oData.iStart;
                oSettings.iInitDisplayStart = oData.iStart;
                oSettings._iDisplayEnd = oData.iEnd;
                oSettings._iDisplayLength = oData.iLength;
                oSettings.oPreviousSearch.sSearch = decodeURIComponent(oData.sFilter);
                oSettings.aaSorting = oData.aaSorting.slice();
                oSettings.saved_aaSorting = oData.aaSorting.slice();
                if (typeof oData.sFilterEsc != "undefined") {
                    oSettings.oPreviousSearch.bRegex = !oData.sFilterEsc
                }
                if (typeof oData.aaSearchCols != "undefined") {
                    for (i = 0; i < oData.aaSearchCols.length; i++) {
                        oSettings.aoPreSearchCols[i] = {
                            sSearch: decodeURIComponent(oData.aaSearchCols[i][0]),
                            bRegex: !oData.aaSearchCols[i][1]
                        }
                    }
                }
                if (typeof oData.abVisCols != "undefined") {
                    oInit.saved_aoColumns = [];
                    for (i = 0; i < oData.abVisCols.length; i++) {
                        oInit.saved_aoColumns[i] = {};
                        oInit.saved_aoColumns[i].bVisible = oData.abVisCols[i]
                    }
                }
            }
        }

        function _fnCreateCookie(sName, sValue, iSecs, sBaseName, fnCallback) {
            var date = new Date();
            date.setTime(date.getTime() + (iSecs * 1000));
            var aParts = window.location.pathname.split("/");
            var sNameFile = sName + "_" + aParts.pop().replace(/[\/:]/g, "").toLowerCase();
            var sFullCookie, oData;
            if (fnCallback !== null) {
                oData = (typeof $.parseJSON == "function") ? $.parseJSON(sValue) : eval("(" + sValue + ")");
                sFullCookie = fnCallback(sNameFile, oData, date.toGMTString(), aParts.join("/") + "/")
            } else {
                sFullCookie = sNameFile + "=" + encodeURIComponent(sValue) + "; expires=" + date.toGMTString() + "; path=" + aParts.join("/") + "/"
            }
            var sOldName = "",
                iOldTime = 9999999999999;
            var iLength = _fnReadCookie(sNameFile) !== null ? document.cookie.length : sFullCookie.length + document.cookie.length;
            if (iLength + 10 > 4096) {
                var aCookies = document.cookie.split(";");
                for (var i = 0, iLen = aCookies.length; i < iLen; i++) {
                    if (aCookies[i].indexOf(sBaseName) != -1) {
                        var aSplitCookie = aCookies[i].split("=");
                        try {
                            oData = eval("(" + decodeURIComponent(aSplitCookie[1]) + ")")
                        } catch (e) {
                            continue
                        }
                        if (typeof oData.iCreate != "undefined" && oData.iCreate < iOldTime) {
                            sOldName = aSplitCookie[0];
                            iOldTime = oData.iCreate
                        }
                    }
                }
                if (sOldName !== "") {
                    document.cookie = sOldName + "=; expires=Thu, 01-Jan-1970 00:00:01 GMT; path=" + aParts.join("/") + "/"
                }
            }
            document.cookie = sFullCookie
        }

        function _fnReadCookie(sName) {
            var aParts = window.location.pathname.split("/"),
                sNameEQ = sName + "_" + aParts[aParts.length - 1].replace(/[\/:]/g, "").toLowerCase() + "=",
                sCookieContents = document.cookie.split(";");
            for (var i = 0; i < sCookieContents.length; i++) {
                var c = sCookieContents[i];
                while (c.charAt(0) == " ") {
                    c = c.substring(1, c.length)
                }
                if (c.indexOf(sNameEQ) === 0) {
                    return decodeURIComponent(c.substring(sNameEQ.length, c.length))
                }
            }
            return null
        }

        function _fnDetectHeader(aLayout, nThead) {
            var nTrs = nThead.getElementsByTagName("tr");
            var nCell;
            var i, j, k, l, iLen, jLen, iColShifted;
            var fnShiftCol = function(a, i, j) {
                while (typeof a[i][j] != "undefined") {
                    j++
                }
                return j
            };
            aLayout.splice(0, aLayout.length);
            for (i = 0, iLen = nTrs.length; i < iLen; i++) {
                aLayout.push([])
            }
            for (i = 0, iLen = nTrs.length; i < iLen; i++) {
                var iColumn = 0;
                for (j = 0, jLen = nTrs[i].childNodes.length; j < jLen; j++) {
                    nCell = nTrs[i].childNodes[j];
                    if (nCell.nodeName.toUpperCase() == "TD" || nCell.nodeName.toUpperCase() == "TH") {
                        var iColspan = nCell.getAttribute("colspan") * 1;
                        var iRowspan = nCell.getAttribute("rowspan") * 1;
                        iColspan = (!iColspan || iColspan === 0 || iColspan === 1) ? 1 : iColspan;
                        iRowspan = (!iRowspan || iRowspan === 0 || iRowspan === 1) ? 1 : iRowspan;
                        iColShifted = fnShiftCol(aLayout, i, iColumn);
                        for (l = 0; l < iColspan; l++) {
                            for (k = 0; k < iRowspan; k++) {
                                aLayout[i + k][iColShifted + l] = {
                                    cell: nCell,
                                    unique: iColspan == 1 ? true : false
                                };
                                aLayout[i + k].nTr = nTrs[i]
                            }
                        }
                    }
                }
            }
        }

        function _fnGetUniqueThs(oSettings, nHeader, aLayout) {
            var aReturn = [];
            if (typeof aLayout == "undefined") {
                aLayout = oSettings.aoHeader;
                if (typeof nHeader != "undefined") {
                    aLayout = [];
                    _fnDetectHeader(aLayout, nHeader)
                }
            }
            for (var i = 0, iLen = aLayout.length; i < iLen; i++) {
                for (var j = 0, jLen = aLayout[i].length; j < jLen; j++) {
                    if (aLayout[i][j].unique && (typeof aReturn[j] == "undefined" || !oSettings.bSortCellsTop)) {
                        aReturn[j] = aLayout[i][j].cell
                    }
                }
            }
            return aReturn
        }

        function _fnScrollBarWidth() {
            var inner = document.createElement("p");
            var style = inner.style;
            style.width = "100%";
            style.height = "200px";
            var outer = document.createElement("div");
            style = outer.style;
            style.position = "absolute";
            style.top = "0px";
            style.left = "0px";
            style.visibility = "hidden";
            style.width = "200px";
            style.height = "150px";
            style.overflow = "hidden";
            outer.appendChild(inner);
            document.body.appendChild(outer);
            var w1 = inner.offsetWidth;
            outer.style.overflow = "scroll";
            var w2 = inner.offsetWidth;
            if (w1 == w2) {
                w2 = outer.clientWidth
            }
            document.body.removeChild(outer);
            return (w1 - w2)
        }

        function _fnApplyToChildren(fn, an1, an2) {
            for (var i = 0, iLen = an1.length; i < iLen; i++) {
                for (var j = 0, jLen = an1[i].childNodes.length; j < jLen; j++) {
                    if (an1[i].childNodes[j].nodeType == 1) {
                        if (typeof an2 != "undefined") {
                            fn(an1[i].childNodes[j], an2[i].childNodes[j])
                        } else {
                            fn(an1[i].childNodes[j])
                        }
                    }
                }
            }
        }

        function _fnMap(oRet, oSrc, sName, sMappedName) {
            if (typeof sMappedName == "undefined") {
                sMappedName = sName
            }
            if (typeof oSrc[sName] != "undefined") {
                oRet[sMappedName] = oSrc[sName]
            }
        }

        function _fnGetRowData(oSettings, iRow, sSpecific) {
            var out = [];
            for (var i = 0, iLen = oSettings.aoColumns.length; i < iLen; i++) {
                out.push(_fnGetCellData(oSettings, iRow, i, sSpecific))
            }
            return out
        }

        function _fnGetCellData(oSettings, iRow, iCol, sSpecific) {
            var sData;
            var oCol = oSettings.aoColumns[iCol];
            var oData = oSettings.aoData[iRow]._aData;
            if ((sData = oCol.fnGetData(oData)) === undefined) {
                if (oSettings.iDrawError != oSettings.iDraw && oCol.sDefaultContent === null) {
                    _fnLog(oSettings, 0, "Requested unknown parameter '" + oCol.mDataProp + "' from the data source for row " + iRow);
                    oSettings.iDrawError = oSettings.iDraw
                }
                return oCol.sDefaultContent
            }
            if (sData === null && oCol.sDefaultContent !== null) {
                sData = oCol.sDefaultContent
            }
            if (sSpecific == "display" && sData === null) {
                return ""
            }
            return sData
        }

        function _fnSetCellData(oSettings, iRow, iCol, val) {
            var oCol = oSettings.aoColumns[iCol];
            var oData = oSettings.aoData[iRow]._aData;
            oCol.fnSetData(oData, val)
        }

        function _fnGetObjectDataFn(mSource) {
            if (mSource === null) {
                return function(data) {
                    return null
                }
            } else {
                if (typeof mSource == "function") {
                    return function(data) {
                        return mSource(data)
                    }
                } else {
                    if (typeof mSource == "string" && mSource.indexOf(".") != -1) {
                        var a = mSource.split(".");
                        if (a.length == 2) {
                            return function(data) {
                                return data[a[0]][a[1]]
                            }
                        } else {
                            if (a.length == 3) {
                                return function(data) {
                                    return data[a[0]][a[1]][a[2]]
                                }
                            } else {
                                return function(data) {
                                    for (var i = 0, iLen = a.length; i < iLen; i++) {
                                        data = data[a[i]]
                                    }
                                    return data
                                }
                            }
                        }
                    } else {
                        return function(data) {
                            return data[mSource]
                        }
                    }
                }
            }
        }

        function _fnSetObjectDataFn(mSource) {
            if (mSource === null) {
                return function(data, val) {}
            } else {
                if (typeof mSource == "function") {
                    return function(data, val) {
                        return mSource(data, val)
                    }
                } else {
                    if (typeof mSource == "string" && mSource.indexOf(".") != -1) {
                        var a = mSource.split(".");
                        if (a.length == 2) {
                            return function(data, val) {
                                data[a[0]][a[1]] = val
                            }
                        } else {
                            if (a.length == 3) {
                                return function(data, val) {
                                    data[a[0]][a[1]][a[2]] = val
                                }
                            } else {
                                return function(data, val) {
                                    for (var i = 0, iLen = a.length - 1; i < iLen; i++) {
                                        data = data[a[i]]
                                    }
                                    data[a[a.length - 1]] = val
                                }
                            }
                        }
                    } else {
                        return function(data, val) {
                            data[mSource] = val
                        }
                    }
                }
            }
        }
        this.oApi._fnExternApiFunc = _fnExternApiFunc;
        this.oApi._fnInitalise = _fnInitalise;
        this.oApi._fnInitComplete = _fnInitComplete;
        this.oApi._fnLanguageProcess = _fnLanguageProcess;
        this.oApi._fnAddColumn = _fnAddColumn;
        this.oApi._fnColumnOptions = _fnColumnOptions;
        this.oApi._fnAddData = _fnAddData;
        this.oApi._fnCreateTr = _fnCreateTr;
        this.oApi._fnGatherData = _fnGatherData;
        this.oApi._fnBuildHead = _fnBuildHead;
        this.oApi._fnDrawHead = _fnDrawHead;
        this.oApi._fnDraw = _fnDraw;
        this.oApi._fnReDraw = _fnReDraw;
        this.oApi._fnAjaxUpdate = _fnAjaxUpdate;
        this.oApi._fnAjaxUpdateDraw = _fnAjaxUpdateDraw;
        this.oApi._fnAddOptionsHtml = _fnAddOptionsHtml;
        this.oApi._fnFeatureHtmlTable = _fnFeatureHtmlTable;
        this.oApi._fnScrollDraw = _fnScrollDraw;
        this.oApi._fnAjustColumnSizing = _fnAjustColumnSizing;
        this.oApi._fnFeatureHtmlFilter = _fnFeatureHtmlFilter;
        this.oApi._fnFilterComplete = _fnFilterComplete;
        this.oApi._fnFilterCustom = _fnFilterCustom;
        this.oApi._fnFilterColumn = _fnFilterColumn;
        this.oApi._fnFilter = _fnFilter;
        this.oApi._fnBuildSearchArray = _fnBuildSearchArray;
        this.oApi._fnBuildSearchRow = _fnBuildSearchRow;
        this.oApi._fnFilterCreateSearch = _fnFilterCreateSearch;
        this.oApi._fnDataToSearch = _fnDataToSearch;
        this.oApi._fnSort = _fnSort;
        this.oApi._fnSortAttachListener = _fnSortAttachListener;
        this.oApi._fnSortingClasses = _fnSortingClasses;
        this.oApi._fnFeatureHtmlPaginate = _fnFeatureHtmlPaginate;
        this.oApi._fnPageChange = _fnPageChange;
        this.oApi._fnFeatureHtmlInfo = _fnFeatureHtmlInfo;
        this.oApi._fnUpdateInfo = _fnUpdateInfo;
        this.oApi._fnFeatureHtmlLength = _fnFeatureHtmlLength;
        this.oApi._fnFeatureHtmlProcessing = _fnFeatureHtmlProcessing;
        this.oApi._fnProcessingDisplay = _fnProcessingDisplay;
        this.oApi._fnVisibleToColumnIndex = _fnVisibleToColumnIndex;
        this.oApi._fnColumnIndexToVisible = _fnColumnIndexToVisible;
        this.oApi._fnNodeToDataIndex = _fnNodeToDataIndex;
        this.oApi._fnVisbleColumns = _fnVisbleColumns;
        this.oApi._fnCalculateEnd = _fnCalculateEnd;
        this.oApi._fnConvertToWidth = _fnConvertToWidth;
        this.oApi._fnCalculateColumnWidths = _fnCalculateColumnWidths;
        this.oApi._fnScrollingWidthAdjust = _fnScrollingWidthAdjust;
        this.oApi._fnGetWidestNode = _fnGetWidestNode;
        this.oApi._fnGetMaxLenString = _fnGetMaxLenString;
        this.oApi._fnStringToCss = _fnStringToCss;
        this.oApi._fnArrayCmp = _fnArrayCmp;
        this.oApi._fnDetectType = _fnDetectType;
        this.oApi._fnSettingsFromNode = _fnSettingsFromNode;
        this.oApi._fnGetDataMaster = _fnGetDataMaster;
        this.oApi._fnGetTrNodes = _fnGetTrNodes;
        this.oApi._fnGetTdNodes = _fnGetTdNodes;
        this.oApi._fnEscapeRegex = _fnEscapeRegex;
        this.oApi._fnDeleteIndex = _fnDeleteIndex;
        this.oApi._fnReOrderIndex = _fnReOrderIndex;
        this.oApi._fnColumnOrdering = _fnColumnOrdering;
        this.oApi._fnLog = _fnLog;
        this.oApi._fnClearTable = _fnClearTable;
        this.oApi._fnSaveState = _fnSaveState;
        this.oApi._fnLoadState = _fnLoadState;
        this.oApi._fnCreateCookie = _fnCreateCookie;
        this.oApi._fnReadCookie = _fnReadCookie;
        this.oApi._fnDetectHeader = _fnDetectHeader;
        this.oApi._fnGetUniqueThs = _fnGetUniqueThs;
        this.oApi._fnScrollBarWidth = _fnScrollBarWidth;
        this.oApi._fnApplyToChildren = _fnApplyToChildren;
        this.oApi._fnMap = _fnMap;
        this.oApi._fnGetRowData = _fnGetRowData;
        this.oApi._fnGetCellData = _fnGetCellData;
        this.oApi._fnSetCellData = _fnSetCellData;
        this.oApi._fnGetObjectDataFn = _fnGetObjectDataFn;
        this.oApi._fnSetObjectDataFn = _fnSetObjectDataFn;
        var _that = this;
        return this.each(function() {
            var i = 0,
                iLen, j, jLen, k, kLen;
            for (i = 0, iLen = _aoSettings.length; i < iLen; i++) {
                if (_aoSettings[i].nTable == this) {
                    if (typeof oInit == "undefined" || (typeof oInit.bRetrieve != "undefined" && oInit.bRetrieve === true)) {
                        return _aoSettings[i].oInstance
                    } else {
                        if (typeof oInit.bDestroy != "undefined" && oInit.bDestroy === true) {
                            _aoSettings[i].oInstance.fnDestroy();
                            break
                        } else {
                            _fnLog(_aoSettings[i], 0, "Cannot reinitialise DataTable.\n\nTo retrieve the DataTables object for this table, please pass either no arguments to the dataTable() function, or set bRetrieve to true. Alternatively, to destory the old table and create a new one, set bDestroy to true (note that a lot of changes to the configuration can be made through the API which is usually much faster).");
                            return
                        }
                    }
                }
                if (_aoSettings[i].sTableId !== "" && _aoSettings[i].sTableId == this.getAttribute("id")) {
                    _aoSettings.splice(i, 1);
                    break
                }
            }
            var oSettings = new classSettings();
            _aoSettings.push(oSettings);
            var bInitHandedOff = false;
            var bUsePassedData = false;
            var sId = this.getAttribute("id");
            if (sId !== null) {
                oSettings.sTableId = sId;
                oSettings.sInstance = sId
            } else {
                oSettings.sInstance = _oExt._oExternConfig.iNextUnique++
            }
            if (this.nodeName.toLowerCase() != "table") {
                _fnLog(oSettings, 0, "Attempted to initialise DataTables on a node which is not a table: " + this.nodeName);
                return
            }
            oSettings.nTable = this;
            oSettings.oInstance = _that.length == 1 ? _that : $(this).dataTable();
            oSettings.oApi = _that.oApi;
            oSettings.sDestroyWidth = $(this).width();
            if (typeof oInit != "undefined" && oInit !== null) {
                oSettings.oInit = oInit;
                _fnMap(oSettings.oFeatures, oInit, "bPaginate");
                _fnMap(oSettings.oFeatures, oInit, "bLengthChange");
                _fnMap(oSettings.oFeatures, oInit, "bFilter");
                _fnMap(oSettings.oFeatures, oInit, "bSort");
                _fnMap(oSettings.oFeatures, oInit, "bInfo");
                _fnMap(oSettings.oFeatures, oInit, "bProcessing");
                _fnMap(oSettings.oFeatures, oInit, "bAutoWidth");
                _fnMap(oSettings.oFeatures, oInit, "bSortClasses");
                _fnMap(oSettings.oFeatures, oInit, "bServerSide");
                _fnMap(oSettings.oFeatures, oInit, "bDeferRender");
                _fnMap(oSettings.oScroll, oInit, "sScrollX", "sX");
                _fnMap(oSettings.oScroll, oInit, "sScrollXInner", "sXInner");
                _fnMap(oSettings.oScroll, oInit, "sScrollY", "sY");
                _fnMap(oSettings.oScroll, oInit, "bScrollCollapse", "bCollapse");
                _fnMap(oSettings.oScroll, oInit, "bScrollInfinite", "bInfinite");
                _fnMap(oSettings.oScroll, oInit, "iScrollLoadGap", "iLoadGap");
                _fnMap(oSettings.oScroll, oInit, "bScrollAutoCss", "bAutoCss");
                _fnMap(oSettings, oInit, "asStripClasses");
                _fnMap(oSettings, oInit, "fnPreDrawCallback");
                _fnMap(oSettings, oInit, "fnRowCallback");
                _fnMap(oSettings, oInit, "fnHeaderCallback");
                _fnMap(oSettings, oInit, "fnFooterCallback");
                _fnMap(oSettings, oInit, "fnCookieCallback");
                _fnMap(oSettings, oInit, "fnInitComplete");
                _fnMap(oSettings, oInit, "fnServerData");
                _fnMap(oSettings, oInit, "fnFormatNumber");
                _fnMap(oSettings, oInit, "aaSorting");
                _fnMap(oSettings, oInit, "aaSortingFixed");
                _fnMap(oSettings, oInit, "aLengthMenu");
                _fnMap(oSettings, oInit, "sPaginationType");
                _fnMap(oSettings, oInit, "sAjaxSource");
                _fnMap(oSettings, oInit, "sAjaxDataProp");
                _fnMap(oSettings, oInit, "iCookieDuration");
                _fnMap(oSettings, oInit, "sCookiePrefix");
                _fnMap(oSettings, oInit, "sDom");
                _fnMap(oSettings, oInit, "bSortCellsTop");
                _fnMap(oSettings, oInit, "oSearch", "oPreviousSearch");
                _fnMap(oSettings, oInit, "aoSearchCols", "aoPreSearchCols");
                _fnMap(oSettings, oInit, "iDisplayLength", "_iDisplayLength");
                _fnMap(oSettings, oInit, "bJQueryUI", "bJUI");
                _fnMap(oSettings.oLanguage, oInit, "fnInfoCallback");
                if (typeof oInit.fnDrawCallback == "function") {
                    oSettings.aoDrawCallback.push({
                        fn: oInit.fnDrawCallback,
                        sName: "user"
                    })
                }
                if (typeof oInit.fnStateSaveCallback == "function") {
                    oSettings.aoStateSave.push({
                        fn: oInit.fnStateSaveCallback,
                        sName: "user"
                    })
                }
                if (typeof oInit.fnStateLoadCallback == "function") {
                    oSettings.aoStateLoad.push({
                        fn: oInit.fnStateLoadCallback,
                        sName: "user"
                    })
                }
                if (oSettings.oFeatures.bServerSide && oSettings.oFeatures.bSort && oSettings.oFeatures.bSortClasses) {
                    oSettings.aoDrawCallback.push({
                        fn: _fnSortingClasses,
                        sName: "server_side_sort_classes"
                    })
                } else {
                    if (oSettings.oFeatures.bDeferRender) {
                        oSettings.aoDrawCallback.push({
                            fn: _fnSortingClasses,
                            sName: "defer_sort_classes"
                        })
                    }
                }
                if (typeof oInit.bJQueryUI != "undefined" && oInit.bJQueryUI) {
                    oSettings.oClasses = _oExt.oJUIClasses;
                    if (typeof oInit.sDom == "undefined") {
                        oSettings.sDom = '<"H"lfr>t<"F"ip>'
                    }
                }
                if (oSettings.oScroll.sX !== "" || oSettings.oScroll.sY !== "") {
                    oSettings.oScroll.iBarWidth = _fnScrollBarWidth()
                }
                if (typeof oInit.iDisplayStart != "undefined" && typeof oSettings.iInitDisplayStart == "undefined") {
                    oSettings.iInitDisplayStart = oInit.iDisplayStart;
                    oSettings._iDisplayStart = oInit.iDisplayStart
                }
                if (typeof oInit.bStateSave != "undefined") {
                    oSettings.oFeatures.bStateSave = oInit.bStateSave;
                    _fnLoadState(oSettings, oInit);
                    oSettings.aoDrawCallback.push({
                        fn: _fnSaveState,
                        sName: "state_save"
                    })
                }
                if (typeof oInit.iDeferLoading != "undefined") {
                    oSettings.bDeferLoading = true;
                    oSettings._iRecordsTotal = oInit.iDeferLoading;
                    oSettings._iRecordsDisplay = oInit.iDeferLoading
                }
                if (typeof oInit.aaData != "undefined") {
                    bUsePassedData = true
                }
                if (typeof oInit != "undefined" && typeof oInit.aoData != "undefined") {
                    oInit.aoColumns = oInit.aoData
                }
                if (typeof oInit.oLanguage != "undefined") {
                    if (typeof oInit.oLanguage.sUrl != "undefined" && oInit.oLanguage.sUrl !== "") {
                        oSettings.oLanguage.sUrl = oInit.oLanguage.sUrl;
                        $.getJSON(oSettings.oLanguage.sUrl, null, function(json) {
                            _fnLanguageProcess(oSettings, json, true)
                        });
                        bInitHandedOff = true
                    } else {
                        _fnLanguageProcess(oSettings, oInit.oLanguage, false)
                    }
                }
            } else {
                oInit = {}
            }
            if (typeof oInit.asStripClasses == "undefined") {
                oSettings.asStripClasses.push(oSettings.oClasses.sStripOdd);
                oSettings.asStripClasses.push(oSettings.oClasses.sStripEven)
            }
            var bStripeRemove = false;
            var anRows = $(">tbody>tr", this);
            for (i = 0, iLen = oSettings.asStripClasses.length; i < iLen; i++) {
                if (anRows.filter(":lt(2)").hasClass(oSettings.asStripClasses[i])) {
                    bStripeRemove = true;
                    break
                }
            }
            if (bStripeRemove) {
                oSettings.asDestoryStrips = ["", ""];
                if ($(anRows[0]).hasClass(oSettings.oClasses.sStripOdd)) {
                    oSettings.asDestoryStrips[0] += oSettings.oClasses.sStripOdd + " "
                }
                if ($(anRows[0]).hasClass(oSettings.oClasses.sStripEven)) {
                    oSettings.asDestoryStrips[0] += oSettings.oClasses.sStripEven
                }
                if ($(anRows[1]).hasClass(oSettings.oClasses.sStripOdd)) {
                    oSettings.asDestoryStrips[1] += oSettings.oClasses.sStripOdd + " "
                }
                if ($(anRows[1]).hasClass(oSettings.oClasses.sStripEven)) {
                    oSettings.asDestoryStrips[1] += oSettings.oClasses.sStripEven
                }
                anRows.removeClass(oSettings.asStripClasses.join(" "))
            }
            var anThs = [];
            var aoColumnsInit;
            var nThead = this.getElementsByTagName("thead");
            if (nThead.length !== 0) {
                _fnDetectHeader(oSettings.aoHeader, nThead[0]);
                anThs = _fnGetUniqueThs(oSettings)
            }
            if (typeof oInit.aoColumns == "undefined") {
                aoColumnsInit = [];
                for (i = 0, iLen = anThs.length; i < iLen; i++) {
                    aoColumnsInit.push(null)
                }
            } else {
                aoColumnsInit = oInit.aoColumns
            }
            for (i = 0, iLen = aoColumnsInit.length; i < iLen; i++) {
                if (typeof oInit.saved_aoColumns != "undefined" && oInit.saved_aoColumns.length == iLen) {
                    if (aoColumnsInit[i] === null) {
                        aoColumnsInit[i] = {}
                    }
                    aoColumnsInit[i].bVisible = oInit.saved_aoColumns[i].bVisible
                }
                _fnAddColumn(oSettings, anThs ? anThs[i] : null)
            }
            if (typeof oInit.aoColumnDefs != "undefined") {
                for (i = oInit.aoColumnDefs.length - 1; i >= 0; i--) {
                    var aTargets = oInit.aoColumnDefs[i].aTargets;
                    if (!$.isArray(aTargets)) {
                        _fnLog(oSettings, 1, "aTargets must be an array of targets, not a " + (typeof aTargets))
                    }
                    for (j = 0, jLen = aTargets.length; j < jLen; j++) {
                        if (typeof aTargets[j] == "number" && aTargets[j] >= 0) {
                            while (oSettings.aoColumns.length <= aTargets[j]) {
                                _fnAddColumn(oSettings)
                            }
                            _fnColumnOptions(oSettings, aTargets[j], oInit.aoColumnDefs[i])
                        } else {
                            if (typeof aTargets[j] == "number" && aTargets[j] < 0) {
                                _fnColumnOptions(oSettings, oSettings.aoColumns.length + aTargets[j], oInit.aoColumnDefs[i])
                            } else {
                                if (typeof aTargets[j] == "string") {
                                    for (k = 0, kLen = oSettings.aoColumns.length; k < kLen; k++) {
                                        if (aTargets[j] == "_all" || $(oSettings.aoColumns[k].nTh).hasClass(aTargets[j])) {
                                            _fnColumnOptions(oSettings, k, oInit.aoColumnDefs[i])
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            if (typeof aoColumnsInit != "undefined") {
                for (i = 0, iLen = aoColumnsInit.length; i < iLen; i++) {
                    _fnColumnOptions(oSettings, i, aoColumnsInit[i])
                }
            }
            for (i = 0, iLen = oSettings.aaSorting.length; i < iLen; i++) {
                if (oSettings.aaSorting[i][0] >= oSettings.aoColumns.length) {
                    oSettings.aaSorting[i][0] = 0
                }
                var oColumn = oSettings.aoColumns[oSettings.aaSorting[i][0]];
                if (typeof oSettings.aaSorting[i][2] == "undefined") {
                    oSettings.aaSorting[i][2] = 0
                }
                if (typeof oInit.aaSorting == "undefined" && typeof oSettings.saved_aaSorting == "undefined") {
                    oSettings.aaSorting[i][1] = oColumn.asSorting[0]
                }
                for (j = 0, jLen = oColumn.asSorting.length; j < jLen; j++) {
                    if (oSettings.aaSorting[i][1] == oColumn.asSorting[j]) {
                        oSettings.aaSorting[i][2] = j;
                        break
                    }
                }
            }
            _fnSortingClasses(oSettings);
            var thead = $(">thead", this);
            if (thead.length === 0) {
                thead = [document.createElement("thead")];
                this.appendChild(thead[0])
            }
            oSettings.nTHead = thead[0];
            var tbody = $(">tbody", this);
            if (tbody.length === 0) {
                tbody = [document.createElement("tbody")];
                this.appendChild(tbody[0])
            }
            oSettings.nTBody = tbody[0];
            var tfoot = $(">tfoot", this);
            if (tfoot.length > 0) {
                oSettings.nTFoot = tfoot[0];
                _fnDetectHeader(oSettings.aoFooter, oSettings.nTFoot)
            }
            if (bUsePassedData) {
                for (i = 0; i < oInit.aaData.length; i++) {
                    _fnAddData(oSettings, oInit.aaData[i])
                }
            } else {
                _fnGatherData(oSettings)
            }
            oSettings.aiDisplay = oSettings.aiDisplayMaster.slice();
            oSettings.bInitialised = true;
            if (bInitHandedOff === false) {
                _fnInitalise(oSettings)
            }
        })
    }
})(jQuery, window, document);
/*
 * File:        jquery.dataTables.min.js
 * Version:     1.8.1
 * Author:      Allan Jardine (www.sprymedia.co.uk)
 * Info:        www.datatables.net
 * 
 * Copyright 2008-2011 Allan Jardine, all rights reserved.
 *
 * This source file is free software, under either the GPL v2 license or a
 * BSD style license, as supplied with this software.
 * 
 * This source file is distributed in the hope that it will be useful, but 
 * WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY 
 * or FITNESS FOR A PARTICULAR PURPOSE. See the license files for details.
 */
(function(i, wa, p) {
    i.fn.dataTableSettings = [];
    var D = i.fn.dataTableSettings;
    i.fn.dataTableExt = {};
    var o = i.fn.dataTableExt;
    o.sVersion = "1.8.1";
    o.sErrMode = "alert";
    o.iApiIndex = 0;
    o.oApi = {};
    o.afnFiltering = [];
    o.aoFeatures = [];
    o.ofnSearch = {};
    o.afnSortData = [];
    o.oStdClasses = {
        sPagePrevEnabled: "paginate_enabled_previous",
        sPagePrevDisabled: "paginate_disabled_previous",
        sPageNextEnabled: "paginate_enabled_next",
        sPageNextDisabled: "paginate_disabled_next",
        sPageJUINext: "",
        sPageJUIPrev: "",
        sPageButton: "paginate_button",
        sPageButtonActive: "paginate_active",
        sPageButtonStaticDisabled: "paginate_button paginate_button_disabled",
        sPageFirst: "first",
        sPagePrevious: "previous",
        sPageNext: "next",
        sPageLast: "last",
        sStripOdd: "odd",
        sStripEven: "even",
        sRowEmpty: "dataTables_empty",
        sWrapper: "dataTables_wrapper",
        sFilter: "dataTables_filter",
        sInfo: "dataTables_info",
        sPaging: "dataTables_paginate paging_",
        sLength: "dataTables_length",
        sProcessing: "dataTables_processing",
        sSortAsc: "sorting_asc",
        sSortDesc: "sorting_desc",
        sSortable: "sorting",
        sSortableAsc: "sorting_asc_disabled",
        sSortableDesc: "sorting_desc_disabled",
        sSortableNone: "sorting_disabled",
        sSortColumn: "sorting_",
        sSortJUIAsc: "",
        sSortJUIDesc: "",
        sSortJUI: "",
        sSortJUIAscAllowed: "",
        sSortJUIDescAllowed: "",
        sSortJUIWrapper: "",
        sSortIcon: "",
        sScrollWrapper: "dataTables_scroll",
        sScrollHead: "dataTables_scrollHead",
        sScrollHeadInner: "dataTables_scrollHeadInner",
        sScrollBody: "dataTables_scrollBody",
        sScrollFoot: "dataTables_scrollFoot",
        sScrollFootInner: "dataTables_scrollFootInner",
        sFooterTH: ""
    };
    o.oJUIClasses = {
        sPagePrevEnabled: "fg-button ui-button ui-state-default ui-corner-left",
        sPagePrevDisabled: "fg-button ui-button ui-state-default ui-corner-left ui-state-disabled",
        sPageNextEnabled: "fg-button ui-button ui-state-default ui-corner-right",
        sPageNextDisabled: "fg-button ui-button ui-state-default ui-corner-right ui-state-disabled",
        sPageJUINext: "ui-icon ui-icon-circle-arrow-e",
        sPageJUIPrev: "ui-icon ui-icon-circle-arrow-w",
        sPageButton: "fg-button ui-button ui-state-default",
        sPageButtonActive: "fg-button ui-button ui-state-default ui-state-disabled",
        sPageButtonStaticDisabled: "fg-button ui-button ui-state-default ui-state-disabled",
        sPageFirst: "first ui-corner-tl ui-corner-bl",
        sPagePrevious: "previous",
        sPageNext: "next",
        sPageLast: "last ui-corner-tr ui-corner-br",
        sStripOdd: "odd",
        sStripEven: "even",
        sRowEmpty: "dataTables_empty",
        sWrapper: "dataTables_wrapper",
        sFilter: "dataTables_filter",
        sInfo: "dataTables_info",
        sPaging: "dataTables_paginate fg-buttonset ui-buttonset fg-buttonset-multi ui-buttonset-multi paging_",
        sLength: "dataTables_length",
        sProcessing: "dataTables_processing",
        sSortAsc: "ui-state-default",
        sSortDesc: "ui-state-default",
        sSortable: "ui-state-default",
        sSortableAsc: "ui-state-default",
        sSortableDesc: "ui-state-default",
        sSortableNone: "ui-state-default",
        sSortColumn: "sorting_",
        sSortJUIAsc: "css_right ui-icon ui-icon-triangle-1-n",
        sSortJUIDesc: "css_right ui-icon ui-icon-triangle-1-s",
        sSortJUI: "css_right ui-icon ui-icon-carat-2-n-s",
        sSortJUIAscAllowed: "css_right ui-icon ui-icon-carat-1-n",
        sSortJUIDescAllowed: "css_right ui-icon ui-icon-carat-1-s",
        sSortJUIWrapper: "DataTables_sort_wrapper",
        sSortIcon: "DataTables_sort_icon",
        sScrollWrapper: "dataTables_scroll",
        sScrollHead: "dataTables_scrollHead ui-state-default",
        sScrollHeadInner: "dataTables_scrollHeadInner",
        sScrollBody: "dataTables_scrollBody",
        sScrollFoot: "dataTables_scrollFoot ui-state-default",
        sScrollFootInner: "dataTables_scrollFootInner",
        sFooterTH: "ui-state-default"
    };
    o.oPagination = {
        two_button: {
            fnInit: function(g, l, r) {
                var s, w, y;
                if (g.bJUI) {
                    s = p.createElement("a");
                    w = p.createElement("a");
                    y = p.createElement("span");
                    y.className = g.oClasses.sPageJUINext;
                    w.appendChild(y);
                    y = p.createElement("span");
                    y.className = g.oClasses.sPageJUIPrev;
                    s.appendChild(y)
                } else {
                    s = p.createElement("div");
                    w = p.createElement("div")
                }
                s.className = g.oClasses.sPagePrevDisabled;
                w.className = g.oClasses.sPageNextDisabled;
                s.title = g.oLanguage.oPaginate.sPrevious;
                w.title = g.oLanguage.oPaginate.sNext;
                l.appendChild(s);
                l.appendChild(w);
                i(s).bind("click.DT", function() {
                    g.oApi._fnPageChange(g, "previous") && r(g)
                });
                i(w).bind("click.DT", function() {
                    g.oApi._fnPageChange(g, "next") && r(g)
                });
                i(s).bind("selectstart.DT", function() {
                    return false
                });
                i(w).bind("selectstart.DT", function() {
                    return false
                });
                if (g.sTableId !== "" && typeof g.aanFeatures.p == "undefined") {
                    l.setAttribute("id", g.sTableId + "_paginate");
                    s.setAttribute("id", g.sTableId + "_previous");
                    w.setAttribute("id", g.sTableId + "_next")
                }
            },
            fnUpdate: function(g) {
                if (g.aanFeatures.p)
                    for (var l = g.aanFeatures.p, r = 0, s = l.length; r < s; r++)
                        if (l[r].childNodes.length !== 0) {
                            l[r].childNodes[0].className = g._iDisplayStart === 0 ? g.oClasses.sPagePrevDisabled : g.oClasses.sPagePrevEnabled;
                            l[r].childNodes[1].className = g.fnDisplayEnd() == g.fnRecordsDisplay() ? g.oClasses.sPageNextDisabled :
                                g.oClasses.sPageNextEnabled
                        }
            }
        },
        iFullNumbersShowPages: 5,
        full_numbers: {
            fnInit: function(g, l, r) {
                var s = p.createElement("span"),
                    w = p.createElement("span"),
                    y = p.createElement("span"),
                    G = p.createElement("span"),
                    x = p.createElement("span");
                s.innerHTML = g.oLanguage.oPaginate.sFirst;
                w.innerHTML = g.oLanguage.oPaginate.sPrevious;
                G.innerHTML = g.oLanguage.oPaginate.sNext;
                x.innerHTML = g.oLanguage.oPaginate.sLast;
                var v = g.oClasses;
                s.className = v.sPageButton + " " + v.sPageFirst;
                w.className = v.sPageButton + " " + v.sPagePrevious;
                G.className =
                    v.sPageButton + " " + v.sPageNext;
                x.className = v.sPageButton + " " + v.sPageLast;
                l.appendChild(s);
                l.appendChild(w);
                l.appendChild(y);
                l.appendChild(G);
                l.appendChild(x);
                i(s).bind("click.DT", function() {
                    g.oApi._fnPageChange(g, "first") && r(g)
                });
                i(w).bind("click.DT", function() {
                    g.oApi._fnPageChange(g, "previous") && r(g)
                });
                i(G).bind("click.DT", function() {
                    g.oApi._fnPageChange(g, "next") && r(g)
                });
                i(x).bind("click.DT", function() {
                    g.oApi._fnPageChange(g, "last") && r(g)
                });
                i("span", l).bind("mousedown.DT", function() {
                    return false
                }).bind("selectstart.DT",
                    function() {
                        return false
                    });
                if (g.sTableId !== "" && typeof g.aanFeatures.p == "undefined") {
                    l.setAttribute("id", g.sTableId + "_paginate");
                    s.setAttribute("id", g.sTableId + "_first");
                    w.setAttribute("id", g.sTableId + "_previous");
                    G.setAttribute("id", g.sTableId + "_next");
                    x.setAttribute("id", g.sTableId + "_last")
                }
            },
            fnUpdate: function(g, l) {
                if (g.aanFeatures.p) {
                    var r = o.oPagination.iFullNumbersShowPages,
                        s = Math.floor(r / 2),
                        w = Math.ceil(g.fnRecordsDisplay() / g._iDisplayLength),
                        y = Math.ceil(g._iDisplayStart / g._iDisplayLength) + 1,
                        G =
                        "",
                        x, v = g.oClasses;
                    if (w < r) {
                        s = 1;
                        x = w
                    } else if (y <= s) {
                        s = 1;
                        x = r
                    } else if (y >= w - s) {
                        s = w - r + 1;
                        x = w
                    } else {
                        s = y - Math.ceil(r / 2) + 1;
                        x = s + r - 1
                    }
                    for (r = s; r <= x; r++) G += y != r ? '<span class="' + v.sPageButton + '">' + r + "</span>" : '<span class="' + v.sPageButtonActive + '">' + r + "</span>";
                    x = g.aanFeatures.p;
                    var z, Y = function(L) {
                            g._iDisplayStart = (this.innerHTML * 1 - 1) * g._iDisplayLength;
                            l(g);
                            L.preventDefault()
                        },
                        V = function() {
                            return false
                        };
                    r = 0;
                    for (s = x.length; r < s; r++)
                        if (x[r].childNodes.length !== 0) {
                            z = i("span:eq(2)", x[r]);
                            z.html(G);
                            i("span", z).bind("click.DT",
                                Y).bind("mousedown.DT", V).bind("selectstart.DT", V);
                            z = x[r].getElementsByTagName("span");
                            z = [z[0], z[1], z[z.length - 2], z[z.length - 1]];
                            i(z).removeClass(v.sPageButton + " " + v.sPageButtonActive + " " + v.sPageButtonStaticDisabled);
                            if (y == 1) {
                                z[0].className += " " + v.sPageButtonStaticDisabled;
                                z[1].className += " " + v.sPageButtonStaticDisabled
                            } else {
                                z[0].className += " " + v.sPageButton;
                                z[1].className += " " + v.sPageButton
                            }
                            if (w === 0 || y == w || g._iDisplayLength == -1) {
                                z[2].className += " " + v.sPageButtonStaticDisabled;
                                z[3].className += " " +
                                    v.sPageButtonStaticDisabled
                            } else {
                                z[2].className += " " + v.sPageButton;
                                z[3].className += " " + v.sPageButton
                            }
                        }
                }
            }
        }
    };
    o.oSort = {
        "string-asc": function(g, l) {
            if (typeof g != "string") g = "";
            if (typeof l != "string") l = "";
            g = g.toLowerCase();
            l = l.toLowerCase();
            return g < l ? -1 : g > l ? 1 : 0
        },
        "string-desc": function(g, l) {
            if (typeof g != "string") g = "";
            if (typeof l != "string") l = "";
            g = g.toLowerCase();
            l = l.toLowerCase();
            return g < l ? 1 : g > l ? -1 : 0
        },
        "html-asc": function(g, l) {
            g = g.replace(/<.*?>/g, "").toLowerCase();
            l = l.replace(/<.*?>/g, "").toLowerCase();
            return g <
                l ? -1 : g > l ? 1 : 0
        },
        "html-desc": function(g, l) {
            g = g.replace(/<.*?>/g, "").toLowerCase();
            l = l.replace(/<.*?>/g, "").toLowerCase();
            return g < l ? 1 : g > l ? -1 : 0
        },
        "date-asc": function(g, l) {
            g = Date.parse(g);
            l = Date.parse(l);
            if (isNaN(g) || g === "") g = Date.parse("01/01/1970 00:00:00");
            if (isNaN(l) || l === "") l = Date.parse("01/01/1970 00:00:00");
            return g - l
        },
        "date-desc": function(g, l) {
            g = Date.parse(g);
            l = Date.parse(l);
            if (isNaN(g) || g === "") g = Date.parse("01/01/1970 00:00:00");
            if (isNaN(l) || l === "") l = Date.parse("01/01/1970 00:00:00");
            return l -
                g
        },
        "numeric-asc": function(g, l) {
            return (g == "-" || g === "" ? 0 : g * 1) - (l == "-" || l === "" ? 0 : l * 1)
        },
        "numeric-desc": function(g, l) {
            return (l == "-" || l === "" ? 0 : l * 1) - (g == "-" || g === "" ? 0 : g * 1)
        }
    };
    o.aTypes = [function(g) {
        if (typeof g == "number") return "numeric";
        else if (typeof g != "string") return null;
        var l, r = false;
        l = g.charAt(0);
        if ("0123456789-".indexOf(l) == -1) return null;
        for (var s = 1; s < g.length; s++) {
            l = g.charAt(s);
            if ("0123456789.".indexOf(l) == -1) return null;
            if (l == ".") {
                if (r) return null;
                r = true
            }
        }
        return "numeric"
    }, function(g) {
        var l = Date.parse(g);
        if (l !== null && !isNaN(l) || typeof g == "string" && g.length === 0) return "date";
        return null
    }, function(g) {
        if (typeof g == "string" && g.indexOf("<") != -1 && g.indexOf(">") != -1) return "html";
        return null
    }];
    o.fnVersionCheck = function(g) {
        var l = function(x, v) {
                for (; x.length < v;) x += "0";
                return x
            },
            r = o.sVersion.split(".");
        g = g.split(".");
        for (var s = "", w = "", y = 0, G = g.length; y < G; y++) {
            s += l(r[y], 3);
            w += l(g[y], 3)
        }
        return parseInt(s, 10) >= parseInt(w, 10)
    };
    o._oExternConfig = {
        iNextUnique: 0
    };
    i.fn.dataTable = function(g) {
        function l() {
            this.fnRecordsTotal =
                function() {
                    return this.oFeatures.bServerSide ? parseInt(this._iRecordsTotal, 10) : this.aiDisplayMaster.length
                };
            this.fnRecordsDisplay = function() {
                return this.oFeatures.bServerSide ? parseInt(this._iRecordsDisplay, 10) : this.aiDisplay.length
            };
            this.fnDisplayEnd = function() {
                return this.oFeatures.bServerSide ? this.oFeatures.bPaginate === false || this._iDisplayLength == -1 ? this._iDisplayStart + this.aiDisplay.length : Math.min(this._iDisplayStart + this._iDisplayLength, this._iRecordsDisplay) : this._iDisplayEnd
            };
            this.sInstance =
                this.oInstance = null;
            this.oFeatures = {
                bPaginate: true,
                bLengthChange: true,
                bFilter: true,
                bSort: true,
                bInfo: true,
                bAutoWidth: true,
                bProcessing: false,
                bSortClasses: true,
                bStateSave: false,
                bServerSide: false,
                bDeferRender: false
            };
            this.oScroll = {
                sX: "",
                sXInner: "",
                sY: "",
                bCollapse: false,
                bInfinite: false,
                iLoadGap: 100,
                iBarWidth: 0,
                bAutoCss: true
            };
            this.aanFeatures = [];
            this.oLanguage = {
                sProcessing: "Processing...",
                sLengthMenu: "Show _MENU_ entries",
                sZeroRecords: "No matching records found",
                sEmptyTable: "No data available in table",
                sLoadingRecords: "Loading...",
                sInfo: "Showing _START_ to _END_ of _TOTAL_ entries",
                sInfoEmpty: "Showing 0 to 0 of 0 entries",
                sInfoFiltered: "(filtered from _MAX_ total entries)",
                sInfoPostFix: "",
                sSearch: "Search:",
                sUrl: "",
                oPaginate: {
                    sFirst: "First",
                    sPrevious: "Previous",
                    sNext: "Next",
                    sLast: "Last"
                },
                fnInfoCallback: null
            };
            this.aoData = [];
            this.aiDisplay = [];
            this.aiDisplayMaster = [];
            this.aoColumns = [];
            this.aoHeader = [];
            this.aoFooter = [];
            this.iNextId = 0;
            this.asDataSearch = [];
            this.oPreviousSearch = {
                sSearch: "",
                bRegex: false,
                bSmart: true
            };
            this.aoPreSearchCols = [];
            this.aaSorting = [
                [0, "asc", 0]
            ];
            this.aaSortingFixed = null;
            this.asStripClasses = [];
            this.asDestoryStrips = [];
            this.sDestroyWidth = 0;
            this.fnFooterCallback = this.fnHeaderCallback = this.fnRowCallback = null;
            this.aoDrawCallback = [];
            this.fnInitComplete = this.fnPreDrawCallback = null;
            this.sTableId = "";
            this.nTableWrapper = this.nTBody = this.nTFoot = this.nTHead = this.nTable = null;
            this.bInitialised = this.bDeferLoading = false;
            this.aoOpenRows = [];
            this.sDom = '<"top"lf<"clear">>rt<"block-actions"ip>';
            this.sPaginationType = "full_numbers";
            this.iCookieDuration = 7200;
            this.sCookiePrefix = "SpryMedia_DataTables_";
            this.fnCookieCallback = null;
            this.aoStateSave = [];
            this.aoStateLoad = [];
            this.sAjaxSource = this.oLoadedState = null;
            this.sAjaxDataProp = "aaData";
            this.bAjaxDataGet = true;
            this.jqXHR = null;
            this.fnServerData = function(a, b, c, d) {
                d.jqXHR = i.ajax({
                    url: a,
                    data: b,
                    success: c,
                    dataType: "json",
                    cache: false,
                    error: function(f, e) {
                        e == "parsererror" && alert("DataTables warning: JSON data from server could not be parsed. This is caused by a JSON formatting error.")
                    }
                })
            };
            this.fnFormatNumber = function(a) {
                if (a < 1E3) return a;
                else {
                    var b = a + "";
                    a = b.split("");
                    var c = "";
                    b = b.length;
                    for (var d = 0; d < b; d++) {
                        if (d % 3 === 0 && d !== 0) c = "," + c;
                        c = a[b - d - 1] + c
                    }
                }
                return c
            };
            this.aLengthMenu = [10, 25, 50, 100];
            this.bDrawing = this.iDraw = 0;
            this.iDrawError = -1;
            this._iDisplayLength = 10;
            this._iDisplayStart = 0;
            this._iDisplayEnd = 10;
            this._iRecordsDisplay = this._iRecordsTotal = 0;
            this.bJUI = false;
            this.oClasses = o.oStdClasses;
            this.bSortCellsTop = this.bSorted = this.bFiltered = false;
            this.oInit = null
        }

        function r(a) {
            return function() {
                var b = [A(this[o.iApiIndex])].concat(Array.prototype.slice.call(arguments));
                return o.oApi[a].apply(this, b)
            }
        }

        function s(a) {
            var b, c, d = a.iInitDisplayStart;
            if (a.bInitialised === false) setTimeout(function() {
                s(a)
            }, 200);
            else {
                xa(a);
                V(a);
                L(a, a.aoHeader);
                a.nTFoot && L(a, a.aoFooter);
                K(a, true);
                a.oFeatures.bAutoWidth && ea(a);
                b = 0;
                for (c = a.aoColumns.length; b < c; b++)
                    if (a.aoColumns[b].sWidth !== null) a.aoColumns[b].nTh.style.width = u(a.aoColumns[b].sWidth);
                if (a.oFeatures.bSort) R(a);
                else if (a.oFeatures.bFilter) M(a, a.oPreviousSearch);
                else {
                    a.aiDisplay = a.aiDisplayMaster.slice();
                    E(a);
                    C(a)
                }
                if (a.sAjaxSource !== null && !a.oFeatures.bServerSide) a.fnServerData.call(a.oInstance, a.sAjaxSource, [], function(f) {
                    var e = f;
                    if (a.sAjaxDataProp !== "") e = Z(a.sAjaxDataProp)(f);
                    for (b = 0; b < e.length; b++) v(a, e[b]);
                    a.iInitDisplayStart = d;
                    if (a.oFeatures.bSort) R(a);
                    else {
                        a.aiDisplay = a.aiDisplayMaster.slice();
                        E(a);
                        C(a)
                    }
                    K(a, false);
                    w(a, f)
                }, a);
                else if (!a.oFeatures.bServerSide) {
                    K(a, false);
                    w(a)
                }
            }
        }

        function w(a, b) {
            a._bInitComplete = true;
            if (typeof a.fnInitComplete == "function") typeof b !=
                "undefined" ? a.fnInitComplete.call(a.oInstance, a, b) : a.fnInitComplete.call(a.oInstance, a)
        }

        function y(a, b, c) {
            n(a.oLanguage, b, "sProcessing");
            n(a.oLanguage, b, "sLengthMenu");
            n(a.oLanguage, b, "sEmptyTable");
            n(a.oLanguage, b, "sLoadingRecords");
            n(a.oLanguage, b, "sZeroRecords");
            n(a.oLanguage, b, "sInfo");
            n(a.oLanguage, b, "sInfoEmpty");
            n(a.oLanguage, b, "sInfoFiltered");
            n(a.oLanguage, b, "sInfoPostFix");
            n(a.oLanguage, b, "sSearch");
            if (typeof b.oPaginate != "undefined") {
                n(a.oLanguage.oPaginate, b.oPaginate, "sFirst");
                n(a.oLanguage.oPaginate,
                    b.oPaginate, "sPrevious");
                n(a.oLanguage.oPaginate, b.oPaginate, "sNext");
                n(a.oLanguage.oPaginate, b.oPaginate, "sLast")
            }
            typeof b.sEmptyTable == "undefined" && typeof b.sZeroRecords != "undefined" && n(a.oLanguage, b, "sZeroRecords", "sEmptyTable");
            typeof b.sLoadingRecords == "undefined" && typeof b.sZeroRecords != "undefined" && n(a.oLanguage, b, "sZeroRecords", "sLoadingRecords");
            c && s(a)
        }

        function G(a, b) {
            var c = a.aoColumns.length;
            b = {
                sType: null,
                _bAutoType: true,
                bVisible: true,
                bSearchable: true,
                bSortable: true,
                asSorting: ["asc", "desc"],
                sSortingClass: a.oClasses.sSortable,
                sSortingClassJUI: a.oClasses.sSortJUI,
                sTitle: b ? b.innerHTML : "",
                sName: "",
                sWidth: null,
                sWidthOrig: null,
                sClass: null,
                fnRender: null,
                bUseRendered: true,
                iDataSort: c,
                mDataProp: c,
                fnGetData: null,
                fnSetData: null,
                sSortDataType: "std",
                sDefaultContent: null,
                sContentPadding: "",
                nTh: b ? b : p.createElement("th"),
                nTf: null
            };
            a.aoColumns.push(b);
            if (typeof a.aoPreSearchCols[c] == "undefined" || a.aoPreSearchCols[c] === null) a.aoPreSearchCols[c] = {
                sSearch: "",
                bRegex: false,
                bSmart: true
            };
            else {
                if (typeof a.aoPreSearchCols[c].bRegex ==
                    "undefined") a.aoPreSearchCols[c].bRegex = true;
                if (typeof a.aoPreSearchCols[c].bSmart == "undefined") a.aoPreSearchCols[c].bSmart = true
            }
            x(a, c, null)
        }

        function x(a, b, c) {
            b = a.aoColumns[b];
            if (typeof c != "undefined" && c !== null) {
                if (typeof c.sType != "undefined") {
                    b.sType = c.sType;
                    b._bAutoType = false
                }
                n(b, c, "bVisible");
                n(b, c, "bSearchable");
                n(b, c, "bSortable");
                n(b, c, "sTitle");
                n(b, c, "sName");
                n(b, c, "sWidth");
                n(b, c, "sWidth", "sWidthOrig");
                n(b, c, "sClass");
                n(b, c, "fnRender");
                n(b, c, "bUseRendered");
                n(b, c, "iDataSort");
                n(b, c, "mDataProp");
                n(b, c, "asSorting");
                n(b, c, "sSortDataType");
                n(b, c, "sDefaultContent");
                n(b, c, "sContentPadding")
            }
            b.fnGetData = Z(b.mDataProp);
            b.fnSetData = ya(b.mDataProp);
            if (!a.oFeatures.bSort) b.bSortable = false;
            if (!b.bSortable || i.inArray("asc", b.asSorting) == -1 && i.inArray("desc", b.asSorting) == -1) {
                b.sSortingClass = a.oClasses.sSortableNone;
                b.sSortingClassJUI = ""
            } else if (b.bSortable || i.inArray("asc", b.asSorting) == -1 && i.inArray("desc", b.asSorting) == -1) {
                b.sSortingClass = a.oClasses.sSortable;
                b.sSortingClassJUI = a.oClasses.sSortJUI
            } else if (i.inArray("asc",
                    b.asSorting) != -1 && i.inArray("desc", b.asSorting) == -1) {
                b.sSortingClass = a.oClasses.sSortableAsc;
                b.sSortingClassJUI = a.oClasses.sSortJUIAscAllowed
            } else if (i.inArray("asc", b.asSorting) == -1 && i.inArray("desc", b.asSorting) != -1) {
                b.sSortingClass = a.oClasses.sSortableDesc;
                b.sSortingClassJUI = a.oClasses.sSortJUIDescAllowed
            }
        }

        function v(a, b) {
            var c;
            c = typeof b.length == "number" ? b.slice() : i.extend(true, {}, b);
            b = a.aoData.length;
            var d = {
                nTr: null,
                _iId: a.iNextId++,
                _aData: c,
                _anHidden: [],
                _sRowStripe: ""
            };
            a.aoData.push(d);
            for (var f,
                    e = 0, h = a.aoColumns.length; e < h; e++) {
                c = a.aoColumns[e];
                typeof c.fnRender == "function" && c.bUseRendered && c.mDataProp !== null && N(a, b, e, c.fnRender({
                    iDataRow: b,
                    iDataColumn: e,
                    aData: d._aData,
                    oSettings: a
                }));
                if (c._bAutoType && c.sType != "string") {
                    f = H(a, b, e, "type");
                    if (f !== null && f !== "") {
                        f = fa(f);
                        if (c.sType === null) c.sType = f;
                        else if (c.sType != f) c.sType = "string"
                    }
                }
            }
            a.aiDisplayMaster.push(b);
            a.oFeatures.bDeferRender || z(a, b);
            return b
        }

        function z(a, b) {
            var c = a.aoData[b],
                d;
            if (c.nTr === null) {
                c.nTr = p.createElement("tr");
                typeof c._aData.DT_RowId !=
                    "undefined" && c.nTr.setAttribute("id", c._aData.DT_RowId);
                typeof c._aData.DT_RowClass != "undefined" && i(c.nTr).addClass(c._aData.DT_RowClass);
                for (var f = 0, e = a.aoColumns.length; f < e; f++) {
                    var h = a.aoColumns[f];
                    d = p.createElement("td");
                    d.innerHTML = typeof h.fnRender == "function" && (!h.bUseRendered || h.mDataProp === null) ? h.fnRender({
                        iDataRow: b,
                        iDataColumn: f,
                        aData: c._aData,
                        oSettings: a
                    }) : H(a, b, f, "display");
                    if (h.sClass !== null) d.className = h.sClass;
                    if (h.bVisible) {
                        c.nTr.appendChild(d);
                        c._anHidden[f] = null
                    } else c._anHidden[f] =
                        d
                }
            }
        }

        function Y(a) {
            var b, c, d, f, e, h, j, k, m;
            if (a.bDeferLoading || a.sAjaxSource === null) {
                j = a.nTBody.childNodes;
                b = 0;
                for (c = j.length; b < c; b++)
                    if (j[b].nodeName.toUpperCase() == "TR") {
                        k = a.aoData.length;
                        a.aoData.push({
                            nTr: j[b],
                            _iId: a.iNextId++,
                            _aData: [],
                            _anHidden: [],
                            _sRowStripe: ""
                        });
                        a.aiDisplayMaster.push(k);
                        h = j[b].childNodes;
                        d = e = 0;
                        for (f = h.length; d < f; d++) {
                            m = h[d].nodeName.toUpperCase();
                            if (m == "TD" || m == "TH") {
                                N(a, k, e, i.trim(h[d].innerHTML));
                                e++
                            }
                        }
                    }
            }
            j = $(a);
            h = [];
            b = 0;
            for (c = j.length; b < c; b++) {
                d = 0;
                for (f = j[b].childNodes.length; d <
                    f; d++) {
                    e = j[b].childNodes[d];
                    m = e.nodeName.toUpperCase();
                    if (m == "TD" || m == "TH") h.push(e)
                }
            }
            h.length != j.length * a.aoColumns.length && J(a, 1, "Unexpected number of TD elements. Expected " + j.length * a.aoColumns.length + " and got " + h.length + ". DataTables does not support rowspan / colspan in the table body, and there must be one cell for each row/column combination.");
            d = 0;
            for (f = a.aoColumns.length; d < f; d++) {
                if (a.aoColumns[d].sTitle === null) a.aoColumns[d].sTitle = a.aoColumns[d].nTh.innerHTML;
                j = a.aoColumns[d]._bAutoType;
                m = typeof a.aoColumns[d].fnRender == "function";
                e = a.aoColumns[d].sClass !== null;
                k = a.aoColumns[d].bVisible;
                var t, q;
                if (j || m || e || !k) {
                    b = 0;
                    for (c = a.aoData.length; b < c; b++) {
                        t = h[b * f + d];
                        if (j && a.aoColumns[d].sType != "string") {
                            q = H(a, b, d, "type");
                            if (q !== "") {
                                q = fa(q);
                                if (a.aoColumns[d].sType === null) a.aoColumns[d].sType = q;
                                else if (a.aoColumns[d].sType != q) a.aoColumns[d].sType = "string"
                            }
                        }
                        if (m) {
                            q = a.aoColumns[d].fnRender({
                                iDataRow: b,
                                iDataColumn: d,
                                aData: a.aoData[b]._aData,
                                oSettings: a
                            });
                            t.innerHTML = q;
                            a.aoColumns[d].bUseRendered &&
                                N(a, b, d, q)
                        }
                        if (e) t.className += " " + a.aoColumns[d].sClass;
                        if (k) a.aoData[b]._anHidden[d] = null;
                        else {
                            a.aoData[b]._anHidden[d] = t;
                            t.parentNode.removeChild(t)
                        }
                    }
                }
            }
        }

        function V(a) {
            var b, c, d;
            a.nTHead.getElementsByTagName("tr");
            if (a.nTHead.getElementsByTagName("th").length !== 0) {
                b = 0;
                for (d = a.aoColumns.length; b < d; b++) {
                    c = a.aoColumns[b].nTh;
                    a.aoColumns[b].sClass !== null && i(c).addClass(a.aoColumns[b].sClass);
                    if (a.aoColumns[b].sTitle != c.innerHTML) c.innerHTML = a.aoColumns[b].sTitle
                }
            } else {
                var f = p.createElement("tr");
                b = 0;
                for (d = a.aoColumns.length; b < d; b++) {
                    c = a.aoColumns[b].nTh;
                    c.innerHTML = a.aoColumns[b].sTitle;
                    a.aoColumns[b].sClass !== null && i(c).addClass(a.aoColumns[b].sClass);
                    f.appendChild(c)
                }
                i(a.nTHead).html("")[0].appendChild(f);
                W(a.aoHeader, a.nTHead)
            }
            if (a.bJUI) {
                b = 0;
                for (d = a.aoColumns.length; b < d; b++) {
                    c = a.aoColumns[b].nTh;
                    f = p.createElement("div");
                    f.className = a.oClasses.sSortJUIWrapper;
                    i(c).contents().appendTo(f);
                    var e = p.createElement("span");
                    e.className = a.oClasses.sSortIcon;
                    f.appendChild(e);
                    c.appendChild(f)
                }
            }
            d = function() {
                this.onselectstart =
                    function() {
                        return false
                    };
                return false
            };
            if (a.oFeatures.bSort)
                for (b = 0; b < a.aoColumns.length; b++)
                    if (a.aoColumns[b].bSortable !== false) {
                        ga(a, a.aoColumns[b].nTh, b);
                        i(a.aoColumns[b].nTh).bind("mousedown.DT", d)
                    } else i(a.aoColumns[b].nTh).addClass(a.oClasses.sSortableNone);
            a.oClasses.sFooterTH !== "" && i(">tr>th", a.nTFoot).addClass(a.oClasses.sFooterTH);
            if (a.nTFoot !== null) {
                c = S(a, null, a.aoFooter);
                b = 0;
                for (d = a.aoColumns.length; b < d; b++)
                    if (typeof c[b] != "undefined") a.aoColumns[b].nTf = c[b]
            }
        }

        function L(a, b, c) {
            var d, f,
                e, h = [],
                j = [],
                k = a.aoColumns.length;
            if (typeof c == "undefined") c = false;
            d = 0;
            for (f = b.length; d < f; d++) {
                h[d] = b[d].slice();
                h[d].nTr = b[d].nTr;
                for (e = k - 1; e >= 0; e--) !a.aoColumns[e].bVisible && !c && h[d].splice(e, 1);
                j.push([])
            }
            d = 0;
            for (f = h.length; d < f; d++) {
                if (h[d].nTr) {
                    a = 0;
                    for (e = h[d].nTr.childNodes.length; a < e; a++) h[d].nTr.removeChild(h[d].nTr.childNodes[0])
                }
                e = 0;
                for (b = h[d].length; e < b; e++) {
                    k = c = 1;
                    if (typeof j[d][e] == "undefined") {
                        h[d].nTr.appendChild(h[d][e].cell);
                        for (j[d][e] = 1; typeof h[d + c] != "undefined" && h[d][e].cell == h[d +
                                c][e].cell;) {
                            j[d + c][e] = 1;
                            c++
                        }
                        for (; typeof h[d][e + k] != "undefined" && h[d][e].cell == h[d][e + k].cell;) {
                            for (a = 0; a < c; a++) j[d + a][e + k] = 1;
                            k++
                        }
                        h[d][e].cell.setAttribute("rowspan", c);
                        h[d][e].cell.setAttribute("colspan", k)
                    }
                }
            }
        }

        function C(a) {
            var b, c, d = [],
                f = 0,
                e = false;
            b = a.asStripClasses.length;
            c = a.aoOpenRows.length;
            if (!(a.fnPreDrawCallback !== null && a.fnPreDrawCallback.call(a.oInstance, a) === false)) {
                a.bDrawing = true;
                if (typeof a.iInitDisplayStart != "undefined" && a.iInitDisplayStart != -1) {
                    a._iDisplayStart = a.oFeatures.bServerSide ?
                        a.iInitDisplayStart : a.iInitDisplayStart >= a.fnRecordsDisplay() ? 0 : a.iInitDisplayStart;
                    a.iInitDisplayStart = -1;
                    E(a)
                }
                if (a.bDeferLoading) {
                    a.bDeferLoading = false;
                    a.iDraw++
                } else if (a.oFeatures.bServerSide) {
                    if (!a.bDestroying && !za(a)) return
                } else a.iDraw++;
                if (a.aiDisplay.length !== 0) {
                    var h = a._iDisplayStart,
                        j = a._iDisplayEnd;
                    if (a.oFeatures.bServerSide) {
                        h = 0;
                        j = a.aoData.length
                    }
                    for (h = h; h < j; h++) {
                        var k = a.aoData[a.aiDisplay[h]];
                        k.nTr === null && z(a, a.aiDisplay[h]);
                        var m = k.nTr;
                        if (b !== 0) {
                            var t = a.asStripClasses[f % b];
                            if (k._sRowStripe !=
                                t) {
                                i(m).removeClass(k._sRowStripe).addClass(t);
                                k._sRowStripe = t
                            }
                        }
                        if (typeof a.fnRowCallback == "function") {
                            m = a.fnRowCallback.call(a.oInstance, m, a.aoData[a.aiDisplay[h]]._aData, f, h);
                            if (!m && !e) {
                                J(a, 0, "A node was not returned by fnRowCallback");
                                e = true
                            }
                        }
                        d.push(m);
                        f++;
                        if (c !== 0)
                            for (k = 0; k < c; k++) m == a.aoOpenRows[k].nParent && d.push(a.aoOpenRows[k].nTr)
                    }
                } else {
                    d[0] = p.createElement("tr");
                    if (typeof a.asStripClasses[0] != "undefined") d[0].className = a.asStripClasses[0];
                    e = a.oLanguage.sZeroRecords.replace("_MAX_", a.fnFormatNumber(a.fnRecordsTotal()));
                    if (a.iDraw == 1 && a.sAjaxSource !== null && !a.oFeatures.bServerSide) e = a.oLanguage.sLoadingRecords;
                    else if (typeof a.oLanguage.sEmptyTable != "undefined" && a.fnRecordsTotal() === 0) e = a.oLanguage.sEmptyTable;
                    b = p.createElement("td");
                    b.setAttribute("valign", "top");
                    b.colSpan = X(a);
                    b.className = a.oClasses.sRowEmpty;
                    b.innerHTML = e;
                    d[f].appendChild(b)
                }
                typeof a.fnHeaderCallback == "function" && a.fnHeaderCallback.call(a.oInstance, i(">tr", a.nTHead)[0], aa(a), a._iDisplayStart, a.fnDisplayEnd(), a.aiDisplay);
                typeof a.fnFooterCallback ==
                    "function" && a.fnFooterCallback.call(a.oInstance, i(">tr", a.nTFoot)[0], aa(a), a._iDisplayStart, a.fnDisplayEnd(), a.aiDisplay);
                f = p.createDocumentFragment();
                b = p.createDocumentFragment();
                if (a.nTBody) {
                    e = a.nTBody.parentNode;
                    b.appendChild(a.nTBody);
                    if (!a.oScroll.bInfinite || !a._bInitComplete || a.bSorted || a.bFiltered) {
                        c = a.nTBody.childNodes;
                        for (b = c.length - 1; b >= 0; b--) c[b].parentNode.removeChild(c[b])
                    }
                    b = 0;
                    for (c = d.length; b < c; b++) f.appendChild(d[b]);
                    a.nTBody.appendChild(f);
                    e !== null && e.appendChild(a.nTBody)
                }
                for (b = a.aoDrawCallback.length -
                    1; b >= 0; b--) a.aoDrawCallback[b].fn.call(a.oInstance, a);
                a.bSorted = false;
                a.bFiltered = false;
                a.bDrawing = false;
                if (a.oFeatures.bServerSide) {
                    K(a, false);
                    typeof a._bInitComplete == "undefined" && w(a)
                }
            }
        }

        function ba(a) {
            if (a.oFeatures.bSort) R(a, a.oPreviousSearch);
            else if (a.oFeatures.bFilter) M(a, a.oPreviousSearch);
            else {
                E(a);
                C(a)
            }
        }

        function za(a) {
            if (a.bAjaxDataGet) {
                K(a, true);
                var b = a.aoColumns.length,
                    c = [],
                    d, f;
                a.iDraw++;
                c.push({
                    name: "sEcho",
                    value: a.iDraw
                });
                c.push({
                    name: "iColumns",
                    value: b
                });
                c.push({
                    name: "sColumns",
                    value: ha(a)
                });
                c.push({
                    name: "iDisplayStart",
                    value: a._iDisplayStart
                });
                c.push({
                    name: "iDisplayLength",
                    value: a.oFeatures.bPaginate !== false ? a._iDisplayLength : -1
                });
                for (f = 0; f < b; f++) {
                    d = a.aoColumns[f].mDataProp;
                    c.push({
                        name: "mDataProp_" + f,
                        value: typeof d == "function" ? "function" : d
                    })
                }
                if (a.oFeatures.bFilter !== false) {
                    c.push({
                        name: "sSearch",
                        value: a.oPreviousSearch.sSearch
                    });
                    c.push({
                        name: "bRegex",
                        value: a.oPreviousSearch.bRegex
                    });
                    for (f = 0; f < b; f++) {
                        c.push({
                            name: "sSearch_" + f,
                            value: a.aoPreSearchCols[f].sSearch
                        });
                        c.push({
                            name: "bRegex_" +
                                f,
                            value: a.aoPreSearchCols[f].bRegex
                        });
                        c.push({
                            name: "bSearchable_" + f,
                            value: a.aoColumns[f].bSearchable
                        })
                    }
                }
                if (a.oFeatures.bSort !== false) {
                    d = a.aaSortingFixed !== null ? a.aaSortingFixed.length : 0;
                    var e = a.aaSorting.length;
                    c.push({
                        name: "iSortingCols",
                        value: d + e
                    });
                    for (f = 0; f < d; f++) {
                        c.push({
                            name: "iSortCol_" + f,
                            value: a.aaSortingFixed[f][0]
                        });
                        c.push({
                            name: "sSortDir_" + f,
                            value: a.aaSortingFixed[f][1]
                        })
                    }
                    for (f = 0; f < e; f++) {
                        c.push({
                            name: "iSortCol_" + (f + d),
                            value: a.aaSorting[f][0]
                        });
                        c.push({
                            name: "sSortDir_" + (f + d),
                            value: a.aaSorting[f][1]
                        })
                    }
                    for (f =
                        0; f < b; f++) c.push({
                        name: "bSortable_" + f,
                        value: a.aoColumns[f].bSortable
                    })
                }
                a.fnServerData.call(a.oInstance, a.sAjaxSource, c, function(h) {
                    Aa(a, h)
                }, a);
                return false
            } else return true
        }

        function Aa(a, b) {
            if (typeof b.sEcho != "undefined")
                if (b.sEcho * 1 < a.iDraw) return;
                else a.iDraw = b.sEcho * 1;
            if (!a.oScroll.bInfinite || a.oScroll.bInfinite && (a.bSorted || a.bFiltered)) ia(a);
            a._iRecordsTotal = b.iTotalRecords;
            a._iRecordsDisplay = b.iTotalDisplayRecords;
            var c = ha(a);
            if (c = typeof b.sColumns != "undefined" && c !== "" && b.sColumns != c) var d =
                Ba(a, b.sColumns);
            b = Z(a.sAjaxDataProp)(b);
            for (var f = 0, e = b.length; f < e; f++)
                if (c) {
                    for (var h = [], j = 0, k = a.aoColumns.length; j < k; j++) h.push(b[f][d[j]]);
                    v(a, h)
                } else v(a, b[f]);
            a.aiDisplay = a.aiDisplayMaster.slice();
            a.bAjaxDataGet = false;
            C(a);
            a.bAjaxDataGet = true;
            K(a, false)
        }

        function xa(a) {
            var b = p.createElement("div");
            a.nTable.parentNode.insertBefore(b, a.nTable);
            a.nTableWrapper = p.createElement("div");
            a.nTableWrapper.className = a.oClasses.sWrapper;
            a.sTableId !== "" && a.nTableWrapper.setAttribute("id", a.sTableId + "_wrapper");
            a.nTableReinsertBefore = a.nTable.nextSibling;
            for (var c = a.nTableWrapper, d = a.sDom.split(""), f, e, h, j, k, m, t, q = 0; q < d.length; q++) {
                e = 0;
                h = d[q];
                if (h == "<") {
                    j = p.createElement("div");
                    k = d[q + 1];
                    if (k == "'" || k == '"') {
                        m = "";
                        for (t = 2; d[q + t] != k;) {
                            m += d[q + t];
                            t++
                        }
                        if (m == "H") m = "fg-toolbar ui-toolbar ui-widget-header ui-corner-tl ui-corner-tr ui-helper-clearfix";
                        else if (m == "F") m = "fg-toolbar ui-toolbar ui-widget-header ui-corner-bl ui-corner-br ui-helper-clearfix";
                        if (m.indexOf(".") != -1) {
                            k = m.split(".");
                            j.setAttribute("id", k[0].substr(1,
                                k[0].length - 1));
                            j.className = k[1]
                        } else if (m.charAt(0) == "#") j.setAttribute("id", m.substr(1, m.length - 1));
                        else j.className = m;
                        q += t
                    }
                    c.appendChild(j);
                    c = j
                } else if (h == ">") c = c.parentNode;
                else if (h == "l" && a.oFeatures.bPaginate && a.oFeatures.bLengthChange) {
                    f = Ca(a);
                    e = 1
                } else if (h == "f" && a.oFeatures.bFilter) {
                    f = Da(a);
                    e = 1
                } else if (h == "r" && a.oFeatures.bProcessing) {
                    f = Ea(a);
                    e = 1
                } else if (h == "t") {
                    f = Fa(a);
                    e = 1
                } else if (h == "i" && a.oFeatures.bInfo) {
                    f = Ga(a);
                    e = 1
                } else if (h == "p" && a.oFeatures.bPaginate) {
                    f = Ha(a);
                    e = 1
                } else if (o.aoFeatures.length !==
                    0) {
                    j = o.aoFeatures;
                    t = 0;
                    for (k = j.length; t < k; t++)
                        if (h == j[t].cFeature) {
                            if (f = j[t].fnInit(a)) e = 1;
                            break
                        }
                }
                if (e == 1 && f !== null) {
                    if (typeof a.aanFeatures[h] != "object") a.aanFeatures[h] = [];
                    a.aanFeatures[h].push(f);
                    c.appendChild(f)
                }
            }
            b.parentNode.replaceChild(a.nTableWrapper, b)
        }

        function Fa(a) {
            if (a.oScroll.sX === "" && a.oScroll.sY === "") return a.nTable;
            var b = p.createElement("div"),
                c = p.createElement("div"),
                d = p.createElement("div"),
                f = p.createElement("div"),
                e = p.createElement("div"),
                h = p.createElement("div"),
                j = a.nTable.cloneNode(false),
                k = a.nTable.cloneNode(false),
                m = a.nTable.getElementsByTagName("thead")[0],
                t = a.nTable.getElementsByTagName("tfoot").length === 0 ? null : a.nTable.getElementsByTagName("tfoot")[0],
                q = typeof g.bJQueryUI != "undefined" && g.bJQueryUI ? o.oJUIClasses : o.oStdClasses;
            c.appendChild(d);
            e.appendChild(h);
            f.appendChild(a.nTable);
            b.appendChild(c);
            b.appendChild(f);
            d.appendChild(j);
            j.appendChild(m);
            if (t !== null) {
                b.appendChild(e);
                h.appendChild(k);
                k.appendChild(t)
            }
            b.className = q.sScrollWrapper;
            c.className = q.sScrollHead;
            d.className =
                q.sScrollHeadInner;
            f.className = q.sScrollBody;
            e.className = q.sScrollFoot;
            h.className = q.sScrollFootInner;
            if (a.oScroll.bAutoCss) {
                c.style.overflow = "hidden";
                c.style.position = "relative";
                e.style.overflow = "hidden";
                f.style.overflow = "auto"
            }
            c.style.border = "0";
            c.style.width = "100%";
            e.style.border = "0";
            d.style.width = "150%";
            j.removeAttribute("id");
            j.style.marginLeft = "0";
            a.nTable.style.marginLeft = "0";
            if (t !== null) {
                k.removeAttribute("id");
                k.style.marginLeft = "0"
            }
            d = i(">caption", a.nTable);
            h = 0;
            for (k = d.length; h < k; h++) j.appendChild(d[h]);
            if (a.oScroll.sX !== "") {
                c.style.width = u(a.oScroll.sX);
                f.style.width = u(a.oScroll.sX);
                if (t !== null) e.style.width = u(a.oScroll.sX);
                i(f).scroll(function() {
                    c.scrollLeft = this.scrollLeft;
                    if (t !== null) e.scrollLeft = this.scrollLeft
                })
            }
            if (a.oScroll.sY !== "") f.style.height = u(a.oScroll.sY);
            a.aoDrawCallback.push({
                fn: Ia,
                sName: "scrolling"
            });
            a.oScroll.bInfinite && i(f).scroll(function() {
                if (!a.bDrawing)
                    if (i(this).scrollTop() + i(this).height() > i(a.nTable).height() - a.oScroll.iLoadGap)
                        if (a.fnDisplayEnd() < a.fnRecordsDisplay()) {
                            ja(a,
                                "next");
                            E(a);
                            C(a)
                        }
            });
            a.nScrollHead = c;
            a.nScrollFoot = e;
            return b
        }

        function Ia(a) {
            var b = a.nScrollHead.getElementsByTagName("div")[0],
                c = b.getElementsByTagName("table")[0],
                d = a.nTable.parentNode,
                f, e, h, j, k, m, t, q, I = [];
            h = a.nTable.getElementsByTagName("thead");
            h.length > 0 && a.nTable.removeChild(h[0]);
            if (a.nTFoot !== null) {
                k = a.nTable.getElementsByTagName("tfoot");
                k.length > 0 && a.nTable.removeChild(k[0])
            }
            h = a.nTHead.cloneNode(true);
            a.nTable.insertBefore(h, a.nTable.childNodes[0]);
            if (a.nTFoot !== null) {
                k = a.nTFoot.cloneNode(true);
                a.nTable.insertBefore(k, a.nTable.childNodes[1])
            }
            if (a.oScroll.sX === "") {
                d.style.width = "100%";
                b.parentNode.style.width = "100%"
            }
            var O = S(a, h);
            f = 0;
            for (e = O.length; f < e; f++) {
                t = Ja(a, f);
                O[f].style.width = a.aoColumns[t].sWidth
            }
            a.nTFoot !== null && P(function(B) {
                B.style.width = ""
            }, k.getElementsByTagName("tr"));
            f = i(a.nTable).outerWidth();
            if (a.oScroll.sX === "") {
                a.nTable.style.width = "100%";
                if (i.browser.msie && i.browser.version <= 7) a.nTable.style.width = u(i(a.nTable).outerWidth() - a.oScroll.iBarWidth)
            } else if (a.oScroll.sXInner !==
                "") a.nTable.style.width = u(a.oScroll.sXInner);
            else if (f == i(d).width() && i(d).height() < i(a.nTable).height()) {
                a.nTable.style.width = u(f - a.oScroll.iBarWidth);
                if (i(a.nTable).outerWidth() > f - a.oScroll.iBarWidth) a.nTable.style.width = u(f)
            } else a.nTable.style.width = u(f);
            f = i(a.nTable).outerWidth();
            if (a.oScroll.sX === "") {
                d.style.width = u(f + a.oScroll.iBarWidth);
                b.parentNode.style.width = u(f + a.oScroll.iBarWidth)
            }
            e = a.nTHead.getElementsByTagName("tr");
            h = h.getElementsByTagName("tr");
            P(function(B, F) {
                m = B.style;
                m.paddingTop =
                    "0";
                m.paddingBottom = "0";
                m.borderTopWidth = "0";
                m.borderBottomWidth = "0";
                m.height = 0;
                q = i(B).width();
                F.style.width = u(q);
                I.push(q)
            }, h, e);
            i(h).height(0);
            if (a.nTFoot !== null) {
                j = k.getElementsByTagName("tr");
                k = a.nTFoot.getElementsByTagName("tr");
                P(function(B, F) {
                    m = B.style;
                    m.paddingTop = "0";
                    m.paddingBottom = "0";
                    m.borderTopWidth = "0";
                    m.borderBottomWidth = "0";
                    m.height = 0;
                    q = i(B).width();
                    F.style.width = u(q);
                    I.push(q)
                }, j, k);
                i(j).height(0)
            }
            P(function(B) {
                B.innerHTML = "";
                B.style.width = u(I.shift())
            }, h);
            a.nTFoot !== null && P(function(B) {
                B.innerHTML =
                    "";
                B.style.width = u(I.shift())
            }, j);
            if (i(a.nTable).outerWidth() < f)
                if (a.oScroll.sX === "") J(a, 1, "The table cannot fit into the current element which will cause column misalignment. It is suggested that you enable x-scrolling or increase the width the table has in which to be drawn");
                else a.oScroll.sXInner !== "" && J(a, 1, "The table cannot fit into the current element which will cause column misalignment. It is suggested that you increase the sScrollXInner property to allow it to draw in a larger area, or simply remove that parameter to allow automatic calculation");
            if (a.oScroll.sY === "")
                if (i.browser.msie && i.browser.version <= 7) d.style.height = u(a.nTable.offsetHeight + a.oScroll.iBarWidth);
            if (a.oScroll.sY !== "" && a.oScroll.bCollapse) {
                d.style.height = u(a.oScroll.sY);
                j = a.oScroll.sX !== "" && a.nTable.offsetWidth > d.offsetWidth ? a.oScroll.iBarWidth : 0;
                if (a.nTable.offsetHeight < d.offsetHeight) d.style.height = u(i(a.nTable).height() + j)
            }
            j = i(a.nTable).outerWidth();
            c.style.width = u(j);
            b.style.width = u(j + a.oScroll.iBarWidth);
            if (a.nTFoot !== null) {
                b = a.nScrollFoot.getElementsByTagName("div")[0];
                c = b.getElementsByTagName("table")[0];
                b.style.width = u(a.nTable.offsetWidth + a.oScroll.iBarWidth);
                c.style.width = u(a.nTable.offsetWidth)
            }
            if (a.bSorted || a.bFiltered) d.scrollTop = 0
        }

        function ca(a) {
            if (a.oFeatures.bAutoWidth === false) return false;
            ea(a);
            for (var b = 0, c = a.aoColumns.length; b < c; b++) a.aoColumns[b].nTh.style.width = a.aoColumns[b].sWidth
        }

        function Da(a) {
            var b = a.oLanguage.sSearch;
            b = b.indexOf("_INPUT_") !== -1 ? b.replace("_INPUT_", '<input type="text" />') : b === "" ? '<input type="text" />' : b + ' <input type="text" />';
            var c = p.createElement("div");
            c.className = a.oClasses.sFilter;
            c.innerHTML = "<label>" + b + "</label>";
            a.sTableId !== "" && typeof a.aanFeatures.f == "undefined" && c.setAttribute("id", a.sTableId + "_filter");
            b = i("input", c);
            b.val(a.oPreviousSearch.sSearch.replace('"', "&quot;"));
            b.bind("keyup.DT", function() {
                for (var d = a.aanFeatures.f, f = 0, e = d.length; f < e; f++) d[f] != this.parentNode && i("input", d[f]).val(this.value);
                this.value != a.oPreviousSearch.sSearch && M(a, {
                    sSearch: this.value,
                    bRegex: a.oPreviousSearch.bRegex,
                    bSmart: a.oPreviousSearch.bSmart
                })
            });
            b.bind("keypress.DT", function(d) {
                if (d.keyCode == 13) return false
            });
            return c
        }

        function M(a, b, c) {
            Ka(a, b.sSearch, c, b.bRegex, b.bSmart);
            for (b = 0; b < a.aoPreSearchCols.length; b++) La(a, a.aoPreSearchCols[b].sSearch, b, a.aoPreSearchCols[b].bRegex, a.aoPreSearchCols[b].bSmart);
            o.afnFiltering.length !== 0 && Ma(a);
            a.bFiltered = true;
            a._iDisplayStart = 0;
            E(a);
            C(a);
            ka(a, 0)
        }

        function Ma(a) {
            for (var b = o.afnFiltering, c = 0, d = b.length; c < d; c++)
                for (var f = 0, e = 0, h = a.aiDisplay.length; e < h; e++) {
                    var j = a.aiDisplay[e - f];
                    if (!b[c](a, da(a, j, "filter"),
                            j)) {
                        a.aiDisplay.splice(e - f, 1);
                        f++
                    }
                }
        }

        function La(a, b, c, d, f) {
            if (b !== "") {
                var e = 0;
                b = la(b, d, f);
                for (d = a.aiDisplay.length - 1; d >= 0; d--) {
                    f = ma(H(a, a.aiDisplay[d], c, "filter"), a.aoColumns[c].sType);
                    if (!b.test(f)) {
                        a.aiDisplay.splice(d, 1);
                        e++
                    }
                }
            }
        }

        function Ka(a, b, c, d, f) {
            var e = la(b, d, f);
            if (typeof c == "undefined" || c === null) c = 0;
            if (o.afnFiltering.length !== 0) c = 1;
            if (b.length <= 0) {
                a.aiDisplay.splice(0, a.aiDisplay.length);
                a.aiDisplay = a.aiDisplayMaster.slice()
            } else if (a.aiDisplay.length == a.aiDisplayMaster.length || a.oPreviousSearch.sSearch.length >
                b.length || c == 1 || b.indexOf(a.oPreviousSearch.sSearch) !== 0) {
                a.aiDisplay.splice(0, a.aiDisplay.length);
                ka(a, 1);
                for (c = 0; c < a.aiDisplayMaster.length; c++) e.test(a.asDataSearch[c]) && a.aiDisplay.push(a.aiDisplayMaster[c])
            } else {
                var h = 0;
                for (c = 0; c < a.asDataSearch.length; c++)
                    if (!e.test(a.asDataSearch[c])) {
                        a.aiDisplay.splice(c - h, 1);
                        h++
                    }
            }
            a.oPreviousSearch.sSearch = b;
            a.oPreviousSearch.bRegex = d;
            a.oPreviousSearch.bSmart = f
        }

        function ka(a, b) {
            a.asDataSearch.splice(0, a.asDataSearch.length);
            b = typeof b != "undefined" && b == 1 ? a.aiDisplayMaster :
                a.aiDisplay;
            for (var c = 0, d = b.length; c < d; c++) a.asDataSearch[c] = na(a, da(a, b[c], "filter"))
        }

        function na(a, b) {
            var c = "";
            if (typeof a.__nTmpFilter == "undefined") a.__nTmpFilter = p.createElement("div");
            for (var d = a.__nTmpFilter, f = 0, e = a.aoColumns.length; f < e; f++)
                if (a.aoColumns[f].bSearchable) c += ma(b[f], a.aoColumns[f].sType) + "  ";
            if (c.indexOf("&") !== -1) {
                d.innerHTML = c;
                c = d.textContent ? d.textContent : d.innerText;
                c = c.replace(/\n/g, " ").replace(/\r/g, "")
            }
            return c
        }

        function la(a, b, c) {
            if (c) {
                a = b ? a.split(" ") : oa(a).split(" ");
                a = "^(?=.*?" + a.join(")(?=.*?") + ").*$";
                return new RegExp(a, "i")
            } else {
                a = b ? a : oa(a);
                return new RegExp(a, "i")
            }
        }

        function ma(a, b) {
            if (typeof o.ofnSearch[b] == "function") return o.ofnSearch[b](a);
            else if (b == "html") return a.replace(/\n/g, " ").replace(/<.*?>/g, "");
            else if (typeof a == "string") return a.replace(/\n/g, " ");
            else if (a === null) return "";
            return a
        }

        function R(a, b) {
            var c, d, f, e, h = [],
                j = [],
                k = o.oSort;
            d = a.aoData;
            var m = a.aoColumns;
            if (!a.oFeatures.bServerSide && (a.aaSorting.length !== 0 || a.aaSortingFixed !== null)) {
                h = a.aaSortingFixed !==
                    null ? a.aaSortingFixed.concat(a.aaSorting) : a.aaSorting.slice();
                for (c = 0; c < h.length; c++) {
                    var t = h[c][0];
                    f = pa(a, t);
                    e = a.aoColumns[t].sSortDataType;
                    if (typeof o.afnSortData[e] != "undefined") {
                        var q = o.afnSortData[e](a, t, f);
                        f = 0;
                        for (e = d.length; f < e; f++) N(a, f, t, q[f])
                    }
                }
                c = 0;
                for (d = a.aiDisplayMaster.length; c < d; c++) j[a.aiDisplayMaster[c]] = c;
                var I = h.length;
                a.aiDisplayMaster.sort(function(O, B) {
                    var F, qa;
                    for (c = 0; c < I; c++) {
                        F = m[h[c][0]].iDataSort;
                        qa = m[F].sType;
                        F = k[(qa ? qa : "string") + "-" + h[c][1]](H(a, O, F, "sort"), H(a, B, F, "sort"));
                        if (F !== 0) return F
                    }
                    return k["numeric-asc"](j[O], j[B])
                })
            }
            if ((typeof b == "undefined" || b) && !a.oFeatures.bDeferRender) T(a);
            a.bSorted = true;
            if (a.oFeatures.bFilter) M(a, a.oPreviousSearch, 1);
            else {
                a.aiDisplay = a.aiDisplayMaster.slice();
                a._iDisplayStart = 0;
                E(a);
                C(a)
            }
        }

        function ga(a, b, c, d) {
            i(b).bind("click.DT", function(f) {
                if (a.aoColumns[c].bSortable !== false) {
                    var e = function() {
                        var h, j;
                        if (f.shiftKey) {
                            for (var k = false, m = 0; m < a.aaSorting.length; m++)
                                if (a.aaSorting[m][0] == c) {
                                    k = true;
                                    h = a.aaSorting[m][0];
                                    j = a.aaSorting[m][2] +
                                        1;
                                    if (typeof a.aoColumns[h].asSorting[j] == "undefined") a.aaSorting.splice(m, 1);
                                    else {
                                        a.aaSorting[m][1] = a.aoColumns[h].asSorting[j];
                                        a.aaSorting[m][2] = j
                                    }
                                    break
                                }
                            k === false && a.aaSorting.push([c, a.aoColumns[c].asSorting[0], 0])
                        } else if (a.aaSorting.length == 1 && a.aaSorting[0][0] == c) {
                            h = a.aaSorting[0][0];
                            j = a.aaSorting[0][2] + 1;
                            if (typeof a.aoColumns[h].asSorting[j] == "undefined") j = 0;
                            a.aaSorting[0][1] = a.aoColumns[h].asSorting[j];
                            a.aaSorting[0][2] = j
                        } else {
                            a.aaSorting.splice(0, a.aaSorting.length);
                            a.aaSorting.push([c, a.aoColumns[c].asSorting[0],
                                0
                            ])
                        }
                        R(a)
                    };
                    if (a.oFeatures.bProcessing) {
                        K(a, true);
                        setTimeout(function() {
                            e();
                            a.oFeatures.bServerSide || K(a, false)
                        }, 0)
                    } else e();
                    typeof d == "function" && d(a)
                }
            })
        }

        function T(a) {
            var b, c, d, f, e, h = a.aoColumns.length,
                j = a.oClasses;
            for (b = 0; b < h; b++) a.aoColumns[b].bSortable && i(a.aoColumns[b].nTh).removeClass(j.sSortAsc + " " + j.sSortDesc + " " + a.aoColumns[b].sSortingClass);
            f = a.aaSortingFixed !== null ? a.aaSortingFixed.concat(a.aaSorting) : a.aaSorting.slice();
            for (b = 0; b < a.aoColumns.length; b++)
                if (a.aoColumns[b].bSortable) {
                    e = a.aoColumns[b].sSortingClass;
                    d = -1;
                    for (c = 0; c < f.length; c++)
                        if (f[c][0] == b) {
                            e = f[c][1] == "asc" ? j.sSortAsc : j.sSortDesc;
                            d = c;
                            break
                        }
                    i(a.aoColumns[b].nTh).addClass(e);
                    if (a.bJUI) {
                        c = i("span", a.aoColumns[b].nTh);
                        c.removeClass(j.sSortJUIAsc + " " + j.sSortJUIDesc + " " + j.sSortJUI + " " + j.sSortJUIAscAllowed + " " + j.sSortJUIDescAllowed);
                        c.addClass(d == -1 ? a.aoColumns[b].sSortingClassJUI : f[d][1] == "asc" ? j.sSortJUIAsc : j.sSortJUIDesc)
                    }
                } else i(a.aoColumns[b].nTh).addClass(a.aoColumns[b].sSortingClass);
            e = j.sSortColumn;
            if (a.oFeatures.bSort && a.oFeatures.bSortClasses) {
                d =
                    Q(a);
                if (a.oFeatures.bDeferRender) i(d).removeClass(e + "1 " + e + "2 " + e + "3");
                else if (d.length >= h)
                    for (b = 0; b < h; b++)
                        if (d[b].className.indexOf(e + "1") != -1) {
                            c = 0;
                            for (a = d.length / h; c < a; c++) d[h * c + b].className = i.trim(d[h * c + b].className.replace(e + "1", ""))
                        } else if (d[b].className.indexOf(e + "2") != -1) {
                    c = 0;
                    for (a = d.length / h; c < a; c++) d[h * c + b].className = i.trim(d[h * c + b].className.replace(e + "2", ""))
                } else if (d[b].className.indexOf(e + "3") != -1) {
                    c = 0;
                    for (a = d.length / h; c < a; c++) d[h * c + b].className = i.trim(d[h * c + b].className.replace(" " +
                        e + "3", ""))
                }
                j = 1;
                var k;
                for (b = 0; b < f.length; b++) {
                    k = parseInt(f[b][0], 10);
                    c = 0;
                    for (a = d.length / h; c < a; c++) d[h * c + k].className += " " + e + j;
                    j < 3 && j++
                }
            }
        }

        function Ha(a) {
            if (a.oScroll.bInfinite) return null;
            var b = p.createElement("div");
            b.className = a.oClasses.sPaging + a.sPaginationType;
            o.oPagination[a.sPaginationType].fnInit(a, b, function(c) {
                E(c);
                C(c)
            });
            typeof a.aanFeatures.p == "undefined" && a.aoDrawCallback.push({
                fn: function(c) {
                    o.oPagination[c.sPaginationType].fnUpdate(c, function(d) {
                        E(d);
                        C(d)
                    })
                },
                sName: "pagination"
            });
            return b
        }

        function ja(a, b) {
            var c = a._iDisplayStart;
            if (b == "first") a._iDisplayStart = 0;
            else if (b == "previous") {
                a._iDisplayStart = a._iDisplayLength >= 0 ? a._iDisplayStart - a._iDisplayLength : 0;
                if (a._iDisplayStart < 0) a._iDisplayStart = 0
            } else if (b == "next")
                if (a._iDisplayLength >= 0) {
                    if (a._iDisplayStart + a._iDisplayLength < a.fnRecordsDisplay()) a._iDisplayStart += a._iDisplayLength
                } else a._iDisplayStart = 0;
            else if (b == "last")
                if (a._iDisplayLength >= 0) {
                    b = parseInt((a.fnRecordsDisplay() - 1) / a._iDisplayLength, 10) + 1;
                    a._iDisplayStart = (b - 1) * a._iDisplayLength
                } else a._iDisplayStart =
                    0;
            else J(a, 0, "Unknown paging action: " + b);
            return c != a._iDisplayStart
        }

        function Ga(a) {
            var b = p.createElement("div");
            b.className = a.oClasses.sInfo;
            if (typeof a.aanFeatures.i == "undefined") {
                a.aoDrawCallback.push({
                    fn: Na,
                    sName: "information"
                });
                a.sTableId !== "" && b.setAttribute("id", a.sTableId + "_info")
            }
            return b
        }

        function Na(a) {
            if (!(!a.oFeatures.bInfo || a.aanFeatures.i.length === 0)) {
                var b = a._iDisplayStart + 1,
                    c = a.fnDisplayEnd(),
                    d = a.fnRecordsTotal(),
                    f = a.fnRecordsDisplay(),
                    e = a.fnFormatNumber(b),
                    h = a.fnFormatNumber(c),
                    j =
                    a.fnFormatNumber(d),
                    k = a.fnFormatNumber(f);
                if (a.oScroll.bInfinite) e = a.fnFormatNumber(1);
                e = a.fnRecordsDisplay() === 0 && a.fnRecordsDisplay() == a.fnRecordsTotal() ? a.oLanguage.sInfoEmpty + a.oLanguage.sInfoPostFix : a.fnRecordsDisplay() === 0 ? a.oLanguage.sInfoEmpty + " " + a.oLanguage.sInfoFiltered.replace("_MAX_", j) + a.oLanguage.sInfoPostFix : a.fnRecordsDisplay() == a.fnRecordsTotal() ? a.oLanguage.sInfo.replace("_START_", e).replace("_END_", h).replace("_TOTAL_", k) + a.oLanguage.sInfoPostFix : a.oLanguage.sInfo.replace("_START_",
                    e).replace("_END_", h).replace("_TOTAL_", k) + " " + a.oLanguage.sInfoFiltered.replace("_MAX_", a.fnFormatNumber(a.fnRecordsTotal())) + a.oLanguage.sInfoPostFix;
                if (a.oLanguage.fnInfoCallback !== null) e = a.oLanguage.fnInfoCallback(a, b, c, d, f, e);
                a = a.aanFeatures.i;
                b = 0;
                for (c = a.length; b < c; b++) i(a[b]).html(e)
            }
        }

        function Ca(a) {
            if (a.oScroll.bInfinite) return null;
            var b = '<select size="1" ' + (a.sTableId === "" ? "" : 'name="' + a.sTableId + '_length"') + ">",
                c, d;
            if (a.aLengthMenu.length == 2 && typeof a.aLengthMenu[0] == "object" && typeof a.aLengthMenu[1] ==
                "object") {
                c = 0;
                for (d = a.aLengthMenu[0].length; c < d; c++) b += '<option value="' + a.aLengthMenu[0][c] + '">' + a.aLengthMenu[1][c] + "</option>"
            } else {
                c = 0;
                for (d = a.aLengthMenu.length; c < d; c++) b += '<option value="' + a.aLengthMenu[c] + '">' + a.aLengthMenu[c] + "</option>"
            }
            b += "</select>";
            var f = p.createElement("div");
            a.sTableId !== "" && typeof a.aanFeatures.l == "undefined" && f.setAttribute("id", a.sTableId + "_length");
            f.className = a.oClasses.sLength;
            f.innerHTML = "<label>" + a.oLanguage.sLengthMenu.replace("_MENU_", b) + "</label>";
            i('select option[value="' +
                a._iDisplayLength + '"]', f).attr("selected", true);
            i("select", f).bind("change.DT", function() {
                var e = i(this).val(),
                    h = a.aanFeatures.l;
                c = 0;
                for (d = h.length; c < d; c++) h[c] != this.parentNode && i("select", h[c]).val(e);
                a._iDisplayLength = parseInt(e, 10);
                E(a);
                if (a.fnDisplayEnd() == a.fnRecordsDisplay()) {
                    a._iDisplayStart = a.fnDisplayEnd() - a._iDisplayLength;
                    if (a._iDisplayStart < 0) a._iDisplayStart = 0
                }
                if (a._iDisplayLength == -1) a._iDisplayStart = 0;
                C(a)
            });
            return f
        }

        function Ea(a) {
            var b = p.createElement("div");
            a.sTableId !== "" && typeof a.aanFeatures.r ==
                "undefined" && b.setAttribute("id", a.sTableId + "_processing");
            b.innerHTML = a.oLanguage.sProcessing;
            b.className = a.oClasses.sProcessing;
            a.nTable.parentNode.insertBefore(b, a.nTable);
            return b
        }

        function K(a, b) {
            if (a.oFeatures.bProcessing) {
                a = a.aanFeatures.r;
                for (var c = 0, d = a.length; c < d; c++) a[c].style.visibility = b ? "visible" : "hidden"
            }
        }

        function Ja(a, b) {
            for (var c = -1, d = 0; d < a.aoColumns.length; d++) {
                a.aoColumns[d].bVisible === true && c++;
                if (c == b) return d
            }
            return null
        }

        function pa(a, b) {
            for (var c = -1, d = 0; d < a.aoColumns.length; d++) {
                a.aoColumns[d].bVisible ===
                    true && c++;
                if (d == b) return a.aoColumns[d].bVisible === true ? c : null
            }
            return null
        }

        function U(a, b) {
            var c, d;
            c = a._iDisplayStart;
            for (d = a._iDisplayEnd; c < d; c++)
                if (a.aoData[a.aiDisplay[c]].nTr == b) return a.aiDisplay[c];
            c = 0;
            for (d = a.aoData.length; c < d; c++)
                if (a.aoData[c].nTr == b) return c;
            return null
        }

        function X(a) {
            for (var b = 0, c = 0; c < a.aoColumns.length; c++) a.aoColumns[c].bVisible === true && b++;
            return b
        }

        function E(a) {
            a._iDisplayEnd = a.oFeatures.bPaginate === false ? a.aiDisplay.length : a._iDisplayStart + a._iDisplayLength > a.aiDisplay.length ||
                a._iDisplayLength == -1 ? a.aiDisplay.length : a._iDisplayStart + a._iDisplayLength
        }

        function Oa(a, b) {
            if (!a || a === null || a === "") return 0;
            if (typeof b == "undefined") b = p.getElementsByTagName("body")[0];
            var c = p.createElement("div");
            c.style.width = u(a);
            b.appendChild(c);
            a = c.offsetWidth;
            b.removeChild(c);
            return a
        }

        function ea(a) {
            var b = 0,
                c, d = 0,
                f = a.aoColumns.length,
                e, h = i("th", a.nTHead);
            for (e = 0; e < f; e++)
                if (a.aoColumns[e].bVisible) {
                    d++;
                    if (a.aoColumns[e].sWidth !== null) {
                        c = Oa(a.aoColumns[e].sWidthOrig, a.nTable.parentNode);
                        if (c !==
                            null) a.aoColumns[e].sWidth = u(c);
                        b++
                    }
                }
            if (f == h.length && b === 0 && d == f && a.oScroll.sX === "" && a.oScroll.sY === "")
                for (e = 0; e < a.aoColumns.length; e++) {
                    c = i(h[e]).width();
                    if (c !== null) a.aoColumns[e].sWidth = u(c)
                } else {
                    b = a.nTable.cloneNode(false);
                    e = a.nTHead.cloneNode(true);
                    d = p.createElement("tbody");
                    c = p.createElement("tr");
                    b.removeAttribute("id");
                    b.appendChild(e);
                    if (a.nTFoot !== null) {
                        b.appendChild(a.nTFoot.cloneNode(true));
                        P(function(k) {
                            k.style.width = ""
                        }, b.getElementsByTagName("tr"))
                    }
                    b.appendChild(d);
                    d.appendChild(c);
                    d = i("thead th", b);
                    if (d.length === 0) d = i("tbody tr:eq(0)>td", b);
                    h = S(a, e);
                    for (e = d = 0; e < f; e++) {
                        var j = a.aoColumns[e];
                        if (j.bVisible && j.sWidthOrig !== null && j.sWidthOrig !== "") h[e - d].style.width = u(j.sWidthOrig);
                        else if (j.bVisible) h[e - d].style.width = "";
                        else d++
                    }
                    for (e = 0; e < f; e++)
                        if (a.aoColumns[e].bVisible) {
                            d = Pa(a, e);
                            if (d !== null) {
                                d = d.cloneNode(true);
                                if (a.aoColumns[e].sContentPadding !== "") d.innerHTML += a.aoColumns[e].sContentPadding;
                                c.appendChild(d)
                            }
                        }
                    f = a.nTable.parentNode;
                    f.appendChild(b);
                    if (a.oScroll.sX !== "" && a.oScroll.sXInner !==
                        "") b.style.width = u(a.oScroll.sXInner);
                    else if (a.oScroll.sX !== "") {
                        b.style.width = "";
                        if (i(b).width() < f.offsetWidth) b.style.width = u(f.offsetWidth)
                    } else if (a.oScroll.sY !== "") b.style.width = u(f.offsetWidth);
                    b.style.visibility = "hidden";
                    Qa(a, b);
                    f = i("tbody tr:eq(0)", b).children();
                    if (f.length === 0) f = S(a, i("thead", b)[0]);
                    if (a.oScroll.sX !== "") {
                        for (e = d = c = 0; e < a.aoColumns.length; e++)
                            if (a.aoColumns[e].bVisible) {
                                c += a.aoColumns[e].sWidthOrig === null ? i(f[d]).outerWidth() : parseInt(a.aoColumns[e].sWidth.replace("px", ""),
                                    10) + (i(f[d]).outerWidth() - i(f[d]).width());
                                d++
                            }
                        b.style.width = u(c);
                        a.nTable.style.width = u(c)
                    }
                    for (e = d = 0; e < a.aoColumns.length; e++)
                        if (a.aoColumns[e].bVisible) {
                            c = i(f[d]).width();
                            if (c !== null && c > 0) a.aoColumns[e].sWidth = u(c);
                            d++
                        }
                    a.nTable.style.width = u(i(b).outerWidth());
                    b.parentNode.removeChild(b)
                }
        }

        function Qa(a, b) {
            if (a.oScroll.sX === "" && a.oScroll.sY !== "") {
                i(b).width();
                b.style.width = u(i(b).outerWidth() - a.oScroll.iBarWidth)
            } else if (a.oScroll.sX !== "") b.style.width = u(i(b).outerWidth())
        }

        function Pa(a, b) {
            var c =
                Ra(a, b);
            if (c < 0) return null;
            if (a.aoData[c].nTr === null) {
                var d = p.createElement("td");
                d.innerHTML = H(a, c, b, "");
                return d
            }
            return Q(a, c)[b]
        }

        function Ra(a, b) {
            for (var c = -1, d = -1, f = 0; f < a.aoData.length; f++) {
                var e = H(a, f, b, "display") + "";
                e = e.replace(/<.*?>/g, "");
                if (e.length > c) {
                    c = e.length;
                    d = f
                }
            }
            return d
        }

        function u(a) {
            if (a === null) return "0px";
            if (typeof a == "number") {
                if (a < 0) return "0px";
                return a + "px"
            }
            var b = a.charCodeAt(a.length - 1);
            if (b < 48 || b > 57) return a;
            return a + "px"
        }

        function Va(a, b) {
            if (a.length != b.length) return 1;
            for (var c =
                    0; c < a.length; c++)
                if (a[c] != b[c]) return 2;
            return 0
        }

        function fa(a) {
            for (var b = o.aTypes, c = b.length, d = 0; d < c; d++) {
                var f = b[d](a);
                if (f !== null) return f
            }
            return "string"
        }

        function A(a) {
            for (var b = 0; b < D.length; b++)
                if (D[b].nTable == a) return D[b];
            return null
        }

        function aa(a) {
            for (var b = [], c = a.aoData.length, d = 0; d < c; d++) b.push(a.aoData[d]._aData);
            return b
        }

        function $(a) {
            for (var b = [], c = 0, d = a.aoData.length; c < d; c++) a.aoData[c].nTr !== null && b.push(a.aoData[c].nTr);
            return b
        }

        function Q(a, b) {
            var c = [],
                d, f, e, h, j;
            f = 0;
            var k = a.aoData.length;
            if (typeof b != "undefined") {
                f = b;
                k = b + 1
            }
            for (f = f; f < k; f++) {
                j = a.aoData[f];
                if (j.nTr !== null) {
                    b = [];
                    e = 0;
                    for (h = j.nTr.childNodes.length; e < h; e++) {
                        d = j.nTr.childNodes[e].nodeName.toLowerCase();
                        if (d == "td" || d == "th") b.push(j.nTr.childNodes[e])
                    }
                    e = d = 0;
                    for (h = a.aoColumns.length; e < h; e++)
                        if (a.aoColumns[e].bVisible) c.push(b[e - d]);
                        else {
                            c.push(j._anHidden[e]);
                            d++
                        }
                }
            }
            return c
        }

        function oa(a) {
            return a.replace(new RegExp("(\\/|\\.|\\*|\\+|\\?|\\||\\(|\\)|\\[|\\]|\\{|\\}|\\\\|\\$|\\^)", "g"), "\\$1")
        }

        function ra(a, b) {
            for (var c = -1, d =
                    0, f = a.length; d < f; d++)
                if (a[d] == b) c = d;
                else a[d] > b && a[d]--;
            c != -1 && a.splice(c, 1)
        }

        function Ba(a, b) {
            b = b.split(",");
            for (var c = [], d = 0, f = a.aoColumns.length; d < f; d++)
                for (var e = 0; e < f; e++)
                    if (a.aoColumns[d].sName == b[e]) {
                        c.push(e);
                        break
                    }
            return c
        }

        function ha(a) {
            for (var b = "", c = 0, d = a.aoColumns.length; c < d; c++) b += a.aoColumns[c].sName + ",";
            if (b.length == d) return "";
            return b.slice(0, -1)
        }

        function J(a, b, c) {
            a = a.sTableId === "" ? "DataTables warning: " + c : "DataTables warning (table id = '" + a.sTableId + "'): " + c;
            if (b === 0)
                if (o.sErrMode ==
                    "alert") alert(a);
                else throw a;
            else typeof console != "undefined" && typeof console.log != "undefined" && console.log(a)
        }

        function ia(a) {
            a.aoData.splice(0, a.aoData.length);
            a.aiDisplayMaster.splice(0, a.aiDisplayMaster.length);
            a.aiDisplay.splice(0, a.aiDisplay.length);
            E(a)
        }

        function sa(a) {
            if (!(!a.oFeatures.bStateSave || typeof a.bDestroying != "undefined")) {
                var b, c, d, f = "{";
                f += '"iCreate":' + (new Date).getTime() + ",";
                f += '"iStart":' + (a.oScroll.bInfinite ? 0 : a._iDisplayStart) + ",";
                f += '"iEnd":' + (a.oScroll.bInfinite ? a._iDisplayLength :
                    a._iDisplayEnd) + ",";
                f += '"iLength":' + a._iDisplayLength + ",";
                f += '"sFilter":"' + encodeURIComponent(a.oPreviousSearch.sSearch) + '",';
                f += '"sFilterEsc":' + !a.oPreviousSearch.bRegex + ",";
                f += '"aaSorting":[ ';
                for (b = 0; b < a.aaSorting.length; b++) f += "[" + a.aaSorting[b][0] + ',"' + a.aaSorting[b][1] + '"],';
                f = f.substring(0, f.length - 1);
                f += "],";
                f += '"aaSearchCols":[ ';
                for (b = 0; b < a.aoPreSearchCols.length; b++) f += '["' + encodeURIComponent(a.aoPreSearchCols[b].sSearch) + '",' + !a.aoPreSearchCols[b].bRegex + "],";
                f = f.substring(0, f.length -
                    1);
                f += "],";
                f += '"abVisCols":[ ';
                for (b = 0; b < a.aoColumns.length; b++) f += a.aoColumns[b].bVisible + ",";
                f = f.substring(0, f.length - 1);
                f += "]";
                b = 0;
                for (c = a.aoStateSave.length; b < c; b++) {
                    d = a.aoStateSave[b].fn(a, f);
                    if (d !== "") f = d
                }
                f += "}";
                Sa(a.sCookiePrefix + a.sInstance, f, a.iCookieDuration, a.sCookiePrefix, a.fnCookieCallback)
            }
        }

        function Ta(a, b) {
            if (a.oFeatures.bStateSave) {
                var c, d, f;
                d = ta(a.sCookiePrefix + a.sInstance);
                if (d !== null && d !== "") {
                    try {
                        c = typeof i.parseJSON == "function" ? i.parseJSON(d.replace(/'/g, '"')) : eval("(" + d + ")")
                    } catch (e) {
                        return
                    }
                    d =
                        0;
                    for (f = a.aoStateLoad.length; d < f; d++)
                        if (!a.aoStateLoad[d].fn(a, c)) return;
                    a.oLoadedState = i.extend(true, {}, c);
                    a._iDisplayStart = c.iStart;
                    a.iInitDisplayStart = c.iStart;
                    a._iDisplayEnd = c.iEnd;
                    a._iDisplayLength = c.iLength;
                    a.oPreviousSearch.sSearch = decodeURIComponent(c.sFilter);
                    a.aaSorting = c.aaSorting.slice();
                    a.saved_aaSorting = c.aaSorting.slice();
                    if (typeof c.sFilterEsc != "undefined") a.oPreviousSearch.bRegex = !c.sFilterEsc;
                    if (typeof c.aaSearchCols != "undefined")
                        for (d = 0; d < c.aaSearchCols.length; d++) a.aoPreSearchCols[d] = {
                            sSearch: decodeURIComponent(c.aaSearchCols[d][0]),
                            bRegex: !c.aaSearchCols[d][1]
                        };
                    if (typeof c.abVisCols != "undefined") {
                        b.saved_aoColumns = [];
                        for (d = 0; d < c.abVisCols.length; d++) {
                            b.saved_aoColumns[d] = {};
                            b.saved_aoColumns[d].bVisible = c.abVisCols[d]
                        }
                    }
                }
            }
        }

        function Sa(a, b, c, d, f) {
            var e = new Date;
            e.setTime(e.getTime() + c * 1E3);
            c = wa.location.pathname.split("/");
            a = a + "_" + c.pop().replace(/[\/:]/g, "").toLowerCase();
            var h;
            if (f !== null) {
                h = typeof i.parseJSON == "function" ? i.parseJSON(b) : eval("(" + b + ")");
                b = f(a, h, e.toGMTString(),
                    c.join("/") + "/")
            } else b = a + "=" + encodeURIComponent(b) + "; expires=" + e.toGMTString() + "; path=" + c.join("/") + "/";
            f = "";
            e = 9999999999999;
            if ((ta(a) !== null ? p.cookie.length : b.length + p.cookie.length) + 10 > 4096) {
                a = p.cookie.split(";");
                for (var j = 0, k = a.length; j < k; j++)
                    if (a[j].indexOf(d) != -1) {
                        var m = a[j].split("=");
                        try {
                            h = eval("(" + decodeURIComponent(m[1]) + ")")
                        } catch (t) {
                            continue
                        }
                        if (typeof h.iCreate != "undefined" && h.iCreate < e) {
                            f = m[0];
                            e = h.iCreate
                        }
                    }
                if (f !== "") p.cookie = f + "=; expires=Thu, 01-Jan-1970 00:00:01 GMT; path=" + c.join("/") +
                    "/"
            }
            p.cookie = b
        }

        function ta(a) {
            var b = wa.location.pathname.split("/");
            a = a + "_" + b[b.length - 1].replace(/[\/:]/g, "").toLowerCase() + "=";
            b = p.cookie.split(";");
            for (var c = 0; c < b.length; c++) {
                for (var d = b[c]; d.charAt(0) == " ";) d = d.substring(1, d.length);
                if (d.indexOf(a) === 0) return decodeURIComponent(d.substring(a.length, d.length))
            }
            return null
        }

        function W(a, b) {
            b = b.getElementsByTagName("tr");
            var c, d, f, e, h, j, k, m, t = function(O, B, F) {
                for (; typeof O[B][F] != "undefined";) F++;
                return F
            };
            a.splice(0, a.length);
            d = 0;
            for (j = b.length; d <
                j; d++) a.push([]);
            d = 0;
            for (j = b.length; d < j; d++) {
                f = 0;
                for (k = b[d].childNodes.length; f < k; f++) {
                    c = b[d].childNodes[f];
                    if (c.nodeName.toUpperCase() == "TD" || c.nodeName.toUpperCase() == "TH") {
                        var q = c.getAttribute("colspan") * 1,
                            I = c.getAttribute("rowspan") * 1;
                        q = !q || q === 0 || q === 1 ? 1 : q;
                        I = !I || I === 0 || I === 1 ? 1 : I;
                        m = t(a, d, 0);
                        for (h = 0; h < q; h++)
                            for (e = 0; e < I; e++) {
                                a[d + e][m + h] = {
                                    cell: c,
                                    unique: q == 1 ? true : false
                                };
                                a[d + e].nTr = b[d]
                            }
                    }
                }
            }
        }

        function S(a, b, c) {
            var d = [];
            if (typeof c == "undefined") {
                c = a.aoHeader;
                if (typeof b != "undefined") {
                    c = [];
                    W(c, b)
                }
            }
            b = 0;
            for (var f = c.length; b < f; b++)
                for (var e = 0, h = c[b].length; e < h; e++)
                    if (c[b][e].unique && (typeof d[e] == "undefined" || !a.bSortCellsTop)) d[e] = c[b][e].cell;
            return d
        }

        function Ua() {
            var a = p.createElement("p"),
                b = a.style;
            b.width = "100%";
            b.height = "200px";
            var c = p.createElement("div");
            b = c.style;
            b.position = "absolute";
            b.top = "0px";
            b.left = "0px";
            b.visibility = "hidden";
            b.width = "200px";
            b.height = "150px";
            b.overflow = "hidden";
            c.appendChild(a);
            p.body.appendChild(c);
            b = a.offsetWidth;
            c.style.overflow = "scroll";
            a = a.offsetWidth;
            if (b == a) a =
                c.clientWidth;
            p.body.removeChild(c);
            return b - a
        }

        function P(a, b, c) {
            for (var d = 0, f = b.length; d < f; d++)
                for (var e = 0, h = b[d].childNodes.length; e < h; e++)
                    if (b[d].childNodes[e].nodeType == 1) typeof c != "undefined" ? a(b[d].childNodes[e], c[d].childNodes[e]) : a(b[d].childNodes[e])
        }

        function n(a, b, c, d) {
            if (typeof d == "undefined") d = c;
            if (typeof b[c] != "undefined") a[d] = b[c]
        }

        function da(a, b, c) {
            for (var d = [], f = 0, e = a.aoColumns.length; f < e; f++) d.push(H(a, b, f, c));
            return d
        }

        function H(a, b, c, d) {
            var f = a.aoColumns[c];
            if ((c = f.fnGetData(a.aoData[b]._aData)) ===
                undefined) {
                if (a.iDrawError != a.iDraw && f.sDefaultContent === null) {
                    J(a, 0, "Requested unknown parameter '" + f.mDataProp + "' from the data source for row " + b);
                    a.iDrawError = a.iDraw
                }
                return f.sDefaultContent
            }
            if (c === null && f.sDefaultContent !== null) c = f.sDefaultContent;
            if (d == "display" && c === null) return "";
            return c
        }

        function N(a, b, c, d) {
            a.aoColumns[c].fnSetData(a.aoData[b]._aData, d)
        }

        function Z(a) {
            if (a === null) return function() {
                return null
            };
            else if (typeof a == "function") return function(c) {
                return a(c)
            };
            else if (typeof a ==
                "string" && a.indexOf(".") != -1) {
                var b = a.split(".");
                return b.length == 2 ? function(c) {
                    return c[b[0]][b[1]]
                } : b.length == 3 ? function(c) {
                    return c[b[0]][b[1]][b[2]]
                } : function(c) {
                    for (var d = 0, f = b.length; d < f; d++) c = c[b[d]];
                    return c
                }
            } else return function(c) {
                return c[a]
            }
        }

        function ya(a) {
            if (a === null) return function() {};
            else if (typeof a == "function") return function(c, d) {
                return a(c, d)
            };
            else if (typeof a == "string" && a.indexOf(".") != -1) {
                var b = a.split(".");
                return b.length == 2 ? function(c, d) {
                    c[b[0]][b[1]] = d
                } : b.length == 3 ? function(c,
                    d) {
                    c[b[0]][b[1]][b[2]] = d
                } : function(c, d) {
                    for (var f = 0, e = b.length - 1; f < e; f++) c = c[b[f]];
                    c[b[b.length - 1]] = d
                }
            } else return function(c, d) {
                c[a] = d
            }
        }
        this.oApi = {};
        this.fnDraw = function(a) {
            var b = A(this[o.iApiIndex]);
            if (typeof a != "undefined" && a === false) {
                E(b);
                C(b)
            } else ba(b)
        };
        this.fnFilter = function(a, b, c, d, f) {
            var e = A(this[o.iApiIndex]);
            if (e.oFeatures.bFilter) {
                if (typeof c == "undefined") c = false;
                if (typeof d == "undefined") d = true;
                if (typeof f == "undefined") f = true;
                if (typeof b == "undefined" || b === null) {
                    M(e, {
                        sSearch: a,
                        bRegex: c,
                        bSmart: d
                    }, 1);
                    if (f && typeof e.aanFeatures.f != "undefined") {
                        b = e.aanFeatures.f;
                        c = 0;
                        for (d = b.length; c < d; c++) i("input", b[c]).val(a)
                    }
                } else {
                    e.aoPreSearchCols[b].sSearch = a;
                    e.aoPreSearchCols[b].bRegex = c;
                    e.aoPreSearchCols[b].bSmart = d;
                    M(e, e.oPreviousSearch, 1)
                }
            }
        };
        this.fnSettings = function() {
            return A(this[o.iApiIndex])
        };
        this.fnVersionCheck = o.fnVersionCheck;
        this.fnSort = function(a) {
            var b = A(this[o.iApiIndex]);
            b.aaSorting = a;
            R(b)
        };
        this.fnSortListener = function(a, b, c) {
            ga(A(this[o.iApiIndex]), a, b, c)
        };
        this.fnAddData = function(a,
            b) {
            if (a.length === 0) return [];
            var c = [],
                d, f = A(this[o.iApiIndex]);
            if (typeof a[0] == "object")
                for (var e = 0; e < a.length; e++) {
                    d = v(f, a[e]);
                    if (d == -1) return c;
                    c.push(d)
                } else {
                    d = v(f, a);
                    if (d == -1) return c;
                    c.push(d)
                }
            f.aiDisplay = f.aiDisplayMaster.slice();
            if (typeof b == "undefined" || b) ba(f);
            return c
        };
        this.fnDeleteRow = function(a, b, c) {
            var d = A(this[o.iApiIndex]);
            a = typeof a == "object" ? U(d, a) : a;
            var f = d.aoData.splice(a, 1),
                e = i.inArray(a, d.aiDisplay);
            d.asDataSearch.splice(e, 1);
            ra(d.aiDisplayMaster, a);
            ra(d.aiDisplay, a);
            typeof b ==
                "function" && b.call(this, d, f);
            if (d._iDisplayStart >= d.aiDisplay.length) {
                d._iDisplayStart -= d._iDisplayLength;
                if (d._iDisplayStart < 0) d._iDisplayStart = 0
            }
            if (typeof c == "undefined" || c) {
                E(d);
                C(d)
            }
            return f
        };
        this.fnClearTable = function(a) {
            var b = A(this[o.iApiIndex]);
            ia(b);
            if (typeof a == "undefined" || a) C(b)
        };
        this.fnOpen = function(a, b, c) {
            var d = A(this[o.iApiIndex]);
            this.fnClose(a);
            var f = p.createElement("tr"),
                e = p.createElement("td");
            f.appendChild(e);
            e.className = c;
            e.colSpan = X(d);
            if (typeof b.jquery != "undefined" || typeof b ==
                "object") e.appendChild(b);
            else e.innerHTML = b;
            b = i("tr", d.nTBody);
            i.inArray(a, b) != -1 && i(f).insertAfter(a);
            d.aoOpenRows.push({
                nTr: f,
                nParent: a
            });
            return f
        };
        this.fnClose = function(a) {
            for (var b = A(this[o.iApiIndex]), c = 0; c < b.aoOpenRows.length; c++)
                if (b.aoOpenRows[c].nParent == a) {
                    (a = b.aoOpenRows[c].nTr.parentNode) && a.removeChild(b.aoOpenRows[c].nTr);
                    b.aoOpenRows.splice(c, 1);
                    return 0
                }
            return 1
        };
        this.fnGetData = function(a, b) {
            var c = A(this[o.iApiIndex]);
            if (typeof a != "undefined") {
                a = typeof a == "object" ? U(c, a) : a;
                if (typeof b !=
                    "undefined") return H(c, a, b, "");
                return typeof c.aoData[a] != "undefined" ? c.aoData[a]._aData : null
            }
            return aa(c)
        };
        this.fnGetNodes = function(a) {
            var b = A(this[o.iApiIndex]);
            if (typeof a != "undefined") return typeof b.aoData[a] != "undefined" ? b.aoData[a].nTr : null;
            return $(b)
        };
        this.fnGetPosition = function(a) {
            var b = A(this[o.iApiIndex]),
                c = a.nodeName.toUpperCase();
            if (c == "TR") return U(b, a);
            else if (c == "TD" || c == "TH") {
                c = U(b, a.parentNode);
                for (var d = Q(b, c), f = 0; f < b.aoColumns.length; f++)
                    if (d[f] == a) return [c, pa(b, f), f]
            }
            return null
        };
        this.fnUpdate = function(a, b, c, d, f) {
            var e = A(this[o.iApiIndex]);
            b = typeof b == "object" ? U(e, b) : b;
            if (i.isArray(a) && typeof a == "object") {
                e.aoData[b]._aData = a.slice();
                for (c = 0; c < e.aoColumns.length; c++) this.fnUpdate(H(e, b, c), b, c, false, false)
            } else if (typeof a == "object") {
                e.aoData[b]._aData = i.extend(true, {}, a);
                for (c = 0; c < e.aoColumns.length; c++) this.fnUpdate(H(e, b, c), b, c, false, false)
            } else {
                a = a;
                N(e, b, c, a);
                if (e.aoColumns[c].fnRender !== null) {
                    a = e.aoColumns[c].fnRender({
                        iDataRow: b,
                        iDataColumn: c,
                        aData: e.aoData[b]._aData,
                        oSettings: e
                    });
                    e.aoColumns[c].bUseRendered && N(e, b, c, a)
                }
                if (e.aoData[b].nTr !== null) Q(e, b)[c].innerHTML = a
            }
            c = i.inArray(b, e.aiDisplay);
            e.asDataSearch[c] = na(e, da(e, b, "filter"));
            if (typeof f == "undefined" || f) ca(e);
            if (typeof d == "undefined" || d) ba(e);
            return 0
        };
        this.fnSetColumnVis = function(a, b, c) {
            var d = A(this[o.iApiIndex]),
                f, e;
            e = d.aoColumns.length;
            var h, j;
            if (d.aoColumns[a].bVisible != b) {
                if (b) {
                    for (f = j = 0; f < a; f++) d.aoColumns[f].bVisible && j++;
                    j = j >= X(d);
                    if (!j)
                        for (f = a; f < e; f++)
                            if (d.aoColumns[f].bVisible) {
                                h = f;
                                break
                            }
                    f = 0;
                    for (e = d.aoData.length; f < e; f++)
                        if (d.aoData[f].nTr !== null) j ? d.aoData[f].nTr.appendChild(d.aoData[f]._anHidden[a]) : d.aoData[f].nTr.insertBefore(d.aoData[f]._anHidden[a], Q(d, f)[h])
                } else {
                    f = 0;
                    for (e = d.aoData.length; f < e; f++)
                        if (d.aoData[f].nTr !== null) {
                            h = Q(d, f)[a];
                            d.aoData[f]._anHidden[a] = h;
                            h.parentNode.removeChild(h)
                        }
                }
                d.aoColumns[a].bVisible = b;
                L(d, d.aoHeader);
                d.nTFoot && L(d, d.aoFooter);
                f = 0;
                for (e = d.aoOpenRows.length; f < e; f++) d.aoOpenRows[f].nTr.colSpan = X(d);
                if (typeof c == "undefined" || c) {
                    ca(d);
                    C(d)
                }
                sa(d)
            }
        };
        this.fnPageChange =
            function(a, b) {
                var c = A(this[o.iApiIndex]);
                ja(c, a);
                E(c);
                if (typeof b == "undefined" || b) C(c)
            };
        this.fnDestroy = function() {
            var a = A(this[o.iApiIndex]),
                b = a.nTableWrapper.parentNode,
                c = a.nTBody,
                d, f;
            a.bDestroying = true;
            d = 0;
            for (f = a.aoColumns.length; d < f; d++) a.aoColumns[d].bVisible === false && this.fnSetColumnVis(d, true);
            i(a.nTableWrapper).find("*").andSelf().unbind(".DT");
            i("tbody>tr>td." + a.oClasses.sRowEmpty, a.nTable).parent().remove();
            if (a.nTable != a.nTHead.parentNode) {
                i(">thead", a.nTable).remove();
                a.nTable.appendChild(a.nTHead)
            }
            if (a.nTFoot &&
                a.nTable != a.nTFoot.parentNode) {
                i(">tfoot", a.nTable).remove();
                a.nTable.appendChild(a.nTFoot)
            }
            a.nTable.parentNode.removeChild(a.nTable);
            i(a.nTableWrapper).remove();
            a.aaSorting = [];
            a.aaSortingFixed = [];
            T(a);
            i($(a)).removeClass(a.asStripClasses.join(" "));
            if (a.bJUI) {
                i("th", a.nTHead).removeClass([o.oStdClasses.sSortable, o.oJUIClasses.sSortableAsc, o.oJUIClasses.sSortableDesc, o.oJUIClasses.sSortableNone].join(" "));
                i("th span." + o.oJUIClasses.sSortIcon, a.nTHead).remove();
                i("th", a.nTHead).each(function() {
                    var e =
                        i("div." + o.oJUIClasses.sSortJUIWrapper, this),
                        h = e.contents();
                    i(this).append(h);
                    e.remove()
                })
            } else i("th", a.nTHead).removeClass([o.oStdClasses.sSortable, o.oStdClasses.sSortableAsc, o.oStdClasses.sSortableDesc, o.oStdClasses.sSortableNone].join(" "));
            a.nTableReinsertBefore ? b.insertBefore(a.nTable, a.nTableReinsertBefore) : b.appendChild(a.nTable);
            d = 0;
            for (f = a.aoData.length; d < f; d++) a.aoData[d].nTr !== null && c.appendChild(a.aoData[d].nTr);
            if (a.oFeatures.bAutoWidth === true) a.nTable.style.width = u(a.sDestroyWidth);
            i(">tr:even", c).addClass(a.asDestoryStrips[0]);
            i(">tr:odd", c).addClass(a.asDestoryStrips[1]);
            d = 0;
            for (f = D.length; d < f; d++) D[d] == a && D.splice(d, 1);
            a = null
        };
        this.fnAdjustColumnSizing = function(a) {
            var b = A(this[o.iApiIndex]);
            ca(b);
            if (typeof a == "undefined" || a) this.fnDraw(false);
            else if (b.oScroll.sX !== "" || b.oScroll.sY !== "") this.oApi._fnScrollDraw(b)
        };
        for (var ua in o.oApi)
            if (ua) this[ua] = r(ua);
        this.oApi._fnExternApiFunc = r;
        this.oApi._fnInitalise = s;
        this.oApi._fnInitComplete = w;
        this.oApi._fnLanguageProcess = y;
        this.oApi._fnAddColumn =
            G;
        this.oApi._fnColumnOptions = x;
        this.oApi._fnAddData = v;
        this.oApi._fnCreateTr = z;
        this.oApi._fnGatherData = Y;
        this.oApi._fnBuildHead = V;
        this.oApi._fnDrawHead = L;
        this.oApi._fnDraw = C;
        this.oApi._fnReDraw = ba;
        this.oApi._fnAjaxUpdate = za;
        this.oApi._fnAjaxUpdateDraw = Aa;
        this.oApi._fnAddOptionsHtml = xa;
        this.oApi._fnFeatureHtmlTable = Fa;
        this.oApi._fnScrollDraw = Ia;
        this.oApi._fnAjustColumnSizing = ca;
        this.oApi._fnFeatureHtmlFilter = Da;
        this.oApi._fnFilterComplete = M;
        this.oApi._fnFilterCustom = Ma;
        this.oApi._fnFilterColumn = La;
        this.oApi._fnFilter = Ka;
        this.oApi._fnBuildSearchArray = ka;
        this.oApi._fnBuildSearchRow = na;
        this.oApi._fnFilterCreateSearch = la;
        this.oApi._fnDataToSearch = ma;
        this.oApi._fnSort = R;
        this.oApi._fnSortAttachListener = ga;
        this.oApi._fnSortingClasses = T;
        this.oApi._fnFeatureHtmlPaginate = Ha;
        this.oApi._fnPageChange = ja;
        this.oApi._fnFeatureHtmlInfo = Ga;
        this.oApi._fnUpdateInfo = Na;
        this.oApi._fnFeatureHtmlLength = Ca;
        this.oApi._fnFeatureHtmlProcessing = Ea;
        this.oApi._fnProcessingDisplay = K;
        this.oApi._fnVisibleToColumnIndex = Ja;
        this.oApi._fnColumnIndexToVisible =
            pa;
        this.oApi._fnNodeToDataIndex = U;
        this.oApi._fnVisbleColumns = X;
        this.oApi._fnCalculateEnd = E;
        this.oApi._fnConvertToWidth = Oa;
        this.oApi._fnCalculateColumnWidths = ea;
        this.oApi._fnScrollingWidthAdjust = Qa;
        this.oApi._fnGetWidestNode = Pa;
        this.oApi._fnGetMaxLenString = Ra;
        this.oApi._fnStringToCss = u;
        this.oApi._fnArrayCmp = Va;
        this.oApi._fnDetectType = fa;
        this.oApi._fnSettingsFromNode = A;
        this.oApi._fnGetDataMaster = aa;
        this.oApi._fnGetTrNodes = $;
        this.oApi._fnGetTdNodes = Q;
        this.oApi._fnEscapeRegex = oa;
        this.oApi._fnDeleteIndex =
            ra;
        this.oApi._fnReOrderIndex = Ba;
        this.oApi._fnColumnOrdering = ha;
        this.oApi._fnLog = J;
        this.oApi._fnClearTable = ia;
        this.oApi._fnSaveState = sa;
        this.oApi._fnLoadState = Ta;
        this.oApi._fnCreateCookie = Sa;
        this.oApi._fnReadCookie = ta;
        this.oApi._fnDetectHeader = W;
        this.oApi._fnGetUniqueThs = S;
        this.oApi._fnScrollBarWidth = Ua;
        this.oApi._fnApplyToChildren = P;
        this.oApi._fnMap = n;
        this.oApi._fnGetRowData = da;
        this.oApi._fnGetCellData = H;
        this.oApi._fnSetCellData = N;
        this.oApi._fnGetObjectDataFn = Z;
        this.oApi._fnSetObjectDataFn = ya;
        var va =
            this;
        return this.each(function() {
            var a = 0,
                b, c, d, f;
            a = 0;
            for (b = D.length; a < b; a++) {
                if (D[a].nTable == this)
                    if (typeof g == "undefined" || typeof g.bRetrieve != "undefined" && g.bRetrieve === true) return D[a].oInstance;
                    else if (typeof g.bDestroy != "undefined" && g.bDestroy === true) {
                    D[a].oInstance.fnDestroy();
                    break
                } else {
                    J(D[a], 0, "Cannot reinitialise DataTable.\n\nTo retrieve the DataTables object for this table, please pass either no arguments to the dataTable() function, or set bRetrieve to true. Alternatively, to destory the old table and create a new one, set bDestroy to true (note that a lot of changes to the configuration can be made through the API which is usually much faster).");
                    return
                }
                if (D[a].sTableId !== "" && D[a].sTableId == this.getAttribute("id")) {
                    D.splice(a, 1);
                    break
                }
            }
            var e = new l;
            D.push(e);
            var h = false,
                j = false;
            a = this.getAttribute("id");
            if (a !== null) {
                e.sTableId = a;
                e.sInstance = a
            } else e.sInstance = o._oExternConfig.iNextUnique++;
            if (this.nodeName.toLowerCase() != "table") J(e, 0, "Attempted to initialise DataTables on a node which is not a table: " + this.nodeName);
            else {
                e.nTable = this;
                e.oInstance = va.length == 1 ? va : i(this).dataTable();
                e.oApi = va.oApi;
                e.sDestroyWidth = i(this).width();
                if (typeof g !=
                    "undefined" && g !== null) {
                    e.oInit = g;
                    n(e.oFeatures, g, "bPaginate");
                    n(e.oFeatures, g, "bLengthChange");
                    n(e.oFeatures, g, "bFilter");
                    n(e.oFeatures, g, "bSort");
                    n(e.oFeatures, g, "bInfo");
                    n(e.oFeatures, g, "bProcessing");
                    n(e.oFeatures, g, "bAutoWidth");
                    n(e.oFeatures, g, "bSortClasses");
                    n(e.oFeatures, g, "bServerSide");
                    n(e.oFeatures, g, "bDeferRender");
                    n(e.oScroll, g, "sScrollX", "sX");
                    n(e.oScroll, g, "sScrollXInner", "sXInner");
                    n(e.oScroll, g, "sScrollY", "sY");
                    n(e.oScroll, g, "bScrollCollapse", "bCollapse");
                    n(e.oScroll, g, "bScrollInfinite",
                        "bInfinite");
                    n(e.oScroll, g, "iScrollLoadGap", "iLoadGap");
                    n(e.oScroll, g, "bScrollAutoCss", "bAutoCss");
                    n(e, g, "asStripClasses");
                    n(e, g, "fnPreDrawCallback");
                    n(e, g, "fnRowCallback");
                    n(e, g, "fnHeaderCallback");
                    n(e, g, "fnFooterCallback");
                    n(e, g, "fnCookieCallback");
                    n(e, g, "fnInitComplete");
                    n(e, g, "fnServerData");
                    n(e, g, "fnFormatNumber");
                    n(e, g, "aaSorting");
                    n(e, g, "aaSortingFixed");
                    n(e, g, "aLengthMenu");
                    n(e, g, "sPaginationType");
                    n(e, g, "sAjaxSource");
                    n(e, g, "sAjaxDataProp");
                    n(e, g, "iCookieDuration");
                    n(e, g, "sCookiePrefix");
                    n(e, g, "sDom");
                    n(e, g, "bSortCellsTop");
                    n(e, g, "oSearch", "oPreviousSearch");
                    n(e, g, "aoSearchCols", "aoPreSearchCols");
                    n(e, g, "iDisplayLength", "_iDisplayLength");
                    n(e, g, "bJQueryUI", "bJUI");
                    n(e.oLanguage, g, "fnInfoCallback");
                    typeof g.fnDrawCallback == "function" && e.aoDrawCallback.push({
                        fn: g.fnDrawCallback,
                        sName: "user"
                    });
                    typeof g.fnStateSaveCallback == "function" && e.aoStateSave.push({
                        fn: g.fnStateSaveCallback,
                        sName: "user"
                    });
                    typeof g.fnStateLoadCallback == "function" && e.aoStateLoad.push({
                        fn: g.fnStateLoadCallback,
                        sName: "user"
                    });
                    if (e.oFeatures.bServerSide && e.oFeatures.bSort && e.oFeatures.bSortClasses) e.aoDrawCallback.push({
                        fn: T,
                        sName: "server_side_sort_classes"
                    });
                    else e.oFeatures.bDeferRender && e.aoDrawCallback.push({
                        fn: T,
                        sName: "defer_sort_classes"
                    });
                    if (typeof g.bJQueryUI != "undefined" && g.bJQueryUI) {
                        e.oClasses = o.oJUIClasses;
                        if (typeof g.sDom == "undefined") e.sDom = '<"H"lfr>t<"F"ip>'
                    }
                    if (e.oScroll.sX !== "" || e.oScroll.sY !== "") e.oScroll.iBarWidth = Ua();
                    if (typeof g.iDisplayStart != "undefined" && typeof e.iInitDisplayStart == "undefined") {
                        e.iInitDisplayStart =
                            g.iDisplayStart;
                        e._iDisplayStart = g.iDisplayStart
                    }
                    if (typeof g.bStateSave != "undefined") {
                        e.oFeatures.bStateSave = g.bStateSave;
                        Ta(e, g);
                        e.aoDrawCallback.push({
                            fn: sa,
                            sName: "state_save"
                        })
                    }
                    if (typeof g.iDeferLoading != "undefined") {
                        e.bDeferLoading = true;
                        e._iRecordsTotal = g.iDeferLoading;
                        e._iRecordsDisplay = g.iDeferLoading
                    }
                    if (typeof g.aaData != "undefined") j = true;
                    if (typeof g != "undefined" && typeof g.aoData != "undefined") g.aoColumns = g.aoData;
                    if (typeof g.oLanguage != "undefined")
                        if (typeof g.oLanguage.sUrl != "undefined" && g.oLanguage.sUrl !==
                            "") {
                            e.oLanguage.sUrl = g.oLanguage.sUrl;
                            i.getJSON(e.oLanguage.sUrl, null, function(t) {
                                y(e, t, true)
                            });
                            h = true
                        } else y(e, g.oLanguage, false)
                } else g = {};
                if (typeof g.asStripClasses == "undefined") {
                    e.asStripClasses.push(e.oClasses.sStripOdd);
                    e.asStripClasses.push(e.oClasses.sStripEven)
                }
                c = false;
                d = i(">tbody>tr", this);
                a = 0;
                for (b = e.asStripClasses.length; a < b; a++)
                    if (d.filter(":lt(2)").hasClass(e.asStripClasses[a])) {
                        c = true;
                        break
                    }
                if (c) {
                    e.asDestoryStrips = ["", ""];
                    if (i(d[0]).hasClass(e.oClasses.sStripOdd)) e.asDestoryStrips[0] +=
                        e.oClasses.sStripOdd + " ";
                    if (i(d[0]).hasClass(e.oClasses.sStripEven)) e.asDestoryStrips[0] += e.oClasses.sStripEven;
                    if (i(d[1]).hasClass(e.oClasses.sStripOdd)) e.asDestoryStrips[1] += e.oClasses.sStripOdd + " ";
                    if (i(d[1]).hasClass(e.oClasses.sStripEven)) e.asDestoryStrips[1] += e.oClasses.sStripEven;
                    d.removeClass(e.asStripClasses.join(" "))
                }
                c = [];
                var k;
                a = this.getElementsByTagName("thead");
                if (a.length !== 0) {
                    W(e.aoHeader, a[0]);
                    c = S(e)
                }
                if (typeof g.aoColumns == "undefined") {
                    k = [];
                    a = 0;
                    for (b = c.length; a < b; a++) k.push(null)
                } else k =
                    g.aoColumns;
                a = 0;
                for (b = k.length; a < b; a++) {
                    if (typeof g.saved_aoColumns != "undefined" && g.saved_aoColumns.length == b) {
                        if (k[a] === null) k[a] = {};
                        k[a].bVisible = g.saved_aoColumns[a].bVisible
                    }
                    G(e, c ? c[a] : null)
                }
                if (typeof g.aoColumnDefs != "undefined")
                    for (a = g.aoColumnDefs.length - 1; a >= 0; a--) {
                        var m = g.aoColumnDefs[a].aTargets;
                        i.isArray(m) || J(e, 1, "aTargets must be an array of targets, not a " + typeof m);
                        c = 0;
                        for (d = m.length; c < d; c++)
                            if (typeof m[c] == "number" && m[c] >= 0) {
                                for (; e.aoColumns.length <= m[c];) G(e);
                                x(e, m[c], g.aoColumnDefs[a])
                            } else if (typeof m[c] ==
                            "number" && m[c] < 0) x(e, e.aoColumns.length + m[c], g.aoColumnDefs[a]);
                        else if (typeof m[c] == "string") {
                            b = 0;
                            for (f = e.aoColumns.length; b < f; b++)
                                if (m[c] == "_all" || i(e.aoColumns[b].nTh).hasClass(m[c])) x(e, b, g.aoColumnDefs[a])
                        }
                    }
                if (typeof k != "undefined") {
                    a = 0;
                    for (b = k.length; a < b; a++) x(e, a, k[a])
                }
                a = 0;
                for (b = e.aaSorting.length; a < b; a++) {
                    if (e.aaSorting[a][0] >= e.aoColumns.length) e.aaSorting[a][0] = 0;
                    k = e.aoColumns[e.aaSorting[a][0]];
                    if (typeof e.aaSorting[a][2] == "undefined") e.aaSorting[a][2] = 0;
                    if (typeof g.aaSorting == "undefined" &&
                        typeof e.saved_aaSorting == "undefined") e.aaSorting[a][1] = k.asSorting[0];
                    c = 0;
                    for (d = k.asSorting.length; c < d; c++)
                        if (e.aaSorting[a][1] == k.asSorting[c]) {
                            e.aaSorting[a][2] = c;
                            break
                        }
                }
                T(e);
                a = i(">thead", this);
                if (a.length === 0) {
                    a = [p.createElement("thead")];
                    this.appendChild(a[0])
                }
                e.nTHead = a[0];
                a = i(">tbody", this);
                if (a.length === 0) {
                    a = [p.createElement("tbody")];
                    this.appendChild(a[0])
                }
                e.nTBody = a[0];
                a = i(">tfoot", this);
                if (a.length > 0) {
                    e.nTFoot = a[0];
                    W(e.aoFooter, e.nTFoot)
                }
                if (j)
                    for (a = 0; a < g.aaData.length; a++) v(e, g.aaData[a]);
                else Y(e);
                e.aiDisplay = e.aiDisplayMaster.slice();
                e.bInitialised = true;
                h === false && s(e)
            }
        })
    }
})(jQuery, window, document);
(function(d) {
    var a = location.href.replace(/#.*/, "");
    var c = d.localScroll = function(e) {
        d("body").localScroll(e)
    };
    c.defaults = {
        duration: 1000,
        axis: "y",
        event: "click",
        stop: true,
        target: window,
        reset: true
    };
    c.hash = function(f) {
        if (location.hash) {
            f = d.extend({}, c.defaults, f);
            f.hash = false;
            if (f.reset) {
                var g = f.duration;
                delete f.duration;
                d(f.target).scrollTo(0, f);
                f.duration = g
            }
            b(0, location, f)
        }
    };
    d.fn.localScroll = function(e) {
        e = d.extend({}, c.defaults, e);
        return e.lazy ? this.bind(e.event, function(g) {
            var h = d([g.target, g.target.parentNode]).filter(f)[0];
            if (h) {
                b(g, h, e)
            }
        }) : this.find("a,area").filter(f).bind(e.event, function(g) {
            b(g, this, e)
        }).end().end();

        function f() {
            return !!this.href && !!this.hash && this.href.replace(this.hash, "") == a && (!e.filter || d(this).is(e.filter))
        }
    };

    function b(i, p, g) {
        var q = p.hash.slice(1),
            o = document.getElementById(q) || document.getElementsByName(q)[0];
        if (!o) {
            return
        }
        if (i) {
            i.preventDefault()
        }
        var n = d(g.target);
        if (g.lock && n.is(":animated") || g.onBefore && g.onBefore.call(g, i, o, n) === false) {
            return
        }
        if (g.stop) {
            n.stop(true)
        }
        if (g.hash) {
            var m = o.id == q ? "id" : "name",
                l = d("<a> </a>").attr(m, q).css({
                    position: "absolute",
                    top: d(window).scrollTop(),
                    left: d(window).scrollLeft()
                });
            o[m] = "";
            d("body").prepend(l);
            location = p.hash;
            l.remove();
            o[m] = q
        }
        n.scrollTo(o, g).trigger("notify.serialScroll", [o])
    }
})(jQuery);
(function(a) {
    a.jGrowl = function(b, c) {
        if (a("#jGrowl").size() == 0) {
            a('<div id="jGrowl"></div>').addClass((c && c.position) ? c.position : a.jGrowl.defaults.position).appendTo("body")
        }
        a("#jGrowl").jGrowl(b, c)
    };
    a.fn.jGrowl = function(b, d) {
        if (a.isFunction(this.each)) {
            var c = arguments;
            return this.each(function() {
                var e = this;
                if (a(this).data("jGrowl.instance") == undefined) {
                    a(this).data("jGrowl.instance", a.extend(new a.fn.jGrowl(), {
                        notifications: [],
                        element: null,
                        interval: null
                    }));
                    a(this).data("jGrowl.instance").startup(this)
                }
                if (a.isFunction(a(this).data("jGrowl.instance")[b])) {
                    a(this).data("jGrowl.instance")[b].apply(a(this).data("jGrowl.instance"), a.makeArray(c).slice(1))
                } else {
                    a(this).data("jGrowl.instance").create(b, d)
                }
            })
        }
    };
    a.extend(a.fn.jGrowl.prototype, {
        defaults: {
            pool: 5,
            header: "",
            group: "",
            sticky: false,
            position: "top-right",
            glue: "after",
            theme: "default",
            themeState: "highlight",
            corners: "10px",
            check: 250,
            life: 3000,
            closeDuration: "normal",
            openDuration: "normal",
            easing: "swing",
            closer: true,
            closeTemplate: "&times;",
            closerTemplate: "<div>[ close all ]</div>",
            log: function(c, b, d) {},
            beforeOpen: function(c, b, d) {},
            afterOpen: function(c, b, d) {},
            open: function(c, b, d) {},
            beforeClose: function(c, b, d) {},
            close: function(c, b, d) {},
            animateOpen: {
                opacity: "show"
            },
            animateClose: {
                opacity: "hide"
            }
        },
        notifications: [],
        element: null,
        interval: null,
        create: function(b, c) {
            var c = a.extend({}, this.defaults, c);
            if (typeof c.speed !== "undefined") {
                c.openDuration = c.speed;
                c.closeDuration = c.speed
            }
            this.notifications.push({
                message: b,
                options: c
            });
            c.log.apply(this.element, [this.element, b, c])
        },
        render: function(d) {
            var b = this;
            var c = d.message;
            var e = d.options;
            var d = a('<div class="jGrowl-notification ' + e.themeState + " ui-corner-all" + ((e.group != undefined && e.group != "") ? " " + e.group : "") + '"><div class="jGrowl-close">' + e.closeTemplate + '</div><div class="jGrowl-header">' + e.header + '</div><div class="jGrowl-message">' + c + "</div></div>").data("jGrowl", e).addClass(e.theme).children("div.jGrowl-close").bind("click.jGrowl", function() {
                a(this).parent().trigger("jGrowl.close")
            }).parent();
            a(d).bind("mouseover.jGrowl", function() {
                a("div.jGrowl-notification", b.element).data("jGrowl.pause", true)
            }).bind("mouseout.jGrowl", function() {
                a("div.jGrowl-notification", b.element).data("jGrowl.pause", false)
            }).bind("jGrowl.beforeOpen", function() {
                if (e.beforeOpen.apply(d, [d, c, e, b.element]) != false) {
                    a(this).trigger("jGrowl.open")
                }
            }).bind("jGrowl.open", function() {
                if (e.open.apply(d, [d, c, e, b.element]) != false) {
                    if (e.glue == "after") {
                        a("div.jGrowl-notification:last", b.element).after(d)
                    } else {
                        a("div.jGrowl-notification:first", b.element).before(d)
                    }
                    a(this).animate(e.animateOpen, e.openDuration, e.easing, function() {
                        if (a.browser.msie && (parseInt(a(this).css("opacity"), 10) === 1 || parseInt(a(this).css("opacity"), 10) === 0)) {
                            this.style.removeAttribute("filter")
                        }
                        a(this).data("jGrowl").created = new Date();
                        a(this).trigger("jGrowl.afterOpen")
                    })
                }
            }).bind("jGrowl.afterOpen", function() {
                e.afterOpen.apply(d, [d, c, e, b.element])
            }).bind("jGrowl.beforeClose", function() {
                if (e.beforeClose.apply(d, [d, c, e, b.element]) != false) {
                    a(this).trigger("jGrowl.close")
                }
            }).bind("jGrowl.close", function() {
                a(this).data("jGrowl.pause", true);
                a(this).animate(e.animateClose, e.closeDuration, e.easing, function() {
                    a(this).remove();
                    var f = e.close.apply(d, [d, c, e, b.element]);
                    if (a.isFunction(f)) {
                        f.apply(d, [d, c, e, b.element])
                    }
                })
            }).trigger("jGrowl.beforeOpen");
            if (e.corners != "" && a.fn.corner != undefined) {
                a(d).corner(e.corners)
            }
            if (a("div.jGrowl-notification:parent", b.element).size() > 1 && a("div.jGrowl-closer", b.element).size() == 0 && this.defaults.closer != false) {
                a(this.defaults.closerTemplate).addClass("jGrowl-closer ui-state-highlight ui-corner-all").addClass(this.defaults.theme).appendTo(b.element).animate(this.defaults.animateOpen, this.defaults.speed, this.defaults.easing).bind("click.jGrowl", function() {
                    a(this).siblings().trigger("jGrowl.beforeClose");
                    if (a.isFunction(b.defaults.closer)) {
                        b.defaults.closer.apply(a(this).parent()[0], [a(this).parent()[0]])
                    }
                })
            }
        },
        update: function() {
            a(this.element).find("div.jGrowl-notification:parent").each(function() {
                if (a(this).data("jGrowl") != undefined && a(this).data("jGrowl").created != undefined && (a(this).data("jGrowl").created.getTime() + parseInt(a(this).data("jGrowl").life)) < (new Date()).getTime() && a(this).data("jGrowl").sticky != true && (a(this).data("jGrowl.pause") == undefined || a(this).data("jGrowl.pause") != true)) {
                    a(this).trigger("jGrowl.beforeClose")
                }
            });
            if (this.notifications.length > 0 && (this.defaults.pool == 0 || a(this.element).find("div.jGrowl-notification:parent").size() < this.defaults.pool)) {
                this.render(this.notifications.shift())
            }
            if (a(this.element).find("div.jGrowl-notification:parent").size() < 2) {
                a(this.element).find("div.jGrowl-closer").animate(this.defaults.animateClose, this.defaults.speed, this.defaults.easing, function() {
                    a(this).remove()
                })
            }
        },
        startup: function(b) {
            this.element = a(b).addClass("jGrowl").append('<div class="jGrowl-notification"></div>');
            this.interval = setInterval(function() {
                a(b).data("jGrowl.instance").update()
            }, parseInt(this.defaults.check));
            if (a.browser.msie && parseInt(a.browser.version) < 7 && !window.XMLHttpRequest) {
                a(this.element).addClass("ie6")
            }
        },
        shutdown: function() {
            a(this.element).removeClass("jGrowl").find("div.jGrowl-notification").remove();
            clearInterval(this.interval)
        },
        close: function() {
            a(this.element).find("div.jGrowl-notification").each(function() {
                a(this).trigger("jGrowl.beforeClose")
            })
        }
    });
    a.jGrowl.defaults = a.fn.jGrowl.prototype.defaults
})(jQuery);
(function(c) {
    var a = c.scrollTo = function(d, f, g) {
        c(window).scrollTo(d, f, g)
    };
    a.defaults = {
        axis: "xy",
        duration: parseFloat(c.fn.jquery) >= 1.3 ? 0 : 1
    };
    a.window = function(d) {
        return c(window)._scrollable()
    };
    c.fn._scrollable = function() {
        return this.map(function() {
            var d = this,
                f = !d.nodeName || c.inArray(d.nodeName.toLowerCase(), ["iframe", "#document", "html", "body"]) != -1;
            if (!f) {
                return d
            }
            var g = (d.contentWindow || d).document || d.ownerDocument || d;
            return c.browser.safari || g.compatMode == "BackCompat" ? g.body : g.documentElement
        })
    };
    c.fn.scrollTo = function(f, e, d) {
        if (typeof e == "object") {
            d = e;
            e = 0
        }
        if (typeof d == "function") {
            d = {
                onAfter: d
            }
        }
        if (f == "max") {
            f = 9000000000
        }
        d = c.extend({}, a.defaults, d);
        e = e || d.speed || d.duration;
        d.queue = d.queue && d.axis.length > 1;
        if (d.queue) {
            e /= 2
        }
        d.offset = b(d.offset);
        d.over = b(d.over);
        return this._scrollable().each(function() {
            var n = this,
                l = c(n),
                m = f,
                j, k = {},
                h = l.is("html,body");
            switch (typeof m) {
                case "number":
                case "string":
                    if (/^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(m)) {
                        m = b(m);
                        break
                    }
                    m = c(m, this);
                case "object":
                    if (m.is || m.style) {
                        j = (m = c(m)).offset()
                    }
            }
            c.each(d.axis.split(""), function(q, r) {
                var t = r == "x" ? "Left" : "Top",
                    s = t.toLowerCase(),
                    v = "scroll" + t,
                    p = n[v],
                    g = a.max(n, r);
                if (j) {
                    k[v] = j[s] + (h ? 0 : p - l.offset()[s]);
                    if (d.margin) {
                        k[v] -= parseInt(m.css("margin" + t)) || 0;
                        k[v] -= parseInt(m.css("border" + t + "Width")) || 0
                    }
                    k[v] += d.offset[s] || 0;
                    if (d.over[s]) {
                        k[v] += m[r == "x" ? "width" : "height"]() * d.over[s]
                    }
                } else {
                    var u = m[s];
                    k[v] = u.slice && u.slice(-1) == "%" ? parseFloat(u) / 100 * g : u
                }
                if (/^\d+$/.test(k[v])) {
                    k[v] = k[v] <= 0 ? 0 : Math.min(k[v], g)
                }
                if (!q && d.queue) {
                    if (p != k[v]) {
                        i(d.onAfterFirst)
                    }
                    delete k[v]
                }
            });
            i(d.onAfter);

            function i(g) {
                l.animate(k, e, d.easing, g && function() {
                    g.call(this, f, d)
                })
            }
        }).end()
    };
    a.max = function(g, j) {
        var n = j == "x" ? "Width" : "Height",
            k = "scroll" + n;
        if (!c(g).is("html,body")) {
            return g[k] - c(g)[n.toLowerCase()]()
        }
        var o = "client" + n,
            f = g.ownerDocument.documentElement,
            d = g.ownerDocument.body;
        return Math.max(f[k], d[k]) - Math.min(f[o], d[o])
    };

    function b(d) {
        return typeof d == "object" ? d : {
            top: d,
            left: d
        }
    }
})(jQuery);
$.fn.sliderNav = function(b) {
    var f = {
        items: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"],
        debug: false,
        height: null,
        arrows: true
    };
    var e = $.extend(f, b);
    var g = $.meta ? $.extend({}, e, $$.data()) : e;
    var d = $(this);
    $(d).addClass("slider");
    $(".slider-content li:first", d).addClass("selected");
    $(d).append('<div class="slider-nav"><ul></ul></div>');
    for (var c in g.items) {
        $(".slider-nav ul", d).append("<li><a alt='#" + g.items[c] + "'>" + g.items[c] + "</a></li>")
    }
    var a = $(".slider-nav", d).height();
    if (g.height) {
        a = g.height
    }
    $(".slider-content, .slider-nav", d).css("height", a);
    if (g.debug) {
        $(d).append('<div id="debug">Scroll Offset: <span>0</span></div>')
    }
    $(".slider-nav a", d).mouseover(function(k) {
        var m = $(this).attr("alt");
        var i = $(".slider-content", d).offset().top;
        var j = $(".slider-content " + m, d).offset().top;
        var h = $(".slider-nav", d).height();
        if (g.height) {
            h = g.height
        }
        var l = (j - i) - h / 8;
        $(".slider-content li", d).removeClass("selected");
        $(m).addClass("selected");
        $(".slider-content", d).stop().animate({
            scrollTop: "+=" + l + "px"
        });
        if (g.debug) {
            $("#debug span", d).html(j)
        }
    });
    if (g.arrows) {
        $(".slider-nav", d).css("top", "20px");
        $(d).prepend('<div class="slide-up end"><span class="arrow up"></span></div>');
        $(d).append('<div class="slide-down"><span class="arrow down"></span></div>');
        $(".slide-down", d).click(function() {
            $(".slider-content", d).animate({
                scrollTop: "+=" + a + "px"
            }, 500)
        });
        $(".slide-up", d).click(function() {
            $(".slider-content", d).animate({
                scrollTop: "-=" + a + "px"
            }, 500)
        })
    }
};
/*
 *  SliderNav - A Simple Content Slider with a Navigation Bar
 *  Copyright 2010 Monjurul Dolon, http://mdolon.com/
 *  Released under the MIT, BSD, and GPL Licenses.
 *  More information: http://devgrow.com/slidernav
 */
$.fn.sliderNav = function(options) {
    var defaults = {
        items: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"],
        debug: false,
        height: null,
        arrows: true
    };
    var opts = $.extend(defaults, options);
    var o = $.meta ? $.extend({}, opts, $$.data()) : opts;
    var slider = $(this);
    $(slider).addClass('slider');
    $('.slider-content li:first', slider).addClass('selected');
    $(slider).append('<div class="slider-nav"><ul></ul></div>');
    for (var i in o.items) $('.slider-nav ul', slider).append("<li><a alt='#" + o.items[i] + "'>" + o.items[i] + "</a></li>");
    var height = $('.slider-nav', slider).height();
    if (o.height) height = o.height;
    $('.slider-content, .slider-nav', slider).css('height', height);
    if (o.debug) $(slider).append('<div id="debug">Scroll Offset: <span>0</span></div>');
    $('.slider-nav a', slider).mouseover(function(event) {
        var target = $(this).attr('alt');
        var cOffset = $('.slider-content', slider).offset().top;
        var tOffset = $('.slider-content ' + target, slider).offset().top;
        var height = $('.slider-nav', slider).height();
        if (o.height) height = o.height;
        var pScroll = (tOffset - cOffset) - height / 8;
        $('.slider-content li', slider).removeClass('selected');
        $(target).addClass('selected');
        $('.slider-content', slider).stop().animate({
            scrollTop: '+=' + pScroll + 'px'
        });
        if (o.debug) $('#debug span', slider).html(tOffset);
    });
    if (o.arrows) {
        $('.slider-nav', slider).css('top', '20px');
        $(slider).prepend('<div class="slide-up end"><span class="arrow up"></span></div>');
        $(slider).append('<div class="slide-down"><span class="arrow down"></span></div>');
        $('.slide-down', slider).click(function() {
            $('.slider-content', slider).animate({
                scrollTop: "+=" + height + "px"
            }, 500);
        });
        $('.slide-up', slider).click(function() {
            $('.slider-content', slider).animate({
                scrollTop: "-=" + height + "px"
            }, 500);
        });
    }
};
(function(c) {
    function a(d) {
        if (d.attr("title") || typeof(d.attr("original-title")) != "string") {
            d.attr("original-title", d.attr("title") || "").removeAttr("title")
        }
    }

    function b(e, d) {
        this.$element = c(e);
        this.options = d;
        this.enabled = true;
        a(this.$element)
    }
    b.prototype = {
        show: function() {
            var g = this.getTitle();
            if (g && this.enabled) {
                var f = this.tip();
                f.find(".tipsy-inner")[this.options.html ? "html" : "text"](g);
                f[0].className = "tipsy";
                f.remove().css({
                    top: 0,
                    left: 0,
                    visibility: "hidden",
                    display: "block"
                }).appendTo(document.body);
                var j = c.extend({}, this.$element.offset(), {
                    width: this.$element[0].offsetWidth,
                    height: this.$element[0].offsetHeight
                });
                var d = f[0].offsetWidth,
                    i = f[0].offsetHeight;
                var h = (typeof this.options.gravity == "function") ? this.options.gravity.call(this.$element[0]) : this.options.gravity;
                var e;
                switch (h.charAt(0)) {
                    case "n":
                        e = {
                            top: j.top + j.height + this.options.offset,
                            left: j.left + j.width / 2 - d / 2
                        };
                        break;
                    case "s":
                        e = {
                            top: j.top - i - this.options.offset,
                            left: j.left + j.width / 2 - d / 2
                        };
                        break;
                    case "e":
                        e = {
                            top: j.top + j.height / 2 - i / 2,
                            left: j.left - d - this.options.offset
                        };
                        break;
                    case "w":
                        e = {
                            top: j.top + j.height / 2 - i / 2,
                            left: j.left + j.width + this.options.offset
                        };
                        break
                }
                if (h.length == 2) {
                    if (h.charAt(1) == "w") {
                        e.left = j.left + j.width / 2 - 15
                    } else {
                        e.left = j.left + j.width / 2 - d + 15
                    }
                }
                f.css(e).addClass("tipsy-" + h);
                if (this.options.fade) {
                    f.stop().css({
                        opacity: 0,
                        display: "block",
                        visibility: "visible"
                    }).animate({
                        opacity: this.options.opacity
                    })
                } else {
                    f.css({
                        visibility: "visible",
                        opacity: this.options.opacity
                    })
                }
            }
        },
        hide: function() {
            if (this.options.fade) {
                this.tip().stop().fadeOut(function() {
                    c(this).remove()
                })
            } else {
                this.tip().remove()
            }
        },
        getTitle: function() {
            var f, d = this.$element,
                e = this.options;
            a(d);
            var f, e = this.options;
            if (typeof e.title == "string") {
                f = d.attr(e.title == "title" ? "original-title" : e.title)
            } else {
                if (typeof e.title == "function") {
                    f = e.title.call(d[0])
                }
            }
            f = ("" + f).replace(/(^\s*|\s*$)/, "");
            return f || e.fallback
        },
        tip: function() {
            if (!this.$tip) {
                this.$tip = c('<div class="tipsy"></div>').html('<div class="tipsy-arrow"></div><div class="tipsy-inner"/></div>')
            }
            return this.$tip
        },
        validate: function() {
            if (!this.$element[0].parentNode) {
                this.hide()
            }
        },
        enable: function() {
            this.enabled = true
        },
        disable: function() {
            this.enabled = false
        },
        toggleEnabled: function() {
            this.enabled = !this.enabled
        }
    };
    c.fn.tipsy = function(h) {
        if (h === true) {
            return this.data("tipsy")
        } else {
            if (typeof h == "string") {
                return this.data("tipsy")[h]()
            }
        }
        h = c.extend({}, c.fn.tipsy.defaults, h);

        function g(k) {
            var l = c.data(k, "tipsy");
            if (!l) {
                l = new b(k, c.fn.tipsy.elementOptions(k, h));
                c.data(k, "tipsy", l)
            }
            return l
        }

        function j() {
            var k = g(this);
            k.hoverState = "in";
            if (h.delayIn == 0) {
                k.show()
            } else {
                setTimeout(function() {
                    if (k.hoverState == "in") {
                        k.show()
                    }
                }, h.delayIn)
            }
        }

        function f() {
            var k = g(this);
            k.hoverState = "out";
            if (h.delayOut == 0) {
                k.hide()
            } else {
                setTimeout(function() {
                    if (k.hoverState == "out") {
                        k.hide()
                    }
                }, h.delayOut)
            }
        }
        if (!h.live) {
            this.each(function() {
                g(this)
            })
        }
        if (h.trigger != "manual") {
            var d = h.live ? "live" : "bind",
                i = h.trigger == "hover" ? "mouseenter" : "focus",
                e = h.trigger == "hover" ? "mouseleave" : "blur";
            this[d](i, j)[d](e, f)
        }
        return this
    };
    c.fn.tipsy.defaults = {
        delayIn: 0,
        delayOut: 0,
        fade: false,
        fallback: "",
        gravity: "n",
        html: false,
        live: false,
        offset: 0,
        opacity: 0.8,
        title: "title",
        trigger: "hover"
    };
    c.fn.tipsy.elementOptions = function(e, d) {
        return c.metadata ? c.extend({}, d, c(e).metadata()) : d
    };
    c.fn.tipsy.autoNS = function() {
        return c(this).offset().top > (c(document).scrollTop() + c(window).height() / 2) ? "s" : "n"
    };
    c.fn.tipsy.autoWE = function() {
        return c(this).offset().left > (c(document).scrollLeft() + c(window).width() / 2) ? "e" : "w"
    }
})(jQuery);
(function(a) {
    a.uniform = {
        options: {
            selectClass: "selector",
            radioClass: "radio",
            checkboxClass: "checker",
            fileClass: "uploader",
            filenameClass: "filename",
            fileBtnClass: "action",
            fileDefaultText: "No file selected",
            fileBtnText: "Choose File",
            checkedClass: "checked",
            focusClass: "focus",
            disabledClass: "disabled",
            buttonClass: "uniform-button",
            activeClass: "active",
            hoverClass: "hover",
            useID: true,
            idPrefix: "uniform",
            resetSelector: false,
            autoHide: true
        },
        elements: []
    };
    if (a.browser.msie && a.browser.version < 7) {
        a.support.selectOpacity = false
    } else {
        a.support.selectOpacity = true
    }
    a.fn.uniform = function(k) {
        k = a.extend(a.uniform.options, k);
        var d = this;
        if (k.resetSelector != false) {
            a(k.resetSelector).mouseup(function() {
                function l() {
                    a.uniform.update(d)
                }
                setTimeout(l, 10)
            })
        }

        function j(l) {
            $el = a(l);
            $el.addClass($el.attr("type"));
            b(l)
        }

        function g(l) {
            a(l).addClass("uniform");
            b(l)
        }

        function i(o) {
            var m = a(o);
            var p = a("<div>"),
                l = a("<span>");
            p.addClass(k.buttonClass);
            if (k.useID && m.attr("id") != "") {
                p.attr("id", k.idPrefix + "-" + m.attr("id"))
            }
            var n;
            if (m.is("a") || m.is("button")) {
                n = m.text()
            } else {
                if (m.is(":submit") || m.is(":reset") || m.is("input[type=button]")) {
                    n = m.attr("value")
                }
            }
            n = n == "" ? m.is(":reset") ? "Reset" : "Submit" : n;
            l.html(n);
            m.css("opacity", 0);
            m.wrap(p);
            m.wrap(l);
            p = m.closest("div");
            l = m.closest("span");
            if (m.is(":disabled")) {
                p.addClass(k.disabledClass)
            }
            p.bind({
                "mouseenter.uniform": function() {
                    p.addClass(k.hoverClass)
                },
                "mouseleave.uniform": function() {
                    p.removeClass(k.hoverClass);
                    p.removeClass(k.activeClass)
                },
                "mousedown.uniform touchbegin.uniform": function() {
                    p.addClass(k.activeClass)
                },
                "mouseup.uniform touchend.uniform": function() {
                    p.removeClass(k.activeClass)
                },
                "click.uniform touchend.uniform": function(r) {
                    if (a(r.target).is("span") || a(r.target).is("div")) {
                        if (o[0].dispatchEvent) {
                            var q = document.createEvent("MouseEvents");
                            q.initEvent("click", true, true);
                            o[0].dispatchEvent(q)
                        } else {
                            o[0].click()
                        }
                    }
                }
            });
            o.bind({
                "focus.uniform": function() {
                    p.addClass(k.focusClass)
                },
                "blur.uniform": function() {
                    p.removeClass(k.focusClass)
                }
            });
            a.uniform.noSelect(p);
            b(o)
        }

        function e(o) {
            var m = a(o);
            var p = a("<div />"),
                l = a("<span />");
            if (!m.css("display") == "none" && k.autoHide) {
                p.hide()
            }
            p.addClass(k.selectClass);
            if (k.useID && o.attr("id") != "") {
                p.attr("id", k.idPrefix + "-" + o.attr("id"))
            }
            var n = o.find(":selected:first");
            if (n.length == 0) {
                n = o.find("option:first")
            }
            l.html(n.html());
            o.css("opacity", 0);
            o.wrap(p);
            o.before(l);
            p = o.parent("div");
            l = o.siblings("span");
            o.bind({
                "change.uniform": function() {
                    l.text(o.find(":selected").html());
                    p.removeClass(k.activeClass)
                },
                "focus.uniform": function() {
                    p.addClass(k.focusClass)
                },
                "blur.uniform": function() {
                    p.removeClass(k.focusClass);
                    p.removeClass(k.activeClass)
                },
                "mousedown.uniform touchbegin.uniform": function() {
                    p.addClass(k.activeClass)
                },
                "mouseup.uniform touchend.uniform": function() {
                    p.removeClass(k.activeClass)
                },
                "click.uniform touchend.uniform": function() {
                    p.removeClass(k.activeClass)
                },
                "mouseenter.uniform": function() {
                    p.addClass(k.hoverClass)
                },
                "mouseleave.uniform": function() {
                    p.removeClass(k.hoverClass);
                    p.removeClass(k.activeClass)
                },
                "keyup.uniform": function() {
                    l.text(o.find(":selected").html())
                }
            });
            if (a(o).attr("disabled")) {
                p.addClass(k.disabledClass)
            }
            a.uniform.noSelect(l);
            b(o)
        }

        function f(n) {
            var m = a(n);
            var o = a("<div />"),
                l = a("<span />");
            if (!m.css("display") == "none" && k.autoHide) {
                o.hide()
            }
            o.addClass(k.checkboxClass);
            if (k.useID && n.attr("id") != "") {
                o.attr("id", k.idPrefix + "-" + n.attr("id"))
            }
            a(n).wrap(o);
            a(n).wrap(l);
            l = n.parent();
            o = l.parent();
            a(n).css("opacity", 0).bind({
                "focus.uniform": function() {
                    o.addClass(k.focusClass)
                },
                "blur.uniform": function() {
                    o.removeClass(k.focusClass)
                },
                "click.uniform touchend.uniform": function() {
                    if (!a(n).attr("checked")) {
                        l.removeClass(k.checkedClass)
                    } else {
                        l.addClass(k.checkedClass)
                    }
                },
                "mousedown.uniform touchbegin.uniform": function() {
                    o.addClass(k.activeClass)
                },
                "mouseup.uniform touchend.uniform": function() {
                    o.removeClass(k.activeClass)
                },
                "mouseenter.uniform": function() {
                    o.addClass(k.hoverClass)
                },
                "mouseleave.uniform": function() {
                    o.removeClass(k.hoverClass);
                    o.removeClass(k.activeClass)
                }
            });
            if (a(n).attr("checked")) {
                l.addClass(k.checkedClass)
            }
            if (a(n).attr("disabled")) {
                o.addClass(k.disabledClass)
            }
            b(n)
        }

        function c(n) {
            var m = a(n);
            var o = a("<div />"),
                l = a("<span />");
            if (!m.css("display") == "none" && k.autoHide) {
                o.hide()
            }
            o.addClass(k.radioClass);
            if (k.useID && n.attr("id") != "") {
                o.attr("id", k.idPrefix + "-" + n.attr("id"))
            }
            a(n).wrap(o);
            a(n).wrap(l);
            l = n.parent();
            o = l.parent();
            a(n).css("opacity", 0).bind({
                "focus.uniform": function() {
                    o.addClass(k.focusClass)
                },
                "blur.uniform": function() {
                    o.removeClass(k.focusClass)
                },
                "click.uniform touchend.uniform": function() {
                    if (!a(n).attr("checked")) {
                        l.removeClass(k.checkedClass)
                    } else {
                        var p = k.radioClass.split(" ")[0];
                        a("." + p + " span." + k.checkedClass + ":has([name='" + a(n).attr("name") + "'])").removeClass(k.checkedClass);
                        l.addClass(k.checkedClass)
                    }
                },
                "mousedown.uniform touchend.uniform": function() {
                    if (!a(n).is(":disabled")) {
                        o.addClass(k.activeClass)
                    }
                },
                "mouseup.uniform touchbegin.uniform": function() {
                    o.removeClass(k.activeClass)
                },
                "mouseenter.uniform touchend.uniform": function() {
                    o.addClass(k.hoverClass)
                },
                "mouseleave.uniform": function() {
                    o.removeClass(k.hoverClass);
                    o.removeClass(k.activeClass)
                }
            });
            if (a(n).attr("checked")) {
                l.addClass(k.checkedClass)
            }
            if (a(n).attr("disabled")) {
                o.addClass(k.disabledClass)
            }
            b(n)
        }

        function h(q) {
            var o = a(q);
            var r = a("<div />"),
                p = a("<span>" + k.fileDefaultText + "</span>"),
                m = a("<span>" + k.fileBtnText + "</span>");
            if (!o.css("display") == "none" && k.autoHide) {
                r.hide()
            }
            r.addClass(k.fileClass);
            p.addClass(k.filenameClass);
            m.addClass(k.fileBtnClass);
            if (k.useID && o.attr("id") != "") {
                r.attr("id", k.idPrefix + "-" + o.attr("id"))
            }
            o.wrap(r);
            o.after(m);
            o.after(p);
            r = o.closest("div");
            p = o.siblings("." + k.filenameClass);
            m = o.siblings("." + k.fileBtnClass);
            if (!o.attr("size")) {
                var l = r.width();
                o.attr("size", l / 10)
            }
            var n = function() {
                var s = o.val();
                if (s === "") {
                    s = k.fileDefaultText
                } else {
                    s = s.split(/[\/\\]+/);
                    s = s[(s.length - 1)]
                }
                p.text(s)
            };
            n();
            o.css("opacity", 0).bind({
                "focus.uniform": function() {
                    r.addClass(k.focusClass)
                },
                "blur.uniform": function() {
                    r.removeClass(k.focusClass)
                },
                "mousedown.uniform": function() {
                    if (!a(q).is(":disabled")) {
                        r.addClass(k.activeClass)
                    }
                },
                "mouseup.uniform": function() {
                    r.removeClass(k.activeClass)
                },
                "mouseenter.uniform": function() {
                    r.addClass(k.hoverClass)
                },
                "mouseleave.uniform": function() {
                    r.removeClass(k.hoverClass);
                    r.removeClass(k.activeClass)
                }
            });
            if (a.browser.msie) {
                o.bind("click.uniform.ie7", function() {
                    setTimeout(n, 0)
                })
            } else {
                o.bind("change.uniform", n)
            }
            if (o.attr("disabled")) {
                r.addClass(k.disabledClass)
            }
            a.uniform.noSelect(p);
            a.uniform.noSelect(m);
            b(q)
        }
        a.uniform.restore = function(l) {
            if (l == undefined) {
                l = a(a.uniform.elements)
            }
            a(l).each(function() {
                if (a(this).is(":checkbox")) {
                    a(this).unwrap().unwrap()
                } else {
                    if (a(this).is("select")) {
                        a(this).siblings("span").remove();
                        a(this).unwrap()
                    } else {
                        if (a(this).is(":radio")) {
                            a(this).unwrap().unwrap()
                        } else {
                            if (a(this).is(":file")) {
                                a(this).siblings("span").remove();
                                a(this).unwrap()
                            } else {
                                if (a(this).is("button, :submit, :reset, a, input[type='button']")) {
                                    a(this).unwrap().unwrap()
                                }
                            }
                        }
                    }
                }
                a(this).unbind(".uniform");
                a(this).css("opacity", "1");
                var m = a.inArray(a(l), a.uniform.elements);
                a.uniform.elements.splice(m, 1)
            })
        };

        function b(l) {
            l = a(l).get();
            if (l.length > 1) {
                a.each(l, function(m, n) {
                    a.uniform.elements.push(n)
                })
            } else {
                a.uniform.elements.push(l)
            }
        }
        a.uniform.noSelect = function(l) {
            function m() {
                return false
            }
            a(l).each(function() {
                this.onselectstart = this.ondragstart = m;
                a(this).mousedown(m).css({
                    MozUserSelect: "none"
                })
            })
        };
        a.uniform.update = function(l) {
            if (l == undefined) {
                l = a(a.uniform.elements)
            }
            l = a(l);
            l.each(function() {
                var n = a(this);
                if (n.is("select")) {
                    var m = n.siblings("span");
                    var p = n.parent("div");
                    p.removeClass(k.hoverClass + " " + k.focusClass + " " + k.activeClass);
                    m.html(n.find(":selected").html());
                    if (n.is(":disabled")) {
                        p.addClass(k.disabledClass)
                    } else {
                        p.removeClass(k.disabledClass)
                    }
                } else {
                    if (n.is(":checkbox")) {
                        var m = n.closest("span");
                        var p = n.closest("div");
                        p.removeClass(k.hoverClass + " " + k.focusClass + " " + k.activeClass);
                        m.removeClass(k.checkedClass);
                        if (n.is(":checked")) {
                            m.addClass(k.checkedClass)
                        }
                        if (n.is(":disabled")) {
                            p.addClass(k.disabledClass)
                        } else {
                            p.removeClass(k.disabledClass)
                        }
                    } else {
                        if (n.is(":radio")) {
                            var m = n.closest("span");
                            var p = n.closest("div");
                            p.removeClass(k.hoverClass + " " + k.focusClass + " " + k.activeClass);
                            m.removeClass(k.checkedClass);
                            if (n.is(":checked")) {
                                m.addClass(k.checkedClass)
                            }
                            if (n.is(":disabled")) {
                                p.addClass(k.disabledClass)
                            } else {
                                p.removeClass(k.disabledClass)
                            }
                        } else {
                            if (n.is(":file")) {
                                var p = n.parent("div");
                                var o = n.siblings(k.filenameClass);
                                btnTag = n.siblings(k.fileBtnClass);
                                p.removeClass(k.hoverClass + " " + k.focusClass + " " + k.activeClass);
                                o.text(n.val());
                                if (n.is(":disabled")) {
                                    p.addClass(k.disabledClass)
                                } else {
                                    p.removeClass(k.disabledClass)
                                }
                            } else {
                                if (n.is(":submit") || n.is(":reset") || n.is("button") || n.is("a") || l.is("input[type=button]")) {
                                    var p = n.closest("div");
                                    p.removeClass(k.hoverClass + " " + k.focusClass + " " + k.activeClass);
                                    if (n.is(":disabled")) {
                                        p.addClass(k.disabledClass)
                                    } else {
                                        p.removeClass(k.disabledClass)
                                    }
                                }
                            }
                        }
                    }
                }
            })
        };
        return this.each(function() {
            if (a.support.selectOpacity) {
                var l = a(this);
                if (l.is("select")) {
                    if (l.attr("multiple") != true) {
                        if (l.attr("size") == undefined || l.attr("size") <= 1) {
                            e(l)
                        }
                    }
                } else {
                    if (l.is(":checkbox")) {
                        f(l)
                    } else {
                        if (l.is(":radio")) {
                            c(l)
                        } else {
                            if (l.is(":file")) {
                                h(l)
                            } else {
                                if (l.is(":text, :password, input[type='email']")) {
                                    j(l)
                                } else {
                                    if (l.is("textarea")) {
                                        g(l)
                                    } else {
                                        if (l.is("a") || l.is(":submit") || l.is(":reset") || l.is("button") || l.is("input[type=button]")) {
                                            i(l)
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        })
    }
})(jQuery);
(function(a) {
    a.uniform = {
        options: {
            selectClass: "selector",
            radioClass: "radio",
            checkboxClass: "checker",
            fileClass: "uploader",
            filenameClass: "filename",
            fileBtnClass: "action",
            fileDefaultText: "No file selected",
            fileBtnText: "Choose File",
            checkedClass: "checked",
            focusClass: "focus",
            disabledClass: "disabled",
            buttonClass: "uniform-button",
            activeClass: "active",
            hoverClass: "hover",
            useID: true,
            idPrefix: "uniform",
            resetSelector: false,
            autoHide: true
        },
        elements: []
    };
    if (a.browser.msie && a.browser.version < 7) {
        a.support.selectOpacity = false
    } else {
        a.support.selectOpacity = true
    }
    a.fn.uniform = function(k) {
        k = a.extend(a.uniform.options, k);
        var d = this;
        if (k.resetSelector != false) {
            a(k.resetSelector).mouseup(function() {
                function l() {
                    a.uniform.update(d)
                }
                setTimeout(l, 10)
            })
        }

        function j(l) {
            $el = a(l);
            $el.addClass($el.attr("type"));
            b(l)
        }

        function g(l) {
            a(l).addClass("uniform");
            b(l)
        }

        function i(o) {
            var m = a(o);
            var p = a("<div>"),
                l = a("<span>");
            p.addClass(k.buttonClass);
            if (k.useID && m.attr("id") != "") {
                p.attr("id", k.idPrefix + "-" + m.attr("id"))
            }
            var n;
            if (m.is("a") || m.is("button")) {
                n = m.text()
            } else {
                if (m.is(":submit") || m.is(":reset") || m.is("input[type=button]")) {
                    n = m.attr("value")
                }
            }
            n = n == "" ? m.is(":reset") ? "Reset" : "Submit" : n;
            l.html(n);
            m.css("opacity", 0);
            m.wrap(p);
            m.wrap(l);
            p = m.closest("div");
            l = m.closest("span");
            if (m.is(":disabled")) {
                p.addClass(k.disabledClass)
            }
            p.bind({
                "mouseenter.uniform": function() {
                    p.addClass(k.hoverClass)
                },
                "mouseleave.uniform": function() {
                    p.removeClass(k.hoverClass);
                    p.removeClass(k.activeClass)
                },
                "mousedown.uniform touchbegin.uniform": function() {
                    p.addClass(k.activeClass)
                },
                "mouseup.uniform touchend.uniform": function() {
                    p.removeClass(k.activeClass)
                },
                "click.uniform touchend.uniform": function(r) {
                    if (a(r.target).is("span") || a(r.target).is("div")) {
                        if (o[0].dispatchEvent) {
                            var q = document.createEvent("MouseEvents");
                            q.initEvent("click", true, true);
                            o[0].dispatchEvent(q)
                        } else {
                            o[0].click()
                        }
                    }
                }
            });
            o.bind({
                "focus.uniform": function() {
                    p.addClass(k.focusClass)
                },
                "blur.uniform": function() {
                    p.removeClass(k.focusClass)
                }
            });
            a.uniform.noSelect(p);
            b(o)
        }

        function e(o) {
            var m = a(o);
            var p = a("<div />"),
                l = a("<span />");
            if (!m.css("display") == "none" && k.autoHide) {
                p.hide()
            }
            p.addClass(k.selectClass);
            if (k.useID && o.attr("id") != "") {
                p.attr("id", k.idPrefix + "-" + o.attr("id"))
            }
            var n = o.find(":selected:first");
            if (n.length == 0) {
                n = o.find("option:first")
            }
            l.html(n.html());
            o.css("opacity", 0);
            o.wrap(p);
            o.before(l);
            p = o.parent("div");
            l = o.siblings("span");
            o.bind({
                "change.uniform": function() {
                    l.text(o.find(":selected").html());
                    p.removeClass(k.activeClass)
                },
                "focus.uniform": function() {
                    p.addClass(k.focusClass)
                },
                "blur.uniform": function() {
                    p.removeClass(k.focusClass);
                    p.removeClass(k.activeClass)
                },
                "mousedown.uniform touchbegin.uniform": function() {
                    p.addClass(k.activeClass)
                },
                "mouseup.uniform touchend.uniform": function() {
                    p.removeClass(k.activeClass)
                },
                "click.uniform touchend.uniform": function() {
                    p.removeClass(k.activeClass)
                },
                "mouseenter.uniform": function() {
                    p.addClass(k.hoverClass)
                },
                "mouseleave.uniform": function() {
                    p.removeClass(k.hoverClass);
                    p.removeClass(k.activeClass)
                },
                "keyup.uniform": function() {
                    l.text(o.find(":selected").html())
                }
            });
            if (a(o).attr("disabled")) {
                p.addClass(k.disabledClass)
            }
            a.uniform.noSelect(l);
            b(o)
        }

        function f(n) {
            var m = a(n);
            var o = a("<div />"),
                l = a("<span />");
            if (!m.css("display") == "none" && k.autoHide) {
                o.hide()
            }
            o.addClass(k.checkboxClass);
            if (k.useID && n.attr("id") != "") {
                o.attr("id", k.idPrefix + "-" + n.attr("id"))
            }
            a(n).wrap(o);
            a(n).wrap(l);
            l = n.parent();
            o = l.parent();
            a(n).css("opacity", 0).bind({
                "focus.uniform": function() {
                    o.addClass(k.focusClass)
                },
                "blur.uniform": function() {
                    o.removeClass(k.focusClass)
                },
                "click.uniform touchend.uniform": function() {
                    if (!a(n).attr("checked")) {
                        l.removeClass(k.checkedClass)
                    } else {
                        l.addClass(k.checkedClass)
                    }
                },
                "mousedown.uniform touchbegin.uniform": function() {
                    o.addClass(k.activeClass)
                },
                "mouseup.uniform touchend.uniform": function() {
                    o.removeClass(k.activeClass)
                },
                "mouseenter.uniform": function() {
                    o.addClass(k.hoverClass)
                },
                "mouseleave.uniform": function() {
                    o.removeClass(k.hoverClass);
                    o.removeClass(k.activeClass)
                }
            });
            if (a(n).attr("checked")) {
                l.addClass(k.checkedClass)
            }
            if (a(n).attr("disabled")) {
                o.addClass(k.disabledClass)
            }
            b(n)
        }

        function c(n) {
            var m = a(n);
            var o = a("<div />"),
                l = a("<span />");
            if (!m.css("display") == "none" && k.autoHide) {
                o.hide()
            }
            o.addClass(k.radioClass);
            if (k.useID && n.attr("id") != "") {
                o.attr("id", k.idPrefix + "-" + n.attr("id"))
            }
            a(n).wrap(o);
            a(n).wrap(l);
            l = n.parent();
            o = l.parent();
            a(n).css("opacity", 0).bind({
                "focus.uniform": function() {
                    o.addClass(k.focusClass)
                },
                "blur.uniform": function() {
                    o.removeClass(k.focusClass)
                },
                "click.uniform touchend.uniform": function() {
                    if (!a(n).attr("checked")) {
                        l.removeClass(k.checkedClass)
                    } else {
                        var p = k.radioClass.split(" ")[0];
                        a("." + p + " span." + k.checkedClass + ":has([name='" + a(n).attr("name") + "'])").removeClass(k.checkedClass);
                        l.addClass(k.checkedClass)
                    }
                },
                "mousedown.uniform touchend.uniform": function() {
                    if (!a(n).is(":disabled")) {
                        o.addClass(k.activeClass)
                    }
                },
                "mouseup.uniform touchbegin.uniform": function() {
                    o.removeClass(k.activeClass)
                },
                "mouseenter.uniform touchend.uniform": function() {
                    o.addClass(k.hoverClass)
                },
                "mouseleave.uniform": function() {
                    o.removeClass(k.hoverClass);
                    o.removeClass(k.activeClass)
                }
            });
            if (a(n).attr("checked")) {
                l.addClass(k.checkedClass)
            }
            if (a(n).attr("disabled")) {
                o.addClass(k.disabledClass)
            }
            b(n)
        }

        function h(q) {
            var o = a(q);
            var r = a("<div />"),
                p = a("<span>" + k.fileDefaultText + "</span>"),
                m = a("<span>" + k.fileBtnText + "</span>");
            if (!o.css("display") == "none" && k.autoHide) {
                r.hide()
            }
            r.addClass(k.fileClass);
            p.addClass(k.filenameClass);
            m.addClass(k.fileBtnClass);
            if (k.useID && o.attr("id") != "") {
                r.attr("id", k.idPrefix + "-" + o.attr("id"))
            }
            o.wrap(r);
            o.after(m);
            o.after(p);
            r = o.closest("div");
            p = o.siblings("." + k.filenameClass);
            m = o.siblings("." + k.fileBtnClass);
            if (!o.attr("size")) {
                var l = r.width();
                o.attr("size", l / 10)
            }
            var n = function() {
                var s = o.val();
                if (s === "") {
                    s = k.fileDefaultText
                } else {
                    s = s.split(/[\/\\]+/);
                    s = s[(s.length - 1)]
                }
                p.text(s)
            };
            n();
            o.css("opacity", 0).bind({
                "focus.uniform": function() {
                    r.addClass(k.focusClass)
                },
                "blur.uniform": function() {
                    r.removeClass(k.focusClass)
                },
                "mousedown.uniform": function() {
                    if (!a(q).is(":disabled")) {
                        r.addClass(k.activeClass)
                    }
                },
                "mouseup.uniform": function() {
                    r.removeClass(k.activeClass)
                },
                "mouseenter.uniform": function() {
                    r.addClass(k.hoverClass)
                },
                "mouseleave.uniform": function() {
                    r.removeClass(k.hoverClass);
                    r.removeClass(k.activeClass)
                }
            });
            if (a.browser.msie) {
                o.bind("click.uniform.ie7", function() {
                    setTimeout(n, 0)
                })
            } else {
                o.bind("change.uniform", n)
            }
            if (o.attr("disabled")) {
                r.addClass(k.disabledClass)
            }
            a.uniform.noSelect(p);
            a.uniform.noSelect(m);
            b(q)
        }
        a.uniform.restore = function(l) {
            if (l == undefined) {
                l = a(a.uniform.elements)
            }
            a(l).each(function() {
                if (a(this).is(":checkbox")) {
                    a(this).unwrap().unwrap()
                } else {
                    if (a(this).is("select")) {
                        a(this).siblings("span").remove();
                        a(this).unwrap()
                    } else {
                        if (a(this).is(":radio")) {
                            a(this).unwrap().unwrap()
                        } else {
                            if (a(this).is(":file")) {
                                a(this).siblings("span").remove();
                                a(this).unwrap()
                            } else {
                                if (a(this).is("button, :submit, :reset, a, input[type='button']")) {
                                    a(this).unwrap().unwrap()
                                }
                            }
                        }
                    }
                }
                a(this).unbind(".uniform");
                a(this).css("opacity", "1");
                var m = a.inArray(a(l), a.uniform.elements);
                a.uniform.elements.splice(m, 1)
            })
        };

        function b(l) {
            l = a(l).get();
            if (l.length > 1) {
                a.each(l, function(m, n) {
                    a.uniform.elements.push(n)
                })
            } else {
                a.uniform.elements.push(l)
            }
        }
        a.uniform.noSelect = function(l) {
            function m() {
                return false
            }
            a(l).each(function() {
                this.onselectstart = this.ondragstart = m;
                a(this).mousedown(m).css({
                    MozUserSelect: "none"
                })
            })
        };
        a.uniform.update = function(l) {
            if (l == undefined) {
                l = a(a.uniform.elements)
            }
            l = a(l);
            l.each(function() {
                var n = a(this);
                if (n.is("select")) {
                    var m = n.siblings("span");
                    var p = n.parent("div");
                    p.removeClass(k.hoverClass + " " + k.focusClass + " " + k.activeClass);
                    m.html(n.find(":selected").html());
                    if (n.is(":disabled")) {
                        p.addClass(k.disabledClass)
                    } else {
                        p.removeClass(k.disabledClass)
                    }
                } else {
                    if (n.is(":checkbox")) {
                        var m = n.closest("span");
                        var p = n.closest("div");
                        p.removeClass(k.hoverClass + " " + k.focusClass + " " + k.activeClass);
                        m.removeClass(k.checkedClass);
                        if (n.is(":checked")) {
                            m.addClass(k.checkedClass)
                        }
                        if (n.is(":disabled")) {
                            p.addClass(k.disabledClass)
                        } else {
                            p.removeClass(k.disabledClass)
                        }
                    } else {
                        if (n.is(":radio")) {
                            var m = n.closest("span");
                            var p = n.closest("div");
                            p.removeClass(k.hoverClass + " " + k.focusClass + " " + k.activeClass);
                            m.removeClass(k.checkedClass);
                            if (n.is(":checked")) {
                                m.addClass(k.checkedClass)
                            }
                            if (n.is(":disabled")) {
                                p.addClass(k.disabledClass)
                            } else {
                                p.removeClass(k.disabledClass)
                            }
                        } else {
                            if (n.is(":file")) {
                                var p = n.parent("div");
                                var o = n.siblings(k.filenameClass);
                                btnTag = n.siblings(k.fileBtnClass);
                                p.removeClass(k.hoverClass + " " + k.focusClass + " " + k.activeClass);
                                o.text(n.val());
                                if (n.is(":disabled")) {
                                    p.addClass(k.disabledClass)
                                } else {
                                    p.removeClass(k.disabledClass)
                                }
                            } else {
                                if (n.is(":submit") || n.is(":reset") || n.is("button") || n.is("a") || l.is("input[type=button]")) {
                                    var p = n.closest("div");
                                    p.removeClass(k.hoverClass + " " + k.focusClass + " " + k.activeClass);
                                    if (n.is(":disabled")) {
                                        p.addClass(k.disabledClass)
                                    } else {
                                        p.removeClass(k.disabledClass)
                                    }
                                }
                            }
                        }
                    }
                }
            })
        };
        return this.each(function() {
            if (a.support.selectOpacity) {
                var l = a(this);
                if (l.is("select")) {
                    if (l.attr("multiple") != true) {
                        if (l.attr("size") == undefined || l.attr("size") <= 1) {
                            e(l)
                        }
                    }
                } else {
                    if (l.is(":checkbox")) {
                        f(l)
                    } else {
                        if (l.is(":radio")) {
                            c(l)
                        } else {
                            if (l.is(":file")) {
                                h(l)
                            } else {
                                if (l.is(":text, :password, input[type='email']")) {
                                    j(l)
                                } else {
                                    if (l.is("textarea")) {
                                        g(l)
                                    } else {
                                        if (l.is("a") || l.is(":submit") || l.is(":reset") || l.is("button") || l.is("input[type=button]")) {
                                            i(l)
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        })
    }
})(jQuery);
(function(a) {
    a.extend(a.fn, {
        validate: function(b) {
            if (!this.length) {
                b && b.debug && window.console && console.warn("nothing selected, can't validate, returning nothing");
                return
            }
            var c = a.data(this[0], "validator");
            if (c) {
                return c
            }
            c = new a.validator(b, this[0]);
            a.data(this[0], "validator", c);
            if (c.settings.onsubmit) {
                this.find("input, button").filter(".cancel").click(function() {
                    c.cancelSubmit = true
                });
                if (c.settings.submitHandler) {
                    this.find("input, button").filter(":submit").click(function() {
                        c.submitButton = this
                    })
                }
                this.submit(function(d) {
                    if (c.settings.debug) {
                        d.preventDefault()
                    }

                    function e() {
                        if (c.settings.submitHandler) {
                            if (c.submitButton) {
                                var f = a("<input type='hidden'/>").attr("name", c.submitButton.name).val(c.submitButton.value).appendTo(c.currentForm)
                            }
                            c.settings.submitHandler.call(c, c.currentForm);
                            if (c.submitButton) {
                                f.remove()
                            }
                            return false
                        }
                        return true
                    }
                    if (c.cancelSubmit) {
                        c.cancelSubmit = false;
                        return e()
                    }
                    if (c.form()) {
                        if (c.pendingRequest) {
                            c.formSubmitted = true;
                            return false
                        }
                        return e()
                    } else {
                        c.focusInvalid();
                        return false
                    }
                })
            }
            return c
        },
        valid: function() {
            if (a(this[0]).is("form")) {
                return this.validate().form()
            } else {
                var c = true;
                var b = a(this[0].form).validate();
                this.each(function() {
                    c &= b.element(this)
                });
                return c
            }
        },
        removeAttrs: function(d) {
            var b = {},
                c = this;
            a.each(d.split(/\s/), function(e, f) {
                b[f] = c.attr(f);
                c.removeAttr(f)
            });
            return b
        },
        rules: function(e, b) {
            var g = this[0];
            if (e) {
                var d = a.data(g.form, "validator").settings;
                var i = d.rules;
                var j = a.validator.staticRules(g);
                switch (e) {
                    case "add":
                        a.extend(j, a.validator.normalizeRule(b));
                        i[g.name] = j;
                        if (b.messages) {
                            d.messages[g.name] = a.extend(d.messages[g.name], b.messages)
                        }
                        break;
                    case "remove":
                        if (!b) {
                            delete i[g.name];
                            return j
                        }
                        var h = {};
                        a.each(b.split(/\s/), function(k, l) {
                            h[l] = j[l];
                            delete j[l]
                        });
                        return h
                }
            }
            var f = a.validator.normalizeRules(a.extend({}, a.validator.metadataRules(g), a.validator.classRules(g), a.validator.attributeRules(g), a.validator.staticRules(g)), g);
            if (f.required) {
                var c = f.required;
                delete f.required;
                f = a.extend({
                    required: c
                }, f)
            }
            return f
        }
    });
    a.extend(a.expr[":"], {
        blank: function(b) {
            return !a.trim("" + b.value)
        },
        filled: function(b) {
            return !!a.trim("" + b.value)
        },
        unchecked: function(b) {
            return !b.checked
        }
    });
    a.validator = function(b, c) {
        this.settings = a.extend(true, {}, a.validator.defaults, b);
        this.currentForm = c;
        this.init()
    };
    a.validator.format = function(b, c) {
        if (arguments.length == 1) {
            return function() {
                var d = a.makeArray(arguments);
                d.unshift(b);
                return a.validator.format.apply(this, d)
            }
        }
        if (arguments.length > 2 && c.constructor != Array) {
            c = a.makeArray(arguments).slice(1)
        }
        if (c.constructor != Array) {
            c = [c]
        }
        a.each(c, function(d, e) {
            b = b.replace(new RegExp("\\{" + d + "\\}", "g"), e)
        });
        return b
    };
    a.extend(a.validator, {
        defaults: {
            messages: {},
            groups: {},
            rules: {},
            errorClass: "error",
            validClass: "valid",
            errorElement: "div",
            focusInvalid: true,
            errorContainer: a([]),
            errorLabelContainer: a([]),
            onsubmit: true,
            ignore: [],
            ignoreTitle: false,
            onfocusin: function(b) {
                this.lastActive = b;
                if (this.settings.focusCleanup && !this.blockFocusCleanup) {
                    this.settings.unhighlight && this.settings.unhighlight.call(this, b, this.settings.errorClass, this.settings.validClass);
                    this.addWrapper(this.errorsFor(b)).hide()
                }
            },
            onfocusout: function(b) {
                if (!this.checkable(b) && (b.name in this.submitted || !this.optional(b))) {
                    this.element(b)
                }
            },
            onkeyup: function(b) {
                if (b.name in this.submitted || b == this.lastElement) {
                    this.element(b)
                }
            },
            onclick: function(b) {
                if (b.name in this.submitted) {
                    this.element(b)
                } else {
                    if (b.parentNode.name in this.submitted) {
                        this.element(b.parentNode)
                    }
                }
            },
            highlight: function(d, b, c) {
                if (d.type === "radio") {
                    this.findByName(d.name).addClass(b).removeClass(c)
                } else {
                    a(d).addClass(b).removeClass(c)
                }
            },
            unhighlight: function(d, b, c) {
                if (d.type === "radio") {
                    this.findByName(d.name).removeClass(b).addClass(c)
                } else {
                    a(d).removeClass(b).addClass(c)
                }
            }
        },
        setDefaults: function(b) {
            a.extend(a.validator.defaults, b)
        },
        messages: {
            required: "This field is required.",
            remote: "Please fix this field.",
            email: "Please enter a valid email address.",
            url: "Please enter a valid URL.",
            date: "Please enter a valid date.",
            dateISO: "Please enter a valid date (ISO).",
            number: "Please enter a valid number.",
            digits: "Please enter only digits.",
            creditcard: "Please enter a valid credit card number.",
            equalTo: "Please enter the same value again.",
            accept: "Please enter a value with a valid extension.",
            maxlength: a.validator.format("Please enter no more than {0} characters."),
            minlength: a.validator.format("Please enter at least {0} characters."),
            rangelength: a.validator.format("Please enter a value between {0} and {1} characters long."),
            range: a.validator.format("Please enter a value between {0} and {1}."),
            max: a.validator.format("Please enter a value less than or equal to {0}."),
            min: a.validator.format("Please enter a value greater than or equal to {0}.")
        },
        autoCreateRanges: false,
        prototype: {
            init: function() {
                this.labelContainer = a(this.settings.errorLabelContainer);
                this.errorContext = this.labelContainer.length && this.labelContainer || a(this.currentForm);
                this.containers = a(this.settings.errorContainer).add(this.settings.errorLabelContainer);
                this.submitted = {};
                this.valueCache = {};
                this.pendingRequest = 0;
                this.pending = {};
                this.invalid = {};
                this.reset();
                var b = (this.groups = {});
                a.each(this.settings.groups, function(e, f) {
                    a.each(f.split(/\s/), function(h, g) {
                        b[g] = e
                    })
                });
                var d = this.settings.rules;
                a.each(d, function(e, f) {
                    d[e] = a.validator.normalizeRule(f)
                });

                function c(g) {
                    var f = a.data(this[0].form, "validator"),
                        e = "on" + g.type.replace(/^validate/, "");
                    f.settings[e] && f.settings[e].call(f, this[0])
                }
                a(this.currentForm).validateDelegate(":text, :password, :file, select, textarea", "focusin focusout keyup", c).validateDelegate(":radio, :checkbox, select, option", "click", c);
                if (this.settings.invalidHandler) {
                    a(this.currentForm).bind("invalid-form.validate", this.settings.invalidHandler)
                }
            },
            form: function() {
                this.checkForm();
                a.extend(this.submitted, this.errorMap);
                this.invalid = a.extend({}, this.errorMap);
                if (!this.valid()) {
                    a(this.currentForm).triggerHandler("invalid-form", [this])
                }
                this.showErrors();
                return this.valid()
            },
            checkForm: function() {
                this.prepareForm();
                for (var b = 0, c = (this.currentElements = this.elements()); c[b]; b++) {
                    this.check(c[b])
                }
                return this.valid()
            },
            element: function(c) {
                c = this.clean(c);
                this.lastElement = c;
                this.prepareElement(c);
                this.currentElements = a(c);
                var b = this.check(c);
                if (b) {
                    delete this.invalid[c.name]
                } else {
                    this.invalid[c.name] = true
                }
                if (!this.numberOfInvalids()) {
                    this.toHide = this.toHide.add(this.containers)
                }
                this.showErrors();
                return b
            },
            showErrors: function(c) {
                if (c) {
                    a.extend(this.errorMap, c);
                    this.errorList = [];
                    for (var b in c) {
                        this.errorList.push({
                            message: c[b],
                            element: this.findByName(b)[0]
                        })
                    }
                    this.successList = a.grep(this.successList, function(d) {
                        return !(d.name in c)
                    })
                }
                this.settings.showErrors ? this.settings.showErrors.call(this, this.errorMap, this.errorList) : this.defaultShowErrors()
            },
            resetForm: function() {
                if (a.fn.resetForm) {
                    a(this.currentForm).resetForm()
                }
                this.submitted = {};
                this.prepareForm();
                this.hideErrors();
                this.elements().removeClass(this.settings.errorClass)
            },
            numberOfInvalids: function() {
                return this.objectLength(this.invalid)
            },
            objectLength: function(d) {
                var c = 0;
                for (var b in d) {
                    c++
                }
                return c
            },
            hideErrors: function() {
                this.addWrapper(this.toHide).hide()
            },
            valid: function() {
                return this.size() == 0
            },
            size: function() {
                return this.errorList.length
            },
            focusInvalid: function() {
                if (this.settings.focusInvalid) {
                    try {
                        a(this.findLastActive() || this.errorList.length && this.errorList[0].element || []).filter(":visible").focus().trigger("focusin")
                    } catch (b) {}
                }
            },
            findLastActive: function() {
                var b = this.lastActive;
                return b && a.grep(this.errorList, function(c) {
                    return c.element.name == b.name
                }).length == 1 && b
            },
            elements: function() {
                var c = this,
                    b = {};
                return a(this.currentForm).find("input, select, textarea").not(":submit, :reset, :image, [disabled]").not(this.settings.ignore).filter(function() {
                    !this.name && c.settings.debug && window.console && console.error("%o has no name assigned", this);
                    if (this.name in b || !c.objectLength(a(this).rules())) {
                        return false
                    }
                    b[this.name] = true;
                    return true
                })
            },
            clean: function(b) {
                return a(b)[0]
            },
            errors: function() {
                return a(this.settings.errorElement + "." + this.settings.errorClass, this.errorContext)
            },
            reset: function() {
                this.successList = [];
                this.errorList = [];
                this.errorMap = {};
                this.toShow = a([]);
                this.toHide = a([]);
                this.currentElements = a([])
            },
            prepareForm: function() {
                this.reset();
                this.toHide = this.errors().add(this.containers)
            },
            prepareElement: function(b) {
                this.reset();
                this.toHide = this.errorsFor(b)
            },
            check: function(c) {
                c = this.clean(c);
                if (this.checkable(c)) {
                    c = this.findByName(c.name).not(this.settings.ignore)[0]
                }
                var h = a(c).rules();
                var d = false;
                for (var i in h) {
                    var g = {
                        method: i,
                        parameters: h[i]
                    };
                    try {
                        var b = a.validator.methods[i].call(this, c.value.replace(/\r/g, ""), c, g.parameters);
                        if (b == "dependency-mismatch") {
                            d = true;
                            continue
                        }
                        d = false;
                        if (b == "pending") {
                            this.toHide = this.toHide.not(this.errorsFor(c));
                            return
                        }
                        if (!b) {
                            this.formatAndAdd(c, g);
                            return false
                        }
                    } catch (f) {
                        this.settings.debug && window.console && console.log("exception occured when checking element " + c.id + ", check the '" + g.method + "' method", f);
                        throw f
                    }
                }
                if (d) {
                    return
                }
                if (this.objectLength(h)) {
                    this.successList.push(c)
                }
                return true
            },
            customMetaMessage: function(b, d) {
                if (!a.metadata) {
                    return
                }
                var c = this.settings.meta ? a(b).metadata()[this.settings.meta] : a(b).metadata();
                return c && c.messages && c.messages[d]
            },
            customMessage: function(c, d) {
                var b = this.settings.messages[c];
                return b && (b.constructor == String ? b : b[d])
            },
            findDefined: function() {
                for (var b = 0; b < arguments.length; b++) {
                    if (arguments[b] !== undefined) {
                        return arguments[b]
                    }
                }
                return undefined
            },
            defaultMessage: function(b, c) {
                return this.findDefined(this.customMessage(b.name, c), this.customMetaMessage(b, c), !this.settings.ignoreTitle && b.title || undefined, a.validator.messages[c], "<strong>Warning: No message defined for " + b.name + "</strong>")
            },
            formatAndAdd: function(c, e) {
                var d = this.defaultMessage(c, e.method),
                    b = /\$?\{(\d+)\}/g;
                if (typeof d == "function") {
                    d = d.call(this, e.parameters, c)
                } else {
                    if (b.test(d)) {
                        d = jQuery.format(d.replace(b, "{$1}"), e.parameters)
                    }
                }
                this.errorList.push({
                    message: d,
                    element: c
                });
                this.errorMap[c.name] = d;
                this.submitted[c.name] = d
            },
            addWrapper: function(b) {
                if (this.settings.wrapper) {
                    b = b.add(b.parent(this.settings.wrapper))
                }
                return b
            },
            defaultShowErrors: function() {
                for (var c = 0; this.errorList[c]; c++) {
                    var b = this.errorList[c];
                    this.settings.highlight && this.settings.highlight.call(this, b.element, this.settings.errorClass, this.settings.validClass);
                    this.showLabel(b.element, b.message)
                }
                if (this.errorList.length) {
                    this.toShow = this.toShow.add(this.containers)
                }
                if (this.settings.success) {
                    for (var c = 0; this.successList[c]; c++) {
                        this.showLabel(this.successList[c])
                    }
                }
                if (this.settings.unhighlight) {
                    for (var c = 0, d = this.validElements(); d[c]; c++) {
                        this.settings.unhighlight.call(this, d[c], this.settings.errorClass, this.settings.validClass)
                    }
                }
                this.toHide = this.toHide.not(this.toShow);
                this.hideErrors();
                this.addWrapper(this.toShow).show()
            },
            validElements: function() {
                return this.currentElements.not(this.invalidElements())
            },
            invalidElements: function() {
                return a(this.errorList).map(function() {
                    return this.element
                })
            },
            showLabel: function(c, d) {
                var b = this.errorsFor(c);
                if (b.length) {
                    b.removeClass().addClass(this.settings.errorClass);
                    b.attr("generated") && b.html(d)
                } else {
                    b = a("<" + this.settings.errorElement + "/>").attr({
                        "for": this.idOrName(c),
                        generated: true
                    }).addClass(this.settings.errorClass).html(d || "");
                    if (this.settings.wrapper) {
                        b = b.hide().show().wrap("<" + this.settings.wrapper + "/>").parent()
                    }
                    if (!this.labelContainer.append(b).length) {
                        this.settings.errorPlacement ? this.settings.errorPlacement(b, a(c)) : b.insertAfter(c)
                    }
                }
                if (!d && this.settings.success) {
                    b.text("");
                    typeof this.settings.success == "string" ? b.addClass(this.settings.success) : this.settings.success(b)
                }
                this.toShow = this.toShow.add(b)
            },
            errorsFor: function(c) {
                var b = this.idOrName(c);
                return this.errors().filter(function() {
                    return a(this).attr("for") == b
                })
            },
            idOrName: function(b) {
                return this.groups[b.name] || (this.checkable(b) ? b.name : b.id || b.name)
            },
            checkable: function(b) {
                return /radio|checkbox/i.test(b.type)
            },
            findByName: function(b) {
                var c = this.currentForm;
                return a(document.getElementsByName(b)).map(function(d, e) {
                    return e.form == c && e.name == b && e || null
                })
            },
            getLength: function(c, b) {
                switch (b.nodeName.toLowerCase()) {
                    case "select":
                        return a("option:selected", b).length;
                    case "input":
                        if (this.checkable(b)) {
                            return this.findByName(b.name).filter(":checked").length
                        }
                }
                return c.length
            },
            depend: function(c, b) {
                return this.dependTypes[typeof c] ? this.dependTypes[typeof c](c, b) : true
            },
            dependTypes: {
                "boolean": function(c, b) {
                    return c
                },
                string: function(c, b) {
                    return !!a(c, b.form).length
                },
                "function": function(c, b) {
                    return c(b)
                }
            },
            optional: function(b) {
                return !a.validator.methods.required.call(this, a.trim(b.value), b) && "dependency-mismatch"
            },
            startRequest: function(b) {
                if (!this.pending[b.name]) {
                    this.pendingRequest++;
                    this.pending[b.name] = true
                }
            },
            stopRequest: function(b, c) {
                this.pendingRequest--;
                if (this.pendingRequest < 0) {
                    this.pendingRequest = 0
                }
                delete this.pending[b.name];
                if (c && this.pendingRequest == 0 && this.formSubmitted && this.form()) {
                    a(this.currentForm).submit();
                    this.formSubmitted = false
                } else {
                    if (!c && this.pendingRequest == 0 && this.formSubmitted) {
                        a(this.currentForm).triggerHandler("invalid-form", [this]);
                        this.formSubmitted = false
                    }
                }
            },
            previousValue: function(b) {
                return a.data(b, "previousValue") || a.data(b, "previousValue", {
                    old: null,
                    valid: true,
                    message: this.defaultMessage(b, "remote")
                })
            }
        },
        classRuleSettings: {
            required: {
                required: true
            },
            email: {
                email: true
            },
            url: {
                url: true
            },
            date: {
                date: true
            },
            dateISO: {
                dateISO: true
            },
            dateDE: {
                dateDE: true
            },
            number: {
                number: true
            },
            numberDE: {
                numberDE: true
            },
            digits: {
                digits: true
            },
            creditcard: {
                creditcard: true
            }
        },
        addClassRules: function(b, c) {
            b.constructor == String ? this.classRuleSettings[b] = c : a.extend(this.classRuleSettings, b)
        },
        classRules: function(c) {
            var d = {};
            var b = a(c).attr("class");
            b && a.each(b.split(" "), function() {
                if (this in a.validator.classRuleSettings) {
                    a.extend(d, a.validator.classRuleSettings[this])
                }
            });
            return d
        },
        attributeRules: function(c) {
            var e = {};
            var b = a(c);
            for (var f in a.validator.methods) {
                var d = b.attr(f);
                if (d) {
                    e[f] = d
                }
            }
            if (e.maxlength && /-1|2147483647|524288/.test(e.maxlength)) {
                delete e.maxlength
            }
            return e
        },
        metadataRules: function(b) {
            if (!a.metadata) {
                return {}
            }
            var c = a.data(b.form, "validator").settings.meta;
            return c ? a(b).metadata()[c] : a(b).metadata()
        },
        staticRules: function(c) {
            var d = {};
            var b = a.data(c.form, "validator");
            if (b.settings.rules) {
                d = a.validator.normalizeRule(b.settings.rules[c.name]) || {}
            }
            return d
        },
        normalizeRules: function(c, b) {
            a.each(c, function(f, e) {
                if (e === false) {
                    delete c[f];
                    return
                }
                if (e.param || e.depends) {
                    var d = true;
                    switch (typeof e.depends) {
                        case "string":
                            d = !!a(e.depends, b.form).length;
                            break;
                        case "function":
                            d = e.depends.call(b, b);
                            break
                    }
                    if (d) {
                        c[f] = e.param !== undefined ? e.param : true
                    } else {
                        delete c[f]
                    }
                }
            });
            a.each(c, function(d, e) {
                c[d] = a.isFunction(e) ? e(b) : e
            });
            a.each(["minlength", "maxlength", "min", "max"], function() {
                if (c[this]) {
                    c[this] = Number(c[this])
                }
            });
            a.each(["rangelength", "range"], function() {
                if (c[this]) {
                    c[this] = [Number(c[this][0]), Number(c[this][1])]
                }
            });
            if (a.validator.autoCreateRanges) {
                if (c.min && c.max) {
                    c.range = [c.min, c.max];
                    delete c.min;
                    delete c.max
                }
                if (c.minlength && c.maxlength) {
                    c.rangelength = [c.minlength, c.maxlength];
                    delete c.minlength;
                    delete c.maxlength
                }
            }
            if (c.messages) {
                delete c.messages
            }
            return c
        },
        normalizeRule: function(c) {
            if (typeof c == "string") {
                var b = {};
                a.each(c.split(/\s/), function() {
                    b[this] = true
                });
                c = b
            }
            return c
        },
        addMethod: function(b, d, c) {
            a.validator.methods[b] = d;
            a.validator.messages[b] = c != undefined ? c : a.validator.messages[b];
            if (d.length < 3) {
                a.validator.addClassRules(b, a.validator.normalizeRule(b))
            }
        },
        methods: {
            required: function(c, b, e) {
                if (!this.depend(e, b)) {
                    return "dependency-mismatch"
                }
                switch (b.nodeName.toLowerCase()) {
                    case "select":
                        var d = a(b).val();
                        return d && d.length > 0;
                    case "input":
                        if (this.checkable(b)) {
                            return this.getLength(c, b) > 0
                        }
                    default:
                        return a.trim(c).length > 0
                }
            },
            remote: function(f, c, g) {
                if (this.optional(c)) {
                    return "dependency-mismatch"
                }
                var d = this.previousValue(c);
                if (!this.settings.messages[c.name]) {
                    this.settings.messages[c.name] = {}
                }
                d.originalMessage = this.settings.messages[c.name].remote;
                this.settings.messages[c.name].remote = d.message;
                g = typeof g == "string" && {
                    url: g
                } || g;
                if (this.pending[c.name]) {
                    return "pending"
                }
                if (d.old === f) {
                    return d.valid
                }
                d.old = f;
                var b = this;
                this.startRequest(c);
                var e = {};
                e[c.name] = f;
                a.ajax(a.extend(true, {
                    url: g,
                    mode: "abort",
                    port: "validate" + c.name,
                    dataType: "json",
                    data: e,
                    success: function(i) {
                        b.settings.messages[c.name].remote = d.originalMessage;
                        var k = i === true;
                        if (k) {
                            var h = b.formSubmitted;
                            b.prepareElement(c);
                            b.formSubmitted = h;
                            b.successList.push(c);
                            b.showErrors()
                        } else {
                            var l = {};
                            var j = i || b.defaultMessage(c, "remote");
                            l[c.name] = d.message = a.isFunction(j) ? j(f) : j;
                            b.showErrors(l)
                        }
                        d.valid = k;
                        b.stopRequest(c, k)
                    }
                }, g));
                return "pending"
            },
            minlength: function(c, b, d) {
                return this.optional(b) || this.getLength(a.trim(c), b) >= d
            },
            maxlength: function(c, b, d) {
                return this.optional(b) || this.getLength(a.trim(c), b) <= d
            },
            rangelength: function(d, b, e) {
                var c = this.getLength(a.trim(d), b);
                return this.optional(b) || (c >= e[0] && c <= e[1])
            },
            min: function(c, b, d) {
                return this.optional(b) || c >= d
            },
            max: function(c, b, d) {
                return this.optional(b) || c <= d
            },
            range: function(c, b, d) {
                return this.optional(b) || (c >= d[0] && c <= d[1])
            },
            email: function(c, b) {
                return this.optional(b) || /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test(c)
            },
            url: function(c, b) {
                return this.optional(b) || /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(c)
            },
            date: function(c, b) {
                return this.optional(b) || !/Invalid|NaN/.test(new Date(c))
            },
            dateISO: function(c, b) {
                return this.optional(b) || /^\d{4}[\/-]\d{1,2}[\/-]\d{1,2}$/.test(c)
            },
            number: function(c, b) {
                return this.optional(b) || /^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/.test(c)
            },
            digits: function(c, b) {
                return this.optional(b) || /^\d+$/.test(c)
            },
            creditcard: function(f, c) {
                if (this.optional(c)) {
                    return "dependency-mismatch"
                }
                if (/[^0-9-]+/.test(f)) {
                    return false
                }
                var g = 0,
                    e = 0,
                    b = false;
                f = f.replace(/\D/g, "");
                for (var h = f.length - 1; h >= 0; h--) {
                    var d = f.charAt(h);
                    var e = parseInt(d, 10);
                    if (b) {
                        if ((e *= 2) > 9) {
                            e -= 9
                        }
                    }
                    g += e;
                    b = !b
                }
                return (g % 10) == 0
            },
            accept: function(c, b, d) {
                d = typeof d == "string" ? d.replace(/,/g, "|") : "png|jpe?g|gif";
                return this.optional(b) || c.match(new RegExp(".(" + d + ")$", "i"))
            },
            equalTo: function(c, b, e) {
                var d = a(e).unbind(".validate-equalTo").bind("blur.validate-equalTo", function() {
                    a(b).valid()
                });
                return c == d.val()
            }
        }
    });
    a.format = a.validator.format
})(jQuery);
(function(c) {
    var a = {};
    if (c.ajaxPrefilter) {
        c.ajaxPrefilter(function(f, e, g) {
            var d = f.port;
            if (f.mode == "abort") {
                if (a[d]) {
                    a[d].abort()
                }
                a[d] = g
            }
        })
    } else {
        var b = c.ajax;
        c.ajax = function(e) {
            var f = ("mode" in e ? e : c.ajaxSettings).mode,
                d = ("port" in e ? e : c.ajaxSettings).port;
            if (f == "abort") {
                if (a[d]) {
                    a[d].abort()
                }
                return (a[d] = b.apply(this, arguments))
            }
            return b.apply(this, arguments)
        }
    }
})(jQuery);
(function(a) {
    if (!jQuery.event.special.focusin && !jQuery.event.special.focusout && document.addEventListener) {
        a.each({
            focus: "focusin",
            blur: "focusout"
        }, function(c, b) {
            a.event.special[b] = {
                setup: function() {
                    this.addEventListener(c, d, true)
                },
                teardown: function() {
                    this.removeEventListener(c, d, true)
                },
                handler: function(f) {
                    arguments[0] = a.event.fix(f);
                    arguments[0].type = b;
                    return a.event.handle.apply(this, arguments)
                }
            };

            function d(f) {
                f = a.event.fix(f);
                f.type = b;
                return a.event.handle.call(this, f)
            }
        })
    }
    a.extend(a.fn, {
        validateDelegate: function(d, c, b) {
            return this.bind(c, function(e) {
                var f = a(e.target);
                if (f.is(d)) {
                    return b.apply(f, arguments)
                }
            })
        }
    })
})(jQuery);
/**
 * jQuery Validation Plugin 1.8.1
 *
 * http://bassistance.de/jquery-plugins/jquery-plugin-validation/
 * http://docs.jquery.com/Plugins/Validation
 *
 * Copyright (c) 2006 - 2011 Jörn Zaefferer
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */
(function(c) {
    c.extend(c.fn, {
        validate: function(a) {
            if (this.length) {
                var b = c.data(this[0], "validator");
                if (b) return b;
                b = new c.validator(a, this[0]);
                c.data(this[0], "validator", b);
                if (b.settings.onsubmit) {
                    this.find("input, button").filter(".cancel").click(function() {
                        b.cancelSubmit = true
                    });
                    b.settings.submitHandler && this.find("input, button").filter(":submit").click(function() {
                        b.submitButton = this
                    });
                    this.submit(function(d) {
                        function e() {
                            if (b.settings.submitHandler) {
                                if (b.submitButton) var f = c("<input type='hidden'/>").attr("name",
                                    b.submitButton.name).val(b.submitButton.value).appendTo(b.currentForm);
                                b.settings.submitHandler.call(b, b.currentForm);
                                b.submitButton && f.remove();
                                return false
                            }
                            return true
                        }
                        b.settings.debug && d.preventDefault();
                        if (b.cancelSubmit) {
                            b.cancelSubmit = false;
                            return e()
                        }
                        if (b.form()) {
                            if (b.pendingRequest) {
                                b.formSubmitted = true;
                                return false
                            }
                            return e()
                        } else {
                            b.focusInvalid();
                            return false
                        }
                    })
                }
                return b
            } else a && a.debug && window.console && console.warn("nothing selected, can't validate, returning nothing")
        },
        valid: function() {
            if (c(this[0]).is("form")) return this.validate().form();
            else {
                var a = true,
                    b = c(this[0].form).validate();
                this.each(function() {
                    a &= b.element(this)
                });
                return a
            }
        },
        removeAttrs: function(a) {
            var b = {},
                d = this;
            c.each(a.split(/\s/), function(e, f) {
                b[f] = d.attr(f);
                d.removeAttr(f)
            });
            return b
        },
        rules: function(a, b) {
            var d = this[0];
            if (a) {
                var e = c.data(d.form, "validator").settings,
                    f = e.rules,
                    g = c.validator.staticRules(d);
                switch (a) {
                    case "add":
                        c.extend(g, c.validator.normalizeRule(b));
                        f[d.name] = g;
                        if (b.messages) e.messages[d.name] = c.extend(e.messages[d.name], b.messages);
                        break;
                    case "remove":
                        if (!b) {
                            delete f[d.name];
                            return g
                        }
                        var h = {};
                        c.each(b.split(/\s/), function(j, i) {
                            h[i] = g[i];
                            delete g[i]
                        });
                        return h
                }
            }
            d = c.validator.normalizeRules(c.extend({}, c.validator.metadataRules(d), c.validator.classRules(d), c.validator.attributeRules(d), c.validator.staticRules(d)), d);
            if (d.required) {
                e = d.required;
                delete d.required;
                d = c.extend({
                    required: e
                }, d)
            }
            return d
        }
    });
    c.extend(c.expr[":"], {
        blank: function(a) {
            return !c.trim("" + a.value)
        },
        filled: function(a) {
            return !!c.trim("" + a.value)
        },
        unchecked: function(a) {
            return !a.checked
        }
    });
    c.validator = function(a,
        b) {
        this.settings = c.extend(true, {}, c.validator.defaults, a);
        this.currentForm = b;
        this.init()
    };
    c.validator.format = function(a, b) {
        if (arguments.length == 1) return function() {
            var d = c.makeArray(arguments);
            d.unshift(a);
            return c.validator.format.apply(this, d)
        };
        if (arguments.length > 2 && b.constructor != Array) b = c.makeArray(arguments).slice(1);
        if (b.constructor != Array) b = [b];
        c.each(b, function(d, e) {
            a = a.replace(RegExp("\\{" + d + "\\}", "g"), e)
        });
        return a
    };
    c.extend(c.validator, {
        defaults: {
            messages: {},
            groups: {},
            rules: {},
            errorClass: "error",
            validClass: "valid",
            errorElement: "div",
            focusInvalid: true,
            errorContainer: c([]),
            errorLabelContainer: c([]),
            onsubmit: true,
            ignore: [],
            ignoreTitle: false,
            onfocusin: function(a) {
                this.lastActive = a;
                if (this.settings.focusCleanup && !this.blockFocusCleanup) {
                    this.settings.unhighlight && this.settings.unhighlight.call(this, a, this.settings.errorClass, this.settings.validClass);
                    this.addWrapper(this.errorsFor(a)).hide()
                }
            },
            onfocusout: function(a) {
                if (!this.checkable(a) && (a.name in this.submitted || !this.optional(a))) this.element(a)
            },
            onkeyup: function(a) {
                if (a.name in this.submitted || a == this.lastElement) this.element(a)
            },
            onclick: function(a) {
                if (a.name in this.submitted) this.element(a);
                else a.parentNode.name in this.submitted && this.element(a.parentNode)
            },
            highlight: function(a, b, d) {
                a.type === "radio" ? this.findByName(a.name).addClass(b).removeClass(d) : c(a).addClass(b).removeClass(d)
            },
            unhighlight: function(a, b, d) {
                a.type === "radio" ? this.findByName(a.name).removeClass(b).addClass(d) : c(a).removeClass(b).addClass(d)
            }
        },
        setDefaults: function(a) {
            c.extend(c.validator.defaults,
                a)
        },
        messages: {
            required: "This field is required.",
            remote: "Please fix this field.",
            email: "Please enter a valid email address.",
            url: "Please enter a valid URL.",
            date: "Please enter a valid date.",
            dateISO: "Please enter a valid date (ISO).",
            number: "Please enter a valid number.",
            digits: "Please enter only digits.",
            creditcard: "Please enter a valid credit card number.",
            equalTo: "Please enter the same value again.",
            accept: "Please enter a value with a valid extension.",
            maxlength: c.validator.format("Please enter no more than {0} characters."),
            minlength: c.validator.format("Please enter at least {0} characters."),
            rangelength: c.validator.format("Please enter a value between {0} and {1} characters long."),
            range: c.validator.format("Please enter a value between {0} and {1}."),
            max: c.validator.format("Please enter a value less than or equal to {0}."),
            min: c.validator.format("Please enter a value greater than or equal to {0}.")
        },
        autoCreateRanges: false,
        prototype: {
            init: function() {
                function a(e) {
                    var f = c.data(this[0].form, "validator");
                    e = "on" + e.type.replace(/^validate/,
                        "");
                    f.settings[e] && f.settings[e].call(f, this[0])
                }
                this.labelContainer = c(this.settings.errorLabelContainer);
                this.errorContext = this.labelContainer.length && this.labelContainer || c(this.currentForm);
                this.containers = c(this.settings.errorContainer).add(this.settings.errorLabelContainer);
                this.submitted = {};
                this.valueCache = {};
                this.pendingRequest = 0;
                this.pending = {};
                this.invalid = {};
                this.reset();
                var b = this.groups = {};
                c.each(this.settings.groups, function(e, f) {
                    c.each(f.split(/\s/), function(g, h) {
                        b[h] = e
                    })
                });
                var d = this.settings.rules;
                c.each(d, function(e, f) {
                    d[e] = c.validator.normalizeRule(f)
                });
                c(this.currentForm).validateDelegate(":text, :password, :file, select, textarea", "focusin focusout keyup", a).validateDelegate(":radio, :checkbox, select, option", "click", a);
                this.settings.invalidHandler && c(this.currentForm).bind("invalid-form.validate", this.settings.invalidHandler)
            },
            form: function() {
                this.checkForm();
                c.extend(this.submitted, this.errorMap);
                this.invalid = c.extend({}, this.errorMap);
                this.valid() || c(this.currentForm).triggerHandler("invalid-form", [this]);
                this.showErrors();
                return this.valid()
            },
            checkForm: function() {
                this.prepareForm();
                for (var a = 0, b = this.currentElements = this.elements(); b[a]; a++) this.check(b[a]);
                return this.valid()
            },
            element: function(a) {
                this.lastElement = a = this.clean(a);
                this.prepareElement(a);
                this.currentElements = c(a);
                var b = this.check(a);
                if (b) delete this.invalid[a.name];
                else this.invalid[a.name] = true;
                if (!this.numberOfInvalids()) this.toHide = this.toHide.add(this.containers);
                this.showErrors();
                return b
            },
            showErrors: function(a) {
                if (a) {
                    c.extend(this.errorMap,
                        a);
                    this.errorList = [];
                    for (var b in a) this.errorList.push({
                        message: a[b],
                        element: this.findByName(b)[0]
                    });
                    this.successList = c.grep(this.successList, function(d) {
                        return !(d.name in a)
                    })
                }
                this.settings.showErrors ? this.settings.showErrors.call(this, this.errorMap, this.errorList) : this.defaultShowErrors()
            },
            resetForm: function() {
                c.fn.resetForm && c(this.currentForm).resetForm();
                this.submitted = {};
                this.prepareForm();
                this.hideErrors();
                this.elements().removeClass(this.settings.errorClass)
            },
            numberOfInvalids: function() {
                return this.objectLength(this.invalid)
            },
            objectLength: function(a) {
                var b = 0,
                    d;
                for (d in a) b++;
                return b
            },
            hideErrors: function() {
                this.addWrapper(this.toHide).hide()
            },
            valid: function() {
                return this.size() == 0
            },
            size: function() {
                return this.errorList.length
            },
            focusInvalid: function() {
                if (this.settings.focusInvalid) try {
                    c(this.findLastActive() || this.errorList.length && this.errorList[0].element || []).filter(":visible").focus().trigger("focusin")
                } catch (a) {}
            },
            findLastActive: function() {
                var a = this.lastActive;
                return a && c.grep(this.errorList, function(b) {
                    return b.element.name ==
                        a.name
                }).length == 1 && a
            },
            elements: function() {
                var a = this,
                    b = {};
                return c(this.currentForm).find("input, select, textarea").not(":submit, :reset, :image, [disabled]").not(this.settings.ignore).filter(function() {
                    !this.name && a.settings.debug && window.console && console.error("%o has no name assigned", this);
                    if (this.name in b || !a.objectLength(c(this).rules())) return false;
                    return b[this.name] = true
                })
            },
            clean: function(a) {
                return c(a)[0]
            },
            errors: function() {
                return c(this.settings.errorElement + "." + this.settings.errorClass,
                    this.errorContext)
            },
            reset: function() {
                this.successList = [];
                this.errorList = [];
                this.errorMap = {};
                this.toShow = c([]);
                this.toHide = c([]);
                this.currentElements = c([])
            },
            prepareForm: function() {
                this.reset();
                this.toHide = this.errors().add(this.containers)
            },
            prepareElement: function(a) {
                this.reset();
                this.toHide = this.errorsFor(a)
            },
            check: function(a) {
                a = this.clean(a);
                if (this.checkable(a)) a = this.findByName(a.name).not(this.settings.ignore)[0];
                var b = c(a).rules(),
                    d = false,
                    e;
                for (e in b) {
                    var f = {
                        method: e,
                        parameters: b[e]
                    };
                    try {
                        var g =
                            c.validator.methods[e].call(this, a.value.replace(/\r/g, ""), a, f.parameters);
                        if (g == "dependency-mismatch") d = true;
                        else {
                            d = false;
                            if (g == "pending") {
                                this.toHide = this.toHide.not(this.errorsFor(a));
                                return
                            }
                            if (!g) {
                                this.formatAndAdd(a, f);
                                return false
                            }
                        }
                    } catch (h) {
                        this.settings.debug && window.console && console.log("exception occured when checking element " + a.id + ", check the '" + f.method + "' method", h);
                        throw h;
                    }
                }
                if (!d) {
                    this.objectLength(b) && this.successList.push(a);
                    return true
                }
            },
            customMetaMessage: function(a, b) {
                if (c.metadata) {
                    var d =
                        this.settings.meta ? c(a).metadata()[this.settings.meta] : c(a).metadata();
                    return d && d.messages && d.messages[b]
                }
            },
            customMessage: function(a, b) {
                var d = this.settings.messages[a];
                return d && (d.constructor == String ? d : d[b])
            },
            findDefined: function() {
                for (var a = 0; a < arguments.length; a++)
                    if (arguments[a] !== undefined) return arguments[a]
            },
            defaultMessage: function(a, b) {
                return this.findDefined(this.customMessage(a.name, b), this.customMetaMessage(a, b), !this.settings.ignoreTitle && a.title || undefined, c.validator.messages[b], "<strong>Warning: No message defined for " +
                    a.name + "</strong>")
            },
            formatAndAdd: function(a, b) {
                var d = this.defaultMessage(a, b.method),
                    e = /\$?\{(\d+)\}/g;
                if (typeof d == "function") d = d.call(this, b.parameters, a);
                else if (e.test(d)) d = jQuery.format(d.replace(e, "{$1}"), b.parameters);
                this.errorList.push({
                    message: d,
                    element: a
                });
                this.errorMap[a.name] = d;
                this.submitted[a.name] = d
            },
            addWrapper: function(a) {
                if (this.settings.wrapper) a = a.add(a.parent(this.settings.wrapper));
                return a
            },
            defaultShowErrors: function() {
                for (var a = 0; this.errorList[a]; a++) {
                    var b = this.errorList[a];
                    this.settings.highlight && this.settings.highlight.call(this, b.element, this.settings.errorClass, this.settings.validClass);
                    this.showLabel(b.element, b.message)
                }
                if (this.errorList.length) this.toShow = this.toShow.add(this.containers);
                if (this.settings.success)
                    for (a = 0; this.successList[a]; a++) this.showLabel(this.successList[a]);
                if (this.settings.unhighlight) {
                    a = 0;
                    for (b = this.validElements(); b[a]; a++) this.settings.unhighlight.call(this, b[a], this.settings.errorClass, this.settings.validClass)
                }
                this.toHide = this.toHide.not(this.toShow);
                this.hideErrors();
                this.addWrapper(this.toShow).show()
            },
            validElements: function() {
                return this.currentElements.not(this.invalidElements())
            },
            invalidElements: function() {
                return c(this.errorList).map(function() {
                    return this.element
                })
            },
            showLabel: function(a, b) {
                var d = this.errorsFor(a);
                if (d.length) {
                    d.removeClass().addClass(this.settings.errorClass);
                    d.attr("generated") && d.html(b)
                } else {
                    d = c("<" + this.settings.errorElement + "/>").attr({
                        "for": this.idOrName(a),
                        generated: true
                    }).addClass(this.settings.errorClass).html(b ||
                        "");
                    if (this.settings.wrapper) d = d.hide().show().wrap("<" + this.settings.wrapper + "/>").parent();
                    this.labelContainer.append(d).length || (this.settings.errorPlacement ? this.settings.errorPlacement(d, c(a)) : d.insertAfter(a))
                }
                if (!b && this.settings.success) {
                    d.text("");
                    typeof this.settings.success == "string" ? d.addClass(this.settings.success) : this.settings.success(d)
                }
                this.toShow = this.toShow.add(d)
            },
            errorsFor: function(a) {
                var b = this.idOrName(a);
                return this.errors().filter(function() {
                    return c(this).attr("for") == b
                })
            },
            idOrName: function(a) {
                return this.groups[a.name] || (this.checkable(a) ? a.name : a.id || a.name)
            },
            checkable: function(a) {
                return /radio|checkbox/i.test(a.type)
            },
            findByName: function(a) {
                var b = this.currentForm;
                return c(document.getElementsByName(a)).map(function(d, e) {
                    return e.form == b && e.name == a && e || null
                })
            },
            getLength: function(a, b) {
                switch (b.nodeName.toLowerCase()) {
                    case "select":
                        return c("option:selected", b).length;
                    case "input":
                        if (this.checkable(b)) return this.findByName(b.name).filter(":checked").length
                }
                return a.length
            },
            depend: function(a, b) {
                return this.dependTypes[typeof a] ? this.dependTypes[typeof a](a, b) : true
            },
            dependTypes: {
                "boolean": function(a) {
                    return a
                },
                string: function(a, b) {
                    return !!c(a, b.form).length
                },
                "function": function(a, b) {
                    return a(b)
                }
            },
            optional: function(a) {
                return !c.validator.methods.required.call(this, c.trim(a.value), a) && "dependency-mismatch"
            },
            startRequest: function(a) {
                if (!this.pending[a.name]) {
                    this.pendingRequest++;
                    this.pending[a.name] = true
                }
            },
            stopRequest: function(a, b) {
                this.pendingRequest--;
                if (this.pendingRequest <
                    0) this.pendingRequest = 0;
                delete this.pending[a.name];
                if (b && this.pendingRequest == 0 && this.formSubmitted && this.form()) {
                    c(this.currentForm).submit();
                    this.formSubmitted = false
                } else if (!b && this.pendingRequest == 0 && this.formSubmitted) {
                    c(this.currentForm).triggerHandler("invalid-form", [this]);
                    this.formSubmitted = false
                }
            },
            previousValue: function(a) {
                return c.data(a, "previousValue") || c.data(a, "previousValue", {
                    old: null,
                    valid: true,
                    message: this.defaultMessage(a, "remote")
                })
            }
        },
        classRuleSettings: {
            required: {
                required: true
            },
            email: {
                email: true
            },
            url: {
                url: true
            },
            date: {
                date: true
            },
            dateISO: {
                dateISO: true
            },
            dateDE: {
                dateDE: true
            },
            number: {
                number: true
            },
            numberDE: {
                numberDE: true
            },
            digits: {
                digits: true
            },
            creditcard: {
                creditcard: true
            }
        },
        addClassRules: function(a, b) {
            a.constructor == String ? this.classRuleSettings[a] = b : c.extend(this.classRuleSettings, a)
        },
        classRules: function(a) {
            var b = {};
            (a = c(a).attr("class")) && c.each(a.split(" "), function() {
                this in c.validator.classRuleSettings && c.extend(b, c.validator.classRuleSettings[this])
            });
            return b
        },
        attributeRules: function(a) {
            var b = {};
            a = c(a);
            for (var d in c.validator.methods) {
                var e = a.attr(d);
                if (e) b[d] = e
            }
            b.maxlength && /-1|2147483647|524288/.test(b.maxlength) && delete b.maxlength;
            return b
        },
        metadataRules: function(a) {
            if (!c.metadata) return {};
            var b = c.data(a.form, "validator").settings.meta;
            return b ? c(a).metadata()[b] : c(a).metadata()
        },
        staticRules: function(a) {
            var b = {},
                d = c.data(a.form, "validator");
            if (d.settings.rules) b = c.validator.normalizeRule(d.settings.rules[a.name]) || {};
            return b
        },
        normalizeRules: function(a, b) {
            c.each(a, function(d, e) {
                if (e ===
                    false) delete a[d];
                else if (e.param || e.depends) {
                    var f = true;
                    switch (typeof e.depends) {
                        case "string":
                            f = !!c(e.depends, b.form).length;
                            break;
                        case "function":
                            f = e.depends.call(b, b)
                    }
                    if (f) a[d] = e.param !== undefined ? e.param : true;
                    else delete a[d]
                }
            });
            c.each(a, function(d, e) {
                a[d] = c.isFunction(e) ? e(b) : e
            });
            c.each(["minlength", "maxlength", "min", "max"], function() {
                if (a[this]) a[this] = Number(a[this])
            });
            c.each(["rangelength", "range"], function() {
                if (a[this]) a[this] = [Number(a[this][0]), Number(a[this][1])]
            });
            if (c.validator.autoCreateRanges) {
                if (a.min &&
                    a.max) {
                    a.range = [a.min, a.max];
                    delete a.min;
                    delete a.max
                }
                if (a.minlength && a.maxlength) {
                    a.rangelength = [a.minlength, a.maxlength];
                    delete a.minlength;
                    delete a.maxlength
                }
            }
            a.messages && delete a.messages;
            return a
        },
        normalizeRule: function(a) {
            if (typeof a == "string") {
                var b = {};
                c.each(a.split(/\s/), function() {
                    b[this] = true
                });
                a = b
            }
            return a
        },
        addMethod: function(a, b, d) {
            c.validator.methods[a] = b;
            c.validator.messages[a] = d != undefined ? d : c.validator.messages[a];
            b.length < 3 && c.validator.addClassRules(a, c.validator.normalizeRule(a))
        },
        methods: {
            required: function(a, b, d) {
                if (!this.depend(d, b)) return "dependency-mismatch";
                switch (b.nodeName.toLowerCase()) {
                    case "select":
                        return (a = c(b).val()) && a.length > 0;
                    case "input":
                        if (this.checkable(b)) return this.getLength(a, b) > 0;
                    default:
                        return c.trim(a).length > 0
                }
            },
            remote: function(a, b, d) {
                if (this.optional(b)) return "dependency-mismatch";
                var e = this.previousValue(b);
                this.settings.messages[b.name] || (this.settings.messages[b.name] = {});
                e.originalMessage = this.settings.messages[b.name].remote;
                this.settings.messages[b.name].remote =
                    e.message;
                d = typeof d == "string" && {
                    url: d
                } || d;
                if (this.pending[b.name]) return "pending";
                if (e.old === a) return e.valid;
                e.old = a;
                var f = this;
                this.startRequest(b);
                var g = {};
                g[b.name] = a;
                c.ajax(c.extend(true, {
                    url: d,
                    mode: "abort",
                    port: "validate" + b.name,
                    dataType: "json",
                    data: g,
                    success: function(h) {
                        f.settings.messages[b.name].remote = e.originalMessage;
                        var j = h === true;
                        if (j) {
                            var i = f.formSubmitted;
                            f.prepareElement(b);
                            f.formSubmitted = i;
                            f.successList.push(b);
                            f.showErrors()
                        } else {
                            i = {};
                            h = h || f.defaultMessage(b, "remote");
                            i[b.name] =
                                e.message = c.isFunction(h) ? h(a) : h;
                            f.showErrors(i)
                        }
                        e.valid = j;
                        f.stopRequest(b, j)
                    }
                }, d));
                return "pending"
            },
            minlength: function(a, b, d) {
                return this.optional(b) || this.getLength(c.trim(a), b) >= d
            },
            maxlength: function(a, b, d) {
                return this.optional(b) || this.getLength(c.trim(a), b) <= d
            },
            rangelength: function(a, b, d) {
                a = this.getLength(c.trim(a), b);
                return this.optional(b) || a >= d[0] && a <= d[1]
            },
            min: function(a, b, d) {
                return this.optional(b) || a >= d
            },
            max: function(a, b, d) {
                return this.optional(b) || a <= d
            },
            range: function(a, b, d) {
                return this.optional(b) ||
                    a >= d[0] && a <= d[1]
            },
            email: function(a, b) {
                return this.optional(b) || /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test(a)
            },
            url: function(a, b) {
                return this.optional(b) || /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(a)
            },
            date: function(a, b) {
                return this.optional(b) || !/Invalid|NaN/.test(new Date(a))
            },
            dateISO: function(a, b) {
                return this.optional(b) || /^\d{4}[\/-]\d{1,2}[\/-]\d{1,2}$/.test(a)
            },
            number: function(a, b) {
                return this.optional(b) || /^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/.test(a)
            },
            digits: function(a, b) {
                return this.optional(b) || /^\d+$/.test(a)
            },
            creditcard: function(a, b) {
                if (this.optional(b)) return "dependency-mismatch";
                if (/[^0-9-]+/.test(a)) return false;
                var d = 0,
                    e = 0,
                    f = false;
                a = a.replace(/\D/g, "");
                for (var g = a.length - 1; g >=
                    0; g--) {
                    e = a.charAt(g);
                    e = parseInt(e, 10);
                    if (f)
                        if ((e *= 2) > 9) e -= 9;
                    d += e;
                    f = !f
                }
                return d % 10 == 0
            },
            accept: function(a, b, d) {
                d = typeof d == "string" ? d.replace(/,/g, "|") : "png|jpe?g|gif";
                return this.optional(b) || a.match(RegExp(".(" + d + ")$", "i"))
            },
            equalTo: function(a, b, d) {
                d = c(d).unbind(".validate-equalTo").bind("blur.validate-equalTo", function() {
                    c(b).valid()
                });
                return a == d.val()
            }
        }
    });
    c.format = c.validator.format
})(jQuery);
(function(c) {
    var a = {};
    if (c.ajaxPrefilter) c.ajaxPrefilter(function(d, e, f) {
        e = d.port;
        if (d.mode == "abort") {
            a[e] && a[e].abort();
            a[e] = f
        }
    });
    else {
        var b = c.ajax;
        c.ajax = function(d) {
            var e = ("port" in d ? d : c.ajaxSettings).port;
            if (("mode" in d ? d : c.ajaxSettings).mode == "abort") {
                a[e] && a[e].abort();
                return a[e] = b.apply(this, arguments)
            }
            return b.apply(this, arguments)
        }
    }
})(jQuery);
(function(c) {
    !jQuery.event.special.focusin && !jQuery.event.special.focusout && document.addEventListener && c.each({
        focus: "focusin",
        blur: "focusout"
    }, function(a, b) {
        function d(e) {
            e = c.event.fix(e);
            e.type = b;
            return c.event.handle.call(this, e)
        }
        c.event.special[b] = {
            setup: function() {
                this.addEventListener(a, d, true)
            },
            teardown: function() {
                this.removeEventListener(a, d, true)
            },
            handler: function(e) {
                arguments[0] = c.event.fix(e);
                arguments[0].type = b;
                return c.event.handle.apply(this, arguments)
            }
        }
    });
    c.extend(c.fn, {
        validateDelegate: function(a,
            b, d) {
            return this.bind(b, function(e) {
                var f = c(e.target);
                if (f.is(a)) return d.apply(f, arguments)
            })
        }
    })
})(jQuery);
(function(a) {
    a.fn.visualize = function(c, b) {
        return a(this).each(function() {
            var s = a.extend({
                type: "bar",
                width: a(this).width(),
                height: a(this).height(),
                appendTitle: true,
                title: null,
                appendKey: true,
                rowFilter: " ",
                colFilter: " ",
                colors: ["#be1e2d", "#666699", "#92d5ea", "#ee8310", "#8d10ee", "#5a3b16", "#26a4ed", "#f45a90", "#e9e744"],
                textColors: [],
                parseDirection: "x",
                pieMargin: 20,
                pieLabelsAsPercent: true,
                pieLabelPos: "inside",
                lineWeight: 4,
                barGroupMargin: 10,
                barMargin: 1,
                yLabelInterval: 30
            }, c);
            s.width = parseFloat(s.width);
            s.height = parseFloat(s.height);
            var r = a(this);

            function A() {
                var o = s.colors;
                var C = s.textColors;
                var B = {
                    dataGroups: function() {
                        var D = [];
                        if (s.parseDirection == "x") {
                            r.find("tr:gt(0)").filter(s.rowFilter).each(function(G) {
                                D[G] = {};
                                D[G].points = [];
                                D[G].color = o[G];
                                if (C[G]) {
                                    D[G].textColor = C[G]
                                }
                                a(this).find("td").filter(s.colFilter).each(function() {
                                    D[G].points.push(parseFloat(a(this).text()))
                                })
                            })
                        } else {
                            var F = r.find("tr:eq(1) td").filter(s.colFilter).size();
                            for (var E = 0; E < F; E++) {
                                D[E] = {};
                                D[E].points = [];
                                D[E].color = o[E];
                                if (C[E]) {
                                    D[E].textColor = C[E]
                                }
                                r.find("tr:gt(0)").filter(s.rowFilter).each(function() {
                                    D[E].points.push(a(this).find("td").filter(s.colFilter).eq(E).text() * 1)
                                })
                            }
                        }
                        return D
                    },
                    allData: function() {
                        var D = [];
                        a(this.dataGroups()).each(function() {
                            D.push(this.points)
                        });
                        return D
                    },
                    dataSum: function() {
                        var E = 0;
                        var D = this.allData().join(",").split(",");
                        a(D).each(function() {
                            E += parseFloat(this)
                        });
                        return E
                    },
                    topValue: function() {
                        var E = 0;
                        var D = this.allData().join(",").split(",");
                        a(D).each(function() {
                            if (parseFloat(this, 10) > E) {
                                E = parseFloat(this)
                            }
                        });
                        return E
                    },
                    bottomValue: function() {
                        var E = 0;
                        var D = this.allData().join(",").split(",");
                        a(D).each(function() {
                            if (this < E) {
                                E = parseFloat(this)
                            }
                        });
                        return E
                    },
                    memberTotals: function() {
                        var E = [];
                        var D = this.dataGroups();
                        a(D).each(function(F) {
                            var G = 0;
                            a(D[F].points).each(function(H) {
                                G += D[F].points[H]
                            });
                            E.push(G)
                        });
                        return E
                    },
                    yTotals: function() {
                        var G = [];
                        var E = this.dataGroups();
                        var H = this.xLabels().length;
                        for (var F = 0; F < H; F++) {
                            G[F] = [];
                            var D = 0;
                            a(E).each(function(I) {
                                G[F].push(this.points[F])
                            });
                            G[F].join(",").split(",");
                            a(G[F]).each(function() {
                                D += parseFloat(this)
                            });
                            G[F] = D
                        }
                        return G
                    },
                    topYtotal: function() {
                        var D = 0;
                        var E = this.yTotals().join(",").split(",");
                        a(E).each(function() {
                            if (parseFloat(this, 10) > D) {
                                D = parseFloat(this)
                            }
                        });
                        return D
                    },
                    totalYRange: function() {
                        return this.topValue() - this.bottomValue()
                    },
                    xLabels: function() {
                        var D = [];
                        if (s.parseDirection == "x") {
                            r.find("tr:eq(0) th").filter(s.colFilter).each(function() {
                                D.push(a(this).html())
                            })
                        } else {
                            r.find("tr:gt(0) th").filter(s.rowFilter).each(function() {
                                D.push(a(this).html())
                            })
                        }
                        return D
                    },
                    yLabels: function() {
                        var F = [];
                        F.push(j);
                        var E = Math.round(s.height / s.yLabelInterval);
                        var D = Math.ceil(d / E) || 1;
                        while (F[F.length - 1] < p - D) {
                            F.push(F[F.length - 1] + D)
                        }
                        F.push(p);
                        return F
                    }
                };
                return B
            }
            var x = {
                pie: function() {
                    l.addClass("visualize-pie");
                    if (s.pieLabelPos == "outside") {
                        l.addClass("visualize-pie-outside")
                    }
                    var E = Math.round(h.width() / 2);
                    var D = Math.round(h.height() / 2);
                    var o = D - s.pieMargin;
                    var B = 0;
                    var C = function(G) {
                        return (Math.PI / 180) * G
                    };
                    var F = a('<ul class="visualize-labels"></ul>').insertAfter(h);
                    a.each(n, function(L) {
                        var Q = (this <= 0 || isNaN(this)) ? 0 : this / m;
                        t.beginPath();
                        t.moveTo(E, D);
                        t.arc(E, D, o, B * Math.PI * 2 - Math.PI * 0.5, (B + Q) * Math.PI * 2 - Math.PI * 0.5, false);
                        t.lineTo(E, D);
                        t.closePath();
                        t.fillStyle = e[L].color;
                        t.fill();
                        var O = (B + Q / 2);
                        var G = s.pieLabelPos == "inside" ? o / 1.5 : o + o / 5;
                        var K = Math.round(E + Math.sin(O * Math.PI * 2) * (G));
                        var J = Math.round(D - Math.cos(O * Math.PI * 2) * (G));
                        var H = (K > E) ? "right" : "left";
                        var I = (J > D) ? "bottom" : "top";
                        var R = parseFloat((Q * 100).toFixed(2));
                        if (R) {
                            var M = (s.pieLabelsAsPercent) ? R + "%" : this;
                            var P = a('<span class="visualize-label">' + M + "</span>").css(H, 0).css(I, 0);
                            if (P) {
                                var N = a('<li class="visualize-label-pos"></li>').appendTo(F).css({
                                    left: K,
                                    top: J
                                }).append(P)
                            }
                            P.css("font-size", o / 8).css("margin-" + H, -P.width() / 2).css("margin-" + I, -P.outerHeight() / 2);
                            if (e[L].textColor) {
                                P.css("color", e[L].textColor)
                            }
                        }
                        B += Q
                    })
                },
                line: function(E) {
                    if (E) {
                        l.addClass("visualize-area")
                    } else {
                        l.addClass("visualize-line")
                    }
                    var F = h.width() / (q.length - 1);
                    var C = a('<ul class="visualize-labels-x"></ul>').width(h.width()).height(h.height()).insertBefore(h);
                    a.each(q, function(I) {
                        var G = a("<li><span>" + this + "</span></li>").prepend('<span class="line" />').css("left", F * I).appendTo(C);
                        var H = G.find("span:not(.line)");
                        var J = H.width() / -2;
                        if (I == 0) {
                            J = 0
                        } else {
                            if (I == q.length - 1) {
                                J = -H.width()
                            }
                        }
                        H.css("margin-left", J).addClass("label")
                    });
                    var D = h.height() / d;
                    var o = h.height() / (y.length - 1);
                    var B = a('<ul class="visualize-labels-y"></ul>').width(h.width()).height(h.height()).insertBefore(h);
                    a.each(y, function(J) {
                        var G = a("<li><span>" + this + "</span></li>").prepend('<span class="line"  />').css("bottom", o * J).prependTo(B);
                        var H = G.find("span:not(.line)");
                        var I = H.height() / -2;
                        if (J == 0) {
                            I = -H.height()
                        } else {
                            if (J == y.length - 1) {
                                I = 0
                            }
                        }
                        H.css("margin-top", I).addClass("label")
                    });
                    t.translate(0, f);
                    a.each(e, function(I) {
                        t.beginPath();
                        t.lineWidth = s.lineWeight;
                        t.lineJoin = "round";
                        var H = this.points;
                        var G = 0;
                        t.moveTo(0, -(H[0] * D));
                        a.each(H, function() {
                            t.lineTo(G, -(this * D));
                            G += F
                        });
                        t.strokeStyle = this.color;
                        t.stroke();
                        if (E) {
                            t.lineTo(G, 0);
                            t.lineTo(0, 0);
                            t.closePath();
                            t.fillStyle = this.color;
                            t.globalAlpha = 0.3;
                            t.fill();
                            t.globalAlpha = 1
                        } else {
                            t.closePath()
                        }
                    })
                },
                area: function() {
                    x.line(true)
                },
                bar: function() {
                    l.addClass("visualize-bar");
                    var I = h.width() / (q.length);
                    var E = a('<ul class="visualize-labels-x"></ul>').width(h.width()).height(h.height()).insertBefore(h);
                    a.each(q, function(O) {
                        var M = a('<li><span class="label">' + this + "</span></li>").prepend('<span class="line" />').css("left", I * O).width(I).appendTo(E);
                        var N = M.find("span.label");
                        N.addClass("label")
                    });
                    var o = h.height() / d;
                    var F = h.height() / (y.length - 1);
                    var K = a('<ul class="visualize-labels-y"></ul>').width(h.width()).height(h.height()).insertBefore(h);
                    a.each(y, function(P) {
                        var M = a("<li><span>" + this + "</span></li>").prepend('<span class="line"  />').css("bottom", F * P).prependTo(K);
                        var N = M.find("span:not(.line)");
                        var O = N.height() / -2;
                        if (P == 0) {
                            O = -N.height()
                        } else {
                            if (P == y.length - 1) {
                                O = 0
                            }
                        }
                        N.css("margin-top", O).addClass("label")
                    });
                    t.translate(0, f);
                    for (var D = 0; D < e.length; D++) {
                        t.beginPath();
                        var G = (I - s.barGroupMargin * 2) / e.length;
                        var H = G - (s.barMargin * 2);
                        t.lineWidth = H;
                        var J = e[D].points;
                        var C = 0;
                        for (var B = 0; B < J.length; B++) {
                            var L = (C - s.barGroupMargin) + (D * G) + G / 2;
                            L += s.barGroupMargin * 2;
                            t.moveTo(L, 0);
                            t.lineTo(L, Math.round(-J[B] * o));
                            C += I
                        }
                        t.strokeStyle = e[D].color;
                        t.stroke();
                        t.closePath()
                    }
                }
            };
            var k = document.createElement("canvas");
            k.setAttribute("height", s.height);
            k.setAttribute("width", s.width);
            var h = a(k);
            var z = s.title || r.find("caption").text();
            var l = (b || a('<div class="visualize" role="img" aria-label="Chart representing data from the table: ' + z + '" />')).height(s.height).width(s.width).append(h);
            var g = A();
            var e = g.dataGroups();
            var w = g.allData();
            var m = g.dataSum();
            var p = g.topValue();
            var j = g.bottomValue();
            var n = g.memberTotals();
            var d = g.totalYRange();
            var f = s.height * (p / d);
            var q = g.xLabels();
            var y = g.yLabels();
            if (s.appendTitle || s.appendKey) {
                var i = a('<div class="visualize-info"></div>').appendTo(l)
            }
            if (s.appendTitle) {
                a('<div class="visualize-title">' + z + "</div>").appendTo(i)
            }
            if (s.appendKey) {
                var v = a('<ul class="visualize-key"></ul>');
                var u;
                if (s.parseDirection == "x") {
                    u = r.find("tr:gt(0) th").filter(s.rowFilter)
                } else {
                    u = r.find("tr:eq(0) th").filter(s.colFilter)
                }
                u.each(function(o) {
                    a('<li><span class="visualize-key-color" style="background: ' + e[o].color + '"></span><span class="visualize-key-label">' + a(this).text() + "</span></li>").appendTo(v)
                });
                v.appendTo(i)
            }
            if (!b) {
                l.insertAfter(this)
            }
            if (typeof(G_vmlCanvasManager) != "undefined") {
                G_vmlCanvasManager.init();
                G_vmlCanvasManager.initElement(h[0])
            }
            var t = h[0].getContext("2d");
            x[s.type]();
            a(".visualize-line li:first-child span.line, .visualize-line li:last-child span.line, .visualize-area li:first-child span.line, .visualize-area li:last-child span.line, .visualize-bar li:first-child span.line,.visualize-bar .visualize-labels-y li:last-child span.line").css("border", "none");
            if (!b) {
                l.bind("visualizeRefresh", function() {
                    r.visualize(s, a(this).empty())
                })
            }
        }).next()
    }
})(jQuery);
jQuery.fn.initMenu = function() {
    return this.each(function() {
        var a = $(this).get(0);
        $("li:has(ul)", this).each(function() {
            $(">a", this).append("<span class='arrow'></span>")
        });
        $(".sub", this).hide();
        $("li.expand > .sub", this).show();
        $("li.expand > .sub", this).prev().addClass("active");
        $("li a", this).click(function(d) {
            d.stopImmediatePropagation();
            var c = $(this).next();
            var b = this.parentNode.parentNode;
            if ($(this).hasClass("active-icon")) {
                $(this).addClass("non-active-icon");
                $(this).removeClass("active-icon")
            } else {
                $(this).addClass("active-icon");
                $(this).removeClass("non-active-icon")
            }
            if ($(b).hasClass("noaccordion")) {
                if (c[0] === undefined) {
                    window.location.href = this.href
                }
                $(c).slideToggle("normal", function() {
                    if ($(this).is(":visible")) {
                        $(this).prev().addClass("active")
                    } else {
                        $(this).prev().removeClass("active");
                        $(this).prev().removeClass("active-icon")
                    }
                });
                return false
            } else {
                if (c.hasClass("sub") && c.is(":visible")) {
                    if ($(b).hasClass("collapsible")) {
                        $(".sub:visible", b).first().slideUp("normal", function() {
                            $(this).prev().removeClass("active");
                            $(this).prev().removeClass("active-icon")
                        });
                        return false
                    }
                    return false
                }
                if (c.hasClass("sub") && !c.is(":visible")) {
                    $(".sub:visible", b).first().slideUp("normal", function() {
                        $(this).prev().removeClass("active");
                        $(this).prev().removeClass("active-icon")
                    });
                    c.slideDown("normal", function() {
                        $(this).prev().addClass("active")
                    });
                    return false
                }
            }
        })
    })
};
(function(a) {
    a.fn.slideList = function(b) {
        return a(this).each(function() {
            var d = a(this).css("padding-left");
            var c = a(this).css("padding-right");
            a(this).hover(function() {
                a(this).animate({
                    paddingLeft: parseInt(d) + parseInt(5) + "px"
                }, 130)
            }, function() {
                bc_hover = a(this).css("background-color");
                a(this).animate({
                    paddingLeft: d,
                    paddingRight: c
                }, 130)
            })
        })
    }
})(jQuery);
(function(a) {
    a.fn.alertBox = function(d, b) {
        var c = a.extend({}, a.fn.alertBox.defaults, b);
        this.each(function(f) {
            var j = a(this);
            var e = "alert " + c.type;
            if (c.noMargin) {
                e += " no-margin"
            }
            if (c.position) {
                e += " top"
            }
            var h = '<div id="alertBox-generated" style="display:none" class="' + e + '">' + d + "</div>";
            var g = j.prepend(h);
            a("#alertBox-generated").fadeIn()
        })
    };
    a.fn.alertBox.defaults = {
        type: "info",
        position: "top",
        noMargin: true
    }
})(jQuery);
(function(a) {
    a.fn.removeAlertBoxes = function(d, c) {
        var e = a(this);
        var b = e.find(".alert");
        b.remove()
    }
})(jQuery);
$("[placeholder]").focus(function() {
    var a = $(this);
    if (a.val() == a.attr("placeholder")) {
        a.val("");
        a.removeClass("placeholder")
    }
}).blur(function() {
    var a = $(this);
    if (a.val() == "" || a.val() == a.attr("placeholder")) {
        a.addClass("placeholder");
        a.val(a.attr("placeholder"))
    }
}).blur().parents("form").submit(function() {
    $(this).find("[placeholder]").each(function() {
        var a = $(this);
        if (a.val() == a.attr("placeholder")) {
            a.val("")
        }
    })
});
$.fn.resetForm = function() {
    $(this).removeAlertBoxes();
    return this.each(function() {
        if (typeof this.reset == "function" || (typeof this.reset == "object" && !this.reset.nodeType)) {
            this.reset()
        }
    })
};
(function(a) {
    a.fn.createTabs = function() {
        var b = a(this);
        b.find(".tab-content").hide();
        b.find("ul.tabs li:first").addClass("active").show();
        b.find(".tab-content:first").show();
        b.find("ul.tabs li").click(function() {
            b.find("ul.tabs li").removeClass("active");
            a(this).addClass("active");
            b.find(".tab-content").hide();
            var c = a(this).find("a").attr("href");
            a(c).fadeIn();
            return false
        })
    }
})(jQuery);
window.log = function() {
    log.history = log.history || [];
    log.history.push(arguments);
    if (this.console) {
        arguments.callee = arguments.callee.caller;
        var a = [].slice.call(arguments);
        (typeof console.log === "object" ? log.apply.call(console.log, console, a) : console.log.apply(console, a))
    }
};
(function(e) {
    function h() {}
    for (var g = "assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,timeStamp,profile,profileEnd,time,timeEnd,trace,warn".split(","), f; f = g.pop();) {
        e[f] = e[f] || h
    }
})((function() {
    try {
        console.log();
        return window.console
    } catch (a) {
        return window.console = {}
    }
})());
$(document).ready(function() {
    $(".menu").initMenu();
    $(".menu li a").slideList();
    $("a[href*=#]").bind("click", function(b) {
        b.preventDefault();
        var c = $(this).attr("href");
        if (c == "#top") {
            $.jGrowl("Scrolling to the top.", {
                theme: "information"
            })
        }
        $("html,body").animate({
            scrollTop: $(c).offset().top
        }, 1000, function() {})
    });
    $("span.hide").click(function() {
        $(this).parent().slideUp()
    });
    $(".toolbox-action").click(function() {
        $(".toolbox-content").fadeOut();
        $(this).next().fadeIn();
        return false
    });
    $(".close-toolbox").click(function() {
        $(this).parents(".toolbox-content").fadeOut()
    });
    $(".user-button").click(function() {
        $(".dropdown-username-menu").slideToggle()
    });
    $(document).click(function(b) {
        if (!$(b.target).is(".user-button, .arrow-link-down, .dropdown-username-menu *")) {
            $(".dropdown-username-menu").slideUp()
        }
    });
    var a;
    $(".user-button, ul.dropdown-username-menu").mouseleave(function(b) {
        a = setTimeout(function() {
            $(".dropdown-username-menu").slideUp()
        }, 400)
    });
    $(".user-button, ul.dropdown-username-menu").mouseenter(function(b) {
        clearTimeout(a)
    });
    $(".block-border .block-header span").click(function() {
        if ($(this).hasClass("closed")) {
            $(this).removeClass("closed")
        } else {
            $(this).addClass("closed")
        }
        $(this).parent().parent().children(".block-content").slideToggle()
    });
    $("a[rel=tooltip]").tipsy({
        fade: true
    });
    $("a[rel=tooltip-bottom]").tipsy({
        fade: true
    });
    $("a[rel=tooltip-right]").tipsy({
        fade: true,
        gravity: "w"
    });
    $("a[rel=tooltip-top]").tipsy({
        fade: true,
        gravity: "s"
    });
    $("a[rel=tooltip-left]").tipsy({
        fade: true,
        gravity: "e"
    });
    $("a[rel=tooltip-html]").tipsy({
        fade: true,
        html: true
    });
    $("div[rel=tooltip]").tipsy({
        fade: true
    })
});

$().ready(function() {
    $.validator.setDefaults({
        submitHandler: function(e) {
            $.jGrowl("Form was successfully submitted.", {
                theme: 'success'
            });
            $(e).parent().parent().fadeOut();
            v.resetForm();
            v2.resetForm();
            v3.resetForm();
        }
    });
    var v = $("#create-user-form").validate();
    jQuery("#reset").click(function() {
        v.resetForm();
        $.jGrowl("User was not created!", {
            theme: 'error'
        });
    });
    var v2 = $("#write-message-form").validate();
    jQuery("#reset2").click(function() {
        v2.resetForm();
        $.jGrowl("Message was not sent.", {
            theme: 'error'
        });
    });
    var v3 = $("#create-folder-form").validate();
    jQuery("#reset3").click(function() {
        v3.resetForm();
        $.jGrowl("Folder was not created!", {
            theme: 'error'
        });
    });
    var validateform = $("#validate-form").validate();
    $("#reset-validate-form").click(function() {
        validateform.resetForm();
        $.jGrowl("Blogpost was not created.", {
            theme: 'error'
        });
    });
    var validatelogin = $("#login-form").validate({
        invalidHandler: function(form, validator) {
            var errors = validator.numberOfInvalids();
            if (errors) {
                var message = errors == 1 ?
                    'You missed 1 field. It has been highlighted.' :
                    'You missed ' + errors + ' fields. They have been highlighted.';
                $('#login-form').removeAlertBoxes();
                $('#login-form').alertBox(message, {
                    type: 'error'
                });

            } else {
                $('#login-form').removeAlertBoxes();
            }
        }
    });
    jQuery("#reset-login").click(function() {
        validatelogin.resetForm();
    });
    $("#datepicker").datepicker();
    $('#table-example').dataTable();
    $('#graph-data').visualize({
        type: 'line',
        height: 250
    }).appendTo('#tab-line').trigger('visualizeRefresh');
    $('#graph-data').visualize({
        type: 'area',
        height: 250
    }).appendTo('#tab-area').trigger('visualizeRefresh');
    $('#graph-data').visualize({
        type: 'pie',
        height: 250
    }).appendTo('#tab-pie').trigger('visualizeRefresh');
    $('#graph-data').visualize({
        type: 'bar',
        height: 250
    }).appendTo('#tab-bar').trigger('visualizeRefresh');
    $("#specify-a-unique-tab-name").createTabs();
    $("#tab-graph").createTabs();
    $("#tab-panel-1").createTabs();
    $("#tab-panel-2").createTabs();
    $('#slider').sliderNav();
    $('#notification-success').click(function() {
        $.jGrowl("Hey, I'm a <strong>success</strong> message. :-)<br>I want to say you something...", {
            theme: 'success'
        });
    });
    $('#notification-error').click(function() {
        $.jGrowl("Hey, I'm a <strong>error</strong> message. :-)<br>I want to say you something...", {
            theme: 'error'
        });
    });
    $('#notification-information').click(function() {
        $.jGrowl("Hey, I'm a <strong>information</strong> message. :-)<br>I want to say you something...", {
            theme: 'information'
        });
    });
    $('#notification-warning').click(function() {
        $.jGrowl("Hey, I'm a <strong>warning</strong> message. :-)<br>I want to say you something...", {
            theme: 'warning'
        });
    });
    $('#notification-saved').click(function() {
        $.jGrowl("Hey, I'm a <strong>saved</strong> message. :-)<br>I want to say you something...", {
            theme: 'saved'
        });
    });
    $("select, input:checkbox, input:text, input:password, input:radio, input:file, textarea").uniform();
});