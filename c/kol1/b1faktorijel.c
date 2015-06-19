/* -----------------------------------------------------------------------
                               FAKTORIJEL                  Luka Radiček
--------------------------------------------------------------------------	
Riješite rekurzivnu jednadžbu a_n = n a_(n-1) pri čemu je a_0 = 1.
Napišite program koji računa a_n pomoću rekurzivne funkcije.
Program učitava a_0, te broj članova niza koji će se ispisati N. 
*/

#include <stdio.h>

unsigned long long fact(int n) {  // max = 2^64	
	return (n == 0) ? 1 : n * fact(n - 1);
}

int main() {
	int n;

	do {
		printf("\n | 0 <= n <= 20 |    n = ");
		scanf("%d", &n);	
	} while (n < 0 || n > 20);

	printf("\n %d! = %llu\n", n, fact(n));

	return 0;
}


