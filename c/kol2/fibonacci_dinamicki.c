#include <stdio.h>
#include <math.h>	// sqrt(), pow()
#include <time.h>

double rec(int n) {	
	return (n <= 1) ? 1 : rec(n-1) + rec(n-2);
}

double ana(int n) {
	double a = sqrt(5);
	return (pow((1 + a) / 2, n + 1) - pow((1 - a) / 2, n + 1)) / a;
	// umjesto n koristimo n+1, jer niz počinje od 0, a ne od 1
}

double dinam(int n) {
	int k;
	double f, f1, f2;
	if (n < 2) {
		return 1;
	} else {
		f1 = f2 = 1;
		for (k = 2; k < n; k++) {
			f = f1 + f2;
			f2 = f1;
			f1 = f;
		}
	}
	return f;
}

int main() {
	int n;
	clock_t t1, t2;
	float tms;

	printf("\nn = ");
	scanf("%d", &n);
	while (n < 0) {
		printf("\nn mora biti prirodan broj veci od ili jednak 0!\n\nn = ");
		scanf("%d", &n);
	}

	t1 = clock();
		dinam(n);
	t2 = clock();	
	tms = 1000 * (t2 - t1) / CLOCKS_PER_SEC;
	printf("\ndinamicki: %fms\n", tms);

	t1 = clock();
		ana(n);
	t2 = clock();	
	tms = 1000 * (t2 - t1) / CLOCKS_PER_SEC;
	printf("\nanaliticki: %fms\n", tms);

	t1 = clock();
		rec(n);
	t2 = clock();	
	tms = 1000 * (t2 - t1) / CLOCKS_PER_SEC;
	printf("\nrekurzivni: %fms\n", tms);




	return 0;
}



