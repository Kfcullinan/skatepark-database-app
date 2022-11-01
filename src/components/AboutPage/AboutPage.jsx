import React from 'react';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <div className="container">
      <div>
        <p>Technologies used:</p>
        <p>React</p>
        <p>React-Redux</p>
        <p>postgresql</p>
        <p>javaScript</p>
        <p>Material Ui</p>
        <p>Node</p>
      </div>
    </div>
  );
}

export default AboutPage;
