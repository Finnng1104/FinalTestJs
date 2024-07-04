function showPosts() {
	const posts = getLocalPosts();
	const users = getLocalUsers();
	const table = document.getElementById('postList');
  
	let html = '';
	posts.forEach(post => {
	  const user = users.find(user => user.id == post.user_id);
	  html += `
		<tr>
		  <td><a href="#" onclick="setPostId(${post.id})">${post.id}</a></td>
		  <td>${post.title}</td>
		  <td>${post.created_at}</td>
		  <td>${user.first_name + " " + user.last_name}</td> 
		</tr>
	  `;
	});
	table.innerHTML = html;
  }
  
  function setPostId(postId) {
	localStorage.setItem('postId', postId);
	window.location.href = "detailpost.html";
  }
  
  document.addEventListener('DOMContentLoaded', function() {
	showPosts();
  });