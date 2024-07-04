
function register(first_name, last_name, email, password, repassword) {
   
    if (!first_name || !last_name || !email || !password) {
        document.getElementById('showerrorsignup').innerText = "Vui lòng nhập đầy đủ thông tin!";
        return;
    }else if(password.length < 8){
        document.getElementById('showerrorsignup').innerText = "Mật khẩu phải có ít nhất 8 ký tự!";
        return;
    }else if(password != repassword){
        document.getElementById('showerrorsignup').innerText = "Mật khẩu không khớp!";
        return;
    }
    const users = getLocalUsers();
    const user = users.find(user => user.email == email);
    if (user) {
        document.getElementById('showerrorsignup').innerText = "Email đã tồn tại!";
        return;
    }

    users.push({
        id: users.length + 1,
        first_name,
        last_name,
        email,
        password
    });
    setLocalUsers(users);
    alert("Đăng ký thành công!");
    window.location.href = "login.html";
}

document.getElementById('register-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const first_name = document.getElementById('firstname').value;
    const last_name = document.getElementById('lastname').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('pass').value;
    const repassword = document.getElementById('re_pass').value;
    register(first_name, last_name, email, password, repassword);
});
