#include <stdio.h>
#include <time.h>	// clock_t, clock(), CLOCKS_PER_SEC
#include <math.h>	// sqrt

int main(){
	int i, j;
	float tms;
	clock_t t1, t2;  // 'process running time' type

	t1 = clock();	// returns a processor tick count associated with the process
		for (i = 0; i < 1000000; i++) {
			j = sqrt(i*i);
		}
	t2 = clock();

	tms = 1000 * (t2 - t1) / CLOCKS_PER_SEC;  // C_P_S = number of processor clock ticks per second, constant

	printf("Vrijeme izvrsavanja petlje je %lf ms", tms);
	return 0;
}

