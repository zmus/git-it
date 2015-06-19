#include <stdio.h>
#include <stdlib.h>

#define MAXLENGTH 20

typedef struct {
    int top;
	int elements[MAXLENGTH];
} STACK;

void MAKE_NULL(STACK *S_ptr) {
	S_ptr->top = MAXLENGTH;
}

int EMPTY(STACK S) {
	if (S.top >= MAXLENGTH)
		return 1;
	else
		return 0;
}

void PUSH(int x, STACK *S_ptr) {
	if (S_ptr->top == 0)
		printf("Stog je pun");
	else {
		S_ptr->top--;
		S_ptr->elements[S_ptr->top] = x;
	}
}

void POP(STACK *S_ptr) {
	if (EMPTY(*S_ptr))
		printf("Stog je prazan");
	else
		S_ptr->top++;
}

int TOP(STACK S) {
	if (EMPTY(S))
		printf("Stog je prazan");
	else
		return (S.elements[S.top]);
}

int main(){
	STACK S, *S_PTR = &S;
	int x = 7;
	MAKE_NULL(S_PTR);
	PUSH(x, S_PTR);
	printf("%d", TOP(S));

	getchar();
}

// sto je to stog(teorijski i karakteristike)?
// implementacija preko pokazivaca i preko polja
// napraviti kod s funkcijama
// za liste i stabla treba znati sve
// probaj imat napravljene sve ove programe, da ih samo implementiras kasnije


//1. zadatak:  usporediti liste preko polja i pokazivaca - da li funkcije koje se isto zovu daju iste rezultate

//2. zadatak: implementacija reda pomocu pokazivaca