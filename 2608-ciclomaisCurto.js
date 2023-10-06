/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number}
 */
var findShortestCycle = function (n, edges) {
    // construir listas de adjacencia
    const adj = Array.from({ length: n }, () => []);
    for (const [n1, n2] of edges) {
        adj[n1].push(n2);
        adj[n2].push(n1);
    }

    // percorrer todos os nos
    let ans = Infinity;
    for (let i = 0; i < n; i++) {
        ans = Math.min(ans, bfs(i));
    }
    return ans == Infinity ? -1 : ans;

    function bfs(node) {
        const visited = new Array(n); // iniciar para cada i, nao pode ser global, outros i iniciais podem precisar dos nos
        const queue = [node];
        const parent = [-1]; // parent[i] é o nó pai de queue[i]
        let count = -1; // valor inicial depende do que voce esta retornando
        while (queue.length) {
            const len = queue.length;
            // verificar se pode retornar ou nao neste nivel
            for (let i = 0; i < len; i++) {
                if (visited[queue[i]]) return count + count + 1;
            }
            if (new Set(queue).size != queue.length) return count + count + 2;
            // se ainda nao retornou, nao ha retorno neste nivel
            for (let i = 0; i < len; i++) {
                const crtNode = queue[i];
                const crtParent = parent[i];
                visited[crtNode] = true; // marcar apenas apos a remocao da fila, nao antes de inserir na proxima fila, voce deseja inserir um no mais de uma vez no caso de ciclos pares
                for (const child of adj[crtNode]) {
                    if (child != crtParent) { // nao marcar como visitado aqui, queremos adicionar nos duplicados para verificar ciclos pares ou impares
                        queue.push(child);
                        parent.push(crtNode);
                    }
                }
            }
            queue.splice(0, len);
            parent.splice(0, len);
            count++;
            if (count + count + 1 > ans) return Infinity; // nao e mais possivel substituir ans, apenas podemos parar
        }
        return Infinity; 
    };
}
