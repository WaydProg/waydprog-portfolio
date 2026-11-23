import { createInterface, type Interface } from 'node:readline/promises';
import { stdin, stdout } from 'node:process';

export interface Choice<T> {
  readonly value: T;
  readonly label: string;
}

export class InputClosedError extends Error {
  constructor() {
    super('Ввод прерван, проект не сохранён.');
    this.name = 'InputClosedError';
  }
}

export class Prompter {
  private readonly rl: Interface;
  private readonly closed = new AbortController();

  constructor() {
    this.rl = createInterface({ input: stdin, output: stdout });
    this.rl.once('close', () => {
      this.closed.abort();
    });
  }

  async text(question: string, fallback = ''): Promise<string> {
    if (this.closed.signal.aborted) throw new InputClosedError();
    const hint = fallback ? ` [${fallback}]` : '';
    try {
      const answer = await this.rl.question(`${question}${hint}: `, { signal: this.closed.signal });
      return answer.trim() || fallback;
    } catch {
      throw new InputClosedError();
    }
  }

  async required(question: string, fallback = '', validate?: (value: string) => string | null) {
    for (;;) {
      const answer = await this.text(question, fallback);
      const problem = answer ? (validate?.(answer) ?? null) : 'поле обязательно';
      if (!problem) return answer;
      console.log(`  ✗ ${problem}`);
    }
  }

  async choose<T>(question: string, choices: readonly Choice<T>[]): Promise<T> {
    choices.forEach((choice, index) => {
      console.log(`  ${index + 1}) ${choice.label}`);
    });
    for (;;) {
      const answer = await this.text(question, '1');
      const choice = choices[Number(answer) - 1];
      if (choice) return choice.value;
      console.log(`  ✗ введите число от 1 до ${choices.length}`);
    }
  }

  async confirm(question: string, fallback: boolean): Promise<boolean> {
    const answer = (await this.text(`${question} (д/н)`, fallback ? 'д' : 'н')).toLowerCase();
    return ['д', 'да', 'y', 'yes'].includes(answer);
  }

  async list(question: string, separator: string | RegExp, minItems: number): Promise<string[]> {
    for (;;) {
      const items = (await this.text(question))
        .split(separator)
        .map((item) => item.trim())
        .filter(Boolean);
      if (items.length >= minItems) return items;
      console.log(`  ✗ нужно хотя бы ${minItems}`);
    }
  }

  close(): void {
    this.rl.close();
  }
}
