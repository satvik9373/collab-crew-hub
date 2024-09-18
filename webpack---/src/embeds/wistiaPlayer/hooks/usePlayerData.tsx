import { ComponentChildren, createContext, h, JSX } from 'preact';
import { useContext } from 'preact/hooks';
import type { EmbedOptions, MediaData } from '../../../types/player-api-types.ts';

type PlayerDataContextType = {
  embedOptions: EmbedOptions;
  mediaData: MediaData;
};

const PlayerDataContext = createContext<PlayerDataContextType | null>(null);

export const PlayerDataProvider = ({
  children,
  embedOptions,
  mediaData,
}: {
  children: ComponentChildren;
  embedOptions: EmbedOptions;
  mediaData: MediaData;
}): JSX.Element | null => {
  return (
    <PlayerDataContext.Provider
      value={{
        embedOptions,
        mediaData,
      }}
    >
      {children}
    </PlayerDataContext.Provider>
  );
};

export const usePlayerData = (): PlayerDataContextType => {
  const context = useContext(PlayerDataContext);
  if (context == null) {
    throw new Error('usePlayerData must be used within a PlayerDataProvider');
  }
  return context;
};
