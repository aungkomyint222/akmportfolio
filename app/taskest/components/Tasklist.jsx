'use client'
import React, { useState, useEffect } from 'react';
import { Plus, Play, CheckCircle, Clock, Loader, Trash2, AlertCircle, RefreshCcw} from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { openDB } from "idb";

// =======================
// IndexedDB Helper Functions
// =======================

let dbPromise;

if (typeof window !== "undefined") {
  dbPromise = openDB("TaskManagerDB", 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains("tasks")) {
        db.createObjectStore("tasks", { keyPath: "id" });
      }
    },
  });
}

// Get all tasks
export async function getAllTasks() {
  if (!dbPromise) return [];
  return (await dbPromise).getAll("tasks");
}

// Save all tasks (replace existing)
export async function saveAllTasks(tasks) {
  if (!dbPromise) return;
  const db = await dbPromise;
  const tx = db.transaction("tasks", "readwrite");
  const store = tx.objectStore("tasks");
  await store.clear(); // Clear first
  for (const task of tasks) {
    await store.put(task);
  }
  await tx.done; // Wait for transaction completion
}

// Clear all tasks
export async function clearIndexedDBTasks() {
  if (!dbPromise) return;
  const db = await dbPromise;
  const tx = db.transaction("tasks", "readwrite");
  await tx.objectStore("tasks").clear();
  await tx.done;
}


// =======================
// TaskManager Component
// =======================
const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [activeTab, setActiveTab] = useState('coming');
  const [newTask, setNewTask] = useState({ title: '', duration: '' });
  const [timer, setTimer] = useState(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // Load tasks from IndexedDB and resume any ongoing timer if needed
  useEffect(() => {
    async function loadTasks() {
      try {
        // Fetch tasks from IndexedDB
        const savedTasks = (await getAllTasks()) || [];
    
        if (!savedTasks.length) {
          console.warn("No tasks found in IndexedDB.");
          return;
        }
    
        console.log("Loaded tasks from IndexedDB:", savedTasks);
    
        // Ensure every task has a unique ID
        const tasksWithIds = savedTasks.map(task => ({
          ...task,
          id: task.id || uuidv4(),
        }));
    
        // Avoid unnecessary state updates
        setTasks(prevTasks => {
          const isSame = JSON.stringify(prevTasks) === JSON.stringify(tasksWithIds);
          return isSame ? prevTasks : tasksWithIds;
        });
    
        // Find an ongoing task
        const ongoingTask = tasksWithIds.find(task => task.status === "ongoing" && task.startTime);
        
        if (!ongoingTask) return; // No ongoing task, exit early
    
        // Calculate elapsed time
        const elapsedSeconds = Math.floor(
          (Date.now() - new Date(ongoingTask.startTime).getTime()) / 1000
        );
    
        const totalDurationSeconds = ongoingTask.duration * 60;
        const newTimeLeft = totalDurationSeconds - elapsedSeconds;
    
        if (newTimeLeft <= 0) {
          // If task is already finished, update its status
          setTasks(prev =>
            prev.map(task =>
              task.id === ongoingTask.id
                ? {
                    ...task,
                    timeLeft: 0,
                    status: "done",
                    isRunning: false,
                    endTime: new Date().toISOString(),
                  }
                : task
            )
          );
        } else {
          // Ensure `startTimer` is defined before calling
          if (typeof startTimer === "function") {
            startTimer(ongoingTask.id);
          } else {
            console.error("startTimer function is not available.");
          }
        }
      } catch (error) {
        console.error("Error loading tasks from IndexedDB:", error);
      }
    }
    
    loadTasks();
  }, []);

  // Save tasks to IndexedDB whenever the tasks state changes
  useEffect(() => {
    async function updateDB() {
      await saveAllTasks(tasks);
    }
    updateDB();
  }, [tasks]);

  // Clear the timer when the component unmounts or when the timer reference changes
  useEffect(() => {
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [timer]);

  const addTask = () => {
    if (newTask.title && newTask.duration) {
      const newTaskObj = {
        id: uuidv4(),
        title: newTask.title,
        duration: parseInt(newTask.duration, 10),
        status: 'coming',
        timeLeft: parseInt(newTask.duration, 10) * 60,
        isRunning: false,
      };
      setTasks(prev => [...prev, newTaskObj]);
      setNewTask({ title: '', duration: '' });
    }
  };

  const chooseTask = (taskId) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === taskId
          ? {
              ...task,
              status: 'ongoing',
              timeLeft: task.duration * 60, // Keep timeLeft unchanged until the timer starts
              isRunning: false, // Ensure it's not running yet
            }
          : task
      )
    );
    setActiveTab('ongoing');
  };
  

  const startTimer = (taskId) => {
    if (timer) {
      clearInterval(timer);
    }
  
    // Get the start time when the button is clicked
    const startTime = new Date().toISOString();
  
    setTasks(prev =>
      prev.map(task =>
        task.id === taskId
          ? {
              ...task,
              isRunning: true,
              startTime, // Set the start time here instead
            }
          : task
      )
    );
  
    const interval = setInterval(() => {
      setTasks(prev =>
        prev.map(task => {
          if (task.id === taskId && task.startTime) {
            const elapsedSeconds = Math.floor(
              (Date.now() - new Date(task.startTime).getTime()) / 1000
            );
            const totalDurationSeconds = task.duration * 60;
            const newTimeLeft = totalDurationSeconds - elapsedSeconds;
            if (newTimeLeft <= 0) {
              clearInterval(interval);
              return {
                ...task,
                timeLeft: 0,
                status: 'done',
                isRunning: false,
                endTime: new Date().toISOString()
              };
            }
            return { ...task, timeLeft: newTimeLeft };
          }
          return task;
        })
      );
    }, 1000);
  
    setTimer(interval);
  };
  

  const completeTask = (taskId) => {
    if (timer) {
      clearInterval(timer);
      setTimer(null);
    }
  
    setTasks(prev =>
      prev.map(task => {
        if (task.id === taskId) {
          return {
            ...task,
            status: 'done',
            isRunning: false,
            timeLeft: 0,
            startTime: task.startTime || new Date().toISOString(), // If no startTime, set it now
            endTime: new Date().toISOString()
          };
        }
        return task;
      })
    );
  };
  

  const clearAllTasks = async () => {
    setTasks([]);
    await clearIndexedDBTasks();
    setShowResetConfirm(false);
    if (timer) {
      clearInterval(timer);
      setTimer(null);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const duplicateTask = (taskId) => {
    setTasks(prevTasks => {
      const taskToCopy = prevTasks.find(task => task.id === taskId);
      if (!taskToCopy) return prevTasks;
  
      const newTask = {
        ...taskToCopy,
        id: Date.now(), // Generate a unique ID for the new task
        status: 'coming', // Make it a new "coming" task
        timeLeft: taskToCopy.duration * 60, // Reset timer
        startTime: null,
        endTime: null,
        isRunning: false
      };
  
      return [...prevTasks, newTask]; // Add the new task while keeping the old one
    });
  };
  
  const hasOngoingTask = tasks.some(task => task.status === 'ongoing');

  return (
    <div className="max-w-md mx-auto p-4 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Taskest - plan it easy</h1>
         <button
          onClick={() => setShowResetConfirm(true)}
          className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
          title="Reset all tasks"
        >
          <Trash2 size={20} />
        </button>
      </div>
      <p className="text-sm text-gray-500 text-center mb-6">Task manager + pomodoro timer by Aung Ko Myint</p>
     
      {showResetConfirm && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
          <AlertCircle className="text-red-600" size={20} />
          <p className="text-red-700 flex-1">Are you sure you want to reset all tasks?</p>
          <div className="flex gap-2">
            <button
              onClick={clearAllTasks}
              className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Yes
            </button>
            <button
              onClick={() => setShowResetConfirm(false)}
              className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
            >
              No
            </button>
          </div>
        </div>
      )}
      
      <div className="flex gap-2 mb-6 bg-white p-1 rounded-lg shadow-sm">
        {['done', 'ongoing', 'coming'].map((tab) => (
          <button 
            key={tab}
            className={`flex-1 py-2 px-4 rounded-md transition-colors ${
              activeTab === tab 
                ? 'bg-blue-50 text-blue-600 font-medium' 
                : 'text-gray-600 hover:bg-gray-50'
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'coming' && (
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <input
              className="w-full mb-2 p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
              placeholder="Task"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            />
            <input
              className="w-full mb-2 p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
              placeholder="Duration (mins)"
              type="number"
              value={newTask.duration}
              onChange={(e) => setNewTask({ ...newTask, duration: e.target.value })}
            />
            <button 
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              onClick={addTask}
            >
              <Plus size={20} />
              Add Task
            </button>
          </div>
          
          {tasks.filter(task => task.status === 'coming').map((task) => (
            <div key={task.id} className="bg-white p-4 rounded-lg shadow-sm">
              <div className="text-xl font-medium text-gray-800 mb-2">{task.title}</div>
              <div className="text-gray-600 mb-3 flex items-center gap-2">
                <Clock size={16} />
                {task.duration} mins
              </div>
              {!hasOngoingTask && (
                <button 
                  className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                  onClick={() => chooseTask(task.id)}
                >
                  <Play size={20} />
                  Choose
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {activeTab === 'ongoing' && (
        <div className="space-y-4">
          {tasks.filter(task => task.status === 'ongoing').map((task) => (
            <div key={task.id} className="bg-white p-4 rounded-lg shadow-sm">
              <div className="text-xl font-medium text-gray-800 mb-2">{task.title}</div>
              <div className={`text-3xl font-bold text-center my-4 ${
                task.isRunning ? 'text-blue-600' : 'text-gray-700'
              }`}>
                {task.isRunning && (
                  <Loader className="w-6 h-6 animate-spin inline-block mr-2" />
                )}
                {formatTime(task.timeLeft)}
              </div>
              {!task.isRunning && (
                <button 
                  className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors mb-2 flex items-center justify-center gap-2"
                  onClick={() => startTimer(task.id)}
                >
                  <Play size={20} />
                  Start Timer
                </button>
              )}
              <button 
                className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                onClick={() => completeTask(task.id)}
              >
                <CheckCircle size={20} />
                Complete
              </button>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'done' && (
        <div className="space-y-4">
          {tasks.filter(task => task.status === 'done').map((task) => (
            <div key={task.id} className="bg-white p-4 rounded-lg shadow-sm">
              <div className="text-xl font-medium text-gray-800 mb-2">{task.title}</div>
              <div className="text-gray-600 mb-1 flex items-center gap-2">
                <Clock size={16} />
                Duration: {task.duration} mins
              </div>
              <div className="text-sm text-gray-500">
                Started: {new Date(task.startTime).toLocaleTimeString()}
              </div>
              <div className="text-sm text-gray-500">
                Ended: {new Date(task.endTime).toLocaleTimeString()}
              </div>
              
              {/* "Again" button to create a duplicate in "coming" */}
              <button
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors mt-3 flex items-center justify-center gap-2"
                onClick={() => duplicateTask(task.id)}
              >
                <RefreshCcw size={20} />
                Again
              </button>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default TaskManager;
