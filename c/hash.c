#include <stdio.h>
#include <stdlib.h>

int B = 10;

int h(char x[]) {
	int i, sum = 0;
	for (i = 0; i < 10; i++) sum += x[i];
	return sum % B;
}

int main() {
	char x[] = "0001111111";
	printf("%d", h(x));
}

// ovako nesto moze doci na kolokviju

// 1DZ  OTVORENA RASUTA TABLICA

// 2DZ  napravit bilo kakav suvisao primjer s POKAZIVACEM NA POKAZIVAC - 
// 		= MORA BIT ISKORISTENO   **a, *a i a   kao argument funkcija
//		najjednostavnije je da su elementi tip int
//		prvo napravi ovaj, jer treba za 1DZ

// Napravi implementaciju binarnog stabla - ubacujete i micete elemente