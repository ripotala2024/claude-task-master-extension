import * as vscode from 'vscode';
import { TaskMasterClient } from './taskMasterClient';
import { TagContextInfo, TagSelectionOptions, TagUIOptions, ExtensionTagValidationResult, TagAwareCommandOptions } from './types';
import { log } from './logger';

/**
 * Tag utility functions for VS Code extension
 * Provides centralized tag-related functionality for commands and UI operations
 */

/**
 * Get tag context information from TaskMasterClient
 * @param client TaskMasterClient instance
 * @returns TagContextInfo with current tag, available tags, and format information
 */
export function getTagContext(client: TaskMasterClient): TagContextInfo {
    try {
        return client.getTagContext();
    } catch (error) {
        log(`Error getting tag context: ${error}`);
        return {
            currentTag: 'master',
            availableTags: ['master'],
            isTaggedFormat: false
        };
    }
}

/**
 * Format tag display text for UI elements
 * @param tagContext Tag context information
 * @param baseText Base text to enhance with tag information
 * @param options Formatting options
 * @returns Formatted text with tag context
 */
export function formatTagDisplay(
    tagContext: TagContextInfo, 
    baseText: string, 
    options: { showBrackets?: boolean; showOnlyIfTagged?: boolean } = {}
): string {
    const { showBrackets = true, showOnlyIfTagged = true } = options;
    
    if (showOnlyIfTagged && !tagContext.isTaggedFormat) {
        return baseText;
    }
    
    const tagPrefix = showBrackets ? `[Tag: ${tagContext.currentTag}] ` : `${tagContext.currentTag}: `;
    return `${tagPrefix}${baseText}`;
}

/**
 * Validate tag context for operations
 * @param tagContext Tag context to validate
 * @param requiredTag Optional specific tag requirement
 * @returns Validation result
 */
export function validateTagContext(tagContext: TagContextInfo, requiredTag?: string): ExtensionTagValidationResult {
    if (!tagContext.currentTag) {
        return {
            isValid: false,
            error: '未指定当前标签'
        };
    }
    
    if (!tagContext.availableTags.includes(tagContext.currentTag)) {
        return {
            isValid: false,
            error: `当前标签 '${tagContext.currentTag}' 不在可用标签列表中`
        };
    }
    
    if (requiredTag && tagContext.currentTag !== requiredTag) {
        return {
            isValid: false,
            error: `操作需要标签 '${requiredTag}'，但当前标签是 '${tagContext.currentTag}'`
        };
    }
    
    return { isValid: true };
}

/**
 * Create tag selection options for QuickPick
 * @param tagContext Tag context information
 * @param options UI options for tag selection
 * @returns Array of tag selection options
 */
export function createTagSelectionOptions(
    tagContext: TagContextInfo, 
    options: TagUIOptions = {}
): TagSelectionOptions[] {
    const { showCurrentTag = true } = options;
    
    return tagContext.availableTags.map(tag => ({
        label: tag,
        detail: tag === tagContext.currentTag ? '当前标签' : '可用标签',
        picked: showCurrentTag && tag === tagContext.currentTag,
        tagName: tag
    }));
}

/**
 * Show tag selection QuickPick
 * @param tagContext Tag context information
 * @param options UI options for the picker
 * @returns Selected tag name or undefined if cancelled
 */
export async function showTagSelectionPicker(
    tagContext: TagContextInfo, 
    options: TagUIOptions = {}
): Promise<string | undefined> {
    const { 
        placeholder = `选择标签上下文（当前：${tagContext.currentTag}）`,
        allowMultipleSelection = false 
    } = options;
    
    // Don't show picker if only one tag available or not in tagged format
    if (!tagContext.isTaggedFormat || tagContext.availableTags.length <= 1) {
        return tagContext.currentTag;
    }
    
    const tagOptions = createTagSelectionOptions(tagContext, options);
    
    const selectedOption = await vscode.window.showQuickPick(
        tagOptions,
        {
            placeHolder: placeholder,
            canPickMany: allowMultipleSelection
        }
    );
    
    if (Array.isArray(selectedOption)) {
        // Multiple selection - return first selected tag
        return selectedOption.length > 0 ? selectedOption[0].tagName : undefined;
    }
    
    return selectedOption?.tagName;
}

/**
 * Get tag-aware placeholder text for input dialogs
 * @param tagContext Tag context information
 * @param baseText Base placeholder text
 * @returns Enhanced placeholder text with tag context
 */
export function getTagAwarePlaceholder(tagContext: TagContextInfo, baseText: string): string {
    return formatTagDisplay(tagContext, baseText, { showBrackets: true, showOnlyIfTagged: true });
}

/**
 * Log tag-aware operation
 * @param operation Operation name
 * @param tagContext Tag context information
 * @param additionalData Additional data to log
 */
export function logTagOperation(
    operation: string, 
    tagContext: TagContextInfo, 
    additionalData: Record<string, unknown> = {}
): void {
    const logData = {
        currentTag: tagContext.currentTag,
        isTaggedFormat: tagContext.isTaggedFormat,
        availableTagsCount: tagContext.availableTags.length,
        ...additionalData
    };
    log(`TAG OPERATION: ${operation} - ${JSON.stringify(logData)}`);
}

/**
 * Create tag-aware command options
 * @param tagContext Tag context information
 * @param baseOptions Base command options
 * @returns Enhanced command options with tag context
 */
export function createTagAwareCommandOptions(
    tagContext: TagContextInfo,
    baseOptions: Partial<TagAwareCommandOptions> = {}
): TagAwareCommandOptions {
    return {
        tagContext: tagContext.currentTag,
        preserveCurrentTag: true,
        showTagInUI: tagContext.isTaggedFormat,
        ...baseOptions
    };
}

/**
 * Handle tag context errors gracefully
 * @param error Error that occurred
 * @param operation Operation that failed
 * @param fallbackTag Fallback tag to use
 * @returns Fallback tag context
 */
export function handleTagContextError(
    error: unknown, 
    operation: string, 
    fallbackTag: string = 'master'
): TagContextInfo {
    const errorMessage = error instanceof Error ? error.message : String(error);
    log(`Tag context error in ${operation}: ${errorMessage}. Using fallback tag: ${fallbackTag}`);
    
    vscode.window.showWarningMessage(
        `标签上下文错误：${errorMessage}。使用备用标签：${fallbackTag}`
    );
    
    return {
        currentTag: fallbackTag,
        availableTags: [fallbackTag],
        isTaggedFormat: false
    };
}

/**
 * Check if tag switching is needed for operation
 * @param currentTag Current tag
 * @param targetTag Target tag for operation
 * @returns Whether tag switching is needed
 */
export function needsTagSwitch(currentTag: string, targetTag?: string): boolean {
    return targetTag !== undefined && targetTag !== currentTag;
}

/**
 * Format success message with tag context
 * @param baseMessage Base success message
 * @param tagContext Tag context information
 * @returns Enhanced success message
 */
export function formatTagSuccessMessage(baseMessage: string, tagContext: TagContextInfo): string {
    if (!tagContext.isTaggedFormat) {
        return baseMessage;
    }
    
    return `${baseMessage}（标签：${tagContext.currentTag}）`;
} 