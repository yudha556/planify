/**
 * ============================================
 * PROMPT REGISTRY - BASE TYPES & UTILITIES
 * ============================================
 */

export type ProjectType = 'webapp' | 'mobile' | 'research' | 'enterprise';
export type GenerationMode = 'draft' | 'polished';

/**
 * Base prompt configuration for a specific project type and mode
 */
export interface PromptConfig {
    systemPrompt: string;
    outputSchema: string; // JSON schema description for AI to follow
}

/**
 * Registry entry containing both draft and polished prompts
 */
export interface PromptEntry {
    type: ProjectType;
    label: string;
    description: string;
    draft: PromptConfig;
    polished: PromptConfig;
}

// Lazy-loaded prompt entries to avoid circular imports
let _registry: Record<ProjectType, PromptEntry> | null = null;

function getRegistry(): Record<ProjectType, PromptEntry> {
    if (!_registry) {
        // Dynamic imports to break circular dependency
        const { webAppPrompts } = require('./webapp.prompt');
        const { mobileAppPrompts } = require('./mobile.prompt');
        const { researchPrompts } = require('./research.prompt');
        const { enterprisePrompts } = require('./enterprise.prompt');

        _registry = {
            webapp: webAppPrompts,
            mobile: mobileAppPrompts,
            research: researchPrompts,
            enterprise: enterprisePrompts,
        };
    }
    return _registry;
}

/**
 * Get prompt from registry
 */
export function getPrompt(type: ProjectType, mode: GenerationMode): PromptConfig {
    const registry = getRegistry();
    const entry = registry[type];
    if (!entry) {
        throw new Error(`Unknown project type: ${type}`);
    }
    return mode === 'polished' ? entry.polished : entry.draft;
}

/**
 * List all available project types
 */
export function getAvailableTypes(): Array<{ type: ProjectType; label: string; description: string }> {
    const registry = getRegistry();
    return Object.values(registry).map(e => ({
        type: e.type,
        label: e.label,
        description: e.description,
    }));
}
