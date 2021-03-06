var LZString = (function () {
  var f = String.fromCharCode;
  var keyStrBase64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  var baseReverseDic = {};

  function getBaseValue(alphabet, character) {
      if (!baseReverseDic[alphabet]) {
          baseReverseDic[alphabet] = {};
          for (var i = 0; i < alphabet.length; i++) {
              baseReverseDic[alphabet][alphabet.charAt(i)] = i
          }
      }
      return baseReverseDic[alphabet][character]
  }
  var LZString = {
      decompressFromBase64: function (input) {
          if (input == null) return "";
          if (input == "") return null;
          return LZString._0(input.length, 32, function (index) {
              return getBaseValue(keyStrBase64, input.charAt(index))
          })
      },
      _0: function (length, resetValue, getNextValue) {
          var dictionary = [],
              next, enlargeIn = 4,
              dictSize = 4,
              numBits = 3,
              entry = "",
              result = [],
              i, w, bits, resb, maxpower, power, c, data = {
                  val: getNextValue(0),
                  position: resetValue,
                  index: 1
              };
          for (i = 0; i < 3; i += 1) {
              dictionary[i] = i
          }
          bits = 0;
          maxpower = Math.pow(2, 2);
          power = 1;
          while (power != maxpower) {
              resb = data.val & data.position;
              data.position >>= 1;
              if (data.position == 0) {
                  data.position = resetValue;
                  data.val = getNextValue(data.index++)
              }
              bits |= (resb > 0 ? 1 : 0) * power;
              power <<= 1
          }
          switch (next = bits) {
              case 0:
                  bits = 0;
                  maxpower = Math.pow(2, 8);
                  power = 1;
                  while (power != maxpower) {
                      resb = data.val & data.position;
                      data.position >>= 1;
                      if (data.position == 0) {
                          data.position = resetValue;
                          data.val = getNextValue(data.index++)
                      }
                      bits |= (resb > 0 ? 1 : 0) * power;
                      power <<= 1
                  }
                  c = f(bits);
                  break;
              case 1:
                  bits = 0;
                  maxpower = Math.pow(2, 16);
                  power = 1;
                  while (power != maxpower) {
                      resb = data.val & data.position;
                      data.position >>= 1;
                      if (data.position == 0) {
                          data.position = resetValue;
                          data.val = getNextValue(data.index++)
                      }
                      bits |= (resb > 0 ? 1 : 0) * power;
                      power <<= 1
                  }
                  c = f(bits);
                  break;
              case 2:
                  return ""
          }
          dictionary[3] = c;
          w = c;
          result.push(c);
          while (true) {
              if (data.index > length) {
                  return ""
              }
              bits = 0;
              maxpower = Math.pow(2, numBits);
              power = 1;
              while (power != maxpower) {
                  resb = data.val & data.position;
                  data.position >>= 1;
                  if (data.position == 0) {
                      data.position = resetValue;
                      data.val = getNextValue(data.index++)
                  }
                  bits |= (resb > 0 ? 1 : 0) * power;
                  power <<= 1
              }
              switch (c = bits) {
                  case 0:
                      bits = 0;
                      maxpower = Math.pow(2, 8);
                      power = 1;
                      while (power != maxpower) {
                          resb = data.val & data.position;
                          data.position >>= 1;
                          if (data.position == 0) {
                              data.position = resetValue;
                              data.val = getNextValue(data.index++)
                          }
                          bits |= (resb > 0 ? 1 : 0) * power;
                          power <<= 1
                      }
                      dictionary[dictSize++] = f(bits);
                      c = dictSize - 1;
                      enlargeIn--;
                      break;
                  case 1:
                      bits = 0;
                      maxpower = Math.pow(2, 16);
                      power = 1;
                      while (power != maxpower) {
                          resb = data.val & data.position;
                          data.position >>= 1;
                          if (data.position == 0) {
                              data.position = resetValue;
                              data.val = getNextValue(data.index++)
                          }
                          bits |= (resb > 0 ? 1 : 0) * power;
                          power <<= 1
                      }
                      dictionary[dictSize++] = f(bits);
                      c = dictSize - 1;
                      enlargeIn--;
                      break;
                  case 2:
                      return result.join('')
              }
              if (enlargeIn == 0) {
                  enlargeIn = Math.pow(2, numBits);
                  numBits++
              }
              if (dictionary[c]) {
                  entry = dictionary[c]
              } else {
                  if (c === dictSize) {
                      entry = w + w.charAt(0)
                  } else {
                      return null
                  }
              }
              result.push(entry);
              dictionary[dictSize++] = w + entry.charAt(0);
              enlargeIn--;
              w = entry;
              if (enlargeIn == 0) {
                  enlargeIn = Math.pow(2, numBits);
                  numBits++
              }
          }
      }
  };
  return LZString
})();
String.prototype.splic = function (f) {
  return LZString.decompressFromBase64(this).split(f)
};




const result = (function(p,a,c,k,e,d){console.info({p,a,c,k,e,d});e=function(c){return(c<a?"":e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)d[e(c)]=k[c]||e(c);k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1;};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);console.info('p--',p);return p;}('Z.M({"x":w,"v":"u","t":"s.0","r":q,"p":"4","o":["n.0.2","l.0.2","k.0.2","j.0.2","i.0.2","g.0.2","f.0.2","d.0.2","c.0.2","10.0.2","11.0.2","12.0.2","13.0.2","b.0.2","a.0.2","9.0.2","8.0.2","7.0.2","6.0.2","y.0.2","z.0.2","A.0.2","B.0.2","R.0.2","S.0.2","T.0.2","U.0.2","V.0.2","X.0.2","Y.0.2","3.0.2"],"Q":W,"O":3,"N":"/P/h/L/4/","K":1,"J":"","I":H,"G":F,"E":{"e":D,"m":"C"}}).5();',62,66,'FYBw5gPhDuCmBGIIGYCMFA03gBgCyD21CEAJ1gEkA7ASwBcJUBOOgDjoHY6A2OgVjpwiyMsLAeyxcBvXAOQCATFCzoAZpQA2sAM4QAxuQCGAW1jMOqbgp2UAJp2RN6AfRxYIiSjogAJAIIAFP1IAOQBRAGUwtwNjOwc3Gwg5Vzl0OQU5WX1yAFkOABE/ZQBFVmoAVXoARzBNSkMAIQB1INJIVDNuVlQmVjkuTTVTc3RiWAA3UltujtlyWAAPakm3NQB7HQBrRx1PTWp9agBXbQALfRAQSjnNTQBPYHmALwg6sDyD/UIDk4gNckJNPxVFRNCdYLY5Pw5Lw+ol2HIWMp9GpNCY5IxkK4wtkvFAoEA='['\x73\x70\x6c\x69\x63']('\x7c'),0,{}))

const first = result.indexOf('{')
const last = result.lastIndexOf('}')

let newData = result.substring(first,last+1)

console.info('result',JSON.parse(newData))