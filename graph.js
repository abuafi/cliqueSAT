// Size of clique we're trying to find
var k = 1
// Number of vertices in the graph
var instanceVertexCount = 0
// Adjacency matrix of the graph (only Lower Triangular is required)
var instance = []
function reorder(a,b) {
    return [Math.max(a,b), Math.min(a,b)]
}
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
    [vertex1, vertex2] = reorder(vertex1,vertex2)
    instance[vertex1][vertex2] = 1
    return {v1:vertex1, v2:vertex2}
}
function removeEdge(vertex1, vertex2) {
    if (vertex1 == vertex2) {
        throw("Invalid edge")
    }
    [vertex1, vertex2] = reorder(vertex1,vertex2)
    instance[vertex1][vertex2] = 0
    return {v1:vertex1, v2:vertex2}
}
function connected(vertex1, vertex2) {
    if (vertex1 == vertex2) {
        return 0
    }
    [vertex1, vertex2] = reorder(vertex1,vertex2)
    return instance[vertex1][vertex2]
}