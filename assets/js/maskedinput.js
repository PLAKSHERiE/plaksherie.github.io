! function (e) {
	"function" == typeof define && define.amd ? define(["jquery"], e) : e("object" == typeof exports ? require("jquery") : jQuery)
}(function (S) {
	var a, e = navigator.userAgent,
		A = /iphone/i.test(e),
		i = /chrome/i.test(e),
		T = /android/i.test(e);
	S.mask = {
		definitions: {
			_: "[0-9]",
			a: "[A-Za-z]",
			"*": "[A-Za-z0-9]"
		},
		autoclear: !0,
		dataName: "mask",
		placeholder: "_"
	}, S.fn.extend({
		caret: function (e, t) {
			var n;
			if (0 !== this.length && !this.is(":hidden")) return "number" == typeof e ? (t = "number" == typeof t ? t : e, this.each(function () {
				this.setSelectionRange ? this.setSelectionRange(e, t) : this.createTextRange && ((n = this.createTextRange()).collapse(!0), n.moveEnd("character", t), n.moveStart("character", e), n.select())
			})) : (this[0].setSelectionRange ? (e = this[0].selectionStart, t = this[0].selectionEnd) : document.selection && document.selection.createRange && (n = document.selection.createRange(), e = 0 - n.duplicate().moveStart("character", -1e5), t = e + n.text.length), {
				begin: e,
				end: t
			})
		},
		unmask: function () {
			return this.trigger("unmask")
		},
		mask: function (t, v) {
			var n, k, b, y, x, j, R;
			if (!t && 0 < this.length) {
				var e = S(this[0]).data(S.mask.dataName);
				return e ? e() : void 0
			}
			return v = S.extend({
				autoclear: S.mask.autoclear,
				placeholder: S.mask.placeholder,
				completed: null
			}, v), n = S.mask.definitions, k = [], b = j = t.length, y = null, S.each(t.split(""), function (e, t) {
				"?" == t ? (j--, b = e) : n[t] ? (k.push(new RegExp(n[t])), null === y && (y = k.length - 1), e < b && (x = k.length - 1)) : k.push(null)
			}), this.trigger("unmask").each(function () {
				function o() {
					if (v.completed) {
						for (var e = y; e <= x; e++)
							if (k[e] && d[e] === c(e)) return;
						v.completed.call(m)
					}
				}

				function c(e) {
					return v.placeholder.charAt(e < v.placeholder.length ? e : 0)
				}

				function l(e) {
					for (; ++e < j && !k[e];);
					return e
				}

				function u(e, t) {
					var n, a;
					if (!(e < 0)) {
						for (n = e, a = l(t); n < j; n++)
							if (k[n]) {
								if (!(a < j && k[n].test(d[a]))) break;
								d[n] = d[a], d[a] = c(a), a = l(a)
							} s(), m.caret(Math.max(y, e))
					}
				}

				function r() {
					h(), m.val() != p && m.change()
				}

				function f(e, t) {
					var n;
					for (n = e; n < t && n < j; n++) k[n] && (d[n] = c(n))
				}

				function s() {
					m.val(d.join(""))
				}

				function h(e) {
					var t, n, a, i = m.val(),
						r = -1;
					for (a = t = 0; t < j; t++)
						if (k[t]) {
							for (d[t] = c(t); a++ < i.length;)
								if (n = i.charAt(a - 1), k[t].test(n)) {
									d[t] = n, r = t;
									break
								} if (a > i.length) {
								f(t + 1, j);
								break
							}
						} else d[t] === i.charAt(a) && a++, t < b && (r = t);
					return e ? s() : r + 1 < b ? v.autoclear || d.join("") === g ? (m.val() && m.val(""), f(0, j)) : s() : (s(), m.val(m.val().substring(0, r + 1))), b ? t : y
				}
				var m = S(this),
					d = S.map(t.split(""), function (e, t) {
						return "?" != e ? n[e] ? c(t) : e : void 0
					}),
					g = d.join(""),
					p = m.val();
				m.data(S.mask.dataName, function () {
					return S.map(d, function (e, t) {
						return k[t] && e != c(t) ? e : null
					}).join("")
				}), m.one("unmask", function () {
					m.off(".mask").removeData(S.mask.dataName)
				}).on("focus.mask", function () {
					var e;
					m.prop("readonly") || (clearTimeout(a), p = m.val(), e = h(), a = setTimeout(function () {
						m.get(0) === document.activeElement && (s(), e == t.replace("?", "").length ? m.caret(0, e) : m.caret(e))
					}, 10))
				}).on("blur.mask", r).on("keydown.mask", function (e) {
					if (!m.prop("readonly")) {
						var t, n, a, i = e.which || e.keyCode;
						R = m.val(), 8 === i || 46 === i || A && 127 === i ? (n = (t = m.caret()).begin, (a = t.end) - n == 0 && (n = 46 !== i ? function (e) {
							for (; 0 <= --e && !k[e];);
							return e
						}(n) : a = l(n - 1), a = 46 === i ? l(a) : a), f(n, a), u(n, a - 1), e.preventDefault()) : 13 === i ? r.call(this, e) : 27 === i && (m.val(p), m.caret(0, h()), e.preventDefault())
					}
				}).on("keypress.mask", function (e) {
					if (!m.prop("readonly")) {
						var t, n, a, i = e.which || e.keyCode,
							r = m.caret();
						if (!(e.ctrlKey || e.altKey || e.metaKey || i < 32) && i && 13 !== i) {
							if (r.end - r.begin != 0 && (f(r.begin, r.end), u(r.begin, r.end - 1)), (t = l(r.begin - 1)) < j && (n = String.fromCharCode(i), k[t].test(n))) {
								if (function (e) {
										var t, n, a, i;
										for (n = c(t = e); t < j; t++)
											if (k[t]) {
												if (a = l(t), i = d[t], d[t] = n, !(a < j && k[a].test(i))) break;
												n = i
											}
									}(t), d[t] = n, s(), a = l(t), T) {
									setTimeout(function () {
										S.proxy(S.fn.caret, m, a)()
									}, 0)
								} else m.caret(a);
								r.begin <= x && o()
							}
							e.preventDefault()
						}
					}
				}).on("input.mask paste.mask", function () {
					m.prop("readonly") || setTimeout(function () {
						var e = h(!0);
						m.caret(e), o()
					}, 0)
				}), i && T && m.off("input.mask").on("input.mask", function () {
					var e = m.val(),
						t = m.caret();
					if (R && R.length && R.length > e.length) {
						for (h(!0); 0 < t.begin && !k[t.begin - 1];) t.begin--;
						if (0 === t.begin)
							for (; t.begin < y && !k[t.begin];) t.begin++;
						m.caret(t.begin, t.begin)
					} else {
						for (h(!0); t.begin < j && !k[t.begin];) t.begin++;
						m.caret(t.begin, t.begin)
					}
					o()
				}), h()
			})
		}
	}), S(document).ready(function () {
		var e = S(".wpcf7-mask");
		e.length && e.each(function () {
			var e = S(this),
				t = e.data("mask");
			e.mask(t), "tel" != e.attr("type") && -1 == t.indexOf("*") && -1 == t.indexOf("a") && e.attr({
				inputmode: "numeric"
			})
		})
	})
});
