function bubble(data){
  const dataLen = data.length?data.length:0;
  for(let i=0;i<dataLen;i++) {
    for(let j=0;j<dataLen;j++) {
      const ele = data[j+1];
      const judge= data[j];
      if(ele > judge) {
       [data[j],data[j+1]]=[data[j+1],data[j]]
      }
    }
  }

  console.info('data',data)
}

bubble([5,3,4,2])