// src/App.tsx (Versi Final dengan ClickSpark Global)


import { Outlet } from 'react-router-dom';
import Navbar from './components/common/Navbar/Navbar';
import Footer from './components/common/Footer/Footer';
import Particles from './components/effects/Particles/Particles';
import ClickSpark from './components/effects/ClickSpark/ClickSpark'; // 1. Impor ClickSpark

function App() {
  return (
    <div className="app-container">
      {/* LAPISAN LATAR BELAKANG: Partikel (tetap di luar agar tidak terpengaruh klik) */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
        <Particles
          particleColors={['#ffffff', '#ffffff']}
          particleCount={80}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>

      {/* 2. Bungkus seluruh lapisan konten dengan ClickSpark */}
      <ClickSpark
        sparkColor="#673ab7"
        sparkCount={15}
        sparkRadius={25}
      >
        <div style={{ position: 'relative', zIndex: 3, display: 'flex', flexDirection: 'column', minHeight: '100vh', flexGrow: 1 }}>
          <Navbar />
          <main style={{ flexGrow: 1 }}>
            {/* Outlet akan merender Home atau GamePage di dalam area ClickSpark */}
            <Outlet />
          </main>
          <Footer />
        </div>
      </ClickSpark>
    </div>
  );
}

export default App;