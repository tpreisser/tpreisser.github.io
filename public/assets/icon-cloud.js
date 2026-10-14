(function () {
  "use strict";

  var ICON_CLOUD_ITEMS = [
    { src: "/assets/icon-rsquared.webp",    size: 110 },
    { src: "/assets/icon-preisser.webp",    size: 110 },
    { src: "/assets/icon-ai-brain.webp",    size: 110 },
    { src: "/assets/icon-code.webp",        size: 127 },
    { src: "/assets/icon-bia.webp",         size: 143 },
    { src: "/assets/icon-skysprayers.webp", size: 143 },
    { src: "/assets/icon-podcast.webp",     size: 110 },
    { src: "/assets/icon-wifesupply.webp",  size: 110 },
    { src: "/assets/icon-truss.webp",       size: 110 },
    { src: "/assets/icon-motor.webp",       size: 143 },
  ];
  var ICON_CLOUD_IMAGES = ICON_CLOUD_ITEMS.map(function (i) { return i.src; });

  var MOUNT_ID = "icon-cloud-mount";
  var IS_MOBILE = window.innerWidth < 768;
  var CANVAS_SIZE = IS_MOBILE ? 320 : 580;
  var ICON_SIZE = IS_MOBILE ? 60 : 180;
  var SPHERE_RADIUS = IS_MOBILE ? 110 : 195;

  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function createIconCloud(container) {
    if (!ICON_CLOUD_IMAGES.length) return;

    var canvas = document.createElement("canvas");
    var dpr = window.devicePixelRatio || 1;
    canvas.width = CANVAS_SIZE * dpr;
    canvas.height = CANVAS_SIZE * dpr;
    canvas.style.width = CANVAS_SIZE + "px";
    canvas.style.height = CANVAS_SIZE + "px";
    canvas.style.maxWidth = "100%";
    canvas.style.display = "block";
    canvas.style.margin = "0 auto";
    canvas.style.borderRadius = "12px";
    canvas.setAttribute("aria-label", "Interactive icon cloud");
    canvas.setAttribute("role", "img");
    container.appendChild(canvas);

    var ctx = canvas.getContext("2d");
    ctx.scale(dpr, dpr);

    // Load images
    var imgElements = [];
    var imgLoaded = [];
    ICON_CLOUD_IMAGES.forEach(function (src, i) {
      var img = new Image();
      img.crossOrigin = "anonymous";
      imgLoaded[i] = false;
      img.onload = function () {
        imgLoaded[i] = true;
      };
      img.src = src;
      imgElements[i] = img;
    });

    // Fibonacci sphere distribution
    var numIcons = ICON_CLOUD_IMAGES.length;
    var icons = [];
    var offset = 2 / numIcons;
    var increment = Math.PI * (3 - Math.sqrt(5));
    for (var i = 0; i < numIcons; i++) {
      var y = i * offset - 1 + offset / 2;
      var r = Math.sqrt(1 - y * y);
      var phi = i * increment;
      icons.push({
        x: Math.cos(phi) * r * SPHERE_RADIUS,
        y: y * SPHERE_RADIUS,
        z: Math.sin(phi) * r * SPHERE_RADIUS,
      });
    }

    var rotation = { x: 0, y: 0 };
    var isDragging = false;
    var lastMouse = { x: 0, y: 0 };
    var mousePos = { x: CANVAS_SIZE / 2, y: CANVAS_SIZE / 2 };
    var targetRotation = null;
    var frameId = 0;

    canvas.addEventListener("mousedown", function (e) {
      isDragging = true;
      var rect = canvas.getBoundingClientRect();
      lastMouse.x = e.clientX;
      lastMouse.y = e.clientY;

      // Check if clicking an icon
      var mx = (e.clientX - rect.left) * dpr / (rect.width / CANVAS_SIZE);
      var my = (e.clientY - rect.top) * dpr / (rect.height / CANVAS_SIZE);
      var cosX = Math.cos(rotation.x), sinX = Math.sin(rotation.x);
      var cosY = Math.cos(rotation.y), sinY = Math.sin(rotation.y);
      for (var j = 0; j < icons.length; j++) {
        var icon = icons[j];
        var rx = icon.x * cosY - icon.z * sinY;
        var rz = icon.x * sinY + icon.z * cosY;
        var ry = icon.y * cosX + rz * sinX;
        var scale = (rz + 300) / 400;
        var sx = CANVAS_SIZE / 2 + rx;
        var sy = CANVAS_SIZE / 2 + ry;
        var hitSize = ((ICON_CLOUD_ITEMS[j] && ICON_CLOUD_ITEMS[j].size) || ICON_SIZE);
        hitSize = IS_MOBILE ? Math.round(hitSize * 0.55) : hitSize;
        var rad = (hitSize / 2) * scale;
        if ((mx - sx) * (mx - sx) + (my - sy) * (my - sy) < rad * rad) {
          var tX = -Math.atan2(icon.y, Math.sqrt(icon.x * icon.x + icon.z * icon.z));
          var tY = Math.atan2(icon.x, icon.z);
          var dist = Math.sqrt(Math.pow(tX - rotation.x, 2) + Math.pow(tY - rotation.y, 2));
          targetRotation = {
            x: tX, y: tY,
            startX: rotation.x, startY: rotation.y,
            startTime: performance.now(),
            duration: Math.min(2000, Math.max(800, dist * 1000)),
          };
          isDragging = false;
          break;
        }
      }
    });

    canvas.addEventListener("mousemove", function (e) {
      var rect = canvas.getBoundingClientRect();
      mousePos.x = (e.clientX - rect.left) * (CANVAS_SIZE / rect.width);
      mousePos.y = (e.clientY - rect.top) * (CANVAS_SIZE / rect.height);
      if (isDragging) {
        rotation.x += (e.clientY - lastMouse.y) * 0.004;
        rotation.y += (e.clientX - lastMouse.x) * 0.004;
        lastMouse.x = e.clientX;
        lastMouse.y = e.clientY;
      }
    });

    canvas.addEventListener("mouseup", function () { isDragging = false; });
    canvas.addEventListener("mouseleave", function () { isDragging = false; });

    // Touch support
    canvas.addEventListener("touchstart", function (e) {
      isDragging = true;
      lastMouse.x = e.touches[0].clientX;
      lastMouse.y = e.touches[0].clientY;
    }, { passive: true });
    canvas.addEventListener("touchmove", function (e) {
      if (isDragging && e.touches.length) {
        rotation.x += (e.touches[0].clientY - lastMouse.y) * 0.004;
        rotation.y += (e.touches[0].clientX - lastMouse.x) * 0.004;
        lastMouse.x = e.touches[0].clientX;
        lastMouse.y = e.touches[0].clientY;
      }
    }, { passive: true });
    canvas.addEventListener("touchend", function () { isDragging = false; }, { passive: true });

    function animate() {
      ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
      var cx = CANVAS_SIZE / 2, cy = CANVAS_SIZE / 2;
      var maxDist = Math.sqrt(cx * cx + cy * cy);
      var dx = mousePos.x - cx, dy = mousePos.y - cy;
      var dist = Math.sqrt(dx * dx + dy * dy);
      var speed = 0.002 + (dist / maxDist) * 0.006;

      if (targetRotation) {
        var elapsed = performance.now() - targetRotation.startTime;
        var progress = Math.min(1, elapsed / targetRotation.duration);
        var eased = easeOutCubic(progress);
        rotation.x = targetRotation.startX + (targetRotation.x - targetRotation.startX) * eased;
        rotation.y = targetRotation.startY + (targetRotation.y - targetRotation.startY) * eased;
        if (progress >= 1) targetRotation = null;
      } else if (!isDragging) {
        rotation.x += (dy / CANVAS_SIZE) * speed;
        rotation.y += (dx / CANVAS_SIZE) * speed;
      }

      var cosX = Math.cos(rotation.x), sinX = Math.sin(rotation.x);
      var cosY = Math.cos(rotation.y), sinY = Math.sin(rotation.y);

      // Sort icons by z-depth for proper layering
      var sorted = icons.map(function (icon, idx) {
        var rx = icon.x * cosY - icon.z * sinY;
        var rz = icon.x * sinY + icon.z * cosY;
        var ry = icon.y * cosX + rz * sinX;
        var finalZ = icon.y * (-sinX) + rz * cosX;
        return { rx: rx, ry: ry, rz: finalZ, idx: idx };
      });
      sorted.sort(function (a, b) { return a.rz - b.rz; });

      sorted.forEach(function (item) {
        var scale = (item.rz + 300) / 400;
        var opacity = Math.max(0.15, Math.min(1, (item.rz + 200) / 280));
        if (scale < 0.1) return;

        ctx.save();
        ctx.translate(cx + item.rx, cy + item.ry);
        ctx.scale(scale, scale);
        ctx.globalAlpha = opacity;

        var rawSize = (ICON_CLOUD_ITEMS[item.idx] && ICON_CLOUD_ITEMS[item.idx].size) || ICON_SIZE;
        var iSize = IS_MOBILE ? Math.round(rawSize * 0.55) : rawSize;
        if (imgElements[item.idx] && imgLoaded[item.idx]) {
          ctx.drawImage(
            imgElements[item.idx],
            -iSize / 2, -iSize / 2,
            iSize, iSize
          );
        } else {
          // Placeholder circle while loading
          ctx.beginPath();
          ctx.arc(0, 0, iSize / 2, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(196,132,62,0.3)";
          ctx.fill();
        }
        ctx.restore();
      });

      frameId = requestAnimationFrame(animate);
    }

    animate();

    // Cleanup on unmount
    return function () {
      cancelAnimationFrame(frameId);
    };
  }

  // Mount when the target div appears
  function tryMount() {
    var el = document.getElementById(MOUNT_ID);
    if (el && !el.dataset.mounted) {
      el.dataset.mounted = "true";
      createIconCloud(el);
    }
  }

  // Observe DOM for the mount point
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      tryMount();
      var obs = new MutationObserver(tryMount);
      obs.observe(document.body, { childList: true, subtree: true });
    });
  } else {
    tryMount();
    var obs = new MutationObserver(tryMount);
    obs.observe(document.body, { childList: true, subtree: true });
  }

  // Expose image config for easy updates
  window.__ICON_CLOUD_IMAGES = ICON_CLOUD_IMAGES;
  window.__ICON_CLOUD_SET_IMAGES = function (images) {
    ICON_CLOUD_IMAGES.length = 0;
    images.forEach(function (img) { ICON_CLOUD_IMAGES.push(img); });
    var el = document.getElementById(MOUNT_ID);
    if (el) {
      el.dataset.mounted = "";
      el.innerHTML = "";
      tryMount();
    }
  };
})();
