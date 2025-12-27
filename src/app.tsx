import { useState } from 'react';
import Logo from './components/logo';
import Randomizer from './components/randomizer';

function App() {
  // Состояние для отслеживания открытия настроек
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

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
          <p className="text-orange-200/70 text-xl font-light tracking-wide">
            Рандомайзер конфигураций ограблений
          </p>
          <div className="mt-6 h-px bg-gradient-to-r from-transparent via-orange-500/40 to-transparent"></div>
        </div>

        <div className="flex justify-center">
          {/* Передаем функцию для обновления состояния настроек */}
          <Randomizer onSettingsToggle={setIsSettingsOpen} />
        </div>
      </div>

      {/* Условный рендеринг иконки Discord */}
      {!isSettingsOpen && (
        <footer className="relative z-10 mt-16 text-center">
          <a
            href="https://discord.gg/u8sEmS3s9b"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center group"
            title="Присоединиться к Discord"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500/30 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative p-3 rounded-full bg-blue-500/10 border border-blue-500/30 hover:border-blue-500/60 group-hover:bg-blue-500/20 transition-all duration-300">
                <svg className="w-6 h-6 text-blue-400 group-hover:text-blue-300 transition-colors duration-300" viewBox="0 0 127.14 96.36" fill="currentColor">
                  <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0A105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a77.15,77.15,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.22,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,55.11,122.33,32.01,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60.55,31,53.88s5-11.8,11.43-11.8c6.34,0,11.4,5.19,11.4,11.85,0,6.67-5,11.81-11.42,11.81Zm42.24,0C78.41,65.69,73.25,60.55,73.25,53.88s5-11.8,11.44-11.8c6.33,0,11.39,5.19,11.39,11.85,0,6.67-5.05,11.81-11.39,11.81Z"/>
                </svg>
              </div>
            </div>
          </a>
        </footer>
      )}
    </div>
  );
}

export default App;