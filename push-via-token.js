/**
 * Automated GitHub Push Script via Personal Access Token
 * Usage: node push-via-token.js <YOUR_GITHUB_TOKEN>
 */
const git = require('isomorphic-git');
const http = require('isomorphic-git/http/node');
const fs = require('fs');

async function push() {
  const token = process.argv[2] || process.env.GITHUB_TOKEN;
  if (!token) {
    console.log('---------------------------------------------------------');
    console.log('GitHub Personal Access Token required.');
    console.log('Usage: node push-via-token.js <YOUR_GITHUB_TOKEN>');
    console.log('Generate a token at: https://github.com/settings/tokens');
    console.log('Select "repo" scope, copy the token, and run the command.');
    console.log('---------------------------------------------------------');
    process.exit(1);
  }

  console.log('Pushing branch "main" to https://github.com/rishabhpal549-web/avnivo.git ...');

  const pushResult = await git.push({
    fs,
    http,
    dir: __dirname,
    remote: 'origin',
    ref: 'main',
    onAuth: () => ({
      username: token,
      password: '',
    }),
  });

  console.log('Push successfully completed!', pushResult);
}

push().catch(err => {
  console.error('Push failed:', err.message);
  console.log('Make sure the repository "avnivo" is created at https://github.com/new first.');
});

