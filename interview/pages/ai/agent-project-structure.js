window.Pages['ai-agent-project-structure'] = `
<div class="page-header">
  <div class="breadcrumb">AI &amp; LLM Engineering › <span>AI Agent Project Structure</span></div>
  <h1>🗂️ AI Agent Project Structure — A Practical Guide</h1>
  <p>How to lay out an agent codebase so it is easy to develop, test, debug, maintain and take to production</p>
</div>

<div class="ref-section">
  <div class="ref-title">At A Glance</div>
  <div class="ref-body">
    <div class="principle-grid">
      <div class="principle-card"><div class="principle-icon">🧠</div><div class="principle-name">agent/</div><p>Core logic, execution loop, state and memory</p></div>
      <div class="principle-card"><div class="principle-icon">🔧</div><div class="principle-name">tools/</div><p>Functions and APIs the agent can call</p></div>
      <div class="principle-card"><div class="principle-icon">🤖</div><div class="principle-name">models/</div><p>LLM and embedding clients and configuration</p></div>
      <div class="principle-card"><div class="principle-icon">📝</div><div class="principle-name">prompts/</div><p>System instructions and agent behaviour</p></div>
      <div class="principle-card"><div class="principle-icon">🛠️</div><div class="principle-name">utils/</div><p>Logging, configuration, helpers</p></div>
      <div class="principle-card"><div class="principle-icon">🌐</div><div class="principle-name">api/</div><p>Exposes the agent through HTTP endpoints</p></div>
      <div class="principle-card"><div class="principle-icon">✅</div><div class="principle-name">tests/</div><p>Validates agent behaviour and tool execution</p></div>
      <div class="principle-card"><div class="principle-icon">📚</div><div class="principle-name">data/ and logs/</div><p>Knowledge resources and debugging information</p></div>
    </div>
    <div class="tip-box">✅ Interview framing: "Building an agent is more than connecting an LLM to a few tools. I separate the reasoning loop, the tools, the model clients, the prompts and the API surface into their own modules, so each can be tested and swapped independently — that separation is what takes a demo to production."</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">The Project Tree</div>
  <div class="ref-body">
    <div class="code-box">ai-agent-project/
├── README.md              project overview, setup, usage, examples
├── requirements.txt       Python dependencies
├── .env                   environment variables and API keys (never commit)
├── .gitignore             files and folders Git should ignore
├── docker-compose.yml     optional: run DB, Redis, vector DB locally
├── src/                   source code for the agent
│   ├── agent/             core agent logic
│   │   ├── __init__.py
│   │   ├── agent.py       the agent: plans and decides the next step
│   │   ├── executor.py    runs the loop and the tool calls
│   │   ├── state.py       run state (messages, steps, budget)
│   │   └── memory.py      short-term and long-term memory
│   ├── tools/             tool definitions the agent can use
│   │   ├── __init__.py
│   │   ├── search.py
│   │   ├── calculator.py
│   │   └── weather.py
│   ├── models/            LLM and embedding clients
│   │   ├── __init__.py
│   │   ├── llm_client.py
│   │   └── embeddings.py
│   ├── prompts/           prompt templates
│   │   ├── __init__.py
│   │   ├── system_prompts.py
│   │   └── agent_prompts.py
│   ├── utils/             helpers, logging, config parsing
│   │   ├── __init__.py
│   │   ├── helpers.py
│   │   ├── logger.py
│   │   └── config.py
│   └── api/               API layer (FastAPI / Flask / others)
│       ├── __init__.py
│       ├── routes.py
│       └── schemas.py
├── tests/                 unit, integration and tool tests
│   ├── __init__.py
│   ├── test_agent.py
│   ├── test_tools.py
│   └── test_api.py
├── data/                  sample data, knowledge base, evaluation sets
│   ├── examples.json
│   └── knowledge_base/
├── logs/                  log files for debugging and monitoring
│   └── .gitkeep           keeps the empty folder in Git
└── main.py                entry point: CLI / API server / playground</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">What Each File And Folder Is For</div>
  <div class="ref-body">
    <div class="decision-table">
      <div class="dt-row dt-header" style="grid-template-columns:1.2fr 2fr 2.2fr;"><div>Path</div><div>Purpose</div><div>Rule Of Thumb</div></div>
      <div class="dt-row" style="grid-template-columns:1.2fr 2fr 2.2fr;"><div class="dt-name">README.md</div><div>Project overview, setup, usage and examples</div><div>A new teammate should run the agent from this file alone</div></div>
      <div class="dt-row" style="grid-template-columns:1.2fr 2fr 2.2fr;"><div class="dt-name">requirements.txt</div><div>List of Python dependencies</div><div>Pin versions so builds are reproducible</div></div>
      <div class="dt-row" style="grid-template-columns:1.2fr 2fr 2.2fr;"><div class="dt-name">.env</div><div>Environment variables and API keys</div><div class="dt-no">Never commit it to GitHub — commit a .env.example with dummy values instead</div></div>
      <div class="dt-row" style="grid-template-columns:1.2fr 2fr 2.2fr;"><div class="dt-name">.gitignore</div><div>Tells Git which files and folders to ignore</div><div>Must list .env, logs/*, virtual environments and caches</div></div>
      <div class="dt-row" style="grid-template-columns:1.2fr 2fr 2.2fr;"><div class="dt-name">docker-compose.yml</div><div>Optional: run services such as a database, Redis or a vector DB</div><div>Gives every developer the same local dependencies</div></div>
      <div class="dt-row" style="grid-template-columns:1.2fr 2fr 2.2fr;"><div class="dt-name">src/</div><div>Source code for the AI agent</div><div>Keeps application code separate from tests, data and config</div></div>
      <div class="dt-row" style="grid-template-columns:1.2fr 2fr 2.2fr;"><div class="dt-name">src/agent/</div><div>Core agent logic, execution loop, state management and memory</div><div>The only place that decides what happens next</div></div>
      <div class="dt-row" style="grid-template-columns:1.2fr 2fr 2.2fr;"><div class="dt-name">src/tools/</div><div>Tool definitions the agent can use (search, calculator, APIs)</div><div>One tool per file, each with a clear name, schema and description</div></div>
      <div class="dt-row" style="grid-template-columns:1.2fr 2fr 2.2fr;"><div class="dt-name">src/models/</div><div>LLM and embedding clients and model configuration</div><div>Hide the provider behind your own interface so swapping is a config change</div></div>
      <div class="dt-row" style="grid-template-columns:1.2fr 2fr 2.2fr;"><div class="dt-name">src/prompts/</div><div>System and agent prompt templates</div><div>Keep prompts out of business logic so they can be reviewed and versioned</div></div>
      <div class="dt-row" style="grid-template-columns:1.2fr 2fr 2.2fr;"><div class="dt-name">src/utils/</div><div>Helper functions, logging, config parsing, common utilities</div><div>No agent logic here — if it makes decisions it belongs in agent/</div></div>
      <div class="dt-row" style="grid-template-columns:1.2fr 2fr 2.2fr;"><div class="dt-name">src/api/</div><div>API layer that exposes the agent (FastAPI, Flask or others)</div><div>Thin — validate input, call the agent, shape the response</div></div>
      <div class="dt-row" style="grid-template-columns:1.2fr 2fr 2.2fr;"><div class="dt-name">tests/</div><div>Unit tests, integration tests and tool tests</div><div>Run the agent against a fake LLM client so tests are fast and deterministic</div></div>
      <div class="dt-row" style="grid-template-columns:1.2fr 2fr 2.2fr;"><div class="dt-name">data/</div><div>Sample data, knowledge base and evaluation datasets</div><div>Never put customer or secret data in a repository</div></div>
      <div class="dt-row" style="grid-template-columns:1.2fr 2fr 2.2fr;"><div class="dt-name">logs/</div><div>Log files for debugging and monitoring</div><div>Ignored by Git; .gitkeep preserves the folder</div></div>
      <div class="dt-row" style="grid-template-columns:1.2fr 2fr 2.2fr;"><div class="dt-name">main.py</div><div>Entry point to run the agent (CLI, API server or playground)</div><div>Wires the pieces together and nothing more</div></div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Dependency Direction — Who May Import Whom</div>
  <div class="ref-body">
    <div class="code-box">   main.py / api/        entry points — call the agent, hold no logic
        │
        ▼
     agent/              decides the next step and runs the loop
        │
   ┌────┼──────────┬───────────┐
   ▼    ▼          ▼           ▼
 tools/ models/   prompts/   memory + state
   │    │          │           │
   └────┴──────────┴───────────┘
                │
                ▼
             utils/      logging and config — used by everyone

 Allowed:    api -&gt; agent -&gt; tools / models / prompts / utils
 Forbidden:  tools -&gt; agent    (a tool must not know the agent exists)
             models -&gt; tools  (a model client must not know about tools)</div>
    <div class="warn-box">⚠️ The common failure is circular imports and hidden coupling — a tool that reaches back into the agent, or an API route that contains agent logic. Keep dependencies pointing one way (inward), and the agent stays testable with fakes.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Starter Code — The Key Files</div>
  <div class="ref-body">
    <div class="ans-block"><div class="ans-label">src/utils/config.py — settings come from the environment</div>
    <div class="code-box">import os
from dataclasses import dataclass

@dataclass(frozen=True)
class Settings:
    llm_model: str = os.getenv("LLM_MODEL", "gpt-4o-mini")
    llm_api_key: str = os.getenv("LLM_API_KEY", "")
    max_steps: int = int(os.getenv("MAX_STEPS", "5"))

settings = Settings()      # .env is loaded once at startup (for example python-dotenv)</div></div>

    <div class="ans-block"><div class="ans-label">src/models/llm_client.py — your own interface over the provider</div>
    <div class="code-box">from typing import Protocol

class LLMClient(Protocol):
    def chat(self, messages: list[dict], tools: list[dict] | None = None) -&gt; dict: ...

class OpenAILLMClient:
    def __init__(self, api_key: str, model: str):
        from openai import OpenAI
        self._client = OpenAI(api_key=api_key)
        self._model = model

    def chat(self, messages, tools=None):
        resp = self._client.chat.completions.create(
            model=self._model, messages=messages, tools=tools, temperature=0)
        return resp.choices[0].message     # the agent only sees this shape</div></div>

    <div class="ans-block"><div class="ans-label">src/tools/calculator.py — one tool per file, schema plus function</div>
    <div class="code-box">SCHEMA = {
    "type": "function",
    "function": {
        "name": "calculator",
        "description": "Evaluate a basic arithmetic expression such as 12 * (3 + 4)",
        "parameters": {
            "type": "object",
            "properties": {"expression": {"type": "string"}},
            "required": ["expression"],
        },
    },
}

def run(expression: str) -&gt; str:
    allowed = set("0123456789+-*/(). ")
    if not set(expression) &lt;= allowed:                # never eval untrusted text blindly
        return "error: unsupported characters"
    return str(eval(expression, {"__builtins__": {}}))  # replace with a real parser in production</div></div>

    <div class="ans-block"><div class="ans-label">src/tools/__init__.py — a registry the agent reads</div>
    <div class="code-box">from . import calculator, search, weather

TOOLS = {
    "calculator": (calculator.SCHEMA, calculator.run),
    "search":     (search.SCHEMA,     search.run),
    "weather":    (weather.SCHEMA,    weather.run),
}

def schemas() -&gt; list[dict]:
    return [schema for schema, _ in TOOLS.values()]

def call(name: str, args: dict) -&gt; str:
    if name not in TOOLS:
        return "error: unknown tool"
    return TOOLS[name][1](**args)</div></div>

    <div class="ans-block"><div class="ans-label">src/prompts/system_prompts.py — prompts live outside the logic</div>
    <div class="code-box">SYSTEM_PROMPT = (
    "You are a careful assistant. Use tools when you need facts or calculations. "
    "If you cannot find the answer with the tools, say you do not know. "
    "Never invent tool results."
)</div></div>

    <div class="ans-block"><div class="ans-label">src/agent/state.py and memory.py — run state and memory</div>
    <div class="code-box">from dataclasses import dataclass, field

@dataclass
class AgentState:                       # state.py — one object per run
    messages: list[dict] = field(default_factory=list)
    steps: int = 0
    done: bool = False

class ShortTermMemory:                  # memory.py — the conversation window
    def __init__(self, limit: int = 20):
        self._limit = limit
    def trim(self, messages: list[dict]) -&gt; list[dict]:
        system, rest = messages[:1], messages[1:]
        return system + rest[-self._limit:]     # keep the system prompt, drop the oldest turns</div></div>

    <div class="ans-block"><div class="ans-label">src/agent/executor.py and agent.py — the bounded loop</div>
    <div class="code-box">import json
from src import tools
from src.prompts.system_prompts import SYSTEM_PROMPT
from src.agent.state import AgentState, ShortTermMemory

class Agent:
    def __init__(self, llm, max_steps: int = 5):
        self.llm, self.max_steps = llm, max_steps
        self.memory = ShortTermMemory()

    def run(self, user_input: str) -&gt; str:
        state = AgentState(messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": user_input},
        ])
        while not state.done and state.steps &lt; self.max_steps:    # bounded — never spins forever
            reply = self.llm.chat(self.memory.trim(state.messages), tools.schemas())
            state.steps += 1
            if not reply.tool_calls:                                # no tool needed: final answer
                return reply.content
            state.messages.append(reply)
            for call in reply.tool_calls:                           # executor: run each requested tool
                result = tools.call(call.function.name, json.loads(call.function.arguments))
                state.messages.append({"role": "tool", "tool_call_id": call.id, "content": result})
        return "I could not finish within the step limit."</div></div>

    <div class="ans-block"><div class="ans-label">src/api/schemas.py and routes.py — a thin API layer</div>
    <div class="code-box">from fastapi import APIRouter
from pydantic import BaseModel

class AskRequest(BaseModel):          # schemas.py
    question: str

class AskResponse(BaseModel):
    answer: str

router = APIRouter()                  # routes.py

@router.post("/ask", response_model=AskResponse)
def ask(req: AskRequest):
    return AskResponse(answer=agent.run(req.question))   # no logic here, just call the agent</div></div>

    <div class="ans-block"><div class="ans-label">main.py — wire it together</div>
    <div class="code-box">from fastapi import FastAPI
from src.utils.config import settings
from src.models.llm_client import OpenAILLMClient
from src.agent.agent import Agent
from src.api import routes

agent = Agent(OpenAILLMClient(settings.llm_api_key, settings.llm_model), settings.max_steps)
routes.agent = agent

app = FastAPI()
app.include_router(routes.router)
# run:  uvicorn main:app --reload      or call agent.run(...) from a CLI</div></div>

    <div class="ans-block"><div class="ans-label">tests/test_agent.py — a fake LLM keeps tests deterministic</div>
    <div class="code-box">class FakeLLM:
    def chat(self, messages, tools=None):
        class Reply:                   # pretends the model answered directly
            tool_calls = None
            content = "42"
        return Reply()

def test_agent_returns_answer_without_tools():
    agent = Agent(FakeLLM(), max_steps=3)
    assert agent.run("What is the answer?") == "42"</div></div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Working Rules For A Clean Agent Repository</div>
  <div class="ref-body">
    <div class="decision-table">
      <div class="dt-row dt-header" style="grid-template-columns:1.3fr 2.5fr;"><div>Rule</div><div>Why</div></div>
      <div class="dt-row" style="grid-template-columns:1.3fr 2.5fr;"><div class="dt-name">Secrets only in .env</div><div>Keys in code or in Git history are leaked keys. Commit .env.example, ignore .env, and use a secret store in production</div></div>
      <div class="dt-row" style="grid-template-columns:1.3fr 2.5fr;"><div class="dt-name">Bound the loop</div><div>A max-steps limit (and a token or cost budget) stops an agent that never converges from running and billing forever</div></div>
      <div class="dt-row" style="grid-template-columns:1.3fr 2.5fr;"><div class="dt-name">Tools are small and validated</div><div>Every tool validates its arguments and returns text the model can read, including clear errors</div></div>
      <div class="dt-row" style="grid-template-columns:1.3fr 2.5fr;"><div class="dt-name">Provider behind an interface</div><div>models/ hides the vendor SDK, so changing model or provider touches one file</div></div>
      <div class="dt-row" style="grid-template-columns:1.3fr 2.5fr;"><div class="dt-name">Prompts are code</div><div>Keep them in prompts/, review them in pull requests, and version them — prompt changes change behaviour</div></div>
      <div class="dt-row" style="grid-template-columns:1.3fr 2.5fr;"><div class="dt-name">Test with a fake LLM</div><div>Real model calls are slow, costly and non-deterministic; reserve them for a small evaluation suite</div></div>
      <div class="dt-row" style="grid-template-columns:1.3fr 2.5fr;"><div class="dt-name">Structured logs</div><div>Log each step, tool call, latency and token use with a run id so a bad answer can be traced afterwards</div></div>
      <div class="dt-row" style="grid-template-columns:1.3fr 2.5fr;"><div class="dt-name">Thin API layer</div><div>Routes validate and delegate; the same agent can then be run from a CLI, an API or a test</div></div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Beyond The Infographic — What A Production Agent Usually Adds</div>
  <div class="ref-body">
    <div class="decision-table">
      <div class="dt-row dt-header" style="grid-template-columns:1.2fr 2.6fr;"><div>Addition</div><div>Why It Is Worth Having</div></div>
      <div class="dt-row" style="grid-template-columns:1.2fr 2.6fr;"><div class="dt-name">.env.example</div><div>Documents required variables without exposing real values</div></div>
      <div class="dt-row" style="grid-template-columns:1.2fr 2.6fr;"><div class="dt-name">pyproject.toml</div><div>Modern packaging, tool configuration and dependency pinning in one place</div></div>
      <div class="dt-row" style="grid-template-columns:1.2fr 2.6fr;"><div class="dt-name">Dockerfile</div><div>Package the agent itself, not only its dependencies, for deployment</div></div>
      <div class="dt-row" style="grid-template-columns:1.2fr 2.6fr;"><div class="dt-name">evals/</div><div>A repeatable set of questions with expected behaviour, run in CI to catch regressions when prompts or models change</div></div>
      <div class="dt-row" style="grid-template-columns:1.2fr 2.6fr;"><div class="dt-name">Guardrails</div><div>Input and output checks, tool allow-lists and human approval for risky actions</div></div>
      <div class="dt-row" style="grid-template-columns:1.2fr 2.6fr;"><div class="dt-name">Tracing</div><div>OpenTelemetry or an LLM tracing tool to follow a request across model calls and tools</div></div>
      <div class="dt-row" style="grid-template-columns:1.2fr 2.6fr;"><div class="dt-name">CI workflow</div><div>Lint, unit tests, evals and a container build on every pull request</div></div>
    </div>
    <div class="tip-box">✅ These are additions I recommend, not part of the original infographic — they are what usually separates a working demo from something you can safely operate.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">If You Come From .NET — The Same Layout In C#</div>
  <div class="ref-body">
    <div class="decision-table">
      <div class="dt-row dt-header" style="grid-template-columns:1.3fr 2fr;"><div>Python folder</div><div>.NET equivalent</div></div>
      <div class="dt-row" style="grid-template-columns:1.3fr 2fr;"><div class="dt-name">agent/ (agent, executor, state, memory)</div><div>Application layer — an orchestrator service, run-state records, an IAgentMemory interface</div></div>
      <div class="dt-row" style="grid-template-columns:1.3fr 2fr;"><div class="dt-name">tools/</div><div>Plugins or functions (for example Semantic Kernel plugins) behind an ITool interface and a registry</div></div>
      <div class="dt-row" style="grid-template-columns:1.3fr 2fr;"><div class="dt-name">models/</div><div>Infrastructure — wrappers over the Azure OpenAI or OpenAI SDK behind an ILlmClient interface</div></div>
      <div class="dt-row" style="grid-template-columns:1.3fr 2fr;"><div class="dt-name">prompts/</div><div>Embedded resource or configuration files, loaded through an IPromptProvider</div></div>
      <div class="dt-row" style="grid-template-columns:1.3fr 2fr;"><div class="dt-name">utils/ (logger, config)</div><div>ILogger, IOptions and the built-in configuration system</div></div>
      <div class="dt-row" style="grid-template-columns:1.3fr 2fr;"><div class="dt-name">api/ (routes, schemas)</div><div>ASP.NET Core minimal APIs or controllers with request and response records</div></div>
      <div class="dt-row" style="grid-template-columns:1.3fr 2fr;"><div class="dt-name">tests/</div><div>xUnit project using a fake ILlmClient</div></div>
      <div class="dt-row" style="grid-template-columns:1.3fr 2fr;"><div class="dt-name">main.py</div><div>Program.cs — builds the host and registers services</div></div>
    </div>
    <div class="tip-box">✅ The layering rule is identical in both ecosystems: entry points depend on the agent, the agent depends on abstractions for tools, models and prompts, and nothing points back up.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Interview Answer</div>
  <div class="ref-body">
    <div class="qa-card">
      <div class="qa-body">
        <div class="qa-question">How would you structure the codebase of a production AI agent?</div>
        <div class="qa-answer">"I split it by responsibility. An agent module holds the reasoning loop, run state and memory; a tools module holds small, validated functions behind a registry; a models module wraps the LLM and embedding providers behind my own interface; prompts live in their own module so they can be reviewed and versioned; utils carries configuration and logging; and a thin API layer exposes the agent. Dependencies point one way — the API calls the agent, the agent uses tools, models and prompts, and tools never import the agent. Secrets live only in environment variables, the loop is bounded by a step and cost limit, and tests run against a fake LLM client so they are fast and deterministic, with a separate small evaluation set for real model behaviour. On top of that I add Docker, CI, tracing and guardrails before calling it production-ready."</div>
      </div>
    </div>
  </div>
</div>
`;
