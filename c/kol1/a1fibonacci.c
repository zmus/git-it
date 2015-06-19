/* -----------------------------------------------------------------------
                                FIBONACCI                  Luka Radiček
--------------------------------------------------------------------------
Riješite rekurzivnu jednadžbu a_n = a_(n+1) - a_(n-1),
pri čemu je a_0 = 1 i a_1 = 1.
Napišite program koji računa a_n: (1) pomoću rekurzivne funkcije
                                  (2) pomoću analitičkog rješenja
Program učitava a_0 i a_1, te broj članova niza N. 
*/

#include <stdio.h>
#include <math.h>	// sqrt(), pow()

int recFib(int n) {	
	return (n <= 1) ? 1 : recFib(n-1) + recFib(n-2);
}

int anaFib(int n) {
	double a = sqrt(5);
	return (pow((1 + a) / 2, n + 1) - pow((1 - a) / 2, n + 1)) / a;
	// umjesto n koristimo n+1, jer je formula za niz od 0, a ne od 1
}

int main() {
	int n;

	do {
		printf("\n | 0 <= n <= 45 |    n = ");
		scanf("%d", &n);
	}
	while (n < 0 || n > 45);  // vrijedi ako je sizeof(int) = 4

	printf("\n analiticko rjesenje: %d\n", anaFib(n));  
	printf("\n rjesenje pomocu rekurzivne funkcije: %d\n", recFib(n));

	return 0;
}



