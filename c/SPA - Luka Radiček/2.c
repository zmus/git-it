/* -----------------------------------------------------------------------
                                     Luka Radiček
--------------------------------------------------------------------------
*/

#include <stdio.h>
#include <stdlib.h>
#include <time.h>

typedef long int big;

void sortBubble(big A[], big n) {
	big i,
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

void genRandom(big A[], big n) {
	big i;
	for (i = 0; i < n; i++) {
		A[i] = (rand()%1000) * (rand()%1000);
	}
}

int main() {
	big i,
		n = 100000,
		A[100000];

	srand(time(NULL));

	genRandom(A, n);
	sortBubble(A, n);

	for (i = 99000; i < 100000; i++) printf("\n%d", A[i]);

	return 0;
}