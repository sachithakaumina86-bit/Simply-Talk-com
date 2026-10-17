import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

// Pre-allocated reusable math scratch objects (Zero GC in loop)
const _vec3 = new THREE.Vector3();
const _targetPos = new THREE.Vector3();

interface ThreeJsFrontDeskHeroProps {
  className?: string;
}

export const ThreeJsFrontDeskHero: React.FC<ThreeJsFrontDeskHeroProps> = ({ className = '' }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isControlsOpen, setIsControlsOpen] = useState(true);
  const [explodedVal, setExplodedVal] = useState(0);
  const [activeFinish, setActiveFinish] = useState<'indigo' | 'titanium' | 'teal'>('indigo');
  const [isRotating, setIsRotating] = useState(true);

  // References to mutable Three.js objects
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const modelGroupRef = useRef<THREE.Group | null>(null);
  const partsRef = useRef<{
    base: THREE.Mesh;
    midTrim: THREE.Mesh;
    coreHousing: THREE.Mesh;
    facetedCrystal: THREE.Mesh;
    innerGyroRing: THREE.Mesh;
    outerGyroRing: THREE.Mesh;
    floatingNodes: THREE.Mesh[];
    contactShadow: THREE.Mesh;
  } | null>(null);

  const explodedRef = useRef(0);
  explodedRef.current = explodedVal;
  const isRotatingRef = useRef(true);
  isRotatingRef.current = isRotating;

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 440;

    // 1. Scene & Atmosphere (Horizon Fog)
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    const bgColor = new THREE.Color(0xF7F8FC);
    scene.background = bgColor;
    scene.fog = new THREE.Fog(bgColor, 8, 16);

    // 2. Camera Setup
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 50);
    camera.position.set(0, 2.2, 5.0);

    // 3. Renderer with PBR Pipeline
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    rendererRef.current = renderer;
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // 4. Studio Environment Reflection via RoomEnvironment
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // 5. Studio Lighting Rig: Warm Key Light + Cool Fill
    const warmKeyLight = new THREE.DirectionalLight(0xfff5e6, 2.4);
    warmKeyLight.position.set(4, 6, 3);
    warmKeyLight.castShadow = true;
    warmKeyLight.shadow.mapSize.width = 1024;
    warmKeyLight.shadow.mapSize.height = 1024;
    warmKeyLight.shadow.camera.near = 0.5;
    warmKeyLight.shadow.camera.far = 15;
    const d = 3;
    warmKeyLight.shadow.camera.left = -d;
    warmKeyLight.shadow.camera.right = d;
    warmKeyLight.shadow.camera.top = d;
    warmKeyLight.shadow.camera.bottom = -d;
    warmKeyLight.shadow.bias = -0.0005;
    warmKeyLight.shadow.normalBias = 0.02;
    scene.add(warmKeyLight);

    const coolFillLight = new THREE.HemisphereLight(0xdbeafe, 0x241b8a, 1.2);
    scene.add(coolFillLight);

    const accentRimLight = new THREE.DirectionalLight(0x14C3A2, 1.8);
    accentRimLight.position.set(-3, 3, -3);
    scene.add(accentRimLight);

    // 6. Procedural Soft Contact Shadow Plane (Grounding)
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 256;
    shadowCanvas.height = 256;
    const ctx = shadowCanvas.getContext('2d')!;
    const grad = ctx.createRadialGradient(128, 128, 10, 128, 128, 120);
    grad.addColorStop(0, 'rgba(31, 36, 51, 0.45)');
    grad.addColorStop(0.5, 'rgba(31, 36, 51, 0.18)');
    grad.addColorStop(1, 'rgba(31, 36, 51, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 256, 256);

    const shadowTexture = new THREE.CanvasTexture(shadowCanvas);
    shadowTexture.colorSpace = THREE.SRGBColorSpace;

    const shadowPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(3.2, 3.2),
      new THREE.MeshBasicMaterial({
        map: shadowTexture,
        transparent: true,
        depthWrite: false,
        opacity: 0.85,
      })
    );
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -0.98;
    scene.add(shadowPlane);

    // 7. Composite 3–12 Part Procedural Model: Simply Talk Smart Front-Desk Hub
    const hubGroup = new THREE.Group();
    hubGroup.position.set(0, -0.2, 0);
    scene.add(hubGroup);
    modelGroupRef.current = hubGroup;

    // Part 1: Primary Base Pedestal (Chamfered Brushed Cylinder)
    const baseGeo = new THREE.CylinderGeometry(1.2, 1.35, 0.25, 48);
    const baseMat = new THREE.MeshStandardMaterial({
      color: 0x3B2FD0,
      metalness: 0.75,
      roughness: 0.25,
    });
    const baseMesh = new THREE.Mesh(baseGeo, baseMat);
    baseMesh.position.y = -0.8;
    baseMesh.castShadow = true;
    baseMesh.receiveShadow = true;
    hubGroup.add(baseMesh);

    // Part 2: Accent Mid Trim Ring (Teal PBR)
    const trimGeo = new THREE.TorusGeometry(1.25, 0.04, 16, 64);
    const trimMat = new THREE.MeshStandardMaterial({
      color: 0x14C3A2,
      metalness: 0.9,
      roughness: 0.15,
    });
    const trimMesh = new THREE.Mesh(trimGeo, trimMat);
    trimMesh.rotation.x = Math.PI / 2;
    trimMesh.position.y = -0.66;
    hubGroup.add(trimMesh);

    // Part 3: Secondary Core Housing (Brushed Metal Shell)
    const coreGeo = new THREE.CylinderGeometry(0.85, 1.1, 0.45, 48);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x221a8a,
      metalness: 0.65,
      roughness: 0.35,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreMesh.position.y = -0.45;
    coreMesh.castShadow = true;
    hubGroup.add(coreMesh);

    // Part 4: Faceted Optical Quartz Core (Transmission / Crystal)
    const crystalGeo = new THREE.OctahedronGeometry(0.55, 1);
    const crystalMat = new THREE.MeshPhysicalMaterial({
      color: 0x14C3A2,
      transmission: 0.85,
      opacity: 1,
      roughness: 0.1,
      ior: 1.52,
      thickness: 1.2,
      metalness: 0.1,
    });
    const crystalMesh = new THREE.Mesh(crystalGeo, crystalMat);
    crystalMesh.position.y = 0.15;
    crystalMesh.castShadow = true;
    hubGroup.add(crystalMesh);

    // Part 5: Inner Gyroscope Holographic Ring (Lathe / Torus)
    const innerRingGeo = new THREE.TorusGeometry(0.95, 0.035, 16, 64);
    const innerRingMat = new THREE.MeshStandardMaterial({
      color: 0x14C3A2,
      metalness: 0.85,
      roughness: 0.18,
    });
    const innerRingMesh = new THREE.Mesh(innerRingGeo, innerRingMat);
    innerRingMesh.position.y = 0.15;
    hubGroup.add(innerRingMesh);

    // Part 6: Outer Holographic Gyro Ring
    const outerRingGeo = new THREE.TorusGeometry(1.28, 0.03, 16, 64);
    const outerRingMat = new THREE.MeshStandardMaterial({
      color: 0x3B2FD0,
      metalness: 0.7,
      roughness: 0.22,
    });
    const outerRingMesh = new THREE.Mesh(outerRingGeo, outerRingMat);
    outerRingMesh.position.y = 0.15;
    hubGroup.add(outerRingMesh);

    // Part 7: Optical Sensor Nodes (3 satellites orbiting)
    const nodeGeo = new THREE.SphereGeometry(0.065, 24, 24);
    const nodeMat = new THREE.MeshStandardMaterial({
      color: 0x14C3A2,
      emissive: 0x0f856f,
      emissiveIntensity: 0.6,
      metalness: 0.95,
      roughness: 0.1,
    });
    const nodes: THREE.Mesh[] = [];
    for (let i = 0; i < 3; i++) {
      const node = new THREE.Mesh(nodeGeo, nodeMat);
      hubGroup.add(node);
      nodes.push(node);
    }

    partsRef.current = {
      base: baseMesh,
      midTrim: trimMesh,
      coreHousing: coreMesh,
      facetedCrystal: crystalMesh,
      innerGyroRing: innerRingMesh,
      outerGyroRing: outerRingMesh,
      floatingNodes: nodes,
      contactShadow: shadowPlane,
    };

    // Pre-warm WebGL shaders
    renderer.compile(scene, camera);

    // 8. Interaction: Smooth pointer tracking with exponential damping
    let mouseX = 0;
    let mouseY = 0;
    let targetRotX = 0;
    let targetRotY = 0;

    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseX = x * 0.4;
      mouseY = y * 0.25;
    };

    container.addEventListener('pointermove', handlePointerMove);

    // 9. Lossless 60fps Loop with Exponential Damping (1 - Math.exp(-k * dt))
    let reqId = 0;
    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      reqId = requestAnimationFrame(animate);
      const dt = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;

      const k = 4.5;
      const dampFactor = 1 - Math.exp(-k * dt);

      // Smooth camera orientation
      targetRotY = mouseX;
      targetRotX = mouseY;
      camera.position.x += (targetRotY * 1.5 - camera.position.x) * dampFactor;
      camera.position.y += (2.2 + targetRotX * 0.8 - camera.position.y) * dampFactor;
      _targetPos.set(0, 0, 0);
      camera.lookAt(_targetPos);

      // Gyro animations
      if (isRotatingRef.current) {
        innerRingMesh.rotation.x += dt * 0.8;
        innerRingMesh.rotation.y += dt * 0.4;

        outerRingMesh.rotation.y -= dt * 0.6;
        outerRingMesh.rotation.z += dt * 0.3;

        crystalMesh.rotation.y += dt * 0.7;
        crystalMesh.rotation.x += dt * 0.3;
      }

      // Orbiting satellite nodes
      const timeSec = currentTime * 0.0015;
      nodes.forEach((node, idx) => {
        const offset = (idx * Math.PI * 2) / 3;
        const rad = 1.35;
        node.position.x = Math.cos(timeSec + offset) * rad;
        node.position.z = Math.sin(timeSec + offset) * rad;
        node.position.y = 0.15 + Math.sin(timeSec * 2 + offset) * 0.15;
      });

      // Exploded View smooth damping
      const exp = explodedRef.current;
      coreMesh.position.y = -0.45 + exp * 0.4;
      trimMesh.position.y = -0.66 + exp * 0.15;
      crystalMesh.position.y = 0.15 + exp * 0.8;
      innerRingMesh.position.y = 0.15 + exp * 1.1;
      outerRingMesh.position.y = 0.15 + exp * 1.4;

      renderer.render(scene, camera);
    };

    reqId = requestAnimationFrame(animate);

    // Resize handling
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('pointermove', handlePointerMove);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      scene.clear();
    };
  }, []);

  // Finish Swatches update
  const handleFinishChange = (finish: 'indigo' | 'titanium' | 'teal') => {
    setActiveFinish(finish);
    const parts = partsRef.current;
    if (!parts) return;

    if (finish === 'indigo') {
      (parts.base.material as THREE.MeshStandardMaterial).color.setHex(0x3B2FD0);
      (parts.coreHousing.material as THREE.MeshStandardMaterial).color.setHex(0x221a8a);
      (parts.midTrim.material as THREE.MeshStandardMaterial).color.setHex(0x14C3A2);
    } else if (finish === 'titanium') {
      (parts.base.material as THREE.MeshStandardMaterial).color.setHex(0x64748B);
      (parts.coreHousing.material as THREE.MeshStandardMaterial).color.setHex(0x334155);
      (parts.midTrim.material as THREE.MeshStandardMaterial).color.setHex(0x94A3B8);
    } else if (finish === 'teal') {
      (parts.base.material as THREE.MeshStandardMaterial).color.setHex(0x14C3A2);
      (parts.coreHousing.material as THREE.MeshStandardMaterial).color.setHex(0x0f856f);
      (parts.midTrim.material as THREE.MeshStandardMaterial).color.setHex(0x3B2FD0);
    }
  };

  return (
    <div className={`relative w-full h-[460px] md:h-[500px] rounded-3xl overflow-hidden shadow-xl border border-slate-200/90 bg-[#F7F8FC] ${className}`}>
      {/* 3D WebGL Canvas Mount Container */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Top Spec Badge (Minimal, Non-pulsing) */}
      <div className="absolute top-4 left-4 z-10 pointer-events-none">
        <div className="inline-flex items-center gap-2 bg-white/90 border border-slate-200 px-3 py-1.5 rounded-full shadow-xs text-xs font-medium text-slate-700">
          <span className="w-2 h-2 rounded-full bg-[#14C3A2]" />
          <span>Interactive 3D AI Front-Desk Hub</span>
        </div>
      </div>

      {/* Viewport-First Collapsible Bottom Control Dock (Zero Viewport Occlusion) */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-full max-w-[500px] px-4 z-20 transition-all duration-300">
        <div className="bg-[#1F2433] text-white rounded-2xl shadow-2xl p-3 border border-slate-700/80">
          {/* Header row with Cinema/Zen toggle */}
          <div className="flex items-center justify-between pb-2 border-b border-slate-700/60 text-xs">
            <span className="font-semibold text-slate-200">3D Hub Controls</span>
            <button
              onClick={() => setIsControlsOpen(!isControlsOpen)}
              className="text-slate-400 hover:text-white px-2 py-0.5 rounded text-[11px] font-medium transition-colors cursor-pointer"
            >
              {isControlsOpen ? '▾ Hide Controls' : '▴ Show Controls'}
            </button>
          </div>

          {/* Collapsible Panel Content */}
          {isControlsOpen && (
            <div className="pt-2.5 space-y-2.5 text-xs">
              {/* Exploded View Slider */}
              <div className="flex items-center justify-between gap-3">
                <span className="text-slate-400 whitespace-nowrap text-[11px]">Exploded View</span>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={explodedVal}
                  onChange={(e) => setExplodedVal(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#14C3A2]"
                />
                <span className="text-slate-400 text-[10px] w-8 text-right font-mono">
                  {Math.round(explodedVal * 100)}%
                </span>
              </div>

              {/* Finishes and Spin Toggles */}
              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-slate-400 text-[11px] mr-1">Finish:</span>
                  <button
                    onClick={() => handleFinishChange('indigo')}
                    title="Deep Indigo"
                    className={`w-5 h-5 rounded-full border-2 transition-transform cursor-pointer ${
                      activeFinish === 'indigo' ? 'border-[#14C3A2] scale-110' : 'border-transparent'
                    } bg-[#3B2FD0]`}
                  />
                  <button
                    onClick={() => handleFinishChange('titanium')}
                    title="Brushed Titanium"
                    className={`w-5 h-5 rounded-full border-2 transition-transform cursor-pointer ${
                      activeFinish === 'titanium' ? 'border-[#14C3A2] scale-110' : 'border-transparent'
                    } bg-[#64748B]`}
                  />
                  <button
                    onClick={() => handleFinishChange('teal')}
                    title="Teal Accent"
                    className={`w-5 h-5 rounded-full border-2 transition-transform cursor-pointer ${
                      activeFinish === 'teal' ? 'border-[#14C3A2] scale-110' : 'border-transparent'
                    } bg-[#14C3A2]`}
                  />
                </div>

                <button
                  onClick={() => setIsRotating(!isRotating)}
                  className={`text-[11px] px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                    isRotating ? 'bg-[#3B2FD0] text-white' : 'bg-slate-700 text-slate-300'
                  }`}
                >
                  {isRotating ? 'Pause Spin' : 'Resume Spin'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
