/* Učitajte broj i ispišite ga obrnuto... 1372 -> 2731 */

#include <stdio.h>
#include <stdlib.h> // abs()

int main() {
	int n, znamenka;

	scanf("%d", &n);
	if (n == 0) printf("%d", 0);
	while (n != 0) {
		znamenka = n % 10;
		printf("%d", abs(znamenka));
		n /= 10;
	}
	return 0;
}


// KORISNO: ako u jednoj liniji želimo saznati duljinu od int, koristimo log