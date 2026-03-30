export interface StepConfig {
  /** The label text for the step */
  label: string;
  /** Optional path for navigation */
  path?: string;
  /** Whether this step can be navigated to */
  canNavigate?: boolean;
  /** Additional props to pass to the step */
  [key: string]: any;
}

export interface StepThemeConfig {
  /** Base color for active elements */
  baseColor: string;
  /** Text color for labels */
  textColor: string;
  /** Border color for step indicators */
  borderColor: string;
  /** Background color for the progress track */
  trackColor: string;
  /** Background color for the completed progress track */
  completedTrackColor: string;
  /** Size of the progress track */
  size: string;
  /** Unit for the size (rem, px, etc.) */
  unit: string;
  /** Font size for step labels and indicators */
  fontSize: string;
  /** Preset styles for different step states */
  presets: {
    active: {
      bg: string;
      color: string;
    };
    completed: {
      bg: string;
      color: string;
    };
    default: {
      bg: string;
      color: string;
    };
  };
}

export type StepVariant = 'light' | 'dark';

export interface BaseStepProps {
  /** Array of step configurations */
  config: StepConfig[];
  /** Index of the currently active step (0-based) */
  active: number;
  /** Custom theme configuration */
  skin?: StepThemeConfig;
  /** Theme variant to use */
  variant?: StepVariant;
  /** Whether to show step labels */
  showLabels?: boolean;
  /** Whether to show edge circles */
  showEdges?: boolean;
  /** Whether to show tooltips on hover */
  showTooltip?: boolean;
  /** Whether to use simple mode (no numbers/icons) */
  simple?: boolean;
  /** Additional props to pass to child components */
  childProps?: Record<string, any>;
  /** Callback when a step is clicked */
  setActive?: (index: number) => void;
  /** Additional props for the container */
  [key: string]: any;
}
