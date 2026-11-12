import { execSync } from 'child_process';
import dotenv from 'dotenv';
dotenv.config();

const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
const repoOwner = 'Inventor-Mart';
const repoName = 'Student-Companion-Ng';
const branch = 'main';

const commitMsg = process.argv.slice(2).join(' ').trim() || `update: synchronize Student Companion [${new Date().toISOString()}]`;

console.log('--- Student Companion Git Push Helper ---');

try {
  // Check for uncommitted changes
  const status = execSync('git status --porcelain', { encoding: 'utf-8' }).trim();
  if (status) {
    console.log('Staging changes...');
    execSync('git add -A', { stdio: 'inherit' });
    console.log(`Committing changes: "${commitMsg}"...`);
    execSync(`git commit -m "${commitMsg.replace(/"/g, '\\"')}"`, { stdio: 'inherit' });
  } else {
    console.log('No uncommitted local changes detected.');
  }

  if (!token) {
    console.warn('\n⚠️ GITHUB_TOKEN is not set in your environment.');
    console.log('To push directly to GitHub, please provide a GitHub Personal Access Token with repo write permissions:');
    console.log('1. Generate a token at: https://github.com/settings/tokens (classic) or fine-grained tokens');
    console.log('2. Add GITHUB_TOKEN="ghp_..." to your environment / secrets panel');
    console.log('3. Or run: GITHUB_TOKEN=ghp_... npm run git:push\n');
    console.log('Local commit was created successfully.');
    process.exit(0);
  }

  console.log(`Pushing to https://github.com/${repoOwner}/${repoName}.git (${branch})...`);
  const authenticatedUrl = `https://${token}@github.com/${repoOwner}/${repoName}.git`;
  execSync(`git push "${authenticatedUrl}" ${branch}`, { stdio: 'inherit' });
  console.log('✅ Successfully pushed to GitHub!');
} catch (error) {
  console.error('❌ Git push failed:', error.message || error);
  process.exit(1);
}
