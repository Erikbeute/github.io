import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import './Hero.css';
import { gsap } from 'gsap';
import { Resume } from './Resume';
import { Projects } from './Projects';


export const Hero: React.FC = () => {
    const mountRef = useRef<HTMLDivElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    type Section = "Hero" | "Resume" | "Projects" | "Experiments";
    const [section, setSection] = useState<Section>("Hero");

    // Log when component mounts and when section changes
    useEffect(() => {
        console.log("Hero component mounted or section changed:", section);
    }, [section]);

    useEffect(() => {
        console.log("Cube useEffect running, section:", section);
        const mount = mountRef.current;
        const canvas = canvasRef.current;
        
        console.log("Refs check - mount:", !!mount, "canvas:", !!canvas, "section is Hero:", section === "Hero");
        
        // Only initialize cube when section is Hero and refs are available
        if (!mount || !canvas || section !== "Hero") {
            console.log("Cube setup skipped - mount:", !!mount, "canvas:", !!canvas, "section:", section);
            return;
        }

        console.log("cube loading");

        // Renderer using existing canvas so we don't append elements elsewhere
        const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, mount.clientWidth / mount.clientHeight, 0.1, 100);
        camera.position.z = 3;

        // Small cube (different from other pages)
        const geometry = new THREE.BoxGeometry(0.6, 0.6, 0.6);
        const material = new THREE.MeshBasicMaterial({ color: 0x66d9ed, wireframe: true });
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        // Add a faint edge lines so it reads on dark/light backgrounds
        const edges = new THREE.LineSegments(
            new THREE.EdgesGeometry(geometry),
            new THREE.LineBasicMaterial({ color: 0x0a0a0a, transparent: true, opacity: 0.15 })
        );
        cube.add(edges);

        const resize = () => {
            const w = Math.max(1, mount.clientWidth);
            const h = Math.max(1, mount.clientHeight);
            renderer.setSize(w, h, false);
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
        };

        resize();
        window.addEventListener('resize', resize);

        let rafId = 0;
        const animate = () => {
            rafId = requestAnimationFrame(animate);
            cube.rotation.x += 0.001;
            cube.rotation.y += 0.0015;
            cube.rotation.z += 0.0005;
            renderer.render(scene, camera);
        };

        animate();
        console.log("loaded");

        return () => {
            console.log("Cube cleanup - disposing resources");
            cancelAnimationFrame(rafId);
            window.removeEventListener('resize', resize);
            geometry.dispose();
            material.dispose();
            edges.geometry.dispose();
            (edges.material as THREE.Material).dispose();
            renderer.dispose();
        };
    }, [section]); // Re-run when section changes

    // GSAP hover highlight for titles
    useEffect(() => {
        if (section !== "Hero") return; // Only setup when Hero section is active
        
        const els = Array.from(document.querySelectorAll('.item-title')) as HTMLElement[];
        const tls: { el: HTMLElement; tl: gsap.core.Timeline; onEnter: () => void; onLeave: () => void }[] = [];

        els.forEach((el) => {
            const inner = el.querySelector('.title-inner') as HTMLElement | null;
            if (!inner) return;
            // ensure initial state (gradient positioned at left)
            gsap.set(inner, { backgroundPosition: '0% 50%' });

            const tl = gsap.timeline({ paused: true });
            // animate background-position to move gradient left->right, giving a light sweep over letters
            tl.to(inner, { duration: 0.45, backgroundPosition: '100% 50%', ease: 'power2.out' });

            const onEnter = () => tl.play();
            const onLeave = () => tl.reverse();

            el.addEventListener('mouseenter', onEnter);
            el.addEventListener('focus', onEnter);
            el.addEventListener('mouseleave', onLeave);
            el.addEventListener('blur', onLeave);

            tls.push({ el, tl, onEnter, onLeave });
        });

        return () => {
            tls.forEach(({ el, tl, onEnter, onLeave }) => {
                el.removeEventListener('mouseenter', onEnter);
                el.removeEventListener('focus', onEnter);
                el.removeEventListener('mouseleave', onLeave);
                el.removeEventListener('blur', onLeave);
                tl.kill();
            });
        };
    }, [section]); // Re-run when section changes

    return (
        <>
            {section === "Hero" && (
                <header className="hero" ref={mountRef}>
                    <canvas
                        ref={canvasRef}
                        className="hero__canvas"
                        aria-hidden="true"
                    />

                    <div className="hero__content">
                        <div className="hero-container">
                            <div className="hero-item">

                                <button
                                    className="item-title"
                                    onClick={() => setSection("Resume")}>
                                    <span className="title-inner">Resume</span>
                                </button>

                                <button
                                    className="item-title"
                                    onClick={() => setSection("Projects")}>
                                    <span className="title-inner">Projects</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </header>
            )}

            {section === "Resume" && (
                <Resume onBack={() => setSection("Hero")} />
            )}
            {section === "Projects" && (
                <Projects onBack={() => setSection("Hero")} />
            )}
        </>
    );

};