window.fancyFocus = function(){
	'use strict';

	return {
		FocusRing: function() {
			function FocusRing(explodeDistance) {
				this.explodeDistance = explodeDistance || 5;

				this.el = document.createElement('div');
				this.el.classList.add('focusring');
			}

			FocusRing.prototype.applyBoundingRect = function(offset) {
				this.el.style.top = (this.boundingRect.top - offset) + 'px';
				this.el.style.left = (this.boundingRect.left - offset) + 'px';
				this.el.style.width = (this.boundingRect.width + offset * 2) + 'px';
				this.el.style.height = (this.boundingRect.height + offset * 2) + 'px';
			}

			FocusRing.prototype.show = function () {
				if (this.removeTimeout) {
					clearTimeout(this.removeTimeout);
					delete this.removeTimeout;
				}
				if (!this.el.parentNode) {
					this.applyBoundingRect(this.explodeDistance);
					this.el.classList.add('hiding');
					document.body.appendChild(this.el);
				}

				setTimeout(function(){
					this.el.classList.remove('hiding');
					this.applyBoundingRect(0);
				}.bind(this), 0);
			};

			FocusRing.prototype.hide = function() {
				if (!this.el.parentNode) { return; }
				this.el.classList.add('hiding');
				this.applyBoundingRect(this.explodeDistance);
				this.removeTimeout = setTimeout(function() {
					delete this.removeTimeout;
					document.body.removeChild(this.el);
				}.bind(this), parseFloat(getComputedStyle(this.el).transitionDuration) * 1000);
			};

			FocusRing.prototype.moveTo = function(el) {
				this.boundingRect = el.getBoundingClientRect();
				this.applyBoundingRect(0);
			}

			return FocusRing;
		}(),

		addGlobalFocusRing: function () {
			var focusRing = new fancyFocus.FocusRing();

			window.addEventListener('focusin', function(e) {
				focusRing.moveTo(e.target);
				focusRing.show();
			});

			window.addEventListener('focusout', function(e) {
				if (e.relatedTarget) { return; }
				focusRing.hide();
			});
		},

		addLocalFocusRings: function() {
			window.addEventListener('focusin', function(e) {
				var focusRing = new fancyFocus.FocusRing();

				focusRing.moveTo(e.target);
				focusRing.show();

				window.addEventListener('focusout', function(e) {
					focusRing.hide();
				});
			});
		}
	};

}();
