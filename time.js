let timestate = {
    totalProgress: 0,
    lastUpdateTime: Date.now()
  };
  
  const baseProgressPerSecond = 1;
  
  function updateProgress(elapsedTime) {
    const progressToAdd = elapsedTime * baseProgressPerSecond;
    timestate.totalProgress += progressToAdd;
    gameState.timestate.totalProgress = timestate.totalProgress;
    console.log(`Added ${progressToAdd} progress. Total progress: ${timestate.totalProgress}`);
  }
  
  const updateInterval = 1000; // 1000 milliseconds = 1 second
  
  // loads timeline
  window.setInterval(() => {
    const { lastUpdateTime } = timestate;
    const currentTime = Date.now();
    const elapsedTime = (currentTime - lastUpdateTime) / 1000; // convert to seconds
    updateProgress(elapsedTime);
    timestate.lastUpdateTime = currentTime;
    console.log(timestate.totalProgress);
  }, updateInterval);
  