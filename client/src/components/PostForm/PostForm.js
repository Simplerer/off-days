import React, { useState } from "react";
import { useMutation } from '@apollo/client';
import { ADD_POST } from "../../utils/mutations";

function PostForm() {

  const [postText, setPostText] = useState('');
  const [characterCount, setCharacterCount] = useState(0);

  const [addPost, { error }] = useMutation(ADD_POST);

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

    <div>
      <h4>Let's keep it short and sweet</h4>
      <p>
        Character Count: {characterCount}/100
        {error && <span>Something went wrong...</span>}
      </p>
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
          <button type="submit">
            Post it!
          </button>
        </div>
      </form>
    </div>

  )
};

export default PostForm;