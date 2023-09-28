import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Navbar from './Navbar';
import './tailwind.scss';

export default function TailwindcssLayout() {
  return (
    <>
      <Navbar transparent />

      <main>
        <div
          className="relative pt-16 pb-32"
          style={{
            minHeight: '75vh'
          }}>
          <div className="md:container md:mx-auto">
            <Outlet />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
