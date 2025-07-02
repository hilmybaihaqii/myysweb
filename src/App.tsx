// src/App.tsx (Versi Final dengan perbaikan)

import { Outlet } from 'react-router-dom';
import { ReactLenis } from 'lenis/react'; // <-- 1. PERBAIKI BARIS INI
import { useIsMobile } from './hooks/useIsMobile'; 

import Navbar from './components/common/Navbar/Navbar';
import Footer from './components/common/Footer/Footer';
import Particles from './components/effects/Particles/Particles';
import ClickSpark from './components/effects/ClickSpark/ClickSpark';

function App() {
  const isMobile = useIsMobile();

  const appLayout = (
    <div className="app-container">
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
      <ClickSpark
        sparkColor="#673ab7"
        sparkCount={15}
        sparkRadius={25}
      >
        <div style={{ position: 'relative', zIndex: 3, display: 'flex', flexDirection: 'column', minHeight: '100vh', flexGrow: 1 }}>
          <Navbar />
          <main style={{ flexGrow: 1 }}>
            <Outlet />
          </main>
          <Footer />
        </div>
      </ClickSpark>
    </div>
  );

  return (
    <>
      {isMobile ? (
        appLayout
      ) : (
        // Kode ini sudah benar dan tidak perlu diubah
        <ReactLenis root>
          {appLayout}
        </ReactLenis>
      )}
    </>
  );
}

export default App;