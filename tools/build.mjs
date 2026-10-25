import fs from 'node:fs';
import {execFileSync} from 'node:child_process';
fs.mkdirSync('dist/styles', {recursive:true});
execFileSync(process.execPath, ['node_modules/@tailwindcss/cli/dist/index.mjs', '-i','src/styles/main.css','-o','dist/styles/main.css','--minify'], {stdio:'inherit'});
for (const dir of ['templates','scripts','fonts']) fs.cpSync('src/'+dir,'dist/'+dir,{recursive:true});
fs.copyFileSync('src/fonts.css','dist/fonts.css');
if(fs.existsSync('src/assets')) fs.cpSync('src/assets','dist/assets',{recursive:true});

fs.copyFileSync('src/styles/website.css','dist/styles/website.css');
