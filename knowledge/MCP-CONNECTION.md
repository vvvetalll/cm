# Chicago Mounting Elementor MCP connection

Updated: 2026-11-07 (America/Chicago).

## Current accepted connection instruction — any runtime (2026-11-07)

**Supersedes the cloud-only limitation in older notes.** Direct HTTPS may execute from **any available runtime**, including local Windows with Node.js `fetch` (and PowerShell where supported). The user has already authorized read-only MCP connection and page verification from the current local runtime. Do not ask again solely because cloud execution is unavailable. Do not block on ChatGPT plugin `not_installed` or missing native tools; try direct HTTPS.

```text
Chicago Mounting: connect directly to
https://chicagomounting.com/wp-json/elementor/mcp/

Use HTTP Basic authentication with the supplied credentials.
Use ANY available runtime, including local Windows and Node.js fetch.
Cloud runtime is NOT required.

Sequence:
1. initialize
2. Preserve Mcp-Session-Id.
3. notifications/initialized
4. tools/list
5. elementor-get-page-structure with post_id: 15716

Attempt the actual HTTPS request before reporting a blocker.
Do not use OAuth, alternative plugins, proxies, or local MCP configuration files.
Never output or save credentials or Authorization headers.
Confirm readiness only after successful page reading.

User-reported verification on November 7, 2026:
Direct Node.js fetch → HTTP 200 → 22 tools → Page 15716 read successfully.
```

The user provided a successful Work report on 2026-11-07 (local Node.js fetch, HTTP 200, 22 tools and Page 15716). **This is user-supplied Work output, not a new connection test performed while editing this repository.** Always verify access in each new runtime/session. Use only authorized credentials accessible to the current agent; credentials stored by the user in private Project Instructions must never be copied into this public repository, printed, logged or sent elsewhere. If credentials or an HTTP-capable environment are genuinely unavailable, report that exact blocker; if HTTP requests fail, report the actual response. Standing permission is for read-only access checks, not arbitrary production changes.

## Previous workflow — historical note, 2026-11-07

Use direct authenticated MCP from any available runtime as the standard method for Chicago Mounting (cloud or local Windows/Node.js). The user explicitly confirmed this method after reviewing the earlier successful 22-tool / Page15716 session. This decision supersedes plugin-installation or OAuth troubleshooting as a prerequisite for ordinary CM work.

- Connect to the existing production endpoint using HTTP Basic and the authorized WordPress Application Password source. Keep credentials and session values in memory only.
- Follow initialize → retain Mcp-Session-Id → notifications/initialized → tools/list → one relevant read. Use Page15716 for the connection check when no more specific page is requested.
- Do not restart plugin discovery, request another installation, switch to OAuth, create duplicate connections, create local MCP configuration files, or access installed WordPress plugin files merely because native tools are absent.
- If the current runtime lacks an authorized secure credential source or network access, state that precise blocker. This preference does not itself provide or persist credentials. Do not retrieve secrets from repository files, browser storage or old artifacts, or ask for a WordPress admin password.
- Reuse an existing valid MCP session where available; initialize a new one when needed. Verify the relevant read before edits. Never describe an earlier successful read as a current-session test.
- Preserve GCPRO and all unrelated settings. Package/host diagnostics are a separate task only when specifically requested.

## Existing connection metadata

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

The package below remains an existing optional host connection, not a prerequisite for direct MCP access. Preserve it and do not create duplicates. Direct metadata/file readback verified the saved package; directory-search absence did not establish that it was missing.

## Verified status and remaining gate

- **Verified direct cloud API access:** initialize HTTP200, Elementor MCP v1.0.0, negotiated protocol2025-11-25; notifications/initialized202; tools/list200 with22 tools; Page15716 structure200 with isError=false. The returned structure includes Catalogue7cb19457, HERO3d9b938, Shortcode111a2a4 and Loop Grid52200b7.
- **Saved in ChatGPT:** the private plugin above, including the exact existing endpoint and API-key/basic authentication declaration. Stored manifest and MCP configuration were read back successfully. No credentials were packaged.
- **Latest user screenshot (2026-11-07):** the cube-icon workspace package appears under Installed, with an installation-success toast and its MCP switch enabled. This supersedes the earlier failed-install screenshot as the latest visible installation state. It does not establish successful authentication or tools in this chat. The separately tagged personal App-backed entry `plugin_asdk_app_6aef42332bac8191b4bdfd8e7658be2b` has a different verified identity. Neither existing entry was changed; credentials persistence and a current-session read remain unverified.
- **Separate unresolved issue:** the earlier OAuth route returned `Unknown OAuth client`. OAuth is not the selected method and must not be used as a fallback.
- No website changes, installed-plugin source access, security weakening or GCPRO edits occurred.

The 22-tool response proves authenticated direct protocol access; it does not prove a permanent account-level connection. A new Python process or MCP session is not a new ChatGPT Work chat.

## Historical host setup route — superseded for routine work

Do not follow this route as a prerequisite for CM work. The direct-MCP default above is the latest user decision. Retain these steps only as historical context for a separately requested host-connection task.

### Previously proposed host verification

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
For Chicago Mounting, read AGENTS.md and knowledge/MCP-CONNECTION.md in https://github.com/vvvetalll/cm on the current default branch.

Default to direct MCP from ANY available runtime (including local Windows with Node.js fetch; Work cloud is not required):
Endpoint: https://chicagomounting.com/wp-json/elementor/mcp/
Server: chicago-mounting-elementor
Authentication: WordPress Application Password over HTTP Basic, from an authorized secure credential source, kept in memory.

Initialize, retain Mcp-Session-Id, send notifications/initialized, discover tools and perform one relevant read (Page15716 for a connection check). Reuse a valid session where available. A native plugin is not a prerequisite for this direct transport.

Do not restart plugin setup or discovery, switch to OAuth, create duplicate connections or local MCP configuration files, install WordPress plugins, or access installed plugin source files. Do not extract passwords from browser storage or previous artifacts. Keep secrets out of chat, repositories, project instructions and plugin packages.

If secure credentials or network access are unavailable in the current runtime, report the exact blocker without claiming the endpoint is down or that old successful tests were repeated. This workflow preference does not prove credentials persist across chats. Verify a relevant read before website changes. Preserve GCPRO and unrelated settings.
```

## Official references

- [Plugin package authentication schema](https://developers.openai.com/plugins/build/plugins) — api_key with headerScheme basic; connection metadata contains no secret.
- [Submission portal authentication limitations](https://developers.openai.com/plugins/deploy/submission) — public portal setup limitations, distinct from direct API access.
- [MCP in ChatGPT and Codex](https://learn.chatgpt.com/docs/extend/mcp) — host-specific configuration and ChatGPT plugin use.

## 2026-11-11 — Desktop MCP availability and mandatory recovery

Owner's ChatGPT desktop screenshot shows the existing `chicago-mounting-elementor` server registered **and toggled on** in Settings → Plugins → MCPs alongside `gcpro-restoration-elementor`. A Work report said an Elementor Page 15716 read succeeded (`isError: false`). These are observations of those sessions, not proof of persistent authorization in every new chat. Earlier Work HTTP 401 `rest_forbidden` occurred when that session lacked authorized Basic credentials; that does not establish that the registered desktop connection is broken.

**Order for future Work tasks:** (1) Discover and use existing desktop/native `chicago-mounting-elementor` tools if present and verify a current-session Page 15716 read. (2) If tools are absent, distinguish client tool exposure from actual server failure. If a secure credential source and HTTPS-capable runtime are available, attempt the already supported direct Basic HTTP MCP handshake; no new plugin/server is needed. (3) For expired sessions, reinitialize and preserve the new `Mcp-Session-Id`. (4) If blocked, identify exactly whether missing registration, unavailable credentials, HTTP 401/403, session expiration, network or server error, and request one specific action instead of generic reconnection instructions.

No OAuth fallback, security change, access to installed WordPress plugin files, credentials in GitHub/chat, or duplicate MCP installation. A prior successful read cannot be passed off as a fresh one. No permanent/cross-chat connectivity guarantee is made. This clarifies the older direct-HTTP-first instructions in `AGENTS.md`: native registered tools take priority when available; direct HTTPS remains the authorized fallback.
