#!/usr/bin/env node

import inquirer from "inquirer";
import path from "path";
import fs from "fs";
import chalk from "chalk";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const GITLAB_CI_FILE = '.gitlab-ci.yml';
const GITHUB_CI_FOLDER = '.github';
const PACKAGE_JSON = 'package.json';
const APP_NAME_PLACEHOLDER = '__APP_NAME__';


const styles = {
  command: (cmd) => chalk.cyan.bold(cmd),
  optionalCommand: (cmd) => chalk.cyan(cmd),
  path: (p) => chalk.gray(p),
  env: (e) => chalk.magenta(e),
  success: (msg) => chalk.green(msg),
  warning: (msg) => chalk.yellow(msg),
  error: (msg) => chalk.red(msg),
  heading: (msg) => chalk.bold(msg)
};

async function createExpressPostgres() {
    console.log(chalk.cyan.bold('Create Express Postgres App'));

    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'appName',
            message: 'What is your app name?',
            default: 'my-express-app',
            validate(input) {
                if (!input.trim()) return "App name cannot be empty";
                return true;
            }
        }, 
        {
            type: 'select',
            name: 'gitProvider',
            message: 'Which Git provider do you want to use?',
            choices: [
                {
                    name: 'github',
                    value: 'github',
                },
                {
                    name: 'gitlab',
                    value: 'gitlab'
                }
            ],
            default: 'github'
        }
    ]);

    // create app
    createApp(answers);
}


function createApp({ appName, gitProvider }) {
    // form absolute path with current directory
    const targetDir = path.join(process.cwd(), appName);
    // Get absolute path for template directory
    const templateDir = path.join(__dirname, "../template");

    if (fs.existsSync(targetDir)) {
        console.log(chalk.red(`Folder with name ${appName} already exists.`));
        process.exit(1);
    }

    copyDir(templateDir, targetDir);

    // handle gitProvider
    // delete .gitlab-ci.yml, if github
    if (gitProvider === 'github') {
        const gitlabPath = path.join(targetDir, GITLAB_CI_FILE);

        if (fs.existsSync(gitlabPath)) {
            fs.rmSync(gitlabPath, {
                recursive: true, force: true
            });
        }
    }

    // remove .github directory which have workflows
    if (gitProvider === 'gitlab') {
        const githubPath = path.join(targetDir, GITHUB_CI_FOLDER);

        if (fs.existsSync(githubPath)) {
            fs.rmSync(githubPath, {
                recursive: true, force: true
            });
        }
    }

    // Renaming project in the package.json
    const pkgPath = path.join(targetDir, PACKAGE_JSON);
    let pkg = fs.readFileSync(pkgPath, 'utf-8');
    // replace app name with user given value or default value.
    pkg = pkg.replace(APP_NAME_PLACEHOLDER, appName);
    // replace content of the pacakge.json
    fs.writeFileSync(pkgPath, pkg);

    console.log(chalk.green('\nExpress Backend initialised successfully!.'));

    console.log(styles.heading('\nNext Steps:\n'));

    console.log(`👉 Go to project directory: ${styles.command(`cd ${appName}`)}`);
    console.log(`👉 Install dependencies: ${styles.command('npm install')}`);
    console.log(`👉 Set .env for development: ${styles.command('cp .env.example .env')}`);
    console.log(`👉 Generate prisma client: ${styles.command('npx prisma generate')}`);
    console.log(`👉 Run the application: ${styles.command('npm run dev')}`);   
}

// recursively copy all files and folder
function copyDir(src, dest) {
    fs.mkdirSync(dest, { recursive: true });

    for (const file of fs.readdirSync(src)) {
        const srcPath = path.join(src, file);
        const destPath = path.join(dest, file);

        if (fs.statSync(srcPath).isDirectory()) {
            copyDir(srcPath, destPath);
            continue
        }

        fs.copyFileSync(srcPath, destPath);
    }
}


createExpressPostgres()
    .catch(console.error);