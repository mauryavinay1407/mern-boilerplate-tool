// const { spawn } = require('child_process');
// const inquirer = require('inquirer');
// const fs=require('fs-extra');

// async function createProject() {
//   try {
//     // Ask for project name
//     const { projectName } = await inquirer.prompt({
//       type: 'input',
//       name: 'projectName',
//       message: 'Enter project name:',
//       validate: function (input) {
//         if (!input) {
//           return 'Please enter a project name';
//         }
//         return true;
//       }
//     });
//     const ora = await import('ora');
//     const spinnerDir = ora.default('Creating project directories').start();
//     // Create project directory
//     await fs.ensureDir(projectName);
    
//     // Create client and server directories
//     await Promise.all([
//       fs.ensureDir(`${projectName}/client`),
//       fs.ensureDir(`${projectName}/server`)
//     ]);
//     spinnerDir.succeed('Project directories created');
    
    
//     // Initialize client project (React + Vite)
    
//     const spinnerClient = ora.default('Initializing client project').start();
//     await initializeClient(projectName);
//     spinnerClient.succeed('Client Project Initialized');
   

//     // Ask for server language
//     const { serverLanguage } = await inquirer.prompt({
//       type: 'list',
//       name: 'serverLanguage',
//       message: 'Select server language:',
//       choices: ['typescript', 'javascript'],
//       default: 'javascript'
//     });

//     // Initialize server project based on chosen language
//     if (serverLanguage === 'typescript') {
//       const { installGlobally } = await inquirer.prompt({
//                 type: 'confirm',
//                 name: 'installGlobally',
//                 message: 'Do you have TypeScript already? Want to install TypeScript globally?',
//                 default: false
//               });
        
//               if (installGlobally) {
//                 const spinnerTypeScript = ora.default('Installing TypeScript globally').start();
//                 await installTypescriptGlobally();
//                 spinnerTypeScript.succeed('TypeScript installed globally');
//               }
//       const spinnerTsConfig = ora.default('Generating tsconfig.json').start();
//       await initializeTypescript(projectName);
//       spinnerTsConfig.succeed('tsconfig.json generated');
//     }

//     // Initialize server project (npm init -y)
//     const spinnerServer = ora.default('Initializing server project').start();
//     await initializeServer(projectName);
//     spinnerServer.succeed('Server project initialized');

//     console.log('Project created successfully!');
//   } catch (error) {
//     console.error('Error:', error);
//   }
// }

// async function initializeClient(projectName) {
//   const clientProcess = spawn('npm ', ['create',' vite@latest'], {
//     cwd: `${projectName}/client`,
//     stdio: 'inherit',
//     shell: true
//   });

//   await new Promise((resolve, reject) => {
//     clientProcess.on('close', code => {
//       if (code === 0) {
//         // spinnerClient.succeed('Client project initialized');
//         resolve();
//       } else {
//         // spinnerClient.fail('Failed to initialize client project');
//         reject(new Error(`Client project initialization failed with code ${code}`));
//       }
//     });
//   });
// }

// async function installTypescriptGlobally() {
//   const installProcess = spawn('npm', ['install', '-g', 'typescript'], {
//     stdio: 'inherit',
//     shell: true
//   });

//   await new Promise((resolve, reject) => {
//     installProcess.on('close', code => {
//       if (code === 0) {
//         console.log('TypeScript installed globally successfully!');
//         resolve();
//       } else {
//         reject(new Error(`TypeScript installation failed with code ${code}`));
//       }
//     });

//     installProcess.on('error', err => {
//       reject(err);
//     });
//   });
// }

// async function initializeTypescript(projectName) {
//   const serverProcess = spawn('npx', ['tsc', '--init'], {
//     cwd: `${projectName}/server`,
//     stdio: 'inherit',
//     shell: true
//   });

//   await new Promise((resolve, reject) => {
//     serverProcess.on('close', code => {
//       if (code === 0) {
//         console.log(`Now go to: tsconfig.json file
//                          find and Change "rootDit" to "./src"
//                          find and Change  "outDir" to "./dist"`)
//         resolve();
//       } else {
//         reject(new Error(`Server project initialization failed with code ${code}`));
//       }
//     });
//   });
//   await fs.ensureDir(`${projectName}/server/src`);
//   await fs.ensureFile(`${projectName}/server/src/index.ts`);
// }

// async function initializeServer(projectName) {
//   const serverProcess = spawn('npm', ['init', '-y'], {
//     cwd: `${projectName}/server`,
//     stdio: 'inherit',
//     shell: true
//   });

//   await new Promise((resolve, reject) => {
//     serverProcess.on('close', code => {
//       if (code === 0) {
//         resolve();
//       } else {
//         reject(new Error(`Server project initialization failed with code ${code}`));
//       }
//     });
//   });
// }

// module.exports = { createProject };


const { spawn } = require('child_process');
const inquirer = require('inquirer');
const fs = require('fs-extra');

async function createProject() {
  try {
    // Ask for project name
    const { projectName } = await inquirer.prompt({
      type: 'input',
      name: 'projectName',
      message: 'Enter project name:',
      validate: function (input) {
        if (!input) {
          return 'Please enter a project name';
        }
        return true;
      }
    });
    const ora = await import('ora');
    const spinnerDir = ora.default('Creating project directories').start();
    // Create project directory
    await fs.ensureDir(projectName);
    
    // Create client and server directories
    await Promise.all([
      fs.ensureDir(`${projectName}/client`),
      fs.ensureDir(`${projectName}/server`)
    ]);
    spinnerDir.succeed('Project directories created');
    
    
    // Initialize client project (React + Vite)
    
    const spinnerClient = ora.default('Initializing client project').start();
    await initializeClient(projectName);
    spinnerClient.succeed('Client Project Initialized');

    // Ask if the user wants to add Tailwind CSS
    const { addTailwind } = await inquirer.prompt({
      type: 'confirm',
      name: 'addTailwind',
      message: 'Do you want to add Tailwind CSS to the frontend?',
      default: false
    });

    if (addTailwind) {
      const spinnerTailwind = ora.default('Adding Tailwind CSS to frontend').start();
      await addTailwindCSS(projectName);
      spinnerTailwind.succeed('Tailwind CSS added to frontend');
    }

    // Ask for server language
    const { serverLanguage } = await inquirer.prompt({
      type: 'list',
      name: 'serverLanguage',
      message: 'Select server language:',
      choices: ['typescript', 'javascript'],
      default: 'javascript'
    });

    // Initialize server project based on chosen language
    if (serverLanguage === 'typescript') {
      const { installGlobally } = await inquirer.prompt({
                type: 'confirm',
                name: 'installGlobally',
                message: 'Do you have TypeScript already? Want to install TypeScript globally?',
                default: false
              });
        
              if (installGlobally) {
                const spinnerTypeScript = ora.default('Installing TypeScript globally').start();
                await installTypescriptGlobally();
                spinnerTypeScript.succeed('TypeScript installed globally');
              }
      const spinnerTsConfig = ora.default('Generating tsconfig.json').start();
      await initializeTypescript(projectName);
      spinnerTsConfig.succeed('tsconfig.json generated');
    }

    // Initialize server project (npm init -y)
    const spinnerServer = ora.default('Initializing server project').start();
    await initializeServer(projectName);
    spinnerServer.succeed('Server project initialized');

    console.log('Project created successfully!');
  } catch (error) {
    console.error('Error:', error);
  }
}

async function initializeClient(projectName) {
  const clientProcess = spawn('npm', ['create', 'vite@latest','.'], {
    cwd: `${projectName}/client`,
    stdio: 'inherit',
    shell: true
  });

  await new Promise((resolve, reject) => {
    clientProcess.on('close', code => {
      if (code === 0) {
        // spinnerClient.succeed('Client project initialized');
        resolve();
      } else {
        // spinnerClient.fail('Failed to initialize client project');
        reject(new Error(`Client project initialization failed with code ${code}`));
      }
    });
  });
}

async function addTailwindCSS(projectName) {
  // Install Tailwind CSS and its dependencies
  const installProcess = spawn('npm', ['install', '-D', 'tailwindcss', 'postcss', 'autoprefixer'], {
    cwd: `${projectName}/client`,
    stdio: 'inherit',
    shell: true
  });

  await new Promise((resolve, reject) => {
    installProcess.on('close', code => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Failed to install Tailwind CSS with code ${code}`));
      }
    });
  });

  // Initialize Tailwind CSS configuration
  const initProcess = spawn('npx', ['tailwindcss', 'init'], {
    cwd: `${projectName}/client`,
    stdio: 'inherit',
    shell: true
  });

  await new Promise((resolve, reject) => {
    initProcess.on('close', code => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Failed to initialize Tailwind CSS with code ${code}`));
      }
    });
  });

  // Update Tailwind CSS configuration
  const tailwindConfigPath = `${projectName}/client/tailwind.config.js`;
  const tailwindConfig = `
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
  `;
  await fs.writeFile(tailwindConfigPath, tailwindConfig);

  // Add Tailwind CSS directives to the main CSS file
  const cssFilePath = `${projectName}/client/src/index.css`;
  const cssContent = `
@tailwind base;
@tailwind components;
@tailwind utilities;
  `;
  await fs.writeFile(cssFilePath, cssContent);
}

async function installTypescriptGlobally() {
  const installProcess = spawn('npm', ['install', '-g', 'typescript'], {
    stdio: 'inherit',
    shell: true
  });

  await new Promise((resolve, reject) => {
    installProcess.on('close', code => {
      if (code === 0) {
        console.log('TypeScript installed globally successfully!');
        resolve();
      } else {
        reject(new Error(`TypeScript installation failed with code ${code}`));
      }
    });

    installProcess.on('error', err => {
      reject(err);
    });
  });
}

async function initializeTypescript(projectName) {
  const serverProcess = spawn('npx', ['tsc', '--init'], {
    cwd: `${projectName}/server`,
    stdio: 'inherit',
    shell: true
  });

  await new Promise((resolve, reject) => {
    serverProcess.on('close', code => {
      if (code === 0) {
        console.log(`Now go to: tsconfig.json file
                         find and Change "rootDit" to "./src"
                         find and Change  "outDir" to "./dist"`)
        resolve();
      } else {
        reject(new Error(`Server project initialization failed with code ${code}`));
      }
    });
  });
  await fs.ensureDir(`${projectName}/server/src`);
  await fs.ensureFile(`${projectName}/server/src/index.ts`);
}

async function initializeServer(projectName) {
  const serverProcess = spawn('npm', ['init', '-y'], {
    cwd: `${projectName}/server`,
    stdio: 'inherit',
    shell: true
  });

  await new Promise((resolve, reject) => {
    serverProcess.on('close', code => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Server project initialization failed with code ${code}`));
      }
    });
  });
}

module.exports = { createProject };
