document.addEventListener("DOMContentLoaded",(function(){function e(){var e=document.querySelectorAll(".wp-block-columns.is-reversed-direction-on-mobile"),r=window.matchMedia("(max-width: 768px)").matches;e.forEach((function(e){e.originalOrder||function(e){var r=Array.from(e.querySelectorAll(".wp-block-column"));e.originalOrder=r}(e),function(e,r){var t=Array.from(e.querySelectorAll(".wp-block-column")),n="true"===e.getAttribute("data-order-changed");r&&!n?(t.reverse().forEach((function(r){e.appendChild(r)})),e.setAttribute("data-order-changed","true")):!r&&n&&(e.originalOrder.forEach((function(r){e.appendChild(r)})),e.setAttribute("data-order-changed","false"))}(e,r)}))}e(),window.addEventListener("resize",e)}));