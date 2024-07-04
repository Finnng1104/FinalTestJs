function checkArr(){
    let arr1 = document.getElementById("arr1").value.split(" ").filter(Boolean);
    let arr2 = document.getElementById("arr2").value.split(" ").filter(Boolean);
    console.log(arr1);
    console.log(arr2);
    document.getElementById("result").innerHTML = "<p>Mảng không trùng lập là: " + uniqueArray(arr1, arr2).join(", ")+ "</p>";
}

function uniqueArray(Arr1, Arr2) {
    let uniqueArray = [];
    
    // Tìm các phần tử chỉ có trong A1
    for (let i = 0; i < Arr1.length; i++) {
        if (!Arr2.includes(Arr1[i])) {
            uniqueArray.push(Arr1[i]);
        }
    }
    
    // Tìm các phần tử chỉ có trong A2
    for (let i = 0; i < Arr2.length; i++) {
        if (!Arr1.includes(Arr2[i])) {
            uniqueArray.push(Arr2[i]);
        }
    }
    return uniqueArray;
}