"use client";

import React, { useState } from 'react';

interface Task {
  id: number;
  text: string;
}

export default function InputPage() {
  // State for Text Mirror
  const [inputText, setInputText] = useState('');

  // State for Selector
  const [selectedTech, setSelectedTech] = useState('');
  const technologies = ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'JavaScript', 'Node.js'];

  // State for Todo List
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState('');

  // Todo List Handlers
  const addTask = () => {
    if (newTask.trim() === '') return;
    const newTaskObj: Task = {
      id: Date.now(),
      text: newTask,
    };
    setTasks([...tasks, newTaskObj]);
    setNewTask('');
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const startEditing = (task: Task) => {
    setEditingId(task.id);
    setEditText(task.text);
  };

  const saveEdit = () => {
    if (editingId !== null && editText.trim() !== '') {
      setTasks(tasks.map(task => 
        task.id === editingId ? { ...task, text: editText } : task
      ));
      setEditingId(null);
      setEditText('');
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText('');
  };

  return (
    <div className="min-h-screen p-8 space-y-12 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-800 text-center mb-12">
        Playground de Inputs
      </h1>

      {/* Section 1: Text Mirror */}
      <section className="bg-white/60 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 p-8 transition-all hover:shadow-2xl">
        <h2 className="text-2xl font-bold text-gray-700 mb-6 flex items-center gap-2">
          Espelho de Texto
        </h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="mirror-input" className="block text-sm font-medium text-gray-600 mb-2">
              Digite algo abaixo:
            </label>
            <input
              id="mirror-input"
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Comece a digitar..."
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all bg-white/80 text-gray-900"
            />
          </div>
          <div className="p-4 bg-blue-50 rounded-xl border border-blue-100 min-h-[60px] flex items-center">
            <p className="text-gray-700 font-medium break-all">
              {inputText || <span className="text-gray-400 italic">O texto aparecerá aqui...</span>}
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Technology Selector */}
      <section className="bg-white/60 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 p-8 transition-all hover:shadow-2xl">
        <h2 className="text-2xl font-bold text-gray-700 mb-6 flex items-center gap-2">
          Seletor de Tecnologia
        </h2>
        <div className="space-y-4">
          <label htmlFor="tech-select" className="block text-sm font-medium text-gray-600 mb-2">
            Escolha uma tecnologia:
          </label>
          <div className="relative">
            <select
              id="tech-select"
              value={selectedTech}
              onChange={(e) => setSelectedTech(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all bg-white/80 appearance-none cursor-pointer text-gray-900"
            >
              <option value="" disabled>Selecione uma opção...</option>
              {technologies.map((tech) => (
                <option key={tech} value={tech}>{tech}</option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-500">
              ▼
            </div>
          </div>
          {selectedTech && (
            <div className="mt-4 p-4 bg-purple-50 rounded-xl border border-purple-100 text-center animate-in fade-in slide-in-from-top-2">
              <span className="text-gray-600">Tecnologia selecionada: </span>
              <span className="text-purple-700 font-bold text-lg">{selectedTech}</span>
            </div>
          )}
        </div>
      </section>

      {/* Section 3: Todo List */}
      <section className="bg-white/60 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 p-8 transition-all hover:shadow-2xl">
        <h2 className="text-2xl font-bold text-gray-700 mb-6 flex items-center gap-2">
          Lista de Tarefas
        </h2>
        
        {/* Add Task Input */}
        <div className="flex gap-3 mb-8">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTask()}
            placeholder="Nova tarefa..."
            className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all bg-white/80 text-gray-900"
          />
          <button
            onClick={addTask}
            disabled={!newTask.trim()}
            className="px-6 py-3 bg-green-500 text-white rounded-xl font-bold hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95 shadow-lg shadow-green-500/20"
          >
            Adicionar
          </button>
        </div>

        {/* Task List */}
        <div className="space-y-3">
          {tasks.length === 0 ? (
            <div className="text-center py-8 text-gray-400 italic bg-gray-50/50 rounded-xl border border-dashed border-gray-200">
              Nenhuma tarefa adicionada ainda.
            </div>
          ) : (
            <ul className="space-y-3 list-none m-0 p-0">
              {tasks.map((task) => (
                <li 
                  key={task.id}
                  className="group flex items-center justify-between p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all"
                >
                  {editingId === task.id ? (
                    <div className="flex-1 flex gap-2 mr-2">
                      <input
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        className="flex-1 px-3 py-1.5 rounded-lg border border-blue-300 focus:ring-2 focus:ring-blue-200 outline-none text-gray-900"
                        autoFocus
                      />
                      <button
                        onClick={saveEdit}
                        className="px-3 py-1 text-sm font-medium text-green-600 hover:bg-green-50 rounded-lg transition-colors border border-green-200"
                        title="Salvar"
                      >
                        Salvar
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="px-3 py-1 text-sm font-medium text-red-500 hover:bg-red-50 rounded-lg transition-colors border border-red-200"
                        title="Cancelar"
                      >
                        Cancelar
                      </button>
                    </div>
                  ) : (
                    <>
                      <span className="text-gray-700 font-medium break-all">{task.text}</span>
                      <div className="flex gap-2 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => startEditing(task)}
                          className="px-3 py-1 text-sm font-medium text-blue-500 hover:bg-blue-50 rounded-lg transition-colors border border-blue-200"
                          title="Editar"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => deleteTask(task.id)}
                          className="px-3 py-1 text-sm font-medium text-red-500 hover:bg-red-50 rounded-lg transition-colors border border-red-200"
                          title="Excluir"
                        >
                          Excluir
                        </button>
                      </div>
                    </>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
}
