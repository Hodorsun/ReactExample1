import React from 'react';
import { useState } from 'react';
import { useMemo } from 'react';
import Counter from './components/Counter';
import ClassCounter from './components/ClassCounter';
import PostItem from './components/PostItem';
import PostList from './components/PostList';
import MyButton from './components/UI/button/MyButton';
import MyInput from './components/UI/input/MyInput';
import PostForm from './components/PostForm';
import MySelect from './components/UI/select/MySelect';
import './styles/App.css';
import PostFilter from './components/PostFilter';
import MyModal from './components/UI/modal/MyModal';
import MyTestModal from './components/UI/modal/MyTestModal';
import { usePosts } from './hooks/usePosts';
import axios from 'axios';

function App() {
    const [posts, setPosts] = useState([]);

    const [filter, setFilter] = useState({ sort: '', query: '' });
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);

    const createPost = (newPost) => {
        setPosts([...posts, newPost])
    };

    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    };

    async function fetchPosts() {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        setPosts(response.data);
    }

    //----
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
    //----

  return (
      <div className="App">
          <button onClick={fetchPosts}>GET POSTS</button>
          <div style={{ textAlign: 'center' }}>
              <h1>Create Posts here:</h1>
              <MyButton style={{margin: '10px 10px'}} onClick={openModal}>Create new post!</MyButton>
              <MyTestModal isOpen={isModalOpen} onClose={closeModal}>
                  <PostForm
                      create={createPost}
                      onClose={closeModal}
                  />
              </MyTestModal>
          </div>
          <hr style={{margin: '15px 15px'}}/>
          <PostFilter
              filter={filter}
              setFilter={setFilter}
          />
              <PostList
                  remove={removePost}
                  posts={sortedAndSearchedPosts}
                  title="Post List programming"
              />
      </div>
  );
}

export default App;
