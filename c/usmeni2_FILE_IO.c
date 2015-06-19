/* Učitajte niz brojeva iz datoteke i vratite ga natrag sortiranog */

#include <stdio.h>
#include <stdlib.h>

void bubbleSort(int A[], int N) {
// sortira polje od N elemenata
	int i,
		k = 0,
		temp,
		s = 1; // swapped ?
 
	while (s) {
		s = 0;
		k++;
		for (i = 0; i < N - k; i++) {						
			if (A[i] > A[i + 1]) {  
				temp = A[i];
				A[i] = A[i + 1];
				A[i + 1] = temp;
				s = 1;
			}		
		}
	}
}

int main() {
	int A[10],
		i,
		x = 0;	

	// FILE *fopen( const char * filename, const char * mode );
	FILE* fp;  // pointer to abstract data type FILE

	A[2] = 3;

	fp = fopen("usmeni3.txt", "w");
	// generiraj datoteku s random brojevima
	for (i = 0; i < 10; i++) {
		fprintf(fp, "%d ", rand());
	}
	fclose(fp);
	
	fp = fopen("usmeni3.txt", "r");
	for (i = 0; i < 10; i++) { 
		fscanf(fp, "%d ", &x);
		A[i] = x;
		printf("\n%d", A[i]);
	}
	// učitaj brojeve iz datoteke u polje A
	/*
	for (i = 0; fscanf(fp, "%d\n", &A[i]); i++) 
		printf("\n%d", A[i]);
	/*	
	bubbleSort(A, n);
	for (i=0; i<n; i++) printf("%d", A[i]);
	*/
	return 0;

}

/* FILE *fp;
fp  = fopen("c:\\documents\file.txt", "w");
fprintf(fp, "%c", "tekst");
fscanf(
fclose(fp);
*/