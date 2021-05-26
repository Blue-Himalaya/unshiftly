import React, { useState, useEffect } from 'react';

const Secret = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    axios.get('/secret', headers: { Authorization: `Bearer ${localStorage.getItem('item')}` })
      .then((res) => {
        setUser(res.user);
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

export default Secret;