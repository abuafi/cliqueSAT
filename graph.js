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
    edges.push(new Edge(vertex1, vertex2))
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

class Vertex {
    move(x,y) {
        this.x = x 
        this.y = y
    }
    constructor(x,y,i) {
        this.x = x
        this.y = y
        this.i = i
        this.color = vertexColor
    }
}
class Edge {
    constructor(v1,v2) {
        this.vertex1 = v1 
        this.vertex2 = v2
        this.color = edgeColor
    }
    getVertex1() {
        if (this.vertex1 == -1 || draggingVertex && vertices[this.vertex1].i == mouseDownVertex.i) {
            return phantomVertex
        } else {
            return vertices[this.vertex1]
        }
    }
    getVertex2() {
        if (this.vertex2 == -1 || draggingVertex && vertices[this.vertex2].i == mouseDownVertex.i) {
            return phantomVertex
        } else {
            return vertices[this.vertex2]
        }
    }
}
let vertices = []
let edges = []
const vT = () => new kdTree([], (a,b) => canvasDistance(a,b), ['x','y'])
let vertexTree = vT()
function addVertex(x,y) {
    let i = instanceVertexCount
    let newVertex = new Vertex(x,y,i)
    vertices[i] = newVertex
    vertexTree.insert(newVertex)
    setVertexCount(i+1)
    kSelector.max = i+1
    return newVertex
}
function clearAll() {
    instance = []
    instanceVertexCount = 0
    vertices = []
    edges = []
    vertexTree = vT()
}
function haveSameVertices(e1,e2) {
    return (e1.vertex1 == e2.vertex1 && e1.vertex2 == e2.vertex2) || (e1.vertex2 == e2.vertex1 && e1.vertex1 == e2.vertex2)
}
function serialize() {
    let out = ""
    out += `${instanceVertexCount} ${edges.length}`
    for (let v of vertices) {
        out += `\n${v.x} ${v.y}`
    }
    for (let e of edges) {
        out += `\n${e.vertex1} ${e.vertex2}`
    }
    return out
}
function deserialize(s) {
    clearAll()
    s = s.split("\n")
    let [v, e] = s[0].split(" ").map(i => parseInt(i))
    console.log(v,e,s)
    for (let i = 1; i <= v; i++ ) {
        addVertex(...s[i].split(" "))
    }
    for (let i = v+1; i <= v+e; i++ ) {
        console.log(s[i].split(" "))
        addEdge(...s[i].split(" "))
    }
}