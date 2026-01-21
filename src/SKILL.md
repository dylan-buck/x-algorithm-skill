---
name: x-algorithm
description: Write viral X posts using deep knowledge of the actual recommendation algorithm
version: 1.0.0
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
2. "Here's what I learned:" transition
3. 3-7 numbered insights
4. Closing CTA for follow

**Template**:
```
I [did/studied/analyzed] [specific thing] for [time period].

Here's what most people get wrong:

1. [Insight that challenges assumptions]
2. [Practical observation]
3. [Counter-intuitive finding]
4. [Actionable takeaway]

The real lesson: [One-line summary]

Follow for more [topic] insights.
```

**Example**:
```
I reviewed 200 failed startups for Y Combinator.

Here's what most people get wrong:

1. They pivoted too late, not too early
2. The cofounder conflicts started before the idea
3. "Running out of money" was the symptom, not the cause
4. The winners had customers before they had product

The real lesson: Speed of learning beats everything else.

Follow for more startup post-mortems.
```

**Why it works**: Dense value triggers dwell. Numbered list is scannable. Follow CTA capitalizes on demonstrated expertise.

---

## Pattern 2: The Contrarian Take

**Best for**: Replies, Quote tweets, Profile clicks

Structure:
1. Bold claim that challenges consensus
2. Brief explanation (don't over-explain)
3. Optional: invitation to disagree

**Template**:
```
[Conventional wisdom] is wrong.

[One-sentence contrarian position]

[Optional: Here's why / Here's what I do instead]
```

**Example**:
```
"Work-life balance" is a trap.

The best founders I know don't balance anything. They integrate.

Work is life. Life is work. The separation is the problem.
```

**Why it works**: Disagreement drives replies. Quote tweets add commentary. Bold claims trigger engagement from both sides.

**Warning**: Must be genuine contrarianism, not rage bait. Rage bait triggers Block/Mute/Report signals.

---

## Pattern 3: The Resource Post

**Best for**: Copy Link Share, DM Share, Saves

Structure:
1. Clear promise of value
2. Comprehensive but scannable content
3. Explicit save/share CTA

**Template**:
```
[Complete/Ultimate/Full] [resource type] for [specific audience]:

[Content organized as list or thread]

Bookmark this. Share it with [relevant person].
```

**Example**:
```
Complete cold email checklist:

□ Subject line < 6 words
□ First line personalized to them
□ One clear ask
□ Under 100 words total
□ No attachments
□ Send Tuesday-Thursday 9-11am
□ Follow up exactly once at day 3

Save this. Send it to your sales team.
```

**Why it works**: Reference material gets shared externally. Explicit CTA increases share behavior. Checkbox format is highly scannable.

---

## Pattern 4: The Curiosity Gap

**Best for**: Dwell time, Click-through, Replies

Structure:
1. Create specific curiosity
2. Delay payoff just enough
3. Deliver satisfying answer

**Template**:
```
[Specific observation that creates question]

[Build tension - what you expected vs reality]

[Reveal the answer]

[Implication or lesson]
```

**Example**:
```
The #1 product at Amazon isn't what you think.

Not AWS. Not Prime. Not Alexa.

It's the internal document culture.

Every major decision starts with a 6-page narrative memo.

That's why they move fast—everyone actually understands the decision.
```

**Why it works**: Curiosity creates dwell time. Delayed payoff increases engagement. Satisfying answer triggers shares.

---

## Pattern 5: The Personal Story

**Best for**: Follows, Dwell time, Emotional resonance

Structure:
1. Start mid-action (not "So I was...")
2. Quick context
3. The turning point
4. The lesson

**Template**:
```
"[Dialogue or pivotal moment]"

[2-3 lines of context]

[What happened next]

[What it taught me]
```

**Example**:
```
"We're shutting down the company."

Hardest email I ever sent. 47 employees. Families. Dreams.

But here's what I didn't expect:

Every single person replied thanking me. Not for the job. For being honest.

Transparency isn't just ethical. It's the only way to leave with your reputation intact.
```

**Why it works**: Narrative tension creates dwell. Emotional authenticity builds connection. Lessons give reason to follow.

---

## Pattern 6: The Direct Value

**Best for**: Shares, Replies, Practical engagement

Structure:
1. Immediate actionable content
2. No preamble
3. Clear application

**Template**:
```
[Action verb] [specific outcome]:

[Step 1]
[Step 2]
[Step 3]

That's it. [Simple closer]
```

**Example**:
```
Write better emails:

1. Start with the ask
2. Max 5 sentences
3. One action per email

That's it. Stop overthinking.
```

**Why it works**: No friction. Immediate value. Easy to apply and share.

---

## Pattern 7: The "I Did X So You Don't Have To"

**Best for**: Dwell time, Shares, Follow

Structure:
1. Establish the effort you put in
2. Distill the key findings
3. Save them time

**Template**:
```
I [did extensive thing] so you don't have to.

Here are the [N] things that actually matter:

[Findings]

You're welcome.
```

**Example**:
```
I read 50 books on negotiation so you don't have to.

Here are the 3 things that actually matter:

1. The person who cares less has more power
2. "No" is the start, not the end
3. Silence is your best friend

Everything else is noise.
```

**Why it works**: Establishes authority. Saves time. Creates shareability.

---

## Pattern 8: The Prediction

**Best for**: Quote tweets, Replies, Engagement from experts

Structure:
1. Specific prediction with timeframe
2. Brief reasoning
3. Optional stake ("bookmark this")

**Template**:
```
Prediction: [Specific outcome] by [timeframe]

Here's why:

[2-3 reasons]

Bookmark this. Let's see who's right.
```

**Example**:
```
Prediction: 50% of SaaS companies will be AI-wrapper businesses by 2026.

Here's why:

- Foundation models are commoditizing
- UX is the only moat
- Infrastructure costs favor thin layers

Bookmark this. Check back in 2 years.
```

**Why it works**: Predictions invite commentary. Experts want to weigh in. Bookmark creates future engagement.

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
| "So You Don't Have To" | Share, Follow, Dwell |
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

# Iteration Framework

A systematic approach to improving drafts before posting. Run every draft through this checklist to optimize for the algorithm.

---

## The 5-Point Signal Audit

For each draft, evaluate against the five signal categories:

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

**Final**
- [ ] Would I screenshot this?
- [ ] Would I share this?
- [ ] Would I follow someone who posted this?

If any answer is no, iterate.
