//funzione tovaglia, F() è la funzione che la fa cadere. all'interno c'è il timer che la fa cadere dopo 5 secondi.



function Tenda(data) {
  let qgotten = false;
  console.log('tenda timer: ' + timer)

  function m() {
    disasterVideo.init();
    disasterUI.init();
    document.body.classList.contains("dropped") ? document.body.classList.remove("dropped") : document.body.classList.add("dropped")
  }

  function x(a, c, h, f) {
    this.position = u(a, c);
    this.previous = u(a, c);
    this.original = u(a, c);
    this.a = new THREE.Vector3(0, 0, 0);
    this.mass = f;
    this.invMass = 1 / f;
    this.tmp = new THREE.Vector3;
    this.tmp2 = new THREE.Vector3
  }




  // if ($('#timer').html() == 0) {
  //   F()
  // }


  function A() {
    var a = {
      antialias: !0,
      alpha: !0
    };
    k = Detector.webgl ? new THREE.WebGLRenderer(a) : new THREE.CanvasRenderer(a);
    k.setPixelRatio(window.devicePixelRatio);
    k.setSize(window.innerWidth, window.innerHeight);
    k.setClearColor(0, 0);
    M.appendChild(k.domElement);
    k.gammaInput = !1;
    k.gammaOutput = !1;
    k.shadowMap.enabled = !1
  }

  function C() {
    p = new THREE.Scene;
    n = new THREE.OrthographicCamera(12.5 * -b + b, 12.5 * b - b, 12.5 * g, 12.5 * -g, .1, 1E4);
    n.position.z =
      1E3;
    p.add(n);
    p.add(new THREE.AmbientLight(0xffffff));
    var a = new THREE.DirectionalLight(16741475, 1);
    a.position.set(250, 100, 0);
    a.position.multiplyScalar(1.3);
    a.shadow.mapSize.width = 1024;
    a.shadow.mapSize.height = 1024;
    a.shadow.camera.left = -500;
    a.shadow.camera.right = 500;
    a.shadow.camera.top = 500;
    a.shadow.camera.bottom = -500;
    a.shadow.camera.far = 1E3;
    p.add(a)
  }

  function B() {
    var a = new THREE.TextureLoader,
      c = ["Dimensioni_min_tovaglia.png", "Dimensioni_med_tovaglia.png", "tovaglia.png"];
    if (.9 <= v) {
      var h = c[2];
      var f = 1;
      var G = 2;
      c = 1 * b
    } else h = c[0], f = 2, G = 1, c = 1.2 * g;
    a = a.load("assets/" + h);
    a.anisotropy = 16;
    a.repeat.set(f * b / c, G * g / c);
    a.offset.set(.5 * -(f * b / c) + .5, .5 * -(G * g / c) + .5);
    c = new THREE.MeshPhongMaterial({
      specular: 5000000,
      map: a,
      side: THREE.DoubleSide,
      alphaTest: 0.5
    });
    d = new THREE.ParametricGeometry(u, r.w, r.h);
    d.dynamic = !0;
    a = {
      texture: {
        value: a
      }
    };
    f = document.getElementById("vertexShaderDepth").textContent;
    G = document.getElementById("fragmentShaderDepth").textContent;
    l = new THREE.Mesh(d, c);
    l.position.set(0, 0 * g, 0);
    l.castShadow = !1;
    p.add(l);
    l.customDepthMaterial = new THREE.ShaderMaterial({
      uniforms: a,
      vertexShader: f,
      fragmentShader: G,
      side: THREE.DoubleSide
    })
  }

  function N() {
    k.setSize(window.innerWidth, window.innerHeight);
    n.left = 12.5 * -b + b;
    n.right = 12.5 * b - b;
    n.top = 12.5 * g;
    n.bottom = 12.5 * -g;
    n.updateProjectionMatrix()
  }

  function t() {
    requestAnimationFrame(t);
    var a = Date.now();
    z && H.set(-1, 1, Math.sin(a / 2E3)).normalize().multiplyScalar(E);
    if (z) {
      if (I) {
        var c, h = d.faces;
        var f = r.particles;
        a = 0;
        for (c = h.length; a < c; a++) {
          var b = h[a];
          var e = b.normal;
          w.copy(e).normalize().multiplyScalar(e.dot(H));
          f[b.a].addForce(w);
          f[b.b].addForce(w);
          f[b.c].addForce(w)
        }
        f = r.particles;
        a = 0;
        for (c = f.length; a < c; a++) b = f[a], b.addForce(J), b.integrate(K);
        f = r.constraints;
        c = f.length;
        for (a = 0; a < c; a++) {
          e = f[a];
          b = e[0];
          h = e[1];
          e = e[2];
          D.subVectors(h.position, b.position);
          var P = D.length();
          0 !== P && (e = D.multiplyScalar(1 - e / P).multiplyScalar(.5), b.position.add(e), h.position.sub(e))
        }
        floorpos = 12.5 * -g;
        f = r.particles;
        a = 0;
        for (c = f.length; a < c; a++) b = f[a], pos = b.position, pos.y < floorpos && (pos.y = floorpos);
        a = 0;
        for (c = q.length; a < c; a++) b = f[q[a]], b.position.copy(b.original),
          b.previous.copy(b.original)
      } else I = a;
      a = r.particles;
      c = a.length;
      f = 0;
      for (b = a.length; f < b; f++) a[f].position.y == -O && c--, d.vertices[f].copy(a[f].position);
      0 == c && (z = !z);
      d.computeFaceNormals();
      d.computeVertexNormals();
      d.normalsNeedUpdate = !0;
      d.verticesNeedUpdate = !0;
      k.render(p, n)
    }
  }
  var b = Math.ceil(window.innerWidth / 100),
    g = Math.ceil(window.innerHeight / 100),
    v = window.innerWidth / window.innerHeight;
  15 < b && b > g && (b = 15, g = Math.ceil(b / v));
  var u = function(a, c) {
      return function(h, b) {
        return new THREE.Vector3((h - .5) * a, (b + .5) *
          c, 0)
      }
    }(25 * b, 25 * g),
    r = new function(a, c) {
      function h(c, b) {
        return c + b * (a + 1)
      }
      a = a || 10;
      c = c || 10;
      this.w = a;
      this.h = c;
      var b = [],
        g = [],
        e, d;
      for (d = 0; d <= c; d++)
        for (e = 0; e <= a; e++) b.push(new x(e / a, d / c, 0, .05));
      for (d = 0; d < c; d++)
        for (e = 0; e < a; e++) g.push([b[h(e, d)], b[h(e, d + 1)], 25]), g.push([b[h(e, d)], b[h(e + 1, d)], 25]);
      e = a;
      for (d = 0; d < c; d++) g.push([b[h(e, d)], b[h(e, d + 1)], 25]);
      d = c;
      for (e = 0; e < a; e++) g.push([b[h(e, d)], b[h(e + 1, d)], 25]);
      this.particles = b;
      this.constraints = g;
      this.index = h
    }(b, g),
    J = (new THREE.Vector3(0, -(981 * 1.4), 0)).multiplyScalar(.05),
    K = .018 * .018,
    E = 2,
    H = new THREE.Vector3(0, 0, 0);
  new THREE.Vector3(0, -45, 0);
  var w = new THREE.Vector3,
    I, y = [],
    q = [],
    z = !0,
    n, p, k, d, l, E = 10;
  new THREE.Clock;
  var D = new THREE.Vector3,
    O = r.particles[0].position.y;
  var M = document.getElementById("threejs");
  if (Detector.webgl) {
    b = Math.ceil(window.innerWidth / 100);
    g = Math.ceil(window.innerHeight / 100);
    v = window.innerWidth / window.innerHeight;
    15 < b && b > g ? (b = 15, g = Math.ceil(b / v)) : 15 < g && g > b && (g = 15, b = Math.ceil(g / v));
    y = [];
    var L = b + 1;
    q = Array.apply(null, {
      length: L
    }).map(Number.call, Number);
    y.push([]);
    y.push(q);
    q = Array.apply(null, {
      length: L
    }).map(Number.call, Number);
    qgotten = true
    C();
    B();
    A();
    window.addEventListener("resize", N, !1);
    t();
  } else document.body.classList.add("no__webgl"), document.getElementById("toggle");
  x.prototype.addForce = function(a) {
    this.a.add(this.tmp2.copy(a).multiplyScalar(this.invMass))
  };

  x.prototype.integrate = function(a) {
    var c = this.tmp.subVectors(this.position, this.previous);
    c.multiplyScalar(.95).add(this.position);
    c.add(this.a.multiplyScalar(a));
    this.tmp = this.previous;
    this.previous = this.position;
    this.position = c;
    this.a.set(0, 0, 0)
  }

  function F() {

    if (qgotten)
    0 < q.length ? (q = y[0], document.body.classList.add("dropped")) :
      (E = 10, q = y[1], document.body.classList.remove("dropped"), z = !0, l && (l.visible = !0))
  }

  function startTimer() {
    if(timer==0){
      F()
    }

      if (timer == 5) {
      // document.getElementById("timer").style.display = 'none';
      // document.getElementById('stop').style.display = 'none';
      // document.getElementById('canvacontainer').style.display = 'none';
      F()
      }


  }

    display = document.querySelector('#timer');
   setInterval(startTimer, 1000)


};
