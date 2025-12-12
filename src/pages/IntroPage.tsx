import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import HomePage from "./HomePage";
import { MouseScroller } from "../components/ui/MouseScroller";
import "./IntroPage.css";


function IntroPage() {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (revealed) return;

    const mount = mountRef.current;
    const canvas = canvasRef.current;
    if (!mount || !canvas) return;

    // ---- Scene ----
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 2;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });

    const resize = () => {
      renderer.setSize(mount.clientWidth, mount.clientHeight, false);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
    };
    resize();

    const cube = new THREE.LineSegments(
      new THREE.EdgesGeometry(new THREE.BoxGeometry()),
      new THREE.LineBasicMaterial({ color: 0x66D9ED }),
    );
    scene.add(cube);

    let targetZ = 2;
    let done = false;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (done) return;
      targetZ = Math.max(0.8, Math.min(2, targetZ - e.deltaY * 0.001));
    };

    mount.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("resize", resize);

    let raf = 0;
    const animate = () => {
      raf = requestAnimationFrame(animate);

      cube.rotation.x += 0.005;
      cube.rotation.y += 0.005;

      camera.position.z += (targetZ - camera.position.z) * 0.08;
      renderer.render(scene, camera);

      if (!done && camera.position.z <= 0.9) {
        done = true;
        setRevealed(true);
      }
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      mount.removeEventListener("wheel", onWheel);
      window.removeEventListener("resize", resize);
      renderer.dispose();
    };
  }, [revealed]);

  return (
    <div className="intro-container">
      {/* Homepage always mounted */}
      <div className={`home-layer ${revealed ? "revealed" : ""}`}>
        <HomePage />
      </div>

      {/* Three.js intro */}
      {!revealed && (
        <>
          <div ref={mountRef} className="intro-root">
            <canvas ref={canvasRef} className="intro-canvas" />
          </div>
 
          <div className="intro-overlay">
            <MouseScroller />
          </div>
        </>
      )}
    </div>
  );
}

export default IntroPage;