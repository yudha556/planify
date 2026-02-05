/**
 * ============================================
 * PDF SERVICE
 * Handles HTML to PDF conversion using Puppeteer
 * ============================================
 */

import puppeteer from "puppeteer";

export const pdfService = {
    /**
     * Generate PDF from HTML content
     * @param html - Full HTML string to render
     * @returns PDF Buffer
     */
    async generatePdf(html: string): Promise<Buffer> {
        let browser = null;
        try {
            browser = await puppeteer.launch({
                headless: true,
                args: [
                    "--no-sandbox",
                    "--disable-setuid-sandbox",
                    "--disable-dev-shm-usage", // Common fix for docker/limited envs
                    "--disable-gpu" // Windows stability
                ],
                pipe: true, // Use pipe instead of WS for better stability
                timeout: 60000,
            });

            const page = await browser.newPage();

            // Set content and wait for network idle
            await page.setContent(html, { waitUntil: "networkidle0" });

            // Wait for Mermaid if present
            // We can check if there's a .mermaid element and if so, wait a bit
            // or we can evaluate strict check
            if (html.includes('class="mermaid"')) {
                // Wait for svg to be generated inside .mermaid div
                // Mermaid replaces text with svg, so we wait for svg element
                try {
                    await page.waitForSelector('.mermaid svg', { timeout: 5000 });
                } catch (e) {
                    console.warn("Mermaid rendering timed out or failed, continuing...", e);
                }
            }

            // Generate PDF
            // Using A4 format, print background colors
            const pdf = await page.pdf({
                format: "A4",
                printBackground: true,
                margin: {
                    top: "20px",
                    right: "20px",
                    bottom: "20px",
                    left: "20px",
                },
            });

            return Buffer.from(pdf);
        } catch (error) {
            console.error("PDF Generation Error:", error);
            throw error;
        } finally {
            if (browser) {
                await browser.close();
            }
        }
    },

    /**
     * Helper to wrap content in a styled HTML template
     */
    createHtmlTemplate(title: string, content: string): string {
        return `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <title>${title}</title>
                <script src="https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js"></script>
                <script>
                    mermaid.initialize({ startOnLoad: true, theme: 'default' });
                </script>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        line-height: 1.6;
                        color: #333;
                        max-width: 800px;
                        margin: 0 auto;
                        padding: 20px;
                    }
                    h1 { color: #2c3e50; border-bottom: 2px solid #2cf; padding-bottom: 10px; }
                    h2 { color: #34495e; margin-top: 30px; }
                    h3 { color: #16a085; page-break-after: avoid; }
                    ul { margin-bottom: 20px; }
                    li { margin-bottom: 5px; }
                    .header { text-align: center; margin-bottom: 40px; }
                    .meta { color: #7f8c8d; font-size: 0.9em; text-align: center; }
                    .section { 
                        margin-bottom: 30px; 
                        background: #f9f9f9; 
                        padding: 20px; 
                        border-radius: 5px;
                        page-break-inside: avoid; /* Try to keep sections together */
                    }
                    /* Force page break before Key Features and other major sections if needed, 
                       but here we apply a general rule or specific classes */
                    .page-break-before {
                        page-break-before: always;
                    }
                    .tag {
                        display: inline-block;
                        background: #eee;
                        padding: 2px 8px;
                        border-radius: 4px;
                        font-size: 0.9em;
                        margin-right: 5px;
                    }
                    .mermaid-section {
                        page-break-before: always; /* Always start diagram on new page */
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        min-height: 50vh;
                    }
                    .mermaid {
                        text-align: center;
                        margin: 20px 0;
                        width: 100%;
                    }
                    /* Table Styles for Reference Match */
                    table {
                        width: 100%;
                        border-collapse: collapse;
                        margin-bottom: 20px;
                        font-size: 0.9em;
                    }
                    th, td {
                        border: 1px solid #ddd;
                        padding: 12px;
                        text-align: left;
                    }
                    th {
                        background-color: #f2f2f2;
                        color: #2c3e50;
                        font-weight: bold;
                    }
                    tr:nth-child(even) {
                        background-color: #f9f9f9;
                    }
                    /* Feature Module Styles */
                    .module-box {
                        margin-bottom: 25px;
                        padding-bottom: 15px;
                        border-bottom: 1px solid #eee;
                    }
                    .module-title {
                        font-weight: bold;
                        font-size: 1.1em;
                        color: #2c3e50;
                        margin-bottom: 8px;
                    }
                    .user-story {
                        font-style: italic;
                        color: #666;
                        margin-bottom: 10px;
                        padding-left: 10px;
                        border-left: 3px solid #3498db;
                    }
                    /* Cover Page Styles */
                    .cover-page {
                        min-height: 90vh; /* Changed from 100vh to avoid spillover */
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        text-align: left;
                        page-break-after: always;
                        padding-top: 20px;
                    }
                    .cover-title {
                        font-size: 2.5em;
                        font-weight: bold;
                        color: #2c3e50;
                        margin-bottom: 10px;
                        text-transform: uppercase;
                    }
                    .cover-subtitle {
                        font-size: 1.2em;
                        color: #7f8c8d;
                        margin-bottom: 40px;
                        font-weight: bold;
                    }
                    .cover-info {
                        margin-top: 50px;
                        border-top: 1px solid #ccc;
                        padding-top: 20px;
                        width: 100%;
                    }
                    .cover-info-item {
                        margin-bottom: 10px;
                        font-size: 1.1em;
                    }
                    .cover-label {
                        font-weight: bold;
                        width: 150px;
                        display: inline-block;
                        color: #34495e;
                    }
                </style>
            </head>
            <body>
                <!-- Header removed to allow custom Cover Page -->
                ${content}
            </body>
            </html>
        `;
    },
};
