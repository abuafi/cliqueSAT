function solve_alt() {
    k = parseInt(k)
    let size = instanceVertexCount * k;
    let clauses = []
    if (size == 0) throw("Graph must contain at least 1 vertex")
    let pairs = kChoose2(k)
    let neighbours = makeNeighbours()
    // For every pair i,j \in {1,...,k}
    for (ij of pairs) {
        let i = ij[0]
        let j = ij[1]
        // console.log(`i = ${i}, j = ${j}`)
        // For every vertex v
        for (v in neighbours) {
            // console.log(`Neighbours of ${v} = ${neighbours[v]}`)
            let clause = [
                encodeVariable(i,parseInt(v)+1,false),
                ...neighbours[v].map(n => encodeVariable(j,n,true))
            ]
            // console.log(clause)
            clauses.push(clause)
        }
    }
    let vertices = Array.from({length: instanceVertexCount}, (_, i) => i+1)
    pairs = kChoose2(instanceVertexCount)
    for (let i = 1; i <= k; i++) {
        for (v of pairs) {
            let v1 = v[0]
            let v2 = v[1]
            clauses.push([
                encodeVariable(i,v1,false),
                encodeVariable(i,v2,false)
            ])
        }
        let clause = [
            ...vertices.map(v => encodeVariable(i,v,true))
        ]
        clauses.push(clause)
    }
    console.log(clauses.length)
    let solution = satSolve(size, clauses)
    if (!solution) return solution
    solution = solution.filter(v => v>0).map(v => decodeVariable(v)-1)
    return solution
}
function encodeVariable(i, v, value=true) {
    return (value?1:-1)*(v+(instanceVertexCount*(i-1)))
}
function decodeVariable(variable) {
    let v = Math.abs(variable)%instanceVertexCount
    return v == 0 ? instanceVertexCount : v
}
function makeNeighbours() {
    let neighbours = [...Array(instanceVertexCount)]
    for (i in neighbours) {
        neighbours[i] = []
    }
    for (row in instance) {
        for (col in instance[row]) {
            // For each possible combination of vertices
            if (instance[row][col] == 1) {
                // If there is an edge add it to the neighbours
                neighbours[row].push(parseInt(col)+1)
                neighbours[col].push(parseInt(row)+1)
            }
        }
    }
    return neighbours
}
function kChoose2(k, v = [], j = 0) {
    let out = []
    if (v.length == 2) return [v]
    for (let i = j; i < k; i++) {
        next = [...v]
        next.push(i+1)
        out = out.concat(kChoose2(k, next, i+1))
    }
    return out
}