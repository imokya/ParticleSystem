export default {
  randomValue(min, max) {
    return min + max * (Math.random() - 0.5)
  },
  randomVector3(min, max) {
    const rand3 = new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5)
	  return new THREE.Vector3().addVectors(min, new THREE.Vector3().multiplyVectors(max, rand3))
  }
}