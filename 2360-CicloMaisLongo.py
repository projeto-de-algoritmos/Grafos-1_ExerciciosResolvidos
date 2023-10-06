from typing import List

class Solution:
    def longestCycle(self, arestas: List[int]) -> int:
        n = len(arestas)
        visitado = [0 for i in range(n)]
        visitas = 0
        tamanho_maximo = -1
        
        for i in range(n):
            if visitado[i] == 1:
                continue

            ciclo = [i]

            while visitado[ciclo[-1]] != 1:
                visitado[ciclo[-1]] = 1
                ciclo.append(arestas[ciclo[-1]])
                visitas += 1
                if ciclo[-1] == -1:
                    break

            if ciclo[-1] == -1:
                continue

            fim = ciclo[-1]
            m = len(ciclo)

            for i in ciclo:
                m -= 1
                if i == fim:
                    if m == 0:
                        break
                    tamanho_maximo = max(tamanho_maximo, m)
                    break

        return tamanho_maximo
