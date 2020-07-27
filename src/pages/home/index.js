import React from 'react';
import Wrapper from '../wrapper'
function Home() {
  return (
    <Wrapper type="home">
        <main>
            <section id="card">
                <ul>
                    <li>
                        <span></span>
                        <strong>Wanna become Web Developer?</strong>
                    </li>
                    <li>
                        <span></span>
                        <strong>Do you struggling to get great content resources ?</strong>
                    </li>
                    <li>
                        <span></span>
                        <strong>Do you have Basic HTML and CSS Knowledge?</strong>
                    </li>
                </ul>
            </section>
            <section id="primary">
                <h1>Welcome to Web world</h1>
                <p>We have great content to learn web development</p>
                <a href="/blogs">Our Blogs</a>
            </section>
        </main>
    </Wrapper>
  );
}

export default Home;
