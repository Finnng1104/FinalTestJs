function login(email, password) {
    if (!email || !password) {
        document.getElementById('showerror').innerText = "Vui lòng nhập đầy đủ thông tin!";
        return;
    }
	let users = getLocalUsers();
    const user = users.find(user => user.email == email && user.password == password);
    console.log(user);


    if (user) {
        localStorage.setItem('loginMessage', `Xin chào ${user.first_name} ${user.last_name}`);
        window.location.href = "../index.html";
    } else {
        document.getElementById('showerror').innerText = "Email hoặc mật khẩu không đúng!";
    }
}

document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('emaillogin').value;
    const password = document.getElementById('password').value;
    login(email, password);
});


