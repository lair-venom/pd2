import Logo from './components/logo';
import Randomizer from './components/randomizer';

function App() {
  return (
    <div className="min-h-screen bg-[#1e1e24] flex flex-col items-center justify-center px-4 py-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-orange-900/5 via-transparent to-orange-900/5"></div>
      <div className="absolute top-10 left-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-orange-600/5 rounded-full blur-3xl animate-pulse-slower"></div>

      <div className="relative z-10 w-full max-w-5xl">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <Logo />
          </div>
          <h1 className="text-5xl font-bold text-white mb-3">PAYDAY 2</h1>
          <p className="text-orange-200/70 text-xl font-light tracking-wide">
            Рандомайзер конфигураций ограблений
          </p>
          <div className="mt-6 h-px bg-gradient-to-r from-transparent via-orange-500/40 to-transparent"></div>
        </div>

        <div className="flex justify-center">
          <Randomizer />
        </div>
      </div>

      <footer className="relative z-10 mt-12 text-center text-orange-200/50 text-base">

      </footer>
    </div>
  );
}

export default App;
