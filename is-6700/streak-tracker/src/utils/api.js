const LOCAL_STORAGE_KEY = "streak_tracker_data";

const initialData = {
  streakGroups: [],
  streakItems: [],
};

const loadData = () => {
  const data = localStorage.getItem(LOCAL_STORAGE_KEY);
  return data ? JSON.parse(data) : initialData;
};

const saveData = (data) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
};

export const api = {
  getStreakGroups: () => {
    const data = loadData();
    return Promise.resolve(data.streakGroups);
  },

  getStreakGroup: (id) => {
    const data = loadData();
    const group = data.streakGroups.find((g) => g.id === id);
    return Promise.resolve(group);
  },

  addStreakGroup: (group) => {
    const data = loadData();
    const newGroup = { ...group, id: Date.now().toString() };
    data.streakGroups = [...data.streakGroups, newGroup];
    saveData(data);
    return Promise.resolve(newGroup);
  },

  updateStreakGroup: (id, updatedGroup) => {
    const data = loadData();
    const index = data.streakGroups.findIndex((g) => g.id === id);
    if (index !== -1) {
      data.streakGroups[index] = { ...updatedGroup, id };
      saveData(data);
    }
    return Promise.resolve(data.streakGroups[index]);
  },

  deleteStreakGroup: (id) => {
    const data = loadData();
    data.streakGroups = data.streakGroups.filter((g) => g.id !== id);
    saveData(data);
    return Promise.resolve();
  },

  getStreakItems: () => {
    const data = loadData();
    return Promise.resolve(data.streakItems);
  },

  getStreakItem: (id) => {
    const data = loadData();
    const item = data.streakItems.find((i) => i.id === id);
    return Promise.resolve(item);
  },

  addStreakItem: (item) => {
    const data = loadData();
    const newItem = { ...item, id: Date.now().toString(), streak: 0 };
    data.streakItems = [...data.streakItems, newItem];
    saveData(data);
    return Promise.resolve(newItem);
  },

  updateStreakItem: (id, updatedItem) => {
    const data = loadData();
    const index = data.streakItems.findIndex((i) => i.id === id);
    if (index !== -1) {
      data.streakItems[index] = { ...updatedItem, id };
      saveData(data);
    }
    return Promise.resolve(data.streakItems[index]);
  },

  deleteStreakItem: (id) => {
    const data = loadData();
    data.streakItems = data.streakItems.filter((i) => i.id !== id);
    saveData(data);
    return Promise.resolve();
  },

  moveStreakItem: (itemId, newGroupId) => {
    const data = loadData();
    const itemIndex = data.streakItems.findIndex((i) => i.id === itemId);
    if (itemIndex !== -1) {
      data.streakItems[itemIndex].groupId = newGroupId;
      saveData(data);
    }
    return Promise.resolve(data.streakItems[itemIndex]);
  },
};
