/* -----------------------------------------------------------------------
                                STOG                       Luka Radiček
--------------------------------------------------------------------------
Napravite implementaciju apstraktnog tipa podataka stog...              

- op. a. implementacija pomoću pointera 
- slično vezanoj listi, ali ne postoji 'pozicija' -> nije potrebna 
  glava (head), već je dovoljan pointer na prvu ćeliju                  */

#include <stdio.h>
#include <stdlib.h>  // malloc(), exit()
#include <ctype.h>   // isalpha()

typedef struct Node {  // ćelija
	char data;           // element
	struct Node* next;   // pointer na sljedeću ćeliju
} node;

typedef node* stack;     // pointer na prvu ćeliju

// pretvara stog S u prazan stog
void makeNull(stack* Sptr) {
// arg. = adresa pointera na prvu ćeliju '&S'
	*Sptr = NULL; 
}

// provjerava je li stog prazan
int empty(stack S) {
	return (S == NULL) ? 1 : 0;
}

// ubacuje element x na početak (vrh)
void push(char x, stack* Sptr) {
	node* temp = *Sptr;
	*Sptr = (node*)malloc(sizeof(node));
	(*Sptr)->data = x;
	(*Sptr)->next = temp;
}

// briše element s vrha 
void pop(stack* Sptr) {
	if (empty(*Sptr)) {
		exit(202);  // stog je prazan
	} else {
		node* temp = *Sptr;
		*Sptr = (*Sptr)->next;
		free(temp);
	}
}

// vraća element koji je na vrhu 
char top(stack S) {
	if (empty(S)) {
		exit(202);  // stog je prazan
	} else {
		return S->data;
	}
}

int main() {
	stack S;       // stog (pointer na prvu ćeliju)
	makeNull(&S);  // S = NULL (inicijalizacija stoga)
	int c;         // simbol

	printf("\nUbacujte simbole na stog.\nNakon sto ubacite simbol koji nije slovo, program ce ih ispisati u\nobrnutom redosljedu. ('last in first out')\n\n");

/* U glavnom programu na stog unosite podatke tipa char sve dok se 
   ne unese simbol koji nije slovo. */

	while (1) {
		c = getchar();
		if (isalpha(c)) {
			push(c, &S);
			getchar();  // apsorbira '\n' od prvog getchar()
		} else {
			break;
		}
	}

/* Nakon što se unese taj simbol, program mora ispisati unesene znakove 
   u obrnutom redosljedu od onog u kojem su upisani. */
	
	while (! empty(S)) {
		printf("\n%c", top(S));
		pop(&S);
	}
	
	return 0;
}




