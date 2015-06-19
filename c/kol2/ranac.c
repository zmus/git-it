#include <stdio.h>
#include <stdlib.h>

// DZ za 4 predmeta i tablicu ( u tablici i su predmeti, dakle i=4 ) + dovrsit ovaj
// sam odaberi vrijednosti... kapacitet 6, 9, kak oces
//1. s tablicom
//2. programski
//3. probaj pohlepni pristup i vidi jel ces dobit isto

// probaj optimalan izbor
#define D1 6
#define D2 6

float M[D1][D2];  // tablica Mij
int w[D1] = {0, 1, 2, 3, 4, 5};        // težine predmeta
float p[D1] = {0, 2, 4, 5, 1, 3};      // vrijednosti predmeta

float zeroOneKnapsack(int n, int c) {
// vraća maksimalnu vrijednost koja se može prenijeti u rancu kapaciteta c
// ako se ograničimo na prvih n predmeta 
	int i, j;

	for (i = 0; i <= n; i++) M[i][0] = 0.0;
	for (j = 0; j <= c; j++) M[0][j] = 0.0;
	for (i = 1; i <= n; i++) 
		for (j = 1; j <= c; j++) {
			M[i][j] = M[i-1][j];
			if (j >= w[i])
				if ((M[i-1][j-w[i]] + p[i]) > M[i-1][j])
					M[i][j] = M[i-1][j-w[i]] + p[i];
		}
	return M[n][c];
}

int main() {
	printf("%d", zeroOneKnapsack(8, 6));
	return 0;
}
