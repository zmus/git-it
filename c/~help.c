POINTER
& -> adress
* -> value at adress
char je 1 byte, int/float 4 bytes // bitno je navest type da se kod dereferenciranja pointera zna koliko mjesta treba čitat na adresi na koju pokazuje

int a;
int *p;  
p = &a;
print p // &a
print *p // a

POINTER TO STRUCTURE
struct Person *p;
p = &Person1;
(*p).name  ili  p->name

POINTER TO POINTER
int *p, 
	**q, 
	***r,
	x = 10;

p = &x;
q = &p = &(&x);
r = &q = &(&p) = &(&(&p));  

*** r = 1
** r = adresa\vrijednost pointera p
* r = adresa\vrijednost pointera q


TYPE CASTING
-> convert a variable from one data type to another data type
int a = 10;
double b;
b = (double) a;

int* p0;
p0 = (char*) p; // cita samo prvi byte iz int, jer je sizeof(char)=1

CALL BY REFERENCE
void Increment(int *p) {
	*p = (*p) + 1;
}
int main() {
	int a = 10;
	Increment(&a);
}

POINTERS AND ARRAYS
~ Element at index i ~
	Adress = &A[i] or (A + i) , A = &A[0]  // ime polja A je isto što i pointer na prvi član
	Value = A[i] or *(A + i)

~ a[5] = 5[a] ~
	a[b] == *(a + b)  ->  *(a + 5) = *(5 + a)   // LOL

*** U FUNKCIJU SE STAVLJA POINTER NA ARRAY, A KAD SE POZIVA SE DAJE ADRESA ***

~ broj elemenata u array-u ~
	int size = sizeof(A) / sizeof(A[0]);  // npr. 20 bytes / 4 bytes = 5

CHAR vs STRING
char c = 'a' // character constant
char str[] = "a" // array of characters, always terminated with the 0 character
string se može napravit od od više charova:  s = {'C','h','a','r','\0'}

/*
%c - The int argument shall be converted to an unsigned char, and the resulting byte shall be written.

%s - The argument shall be a pointer to an array of char. 
   - Bytes from the array shall be written up to (but not including) any terminating null byte ( 0 ili /0 )
*/

PREORDER, INORDER, POSTORDER
~ Preorder ~
	<root><left><right>
~ Inorder ~
	<left><root><right>
~ Postorder ~
	<left><right><root> 

POLJE vs LISTA
	Polje (array)
		- homogeni elementi (svi istog tipa)
		- dodijeljena memorija je statična i kontinuirana
		- random access  // x = A[5]
	Lista (list)
		- heterogeni elementi
		- dodijeljena memorija je dinamična i nasumična
		- sequential access  //  jako loše za binary search, quicksort ...

STABLO:
	- korijen (root)  // čvor... stablo može biti i samo korijen 
	- čvor (node)
	- podstablo
	- balansirano - sortirano - puno - potpuno ...


Arrays, lists and trees are concrete data types whereas 
stacks, queues and heaps are abstract data types.