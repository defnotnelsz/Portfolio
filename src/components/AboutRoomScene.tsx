import React, { useRef, useMemo, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import * as THREE from 'three';
import { ROOM_OBJECTS, type RoomObjectData } from '../data/aboutObjects';

interface AboutRoomSceneProps {
  selectedId: string | null;
  hoveredId: string | null;
  onSelectObject: (id: string | null) => void;
  onHoverObject: (id: string | null) => void;
  prefersReducedMotion: boolean;
}

// 1. The Main Gaming Room GLB Model
const GamingRoomModel: React.FC = () => {
  const gltf = useGLTF('/models/gaming-room.glb');
  const roomScene = useMemo(() => gltf.scene.clone(true), [gltf.scene]);

  useEffect(() => {
    roomScene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
      }
    });
  }, [roomScene]);

  return <primitive object={roomScene} position={[0, 0, 0]} />;
};

// 2. Cat Sleeping Zzz Billboard Effect
const CatZzzBillboard: React.FC<{ prefersReducedMotion: boolean }> = ({ prefersReducedMotion }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { camera } = useThree();

  useEffect(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const tex = new THREE.CanvasTexture(canvas);
    tex.minFilter = THREE.LinearFilter;
    tex.magFilter = THREE.LinearFilter;

    if (meshRef.current) {
      meshRef.current.material = new THREE.MeshBasicMaterial({
        map: tex,
        transparent: true,
        depthWrite: false,
        toneMapped: false,
      });
    }

    return () => {
      tex.dispose();
    };
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.quaternion.copy(camera.quaternion);

    const mat = meshRef.current.material as THREE.MeshBasicMaterial;
    if (!mat || !mat.map) return;
    const canvas = (mat.map as THREE.CanvasTexture).image as HTMLCanvasElement;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, 128, 128);

    if (prefersReducedMotion) {
      ctx.font = 'bold 24px "JetBrains Mono", monospace';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
      ctx.fillText('Zzz', 36, 64);
      mat.map.needsUpdate = true;
      return;
    }

    const t = state.clock.getElapsedTime() * 0.75;
    for (let i = 0; i < 3; i++) {
      const p = (t + i * 0.33) % 1.0;
      const y = 110 - p * 80;
      const x = 36 + p * 34 + Math.sin(p * 3.5) * 6;
      const size = 15 + p * 12;
      const alpha = Math.sin(p * Math.PI) * 0.85;

      ctx.font = `bold ${Math.round(size)}px "JetBrains Mono", monospace`;
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha.toFixed(2)})`;
      ctx.fillText('Z', x, y);
    }

    mat.map.needsUpdate = true;
  });

  return (
    <mesh ref={meshRef} position={[0, 0.48, 0]}>
      <planeGeometry args={[0.7, 0.7]} />
    </mesh>
  );
};

// 3. Interactive Imported 3D Object
interface InteractiveItemProps {
  obj: RoomObjectData;
  isSelected: boolean;
  isHovered: boolean;
  onSelect: () => void;
  onHover: (hover: boolean) => void;
  prefersReducedMotion: boolean;
}

const InteractiveItem: React.FC<InteractiveItemProps> = ({
  obj,
  isSelected,
  isHovered,
  onSelect,
  onHover,
  prefersReducedMotion,
}) => {
  const gltf = useGLTF(obj.modelPath);
  const clonedScene = useMemo(() => gltf.scene.clone(true), [gltf.scene]);
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    clonedScene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
      }
    });
  }, [clonedScene]);

  // Beacon ring radius customized per object size
  const ringRadius =
    obj.id === 'cat'
      ? 0.32
      : obj.id === 'rabbit'
      ? 0.24
      : obj.id === 'cookies'
      ? 0.18
      : obj.id === 'icedcoffee'
      ? 0.13
      : 0.15;

  // Render normalized geometry so each model's bottom sits precisely at group Y = 0
  const renderModel = () => {
    switch (obj.id) {
      case 'icedcoffee':
        // Raw bottom Y is +0.3804; shift down so bottom sits flush at Y = 0
        return (
          <group position={[0, -0.3804 * obj.scale, 0]}>
            <primitive object={clonedScene} scale={obj.scale} />
          </group>
        );
      case 'cookies':
        // Raw bottom Y is -0.3549; shift up so bottom of plate sits flush at Y = 0
        return (
          <group position={[0, 0.3549 * obj.scale, 0]}>
            <primitive object={clonedScene} scale={obj.scale} />
          </group>
        );
      case 'journal':
        // Center X and Z and shift up by raw bottom Y (-0.8746) so cover sits flush at Y = 0
        return (
          <group position={[-44.1512 * obj.scale, 0.8746 * obj.scale, 27.2622 * obj.scale]}>
            <primitive object={clonedScene} scale={obj.scale} />
          </group>
        );
      case 'cat':
        // Lowest vertex Y is -0.5350; shift up so cat paws sit flush at Y = 0
        return (
          <group position={[0, 0.5350 * obj.scale, 0]}>
            <primitive object={clonedScene} scale={obj.scale} />
          </group>
        );
      case 'rabbit':
      default:
        return <primitive object={clonedScene} scale={obj.scale} />;
    }
  };

  return (
    <group
      ref={groupRef}
      position={obj.position}
      rotation={obj.rotation}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        onHover(true);
      }}
      onPointerOut={() => {
        onHover(false);
      }}
    >
      {/* Tabletop / Surface Beacon Ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.002, 0]}>
        <ringGeometry args={[ringRadius * 0.75, ringRadius, 32]} />
        <meshBasicMaterial
          color={isSelected ? '#ffffff' : isHovered ? '#67e8f9' : '#ffffff'}
          transparent
          opacity={isSelected ? 0.85 : isHovered ? 0.75 : 0.22}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>

      {/* Model Geometry directly grounded at tabletop level */}
      {renderModel()}

      {/* Cat Sleeping Zzz billboard */}
      {obj.id === 'cat' && <CatZzzBillboard prefersReducedMotion={prefersReducedMotion} />}
    </group>
  );
};

// 4. Smooth Camera and Orbit Controls Controller
interface CameraControllerProps {
  selectedId: string | null;
  controlsRef: React.RefObject<OrbitControlsImpl | null>;
  prefersReducedMotion: boolean;
}

const DEFAULT_TARGET = new THREE.Vector3(-0.6, 0.7, -2.4);
const DEFAULT_CAM_POS = new THREE.Vector3(3.2, 3.0, 1.4);

const CameraController: React.FC<CameraControllerProps> = ({
  selectedId,
  controlsRef,
  prefersReducedMotion,
}) => {
  const activeObj = useMemo(() => {
    return ROOM_OBJECTS.find((o) => o.id === selectedId) || null;
  }, [selectedId]);

  useFrame((state, delta) => {
    if (!controlsRef.current) return;

    let targetFocus = DEFAULT_TARGET;
    let targetPos = DEFAULT_CAM_POS;

    if (activeObj) {
      targetFocus = new THREE.Vector3(...activeObj.focusTarget);
      targetPos = new THREE.Vector3(...activeObj.focusPosition);
    }

    const factor = prefersReducedMotion ? 1.0 : Math.min(1.0, delta * 3.5);

    controlsRef.current.target.lerp(targetFocus, factor);
    state.camera.position.lerp(targetPos, factor);
    controlsRef.current.update();
  });

  return null;
};

// 5. Scene Lighting Setup
const SceneLighting: React.FC = () => {
  return (
    <>
      <ambientLight color="#f8fafc" intensity={1.2} />
      {/* Key Sunlight from open front-right room cutaway */}
      <directionalLight
        position={[6, 8, 5]}
        intensity={1.8}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-bias={-0.0001}
      />
      {/* Fill light from top-left */}
      <directionalLight position={[-5, 5, -2]} intensity={0.6} color="#e2e8f0" />
      {/* Gaming desk neon cyan screen glow */}
      <pointLight position={[-1.2, 0.95, -3.5]} intensity={2.0} distance={3.5} color="#38bdf8" />
      {/* Warm amber bedside lamp glow */}
      <pointLight position={[-1.9, 0.85, -1.6]} intensity={1.5} distance={2.5} color="#fbbf24" />
      {/* Cozy floor atmosphere light */}
      <pointLight position={[-0.8, -0.1, -0.8]} intensity={0.6} distance={2.0} color="#c084fc" />
    </>
  );
};

export const AboutRoomScene: React.FC<AboutRoomSceneProps> = ({
  selectedId,
  hoveredId,
  onSelectObject,
  onHoverObject,
  prefersReducedMotion,
}) => {
  const controlsRef = useRef<OrbitControlsImpl | null>(null);

  return (
    <Canvas
      shadows
      camera={{ fov: 42, near: 0.1, far: 50, position: [3.2, 3.0, 1.4] }}
      gl={{
        antialias: true,
        alpha: false,
        powerPreference: 'high-performance',
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.05,
      }}
      className="w-full h-full block cursor-default"
      style={{ background: '#0a0a0a' }}
      onPointerMissed={() => {
        // Clicking outside an object deselects and returns to overview
        onSelectObject(null);
      }}
    >
      <color attach="background" args={['#0a0a0a']} />

      <SceneLighting />

      <Suspense fallback={null}>
        {/* Main 3D Gaming Room Model */}
        <GamingRoomModel />

        {/* 5 Interactive 3D Objects */}
        {ROOM_OBJECTS.map((obj) => (
          <InteractiveItem
            key={obj.id}
            obj={obj}
            isSelected={selectedId === obj.id}
            isHovered={hoveredId === obj.id}
            onSelect={() => onSelectObject(obj.id)}
            onHover={(hover) => {
              onHoverObject(hover ? obj.id : null);
              document.body.style.cursor = hover ? 'pointer' : 'auto';
            }}
            prefersReducedMotion={prefersReducedMotion}
          />
        ))}
      </Suspense>

      {/* Orbit Controls with safety limits */}
      <OrbitControls
        ref={controlsRef}
        target={[-0.6, 0.7, -2.4]}
        enableDamping
        dampingFactor={0.05}
        minDistance={2.2}
        maxDistance={8.5}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2.2}
        minAzimuthAngle={-Math.PI / 12}
        maxAzimuthAngle={Math.PI / 1.8}
        makeDefault
      />

      {/* Smooth Camera Interpolation */}
      <CameraController
        selectedId={selectedId}
        controlsRef={controlsRef}
        prefersReducedMotion={prefersReducedMotion}
      />
    </Canvas>
  );
};

// Preload models for smooth performance
useGLTF.preload('/models/gaming-room.glb');
useGLTF.preload('/models/cat.glb');
useGLTF.preload('/models/rabbit.glb');
useGLTF.preload('/models/cookies.glb');
useGLTF.preload('/models/icedcoffee.glb');
useGLTF.preload('/models/journal.glb');
