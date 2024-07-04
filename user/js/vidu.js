function showPosts() {
    const posts = getLocalPosts();
    const users = getLocalUsers();
    const table = document.getElementById('postList');
  
    let html = '';
    posts.forEach(post => {
        const user = users.find(user => user.id == post.user_id);
        console.log(user);
        html += `
            <tr>
                <td>${post.id}</td>
                <td>${post.title}</td>
                <td>${post.created_at}</td>
              
            </tr>
        `;
    });
    table.innerHTML = html;
  }
  
  document.addEventListener('DOMContentLoaded', function() {
        showPosts();
  });
  
  // function showDetailPost() {
  // 	const users = getLocalUsers();
  // 	const post = posts.find(post => post.id == this);
  // 	localStorage.setItem('users', JSON.stringify(post));
  // 	window.location.href = "detailpost.html";
  // }
  
  {/* <td>${user.first_name + " " + user.last_name}</td>  */}
  