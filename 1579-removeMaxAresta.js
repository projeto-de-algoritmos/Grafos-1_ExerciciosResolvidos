function maxNumEdgesToRemove(n, edges) {
    // inicializa duas estruturas de dados
    const parentA = new Array(n + 1).fill(0).map((_, i) => i);
    const parentB = [...parentA];
  
    // funcao para encontrar o representante (raiz) de um conjunto disjunto
    function find(parent, x) {
      if (x !== parent[x]) {
        parent[x] = find(parent, parent[x]);
      }
      return parent[x];
    }
  
    // funcao para unir dois conjuntos disjuntos
    function union(parent, x, y) {
      const rootX = find(parent, x);
      const rootY = find(parent, y);
      if (rootX !== rootY) {
        parent[rootX] = rootY;
      }
    }
  
    // variavel para contar o numero de arestas removidas
    let removedEdges = 0;
  
    // classifica as arestas em ordem decrescente pelo tipo 3
    edges.sort((a, b) => b[0] - a[0]);
  
    // itera sobre as arestas
    for (const [type, u, v] of edges) {
      // tipo 3
      if (type === 3) {
        // se u e v nao pertencem ao mesmo conjunto em parentA ou parentB, une-os
        // caso contrario, incrementa o contador de arestas removidas
        if (find(parentA, u) !== find(parentA, v) || find(parentB, u) !== find(parentB, v)) {
          union(parentA, u, v);
          union(parentB, u, v);
        } else {
          removedEdges++;
        }
      }
      // tipo 1
      else if (type === 1) {
        // se u e v nao pertencem ao mesmo conjunto em parentA, une-os
        // caso contrario, incrementa o contador de arestas removidas
        if (find(parentA, u) !== find(parentA, v)) {
          union(parentA, u, v);
        } else {
          removedEdges++;
        }
      }
      // tipo 2
      else if (type === 2) {
        // se u e v nao pertencem ao mesmo conjunto em parentB, une-os
        // caso contrario, incrementa o contador de arestas removidas
        if (find(parentB, u) !== find(parentB, v)) {
          union(parentB, u, v);
        } else {
          removedEdges++;
        }
      }
    }
  
    // verifica se Alice e Bob podem percorrer completamente seus subgrafos
    const rootA = find(parentA, 1);
    const rootB = find(parentB, 1);
  
    // itera sobre os vértices e verifica se todos tem o mesmo representante (raiz)
    for (let i = 2; i <= n; i++) {
      if (find(parentA, i) !== rootA || find(parentB, i) !== rootB) {
        return -1;
      }
    }
  
    // retorna o numero de arestas removidas
    return removedEdges;
  }
  
  // exemplo de uso da funcao com n igual a 4 e matriz de arestas 'edges'
  const n = 4;
  const edges = [[3, 1, 2], [3, 2, 3], [1, 1, 3], [1, 2, 4], [1, 1, 2], [2, 3, 4]];
  
  // chama a funcao e imprime o resultado (deve imprimir 2)
  console.log(maxNumEdgesToRemove(n, edges));
  