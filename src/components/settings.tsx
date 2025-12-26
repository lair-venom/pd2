import { useState } from 'react';
import { X, Search, Check, Settings as SettingsIcon, Skull } from 'lucide-react';

interface Heist {
  name: string;
  approach: string;
}

interface Difficulty {
  name: string;
  skulls: number;
  color: string;
  description: string;
}

interface SettingsProps {
  heists: Heist[];
  difficulties: Difficulty[];
  onClose: () => void;
  onSave: (selectedHeists: string[], selectedDifficulties: string[], oneDownEnabled: boolean) => void;
  initialSelected: string[];
  initialDifficulties: string[];
  initialOneDown: boolean;
}

export default function Settings({ 
  heists, 
  difficulties, 
  onClose, 
  onSave, 
  initialSelected, 
  initialDifficulties,
  initialOneDown 
}: SettingsProps) {
  const [selectedHeists, setSelectedHeists] = useState<Set<string>>(new Set(initialSelected));
  const [selectedDifficulties, setSelectedDifficulties] = useState<Set<string>>(new Set(initialDifficulties));
  const [oneDownEnabled, setOneDownEnabled] = useState<boolean>(initialOneDown);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredHeists = heists.filter(heist =>
    heist.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleHeist = (heistName: string) => {
    const newSelected = new Set(selectedHeists);
    if (newSelected.has(heistName)) {
      newSelected.delete(heistName);
    } else {
      newSelected.add(heistName);
    }
    setSelectedHeists(newSelected);
  };

  const toggleDifficulty = (difficultyName: string) => {
    const newSelected = new Set(selectedDifficulties);
    if (newSelected.has(difficultyName)) {
      newSelected.delete(difficultyName);
    } else {
      newSelected.add(difficultyName);
    }
    setSelectedDifficulties(newSelected);
  };

  const toggleOneDown = () => {
    setOneDownEnabled(!oneDownEnabled);
  };

  const selectAllHeists = () => {
    setSelectedHeists(new Set(heists.map(h => h.name)));
  };

  const deselectAllHeists = () => {
    setSelectedHeists(new Set());
  };

  const selectAllDifficulties = () => {
    setSelectedDifficulties(new Set(difficulties.map(d => d.name)));
  };

  const deselectAllDifficulties = () => {
    setSelectedDifficulties(new Set());
  };

  const handleSave = () => {
    onSave(Array.from(selectedHeists), Array.from(selectedDifficulties), oneDownEnabled);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-3xl max-h-[85vh] bg-[#1e1e24] rounded-2xl border border-orange-500/30 shadow-2xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-orange-500/5"></div>

        <div className="relative">
          <div className="sticky top-0 bg-[#1e1e24]/95 backdrop-blur-sm border-b border-orange-500/20 px-6 py-4 z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-500/10 rounded-lg border border-orange-500/30">
                  <SettingsIcon className="w-6 h-6 text-orange-400" />
                </div>
                <h2 className="text-2xl font-bold text-white">Настройки миссий</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-orange-500/10 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-orange-300" />
              </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-orange-400/50" />
                <input
                  type="text"
                  placeholder="Поиск миссий..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-[#2a2a32] border border-orange-500/20 rounded-lg text-white placeholder-orange-200/30 focus:outline-none focus:border-orange-500/50 transition-colors"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={selectAllHeists}
                  className="px-4 py-2 bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/30 rounded-lg text-orange-300 text-sm font-medium transition-colors whitespace-nowrap"
                >
                  Выбрать все
                </button>
                <button
                  onClick={deselectAllHeists}
                  className="px-4 py-2 bg-[#2a2a32] hover:bg-[#32323a] border border-orange-500/20 rounded-lg text-orange-300 text-sm font-medium transition-colors whitespace-nowrap"
                >
                  Снять все
                </button>
              </div>
            </div>

            <div className="mt-3 flex flex-col gap-2">
              <div className="flex gap-4 text-sm text-orange-300/60">
                <div>Сложности: {selectedDifficulties.size} из {difficulties.length}</div>
                <div>Миссии: {selectedHeists.size} из {heists.length}</div>
              </div>
              <p className="text-xs text-orange-300/50 italic">Нажми кнопку, чтобы получить случайную конфигурацию миссии</p>
            </div>
          </div>

          <div className="overflow-y-auto max-h-[50vh] px-6 py-4 custom-scrollbar space-y-6">
            {/* Настройка "Одно падение" */}
            <div>
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Skull className="w-5 h-5 text-red-400" />
                Дополнительные настройки
              </h3>
              <div className="space-y-4">
                <button
                  onClick={toggleOneDown}
                  className={`group relative flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 w-full ${
                    oneDownEnabled
                      ? 'bg-red-500/10 border-red-500/40 hover:bg-red-500/15'
                      : 'bg-[#2a2a32] border-red-500/10 hover:border-red-500/30 hover:bg-[#2a2a32]/80'
                  }`}
                >
                  <div className={`flex-shrink-0 w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${
                    oneDownEnabled
                      ? 'bg-red-500 border-red-500'
                      : 'border-red-500/30 group-hover:border-red-500/50'
                  }`}>
                    {oneDownEnabled && <Check className="w-4 h-4 text-[#1e1e24]" strokeWidth={3} />}
                  </div>
                  <div className="flex-1 text-left">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-lg text-white">Одно падение</span>
                      {oneDownEnabled && (
                        <span className="px-2 py-0.5 bg-red-500/20 text-red-300 text-xs font-bold rounded-full border border-red-500/30">
                          30% шанс
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="text-sm text-gray-300">Включает шанс выпадения правила "Одно падение" для любой сложности</p>
                      <p className="text-xs text-red-300/60">
                        При активации: после возрождения вы не сможете восстановиться
                      </p>
                    </div>
                  </div>
                  <Skull className={`w-6 h-6 ${oneDownEnabled ? 'text-red-500 fill-red-500/60 animate-pulse' : 'text-gray-500 fill-gray-500/20'}`} />
                </button>
              </div>
            </div>

            <div className="h-px bg-orange-500/20"></div>

            <div>
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                Выберите сложность
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                {difficulties.map((difficulty) => {
                  const isSelected = selectedDifficulties.has(difficulty.name);
                  return (
                    <button
                      key={difficulty.name}
                      onClick={() => toggleDifficulty(difficulty.name)}
                      className={`group relative flex items-center gap-3 p-3 rounded-lg border transition-all duration-200 ${
                        isSelected
                          ? 'bg-orange-500/10 border-orange-500/40 hover:bg-orange-500/15'
                          : 'bg-[#2a2a32] border-orange-500/10 hover:border-orange-500/30 hover:bg-[#2a2a32]/80'
                      }`}
                    >
                      <div className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                        isSelected
                          ? 'bg-orange-500 border-orange-500'
                          : 'border-orange-500/30 group-hover:border-orange-500/50'
                      }`}>
                        {isSelected && <Check className="w-3 h-3 text-[#1e1e24]" strokeWidth={3} />}
                      </div>
                      <div className="flex-1 text-left">
                        <div className="font-medium text-white text-sm">{difficulty.name}</div>
                        <div className="text-xs text-orange-300/50 mt-0.5">{difficulty.description}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
              <div className="flex gap-2 mb-4">
                <button
                  onClick={selectAllDifficulties}
                  className="flex-1 px-3 py-1.5 bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/30 rounded text-orange-300 text-xs font-medium transition-colors"
                >
                  Все сложности
                </button>
                <button
                  onClick={deselectAllDifficulties}
                  className="flex-1 px-3 py-1.5 bg-[#2a2a32] hover:bg-[#32323a] border border-orange-500/20 rounded text-orange-300 text-xs font-medium transition-colors"
                >
                  Снять все
                </button>
              </div>
            </div>

            <div className="h-px bg-orange-500/20"></div>

            <div>
              <h3 className="text-lg font-bold text-white mb-4">Выберите миссии</h3>
              <div className="grid gap-2">
                {filteredHeists.map((heist) => {
                  const isSelected = selectedHeists.has(heist.name);
                  return (
                    <button
                      key={heist.name}
                      onClick={() => toggleHeist(heist.name)}
                      className={`group relative flex items-center gap-3 p-3 rounded-lg border transition-all duration-200 ${
                        isSelected
                          ? 'bg-orange-500/10 border-orange-500/40 hover:bg-orange-500/15'
                          : 'bg-[#2a2a32] border-orange-500/10 hover:border-orange-500/30 hover:bg-[#2a2a32]/80'
                      }`}
                    >
                      <div className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                        isSelected
                          ? 'bg-orange-500 border-orange-500'
                          : 'border-orange-500/30 group-hover:border-orange-500/50'
                      }`}>
                        {isSelected && <Check className="w-3 h-3 text-[#1e1e24]" strokeWidth={3} />}
                      </div>
                      <div className="flex-1 text-left">
                        <div className="font-medium text-white">{heist.name}</div>
                        <div className="text-xs text-orange-300/50 mt-0.5">
                          {heist.approach === 'stealth' ? 'Только скрытность' :
                           heist.approach === 'loud' ? 'Только громко' : 'Любой подход'}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="sticky bottom-0 bg-[#1e1e24]/95 backdrop-blur-sm border-t border-orange-500/20 px-6 py-4">
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 px-6 py-3 bg-[#2a2a32] hover:bg-[#32323a] border border-orange-500/20 rounded-lg text-orange-300 font-medium transition-colors"
              >
                Отмена
              </button>
              <button
                onClick={handleSave}
                disabled={selectedHeists.size === 0 || selectedDifficulties.size === 0}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-[#1e1e24] font-bold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-orange"
              >
                Сохранить
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
