#!/bin/sh

# X Algorithm Skill Installer
# Installs the skill for Claude Code and other supported tools

set -e

SKILL_NAME="x-algorithm"
SKILL_URL="https://raw.githubusercontent.com/dylan-buck/x-algorithm-skill/main/src/SKILL.md"

# Get the directory where this script is located
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
LOCAL_SKILL="$SCRIPT_DIR/src/SKILL.md"

echo "Installing X Algorithm skill..."
echo ""

# Detect Claude Code installation
CLAUDE_SKILLS_DIR="$HOME/.claude/skills"

# Create skills directory
mkdir -p "$CLAUDE_SKILLS_DIR/$SKILL_NAME"

# Check if we have a local SKILL.md (bundled with npm package)
if [ -f "$LOCAL_SKILL" ]; then
    echo "Using bundled skill file..."
    cp "$LOCAL_SKILL" "$CLAUDE_SKILLS_DIR/$SKILL_NAME/SKILL.md"
else
    # Download from GitHub
    echo "Downloading skill from GitHub..."
    if command -v curl >/dev/null 2>&1; then
        curl -fsSL "$SKILL_URL" -o "$CLAUDE_SKILLS_DIR/$SKILL_NAME/SKILL.md"
    elif command -v wget >/dev/null 2>&1; then
        wget -q "$SKILL_URL" -O "$CLAUDE_SKILLS_DIR/$SKILL_NAME/SKILL.md"
    else
        echo "Error: Neither curl nor wget found. Please install one of them."
        exit 1
    fi
fi

echo "Installed to: $CLAUDE_SKILLS_DIR/$SKILL_NAME/SKILL.md"

echo ""
echo "Installation complete!"
echo ""
echo "Usage:"
echo "  /x-algorithm         - Get writing guidance"
echo "  /x-algorithm review  - Review a draft"
echo ""
echo "Note: Restart Claude Code to load the new skill."
