#include<stdio.h>
#include<stdlib.h>
#include<string.h>
#pragma warning(disable: 4996);

typedef char* String;
typedef struct node {
	struct node* Left;
	struct node* Right;
	String str;
	struct node* Parent;
}Node;

typedef struct rule {
	struct rulebook* next;
	String Command;
	String ElementA;
	String ElementB;
	int CommandNumber;
	int Max;
}Rule;

typedef struct test {
	String Command;
	struct test *Parent;
	struct test *Left;
	struct test *Right;
	int Level;
}Test;

typedef struct pri {
	int Number;
	String Answer;
	struct pri *next;
}Pri;


Node* newNode();
Rule* newRule();
void Setting(Node *[20000]);
int Command(Node* arr[20000],Rule** Token);
void AlphabetSetting(Node* arr[20000], String Command, String Body);
void PrintE(Node* arr[20000]);
void RuleBook(Rule** Token, String Command, String Body);
void PrintF(Rule* Finder);
void Search(Rule* Finder, Test* test,String Commit[20000],int Level);
void PrintT(Test* test, String Commit[20000], int Value,int Count,Pri **first);
void SetAnswer(String Answer[20000], Node *arr[20000]);
void SameSet(Rule* Finder);
int LastMax(Test* test, String Commit[20000], int index);

int main() {
	printf("test");
	Node *arr[20000];
	for (int Rep1 = 0; Rep1 < 20000; Rep1++) arr[Rep1] = NULL;
	Setting(arr);
	Rule* First = newRule();
	Rule* Pointer = First;

	while (1) {
		int Value = Command(arr,&Pointer);
		if (Value == 0) break;
	}//RuleSetting
	
	while (1) {
		SameSet(Pointer);
		Pointer = Pointer->next;
		if (Pointer == NULL) break;
	}//SameSetting
	Pointer = First;
	Test *one = (Test*)malloc(sizeof(Test));
	one->Left = NULL;
	one->Right = NULL;
	one->Command = "S";
	one->Level = NULL;
	one->Parent = NULL;
	String Answer[20000];//Answer
	for (int Rep1 = 0; Rep1 < 20000; Rep1++) Answer[Rep1] = NULL;//Reset
	String Commit[20000];//Commit,
	for (int Rep1 = 0; Rep1 < 20000; Rep1++) Commit[Rep1] = NULL;//Reset
	SetAnswer(Answer,arr);

	int Symbol = 0;
	while (1) {
		Search(Pointer, one, Commit,0);
		int Rep1 = 0;
		while (1) {
			Rep1++;
			if (Commit[Rep1] == NULL) break;
		}
		Symbol = Compare(Answer, Commit);
		if (Symbol == 1) {
			break;
		}
		else {
			for (int Rep1 = 0; Rep1 < 20000; Rep1++) Commit[Rep1] = NULL;//Reset
		}
	}//Compare.
	Pri *Ans = (Pri*)malloc(sizeof(Pri));
	Ans->Answer = NULL;
	Ans->next = NULL;
	Ans->Number = 0;
	Pri* MM = Ans;
	int Count = LastMax(one,Commit,0);
	for (int Rep2 = 0; Rep2 <= Count; Rep2++) {
		PrintT(one, Commit, Rep2, Count, &MM);
	}
	//printf("\n");
	MM = Ans;
	while (MM!=NULL) {
		if (MM->next->next == NULL) {
			printf("%s\n", MM->Answer);
			break;
		}
		printf("%s ",MM->Answer);
		MM = MM->next;
	}
	return 0;
}

int LastMax(Test* test,String Commit[20000],int index) {
	int Index = index;
	Test *finder = test;
	int Rep1 = 0;
	while (1) {
		if (!strcmp(finder->Command, Commit[Rep1])) {
			if (Index < finder->Level) Index = finder->Level;
		}
		Rep1++;
		if (Commit[Rep1] == NULL) break;
	}

	if (finder->Left != NULL) Index = LastMax(finder->Left, Commit, Index);
	if (finder->Right != NULL) Index = LastMax(finder->Right, Commit, Index);
	return Index;
}

void SameSet(Rule* Finder) {
	if (Finder->CommandNumber == NULL) {
		Rule* temp = Finder;
		int Rep1 = 0;
		while (1) {
			if (!strcmp(Finder->Command, temp->Command)) {
				temp->CommandNumber = Rep1;
				Rep1++;
			}
			temp = temp->next;
			if (temp == NULL) break;
		}
		temp = Finder;
		while (1) {
			if (!strcmp(Finder->Command, temp->Command)) {
				temp->Max = Rep1;
			}
			temp = temp->next;
			if (temp == NULL) break;
		}
	}
}

void SetAnswer(String Answer[20000],Node *arr[20000]) {
	int Rep1 = 0;
	while (1) {
		Answer[Rep1] = arr[Rep1]->str;
		Rep1++;
		if (arr[Rep1] == NULL) break;
	}
}

Rule* newRule() {
	Rule* book = (Rule*)malloc(sizeof(Rule));
	book->Command = NULL;
	book->ElementA = NULL;
	book->ElementB = NULL;
	book->next = NULL;
	book->CommandNumber = NULL;
	book->Max = NULL;
	return book;
}

void PrintE(Node* arr[20000]) {
	int Rep1 = 0;
	while (arr[Rep1] != NULL) {
		printf("arr[%d]->str : %s\n", Rep1, arr[Rep1]->str);
		Rep1++;
	}
}

void PrintF(Rule* Finder) {
	Rule *finder = Finder;
	while (finder != NULL) {
		printf("Rule : %s\n",finder->Command);
		printf("ElementA : %s\n", finder->ElementA);
		printf("ElemnetB : %s\n", finder->ElementB);
		printf("Command Number : %d\n",finder->CommandNumber);
		printf("Same Commands's Number : %d\n", finder->Max);
		finder = finder->next;
		printf("\n");
	}
}

void PrintT(Test* test,String Commit[20000],int Value,int Count,Pri** first) {
	Test *finder = test;
	int Level = Value;
	int Value2 = Count;
	if (finder->Level == Level) {
		(*first)->Answer = finder->Command;
		Pri *next2 = malloc(sizeof(Pri));
		next2->Answer = NULL;
		next2->next = NULL;
		next2->Number = (*first)->Number + 1;
		(*first)->next = next2;
		(*first) = (*first)->next;
	}
	int Rep1 = 0;
	if (finder->Left != NULL && finder->Right != NULL) {
		Test* L1 = finder->Left;
		Test* R2 = finder->Right;
		if (L1->Left == NULL && L1->Right == NULL) {
			if (R2->Left == NULL && R2->Right == NULL) {
				if (finder->Level == Level) { 
					finder->Level = Level + 1; 
					finder->Left->Level = Level + 2;
					finder->Right->Level = Level + 2;
				}
				if (finder->Level > Count-1) finder->Level = Count-1;
				if (finder->Left->Level > Count) finder->Left->Level = Count;
				if (finder->Right->Level > Count) finder->Right->Level = Count;
			}
		}
	}//ChildrenNode is made of Last node.

	while (1) {
		if (!strcmp(finder->Command, Commit[Rep1])) {
			if (finder->Level<Count && finder->Level == Level) {
				finder->Level = Level + 1;
			}
		}
		Rep1++;
		if (Commit[Rep1] == NULL) break;
	}

	if (finder->Left != NULL) PrintT(finder->Left,Commit,Level,Value2,first);
	if (finder->Right != NULL) PrintT(finder->Right,Commit,Level,Value2,first);
}

Node* newNode() {
	Node* node = (Node*)malloc(sizeof(Node));
	node->Left = NULL;
	node->Right = NULL;
	node->Parent = NULL;
	return node;
}

void Setting(Node *arr[20000]) {
	String CommandLine = (char *)malloc(sizeof(char) * 20000);
	String Command = NULL;
	int Rep1 = 0;
	gets(CommandLine);
	Command = strtok(CommandLine," ");
	while (Command != NULL) {
		Node* temp = newNode();
		temp->str = Command;
		arr[Rep1] = temp;
		Command = strtok(NULL, " ");
		Rep1++;
	}
	fflush(stdin);
	fflush(stderr);
}

int Command(Node* arr[20000],Rule** Token) {
	String CommandLine = (char *)malloc(sizeof(char) * 20000);
	String Command = NULL;
	String Body = NULL;
	fgets(CommandLine,20000,stdin);//input
	Command = strtok(CommandLine," ");
	Body = strtok(NULL, "\n");
	if (strlen(Command) == 1 && strcmp(Command,"S")) AlphabetSetting(arr,Command,Body);
	if (strlen(Command) >= 2 && strcmp(Command,"0\n")) RuleBook(Token,Command,Body);
	if (!strcmp(Command, "S")) RuleBook(Token,Command,Body);
	if (!strcmp(Command, "0\n")) return 0;
}

void AlphabetSetting(Node* arr[20000],String Command,String Body) {
	int Rep1 = 0;
	while (arr[Rep1]!=NULL) {
		if (!strcmp(arr[Rep1]->str, Body)) arr[Rep1]->str = Command;
		Rep1++;
	}
}

void RuleBook(Rule** Token,String Command,String Body) {
	Rule *Finder = (*Token);
	if (Finder->Command ==NULL) {
		Finder->Command = Command;
		Finder->ElementA = strtok(Body," ");
		Finder->ElementB = strtok(NULL, "\n");
		return 0;
	}//First Node == NULL,
	while (1) {
		Rule *Before = Finder;
		Finder = Finder->next;//Move Finder
		if (Finder == NULL) {
			Rule* nextRule = newRule();
			Finder = nextRule;
			Finder->Command = Command;
			Finder->ElementA = strtok(Body, " ");
			Finder->ElementB = strtok(NULL, "\n");
			Before->next = Finder;
			break;
		}
	}
}

void Search(Rule* Finder,Test* test,String Commit[20000],int Level) {
	Rule* pointer = Finder;
	Test* Tpointer = test;
	int Levels = Level;
	while (1) {
		if (!strcmp(Tpointer->Command, pointer->Command)) break;
		pointer = pointer->next;
		if (pointer == NULL) break;
	}
	if (pointer == NULL) {
		int index = 0;
		while (1) {
			if (Commit[index] != NULL) index++;
			else break;
		}
		Commit[index] = Tpointer->Command;

		//printf("Commit : %s\n", Commit[index]);
	}//Last Node.

	if (pointer != NULL) {
		Levels++;
		Test *t1 = (Test*)malloc(sizeof(Test));
		Test *t2 = (Test*)malloc(sizeof(Test));
		Tpointer->Left = t1;
		Tpointer->Right = t2;
		t1->Command = pointer->ElementA;
		t2->Command = pointer->ElementB;
		t1->Left = NULL;
		t1->Right = NULL;
		t1->Level = Levels;
		t2->Left = NULL;
		t2->Right = NULL;
		t2->Level = Levels;
		//printf("Parnet's Commnad %s\n",Tpointer->Command);
		t1->Parent = Tpointer;
		t2->Parent = Tpointer;
		Search(Finder, Tpointer->Left, Commit,Levels);
		Search(Finder, Tpointer->Right,Commit,Levels);
	}
}

int Compare(String Answer[20000], String Commit[20000]) {
	int Symbol = 1;
	int Rep1 = 0;
	while (1) {
		if (strcmp(Answer[Rep1], Commit[Rep1])) Symbol = 0;
		Rep1++;
		if (Answer[Rep1] == NULL || Commit[Rep1] == NULL) break;
	}
	return Symbol;
}