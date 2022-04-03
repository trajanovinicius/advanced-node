export class PersonController {
  speak(name?: string): string {
    return `Olá ${name?.toUpperCase() ?? "Fulano"}!!!`;
  }
}
