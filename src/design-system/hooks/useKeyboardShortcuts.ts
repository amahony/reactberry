import { useEffect, useCallback } from 'react';

interface KeyboardShortcuts {
  onSend?: () => void;
  onSaveDraft?: () => void;
  onPreview?: () => void;
  onSchedule?: () => void;
  onAddAttachment?: () => void;
  onToggleMode?: () => void;
}

export function useKeyboardShortcuts({
  onSend,
  onSaveDraft,
  onPreview,
  onSchedule,
  onAddAttachment,
  onToggleMode
}: KeyboardShortcuts) {
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    const { key, metaKey, ctrlKey, shiftKey } = event;
    const cmdOrCtrl = metaKey || ctrlKey;

    // Cmd/Ctrl + Enter: Send email
    if (cmdOrCtrl && key === 'Enter' && onSend) {
      event.preventDefault();
      onSend();
      return;
    }

    // Cmd/Ctrl + S: Save draft
    if (cmdOrCtrl && key === 's' && onSaveDraft) {
      event.preventDefault();
      onSaveDraft();
      return;
    }

    // Cmd/Ctrl + P: Preview
    if (cmdOrCtrl && key === 'p' && onPreview) {
      event.preventDefault();
      onPreview();
      return;
    }

    // Cmd/Ctrl + Shift + S: Schedule
    if (cmdOrCtrl && shiftKey && key === 'S' && onSchedule) {
      event.preventDefault();
      onSchedule();
      return;
    }

    // Cmd/Ctrl + U: Add attachment
    if (cmdOrCtrl && key === 'u' && onAddAttachment) {
      event.preventDefault();
      onAddAttachment();
      return;
    }

    // Cmd/Ctrl + M: Toggle between editor and preview mode
    if (cmdOrCtrl && key === 'm' && onToggleMode) {
      event.preventDefault();
      onToggleMode();
      return;
    }

    // Escape: Close any open dialogs (handled by parent component)
    if (key === 'Escape') {
      event.preventDefault();
      // Let parent component handle this
      return;
    }
  }, [onSend, onSaveDraft, onPreview, onSchedule, onAddAttachment, onToggleMode]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return {
    shortcuts: {
      send: '⌘+Enter',
      saveDraft: '⌘+S',
      preview: '⌘+P',
      schedule: '⌘+⇧+S',
      addAttachment: '⌘+U',
      toggleMode: '⌘+M'
    }
  };
}