#include <stdlib.h>
#include <time.h>

int main ()
{
  srand ( time(NULL) );
  int random_number = rand();  //between 0 and RAND_MAX
  int i = rand();
  int bin = i % 2;
  
  printf("%d %d %d", random_number, i, bin);

  return 0;
}

/*

//you can mod the result
int N = 33;
int rand_capped = random_value % N;  //between 0 and 32
int S = 50;
int rand_range = rand_capped + S; //between 50 and 82

//you can convert it to a float
float unit_random = random_value / (float) RAND_MAX; //between 0 and 1 (floating point)

*/