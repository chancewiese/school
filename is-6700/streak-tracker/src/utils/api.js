const LOCAL_STORAGE_KEY = "streak_tracker_data";

const initialData = {
  streakGroups: [{ id: "general", name: "General" }],
  streakItems: [],
  users: [],
};

const loadData = () => {
  const data = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (data) {
    const parsedData = JSON.parse(data);
    if (!parsedData.streakGroups.some((group) => group.id === "general")) {
      parsedData.streakGroups.unshift({ id: "general", name: "General" });
    }
    return { ...initialData, ...parsedData, users: parsedData.users || [] };
  }
  return initialData;
};

const saveData = (data) => {
  if (!data.streakGroups.some((group) => group.id === "general")) {
    data.streakGroups.unshift({ id: "general", name: "General" });
  }
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
};

export const api = {
  getStreakGroups: () => {
    const data = loadData();
    return Promise.resolve(data.streakGroups);
  },

  clearAllData: () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    return Promise.resolve();
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
    if (id === "general") {
      return Promise.reject(new Error("Cannot delete the General group"));
    }
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
    console.log("All streak items:", data.streakItems);
    const item = data.streakItems.find((i) => i.id === id);
    console.log("Found item:", item);
    return Promise.resolve(item);
  },

  addStreakItem: (item) => {
    const data = loadData();
    const newItem = {
      ...item,
      id: Date.now().toString(),
      streak: 0,
      groupId: item.groupId || "general",
    };
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

  login: (email, password) => {
    const data = loadData();
    const user = data.users.find(
      (u) => u.email === email && u.password === password
    );
    if (user) {
      return Promise.resolve({ ...user, password: undefined });
    } else {
      return Promise.reject(new Error("Invalid email or password"));
    }
  },

  register: (email, password, isAdmin) => {
    const data = loadData();
    if (data.users.some((u) => u.email === email)) {
      return Promise.reject(new Error("Email already exists"));
    }
    const newUser = { id: Date.now().toString(), email, password, isAdmin };
    data.users.push(newUser);
    saveData(data);
    return Promise.resolve({ ...newUser, password: undefined });
  },

  getCurrentUser: () => {
    const data = loadData();
    const currentUser = data.users[0];
    if (currentUser) {
      return Promise.resolve({ ...currentUser, password: undefined });
    }
    return Promise.reject(new Error("No user logged in"));
  },

  logout: () => {
    // Implement logout logic here
    return Promise.resolve();
  },
};
