/* -----------------------------------------------------------------------
                VREMENSKA SLOŽENOST SORTIRANJA IZBOROM      Luka Radiček
--------------------------------------------------------------------------	
Generirajte N = 10000 slučajnih prirodnih brojeva i upišite ih u polje A.
Napravite funkciju koja će učitati to polje i sortirati ga.
Izračunajte kolika je "a priori vremenska složenost" vašeg "algoritma za sortiranje"?
Izračunajte "a posteriori složenost" za nekoliko različitih N (barem 5) i 
nacrtajte graf ovisnosti a posteriori složenosti o N. 
*/


#include <stdio.h>
#include <stdlib.h>	// rand(), srand(), malloc()
#include <time.h>	// time(), clock(), clock_t, CLOCKS_PER_SEC

// puni polje veličine N slučajnim prirodnim brojevima
void populate(int A[], int N) {    
	int i;
	for (i = 0; i < N; i++) {
		A[i] = rand();
	}
}

// sortiranje izborom
void sortSelection(int A[], int N) {    
    int i, 
        j, 
        min,  // indeks najmanjeg elementa 
        temp;
 	// smanjuje listu za 'i'
	for (i = 0; i < N; i++) {            // O(n)
		min = i;                           // O(1) 
		// traži najmanji element podliste...                        
		for (j = i; j < N; j++) {          // O(n)
			if (A[j] < A[min]) min = j;      // O(1)
		}
		// ...koji mijenja mjesto s prvim 
		temp = A[i];                       // O(1)
		A[i] = A[min];                     // O(1)
		A[min] = temp;                     // O(1)
	}
}
/* 
Vrijeme izvođenja svih operacija unutar petlji je ograničeno nekom konstantom, 
pa je A PRIORI VREMENSKA SLOŽENOST algoritma O(n*n) = O(n^2) .
*/

int main() {
	int i, 
		j,    
		c,	// menu choice   
		A[10000];

	srand(time(NULL));  // srand( seconds since January 1, 1970 )

	while (1) {

		printf( "\n\n 1 Napuni polje A slucajnim brojevima"
				"\n\n 2 Sortiraj polje A"
				"\n\n 3 Ispisi polje A"
				"\n\n 4 A posteriori slozenost"
				"\n\n 5 izlaz\n\n");
		scanf("%d", &c);

		switch(c) {
		case 1:
			populate(A, 10000);	
			break;
		case 2:
			sortSelection(A, 10000);
			break;
		case 3:
			for (j = 0; j < 10000; j++) {
				printf("%d\n", A[j]);
			}
			break;
		case 4: 
			{ // block scope for variable declarations inside switch case
				int B[25000],
					N[]={3000, 6000, 9000, 12000, 15000, 18000, 21000, 24000};
				float tms[8];
				clock_t t1, t2;

				for (i = 0; i < 8; i++) {
					populate(B, N[i]);

					t1 = clock();
						sortSelection(B, N[i]);
					t2 = clock();
					
					tms[i] = 1000 * (t2 - t1) / CLOCKS_PER_SEC;
					printf("\nN = %d : %dms\n", N[i], (int)tms[i]);
				}

				/* Graph */
                int height = (int)tms[7],
                    step = height / 25,
                    n = 7;
				printf("\n%*s ^\n", 5, "ms");				
				for (i = 29; i > 0; i--) {
					if (i*step - tms[n] < step) {
						printf("%*d |%*c\n", 5, (int)tms[n], (n+1)*7, 'x');
						n--;
					} else {
						printf("%*c\n", 7, '|');	
					}
					height -= step;
				}
				printf("%*c------|------|------|------|------|------|------|------|----> N\n", 7, '-');
				printf("\n%*d%*d%*d%*d%*d%*d%*d%*d\n",16,N[0],7,N[1],7,N[2],7,N[3],7,N[4],7,N[5],7,N[6],7,N[7]);
			}
			break;			
		case 5: 
			return 0;
		}
	}
}


