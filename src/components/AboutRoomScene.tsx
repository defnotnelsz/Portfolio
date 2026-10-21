import React, { useRef, useMemo, useEffect, useState, useCallback, Suspense } from 'react';
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

// Helper to determine if an object in the room belongs to the guitar
const isGuitarObject = (obj: THREE.Object3D | null | undefined): boolean => {
  let curr = obj;
  while (curr) {
    if (
      curr.name &&
      (curr.name.includes('musical_instrument') || curr.name.toLowerCase().includes('guitar'))
    ) {
      return true;
    }
    curr = curr.parent;
  }
  return false;
};

// Helper to identify the laptop meshes so they can be cleanly excluded/hidden
const isLaptopObject = (obj: THREE.Object3D | null | undefined): boolean => {
  let curr = obj;
  while (curr) {
    if (curr.name) {
      const lower = curr.name.toLowerCase();
      if (
        lower.includes('laptop') ||
        lower.includes('notebook') ||
        curr.name === 'electronics.010' ||
        curr.name === 'electronics.017' ||
        curr.name === 'electronics.022' ||
        curr.name.includes('Mesh.308') ||
        curr.name.includes('Mesh.6484') ||
        curr.name.includes('Mesh.6528')
      ) {
        return true;
      }
    }
    curr = curr.parent;
  }
  return false;
};

// 1. The Main Gaming Room GLB Model
interface GamingRoomModelProps {
  onSelectGuitar?: () => void;
  onHoverGuitar?: (hover: boolean) => void;
  onLightingSourcesFound?: (sources: {
    cyanHex: [number, number, number];
    pinkHex: [number, number, number];
    monitors: [number, number, number];
  }) => void;
}

const GamingRoomModel: React.FC<GamingRoomModelProps> = ({
  onSelectGuitar,
  onHoverGuitar,
  onLightingSourcesFound,
}) => {
  const gltf = useGLTF('/models/gaming-room.glb');
  const roomScene = useMemo(() => gltf.scene.clone(true), [gltf.scene]);

  useEffect(() => {
    const cyanHexPositions: THREE.Vector3[] = [];
    const pinkHexPositions: THREE.Vector3[] = [];
    const monitorBox = new THREE.Box3();
    let hasMonitors = false;

    roomScene.traverse((child) => {
      // Safely hide and exclude only the laptop meshes from the room scene
      if (isLaptopObject(child)) {
        child.visible = false;
        return;
      }

      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
        materials.forEach((mat) => {
          if (!mat) return;
          const matName = mat.name || '';
          const meshName = mesh.name || '';

          // Hexagon Wall LED panels: realistic emissive illumination
          if (
            meshName.startsWith('Cube.00') ||
            meshName === '123.002' ||
            matName === 'Material.012' ||
            matName === 'Material.106' ||
            matName === 'Material.013'
          ) {
            const isCyan =
              matName === 'Material.012' ||
              meshName === 'Cube.001' ||
              meshName === 'Cube.003' ||
              meshName === 'Cube.005' ||
              meshName === 'Cube.007' ||
              meshName === 'Cube.008';
            const isPink =
              matName === 'Material.106' ||
              matName === 'Material.013' ||
              meshName === 'Cube.002' ||
              meshName === 'Cube.004' ||
              meshName === 'Cube.006';

            const worldPos = new THREE.Vector3();
            mesh.getWorldPosition(worldPos);

            if (isCyan) cyanHexPositions.push(worldPos);
            if (isPink) pinkHexPositions.push(worldPos);

            const standardMat = mat as THREE.MeshStandardMaterial;
            if (standardMat.isMeshStandardMaterial) {
              standardMat.emissive = new THREE.Color(isCyan ? '#00e5ff' : '#ff1ebe');
              standardMat.emissiveIntensity = 2.4;
              standardMat.roughness = 0.2;
              mesh.castShadow = false;
            }
          }

          // Monitors Screen illumination
          if (
            meshName === 'electronics.026' ||
            meshName === 'electronics.027' ||
            matName === 'tv'
          ) {
            monitorBox.expandByObject(mesh);
            hasMonitors = true;
            const standardMat = mat as THREE.MeshStandardMaterial;
            if (standardMat.isMeshStandardMaterial) {
              if (standardMat.map) {
                standardMat.emissiveMap = standardMat.map;
                standardMat.emissive = new THREE.Color('#ffffff');
                standardMat.emissiveIntensity = 1.35;
              } else {
                standardMat.emissive = new THREE.Color('#38bdf8');
                standardMat.emissiveIntensity = 1.5;
              }
              standardMat.roughness = 0.25;
            }
          }
        });
      }
    });

    if (onLightingSourcesFound) {
      const avgCyan = cyanHexPositions.length
        ? cyanHexPositions
            .reduce((acc, p) => acc.add(p), new THREE.Vector3())
            .multiplyScalar(1 / cyanHexPositions.length)
        : new THREE.Vector3(-1.8, 2.1, -3.6);

      const avgPink = pinkHexPositions.length
        ? pinkHexPositions
            .reduce((acc, p) => acc.add(p), new THREE.Vector3())
            .multiplyScalar(1 / pinkHexPositions.length)
        : new THREE.Vector3(-1.4, 2.3, -3.6);

      const monCenter = new THREE.Vector3();
      if (hasMonitors) {
        monitorBox.getCenter(monCenter);
      } else {
        monCenter.set(-1.2, 1.1, -3.5);
      }

      onLightingSourcesFound({
        cyanHex: [avgCyan.x, avgCyan.y, avgCyan.z],
        pinkHex: [avgPink.x, avgPink.y, avgPink.z],
        monitors: [monCenter.x, monCenter.y, monCenter.z],
      });
    }
  }, [roomScene, onLightingSourcesFound]);

  return (
    <primitive
      object={roomScene}
      position={[0, 0, 0]}
      onClick={(e: { object?: THREE.Object3D; stopPropagation: () => void }) => {
        if (isGuitarObject(e.object)) {
          e.stopPropagation();
          onSelectGuitar?.();
        }
      }}
      onPointerOver={(e: { object?: THREE.Object3D; stopPropagation: () => void }) => {
        if (isGuitarObject(e.object)) {
          e.stopPropagation();
          onHoverGuitar?.(true);
        }
      }}
      onPointerOut={(e: { object?: THREE.Object3D }) => {
        if (isGuitarObject(e.object)) {
          onHoverGuitar?.(false);
        }
      }}
    />
  );
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

// 3. Interactive Imported 3D Objects
interface InteractiveItemProps {
  obj: RoomObjectData;
  isSelected: boolean;
  isHovered: boolean;
  onSelect: () => void;
  onHover: (hover: boolean) => void;
  prefersReducedMotion: boolean;
}

// 3a. Interactive Wall-Mounted Guitar
const InteractiveGuitar: React.FC<InteractiveItemProps> = ({
  obj,
  isSelected,
  isHovered,
  onSelect,
  onHover,
}) => {
  return (
    <group position={obj.position}>
      {/* Wall Beacon Ring directly behind the guitar on the wall */}
      <mesh position={[-0.038, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <ringGeometry args={[0.34, 0.42, 32]} />
        <meshBasicMaterial
          color={isSelected ? '#ffffff' : isHovered ? '#67e8f9' : '#ffffff'}
          transparent
          opacity={isSelected ? 0.85 : isHovered ? 0.75 : 0.22}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>

      {/* Subtle hover silhouette outline */}
      {(isHovered || isSelected) && (
        <mesh>
          <boxGeometry args={[0.22, 1.48, 0.50]} />
          <meshBasicMaterial
            color={isSelected ? '#ffffff' : '#67e8f9'}
            wireframe
            transparent
            opacity={isSelected ? 0.35 : 0.20}
            depthWrite={false}
          />
        </mesh>
      )}

      {/* Invisible Interactive Hit Proxy encompassing the entire guitar */}
      <mesh
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
        <boxGeometry args={[0.25, 1.52, 0.52]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
    </group>
  );
};

// 3b. Interactive Imported Models (Cat, Rabbit, Cookies, Coffee, Journal)
const InteractiveImportedItem: React.FC<InteractiveItemProps> = ({
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
      : 0.18;

  // Render normalized geometry so each model's bottom sits precisely at group Y = 0
  const renderModel = () => {
    switch (obj.id) {
      case 'icedcoffee':
        return (
          <group position={[0, -0.3804 * obj.scale, 0]}>
            <primitive object={clonedScene} scale={obj.scale} />
          </group>
        );
      case 'cookies':
        return (
          <group position={[0, 0.3549 * obj.scale, 0]}>
            <primitive object={clonedScene} scale={obj.scale} />
          </group>
        );
      case 'journal':
        return (
          <group position={[-44.1512 * obj.scale, 0.8746 * obj.scale, 27.2622 * obj.scale]}>
            <primitive object={clonedScene} scale={obj.scale} />
          </group>
        );
      case 'cat':
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

const InteractiveItem: React.FC<InteractiveItemProps> = (props) => {
  if (props.obj.id === 'guitar') {
    return <InteractiveGuitar {...props} />;
  }
  return <InteractiveImportedItem {...props} />;
};

// 4. Camera and Orbit Controls Controller with persistent rotation after dragging
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

  const prevSelectedIdRef = useRef<string | null>(selectedId);
  const isTransitioningRef = useRef<boolean>(false);
  const isInteractingRef = useRef<boolean>(false);

  // Monitor OrbitControls user drag events
  useEffect(() => {
    const controls = controlsRef.current;
    if (!controls) return;

    const handleStart = () => {
      isInteractingRef.current = true;
      // User manual interaction takes precedence; stop any running auto-transition
      isTransitioningRef.current = false;
    };

    const handleEnd = () => {
      isInteractingRef.current = false;
      // Do NOT re-enable auto-transition on drag release. The room remains in its dragged orientation.
    };

    controls.addEventListener('start', handleStart);
    controls.addEventListener('end', handleEnd);

    return () => {
      controls.removeEventListener('start', handleStart);
      controls.removeEventListener('end', handleEnd);
    };
  }, [controlsRef]);

  // Trigger smooth programmatic transition only when selectedId explicitly changes
  useEffect(() => {
    if (prevSelectedIdRef.current !== selectedId) {
      prevSelectedIdRef.current = selectedId;
      isTransitioningRef.current = true;
    }
  }, [selectedId]);

  useFrame((state, delta) => {
    if (!controlsRef.current) return;

    // Only lerp position/target during an intentional selection transition when not actively dragging
    if (isTransitioningRef.current && !isInteractingRef.current) {
      let targetFocus: THREE.Vector3;
      let targetPos: THREE.Vector3;

      if (activeObj) {
        targetFocus = new THREE.Vector3(...activeObj.focusTarget);
        targetPos = new THREE.Vector3(...activeObj.focusPosition);
      } else {
        targetFocus = DEFAULT_TARGET;
        targetPos = DEFAULT_CAM_POS;
      }

      const factor = prefersReducedMotion ? 1.0 : Math.min(1.0, delta * 3.5);

      controlsRef.current.target.lerp(targetFocus, factor);
      state.camera.position.lerp(targetPos, factor);
      controlsRef.current.update();

      // Finish transition when arrived at destination
      if (
        state.camera.position.distanceTo(targetPos) < 0.01 &&
        controlsRef.current.target.distanceTo(targetFocus) < 0.01
      ) {
        isTransitioningRef.current = false;
      }
    } else {
      // Standard controls update that preserves user drag position and rotation without snap-back
      controlsRef.current.update();
    }
  });

  return null;
};

// 5. Realistic Room Lighting Setup
interface SceneLightingProps {
  lightingSources?: {
    cyanHex: [number, number, number];
    pinkHex: [number, number, number];
    monitors: [number, number, number];
  } | null;
}

const SceneLighting: React.FC<SceneLightingProps> = ({ lightingSources }) => {
  const cyanHexPos = lightingSources?.cyanHex ?? [-1.8, 2.1, -3.6];
  const pinkHexPos = lightingSources?.pinkHex ?? [-1.4, 2.3, -3.6];
  const monitorPos = lightingSources?.monitors ?? [-1.2, 1.1, -3.5];

  return (
    <>
      {/* 1. Balanced Ambient Base Illumination - soft fill preserving contrast and deep contact shadows */}
      <ambientLight color="#1e293b" intensity={0.60} />

      {/* 2. Key Sunlight from open front-right room cutaway */}
      <directionalLight
        position={[5.5, 7.5, 4.5]}
        intensity={1.5}
        color="#f8fafc"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-bias={-0.0001}
      />

      {/* 3. Soft neutral fill light from top-left */}
      <directionalLight position={[-4, 5, -1]} intensity={0.35} color="#cbd5e1" />

      {/* 4. Hexagon Wall LEDs - Cyan Cluster Glow: soft colored spill on wall and desk below */}
      <pointLight
        position={[cyanHexPos[0], cyanHexPos[1], cyanHexPos[2] + 0.12]}
        intensity={1.8}
        distance={2.8}
        decay={2}
        color="#00e5ff"
      />

      {/* 5. Hexagon Wall LEDs - Pink/Magenta Cluster Glow: soft colored spill on adjacent wall */}
      <pointLight
        position={[pinkHexPos[0], pinkHexPos[1], pinkHexPos[2] + 0.12]}
        intensity={1.8}
        distance={2.8}
        decay={2}
        color="#ff1ebe"
      />

      {/* 6. Dual Gaming Monitor Glow: illuminates desk mat, keyboard, and immediate desk area */}
      <pointLight
        position={[monitorPos[0], monitorPos[1] - 0.1, monitorPos[2] + 0.32]}
        intensity={2.2}
        distance={3.2}
        decay={2}
        color="#38bdf8"
      />

      {/* 7. Bedside Table Lamp Glow: warm amber comfort light */}
      <pointLight
        position={[-1.9, 0.85, -1.6]}
        intensity={1.3}
        distance={2.4}
        decay={2}
        color="#f59e0b"
      />

      {/* 8. Cozy Floor Atmosphere Glow */}
      <pointLight
        position={[-0.8, 0.05, -0.8]}
        intensity={0.45}
        distance={2.0}
        decay={2}
        color="#a855f7"
      />
    </>
  );
};

// Responsive Camera Framing Controller to fit the room comfortably without manual zoom
const ResponsiveCameraFramer: React.FC = () => {
  useFrame((state) => {
    const aspect = state.size.width / state.size.height;
    const cam = state.camera;
    if (cam instanceof THREE.PerspectiveCamera) {
      let targetFov = 40;
      if (aspect < 0.75) {
        targetFov = 58;
      } else if (aspect < 1.0) {
        targetFov = 52;
      } else if (aspect < 1.25) {
        targetFov = 46;
      } else if (aspect < 1.5) {
        targetFov = 42;
      }

      if (Math.abs(cam.fov - targetFov) > 0.05) {
        cam.fov = THREE.MathUtils.lerp(cam.fov, targetFov, 0.1);
        cam.updateProjectionMatrix();
      }
    }
  });

  return null;
};

export const AboutRoomScene: React.FC<AboutRoomSceneProps> = ({
  selectedId,
  hoveredId,
  onSelectObject,
  onHoverObject,
  prefersReducedMotion,
}) => {
  const controlsRef = useRef<OrbitControlsImpl | null>(null);

  // Restore cursor on component unmount
  useEffect(() => {
    return () => {
      document.body.style.cursor = 'auto';
    };
  }, []);

  const [lightingSources, setLightingSources] = useState<{
    cyanHex: [number, number, number];
    pinkHex: [number, number, number];
    monitors: [number, number, number];
  } | null>(null);

  const handleSelectGuitar = useCallback(() => {
    onSelectObject('guitar');
  }, [onSelectObject]);

  const handleHoverGuitar = useCallback(
    (hover: boolean) => {
      onHoverObject(hover ? 'guitar' : null);
      document.body.style.cursor = hover ? 'pointer' : 'auto';
    },
    [onHoverObject]
  );

  const handleLightingSources = useCallback(
    (sources: {
      cyanHex: [number, number, number];
      pinkHex: [number, number, number];
      monitors: [number, number, number];
    }) => {
      setLightingSources(sources);
    },
    []
  );

  return (
    <Canvas
      shadows
      camera={{ fov: 40, near: 0.1, far: 50, position: [3.2, 3.0, 1.4] }}
      gl={{
        antialias: true,
        alpha: false,
        powerPreference: 'high-performance',
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.08,
      }}
      className="w-full h-full block cursor-default"
      style={{ background: '#0a0a0a' }}
      onPointerMissed={() => {
        // Clicking outside an object deselects and returns to overview
        onSelectObject(null);
      }}
    >
      <color attach="background" args={['#0a0a0a']} />

      <ResponsiveCameraFramer />

      <SceneLighting lightingSources={lightingSources} />

      <Suspense fallback={null}>
        {/* Main 3D Gaming Room Model with guitar interaction */}
        <GamingRoomModel
          onSelectGuitar={handleSelectGuitar}
          onHoverGuitar={handleHoverGuitar}
          onLightingSourcesFound={handleLightingSources}
        />

        {/* 6 Interactive 3D Objects */}
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
        minDistance={1.0}
        maxDistance={8.5}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2.2}
        minAzimuthAngle={-Math.PI / 12}
        maxAzimuthAngle={Math.PI / 1.8}
        makeDefault
      />

      {/* Smooth Camera Interpolation without forced drag reset */}
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
