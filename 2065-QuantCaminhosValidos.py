from typing import List

class Solution:
    def maximalPathQuality(self, valores: List[int], arestas: List[List[int]], maxTempo: int) -> int:
        n = len(valores)
        res = valores[0]
        grafo = [[] for _ in range(n)]

        for u, v, tempo in arestas:
            grafo[u].append((v, tempo))
            grafo[v].append((u, tempo))

        visitado = [0] * n

        def dfs(no, pontuacao, tempo):
            if tempo > maxTempo:
                return

            if visitado[no] == 0:
                pontuacao += valores[no]

            visitado[no] += 1

            if no == 0:
                nonlocal res
                res = max(res, pontuacao)

            for vizinho, tempo_vizinho in grafo[no]:
                novo_tempo = tempo + tempo_vizinho
                dfs(vizinho, pontuacao, novo_tempo)

            visitado[no] -= 1

        dfs(0, 0, 0)
        return res
