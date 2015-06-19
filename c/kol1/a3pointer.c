/* -----------------------------------------------------------------------
                          POKAZIVAČ NA POKAZIVAČ           Luka Radiček
--------------------------------------------------------------------------
*/

#include <stdio.h>

void point(char** d, char* address) { 
	*d = address;
}

int main() {
/* -----------------------------------------------------------------------
primjer 1: promjena vrijednosti pointera A u funkciji  
------------------------------------------------------------------------*/
    char a[] = "\npointer C pokazuje na a\n",
         b[] = "\npointer C pokazuje na b\n";
    char* C = a;  // a == &a[0] , tj. 'a' je pointer na polje znakova

	printf("%s", C); 
	point(&C, b);
	printf("%s", C);
/* -----------------------------------------------------------------------
primjer 2: dinamičko 2D polje 
------------------------------------------------------------------------*/
	int i, j, k, l;
	int** A;

	printf("\ni = ");
	scanf("%d", &i);
	printf("j = ");
	scanf("%d", &j);

	// A je polje pointera na potpolja
	A = (int**)malloc(i * sizeof(*A));
	// svako potpolje ima svoju adresu, pa ne možemo koristiti samo 1 malloc()
	for (k = 0; k < i; k++) {
		A[k] = (int*)malloc(j * sizeof(**A));
	}
	
	// generira tablicu množenja :)
	for(k = 0; k < i; k++) {
		for(l = 0; l < j; l++) {
			A[k][l] = (k+1) * (l+1);
		}
	}

	for(k = 0; k < i; k++) {
		putchar('\n');
		for(l = 0; l < j; l++) {
			printf("%*d", 4, A[k][l]);
		}
	}

	// memoriju oslobađamo obrnutim redosljedom od alokacije
	for (k = 0; k < i; k++) {
		free(A[k]);
	}
	free(A);

	return 0;
}
