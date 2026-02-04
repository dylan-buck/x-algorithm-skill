# X Algorithm Skill

https://x-algo-skill.xyz/

Write viral X posts using deep knowledge of the actual recommendation algorithm.

This skill gives Claude Code (and other AI tools) detailed knowledge of how X's "For You" feed algorithm works, enabling it to help you write posts optimized for maximum reach.

## Installation

```bash
npx x-algorithm-skill init
```

Or install globally:

```bash
npm install -g x-algorithm-skill
x-algorithm-skill init
```

## Usage

After installation, use the skill in Claude Code:

### Get Writing Guidance
```
/x-algorithm
```
Displays an overview of the algorithm and guidance for writing viral posts.

### Review a Draft
```
/x-algorithm review

Here's my draft: [your draft]
```
Get algorithm-backed feedback on your draft with specific improvements.

## What's Inside

The skill teaches Claude about:

- **Scoring Signals**: The 19 engagement signals the algorithm predicts (replies, shares, dwell time, etc.) and their relative weights
- **Retrieval & Discovery**: How the two-tower neural network finds relevant posts for users
- **Content Structure**: Optimal formatting for dwell time and engagement
- **Viral Patterns**: 8 proven templates that trigger high-value signals
- **Anti-Patterns**: What gets penalized (engagement bait, rage bait, over-posting)
- **Iteration Framework**: A systematic checklist for improving drafts

## How It Works

X's "For You" feed is powered by:

1. **Phoenix Retrieval**: Two-tower neural network that matches post embeddings to user interest embeddings
2. **Phoenix Ranking**: Grok transformer that predicts 19 engagement probabilities
3. **Weighted Scoring**: Probabilities × weights = final score
4. **Penalties**: Out-of-network penalty, author diversity decay, age filtering

This skill encodes all of this into actionable guidance.

## The Key Insight

The algorithm doesn't care about "engagement" generically. It cares about **specific actions**:

- **High-value**: Replies, DM shares, copy-link shares, dwell time, follows
- **Medium-value**: Likes, retweets, profile clicks
- **Negative**: Not interested, mute, block, report

A post with 50 likes and 20 replies scores better than one with 100 likes and 0 replies.

## Source

This skill is based on analysis of the open-sourced X recommendation algorithm:
- [X For You Feed Algorithm](https://github.com/dylan-buck/claude-x-skill)

## License

MIT
