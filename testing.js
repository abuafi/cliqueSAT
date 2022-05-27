const TEST_INSTANCES = [
    {presetName: "hexagon", k: 6},
    {presetName: "insect", k: 6},
    {presetName: "icosagon", k: 20},
    {presetName: "icosagon_random", k: 6},
    {presetName: "fish", k: 5}
]

const TEST_FUNCTIONS = [
    solve, solve_alt
]

function runTests() {
    let oldK = k
    let oldInstance = serialize()
    let oldDebug = debug
    let csv = "presetName,k,solverName,clauseNumber,clauseTime,satTime,totalTime"
    debug = true
    for (let preset of TEST_INSTANCES) {
        loadPreset(preset.presetName)
        for (k = 1; k <= instanceVertexCount; k++) {
            for (let s of TEST_FUNCTIONS) {
                let solution = s()
                if (!solution && k<=preset.k) throw(`Solver ${s.name}: Expected a valid clique at k=${k}, got UNSAT`)
                if (solution && k>preset.k) throw(`Solver ${s.name}: Expected UNSAT at k=${k}, got solution=${solution}`)
                csv += `\n${preset.presetName},${k},${s.name},${debugData.clauseNumber},${debugData.clauseTime},${debugData.satTime},${debugData.totalTime}`
            }
        }
    }
    debug = oldDebug
    k = oldK
    load(oldInstance)
    downloadText("testOutput.csv",csv)
    return csv
}
