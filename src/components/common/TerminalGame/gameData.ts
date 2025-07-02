// file: src/components/common/TerminalGame/gameData.ts

export interface File {
  type: 'file';
  content: string;
}

export interface Directory {
  type: 'directory';
  children: { [key:string]: File | Directory };
  permissions?: {
    read?: boolean;
  };
}

export const fileSystem: Directory = {
  type: 'directory',
  children: {
    'home': {
      type: 'directory',
      children: {
        'README.md': {
          type: 'file',
          content: `
System Security Protocol X-17 Activated.
Unauthorized access detected. Core system files have been fragmented.

Your mission: Find all three (3) passkey fragments and run the 'core_override' program.

Available Commands:
  ls          - List files and directories
  cd [dir]    - Change directory (e.g., 'cd documents')
  cat [file]  - Read file content (e.g., 'cat note.txt')
  run [app]   - Execute a program
  clear       - Clear the terminal screen
  ..          - Go back to the previous directory
  help        - Show this help message

HINT: Start by exploring system logs and configuration files.

Good luck, operator.
`
        },
        'documents': {
          type: 'directory',
          children: {
            'note.txt': {
              type: 'file',
              content: "The first key is the easiest... maybe too easy. I think I saw it in a temporary file somewhere."
            }
          }
        },
        'temp': {
            type: 'directory',
            children: {
                'key_part_A.txt': {
                    type: 'file',
                    content: "PASSKEY_FRAGMENT_ALPHA: R34CT"
                }
            }
        }
      },
    },
    'etc': {
        type: 'directory',
        children: {
            'security.conf': {
                type: 'file',
                content: "SECURITY_LEVEL=MAXIMUM. All access to '/var/data' is restricted. Override requires executable permission."
            },
            'bin': {
                type: 'directory',
                children: {
                    'core_override': {
                        type: 'file',
                        content: "// USAGE: run core_override [key_part_A] [key_part_B] [key_part_C]"
                    },
                    'grant_access.sh': {
                        type: 'file',
                        content: "// This script grants temporary access to protected directories. USAGE: run grant_access.sh"
                    }
                }
            }
        }
    },
    'var': {
        type: 'directory',
        children: {
            'logs': {
                type: 'directory',
                children: {
                    'system.log': {
                        type: 'file',
                        content: "Log entry: Found the second key in a secure location. It's related to a famous ship that sank. Maybe check the data archives?"
                    }
                }
            },
            'data': {
                type: 'directory',
                permissions: { read: false }, // Direktori "terkunci"
                children: {
                    'titanic_manifest.txt': {
                        type: 'file',
                        content: 'PASSKEY_FRAGMENT_BRAVO: N0D3'
                    },
                    'archive': {
                        type: 'directory',
                        children: {
                            'final_clue.txt': {
                                type: 'file',
                                content: "The final piece of the puzzle is hidden in plain sight, right where you started. A true paradox."
                            },
                            'key_part_C.txt': {
                                type: 'file',
                                content: 'PASSKEY_FRAGMENT_CHARLIE: J5'
                            }
                        }
                    }
                }
            }
        }
    }
  },
};