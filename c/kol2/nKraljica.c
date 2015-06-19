/* na šahovsku ploču veličine n x n polja treba postaviti n kraljica
tako da se međusobno ne napadaju */

#include <stdio.h>
#include <stdlib.h>
#define MAXLEN 5

int x[MAXLEN];  // x[0] se ne koristi

int place(int k) {
// provjerava može li se k-ta kraljica staviti u k-ti redak i x[k]-ti
// stupac tako da je već postavljenih k-1 kraljica ne napada
	int i;
	for (i = 1; i < k; i++) 
		if ((x[i] == x[k]) || (abs(x[i] - x[k]) == abs(i - k))) return 0;
	return 1;
}

void queens(int n) {
// ispisuje sva rješenja problema
	int k = 1,  // trenutni redak
		ind;
	x[1] = 0;   // x[k] = trenutni stupac 

	while (k > 0) {  // ponavlja za sve retke (kraljice)
		x[k]++;
		while ((x[k] <= n) && (place(k) == 0)) x[k]++;  // traži stupac
		if (x[k] <= n)  // nađen stupac
			if (k == n) {  // nađeno potpuno rješenje
				for (ind = 1; ind <= MAXLEN; ind++)
					printf("x[%d] = %d\n", ind, x[ind]);
				printf("\n");
			} else {  // traži sljedeći redak (kraljicu)
				k++;
				x[k] = 0;
			}
		else k--;  // vraća prethodi redak
	}
}

int main() {
	queens(5);
	return 0;
}


