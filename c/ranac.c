#include <stdio.h>
#include <stdlib.h>
#define D1 3	// broj predmeta
#define D2 6	// kapacitet

float M[D1][D2];
int	w[D1] = {2,3,4};	// tezine 
float p[D1] = {1,7,8};	// vrijednosti

float zero_one_knapsack(int n, int c) {
	int i, j;
	for (i = 0; i <= n; i++) M[i][0] = 0.0;
	for (j = 0; j <= c; j++) M[0][j] = 0.0;

	for (i = 1; i <= n; i++) {
		for (j = 1; j <= c; j++) {
			M[i][j] = M[i - 1][j];
			if (j >= w[i]) {
				if ((M[i - 1][j - w[i]] + p[i]) > M[i - 1][j]) {
					M[i][j] = M[i - 1][j - w[i]] + p[i];
				}
			} 
		}
	}
	return M[n][c];
}

int main() {
	printf("%lf", zero_one_knapsack(D1, D2));
	return 0;
}