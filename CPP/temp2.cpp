
int arr[] = { 1,2,2,3,4,5,5,5};

int size = sizeof(arr)/sizeof(arr[0]);

for (int i=0;i<size;i++){

   std::vector<int,int> freq;
   
   for (auto i : arr)
    if (map.find(arr[i]))
        if( it = map.insert(arr[i]) )
            it->second++
}