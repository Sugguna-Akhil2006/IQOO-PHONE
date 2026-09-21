# DevMemory

“DevMemory reconstructs the historical context behind code, so developers don't have to manually dig through Git history to understand why it exists.”

Modern software development often involves jumping into unfamiliar codebases where the original intent has been lost. DevMemory solves this by automatically synthesizing historical memory—pulling together pull requests, issues, and specific file diffs into an evidence-grounded explanation for *why* a particular piece of code exists.

## What DevMemory Does
- **GitHub repository ingestion**
- **Historical commit/file relationships**
- **PR/Issue evidence**
- **Deterministic + semantic retrieval**
- **Multi-file historical change sets**
- **Symbol-level reasoning**
- **Diff-grounded technical synthesis**
- **FACT / INTERPRETATION / UNKNOWN grounding**
- **Desktop/web experience**
- **Mobile/iQOO experience as a prototype/concept**

## Architecture

**High-Level Flow:**
`GitHub → Ingestion → Historical Memory → Retrieval → Evidence → Reasoning → UI`

1. **Ingestion & Historical Memory:** DevMemory ingests repositories and builds a structured historical graph connecting commits, diffs, and symbols.
2. **Retrieval (Embeddings/Vector Search):** Semantic search is used alongside deterministic commit lookups to gather relevant historical context for any given symbol.
3. **Reasoning:** Retrieved evidence is passed to an LLM to generate an explanation grounded strictly in the diffs and commits.
4. **On-device AI Concept:** In the future mobile experience, context is passed to a local Gemma model to perform on-device reasoning, reducing the need to transmit sensitive source code to the cloud.

## Repository Structure

```
e:\IQOO-PHONE\
├── public/                 # Static assets
├── src/                    # Mobile prototype source code
│   ├── App.tsx             # Main React application & screen routing
│   └── index.css           # Styling & developer-tool aesthetic overrides
├── package.json            # Node.js dependencies & scripts
├── tsconfig.json           # TypeScript configuration
└── vite.config.ts          # Vite bundler configuration
```
*(Note: Backend infrastructure code is currently not located in this repository path.)*

## Prerequisites

- **Node.js**: v18+ (verified for Vite/React setup)
- **npm** or **yarn**
- **Python**: v3.10+ *(for backend, not present in this workspace)*

## Backend Setup

> **Note:** The backend codebase (Python, APIs) was not found in this frontend workspace. The following commands are standard placeholders. Do not commit `.env` or secrets.

```bash
# Create and activate Python virtual environment
python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`

# Install dependencies
pip install -r requirements.txt

# Configure environment variables
cp .env.example .env
# Optional: GITHUB_PAT is optional depending on repository visibility

# Start the backend server
uvicorn main:app --reload
```

## Frontend Setup

The frontend is a Vite + React + TypeScript application containing the interactive mobile prototype.

```bash
# Install dependencies
npm install

# Start the frontend development server
npm run dev

# Build the frontend for production
npm run build
```

## Running DevMemory

1. Start the backend.
2. Start the frontend using `npm run dev`.
3. Open the application in your browser (e.g., `http://localhost:5173`).
4. Connect/ingest a GitHub repository.
5. Inspect commits/timeline.
6. Select a symbol.
7. Ask “Why does this exist?”
8. Inspect evidence and diff.

## Mobile Prototype

**The current mobile experience located in `src/App.tsx` is a web-based clickable prototype/concept, not a real native iQOO Android application.**

The mobile demo visualizes the investigation flow on a simulated smartphone screen.

**Demo Flow:**
Home → Scan → Identify Code → Why → Historical Answer → Evidence → Diff → Reasoning → Open on Laptop

## Example

**Repository**: `squid-vibes-hub`
**File**: `src/components/ui/avatar.tsx`
**Symbol**: `Avatar()`
**Evidence**: Commit `a9a3ca3`

*(This validated example demonstrates how DevMemory explains that the component was introduced as a reusable application-level wrapper around Radix primitives.)*

## Testing

**Frontend Build/Type-check:**
```bash
npm run build
```
*(Currently passes successfully with 0 TypeScript errors).*

*(Note: Backend test commands and passing counts could not be verified as the backend is not present in this workspace).*

## Important Notes

- **GitHub PAT**: Optional/required only where the current implementation actually needs it for private repos.
- **Secrets**: Never commit `.env` or secrets.
- **Data Reality vs Simulation**: The current frontend mobile interface uses mock data for demonstration purposes. The real GitHub historical data engine operates on the desktop/backend stack.
- **Future Concepts**: The native iQOO integration, on-device Gemma inference, and real device-to-device handoff shown in the mobile prototype are **concepts/visualizations**, clearly distinguished from the already implemented retrieval/reasoning backends.

## Hackathon Demo

**The Intended Demo Story:**
1. **Code**: The developer scans an unfamiliar code block (`Avatar()`).
2. **“Why does this exist?”**: DevMemory looks beyond *what* the code does and investigates *why*.
3. **Historical Memory**: The backend reconstructs the exact timeline of when and how the component was built.
4. **Evidence**: 3 foundational signals (Commits, Diffs, Symbol History) are explicitly mapped out.
5. **Explanation**: Grounded by FACT, INTERPRETATION, and UNKNOWN parameters, the AI outputs an evidence-backed answer that can be effortlessly handed off to the desktop for deep technical work.
