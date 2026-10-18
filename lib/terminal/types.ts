// Each maps to a --term-* token in globals.css (amber CRT in dark mode, Paper Ember in light)
export type OutputColor =
  | 'prompt'   // --term-prompt — prompt text
  | 'cmd'      // --term-cmd — command / user input
  | 'output'   // --term-out — standard output
  | 'muted'    // --term-hint — helper text, hints, usage lines
  | 'dim'      // --term-dim — separators only (too faint for text)
  | 'white'    // --term-head, bold — headers, emphasis
  | 'plain'    // --term-cmd

export interface OutputLine {
  text: string
  color?: OutputColor
  bold?: boolean
  /** If true, render as a blank spacer line */
  blank?: boolean
}

export interface ParsedCommand {
  command: string
  args: string[]
}

export type SendMailStep = 'name' | 'email' | 'message' | 'confirm'

export interface SendMailState {
  step: SendMailStep
  name?: string
  email?: string
  message?: string
}
