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
function getSens(pivot, length, rotation) {return baseSensRotation(pivot, length) / rotation}
function getRotation(pivot, length, sens) {return baseSensRotation(pivot, length) / sens}
function baseLengthPivot(sens, rotation, x) {return (sens * rotation)/(2 * Math.PI * x)}
function getLength(sens, rotation, pivot) {return baseLengthPivot(sens, rotation, pivot)}
function getPivot(sens, rotation, length) {return baseLengthPivot(sens, rotation, length)}
// function baseLengthPivot2(dist)
function eval() {
    const empty = []
    const filled = []
    for (let i = 0; i < inputs.length; i++) {
        ele = inputs[i]
        console.log(`innerhtml: ${ele.innerHTML} | value ${ele.value}`);
        if (isNaN(ele.value)) {
            res.innerHTML = `NaN value in '${ele.placeholder}'`
            return
        }
        if (ele.value == "") empty.push(ele)
        else filled.push(ele)
    }
    // console.log(`known: ${filled} | unknown: ${empty}`);
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
            ele = empty.shift()
            if (ele === eLength){ele.value = getLength(eSens.value, eRotation.value, ePivot.value)}
            else if (ele === eDist){ele.value = getDist1(ePivot.value, eLength.value)
            }
            else if (ele === ePivot){
                ele.value = getPivot(eSens.value, eRotation.value, eLength.value)
            }
            else if (ele === eSens){
                ele.value = getSens(ePivot.value, eLength.value, eRotation.value)
            }
            else if (ele === eRotation){
                ele.value = getRotation(ePivot.value, eLength.value, eSens.value)
            }
            console.log(ele.value)
            if (ele.value == 0) empty.push(ele)
        }
    }
    // else if (empty.length == 1) {
    //     ele = empty.pop()
    //     if (ele === eLength){ele.value = getLength(eSens.value, eRotation.value, ePivot.value)}
    //     else if (ele === eDist){ele.value = getDist1(ePivot.value, eLength.value)}
    //     else if (ele === ePivot){ele.value = getPivot(eSens.value, eRotation.value, eLength.value)}
    //     else if (ele === eSens){ele.value = getSens(ePivot.value, eLength.value, eRotation.value)}
    //     else if (ele === eRotation){ele.value = getRotation(ePivot.value, eLength.value, eSens.value)}
    // }
}