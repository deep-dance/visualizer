import * as THREE from "three";

import { MeshLine, MeshLineMaterial, MeshLineRaycast } from 'three.meshline';

class LineFigure {
    constructor(store, color, position, key) {
        this.store = store;

        this.group = new THREE.Group();
        this.group.position.set(position.x, position.y, position.z);

        this.key = key;

        this.lineMaterial = new THREE.LineBasicMaterial({
            color: color,
            linewidth: 10,
            linecap: "round", //ignored by WebGLRenderer
            linejoin: "round", //ignored by WebGLRenderer
        });

        this.meshLineMaterial = new MeshLineMaterial({
            color: color,
            sizeAttenuation: true,
            lineWidth: 0.03,
        });
        console
    }

    CreateLines(idx) {
        if (this.store.state.currentJSONData[this.key] == null || this.store.state.currentJSONData[this.key].frames[idx] == null) {
            return
        }
        var frame = this.store.state.currentJSONData[this.key].frames[idx];
        var min = 0;
        if (this.store.state.addMinVal) {
            frame.forEach(bone => {
                if (bone[2] < min) {
                    min = bone[2];
                }
            })
        }
        this.bonesShadow = [];
        this.bones= [];
        Object.values(this.store.state.currentJSONData[this.key].bones).forEach(
            (bone, boneIdx) => {
                this.bones[boneIdx] = [];
                this.bonesShadow[boneIdx] = [];
                bone.forEach((element) => {
                    this.bonesShadow[boneIdx].push(
                        new THREE.Vector3(
                            frame[element][0] * -1,
                            frame[element][2] - min,
                            frame[element][1]
                        )
                    );
                });

                bone.forEach((element) => {
                    this.bones[boneIdx].push(
                            frame[element][0] * -1,
                            frame[element][2] - min,
                            frame[element][1]
                    );
                });

                const geometry = new THREE.BufferGeometry().setFromPoints(
                    this.bonesShadow[boneIdx]
                );

                const lineShadow = new THREE.Line(geometry, this.lineMaterial);
                lineShadow.geometry.verticesNeedUpdate = true;
                lineShadow.castShadow = true;
                lineShadow.receiveShadow = true;

                const line = new MeshLine();
                line.setPoints(this.bones[boneIdx]);           

                const meshLine = new THREE.Mesh(line, this.meshLineMaterial);
                this.group.add(meshLine, lineShadow)
            }
        );
    }

    RemoveAllLines() {
        for (var i = this.group.children.length - 1; i >= 0; i--) {
            this.group.remove(this.group.children[i]);
        }
    }

    GetGroup() {
        return this.group;
    }
}

export default LineFigure;