/**
 * Memory Jar Randomizer & Secret Cards Interactive Logic
 */

class MemoryManager {
  constructor() {
    this.jarMemories = RAKSHA_CONFIG.memoryJar.memories;
    this.usedMemories = [];
    this.initJar();
    this.initCards();
  }

  initJar() {
    const jar = document.getElementById('glass-jar');
    const pickBtn = document.getElementById('btn-pick-memory');
    const popup = document.getElementById('memory-popup');
    const popupText = document.getElementById('memory-popup-text');

    if (!jar || !pickBtn) return;

    const handlePick = () => {
      if (window.soundController) soundController.playChime();

      if (this.usedMemories.length === this.jarMemories.length) {
        this.usedMemories = [];
      }

      let available = this.jarMemories.filter(m => !this.usedMemories.includes(m));
      let randomIndex = Math.floor(Math.random() * available.length);
      let selectedMemory = available[randomIndex];
      this.usedMemories.push(selectedMemory);

      popupText.textContent = selectedMemory;
      popup.classList.remove('show');
      
      setTimeout(() => {
        popup.classList.add('show');
      }, 50);

      // Bounce jar animation
      jar.style.transform = 'scale(0.95)';
      setTimeout(() => {
        jar.style.transform = 'scale(1.05)';
      }, 150);
      setTimeout(() => {
        jar.style.transform = 'scale(1)';
      }, 300);
    };

    jar.addEventListener('click', handlePick);
    pickBtn.addEventListener('click', handlePick);
  }

  initCards() {
    const grid = document.getElementById('unsaid-grid');
    if (!grid) return;
    grid.addEventListener('click', (e) => {
      const card = e.target.closest('.flip-card');
      if (card) {
        if (window.soundController) soundController.playPaperRustle();
        card.classList.toggle('flipped');
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.memoryManager = new MemoryManager();
});
