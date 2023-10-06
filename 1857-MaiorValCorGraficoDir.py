from collections import defaultdict

class Solution:
    def largestPathValue(self, colors: str, edges: List[List[int]]) -> int:
        def buildGraph(colors, edges):
            grafo = defaultdict(list)
            grauEntrada = [0] * len(colors)
            for u, v in edges:
                grafo[u].append(v)
                grauEntrada[v] += 1
            return grafo, grauEntrada
        
        def ordenacaoTopologica(grafo, grauEntrada):
            zeroGrauEntrada = [i for i in range(len(grauEntrada)) if grauEntrada[i] == 0]
            return zeroGrauEntrada
        
        def atualizarMatrizDP(no, cor, dp, grafo):
            dp[no][cor] += 1
            for vizinho in grafo[no]:
                for i in range(26):
                    dp[vizinho][i] = max(dp[vizinho][i], dp[no][i])
        
        n = len(colors)
        grafo, grauEntrada = buildGraph(colors, edges)
        dp = [[0] * 26 for _ in range(n)]
        resultado = 0
        visitados = 0
        
        zeroGrauEntrada = ordenacaoTopologica(grafo, grauEntrada)
        
        while zeroGrauEntrada:
            no = zeroGrauEntrada.pop()
            visitados += 1
            cor = ord(colors[no]) - ord('a')
            atualizarMatrizDP(no, cor, dp, grafo)
            resultado = max(resultado, dp[no][cor])
            for vizinho in grafo[no]:
                grauEntrada[vizinho] -= 1
                if grauEntrada[vizinho] == 0:
                    zeroGrauEntrada.append(vizinho)
        
        return resultado if visitados == n else -1
