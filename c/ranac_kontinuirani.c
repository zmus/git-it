#include <stdio.h>
#include <stdlib.h>
#define N 3	// broj predmeta

float	w[N] = {2,3,4},	// tezine predmeta
		p[N] = {1,7,8},	// vrijednosti predmeta
		x[N];			// x_i = dio i-tog predemta koji se stavlja u ranac

void cont_knapsack(int n, float c) {
	float cu;
	int i;

	for (i = 1; i <= n; i++) x[i] = 0.0;
	cu = c;
	for (i = 1; i <= n; i++) {
		if (w[i] > cu) {
			x[i] = cu / w[i];
			return;
		}
		x[i] = 1.0;
		cu -= w[i];
	}
	return ;
}

int main() {
	int i; 
	float max = 0;
	cont_knapsack(3, 6);
	for (i = 0; i < 3; i++) {
		max += x[i] * w[i];
		printf("%f", x[i]);
	}
	printf("\n%f", max);
}