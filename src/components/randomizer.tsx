import { useState, useEffect } from 'react';
import { Dices, Target, Shield, Volume2, Skull, Home, Settings as SettingsIcon } from 'lucide-react';
import Settings from './settings';
import { heists, type Heist } from '../data/heists';

const difficulties = [
  {
    name: 'Нормально',
    skulls: 0,
    color: 'green',
    description: 'Базовая сложность'
  },
  {
    name: 'Сложно',
    skulls: 1,
    color: 'yellow',
    description: 'Повышенная сложность'
  },
  {
    name: 'Очень сложно',
    skulls: 2,
    color: 'orange',
    description: 'Серьезный вызов'
  },
  {
    name: 'OVERKILL',
    skulls: 3,
    color: 'red',
    description: 'Опасный уровень'
  },
  {
    name: 'Хаос',
    skulls: 4,
    color: 'red',
    description: 'Полный хаос'
  },
  {
    name: 'Жажда смерти',
    skulls: 5,
    color: 'red',
    description: 'Почти невозможно'
  },
  {
    name: 'Смертный приговор',
    skulls: 6,
    color: 'red',
    description: 'Вам пиздец'
  }
];

const approaches = [
  { name: 'Скрытность', icon: 'shield', value: 'stealth' },
  { name: 'Громко', icon: 'volume', value: 'loud' },
  { name: 'Любой', icon: 'home', value: 'any' }
];

type Result = {
  difficulty: { name: string; skulls: number; color: string; description: string };
  heist: Heist;
  approach: { name: string; icon: string; value: string };
  isOneDown: boolean;
};

const STORAGE_KEY = 'payday2-selected-heists';
const STORAGE_KEY_DIFFICULTIES = 'payday2-selected-difficulties';
const STORAGE_KEY_ONE_DOWN = 'payday2-one-down-enabled';

interface RandomizerProps {
  onSettingsToggle: (isOpen: boolean) => void;
}

export default function Randomizer({ onSettingsToggle }: RandomizerProps) {
  const [result, setResult] = useState<Result | null>(null);
  const [isRolling, setIsRolling] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [selectedHeists, setSelectedHeists] = useState<string[]>([]);
  const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>([]);
  const [showOneDownEffect, setShowOneDownEffect] = useState(false);
  const [oneDownEnabled, setOneDownEnabled] = useState(false);

  useEffect(() => {
    // Загрузка сохраненных миссий
    const storedHeists = localStorage.getItem(STORAGE_KEY);
    if (storedHeists) {
      try {
        const parsed = JSON.parse(storedHeists);
        setSelectedHeists(parsed);
      } catch {
        setSelectedHeists(heists.map(h => h.name));
      }
    } else {
      setSelectedHeists(heists.map(h => h.name));
    }

    // Загрузка сохраненных сложностей
    const storedDifficulties = localStorage.getItem(STORAGE_KEY_DIFFICULTIES);
    if (storedDifficulties) {
      try {
        const parsed = JSON.parse(storedDifficulties);
        setSelectedDifficulties(parsed);
      } catch {
        setSelectedDifficulties(difficulties.map(d => d.name));
      }
    } else {
      setSelectedDifficulties(difficulties.map(d => d.name));
    }

    // Загрузка настройки "Одно падение"
    const storedOneDown = localStorage.getItem(STORAGE_KEY_ONE_DOWN);
    if (storedOneDown !== null) {
      setOneDownEnabled(JSON.parse(storedOneDown));
    } else {
      // По умолчанию выключено
      setOneDownEnabled(false);
    }
  }, []);

  const handleSaveSettings = (selected: string[], selectedDiffs: string[], oneDownSetting: boolean) => {
    setSelectedHeists(selected);
    setSelectedDifficulties(selectedDiffs);
    setOneDownEnabled(oneDownSetting);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(selected));
    localStorage.setItem(STORAGE_KEY_DIFFICULTIES, JSON.stringify(selectedDiffs));
    localStorage.setItem(STORAGE_KEY_ONE_DOWN, JSON.stringify(oneDownSetting));
  };

  const handleOpenSettings = () => {
    setShowSettings(true);
    onSettingsToggle(true);
  };

  const handleCloseSettings = () => {
    setShowSettings(false);
    onSettingsToggle(false);
  };

  const randomize = () => {
    if (selectedHeists.length === 0 || selectedDifficulties.length === 0) return;

    setIsRolling(true);
    setResult(null);
    setShowOneDownEffect(false);

    setTimeout(() => {
      const availableDifficulties = difficulties.filter(d => selectedDifficulties.includes(d.name));
      const selectedDifficulty = availableDifficulties[Math.floor(Math.random() * availableDifficulties.length)];
      const selectedApproach = approaches[Math.floor(Math.random() * approaches.length)];

      const availableHeistsList = heists.filter(h => selectedHeists.includes(h.name));
      let filteredHeists = availableHeistsList;

      if (selectedApproach.value !== 'any') {
        filteredHeists = availableHeistsList.filter(h =>
          h.approach === 'any' || h.approach === selectedApproach.value
        );
      }

      if (filteredHeists.length === 0) {
        filteredHeists = availableHeistsList;
      }

      const selectedHeist = filteredHeists[Math.floor(Math.random() * filteredHeists.length)];

      let finalApproach = selectedApproach;
      if (selectedHeist.approach === 'stealth') {
        finalApproach = approaches.find(a => a.value === 'stealth')!;
      } else if (selectedHeist.approach === 'loud') {
        finalApproach = approaches.find(a => a.value === 'loud')!;
      }

      const willHaveOneDown = oneDownEnabled && Math.random() < 0.2;

      const newResult: Result = {
        difficulty: selectedDifficulty,
        heist: selectedHeist,
        approach: finalApproach,
        isOneDown: willHaveOneDown
      };

      setResult(newResult);
      setIsRolling(false);

      // Показываем эффект только если выпало "Одно падение"
      if (willHaveOneDown) {
        setShowOneDownEffect(true);
        setTimeout(() => setShowOneDownEffect(false), 2000);
      }
    }, 1000);
  };

  return (
    <>
      {showOneDownEffect && (
        <div className="fixed inset-0 z-40 pointer-events-none animate-oneDownEffect">
          <div className="absolute inset-0 bg-red-600/30 animate-pulse-fast"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-red-500 text-9xl font-bold animate-shake">
              <Skull className="w-32 h-32 fill-red-500/50 animate-spin-slow" />
            </div>
          </div>
        </div>
      )}

      <div className="w-full max-w-2xl">
        <div className="flex flex-col gap-3 mb-8">
          <button
            onClick={randomize}
            disabled={isRolling || selectedHeists.length === 0 || selectedDifficulties.length === 0}
            className="group relative w-full px-8 py-5 bg-gradient-to-r from-orange-500 to-orange-600 text-[#1e1e24] font-bold text-2xl rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-orange disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute inset-0 bg-orange-400 blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
            <div className="relative flex items-center justify-center gap-3">
              <Dices className={`w-8 h-8 ${isRolling ? 'animate-spin' : ''}`} />
              <span>{isRolling ? 'Роллим...' : 'Случайная миссия'}</span>
            </div>
          </button>

          <button
            onClick={handleOpenSettings}
            className="group relative w-full px-6 py-4 bg-[#2a2a32] hover:bg-[#32323a] border border-orange-500/30 hover:border-orange-500/50 rounded-xl transition-all duration-300 flex items-center justify-center gap-3"
            title="Настройки миссий и сложности"
          >
            <SettingsIcon className="w-6 h-6 text-orange-400 group-hover:rotate-90 transition-transform duration-300" />
            <span className="font-medium text-lg text-orange-300">Настройки</span>
            {oneDownEnabled && (
              <div className="ml-auto flex items-center gap-1.5 px-2 py-1 bg-red-500/20 rounded-full border border-red-500/30">
                <Skull className="w-3.5 h-3.5 text-red-400 fill-red-500/60 animate-pulse" />
                <span className="text-xs font-bold text-red-300">Одно падение</span>
              </div>
            )}
          </button>
        </div>

        {(selectedHeists.length === 0 || selectedDifficulties.length === 0) && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-center">
            <p className="text-red-300">
              {selectedHeists.length === 0 && selectedDifficulties.length === 0
                ? 'Выберите миссии и сложность в настройках'
                : selectedHeists.length === 0
                ? 'Выберите хотя бы одну миссию в настройках'
                : 'Выберите хотя бы одну сложность в настройках'}
            </p>
          </div>
        )}

        {result && (
          <div className="grid gap-4 animate-fadeIn">
            <div className={`group relative bg-[#2a2a32] rounded-xl p-6 border transition-all duration-300 overflow-hidden ${
              result.difficulty.color === 'green' ? 'border-green-500/30 hover:border-green-500/50' :
              result.difficulty.color === 'yellow' ? 'border-yellow-500/30 hover:border-yellow-500/50' :
              result.difficulty.color === 'orange' ? 'border-orange-500/30 hover:border-orange-500/50' :
              'border-red-500/40 hover:border-red-500/60 shadow-lg shadow-red-500/10'
            }`}>
              <div className={`absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                result.difficulty.color === 'green' ? 'from-green-500/5 to-transparent' :
                result.difficulty.color === 'yellow' ? 'from-yellow-500/5 to-transparent' :
                result.difficulty.color === 'orange' ? 'from-orange-500/5 to-transparent' :
                'from-red-500/10 to-transparent'
              }`}></div>
              <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent to-transparent ${
                result.difficulty.color === 'green' ? 'via-green-500' :
                result.difficulty.color === 'yellow' ? 'via-yellow-500' :
                result.difficulty.color === 'orange' ? 'via-orange-500' :
                'via-red-500'
              } opacity-50`}></div>
              <div className="relative flex items-center gap-4">
                <div className={`p-3 rounded-lg border ${
                  result.difficulty.color === 'green' ? 'bg-green-500/10 border-green-500/30' :
                  result.difficulty.color === 'yellow' ? 'bg-yellow-500/10 border-yellow-500/30' :
                  result.difficulty.color === 'orange' ? 'bg-orange-500/10 border-orange-500/30' :
                  'bg-red-500/10 border-red-500/30'
                }`}>
                  <Target className={`w-7 h-7 ${
                    result.difficulty.color === 'green' ? 'text-green-400' :
                    result.difficulty.color === 'yellow' ? 'text-yellow-400' :
                    result.difficulty.color === 'orange' ? 'text-orange-400' :
                    'text-red-400'
                  }`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-gray-300/60 text-xs font-medium uppercase tracking-wider">Сложность</h3>
                    {result.isOneDown && (
                      <div className="flex items-center gap-1.5 px-2 py-1 bg-red-500/20 rounded-full border border-red-500/30">
                        <Skull className="w-3.5 h-3.5 text-red-400 fill-red-500/60 animate-pulse" />
                        <span className="text-xs font-bold text-red-300">Одно падение</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-3 flex-wrap">
                    <p className={`text-2xl font-bold ${
                      result.difficulty.color === 'green' ? 'text-green-300' :
                      result.difficulty.color === 'yellow' ? 'text-yellow-300' :
                      result.difficulty.color === 'orange' ? 'text-orange-300' :
                      'text-red-300'
                    }`}>
                      {result.difficulty.name}
                    </p>
                    <div className="flex gap-1.5">
                      {[...Array(result.difficulty.skulls)].map((_, i) => (
                        <Skull
                          key={i}
                          className={`w-5 h-5 ${
                            result.isOneDown 
                              ? 'text-red-500 fill-red-500/60 animate-pulse' 
                              : result.difficulty.color === 'red' 
                                ? 'text-red-400 fill-red-500/30' 
                                : 'text-gray-400 fill-gray-400/30'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="mt-2">
                    <p className={`text-xs ${
                      result.difficulty.color === 'red' ? 'text-red-400 font-semibold' : 'text-gray-400'
                    }`}>
                      {result.difficulty.description}
                    </p>
                    {result.isOneDown && (
                      <p className="text-xs text-red-300 mt-1">
                        <span className="font-semibold">Одно падение:</span> После возрождения вы не сможете восстановиться
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="group relative bg-[#2a2a32] rounded-xl p-6 border border-blue-500/30 hover:border-blue-500/50 transition-all duration-300 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50"></div>
              <div className="relative flex items-center gap-4">
                <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/30">
                  <Home className="w-7 h-7 text-blue-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-gray-300/60 text-xs font-medium mb-2 uppercase tracking-wider">Ограбление</h3>
                  <p className="text-2xl font-bold text-white mb-3">{result.heist.name}</p>
                  <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-gray-800/50 border border-gray-700">
                    <span className="text-sm text-gray-300">
                      {result.heist.approach === 'stealth' ? 'Только скрытность' :
                       result.heist.approach === 'loud' ? 'Только громко' : 'Любой подход'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="group relative bg-[#2a2a32] rounded-xl p-6 border border-purple-500/30 hover:border-purple-500/50 transition-all duration-300 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50"></div>
              <div className="relative flex items-center gap-4">
                <div className="p-3 bg-purple-500/10 rounded-lg border border-purple-500/30">
                  {result.approach.value === 'stealth' ? (
                    <Shield className="w-7 h-7 text-purple-400" />
                  ) : result.approach.value === 'loud' ? (
                    <Volume2 className="w-7 h-7 text-purple-400" />
                  ) : (
                    <Home className="w-7 h-7 text-purple-400" />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="text-gray-300/60 text-xs font-medium mb-2 uppercase tracking-wider">Выбранный подход</h3>
                  <p className="text-2xl font-bold text-white">{result.approach.name}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {showSettings && (
        <Settings
          heists={heists}
          difficulties={difficulties}
          onClose={handleCloseSettings}
          onSave={handleSaveSettings}
          initialSelected={selectedHeists}
          initialDifficulties={selectedDifficulties}
          initialOneDown={oneDownEnabled}
        />
      )}
    </>
  );
}