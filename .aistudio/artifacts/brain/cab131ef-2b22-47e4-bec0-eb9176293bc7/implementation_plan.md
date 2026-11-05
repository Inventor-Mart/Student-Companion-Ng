# Implementation Plan: GitHub Account Connection & Existing Repository Sync

This guide provides the exact walkthrough for authorizing your GitHub account in Google AI Studio and synchronizing all newly generated curriculum data, subjects, and features to your existing repository.

---

## User Verification & Goal
- **Target Action:** Connect GitHub account through the top-right GitHub panel (as shown in your screenshot) and push code to your existing repository.
- **Current App State:** All 15 JSS 3 2nd Term subjects (over 17,400 lines of verified lesson notes, formulas, and BECE mock exams) and all core app modules are built and ready.

---

## Step 1: Authorize Google AI Studio on GitHub

1. In the **GitHub sync** sidebar shown in your screenshot, click the black **"Create new repository"** button.
2. A secure popup window from GitHub (`github.com/login/oauth/authorize...`) will appear.
3. If not already signed in to GitHub on your browser, enter your GitHub username/email and password.
4. On the **Authorize Google AI Studio** permissions screen:
   - Verify that your target GitHub account (e.g. `Inventor-Mart`) is selected.
   - Click the green **"Authorize Google AI Studio"** button.
5. Once authorized, the popup will close and the AI Studio sidebar will display your connected GitHub profile.

---

## Step 2: Syncing with Your Existing Repository

Google AI Studio's native UI connects directly with your GitHub account:

### Method A: Linking Directly in AI Studio UI
1. After authorization, AI Studio will display repository configuration options.
2. If prompted for repository name, enter the name of your existing repository (e.g., `Student-Companion-Ng`) or choose your target repository from your account list.
3. Choose whether to sync to the `main` branch or a dedicated sync branch.
4. Click **Confirm / Sync**. All workspace files will be committed and synchronized to your GitHub repository automatically.

### Method B: Terminal Git Remote Push (For Exact Control)
If AI Studio creates a fresh synchronization repository or if you want to push all the latest code directly to your existing `Student-Companion-Ng` remote:
1. We can verify git configuration in the workspace.
2. Check existing remotes: `git remote -v`.
3. Add or update the remote origin to your target repository:
   ```bash
   git remote set-url origin https://github.com/<your-username>/<your-repo-name>.git
   ```
4. Commit all new JSS3 subjects, curriculum modules, and assets:
   ```bash
   git add .
   git commit -m "feat: complete JSS 3 2nd Term curriculum across all 15 subjects"
   ```
5. Push to your repository's `main` branch:
   ```bash
   git push -u origin main
   ```

---

## Step 3: Verification
- Verify that your GitHub repository reflects the latest commits.
- Confirm that future changes made in Google AI Studio will automatically sync back and forth with your GitHub repository.
