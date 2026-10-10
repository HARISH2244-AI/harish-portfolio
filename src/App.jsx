import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";
import "./App.css";
import profile from "./assets/profile.png";
import html5Cert from "./assets/certificates/html5-certificate.png";
import cCert from "./assets/certificates/c-programming-certificate.png";
import {
  FaGithub,
  FaLinkedinIn,
  FaInstagram,
  FaRegEnvelope,
  FaPaperPlane,
  FaGraduationCap,
  FaMapMarkerAlt,
  FaBullseye,
  FaCog,
  FaUser,
  FaDownload,
  FaArrowRight,
  FaPython,
  FaJava,
  FaReact,
  FaHtml5,
  FaCss3Alt,
  FaNodeJs,
  FaMicrochip,
  FaBrain,
  FaProjectDiagram,
  FaAward,
} from "react-icons/fa";
import { SiJavascript, SiMongodb, SiArduino } from "react-icons/si";

gsap.registerPlugin(ScrollTrigger);

/* ================== EDIT YOUR DETAILS HERE ================== */
const GITHUB = "https://github.com/HARISH2244-AI";
const LINKEDIN = "https://www.linkedin.com/in/your-linkedin"; // <-- change
const INSTAGRAM = "https://www.instagram.com/your-instagram"; // <-- change
const EMAIL = "nharish748@gmail.com";

const navLinks = [
  ["Home", "home"],
  ["About", "about"],
  ["Skills", "skills"],
  ["Projects", "projects"],
  ["Certificates", "certificates"],
  ["Contact", "contact"],
];

const keywords = ["AI", "Full Stack"];

const skills = [
  { name: "Python", icon: <FaPython color="#3776AB" /> },
  { name: "Java", icon: <FaJava color="#E76F00" /> },
  { name: "React", icon: <FaReact color="#00B7E8" /> },
  { name: "JavaScript", icon: <SiJavascript color="#F7DF1E" /> },
  {
    name: "HTML/CSS",
    icon: (
      <>
        <FaHtml5 color="#E34F26" />
        <FaCss3Alt color="#1572B6" />
      </>
    ),
    pair: true,
  },
  { name: "Node.js", icon: <FaNodeJs color="#339933" /> },
  { name: "MongoDB", icon: <SiMongodb color="#47A248" /> },
  { name: "Arduino", icon: <SiArduino color="#00979D" /> },
    { name: "AI", icon: <FaBrain color="#3B5BDB" /> },
];

const projects = [
  {
    title: "SolarMind AI",
    type: "AI + IoT",
    desc: "AI-based rooftop solar monitoring with an automatic dry cleaning system that keeps panels efficient and reduces manual maintenance.",
    tags: ["AI", "IoT", "Solar Energy", "Automation"],
    demo: "", // paste live demo link
    code: GITHUB, // paste repo link
  },
  {
    title: "Fake Payment Screenshot Detection",
    type: "AI Fraud Detection",
    desc: "AI-powered fraud detection system that verifies UPI payment screenshots and prevents fake payment scams.",
    tags: ["Python", "AI", "Image Analysis", "Security"],
    demo: "",
    code: GITHUB,
  },
];

const certificates = [
  {
    title: "HTML5 - The Language",
    issuer: "Infosys Springboard",
    date: "May 25, 2026",
    img: html5Cert,
    link: "https://verify.onwingspan.com",
  },
  {
    title: "C Programming Course",
    issuer: "Infosys Springboard",
    date: "May 17, 2026",
    img: cCert,
    link: "https://verify.onwingspan.com",
  },
  // To add more: import the image above, then add another { title, issuer, date, img, link } here
];
/* ============================================================ */

/* ---------- helpers ---------- */
const finePointer = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(hover: hover) and (pointer: fine)").matches;

const reducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* things the cursor ring grows over */
const HOVER_TARGETS =
  "a, button, input, textarea, .skill-tile, .info-card, .project, .cert-card";

/* things that get pulled toward the mouse */
const MAGNETIC_TARGETS = ".btn, .resume-btn, .know-more, .socials a";

/* =====================================================
   CUSTOM CURSOR  (orange dot + lagging ring, scales on hover)
   ===================================================== */
function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    if (!finePointer()) return undefined; // touch screens keep the normal cursor

    const dot = dotRef.current;
    const ring = ringRef.current;
    document.body.classList.add("has-cursor");

    gsap.set([dot, ring], { xPercent: -50, yPercent: -50, opacity: 0 });

    // dot is quick, ring lags behind
    const dotX = gsap.quickTo(dot, "x", { duration: 0.1, ease: "power3.out" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.1, ease: "power3.out" });
    const ringX = gsap.quickTo(ring, "x", { duration: 0.55, ease: "power3.out" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.55, ease: "power3.out" });

    let shown = false;
    let hovered = false;

    const show = () => {
      gsap.to([dot, ring], { opacity: 1, duration: 0.3, overwrite: "auto" });
    };

    const setHover = (value) => {
      if (value === hovered) return;
      hovered = value;
      ring.classList.toggle("hover", value);
      gsap.to(ring, {
        scale: value ? 1.9 : 1,
        duration: 0.4,
        ease: "power3.out",
        overwrite: "auto",
      });
      gsap.to(dot, {
        scale: value ? 0.4 : 1,
        duration: 0.25,
        ease: "power3.out",
        overwrite: "auto",
      });
    };

    const onMove = (e) => {
      if (!shown) {
        shown = true;
        gsap.set([dot, ring], { x: e.clientX, y: e.clientY });
        show();
      }
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    };

    const onOver = (e) => {
      if (e.target.closest && e.target.closest(HOVER_TARGETS)) setHover(true);
    };

    const onOut = (e) => {
      const to = e.relatedTarget;
      if (!to) {
        gsap.to([dot, ring], { opacity: 0, duration: 0.25, overwrite: "auto" });
        setHover(false);
        return;
      }
      if (!(to.closest && to.closest(HOVER_TARGETS))) setHover(false);
    };

    const onEnterWindow = () => {
      if (shown) show();
    };

    const onDown = () => {
      gsap.to(ring, {
        scale: hovered ? 1.45 : 0.75,
        duration: 0.2,
        overwrite: "auto",
      });
    };

    const onUp = () => {
      gsap.to(ring, {
        scale: hovered ? 1.9 : 1,
        duration: 0.35,
        ease: "back.out(2)",
        overwrite: "auto",
      });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    document.documentElement.addEventListener("mouseenter", onEnterWindow);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      document.documentElement.removeEventListener("mouseenter", onEnterWindow);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      gsap.killTweensOf([dot, ring]);
      document.body.classList.remove("has-cursor");
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
    </>
  );
}

/* =====================================================
   THREE.JS HERO BACKGROUND
   gold/orange particle network + a rotating wireframe core
   ===================================================== */
function makeDotTexture() {
  const c = document.createElement("canvas");
  c.width = 64;
  c.height = 64;
  const g = c.getContext("2d");
  const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0, "rgba(255,255,255,1)");
  grad.addColorStop(0.6, "rgba(255,255,255,1)");
  grad.addColorStop(1, "rgba(255,255,255,0)");
  g.fillStyle = grad;
  g.beginPath();
  g.arc(32, 32, 32, 0, Math.PI * 2);
  g.fill();
  return new THREE.CanvasTexture(c);
}

function HeroScene() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return undefined;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "low-power",
      });
    } catch (err) {
      return undefined; // no WebGL: the page just has no 3D background
    }

    const still = reducedMotion();
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
    camera.position.z = 10;

    const GOLD = new THREE.Color("#d4af37");
    const ORANGE = new THREE.Color("#ff7a00");

    /* ----- particle network ----- */
    const network = new THREE.Group();
    scene.add(network);

    const COUNT = 64;
    const unit = [];
    const positions = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i += 1) {
      const p = [Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() - 0.5];
      unit.push(p);
      positions.set(p, i * 3);
      const c = i % 4 === 0 ? ORANGE : GOLD;
      colors.set([c.r, c.g, c.b], i * 3);
    }

    const pointsGeo = new THREE.BufferGeometry();
    pointsGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    pointsGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    const dotTexture = makeDotTexture();
    const pointsMat = new THREE.PointsMaterial({
      size: 0.2,
      map: dotTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      depthWrite: false,
      sizeAttenuation: true,
    });
    network.add(new THREE.Points(pointsGeo, pointsMat));

    const linesMat = new THREE.LineBasicMaterial({
      color: GOLD,
      transparent: true,
      opacity: 0.28,
    });
    let linesGeo = null;
    let lineMesh = null;

    const buildLines = (sx, sy, sz) => {
      const seg = [];
      for (let i = 0; i < COUNT; i += 1) {
        for (let j = i + 1; j < COUNT; j += 1) {
          const dx = (unit[i][0] - unit[j][0]) * sx;
          const dy = (unit[i][1] - unit[j][1]) * sy;
          const dz = (unit[i][2] - unit[j][2]) * sz;
          if (Math.hypot(dx, dy, dz) < 2.4) seg.push(...unit[i], ...unit[j]);
        }
      }
      linesGeo = new THREE.BufferGeometry();
      linesGeo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(seg), 3));
      lineMesh = new THREE.LineSegments(linesGeo, linesMat);
      network.add(lineMesh);
    };

    /* ----- wireframe core (sits behind the photo) ----- */
    const core = new THREE.Group();
    scene.add(core);

    const outerGeo = new THREE.IcosahedronGeometry(1.7, 1);
    const outerWire = new THREE.WireframeGeometry(outerGeo);
    const outerMat = new THREE.LineBasicMaterial({
      color: ORANGE,
      transparent: true,
      opacity: 0.35,
    });
    core.add(new THREE.LineSegments(outerWire, outerMat));

    const innerGeo = new THREE.IcosahedronGeometry(1.0, 0);
    const innerWire = new THREE.WireframeGeometry(innerGeo);
    const innerMat = new THREE.LineBasicMaterial({
      color: GOLD,
      transparent: true,
      opacity: 0.55,
    });
    const inner = new THREE.LineSegments(innerWire, innerMat);
    core.add(inner);

    const orbitGeo = new THREE.TorusGeometry(2.4, 0.012, 8, 160);
    const orbitMat = new THREE.MeshBasicMaterial({
      color: GOLD,
      transparent: true,
      opacity: 0.55,
    });
    const orbit = new THREE.Mesh(orbitGeo, orbitMat);
    orbit.rotation.x = 1.15;
    core.add(orbit);

    /* ----- sizing ----- */
    let baseX = 0;
    let baseY = 0;
    let linesBuilt = false;

    const resize = () => {
      const w = mount.clientWidth || 1;
      const h = mount.clientHeight || 1;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();

      const visH = 2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.position.z;
      const visW = visH * camera.aspect;
      const sx = (visW / 2) * 1.05;
      const sy = (visH / 2) * 1.05;
      network.scale.set(sx, sy, 3);

      const narrow = w < 900;
      baseX = narrow ? 0 : visW * 0.21;
      baseY = narrow ? -visH * 0.12 : -visH * 0.04;
      core.scale.setScalar(narrow ? 0.8 : Math.min(1.3, visH / 7.5));
      core.position.set(baseX, baseY, -1.5);

      if (!linesBuilt) {
        linesBuilt = true;
        buildLines(sx, sy, 3);
      }
      if (still) renderer.render(scene, camera);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(mount);

    /* ----- interaction ----- */
    const mouse = { x: 0, y: 0 };
    const smooth = { x: 0, y: 0 };
    const onMove = (e) => {
      const r = mount.getBoundingClientRect();
      mouse.x = ((e.clientX - r.left) / r.width) * 2 - 1;
      mouse.y = -(((e.clientY - r.top) / r.height) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    const scrollState = { p: 0 };
    const st = ScrollTrigger.create({
      trigger: mount,
      start: "top top",
      end: "bottom top",
      scrub: true,
      onUpdate: (self) => {
        scrollState.p = self.progress;
      },
    });

    let visible = true;
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    io.observe(mount);

    /* ----- animation loop (shares GSAP's ticker) ----- */
    const tick = (time) => {
      if (!visible) return;

      smooth.x += (mouse.x - smooth.x) * 0.05;
      smooth.y += (mouse.y - smooth.y) * 0.05;

      network.rotation.y = smooth.x * 0.12 + Math.sin(time * 0.15) * 0.05;
      network.rotation.x = -smooth.y * 0.08;
      network.position.y = Math.sin(time * 0.4) * 0.15;

      core.position.x = baseX + smooth.x * 0.25;
      core.position.y = baseY + smooth.y * 0.15 + Math.sin(time * 0.6) * 0.1;
      core.rotation.y = time * 0.25 + scrollState.p * 2.5;
      core.rotation.x = time * 0.12 + smooth.y * 0.3;
      inner.rotation.y = -time * 0.45;
      inner.rotation.x = time * 0.2;
      orbit.rotation.z = time * 0.3;

      renderer.render(scene, camera);
    };
    if (!still) gsap.ticker.add(tick);

    // soft fade-in
    gsap.fromTo(
      mount,
      { opacity: 0 },
      { opacity: 1, duration: 1.8, delay: 0.3, ease: "power2.out" }
    );

    return () => {
      gsap.ticker.remove(tick);
      gsap.killTweensOf(mount);
      window.removeEventListener("pointermove", onMove);
      ro.disconnect();
      io.disconnect();
      st.kill();

      [pointsGeo, linesGeo, outerGeo, outerWire, innerGeo, innerWire, orbitGeo].forEach(
        (g) => g && g.dispose()
      );
      [pointsMat, linesMat, outerMat, innerMat, orbitMat, dotTexture].forEach((m) =>
        m.dispose()
      );
      renderer.dispose();
      if (renderer.forceContextLoss) renderer.forceContextLoss();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="hero-canvas" aria-hidden="true" />;
}

/* =====================================================
   APP
   ===================================================== */
function App() {
  const root = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [lightbox, setLightbox] = useState(null); // certificate shown full size

  /* ---------- GSAP: intro + scroll animations ---------- */
  useLayoutEffect(() => {
    if (reducedMotion()) return undefined; // everything stays visible and still

    const ctx = gsap.context(() => {
      /* hero intro */
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".navbar", { yPercent: -100, duration: 0.7 })
        .from(".circle", { scale: 0.6, opacity: 0, duration: 1.2, ease: "expo.out" }, 0.1)
        .from(".ring", { rotate: -150, opacity: 0, duration: 1.5, ease: "expo.out" }, 0.2)
        .from(".hero-photo", { y: 90, opacity: 0, duration: 1.1 }, 0.35)
        .from(".badge", { y: 20, opacity: 0, duration: 0.6 }, 0.35)
        .from(".hero h1 .line-in", { yPercent: 115, duration: 0.95, stagger: 0.12 }, 0.5)
        .from(".hero h2", { y: 24, opacity: 0, duration: 0.7 }, 0.95)
        .from(".hero-left p", { y: 24, opacity: 0, duration: 0.7 }, 1.05)
        .from(".hero .buttons .btn", { y: 26, opacity: 0, duration: 0.7, stagger: 0.1 }, 1.15)
        .from(
          ".hero .socials a",
          { scale: 0, opacity: 0, duration: 0.5, stagger: 0.08, ease: "back.out(2.2)" },
          1.35
        )
        .from(".keywords li", { x: -14, opacity: 0, duration: 0.5, stagger: 0.08 }, 1.2)
        .from(".signature", { opacity: 0, x: 30, duration: 0.9 }, 1.1)
        .from(".edu-card", { y: 40, opacity: 0, duration: 0.9 }, 1.2);

      /* gentle idle motion once the intro is done */
      tl.add(() => {
        gsap.to(".circle", { y: -12, duration: 3.4, ease: "sine.inOut", yoyo: true, repeat: -1 });
        gsap.to(".ring", { rotation: "+=360", duration: 70, ease: "none", repeat: -1 });
        gsap.utils.toArray(".spark").forEach((el, i) => {
          gsap.to(el, {
            y: i % 2 ? -10 : 10,
            duration: 2 + i * 0.4,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          });
        });
      });

      /* hero parallax while scrolling away */
      const parallax = {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: true,
      };
      gsap.to(".hero-photo", { yPercent: 6, ease: "none", scrollTrigger: parallax });
      gsap.to(".circle", { yPercent: -10, ease: "none", scrollTrigger: parallax });
      gsap.to(".signature", { y: -50, ease: "none", scrollTrigger: parallax });
      gsap.to(".keywords", { y: -40, ease: "none", scrollTrigger: parallax });
      gsap.to(".hero-left", { y: 40, opacity: 0.4, ease: "none", scrollTrigger: parallax });

      /* reveal on scroll, grouped so siblings stagger */
      const targets = [
        ".title.center",
        ".about-text",
        ".info-card",
        ".skills .title",
        ".skill-tile",
        ".project",
        ".more",
        ".cert-card",
        ".contact-info",
        ".contact-wrap form",
      ];
      const items = gsap.utils.toArray(targets.join(","), root.current);
      gsap.set(items, { opacity: 0, y: 50 });
      ScrollTrigger.batch(items, {
        start: "top 90%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.1,
            overwrite: true,
            clearProps: "transform,opacity", // lets CSS hover effects work again
          }),
      });
    }, root);

    return () => ctx.revert();
  }, []);

  /* ---------- magnetic buttons ---------- */
  useEffect(() => {
    if (!finePointer() || reducedMotion()) return undefined;

    const items = Array.from(root.current.querySelectorAll(MAGNETIC_TARGETS)).map((el) => {
      el.classList.add("magnetic");
      return { el, active: false, strength: el.matches(".socials a") ? 0.45 : 0.3 };
    });

    const onMove = (e) => {
      items.forEach((it) => {
        const r = it.el.getBoundingClientRect();
        // centre without the current offset, so the pull doesn't feed back on itself
        const cx = r.left + r.width / 2 - gsap.getProperty(it.el, "x");
        const cy = r.top + r.height / 2 - gsap.getProperty(it.el, "y");
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const near = (dx / (r.width / 2 + 40)) ** 2 + (dy / (r.height / 2 + 40)) ** 2 < 1;

        if (near) {
          it.active = true;
          gsap.to(it.el, {
            x: dx * it.strength,
            y: dy * it.strength,
            duration: 0.4,
            ease: "power3.out",
            overwrite: "auto",
          });
        } else if (it.active) {
          it.active = false;
          gsap.to(it.el, {
            x: 0,
            y: 0,
            duration: 0.9,
            ease: "elastic.out(1, 0.35)",
            overwrite: "auto",
          });
        }
      });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      items.forEach((it) => {
        gsap.killTweensOf(it.el);
        gsap.set(it.el, { clearProps: "x,y" });
        it.el.classList.remove("magnetic");
      });
    };
  }, []);

  /* ---------- highlight the nav link of the section on screen ---------- */
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    navLinks.forEach(([, id]) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  /* ---------- close the certificate viewer with Esc ---------- */
  useEffect(() => {
    if (!lightbox) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") setLightbox(null);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio message from ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\nFrom: ${form.name} (${form.email})`);
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="app" ref={root}>
      <CustomCursor />

      {/* ============ NAVBAR ============ */}
      <nav className="navbar">
        <a href="#home" className="brand">
          <span className="mono">
            <b>H</b>
            <i>N</i>
          </span>
          <span className="brand-name">
            Harish <em>Naik</em> N
          </span>
        </a>

        <ul className={menuOpen ? "nav-links open" : "nav-links"}>
          {navLinks.map(([name, id]) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={active === id ? "active" : ""}
                onClick={() => setMenuOpen(false)}
              >
                {name}
              </a>
            </li>
          ))}
        </ul>

        <a href="/resume.pdf" download className="resume-btn">
          <FaDownload /> Download Resume
        </a>

        <button
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {/* ============ HERO ============ */}
      <section className="hero" id="home">
        <HeroScene />

        <div className="dots dots-a" />
        <div className="dots dots-b" />

        <svg className="swoosh" viewBox="0 0 300 120" fill="none">
          <path
            d="M2 118 C 60 70, 110 30, 180 40 C 230 48, 270 38, 298 14"
            stroke="#d4af37"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>

        <div className="hero-left">
          <div className="badge">
            <i className="dot" /> Available for Opportunities
          </div>

          <h1>
            <span className="line">
              <span className="line-in">Harish</span>
            </span>
            <span className="line">
              <span className="line-in gold">Naik N</span>
            </span>
          </h1>

          <h2>
            Software Developer & <span>AI Enthusiast</span>
          </h2>

          <p>
            Building innovative software and intelligent systems that solve
            real-world problems through Artificial Intelligence, IoT, and
            Full-Stack Development.
          </p>

          <div className="buttons">
            <a href="#projects" className="btn btn-dark">
              View Projects <FaArrowRight />
            </a>
            <a href="#contact" className="btn btn-light">
              <FaPaperPlane /> Let's Connect
            </a>
          </div>

          <div className="socials">
            <a href={GITHUB} target="_blank" rel="noreferrer" aria-label="GitHub">
              <FaGithub />
            </a>
            <a href={LINKEDIN} target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <FaLinkedinIn />
            </a>
            <a href={`mailto:${EMAIL}`} aria-label="Email">
              <FaRegEnvelope />
            </a>
            <a href={INSTAGRAM} target="_blank" rel="noreferrer" aria-label="Instagram">
              <FaInstagram />
            </a>
          </div>
        </div>

        <ul className="keywords">
          {keywords.map((k) => (
            <li key={k}>{k}</li>
          ))}
        </ul>

        <div className="hero-right">
          <div className="circle" />
          <div className="ring" />
          <span className="spark s1" />
          <span className="spark s2" />
          <span className="spark s3" />
          <span className="spark s4" />

          <img className="hero-photo" src={profile} alt="Harish Naik N" />

          <div className="signature">
            Harish
            <br />
            Naik N
          </div>

          <div className="edu-card">
            <FaGraduationCap />
            <div>
              <p>3rd Year</p>
              <p>B.E. ECE</p>
              <p>Atria Institute of Technology</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ ABOUT + SKILLS ============ */}
      <div className="light-block">
        <section className="about" id="about">
          <div className="about-text">
            <h2 className="title">
              <FaUser />
              <span>
                About <em>Me</em>
              </span>
            </h2>
            <p>
              I am a 3rd Year Electronics and Computer Engineering student at
              Atria Institute of Technology. I am passionate about{" "}
              <strong>
                Artificial Intelligence, IoT Systems, Software Development,
              </strong>{" "}
              and Renewable Energy Technologies. I love building projects that
              solve real-world problems and create a positive impact on
              society.
            </p>
            <a href="#skills" className="know-more">
              Know More <FaArrowRight />
            </a>
          </div>

          <div className="info-cards">
            <div className="info-card">
              <h3>
                <FaGraduationCap /> Education
              </h3>
              <p>B.E. Electronics & Computer Engineering</p>
              <p>Atria Institute of Technology</p>
              <p>(2024 - 2028)</p>
            </div>

            <div className="info-card">
              <h3>
                <FaMapMarkerAlt /> Location
              </h3>
              <p>Bengaluru</p>
              <p>Karnataka, India</p>
            </div>

            <div className="info-card">
              <h3>
                <FaBullseye /> Interests
              </h3>
              <p>AI</p>
              <p>IoT Systems</p>
              <p>Web Development</p>
              </div>
          </div>
        </section>

        <section className="skills" id="skills">
          <h2 className="title">
            <FaCog />
            <span>Skills</span>
          </h2>

          <div className="skill-row">
            {skills.map((s) => (
              <div key={s.name} className="skill-tile">
                <div className={s.pair ? "skill-icon pair" : "skill-icon"}>{s.icon}</div>
                <span>{s.name}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* ============ PROJECTS ============ */}
      <section className="section cream" id="projects">
        <h2 className="title center">
          <FaProjectDiagram />
          <span>
            My <em>Projects</em>
          </span>
        </h2>

        <div className="project-grid">
          {projects.map((p, i) => (
            <article key={p.title} className="project">
              <div className="project-top">
                <span className="project-num">0{i + 1}</span>
                <span className="project-type">{p.type}</span>
              </div>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
              <div className="tags">
                {p.tags.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
              <div className="project-links">
                {p.demo && (
                  <a href={p.demo} target="_blank" rel="noreferrer" className="btn btn-dark small">
                    Live Demo
                  </a>
                )}
                <a href={p.code} target="_blank" rel="noreferrer" className="btn btn-light small">
                  <FaGithub /> Source Code
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="more">
          <a href={GITHUB} target="_blank" rel="noreferrer" className="btn btn-dark">
            See More On GitHub <FaArrowRight />
          </a>
        </div>
      </section>

      {/* ============ CERTIFICATES ============ */}
      <section className="section" id="certificates">
        <h2 className="title center">
          <FaAward />
          <span>
            My <em>Certificates</em>
          </span>
        </h2>

        <div className="cert-row">
          {certificates.map((c, i) => (
            <div key={i} className="cert-card">
              <button
                type="button"
                className="cert-img"
                onClick={() => setLightbox(c)}
                aria-label={`View ${c.title} certificate`}
              >
                <img src={c.img} alt={`${c.title} certificate`} loading="lazy" />
                <span className="cert-zoom">Click to view</span>
              </button>
              <span className="cert-meta">
                {c.date} · {c.issuer}
              </span>
              <h4>{c.title}</h4>
              <a href={c.link} target="_blank" rel="noreferrer">
                Verify Certificate <FaArrowRight />
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* ============ CONTACT ============ */}
      <section className="section cream" id="contact">
        <h2 className="title center">
          <FaPaperPlane />
          <span>
            Get In <em>Touch</em>
          </span>
        </h2>

        <div className="contact-wrap">
          <div className="contact-info">
            <h3>Have a project in mind?</h3>
            <p>Let's build something great together.</p>
            <a href={`mailto:${EMAIL}`} className="contact-line">
              <FaRegEnvelope /> {EMAIL}
            </a>
            <span className="contact-line">
              <FaMapMarkerAlt /> Bengaluru, India
            </span>
            <div className="socials left">
              <a href={GITHUB} target="_blank" rel="noreferrer" aria-label="GitHub">
                <FaGithub />
              </a>
              <a href={LINKEDIN} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <FaLinkedinIn />
              </a>
              <a href={INSTAGRAM} target="_blank" rel="noreferrer" aria-label="Instagram">
                <FaInstagram />
              </a>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <input
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <input
              name="email"
              type="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              required
            />
            <textarea
              name="message"
              rows="5"
              placeholder="Your Message"
              value={form.message}
              onChange={handleChange}
              required
            />
            <button type="submit" className="btn btn-dark">
              Send Message <FaArrowRight />
            </button>
          </form>
        </div>
      </section>

      {/* ============ CERTIFICATE VIEWER ============ */}
      {lightbox && (
        <div
          className="lightbox"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
          aria-label={lightbox.title}
        >
          <button type="button" className="lightbox-close" aria-label="Close">
            ×
          </button>
          <img
            src={lightbox.img}
            alt={`${lightbox.title} certificate`}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* ============ FOOTER ============ */}
      <footer className="footer">
        <span className="mono small">
          <b>H</b>
          <i>N</i>
        </span>
        <p>Harish Naik N © 2026</p>
        <p className="tiny">Built with React, GSAP & three.js</p>
      </footer>
    </div>
  );
}

export default App;