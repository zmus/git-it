#include <stdio.h>
#include <stdlib.h>
#include <time.h>

void BubbleSort(int A[], int N) {
	int i, j, temp;
	for (i = 0; i < N; i++) {
		for (j = 0; j < N - i; j++) {	
			if (A[j] > A[j+1]) {
				temp = A[j];
				A[j] = A[j+1];
				A[j+1] = temp;
			}
		}	
	}
}

void spoji(int B[], int min, int mid, int max, int N) {  // Spoji mora biti PRIJE SortMerge !!!  (jedino ako deklariramo sve funkcije na početku)
	int *T = (int*)malloc(N * sizeof(int)),              // PAZI! Arrays decay to pointers in function calls. 
	    i,                                               // It's not possible to compute the size of an array which is only represented as a pointer in any way, including using sizeof.
	    j = min,                                         // Zato veličinu polja ne možemo izračunati iz B, nego je moramo poslati iz main-a preko N
	    k, 
	    m = mid + 1;	                                     
                                                         
	for (i = min; j <= mid && m <= max; i++) {
		if (B[j] <= B[m]) {
			T[i] = B[j];
			j++;
		} else {
			T[i] = B[m];
			m++;
		}
	}

	if (j > mid) {
		for (k = m; k <= max; k++) {
			T[i] = B[k];
			i++;
		}
	} else {
		for (k = j; k <= mid; k++) {
			T[i] = B[k];
			i++;
		}
	}

	for (k = min; k <= max; k++) {
		B[k] = T[k];
	}

	free(T);
}

void MergeSort(int B[], int min, int max, int N) {  // od 0 do N-1 //     ovo vjerojatno nece bit na testu, nego nesto jednostavnije
	int mid;
	if(min < max) {
		mid = (min + max) / 2;		// Quicksort je brža verzija Merge-a
		MergeSort(B, min, mid, N);     // sort(B, min, pivot - 1)
		MergeSort(B, mid+1, max, N);   // sort(B, pivot + 1, max)
		spoji(B, min, mid, max, N);
	}
}


int main() {
	int i, j, length;
	int A[20];
	
	srand(time(NULL));

	for ( i = 0; i<20; i++) A[i] = rand();

	length = sizeof A / sizeof A[0];  // () kod sizeof treba samo kad je tip: int, char... (casting), jer sizeof nije funkcija

	MergeSort(A, 0, 19, length);  // od 0 do N-1

	for (i = 0; i<20; i++) printf("%d\n", A[i]);

/* a posteriori */
	int B[25000],
		N[]={5000,10000,15000,20000,25000};
	float tms[5];
	clock_t t1, t2;

	for (i = 0; i < 5; i++) {
		for(j = 0; j < N[i]; j++) {
			B[j] = rand();
		}
		
		t1 = clock();
			BubbleSort(B, N[i]);
		t2 = clock();
				
		tms[i] = 1000 * (t2 - t1) / CLOCKS_PER_SEC;
		printf("\nVrijeme sortiranja za N = %d : %fms\n", N[i], tms[i]);
	}

/* Graph */
	int height = (int)tms[4];
	int step = height / 25;
	int n = 4;
	printf("\n%*s ^\n", 5, "ms");
	for (i = 29; i > 0; i--) {
		if ((i*step)-tms[n] < step) {
			printf("%*d |%*c\n", 5, (int)tms[n], (n+1)*10, 'x');
			n--;
		}
		else printf("%*c\n", 7, '|');	
		height -= step;
	}
	printf("%*c---------|---------|---------|---------|---------|----> N\n", 7, '-');
	printf("\n%*d%*d%*d%*d%*d\n",19,N[0],10,N[1],10,N[2],10,N[3],10,N[4]);

	return 0;
}
