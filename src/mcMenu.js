/**
 * jQuery Mobile McMenu
 *
 * @author DaVee8k
 * @version 0.13.4
 * @license WTFNMFPL 1.0
 */
(function ($) {
	$.fn.mcMenu = function (option) {
		var self = this;
		this.widthLimit = option['width'] !== undefined ? option['width'] : null;
		this.button = option['button'] !== undefined ? option['button'] : null;
		this.buttonActive = option['buttonActive'] !== undefined ? option['buttonActive'] : "active";
		this.clickable = option['clickable'] !== undefined ? option['clickable'] : false;
		this.list = option['list'] !== undefined ? option['list'] : 'ul';
		this.subMenu = option['subMenu'] !== undefined ? option['subMenu'] : null;
		this.duration = 300;

		/**
		 * Check if menu is in hamburger mode
		 * @returns {Boolean}
		 */
		this.isMobile = function () {
			return !this.widthLimit || ($(window).outerWidth(true) || window.outerWidth) <= this.widthLimit;
		};

		/**
		 * Add submenu expand button
		 * @param {String} parent
		 */
		this.addSubmenu = function (parent) {
			$(parent).append('<span class="menu-mobile-expand">+</span>');
			if ($(parent).children("a").length > 0) {
				$(parent).children(".menu-mobile-expand").addClass("menu-mobile-split").click( function () {
					self.toggleMenu(parent);
				});
			}
			else {
				$(parent).children("a, .menu-mobile-expand").click( function () {
					self.toggleMenu(parent);
				});
			}
		};

		/**
		 * Expand menu
		 * @param {String} parent
		 */
		this.toggleMenu = function (parent) {
			$(parent).children(self.list).stop(true).slideToggle(self.duration, function () {
				var expander = $(parent).children(".menu-mobile-expand");
				if ($(expander).hasClass("menu-mobile-close")) {
					$(expander).removeClass("menu-mobile-close").html("+");
					$(this)[0].style.display = '';
				}
				else $(expander).addClass("menu-mobile-close").html("-");
			});
		};

		$(this).removeClass("nojs");

		// insert expand button
		if (this.subMenu) {
			$(this).find(this.subMenu).each( function () {
				self.addSubmenu($(this).closest("li"));
			});
		}

		// disable link in button
		if (!this.clickable && ("ontouchstart" in document.documentElement)) {
			$(this).find("a").click( function () {
				var elm = $(self).children(self.list);
				return $(elm).is(":visible") && !$(elm).is(":animated");
			});
		}

		if (this.button) {
			$(this.button).click( function () {
				if ($(self.button).hasClass(self.buttonActive)) {
					$(self.button).removeClass(self.buttonActive);
					$(self).children(self.list).stop(true).slideUp(self.duration);
				}
				else {
					$(self.button).addClass(self.buttonActive);
					$(self).children(self.list).stop(true).slideDown(self.duration);
				}
				return false;
			});
		}
		else {
			$(this).has(self.list).on({
				"touchend mouseenter": function (e) {
					if (self.isMobile()) {
						if (e.type == "touchend" && e.target == $(self)[0]) {
							$(this).children(self.list).stop(true).slideToggle(self.duration, function () {
								if (!$(this).is(":visible")) {
									$(this)[0].style.display = '';
									$(self).find(".menu-mobile-close").click();
								}
							});
							return false;
						}
						else $(this).children(self.list).stop(true).slideDown(self.duration);
					}
				},
				"mouseleave": function (e) {
					if (self.isMobile()) {
						$(this).children(self.list).stop(true).slideUp(self.duration, function () {
							$(this)[0].style.display = '';
							$(self).find(".menu-mobile-close").click();
						});
					}
				}
			});
		}

		// osx
		if (option['hide'] !== undefined) {
			$(option['hide']).on("touchstart", function () {
				if (self.isMobile()) {
					$(self).children(self.list).stop(true).slideUp(self.duration);
				}
			});
		}
	};
}(jQuery));