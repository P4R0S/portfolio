import type { ParsedCommand } from './types'

export function parse(input: string): ParsedCommand {
  const trimmed = input.trim()
  if (!trimmed) return { command: '', args: [] }
  const parts = trimmed.split(/\s+/)
  return {
    command: parts[0].toLowerCase(),
    args: parts.slice(1),
  }
}
