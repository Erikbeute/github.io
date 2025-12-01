import { useEffect, useRef } from "react";
import * as THREE from 'three';

function IntroPage() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    const mount = mountRef.current;
    if (mount) {

      // ensure the mount container is positioned so overlay can sit above the canvas
      mount.style.position = 'relative';
      mount.appendChild(renderer.domElement);

      // position the canvas absolutely and give it a lower z-index than the overlay
      renderer.domElement.style.position = 'absolute';
      renderer.domElement.style.top = '0';
      renderer.domElement.style.left = '0';
      renderer.domElement.style.zIndex = '0';
    }

    // ---- Cube ----
    const boxGeometry = new THREE.BoxGeometry();
    const edgesOnly = new THREE.EdgesGeometry(boxGeometry);
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
    const edgedCube = new THREE.LineSegments(edgesOnly, lineMaterial);
    scene.add(edgedCube);

    camera.position.z = 2;

    // ---- Animation loop ----
    function animate() {
      requestAnimationFrame(animate);

      edgedCube.rotation.x += 0.005;
      edgedCube.rotation.y += 0.005;

      renderer.render(scene, camera);
    }
    animate();

    // ---- Cleanup on unmount ----
    return () => {
      if (mount && mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        margin: 0,
        padding: 0,
      }}
    >
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          color: 'white',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          minHeight: '100vh',
          fontSize: '30px',
          pointerEvents: 'none',
        }}
      >
        more soon
      </div>
    </div>
  );
}


export default IntroPage;