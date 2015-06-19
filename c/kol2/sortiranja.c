/* Luka Radicek */

#include <stdio.h>
#include <stdlib.h>  // rand(), srand(), malloc()
#include <time.h>    // time(), clock(), clock_t, CLOCKS_PER_SEC

void swap(int *a, int *b) {
	int temp = *a;
	*a = *b;
	*b = temp;
}

void copy(int a[], int b[], int min, int max) {  
// kopira elemente iz a[] u b[] od a[min] do a[max]
	int i;
	for (i = min; i <= max; i++) {
		b[i] = a[i];
	}
}

/*----------------------------------------------------------------------
                              SORTIRANJA
----------------------------------------------------------------------*/

int partition(int A[], int min, int max) {  
// Razvrstava polje A na dvije particije: <= pivot i >= pivot. 
// Zatim stavlja pivot između particija i vraća njegov indeks.
// pivot = A[min]

    int l = min + 1,  // lijeva kazaljka 
        r = max;      // desna  kazaljka       

	//  ispisuje podliste ako se makne 'comment':
		//	int i; for (i = min; i <= max; i++) printf(" %d", A[i]);
		//	printf("\n");

	// sve dok se kazaljke ne 'prekriže':
	while (l <= r) {   
		// pomiči lijevu dok ne naiđe na element veći od pivota
		while (A[l] <= A[min] && l <= max) {  // 'l = max' se dogodi ako je pivot najveći
			l++;
		}
		// pomiči desnu          -//-            manji od pivota				
		while (A[r] >= A[min] && r > min) {   // 'r >= min + 1' jer je 'min' pivot    
			r--;
		} 
		// ako kazaljke nisu prekrižene zamijeni elemente
		if (l < r) {
			swap(A + l, A + r);
		}
	}	

	// case 1: pivot je najveći u polju -> zamijeni pivot i zadnji
	if (l > max) {  // može i 'l == max + 1'
		swap(A + min, A + max);
		return max;

	// case 2: pivot je najmanji u polju    
	} else if (r == min) { 
		return min;         

	// case 3: pivot je negdje u sredini -> zamijeni pivot i najdesniji manji od pivota 
	} else {
		swap(A + min, A + r);
		return r;
	}
}

void quickSort(int A[], int min, int max) {  
// sortira segment polja od A[min] do A[max] 

	int p;  // indeks pivota nakon partition()
	
	if (min < max) {  // osnovni slučaj: '=' segment ima samo jedan element ili '>' segment ne postoji
		p = partition(A, min, max);
		quickSort(A, min, p - 1);  
		quickSort(A, p + 1, max);  
	}
}
  
void bubbleSort(int A[], int N) {
// sortira polje od N elemenata
	int i,
		k = 0,
		s = 1; // swapped ?
 
	while (s) {
		s = 0;
		k++;
		for (i = 0; i < N - k; i++) {						
			if (A[i] > A[i + 1]) {  
				swap(A + i, A + i + 1);
				s = 1;
			}		
		}
	}
}

/*----------------------------------------------------------------------
                           GENERATORI POLJA 
----------------------------------------------------------------------*/

void genSorted(int A[], int n) {  
// uzlazno sortirano 
	int i;
	for (i = 0; i < n; i++) {
		A[i] = i;
	}
}

void genReversed(int A[], int n) {  
// silazno sortirano 
	int i;
	for (i = 1; i <= n; i++) {
		A[n - i] = i;
	}
}

void genNearlySorted(int A[], int n) {  
// skoro sortirano 
	int i;
	A[0] = 0;
	A[1] = 1;
	for (i = 2; i < n; i++) {
		A[i] = i;
		if (rand() % 2) {
			swap(A + i, A + i - (rand() % 3));
		}
	}
}

void genRandom(int A[], int n) {  
// random - vrijednosti se ne ponavljaju
	int i;
	genSorted(A, n);
	// Fischer-Yates-Durstenfeld shuffle 
	for (i = 0; i < n; i++) {
		swap(A + n - 1 - i, A + rand() % (n - i));
	} 
}

void genFewUnique(int A[], int n, int x) {  // x = broj različitih vrijednosti 
// random - vrijednosti se ponavljaju
	int i,
		step = n / x;
	for (i = 0; i < n; i++) {
		A[i] = step * ( 1 + rand() % x );
	}
}

/*----------------------------------------------------------------------
                                GRAF 
----------------------------------------------------------------------*/

void plot(float tms[], int N[], int s) {  
// tms = vremena, N = slučajevi, s = broj slučajeva

	int height = (int)tms[s-1],
	    step,
	    scale = 1,
	    n = s-1,
	    i;
	
	if (height < 25) { 
		step = 1;
		scale = 25 / height;
	} else  {
		step = height / 25;
	}

	printf("\n%*s ^\n", 5, "ms");
	for (i = 29; i > 0; i--) {
		if (i*step - scale*tms[n] < step) {
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

/*----------------------------------------------------------------------
                            A POSTERIORI 
----------------------------------------------------------------------*/

void aposteriori(int **Q, int **B, int C[], int s) {  
// Q[][] = polje od s potpolja duljine C[s]
    int i, 
        j, 
        fQ = 0, 
        fB = 0;
    float *tmsQ,
          *tmsB;
    clock_t t1, 
            t2;
	tmsQ = (float *) malloc (s * sizeof (float));
	tmsB = (float *) malloc (s * sizeof (float));

	for (i = 0; i < s; i++) {
		if (s > 1) printf("\nN = %d", C[i]);
		//---------------------------------------------------------------
		//  1. ALGORITAM
		//---------------------------------------------------------------
		t1 = clock();
				quickSort(Q[i], 0, C[i] - 1);
		t2 = clock();	
		tmsQ[i] = 1000 * (t2 - t1) / CLOCKS_PER_SEC;
		printf("\n%*cuick: %*dms\n", 11, 'q', 6, (int)tmsQ[i]);	
		//---------------------------------------------------------------
		//  2. ALGORITAM
		//--------------------------------------------------------------- 		
		t1 = clock();
			bubbleSort(B[i], C[i]);
		t2 = clock();	
		tmsB[i] = 1000 * (t2 - t1) / CLOCKS_PER_SEC;
		printf("%*cubble: %*dms", 11, 'b', 5, (int)tmsB[i]);
		//---------------------------------------------------------------	
	}

	// iscrtaj grafove ako imamo > 1 slučaja && > s-2 različitih vremena
	if (s > 1) {
		for (i = 0; i < s; i++) {
			for (j = i + 1; j < s; j++) {
				if (tmsQ[i] == tmsQ[j]) fQ++; 
				if (tmsB[i] == tmsB[j]) fB++; 
			}
		}
		if (fQ < 3) {
			printf("\n\n\n-----------------------------  quick  ---------------------------------\n\n");
			plot(tmsQ, C, s);
		}
		if (fB < 3) {
			printf(  "\n\n-----------------------------  bubble  --------------------------------\n\n");
			plot(tmsB, C, s);
			printf(  "\n\n-----------------------------------------------------------------------\n\n");
		}
	}
	free(tmsQ); 
	free(tmsB);
}



int main() {

//------------------------------------------------------------------------------------ 
//  A POSTERIORI SLUČAJEVI - slobodno se mijenjaju (apscisa grafa je namještena za 8)
//------------------------------------------------------------------------------------ 
    int	C[] = {3000, 6000, 9000, 12000, 15000, 18000, 21000, 24000}; 
//------------------------------------------------------------------------------------
    int i,
    	**Q,  // quickSort set
        **B,  // bubbleSort set
        s = sizeof C / sizeof (int);  // broj a posteriori slučajeva

	Q = (int **) malloc (s * sizeof(*Q));
	B = (int **) malloc (s * sizeof(*Q));

	for (i = 0; i < s; i++) {
		Q[i] = (int *) malloc (C[i] * sizeof(**Q));
		B[i] = (int *) malloc (C[i] * sizeof(**Q));
	}

	srand(time(NULL));

while (1) {

    int c;        // menu choice 			

    printf( "\n\n\n 1 Usporedba sortiranja razlicitih polja duljine n\n"
    		"\n A posteriori analiza quickSort vs bubbleSort za:\n"
              "\n   2 uzlazno sortirano polje"
              "\n   3 silazno sortirano polje"
              "\n   4 skoro sortirano polje"
              "\n   5 random polje - brojevi se ne ponavljaju"
              "\n   6 random polje - brojevi se ponavljaju"        
              "\n\n 7 Izlaz\n\n");
	scanf("%d", &c);

	switch(c) {
	case 2:
		printf("\n\n-----------------------------------------------------------------------\n"
                   "                        uzlazno sortirano polje                        \n"
                   "-----------------------------------------------------------------------\n");                   
		for (i = 0; i < s; i++) { 
			genSorted(Q[i], C[i]); 				
			copy(Q[i], B[i], 0, C[i]);
		}
		aposteriori(Q, B, C, s);
		printf("\n\n-----------------------------------------------------------------------\n"
                   "\nTeorijsko ocekivanje za:" 
                   "\n\nQuick = O(n^2) - iz grafa vidimo da je za dvostruki 'n' vrijeme \nizvodjenja 4x dulje"
                   "\n\nBubble = O(1) - samo jedan prolazak kroz petlju  \n\n"
                   "-----------------------------------------------------------------------\n");  		
		break;
	case 3:
		printf("\n\n-----------------------------------------------------------------------\n"
                   "                        silazno sortirano polje                        \n"
                   "-----------------------------------------------------------------------\n");	
		for (i = 0; i < s; i++) { 
			genReversed(Q[i], C[i]); 				
			copy(Q[i], B[i], 0, C[i]);
		}
		aposteriori(Q, B, C, s);
		printf("\n\n-----------------------------------------------------------------------\n"
                   "\nTeorijsko ocekivanje za:" 
                   "\n\nQuick = O(n^2) - uz uzlazno sortirano polje, najgori slucaj"
                   "\n\nBubble = O(n^2) - najgori slucaj - u svakom koraku imamo usporedbu i zamjenu\n\n"
                   "-----------------------------------------------------------------------\n");  		
		break;
	case 4:
		printf("\n\n-----------------------------------------------------------------------\n"
                   "                         skoro sortirano polje                         \n"
                   "-----------------------------------------------------------------------\n");
		for (i = 0; i < s; i++) { 
			genNearlySorted(Q[i], C[i]); 				
			copy(Q[i], B[i], 0, C[i]);
		}
		aposteriori(Q, B, C, s);
		printf("\n\n-----------------------------------------------------------------------\n"
                   "\n\nQuick je nesto brzi nego kod sortiranih polja. \nIz grafa vidimo da je ovisnost i dalje priblizno kvadratna."
                   "\n\nBubble bi u teoriji trebao biti malo sporiji nego kod uzlazno sort. polja."
                   "\nNa mom racunalu su sva vremena bila 0ms."
                   "\nMozemo povecati broj ponavljanja, ali nema smisla."
                   "\n\n-----------------------------------------------------------------------\n");  		
		break;			
	case 5:
		printf("\n\n-----------------------------------------------------------------------\n"
                   "                     random polje bez ponavljanja                      \n"
                   "-----------------------------------------------------------------------\n"); 
		for (i = 0; i < s; i++) { 
			genRandom(Q[i], C[i]); 				
			copy(Q[i], B[i], 0, C[i]);
		}
		aposteriori(Q, B, C, s);
		printf("\n\n-----------------------------------------------------------------------\n"
                   "\n\nQuick: trebao bi biti oko O(n*log n), u svakom slucaju puno brzi od Bubble"
                   "\n\nBubble: a posteriori smo dobili ovisnost O(n^2)\n\n"
                   "-----------------------------------------------------------------------\n");  		
		break;
	case 6:
		printf("\n\n-----------------------------------------------------------------------\n"
                   "                     random polje s ponavljanjem                       \n"
                   "-----------------------------------------------------------------------\n");
		for (i = 0; i < s; i++) { 
			genFewUnique(Q[i], C[i], 100); 				
			copy(Q[i], B[i], 0, C[i]);
		}
		aposteriori(Q, B, C, s);
		printf("\n\n-----------------------------------------------------------------------\n"
                   "\n\nQuick: trebao bi biti nesto sporiji nego random bez ponavljanja,\n" 
                   "ali i dalje je puno brzi nego kod sortiranih polja\n"
                   "\n\nBubble: a posteriori smo dobili ovisnost O(n^2)\n\n"                  
                   "-----------------------------------------------------------------------\n");  		
		break;	
	case 1:
		{
		int **F,  
			**G,
			N[1],    // ekvivalent C 
			v = 1,	 // ekvivalent s
        	n;       // unesi broj elemenata	
		printf("\n broj elemenata n = ");
		scanf("%d", &n);
		N[0] = n;
		F = (int **) malloc (sizeof(int *));
		G = (int **) malloc (sizeof(int *));		
		*F = (int *) malloc (n * sizeof(int));
		*G = (int *) malloc (n * sizeof(int));
// ======================================================================	
		printf("\n\n-----------------------------------------------------------------------\n"
                   "                        uzlazno sortirano polje                        \n"
                   "-----------------------------------------------------------------------\n"); 
		genSorted(F[0], n);
		genSorted(G[0], n);
		aposteriori(F, G, N, v);
		printf("\n\n-----------------------------------------------------------------------\n"
                   "                        silazno sortirano polje                        \n"
                   "-----------------------------------------------------------------------\n");
		genReversed(F[0], n);
		genReversed(G[0], n);
		aposteriori(F, G, N, v);
		printf("\n\n-----------------------------------------------------------------------\n"
                   "                         skoro sortirano polje                         \n"
                   "-----------------------------------------------------------------------\n");
		genNearlySorted(F[0], n);
		genNearlySorted(G[0], n);
		aposteriori(F, G, N, v);
		printf("\n\n-----------------------------------------------------------------------\n"
                   "                     random polje bez ponavljanja                      \n"
                   "-----------------------------------------------------------------------\n"); 
		genRandom(F[0], n);
		genRandom(G[0], n);
		aposteriori(F, G, N, v);
		printf("\n\n-----------------------------------------------------------------------\n"
                   "                     random polje s ponavljanjem                       \n"
                   "-----------------------------------------------------------------------\n");
		genFewUnique(F[0], n, 100);
		genFewUnique(G[0], n, 100);
		aposteriori(F, G, N, v);
		printf("\n\n-----------------------------------------------------------------------\n\n"
                   "Bubble je najbrzi za uzlazno sortirano polje, koje prelazi u jednom koraku \nbez zamjene elemenata. \nZatim za skoro sortirano, gdje zamjenjuje malen broj elemenata. \nZa silazno sortirano je najsporiji, jer treba obaviti maksimalnih 'n' zamjena."
                   "\n\nQuick je najsporiji za uzlazno i silazno sortirana polja. \nTada su pivoti najmanji, odnosno najveci elementi potpolja, \npa cemo imati maksimalnih 'n' rekurzija."
                   "\n\nJedino gdje se isplati Bubble su skoro sortirana polja.\nDrugdje je puno brzi Quick. Uz to se pametnijim izborom pivota \nmoze ubrzati za sortirana polja.\n\n"
                   "-----------------------------------------------------------------------\n");
		getchar();
		getchar();
// =====================================================================
		free(F[0]);
		free(G[0]);
		free(F);
		free(G);
		break;
		}
	case 7: 
		return 0;
	}
}

}


