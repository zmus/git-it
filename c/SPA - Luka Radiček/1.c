/* -----------------------------------------------------------------------
                                     Luka Radiček
--------------------------------------------------------------------------
*/

#include <stdio.h>
#include <stdlib.h>
#include <time.h>

void sortBubble(int A[], int n) {
	int i,
		k = 0,
		f = 1,
		temp;

	while (f) {
		f = 0;
		k++;
		for (i = 0; i < n - k; i++) {
			if (A[i] > A[i + 1]) {
				f = 1;
				temp = A[i];
				A[i] = A[i + 1];
				A[i + 1] = temp;
			}
		}
	}
}

void genRandom(int A[], int n) {
	int i;
	for (i = 0; i < n; i++) {
		A[i] = rand();
	}
}

int main() {
	int i, A[30000];
	time_t t1, t2;
	float tms[6];

	srand(time(NULL));

	for (i = 1; i < 7; i++) { 
		int N = i * 5000;
		genRandom(A, N);
		t1 = clock();
			sortBubble(A, N);
		t2 = clock();
		tms[i - 1] = 1000 * (t2 - t1) / CLOCKS_PER_SEC;
		printf("\nN = %*d%*dms", 7, N, 10, (int)tms[i - 1]);
	}

	printf("\n\nNormirani ispis. Lijevo je faktor povecanja n, \na desno faktor povecanja vremena izvodjenja:\n");
	for (i = 0; i < 6; i++) {
		printf("\n%d %d", i + 1, (int)(tms[i] / tms[0]));
	}
	printf("\n\nVidimo da je ovisnost kvadratna, tj. za duplo veci N\nvrijeme izvodjenja je 4x dulje. \nA posteriori se slaze s a priori slozenoscu koja je O(n^2).\n");

	return 0;
}