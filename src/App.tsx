// src/App.tsx
import Navbar from './components/common/Navbar/Navbar';
import Footer from './components/common/Footer/Footer';
import Home from './pages/Home/Home';
import Particles from './components/effects/Particles/Particles';

function App() {
  return (
    <div className="app-container">
      {/* LAPISAN LATAR BELAKANG: Partikel di zIndex: 0 */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
        <Particles
          particleColors={['#ffffff', '#ffffff']}
          particleCount={200}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>

      {/* LAPISAN KONTEN: Semua konten dibungkus dan diletakkan di zIndex: 1 */}
      <div style={{ position: 'relative', zIndex: 3, display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <Navbar />
        <main style={{ paddingTop: '80px', flexGrow: 1 }}>
          <Home />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;