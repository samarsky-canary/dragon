# Иконы для реализации 

## Заголовок / title
![заголовок](title.png)
### Варианты содержимого:
Название функции
```javascript
function functionName(){
    return undefined;
}
```


## Конец / end
![заголовок](end.png)
### Варианты содержимого
Комментарий к последнему оператору
```javascript
function functionName(){
    // my scheme return
    return undefined;
}
```


## действие / action
![икона действия](action.png)
### Варианты содержимого:  
1. объявления переменных и констант
 ```javascript
var letter = 'a'
let letter = 'b'
const x = 5
```   
2. Операции над данными
```javascript
letter = 'a' + 'b' // 'ab'
// all arithmetic
x = x - 5 
// icrement/decrement
х--
// all assignment operators
х /= y
// all bitwise operators
x = 5 | 1
// return operators
return x;
```

## Вопрос / if
![икона действия](if.png)
### Варианты содержимого:  
Все условные варианты
 ```javascript
x > 5
// после трансляции становится
if (x > 5) {

} else {
    
}
```
Если условия вложены:
```javascript
if (x > 5) {

} else {
 if (y == x) {

 } else {

 }   
}
```
Цикл / while  
![while](while.png)  
(Подумать как реализовать различие IF и WHILE)



## Вариант / switch
![икона действия](switch.png)
### Варианты содержимого:  
Все условные варианты
 ```javascript
// после трансляции становится
switch (j) 
{
    case 5:
        break;
    case 10:
        break;
    default:
        throw new NotImplementedException();
}
```

## Простой ввод / input
![икона действия](input.png)
### Варианты содержимого:  
 ```javascript
// первой строкой
const readline = require('readline')
...

...
j = readline()
```


## Простой вывод / output
![икона действия](output.png)
### Варианты содержимого:  
 ```javascript
// первой строкой
const readline = require('readline')
...

...
console.log(j)
```

## Пауза / sleep
![икона действия](sleep.png)
### Варианты содержимого:  
 ```javascript
// первой строкой
sleep(2000)
```


## Комментарий / comment
![икона действия](comment.png)
### Варианты содержимого:  
 ```javascript
// содержимое комментария
```
