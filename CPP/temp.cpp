
#include <iostream>

class a
{
};

class b : public a
{
};

class c : public a
{
};

int main()
{

    a *var1 = new b;

    a *var2 = new c;

    b *var3 = <dynamic_cast> var1;

    c *var4 = var1;
}