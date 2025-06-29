// Tipe untuk mendefinisikan struktur file
export interface File {
  type: 'file';
  content: string;
}

export interface Directory {
  type: 'directory';
  children: { [key: string]: File | Directory };
}

// Struktur file sistem dari game kita
export const fileSystem: Directory = {
  type: 'directory',
  children: {
    'home': {
      type: 'directory',
      children: {
        'README.md': {
          type: 'file',
          content: `
Welcome, brave explorer, to the digital labyrinth.
Your goal is to find the secret program and run it.

Available commands:
  ls - list files and directories
  cd [dir] - change directory
  cat [file] - read file content
  clear - clear the terminal

Start by exploring the 'documents' directory. Good luck.
`,
        },
        'documents': {
          type: 'directory',
          children: {
            'note.txt': {
              type: 'file',
              content: "The password is not in a text file. Look for something more... executable.",
            },
          },
        },
        'secret_lair': {
            type: 'directory',
            children: {
                'password_checker.js': {
                    type: 'file',
                    content: `
// To run this file, type: run password_checker.js [password]
// The password is the name of the framework that powers this very portfolio. (lowercase)
`
                }
            }
        }
      },
    },
  },
};