import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import HomePage from "./HomePage";
import { MouseScroller } from "../components/ui/MouseScroller";
import "./IntroPage.css";

function IntroPage() {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (revealed) return;

    let isDragging = false;
    let lastMouseX = 0;

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

    window.addEventListener("resize", resize);

    // ---- Load model ----
    const loader = new GLTFLoader();
    let model: THREE.Group | null = null;

    loader.load(
      "/Laptop.glb",
      (gltf) => {
        model = gltf.scene;
        scene.add(model);

        model.scale.set(0.4, 0.4, 0.4);
        model.position.y = 0.4;

        // ✅ METALNESS / ROUGHNESS HIER
        model.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;

            if (mesh.material instanceof THREE.MeshStandardMaterial) {
              mesh.material.metalness = 0.8;
              mesh.material.roughness = 0.3;
              mesh.material.needsUpdate = true;
            }
          }
        });

        console.log("Laptop model loaded successfully on IntroPage");
      },
      (progress) => {
        console.log(
          "Loading progress:",
          (progress.loaded / progress.total) * 100 + "%"
        );
      },
      (error) => {
        console.error("Error loading laptop model:", error);

        const cube = new THREE.LineSegments(
          new THREE.EdgesGeometry(new THREE.BoxGeometry()),
          new THREE.LineBasicMaterial({ color: 0x66d9ed })
        );
        scene.add(cube);
      }
    );

    // ---- Light ----
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 10, 7);
    scene.add(directionalLight);

    // ---- Scroll zoom ----
    let targetZ = 2;
    const targetY = 1;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      targetZ = Math.max(0.8, Math.min(2, targetZ - e.deltaY * 0.001));
    };

    mount.addEventListener("wheel", onWheel, { passive: false });

    // ---- Mouse rotate ----
    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      lastMouseX = e.clientX;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging || !model) return;

      const deltaX = e.clientX - lastMouseX;
      lastMouseX = e.clientX;
      model.rotation.y += deltaX * 0.005;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    mount.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    // ---- Animation ----
    let raf = 0;
    let angle = 0;
    let direction = 1;
    const speed = 0.001;
    const MAX_ANGLE = Math.PI / 2;
    const MIN_ANGLE = -Math.PI / 2;

    const animate = () => {
      raf = requestAnimationFrame(animate);

      if (model && !isDragging) {
        angle += speed * direction;

        if (angle >= MAX_ANGLE) {
          angle = MAX_ANGLE;
          direction = -1;
        } else if (angle <= MIN_ANGLE) {
          angle = MIN_ANGLE;
          direction = 1;
        }

        model.rotation.y = angle;
      } else if (model && isDragging) {
        angle = model.rotation.y;
      }

      camera.position.z += (targetZ - camera.position.z) * 0.08;
      camera.position.y += (targetY - camera.position.y) * 0.08;

      renderer.render(scene, camera);

      if (camera.position.z <= 0.9) {
        setRevealed(true);
      }
    };

    animate();

    // ---- Cleanup ----
    return () => {
      cancelAnimationFrame(raf);
      mount.removeEventListener("wheel", onWheel);
      mount.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("resize", resize);

      if (model) {
        model.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.geometry.dispose();
            if (Array.isArray(child.material)) {
              child.material.forEach((m) => m.dispose());
            } else {
              child.material.dispose();
            }
          }
        });
      }

      renderer.dispose();
    };
  }, [revealed]);

  return (
    <div className="intro-container">
      <div className={`home-layer ${revealed ? "revealed" : ""}`}>
        <HomePage />
      </div>

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
