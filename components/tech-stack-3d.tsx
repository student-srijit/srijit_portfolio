"use client";

import React, { useEffect, useState, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Physics, useSphere, usePlane } from "@react-three/cannon";
import { Decal, Environment, OrbitControls, MeshReflectorMaterial, Float } from "@react-three/drei";
import { skills } from "@/lib/data";
import * as THREE from "three";

// Flatten skills object to array, filtering out Core CS concepts
const allSkills = [
    ...skills["Languages"],
    ...skills["Frameworks & Libraries"],
    ...skills["Tools & Platforms"],
];

const COLORS = [
    "#ef4444", // red
    "#f97316", // orange
    "#eab308", // yellow
    "#22c55e", // green
    "#3b82f6", // blue
    "#a855f7", // purple
    "#ec4899", // pink
    "#14b8a6", // teal
];

function Floor(props: any) {
    const [ref] = usePlane(() => ({ type: "Static", position: [0, -2, 0], rotation: [-Math.PI / 2, 0, 0], ...props }));
    return (
        <mesh ref={ref as any} receiveShadow>
            <planeGeometry args={[100, 100]} />
            <MeshReflectorMaterial
                blur={[300, 100]}
                resolution={512} // Reduced from 1024 for performance
                mixBlur={1}
                mixStrength={40}
                roughness={1}
                depthScale={1.2}
                minDepthThreshold={0.4}
                maxDepthThreshold={1.4}
                color="#101010"
                metalness={0.5}
                mirror={0}
            />
        </mesh>
    );
}

function TechBall({ name, position }: { name: string; position: [number, number, number] }) {
    const [ref, api] = useSphere(() => ({
        mass: 1,
        position,
        args: [1],
        linearDamping: 0.4,
        angularDamping: 0.4,
        material: { friction: 0.1, restitution: 0.8 },
    }));

    const color = useMemo(() => COLORS[Math.floor(Math.random() * COLORS.length)], []);
    const [hovered, setHover] = useState(false);

    useEffect(() => {
        document.body.style.cursor = hovered ? "pointer" : "auto";
    }, [hovered]);

    // Generate texture for the decal
    const texture = useMemo(() => {
        const canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 512;
        const ctx = canvas.getContext('2d');
        if (ctx) {
            ctx.fillStyle = 'transparent'; // Transparent background
            ctx.fillRect(0, 0, 512, 512);

            // Text settings
            ctx.fillStyle = 'white';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            // Dynamic font sizing
            const words = name.split(' ');
            const isLong = name.length > 10 || words.length > 1;
            const fontSize = isLong ? 80 : 120; // Smaller font for longer text
            ctx.font = `bold ${fontSize}px Inter, sans-serif`;

            // Shadow for depth
            ctx.shadowColor = 'rgba(0,0,0,0.5)';
            ctx.shadowBlur = 10;
            ctx.shadowOffsetX = 4;
            ctx.shadowOffsetY = 4;

            if (words.length > 1) {
                // Multi-line text for names like "Jupyter Notebook"
                const lineHeight = fontSize * 1.2;
                const startY = 256 - ((words.length - 1) * lineHeight) / 2;

                words.forEach((word, i) => {
                    ctx.fillText(word, 256, startY + (i * lineHeight));
                });
            } else {
                // Single line
                ctx.fillText(name, 256, 256);
            }
        }
        return new THREE.CanvasTexture(canvas);
    }, [name]);

    return (
        <mesh
            ref={ref as any}
            castShadow
            receiveShadow
            onPointerOver={() => {
                setHover(true);
                api.velocity.set(0, 8, 0);
                api.angularVelocity.set(Math.random(), Math.random(), Math.random());
            }}
            onPointerOut={() => setHover(false)}
        >
            <sphereGeometry args={[1, 32, 32]} />
            <meshPhysicalMaterial
                color={color}
                metalness={0.4}
                roughness={0.1}
                transmission={0.2}
                thickness={2}
                envMapIntensity={1}
                clearcoat={1}
                clearcoatRoughness={0}
            />
            {/* Decal for curved text */}
            <Decal
                position={[0, 0, 1]} // Front of the sphere
                rotation={[0, 0, 0]}
                scale={1.5} // Size of the decal
            >
                <meshStandardMaterial
                    map={texture}
                    transparent
                    polygonOffset
                    polygonOffsetFactor={-1} // Prevent z-fighting
                    roughness={1}
                />
            </Decal>
        </mesh>
    );
}

// Spawner to distribute balls slightly randomly
function BallSpawner() {
    const { viewport } = useThree();

    return (
        <>
            {allSkills.map((skill, i) => {
                // Random position above the floor
                const x = (Math.random() - 0.5) * 8; // Constrain spawn width to within walls (approx -4 to 4)
                const z = (Math.random() - 0.5) * 5;
                return <TechBall key={i} name={skill} position={[x, 10 + i * 1.5, z]} />;
            })}
        </>
    );
}

export default function TechStack3D() {
    return (
        <div className="w-full h-[600px] relative">
            <Canvas shadows dpr={[1, 1.5]} camera={{ position: [0, 5, 12], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <directionalLight
                    castShadow
                    position={[10, 20, 10]}
                    intensity={1.5}
                    shadow-mapSize={[512, 512]} // Reduced from 1024
                />
                {/* Environment for realistic reflections */}
                <Environment preset="city" />

                <Physics gravity={[0, -9.81, 0]}>
                    <BallSpawner />
                    <Floor />
                    {/* Invisible walls to keep balls in view? Or just let them fall off? 
              Let's add some invisible walls effectively by handling resets or just bounding box.
              For now, open floor - they might roll off, which is fun.
          */}
                    <Walls />
                </Physics>

                <OrbitControls enableZoom={false} maxPolarAngle={Math.PI / 2 - 0.1} />
            </Canvas>

            <div className="absolute top-4 left-0 w-full text-center pointer-events-none">
                <h2 className="text-3xl font-bold text-white bg-black/30 backdrop-blur-md inline-block px-4 py-2 rounded-xl">
                    Tech Stack
                </h2>
                <p className="text-white/70 text-sm mt-1">Touch the spheres!</p>
            </div>
        </div>
    );
}

function Walls() {
    const { viewport } = useThree();
    // Use planes as walls to keep them on screen mostly
    // Tighter walls to keep them "in the box"
    usePlane(() => ({ position: [0, 0, -4], rotation: [0, 0, 0] })); // Back
    usePlane(() => ({ position: [0, 0, 4], rotation: [0, Math.PI, 0] })); // Front 
    usePlane(() => ({ position: [-7, 0, 0], rotation: [0, Math.PI / 2, 0] })); // Left
    usePlane(() => ({ position: [7, 0, 0], rotation: [0, -Math.PI / 2, 0] })); // Right
    return null;
}
