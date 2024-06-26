import React from 'react'
import '../node_modules/primeflex/primeflex.css';

// COMPONENTS
import Header from "@/components/Header";
import Episodes from './Episodes';
import Location from './Location'
import Character from './Characters';

export default function Home() {
  return (
    <>
      <Header />
      <div className='flex flex-column justify-content-center'>
        <Character />
      </div>
    </>
  );
}
