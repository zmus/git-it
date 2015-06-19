/* -----------------------------------------------------------------------
                           REKURZIJA (red potencija)       Luka Radiček
--------------------------------------------------------------------------
Riješite rekurzivnu jednadžbu a_n = 4a_(n-1) - 3a_(n-2), 
pri čemu je a_0 = 0 i a_1 = 1. 
Napišite program koji računa a_n: (1) pomoću rekurzivne funkcije
                                  (2) pomoću analitičkog rješenja
Program učitava a_0, a_1, te broj članova niza N.
*/

#include <stdio.h>
#include <math.h>	// pow() 

unsigned long long rec(int n) {  // max = 2^64
	if (n == 0) return 0;
	return (n == 1) ? 1 : 4 * rec(n - 1) - 3 * rec(n - 2); 
}

double ana(int n) {
	if (n == 0) return 0;
	if (n == 1) return 1;
	int i; 
	double sum = 0;
	for (i = 0; i < n; i++) {
		sum += pow(3, i);
	}
	return sum;
}

/* 
Za n > 34 rezultati će se razlikovati. rec() daje točan iznos. 

ana() može računati puno veće članove, ali 'double' kojeg vraća
pow() je precizan do određenog broja znamenki. 
(mantisa = 52bit - dakle 16 znamenki)

Da bismo precizno izračunali rekurziju za n > 41 moramo koristiti 
biblioteku (npr. GMP) koja omogućuje cjelobrojne tipove veće od 64bit. 
Ili napisati svoju... :)
*/

int main() {
	int n;

	do {
		printf("\n | 0 <= n <= 41 |    n = ");
		scanf("%d", &n);
	} while (n < 0 || n > 41); 

	printf("\n analiticko rjesenje: %lf\n", ana(n));  
	printf("\n rjesenje pomocu rekurzivne funkcije: %llu\n", rec(n));

	return 0;
}