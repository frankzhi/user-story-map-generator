import { useState } from 'react';
import { HomePage } from './components/HomePage';
import { StoryMapView } from './components/StoryMapView';
import type { StoryMap } from './types/story';

function App() {
  const [currentStoryMap, setCurrentStoryMap] = useState<StoryMap | null>(null);

  const handleStoryMapGenerated = (storyMap: StoryMap) => {
    setCurrentStoryMap(storyMap);
  };

  const handleBackToHome = () => {
    setCurrentStoryMap(null);
  };

  return (
    <div className="App">
      {currentStoryMap ? (
        <StoryMapView
          storyMap={currentStoryMap}
          onBack={handleBackToHome}
        />
      ) : (
        <HomePage onStoryMapGenerated={handleStoryMapGenerated} />
      )}
    </div>
  );
}

export default App;
