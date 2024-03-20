const A = document.getElementById("A")
const B = document.getElementById("B")
const C = document.getElementById("C")
const fields = [A, B, C]
function foo() {
    const empty = []
    for (let i = 0; i < fields.length; i++) {
        ele = fields[i]
        if (isNaN(ele.value)) {
            res.innerHTML = `NaN value in ${ele.placeholder}`
            return
        }
        if (ele.value == "") empty.push(ele)
    }
    if (empty.length > 1) {
        res.innerHTML = "too many empty fields"
        return
    }
    else { res.innerHTML = `${empty.pop().placeholder} is empty` }
}
const res = document.getElementById("result")
const ePivot = document.getElementById("pivot-input")
const eLength = document.getElementById("length-input")
const eSens = document.getElementById("sens-input")
const eRotation = document.getElementById("rotation-input")
const eDist = document.getElementById("dist-input")
const inputs = [ePivot, eLength, eSens, eRotation, eDist]
function getDist1(pivot, length) {return pivot * Math.PI * length / 180}
function getDist2(sens, rotation) {return sens * rotation / 360}
function baseSensRotation(pivot, length) {return 2 * Math.PI * pivot * length}
function getSens1(pivot, length, rotation) {return baseSensRotation(pivot, length) / rotation}
function getRotation1(pivot, length, sens) {return baseSensRotation(pivot, length) / sens}
function getSens2(dist, rotation) {return 360*dist/rotation}
function getRotation2(dist, sens) {return 360*dist/sens}
function baseLengthPivot(sens, rotation, x) {return (sens * rotation)/(2 * Math.PI * x)}
function getLength1(sens, rotation, pivot) {return baseLengthPivot(sens, rotation, pivot)}
function getPivot1(sens, rotation, length) {return baseLengthPivot(sens, rotation, length)}
function getLength2(dist, pivot) {return (180*dist)/(Math.PI*pivot)}
function getPivot2(dist, length) {return (180*dist)/(Math.PI*length)}
// function baseLengthPivot2(dist)
function eval() {
    const empty = []
    const filled = []
    for (let i = 0; i < inputs.length; i++) {
        ele = inputs[i]
        console.log(`innerhtml: ${ele.name} | value: ${ele.value}`);
        if (isNaN(ele.value)) {
            res.innerHTML = `NaN value in '${ele.placeholder}'`
            return
        }
        if (ele.value == "") empty.push(ele)
        else filled.push(ele)
    }
    if (empty.length > 2) {
        res.innerHTML = "too many empty fields"
        return
    }
    else if (empty.length <= 2) {
        if (empty.includes(eSens) && empty.includes(eRotation)) {
            res.innerHTML = "sens and rotation cannot both be blank"
            return
        }
        if (empty.includes(eLength) && empty.includes(ePivot)) {
            res.innerHTML = "length and pivot cannot both be blank"
            return
        }
        while (empty.length != 0){
            ele = empty[0]
            console.log(`adjusting: innerhtml: ${ele.name} | value: ${ele.value}`);
            if (ele === eLength){
                console.log("detected eLength");
                ele.value = getLength1(eSens.value, eRotation.value, ePivot.value)
                if (ele.value == 0) ele.value = getLength2(eDist.value, ePivot.value)
            }
            else if (ele === eDist){
                console.log("detected eDist");
                ele.value = getDist1(ePivot.value, eLength.value)
                if (ele.value == 0) ele.value = getDist2(eSens.value, eRotation.value)
            }
            else if (ele === ePivot){
                console.log("detected ePivot");
                ele.value = getPivot1(eSens.value, eRotation.value, eLength.value)
                if (ele.value == 0) ele.value = getPivot2(eDist.value, eLength.value)
            }
            else if (ele === eSens){
                console.log("detected eSens");
                ele.value = getSens1(ePivot.value, eLength.value, eRotation.value)
                if (ele.value == 0) ele.value = getSens2(eDist.value, eRotation.value)
            }
            else if (ele === eRotation){
                console.log("detected eRotation");
                ele.value = getRotation1(ePivot.value, eLength.value, eSens.value)
                if (ele.value == 0) ele.value = getRotation2(eDist.value, eSens.value)
            }
            console.log(`adjusted: innerhtml: ${ele.name} | value: ${ele.value}`);
            if (ele.value == 0) {
                empty.push(empty[0])
                empty.shift()
            }
            else {
                empty.shift()
            }
        }
        res.innerHTML = "finished calculating"
    }
}