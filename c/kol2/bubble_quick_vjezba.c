#include <stdio.h>
#include <stdlib.h>
#include <time.h>

void bubbleSort(int A[], int n) {
	int i,
		j = 0,
		s = 1, // flag
		temp;

	while (s == 1) {
		s = 0;
		for (i = 1; i < n - j; i++) {
			if (A[i - 1] > A[i]) {
				temp = A[i];
				A[i] = A[i - 1];
				A[i - 1] = temp;
				s = 1;
			}
		}
		j++;
	}
}

long partition(long A[], long min, long max) {
	long l = min + 1,
		 r = max,
		 temp;

	while (l <= r) {
		while (A[l] <= A[min] && l <= max) l++;
		while (A[r] >= A[min] && r > min) r--;
		if (l < r) {
			temp = A[l];
			A[l] = A[r];
			A[r] = temp;
		}
	}

	// pivot je najveći u polju
	if (r == max) {  
		temp = A[min];
		A[min] = A[max];
		A[max] = temp;
		return max;
	// pivot je najmanji u polju
	} else if (r == min) { // *** pazi na == ***
		return min;
	} else {
	// pivot je negdje u sredini
		temp = A[r];
		A[r] = A[min];
		A[min] = temp;
		return r;
	}
}

void quickSort(long A[], long min, long max) {
	long p;  // indeks pivota
	if (min < max) {
		p = partition(A, min, max);
		quickSort(A, min, p - 1);
		quickSort(A, p + 1, max);
	}
}


int main() {
	long i,
		 n;
	long	k,
	    A[35000];
	clock_t t1,
			t2;
	float tms;

	srand(time(NULL));

	for (k = 1; k < 6; k++) {
		n = k * 7000;
		for (i = 0; i < n; i++) {
			A[i] = n - i;
		}
		t1 = clock();
			quickSort(A, 0, n - 1);
		t2 = clock();
		tms = 1000*(t2 - t1)/CLOCKS_PER_SEC;
		printf("\nN = %d t = %dms", n, (int)tms);
	}

	return 0;
}