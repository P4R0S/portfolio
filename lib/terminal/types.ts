export type OutputColor =
  | 'prompt'   // #ffb300 — prompt text
  | 'cmd'      // #ffd54f — command / user input
  | 'output'   // #ff8f00 — standard output
  | 'dim'      // #3d2800 — separators, decorative
  | 'white'    // #ffffff bold — headers, emphasis
  | 'plain'    // default amber

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
