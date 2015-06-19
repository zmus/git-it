#include <stdio.h>
#include <stdlib.h>

#define MAXLEN

float	w[MAXLEN],  // težine predmeta
		p[MAXLEN],  // vrijednosti predmeta
		x[MAXLEN];  // koji se dio i-tog predmeta stavlja u ranac

void cont_knapsack(int n, float c) {
// za svaki predmeta izračuna profitabilnost p/w (vrijednost po jedinici težine)
// predmeti se sortiraju silazno po profitabilnosti te se u tom redosljedu stavljaju u ranac dokle ima mjesta
// kod svakog  stavljanja nastoji se staviti što veći dio predmeta
	float cu;
	int i;

	for (i = 1; i <= n; i++) x[i] = 0.0;
	
	cu = c;

	for (i = 1; i <= n; i++) {
		if (w[i] > cu) {
			x[i] = cu / w[i];
			return;
		}
		x[i] = 1.0;
		cu -= w[i];
	}
return;
} 
		