import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const FlowerModel = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, mountRef.current.clientWidth / mountRef.current.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Create rose petals
    const createPetal = () => {
      const petalShape = new THREE.Shape();
      petalShape.moveTo(0, 0);
      petalShape.quadraticCurveTo(1, 1, 0, 2);
      petalShape.quadraticCurveTo(-1, 1, 0, 0);

      const geometry = new THREE.ShapeGeometry(petalShape);
      const material = new THREE.MeshPhongMaterial({ 
        color: 0xD946EF,
        side: THREE.DoubleSide,
        shininess: 100
      });
      return new THREE.Mesh(geometry, material);
    };

    // Create rose
    const rose = new THREE.Group();
    const petalCount = 20;
    for (let i = 0; i < petalCount; i++) {
      const petal = createPetal();
      petal.rotation.z = (i / petalCount) * Math.PI * 2;
      petal.rotation.x = Math.PI / 4;
      petal.position.z = i * 0.1;
      rose.add(petal);
    }
    scene.add(rose);

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 2);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    camera.position.z = 5;

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      rose.rotation.y += 0.01;
      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (!mountRef.current) return;
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full" />;
};

export default FlowerModel;