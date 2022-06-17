import React from 'react';

export function Home() {
  return (
    <div>
      <h1 className='text-3xl font-bold underline'>Path Adviser</h1>
      <p>Welcome to the project "Path Adviser"</p>
      <ul>
        <li>Click <b>Find routes</b> to open form</li>
        <li>Click <b>Cars and drivers</b> to view data</li>
      </ul>

      <img src="https://miro.medium.com/max/1400/1*5aEUYqzcFt-sdj0jjk71cA.jpeg" alt="Path" className='max-w-[40%]' />
    </div>
  );
}
