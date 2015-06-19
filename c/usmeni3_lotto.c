#include <stdio.h>
#include <stdlib.h> 
#include <time.h>
#define godina 52

void kombinacija(int B[]) {
	int i, j;
	for (i = 0; i < 7; i++) {
		B[i] = (rand() % 39) + 1;  // !!! bez nule !!!
		for (j = 0; j < i; j++) {
			if (B[i] == B[j]) {
				i--;
				break;
			}
		}
	}
}

void sortBubble(int A[], int n) {
	int i, 
		k = 0,
		f = 1, 
		temp;

	while (f) {
		f = 0;
		k++;
		for (i = 0; i < n - k; i++) {  // !!! i < n - k !!!
			if (A[i] > A[i + 1]) {
				temp = A[i];
				A[i] = A[i + 1];
				A[i + 1] = temp;
				f = 1;
			}
		}
	}
}

int sortiranaPoljaSuRazlicita(int A[], int B[], int n) {
	int i;
	for (i = 0; i < n; i++)
		if (A[i] != B[i]) return 1;
	return 0;
}

int main() {
	int A[7], B[7], i, j, tjedan = 0;

	srand(time(NULL));

	printf("\nunesi 7 brojeva od 1 do 39:\n");
	for (i = 0; i < 7; i++) {
		scanf("%d", &A[i]);
		for (j = 0; j < i; j++) {
			if (A[i] == A[j]) {
				printf("brojevi moraju biti razliciti!\n");
				i--;
			}
		}
	}

	sortBubble(A, 7);
	
	do {
		tjedan++;
		kombinacija(B);
		sortBubble(B, 7);
	} while (sortiranaPoljaSuRazlicita(A, B, 7));

	for (i = 0; i < 7; i++) {
		printf("\n%d%*d", A[i], 3, B[i]);
	}
	printf("\n%d godina\n", tjedan / godina);

	return 0;

	
}
