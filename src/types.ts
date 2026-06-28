export interface Week {
  id?: string;
  user_id?: string;
  fecha: string;
  semana: number;
  aprendizajes: string;
  bloqueos: string;
  logros: string;
  mejoras: string;
  horas: number;
  tech: string;
  satisfaccion: number;
  created_at?: string;
}

export interface ErrorItem {
  id: number;
  name: string;
  lang: string;
  desc: string;
  causes: string[];
  solution: string;
  bad: string;
  good: string;
}

export interface Achievement {
  id: string;
  icon: string;
  name: string;
  desc: string;
  check: (weeks: Week[], savedErrors: number[], aiErrorsCount?: number, chatMessagesCount?: number) => boolean;
}
