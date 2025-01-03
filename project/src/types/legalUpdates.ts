export interface LegalUpdate {
  id: string;
  category: string;
  stateId?: string;
  title: string;
  description: string;
  date: Date;
  source: string;
}