#!/bin/bash

# Script to add 20 commits before existing git history
# Starting from November 2022

# WARNING: This rewrites git history. Use with caution!
# Make sure to backup your repository before running this script

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}=== Git Historical Commits Adder ===${NC}"
echo -e "${RED}WARNING: This will rewrite git history!${NC}"
echo -e "${YELLOW}Make sure you have a backup of your repository.${NC}"
echo ""
read -p "Do you want to continue? (yes/no): " confirm

if [ "$confirm" != "yes" ]; then
    echo "Operation cancelled."
    exit 0
fi

# Check if we're in a git repository
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    echo -e "${RED}Error: Not a git repository${NC}"
    exit 1
fi

# Create a temporary branch
TEMP_BRANCH="temp-history-rewrite-$(date +%s)"
ORIGINAL_BRANCH=$(git branch --show-current)

echo -e "${GREEN}Creating temporary branch: $TEMP_BRANCH${NC}"

# Get the first commit in the repository
FIRST_COMMIT=$(git rev-list --max-parents=0 HEAD)

# Create an orphan branch to start fresh
git checkout --orphan $TEMP_BRANCH

# Remove all files from staging
git rm -rf . > /dev/null 2>&1

# Define the 20 historical commits with dates
declare -a COMMITS=(
    "2022-11-01:Initial project setup"
    "2022-11-08:Add basic configuration files"
    "2022-11-15:Implement core functionality"
    "2022-11-22:Add documentation structure"
    "2022-11-29:Refactor codebase"
    "2022-12-05:Add unit tests"
    "2022-12-12:Improve error handling"
    "2022-12-19:Update dependencies"
    "2022-12-26:Add logging system"
    "2023-01-02:Performance optimizations"
    "2023-01-09:Implement caching layer"
    "2023-01-16:Add API endpoints"
    "2023-01-23:Security improvements"
    "2023-01-30:Database schema updates"
    "2023-02-06:Add authentication system"
    "2023-02-13:Implement user permissions"
    "2023-02-20:Add data validation"
    "2023-02-27:Code cleanup and refactoring"
    "2023-03-06:Add monitoring tools"
    "2023-03-13:Final optimizations"
)

echo -e "${GREEN}Adding 20 historical commits...${NC}"

# Create the historical commits
for i in "${!COMMITS[@]}"; do
    IFS=':' read -r date message <<< "${COMMITS[$i]}"
    
    # Create a dummy file for each commit
    echo "Commit $((i+1)): $message" > "history-$((i+1)).txt"
    git add .
    
    # Create commit with specific date
    GIT_AUTHOR_DATE="$date 12:00:00" GIT_COMMITTER_DATE="$date 12:00:00" \
        git commit -m "$message" --allow-empty
    
    echo -e "  ✓ Created commit: $message ($date)"
done

echo -e "${GREEN}Rebasing original history onto new commits...${NC}"

# Now cherry-pick all commits from the original branch
git cherry-pick $FIRST_COMMIT^..$ORIGINAL_BRANCH

# Check if cherry-pick was successful
if [ $? -eq 0 ]; then
    echo -e "${GREEN}Successfully rebased history!${NC}"
    echo ""
    echo -e "${YELLOW}To complete the process:${NC}"
    echo "1. Review the new history: git log --oneline"
    echo "2. If satisfied, update your branch: git branch -f $ORIGINAL_BRANCH $TEMP_BRANCH"
    echo "3. Switch back: git checkout $ORIGINAL_BRANCH"
    echo "4. Delete temp branch: git branch -D $TEMP_BRANCH"
    echo "5. Force push to remote (if needed): git push origin $ORIGINAL_BRANCH --force"
    echo ""
    echo -e "${RED}Note: Force pushing will rewrite remote history!${NC}"
else
    echo -e "${RED}Error during rebase. Please resolve conflicts manually.${NC}"
    exit 1
fi