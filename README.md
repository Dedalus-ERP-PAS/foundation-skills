# MCP Builder Skill

A comprehensive guide for creating high-quality MCP (Model Context Protocol) servers that enable LLMs to interact with external services through well-designed tools.

## Overview

This repository contains the complete MCP Builder skill from Anthropic, providing detailed guidance for building MCP servers in both Python (FastMCP) and Node/TypeScript (MCP SDK).

## What's Inside

### Core Documentation

- **[SKILL.md](SKILL.md)** - Main guide with 4-phase workflow for MCP server development
  - Phase 1: Deep Research and Planning
  - Phase 2: Implementation
  - Phase 3: Review and Test
  - Phase 4: Create Evaluations

### Reference Documentation

Located in the `reference/` directory:

- **[mcp_best_practices.md](reference/mcp_best_practices.md)** - Universal MCP guidelines
- **[node_mcp_server.md](reference/node_mcp_server.md)** - Complete TypeScript guide
- **[python_mcp_server.md](reference/python_mcp_server.md)** - Complete Python/FastMCP guide
- **[evaluation.md](reference/evaluation.md)** - Complete evaluation creation guide

### Evaluation Scripts

Located in the `scripts/` directory:

- **[evaluation.py](scripts/evaluation.py)** - Evaluation harness for testing MCP servers
- **[connections.py](scripts/connections.py)** - Connection handling for stdio, SSE, and HTTP transports
- **[example_evaluation.xml](scripts/example_evaluation.xml)** - Example evaluation questions
- **[requirements.txt](scripts/requirements.txt)** - Python dependencies for evaluation scripts

## Quick Start

### For TypeScript/Node.js

```bash
npm init -y
npm install @modelcontextprotocol/sdk zod axios
npx tsc --init
```

See [node_mcp_server.md](reference/node_mcp_server.md) for complete setup.

### For Python

```bash
python -m venv venv
source venv/bin/activate
pip install mcp[cli] httpx pydantic
```

See [python_mcp_server.md](reference/python_mcp_server.md) for complete setup.

### Running Evaluations

```bash
pip install -r scripts/requirements.txt
export ANTHROPIC_API_KEY=your_api_key_here

# Stdio transport
python scripts/evaluation.py -t stdio -c python -a your_mcp_server.py evaluation.xml

# HTTP transport
python scripts/evaluation.py -t http -u https://your-server.com/mcp evaluation.xml
```

## Key Concepts

### MCP Server Design Principles

1. **API Coverage vs. Workflow Tools** - Balance comprehensive endpoint coverage with specialized workflow tools
2. **Tool Naming** - Use clear, descriptive names with service prefixes
3. **Context Management** - Return focused, relevant data; support pagination and filtering
4. **Actionable Error Messages** - Guide agents toward solutions with specific suggestions

### Recommended Tech Stack

- **Language**: TypeScript (recommended for broad compatibility)
- **Transport**: Streamable HTTP for remote servers, stdio for local integrations
- **Validation**: Zod schemas (TypeScript) or Pydantic models (Python)

## License

Apache License 2.0 - see [LICENSE.txt](LICENSE.txt)

## Source

Based on the [Anthropics skills repository](https://github.com/anthropics/skills/tree/main/skills/mcp-builder)
