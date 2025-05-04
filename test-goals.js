// Script to add test goals to localStorage
const testGoals = [
  {
    id: 1,
    name: "Go to the gym",
    desc: "Workout for at least 45 minutes",
    freq: 3,
    importance: "High",
    completed: false
  },
  {
    id: 2,
    name: "Drink 8 glasses of water",
    desc: "Stay hydrated throughout the day",
    freq: 7,
    importance: "Medium",
    completed: true
  },
  {
    id: 3,
    name: "Meditate",
    desc: "Practice mindfulness for 10 minutes",
    freq: 5,
    importance: "Low",
    completed: false
  },
  {
    id: 4,
    name: "Read a book",
    desc: "",
    freq: 2,
    importance: "Medium",
    completed: false
  }
];

// Save to localStorage
localStorage.setItem('goals', JSON.stringify(testGoals));
console.log('Test goals added to localStorage!');