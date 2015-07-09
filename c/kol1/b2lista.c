/* ------------------------------------------------------------------------------------
                                    VEZANA LISTA                        Luka Radiček
---------------------------------------------------------------------------------------
Napravite implementaciju apstraktnog tipa podataka vezana lista pomoću pokazivača... */

#include <stdio.h>
#include <stdlib.h>  // rand(), srand(), malloc()
#include <time.h>    // time()

typedef struct Node {    // ćelija
	int data;              // element
	struct Node* next;     // pointer na sljedeću ćeliju
} node;                  

typedef node* position;  // POZICIJA ćelije - definiramo je kao pointer na prethodnu ćeliju (koja sadrži pointer na traženu) 
typedef node* head;      // !!!! pozicija prve ćelije (pointer na glavu) !!!!

// stvara glavu koja pokazuje na 'NULL'
position make_NULL(head* L) {  
// arg. = adresa pointera na glavu '&L'
	*L = (node*)malloc(sizeof(node));  
	(*L)->next = NULL; 
	return *L; 
}

// vraća poziciju zadnje ćelije
position end(head L) {  
// arg. = vrijednost pointera na glavu 'L'
	position q = L;   
	while (q->next != NULL) { 
		q = q->next;
	}
	return q;
}

// stvara ćeliju s elementom x između 'p' i 'p->next'
void insert(int x, position p) {  
	position temp = p->next;                // 'pamti' adresu sljedeće ćelije 
	p->next = (node*)malloc(sizeof(node));  // 'presijeca' listu adresom nove ćelije
	p->next->data = x;                      // 'upisuje' element u novu ćeliju
	p->next->next = temp;                   // 'spaja' listu
}

void delete(position p) {
	position temp = p->next;
	p->next = p->next->next;
	free(temp);  
}

int retrieve(position p){
	return p->next->data; 
}

position next(position p){
	return p->next;
}

position first(head* L) {
	return *L;
}

position previous(position p, head L) {
	position q = L;
	while (q->next != p) {
		q = q->next;
	}
	return q;
}

int main() {

	int i, j, k; 

	srand(time(NULL));
		
	head L;          // pointer na glavu (pozicija prve ćelije)
	make_NULL(&L);   // stvara glavu (praznu listu)
	position p = L;  // pozicija 'p' je namještena na prvu ćeliju

/*-----------------------------------------------------------------------------------------
                                      ZADATAK B2
-------------------------------------------------------------------------------------------
Glavni program u listu upisuje 20 brojeva koji su nule ili jedinice slučajnim izborom... */

	for (i = 0; i < 20; i++) {
		insert(rand() % 2, p);
		p = next(p);
	}

/* Program tada izbriše iz liste sve 0, nakon čega ispiše listu. */

	for (p = L; next(p) != NULL; ) {
		if (retrieve(p) == 0) {
			delete(p);
		} else {
			p = next(p);
		}
	}

	for (p = L; next(p) != NULL; ) {
		printf("%d\n", retrieve(p));
		p = next(p);
	}
	
	printf("\n\n");

	// prazni listu za sljedeći zadatak
	for (p = L; next(p) != NULL; ) {
		delete(p);
	}

/*-----------------------------------------------------------------------------------------
                                      ZADATAK C3
-------------------------------------------------------------------------------------------
Program u listu upisuje brojeve od 1 do 20 slučajnim izborom bez ponavljanja brojeva...  */

	int A[] = {1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20};

	// Fischer-Yates-Durstenfeld shuffle
	for (i = 0; i < 20; i++) {
        int p = rand() % (20 - i),  // indeks elementa kojeg zamjenjujemo
            temp = A[p];
		A[p] = A[19 - i];
		A[19 - i] = temp;
	}

	for (i = 0, p = L; i < 20; i++) {
		insert(A[i], p);
		p = next(p);
	}

/* Program tada izbriše iz liste sve parne brojeve i ispiše ostatak liste. */

	for (p = L; next(p) != NULL; ) {
		if (retrieve(p) % 2 == 0) {
			delete(p);
		} else {
			p = next(p);
		}
	}

	for (p = L; next(p) != NULL; ) {
		printf("%d\n", retrieve(p));
		p = next(p);
	}

	return 0;
}
