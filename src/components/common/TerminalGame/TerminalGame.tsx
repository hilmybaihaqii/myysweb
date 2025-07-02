import React, { useState, useRef, useEffect } from 'react';
import styles from './TerminalGame.module.css';
import { fileSystem } from './gameData';
import type { Directory, File } from './gameData';

const TerminalGame: React.FC = () => {
  const [history, setHistory] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [currentPath, setCurrentPath] = useState<string[]>(['home']);

  const [isProcessing, setIsProcessing] = useState(false);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [unlockedPaths, setUnlockedPaths] = useState<Set<string>>(new Set());

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const homeDir = fileSystem.children.home;
    if (homeDir && homeDir.type === 'directory') {
      const readmeFile = homeDir.children['README.md'];
      if (readmeFile && readmeFile.type === 'file') {
        setHistory([readmeFile.content]);
      }
    }
  }, []);

  const typeOutput = (text: string, onFinished: () => void) => {
    let i = 0;
    let currentLine = '';
    setHistory(prev => [...prev, '']);
    const typingInterval = setInterval(() => {
      if (i < text.length) {
        const char = text.charAt(i);
        if (char === '\n') {
          currentLine = '';
          setHistory(prev => [...prev, '']);
        } else {
          currentLine += char;
          setHistory(prev => {
            const newHistory = [...prev];
            newHistory[newHistory.length - 1] = currentLine;
            return newHistory;
          });
        }
        i++;
      } else {
        clearInterval(typingInterval);
        onFinished();
      }
    }, 20);
  };

  const getDirectoryByPath = (path: string[]): Directory | File | null => {
    let current: Directory | File = fileSystem;
    for (const part of path) {
      if (current.type === 'directory') {
        current = current.children[part];
        if (!current) return null;
      } else {
        return null;
      }
    }
    return current;
  };

  const processCommand = (command: string) => {
    setIsProcessing(true);
    setHistory(prev => [...prev, `> ${command}`]);
    if (command.trim() !== '') {
        setCommandHistory(prev => [command, ...prev]);
    }
    setHistoryIndex(-1);

    const [cmd, ...args] = command.trim().split(' ');
    const newPath = [...currentPath];
    let output = '';

    const currentDirectory = getDirectoryByPath(newPath);

    if (cmd === 'cd') {
      if (args[0] === '..') {
        if (newPath.length > 0) newPath.pop();
      } else {
        const targetName = args[0];
        if (currentDirectory?.type === 'directory') {
          const target = currentDirectory.children[targetName];
          if (target?.type === 'directory') {
            const targetPathString = [...newPath, targetName].join('/');
            if (target.permissions?.read === false && !unlockedPaths.has(targetPathString)) {
              output = `cd: permission denied: ${targetName}`;
            } else {
              newPath.push(targetName);
            }
          } else {
            output = `cd: directory not found: ${targetName || ''}`;
          }
        }
      }
    } else if (cmd === 'ls') {
        if (currentDirectory?.type === 'directory') {
          output = Object.keys(currentDirectory.children)
            .map(key => currentDirectory.children[key].type === 'directory' ? `${key}/` : key)
            .join('  ');
        }
    } else if (cmd === 'cat') {
        if(currentDirectory?.type === 'directory'){
            const file = currentDirectory.children[args[0]];
            if (file?.type === 'file') {
                output = file.content;
            } else {
                output = `cat: file not found: ${args[0] || ''}`;
            }
        }
    } else if (cmd === 'run') {
        const fileToRun = args[0];
        if(currentDirectory?.type === 'directory'){
            const file = currentDirectory.children[fileToRun];
            if (file?.type !== 'file') {
                output = `run: file not found: ${fileToRun}`;
            } else if (fileToRun === 'grant_access.sh') {
                const dataVarPath = 'var/data';
                setUnlockedPaths(prev => new Set(prev).add(dataVarPath));
                output = "Access granted to /var/data. Directory is now readable.";
            } else if (fileToRun === 'core_override') {
                if (args[1] === 'R34CT' && args[2] === 'N0D3' && args[3] === 'J5') {
                    output = `SYSTEM RESTORED. PASSKEYS ACCEPTED.\n\n` +
                             `========================================\n` +
                             `  Congratulations, Operator!         \n` +
                             `  You have successfully averted a    \n` +
                             `  system-wide failure. Your skills   \n` +
                             `  are impressive.                    \n` +
                             `========================================\n\n` +
                             `Thank you for playing!\n- Hilmy Baihaqi`;
                } else {
                    output = "CORE OVERRIDE FAILED. Incorrect passkeys.";
                }
            } else {
                 output = `run: not an executable file: ${fileToRun}`;
            }
        }
    } else if (cmd === 'clear') {
        setHistory([]);
        setIsProcessing(false);
        setCurrentPath(currentPath);
        return;
    } else if (cmd === 'help') {
        output = `Available Commands:\n  ls, cd, cat, run, clear`;
    }
     else {
        output = `Command not found: ${cmd}. Type 'help' for available commands.`;
    }

    setCurrentPath(newPath);

    if (output) {
      typeOutput(output, () => setIsProcessing(false));
    } else {
      setIsProcessing(false);
    }
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInputValue(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInputValue(commandHistory[newIndex]);
      } else {
        setHistoryIndex(-1);
        setInputValue('');
      }
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (isProcessing) return;
      processCommand(inputValue);
      setInputValue('');
    }
  };

  return (
    <div className={styles.terminal} onClick={() => inputRef.current?.focus()}>
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
        {!isProcessing && (
          <div className={styles.inputLine}>
            <span className={styles.prompt}>
              <span className={styles.user}>operator@mainframe</span>:
              <span className={styles.path}>~/{currentPath.join('/')}</span>
              <span className={styles.dollar}>$</span>
            </span>
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleInputKeyDown}
              className={styles.input}
              autoFocus
              spellCheck="false"
              disabled={isProcessing}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default TerminalGame;