import React, { useState, useRef, useEffect } from 'react';
import styles from './TerminalGame.module.css';
import { fileSystem } from '../TerminalGame/gameData';
import type { Directory, File } from '../TerminalGame/gameData';

const TerminalGame: React.FC = () => {
  const [history, setHistory] = useState<string[]>(['Type "help" to see available commands.']);
  const [inputValue, setInputValue] = useState('');
  const [currentPath, setCurrentPath] = useState<string[]>(['home']);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const getDirectoryByPath = (path: string[]): Directory | null => {
    let current: Directory | File = fileSystem;
    for (const part of path) {
      if (current.type === 'directory' && current.children[part]) {
        current = current.children[part];
      } else {
        return null;
      }
    }
    return current.type === 'directory' ? current : null;
  };

  const processCommand = (command: string) => {
    const [cmd, ...args] = command.trim().split(' ');
    const newHistory = [...history, `> ${command}`];
    // PERBAIKAN 1: Menggunakan 'const' karena variabel ini tidak di-reassign
    const newPath = [...currentPath];

    const currentDirectory = getDirectoryByPath(newPath);

    switch (cmd) {
      case 'help':
        newHistory.push(`
Available commands:
  ls - list files and directories
  cd [dir] - change directory (use '..' to go up)
  cat [file] - read file content
  run [file] [arg] - execute a program
  clear - clear the terminal
        `);
        break;
      case 'ls':
        if (currentDirectory) {
          newHistory.push(Object.keys(currentDirectory.children).join('  '));
        }
        break;
      case 'cd':
        if (args[0] === '..') {
          if (newPath.length > 1) newPath.pop();
        } else if (currentDirectory && currentDirectory.children[args[0]]?.type === 'directory') {
          newPath.push(args[0]);
        } else {
          newHistory.push(`cd: no such directory: ${args[0]}`);
        }
        break;
      // PERBAIKAN 2: Menambahkan kurung kurawal untuk membuat block scope baru
      case 'cat': {
        const file = currentDirectory?.children[args[0]];
        if (file?.type === 'file') {
          newHistory.push(file.content);
        } else {
          newHistory.push(`cat: no such file: ${args[0]}`);
        }
        break;
      }
      case 'run':
        if (args[0] === 'password_checker.js') {
            if(args[1] === 'react'){
                 newHistory.push(`
ACCESS GRANTED. Congratulations! You found the secret.

  _   _   _   _   _   _   _   _
 / \\ / \\ / \\ / \\ / \\ / \\ / \\ / \\
( Y | o | u | ' | r | e |   |   )
 \\_/ \\_/ \\_/ \\_/ \\_/ \\_/ \\_/ \\_/
  _   _   _   _   _   _ 
 / \\ / \\ / \\ / \\ / \\ / \\
( H | i | r | e | d | ! )
 \\_/ \\_/ \\_/ \\_/ \\_/ \\_/

Thanks for playing! - Hilmy Baihaqi
                `);
            } else {
                newHistory.push("ACCESS DENIED. Incorrect password.");
            }
        } else {
            newHistory.push(`run: command not found: ${args[0]}`);
        }
        break;
      case 'clear':
        setHistory([]);
        return;
      default:
        newHistory.push(`Command not found: ${cmd}. Type 'help' for a list of commands.`);
    }
    
    setHistory(newHistory);
    setCurrentPath(newPath);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      processCommand(inputValue);
      setInputValue('');
    }
  };

  return (
    <div className={styles.terminal} onClick={() => document.getElementById('terminal-input')?.focus()}>
      <div className={styles.header}>
        <div className={styles.buttons}>
          <span className={`${styles.dot} ${styles.red}`}></span>
          <span className={`${styles.dot} ${styles.yellow}`}></span>
          <span className={`${styles.dot} ${styles.green}`}></span>
        </div>
        <div className={styles.title}>bash -- 80x24</div>
      </div>
      <div className={styles.body}>
        {history.map((line, index) => (
          <pre key={index} className={styles.historyLine}>{line}</pre>
        ))}
        <div className={styles.inputLine}>
          <span className={styles.prompt}>
            <span className={styles.user}>visitor@hilmy.dev</span>:
            <span className={styles.path}>~/{currentPath.join('/')}$</span>
          </span>
          
          {/* PERUBAHAN UTAMA DI SINI */}
          <div className={styles.inputWrapper}>
            {/* 1. Span yang terlihat untuk menampilkan teks */}
            <span className={styles.inputText}>{inputValue}</span>
            
            {/* 2. Input asli yang kita sembunyikan */}
            <input
              id="terminal-input"
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleInputKeyDown}
              className={styles.actualInput} // Class baru untuk input asli
              autoFocus
              spellCheck="false"
            />
          </div>
        </div>
        <div ref={terminalEndRef} />
      </div>
    </div>
  );
};

export default TerminalGame;