function solve() {
    let time
    if (debug) time = window.performance.now()
    let size = instanceVertexCount;
    let clauses = []
    if (size == 0) throw("Graph must contain at least 1 vertex")
    for (row in instance) {
        for (col in instance[row]) {
            // For each possible combination of vertices
            if (!instance[row][col]) {
                // If there is no edge create a clause
                // "Either row or col are not in the clique"
                clauses.push([-(parseInt(row)+1), -(parseInt(col)+1)])
            }
        }
    }
    let others = recursiveClauses(size - k + 1)
    clauses = clauses.concat(others)
    if (debug) {
        let clauseTime = window.performance.now() - time
        debugData = {clauseTime}
        time = window.performance.now()
    }
    let solution = satSolve(size, clauses)
    if (debug) {
        let satTime = window.performance.now() - time
        debugData.satTime = satTime
        debugData.totalTime = debugData.clauseTime + satTime
    }
    if (!solution) return solution 
    return solution.filter(i => i>0).map(i => i-1)
}
function recursiveClauses(stop, v = [], j = 0) {
    let out = []
    if (v.length == stop) return [v]
    for (let i = j; i < instanceVertexCount; i++) {
        next = [...v]
        next.push(i+1)
        out = out.concat(recursiveClauses(stop, next, i+1))
    }
    return out
}