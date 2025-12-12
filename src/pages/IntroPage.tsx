import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import HomePage from "./HomePage";
import "./IntroPage.css";

function IntroPage() {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [showHome, setShowHome] = useState(false);

  useEffect(() => {
    if (showHome) return;

    const mount = mountRef.current;
    const canvas = canvasRef.current;
    if (!mount || !canvas) return;

    console.log("[Intro] MOUNT (canvas mode)");

    // ---- Scene ----
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      75,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 2;
    scene.add(camera);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });

    const setRendererSize = () => {
      const w = Math.max(1, mount.clientWidth);
      const h = Math.max(1, mount.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };

    setRendererSize();

    const cube = new THREE.LineSegments(
      new THREE.EdgesGeometry(new THREE.BoxGeometry()),
      new THREE.LineBasicMaterial({ color: 0xffffff })
    );
    scene.add(cube);

    // ---- Wheel handling (attached to mount only) ----
    let targetZ = 2;
    let transitioned = false;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (transitioned) return;
      targetZ = Math.max(0.8, Math.min(2, targetZ - e.deltaY * 0.001));
    };

    mount.addEventListener("wheel", onWheel, { passive: false });

    // ---- Resize handling ----
    const onResize = () => setRendererSize();
    window.addEventListener("resize", onResize);

    // ---- Animation ----
    let raf = 0;

    const animate = () => {
      raf = requestAnimationFrame(animate);

      cube.rotation.x += 0.005;
      cube.rotation.y += 0.005;

      camera.position.z += (targetZ - camera.position.z) * 0.08;

      renderer.render(scene, camera);

      if (!transitioned && camera.position.z <= 0.9) {
        transitioned = true;

        console.log("[Intro] TRANSITION START");

        cancelAnimationFrame(raf);
        mount.removeEventListener("wheel", onWheel);
        window.removeEventListener("resize", onResize);

        // Dispose renderer context if available
        if (renderer && typeof renderer.dispose === "function") {
          renderer.dispose();
        }

        setTimeout(() => setShowHome(true), 100);
      }
    };

    animate();

    // ---- Cleanup ----
    return () => {
      console.log("[Intro] CLEANUP (canvas mode)");
      cancelAnimationFrame(raf);
      mount.removeEventListener("wheel", onWheel);
      window.removeEventListener("resize", onResize);
      if (renderer && typeof renderer.dispose === "function") {
        renderer.dispose();
      }
    };
  }, [showHome]);

  return (
    <>
      {!showHome && (
        <>
          <div ref={mountRef} className="intro-root">
            <canvas ref={canvasRef} className="intro-canvas" />
          </div>
          <div className="intro-overlay">Scroll</div>
        </>
      )}

      {showHome && <HomePage />}
    </>
  );
}

export default IntroPage;
