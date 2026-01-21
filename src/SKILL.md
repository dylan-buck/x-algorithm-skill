---
name: x-algorithm
description: Write viral X posts using deep knowledge of the actual recommendation algorithm
version: 1.2.0
author: Claude
invocation: /x-algorithm
---

# X Algorithm Skill

Write viral X posts backed by the actual recommendation algorithm source code. No generic social media advice—every recommendation traces to real algorithm behavior.

## Quick Reference: The Scoring Formula

The algorithm predicts 19 engagement probabilities and combines them into a weighted score:

### High-Value Signals (maximize these)
| Signal | What It Measures | How to Trigger |
|--------|------------------|----------------|
| Reply | Genuine conversation | Ask questions, invite perspectives |
| DM Share | Private sharing | Insider info, niche value |
| Copy Link Share | External sharing | Reference-worthy content |
| Dwell Time | Time spent reading | Depth, formatting, intrigue |
| Follow | New follower conversion | Demonstrate ongoing value |
| Quote | Amplification with commentary | Hot takes worth responding to |

### Medium Signals (good to have)
| Signal | What It Measures |
|--------|------------------|
| Like (favorite) | Basic approval |
| Repost (retweet) | Amplification |
| Click | Link/media engagement |
| Profile Click | Author interest |
| Photo Expand | Image engagement |
| Video Quality View | Video completion |

### Negative Signals (avoid at all costs)
| Signal | What It Causes |
|--------|----------------|
| Not Interested | Score penalty |
| Mute Author | Score penalty |
| Block Author | Severe penalty |
| Report | Severe penalty |

## Usage

### Get Writing Guidance
```
/x-algorithm
```
Displays this overview plus detailed guidance for writing viral posts.

### Review a Draft
```
/x-algorithm review

Here's my draft: [your draft]
```
Get algorithm-backed feedback on your draft with specific improvements.

### Rewrite for Maximum Virality
```
/x-algorithm rewrite

Here's my post: [your post]
```
Get an algorithm-optimized rewrite of your post. Claude will:
- Restructure for maximum dwell time
- Add hooks that trigger replies and shares
- Remove patterns that cause negative signals
- Suggest optimal length and formatting

## The Algorithm in 60 Seconds

1. **Discovery**: Two-tower neural network matches your post embedding to user interest embeddings. Posts similar to what users engaged with get retrieved.

2. **Ranking**: Grok transformer predicts 19 engagement probabilities for each user-post pair. Weighted sum = final score.

3. **Penalties Applied**:
   - Out-of-network posts get a multiplier penalty
   - Repeated authors get diversity penalty (decay factor)
   - Posts older than threshold get filtered

4. **Top-K Selection**: Highest scores win feed positions.

## Key Insight

The algorithm doesn't care about "engagement" generically. It cares about **specific actions**: replies, shares, dwell time. A post that gets 100 likes but no replies scores worse than a post with 50 likes and 20 replies.

Write for the high-value signals: replies, shares, follows. The rest follows.

---

# Scoring Signals Deep Dive

The Phoenix ranking model (Grok transformer) predicts probabilities for 19 engagement actions. These probabilities are multiplied by weights and summed to create the final score.

**Source**: `home-mixer/scorers/weighted_scorer.rs`

## The Scoring Formula

```
final_score = Σ(probability_i × weight_i) + offset
```

Where the offset adjusts for negative signals to ensure scores stay interpretable.

---

## High-Value Positive Signals

These have the highest weights and matter most for virality.

### 1. Reply (`reply_score`)
**What it measures**: Probability user will reply to your post.

**Why it's high-value**: Replies indicate genuine conversation. The algorithm heavily favors posts that spark discussion.

**How to trigger**:
- Ask genuine questions (not rhetorical)
- Make claims that invite pushback
- Share incomplete thoughts that others can build on
- End with "What's your experience with X?"
- Take a position that has valid counterarguments

**Example**: "I've been building in public for 6 months. The hardest part isn't the work—it's the silence. What keeps you going when no one's watching?"

### 2. DM Share (`share_via_dm_score`)
**What it measures**: Probability user will share via Direct Message.

**Why it's high-value**: DM shares indicate private endorsement—the user found your content valuable enough to personally send to someone.

**How to trigger**:
- Share insider knowledge or non-obvious insights
- Create content that's relevant to specific relationships ("send this to your cofounder")
- Make niche-specific content that experts would share with peers
- Provide actionable frameworks or templates

**Example**: "The exact cold email template I used to get meetings with 12 VCs. Saved this from my founder friend who raised $50M."

### 3. Copy Link Share (`share_via_copy_link_score`)
**What it measures**: Probability user will copy the link to share externally.

**Why it's high-value**: External sharing expands reach beyond X. User is essentially becoming a distribution channel.

**How to trigger**:
- Create reference-worthy content (guides, lists, frameworks)
- Make shareable across platforms (Slack, email, Discord)
- Build evergreen content people bookmark
- Strong visuals that work in other contexts

**Example**: "Here's the complete guide to understanding how X's recommendation algorithm works. Bookmark this."

### 4. Dwell Time (`dwell_score` + `dwell_time`)
**What it measures**: How long user spends viewing your post. Two signals: binary "did dwell" and continuous time measurement.

**Why it's high-value**: Dwell time is the strongest signal of genuine interest. Can't be easily gamed.

**How to trigger**:
- Write longer, substantive posts
- Use formatting that encourages reading (line breaks, structure)
- Open with intrigue that demands continuation
- Include dense information worth processing
- Add images that take time to parse

**Example**: Posts with clear hooks that promise value, followed by structured content that delivers.

### 5. Follow Author (`follow_author_score`)
**What it measures**: Probability user will follow you after seeing this post.

**Why it's high-value**: Follow is a commitment signal—user wants more of your content. Extremely strong signal.

**How to trigger**:
- Demonstrate unique expertise
- Promise ongoing value ("I share X insights weekly")
- Show personality that's worth following
- Be clearly passionate about your topic
- End with forward-looking statement

**Example**: "I've spent 10 years studying what makes products go viral. This thread is my entire playbook. Follow for the full series."

### 6. Quote (`quote_score` + `quoted_click_score`)
**What it measures**: Probability user will quote-tweet your post.

**Why it's high-value**: Quote tweets expose your content to entirely new audiences.

**How to trigger**:
- Make claims worth commenting on
- Create templates others can remix
- Share takes that people want to amplify with their own spin
- Provide data or insights worth adding context to

**Example**: Bold industry predictions, contrarian takes, or data visualizations that need expert commentary.

---

## Medium Positive Signals

These contribute positively but with lower weights.

### 7. Like/Favorite (`favorite_score`)
**What it measures**: Basic approval signal.

**How to trigger**: Just be good. Likes are the easiest action.

### 8. Retweet (`retweet_score`)
**What it measures**: Pure amplification without commentary.

**How to trigger**: Create content worth sharing but not worth adding to.

### 9. Click (`click_score`)
**What it measures**: Clicks on links, cards, or expandable content.

**How to trigger**: Include compelling calls to action for links.

### 10. Profile Click (`profile_click_score`)
**What it measures**: User clicked to view your profile.

**How to trigger**: Be interesting enough that people want to know who you are.

### 11. Photo Expand (`photo_expand_score`)
**What it measures**: User expanded an image to view larger.

**How to trigger**: Images with detail worth examining (charts, infographics, screenshots).

### 12. Video Quality View (`vqv_score`)
**What it measures**: Video watched past a quality threshold.

**Note**: Only applies if video duration exceeds `MIN_VIDEO_DURATION_MS` threshold.

**How to trigger**: Hook viewers in first 3 seconds, deliver value throughout.

---

## Negative Signals

These have negative weights—they reduce your score significantly.

### 13. Not Interested (`not_interested_score`)
**What triggers it**: Users clicking "Not interested in this post"

**Impact**: Direct score penalty. The algorithm learns to stop showing your content to similar users.

**How to avoid**:
- Don't spam topics outside your usual content
- Don't post engagement bait
- Don't be repetitive
- Match your content to your audience

### 14. Mute Author (`mute_author_score`)
**What triggers it**: Users muting your account.

**Impact**: Severe penalty. Indicates your content is annoying enough to hide.

**How to avoid**:
- Don't over-post (more than 5-10 posts/day is risky)
- Maintain quality over quantity
- Don't @mention excessively
- Stay in your lane

### 15. Block Author (`block_author_score`)
**What triggers it**: Users blocking your account.

**Impact**: One of the most severe penalties. Indicates your content is unwanted.

**How to avoid**:
- Don't be hostile or aggressive
- Don't harass or pile on
- Don't engage in bad-faith arguments
- Respect boundaries

### 16. Report (`report_score`)
**What triggers it**: Users reporting your posts.

**Impact**: Most severe penalty. Can lead to content removal and account actions.

**How to avoid**:
- Follow platform rules
- Don't post harmful content
- Don't engage in coordinated attacks
- Be authentic

---

## Signal Hierarchy

Based on the code structure and typical ML systems, likely weight ordering:

**Tier 1 (Highest)**: DM Share, Copy Link Share, Reply, Follow
**Tier 2 (High)**: Quote, Dwell Time, Video Quality View
**Tier 3 (Medium)**: Retweet, Like, Profile Click
**Tier 4 (Lower)**: Click, Photo Expand
**Tier 5 (Negative)**: Not Interested < Mute < Block < Report

---

## Practical Takeaways

1. **Replies > Likes**: 10 replies beats 100 likes
2. **Shares are king**: DM and copy-link shares are the highest-value actions
3. **Dwell matters**: Length and structure that keeps people reading
4. **Negative signals are expensive**: One block might cost more than 100 likes
5. **Follow is the ultimate goal**: Indicates lasting value

---

# Retrieval & Discovery

Before posts can be ranked, they must be retrieved. The algorithm uses a two-tower neural network to efficiently find relevant posts from millions of candidates.

**Source**: `phoenix/recsys_retrieval_model.py`

---

## The Two-Tower Architecture

```
┌─────────────────┐          ┌─────────────────┐
│   USER TOWER    │          │ CANDIDATE TOWER │
│                 │          │                 │
│  User Features  │          │  Post Content   │
│       +         │          │       +         │
│  Engagement     │          │  Author Info    │
│    History      │          │                 │
│       ↓         │          │       ↓         │
│  Transformer    │          │     MLP         │
│       ↓         │          │       ↓         │
│  L2 Normalize   │          │  L2 Normalize   │
└────────┬────────┘          └────────┬────────┘
         │                            │
         └──────────┬─────────────────┘
                    │
            Dot Product Similarity
                    ↓
              Top-K Retrieval
```

---

## User Tower (Your Audience)

The User Tower encodes who a user is based on:

### User Features
- Account characteristics (hashed user ID embeddings)
- Account-level features

### Engagement History
The algorithm looks at up to 128 recent interactions:
- Which posts they engaged with
- Which authors they engaged with
- What actions they took (like, reply, share, etc.)
- Which product surface the action happened on (feed, notifications, search)

### Processing
1. All features get embedded into vectors
2. Concatenated and fed through a Grok transformer
3. Output is averaged (mean pooling) and L2-normalized

**Key insight**: Your content's distribution depends entirely on who you've historically attracted and what actions they took.

---

## Candidate Tower (Your Post)

The Candidate Tower encodes each post:

### Post Features
- Post content embeddings (from hash functions)
- Post-level features

### Author Features
- Author embeddings (who wrote it)
- Author characteristics

### Processing
1. Post and author embeddings concatenated
2. Fed through a 2-layer MLP (multilayer perceptron)
3. L2-normalized to unit sphere

**Key insight**: Your post is represented as a point in high-dimensional space. Posts cluster by topic, style, and author.

---

## Similarity Search

Once both towers produce embeddings:

```python
scores = user_representation @ corpus_embeddings.T  # Dot product
top_k_indices = top_k(scores)  # Get highest similarity posts
```

Because both representations are L2-normalized, dot product = cosine similarity.

**Posts get retrieved when their embedding is similar to the user's embedding.**

---

## What This Means for Going Viral

### 1. Align with Engagement Patterns
The algorithm matches posts to users based on engagement history. If users who engage with "startup advice" content have profiles similar to your target audience, write content that aligns with "startup advice" embeddings.

**Practical**: Study what content your ideal audience engages with. Your content should feel similar.

### 2. The Cold Start Problem
New posts have no engagement data. They rely entirely on:
- Post content embedding
- Author embedding (your history)

**Practical**: Your reputation matters. Consistent content builds a strong author embedding.

### 3. Cross-Pollination
When users engage with your post, you get associated with their engagement history. This can expose you to similar users.

**Practical**: Getting engagement from influential users in your niche can spread your content to their similar followers.

---

## In-Network vs Out-of-Network

The algorithm retrieves from two sources:

### In-Network (Thunder)
- Posts from accounts the user follows
- Sub-millisecond lookup (in-memory store)
- No retrieval penalty

### Out-of-Network (Phoenix Retrieval)
- Posts from accounts the user doesn't follow
- Uses two-tower similarity search
- Gets a penalty factor applied

**Source**: `home-mixer/scorers/oon_scorer.rs`

```rust
let updated_score = match c.in_network {
    Some(false) => base_score * OON_WEIGHT_FACTOR,  // Penalty!
    _ => base_score,
};
```

**Practical**: If someone doesn't follow you, your post needs to be significantly better to overcome the out-of-network penalty and appear in their feed.

---

## Author Diversity Penalty

To prevent feeds from being dominated by a single prolific author, there's a diversity penalty.

**Source**: `home-mixer/scorers/author_diversity_scorer.rs`

```rust
fn multiplier(&self, position: usize) -> f64 {
    (1.0 - self.floor) * self.decay_factor.powf(position as f64) + self.floor
}
```

When ranking:
1. Posts sorted by weighted score
2. For each author, position in their posting order tracked
3. First post: full score
4. Second post: score × decay_factor
5. Third post: score × decay_factor²
6. And so on, until hitting a floor

**Practical**: Don't flood the timeline. Spreading posts out or having genuinely diverse content matters.

---

## Age Filter

Posts older than a threshold are filtered out entirely.

**Source**: `home-mixer/filters/age_filter.rs`

```rust
fn is_within_age(&self, tweet_id: i64) -> bool {
    snowflake::duration_since_creation_opt(tweet_id)
        .map(|age| age <= self.max_age)
        .unwrap_or(false)
}
```

**Practical**: Posts have a limited lifespan. Fresh content gets priority.

---

## How to Optimize for Discovery

### 1. Build Consistent Engagement Patterns
- Post consistently in your niche
- Attract the right audience (their history affects your distribution)
- Strong author embedding from consistent topics

### 2. Create "Similar" Content
- Study what performs in your niche
- Match the embedding space of successful content
- Don't try to be everything to everyone

### 3. Earn In-Network Status
- Converting followers is crucial (they see you without OON penalty)
- Focus on follow conversions, not just impressions

### 4. Respect Diversity
- Don't post 20 times a day (diminishing returns)
- Quality over quantity
- Let posts breathe

### 5. Stay Fresh
- Timing matters
- Don't expect evergreen performance
- Publish when your audience is active

---

# Content Structure Optimization

How you structure your post directly impacts engagement signals—especially dwell time, replies, and shares.

---

## The Hook

The first line determines whether anyone reads the rest. Hooks that work:

### 1. The Question Hook
Opens with a genuine question that the reader wants answered.

```
Why do most startups fail in year 2, not year 1?

[Body explaining the answer]
```

**Triggers**: Dwell (curiosity), Reply (people share their theories)

### 2. The Contrarian Hook
Challenges conventional wisdom immediately.

```
The best founders I know don't read business books.

Here's what they do instead:
```

**Triggers**: Quote (people want to add their take), Reply (agreement or pushback)

### 3. The Insight Hook
Leads with a non-obvious observation.

```
I analyzed 500 viral tweets. The #1 pattern surprised me:

They all start with "I" but never say "I think."
```

**Triggers**: Dwell, DM Share (people want to pass along insights)

### 4. The Story Hook
Opens mid-action to pull readers in.

```
"You're fired."

Three words that changed everything. Here's what happened next:
```

**Triggers**: Dwell (narrative tension), Follow (people want more stories)

### 5. The Resource Hook
Promises immediate value.

```
Here's the exact checklist I use before every product launch:
```

**Triggers**: Copy Link Share, DM Share (reference material)

---

## Body Structure

### For Short Posts (< 280 characters)

Single punch format:
1. Hook (50-100 chars)
2. Payoff (rest)

No preamble. No "I was thinking about..." Just value.

**Bad**: "I was thinking the other day about how founders approach hiring..."

**Good**: "Most founders hire for skill. The best hire for slope."

### For Long Posts (280-1000 characters)

Use the HSP structure:
1. **H**ook (1 line)
2. **S**upport (2-4 points)
3. **P**unch (closing line)

```
[Hook - one compelling line]

[Support point 1]
[Support point 2]
[Support point 3]

[Punch - memorable closer or CTA]
```

### For Threads

Each post must stand alone AND continue the story:

1. **Post 1**: Complete thought + hook for more
2. **Posts 2-N**: Build, don't repeat
3. **Final post**: Call to action + summary

Label threads explicitly: "Thread:" or "1/"

---

## Formatting for Dwell Time

### Line Breaks
Every sentence or idea gets its own line. Dense paragraphs kill dwell time.

**Bad**:
```
I spent 5 years studying what makes products successful. The biggest insight was that most founders focus on features when they should focus on distribution. Products don't win on features, they win on reaching the right users.
```

**Good**:
```
I spent 5 years studying what makes products successful.

The biggest insight?

Most founders focus on features.

The best founders focus on distribution.

Products don't win on features.

They win on reaching the right users.
```

### Visual Hierarchy
- Short lines create rhythm
- Longer lines slow readers down (use for important points)
- Questions break monotony
- Single-word lines create emphasis

### Lists Work
```
The 3 things that actually matter:

1. Speed of execution
2. Customer obsession
3. Relentless iteration

Everything else is noise.
```

---

## Optimizing for Specific Signals

### For Replies
- End with a genuine question
- Make it easy to respond
- Leave room for disagreement
- Don't say everything—let others add

```
What's the one thing you wish you knew before starting?

I'll go first: Cash flow matters more than revenue.
```

### For Shares (DM + Copy Link)
- Create reference material
- Be comprehensive enough to bookmark
- Make it niche-specific
- Clear value proposition

```
Complete guide to cold outreach:

[Detailed framework]

Save this. Share it with your sales team.
```

### For Follows
- Demonstrate expertise
- Promise ongoing value
- Show personality
- Be memorable

```
I've spent 10 years in growth. Seen it all.

This thread is everything I learned.

Follow along for the full breakdown:
```

### For Dwell Time
- Intrigue upfront
- Structured body
- Reward attention
- Don't waste words

---

## Media Optimization

### Images
- Charts and data → Photo Expand signal
- Screenshots with context → Dwell + Click
- Memes → Shares (but lower quality)
- Infographics → Copy Link Share

### Videos
- Hook in first 3 seconds (or lose them)
- Must exceed MIN_VIDEO_DURATION_MS for VQV signal
- Captions essential (most watch muted)
- Thumbnail matters for Click signal

### Cards/Links
- Compelling preview text
- Clear value proposition
- Consider that link clicks compete with dwell time

---

## Length Guidelines

| Goal | Optimal Length |
|------|----------------|
| Maximum reach | 71-100 characters |
| Engagement depth | 200-280 characters |
| Authority building | 500-1000 characters |
| Threads | 5-15 posts |

Shorter ≠ better. Match length to purpose.

---

## Common Mistakes

### 1. Burying the Lead
Don't save the best for the end. Most won't get there.

### 2. Self-Referential Openings
"I've been thinking..." No one cares what you've been thinking. Give them the thought.

### 3. Engagement Begging
"Like and RT if you agree!" Triggers Not Interested and Mute signals.

### 4. Dense Blocks
Wall of text = instant scroll past.

### 5. Vague Promises
"This changed everything" means nothing. Be specific.

---

# Hooks & Viral Patterns

Proven templates that trigger high-value engagement signals. Each pattern is optimized for specific algorithm behaviors.

---

## Pattern 1: The Insight Thread

**Best for**: Dwell time, Follows, Quote tweets

Structure:
1. Non-obvious observation as hook
2. Bridge to insights (vary the phrasing—don't always use "Here's what I learned")
3. 2-7 insights (vary the count—not always 3 or 4)
4. Closing that invites continued engagement

**Template variations**:
```
I [did/studied/analyzed] [specific thing] for [time period].

[Varied transition—see options below]

1. [Insight]
2. [Insight]
...

[Natural closer—not always a follow CTA]
```

**Transition options** (rotate these):
- "Nobody talks about this:"
- "The patterns were obvious in hindsight:"
- "What surprised me:"
- "The uncomfortable truth:"
- Skip the transition entirely—just list the insights

**Example 1** (5 items, no explicit follow CTA):
```
Reviewed 200 failed startups for YC last year.

The patterns were obvious in hindsight:

1. They pivoted too late, not too early
2. Cofounder conflicts started before the idea did
3. "Running out of money" was the symptom, never the cause
4. Winners had customers before product
5. The ones who failed fastest recovered fastest

Speed of learning beats everything. That's really it.
```

**Example 2** (2 items, more casual):
```
Spent 6 months interviewing top sales reps.

Two things separated the best from everyone else:

1. They asked better questions than they gave pitches
2. They followed up exactly 3 times, then stopped

That's it. Everything else was noise.
```

**Why it works**: Dense value triggers dwell. Numbered lists are scannable. Varied structure avoids the AI-template feel.

---

## Pattern 2: The Contrarian Take

**Best for**: Replies, Quote tweets, Profile clicks

Structure:
1. Bold claim that challenges consensus
2. Brief explanation (don't over-explain—let people fill in the gaps)
3. Optional: invitation to disagree or a personal note

**Template**:
```
[Conventional wisdom] is wrong.

[One-sentence contrarian position]

[Optional: personal experience or "fight me" energy]
```

**Example 1** (direct, casual):
```
"Work-life balance" assumes work and life are enemies.

Mine aren't. I like what I do.

Some weeks I work 60 hours because I'm excited. Some weeks I work 25 because I'm not. No guilt either way.
```

**Example 2** (with invitation to argue):
```
Networking events are useless.

I've been to hundreds. Met thousands of people. Maybe 3 turned into anything real.

You know what works? Helping people with no expectation of return. That's it.

Tell me I'm wrong.
```

**Why it works**: Disagreement drives replies. Quote tweets add commentary. The imperfect, casual tone makes it feel like a real opinion, not a marketing strategy.

**Warning**: Must be genuine contrarianism you actually believe, not rage bait. Rage bait triggers Block/Mute/Report signals.

---

## Pattern 3: The Resource Post

**Best for**: Copy Link Share, DM Share, Saves

Structure:
1. Clear promise of value (skip words like "ultimate" or "comprehensive"—just state what it is)
2. Practical, scannable content
3. Natural closer (not always "Bookmark this!")

**Template**:
```
[What this is] [optional: personal qualifier]:

[Content as list]

[Casual closer or context]
```

**Example 1** (cold email checklist):
```
Cold email checklist I actually use:

□ Subject line under 6 words
□ First line about them, not you
□ One ask. That's it. One.
□ Under 100 words total
□ Send Tuesday-Thursday morning
□ Follow up once at day 3, then stop

Took me 2 years to figure out what to cut. Hopefully saves you time.
```

**Example 2** (book recommendations, not exactly 3):
```
Books that actually changed how I work:

- "The Mom Test" — stopped me from asking useless questions
- "Working Backwards" — Amazon's process, surprisingly practical
- "Thinking in Bets" — made me less certain and more right

Tried to pick 5. Couldn't justify the other two.
```

**Why it works**: Reference material gets shared externally. The personal touches ("I actually use", "took me 2 years") make it feel earned, not assembled. Varied list lengths avoid the AI-template smell.

---

## Pattern 4: The Curiosity Gap

**Best for**: Dwell time, Click-through, Replies

Structure:
1. Create specific curiosity (be concrete, not clickbaity)
2. Brief delay—don't milk it too long
3. Deliver a satisfying, non-obvious answer
4. Optional: implication or personal take

**Template**:
```
[Specific observation that creates a question]

[Maybe one line of misdirection or setup]

[The reveal]

[What it means—keep this brief]
```

**Example 1** (company insight):
```
Amazon's secret weapon isn't AWS or Prime.

It's a writing culture.

Every major decision starts with a 6-page memo. No slides. No bullet points. Full sentences.

Forces clarity. You can't hide behind vague language when you have to write it all out.

Most companies would never try this. That's the point.
```

**Example 2** (personal discovery):
```
Figured out why my best ideas come in the shower.

Not the water. Not the relaxation.

It's the only time I'm not looking at a screen.

Started taking walks without my phone. Same effect.
```

**Why it works**: Curiosity creates dwell time. The payoff feels earned but not overly theatrical. Personal examples feel more authentic than grandiose reveals.

---

## Pattern 5: The Personal Story

**Best for**: Follows, Dwell time, Emotional resonance

Structure:
1. Start mid-action or with dialogue (skip "So I was..." or "I want to share...")
2. Quick context—just enough to understand
3. The turn or surprise
4. Optional lesson (sometimes the story is enough)

**Template**:
```
"[Dialogue or pivotal moment]"

[Brief context]

[What happened]

[Optional: what you took from it—don't force a lesson if there isn't one]
```

**Example 1** (with lesson):
```
"We're shutting down."

Sent that email to 47 people. Hardest thing I've done.

Expected anger. Got the opposite.

Every single reply thanked me. Not for the job—for being straight with them.

Turns out people forgive failure. They don't forgive being kept in the dark.
```

**Example 2** (no forced lesson):
```
"You're not ready for this role."

Manager said it to me at 24. I was furious.

Quit two weeks later. Started my own thing.

She was right, by the way. Wasn't ready. Did it anyway.

Sometimes that's how it works.
```

**Why it works**: Narrative tension creates dwell. Emotional honesty builds connection. Not forcing a neat lesson makes it feel real.

---

## Pattern 6: The Direct Value

**Best for**: Shares, Replies, Practical engagement

Structure:
1. Immediate actionable content—no preamble
2. Steps or points (vary the number)
3. Brief closer that adds personality

**Template**:
```
[Action verb] [specific outcome]:

[Points—not always 3]

[Brief closer with voice]
```

**Example 1** (2 steps):
```
Better 1:1s with your manager:

1. Come with an agenda (even 3 bullets is fine)
2. Ask "What should I be doing differently?"

Most people show up empty-handed. Don't be most people.
```

**Example 2** (4 steps, different energy):
```
Fix a bad first draft:

- Cut the first paragraph. Your real start is buried.
- Delete every "very" and "really"
- Read it out loud. If you stumble, rewrite that part.
- Sleep on it. Fresh eyes catch everything.

First drafts are supposed to be bad. That's the point.
```

**Why it works**: No friction. Immediate value. Varied structure and a closing line with personality make it feel written by a person, not assembled by a template.

---

## Pattern 7: The Effort Summary

**Best for**: Dwell time, Shares, Follow

The "I did X so you don't have to" phrase works but is overused. Vary it.

Structure:
1. Establish what you did (be specific)
2. Share what you found (vary the number—not always 3)
3. Casual closer

**Template variations**:
```
[What you did]. [What you found]:

[Findings]

[Personal take or casual closer]
```

**Alternative openers** (rotate these):
- "Spent [time] on [thing]. Probably too long. Here's what stuck:"
- "[Did thing]. Most of it was useless. Here's what wasn't:"
- "After [extensive effort], I'd narrow it down to:"

**Example 1** (classic structure, varied count):
```
Read 50 books on negotiation last year.

Most were repetitive. Four ideas actually stuck:

1. The person who cares less has more power
2. "No" isn't the end—it's where the real conversation starts
3. Silence is uncomfortable. Use it.
4. Never split the difference (the book, but also the principle)

Would've been faster to just read that last one.
```

**Example 2** (different framing):
```
Tested 12 different morning routines over 6 months.

Journaling? Didn't stick.
Cold showers? Miserable.
Meditation? Hit or miss.

What worked: not checking my phone for the first hour.

That's it. Everything else was noise I was adding to feel productive.
```

**Why it works**: Establishes authority through demonstrated effort. Saves the reader time. Casual tone makes it feel like advice from a friend, not a content template.

---

## Pattern 8: The Prediction

**Best for**: Quote tweets, Replies, Engagement from experts

Structure:
1. Specific prediction with timeframe
2. Brief reasoning (casual, not corporate)
3. Acknowledgment that you might be wrong

**Template**:
```
[Prediction with specific timeframe]

[Why you think this—conversational, not bullet points of jargon]

[Invite disagreement or set a reminder]
```

**Example 1** (tech prediction):
```
By 2027, most "AI startups" will just be thin wrappers on foundation models.

Not because founders are lazy. Because the models keep getting better, and building your own is expensive.

The winners will be whoever figures out distribution. The tech won't matter.

Might be wrong. Set a reminder and roast me if I am.
```

**Example 2** (industry prediction, more casual):
```
Remote work discourse will be dead in 2 years.

Not because companies will "figure it out." Because everyone will just quietly do whatever works and stop talking about it.

The debate is already exhausting. It'll fade into background noise.

Check back in 2026.
```

**Why it works**: Predictions invite commentary. Acknowledging uncertainty ("might be wrong") makes it feel like a genuine opinion, not a marketing statement. Experts want to weigh in either way.

---

## Combining Patterns

The best posts often combine elements:

- Insight Thread + Personal Story = Authority + Connection
- Contrarian Take + Resource = Bold claim + Proof
- Curiosity Gap + Direct Value = Engagement + Utility

---

## Signal Targeting Summary

| Pattern | Primary Signals |
|---------|-----------------|
| Insight Thread | Dwell, Follow, Quote |
| Contrarian Take | Reply, Quote, Profile Click |
| Resource Post | Copy Link Share, DM Share |
| Curiosity Gap | Dwell, Click |
| Personal Story | Follow, Dwell |
| Direct Value | Share, Reply |
| Effort Summary | Share, Follow, Dwell |
| Prediction | Quote, Reply |

---

# Anti-Patterns: What Gets Penalized

The algorithm has explicit negative signals that reduce your score. Understanding what triggers them is as important as understanding what drives positive engagement.

---

## The Four Negative Signals

From `weighted_scorer.rs`:

```rust
+ Self::apply(s.not_interested_score, p::NOT_INTERESTED_WEIGHT)
+ Self::apply(s.block_author_score, p::BLOCK_AUTHOR_WEIGHT)
+ Self::apply(s.mute_author_score, p::MUTE_AUTHOR_WEIGHT)
+ Self::apply(s.report_score, p::REPORT_WEIGHT)
```

These weights are negative—they subtract from your score.

---

## 1. "Not Interested" Triggers

**What it is**: User clicks "Not interested in this post" from the dropdown menu.

**When users click it**:
- Content feels off-topic for who you usually are
- Engagement bait ("Like if you agree!")
- Repetitive content they've seen before
- Content that feels like spam
- Clickbait that didn't deliver

**The Engagement Farmer Pattern**:
```
STOP SCROLLING

If you don't retweet this, you'll miss out!

Like + RT + Follow for more amazing content!
```

**Why it fails**: Obvious manipulation. Users trained to mark as not interested.

**How to avoid**:
- Stay consistent with your content themes
- Deliver on your hooks
- Don't ask for engagement—earn it
- Vary your content format

---

## 2. Mute Triggers

**What it is**: User mutes your account—your posts no longer appear in their feed.

**When users mute**:
- Over-posting (flooding their feed)
- Off-topic tangents they didn't sign up for
- Excessive self-promotion
- Constant negativity
- Reply-all behavior in threads

**The Reply Guy Pattern**:
```
[On famous person's post]
"Great point! I wrote about this too: [link to own content]"

[On every. single. post.]
```

**Why it fails**: Perceived as clout-chasing. Creates mute reflex.

**The Over-Poster Pattern**:
- 20+ posts per day
- Same topic, slight variations
- Threading when unnecessary
- Cross-posting identical content

**Why it fails**: Feels like spam. Users mute to clean up their feed.

**How to avoid**:
- 3-5 quality posts per day max
- Stay in your lane
- Add value in replies, don't self-promote
- Quality over quantity, always

---

## 3. Block Triggers

**What it is**: User blocks you entirely—severe negative signal.

**When users block**:
- Hostile or aggressive responses
- Bad-faith arguments
- Harassment or pile-ons
- Doxxing or privacy violations
- Persistent unwanted contact

**The Rage Baiter Pattern**:
```
[Intentionally inflammatory take]

"If you disagree, you're part of the problem."

[Attacks anyone who responds]
```

**Why it fails**: Short-term engagement, long-term account damage. Blocks are extremely costly signals.

**How to avoid**:
- Disagree without being disagreeable
- Don't punch down
- Respect when people disengage
- Never make it personal

---

## 4. Report Triggers

**What it is**: User reports your post for violating rules—most severe signal.

**When users report**:
- Obvious rule violations (hate speech, threats, etc.)
- Spam behavior
- Impersonation
- Harassment campaigns
- Misinformation (in some contexts)

**How to avoid**:
- Know and follow platform rules
- When in doubt, don't post
- Err on the side of civil discourse
- Don't join pile-ons

---

## Structural Penalties

Beyond explicit negative signals, the algorithm applies penalties:

### Out-of-Network Penalty

From `oon_scorer.rs`:
```rust
Some(false) => base_score * OON_WEIGHT_FACTOR
```

If someone doesn't follow you, your post must score significantly higher to appear.

**Implication**: Building followers matters. Viral reach is harder than in-network reach.

### Author Diversity Penalty

From `author_diversity_scorer.rs`:
```rust
(1.0 - self.floor) * self.decay_factor.powf(position as f64) + self.floor
```

Multiple posts from you in the same ranking get exponentially discounted.

**Implication**: Spacing out posts matters. Threads count as multiple posts.

### Age Filter

From `age_filter.rs`:
```rust
snowflake::duration_since_creation_opt(tweet_id)
    .map(|age| age <= self.max_age)
```

Posts older than the threshold are filtered out entirely.

**Implication**: Timing matters. Posts have limited shelf life.

### Deduplication Filters

From various filter files:
- `drop_duplicates_filter.rs` - Removes duplicate content
- `retweet_deduplication_filter.rs` - Dedupes retweets
- `previously_seen_posts_filter.rs` - Filters already-seen content

**Implication**: Don't repost the same thing. The algorithm knows.

---

## Behavior Patterns That Get Suppressed

### 1. The Engagement Farmer
- Explicit calls to like/RT/follow
- "Engagement pods" or coordinated liking
- Buying followers/engagement
- Growth hacking tactics

**Why suppressed**: These signals are learned as inauthentic. The model predicts "not interested" responses.

### 2. The Reply Guy
- Commenting on every viral post
- Self-promotional replies
- First-to-respond gaming
- @mentioning celebrities

**Why suppressed**: Low-quality engagement patterns lead to mutes.

### 3. The Thread Maximalist
- Every thought becomes a 20-tweet thread
- Padding threads with unnecessary posts
- "1/" on content that doesn't need threading

**Why suppressed**: Author diversity penalty kicks in. Later posts in thread get discounted.

### 4. The Controversy Farmer
- Intentionally inflammatory takes
- Both-sides-are-wrong hot takes
- Punching down for engagement
- Rage bait framing

**Why suppressed**: Short-term replies, long-term blocks and mutes.

### 5. The Copy-Paste Recycler
- Same content reposted weekly
- Slight variations of the same post
- Cross-posting from other platforms without adaptation

**Why suppressed**: Deduplication and previously-seen filters.

---

## Red Flags Checklist

Before posting, check:

- [ ] Am I explicitly asking for engagement? (remove it)
- [ ] Would I be annoyed seeing this from someone else? (reconsider)
- [ ] Is this the 5th+ post today? (wait)
- [ ] Am I being hostile to anyone? (reframe)
- [ ] Have I posted something similar recently? (don't)
- [ ] Does this deliver on its hook? (must)
- [ ] Would someone unfollow over this? (pause)

---

## Recovery from Negative Signals

If your reach has dropped:

1. **Reduce posting frequency** - Give the algorithm time to recalibrate
2. **Return to core content** - What got you followers originally
3. **Increase quality bar** - Only post what you'd screenshot
4. **Avoid controversial topics** - Rebuild engagement patterns
5. **Focus on high-value signals** - Replies, shares, follows

The algorithm learns from engagement patterns. Consistent positive signals rebuild your standing over time.

---

# Writing Like a Human, Not a Bot

Algorithm optimization means nothing if your posts scream "AI wrote this." The algorithm favors genuine engagement, and users can smell inauthenticity. This section helps you write posts that are both algorithm-optimized AND authentically human.

---

## AI Vocabulary Blacklist

These words instantly signal AI writing. Never use them:

**Corporate buzzwords**:
- "leverage", "utilize", "optimize", "synergy", "stakeholders"
- "robust", "comprehensive", "streamlined", "scalable"
- "cutting-edge", "best-in-class", "world-class"

**AI verbal tics**:
- "Additionally", "Furthermore", "Moreover"
- "crucial", "essential", "vital", "key" (as adjectives before nouns)
- "delve", "dive into", "unpack"
- "landscape", "ecosystem", "space" (for industries)
- "journey", "adventure" (for experiences)
- "tapestry", "myriad", "plethora"
- "multifaceted", "nuanced"
- "paradigm", "paradigm shift"
- "game-changing", "groundbreaking", "transformative", "revolutionary"
- "unlock", "unleash", "empower"
- "pivotal", "pivotal moment"
- "broader implications", "overarching"
- "It's worth noting", "It's important to note"
- "at the end of the day"

**Sycophantic openers** (never start with these):
- "Great question!"
- "Absolutely!"
- "That's a fantastic point!"
- "I love this!"

**Generic positive closers** (never end with these):
- "Success awaits!"
- "The possibilities are endless!"
- "I hope this helps!"
- "Let me know if you have any questions!"

---

## Structural Tells to Avoid

These patterns betray AI writing even when the words are fine:

### The Rule of Three Trap
AI loves exactly three things. Lists of exactly 3 items, 3 points, 3 examples. Real humans sometimes have 2 things to say. Or 4. Or 7.

**AI pattern**:
```
Three things I learned:
1. [Point]
2. [Point]
3. [Point]
```

**Human variation**:
```
Two things stuck with me:
1. [Point]
2. [Point]

(The third thing everyone mentions? Overrated.)
```

### Negative Parallelism
"Not just X, but Y" and "It's not about X, it's about Y" are AI favorites. Overuse makes writing feel formulaic.

**AI pattern**:
```
It's not just about working hard, it's about working smart.
```

**Human alternative**:
```
Working smart beats working hard. Every time.
```

### Significance Inflation
AI loves to make everything sound momentous. "Pivotal moments." "Broader implications." "Fundamental shifts." Real insights don't need inflation.

**AI pattern**:
```
This represents a pivotal moment in the broader landscape of technological transformation with far-reaching implications.
```

**Human alternative**:
```
This changes things.
```

### Em Dash Overuse
Em dashes (—) are fine occasionally. AI uses them constantly for dramatic pauses. If you have more than one em dash per post, cut some.

**AI pattern**:
```
The secret—and this is what most people miss—is that success isn't about talent—it's about consistency.
```

**Human alternative**:
```
The secret is consistency. Most people miss this because they're looking for talent.
```

### Formulaic Transitions
"Here's the thing:", "Here's why:", "Here's what I learned:" — these work but are overused. Vary your transitions or skip them entirely.

**AI pattern**:
```
Here's what most people don't realize:

Here's why this matters:

Here's what you should do:
```

**Human variation**: Just say the thing. Skip the announcement.

### The Perfect Structure
AI posts often have suspiciously clean structure: hook, numbered points, neat conclusion. Real posts meander sometimes. That's okay.

---

## Adding Soul to Your Writing

What makes writing feel human:

### Express Genuine Opinions
AI hedges. Humans commit.

**AI**: "There's something to be said for both approaches, though many would argue that..."

**Human**: "Option B is wrong. I've tried it. Doesn't work."

### Use Contractions
"Do not" sounds robotic. "Don't" sounds human. Same with "it is" vs "it's", "cannot" vs "can't".

### Vary Rhythm Unpredictably
AI tends toward consistent sentence lengths. Humans don't. Short sentence. Then maybe a longer one that goes on for a bit. Then short again. Fragment. Works.

### Include Specific Details
Vague claims feel AI-generated. Specific details feel real.

**AI**: "I've seen many companies struggle with this challenge."

**Human**: "Watched three companies blow $2M+ on this exact mistake last year. One was a client."

### Allow Imperfection
Real posts have:
- Tangents that don't quite connect
- Incomplete thoughts
- Opinions stated too strongly
- Casual asides

**AI** never includes these. That's the tell.

### Write Like You Talk
Read your post out loud. Would you say this to a friend at a bar? If not, rewrite it until you would.

**AI**: "I subsequently realized that the implementation of this methodology yielded superior outcomes."

**Human**: "Tried it. Worked way better than I expected."

---

## Before & After Examples

### Example 1: Insight Post

**AI slop**:
```
I've delved deep into the landscape of productivity optimization.

Here's what I discovered:

1. It's not just about working harder, it's about working smarter
2. The key is to leverage your peak energy hours
3. Additionally, robust systems beat motivation every time

This transformative insight has unlocked unprecedented results.

I hope this helps! Let me know your thoughts!
```

**Human version**:
```
Spent years thinking I had a motivation problem.

Turns out I had a systems problem.

Now I don't rely on feeling like working. I just have routines that happen whether I want them to or not.

8am: write. No negotiating.
10am: meetings batched.
2pm: deep work block.

Boring? Yes. Works? Also yes.
```

### Example 2: Contrarian Take

**AI slop**:
```
Unpopular opinion: The conventional wisdom around work-life balance is fundamentally flawed.

Here's the thing—it's not about balance at all. It's about integration.

This paradigm shift has been truly transformative for my journey.

What are your thoughts on this crucial topic?
```

**Human version**:
```
"Work-life balance" assumes work and life are enemies.

Mine aren't. I like what I do. Sometimes I work at 10pm because I want to, not because I have to. Sometimes I take Tuesday off to go skiing.

The goal isn't equal hours. It's not resenting either side.
```

### Example 3: Resource Post

**AI slop**:
```
I've curated the ultimate comprehensive guide to cold outreach!

Here are the crucial elements:

1. Personalization is key
2. Keep it concise
3. Follow up strategically

These robust strategies will unlock your outreach potential!

Like and repost if you found this valuable!
```

**Human version**:
```
Cold email template that actually works (used this for 3 years):

Subject: quick question

[Name]—saw your [specific thing]. [One genuine observation].

I'm working on [relevant thing]. Think you might have thoughts.

Worth a 15-min call this week?

That's it. 23% reply rate. No tricks.
```

### Example 4: Story Post

**AI slop**:
```
I want to share a pivotal moment from my entrepreneurial journey.

The day my startup failed was transformative. Here's what I learned:

1. Failure is not the end—it's a crucial learning opportunity
2. Resilience is key to long-term success
3. Every setback contains the seeds of future growth

This experience fundamentally shifted my paradigm.

Grateful for this journey! 🙏
```

**Human version**:
```
"We're out of money."

Said it to my cofounder over bad coffee at a Denny's. We'd been avoiding the conversation for weeks.

She just nodded. We both knew.

The weird part? Relief. The uncertainty was worse than the answer.

Took me six months to start something new. Took her two weeks. We're both fine now.

No lesson here really. Just: it ends. And then something else starts.
```

---

## Quick Humanization Checklist

Before posting, check:

- [ ] Zero words from the AI blacklist?
- [ ] Varied list lengths (not always 3)?
- [ ] No more than one em dash?
- [ ] Using contractions naturally?
- [ ] At least one specific detail?
- [ ] Would you actually say this out loud?
- [ ] Something slightly imperfect or casual?
- [ ] No sycophantic opener or generic closer?

If any answer is no, rewrite that part.

---

# Iteration Framework

A systematic approach to improving drafts before posting. Run every draft through this checklist to optimize for the algorithm.

---

## The 6-Point Signal Audit

For each draft, evaluate against these six categories:

### 1. Reply Test
**Question**: Will people want to respond to this?

**Check**:
- [ ] Contains a genuine question (not rhetorical)
- [ ] Leaves room for disagreement
- [ ] Doesn't say everything—others can add
- [ ] Makes a claim worth discussing
- [ ] Easy to respond in < 280 chars

**If failing**: Add a question. Remove qualifications that close off discussion.

### 2. Share Test
**Question**: Would someone share this with a specific person?

**Check**:
- [ ] Provides reference-worthy value
- [ ] Relevant to a specific relationship (coworker, friend, family)
- [ ] Comprehensive enough to be useful standalone
- [ ] Clear enough to share without context

**If failing**: Add more substance. Make it more actionable.

### 3. Dwell Test
**Question**: Does this reward attention?

**Check**:
- [ ] Hook creates curiosity
- [ ] Formatting encourages reading
- [ ] Content is dense with value
- [ ] Doesn't waste words
- [ ] Payoff justifies the read

**If failing**: Stronger hook. Cut fluff. Add line breaks.

### 4. Follow Test
**Question**: Would this make someone want more from you?

**Check**:
- [ ] Demonstrates unique expertise or perspective
- [ ] Hints at more value to come
- [ ] Shows personality worth following
- [ ] Memorable enough to seek out

**If failing**: Add your unique angle. Promise future value.

### 5. Negative Signal Test
**Question**: Could this trigger Not Interested/Mute/Block?

**Check**:
- [ ] Not asking for engagement explicitly
- [ ] Not hostile or aggressive
- [ ] Not off-topic for your usual content
- [ ] Not engagement bait
- [ ] Not repetitive of recent posts

**If failing**: Remove engagement asks. Soften hostility. Stay on brand.

### 6. Humanization Test
**Question**: Does this sound like a real person wrote it?

**Check**:
- [ ] No AI vocabulary (see blacklist in "Writing Like a Human" section)
- [ ] Varied structure (not always 3 points, not perfectly formatted)
- [ ] Uses contractions naturally
- [ ] At least one specific detail or personal touch
- [ ] Would you say this to a friend out loud?
- [ ] No sycophantic opener or generic closer

**If failing**: Rewrite in your own voice. Add imperfection. Cut the corporate-speak.

---

## The Hook Audit

The first line is 80% of your post's success.

### Strong Hook Characteristics
- Specific (not vague)
- Creates immediate curiosity or value
- Doesn't require context
- Under 100 characters ideally
- No wasted words

### Hook Types Ranked by Signal Strength

| Hook Type | Best For | Example Start |
|-----------|----------|---------------|
| Question | Replies | "Why do..." |
| Contrarian | Quotes, Replies | "[Common belief] is wrong." |
| Insight | Dwell, Follow | "I discovered..." |
| Story | Dwell, Follow | "[Dialogue]" or "[Action]" |
| Resource | Share | "Complete guide to..." |
| Prediction | Quote, Reply | "Prediction:" |

### Hook Red Flags
- "I was thinking about..."
- "So..."
- "I've been meaning to write about..."
- "Hot take:"
- "Unpopular opinion:"
- Starts with @mention or hashtag

---

## The Structure Audit

### Line Break Test
Count your sentences. Each should have its own line unless intentionally grouped.

**Before**:
```
I analyzed 100 landing pages. The best ones all had three things in common. First, they had one clear CTA. Second, they used social proof early. Third, they kept the form above the fold.
```

**After**:
```
I analyzed 100 landing pages.

The best ones had three things in common:

1. One clear CTA
2. Social proof early
3. Form above the fold
```

### Length Assessment
| Goal | Target Length | Format |
|------|--------------|--------|
| Max reach | 71-100 chars | Single punch |
| Engagement | 200-280 chars | Hook + Body |
| Authority | 500-1000 chars | Structured post |
| Deep dive | Thread | 5-15 posts |

Is your length matched to your goal?

### Visual Scan Test
Squint at your post. Can you see the structure?
- Clear sections?
- Whitespace?
- Not a wall of text?

---

## The Improvement Loop

### Round 1: Signal Optimization
1. Run 5-point signal audit
2. Address any failing tests
3. Strengthen the weakest signal

### Round 2: Hook Refinement
1. Write 3 alternative hooks
2. Pick the one that creates most curiosity
3. Ensure it doesn't require the body to make sense

### Round 3: Structure Polish
1. Add line breaks
2. Cut unnecessary words
3. Check visual scan test

### Round 4: Negative Signal Sweep
1. Read as someone who doesn't follow you
2. Would you Not Interested/Mute this?
3. Remove anything that triggers that instinct

---

## Example Iteration

### Draft 1 (Raw)
```
I've been thinking a lot about what makes a good product. After 10 years in the industry, I believe the key is to focus on solving one problem really well. Too many products try to do too much. Keep it simple. That's my advice.
```

### Analysis
- **Reply test**: No question, nothing to respond to
- **Share test**: Generic advice, not reference-worthy
- **Dwell test**: Weak hook, no structure
- **Follow test**: "10 years" helps, but no unique insight
- **Negative test**: Not hostile, but bland

### Draft 2 (After Hook Fix)
```
Most products fail for the same reason:

They solve too many problems.

After 10 years building products, here's what I've learned:

The best products do one thing. They do it better than anyone.

Everything else is distraction.
```

### Analysis
- **Reply test**: "Do you agree?" implicit
- **Share test**: Still generic
- **Dwell test**: Better structure, reads easily
- **Follow test**: "10 years" establishes credibility
- **Negative test**: Clean

### Draft 3 (After Specificity)
```
Most products fail for the same reason:

They solve too many problems.

Slack started as a game company's internal tool—chat only.
Stripe started with 7 lines of code—payments only.
Notion started as a notes app—docs only.

They added features after product-market fit. Not before.

What's your one thing?
```

### Analysis
- **Reply test**: Direct question at end
- **Share test**: Specific examples, shareable insight
- **Dwell test**: Examples create dwell
- **Follow test**: Pattern recognition shows expertise
- **Negative test**: Clean

---

## Quick Reference Checklist

Before posting:

**Signals**
- [ ] Reply: Question or debate-worthy claim?
- [ ] Share: Reference-worthy value?
- [ ] Dwell: Rewarding structure?
- [ ] Follow: Unique expertise shown?
- [ ] Negative: Nothing triggering?

**Hook**
- [ ] Specific, not vague?
- [ ] Creates curiosity?
- [ ] Works standalone?

**Structure**
- [ ] Proper line breaks?
- [ ] Length matches goal?
- [ ] Passes visual scan?

**Humanization**
- [ ] No AI vocabulary?
- [ ] Varied structure (not always 3 things)?
- [ ] Uses contractions?
- [ ] Sounds like something you'd say out loud?

**Final**
- [ ] Would I screenshot this?
- [ ] Would I share this?
- [ ] Would I follow someone who posted this?

If any answer is no, iterate.
