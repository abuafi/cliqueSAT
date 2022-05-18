// Size of clique we're trying to find
var k = 1
// Number of vertices in the graph
var instanceVertexCount = 0
// Adjacency matrix of the graph (only Lower Triangular is required)
var instance = []
function setVertexCount(count) {
    if (count < instanceVertexCount) {
        console.warn("Reducing vertex count may remove some existing edges");
        while (instanceVertexCount > count) {
            instance.pop()
            instanceVertexCount--
        }
    } else {
        while (instanceVertexCount < count) {
            instance.push(Array(instanceVertexCount).fill(0))
            instanceVertexCount++
        }
    }
}
function addEdge(vertex1, vertex2) {
    if (vertex1 == vertex2) {
        throw("Invalid edge")
    }
    [vertex2, vertex1] = [vertex1, vertex2].sort()
    instance[vertex1][vertex2] = 1
    return {v1:vertex1, v2:vertex2}
}
function removeEdge(vertex1, vertex2) {
    if (vertex1 == vertex2) {
        throw("Invalid edge")
    }
    [vertex2, vertex1] = [vertex1, vertex2].sort()
    instance[vertex1][vertex2] = 0
    return {v1:vertex1, v2:vertex2}
}
function connected(vertex1, vertex2) {
    if (vertex1 == vertex2) {
        return 0
    }
    [vertex2, vertex1] = [vertex1, vertex2].sort()
    return instance[vertex1][vertex2]
}
function solve() {
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
    let solution = satSolve(size, clauses)
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