# Chicago Mounting Elementor MCP connection

Updated: 2026-11-07 (America/Chicago).

## Canonical connection

| Setting | Value |
|---|---|
| ChatGPT plugin | [Chicago Mounting Elementor](https://chatgpt.com/plugins/Plugin_a1c0a0614b8881918b7e232cb4cd7ff3) |
| Plugin ID | `Plugin_a1c0a0614b8881918b7e232cb4cd7ff3` |
| Saved release | `pluginrel_6aef4a433fb48191b9669c0ddffebe69`, version 1.0.0 |
| Scope | Private plugin in the existing workspace |
| MCP server name | `chicago-mounting-elementor` |
| Endpoint | https://chicagomounting.com/wp-json/elementor/mcp/ |
| Environment | Existing Chicago Mounting production site; no staging assumed |
| Authentication | WordPress Application Password / HTTP Basic |
| Read-only check | `elementor-get-page-structure`, arguments `{"post_id":15716}` |

Reuse this exact plugin. Do not create another connection merely because directory search does not return it. Direct metadata retrieval and file readback verified the saved plugin; directory search returned no match even after creation.

## Verified status and remaining gate

- **Verified direct cloud API access:** initialize HTTP200, Elementor MCP v1.0.0, negotiated protocol2025-11-25; notifications/initialized202; tools/list200 with22 tools; Page15716 structure200 with isError=false. The returned structure includes Catalogue7cb19457, HERO3d9b938, Shortcode111a2a4 and Loop Grid52200b7.
- **Saved in ChatGPT:** the private plugin above, including the exact existing endpoint and API-key/basic authentication declaration. Stored manifest and MCP configuration were read back successfully. No credentials were packaged.
- **Installation attempt failed (user-provided ChatGPT screenshot, 2026-11-07):** the host displayed `Failed to install plugin` and `Couldn't connect` for the canonical plugin. The exact underlying cause was not exposed. This supersedes the previous mere 'not yet confirmed' install state; package creation and direct API read do not establish successful plugin installation or credentials persistence. Do not retry Install blindly or claim permanent access. Secure Basic credential retention, native tool activation and access from a separate Work chat remain unverified.
- **Separate unresolved issue:** the earlier OAuth route returned `Unknown OAuth client`. OAuth is not the selected method and must not be used as a fallback.
- No website changes, installed-plugin source access, security weakening or GCPRO edits occurred.

The 22-tool response proves authenticated direct protocol access; it does not prove a permanent account-level connection. A new Python process or MCP session is not a new ChatGPT Work chat.

## Finish host setup and verify a new chat

1. The most recent installation attempt showed `Failed to install plugin` / `Couldn't connect`. Before retrying, inspect the existing plugin's ChatGPT installation/connection diagnostics and whether this host supports a secure Basic-credential entry for this package. Do not create another plugin.
2. If the host offers a supported secure HTTP Basic credential setup, complete it there. Never put credentials into plugin JSON, project instructions, a repository, or ordinary chat text.
3. If secure Basic setup is absent or unsupported, record that exact host limitation and stop. Do not select OAuth, mark the server unauthenticated, embed an Authorization header in the package, or create a proxy without separate authorization.
4. Start a separate ChatGPT Work chat, select the installed Chicago Mounting Elementor plugin, and provide this repository.
5. Discover its actual tools and read Page15716 once. Record the new-chat result and whether authorization carried over without re-entering credentials. Only then mark cross-chat persistence verified.

A Basic authentication declaration is accepted by the plugin package schema; that does not establish support in every host setup UI. The official public submission portal documentation specifically says it lacks an API-key/Basic connection flow; do not generalize that portal-specific limitation into proof that the direct endpoint is inaccessible.

## Direct MCP protocol already verified

Use an authorized secure credential source and an HTTP client; no local MCP configuration file is required. Keep credential and session values in memory. Use only this explicitly authorized endpoint.

1. POST JSON-RPC `initialize` with protocolVersion `2025-11-25`, capabilities `{}`, and clientInfo.
2. Retain the response `Mcp-Session-Id` header. Send it with all subsequent requests in that session.
3. Send `notifications/initialized`.
4. Request `tools/list`, including any advertised pagination cursor if needed. Discover actual schemas; 22 is the observed count, not a permanent requirement.
5. Call `elementor-get-page-structure` with `post_id:15716`.

Requests use Content-Type application/json, Accept application/json and text/event-stream, a normal client User-Agent, and Basic authorization from the secure credential source. After negotiation, send MCP-Protocol-Version. Never record credential/header/session values.

Observed failure: tools/list without the session header returned HTTP400 `Invalid Request: Missing Mcp-Session-Id header`. Keeping the initialize response header resolved it. This error is not an OAuth failure and does not require WordPress changes.

If a session expires, create a fresh MCP session; do not try to make an expiring session identifier permanent. Permanent access requires securely retained credentials and host configuration.

## Restrictions

Do not switch to OAuth, create duplicate plugins/servers, install WordPress plugins, inspect or modify installed plugin files, change GCPRO, store secrets in GitHub, or create local `mcp-config.json` / Codex configuration files. Do not extract passwords from browser storage or prior artifacts. Missing native tools and an empty plugin search are not sufficient evidence of endpoint failure.

## Text for ChatGPT Project Instructions

```text
For Chicago Mounting, read AGENTS.md and knowledge/MCP-CONNECTION.md in https://github.com/vvvetalll/cm on the current default branch before connection work.

Reuse the existing ChatGPT plugin "Chicago Mounting Elementor":
https://chatgpt.com/plugins/Plugin_a1c0a0614b8881918b7e232cb4cd7ff3
Server: chicago-mounting-elementor
Endpoint: https://chicagomounting.com/wp-json/elementor/mcp/
Authentication: WordPress Application Password over HTTP Basic. Do not switch to OAuth, create duplicate connections, install WordPress plugins, or access installed plugin source files.

First check whether the existing plugin's tools are available. Verify access with one read-only request for Page 15716. If native tools are absent but an authorized secure credential source is available, use the documented direct MCP protocol and retain Mcp-Session-Id from initialize. Plugin-list absence alone does not prove the endpoint is unavailable.

Keep credentials outside chat drafts, repository files, instructions and plugin packages. Do not create local MCP configuration files. If secure credentials or host connection setup are unavailable, state the exact blocker; do not restart broad connection research or claim success.

Distinguish saved plugin metadata, completed authorization, successful direct API access, and verified access from a new ChatGPT Work chat. Proceed to the requested site task only after the relevant read succeeds. Preserve GCPRO and all unrelated settings.
```

## Official references

- [Plugin package authentication schema](https://developers.openai.com/plugins/build/plugins) — api_key with headerScheme basic; connection metadata contains no secret.
- [Submission portal authentication limitations](https://developers.openai.com/plugins/deploy/submission) — public portal setup limitations, distinct from direct API access.
- [MCP in ChatGPT and Codex](https://learn.chatgpt.com/docs/extend/mcp) — host-specific configuration and ChatGPT plugin use.
