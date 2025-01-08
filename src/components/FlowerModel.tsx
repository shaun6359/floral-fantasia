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

    // Create flower parts
    const flower = new THREE.Group();

    // Create center of the flower
    const centerGeometry = new THREE.SphereGeometry(0.3, 32, 32);
    const centerMaterial = new THREE.MeshPhongMaterial({ 
      color: 0xffeb3b,
      shininess: 100
    });
    const center = new THREE.Mesh(centerGeometry, centerMaterial);
    flower.add(center);

    // Create petals
    const petalCount = 8;
    const petalShape = new THREE.Shape();
    petalShape.moveTo(0, 0);
    petalShape.quadraticCurveTo(0.5, 0.5, 0, 1.5);
    petalShape.quadraticCurveTo(-0.5, 0.5, 0, 0);

    const petalGeometry = new THREE.ShapeGeometry(petalShape);
    const petalMaterial = new THREE.MeshPhongMaterial({ 
      color: 0xD946EF, // Pink color matching the theme
      side: THREE.DoubleSide,
      shininess: 100
    });

    for (let i = 0; i < petalCount; i++) {
      const petal = new THREE.Mesh(petalGeometry, petalMaterial);
      petal.rotation.z = (i / petalCount) * Math.PI * 2;
      petal.position.z = 0.1;
      flower.add(petal);
    }

    // Create stem
    const stemGeometry = new THREE.CylinderGeometry(0.1, 0.1, 3, 32);
    const stemMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x4CAF50,
      shininess: 30
    });
    const stem = new THREE.Mesh(stemGeometry, stemMaterial);
    stem.position.y = -1.5;
    flower.add(stem);

    // Add leaf
    const leafShape = new THREE.Shape();
    leafShape.moveTo(0, 0);
    leafShape.quadraticCurveTo(0.5, 0.2, 0, 1);
    leafShape.quadraticCurveTo(-0.5, 0.2, 0, 0);

    const leafGeometry = new THREE.ShapeGeometry(leafShape);
    const leafMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x4CAF50,
      side: THREE.DoubleSide,
      shininess: 30
    });

    const leaf = new THREE.Mesh(leafGeometry, leafMaterial);
    leaf.position.y = -1;
    leaf.rotation.x = Math.PI / 4;
    flower.add(leaf);

    scene.add(flower);

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    const backLight = new THREE.DirectionalLight(0xffffff, 0.5);
    backLight.position.set(-5, 5, -5);
    scene.add(backLight);

    camera.position.z = 5;

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      flower.rotation.y += 0.005;
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