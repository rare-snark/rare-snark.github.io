const lengthInput = document.getElementById("length-input")
const sensInput = document.getElementById("sens-input")
const mdarmswipe = document.getElementById("45-arc")
const lgarmswipe = document.getElementById("80-arc")
const turnaround = document.getElementById("180-ingame")
const ninety = document.getElementById("90-ingame")
const fourtyfive = document.getElementById("45-ingame")
const smalladj = document.getElementById("22-25-ingame")
const outputs = [mdarmswipe, lgarmswipe, turnaround, ninety, fourtyfive, smalladj]
function getDist(sens, angle) {return sens * angle / 360.0}
function getAngle(dist, sens) {return 360.0 * dist / sens}
function calculate() {
    var circ = Math.PI*2*lengthInput.value
    var sens = sensInput.value
    console.log(circ)
    console.log(isNaN(circ))
    if (isNaN(circ)) outputs.forEach((output) => output.innerHTML = "---")
    else {
        var d45 = circ/8
        mdarmswipe.innerHTML = `45\u00B0 pivot: ~${d45.toFixed(1)}cm --> ~${getAngle(d45, sens).toFixed(1)}\u00B0 turn in game`
        var d80 = circ/4.5
        lgarmswipe.innerHTML = `80\u00B0 pivot: ~${d80.toFixed(1)}cm --> ~${getAngle(d80, sens).toFixed(1)}\u00B0 turn in game`

        turnaround.innerHTML = `180\u00B0 turn --> ${(sens/2).toFixed(1)}cm (${(sens/2/circ*360).toFixed(1)}\u00B0 pivot)`
        ninety.innerHTML = `90\u00B0 turn --> ${(sens/4).toFixed(1)}cm (${(sens/4/circ*360).toFixed(1)}\u00B0 pivot)`
        fourtyfive.innerHTML = `45\u00B0 turn  --> ${(sens/8).toFixed(1)}cm (${(sens/8/circ*360).toFixed(1)}\u00B0 pivot)`
        smalladj.innerHTML = `22.5\u00B0 turn --> ${(sens/16).toFixed(1)}cm (${(sens/16/circ*360).toFixed(1)}\u00B0 pivot)`
    }
}