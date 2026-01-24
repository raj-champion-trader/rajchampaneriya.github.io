---
title: "Understanding VS Code Copilot Chat Architecture"
date: 2026-01-24
draft: true
categories:
  - Technical Concepts
tags:
  - AI
  - VS Code
  - Copilot
  - Developer Tools
  - Productivity
description: "A deep dive into the architecture of Copilot Chat in VS Code, exploring how Custom Instructions, Prompt Files, and Custom Agents work together to create efficient Agentic Workflows."
---
Have you ever noticed how we’ve taken a simple concept—telling a computer what to do—and turned it into a bureaucratic nightmare? We used to just write code. Now, we have "Prompt Files," "Custom Instructions," and "Custom Agents." It’s a club, and you need a roadmap just to figure out which door to knock on.

We’re drowning in acronyms and configuration files, all designed to help us talk to a chatbot that’s essentially a glorified autocomplete on steroids. But here’s the thing: if you don't know where these instructions actually go inside the giant digital haystack we call the "Context Window," you’re just shouting into the void.

Let’s dissect this circus.

## The Anatomy of the "Context Window" (The Pile)

Before we get into the tools, you have to understand how VS Code builds a prompt. It doesn’t just send "Hello World." It builds a sandwich. A very messy, multi-layered sandwich.

First, you have the **System Prompt**. This is the bread. It tells the AI, "You are an intelligent coding assistant." Groundbreaking stuff, really. Then it adds global rules, tool instructions (how to use the terminal or the edit tool), and output formatting rules. It’s a lot of prep work for a machine that still thinks a "router" is a woodworking tool.

Then comes the **User Prompt**. This is where the actual meat goes, but before it gets to your message, it stuffs in your environment info (OS, workspace structure), open files, and the current date.

Finally, at the very bottom, under all that bloat, is your little message: "Hello World."

This entire stack is the **Context Window**. And here is the dirty little secret: the more you shove into this window, the dumber the AI gets. It’s called **Context Rot**. By the time you've scrolled past 32,000 tokens of instructions, the model’s accuracy drops from 88% to about 30%. It literally forgets what it’s supposed to be doing because it’s been overloaded with junk.

So, where do our three amigos fit into this mess?

### 1. Custom Instructions
Think of these as the background noise you can’t escape. They are high-level project details—architecture, patterns, rules. 

*   **Where they go:** These get injected at the very end of the **System Prompt**.
*   **The Logic:** Since they are part of the system prompt, they set the stage. They are the "Prime Directive." You can have multiple files (e.g., one for Next.js best practices), and they stack up. The project-specific instructions usually load first, followed by the general Copilot instructions.
*   **The Carlin Take:** It’s like a sticky note on the monitor that says "Don't be an idiot." The AI sees it every time, but that doesn't guarantee it listens.

### 2. Prompt Files
These are reusable snippets of text you can slap onto a chat. You define them with front matter—like which model to use.

*   **Where they go:** These are injected at the very top of the **User Prompt**. That means they come *before* the context info and your actual message.
*   **The Logic:** You use these to switch contexts or models on the fly. Need to switch from GPT-4 to a smaller, cheaper model? A prompt file can force that change automatically.
*   **The Carlin Take:** It’s a pre-recorded complaint. You press play, and the AI hears exactly what you programmed it to hear, saving you the trouble of typing it out again.

### 3. Custom Agents
These used to be called "Custom Modes," which sounded like a washing machine setting. Now they are "Agents," which sounds much more expensive. They override the default behavior to act like a specific persona (e.g., "Plan Mode").

*   **Where they go:** They get injected at the **very end** of the **System Prompt**—after the Custom Instructions. They are the last word the AI hears before it starts processing.
*   **The Logic:** They define identity, workflows, and tools. They are the boss. If Custom Instructions are the laws, the Custom Agent is the Sheriff.
*   **The Carlin Take:** It’s a middle manager. It doesn't write the code; it just tells the other prompts how to behave.

***

## The "Master Plan" Workflow (or How to Game the System)

So, you have all these tools. You can stress about the order of operations, or you can use them to build a workflow that actually works without burning through your API credits like a drunken sailor.

The smart move is to stop treating the AI like one single entity and start treating it like a team of specialized idiots. Here is the workflow from the notes that actually makes sense:

**Step 1: The Planner (The Expensive Brain)**
Use a **Prompt File** configured to switch to a heavy-duty model (like Claude Opus). Ask it to refactor your UI. It will switch models automatically, analyze your codebase, and spit out a high-level plan. It breaks the work down into small, testable steps—commits, essentially.

**Step 2: The Documenter (Maximizing the Brain)**
Use another **Prompt File** to take that plan and generate a massive markdown document containing *all* the code required for every step. You aren't asking it to edit files; you're asking it to write the book. This gets the heavy lifting done by the smart model while you still have credits.

**Step 3: The Implementer (The Cheap Labor)**
Clear your context window (clean the slate). Now, use a **Custom Agent** (like an "Implement" agent) configured to use a smaller, faster, cheaper model (like GPT-4o-mini). Feed it that massive markdown document. The agent’s job isn't to think; it's to type. It implements the code step-by-step verbatim.

When it finishes a step, it stops. You test, you commit, and then you send the next step to the cheap agent.

This is the only way to fly. You get the genius of the big model without paying for it to sit there breathing while it edits files.

***

## The Nightingale Directives: Clarity in Action

We’ve laughed at the absurdity, but let’s get down to business. The system is only as good as the operator. If you want to master these tools, you must master your own workflow. As Earl Nightingale might say, "You become what you think about, and if you think about confused prompts, you will produce confused code."

Here is your actionable path to clarity:

*   **Define Your Purpose Before You Prompt:** Don't just open the chat and hope. Know exactly what you need. Do you need a high-level architect (Custom Instructions), a specific task force (Prompt File), or a behavioral overhaul (Custom Agent)? Clarity of purpose is the starting point of all productivity.
*   **Respect the Context Window:** Treat every token like a dollar bill. Don't clutter your system prompt with redundant information. If the context window grows too large, the value of your work drops to zero. Keep it clean, keep it lean, and clear the session when you must.
*   **Leverage Specialization:** Do not ask a sprinter to run a marathon. Use your powerful models for planning and generation, and use your agile models for implementation and iteration. Assign the right tool to the right job.
*   **Iterate with Purpose:** When you receive output, do not simply accept it. Test it, verify it, and commit it. Progress is made in small, testable steps, not in giant, unmanageable leaps.
*   **Control Your Environment:** Just as a garden requires weeding, your AI workflow requires maintenance. Curate your instruction files, update your prompt files, and refine your agents. You are the master of the system; do not let the system master you.
*   Check out the **Awesome Copilot** repository for community-contributed prompt files, instructions, and agents.

Now go forth, configure your agents, and try not to let the robots take over without a fight. Happy coding.
