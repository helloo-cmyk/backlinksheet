<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" 
                xmlns:html="http://www.w3.org/TR/REC-html40"
                xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <title>XML Sitemap - Ibrat Generator</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <link rel="icon" href="/favicon/favicon.ico" type="image/x-icon" />
        <style type="text/css">
          :root {
            --primary: #CCFF00;
            --bg: #0A0A0A;
            --surface: #121212;
            --text: #FFFFFF;
            --text-dim: #A1A1AA;
            --border: #27272A;
          }
          body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            font-size: 14px;
            color: var(--text);
            margin: 0;
            background: var(--bg);
            line-height: 1.5;
          }
          a {
            color: var(--text);
            text-decoration: none;
            transition: all 0.2s ease;
          }
          a:hover {
            color: var(--primary);
          }
          .container {
            max-width: 1100px;
            margin: 0 auto;
            padding: 40px 20px;
          }
          .header {
            margin-bottom: 40px;
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            border-bottom: 1px solid var(--border);
            padding-bottom: 20px;
          }
          .header-left h1 {
            margin: 0;
            font-size: 32px;
            font-weight: 800;
            letter-spacing: -0.04em;
          }
          .header-left p {
            margin: 8px 0 0;
            color: var(--text-dim);
            font-size: 16px;
          }
          .stats {
            display: flex;
            gap: 20px;
          }
          .stat-item {
            background: var(--surface);
            padding: 10px 20px;
            border-radius: 8px;
            border: 1px solid var(--border);
          }
          .stat-value {
            display: block;
            font-size: 18px;
            font-weight: 700;
            color: var(--primary);
          }
          .stat-label {
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            color: var(--text-dim);
          }
          .content-card {
            background: var(--surface);
            border-radius: 16px;
            border: 1px solid var(--border);
            overflow: hidden;
            box-shadow: 0 10px 40px rgba(0,0,0,0.5);
          }
          table {
            width: 100%;
            border-collapse: collapse;
          }
          th {
            text-align: left;
            padding: 18px 24px;
            background: #18181B;
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 0.15em;
            color: var(--text-dim);
            border-bottom: 1px solid var(--border);
          }
          td {
            padding: 16px 24px;
            border-bottom: 1px solid var(--border);
            color: var(--text-dim);
          }
          tr:last-child td {
            border-bottom: none;
          }
          tr:hover td {
            background: #18181B;
            color: var(--text);
          }
          .url-text {
            color: var(--text);
            font-weight: 500;
            font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
            font-size: 13px;
          }
          .priority-tag {
            display: inline-block;
            padding: 4px 10px;
            border-radius: 4px;
            font-size: 11px;
            font-weight: 700;
            background: rgba(204, 255, 0, 0.1);
            color: var(--primary);
            border: 1px solid rgba(204, 255, 0, 0.2);
          }
          .freq-tag {
            font-size: 12px;
            color: var(--text-dim);
          }
          .date-text {
            font-size: 12px;
            opacity: 0.8;
          }
          .footer {
            margin-top: 40px;
            text-align: center;
            color: var(--text-dim);
            font-size: 12px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="header-left">
              <h1>XML Sitemap</h1>
              <p>Index of ibratgenerator.com</p>
            </div>
            <div class="stats">
              <div class="stat-item">
                <span class="stat-value"><xsl:value-of select="count(sitemap:urlset/sitemap:url)"/></span>
                <span class="stat-label">Total URLs</span>
              </div>
              <div class="stat-item">
                <span class="stat-value"><xsl:value-of select="count(sitemap:urlset/sitemap:url[contains(sitemap:loc, '/blog/')])"/></span>
                <span class="stat-label">Blog Posts</span>
              </div>
            </div>
          </div>

          <div class="content-card">
            <table>
              <thead>
                <tr>
                  <th width="65%">URL Location</th>
                  <th width="10%">Priority</th>
                  <th width="10%">Update</th>
                  <th width="15%">Last Modified</th>
                </tr>
              </thead>
              <tbody>
                <xsl:for-each select="sitemap:urlset/sitemap:url">
                  <xsl:sort select="sitemap:priority" order="descending"/>
                  <tr>
                    <td>
                      <xsl:variable name="itemURL">
                        <xsl:value-of select="sitemap:loc"/>
                      </xsl:variable>
                      <a href="{$itemURL}" class="url-text">
                        <xsl:value-of select="sitemap:loc"/>
                      </a>
                    </td>
                    <td>
                      <span class="priority-tag">
                        <xsl:value-of select="sitemap:priority"/>
                      </span>
                    </td>
                    <td>
                      <span class="freq-tag">
                        <xsl:value-of select="sitemap:changefreq"/>
                      </span>
                    </td>
                    <td>
                      <span class="date-text">
                        <xsl:value-of select="substring(sitemap:lastmod, 0, 11)"/>
                      </span>
                    </td>
                  </tr>
                </xsl:for-each>
              </tbody>
            </table>
          </div>

          <div class="footer">
            Generated by Ibrat Generator — The ultimate brat aesthetic toolkit.
          </div>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
