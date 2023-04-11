import React, { useState } from "react";
import './index.css';

function PostForm({addPost, error}) {

  const [postText, setPostText] = useState('');
  const [characterCount, setCharacterCount] = useState(0);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addPost({
        variables: { text: postText },
      });

      console.log(data)
      setPostText('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'postText' && value.length <= 100) {
      setPostText(value);
      setCharacterCount(value.length);
    }
  };

  return (

    <div className="post-form">
      <div id="post-form-count">
      <p>~ Short and sweet ~</p>
      <p id={characterCount <= 100 ? 'char-reg' : 'char-ex'}>
        Character Count: {characterCount}/100
        {error && <span>Something went wrong...</span>}
      </p>
      </div>
      <form onSubmit={handleFormSubmit}>
        <div>
          <textarea
            id="postText"
            className="form-control"
            placeholder="Encourage some people!"
            name="postText"
            type="postText"
            value={postText}
            onChange={handleChange}
          ></textarea>
        </div>
        <div>
          <button
          className="postBtn"
          type="submit">
            Post it!
          </button>
        </div>
      </form>
    </div>

  )
};

export default PostForm;