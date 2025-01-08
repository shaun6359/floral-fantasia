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

    // Create center of the flower (pistil)
    const centerGeometry = new THREE.SphereGeometry(0.4, 32, 32);
    const centerMaterial = new THREE.MeshPhongMaterial({ 
      color: 0xffeb3b,
      shininess: 100,
      emissive: 0xffeb3b,
      emissiveIntensity: 0.2
    });
    const center = new THREE.Mesh(centerGeometry, centerMaterial);
    flower.add(center);

    // Create more detailed petals
    const petalCount = 12;
    const petalShape = new THREE.Shape();
    
    // Create a more natural petal shape
    petalShape.moveTo(0, 0);
    petalShape.bezierCurveTo(0.5, 0.5, 0.5, 1.5, 0, 2);
    petalShape.bezierCurveTo(-0.5, 1.5, -0.5, 0.5, 0, 0);

    const petalGeometry = new THREE.ShapeGeometry(petalShape);
    const petalMaterial = new THREE.MeshPhongMaterial({ 
      color: 0xFF69B4,
      side: THREE.DoubleSide,
      shininess: 100,
      transparent: true,
      opacity: 0.9
    });

    // Create two layers of petals for more depth
    for (let layer = 0; layer < 2; layer++) {
      for (let i = 0; i < petalCount; i++) {
        const petal = new THREE.Mesh(petalGeometry, petalMaterial);
        petal.rotation.z = (i / petalCount) * Math.PI * 2;
        petal.position.z = layer * 0.1;
        petal.scale.set(1 + layer * 0.3, 1 + layer * 0.3, 1);
        flower.add(petal);
      }
    }

    // Create stem with a more natural curve
    const stemCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(-0.2, -1, 0),
      new THREE.Vector3(0, -2, 0),
      new THREE.Vector3(0.2, -3, 0)
    ]);

    const stemGeometry = new THREE.TubeGeometry(stemCurve, 64, 0.1, 8, false);
    const stemMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x2E7D32,
      shininess: 30
    });
    const stem = new THREE.Mesh(stemGeometry, stemMaterial);
    flower.add(stem);

    // Add multiple leaves
    const createLeaf = (position: THREE.Vector3, rotation: number) => {
      const leafShape = new THREE.Shape();
      leafShape.moveTo(0, 0);
      leafShape.quadraticCurveTo(0.8, 0.3, 0, 1.5);
      leafShape.quadraticCurveTo(-0.8, 0.3, 0, 0);

      const leafGeometry = new THREE.ShapeGeometry(leafShape);
      const leafMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x4CAF50,
        side: THREE.DoubleSide,
        shininess: 30
      });

      const leaf = new THREE.Mesh(leafGeometry, leafMaterial);
      leaf.position.copy(position);
      leaf.rotation.z = rotation;
      return leaf;
    };

    flower.add(createLeaf(new THREE.Vector3(-0.2, -1, 0), Math.PI / 4));
    flower.add(createLeaf(new THREE.Vector3(0.2, -2, 0), -Math.PI / 4));

    scene.add(flower);

    // Enhanced lighting setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    
    const mainLight = new THREE.DirectionalLight(0xffffff, 1);
    mainLight.position.set(5, 5, 5);
    scene.add(mainLight);

    const backLight = new THREE.DirectionalLight(0xffffff, 0.5);
    backLight.position.set(-5, 5, -5);
    scene.add(backLight);

    const fillLight = new THREE.DirectionalLight(0xffffff, 0.3);
    fillLight.position.set(0, -5, 5);
    scene.add(fillLight);

    camera.position.z = 6;
    camera.position.y = -1;
    camera.lookAt(0, 0, 0);

    // Enhanced animation
    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.005;

      // Gentle swaying motion
      flower.rotation.y = Math.sin(time) * 0.2;
      flower.rotation.z = Math.cos(time) * 0.1;

      // Subtle petal movement
      flower.children.forEach((child, index) => {
        if (child.type === 'Mesh' && child.geometry.type === 'ShapeGeometry') {
          child.rotation.z += Math.sin(time + index) * 0.001;
        }
      });

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