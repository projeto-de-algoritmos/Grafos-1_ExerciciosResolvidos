function isBipartite(grafo) {
    const n = grafo.length;
    const cores = new Array(n).fill(0); // array para manter o rotulo de cor de cada vértice

    // funcao para verificar se eh possível colorir o grafo de forma bipartida
    function dfs(no, cor) {
        if (cores[no] !== 0) { 
            return cores[no] === cor;
        }
        
        cores[no] = cor; 
        
        //fazendo busca em profundidade para ver se temos vizinhos com a mesma cor
        for (const vizinho of grafo[no]) {
            if (!dfs(vizinho, -cor)) {
                return false;
            }
        }
        
        return true;
    }

   // passando por todos os vertices
    for (let i = 0; i < n; i++) {
        if (cores[i] === 0 && !dfs(i, 1)) {
            return false; // Se nao der para  colorir o grafo bipartidamente, retorna false
        }
    }

    return true; 
}

// exemplos
const grafo = [[1, 3], [0, 2], [1, 3], [0, 2]];
const resultado = isBipartite(grafo);
console.log(resultado); 
