// src/main.tsx (Versi Baru dengan Router)

import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Impor komponen-komponen yang akan menjadi halaman
import App from './App.tsx';
import Home from './pages/Home/Home.tsx';
import GamePage from './pages/GamePage/GamePage.tsx'; // Halaman baru yang kita buat

import './styles/global.css'; // Asumsi ini adalah file CSS global Anda

// 1. Definisikan semua rute/halaman di sini
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // App.tsx akan menjadi layout utama (template)
    children: [
      {
        index: true, // Ini adalah halaman default saat path adalah '/'
        element: <Home />,
      },
      {
        path: 'games', // Halaman ini akan diakses melalui '/games'
        element: <GamePage />,
      },
    ],
  },
]);

// 2. Render aplikasi menggunakan RouterProvider
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);