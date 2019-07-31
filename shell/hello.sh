#!/bin/bash
# 变量
echo "Hello World !"

temp_var='tempVar'

temp_var2="This is ${temp_var} 2"

echo ${temp_var}
echo ${temp_var2}

temp_arr=(1,2,3,4,5,6)

echo "数组的元素为: ${temp_arr[*]}"
echo "数组的长度为: ${#temp_arr[*]}"