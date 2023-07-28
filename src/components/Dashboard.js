// src/components/Dashboard.js
import React, { useState, useEffect } from 'react';

function Dashboard() {
    const defaultPosts = [
        {
          id: 1,
          text: "What an amazing day !",
          likes: 5,
          dislikes: 2,
        },
        {
          id: 2,  
          text: "Think. Feel. Collaborate !",
          likes: 10,
          dislikes: 3,
        },
        // Add more default posts as needed
      ];
      
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    // Set the initial state of 'posts' with the defaultPosts data
    setPosts(defaultPosts);
  }, []);
  const [newPost, setNewPost] = useState('');
  const [editPostId, setEditPostId] = useState(null);

  const handlePostChange = (e) => {
    setNewPost(e.target.value);
  };

  const handlePostSubmit = () => {
    if (newPost.trim() === '') return;

    if (editPostId === null) {
      setPosts([...posts, { id: Date.now(), text: newPost, likes: 0, dislikes: 0 }]);
      setNewPost('');
      showAlert('Post created successfully!');
    } else {
      const editedPosts = posts.map((post) =>
        post.id === editPostId ? { ...post, text: newPost } : post
      );
      setPosts(editedPosts);
      setNewPost('');
      setEditPostId(null);
      showAlert('Post edited successfully!');
    }
  };

  const handlePostDelete = (id) => {
    const updatedPosts = posts.filter((post) => post.id !== id);
    setPosts(updatedPosts);
    showAlert('Post deleted successfully!');
  };

  const handlePostEdit = (id) => {
    const postToEdit = posts.find((post) => post.id === id);
    setNewPost(postToEdit.text);
    setEditPostId(id);
  };

  const handleLikeDislike = (id, action) => {
    const updatedPosts = posts.map((post) =>
      post.id === id
        ? action === 'like'
          ? { ...post, likes: post.likes + 1 }
          : { ...post, dislikes: post.dislikes + 1 }
        : post
    );
    setPosts(updatedPosts);
  };

  const showAlert = (message) => {
    const alertDiv = document.createElement('div');
    alertDiv.className = 'alert';
    alertDiv.textContent = message;
    document.body.appendChild(alertDiv);
    setTimeout(() => {
      document.body.removeChild(alertDiv);
    }, 3000);
  };

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <div className="post-container">
        <textarea
          value={newPost}
          onChange={handlePostChange}
          placeholder="Type your post here..."
        ></textarea>
        <div className="button-container">
          <button onClick={handlePostSubmit}>{editPostId === null ? 'Share' : 'Edit'}</button>
        </div>
      </div>
      <div className="posts">
        {posts.map((post) => (
          <div className="post" key={post.id}>
            <p>{post.text}</p>
            <div className="actions">
              <button onClick={() => handlePostEdit(post.id)}>Edit</button>
              <button onClick={() => handlePostDelete(post.id)}>Delete</button>
            </div>
            <div className="likes-dislikes">
              <button onClick={() => handleLikeDislike(post.id, 'like')}>Like ({post.likes})</button>
              <button onClick={() => handleLikeDislike(post.id, 'dislike')}>
                Dislike ({post.dislikes})
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
