/* -----------------------------------------------------------------------
                                    Luka Radiček
--------------------------------------------------------------------------
*/

#include <stdio.h>
#include <stdlib.h>
#include <time.h>

// nizovi pocinju od 1 

int rekFib(int n) {
	if (n <= 1) {
		return 1;
	} else {
		return rekFib(n - 1) + rekFib(n - 2);
	}
}

int dinFib(int n) {
	int k, f, f1, f2;
	if (n < 2) {
		return 1;
	} else {
		f1 = f2 = 1;
		for (k = 2; k <= n; k++) {
			f = f1 + f2;
			f2 = f1;
			f1 = f;
		}
	}
	return f;
}


int main() {
	int i;
	time_t t1, t2;
	float tmsRek[6], tmsDin[6];

	printf("\n%*s%*s%*s", 7, "indeks", 13, "rekurzivno", 13, "dinamicki");

	for (i = 0; i < 6; i++) { 
		int N = (i + 1) * 7;

		t1 = clock();
			rekFib(N);
		t2 = clock();
		tmsRek[i] = 1000 * (t2 - t1) / CLOCKS_PER_SEC;
		t1 = clock();
			dinFib(N);
		t2 = clock();
		tmsDin[i] = 1000 * (t2 - t1) / CLOCKS_PER_SEC;

		printf("\n%*d%*dms%*dms", 7, N, 10, (int)tmsRek[i], 10, (int)tmsDin[i]);
	}

	printf("\n\nVidimo da rekurzivni algoritam naglo raste nakon odredjenog N.\nTo se slaze s a priori slozenosti koje je eksponencijalna O(1.618^n).\n");

	return 0;
}